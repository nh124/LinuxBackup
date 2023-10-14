/*
Write a program that will search an array and fine two integers that add to the sum n. If this is found in the array 
it will return turn. Otherwise it will return false. 
You progma must be have a time complexity of O(N) of less. 
*/
import java.util.Arrays;
import java.util.Random;
import java.lang.*;
class Main {
  public static void main(String[] args) {
    arrayTargetSum ats = new arrayTargetSum();
    Random rand = new Random();

    long start = System.currentTimeMillis();

    int sum = rand.nextInt(9);
    int size = rand.nextInt(9);
    int [] arr = new int[size];
    for(int i = 0; i < arr.length; i++){
      arr[i] = rand.nextInt(9);
    }

    System.out.println("Original Array: " + Arrays.toString(arr));
    System.out.println("Sum: " +  sum + "\t Output: " + ats.arraySumSearch(arr, sum));  

    long end = System.currentTimeMillis();

    System.out.printf("Total time to execute this is: " + "%s ", (end - start) + " mili-Seconds " + (end-start)/(double)(1000) + " Seconds");
  }

}

// this progrma is executed in log(n) time complexity.
