// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

SENDGRID_API_KEY = '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';
const sgMail = require('@sendgrid/mail');

const send = async args => {
	try{
		sgMail.setApiKey(SENDGRID_API_KEY);
    	const msg = {
        to: args,
        from: 'test@example.com',
        subject: args.subject,
        text: args.body,
    	};
    	sgMail.send(msg);
		return "success";
	} catch(err){
		console.log(err);
		return "fail";

	}
	
	 
    
}

module.exports = {
    send
};