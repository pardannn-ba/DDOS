const express = require("express");
const app = express();

// Menyimpan total request yang masuk
let totalRequests = 0;

// Middleware: jalan setiap ada request masuk
app.use((req, res, next) => {
  totalRequests++; // tambah counter
  console.log(`Request ke ${req.url} | Total: ${totalRequests}`);
  next(); // lanjut ke endpoint berikutnya
});

// Endpoint normal (ringan)
app.get("/", (req, res) => {
  res.send("Server normal");
});

// Endpoint berat (target simulasi DDoS)
app.get("/heavy", (req, res) => {
  let total = 0;

  // Loop besar untuk membebani CPU
  // Semakin besar angka, semakin berat server
  for (let i = 0; i < 1e8; i++) {
    total += i;
  }

  // Setelah selesai, kirim response
  res.send("Heavy selesai");
});

// Jalankan server di port 3000
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});