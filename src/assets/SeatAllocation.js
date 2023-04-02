"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.bookSeats = void 0;
var seats, vacantSeats;
function Driver() {
    seats = new Array(80);
    vacantSeats = 57;
    seats.fill(false);
    seats.fill(true, 0, 10);
    seats.fill(true, 77, 80);
    seats[1 * 7 + 5] = true;
    seats[2 * 7 + 2] = true;
    seats[3 * 7] = true;
    seats[4 * 7] = true;
    seats[5 * 7] = true;
    seats[6 * 7] = true;
    seats[7 * 7] = true;
    seats[8 * 7] = true;
    seats[9 * 7] = true;
    seats[10 * 7] = true;
    display();
    var result = bookSeats(8);
    console.log("For input 8:", result);
    result = bookSeats(3);
    console.log("For input 3:", result);
    result = bookSeats(5);
    console.log("For input 5:", result);
    result = bookSeats(7);
    console.log("For input 7:", result);
    display();
    // 2D matrix
    var Result = transform(seats, 7);
    for (var i = 0; i < Result.length; i++) {
        for (var j = 0; j < Result[i].length; j++) {
            process.stdout.write(Result[i][j] + "\t");
        }
        console.log('\n');
    }
}
function bookSeats(seatsToBook) {
    if (seatsToBook > 7 || seatsToBook <= 0) {
        return "Invalid input. Seats to book can range from 1 to 7.";
    }
    var seatsBooked = "";
    if (seatsToBook > vacantSeats) {
        return "Seats unavailable";
    }
    // check for same row
    var startingIndex = getIndexSameRow(seatsToBook);
    console.log("Available in same row:", (startingIndex != -1) ? true : false);
    if (startingIndex == -1) {
        // check for nearest seats
        startingIndex = getIndexNearestSeats(seatsToBook);
    }
    // book seats
    seatsBooked = setVacantToFilled(startingIndex, seatsToBook);
    vacantSeats -= seatsToBook;
    return seatsBooked;
}
exports.bookSeats = bookSeats;
function setVacantToFilled(startIndex, seatsToBook) {
    var seatsBooked = "";
    for (var i = startIndex; seatsToBook > 0 && i < 80; i++) {
        if (seats[i] == false) {
            seats[i] = true;
            seatsToBook--; // seat booked
            seatsBooked += i + " ";
        }
    }
    return seatsBooked;
}
function getIndexNearestSeats(seatsToBook) {
    var minSize = Infinity;
    var startIndex = -1;
    var count = 0;
    var start = 0;
    var end = 0;
    for (var i = 0; i < 80; i++) {
        end = i;
        if (seats[i] == false) {
            count++;
            if (count == seatsToBook) {
                // remove preceding already booked seats from window
                while (seats[start] == true) {
                    start++;
                }
                var size = end - start + 1;
                if (size < minSize) {
                    // got a smaller window size containing seatToBook
                    startIndex = start;
                    minSize = size;
                }
            }
            else if (count > seatsToBook) {
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
function getIndexSameRow(seatsToBook) {
    var rowIndex = -1;
    for (var i = 0; i < 80; i += 7) {
        var vacant = 0; // in same row
        for (var j = i; j < i + 7 && j < 80; j++) {
            if (seats[j] == false) {
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
function transform(seats, COLS) {
    var n = seats.length;
    var ROWS = n / COLS;
    if (n % COLS > 0) {
        ROWS++;
    }
    var result = [];
    for (var i = 0; i < n; i += COLS) {
        var ROW = i / COLS;
        result[ROW] = seats.slice(i, i + COLS);
    }
    return result;
}
exports.transform = transform;
function display() {
    for (var i = 0; i < 80; i += 7) {
        process.stdout.write("Row " + ((i / 7) + 1) + ": ");
        for (var j = i; j < i + 7 && j < 80; j++) {
            process.stdout.write(seats[j] + "\t");
        }
        console.log('\n');
    }
}
Driver();
