import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    customerName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ["Meter", "Kg", "Piece"],
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number
    }
  },
  { timestamps: true }
);

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
