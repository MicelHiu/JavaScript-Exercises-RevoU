/* There is a restaurant named krusty krab,  with a special recipe called Krabby Patty. it has ingredients of bread, tomatoes, beef, and plankton.
The recipe is delicious if there are more than 500 purchases per day.
with repeat employee of the month, name : Spongebob, age : 12,
where you can get this information by calling getEmployeeOfTheMonth() function.*/

let krabbyPatty = {
    name: "Krabby Patty",
    restaurant: "Krusty Krab",
    ingredients: ["bread", "tomatoes", "beef", "plankton"],
    chef: {
        name: "Spongebob",
        age: 12
    },
    dailyPurchases: 501
}

function checkTastiness(krabbyPatty) {
    return krabbyPatty.dailyPurchases > 500;
}

function getEmployeeOfTheMonth() {
    return krabbyPatty.chef;
}

console.log(`The ${krabbyPatty.name} has the following ingredients: ${krabbyPatty.ingredients.join(", ")}.`);
console.log(`Is the ${krabbyPatty.name} delicious? ${checkTastiness(krabbyPatty) ? "Yes" : "No"}.`);
console.log(`Employee of the Month: ${getEmployeeOfTheMonth().name}, Age: ${getEmployeeOfTheMonth().age}.`);

/* // Recipe Config -- punya Kak Dimas
let krabbyPatty = {
  name: "Krabby Patty",
  restaurant: "Krusty Krab",
  ingredients: ["bread", "tomatoes", "beef", "plankton"],
  chef: { name: "Spongebob", age: 12 },
  dailyPurchases: 505,
};

function checkDeliciousness(restoRecipe) {
  const highDemand = restoRecipe.dailyPurchases > 500;

  return highDemand;
}

function getEmployeeOfTheMonth() {
  const isDelicious = checkDeliciousness(krabbyPatty);
  if (isDelicious) {
    return krabbyPatty.chef;
  } else {
    return {
      name: "None",
      age: 0,
    };
  }
}

// Process
console.log(
  `${krabbyPatty.name} Ingredients: ${krabbyPatty.ingredients.join(", ")}`,
);
console.log("Delicious?", checkDeliciousness(krabbyPatty));
console.log("Employee of the Month:", getEmployeeOfTheMonth()); */