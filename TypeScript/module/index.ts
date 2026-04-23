import { printCart, addToCart, clearCart } from "./cart";

let myCart: string[] = []
myCart = addToCart(myCart, "Apple");
myCart = addToCart(myCart, "Banana");

printCart(myCart);

myCart = clearCart();
printCart(myCart);

myCart = addToCart(myCart, "Orange");
printCart(myCart);