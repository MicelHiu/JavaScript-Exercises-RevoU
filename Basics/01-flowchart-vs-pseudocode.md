# Kalau sudah pakai Flowchart, apakah masih perlu Pseudocode?

**Ya, keduanya bisa dipakai bersama** — tapi tidak selalu wajib dua-duanya. Tergantung kebutuhan.

### Perbedaan & Fungsi

| Aspek | Flowchart | Pseudocode |
|---|---|---|
| Bentuk | Visual (kotak, panah, diamond) | Teks mirip kode |
| Cocok untuk | Menjelaskan **alur logika besar** kepada siapa saja | Menjelaskan **detail langkah per langkah** yang siap diterjemahkan ke kode |
| Pembaca | Developer, non-developer, stakeholder | Developer |
| Detail | Kurang detail untuk logika kompleks | Bisa sangat detail |

### Kapan Pakai Keduanya

```
Flowchart → pakai untuk gambaran besar, presentasi ke tim, atau menjelaskan fitur

Pseudocode → pakai setelah flowchart untuk mendetailkan logika sebelum nulis kode
```

### Contoh

Flowchart untuk **REGISTER**.

**Versi 1 — Sederhana (garis besar):**
Dipakai untuk presentasi ke tim, atau menjelaskan fitur secara umum. Detail validasinya ada di pseudocode.

```
┌─────────────────┐
│   User Input    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Validasi Input  │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│Berhasil│ │ Gagal  │
└────────┘ └────────┘
```



Tapi saat implement, kamu butuh pseudocode untuk detail:

```
// Pseudocode detail yang tidak ada di flowchart
IF username.length < 3
  SHOW error "Username minimal 3 karakter"
  STOP
IF password.length < 8
  SHOW error "Password minimal 8 karakter"
  STOP
IF email does not contain "@"
  SHOW error "Format email tidak valid"
  STOP
IF username already exists in database
  SHOW error "Username sudah dipakai"
  STOP
CREATE new user account
SHOW success "Registrasi berhasil!"
```
**Versi 2 — Lengkap dan detail:**
Semua percabangan validasi ikut digambar. Lebih lengkap, tapi makin kompleks makin susah dibaca.

```
        Register
┌──────────────────────┐
│      User Input      │
│    (isi username,    │
│  password, email)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐   Tidak   ┌───────────────────────────┐
│ username.length >= 3?├──────────▶│ SHOW "Username min 3 char"│
└──────────┬───────────┘           └───────────────────────────┘
           │ Ya
           ▼
┌──────────────────────┐   Tidak   ┌───────────────────────────┐
│ password.length >= 8?├──────────▶│ SHOW "Password min 8 char"│
└──────────┬───────────┘           └───────────────────────────┘
           │ Ya
           ▼
┌──────────────────────┐   Tidak   ┌───────────────────────────┐
│  email berisi "@"?   ├──────────▶│ SHOW "Email tidak valid"  │
└──────────┬───────────┘           └───────────────────────────┘
           │ Ya
           ▼
┌──────────────────────┐   Ya      ┌───────────────────────────┐
│ username sudah ada?  ├──────────▶│ SHOW "Username sudah ada" │
└──────────┬───────────┘           └───────────────────────────┘
           │ Tidak
           ▼
┌──────────────────────┐
│  Buat akun baru      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ SHOW "Registrasi     │
│       Berhasil!"     │
└──────────────────────┘
```

### Kesimpulan

> **pseudocode lebih penting untuk latihan logika sebelum coding**. Flowchart lebih berguna untuk dokumentasi atau presentasi. Tapi tidak ada yang salah menggunakan keduanya.
