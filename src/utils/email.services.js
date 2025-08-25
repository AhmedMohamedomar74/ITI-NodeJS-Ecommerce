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


// export const template = (email) => {
//     return `
//     <!-- Free to use, HTML email template designed & built by FullSphere. Learn more about us at www.fullsphere.co.uk -->

// <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

// <head>

//   <!--[if gte mso 9]>
//   <xml>
//     <o:OfficeDocumentSettings>
//       <o:AllowPNG/>
//       <o:PixelsPerInch>96</o:PixelsPerInch>
//     </o:OfficeDocumentSettings>
//   </xml>
//   <![endif]-->

//   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta name="x-apple-disable-message-reformatting">
//   <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->

//     <!-- Your title goes here -->
//     <title>Newsletter</title>
//     <!-- End title -->

//     <!-- Start stylesheet -->
//     <style type="text/css">
//       a,a[href],a:hover, a:link, a:visited {
//         /* This is the link colour */
//         text-decoration: none!important;
//         color: #0000EE;
//       }
//       .link {
//         text-decoration: underline!important;
//       }
//       p, p:visited {
//         /* Fallback paragraph style */
//         font-size:15px;
//         line-height:24px;
//         font-family:'Helvetica', Arial, sans-serif;
//         font-weight:300;
//         text-decoration:none;
//         color: #000000;
//       }
//       h1 {
//         /* Fallback heading style */
//         font-size:22px;
//         line-height:24px;
//         font-family:'Helvetica', Arial, sans-serif;
//         font-weight:normal;
//         text-decoration:none;
//         color: #000000;
//       }
//       .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
//       .ExternalClass {width: 100%;}
//     </style>
//     <!-- End stylesheet -->

// </head>

//   <!-- You can change background colour here -->
//   <body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000" align="center">
  
//   <!-- Fallback force center content -->
//   <div style="text-align: center;">

//     <!-- Email not displaying correctly -->
//     <table align="center" style="text-align: center; vertical-align: middle; width: 600px; max-width: 600px;" width="600">
//       <tbody>
//         <tr>
//           <td style="width: 596px; vertical-align: middle;" width="596">

//             <p style="font-size: 11px; line-height: 20px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #000000;">Is this email not displaying correctly? <a class="link" style="text-decoration: underline;" target="_blank" href="https://fullsphere.co.uk/html-emails/free-template/"><u>Click here</u></a> to view in browser</p>

//           </td>
//         </tr>
//       </tbody>
//     </table>
//     <!-- Email not displaying correctly -->
    
//     <!-- Start container for logo -->
//     <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
//       <tbody>
//         <tr>
//           <td style="width: 596px; vertical-align: top; padding-left: 0; padding-right: 0; padding-top: 15px; padding-bottom: 15px;" width="596">

//             <!-- Your logo is here -->
//             <img style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;" alt="Logo" src="https://fullsphere.co.uk/misc/free-template/images/logo-white-background.jpg" align="center" width="180" height="85">

//           </td>
//         </tr>
//       </tbody>
//     </table>
//     <!-- End container for logo -->

//     <!-- Hero image -->
//     <img style="width: 600px; max-width: 600px; height: 350px; max-height: 350px; text-align: center;" alt="Hero image" src="https://fullsphere.co.uk/misc/free-template/images/hero.jpg" align="center" width="600" height="350">
//     <!-- Hero image -->

//     <!-- Start single column section -->
//     <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
//         <tbody>
//           <tr>
//             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">

//               <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">Single column, dolor sit amet</h1>

//               <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis ante sed imperdiet euismod. Vivamus fermentum bibendum turpis, et tempor dui. Sed vitae lectus egestas, finibus purus ac, rutrum mauris.</p>              

//               <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">You can download this template <a target="_blank" style="text-decoration: underline; color: #000000;" href="https://fullsphere.co.uk/misc/free-template/html-email-template.zip" download="HTML Email Template"><u>here</u></a></p>

//               <!-- Start button (You can change the background colour by the hex code below) -->
//               <a href="http://localhost:3000/auth/verify/${email}" target="_blank" style="background-color: #000000; font-size: 15px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; padding: 12px 15px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;">
//                   <!--[if mso]>
//                   <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
//                 <![endif]-->

