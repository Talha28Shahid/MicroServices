import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationService: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private paymentsClient: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, _id }: UserDto,
  ) {
    this.paymentsClient
      .send('create_payment', {
        ...createReservationDto.charge,
        email,
      })
      .subscribe((res) => {
        return this.reservationService.create({
          ...createReservationDto,
          invoiceId: res.id,
          timeStamp: new Date(),
          userId: _id,
        });
      });
  }

  async findAll() {
    return this.reservationService.find({});
  }

  async findOne(_id: string) {
    return this.reservationService.find({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationService.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationService.delete({ _id });
  }
}
