# Looping dan Nested Looping

## Konsep Dasar Loop

Loop = "lakukan hal yang sama berulang kali **selama kondisi terpenuhi**"

**Analogi — Makan sampai kenyang:**

```
Mulai
  │
  ▼
Makan satu suap
  │
  ▼
Sudah kenyang? ──── Ya ──▶ Selesai
  │
  Tidak
  │
  └──▶ (kembali ke atas, makan lagi)
```

JavaScript punya 3 jenis loop:

| Jenis | Kapan Pakai | Kondisi dicek |
|---|---|---|
| `for` | Tahu persis berapa kali iterasi | Sebelum tiap iterasi |
| `while` | Kondisi yang menentukan berhenti, bukan angka | Sebelum tiap iterasi |
| `do...while` | Harus jalan minimal 1x, baru cek kondisi | Setelah tiap iterasi |

---

## 1. for Loop

### Struktur

```js
for (awal; kondisi; perubahan) {
  // kode yang diulang
}
```

### Breakdown Tiap Bagian

```
for ( let i = 0 ;  i < 5 ;  i++ )
        ↑           ↑         ↑
    [AWAL]       [KONDISI]  [PERUBAHAN]
    Jalankan      Selama     Lakukan ini
    sekali saat   kondisi    setiap akhir
    loop mulai    true       iterasi
```

### Contoh Dasar

```js
for (let i = 0; i < 5; i ++) {
  console.log("Iterasi ke-" + i);
}
// Output:
// Iterasi ke-0
// Iterasi ke-1
// Iterasi ke-2
// Iterasi ke-3
// Iterasi ke-4
```

**Trace eksekusi:**

```
i=0 → 0 < 5? Ya → cetak "Iterasi ke-0" → i++ → i=1
i=1 → 1 < 5? Ya → cetak "Iterasi ke-1" → i++ → i=2
i=2 → 2 < 5? Ya → cetak "Iterasi ke-2" → i++ → i=3
i=3 → 3 < 5? Ya → cetak "Iterasi ke-3" → i++ → i=4
i=4 → 4 < 5? Ya → cetak "Iterasi ke-4" → i++ → i=5
i=5 → 5 < 5? Tidak → loop berhenti
```

### Contoh: Loop Mundur

```js
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// Output: 5 4 3 2 1
```

Loop tidak harus maju — kondisi dan perubahan bisa dibalik.

### Contoh: Iterasi Array

```js
let gameList = ["Number Guessing", "Rock Paper Scissors", "Clicker"];

for (let i = 0; i < gameList.length; i++) {
  console.log(i + ". " + gameList[i]);
}
// Output:
// 0. Number Guessing
// 1. Rock Paper Scissors
// 2. Clicker
```

`gameList.length` = 3, jadi loop jalan dari `i=0` sampai `i=2` (index terakhir array).

### `break` dan `continue`

**`break`** — berhenti total dari loop:

```js
for (let i = 0; i < 10; i++) {
  if (i === 4) {
    break; // keluar dari loop saat i=4
  }
  console.log(i);
}
// Output: 0 1 2 3
```

**`continue`** — skip iterasi ini, lanjut ke berikutnya:

```js
for (let i = 0; i < 6; i++) {
  if (i === 3) {
    continue; // skip i=3, lanjut ke i=4
  }
  console.log(i);
}
// Output: 0 1 2 4 5
```

---

## 2. while Loop

### Struktur

```js
while (kondisi) {
  // kode yang diulang
  // PENTING: pastikan kondisi akhirnya jadi false, atau infinite loop!
}
```

### Kapan Pakai `while`?

Pakai `while` saat **tidak tahu pasti berapa kali iterasi** — yang kamu tahu hanya kondisi berhentinya.

Contoh: terus minta input sampai user memasukkan angka valid.

### Contoh Dasar

```js
let i = 0;

while (i < 5) {
  console.log("i sekarang: " + i);
  i++;
}
// Output: 0 1 2 3 4
```

### Contoh: Hitung Mundur

```js
let hitungan = 5;

while (hitungan > 0) {
  console.log(hitungan);
  hitungan--;
}
console.log("Selesai!");
// Output: 5 4 3 2 1 Selesai!
```

### ⚠️ Bahaya Infinite Loop

