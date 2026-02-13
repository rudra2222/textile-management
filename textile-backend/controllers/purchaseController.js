import Purchase from "../models/Purchase.js";
import Stock from "../models/Stock.js";


// CREATE PURCHASE
export const createPurchase = async (req, res) => {
  try {
    const { date, supplier, materialName, quantity, unit, rate } = req.body;

    const totalAmount = quantity * rate;

    const purchase = await Purchase.create({
      date,
      supplier,
      materialName,
      quantity,
      unit,
      rate,
      totalAmount
    });

    // Update Stock
    let stock = await Stock.findOne({ materialName });

    if (stock) {
      stock.quantity += quantity;
      await stock.save();
    } else {
      await Stock.create({
        materialName,
        quantity,
        unit
      });
    }

    res.status(201).json(purchase);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL PURCHASES
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ date: -1 });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET STOCK LIST
export const getStockList = async (req, res) => {
  try {
    const stock = await Stock.find().sort({ materialName: 1 });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
