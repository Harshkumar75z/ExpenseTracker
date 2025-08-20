import React from "react";
import Navbar from "./Navbar";
import CreateEmployee from "./CreateExpense";
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
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "../redux/expenseSlice";
import { ExpenseTable } from "./ExpenseTable";
import useGetExpense from "../hooks/useGetExpense";

const Home = () => {
  useGetExpense();
  const dispatch = useDispatch();

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };

  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex justify-between mb-5">
          <h1>Expense</h1>
          <CreateEmployee />
        </div>
        <div className="flex item-center gap-2 my-5">
          <div className="font-medium text-xl">
            <h1>Filter By : </h1>
          </div>
          <div>
            <Select className="cursor-pointer" onValueChange={changeCategoryHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Select className="cursor-pointer"  onValueChange={changeDoneHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mark As" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ExpenseTable />
      </div>
    </div>
  );
};

export default Home;
