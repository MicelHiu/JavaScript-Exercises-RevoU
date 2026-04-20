# "Penjelasan Lebih Lengkap tentang IIFE (Immediately Invoked Function Expression)"

## Mulai dari Masalah yang Dipecahkan IIFE

Sebelum membahas IIFE, kita harus paham dulu masalah apa yang membuatnya diciptakan.

### Masalah: Global Scope Pollution

Bayangkan kalian punya dua file JavaScript yang diload bersamaan di browser:

```javascript
// file-a.js
var counter = 0;
var nama = "Budi";

// file-b.js (dari library lain / teman satu tim)
var counter = 100; // ← nama sama! nilai counter dari file-a jadi tertimpa
var nama = "Ani";  // ← ini juga tertimpa
```

Karena `var` bersifat **global** (bisa diakses dari mana saja), variabel di dua file bisa saling menimpa tanpa sadar. Ini bug yang sangat susah dilacak.

**IIFE adalah solusi untuk mengisolasi variabel agar tidak mencemari global scope.**

---

## Apa Itu IIFE?

**IIFE = Immediately Invoked Function Expression**

Definisi dalam satu kalimat:
> IIFE adalah fungsi yang **langsung dieksekusi** pada saat ia didefinisikan, tanpa perlu dipanggil secara terpisah.

---

## Bedah Syntax IIFE Bagian per Bagian

```javascript
(function() {
  // kode di dalam sini
})();
```

breakdown:

```
  (   function() { ... }   )   ()
  ↑                        ↑   ↑
  |                        |   |
Kurung pembungkus      Kurung  Kurung pemanggil
(membuat ekspresi)    penutup  (eksekusi sekarang!)
```

**Kenapa perlu kurung pembungkus `(function(){...})`?**

Coba tanpa kurung:

```javascript
function() {   // ← SyntaxError!
  console.log("halo");
}();
```

JavaScript membaca `function` di awal baris → mengira ini **function declaration** → function declaration tidak boleh anonim dan tidak bisa langsung dipanggil.

Dengan membungkus dalam `(...)`, JavaScript tahu ini adalah **ekspresi** (bukan deklarasi), sehingga boleh anonim dan boleh langsung dipanggil.

**Kurung pemanggil `()` di akhir:**

```javascript
(function() {
  console.log("halo");
});      // ← fungsi didefinisikan, tapi TIDAK dijalankan

(function() {
  console.log("halo");
})();    // ← fungsi didefinisikan DAN langsung dijalankan → "halo"
```

---

## Variasi Penulisan IIFE

Semua cara di bawah ini valid dan menghasilkan hal yang sama:

```javascript
// Cara 1 — paling umum (kurung pembungkus di luar)
(function() {
  console.log("IIFE cara 1");
})();

// Cara 2 — kurung pemanggil di dalam pembungkus
(function() {
  console.log("IIFE cara 2");
}());

// Cara 3 — dengan arrow function (ES6)
(() => {
  console.log("IIFE cara 3");
})();

// Cara 4 — dengan parameter
(function(nama) {
  console.log(`Halo, ${nama}!`);
})("Budi"); // "Budi" dikirim sebagai argument
```

---

## Demonstrasi: IIFE Mengisolasi Scope

```javascript
// Tanpa IIFE — variabel mencemari global scope
let counter = 0;
const pesan = "Saya global";

console.log(counter); // 0 (bisa diakses dari mana saja)
console.log(pesan);   // "Saya global"


// Dengan IIFE — variabel terisolasi
(function() {
  let counter = 0;       // hanya ada di dalam IIFE
  const pesan = "Saya private";
  counter++;
  console.log(counter);  // 1
  console.log(pesan);    // "Saya private"
})();

console.log(typeof counter); // "undefined" — tidak ada di global scope!
console.log(typeof pesan);   // "undefined" — bersih!
```

---

## Use Case Nyata IIFE

### Use Case 1 — Inisialisasi Game Saat Halaman Dimuat

Game perlu setup awal yang dijalankan sekali begitu halaman dibuka. IIFE cocok karena langsung jalan dan tidak meninggalkan variabel sementara di global scope.

```javascript
// Setup awal RevoFun — jalan otomatis sekali saat file dimuat
(function() {
  // Ambil preferensi tersimpan
  const temaTersimpan  = localStorage.getItem("revofun-theme") || "dark";
  const namaTersimpan  = localStorage.getItem("revofun-nama")  || "";

  // Terapkan tema
  document.body.setAttribute("data-theme", temaTersimpan);

  // Isi nama player jika sudah pernah diisi
  const inputNama = document.getElementById("player-name");
  if (inputNama && namaTersimpan) {
    inputNama.value = namaTersimpan;
  }

  // Tandai link navigasi yang aktif berdasarkan halaman saat ini
  const halamanAktif = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === halamanAktif) {
      link.classList.add("active");
    }
  });

  console.log("RevoFun siap! 🎮");
  // temaTersimpan, namaTersimpan tidak "bocor" ke global scope
})();
```

### Use Case 2 — Isolasi Kode Tiap File Game

Project RevoFun punya beberapa file JS yang diload bersamaan: satu per game. Tanpa isolasi, variabel di satu game bisa menimpa variabel game lain.

```javascript
// game-tebak-angka.js
(function() {
  let angkaRahasia  = Math.floor(Math.random() * 100) + 1;  // variabel lokal
  let sisaPercobaan = 5;

  function tebak(input) { /* ... */ }
  function reset()      { /* ... */ }

  window.tebakAngka = { tebak, reset }; // expose hanya yang perlu
})();

// game-rps.js — diload di halaman berbeda
(function() {
  let skorPemain   = 0;   // tidak konflik dengan variabel di game-tebak-angka.js
  let skorKomputer = 0;   // meskipun namanya sama, aman karena IIFE masing-masing

  function main(pilihan) { /* ... */ }

  window.rpsGame = { main };
})();
```

