import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Checkbox } from "../components/ui/checkbox"
import { useDispatch, useSelector } from "react-redux"
import { Edit2, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import UpdateExpense from "./UpdateExpense"
import axios from "axios"
import { toast } from "sonner"
import { setExpenses } from "../redux/expenseSlice"


export function ExpenseTable() {
    const {expenses} = useSelector(store => store.expense);
    const [localExpense, setLocalExpense] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const dispatch = useDispatch();

    const fetchExpenses = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/expense/getall", { withCredentials: true });
    if (res.data.success) {
      dispatch(setExpenses(res.data.expenses)); // overwrite redux
    }
  } catch (error) {
    toast.error("Failed to fetch expenses");
  }
};


     const removeHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/expense/remove/${expenseId}`,
        { withCredentials: true }
      );

      // if (res.data.success) {
      //   toast.success(res.data.message);
      //   // fetchExpenses();
      //   // ✅ Filter out deleted expense from current expenses
      //   const updatedExpenses = expenses.filter((exp) => exp._id !== expenseId);

      //   // ✅ Update both local and Redux state
      //   setLocalExpense(updatedExpenses);
      //   dispatch(setExpenses(updatedExpenses)); // 🔥 Critical: Sync Redux + Persist
      // }
      if (res.data.success) {
  toast.success(res.data.message);

  // ✅ Always filter from localExpense (latest state)
  const updatedExpenses = (localExpense || []).filter((exp) => exp._id !== expenseId);

  // ✅ Update both local and Redux state
  setLocalExpense(updatedExpenses);
  dispatch(setExpenses(updatedExpenses)); // Keep Redux + Persist in sync
}

    } catch (error) {
      toast.error("Failed to delete expense");
      console.log(error);
    }
  };


    useEffect(() => {
        setLocalExpense(expenses);
    }, [expenses])

//   const totalAmount = (localExpense || []).reduce((acc, expense) => {
//   if (!expense) return acc; // skip if undefined or null
//   if (!checkedItems[expense._id]) {
//     return acc + (expense.amount || 0);
//   }
//   return acc;
// }, 0);


    // const handleCheckboxChange = async (expenseId) => {
    //   const newStatus = !checkedItems[expenseId];
    //   try {
    //     const res = await axios.put(`http://localhost:8000/api/v1/expense/${expenseId}/done`, {done : newStatus}, {
    //       headers: {
    //         'Content-Type' : 'application/json'
    //       },
    //       withCredentials: true
    //     })
    //     if(res.data.success){
    //       toast.success(res.data.message);
    //       setCheckedItems((prevData)=>({
    //         ...prevData,
    //         [expenseId] : newStatus,
    //       }));
    //       // optionally update the local state for expense Id the entire object need update
    //       setLocalExpense(localExpense.map(exp => exp._id === expenseId ? {...exp, done: newStatus}:exp))
    //     }
    //   } catch (error) {
    //     toast.error(error);
    //   }
    // }

    const totalAmount = (localExpense || []).reduce((acc, expense) => {
  if (!expense) return acc; // skip if undefined
  if (!expense.done) {      // only count not-done expenses
    return acc + (expense.amount || 0);
  }
  return acc;
}, 0);


    const handleCheckboxChange = async (expenseId) => {
  const expense = localExpense.find(exp => exp._id === expenseId);
  const newStatus = !expense.done;

  try {
    const res = await axios.put(
      `http://localhost:8000/api/v1/expense/${expenseId}/done`,
      { done: newStatus },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);

      // ✅ Update only that expense
      setLocalExpense(localExpense.map(exp =>
        exp._id === expenseId ? { ...exp, done: newStatus } : exp
      ));
      dispatch(setExpenses(localExpense.map(exp =>
        exp._id === expenseId ? { ...exp, done: newStatus } : exp
      )));
    }
  } catch (error) {
    toast.error("Failed to update status");
  }
};


  return (
    <Table>
      <TableCaption>A list of your recent Expense.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark Done</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(localExpense?.length ?? 0) === 0 ? (<TableRow key="empty-state">
      <TableCell className="text-center">
        Add Your First Expense
      </TableCell>
    </TableRow> ): localExpense?.map((expense) => (
          <TableRow key={expense._id}>
            <TableCell >
                <Checkbox 
                    checked={expense?.done}
                    onCheckedChange={() => handleCheckboxChange(expense._id)}
                    className="cursor-pointer"
                />
            </TableCell>
            <TableCell className={`${expense?.done ? 'line-through' : ''}`} >{expense?.category}</TableCell>
            <TableCell className={`${expense?.done ? 'line-through' : ''}`} >{expense?.description}</TableCell>
            {/* <TableCell>{expense?.date}</TableCell> */}
            <TableCell className={`${expense?.done ? 'line-through' : ''}`} >{expense?.createdAt?.split("T")[0]}</TableCell>
            <TableCell className={`${expense.done ? 'line-through' : ''}`} >{expense?.amount}</TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => {removeHandler(expense._id)}} size="icon" className="rounded-full border border-red-600 text-red-600 hover:bg-red-100 hover:text-red-600 transition-colors  hover:border-transparent cursor-pointer" variant='outline'> <Trash className="w-4 h-4" /> </Button>
                    {/* <Button size="icon" className="rounded-full border border-red-600 text-red-600 hover:border-transparent" variant='outline'> <Edit2  className="w-4 h-4" /> </Button> */}
                    <UpdateExpense expense={expense} />
                </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
            <TableCell colSpan={5} className="font-bold text-xl">Total</TableCell>
            <TableCell className="text-right font-bold text-xl">{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
