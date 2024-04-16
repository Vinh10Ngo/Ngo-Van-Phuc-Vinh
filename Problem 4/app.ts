// 1. Implementation 1: Iterative Approach
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
/*
Complexity Analysis:

Time Complexity: O(n)
Space Complexity: O(1)
This implementation iterates through each number from 1 to n and accumulates the sum. It has a linear time complexity since it performs a constant-time operation for each integer from 1 to n.
*/

// 2. Implementation 2: Closed-Form Formula
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}
/*
Complexity Analysis:

Time Complexity: O(1)
Space Complexity: O(1)
This implementation utilizes the closed-form formula for the sum of the first n natural numbers. It directly calculates the sum without iterating through each number, resulting in constant time complexity.
*/

// 3. Implementation 3: Recursive Approach
function sum_to_n_c(n: number): number {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}

/*
Complexity Analysis:

Time Complexity: O(n)
Space Complexity: O(n)
This implementation uses recursion to calculate the sum. Although it's elegant, it has a linear time complexity due to the recursive calls. Additionally, it has linear space complexity because it utilizes the call stack to store intermediate results until the base case is reached.
*/