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
    to: `${user.email}`,
    subject: `Welcome aboard ${user.fullName}`,
    text: `Welcome ${user.fullName}
    this is your ticket detail:
      Passanger: ${user.fullName}
      Passanger NIK: ${user.nik}
      Book Code: ${user.bookCode}
      
      Warmest regards `
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
  })
}

module.exports = emailSender
