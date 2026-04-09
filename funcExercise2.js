function actionTransaction(amount, transferMethod) {
    if (amount < 0) {
        console.log("Invalid amount. Please enter a positive value.");
        return;
    } else {
        console.log(`Transferring $${amount} using ${transferMethod}.`);
    }
}

actionTransaction(100, "bank transfer");
actionTransaction(-50, "credit card");