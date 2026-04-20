# Contoh JavaScript Terintegrasi dengan HTML/CSS

### Hubungan HTML, CSS, dan JavaScript

```
HTML  → Struktur (kerangka rumah)
CSS   → Tampilan (cat, dekorasi)
JS    → Perilaku (listrik, interaksi)

DOM   → Jembatan antara JS dan HTML/CSS
```

JavaScript mengubah HTML menggunakan DOM:
- `element.textContent` → ubah teks
- `element.style.xxx`   → ubah CSS langsung
- `element.classList.add("nama-class")` → tambah class CSS
- `element.innerHTML`   → ubah isi HTML

---

## Contoh 1: Counter Sederhana *(Fondasi Clicker Game)*

> **Koneksi ke assignment:** Clicker Game di RevoFun pada dasarnya adalah counter dengan batas waktu. Kuasai contoh ini dulu, lalu tambahkan `setInterval` untuk countdown dan logika "game over" saat waktu habis.

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Counter</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; }
    #angka { font-size: 64px; font-weight: bold; color: #333; }
    button {
      padding: 10px 20px;
      margin: 5px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      background: #4CAF50;
      color: white;
    }
    button:hover { background: #45a049; }
  </style>
</head>
<body>
  <h2>Counter</h2>
  <div id="angka">0</div>
  <br>
  <button id="btn-tambah">+ Tambah</button>
  <button id="btn-kurang">- Kurang</button>
  <button id="btn-reset">Reset</button>

  <script>
    let count = 0;
    const angkaEl = document.getElementById("angka");

    document.getElementById("btn-tambah").addEventListener("click", function() {
      count++;
      angkaEl.textContent = count;
    });

    document.getElementById("btn-kurang").addEventListener("click", function() {
      count--;
      angkaEl.textContent = count;
    });

    document.getElementById("btn-reset").addEventListener("click", function() {
      count = 0;
      angkaEl.textContent = count;
    });
  </script>
</body>
</html>
```

---

## Contoh 2: Form Input Nama Pemain

> **Koneksi ke assignment:** Sebelum memulai game, kamu bisa minta user memasukkan nama pemain. Validasi ini memastikan nama tidak kosong dan punya panjang minimal.

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Input Nama Pemain</title>
  <style>
    body { font-family: sans-serif; padding: 30px; max-width: 400px; }
    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 6px;
      box-sizing: border-box;
    }
    input.error  { border-color: red; }
    input.valid  { border-color: green; }
    #pesan { margin-top: 8px; font-size: 14px; }
    #pesan.error { color: red; }
    #pesan.valid { color: green; }
  </style>
</head>
<body>
  <h2>Masukkan Nama Pemain</h2>
  <input type="text" id="input-nama" placeholder="Nama kamu..." />
  <div id="pesan"></div>

  <script>
    const inputNama = document.getElementById("input-nama");
    const pesan     = document.getElementById("pesan");

    inputNama.addEventListener("input", function() {
      const nilai = inputNama.value.trim();

      if (nilai.length === 0) {
        inputNama.className = "";
        pesan.textContent   = "";
        pesan.className     = "";
      } else if (nilai.length < 3) {
        inputNama.className = "error";
        pesan.textContent   = "Nama minimal 3 karakter";
        pesan.className     = "error";
      } else {
        inputNama.className = "valid";
        pesan.textContent   = `Siap bermain, ${nilai}! 🎮`;
        pesan.className     = "valid";
      }
    });
  </script>
</body>
</html>
```

---

## Contoh 3: Tampilkan Daftar Game dengan Loop + DOM

> **Koneksi ke assignment:** Landing page RevoFun menampilkan daftar game yang tersedia. Loop + DOM adalah cara standar untuk merender daftar dari array ke halaman.

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Daftar Game</title>
  <style>
    body { font-family: sans-serif; padding: 30px; }
    ul { list-style: none; padding: 0; }
    li {
      padding: 8px 12px;
      margin: 4px 0;
      background: #f0f0f0;
      border-radius: 4px;
    }
    button {
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      border: none;
      background: #2196F3;
      color: white;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h2>Game RevoFun</h2>
  <button id="btn-tampil">Tampilkan Game</button>
  <ul id="daftar-game"></ul>

  <script>
    const gameList = ["Number Guessing", "Rock Paper Scissors", "Clicker", "Memory Card"];
    const daftarEl  = document.getElementById("daftar-game");

    document.getElementById("btn-tampil").addEventListener("click", function() {
      // Kosongkan dulu sebelum isi ulang
      daftarEl.innerHTML = "";

      // Loop array → buat elemen <li> untuk tiap game
      for (let i = 0; i < gameList.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${gameList[i]}`;
        daftarEl.appendChild(li);
      }
    });
  </script>
</body>
</html>
```
