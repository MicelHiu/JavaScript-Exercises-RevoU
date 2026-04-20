/* modify the fetchData function from the previous example to accept two callbacks - one to be executed when data is fetched successfully and another when an error occurs */
function fetchData(successCallback, errorCallback) {
    const success = Math.random() < 0.5; // Simulate success or failure randomly
    setTimeout(function() {
        if (success) {
            console.log("Data fetched successfully!");
            successCallback();
        } else {
            console.log("Error fetching data.");
            errorCallback();
        }
    }, 2000);
}

function onSuccess() {
    console.log("Success callback executed.");
}

function onError() {
    console.log("Error callback executed.");
}

fetchData(onSuccess, onError);