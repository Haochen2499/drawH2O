const mailConfig = require("../config").mail;
const nodeMailer = require("nodeMailer");

const { host, port, user, password: pass, userName } = mailConfig;

const params = {
  pool: true,
  host,
  port,
  secure: true,
  auth: { user, pass },
};
const transporter = nodeMailer.createTransport(params);
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

module.exports = { sendMail };
