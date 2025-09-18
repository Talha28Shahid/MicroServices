import { CreatePaymentDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentCreateChargeDto extends CreatePaymentDto {
  @IsEmail()
  email: string;
}
