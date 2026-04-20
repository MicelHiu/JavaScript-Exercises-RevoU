# IIFE, Closures, dan try/catch/finally — Cara Penggunaannya

> Fokus dokumen ini: **kapan dan bagaimana caranya dipakai**, bukan sekadar apa definisinya.

---

## Bagian 1 — try/catch/finally: Cara Penggunaan

### Struktur Lengkap

```javascript
try {
  // [1] Kode yang MUNGKIN error ditulis di sini
} catch (error) {
  // [2] Dijalankan HANYA kalau ada error di try
  // variabel error berisi detail errornya
} finally {
  // [3] SELALU dijalankan, baik ada error maupun tidak
}
```

---

### Demonstrasi Alur Eksekusi

```javascript
// ─── Skenario 1: Tidak ada error ────────────────────
try {
  console.log("1. Masuk try");
  const hasil = 5 + 3;
  console.log("2. Hasil:", hasil);      // "2. Hasil: 8"
} catch (error) {
  console.log("X. Ini tidak jalan");    // TIDAK dijalankan
} finally {
  console.log("3. Finally jalan");      // "3. Finally jalan" — selalu
}
// Output: "1. Masuk try" → "2. Hasil: 8" → "3. Finally jalan"


// ─── Skenario 2: Ada error ──────────────────────────
try {
  console.log("1. Masuk try");
  fungsiYangTidakAda();                 // ← error di sini!
  console.log("X. Ini tidak jalan");    // TIDAK dijalankan (error duluan)
} catch (error) {
  console.log("2. Error tertangkap:", error.message);
} finally {
  console.log("3. Finally jalan");      // tetap jalan
}
// Output: "1. Masuk try" → "2. Error tertangkap: ..." → "3. Finally jalan"
```

---

### Properti Error Object

```javascript
try {
  null.property; // TypeError
} catch (error) {
  console.log(error.name);    // "TypeError"
  console.log(error.message); // "Cannot read properties of null"
  console.log(error.stack);   // stack trace lengkap (di mana error terjadi)
}
```

---

### throw — Buat Error Sendiri

**Kapan dipakai:** Saat kalian ingin memaksa error terjadi karena kondisi bisnis tidak terpenuhi (bukan error JavaScript-nya sendiri).

```javascript
function baginAngka(a, b) {
  if (b === 0) {
    throw new Error("Tidak bisa dibagi dengan nol!");
    // Eksekusi berhenti di sini kalau b === 0
  }
  return a / b;
}

try {
  const hasil = baginAngka(10, 0);
  console.log(hasil);
} catch (error) {
  console.log("Error:", error.message); // "Error: Tidak bisa dibagi dengan nol!"
}
```

---

### Pola 1: Validasi Input

```javascript
function prosesUmur(umur) {
  if (typeof umur !== "number") {
    throw new TypeError("Umur harus berupa angka");
  }
  if (umur < 0 || umur > 120) {
    throw new RangeError("Umur tidak valid (harus 0-120)");
  }
  return `Umur valid: ${umur} tahun`;
}

try {
  console.log(prosesUmur(25));      // "Umur valid: 25 tahun"
  console.log(prosesUmur(-5));      // ← error
} catch (error) {
  if (error instanceof RangeError) {
    console.log("Rentang salah:", error.message);
  } else if (error instanceof TypeError) {
    console.log("Tipe salah:", error.message);
  } else {
    console.log("Error lain:", error.message);
  }
}
```

---

### Pola 2: try/catch dengan Async/Await (Paling Sering Dipakai)

Ini adalah kombinasi yang paling sering muncul di kode nyata:

```javascript
async function ambilDataPengguna(id) {
  try {
    // [1] Coba kirim request
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    // [2] Cek kalau status HTTP bukan 2xx — fetch tidak otomatis throw error untuk ini
    if (!response.ok) {
      throw new Error(`Gagal: Server mengembalikan status ${response.status}`);
    }

    // [3] Parse JSON
    const user = await response.json();
    return user;

  } catch (error) {
    // Tangani semua error: jaringan putus, status 404, dst.
    console.error("Tidak bisa ambil data:", error.message);
    return null; // kembalikan null agar pemanggil bisa handle

  } finally {
    // Cocok untuk: tutup loading spinner, tutup koneksi, bersihkan state sementara
    console.log(`Request untuk user ID ${id} selesai`);
  }
}

// Pemanggil
async function tampilkanProfil() {
  const user = await ambilDataPengguna(1);

  if (user) {
    document.getElementById("nama").textContent = user.name;
  } else {
    document.getElementById("nama").textContent = "Gagal memuat data";
  }
}
```

