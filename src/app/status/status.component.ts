import { Component } from '@angular/core';
import { SeatService } from '../seat.service';
// import { bookSeats, transform } from 'src/assets/SeatAllocation';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent {
  COLUMNS: number;
  seats2D: boolean[][];

  constructor(private seatService: SeatService) {
    this.COLUMNS = seatService.getColumns();
    this.seats2D = seatService.getSeats2D();
  }
}