Tanpa IIFE, semua `let`/`var` di top-level script akan berbagi global scope di browser lama. Dengan IIFE, tiap file game punya "ruang privasinya" sendiri.

> **Catatan `window.tebakAngka = { tebak, reset }`:** Variabel di dalam IIFE tidak bisa diakses dari luar. Tapi kalau perlu expose sebagian fungsi ke luar (misal supaya bisa dipanggil dari HTML atau file JS lain), sengaja di-assign ke `window` — object global browser. Ini "pintu keluar" yang terkontrol: yang lain tetap private.

### Use Case 3 — Module Pattern: Score Manager

IIFE bisa dipakai membuat "modul" dengan data private dan interface public — cocok untuk fitur leaderboard/skor.

```javascript
const scoreManager = (function() {
  // PRIVATE — tidak bisa diakses dari luar
  const MAKS_SIMPAN = 10;
  let skorSesi      = {};   // { "tebak-angka": 5, "rps": 3 }

  function kunciGame(namaGame) {
    return `revofun-leaderboard-${namaGame}`;
  }

  // PUBLIC — dikembalikan sebagai object
  return {
    simpan(namaGame, namaPlayer, skor) {
      const kunci = kunciGame(namaGame);                             // pakai fungsi private
      const data  = JSON.parse(localStorage.getItem(kunci) || "[]");

      data.push({ nama: namaPlayer, skor, tanggal: new Date().toLocaleDateString("id-ID") });
      data.sort((a, b) => b.skor - a.skor);

      localStorage.setItem(kunci, JSON.stringify(data.slice(0, MAKS_SIMPAN)));

      // Update skor sesi (hanya selama halaman terbuka)
      skorSesi[namaGame] = Math.max(skorSesi[namaGame] || 0, skor);
    },

    ambil(namaGame) {
      const kunci = kunciGame(namaGame);
      return JSON.parse(localStorage.getItem(kunci) || "[]");
    },

    skorTertinggiSesi(namaGame) {
      return skorSesi[namaGame] || 0;
    }
  };
})();

// Pemakaian
scoreManager.simpan("tebak-angka", "Budi", 95);
console.log(scoreManager.ambil("tebak-angka"));     // array leaderboard
console.log(scoreManager.skorTertinggiSesi("tebak-angka")); // 95

// Tidak bisa akses langsung:
console.log(typeof MAKS_SIMPAN); // "undefined" — private!
console.log(typeof skorSesi);    // "undefined" — private!
```


---

## Pertanyaan Umum: "Kenapa Tidak Pakai `let`/`const` Saja?"

```javascript
// ✅ let/const cukup untuk mengisolasi variabel di DALAM satu file
{
  let counter = 0;   // block scope — tidak bocor ke luar
  counter++;
}
console.log(typeof counter); // "undefined" ✅
```

`let` dan `const` punya **block scope** — sudah cukup untuk isolasi variabel di satu file.

**Tapi IIFE tetap dibutuhkan untuk dua hal yang `let`/`const` tidak bisa:**

| Kebutuhan | `let`/`const` | IIFE |
|---|---|---|
| Isolasi variabel dalam satu file | ✅ Bisa (block scope) | ✅ Bisa |
| **Kode otomatis jalan saat file dimuat** | ❌ Tidak | ✅ Bisa |
| **Module pattern** (data private + interface public) | ❌ Tidak | ✅ Bisa |
| Kompatibilitas kode lama (`var`) | ❌ Tidak | ✅ Bisa |

Jadi: untuk **isolasi sederhana** → `let`/`const` sudah cukup. Untuk **setup otomatis** atau **module pattern** → IIFE masih relevan.

---

## IIFE vs Function Biasa — Kapan Pakai Yang Mana?

| | Function Biasa | IIFE |
|---|---|---|
| **Dipanggil** | Kapan saja, berkali-kali | Sekali, langsung saat didefinisikan |
| **Bisa dipakai ulang?** | Ya | Tidak (didesain untuk sekali jalan) |
| **Scope variabel** | Tergantung di mana dideklarasikan | Selalu terisolasi |
| **Kapan pakai?** | Logika yang perlu dipakai berulang | Inisialisasi, setup sekali, isolasi scope |

---

## IIFE di Dunia Modern

Di JavaScript modern dengan ES6+ dan sistem module (`import/export`), IIFE jarang dipakai untuk keperluan isolasi scope karena masalah global scope sudah diselesaikan oleh sistem module. Namun IIFE masih relevan untuk:

- Kode legacy (library/code lama)
- Inisialisasi yang perlu jalan sekali
- Membaca source code library populer (jQuery, dll)
- Memahami konsep closure yang menjadi dasarnya

```javascript
// Modern: pakai module (import/export)
// utils.js
export function hitungPPN(harga) {
  return harga * 0.11;
}

// main.js
import { hitungPPN } from './utils.js';
```

---

## Ringkasan

```
IIFE = Fungsi yang langsung dieksekusi saat didefinisikan

Syntax:
  (function() { ... })();
  (() => { ... })();         ← versi arrow function

Tujuan utama:
  1. Isolasi scope → variabel tidak bocor ke global
  2. Jalankan kode sekali saja secara otomatis
  3. Module pattern → data private, interface public

Tanda kurung:
  (function(){})  ← mengubah function declaration → function expression
  ()              ← memanggil/mengeksekusi function tersebut
```

