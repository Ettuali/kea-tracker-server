const expenseModel = require("../models/expenseModel");

const addExpense = async (req, res) => {
  try {
    const expense = await expenseModel.addExpense(req.body);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await expenseModel.updateExpense(req.params.id, req.body);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await expenseModel.deleteExpense(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
};
