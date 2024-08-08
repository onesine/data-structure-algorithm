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

const int TAB_SIZE = 6;

int main() {
    int tab[] = {9, 4, 6, 1, 10, 2};
    int min;
    
    printf("===========Array min value===========\n");
    min = tab[0];
    
    for(int i = 1; i < TAB_SIZE; i++) {
        if(min > tab[i]) {
            min = tab[i];
        }
    }
    
    printf("min:%d\n", min);
    
    return 0;
}
```
