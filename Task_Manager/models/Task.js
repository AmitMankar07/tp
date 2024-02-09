const mongoose=require('mongoose');
const { boolean } = require('webidl-conversions');

const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
         required:[true,'must provide name'],
        trim:true,
        maxlength:[20,'name cant be long']
    },
    completed:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('Task',TaskSchema)