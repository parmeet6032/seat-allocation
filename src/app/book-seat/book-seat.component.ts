import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.css']
})
export class BookSeatComponent {
  bookingForm :NgForm;

  constructor(){
    
  }
  
  onSubmit() {
    console.log("Submitted");
    console.log(bookingForm.value);
    
  }
}
