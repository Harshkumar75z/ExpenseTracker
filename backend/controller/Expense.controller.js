import Expense from "../Models/Expense.Models.js";

export const addexpense = async (req,res) =>{
    try {
        const {description, amount, category} = req.body
        const userId = req.id;
        if(!description || !amount || !category){
            return res.status(400).json({
                message : "All fields are required",
                status: true
            })
        };

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId:userId,
        })

        return res.status(201).json({
            message : "New Expense Added",
            success : true,
            expense
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllExpense = async (req, res) => {
  try {
    const userId = req.id;
    let category = req.query.category || "";
    let done = req.query.done || "";

    const query = { userId }; // filter by userId

    // Category filter
    if (category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    // Done/Undone filter
    if (done.toLowerCase() === "done") {
      query.done = true;
    } else if (done.toLowerCase() === "undone") {
      query.done = false;
    }

    const expense = await Expense.find(query);

    if (!expense || expense.length === 0) {
      return res.status(404).json({
        message: "No Expense Found",
        success: false,
      });
    }

    return res.status(200).json({   // ✅ success should be 200
      expense,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};


export const markAsDoneOrUndone = async (req,res) => {
    try {
        const expenseId = req.params.id;
        const {done} = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId, { done }, {new:true});

        if(!expense){
            return res.status(400).json({
                message : "Expense not found",
                success : false
            })
        };
        return res.status(200).json({
            message : `Expense marked as ${expense.done ? 'done' : 'undone'}`,
            success : true,
             expense, // 🔥 return updated expense
        })

    } catch (error) {
        console.log(error)
    }
}

export const removeExpense = async (req,res) => {
    try {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({
            message : "Expense removed",
            success : true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const expenseId = req.params.id;

    const updateData = { description, amount, category };

    const expense = await Expense.findByIdAndUpdate(expenseId, updateData, { new: true });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Expense Updated",
      success: true,
      expense // ✅ send the updated expense back
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false
    });
  }
};
