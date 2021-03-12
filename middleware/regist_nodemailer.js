module.exports.sendConfirmationEmail = (name, email) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href="#> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};