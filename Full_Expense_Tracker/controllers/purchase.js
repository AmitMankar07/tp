const Razorpay=require('razorpay');
const Order=require('../models/orders');

const purchasepremium=async(req,res)=>{
    try {

        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        })
        const amount=100;
 rzp.orders.create({amount,currency:"INR"},(err,order)=>{

    rzp.orders.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
        return res.status(201).json({order,key_id:rzp.key_id});
    }).catch(err=>{
        throw new Error(err)
    })
 })       
    }catch(err){
        console.log(err);
        res.status(403).json({message:'something went wrong'})
    }
}

        