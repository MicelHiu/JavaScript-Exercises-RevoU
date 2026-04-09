function add(number1, number2) {
    return number1 + number2;
}
add(1, 2);

var functionVariable = add;
console.log(functionVariable(3, 4)); // output: 7

function alertMessage() {
    alert("Hello, this is an alert message!");
}

alertMessage(); // This will show an alert box with the message