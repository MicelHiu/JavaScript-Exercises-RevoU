# "Bingung kapan pakai HOF, Class, atau Function biasa — dan mana yang harus dibuat duluan?"

Solusinya: **tentukan struktur dulu baru code**.

Framework berpikir yang bisa dipakai:

```
1. Apa yang perlu disimpan? → tentukan DATA (variabel/object/array)
2. Apa yang perlu dilakukan terhadap data itu? → tentukan AKSI (function/method)
3. Kalau ada banyak object dengan struktur sama, perlu CLASS
4. Kalau aksi butuh diulang ke seluruh array, pakai HOF (map/filter/reduce)
```

---

## Peta Keputusan: Pakai Apa?

```
Perlu berulang kali buat object dengan bentuk yang sama?
    └── YA  → CLASS
    └── TIDAK → Object literal biasa atau function

Punya array + perlu transformasi / seleksi / akumulasi data?
    └── Transformasi semua elemen     → map()
    └── Ambil sebagian elemen         → filter()
    └── Gabungkan jadi satu nilai     → reduce()
    └── Cari satu elemen              → find() / findIndex()

Perlu aksi/logika yang bisa dipakai ulang?
    └── Terkait erat dengan object    → METHOD (di dalam class/object)
    └── Berdiri sendiri / utility     → FUNCTION biasa

Logika berjalan di background / butuh waktu (API, database)?
    └── Async function + await
```

---

## Real Case 1 — Number Guessing Game (dari nol)

### Skenario
Kamu diminta bikin game yang bisa:
- Generate angka rahasia acak antara 1–100
- Terima tebakan dari player
- Kasih hint "terlalu kecil" / "terlalu besar"
- Batasi percobaan maksimum 5 kali

### Step 1: Tentukan DATA dulu

```javascript
// Data satu putaran game → object
const state = {
  angkaRahasia : 0,
  sisaPercobaan: 5,
  riwayat      : []
};
```

### Step 2: Tentukan AKSI yang dibutuhkan

- Generate angka → `Math.random()` + function biasa
- Evaluasi tebakan → function biasa (input angka → output feedback)
- Cek apakah game selesai → function biasa
- Reset game → function biasa

→ Tidak ada **banyak instance** yang perlu dibuat, cukup **function biasa** atau **object literal dengan method**

### Step 3: Tulis kodenya

```javascript
// ✅ Pakai function biasa — aksi berdiri sendiri, tidak perlu class
function generateAngkaRahasia(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  // Breakdown: Math.floor(Math.random() * (max - min + 1)) + min
  //
  // Math.random()          → angka desimal acak antara 0 (inklusif) sampai 1 (eksklusif)
  //                          contoh: 0.0, 0.37, 0.82, 0.999...
  //
  // (max - min + 1)        → jumlah angka yang tersedia dalam range
  //                          contoh: min=1, max=100 → (100 - 1 + 1) = 100 angka
  //
  // Math.random() * 100    → desimal acak antara 0 sampai 99.999...
  //
  // Math.floor(...)        → bulatkan ke bawah → jadi integer 0 sampai 99
  //
  // + min                  → geser ke range yang benar → jadi 1 sampai 100

function evaluasiTebakan(tebakan, angkaRahasia) {
  if (tebakan === angkaRahasia) return { status: "menang", pesan: "🎉 Selamat!" };
  if (tebakan < angkaRahasia)   return { status: "lanjut", pesan: "⬆️ Lebih besar" };
  if (tebakan > angkaRahasia)   return { status: "lanjut", pesan: "⬇️ Lebih kecil" };
}

// ✅ Pakai object literal dengan method — data + aksi terkait
const game = {
  angkaRahasia : generateAngkaRahasia(),
  sisaPercobaan: 5,
  riwayat      : [],

  tebak(angka) {
    this.sisaPercobaan--;
    const feedback = evaluasiTebakan(angka, this.angkaRahasia);
    this.riwayat.push({ angka, ...feedback });
    return feedback;
  },

  reset() {
    this.angkaRahasia  = generateAngkaRahasia();
    this.sisaPercobaan = 5;
    this.riwayat       = [];
  }
};

// Contoh Pemakaian
const { status, pesan } = game.tebak(42);
document.getElementById("hint").textContent = pesan;

if (status === "menang" || game.sisaPercobaan === 0) {
  document.getElementById("result").textContent =
    status === "menang" ? "Kamu menang!" : `Game Over! Angkanya: ${game.angkaRahasia}`;
}
```

### Kenapa tidak pakai Class di sini?

Karena kita hanya punya **satu game session** — tidak perlu template untuk membuat banyak instance game secara bersamaan. Kalau ingin bisa main **dua game paralel** (mis. mode duel), barulah kita menggunakan Class.

## Real Case 2 — Memory Card Game (Class + HOF)

### Skenario yang lebih kompleks
Game punya banyak kartu. Player bisa:
- Lihat semua kartu (tertutup)
- Balik dua kartu per giliran
- Kalau cocok → kartu tetap terbuka
- Kalau tidak cocok → kartu tutup lagi setelah sebentar
- Game selesai kalau semua pasangan ditemukan

