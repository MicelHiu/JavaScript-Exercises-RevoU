# "Kapan waktu yang tepat menggunakan method dan dimana biasanya peletakannya yang benar?"

> **Function** = blok kode yang berdiri sendiri, dipanggil dengan namanya langsung.

> **Method** = function yang **melekat pada sebuah object**. Dipanggil melalui object tersebut.

```javascript
// Ini adalah FUNCTION biasa
function sapa(nama) {
  return `Halo, ${nama}!`;
}
console.log(sapa("Budi")); // dipanggil langsung
// output: "Halo, Budi!"

// Ini adalah METHOD — melekat pada object
const orang = {
  nama: "Budi",
  sapa: function() {          // ini adalah method
    return `Halo, ${this.nama}!`;
  }
};
console.log(orang.sapa()); // dipanggil melalui object-nya
// output: "Halo, Budi!"
```

---

## Kategori Method

Ada dua jenis method yang sering dijumpai:

### 1. Built-in Methods

Method yang sudah disediakan JavaScript secara default. Kalian tidak perlu bikin sendiri — tinggal pakai.

**String Methods:**
```javascript
const kalimat = "halo dunia";

kalimat.toUpperCase();     // "HALO DUNIA"
kalimat.includes("dunia"); // true
kalimat.split(" ");        // ["halo", "dunia"]
kalimat.replace("halo", "selamat pagi"); // "selamat pagi dunia"
kalimat.length;            // 10 (sebenarnya ini property, bukan method)
```

**Array Methods:**
```javascript
const buah = ["apel", "mangga", "jeruk"];

buah.push("pisang");       // tambah di akhir → ["apel", "mangga", "jeruk", "pisang"]
buah.pop();                // hapus dari akhir → kembalikan "pisang"
buah.includes("apel");     // true
buah.indexOf("mangga");    // 1
buah.join(", ");           // "apel, mangga, jeruk"
```

> **Catatan:** `map()`, `filter()`, dan `reduce()` juga termasuk array method, tapi perlu membahas Higher-Order Functions (HOF) terlebih dahulu.

**Number Methods:**
```javascript
const harga = 12345.6789;

harga.toFixed(2);          // "12345.68" — bulatkan ke 2 desimal (hasilnya STRING, bukan number)
harga.toFixed(0);          // "12346"    — bulatkan ke 0 desimal

// Kalau angkanya sudah bulat, toFixed() tetap menambahkan desimal sesuai permintaan:
const bulat = 5000;
bulat.toFixed(2);          // "5000.00" — tetap tulis 2 angka di belakang koma
bulat.toFixed(0);          // "5000"    — tidak ada koma sama sekali

// Number.isInteger — cek apakah sebuah nilai adalah bilangan bulat (integer)
Number.isInteger(42);      // true  — 42 tidak punya bagian desimal
Number.isInteger(42.0);    // true  — 42.0 secara matematis sama dengan 42
Number.isInteger(42.5);    // false — ada bagian desimal (.5)
Number.isInteger("42");    // false — string, bukan number
Number.isInteger(NaN);     // false — NaN bukan integer

// ── Apa itu NaN? ──────────────────────────────────────────────
// NaN = "Not a Number" — hasil dari operasi angka yang tidak valid
// Anehnya, typeof NaN === "number" (JavaScript tetap menganggapnya tipe number)
const a = "teks" * 2;     // NaN — tidak bisa kalikan string dengan angka
const b = parseInt("abc"); // NaN — tidak bisa parse "abc" jadi angka
// parseInt() = mengubah string menjadi bilangan bulat: parseInt("42") → 42, parseInt("42px") → 42, parseInt("abc") → NaN
const c = 0 / 0;           // NaN — tak tentu secara matematika
// Satu keanehan lagi: NaN !== NaN (NaN tidak sama dengan dirinya sendiri!)
console.log(NaN === NaN);  // false — satu-satunya nilai di JS yang tidak equal dengan dirinya

// Number.isNaN — cek apakah sebuah nilai benar-benar NaN
Number.isNaN(NaN);         // true  — NaN yang asli
Number.isNaN(0 / 0);       // true  — operasi yang menghasilkan NaN
Number.isNaN("NaN");       // false — string "NaN", bukan nilai NaN
Number.isNaN(undefined);   // false — undefined bukan NaN (walau isNaN() global bilang true)
Number.isNaN(42);          // false — angka biasa
```

