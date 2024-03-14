const expenses=require('../models/expense');
const users=require('../models/user');
const jwt=require('jsonwebtoken');
const sequelize=require('../util/db');
const postUserExpenses = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { amount, description, category } = req.body;
      const token = req.headers.authorization;
      console.log("Token:", token);
      if (!token) {
        throw new Error("Token missing");
      }
      const decodedToken = jwt.verify(token, "secretkey");
      const userId = decodedToken.userId;
  
      const expense = await expenses.create(
        { amount, description, category, userId },
        { transaction: t }
      );
  
      const totalExpense = Number(req.user.totalExpense) + Number(amount);
      console.log(totalExpense);
  
      await users.update(
        { totalExpense: totalExpense },
        { where: { id: req.user.id }, transaction: t }
      );
  
      await t.commit();
      res.status(201).json({ expense: expense });
    } catch (error) {
      await t.rollback();
      console.error("Error adding expense", error);
      res.status(500).json({ message: "Failed to add expense" });
    }
  };
// const postUserExpenses=async (req,res,next)=>{
//     const t=sequelize.transaction();
//     try{
        
//         const { amount, description, category } = req.body;
//         const token = req.headers.authorization; // Extract token from headers
//         console.log('Token:', token);
//         if (!token) {
//             throw new Error('Token missing');
//         }
//         const decodedToken = jwt.verify(token, 'secretkey'); // Verify token
//         const userId = decodedToken.userId;

//         const expense = await expenses.create({ amount, description, category, userId },{transaction:t}).then(expense=>{
//             const totalExpense=Number(req.user.totalExpense)+Number(amount)
//             console.log(totalExpense);
//         users.update({
//             totalExpense:totalExpense
//         },{
//             where:{id:req.user.id},transaction:t
//         }).then(async()=>{
//             t.commit();
//             res.status(201).json({expense:expense});
//         }).catch(async(err)=>{
//             t.rollback();
//             return res.status(500).json({success:false,error:err});

//         })
//         });

//     }catch (error) {
//         t.rollback();
//         console.error('Error adding expense',error);
//         res.status(500).json({ message: 'Failed to add expense' });
//     }
// };

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
        const userId=req.user.id;
        const allExpenses=await expenses.findAll({
            where:{
                userId:userId
            },
            include: [{
                model: users,
                attributes: ['id','name'] // Include the 'id' attribute of the User model
            }]
        });
        res.status(200).json(allExpenses);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get expense' });
    }
}


const deleteUserExpenses = async (req, res, next) => {
    const t=await sequelize.transaction();
    try {
        const { id } = req.params; // Extract expense ID from request parameters
       
        const token = req.headers.authorization;
        console.log("token in deleteuserexpense:",token);
        if (!token) {
            throw new Error('Token missing');
        }
       
       
        const decodedToken = jwt.verify(token, 'secretkey'); // Verify token
        const userId = decodedToken.userId;

        const deletedExpense = await expenses.findByPk(id,{transaction:t}); // Find expense by ID
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        // Check if the user ID in the token matches the user ID of the expense
        if (deletedExpense.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden: User ID does not match' });
        }
        const user = await users.findByPk(userId, { transaction: t });
        const totalExpense = Number(user.totalExpense) - Number(deletedExpense.amount);
    
        await users.update(
          { totalExpense: totalExpense },
          { where: { id: userId }, transaction: t }
        );
    
        await deletedExpense.destroy({transaction:t});
        await t.commit(); // Delete the expense
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        await t.rollback();
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
exports.checkMembership = async(req,res,next)=>{
    const userId = req.body.userId

    User.findOne({where:{id:userId}})
    .then(async data=>{
        const user = await User.findByPk(userId);
        res.json({premium:data.isPremium,rowPreference:user.rowPreference})
    });
} 

exports.isPremiumUser = (req, res) => {
    return res.status(202).json(req.user.isPremium);
};


module.exports={postUserExpenses,getUserExpense,editUserExpenses,deleteUserExpenses,getAllExpenses};
