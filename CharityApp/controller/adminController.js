const Charity = require('../models/charityModel');
const AdminNotification=require('../models/notification');
// exports.approveCharity = async (req, res) => {
//     try {
//         const charity = await Charity.findById(req.params.id);
//         charity.approved = true;
//         await charity.save();
//         res.json({ success: true, message: 'Charity approved successfully!' });
//     } catch (error) {
//         res.status(404).json({ success: false, error: 'Charity not found' });
//     }
// };
exports.pendingCharities=async(req,res)=>{
    try {
        const pendingCharities = await Charity.findAll({
          where: { approved: false }
        });
        res.json(pendingCharities);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch pending charities" });
      } 
}

exports.charityApproval=async(req,res)=>{
    try {
        const { charityId } = req.params;
        const { action } = req.body; // 'approve' or 'reject'
    
        const charity = await Charity.findByPk(charityId);
        if (!charity) {
          return res.status(404).json({ error: "Charity not found" });
        }
    
        if (action === 'approve') {
          await charity.update({ approved: true });
        } else if (action === 'reject') {
          // You might want to handle rejection differently, 
          // e.g., by deleting the charity or setting a separate 'rejected' field
          await charity.destroy();
        } else {
          return res.status(400).json({ error: "Invalid action" });
        }
    
        // If you're using AdminNotification, you can remove it here
        await AdminNotification.destroy({
          where: { CharityId: charityId }
        });
    
        // Emit socket event to admin
        io.to('admin').emit('charity approval', { charityId, action });
    
        res.json({ message: `Charity ${action}d successfully` });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Approval action failed" });
      }
}
exports.approvedCharity=async(req,res)=>{
    try {
        const approvedCharities = await Charity.findAll({
          where: { approved: true }
        });
        res.json(approvedCharities);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch approved charities" });
      }
}