**Object Methods:**
```javascript
const user = { nama: "Budi", umur: 25, kota: "Jakarta" };

Object.keys(user);         // ["nama", "umur", "kota"]
Object.values(user);       // ["Budi", 25, "Jakarta"]
Object.entries(user);      // [["nama","Budi"], ["umur",25], ["kota","Jakarta"]]
```

---

### 2. Custom Methods

**Di dalam Object Literal:**
```javascript
const kalkulator = {
  // cara lama — pakai kata kunci "function"
  tambah: function(a, b) {  // ← METHOD
    return a + b;
  },
  kurang: function(a, b) {  // ← METHOD
    return a - b;
  },

  // ES6 shorthand — hilangkan ": function", hasilnya sama persis
  kali(a, b) {  // ← METHOD (sama dengan   kali: function(a, b) { ... })
    return a * b;
  }
};

kalkulator.tambah(5, 3); // 8
kalkulator.kali(4, 2);   // 8
```

**Di dalam Class:**

> **Apa itu `this`?**
> `this` adalah kata kunci yang merujuk ke **object yang sedang aktif saat itu**. Bayangkan sebuah class sebagai *cetakan* — dari satu cetakan `Mobil` bisa dibuat banyak object mobil yang berbeda. `this` memastikan setiap object mengakses datanya sendiri, bukan data object lain.

```javascript
// Dari satu class, bisa dibuat banyak object berbeda
const mobil1 = new Mobil("Toyota", "Merah");
//  new = "buat object baru dari class ini"
//  "Toyota" → masuk sebagai parameter `merk`  → disimpan ke this.merk
//  "Merah"  → masuk sebagai parameter `warna` → disimpan ke this.warna

const mobil2 = new Mobil("Honda", "Putih");
//  object terpisah — punya this.merk dan this.warna sendiri
```

```javascript
// Kalau tidak pakai "this", method tidak tahu data milik siapa yang dipakai:
class MobilRusak {
  constructor(merk, warna) {
    merk;    // ❌ nilai ini langsung hilang — tidak disimpan ke mana-mana
    warna;   // ❌ sama, tidak tersimpan
  }
  info() {
    return merk; // ❌ Error: merk is not defined
  }
}
```

```javascript
// Yang benar — pakai "this" untuk simpan dan akses data object
class Mobil {
  constructor(merk, warna) {
    this.merk  = merk;   // simpan ke object ini
    this.warna = warna;  // simpan ke object ini
  }

  info() {
    return `${this.merk} berwarna ${this.warna}`;  // akses data milik object ini
  }
}

const mobil = new Mobil("Toyota", "Merah");
console.log(mobil.info()); // "Toyota berwarna Merah"
```

---

## Kapan Menggunakan Method?

Gunakan **method** ketika:

| Kondisi | Contoh |
|---|---|
| Aksi yang berhubungan dengan sebuah object/data | `user.logout()`, `cart.addItem()` |
| Aksi yang perlu mengakses/mengubah data `this` | `this.nama`, `this.saldo` |
| Membangun class/blueprint untuk object | `class BankAccount { tarik() {} }` |
| Memanfaatkan built-in JavaScript | `.map()`, `.filter()`, `.push()` |
---
Gunakan **function biasa** ketika:

| Kondisi | Contoh |
|---|---|
| Aksi berdiri sendiri, tidak terikat data tertentu | `hitungPPN(harga)` |
| Utility function yang dipakai di mana-mana | `formatTanggal(date)` |
| Tidak perlu akses `this` | `jumlahkan(a, b)` |

---

## Dimana Peletakan Method yang Benar?

### Aturan Umum: Method Diletakkan Sedekat Mungkin dengan Data yang Digunakannya

