# Data Structure and Algorithm

<p align="center">
Welcome to the data structure and algorithms project. In this project, I try to practice DSA through concrete cases.
</p>

## Contents

-   [Features](#online-demo)
-   [Online demo](#installation)
-   [Algorithms](#algorithms)

## Online Demo

You can find the online demo at [here](https://data-structure-algorithm-psi.vercel.app/)

## Installation

1. Clone this repo

    ```sh
        git clone https://github.com/onesine/data-structure-algorithm.git
    ```

2. Go into the project root directory

    ```sh
        cd data-structure-algorithm
    ```

3. Install JS dependencies

    ```sh
        yarn install
    ```

4. Start the dev server

    ```sh
        yarn dev
    ```

   You can now test the application on the link `http://localhost:5173/`

5. Useful script

    ```sh
        yarn code-style:fix
    ```

   Allows to fix the problems related to the code style.

    ```sh
        yarn build
    ```

## Algorithms

1. Fibonacci list

    ```c
    #include <stdio.h>

    const int MAX_LIMIT = 19;
    int limit = 2;

    void fibo(int prev1, int prev2) {
        int result = prev1 + prev2;

        printf("%d\n", result);

        if(limit < MAX_LIMIT) {
            fibo(prev2, result);
        }

        return;
    }

    int main() {
        printf("===========Fibonacci liste===========\n");
        printf("0\n");
        printf("1\n");
        fibo(0, 1);

        return 0;
    }
    ```

2. Find the n th fibonacci term

    ```c
    #include <stdio.h>

    int f(int n) {
        if(n <= 1)
            return n;
        else
            return f(n - 1) + f(n - 2);
    }

    int main() {
        printf("===========Fibonacci term===========\n");
        printf("term-8:%d\n", f(8));

        return 0;
    }
    ```

3. Find the minimum in an array data structure

    ```c
    #include <stdio.h>

    int main() {
        int array[] = {9, 4, 6, 1, 10, 2}, min;
        int n = sizeof(array) / sizeof(array[0]);

        printf("===========Array min value===========\n");
        min = array[0];

        for(int i = 1; i < n; i++) {
            if(min > array[i]) {
                min = array[i];
            }
        }

        printf("min:%d\n", min);

        return 0;
    }
    ```

4. Bubble Sort

    ```c
    #include <stdio.h>
    #include <stdbool.h>

    int main() {
        int array[] = {7, 61, 3, 8, 10, 2, 5, 23, 51, 4, 13, 21}, temp, i;
        int n = sizeof(array) / sizeof(array[0]);
        bool swap;

        printf("===========Bubble Sort===========\n");

        for(i = 0; i < n - 1; i++) {
            swap = false;
            for(int j = 0; j < n - i - 1; j++) {
                temp = array[j];
                if(temp > array[j + 1]) {
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swap = true;
                }
            }

            if(!swap) break;
        }

        printf("[");
        for(i = 0; i < n; i++) {
            printf("%d", array[i]);

            if(i < n - 1) printf(", ");
        }
        printf("]");

        return 0;
    }
    ```

5. Selection Sort

    ```c
    #include <stdio.h>

    int main() {
        int array[] = {7, 61, 3, 8, 10, 2, 5, 23, 51, 4, 13, 21}, temp, i, minIndex;
        int n = sizeof(array) / sizeof(array[0]);

        printf("===========Selection Sort===========\n");
        for(i = 0; i < n - 1; i++) {
            minIndex = i;
            for(int j = i + 1; j < n; j++) {
                if(array[minIndex] > array[j]) {
                  minIndex = j;
                }
            }

            if(i != minIndex) {
                temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;
            }
        }


        printf("[");
        for(i = 0; i < n; i++) {
            printf("%d", array[i]);

            if(i < n - 1) printf(", ");
        }
        printf("]");

        return 0;
    }
    ```

6. Insertion Sort

    ```c
    #include <stdio.h>
    
    int main() {
        int array[] = {7, 61, 3, 8, 10, 2, 5, 23, 51, 4, 13, 21}, i;
        int n = sizeof(array) / sizeof(array[0]);
    
        printf("===========Selection Sort===========\n");
        for(i = 1; i < n; i++) {
            int currentMin = array[i];
            int j = i - 1;
    
            while(j >= 0 && currentMin < array[j]) {
                array[j + 1] = array[j];
                array[j] = currentMin;
                j--;
            }
        }
    
        printf("[");
        for(i = 0; i < n; i++) {
            printf("%d", array[i]);
    
            if(i < n - 1) printf(", ");
        }
        printf("]");
    
        return 0;
    }
    ```

7. Quick Sort

    ```c
    #include <stdio.h>
    
    void printArray(int array[], int size) {
        printf("[");
        for(int i = 0; i < size; i++) {
            printf("%d", array[i]);
            
            if(i < n - 1) printf(", ");
        }
        printf("]");
    }
    
    int getPivotIndex(int array[], int startIndex, int endIndex) {
        int pivotValue = array[endIndex], i = startIndex, temp;
        
        for(int j = startIndex; j < endIndex; j++) {
            if(array[j] <= pivotValue) {
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                i++;
            }
        }
        
        temp = array[i];
        array[i] = array[endIndex];
        array[endIndex] = temp;
        
        return i;
    }
    
    void quickSort(int array[], int startIndex, int endIndex) {
        if(startIndex < endIndex) {
            int pivotIndex = getPivotIndex(array, startIndex, endIndex);
            quickSort(array, startIndex, pivotIndex - 1);
            quickSort(array, pivotIndex + 1, endIndex);
        }
    }
    
    int main() {
        int array[] = {7, 61, 3, 8, 10, 2, 5, 23, 51, 4, 13, 21};
        int n = sizeof(array) / sizeof(array[0]);
        
        printf("===========Quick Sort===========\n");
        quickSort(array, 0, n - 1);
        
        printArray(array, n);
        
        return 0;
    }
    ```
