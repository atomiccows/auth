import { Injectable } from '@nestjs/common';

import { Config } from '../config/config';

@Injectable()
export class MailerService {
  constructor() {}

  async sendEmail(to, subject, text) {
    const { host, port, user, pass, sender, replyEmail } = Config.email;
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
      },
    });
    const mailOptions = {
      from: sender,
      to,
      replyTo: replyEmail,
      subject,
      text,
    };
    try {
      return await transporter.sendMail(mailOptions);
    } catch (e) {
      return e;
    }
  }
}
