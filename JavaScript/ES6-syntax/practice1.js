/* You have 2 shopping cart, first is your saved items shopping cart and the other one is your wishlist shopping cart, make a function to merge those cart with spread operator */
const savedItemsCart = ['item1', 'item2', 'item3'];
const wishlistCart = ['item4', 'item5', 'item6'];

function mergeCarts(cart1, cart2) {
  return [...cart1, ...cart2];
}

const mergedCart = mergeCarts(savedItemsCart, wishlistCart);
console.log(mergedCart);