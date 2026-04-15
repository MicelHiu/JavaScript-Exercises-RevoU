let shoppingCart = ['Phone',' Laptop','Steam Deck','PS5'];

//function to add a shopping cart item
function addItem (item) {
    shoppingCart.push(item);
    console.log(`${item} has been added to the shopping cart.`);
}

//function to remove a shopping cart item
function removeLastItem () {
    const removedItem = shoppingCart.pop();
    console.log(`${removedItem} has been removed from the shopping cart.`);
}

//function to show the shopping cart items
function showCart () {
    console.log('Shopping Cart Items:', shoppingCart.toString());
}

module.exports = {
    addItem,
    removeLastItem,
    showCart
};