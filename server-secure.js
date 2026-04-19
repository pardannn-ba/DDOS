const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// =========================
// 🔒 1. RATE LIMIT
// =========================
// Membatasi jumlah request dari 1 IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // waktu 1 menit
  max: 20,             // max 20 request per IP
  message: "Terlalu banyak request"
});

// Gunakan limiter ke semua endpoint
app.use(limiter);

// =========================
// 🔒 2. BATASI PROSES BERAT
// =========================
let activeHeavy = 0;  // jumlah proses heavy yang sedang berjalan
const MAX_HEAVY = 3;  // maksimal 3 proses bersamaan

// =========================
// LOGGING
// =========================
app.use((req, res, next) => {
  console.log(`Request ke ${req.url}`);
  next();
});

// Endpoint normal
app.get("/", (req, res) => {
  res.send("Server aman");
});

// Endpoint berat dengan proteksi
app.get("/heavy", (req, res) => {

  // Jika proses berat sudah penuh
  if (activeHeavy >= MAX_HEAVY) {
    return res.status(503).send("Server sibuk");
  }

  activeHeavy++; // tambah proses aktif

  let total = 0;

  // simulasi kerja berat
  for (let i = 0; i < 1e8; i++) {
    total += i;
  }

  activeHeavy--; // kurangi setelah selesai

  res.send("Heavy selesai (aman)");
});

// Jalankan server
app.listen(3000, () => {
  console.log("Server aman jalan di http://localhost:3000");
});