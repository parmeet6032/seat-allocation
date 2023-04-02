import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeatService } from '../seat.service';

@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.css']
})

export class BookSeatComponent {
  seatsToBook: number = 0;
  pristine: boolean = true;
  error: boolean = false;
  errorMessage: string = "Error";
  successMessage: string = "Success";

  constructor(private seat: SeatService) {
  }

  onSubmit(form: NgForm) {
    let result = this.seat.bookSeats(this.seatsToBook);
    this.pristine = false;

    if (result.error) {
      this.error = true;
      this.errorMessage = result.data;
    } else {
      this.error = false;
      this.successMessage = getSuccessMessage(result.data);
    }
  }
}

function getSuccessMessage(data: string): string {
  let seats: string;
  let arr: number[] = [];

  data.split(" ").slice(0, -1).forEach(d => {
    arr.push(Number(d) + 1);
  })

  seats = arr.toString().split(",").join(", ");

  return "Seats booked: " + seats;
}