//                   <span style="mso-text-raise: 15pt; color: #ffffff;">Verify</span>
//                   <!--[if mso]>
//                   <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
//                 <![endif]-->
//               </a>
//               <!-- End button here -->

//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!-- End single column section -->
      
//       <!-- Start image -->
//       <img style="width: 600px; max-width: 600px; height: 240px; max-height: 240px; text-align: center;" alt="Image" src="https://fullsphere.co.uk/misc/free-template/images/image-2.jpg" align="center" width="600" height="240">
//       <!-- End image -->

//       <!-- Start heading for double column section -->
//       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
//         <tbody>
//           <tr>
//             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 0;" width="596">

//               <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000; margin-bottom: 0;">Double column, dolor sit amet</h1>

//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!-- End heading for double column section -->

//       <!-- Start double column section -->
//       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
//         <tbody> 
//             <tr>      
//               <td style="width: 252px; vertical-align: top; padding-left: 30px; padding-right: 15px; padding-top: 0; padding-bottom: 30px; text-align: center;" width="252">

//                 <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">Vivamus felis velit, iaculis eu eros sed, consequat viverra libero. Aliquam ipsum eros, imperdiet eget fermentum eget, cursus a sapien.</p>
              
//               </td>

//               <td style="width: 252px; vertical-align: top; padding-left: 15px; padding-right: 30px; padding-top: 0; padding-bottom: 30px; text-align: center;" width="252">              
//                 <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">Pellentesque mollis bibendum sollicitudin. Aenean tempor eros at risus mollis gravida. Aenean in urna eget elit pretium ultrices eu vitae elit.</p>

//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!-- End double column section -->

//       <!-- Start image -->
//       <img style="width: 600px; max-width: 600px; height: 240px; max-height: 240px; text-align: center;" alt="Image" src="https://fullsphere.co.uk/misc/free-template/images/image-3.jpg" align="center" width="600" height="240">
//       <!-- End image -->

//       <!-- Start footer -->
//       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #000000;" width="600">
//         <tbody>
//           <tr>
//             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;" width="596">

//               <!-- Your inverted logo is here -->
//               <img style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;" alt="Logo" src="https://fullsphere.co.uk/misc/free-template/images/logo-black-background.jpg" align="center" width="180" height="85">

//               <p style="font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
//                 Address line 1, London, L2 4LN
//               </p>

//               <p style="margin-bottom: 0; font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
//                 <a target="_blank" style="text-decoration: underline; color: #ffffff;" href="https://fullsphere.co.uk">
//                   www.fullsphere.co.uk
//                 </a>
//               </p>

//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!-- End footer -->
    
//       <!-- Start unsubscribe section -->
//       <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px;" width="600">
//         <tbody>
//           <tr>
//             <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;" width="596">
              
//               <p style="font-size: 12px; line-height: 12px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; color: #000000;">
//                 Not wanting to receive these emails?
//               </p>

//               <p style="font-size: 12px; line-height: 12px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; color: #000000;">
//                 You can <a style="text-decoration: underline; color: #000000;" href="insert-unsubscribe-link-here"><u>unsubscribe here</u></a>
//               </p>

//               <p style="font-size: 12px; line-height: 12px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; color: #919293; margin-top: 30px;">
//                 Email template built by <a style="text-decoration: none; color: #919293;" href="https://fullsphere.co.uk"><u>FullSphere</u></a>
//               </p>

//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <!-- End unsubscribe section -->
  
//   </div>

//   </body>

// </html>
//     `

// }

export const template = (email) => {
  // const encodedEmail = encodeURIComponent(email);
  const verifyUrl = `http://localhost:${process.env.PORT}/auth/verify/${email}`;
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 30px;
            border: 1px solid #ddd;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Verify Your Email Address</h2>
        <p>Hello!</p>
        <p>Thank you for registering. Please click the button below to verify your email address:</p>
        
        <center>
            <a href="${verifyUrl}" class="button">Verify Email</a>
        </center>
        
        <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        
        <div class="footer">
            <p>If you didn't create an account with us, please ignore this email.</p>
            <p>This verification link will expire in 24 hours.</p>
        </div>
    </div>
</body>
</html>
  `;
};