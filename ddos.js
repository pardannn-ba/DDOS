const axios = require("axios");

// Target endpoint (localhost → aman)
const TARGET = "http://localhost:3000/heavy";

// Total request yang akan dikirim
const TOTAL = 1000000;

// Berapa request yang jalan bersamaan (paralel)
const CONCURRENT = 300;

async function attack() {
  console.log("Mulai simulasi...");

  let running = []; // untuk menyimpan request yang sedang jalan

  for (let i = 0; i < TOTAL; i++) {

    // Kirim request ke server
    const req = axios.get(TARGET)
      .then(() => console.log(`✔️ Request ke-${i} sukses`))
      .catch(() => console.log(`❌ Request ke-${i} gagal`));

    running.push(req);

    // Jika sudah mencapai batas paralel
    if (running.length >= CONCURRENT) {
      // tunggu semua selesai dulu
      await Promise.all(running);
      running = []; // reset
    }
  }

  // Jalankan sisa request yang belum diproses
  if (running.length) {
    await Promise.all(running);
  }

  console.log("Selesai simulasi serangan");
}

// Jalankan fungsi attack
attack();