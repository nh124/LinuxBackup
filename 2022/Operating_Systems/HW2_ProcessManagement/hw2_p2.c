#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <pthread.h>
#include <stdbool.h>

pthread_mutex_t mutex;

void rwFile(pid_t processID, char wprocess[8]){
  for(int i = 0; i < 200; i++){
int num1;
   FILE *fpread = fopen("numb.txt", "r");
   fscanf(fpread, "%d", &num1);
   fclose(fpread);
   printf("Number: %d ProcessID: %d\t%s\n", num1, processID, wprocess);
   num1++;
   FILE *fpwrite = fopen("numb.txt", "w");
   fprintf(fpwrite, "%d", num1);
   fclose(fpwrite);
  }
}
void process(){
  int lock = 1;
  bool process1Bool = true;
  bool process2Bool = false;
  bool process3Bool = false;
  int n1 = fork();
  int n2 = fork();
 if(n1 == 0 && n2 > 0){
    // pthread_mutex_lock(&mutex);
    if(process1Bool == true){
       process1Bool = false;
       rwFile(getpid(), "Process1");
       process2Bool = true;
    }else{
       lock = 1;
       if(process2Bool == false && process3Bool == false){
        // printf("%d\t%d\n", process2Bool, process3Bool);
        process1Bool = true;
       }
    }
    // rwFile(getpid(), "Process1");
    // pthread_mutex_unlock(&mutex);
  }else if(n1 > 0 && n2 == 0){
    if(process2Bool == true){
        process2Bool = false;
        lock = 0;
        rwFile(getpid(), "Process2");
     }else{
lock = 1;
       if(process1Bool == false && process3Bool == false){
         process2Bool = true;
       }
     }
  }else{
     if(process3Bool == true){
        lock = 0;
        rwFile(getpid(), "Process3");
     }else{
        lock = 1;
        if(process1Bool == false && process2Bool == false){
          process3Bool = true;
        }
     }
    // pthread_mutex_lock(&mutex);
    // rwFile(getpid(), "Process3");
    // pthread_mutex_unlock(&mutex);
  }
 // int n1 = fork();
 //  solution 2
// rwFile(getpid(), "Process1");
 // if(fork() == 0){
   //  rwFile(getpid(), "Process2");
    //  if(fork() == 0){
     // rwFile(getpid(), "Process3");
     // }
 // }


   //return val;
}
int main(void){
pthread_mutex_init(&mutex, NULL);
  //int val = process();
 // printf("%d\n", val);
process();
// pid_t gpid = getpid();
// rwFile(gpid);
pthread_mutex_destroy(&mutex);
  return 0;
}
