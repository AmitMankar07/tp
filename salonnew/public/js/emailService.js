// emailService.js
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure SendinBlue API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.YOUR_SENDINBLUE_API_KEY; // Replace with your SendinBlue API key

async function sendBookingEmail(userEmail, serviceDetails) {
    const emailData = {
        sender: { email: 'amitmankar1920@gmail.com', name: 'Your Company Name' }, // Replace with your sender email and name
        to: [{ email: userEmail }],
        subject: 'Appointment Confirmation',
        htmlContent: `<html><body><h1>Appointment Booked</h1><p>Your appointment for ${serviceDetails.name} has been successfully booked.</p><p>Details:</p><ul>
            <li>Service: ${serviceDetails.name}</li>
            <li>Duration: ${serviceDetails.duration}</li>
            <li>Price: ${serviceDetails.price}</li>
            <li>Description: ${serviceDetails.description}</li>
        </ul></body></html>`,
    };

    try {
        const response = await apiInstance.sendTransacEmail(emailData);
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendBookingEmail };