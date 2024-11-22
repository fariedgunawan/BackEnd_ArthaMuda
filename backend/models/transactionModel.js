const db = require("../config/database");

const createTransaction = async (userId, type, name, amount, date) => {
  const [result] = await db.query("INSERT INTO transactions (user_id, type, name, amount, date) VALUES (?, ?, ?, ?, ?)", [userId, type, name, amount, date]);
  return result;
};

const getTransactionsByUser = async (userId) => {
  const [rows] = await db.query("SELECT id, type, name, amount, date FROM transactions WHERE user_id = ? ORDER BY date DESC", [userId]);
  return rows;
};

const getIncomeTransactions = async (userId) => {
  const [rows] = await db.query('SELECT id, type, name, amount, date FROM transactions WHERE user_id = ? AND type = "income" ORDER BY date DESC', [userId]);
  return rows;
};

const getOutcomeTransactions = async (userId) => {
  const [rows] = await db.query('SELECT id, type, name, amount, date FROM transactions WHERE user_id = ? AND type = "outcome" ORDER BY date DESC', [userId]);
  return rows;
};

const deleteTransactionById = async (id, userId) => {
  const [result] = await db.query("DELETE FROM transactions WHERE id = ? AND user_id = ?", [id, userId]);
  return result.affectedRows > 0;
};

const updateTransactionById = async (id, userId, name, amount, date) => {
  const [result] = await db.query("UPDATE transactions SET name = ?, amount = ?, date = ? WHERE id = ? AND user_id = ?", [name, amount, date, id, userId]);
  return result.affectedRows > 0; // Mengembalikan true jika ada baris yang diperbarui
};

const getTotalIncome = async (userId) => {
  const [rows] = await db.query('SELECT COALESCE(SUM(amount), 0) AS total_income FROM transactions WHERE type = "income" AND user_id = ?', [userId]);
  return rows[0].total_income;
};

const getTotalOutcome = async (userId) => {
  const [rows] = await db.query('SELECT COALESCE(SUM(amount), 0) AS total_outcome FROM transactions WHERE type = "outcome" AND user_id = ?', [userId]);
  return rows[0].total_outcome;
};

const updateBalance = async (userId, balance) => {
  const [result] = await db.query("UPDATE users SET balance = ? WHERE id = ?", [balance, userId]);
  return result.affectedRows > 0;
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  getIncomeTransactions,
  getOutcomeTransactions,
  deleteTransactionById,
  updateTransactionById,
  getTotalIncome,
  getTotalOutcome,
  updateBalance,
};
