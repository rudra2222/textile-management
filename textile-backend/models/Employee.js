import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String
    },
    role: {
      type: String,
      enum: ["Operator", "Helper", "Supervisor"],
      required: true
    },

    // Machine Reference
    assignedMachines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine"
      }
    ],

    salaryType: {
      type: String,
      enum: ["Fixed", "PerMeter", "PerPiece"],
      required: true
    },

    rate: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
