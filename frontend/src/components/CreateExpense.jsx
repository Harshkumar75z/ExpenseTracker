import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { ExpenseTable } from "./ExpenseTable"
import { useDispatch, useSelector } from "react-redux"
import { setExpenses, addExpense } from "../redux/expenseSlice"



const CreateExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount : '',
    description : '',
    category : ''
  })

  const dispatch = useDispatch();
  const {expenses} = useSelector(store => store.expense)
  const handleChangeController = (e) =>{
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name] : value
    }))
  }

  const changeCategoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category : value
    }))
  }

  const submitHandler = async (e) => {
  e.preventDefault()
  try {
    const res = await axios.post("http://localhost:8000/api/v1/expense/add", formData, {
      headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true,
    })

    if (res.data.success) {
  // dispatch(setExpenses([...expenses, res.data.expense]));
  // dispatch(addExpense(res.data.expense));
  // dispatch(setExpenses([...expenses.filter(Boolean), res.data.expense]));
  dispatch(addExpense(res.data.expense));
  
  setIsOpen(false);
}


  } catch (error) {
    console.log(error);
  }finally{
    setLoading(false);
  }
}


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer"  onClick={() => {setIsOpen(true)}} variant="outline">Add Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expenses</DialogTitle>
            <DialogDescription>
              Add New Expenses, Category and Price.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="amount">Price</Label>
              <Input id="amount" name="amount" onChange={handleChangeController} value={formData.amount} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" onChange={handleChangeController} value={formData.description}/>
            </div>
            <Select onValueChange={changeCategoryHandler} value={formData.category}>
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
              <Button className="cursor-pointer"  variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="cursor-pointer"  type="submit" onClick={submitHandler}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateExpense;