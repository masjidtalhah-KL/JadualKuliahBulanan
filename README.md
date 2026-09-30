# Jadual Kuliah Bulanan · Masjid Talhah Bin Ubaidillah

**Versi 3.0.0** · Penjana poster Jadual Kuliah Bulanan untuk Masjid Talhah Bin Ubaidillah, Bukit Jalil (Zon 5 JAWI).

**[▶ Buka aplikasi](https://masjidtalhah-kl.github.io/JadualKuliahBulanan/)** — terus dalam pelayar, di telefon atau komputer, tanpa pemasangan dan tanpa akaun.

| | |
| --- | --- |
| **Alamat rasmi (GitHub Pages)** | <https://masjidtalhah-kl.github.io/JadualKuliahBulanan/> |
| **Pautan terus ke penjana** | <https://masjidtalhah-kl.github.io/JadualKuliahBulanan/jadual-kuliah-generator.html> |
| **Repositori** | <https://github.com/masjidtalhah-KL/JadualKuliahBulanan> |

Setiap staf boleh guna pautan yang sama. Tiada apa-apa perlu dipasang — cukup pelayar **Microsoft Edge, Google Chrome** atau pelayar telefon.

---

## Bahasa Melayu

### Edisi Masjid Talhah

Ini ialah edisi Masjid Talhah, dibina berdasarkan projek asal [Kengkorok/jadual-kuliah-generator](https://github.com/Kengkorok/jadual-kuliah-generator). Perbezaan utama:

- Identiti masjid — nama **Masjid Talhah Bin Ubaidillah, Bukit Jalil**, logo JAWI dan gambar masjid — sudah tertanam dalam aplikasi.
- Kod QR infaq asal masjid (butang **Guna QR asal Talhah**) disertakan untuk panel infaq, dan dipaparkan hanya jika diaktifkan.
- Sesetengah teks, kitab dan nama penceramah diselaraskan untuk keperluan masjid.
- Turutan bantuan/kofi projek asal dibuang. Kredit dan lesen projek asal dikekalkan di bahagian [Kredit & Lesen](#kredit--lesen).

### Mula dalam beberapa langkah

1. Buka **Tetapan poster**. Semak nama masjid, tajuk poster, alamat dan telefon. Tukar atau tambah logo serta gambar masjid jika perlu.
2. Buka **Urus senarai** untuk menyimpan nama penceramah, kitab dan gambar yang kerap digunakan.
3. Buka **Aturan berulang**. Pilih hari dan kejadian (pertama hingga kelima, atau **Setiap minggu**) — contohnya Maghrib pada Isnin ketiga. Nama penceramah boleh dikosongkan untuk sesi yang belum ditetapkan.
4. Tekan **Terapkan pada bulan ini**. Bulan baharu menggunakan aturan terkini secara automatik.
5. Klik petak tarikh untuk menyunting kuliah, kitab atau gambar, atau menambah acara bagi bulan itu sahaja.
6. Jika perlu, buka **QR & ruang infaq** dan aktifkan paparan QR infaq masjid.
7. Semak poster, pilih saiz **A3** atau **A4**, kemudian muat turun **PNG** atau **PDF**.

Aplikasi boleh memuatkan beberapa profil (contohnya Masjid Talhah dan surau lain) — setiap profil mempunyai identiti, penceramah, aturan, QR dan koleksi bulan sendiri.

### ⚠️ Penting: di mana data disimpan

- Semua jadual, aturan, penceramah dan gambar disimpan dalam **storan pelayar peranti masing-masing**, bukan dalam repositori ini dan bukan di pelayan.
- **Data setiap staf tidak dikongsi.** Staf A tidak akan nampak jadual yang disunting Staf B, walaupun membuka pautan yang sama.
- Storan pelayar juga terikat pada **asal laman**: data yang disimpan melalui pautan `masjidtalhah-kl.github.io` **tidak** muncul jika fail HTML dibuka dari komputer sendiri (dan sebaliknya). Pilih satu cara penggunaan dan kekalkan cara itu.
- Fail HTML **tidak berubah** apabila anda menyunting — suntingan hanya wujud dalam pelayar.
- Gunakan **Simpan Data** (satu profil) atau **Sandarkan semua profil** untuk memuat turun fail JSON sandaran. **Buka Data** memulihkannya sebagai profil baharu pada peranti atau pelayar lain.
- Simpan sandaran JSON pada Google Drive/Dropbox masjid supaya tidak hilang apabila penjelajah dibersihkan atau peranti bertukar.

### Eksport

| Format | A3 landskap | A4 landskap |
| --- | --- | --- |
| PNG, 300 dpi | 4961 × 3508 px | 3508 × 2480 px |
| PDF (imej raster) | 420 × 297 mm | 297 × 210 mm |

Muat naik gambar penceramah beresolusi tinggi untuk hasil yang tajam. Eksport PNG/PDF memerlukan sambungan internet kerana pustaka eksport (html2canvas 1.4.1 dan jsPDF 2.5.1) dimuatkan dari jsDelivr. Teks yang terlalu panjang ditandakan sebelum eksport — pendekkan dahulu. Fon bergantung pada peranti (Arial, Arial Narrow, Arial Black).

### Struktur repositori

| Fail | Fungsi |
| --- | --- |
| `index.html` | Halaman masuk (GitHub Pages) — membuka penjana secara automatik |
| `jadual-kuliah-generator.html` | Aplikasi penjana yang lengkap (kandungan berkembar, boleh dibuka terus dari komputer) |
| `app.css`, `app-core.js`, `app-ui.js`, `profile.js`, `app-init.js`, `i18n.js` | Sumber antara muka dan logik aplikasi |
| `tests/test-generator.cjs` | Semakan pembangunan (Playwright) |
| `data/jadual-talhah-semua-bulan.json` | Snapshot eksport **Simpan Data** (semua bulan) — arkib backup untuk rujukan staf |
| `docs/` | Gambar pratonton untuk dokumentasi |

**Pengesahan dan pembangunan:** aplikasi diuji pada Windows dengan Edge dan Chrome; Firefox dan Safari belum diuji. Untuk menjalankan semakan: pasang Node.js, jalankan `npm install`, kemudian `npm test` (`TEST_BROWSERS` boleh mengehadkan pelayar, contohnya `msedge`). Pengguna aplikasi tidak memerlukan Node.js.

## English

**Version 3.0.0** — monthly lecture-schedule poster generator for **Masjid Talhah Bin Ubaidillah, Bukit Jalil**.

- **Live app:** <https://masjidtalhah-kl.github.io/JadualKuliahBulanan/>
- **Direct link:** <https://masjidtalhah-kl.github.io/JadualKuliahBulanan/jadual-kuliah-generator.html>

This is the Masjid Talhah edition, built on the original project [Kengkorok/jadual-kuliah-generator](https://github.com/Kengkorok/jadual-kuliah-generator), with the mosque identity, JAWI logo, building photo and donation QR bundled. Editing works entirely in the browser; PNG/PDF export loads html2canvas and jsPDF from a CDN, so it needs internet.

Schedules, recurring rules, speakers and uploaded images are stored in the **local browser storage of each device** — they are not stored in this repository and not shared between staff. Use **Simpan Data** / **Sandarkan semua profil** to export JSON backups and **Buka Data** to restore them on another device. A read-only exported snapshot of all months is kept in [`data/jadual-talhah-semua-bulan.json`](data/jadual-talhah-semua-bulan.json); the live, editable data stays in browser storage. Keep one access method (the GitHub Pages link) because browser storage is bound to the page origin.

Development checks: install Node.js, run `npm install` then `npm test` (Edge/Chrome required). The application itself needs no installation.

## Kredit & Lesen

Projek asal: [Kengkorok/jadual-kuliah-generator](https://github.com/Kengkorok/jadual-kuliah-generator). Projek ini dilesenkan di bawah **GNU GPL v3** — lihat [LICENSE](LICENSE). Pustaka eksport: html2canvas 1.4.1 dan jsPDF 2.5.1 dari jsDelivr. Gambar serta QR masjid yang dimuat naik kekal milik pemiliknya; pratonton dalam `docs/` hanya dokumentasi.
