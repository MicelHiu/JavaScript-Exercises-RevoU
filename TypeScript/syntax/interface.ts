interface EWallet {
    name: string;
    code: string;
    userId: string;
    balance: number;
}

function printEWallet(eWallet: EWallet) {
    console.log(`E-wallet name: ${eWallet.name}`);
    console.log(`E-wallet code: ${eWallet.code}`);
}

const goPay: EWallet = {
    name: 'GoPay',
    code: 'GOPAY',
    userId: "user-abc-123",
    balance: 90_000
}

const ovo: EWallet = {
    name: 'OVO',
    code: 'OVO',
    userId: "user-cde-123",
    balance: 50_000
}

printEWallet(goPay);
printEWallet(ovo);

export{}