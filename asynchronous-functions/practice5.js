/* create an async function sumNumbers that takes two numebrs and return their sum after a delay of 1 second */
async function sumNumbers(a, b) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            const result = a + b;
            resolve(result); //callback
        }, 1000);
    });
}

async function displaySum() {
    const result = await sumNumbers(2, 4);
    console.log("The sum is:", result);
}

displaySum();