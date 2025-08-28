import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    Userid: {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"  ,
        require : true
    }

    , products :[{
        productsId : {type : mongoose.Schema.Types.ObjectId , ref : "Product"},
        quantity : {type : Number , require : true},
        price : {type : Number , require : true} 
    }],
    totalPrice: {type : Number , require : true},
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }
} ,{ timestamps: true })

export default mongoose.model("Orders" , orderSchema)