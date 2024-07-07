import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  service: "qq",
  port: 465,
  secure: true,
  auth: config.qqEmail.auth,
});

function sendMail(mail, code, call) {
  const mailOptions = {
    from: `"Express-demo" <${config.qqEmail.auth.user}>`,
    to: mail,
    subject: "Matar 验证码",
    html: `您的验证码为：<span style="font-size:2rem;color:red;">${code}</span>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) call(false);
    else call(true);
  });
}

module.exports = sendMail;
