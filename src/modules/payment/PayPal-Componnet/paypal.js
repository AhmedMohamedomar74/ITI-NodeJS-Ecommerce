import { asyncHandler } from "./../../../utils/asyncHandler.js";
import axios from 'axios';
import qs from 'querystring';

export const genratPayPalToken = async () => {
    const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

    const response = await axios({
        method: 'post',
        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET
        },
        data: qs.stringify({
            grant_type: 'client_credentials'
        })
    });

    return response.data.access_token;
}

export const CreateOrder = async ({ currency_code = "USD", value }) => {
    const accessToken = await genratPayPalToken();
    
    const orderData = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: currency_code,
                    value: value
                }
            }
        ],
        application_context: {
            return_url: `${process.env.BASE_URL}:${process.env.PORT}/payment/confirmOrder`,
            cancel_url: `${process.env.BASE_URL}:${process.env.PORT}/payment/cancel`,
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
    
    console.log({ createdOrder, approveLink, appreovHref });
    
    // Return an object with the href instead of just the string
    return appreovHref
}

export const captureOrder = async (orderId) => {
    const accessToken = await genratPayPalToken();
    console.log({ accessTokenInCaptureOrder: accessToken, orderId });

    // 1. Check order status (Optional but good practice)
    const orderDetails = await axios.get(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    );
    console.log("Order Status before capture:", orderDetails.data.status);

    // Optional: Check if it's already completed to avoid errors
    if (orderDetails.data.status === "COMPLETED") {
        console.log("Order is already COMPLETED.");
        return orderDetails.data; // Return the completed order data
    }

    if (orderDetails.data.status !== "APPROVED") {
        throw new Error(`Cannot capture order. Order status is: ${orderDetails.data.status}. It must be APPROVED.`);
    }

    // 2. THIS IS THE CRITICAL PART: MAKE THE CAPTURE REQUEST
    const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        {}, // Empty request body for a full capture
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Prefer': 'return=representation' // Tells PayPal to send the full order details in the response
            }
        }
    );

    // 3. The response from the CAPTURE call will have status: "COMPLETED"
    const capturedOrder = response.data;
    console.log("Order Status after capture:", capturedOrder.status); // This will now be "COMPLETED"

    // 4. Return the full capture response, not just the status
    return capturedOrder;
};