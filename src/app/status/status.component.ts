import { Component } from '@angular/core';
// import { bookSeats, transform } from 'src/assets/SeatAllocation';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent {
  seats: boolean[];
  vacantSeats: number;
  seats2D: boolean[][];
  COLUMNS: number;

  constructor() {
    this.seats = new Array<boolean>(80).fill(false);

    this.seats.fill(true, 0, 10);
    this.seats.fill(true, 77, 80);
    this.vacantSeats = 67;

    this.COLUMNS = 7;

    this.seats2D = transform(this.seats, this.COLUMNS);
  }
}

function transform(seats: boolean[], COLS: number) {
  let n = seats.length;
  let ROWS = n / COLS;

  if (n % COLS > 0) {
    ROWS++;
  }

  let result: boolean[][] = [];

  for (let i = 0; i < n; i += COLS) {
    let ROW = i / COLS;
    result[ROW] = seats.slice(i, i + COLS);
  }

  return result;
}
