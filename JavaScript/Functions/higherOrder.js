/*beginner case*/
function operate(a, b, operation) {
    return operation(a, b);
}
//the callback function
function add(x, y) {
    return x + y;
}
//we pass the add function into operate
let result1 = operate (3, 4, add);
console.log(result1); // Output: 7




/*medium case
it returns a new function that runs func2 then func1*/
function compose(func1, func2) {
    return function(x) {
        return func1(func2(x));
    };
}
const addTwo = (x) => x + 2;
const multiplyByThree = (x) => x * 3;
//create a combined function using HOF
//it will first add 2, then multiply by 3
const composedFunction = compose(multiplyByThree, addTwo);
const result2 = composedFunction(4); // (4 + 2) * 3 = 18
console.log(result2); // Output: 18





/* Write a higher-order function filterAndTransform that takes an array and two callback functions as arguments. The function should filter the array based on the first callback and transform the filtered elements using the second callback */
const numbers = [1, 2, 3, 4, 5, 6];
const isEven = (num) => num % 2 === 0;
const square = (num) => num * num;

const result3 = filterAndTransform(numbers, isEven, square);
console.log(result3); // Output: [4, 16, 36];

function filterAndTransform(arr, filterCallback, transformCallback) {
    return arr.filter(filterCallback).map(transformCallback);
}






/* Sum of Squares
Write a function that takes an array of numbers and return the sum of the squares of each number. Use an anonymous function to calculate the square of each element. */
const numbers2 = [1, 2, 3, 4, 5];
const calculateSumOfSquares = function(arr) {
    return arr.reduce(function(sum, num) {
        return sum + num ** 2;
    }, 0);
};
const sumOfSquares = calculateSumOfSquares(numbers2);
console.log(sumOfSquares); // Output: 55





/* Find maximun value */
const values = [7, 2, 9, 4, 1];
const findMaxValue = function(arr) {
    return arr.reduce(function(max, current) {
        return current > max ? current : max;
    }, arr[0]);
};
const maxValue = findMaxValue(values);
console.log(maxValue); // Output: 9

