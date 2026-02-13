import Sales from "../models/Sales.js";


// CREATE SALE
export const createSale = async (req, res) => {
  try {
    const { date, customerName, quantity, unit, rate } = req.body;

    const totalAmount = quantity * rate;

    const sale = await Sales.create({
      date,
      customerName,
      quantity,
      unit,
      rate,
      totalAmount
    });

    res.status(201).json(sale);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL SALES
export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find().sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE SALE
export const updateSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    const { date, customerName, quantity, unit, rate } = req.body;

    if (date !== undefined) sale.date = date;
    if (customerName !== undefined) sale.customerName = customerName;
    if (quantity !== undefined) sale.quantity = quantity;
    if (unit !== undefined) sale.unit = unit;
    if (rate !== undefined) sale.rate = rate;

    sale.totalAmount = sale.quantity * sale.rate;

    await sale.save();

    res.json(sale);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE SALE
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json({ message: "Sale deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