```javascript
// ✅ BENAR — data dan aksi game ada di satu tempat
const numberGame = {
  // Data (state) game
  angkaRahasia : Math.floor(Math.random() * 100) + 1,
  sisaPercobaan: 5,
  riwayat      : [],

  // Method — aksesnya this.angkaRahasia, this.sisaPercobaan, this.riwayat
  tebak(angka) {
    this.sisaPercobaan--;
    this.riwayat.push(angka);

    if (angka === this.angkaRahasia) return "🎉 Benar!";
    if (angka < this.angkaRahasia)   return "⬆️ Terlalu kecil";
    return "⬇️ Terlalu besar";
  },

  sudahHabis() {
    return this.sisaPercobaan <= 0;
  },

  reset() {
    this.angkaRahasia  = Math.floor(Math.random() * 100) + 1;
    this.sisaPercobaan = 5;
    this.riwayat       = [];
  }
};

const hasil = numberGame.tebak(42);
document.getElementById("feedback").textContent = hasil;

if (numberGame.sudahHabis()) {
  document.getElementById("status").textContent = "Game Over!";
}
```

```javascript
// ❌ KURANG TEPAT — data game terpencar sebagai variabel global
let angkaRahasia  = Math.floor(Math.random() * 100) + 1;
let sisaPercobaan = 5;
let riwayat       = [];

// Fungsi ini bergantung pada variabel global di atas — rentan bug dan susah di-reset
function tebakAngka(angka) {
  sisaPercobaan--;
  riwayat.push(angka);
  // ...
}
```

---

## Real Case: Rock Paper Scissors Game

Mari lihat bagaimana method diorganisir dalam satu game yang lengkap.

```javascript
class RockPaperScissors {
  constructor() {
    this.skorPemain   = 0;
    this.skorKomputer = 0;
    this.riwayat      = [];
  }

  // Method utility — logika murni, tidak mengubah state
  pilihanKomputer() {
    const pilihan = ["rock", "paper", "scissors"];
    return pilihan[Math.floor(Math.random() * pilihan.length)];
  }

  tentukaPemenang(pemain, komputer) {
    if (pemain === komputer) return "seri";
    const menang = { rock: "scissors", paper: "rock", scissors: "paper" };
    return menang[pemain] === komputer ? "pemain" : "komputer";
  }

  // Method utama — memanggil method lain dan mengubah state
  main(pilihanPemain) {
    const pilihanKomp = this.pilihanKomputer();
    const hasil       = this.tentukaPemenang(pilihanPemain, pilihanKomp);

    if (hasil === "pemain")   this.skorPemain++;
    if (hasil === "komputer") this.skorKomputer++;

    this.riwayat.push({ pemain: pilihanPemain, komputer: pilihanKomp, hasil });
    return { pilihanKomp, hasil };
  }

  tampilkanSkor() {
    return `Kamu: ${this.skorPemain} — Komputer: ${this.skorKomputer}`;
  }

  reset() {
    this.skorPemain   = 0;
    this.skorKomputer = 0;
    this.riwayat      = [];
  }
}

// Pemakaian — event listener tombol pilihan
const game = new RockPaperScissors();

document.querySelectorAll(".pilihan-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const { pilihanKomp, hasil } = game.main(btn.dataset.pilihan);

    document.getElementById("komputer").textContent = pilihanKomp;
    document.getElementById("hasil").textContent    =
      hasil === "seri"    ? "Seri! 🤝" :
      hasil === "pemain"  ? "Kamu Menang! 🎉" : "Kamu Kalah 😢";
    document.getElementById("skor").textContent     = game.tampilkanSkor();
  });
});
```

---

## Ringkasan: Pola yang Mudah Diingat

| Situasi | Gunakan |
|---|---|
| Aksi berdiri sendiri, tidak butuh data dari object | **Function biasa** |
| Aksi yang terkait data sebuah object / butuh `this` | **Method di dalam object/class** |
| Fitur bawaan JavaScript (string, array, number) | **Built-in method** |
| Bikin banyak object dari satu blueprint | **Class + method** |

**Cara paling mudah mengecek:** Apakah function ini perlu tahu "milik siapa data ini"? Kalau iya → method. Kalau tidak → function biasa.