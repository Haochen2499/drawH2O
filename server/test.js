const mailConfig = require("./config").mail;
const nodemailer = require("nodemailer");

const { host, port, user, password: pass, userName } = mailConfig;

const params = {
  pool: true,
  host,
  port,
  secure: true,
  auth: { user, pass },
};
const transporter = nodemailer.createTransport(params);
/**
 * @param  {} to
 * @param  {} text=""
 * @param  {} subject=""
 * @param  {} html=""
 */

const sendMail = ({ to, text = "", subject = "", html = "" }) => {
  return new Promise((res, rej) => {
    transporter.sendMail(
      {
        from: `${userName}<${user}>`,
        to,
        subject,
        text,
        html,
      },
      (err, info) => {
        if (err) {
          rej({ type: "fail", err });
        } else {
          res({ type: "success" });
        }
      }
    );
  });
};

// transporter.sendMail(
//   {
//     from: `${userName}<${user}>`,
//     to: "1098982341@qq.com",
//     subject: "reset",
//     text: "here's your reset url: http://www.baidu.com",
//     html: "<a href='http://www.baidu.com'>testttt</a>",
//   },
//   (err, info) => {
//     console.log("err", err);
//     console.log("info", info);
//   }
// );

module.exports = sendMail;
