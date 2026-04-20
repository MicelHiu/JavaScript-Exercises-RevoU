# Review: Function, Promise, dan Async/Await

---

## Bagian 1 — Review Functions

### Semua Cara Menulis Function

Ada beberapa cara mendeklarasikan function di JavaScript. Semua menghasilkan fungsi yang bisa dipanggil, tapi punya perbedaan penting.

#### 1. Function Declaration

```javascript
function sapa(nama) {
  return `Halo, ${nama}!`;
}

sapa("Budi"); // "Halo, Budi!"
```

**Ciri khas:** Bisa dipanggil **sebelum** dideklarasikan di kode (hoisted).

```javascript
sapa("Budi"); // tetap jalan — hoisting mengangkat deklarasi ke atas

function sapa(nama) {
  return `Halo, ${nama}!`;
}
```

---

#### 2. Function Expression

```javascript
const sapa = function(nama) {
  return `Halo, ${nama}!`;
};

sapa("Budi"); // "Halo, Budi!"
```

**Ciri khas:** Tidak bisa dipanggil sebelum dideklarasikan (tidak di-hoist).

```javascript
sapa("Budi"); // TypeError: sapa is not a function
const sapa = function(nama) { ... };
```

---

#### 3. Arrow Function

```javascript
const sapa = (nama) => `Halo, ${nama}!`;

sapa("Budi"); // "Halo, Budi!"
```

**Ciri khas:** Sintaks ringkas, **tidak punya `this` sendiri** (lexical this). Paling sering dipakai untuk callback dan HOF.

---

#### 4. Method (Function di dalam Object)

```javascript
const user = {
  nama: "Budi",
  sapa() {               // method shorthand
    return `Halo, ${this.nama}!`; // this → merujuk ke object user
  }
};

user.sapa(); // "Halo, Budi!"
```

---

### Parameter, Argument, dan Return — Perbedaannya

```javascript
//               ↓ parameter (nama di dalam definisi fungsi)
function tambah(a, b) {
  return a + b;   // return → kembalikan nilai ke pemanggil
}
//      ↓ argument (nilai yang dikirim saat memanggil)
tambah(5, 3);   // 8
```

```javascript
// Tanpa return → function mengembalikan undefined
function tanpaReturn() {
  const x = 10; // dihitung tapi tidak dikembalikan
}

const hasil = tanpaReturn();
console.log(hasil); // undefined
```

```javascript
// Default parameter — nilai cadangan jika argument tidak dikirim
function sapa(nama = "Tamu") {
  return `Halo, ${nama}!`;
}

sapa();         // "Halo, Tamu!"
sapa("Budi");   // "Halo, Budi!"
```

---

### Higher-Order Function — Function yang Menerima / Mengembalikan Function

```javascript
// Menerima function sebagai argument
function jalankan(fn, nilai) {
  return fn(nilai);
}

const kali2 = (x) => x * 2;
jalankan(kali2, 5); // 10

// Mengembalikan function
function buatPengali(faktor) {
  return (angka) => angka * faktor;
}

const kali3 = buatPengali(3);
kali3(7); // 21
```

---

### Rekap Singkat: Mana yang Dipakai Kapan?

| Jenis | Kapan Dipakai |
|---|---|
| Function Declaration | Fungsi utama, bisa dipanggil di atas deklarasinya |
| Function Expression | Fungsi yang disimpan ke variabel, lebih terkontrol |
| Arrow Function | Callback, HOF, kode pendek tanpa `this` |
| Method | Aksi yang terkait dengan object/class |

---

---

## Bagian 2 — Review Promise

### Mengapa Promise Ada

JavaScript berjalan secara **single-threaded** (satu tugas satu waktu). Kalau ada operasi yang lambat (HTTP request, baca file, timer), tanpa async semua kode akan berhenti menunggu.

**Promise** adalah cara JavaScript mengatakan: _"Saya berjanji akan kasih hasilnya — entah berhasil atau gagal — tapi tidak sekarang."_

---

### Tiga State Promise

```
Promise
  │
  ├── Pending   → sedang diproses (belum ada hasil)
  │
  ├── Fulfilled → berhasil (resolve dipanggil)
  │
  └── Rejected  → gagal (reject dipanggil)
```

---

### Cara Membuat Promise

