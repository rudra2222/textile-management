import Production from "../models/Production.js";
import Machine from "../models/Machine.js";


// DASHBOARD SUMMARY
export const getDashboardData = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // 1 Today Production
    const todayProduction = await Production.aggregate([
      {
        $match: {
          date: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: null,
          totalOutput: { $sum: "$output" },
          totalSalary: { $sum: "$calculatedSalary" },
          employeesWorked: { $addToSet: "$employee" }
        }
      }
    ]);

    const productionData = todayProduction[0] || {
      totalOutput: 0,
      totalSalary: 0,
      employeesWorked: []
    };

    // 2 Active Machines
    const activeMachines = await Machine.countDocuments({
      status: "Running"
    }); 

    // 3 Last 7 Days Production
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weeklyProduction = await Production.aggregate([
      {
        $match: {
          date: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          totalOutput: { $sum: "$output" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      todayProduction: productionData.totalOutput,
      todaySalaryCost: productionData.totalSalary,
      employeesWorkedToday: productionData.employeesWorked.length,
      activeMachines,
      weeklyProduction
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
