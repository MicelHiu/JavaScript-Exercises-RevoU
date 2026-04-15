/* Sum of Squares
Write a function that takes an array of numbers and returns the sum of the squares of each number. Use an anonymous function to calculate the square of each element. */
const numbers = [1, 2, 3, 4, 5];
const calculateSumOfSquares = function(arr) {
    return arr.reduce(function(sum, num) {
        return sum + num ** 2;
    }, 0);
};
const sumOfSquares = calculateSumOfSquares(numbers);
console.log(sumOfSquares); // Output: 55

/* Find maximum value 
write a function that finds the maximum value in an array using the reduce function and an anonymous function*/
const numbers2 = [3, 7, 2, 9, 5];
const findMaxValue = function(arr) {
    return arr.reduce(function(max, current) {
        return current > max ? current : max;
    });
};
const maxValue = findMaxValue(numbers2);
console.log(maxValue); // Output: 9

