const express = require("express");
const { addTransaction, getTransactions, getIncomeTransactions, getOutcomeTransactions, deleteTransaction, updateTransaction, calculateAndUpdateBalance, getTransactionById } = require("../controllers/transactionController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, addTransaction);
router.get("/", authenticateToken, getTransactions);
router.get("/income", authenticateToken, getIncomeTransactions);
router.get("/outcome", authenticateToken, getOutcomeTransactions);
router.delete("/:id", authenticateToken, deleteTransaction);
router.put("/:id", authenticateToken, updateTransaction);
router.get("/balance", authenticateToken, calculateAndUpdateBalance);
router.get("/:id", authenticateToken, getTransactionById);

module.exports = router;
