import mongoose from "mongoose";
import User from "./User.Models.js";

const expenseSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    done : {
        type : Boolean,
        default : false,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps:true})

const Expense = mongoose.model("Expense",expenseSchema);
export default Expense;