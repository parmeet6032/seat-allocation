let seats: boolean[], vacantSeats: number;

function Driver() {
	seats = new Array<boolean>(80);
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

	let result = bookSeats(8);
	console.log("For input 8:", result);

	result = bookSeats(3);
	console.log("For input 3:", result);

	result = bookSeats(5);
	console.log("For input 5:", result);

	result = bookSeats(7);
	console.log("For input 7:", result);

	display();

	// 2D matrix
	let Result = transform(seats, 7);
	for (let i = 0; i < Result.length; i++) {
		for (let j = 0; j < Result[i].length; j++) {
			process.stdout.write(Result[i][j] + "\t");
		}
		console.log('\n');
	}
}

export function bookSeats(seatsToBook: number) {
	if (seatsToBook > 7 || seatsToBook <= 0) {
		return "Invalid input. Seats to book can range from 1 to 7.";
	}

	let seatsBooked: string = "";

	if (seatsToBook > vacantSeats) {
		return "Seats unavailable";
	}

	// check for same row
	let startingIndex = getIndexSameRow(seatsToBook);

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

function setVacantToFilled(startIndex: number, seatsToBook: number) {
	let seatsBooked = "";

	for (let i = startIndex; seatsToBook > 0 && i < 80; i++) {
		if (seats[i] == false) {
			seats[i] = true;
			seatsToBook--; // seat booked
			seatsBooked += i + " ";
		}
	}
	return seatsBooked;
}

function getIndexNearestSeats(seatsToBook: number) {
	let minSize = Infinity;
	let startIndex = -1;

	let count = 0;
	let start = 0;
	let end = 0;

	for (let i = 0; i < 80; i++) {
		end = i;

		if (seats[i] == false) {
			count++;

			if (count == seatsToBook) {
				// remove preceding already booked seats from window
				while (seats[start] == true) {
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
function getIndexSameRow(seatsToBook: number) {
	let rowIndex = -1;

	for (let i = 0; i < 80; i += 7) {
		let vacant = 0; // in same row

		for (let j = i; j < i + 7 && j < 80; j++) {
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

export function transform(seats: boolean[], COLS: number) {
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

function display() {
	for (let i = 0; i < 80; i += 7) {
		process.stdout.write("Row " + ((i / 7) + 1) + ": ");
		for (let j = i; j < i + 7 && j < 80; j++) {
			process.stdout.write(seats[j] + "\t");
		}
		console.log('\n');
	}
}

Driver();