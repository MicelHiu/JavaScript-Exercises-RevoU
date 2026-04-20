/*  create a function fetchUser that returns a promise. The promise should resolve after 1 second with an object containing user's name. */
function fetchUser() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve({ name: "John Doe" }); //callback
        }, 1000);
    });
}

fetchUser().then(function(user) {
    console.log("User fetched:", user);
});