Kalau kondisi **tidak pernah jadi false**, loop jalan selamanya dan browser bisa crash:

```js
// JANGAN DILAKUKAN:
let i = 0;
while (i < 5) {
  console.log(i);
  // lupa i++ → i selalu 0 → kondisi selalu true → infinite loop!
}
```

Pastikan selalu ada sesuatu yang mengubah kondisi menuju `false`.

---

## 3. do...while Loop

### Struktur

```js
do {
  // kode yang diulang
} while (kondisi);
```

### Perbedaan dengan `while`

| | `while` | `do...while` |
|---|---|---|
| Kondisi dicek | **Sebelum** iterasi | **Setelah** iterasi |
| Minimal dijalankan | 0 kali (kalau kondisi langsung false) | **1 kali** (selalu jalan sekali dulu) |

### Contoh

```js
let i = 0;

do {
  console.log(i);
  i++;
} while (i < 3);
// Output: 0 1 2
```

### Contoh: Kondisi Langsung False

```js
let i = 10;

// while: tidak jalan sama sekali
while (i < 3) {
  console.log("while:", i); // tidak pernah tercetak
}

// do...while: tetap jalan sekali
do {
  console.log("do...while:", i); // tercetak sekali: "do...while: 10"
} while (i < 3);
```

Gunakan `do...while` saat kamu butuh kode berjalan **minimal satu kali** sebelum dicek kondisinya.

---

## 4. Nested Loop (Loop Bersarang)

### Konsep

Nested loop = **loop di dalam loop**.

Setiap **satu iterasi outer loop**, inner loop **jalan penuh dari awal sampai selesai**.

### Analogi: Sesi Game Multiplayer

```
Outer loop = Ronde  (Ronde 1, 2, 3)
Inner loop = Pemain (Pemain 1, 2, 3)

"Untuk setiap ronde → semua pemain giliran main"
```

Ini artinya:
- Ronde 1 → Pemain 1, 2, 3 giliran
- Ronde 2 → Pemain 1, 2, 3 giliran
- dst.

### Visualisasi Aliran Eksekusi

```
outer: ronde=1
  inner: pemain=1 → cetak "Ronde 1, Pemain 1"
  inner: pemain=2 → cetak "Ronde 1, Pemain 2"
  inner: pemain=3 → cetak "Ronde 1, Pemain 3"
  inner: selesai → kembali ke outer
outer: ronde=2
  inner: pemain=1 → cetak "Ronde 2, Pemain 1"
  inner: pemain=2 → cetak "Ronde 2, Pemain 2"
  inner: pemain=3 → cetak "Ronde 2, Pemain 3"
  inner: selesai → kembali ke outer
outer: selesai
```

### Kode

```js
for (let ronde = 1; ronde <= 2; ronde++) {
  for (let pemain = 1; pemain <= 3; pemain++) {
    console.log(`Ronde ${ronde}, Pemain ${pemain}`);
  }
}
// Output:
// Ronde 1, Pemain 1
// Ronde 1, Pemain 2
// Ronde 1, Pemain 3
// Ronde 2, Pemain 1
// Ronde 2, Pemain 2
// Ronde 2, Pemain 3
```

### Hitung Total Iterasi

```
Outer loop: 2 iterasi (ronde 1 dan 2)
Inner loop: 3 iterasi per outer (pemain 1, 2, 3)
Total: 2 × 3 = 6 iterasi
```

Semakin banyak nested loop, total iterasi bertambah secara perkalian — perlu diperhatikan saat data besar.

---

## 5. Perbandingan Ketiga Loop

```js
// Cetak angka 1 sampai 3 dengan 3 cara berbeda:

// for loop
for (let i = 1; i <= 3; i++) {
  console.log(i); // 1 2 3
}

// while loop
let i = 1;
while (i <= 3) {
  console.log(i); // 1 2 3
  i++;
}

// do...while loop
let j = 1;
do {
  console.log(j); // 1 2 3
  j++;
} while (j <= 3);
```

Semua menghasilkan output yang sama. Pilih yang paling sesuai konteksnya:
- **`for`** → iterasi terhitung (paling umum)
- **`while`** → iterasi kondisional
- **`do...while`** → butuh minimal satu kali jalan

