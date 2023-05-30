#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <pthread.h>
#include <stdbool.h>
#include <stdlib.h>
#include <time.h>

void process(){
   int k = 1000;
   int upper = 11000;
   int lower = 1000;
   for(int i = 0; i < k; i++){
     int random = rand()%(upper-lower+1);
     int randomMemory = rand()%100;
     printf("%d\t%d\t%d\n",i+1, random, randomMemory);
   }
}

int main(){
   process();
   return 0;
}