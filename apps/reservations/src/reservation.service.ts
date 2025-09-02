import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationService: ReservationsRepository) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationService.create({
      ...createReservationDto,
      timeStamp: new Date(),
      userId: '1',
    });
  }

  findAll() {
    return this.reservationService.find({});
  }

  findOne(_id: string) {
    return this.reservationService.find({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationService.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reservationService.delete({ _id });
  }
}