---

### Pola 3: finally untuk Cleanup (Bersih-Bersih)

`finally` sangat berguna untuk kode yang **harus jalan** apapun yang terjadi — misalnya menutup loading, menutup koneksi, atau membersihkan state UI.

```javascript
async function simpanDataKeServer(data) {
  // Tampilkan loading sebelum mulai
  const loadingEl = document.getElementById("loading");
  loadingEl.style.display = "block";

  try {
    const response = await fetch('/api/simpan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Gagal menyimpan");

    const hasil = await response.json();
    tampilkanNotifikasi("Data berhasil disimpan!", "sukses");
    return hasil;

  } catch (error) {
    tampilkanNotifikasi(`Gagal: ${error.message}`, "error");
    return null;

  } finally {
    // Ini PASTI jalan — loading pasti hilang, tidak peduli berhasil atau gagal
    loadingEl.style.display = "none";
  }
}
```

---

### Kapan Pakai finally?

| Perlu `finally`? | Contoh Kasusnya |
|---|---|
| **Ya** | Sembunyikan loading spinner |
| **Ya** | Tutup koneksi database |
| **Ya** | Bersihkan timer / interval |
| **Ya** | Unlock tombol submit (biar bisa diklik lagi) |
| **Tidak perlu** | Kalau tidak ada resource yang perlu di-cleanup |

---


---

---

## Bagian 2 — IIFE: Cara Penggunaan

> Untuk penjelasan mekanisme IIFE (syntax, kenapa ada dua kurung, dll) serta use case inisialisasi, isolasi scope, dan module pattern — lihat file `03-iife-penjelasan-lengkap.md`. Dokumen ini hanya memuat pola yang tidak dicakup di sana.

---

### Pola: IIFE dengan Return Value

**Kapan dipakai:** Saat ingin hasil kalkulasi langsung tersimpan ke variabel, tanpa meninggalkan fungsi sementara di lingkup.

```javascript
// Hitung konfigurasi sekali dan simpan hasilnya
const config = (function() {
  const BASE_URL   = "https://api.contoh.com";
  const API_KEY    = "kunci-rahasia-123";
  const isDev      = window.location.hostname === "localhost";

  return {
    url     : isDev ? "http://localhost:3000" : BASE_URL,
    headers : { "Authorization": `Bearer ${API_KEY}` },
    debug   : isDev
  };
})();

// Sekarang config bisa dipakai di mana saja
console.log(config.url);   // "http://localhost:3000" (kalau di localhost)
// Tapi BASE_URL, API_KEY tidak bisa diakses — terisolasi di dalam IIFE
```

---

## Bagian 3 — Closures: Cara Penggunaan

### Apa yang Sebetulnya Terjadi

Ketika sebuah fungsi di dalam fungsi lain mengakses variabel dari fungsi luarnya, JavaScript "menutup" (closes over) variabel itu — itulah asal kata _closure_. Variabel luar tidak ikut hilang meskipun fungsi luarnya sudah selesai dieksekusi.

```javascript
function luar() {
  let ingatan = "Saya masih ada!"; // variabel di scope luar

  return function dalam() {        // closure — "menutup" ingatan
    console.log(ingatan);
  };
}

const fn = luar(); // luar() sudah selesai dieksekusi
fn();              // tapi "ingatan" masih terbawa → "Saya masih ada!"
```

---

### Pola 1: Menyimpan State (Variabel yang Diingat)

**Kapan dipakai:** Saat butuh variabel yang nilainya berubah setiap kali fungsi dipanggil, tapi tidak boleh diakses/diubah dari luar.

