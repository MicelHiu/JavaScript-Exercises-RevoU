/* Make a function to do a shopping payment checkout that has 2 parameters.
amount, paymentProvider.
use switch condition
 */

function checkout(amount, paymentProvider) {
    switch (paymentProvider) {
        case "Debit Card":
            console.log(`You have paid $${amount} using Debit Card.`);
            break;
        case "Credit Card":
            console.log(`You have paid $${amount} using Credit Card.`);
            break;
        case "Gopay":
            console.log(`You have paid $${amount} using Gopay.`);
            break;
        default:
            console.log("Invalid payment provider.");
    }


}

checkout(100, "Debit Card");
