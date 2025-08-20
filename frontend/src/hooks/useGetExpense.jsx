// useGetExpense.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../redux/expenseSlice";
import axios from "axios";

const useGetExpense = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector((store) => store.expense);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("https://expensetracker-6vor.onrender.com/api/v1/expense/getall", {
          params: { category, done: markAsDone },
          // No need to set withCredentials here if already set globally
        });

        if (res.data.success) {
          dispatch(setExpenses(res.data.expense));
        } else {
          console.warn("API returned success: false", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
        // Optionally: dispatch an error action or set error state
      }
    };

    fetchExpenses();
  }, [dispatch, category, markAsDone]);
};

export default useGetExpense;