```javascript
const janji = new Promise(function(resolve, reject) {
  //                                ↑         ↑
  //                          panggil ini  panggil ini
  //                          kalau sukses kalau gagal

  const berhasil = true; // simulasi kondisi

  if (berhasil) {
    resolve("Data berhasil didapat!");  // kirim nilai ke .then()
  } else {
    reject("Terjadi kesalahan!");       // kirim error ke .catch()
  }
});
```

---

### Cara Menggunakan Promise — `.then()` dan `.catch()`

```javascript
function ambilData() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const sukses = Math.random() > 0.3; // 70% kemungkinan sukses
      if (sukses) {
        resolve({ nama: "Budi", umur: 25 });
      } else {
        reject(new Error("Koneksi gagal"));
      }
    }, 1500);
  });
}

ambilData()
  .then(function(data) {
    // Dijalankan kalau resolve dipanggil
    console.log("Data diterima:", data.nama);
  })
  .catch(function(error) {
    // Dijalankan kalau reject dipanggil
    console.log("Error:", error.message);
  })
  .finally(function() {
    // Selalu dijalankan, sukses maupun gagal
    console.log("Proses selesai");
  });
```

---

### Promise Chaining — Operasi Async Berurutan

Ketika satu operasi async bergantung pada hasil operasi async sebelumnya:

```javascript
function ambilUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, nama: "Budi" }), 500);
  });
}

function ambilOrderUser(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ userId: user.id, total: 150000 }), 500);
  });
}

// Chaining — setiap .then() menunggu yang sebelumnya
ambilUser(1)
  .then(user => {
    console.log("User:", user.nama);     // "Budi"
    return ambilOrderUser(user);         // return Promise baru
  })
  .then(order => {
    console.log("Total:", order.total);  // 150000
    return ambilItemUser(user);         // return Promise baru
  })
  .then(item => {
    console.log("Item:", item.size);
  })
  .catch(error => {
    console.log("Ada error:", error);
  });
```

---

### Promise.all — Jalankan Beberapa Promise Secara Paralel

Kalau tidak saling bergantung, tidak perlu menunggu satu per satu:

```javascript
const ambilUsers    = fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json());
const ambilPosts    = fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json());
const ambilComments = fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json());

// Jalankan ketiganya SEKALIGUS, tunggu semuanya selesai
Promise.all([ambilUsers, ambilPosts, ambilComments])
  .then(([users, posts, comments]) => {
    console.log("Users:", users.length);
    console.log("Posts:", posts.length);
    console.log("Comments:", comments.length);
  })
  .catch(error => {
    console.log("Salah satu gagal:", error);
    // Kalau SATU saja gagal, langsung masuk .catch()
  });
```

---

---

## Bagian 3 — Review Async/Await

### Apa Itu Async/Await

`async/await` bukan hal baru — ini adalah cara penulisan yang berbeda untuk Promise yang sama. Di balik layar, `async/await` tetap menggunakan Promise.

```javascript
// Dengan .then() (Promise biasa)
function ambilData() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(user => {
      console.log(user.name);
    });
}

// Dengan async/await (lebih mudah dibaca)
async function ambilData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user     = await response.json();
  console.log(user.name);
}
```

---

### Aturan Async/Await

**Aturan 1:** `async` sebelum function → function itu selalu mengembalikan Promise

```javascript
async function contoh() {
  return "halo";
}

contoh();              // bukan "halo", tapi Promise { "halo" }
contoh().then(console.log); // "halo"
```

**Aturan 2:** `await` hanya bisa dipakai di dalam `async function`

```javascript
// SALAH — await di luar async function
const data = await fetch('...');   // SyntaxError

// BENAR
async function getData() {
  const data = await fetch('...'); // OK
}
```

**Aturan 3:** `await` menghentikan eksekusi baris berikutnya **di dalam fungsi itu**, bukan menghentikan seluruh program

```javascript
async function prosesData() {
  console.log("Mulai");
  const data = await ambilData(); // tunggu di sini
  console.log("Data:", data);     // baru jalan setelah ambilData selesai
  console.log("Selesai");
}

console.log("Sebelum panggil prosesData");
prosesData(); // dipanggil, tapi tidak menunggu
console.log("Setelah panggil prosesData");

// URUTAN OUTPUT:
// "Sebelum panggil prosesData"
// "Mulai"
// "Setelah panggil prosesData"   ← ini muncul sebelum data datang!
// "Data: ..."
// "Selesai"
```

