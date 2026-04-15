# Nested Loop dengan Contoh Kode (Piramid Bintang & Bubble Sort)

### Visualisasi Mental Nested Loop

```
Outer Loop  →  mengontrol BARIS (berapa banyak baris)
Inner Loop  →  mengontrol KOLOM (berapa banyak karakter per baris)
```

---

## Contoh: Mencetak Bintang (*) Piramid

**Target output:**
```
*
* *
* * *
* * * *
* * * * *
```

**Kode:**

```js
let tinggi = 5;

for (let baris = 1; baris <= tinggi; baris++) {
  //        ↑ outer loop: baris ke-1 sampai ke-5

  let barisIni = "";

  for (let kolom = 1; kolom <= baris; kolom++) {
    //        ↑ inner loop: jumlah bintang = sama dengan no. baris
    barisIni += "* ";
  }

  console.log(barisIni);
}
```

**Trace langkah demi langkah:**

```
baris=1 → inner loop: kolom=1 → "* "           → cetak "* "
baris=2 → inner loop: kolom=1,2 → "* * "       → cetak "* * "
baris=3 → inner loop: kolom=1,2,3 → "* * * "   → cetak "* * * "
baris=4 → inner loop: kolom=1..4 → "* * * * "  → cetak "* * * * "
baris=5 → inner loop: kolom=1..5 → "* * * * * " → cetak "* * * * * "
```

**Kunci pemahamannya:** Inner loop berjalan `baris` kali — jumlah iterasinya mengikuti nilai outer loop.

---

## Contoh: Bubble Sort (Mengurutkan Array)

**Konteks assignment:** Di game seperti Number Guessing atau Clicker, kamu bisa punya leaderboard — array of scores yang perlu diurutkan dari tertinggi ke terendah supaya pemain terbaik tampil di atas.

**Konsep:** Bubble Sort bekerja dengan cara membandingkan dua elemen yang bersebelahan. Kalau yang kiri lebih besar dari yang kanan → tukar posisi. Proses ini diulang terus sampai tidak ada pertukaran lagi, artinya semua sudah urut.

Nama "Bubble" karena elemen terbesar akan terus "menggelembung naik" ke posisi paling kanan setelah setiap pass — seperti gelembung naik ke permukaan.

---

### Visualisasi Satu Pass

Anggap array: `[5, 3, 8, 1, 2]`

```
Pass ke-1: bandingkan pair berdampingan dari kiri ke kanan

[5, 3, 8, 1, 2]
 ↑  ↑
 5 > 3? Ya → tukar → [3, 5, 8, 1, 2]

[3, 5, 8, 1, 2]
    ↑  ↑
    5 > 8? Tidak → tetap → [3, 5, 8, 1, 2]

[3, 5, 8, 1, 2]
       ↑  ↑
       8 > 1? Ya → tukar → [3, 5, 1, 8, 2]

[3, 5, 1, 8, 2]
          ↑  ↑
          8 > 2? Ya → tukar → [3, 5, 1, 2, 8]

Setelah Pass ke-1: [3, 5, 1, 2, 8]   ← 8 sudah di posisi akhir ✓
```

Setelah setiap pass, elemen terbesar yang tersisa sudah "naik" ke posisi akhirnya. Maka pass berikutnya tidak perlu memeriksa elemen terakhir lagi → inner loop berkurang batasnya (`n - i - 1`).

---

### Trace Lengkap: `[5, 3, 8, 1, 2]`

```
Awal       : [5, 3, 8, 1, 2]
Pass ke-1  : [3, 5, 1, 2, 8]   ← 8 terkunci di index 4
Pass ke-2  : [3, 1, 2, 5, 8]   ← 5 terkunci di index 3
Pass ke-3  : [1, 2, 3, 5, 8]   ← 3 terkunci di index 2
Pass ke-4  : [1, 2, 3, 5, 8]   ← tidak ada pertukaran, sudah urut
```

---

### Kode

```js
let angka = [5, 3, 8, 1, 2];
let n = angka.length;

for (let i = 0; i < n - 1; i++) {
  // Outer loop: mengontrol berapa kali "pass" diulang
  // i=0 → pass ke-1 (periksa sampai index n-1)
  // i=1 → pass ke-2 (periksa sampai index n-2, karena [n-1] sudah urut)

  for (let j = 0; j < n - i - 1; j++) {
    // Inner loop: bandingkan pasangan angka[j] vs angka[j+1]
    // Batas makin kecil (n - i - 1) karena setiap pass,
    // elemen terbesar sudah "terkunci" di ujung kanan

    if (angka[j] > angka[j + 1]) {
      // Swap: tukar posisi menggunakan variabel sementara
      let temp     = angka[j];
      angka[j]     = angka[j + 1];
      angka[j + 1] = temp;
    }
  }

  console.log(`Setelah pass ke-${i + 1}:`, [...angka]);
}

console.log("Hasil akhir:", angka);
```

**Output:**

```
Setelah pass ke-1: [3, 5, 1, 2, 8]
Setelah pass ke-2: [3, 1, 2, 5, 8]
Setelah pass ke-3: [1, 2, 3, 5, 8]
Setelah pass ke-4: [1, 2, 3, 5, 8]
Hasil akhir: [1, 2, 3, 5, 8]
```

---

### Kenapa batas inner loop adalah `n - i - 1`?

```
n     = 5 (jumlah elemen)
i     = pass ke-berapa (mulai dari 0)

Pass ke-1 (i=0): n - 0 - 1 = 4 → j sampai index 3 (bandingkan [3] vs [4])
Pass ke-2 (i=1): n - 1 - 1 = 3 → j sampai index 2 (bandingkan [2] vs [3])
Pass ke-3 (i=2): n - 2 - 1 = 2 → j sampai index 1 (bandingkan [1] vs [2])

Semakin banyak pass → semakin sedikit yang perlu diperiksa
karena elemen-elemen terbesar sudah "naik" ke kanan dan terkunci
```

---

### Peran masing-masing loop (ringkasan)

```
Outer loop (i) → berapa kali array "disapu" dari kiri ke kanan
                 Tiap satu pass selesai → 1 elemen terbesar terkunci di kanan
                 Total: maksimal n-1 pass

Inner loop (j) → membandingkan dan menukar pasangan [j] vs [j+1]
                 Berjalan dari index 0 sampai batas yang makin menyempit
                 Agar tidak menyentuh elemen yang sudah terkunci
```

---

### Versi dengan Early Exit (Optimasi)

Jika array sudah urut sebelum semua pass selesai, kita bisa berhenti lebih awal:

```js
let angka = [1, 2, 3, 4, 5]; // sudah urut
let n = angka.length;
let jumlahPass = 0;

for (let i = 0; i < n - 1; i++) {
  let adaPertukaran = false;

  for (let j = 0; j < n - i - 1; j++) {
    if (angka[j] > angka[j + 1]) {
      let temp     = angka[j];
      angka[j]     = angka[j + 1];
      angka[j + 1] = temp;
      adaPertukaran = true;
    }
  }

  jumlahPass++;

  // Jika pass ini tidak ada pertukaran sama sekali → sudah urut, berhenti
  if (!adaPertukaran) break;
}

console.log("Hasil:", angka);       // [1, 2, 3, 4, 5]
console.log("Pass dilakukan:", jumlahPass); // 1 (bukan 4!)
```
