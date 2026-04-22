function printEWallet(eWallet) {
    console.log(`E-wallet name: ${eWallet.name}`);
    console.log(`E-wallet code: ${eWallet.code}`);
}
const goPay = {
    name: 'GoPay',
    code: 'GOPAY',
    userId: "user-abc-123",
    balance: 90_000
};
const ovo = {
    name: 'OVO',
    code: 'OVO',
    userId: "user-cde-123",
    balance: 50_000
};
printEWallet(goPay);
printEWallet(ovo);
export {};
