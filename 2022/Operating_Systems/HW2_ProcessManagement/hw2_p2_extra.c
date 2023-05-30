#include <stdio.h>

#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

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
  //int n1 = fork();
  //int n2 = fork();

 // printf("n1: %d\tn2: %d\n", n1, n2);
  //if(n1 == 0 && n2 > 0){
  //   rwFile(getpid(), "Process1");
  // }else if(n1 > 0 && n2 == 0){
  //    rwFile(getpid(), "Process2");
  // }else{
  //    rwFile(getpid(), "Process3");
  // }
  //int n1 = fork();
  // solution 2
 rwFile(getpid(), "Process1");
  if(fork() == 0){
     rwFile(getpid(), "Process2");
      if(fork() == 0){
        rwFile(getpid(), "Process3");
      }
  }


   //return val;
}
int main(void){
  //int val = process();
 // printf("%d\n", val);
process();
// pid_t gpid = getpid();
// rwFile(gpid);
  return 0;
}
