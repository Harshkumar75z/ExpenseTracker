import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { ExpenseTable } from "./ExpenseTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  addExpense,
  setSingleExpense,
} from "../redux/expenseSlice";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";

const UpdateExpense = ({ expense }) => {
  const dispatch = useDispatch();
  const { expenses, singleExpense } = useSelector((store) => store.expense);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: singleExpense?.amount,
    description: singleExpense?.description,
    category: singleExpense?.category,
  });

  useEffect(() => {
    setFormData({
      amount: singleExpense?.amount,
      description: singleExpense?.description,
      category: singleExpense?.category,
    });
  }, [singleExpense]);

  const handleChangeController = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeCategoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/update/${expense._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
      const updatedExpense = expenses
      .filter(Boolean) // remove undefined/null
      .map(exp => exp._id === expense._id ? res.data.expense : exp);

  dispatch(setExpenses(updatedExpense));
  toast.success(res.data.message);
  setIsOpen(false);
}

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              dispatch(setSingleExpense(expense));
              setIsOpen(false); // ✅ Open instead of closing
            }}
            size="icon"
            className="rounded-full border border-green-600 bg-transparent hover:bg-green-100 text-green-600 hover:border-transparent transition-colors cursor-pointer"
          >
            <Edit2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Expenses</DialogTitle>
            <DialogDescription>
              Update New Expenses, Category and Price.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="amount">Price</Label>
              <Input
                id="amount"
                name="amount"
                onChange={handleChangeController}
                value={formData.amount}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                onChange={handleChangeController}
                value={formData.description}
              />
            </div>
            <Select
              onValueChange={changeCategoryHandler}
              value={formData.category}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Expense" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={submitHandler}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UpdateExpense;
