import java.util.*;

public class SeatAllocation {
  static boolean[] seats;
  static int vacantSeats;

  public static void main(String[] args) {
    seats = new boolean[80];
    vacantSeats = 57;

    Arrays.fill(seats, 0, 10, true);
    Arrays.fill(seats, 77, 80, true);
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

    // 2D matrix
    String result = bookSeats(8);
    System.out.println("For input 8: " + result);

    result = bookSeats(3);
    System.out.println("For input 3: " + result);

    result = bookSeats(5);
    System.out.println("For input 5: " + result);

    result = bookSeats(7);
    System.out.println("For input 7: " + result);

    display();

    boolean[][] Result = transform(seats, 7);
    for (int i = 0; i < Result.length; i++) {
      for (int j = 0; j < Result[i].length; j++) {
        System.out.print(Result[i][j] + "\t");
      }
      System.out.println();
    }
  }

  static String bookSeats(int seatsToBook) {
    if (seatsToBook > 7 || seatsToBook <= 0) {
      return "Invalid input. Seats to book can range from 1 to 7.";
    }

    String seatsBooked = "";

    if (seatsToBook > vacantSeats) {
      return "Seats unavailable";
    }

    // check for same row
    int startingIndex = getIndexSameRow(seatsToBook);

    System.out.print("Available in same row: ");
    System.out.println(startingIndex != -1 ? true : false);

    if (startingIndex == -1) {
      // check for nearest seats
      startingIndex = getIndexNearestSeats(seatsToBook);
    }
    // book seats
    seatsBooked = setVacantToFilled(startingIndex, seatsToBook);

    vacantSeats -= seatsToBook;
    printVacantSeats();

    return seatsBooked;
  }

  private static String setVacantToFilled(int startingIndex, int seatsToBook) {
    String seatsBooked = "";

    for (int i = startingIndex; seatsToBook > 0 && i < 80; i++) {
      if (seats[i] == false) {
        seats[i] = true;
        seatsToBook--; // seat booked
        seatsBooked += i + " ";
      }
    }
    return seatsBooked;
  }

  private static int getIndexNearestSeats(int seatsToBook) {
    int minSize = Integer.MAX_VALUE;
    int startIndex = -1;

    int count = 0;
    int start, end;
    start = end = 0;

    for (int i = 0; i < 80; i++) {
      end = i;

      if (seats[end] == false) {
        count++;

        if (count == seatsToBook) {
          // remove preceding already booked seats from window
          while (seats[start] == true) {
            start++;
          }

          int size = end - start + 1;

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

  private static void printVacantSeats() {
    System.out.println("Vacant seats --> " + vacantSeats);
  }

  // returns starting index of row
  private static int getIndexSameRow(int seatsToBook) {
    int rowIndex = -1;

    for (int i = 0; i < 80; i += 7) {
      int vacant = 0; // in same row

      for (int j = i; j < 80 && j < i + 7; j++) {
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

  private static void display() {
    for (int i = 0; i < 80; i += 7) {
      System.out.print("Row " + ((i / 7) + 1) + ": ");
      for (int j = i; j < i + 7 && j < 80; j++) {
        System.out.print(seats[j] + "\t");
      }
      System.out.println();
    }
  }

  private static boolean[][] transform(boolean[] seats, int COLS) {
    int n = seats.length;
    int ROWS = n / COLS;

    if (n % COLS > 0) {
      ROWS++;
    }

    boolean[][] result = new boolean[ROWS][COLS];

    for (int i = 0; i < n; i += COLS) {
      int ROW = i / COLS;
      result[ROW] = Arrays.copyOfRange(seats, i, i + COLS);

      if (ROW == 11) { // last row with 3 seats
        result[11] = Arrays.copyOfRange(result[11], 0, 3);
      }
    }

    return result;
  }
}