### Step 1: Identifikasi entity yang butuh BANYAK INSTANCE

Dalam satu session game, kita hanya butuh **satu board** — tapi board itu punya banyak state yang saling terkait, artinya kita butuh pakai **Class**.

### Step 2: Tulis Class

```javascript
class MemoryGame {
  constructor(simbol) {
    // duplikat array simbol (biar ada pasangannya), lalu acak urutannya
    this.kartu       = [...simbol, ...simbol].sort(() => Math.random() - 0.5);
    this.terbuka     = new Array(this.kartu.length).fill(false); // [false, false, false, false, false, false, true, false]
    this.cocok       = new Array(this.kartu.length).fill(false); // [false, false, false, false, false, false, false, false]
    this.pilihanSatu = null;   // index kartu pertama yang dibalik
    this.sedangCek   = false;  // lock saat animasi cek pasangan
    this.jumlahCoba  = 0;
  }

  balik(index) {
    // Abaikan klik jika sedang cek, sudah cocok, atau kartu sama
    if (this.sedangCek || this.cocok[index] || index === this.pilihanSatu) return;

    this.terbuka[index] = true;

    if (this.pilihanSatu === null) {
      // Kartu pertama — simpan dan tunggu kartu kedua
      this.pilihanSatu = index;
    } else {
      // Kartu kedua — evaluasi pasangan
      this.jumlahCoba++;
      this.sedangCek = true;
      this.cekPasangan(this.pilihanSatu, index);
    }
  }

  cekPasangan(i, j) {
    if (this.kartu[i] === this.kartu[j]) {
      // HOF: tandai kedua kartu sebagai cocok
      [i, j].forEach(idx => { this.cocok[idx] = true; });
      this.pilihanSatu = null;
      this.sedangCek   = false;
    } else {
      // Tidak cocok — tutup lagi setelah 600ms
      setTimeout(() => {
        this.terbuka[i] = false;
        this.terbuka[j] = false;
        this.pilihanSatu = null;
        this.sedangCek   = false;
        this.render();
      }, 600);
    }
    this.render();
  }

  sudahSelesai() {
    // HOF every() — semua kartu sudah cocok?
    return this.cocok.every(Boolean);
  }

  render() {
    // HOF map() + join() — render semua kartu ke HTML
    document.getElementById("board").innerHTML = this.kartu
      .map((simbol, i) => `
        <div class="kartu ${this.cocok[i] ? 'cocok' : ''}" onclick="game.balik(${i})">
          ${this.terbuka[i] || this.cocok[i] ? simbol : "❓"}
        </div>
      `)
      .join("");
  }
}
```

### Step 3: Pakai di halaman game

```javascript
const game = new MemoryGame(["🍎", "🍌", "🍇", "🍓", "🍒", "🍑"]);
game.render();

// Cek kondisi menang — dipanggil setelah tiap cekPasangan
function cekMenang() {
  if (game.sudahSelesai()) {
    document.getElementById("result").textContent =
      `🏆 Selesai dalam ${game.jumlahCoba} percobaan!`;
  }
}
```

## Cara Membaca Skenario → Tentukan Struktur

Ini adalah langkah-langkah yang bisa dijadikan kebiasaan:

### Sebelum nulis kode apapun, tanya 3 pertanyaan ini:

**1. "Data apa yang perlu disimpan?"**
- Satu nilai sederhana → variabel biasa (`let`, `const`)
- Kumpulan data terstruktur → object `{}`
- Banyak item sejenis → array `[]`
- Banyak object dengan struktur sama yang akan dibuat berulang → **Class**

**2. "Aksi apa yang perlu dilakukan?"**
- Terkait erat dengan satu object → **method** di dalam class/object
- Berdiri sendiri, bisa dipakai di mana saja → **function biasa**
- Aksi atas seluruh array → **HOF** (map/filter/reduce)

**3. "Ada data yang perlu diambil dari luar? (API/server)"**
- Ada → **async function + await**

---

## Rangkuman: Kapan Pakai Apa

| Tool | Kapan Pakai | Contoh |
|---|---|---|
| **Function biasa** | Aksi utility yang berdiri sendiri | `formatHarga(angka)`, `cekEmail(str)` |
| **Method** | Aksi yang terikat dengan data sebuah object | `keranjang.tambah()`, `user.logout()` |
| **Class** | Perlu buat banyak object dengan struktur sama | `new Produk(...)`, `new Keranjang()` |
| **HOF (map)** | Transformasikan setiap elemen array | Ubah semua harga dari Rupiah ke Dollar |
| **HOF (filter)** | Ambil elemen array yang memenuhi syarat | Ambil produk yang stoknya > 0 |
| **HOF (reduce)** | Gabungkan array jadi satu nilai | Hitung total belanja |
| **Async/Await** | Ambil/kirim data ke server | `await fetch('...')` |

---

> **Tips terakhir:** Jangan overthink di awal. Mulai dengan yang paling sederhana — function biasa. Baru refactor ke class atau HOF ketika kode mulai terasa berulang atau susah dikelola. "Make it work first, then make it right."

