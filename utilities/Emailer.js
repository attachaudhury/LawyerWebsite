var nodemailer = require('nodemailer');

module.exports = class Emailer {
  constructor(subject, jsonBody) {
    this.from = "admin@estateplanners.pk";
    this.to = "info@estateplanners.pk";
    this.subject = `Message from estateplanners.pk :: ${subject} ::`;
    this.bodytext =''
    this.bodyhtml ='';
    for (var key in jsonBody) {
      if (jsonBody.hasOwnProperty(key)) {
        this.bodytext += `${key} ->  ${jsonBody[key]} \n`;
        this.bodyhtml += `<p><strong>${key} </strong>(${jsonBody[key]})</p><br>`;
      }
    }
    this.sendViaSendGrid();
  }
  async sendViaSendGrid() {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey("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");
      const msg = {
        to: this.to,
        from: this.from,
        subject: this.subject,
        text: this.bodytext,
        html: this.bodyhtml,
      };
      sgMail.send(msg).then(res => {
        //console.log(res)
      }).catch(res => {
        //console.log(res)
      });
    } catch (ex) {
      //console.log(ex)
    }

  }
  async sendViaNodeMailer() {
    console.log('Sending Email')
    try {
      let testAccount = { user: 'info@estateplanners.pk', pass: 'info@135' };
      // console.log(testAccount)
      let transporter = nodemailer.createTransport({
        host: "smtp.yandex.com",
        port: 465,
        secure: true,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      let info = await transporter.sendMail({
        from: `"Info 👻" <${testAccount.user}>`,
        to: "attachaudhury@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });
      console.log(info)
    } catch (ex) {
      console.log(ex)
    }
  }
}