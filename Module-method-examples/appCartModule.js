const {isExist} = require('./cartModule');

const shoppingCart = ['Apple', 'Banana', 'Orange'];
const targetItem1 = 'Banana';

if (isExist(shoppingCart, targetItem1)) {
    console.log(`${targetItem1} is in the shopping cart.`);
} else {
    console.log(`${targetItem1} is not in the shopping cart.`);
}