```javascript
function buatCounter(mulaiDari = 0) {
  let count = mulaiDari; // state private — tidak bisa diakses dari luar

  return {
    tambah() {
      count++;
      console.log(`Count: ${count}`);
    },
    kurang() {
      count--;
      console.log(`Count: ${count}`);
    },
    reset() {
      count = mulaiDari;
      console.log(`Reset ke ${mulaiDari}`);
    },
    lihat() {
      return count;
    }
  };
}

const counterA = buatCounter();    // mulai dari 0
const counterB = buatCounter(10);  // mulai dari 10

counterA.tambah(); // Count: 1
counterA.tambah(); // Count: 2
counterB.tambah(); // Count: 11  ← counterB punya state sendiri, terpisah dari A
counterA.lihat();  // 2          ← counterA tidak terpengaruh counterB
```

> **Poin penting:** Setiap kali `buatCounter()` dipanggil, ia membuat `count`-nya sendiri. `counterA` dan `counterB` punya memori terpisah — tidak saling mempengaruhi.

---

### Pola 2: Function Factory (Membuat Fungsi yang Terkustomisasi)

**Kapan dipakai:** Saat perlu membuat banyak fungsi yang _hampir sama_ tapi beda satu nilai tertentu.

```javascript
function buatSapaan(bahasa) {
  const sapaan = {
    id: "Halo",
    en: "Hello",
    jp: "Konnichiwa",
    fr: "Bonjour"
  };

  return function(nama) {  // closure — "ingat" bahasa yang dipilih
    const kata = sapaan[bahasa] || "Hi";
    return `${kata}, ${nama}!`;
  };
}

const sapaIndo  = buatSapaan("id");
const sapaInggris = buatSapaan("en");
const sapaJepang  = buatSapaan("jp");

console.log(sapaIndo("Budi"));    // "Halo, Budi!"
console.log(sapaInggris("Budi")); // "Hello, Budi!"
console.log(sapaJepang("Budi"));  // "Konnichiwa, Budi!"
```

---

### Pola 3: Closure di Event Listener (Yang Paling Sering Tanpa Sadar Dipakai)

**Ini closure yang paling sering kalian buat tanpa menyadarinya:**

```javascript
function pasangTombol(id, teks) {
  let hitungan = 0;

  const tombol = document.getElementById(id);

  tombol.addEventListener("click", function() {
    // Fungsi ini adalah closure — ia mengakses 'hitungan' dan 'teks' dari scope luar
    hitungan++;
    tombol.textContent = `${teks} (diklik ${hitungan}x)`;
  });
}

pasangTombol("btn-like", "Like");     // tombol ini punya hitungannya sendiri
pasangTombol("btn-share", "Share");   // tombol ini juga punya hitungannya sendiri
```

---

### Closure: Jebakan Umum dengan `var` di Loop

Ini adalah bug klasik yang muncul karena `var` tidak block-scoped:

```javascript
// ❌ MASALAH — semua tombol akan cetak angka yang sama (5)
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // i selalu 5 karena var tidak terkunci per iterasi
  }, 1000);
}
// Output: 5 5 5 5 5

// ✅ SOLUSI 1 — pakai let (block-scoped, terkunci per iterasi)
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // setiap iterasi punya i sendiri
  }, 1000);
}
// Output: 0 1 2 3 4

// ✅ SOLUSI 2 — IIFE untuk "menutup" nilai i per iterasi (cara lama sebelum let)
for (var i = 0; i < 5; i++) {
  (function(nilaiI) {  // IIFE membuat scope baru, nilaiI terkunci
    setTimeout(function() {
      console.log(nilaiI);
    }, 1000);
  })(i);
}
// Output: 0 1 2 3 4
```
### Ringkasan Penggunaan

```
try/catch/finally
  ├── try       → kode yang mungkin error (selalu taruh di sini, bukan di luar)
  ├── catch     → handle error (tampilkan pesan, fallback, log error)
  ├── throw     → lempar error custom sesuai logika bisnis
  └── finally   → cleanup yang HARUS jalan (sembunyikan loading, tutup koneksi)

IIFE
  ├── Pola 1: Inisialisasi sekali           → setup tema, config, tracking
  ├── Pola 2: Isolasi scope                 → hindari konflik variabel global
  └── Pola 3: Module pattern (+ closure)    → data private, interface public

CLOSURE
  ├── Pola 1: Simpan state private         → counter, toggle, form state
  ├── Pola 2: Function factory             → buatSapaan("id"), buatPengali(2)
  └── Pola 3: Event listener yang mengakses variabel luar
```

