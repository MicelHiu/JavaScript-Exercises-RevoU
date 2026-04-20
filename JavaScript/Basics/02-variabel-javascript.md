# Penjelasan Variabel JavaScript

### Apa itu Variabel?

Variabel adalah **tempat penyimpanan data yang punya nama**. Bayangkan seperti kotak berlabel.

```
[ kotak bernama "playerName"  ] → isinya "Budi"
[ kotak bernama "score"       ] → isinya 0
[ kotak bernama "isGameOver"  ] → isinya false
```

### Cara Mendeklarasikan

```js
// Syntax: keyword namaVariabel = nilai
let score = 0;
const MAX_TRIES = 5;
```

### Aturan Penamaan

```js
// ✓ Boleh
let playerName   = "Budi";    // camelCase (standar JS)
let secretNumber = 42;
let isGameOver   = false;
let gameList     = [];

// ✗ Tidak boleh / tidak disarankan
let player name = "Budi"; // spasi → error
let 1score = 10;           // diawali angka → error
let sc = 0;                // singkatan tidak jelas
let x = "Budi";            // tidak deskriptif
```

### Data Types yang Bisa Disimpan di Variabel

```js
// Primitive
let score        = 0;           // Number
let timeLeft     = 30.5;        // Number (float) — sisa waktu dalam detik
let playerName   = "Budi";      // String
let isGameOver   = false;       // Boolean
let winner       = null;        // Null — belum ada pemenang
let secretNumber;               // Undefined — belum diisi

// Reference / Complex
let player      = { name: "Budi", score: 0, lives: 3 };             // Object
let gameList    = ["Number Guessing", "Rock Paper Scissors", "Clicker"]; // Array
let leaderboard = [{ name: "Budi", score: 100 }, { name: "Rina", score: 85 }]; // Array of Objects
```

### Cek Tipe Data dengan `typeof`

```js
console.log(typeof 42);           // "number"
console.log(typeof "Hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof null);         // "object" ← quirk di JS, bukan benar-benar object
console.log(typeof undefined);    // "undefined"
console.log(typeof {});           // "object"
console.log(typeof []);           // "object" ← array juga "object" di typeof
console.log(Array.isArray([]));   // true ← gunakan ini untuk cek array
```
