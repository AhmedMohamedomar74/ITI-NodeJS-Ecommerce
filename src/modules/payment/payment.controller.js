import { findOne } from "../../DB/db.services.js";
import cartModel from "../../DB/models/cartModel.js";
import ordersModel from "../../DB/models/orders.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponce } from "../../utils/Response.js";
import * as paypal from "./PayPal-Componnet/paypal.js"

export const placeOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    // console.log(_id)
    const order = await findOne({
        model: ordersModel, filter:
        {
            Userid: _id
        }
    })
    console.log({ order })
    if (order == null) {
        // console.log({order})
        next(new Error("no order found"), { cause: 400 })
        return
    }
    const Payment = await paypal.createOrder(order, "USD");
    console.log({Payment})
    const UpdateOrder = await ordersModel.findByIdAndUpdate(order._id , {
        $set:{PaymentID: Payment.id},
        $inc : {__v : 1}
    })
    console.log({UpdateOrder}) 
    successResponce({
        res: res, status: 200, data: {
            PaymentID: Payment.id,
            status: Payment.status,
            links: Payment.links
        }
    })
})

export const confirmOrder = asyncHandler(async (req, res, next) => {
    const OrderID  = req.query.OrderID
    // console.log(req.user)
    const order = await ordersModel.findByIdAndUpdate(OrderID , {
        $set : {
            status : "completed"
        },
        $inc:{
            __v : 1
        }
    })
    successResponce({data : order ,res: res, status: 200})
    console.log({ order })
})

// return_url: `${process.env.BASE_URL}/api/v1/payment/confirmOrder?userId=${userId}&token=${encodeURIComponent(token)}`,