import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentDto } from '../../../libs/common/src/dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createPayment({ card, amount }: CreatePaymentDto) {
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

    return charge;
  }
}
