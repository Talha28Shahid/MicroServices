import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  async sendEmail(data: NotifyEmailDto) {
    // Simulate sending an email
    console.log(`Sending email to ${data.email}`);
    return { success: true };
  }
}
