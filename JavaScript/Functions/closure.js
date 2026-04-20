/*beginner case*/
function outer() {
    var outerVar = "I am outside!"; // variable in the outer scope

    function inner() {
        var innerVar = "I am inside!"; // variable in the inner scope
        console.log(outerVar); // accessing the outer variable
        console.log(innerVar); // accessing the inner variable
    }
    return inner; // returning the inner function
}
const closureFunction = outer(); // calling the outer function to get the inner function
closureFunction(); // calling the inner function to see the closure in action


/*medium case*/
const createCounter = function() {
    let count = 0; // variable that will be enclosed by the closure
    return function() {
        count++; // incrementing the count variable
        return count;
    };
};
const player1Score = createCounter(); // creating a counter for player 1
const player2Score = createCounter(); // creating a counter for player 2

console.log("Player 1:", player1Score()); // Output: Player 1: 1
console.log("Player 1:", player1Score()); // Output: Player 1: 2
console.log("Player 2:", player2Score()); // Output: Player 2: 1 (start fresh) [6,11]