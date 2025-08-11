import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONMONGODB_URI: Joi.string().uri().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
