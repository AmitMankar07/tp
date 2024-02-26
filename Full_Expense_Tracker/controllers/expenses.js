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

const getUserExpenses=async (req,res,next)=>{
    try{
        const allExpenses=await expenses.findAll();
        res.status(200).json(allExpenses);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get expense' });
    }
}

module.exports={postUserExpenses,getUserExpenses};
