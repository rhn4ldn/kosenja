# Kopi Senja — Website Kedai Kopi

Website resmi Kopi Senja, kedai kopi di Kepanjin, Kecamatan Kota Sumenep, Kabupaten Sumenep, Jawa Timur.
Static site: HTML5, CSS3, Vanilla JS. Tanpa build tools.

## Menjalankan
Buka folder di VS Code, klik kanan `index.html` > Open with Live Server. Atau deploy ke static host (root = folder ini).

## Konfigurasi
Seluruh data bisnis ada di `js/config.js`: brand, nomor WhatsApp, alamat, peta, produk (harga, status `available`), `largeExtra`, `addons`, `gallery`.

## Catatan
- Gambar di-hotlink dari Unsplash (lisensi Unsplash) dengan fallback jika gagal dimuat.
- Frontend-only: tidak ada penyimpanan pesanan, pembayaran, atau stok server. Pesanan dikirim sebagai pesan WhatsApp dan baru dianggap diterima setelah admin mengonfirmasi.
- Keranjang tersimpan di LocalStorage browser.
