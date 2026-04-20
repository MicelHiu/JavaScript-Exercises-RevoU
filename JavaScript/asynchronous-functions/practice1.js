/* create a function calculate that takes two numbers and a callback function. The callback should be called with the result of adding the two numbers after a delay of 1 second. */
function calculate(a, b, callback) {
    setTimeout(function() {
        const result = a + b;
        callback(result); // karena di displayresult butuh parameter makanya dimasukin parameter juga di callback.
    }, 1000);
}
//ini yang jadi callbacknya.
function displayResult(result) {
    console.log("Calculating...");
    console.log("The result is: " + result);
}

calculate(5, 7, displayResult);