import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    // For sandbox environment (testing)
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
    
    // For production, use:
    // return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
}

function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

// module.exports = {
//     client
// };


export default client