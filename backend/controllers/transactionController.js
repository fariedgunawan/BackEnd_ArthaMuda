const transactionModel = require("../models/transactionModel");

const addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, name, amount, date } = req.body;

    if (!type || !name || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Semua field (type, name, amount, date) harus diisi!",
      });
    }

    if (!["income", "outcome"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Tipe transaksi harus "income" atau "outcome"!',
      });
    }

    await transactionModel.createTransaction(userId, type, name, amount, date);

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil ditambahkan!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server.",
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await transactionModel.getTransactionsByUser(userId);

    res.json({
      success: true,
      message: "Data transaksi berhasil diambil!",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server.",
    });
  }
};

const getIncomeTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await transactionModel.getIncomeTransactions(userId);

    res.json({
      success: true,
      message: "Data income berhasil diambil!",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server.",
    });
  }
};

const getOutcomeTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await transactionModel.getOutcomeTransactions(userId);

    res.json({
      success: true,
      message: "Data outcome berhasil diambil!",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server.",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Hapus transaksi
    const isDeleted = await transactionModel.deleteTransactionById(id, userId);

    if (isDeleted) {
      res.status(200).json({
        success: true,
        message: "Transaksi berhasil dihapus.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan atau Anda tidak memiliki akses.",
      });
    }
  } catch (error) {
    console.error("Kesalahan saat menghapus transaksi:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server.",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, amount, date } = req.body;

    if (!name || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Semua field (name, amount, date) harus diisi.",
      });
    }

    const isUpdated = await transactionModel.updateTransactionById(id, userId, name, amount, date);

    if (isUpdated) {
      res.status(200).json({
        success: true,
        message: "Transaksi berhasil diperbarui.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan atau Anda tidak memiliki akses.",
      });
    }
  } catch (error) {
    console.error("Kesalahan saat memperbarui transaksi:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server.",
    });
  }
};

const calculateAndUpdateBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalIncome = await transactionModel.getTotalIncome(userId);
    const totalOutcome = await transactionModel.getTotalOutcome(userId);

    const balance = totalIncome - totalOutcome;

    const isUpdated = await transactionModel.updateBalance(userId, balance);

    if (isUpdated) {
      res.status(200).json({
        success: true,
        message: "Saldo berhasil diperbarui.",
        data: { totalIncome, totalOutcome, balance },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Gagal memperbarui saldo.",
      });
    }
  } catch (error) {
    console.error("Kesalahan saat menghitung saldo:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server.",
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getIncomeTransactions,
  getOutcomeTransactions,
  deleteTransaction,
  updateTransaction,
  calculateAndUpdateBalance,
};
