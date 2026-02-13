import Machine from "../models/Machine.js";


// CREATE MACHINE
export const createMachine = async (req, res) => {
  try {
    const machine = await Machine.create(req.body);
    res.status(201).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL MACHINES
export const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find().sort({ createdAt: -1 });
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE MACHINE
export const getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE MACHINE
export const updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE MACHINE
export const deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findByIdAndDelete(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.json({ message: "Machine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
