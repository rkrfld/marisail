const nodemailer = require('nodemailer');

function emailSender(user) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marisailwithus@gmail.com',
        pass: 'Marisail19'
    }
  });
  
  let mailOptions = {
    from: 'marisailwithus@gmail.com',
    to: `email`,
    subject: 'Welcome aboard',
    text: `Welcome 
    this is your ticket detail `
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
  })
}
