import { findOne } from "../../DB/db.services.js";
import cartModel from "../../DB/models/cartModel.js";
import ordersModel from "../../DB/models/orders.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponce } from "../../utils/Response.js";
import * as paypal from "./PayPal-Componnet/paypal.js"
import axios from 'axios';
import qs from 'querystring';

export const placeOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;

    const order = await findOne({
        model: ordersModel,
        filter: { Userid: _id }
    });

    if (!order) {
        return next(new Error("No order found", { cause: 400 }));
    }

    const appreovHref = await paypal.CreateOrder({ value: order.totalPrice, user_id: _id })
    console.log({ appreovHref })
    // Create payment record (you might want to store the PayPal order ID)
    const UpdateOrder = await ordersModel.findByIdAndUpdate(order._id, {
        $set: {
            status: "pending",
        },
        $inc: { __v: 1 }
    });

    successResponce({
        res: res,
        status: 200,
        data: appreovHref
    });
});

export const confirmOrder = asyncHandler(async (req, res, next) => {
    const orderId = req.query.token
    const userID = req.query.user_id
    const response = await paypal.captureOrder(orderId)

    if (response == "APPROVED") {
        const order = await ordersModel.findOneAndUpdate({
            Userid: userID
        }, {
            $set: {
                status: "completed"
            },
            $inc: {
                __v: 1
            }
        })
        // console.log({order})
    }

    successResponce({ res: res, status: 200, data: response })
})




export const cancelOrder = asyncHandler(async (req, res, next) => {
    const orderId = req.query.token
    const userID = req.query.user_id
    // const response = await paypal.captureOrder(orderId)
    const order = await ordersModel.findOneAndUpdate({
        Userid: userID
    }, {
        $set: {
            status: "cancelled"
        },
        $inc: {
            __v: 1
        }
    })
    console.log({order})
    successResponce({ res: res, status: 200, message: "Order Cancelled successfully" })
})

// return_url: `${process.env.BASE_URL}/api/v1/payment/confirmOrder?userId=${userId}&token=${encodeURIComponent(token)}`,


async function orderRequest(value) {
    const accessToken = await paypal.genratPayPalToken();

    const orderData = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: value
                }
            }
        ],
        application_context: {
            return_url: `${process.env.BASE_URL}:${process.env.PORT}/api/v1/payment/confirmOrder`,
            cancel_url: `${process.env.BASE_URL}:${process.env.PORT}/cancel`,
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            brand_name: 'ITI Mearn Stack'
        }
    };

    const response = await axios.post(
        'https://api-m.sandbox.paypal.com/v2/checkout/orders',
        orderData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    );

    const createdOrder = response.data;
    const approveLink = createdOrder.links.find(link => link.rel === "approve");
    const appreovHref = approveLink.href;

    return appreovHref
}