---

### Pola Real — Leaderboard Game dengan Fetch

Ini adalah pola async yang paling relevan untuk assignment: tampilkan data dari API (atau localStorage) ke tampilan game.

```javascript
// Tampilkan leaderboard saat halaman game dimuat
async function tampilkanLeaderboard(namaGame) {
  const container = document.getElementById("leaderboard");
  container.innerHTML = "<p>Memuat leaderboard...</p>";

  try {
    // Jika menggunakan API eksternal:
    // const response = await fetch(`/api/leaderboard/${namaGame}`);
    // const data     = await response.json();

    // Versi localStorage (tidak perlu async, tapi pola ini bisa dipakai untuk API):
    const data = JSON.parse(localStorage.getItem(`revofun-leaderboard-${namaGame}`) || "[]");

    if (data.length === 0) {
      container.innerHTML = "<p>Belum ada skor. Jadilah yang pertama! 🏆</p>";
      return;
    }

    // HOF map() → render setiap entri sebagai baris tabel
    container.innerHTML = `
      <table>
        <thead>
          <tr><th>#</th><th>Nama</th><th>Skor</th><th>Tanggal</th></tr>
        </thead>
        <tbody>
          ${data.map((entry, i) => `
            <tr class="${i === 0 ? 'juara' : ''}">
              <td>${i + 1}</td>
              <td>${entry.nama}</td>
              <td>${entry.skor}</td>
              <td>${entry.tanggal}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

  } catch (error) {
    container.innerHTML = `<p style="color:red">Gagal memuat leaderboard: ${error.message}</p>`;
  }
}

// Simpan skor setelah game selesai, lalu refresh leaderboard
async function selesaiGame(namaGame, namaPlayer, skor) {
  const btnMain  = document.getElementById("btn-main-lagi");
  btnMain.disabled = true;

  try {
    // Simpan ke localStorage
    const kunci = `revofun-leaderboard-${namaGame}`;
    const data  = JSON.parse(localStorage.getItem(kunci) || "[]");
    data.push({ nama: namaPlayer, skor, tanggal: new Date().toLocaleDateString("id-ID") });
    data.sort((a, b) => b.skor - a.skor);
    localStorage.setItem(kunci, JSON.stringify(data.slice(0, 10)));

    // Refresh tampilannya
    await tampilkanLeaderboard(namaGame);

  } catch (error) {
    console.error("Gagal simpan skor:", error.message);

  } finally {
    btnMain.disabled = false;   // tombol selalu diaktifkan kembali
  }
}

// Panggil saat halaman game dimuat
document.addEventListener("DOMContentLoaded", () => {
  tampilkanLeaderboard("tebak-angka");
});
```


---

### Perbandingan Lengkap: Callback → Promise → Async/Await

Tiga cara untuk masalah yang sama — ambil data user lalu ambil post miliknya:

```javascript
// ─── CARA 1: Callback Hell ───────────────────────────
getUser(1, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log(comments); // level 3 indent, sulit dibaca
    });
  });
});


// ─── CARA 2: Promise Chaining ───────────────────────
getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));
// Lebih datar, tapi logika tersebar di banyak .then()


// ─── CARA 3: Async/Await ────────────────────────────
async function tampilkanData() {
  try {
    const user     = await getUser(1);
    const posts    = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    console.log(comments);
  } catch (err) {
    console.error(err);
  }
}
// Paling mirip kode synchronous, paling mudah dibaca dan debug
```

---

### Ringkasan

```
FUNCTION
  ├── Declaration  → dipanggil atas/bawah, hoisted
  ├── Expression   → disimpan ke variabel, tidak hoisted
  ├── Arrow        → ringkas, tidak punya this
  └── Method       → di dalam object/class

PROMISE
  ├── new Promise((resolve, reject) => {...})
  ├── .then()  → handle resolve
  ├── .catch() → handle reject
  └── .finally() → selalu jalan

ASYNC/AWAIT
  ├── async function → selalu return Promise
  ├── await          → tunggu Promise selesai (dalam async saja)
  └── try/catch      → handle error di async/await
```

