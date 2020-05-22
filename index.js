const express = require("express"),
 app = express(),
 bodyParser = require("body-parser");
const kue = require("./kue");
var cors = require('cors');
var path = require('path')


require("./worker");

const nodemailer = require('./nodemailer')

// support parsing of application/json type post data
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs')


app.post("/book-ticket", async (req, res) => {
	console.log("wow!");
 let args = {
   jobName: "sendEmail",
   time: 1000,
   params: {
     email: req.body.email,
     subject: "Booking Confirmed",
     body: "Your booking is confirmed!!"
   }
 };
 kue.scheduleJob(args);

 // Schedule Job to send email 10 minutes before the movie
 args = {
   jobName: "sendEmail",
   time: (req.body.start_time - 10 * 60) * 1000, // (Start time - 10 minutes) in millieconds
   params: {
     email: req.body.email,
     subject: "Movie starts in 10 minutes",
     body:
       "Your movie will start in 10 minutes. Hurry up and grab your snacks."
   }
 };
 kue.scheduleJob(args);

 // Return a response
 return res.status(200).json({ response: "Booking Successful!" });
});

app.post("/send-email", async (req, res) => {
	console.log("hello!");
  let emailLink = await nodemailer.send(req.body.email);
  return res.json({
    response: `Preview URL: ${emailLink}`
  });
});

app.get("/test", (req, res) => {  
 return res.json({ response: "It Worked!" });  
}); 

app.get("/main", (req, res) => {  
	res.sendFile(path.join(__dirname, "./public/main.html"))
}); 


app.listen(8080, () => console.log(`Hey there! I'm listening.`));