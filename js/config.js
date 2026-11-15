// KONFIGURASI TUNGGAL — semua data bisnis Kopi Senja ada di file ini.
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;
window.CONFIG = {
  brand: "Kopi Senja",
  whatsapp: "6287841192932", // format internasional tanpa +
  whatsappDisplay: "087841192932",
  address: "Kepanjin, Kecamatan Kota Sumenep, Kabupaten Sumenep, Jawa Timur",
  mapsQuery: "Kepanjin, Kota Sumenep, Jawa Timur", // dipakai untuk Google Maps embed
  largeExtra: 5000,
  addons: { shot: { label: "Extra Shot", price: 8000 }, milk: { label: "Extra Milk", price: 5000 } },
  heroImg: U("photo-1495474472287-4d71bcdd2085"),
  products: [
    { id: "espresso", code: "A1", name: "Espresso", cat: "Coffee", price: 20000, available: true, img: U("photo-1510707577719-ae7c14805e3a"), desc: "Double shot pekat dengan crema tebal dan akhir rasa cokelat gelap." },
    { id: "americano", code: "A2", name: "Americano", cat: "Coffee", price: 24000, available: true, img: U("photo-1521302080334-4bebac2763a6"), desc: "Espresso dengan air panas. Bersih, ringan, mudah dinikmati sepanjang hari." },
    { id: "latte", code: "A3", name: "Cafe Latte", cat: "Coffee", price: 30000, available: true, img: U("photo-1459755486867-b55449bb39ff"), desc: "Espresso dan susu steamed yang lembut dengan lapisan microfoam tipis." },
    { id: "cappuccino", code: "A4", name: "Cappuccino", cat: "Coffee", price: 30000, available: true, img: U("photo-1572442388796-11668a67e53d"), desc: "Komposisi seimbang espresso, susu, dan foam yang tebal." },
    { id: "spanish", code: "A5", name: "Spanish Latte", cat: "Coffee", price: 33000, available: true, img: U("photo-1461023058943-07fcbe16d735"), desc: "Latte dengan susu kental manis. Manis hangat, cocok disajikan dingin." },
    { id: "macchiato", code: "A6", name: "Caramel Macchiato", cat: "Coffee", price: 35000, available: false, img: U("photo-1485808191679-5f86510681a2"), desc: "Susu vanila, espresso, dan saus karamel di atasnya." },
    { id: "manual", code: "A7", name: "Manual Brew", cat: "Coffee", price: 32000, available: true, img: U("photo-1447933601403-0c6688de566e"), desc: "Seduhan tangan dari biji pilihan barista hari ini. Tanyakan profil rasanya." },
    { id: "matcha", code: "B1", name: "Matcha Latte", cat: "Non-Coffee", price: 32000, available: true, img: U("photo-1515823064-d6e0c04616a7"), desc: "Matcha dengan susu. Earthy, creamy, tanpa espresso." },
    { id: "chocolate", code: "B2", name: "Chocolate", cat: "Non-Coffee", price: 28000, available: true, img: U("photo-1542990253-0d0f5be5f0ed"), desc: "Cokelat pekat dengan susu hangat atau dingin." },
    { id: "croissant", code: "C1", name: "Croissant", cat: "Food", price: 26000, available: true, img: U("photo-1555507036-ab1f4038808a"), desc: "Croissant mentega dengan lapisan renyah, teman klasik untuk kopi hitam." },
    { id: "cookies", code: "C2", name: "Cookies", cat: "Food", price: 18000, available: true, img: U("photo-1558961363-fa8fdf82db35"), desc: "Cookies cokelat chip, renyah di tepi dan lembut di tengah." }
  ],
  gallery: [
    ["photo-1495474472287-4d71bcdd2085", "Cangkir kopi di meja kayu"],
    ["photo-1442512595331-e89e73853f31", "Persiapan kopi di bar"],
    ["photo-1554118811-1e0d58224f24", "Interior kedai kopi"],
    ["photo-1521017432531-fbd92d768814", "Barista menyiapkan pesanan"],
    ["photo-1555507036-ab1f4038808a", "Pastry segar"],
    ["photo-1447933601403-0c6688de566e", "Seduhan manual"]
  ]
};
