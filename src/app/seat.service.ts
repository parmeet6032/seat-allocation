import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  seats: boolean[];
  vacantSeats: number;
  seats2D: boolean[][];
  COLUMNS = 7;

  constructor() {
    this.seats = new Array<boolean>(80).fill(false);
    this.seats.fill(true, 0, 10);
    this.seats[1 * 7 + 5] = true;
    this.seats[2 * 7 + 2] = true;
    this.seats[3 * 7] = true;
    this.seats[4 * 7] = true;
    this.seats[5 * 7] = true;
    this.seats[6 * 7] = true;
    this.seats[7 * 7] = true;
    this.seats[8 * 7] = true;
    this.seats[9 * 7] = true;
    this.seats[10 * 7] = true;

    this.vacantSeats = 60;

    this.seats2D = this.transform(this.seats, this.COLUMNS);
  }

  getColumns() {
    return this.COLUMNS;
  }

  getSeats2D() {
    return this.seats2D;
  }

  bookSeats(seatsToBook: number) {
    if (seatsToBook > 7 || seatsToBook <= 0) {
      return {
        error: true,
        data: "Invalid input. Number of seats to book can range from 1 to 7."
      };
    }

    if (seatsToBook > this.vacantSeats) {
      return {
        error: true,
        data: "Seats unavailable."
      };
    }

    let seatsBooked: string = "";

    // check for same row
    let startingIndex = this.getIndexSameRow(seatsToBook);

    console.log("Available in same row:", (startingIndex != -1) ? true : false);

    if (startingIndex == -1) {
      // check for nearest seats
      startingIndex = this.getIndexNearestSeats(seatsToBook);
    }
    // book seats
    seatsBooked = this.setVacantToFilled(startingIndex, seatsToBook);

    this.vacantSeats -= seatsToBook;
    this.seats2D = this.transform(this.seats, this.COLUMNS);

    return {
      error: false,
      data: seatsBooked
    }
  }

  private setVacantToFilled(startIndex: number, seatsToBook: number) {
    let seatsBooked = "";

    for (let i = startIndex; seatsToBook > 0 && i < 80; i++) {
      if (this.seats[i] == false) {
        this.seats[i] = true;
        seatsToBook--; // seat booked
        seatsBooked += i + " ";
      }
    }
    return seatsBooked;
  }

  private getIndexNearestSeats(seatsToBook: number) {
    let minSize = Infinity;
    let startIndex = -1;

    let count = 0;
    let start = 0;
    let end = 0;

    for (let i = 0; i < 80; i++) {
      end = i;

      if (this.seats[i] == false) {
        count++;

        if (count == seatsToBook) {
          // remove preceding already booked seats from window
          while (this.seats[start] == true) {
            start++;
          }

          let size = end - start + 1;

          if (size < minSize) {
            // got a smaller window size containing seatToBook
            startIndex = start;
            minSize = size;
          }
        } else if (count > seatsToBook) {
          // lose a vacant seat
          start++;
          count--;
          // re-check for the current i
          i--;
          count--;
        }
      }
    }
    return startIndex;
  }

  // returns starting index of row
  private getIndexSameRow(seatsToBook: number) {
    let rowIndex = -1;

    for (let i = 0; i < 80; i += 7) {
      let vacant = 0; // in same row

      for (let j = i; j < i + 7 && j < 80; j++) {
        if (this.seats[j] == false) {
          vacant++;
        }
      }

      if (vacant >= seatsToBook) {
        rowIndex = i;
        break;
      }
    }

    return rowIndex;
  }

  private transform(seats: boolean[], COLS: number) {
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
}
