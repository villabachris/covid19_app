const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);

// Setup Twilio SendGrid Mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.TWILIO_SENDGRD_API_KEY);

const TwilioService = {
    sendMessages,
    sendMail,
    buildAlertMessage,
    buildAlertMail
};

async function sendMessages( recipient, message ) {
    const sendResponse = await client.message.create({
        body: message,
        from: process.env.TWILIO_NUMBER,
        to: recipient
    });

    return sendResponse;
}

async function sendMail( msgObject ) {
    msgObject.from = process.env.TWILIO_SENDGRD_VERIFIED_EMAIL;
    const mailSentResponse = await sgMail.send(msgObject);

    return mailSentResponse;
}

async function buildAlertMessage( data ) {
    const message = `${data.new} new cases have been reported in ${data.location}\n
    Total Confirmed: ${data.confirmed}\n
    Total Discharged: ${data.discharged}\n
    Total Deaths: ${data.deaths}`;

    return message;
}

function buildAlertMail(data) {
    const htmlMail = `
        <html>
            <meta charset="utf-8" />
            <meta http-equiv="x-ua-compatible" content="ie=edge" />
        
            <title>COVID Alerts</title>
        
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <body>
            <h2><span style='color:blue'>${data.new}</span> new cases have been reported in ${data.location}</h2>

            <table>
                <tr>
                <td><b>Total Confirmed</b></td>
                <td>${data.confirmed}</td>
                </tr>

                <tr>
                <td><b>Total Discharged</b></td>
                <td>${data.discharged}</td>
                </tr>

                <tr>
                <td><b>Total Deaths</b></td>
                <td>${data.deaths}</td>
                </tr>
            </table>
            </body>
        </html>
    `;

    return htmlMail;
    }

module.exports = TwilioService;