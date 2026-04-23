function addToCart(item: string[], newItem: string): string[] {
    /* item.push(newItem) */
    return [...item, newItem];
    //     dispread  
}

function clearCart(): string[]{
    return [];
}

function printCart(item: string[]): void {
    if(item.length === 0) {
        console.log("Your cart is empty");
        return;
    }

    item.forEach((item) => {
        console.log(item);
    });
    return;
}

export {
    addToCart,
    clearCart,
    printCart
}