/* You're developing a wishlist feature for an e-commerce website. Implement a JavaScript function that adds products to the wishlist. 

The function should accept an object representing the product details and an optional quantity parameter. If no quantity is provided, default it to 1.  */
function addToWishlist(product, quantity = 1) {
  const wishlistItem = {
    ...product,
    quantity
  };
  console.log('Product added to wishlist:', wishlistItem);
}