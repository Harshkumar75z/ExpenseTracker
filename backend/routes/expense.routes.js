import express from "express";
import { addexpense, getAllExpense, markAsDoneOrUndone, removeExpense, updateExpense } from "../controller/Expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, addexpense);
router.route("/getall").get(isAuthenticated,getAllExpense)
router.route("/remove/:id").delete(isAuthenticated, removeExpense);
router.route("/update/:id").put(isAuthenticated, updateExpense);
router.route("/:id/done").put(isAuthenticated,markAsDoneOrUndone)

export default router;