let seats: boolean[], vacantSeats: number;

function Driver() {
	seats = new Array<boolean>(80);
	vacantSeats = 67;

	seats.fill(false);
	seats.fill(true, 0, 10);
	seats.fill(true, 77, 80);

	display();

	let result = bookSeats(8);
	console.log(result);

	display();

	let Result = transform(seats, 7);	// 2D matrix
	for (let i = 0; i < Result.length; i++) {
		for (let j = 0; j < Result[i].length; j++) {
			process.stdout.write(Result[i][j] + "\t");
		}
		console.log('\n');
	}
}

export function bookSeats(seatsToBook: number) {
	let seatsBooked: string = "";

	if (seatsToBook > vacantSeats) {
		return "Seats unavailable";
	}

	let availableInSameRow: boolean = false;

	// check for same row
	let rowIndex = getIndexSameRow(seatsToBook);
	if (rowIndex != -1) {
		availableInSameRow = true;
	}

	console.log("Available in same row: " + availableInSameRow);

	if (availableInSameRow == true) {
		// book seats
		let temp = seatsToBook;

		for (let j = rowIndex; j < rowIndex + 7 && j < 80 && temp > 0; j++) {
			if (seats[j] == false) {
				seats[j] = true;
				temp--; // seat booked
				seatsBooked += j + " ";
			}
		}
	} else {
		// check for nearest seats
		let temp = seatsToBook;

		let startingIndex = getIndexNearestSeats(seatsToBook);

		for (let j = startingIndex; temp > 0 && j < 80; j++) {
			if (seats[j] == false) {
				seats[j] = true;
				temp--; // seat booked
				seatsBooked += j + " ";
			}
		}
	}

	vacantSeats -= seatsToBook;
	return seatsBooked;
}

function getIndexNearestSeats(seatsToBook: number) {
	let size = Infinity;
	let startIndex = -1;

	let count = 0;
	let start = 0;
	let end = 0;

	for (let i = 0; i < 80; i++) {
		end = i;

		if (seats[i] == false) {
			count++;

			// remove preceding already booked seats from window
			if (count >= seatsToBook) {
				while (seats[start] == true) {
					start++;
				}
			}

			if (count == seatsToBook) {
				let ans = end - start + 1;

				if (size > ans) {
					startIndex = start;
					size = ans;
				}
			} else if (count > seatsToBook) {
				start++;
				let ans = end - start + 1;

				if (size > ans) {
					startIndex = start;
					size = ans;
				}
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