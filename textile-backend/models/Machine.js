import mongoose from "mongoose";

const machineSchema = new mongoose.Schema(
  {
    machineNumber: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      enum: ["Spinning", "Weaving", "Dyeing", "Garment"],
      required: true
    },
    type: {
      type: String,
      required: true
    },
    department: {
      type: String
    },
    outputUnit: {
      type: String,
      enum: ["Meter", "Kg", "Piece"],
      required: true
    },
    capacity: {
      type: Number
    },
    status: {
      type: String,
      enum: ["Running", "Idle"],
      default: "Idle"
    }
  },
  { timestamps: true }
);

const Machine = mongoose.model("Machine", machineSchema);

export default Machine;
