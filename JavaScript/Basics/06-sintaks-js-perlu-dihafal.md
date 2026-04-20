# Sintaks JS banyak sekali — harus dihafal semua?

### Jawaban: Tidak perlu dihafal semua ✓

Yang perlu **dipahami** adalah:

1. **Core concept-nya** (bukan sintaks-nya)
2. **Cara mencarinya** ketika lupa

### Yang Wajib Kamu Pahami (Bukan Hafal)

| Kategori | Yang Dimengerti |
|---|---|
| Variabel | Kapan pakai const/let, perbedaan tipe data |
| Function | Cara deklarasi, parameter, return |
| Control Flow | Kapan pakai if-else vs loop |
| Array/Object | Cara akses, modifikasi |
| DOM | getElementById, querySelector, addEventListener |

### Strategi Belajar Sintaks JS DOM

**1. Kenali pola umumnya**

```js
// Semua selector DOM punya pola yang sama:
document.getElementById("id-nya")
document.querySelector(".class atau #id atau tag")
document.querySelectorAll(".class") // semua yang cocok

// Semua event listener punya pola:
element.addEventListener("nama-event", function() { ... });

// Semua perubahan konten punya pola:
element.textContent = "teks baru";
element.innerHTML   = "<b>html baru</b>";
element.style.namaProperty = "nilai";
```

**2. Saat butuh sesuatu, cari pola-nya dulu**

```
"Saya mau deteksi keyboard" → cari: "javascript keyboard event"
"Saya mau ubah warna background" → cari: "javascript change background color DOM"
```

**3. Resource utama yang selalu valid**

- [MDN Web Docs](https://developer.mozilla.org) — referensi resmi
- Console browser (F12) — testing cepat
- Google/ChatGPT — untuk pattern yang belum kamu tahu

### Cara Menentukan Apa yang Dipakai

**Tanya diri sendiri:**

```
"Saya mau pilih elemen mana?" → Selector (getElementById / querySelector)
"Saya mau ubah apa?" → Properti (.textContent / .style / .src / .href)
"Saya mau deteksi kejadian apa?" → Event (click / input / submit / keydown)
"Saya mau buat elemen baru?" → createElement + appendChild
```

**Alur berpikir:**

```
1. Temukan/select elemen yang mau diubah
2. Tentukan apa yang mau dilakukan (ubah teks? tambah class? hide?)
3. Tentukan kapan melakukannya (saat klik? saat load? saat ketik?)
```

---

### Contoh Nyata: Elemen di Game Assignment

Berikut pola DOM yang akan sering kamu tulis di assignment RevoFun:

```js
// Number Guessing Game
const inputTebak  = document.getElementById("guess-input"); // <input> tebakan
const btnTebak    = document.getElementById("btn-guess");   // tombol tebak
const pesanHasil  = document.getElementById("result-msg"); // <p> pesan hasil
const sisaCoba    = document.getElementById("attempts-left"); // <span> sisa percobaan

btnTebak.addEventListener("click", function() {
  const tebakan = Number(inputTebak.value);

  if (tebakan < secretNumber) {
    pesanHasil.textContent = "Terlalu kecil! Coba lebih besar.";
  } else if (tebakan > secretNumber) {
    pesanHasil.textContent = "Terlalu besar! Coba lebih kecil.";
  } else {
    pesanHasil.textContent = "Benar! 🎉";
  }
});
```

```js
// Rock Paper Scissors — update skor di layar
const skorPemain = document.getElementById("player-score");
const skorKomputer = document.getElementById("computer-score");

function updateSkor() {
  skorPemain.textContent = playerScore;
  skorKomputer.textContent = computerScore;
}
```

```js
// Clicker Game — tambah skor saat klik
const btnKlik  = document.getElementById("btn-klik");
const skorEl   = document.getElementById("score");
let score = 0;

btnKlik.addEventListener("click", function() {
  score++;
  skorEl.textContent = score;
});
```

**Kunci:** Semua game punya pola yang sama — select elemen, pasang event listener, update tampilan di dalamnya.
