import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: this.configService.get<string>('SENDGRID_API_KEY'),
      },
    });
  }

  async sendEmail(data: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: 'talhashahid392392@gmail.com',
      to: 'Talhashahid392392@outlook.com',
      subject: 'Welcome to Our App!',
      text: 'Thanks for reservation ',
      html: '<h1>Welcome!</h1><p>Thanks for joining us.</p>',
    });
  }
}
