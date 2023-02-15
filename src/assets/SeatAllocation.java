package src.assets;
import java.util.*;

public class SeatAllocation {
  static boolean[] seats;
  static int vacantSeats;

  public static void main(String[] args) {
    seats = new boolean[80];
    vacantSeats = 67;

    Arrays.fill(seats, 0, 10, true);
    Arrays.fill(seats, 77, 80, true);
    display();

    String result = bookSeats(8);
    System.out.println(result);

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
    String seatsBooked = "";

    if (seatsToBook > vacantSeats) {
      return "Seats unavailable";
    }

    boolean availableInSameRow = false;

    // check for same row
    int rowIndex = getIndexSameRow(seatsToBook);
    if (rowIndex != -1) {
      availableInSameRow = true;
    }

    System.out.println("Available in same row: " + availableInSameRow);

    if (availableInSameRow == true) {
      // book seats
      int temp = seatsToBook;

      for (int j = rowIndex; j < rowIndex + 7 && j < 80 && temp > 0; j++) {
        if (seats[j] == false) {
          seats[j] = true;
          temp--; // seat booked
          seatsBooked += j + " ";
        }
      }
    } else {
      // check for nearest seats
      int temp = seatsToBook;

      int startingIndex = getIndexNearestSeats(seatsToBook);

      for (int j = startingIndex; temp > 0 && j < 80; j++) {
        if (seats[j] == false) {
          seats[j] = true;
          temp--; // seat booked
          seatsBooked += j + " ";
        }
      }
    }

    vacantSeats -= seatsToBook;
    printVacantSeats();

    return seatsBooked;
  }

  private static int getIndexNearestSeats(int seatsToBook) {
    int size = Integer.MAX_VALUE;
    int startIndex = -1;

    int count = 0;
    int start, end;
    start = end = 0;

    for (int i = 0; i < 80; i++) {
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
          int ans = end - start + 1;

          if (size > ans) {
            startIndex = start;
            size = ans;
          }
        } else if (count > seatsToBook) {
          start++;
          int ans = end - start + 1;

          if (size > ans) {
            startIndex = start;
            size = ans;
          }
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

      for (int j = i; j < i + 7 && j < 80; j++) {
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