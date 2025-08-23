import nodemailer from "nodemailer"

export const sendEmail = ({from = process.env.GOOGLE_EMAIL , subject  = "" , to = "" , text = "" , html = "" , attachments = {} , cc = "" , appName = "SarahaApp"}) => {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASSWORD,
        },
    });

    // Wrap in an async IIFE so we can use await.
    (async () => {
        const info = await transporter.sendMail({
            from: `${appName} <${from}>`,
            to: to,
            subject: subject,
            text: text, // plain‑text body
            html: html, // HTML body
            attachments: attachments,
            cc : cc
        });

        console.log("Message sent:", info.messageId);
    })();
}