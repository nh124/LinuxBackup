import java.util.Arrays;
import java.util.Random;
import java.lang.*;
public class arrayTargetSum {
    public void merge(int [] leftArr, int [] rightArr,int [] arr, int leftSize, int rightSize){
        int i = 0, left = 0, right = 0; // i = iterator, left = leftIterator, right = rightIterator

        while(left < leftSize && right < rightSize){ // scanning both left and right side of an array

          if(leftArr[left] < rightArr[right]){ // if hte left index is less the right index
            arr[i] = leftArr[left]; // the first valeue in my aray is going to the smaller value
            i++;
            left++;
          }else{
              arr[i] = rightArr[right]; // otherwise the right side which is smaller is going to my first value.  
              i++;
              right++;
          }
          // This is maing sure that arr is allocated from small to big.
        }
          while(left < leftSize){ // allocating the left array
            arr[i] = leftArr[left];
            i++;
            left++;
          }
          while(right < rightSize){ // allocatiing the rightt array
            arr[i] = rightArr[right];
            i++;
            right++;
          }
    }

    public void mergeSort(int [] arr, int size){
      if(size < 2){
        return;
      }

      int mid = size/2;
      int [] leftArr = new int[mid];
      int [] rightArr = new int[size-mid];

      int k = 0;
      for(int i = 0; i < size; i++){
        if(i < mid){
          leftArr[i] = arr[i];
        }else{
          rightArr[k] = arr[i];
          k+=1;
        }
        System.out.println("K: " + k + " i: " + i);
      }

      mergeSort(leftArr, mid);
      mergeSort(rightArr, size - mid);

      merge(leftArr, rightArr, arr, mid, size - mid);
    }

    public boolean arraySumSearch(int [] arr,int sum){
        int start = 0;
        int end = arr.length-1;
        mergeSort(arr, arr.length);
        System.out.println("Sorted Array: " + Arrays.toString(arr));
          if(arr.length > 0){
              while(start < end && arr.length >= 2){
                if((arr[start] + arr[end]) == sum){
                  return true;
                }else if(arr[start] + arr[end] < sum){
                  start++;
                }else{
                  end--;
                }
              }
            return false;
          }
        return false;
    }

    public boolean arraySumSearch1(int [] arr, int sum){
      for(int i = 0; i < arr.length; i++){
        if((i+1) < arr.length){
          if(arr[i] + arr[i+1] == sum){
            return true;
          }
        }
      }
      return false;
    }

}
