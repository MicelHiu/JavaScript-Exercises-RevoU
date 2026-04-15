# Kapan menggunakan `const` vs `let`, dan apa bahayanya masih pakai `var`?

| Keyword | Gunakan Ketika | Contoh |
|---------|----------------|--------|
| `const` | Nilai **tidak akan pernah berubah** setelah dideklarasikan | `const MAX_ATTEMPTS = 3;` `const BASE_URL = "https://api.example.com";` |
| `let`   | Nilai **bisa berubah** (counter, hasil kalkulasi, kondisi toggle, dll) | `let score = 0;` `score += 3;` `score = score + 3`|
| `var`   | **Hindari** — sudah ada pengganti yang lebih aman | `var nama = "Budi";` `var nama = "Ani"; // tidak error!` |

### Aturan Praktis

> **Default-nya pakai `const`.** Kalau ternyata perlu diubah, ganti ke `let`. Jangan pernah langsung pakai `var`.

### Apa itu Scope?

**Scope** adalah area di dalam kode di mana sebuah variabel bisa diakses. Di luar scope-nya, variabel itu tidak dikenal.

Ada dua jenis scope yang penting untuk dipahami:

| Jenis Scope | Artinya | Dibatasi oleh |
|---|---|---|
| **Function Scope** | Variabel hanya bisa diakses di dalam function tempat ia dideklarasikan | `function() { }` |
| **Block Scope** | Variabel hanya bisa diakses di dalam block tempat ia dideklarasikan | Kurung kurawal `{ }` (if, for, while, dll) |

---

#### Function Scope (`var`)

`var` hanya "menghormati" batas function — tidak peduli dengan block `{ }` lainnya.

```js
function contohFunctionScope() {
  var pesan = "Halo dari dalam function";
  console.log(pesan); // ✓ bisa diakses
}

contohFunctionScope();
console.log(pesan); // ✗ ReferenceError — di luar function, tidak bisa diakses
```

Tapi `var` **tidak peduli** dengan block seperti `if`, `for`, `while`:

```js
function contoh() {
  if (true) {
    var x = 10; // dideklarasikan di dalam block if
  }
  console.log(x); // 10 ← tetap bisa diakses! var "bocor" keluar dari block if
}
```

Ini yang disebut **"bocor"** — `var` tidak diikat oleh block `{ }`, hanya oleh function.

```
Function Scope (var):
┌────────────────────────────────────────────────────┐
│ function contoh() {                                │
│   if (true) {                                      │
│     var x = 10;  ← var ada di sini                 │
│   }                                                │
│   console.log(x); ← tapi bisa diakses di sini juga!│
│ }                                                  │
└────────────────────────────────────────────────────┘
```

---

#### Block Scope (`let` dan `const`)

`let` dan `const` diikat ketat oleh block `{ }` di mana ia dideklarasikan.

```js
function contoh() {
  if (true) {
    let y = 20;   // dideklarasikan di dalam block if
    const z = 30; // sama
    console.log(y); // ✓ 20
    console.log(z); // ✓ 30
  }
  console.log(y); // ✗ ReferenceError: y is not defined
  console.log(z); // ✗ ReferenceError: z is not defined
}
```

```
Block Scope (let/const):
┌─────────────────────────────────────┐
│ function contoh() {                 │
│   if (true) {                       │
│   ┌─────────────────────────────┐   │
│   │ let y = 20; ← hanya di sini │   │
│   └─────────────────────────────┘   │
│   console.log(y); // ✗ Error        │
│ }                                   │
└─────────────────────────────────────┘
```

---

#### Perbandingan Langsung di Loop

Ini contoh paling nyata kenapa `var` di loop bisa bikin bug:

```js
// Dengan var — bermasalah
for (var i = 0; i < 3; i++) {
  console.log("Di dalam loop:", i); // 0, 1, 2
}
console.log("Di luar loop:", i); // 3 ← var bocor ke luar loop!

// Dengan let — aman
for (let j = 0; j < 3; j++) {
  console.log("Di dalam loop:", j); // 0, 1, 2
}
console.log("Di luar loop:", j); // ✗ ReferenceError ← j tidak bisa diakses
```

---

#### Ringkasan Perbandingan Scope

```
var   → Function-scoped
        Hidup selama function berjalan
        Bocor dari if/for/while block

let   → Block-scoped
const → Block-scoped
        Hanya hidup di dalam { } tempat dideklarasikan
        Tidak bocor ke mana-mana
```

---

### Kenapa `var` Berbahaya?

**1. Function-scoped, bukan block-scoped**

```js
// var bocor keluar dari block if
if (true) {
  var playerName = "Alex";
}
console.log(playerName); // "Alex" → var tetap bisa diakses, padahal sudah di luar block!

// let tidak bocor
if (true) {
  let playerName = "Alex";
}
console.log(playerName); // ReferenceError: playerName is not defined ← lebih aman!
```

**2. Bisa dideklarasikan ulang tanpa error**

```js
var score = 0;
var score = 100; // tidak error! → bug tersembunyi yang sulit ditemukan

let score = 0;
let score = 100; // SyntaxError: sudah dideklarasikan ← langsung ketahuan
```

**3. Hoisting yang membingungkan**

```js
console.log(score); // undefined (bukan error!)
var score = 0;

// vs let
console.log(score); // ReferenceError: Cannot access before initialization ← lebih jelas
let score = 0;
```

### Kapan `const` vs `let` dalam praktik

```js
// const → nilai tetap (konfigurasi game, tidak akan berubah)
const MAX_TRIES  = 5;    // Number Guessing: maks 5 tebakan
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const player = { name: "Alex", score: 0 }; // objeknya tetap, tapi propertinya bisa diubah
player.score = 50;  // boleh — mengubah properti, bukan re-assign

// let → nilai berubah (state game yang terus update)
let score = 0;
score += 10;       // boleh — dapat nilai dari tebakan benar

let isGameOver = false;
isGameOver = true; // boleh — saat semua nyawa habis atau percobaan habis

let attempts = 0;
attempts++;        // boleh — setiap kali user menebak

// Ini ERROR:
const MAX_TRIES = 5;
MAX_TRIES = 10;    // TypeError: Assignment to constant variable
```
