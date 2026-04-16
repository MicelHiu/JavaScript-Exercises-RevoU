/* You're working on a feature for a banking application that processes transactions.
 Implement a generator function that simulates transaction processing by yielding each step of the process. 
The function should accept an initial balance and a transaction amount, and yield each step of the transaction process,

Processes : checking if the balance is sufficient, deducting the transaction amount, and updating the balance
(only string, not literally do the process)
 */

function* processTransaction(initialBalance, transactionAmount) {
    yield `Checking if balance of $${initialBalance} is sufficient for transaction of $${transactionAmount}`;
    yield `Deducting $${transactionAmount} from balance`;
    yield `Updating balance to $${initialBalance - transactionAmount}`;
}
