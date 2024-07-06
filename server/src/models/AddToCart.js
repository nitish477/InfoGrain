import {Schema, model} from 'mongoose';

const addtocartSchama= new Schema({
    Name:{
      type:String,
      required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Image:{
        type:String
    },
    Id:{
        type:String,
        required:true
    },
    User:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
})

const  addtocart=model('addtocart',addtocartSchama)

export default addtocart
