import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    materialName: {
      type: String,
      required: true,
      unique: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      enum: ["Kg", "Meter", "Piece"],
      required: true
    },
    alertLevel: {
      type: Number,
      default: 50
    }
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
