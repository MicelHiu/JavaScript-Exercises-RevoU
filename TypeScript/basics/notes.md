# Introduction to TypeScript
- TS is a programming language that extends JS by adding static types to the language.
- Jadi dia basenya JS, tapi karena ada problem di JS especially di typing makanya dibuat lah TS.
- is a superset of JS, which means that any valid JS code is also valid TS code.
- however, TS introduces additional features, including static typing, interfaces, and advanced tooling support, to enhance the development experience and improve code quality.
- is heavily used at companies like microsoft, google, airbnb, and stripe
- penting untuk dipelajari karena sudah menjadi baseline dalam pemrograman.
- Walaupun nanti kita tulis kode dalam TS, komputer akan selalu tetap membacanya sebagai JS, makanya sebelum deploy kita compile dlu file .ts menjadi .js dengan tsc. Namun, file .ts tetap dapat dirun dengan node.

## TYPESCRIPT VS JAVASCRIPT
|             | JavaScript | TypeScript |
| ----------- | ----------- | ----------- |
| Type System | dynamic, variable or error will be catch in runtime | static. variable or error will be catch in the development process |
| Code Structure | follow ECMAScript standard, relaxed syntax, and less strict in terms of code organization | superset of JS with additional features, like enum, interfaces, and decoratos. encouraging a more structured and object-oriented coding. |
| Tooling | less sophisticated, lacks of comprehensive static analysis yang ada di TS | enhanced tooling support, like provide features for code completion, type checking, and advanced refactoring options |
| Compactibility | supported all browsers and can be executed on any JS runtime | musti di compile menjadi JS baru bisa jalan di browser. TS code can coexist with JS code, allowing for a gradual migration of existing projects.
| Use Cases | web development, mobile app development (using frameworks like React Native), game dev, etc | large-scale applications where static typing and code organization are crucial. widely used in modern web dev frameworks and libraries like Angular, NestJS, etc.

## WHY TS?
1. **Static typing** = catching many common errors at compile-time, leading to improved code reliability.
2. **Code Maintainability** = encourages a structured coding style with features like interfaces, making code more organized and maintainable.
3. **Tooling and IDE Support** = advanced, such as autocompletion and type checking, enchance the development experience in modern IDEs.
4. **Early Error Detection** = reducing bugs and improving overall code quality.
5. **Compatibility and Collaboration** = compatible with existing JS code, making it easy to adopt gradually. It promotes better collaboration in teams working on larger projects and provides a stronger ecosystem with TS support in popular frameworks and libraries.

## Installation
npm install -g typescript

tsc --version

COMPILING => tsc [nama file].ts

## TS Nature Syntax
side notes = use strict -> pengen isi variable terjaga. disarankan pakai function atau let/const.

### Type Annotations
- to precisely define the types of identifiers, such as variables, functions, and objects, among others.
- pake ":" followed by desired type after identifier. intinya buat ngasitau variabel itu tipe apa.
- disarankan dipakai untuk variable besar yang banyak dipake / scopeny besar.
```ts
let variableName: type;
let variableName: type = value;
const constantName: type = value;
```
```ts
let counter: number;
counter = 1; //okay
counter = "Revo"; // langsung error dan akan dikasitau langsung, karena type value tidak sesuai dengan apa sudah disebut sebelumnya which is number.
```
bisa juga di declare type dan value in one line.
```ts
let name: string = "Micel";
let age: number = 20;
let active: boolean = true;
```

### Types Inference
- describe where and how TS infers type when you dont explicitly annotate them.
- jadi komputer akan langsung menentukan tipeny apa tanpa harus kita declare manual. Ini bisa terjadi dengan melihat value yang diinput.
```ts
let number = 0;
//is the same with
let number: number = 0;
```

### Number
- you still can use number type for decimal, binary, hexadecimal, and octal number.
- except Big Int, it needs to be declare as "bigint"
```ts
let counter: number = 0;
let binary: number = 0B010;
let hexadecimal: number = 0XA0XA;
let octal: number = 0o10;

let big: bigint = 9007199254740991n;
```

### String
- similar to JS
- use " or ' to enclose string literals
- also support ` to surround characters and string interpolations.
```ts
let firstName: string = 'Peter';
let title: string = "Full Snack Developer";
let description: string = `I love coding and snack`;

let profile: string = `I'm ${firstName}. I'm a ${titile}`;
```

### Boolean
- reprsent two values which is right and false
```ts
let isLoading: boolean;
isLoading = true;
//after a while
//....
isLoading = false;
```

### Objects
- represents all values that are not in primitive types.
```ts
let employees: {
    name: string;
    age: number;
};

employees = {
    name: "Peter Parker"
    age: 17;
}
```
or you can combine it
```ts
let employees: {
    name: string;
    age: number;
} = {
    name: "Peter Parker"
    age: 17
};
```

### Arrays
- sequential collection of data elements.
- type[] for declare the type.
- masih bisa pake push, etc
```ts
let arrayName: type[];
let names: string[] = ['Mary','Jane','Peter','Parker','May','Eddy','Brooke'];
names.push('Harry Osborn');
```
- sekalinya declare number, maka seterusnya akan jadi number, gabisa tiba2 diisi string. Begitu juga sebaliknya.
```ts
names.push(0); // error karena inputnya number di variabel yang di declare string

// kita juga bisa bikin datanya punya 2 tipe
let names2: (string | number)[];
names2 = ['JS',100, 'RevoU',40];

//bisa juga 2 atau lebih array
let dua: string[][] = [
    ['a','b'],
    ['c','d'],
];
```

### Tuples
- mirip kek array tapi dia di declare tipe per index (assign juga per index, sesuai dengan tipe data yang di declare).
- the numbers of elements in the tuple is fixed
- the types of elements are known, and need not be the same.
```ts
let skill: [string, number];
skill = ['Learn', 99];
```
- the order of values in a tuple is important
- if you change the order of values of the skill tuple, you will get an error
```ts
let skill: [string, number];
skill = [99, 'Learn']; //error
```

### Any
- kepake kalau misalnya tipe datanya emg unknown atau bisa macem2
- dihindari kalau bisa, karena bisa bypass type checking, atau dapat menimbulkan

    1. type safety = bypass type checking and increasing the likelihood of runtime errors.
    2. compiler benefits = any hinders the usefulness of TS's compiler benefits, like autocompletion, error detection, and refactoring support.
    3. debugging challenges = tracking down the issues becomes more difficult, as the lack of type information compicates the debugging process.

```ts
//json may come from a third party API
const json = `{"latitude": 6.1754 S, "longitude": 106.8272 E}`;

//parse JSON to find location
const currLocation = JSON.parse(json);
console.log(currLocation);
```

### Union

