import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSeatComponent } from './book-seat/book-seat.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: "seat-booking", component: BookSeatComponent },
  { path: "status", component: StatusComponent },
  { path: "", redirectTo: "seat-booking", pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
