# ES6
- ECMA 2015
- Standard for modern javascript writing
- beneficial in terms of code writing efficiency, code protection, and code performance.

# ES6 SYNTAX
## Deklarasi let dan const
- let digunakan untuk mendeklarasi variabel dalam block scope, allowing reassignment (isi dapat diubah)
- const digunakan untuk constants dalam block scope, and their values cannot be reassigned (isi gabisa diubah)
- contoh:
```
let num = 10;
if(true) {
    let num = 20;
    console.log(num); // output =  20 (inner scope)
}
console.log(num); // output 10 (outer scope)
const PI = 3.14;
PI = 4; // error : assignment to a constant variable
```
## Template Literals
- allow for easy string interpolation (jadi mudah memasukan variabel ke dalam string)
- support multi line strings
```
const name = "John";
const age = 25;

//combine into a sentence using template literals
const sentence = `My name is ${name} and I am ${age} years old.`;

// create a multi-line string using template literals
const multiLineString = `This is
    a multi-line
    string.`;
```

## Destructing Assignment
- allows you to extract values from arrays or properties from objects into distinct variables.
```
const numebrs = [1, 2, 3];
// use destructing to assign variables
a, b, and c
const [a, b, c] = numbers;

const person = {
    name: 'Alice',
    age: 30
};
//use destructing to assign variables name and age
const { name, age } = person;
```

## Spread and Rest Operators
- the spread operators (...) spreads elements of an iterable into a new array or object.
- The rest operator (...) gather elements into a single array or object
```
//spread operator
let arr = [1, 2, 3];
let newArr = [...arr, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]

//rest parameter
function sum(...numbers)  {
    return numbers.reduce((acc, num) -> acc + num, 0);
}
```

## Object Enchanments
- shorthand property names allow concise object creation
object methods can be defined using shorthand syntax
```
Object property shorthand
let name = "John";
let age = 30;

//regular way
let person = {
    name: name,
    age: age
};

//shorthand
let person = { name, age };
```
```
const name = "Bob";
const age = 40;

//create an object with name and age properties using shorthand syntax
const person = { name, age };

//create an object with a method 'greet' that logs a greeting
const greeter = {
    greet() {
        console.log("Hello!");
    }
};
```

## Enhanced Object Literals
- sometimes we need a dynamic key variable, thats where we need this!
```
let propKey = 'foo';
let obj = {
    [propKey]: 'bar',
    method() {
        return 'Hello!';
    }
}; 
//outputnya bar nanti
```

## Default Parameters
- values can be assigned to function parameters, providing fallbacks when values are not provided.
```
//create a function greet that logs a greeting with a default value
const greet = (name = 'Guest') => {
    console.log('Hello, ${name}!');
};

//create a function calculateArea that computes the area of rectangle
const calculateArea = (length = 5, width = 3) => length * width;
```
## OOP INTRO (Object Oriented Programming)
- a paradigm that organizes code into objects-entities that bundle data (properties) and behaviour (methods).
- menyangkut object, enkapsulasi, polymorism, inheritance, abstraction, class

### Classes
- a class is a blueprint for creating objects with specific properties and emthods.
- ES6 introduces a class syntax that provides a cleaner and more concise way to create objects and deal with inheritance.
- cth:
1. class ==> fruit. Object ==> apple, banana, mango
2. class = car, object = volvo, audi, dsb
```
// create a class shape with a method calculateArea
class shape {
    calculateArea() {
        return 0;
    }
}

//create a class Rectangle that extends Shape with its own calculateArea
class Rectangle extends shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    calculateArea() {
        return this.width * this.height;
    }
}
```
Other example: https://github.com/djiwandou-p/js-es6-syntaxes-examples
 

