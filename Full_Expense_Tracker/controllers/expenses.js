const expenses=require('../models/expense');


const postUserExpenses=async (req,res,next)=>{
    try{
        const {amount,description,category}=req.body;
        const expense=await expenses.create({amount,description,category});
        res.status(201).json(expense);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add expense' });
    }
};

const getUserExpense = async (req, res, next) => {
    try {
      const { id } = req.params; // Extract expense ID from request parameters
      const expense = await expenses.findByPk(id); // Find expense by ID
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(200).json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get expense' });
    }
  };
const getAllExpenses=async (req,res,next)=>{
    try{
        const allExpenses=await expenses.findAll();
        res.status(200).json(allExpenses);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get expense' });
    }
}


const deleteUserExpenses = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract expense ID from request parameters
        const deletedExpense = await expenses.findByPk(id); // Find expense by ID
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        await deletedExpense.destroy(); // Delete the expense
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete expense' });
    }
};
const editUserExpenses = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract expense ID from request parameters
        const { amount, description, category } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Expense ID is required' });
        }
        const updatedExpense = await expenses.findByPk(id); // Find expense by ID
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        // Update expense attributes
        updatedExpense.amount = amount;
        updatedExpense.description = description;
        updatedExpense.category = category;
        await updatedExpense.save(); // Save the changes
        res.json(updatedExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update expense' });
    }
};


module.exports={postUserExpenses,getUserExpense,editUserExpenses,deleteUserExpenses,getAllExpenses};
