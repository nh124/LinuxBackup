// This code will only in linux environment
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/wait.h>

void forkFunction(void){
    fork();
    printf("Hello world!\n");
    printf("Process ID:%d\n", getpid());
    printf("Parent process ID:%d\n", getppid());
    //wait(NULL);
}
void exitFunction(void){
    printf("Process 1....\n");
    printf("Process 2....\n");
    exit(0);
    printf("Process 3....\n");
}
void execlFunction(){
    char *path = "/bin/ls";
    char *arg1 = "-a";
    char *arg2 = "-s";
    execl(path,path,arg1,arg2,NULL);
}

int main(void){
   forkFunction();
   if(fork()==0){
        forkFunction();
        printf("Parent Function.\n");
   }else{
        forkFunction();
        printf("Parent Function.\n");
        wait(NULL);
        printf("Child function terminated.\n");
        exitFunction();
   }
   //wait(NULL);
   //exitFunction();
   printf("\n----------------------------------------------------------------\n");

   execlFunction();

   return 0;
}