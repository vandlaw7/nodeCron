// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

SENDGRID_API_KEY = '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';
const sgMail = require('@sendgrid/mail');

const send = async args => {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
        to: args.email,
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}

module.exports = {
    send
};