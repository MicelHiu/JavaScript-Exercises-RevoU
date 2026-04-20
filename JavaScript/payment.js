function getPayment(balance, totalPayment) {
    if (balance < totalPayment) {
        console.log("balance is not sufficient");
    } else {
        console.log("payment successful");
    }
}

getPayment(100, 150);
getPayment(200, 150);