import mongoose from "mongoose";

const productionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },

    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    startReading: {
      type: Number,
      required: true
    },

    endReading: {
      type: Number,
      required: true
    },

    output: {
      type: Number
    },

    shift: {
      type: String,
      enum: ["Day", "Night"],
      required: true
    },

    remarks: {
      type: String
    },

    calculatedSalary: {
      type: Number
    }
  },
  { timestamps: true }
);

const Production = mongoose.model("Production", productionSchema);

export default Production;
