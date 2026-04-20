# "Penjelasan Lebih Lengkap tentang Syntax (ES6+)"

---

## 1. Template Literals (Backtick)

### Masalah yang dipecahkan

```javascript
// Cara lama — string concatenation, rawan typo spasi
const nama  = "Budi";
const umur  = 25;
const kota  = "Jakarta";

const pesan = "Nama saya " + nama + ", umur " + umur + " tahun, tinggal di " + kota + ".";
// Sangat verbose dan mudah lupa spasi
```

### Solusi: Template Literal

```javascript
const pesan = `Nama saya ${nama}, umur ${umur} tahun, tinggal di ${kota}.`;
// Jauh lebih bersih
```

### Aturan Template Literal

```javascript
// Gunakan backtick (`) bukan apostrophe (') atau double quote (")
const teks = `ini template literal`;

// Interpolasi variabel dengan ${...}
const x = 10;
console.log(`Nilai x adalah ${x}`);           // "Nilai x adalah 10"

// Bisa jalankan ekspresi di dalam ${}
console.log(`5 + 3 = ${5 + 3}`);              // "5 + 3 = 8"
console.log(`Lulus: ${umur >= 17 ? "Ya" : "Tidak"}`); // kondisi di dalam!

// Multi-line string — newline ditulis apa adanya
const html = `
  <div class="card">
    <h2>${nama}</h2>
    <p>Umur: ${umur}</p>
  </div>
`;
```

---

## 2. Arrow Function (`=>`)

Arrow function adalah cara penulisan function yang lebih ringkas menggunakan simbol `=>`. Fungsinya sama persis dengan function biasa — menerima input, memproses, mengembalikan output — tapi ditulis lebih pendek. Paling sering dipakai sebagai callback di HOF seperti `map()`, `filter()`, dan `forEach()`.

### Perbandingan Langsung

```javascript
// Function declaration biasa
function tambah(a, b) {
  return a + b;
}

// Function expression biasa
const tambah = function(a, b) {
  return a + b;
};

// Arrow function — paling ringkas
const tambah = (a, b) => a + b;
```

### Aturan Penulisan Arrow Function

```javascript
// Dua atau lebih parameter → pakai kurung
const tambah = (a, b) => a + b;

// Satu parameter → kurung boleh dihilangkan
const kali2 = (x) => x * 2;

// Tanpa parameter → kurung tetap harus ada
const sapa = () => "Halo!";

// Body lebih dari satu baris → wajib pake kurung kurawal {} dan return
const prosesAngka = (x) => {
  const hasil = x * 2;
  const dibulatkan = Math.round(hasil);
  return dibulatkan;
};

// Kalau return-nya langsung object → bungkus dengan ()
const buatUser = (nama, umur) => ({ nama, umur });
// Tanpa (), kurung kurawal {} akan diartikan sebagai block, bukan object
```

### Perbedaan Penting: `this` di Arrow Function

Ini sering jadi sumber bug:

```javascript
// Regular function punya 'this' sendiri
const tombol = {
  label: "Klik Saya",
  onClick: function() {
    console.log(this.label); // 'this' merujuk ke 'tombol' → "Klik Saya"
  }
};

// Arrow function TIDAK punya 'this' sendiri — ambil dari scope luar (lexical this)
const tombol2 = {
  label: "Klik Saya",
  onClick: () => {
    console.log(this.label); // 'this' merujuk ke window/undefined → salah!
  }
};
```

**Aturan praktis:**
- Method di dalam object/class → pakai **regular function** (butuh `this`)
- Callback, HOF (map/filter), anonymous function → pakai **arrow function**

---

## 3. Default Parameters

```javascript
// Tanpa default parameter — perlu pengecekan manual
function sapa(nama) {
  const n = nama !== undefined ? nama : "Tamu";
  console.log(`Halo, ${n}!`);
}

// Dengan default parameter — lebih bersih
function sapa(nama = "Tamu") {
  console.log(`Halo, ${nama}!`);
}

sapa();           // "Halo, Tamu!"
sapa("Budi");     // "Halo, Budi!"
sapa(undefined);  // "Halo, Tamu!" — explicit undefined juga pakai default

// Kombinasi dengan destructuring
function buatProfil({ nama = "Anonim", umur = 0, kota = "Tidak diketahui" } = {}) {
  return `${nama}, ${umur} tahun, dari ${kota}`;
}

buatProfil({ nama: "Budi", umur: 25 }); // "Budi, 25 tahun, dari Tidak diketahui"
buatProfil();                            // "Anonim, 0 tahun, dari Tidak diketahui"
```

---

## 4. Object Property Shorthand

```javascript
const nama = "Budi";
const umur = 25;
const kota = "Jakarta";

// Cara lama
const user = {
  nama: nama,
  umur: umur,
  kota: kota
};

// Shorthand (ES6) — kalau nama variabel = nama key
const user = { nama, umur, kota }; // identik!

// Method shorthand
const utils = {
  // Cara lama
  hitungA: function(x) { return x * 2; },

  // Shorthand (ES6)
  hitungB(x) { return x * 2; }
};
```

---

## 5. `for...of` Loop (ES6)

Cara paling bersih untuk iterasi array:

```javascript
const buah = ["apel", "mangga", "jeruk"];

// for biasa
for (let i = 0; i < buah.length; i++) {
  console.log(buah[i]);
}

// for...of — lebih bersih, tidak perlu index
for (const b of buah) {
  console.log(b);
}
// "apel", "mangga", "jeruk"

// for...of dengan destructuring (untuk array of objects)
const siswa = [
  { nama: "Budi",  nilai: 85 },
  { nama: "Ani",   nilai: 72 },
];

for (const { nama, nilai } of siswa) {
  console.log(`${nama}: ${nilai}`);
}
// "Budi: 85"
// "Ani: 72"
```

---

## 6. Destructuring Assignment

### Konsep Dasar

Destructuring = cara mengekstrak nilai dari object atau array ke variabel secara ringkas.

### Object Destructuring

```javascript
// Tanpa destructuring — verbose
const user = { nama: "Budi", umur: 25, kota: "Jakarta" };
const nama  = user.nama;
const umur  = user.umur;
const kota  = user.kota;

// Dengan destructuring — ringkas
const { nama, umur, kota } = user;
// Sama persis hasilnya, tapi lebih pendek
```

```javascript
// Ganti nama variabel saat destructure
const { nama: namaLengkap, umur: usia } = user;
console.log(namaLengkap); // "Budi"
console.log(usia);        // 25

// Nilai default jika properti tidak ada
const { nama, pekerjaan = "Belum bekerja" } = user;
console.log(pekerjaan);   // "Belum bekerja" (karena user tidak punya pekerjaan)

// Nested destructuring (object di dalam object)
const profil = {
  nama: "Citra",
  alamat: {
    kota: "Bandung",
    provinsi: "Jawa Barat"
  }
};
const { nama, alamat: { kota } } = profil;
console.log(kota);      // "Bandung"
console.log(provinsi);  // "Jawa Barat"
```

### Array Destructuring

```javascript
const warna = ["merah", "hijau", "biru", "kuning"];

// Ambil elemen berdasarkan posisi
const [pertama, kedua] = warna;
console.log(pertama); // "merah"
console.log(kedua);   // "hijau"

// Skip elemen dengan koma kosong
const [, , ketiga] = warna;
console.log(ketiga);  // "biru"

// Rest — kumpulkan sisanya ke array baru
const [kepala, ...ekor] = warna;
console.log(kepala); // "merah"
console.log(ekor);   // ["hijau", "biru", "kuning"]

// Swap dua variabel — teknik klasik dengan destructuring
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

### Destructuring di Parameter Fungsi

Ini yang paling sering muncul di kode modern:

```javascript
const user : {nama: "jek", umur: 24}

// Tanpa destructuring — terima object lalu akses satu per satu
function tampilUser(user) {
  console.log(user.nama);
  console.log(user.umur);
}

// Dengan destructuring di parameter langsung
function tampilUser({ nama, umur }) {
  console.log(nama);
  console.log(umur);
}

// Pemanggilan tetap sama:
tampilUser({ nama: "Budi", umur: 25 });
```

---

## 7. Spread Operator (`...`)

### Apa Itu Spread?

Spread "menyebarkan" elemen array atau properti object ke dalam struktur baru.

```javascript
// Gabungkan dua array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Tanpa spread — pakai concat
const gabungan = arr1.concat(arr2); // [1, 2, 3, 4, 5, 6]

// Dengan spread — lebih intuitif
const gabungan = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Bisa sisipkan elemen di tengah
const dengan10 = [...arr1, 10, ...arr2]; // [1, 2, 3, 10, 4, 5, 6]
```

```javascript
// Copy array (bukan referensi yang sama!)
const original = [1, 2, 3];
const salinan  = [...original];

salinan.push(4);
console.log(original); // [1, 2, 3] — tidak ikut berubah
console.log(salinan);  // [1, 2, 3, 4]
```

```javascript
// Gabungkan/update object
const dataLama = { nama: "Budi", umur: 25};
const dataBaru = { ...dataLama, kota: "Jakarta", umur: 26 }; // umur ter-override
// { nama: "Budi", umur: 26, kota: "Jakarta" }

// Sangat berguna saat update state (React, Vanilla JS)
const state = { loading: false, data: null, error: null };
const stateUpdated = { ...state, loading: true }; // hanya loading yang berubah
// { loading: true, data: null, error: null }
```

---

## 8. Rest Parameter (`...`)

### Bedanya dengan Spread

Meskipun pakai `...` yang sama, **Rest** adalah kebalikan dari Spread:
- **Spread** = menyebarkan array/object → dipakai di kanan assignment atau di dalam literal `[]` / `{}`
- **Rest** = mengumpulkan argumen ke dalam array → dipakai di **parameter fungsi**

```javascript
// Rest di parameter fungsi — kumpulkan semua argumen
function jumlahkan(...angka) {
  return angka.reduce((total, n) => total + n, 0);
}

jumlahkan(1, 2);            // 3
jumlahkan(1, 2, 3, 4, 5);  // 15 — berapapun argumennya, selalu bisa!

// Rest bisa dikombinasikan dengan parameter biasa
function perkenalan(sapaan, ...nama) {
  nama.forEach(n => console.log(`${sapaan}, ${n}!`));
}

perkenalan("Halo", "Budi", "Ani", "Citra");
// "Halo, Budi!"
// "Halo, Ani!"
// "Halo, Citra!"
```

---

## 9. Short-Circuit Evaluation (`&&`, `||`, `??`)

Ini syntax yang sering bikin bingung tapi sangat sering muncul:

```javascript
// AND (&&) — kalau kiri false, kanan tidak dieksekusi
const user = null;
const nama = user && user.nama; // user null → langsung null, tidak error

// OR (||) — nilai default jika kiri falsy (null, undefined, 0, "", false)
const tampilan = nama || "Tamu";  // nama null → pakai "Tamu"

// Nullish Coalescing (??) — nilai default hanya jika kiri null atau undefined
// (0 dan "" tidak dianggap "kosong" seperti ||)
const skor  = 0;
const hasilA = skor || 100;   // 100 — karena 0 dianggap falsy oleh ||
const hasilB = skor ?? 100;   // 0   — karena 0 bukan null/undefined
const tema = localStorage.getItem("tema") ?? "dark";

// Optional Chaining (?.) — akses properti object yang mungkin null/undefined
const user2 = null;
const kotaA = user2.alamat.kota;    // TypeError: Cannot read properties of null
const kotaB = user2?.alamat?.kota;  // undefined — tidak error
```

---

## Cheatsheet: Semua Syntax Sekilas

| Syntax | Contoh Singkat | Fungsi |
|---|---|---|
| Template literal | `` `Halo ${nama}` `` | String interpolasi + multi-line |
| Object destructuring | `const { nama, umur } = user` | Ekstrak properti object |
| Array destructuring | `const [a, b] = arr` | Ekstrak elemen array |
| Spread | `[...arr1, ...arr2]` | Gabungkan / copy array/object |
| Rest parameter | `function f(...args)` | Kumpulkan argumen ke array |
| Arrow function | `const f = (x) => x * 2` | Function ringkas (tanpa `this`) |
| Short-circuit `&&` | `user && user.nama` | Akses aman (hindari null error) |
| Nullish `??` | `nilai ?? 0` | Default jika null/undefined saja |
| Optional chaining `?.` | `user?.alamat?.kota` | Akses nested tanpa error |
| Property shorthand | `{ nama, umur }` | Object dari variabel nama sama |
| Default parameter | `function f(x = 0)` | Nilai default jika tidak dikirim |
| `for...of` | `for (const x of arr)` | Iterasi array tanpa index |

---

> **Tips belajar syntax:** Jangan coba hapal semua sekaligus. Fokus ke **template literal**, **destructuring**, dan **arrow function** dulu — ketiganya yang paling sering muncul di kode nyata. Sisanya akan terasa natural setelah sering membaca dan menulis kode.

