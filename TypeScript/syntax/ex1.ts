interface Bank {
    accountName: string;
    accountNumber: string;
    balance: number;
}

interface EWallet {
    name: string;
    code: string;
    userId: string;
    balance: number;
}

type AcceptedPayment = Bank & EWallet;

const myPaymentAccount: AcceptedPayment = {
    name: 'GoPay',
    code: 'GOPAY',
    userId: "user-abc-123",
    balance: 90_000,
    accountName: 'John Doe',
    accountNumber: '1234567890'
}

function transaction(amount: number, account: AcceptedPayment) {
    if (amount > account.balance) {
        console.log('Insufficient balance');
        return account;
    }
    account.balance = account.balance - amount;
    console.log(`Transaction successful. Remaining balance: ${account.balance}`);
    return account;
}

const accountA = transaction(10_000, myPaymentAccount);
console.log(`Remaining balance after transaction: ${accountA.balance}`);