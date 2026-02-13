import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    supplier: {
      type: String,
      required: true
    },
    materialName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ["Kg", "Meter", "Piece"],
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

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
