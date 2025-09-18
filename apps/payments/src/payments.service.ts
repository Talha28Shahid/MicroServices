import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE, CreatePaymentDto } from '@app/common';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notifications: ClientProxy,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createPayment({ card, amount, email }: PaymentCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    // const token = await this.stripe.tokens.create({
    //   card: {
    //     number: card.number,
    //     exp_month: card.exp_month.toString(),
    //     exp_year: card.exp_year.toString(),
    //     cvc: card.cvc,
    //   },
    // } as Stripe.TokenCreateParams);

    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   amount,
    //   currency: 'usd',
    //   payment_method: paymentMethod.id,
    //   confirm: true,
    //   payment_method_types: ['card'],
    // });

    const charge = await this.stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      source: 'tok_visa',
    });
    this.notifications.emit('notify-email', {
      email,
    });

    return charge;
  }
}
