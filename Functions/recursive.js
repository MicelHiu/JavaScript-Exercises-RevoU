/* Calculate factorial
write a recursive function to calculate the factorial of a given number  */
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
const result = factorial(5);
console.log(result); // Output: 120

/* Countdown
write a recursive function that counts down from a given number to 1, logging each number along the way */
const countdown = (num) => {
    if (num<=0) {
        return;
    }
    console.log(num);
    countdown(num - 1);
};

countdown(5); // Output: 5, 4, 3, 2, 1