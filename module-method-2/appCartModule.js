const { addItem, removeLastItem, showCart } = require('./cartModule');

let shoppingCart = ['Phone', 'Laptop', 'Steam Deck', 'PS5'];

addItem('Tablet');
showCart();

removeLastItem();
showCart();
