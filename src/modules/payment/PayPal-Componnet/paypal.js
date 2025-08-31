import * as paypalSdk from '@paypal/checkout-server-sdk';

// Destructure the needed classes from the SDK
const { orders } = paypalSdk.default;
import client from './paypalClient.js';
import { genrateToken } from '../../../utils/secuirty/token.services.js';
// Create order
export const createOrder = async function createOrder(order, currency = 'USD') {
    const request = new orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: currency,
                value: order.totalPrice,
                breakdown: {
                    item_total: {
                        currency_code: currency,
                        value: order.totalPrice
                    }
                }
            },
            items: [
                {
                    name: "Test Item",
                    description: "Test Item Description",
                    quantity: "1",
                    unit_amount: {
                        currency_code: currency,
                        value: order.totalPrice
                    }
                }
            ]
        }],
        application_context: {
            brand_name: "Your Store Name",
            landing_page: "BILLING",
            user_action: "PAY_NOW",
            return_url: `${process.env.BASE_URL}:${process.env.PORT}/payment/confirmOrder?OrderID=${order._id}`,
            cancel_url: `${process.env.BASE_URL}:${process.env.PORT}`
        }

    });

    console.log(request)
    try {
        const order = await client().execute(request);
        return order.result;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

// Capture order
export const captureOrder = async function captureOrder(orderID) {
    const request = new orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await client().execute(request);
        return capture.result;
    } catch (error) {
        console.error('Error capturing order:', error);
        throw error;
    }
}

// Get order details
export const getOrder = async function getOrder(orderID) {
    const request = new orders.OrdersGetRequest(orderID);

    try {
        const order = await client().execute(request);
        return order.result;
    } catch (error) {
        console.error('Error getting order:', error);
        throw error;
    }
}