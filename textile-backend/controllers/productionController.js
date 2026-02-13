import Production from "../models/Production.js";
import Employee from "../models/Employee.js";


// CREATE PRODUCTION ENTRY
export const createProduction = async (req, res) => {
  try {
    const {
      date,
      machine,
      employee,
      startReading,
      endReading,
      shift,
      remarks
    } = req.body;

    if (endReading < startReading) {
      return res.status(400).json({
        message: "End reading must be greater than start reading"
      });
    }

    const output = endReading - startReading;

    // Fetch employee to calculate salary   
    const emp = await Employee.findById(employee);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    let calculatedSalary = 0;

    if (emp.salaryType === "Fixed") {
      calculatedSalary = emp.rate; // For now daily fixed
    } else {
      calculatedSalary = output * emp.rate;
    }

    const production = await Production.create({
      date,
      machine,
      employee,
      startReading, 
      endReading,
      output,
      shift,
      remarks,
      calculatedSalary
    });

    res.status(201).json(production);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL PRODUCTION ENTRIES
export const getProductions = async (req, res) => {
  try {
    const productions = await Production.find()
      .populate("machine", "machineNumber category")
      .populate("employee", "name role")
      .sort({ date: -1 });

    res.json(productions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE ENTRY
export const getProductionById = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id)
      .populate("machine")
      .populate("employee");

    if (!production) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(production);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE PRODUCTION ENTRY
export const updateProduction = async (req, res) => {
  try {
    const {
      startReading,
      endReading,
      shift,
      remarks
    } = req.body;

    const production = await Production.findById(req.params.id);

    if (!production) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (endReading < startReading) {
      return res.status(400).json({
        message: "End reading must be greater than start reading"
      });
    }

    const output = endReading - startReading;

    // Fetch employee again
    const emp = await Employee.findById(production.employee);

    let calculatedSalary = 0;

    if (emp.salaryType === "Fixed") {
      calculatedSalary = emp.rate;
    } else {
      calculatedSalary = output * emp.rate;
    }

    production.startReading = startReading;
    production.endReading = endReading;
    production.output = output;
    production.shift = shift;
    production.remarks = remarks;
    production.calculatedSalary = calculatedSalary;

    await production.save();

    res.json(production);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE ENTRY
export const deleteProduction = async (req, res) => {
  try {
    const production = await Production.findByIdAndDelete(req.params.id);

    if (!production) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ message: "Production entry deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// MONTHLY SALARY SUMMARY
export const getMonthlySalarySummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required"
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const summary = await Production.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: "$employee",
          totalOutput: { $sum: "$output" },
          totalSalary: { $sum: "$calculatedSalary" }
        }
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "_id",
          as: "employee"
        }
      },
      {
        $unwind: "$employee"
      },
      {
        $project: {
          _id: 0,
          employeeId: "$employee._id",
          employeeName: "$employee.name",
          role: "$employee.role",
          totalOutput: 1,
          totalSalary: 1
        }
      }
    ]);

    res.json(summary);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
