(() => {
"use strict";
const C = window.CONFIG, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const rp = n => "Rp" + n.toLocaleString("id-ID");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const U = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const FB = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect width="4" height="3" fill="#76513D"/><text x="2" y="1.6" font-size=".3" fill="#F5F0E8" text-anchor="middle" font-family="serif">KOPI SENJA</text></svg>');
document.addEventListener("error", e => { if (e.target.tagName === "IMG" && e.target.src !== FB) e.target.src = FB; }, true);
let toastT; const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); };

$("#heroImg").src = C.heroImg;
$$("img[data-src]").forEach(i => i.src = U(i.dataset.src, 800));
$("#addr").textContent = C.address; $("#fAddr").textContent = C.address;
$("#map").src = "https://www.google.com/maps?q=" + encodeURIComponent(C.mapsQuery) + "&output=embed";
$("#waLink").href = "https://wa.me/" + C.whatsapp;
$("#yr").textContent = new Date().getFullYear();
$("#galGrid").innerHTML = C.gallery.map((g, i) => `<button data-i="${i}" aria-label="Perbesar: ${esc(g[1])}"><img src="${U(g[0], 600)}" alt="${esc(g[1])}" loading="lazy" width="600" height="600"></button>`).join("");
const faqs = [["Jam operasional?", "Untuk informasi jam buka terbaru, silakan hubungi kami lewat WhatsApp."], ["Apakah tersedia dine-in?", "Ya, pilih Dine-in saat checkout dan isi nomor meja."], ["Apakah tersedia takeaway?", "Ya, pilih Takeaway saat checkout."], ["Bagaimana cara memesan?", "Pilih menu, atur variasi, lalu tekan Checkout. Pesanan akan dikirim otomatis ke WhatsApp Kopi Senja."], ["Apakah tersedia non-coffee?", "Ya, ada Matcha Latte dan Chocolate."], ["Metode pembayaran apa saja?", "Cash, QRIS, atau Transfer. Pembayaran diselesaikan di kedai atau sesuai konfirmasi admin lewat WhatsApp."]];
$("#faqList").innerHTML = faqs.map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("");

const burger = $("#burger"), mnav = $("#menuNav");
const setNav = o => { mnav.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); };
burger.onclick = () => setNav(!mnav.classList.contains("open"));
mnav.addEventListener("click", e => { if (e.target.tagName === "A") setNav(false); });
const links = $$("#menuNav a");
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
["home", "story", "menu", "locations", "contact"].forEach(id => spy.observe($("#" + id)));
const topBtn = $("#toTop"); addEventListener("scroll", () => topBtn.hidden = scrollY < 600, { passive: true });
topBtn.onclick = () => scrollTo({ top: 0 });
const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { threshold: .1 });
$$(".brew article,.why li").forEach(el => { el.classList.add("rv"); rv.observe(el); });
$$("[data-close]").forEach(b => b.onclick = () => $("#" + b.dataset.close).close());
$$("dialog").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));

let cat = "All", q = "";

function renderMenu() {
  const list = C.products.filter(p => (cat === "All" || p.cat === cat) && (p.name + " " + p.desc).toLowerCase().includes(q));
  $("#menuGrid").innerHTML = list.length ? list.map(p => `<article class="item"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy" width="400" height="400"><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="meta"><span><span class="price">${rp(p.price)}</span><br><span class="tag">${p.cat}</span></span><button class="btn" data-id="${p.id}" ${p.available ? "" : "disabled"}>${p.available ? "Add to Order" : "Sold out"}</button></div></article>`).join("") : `<p class="empty">Tidak ada menu yang cocok. Coba kata kunci lain atau pilih All.</p>`;
}
$$(".chip").forEach(c => c.onclick = () => { cat = c.dataset.cat; $$(".chip").forEach(x => x.classList.toggle("on", x === c)); renderMenu(); });
$("#search").oninput = e => { q = e.target.value.trim().toLowerCase(); renderMenu(); };
$("#menuGrid").addEventListener("click", e => { const b = e.target.closest("button[data-id]"); if (b) openCust(byId(b.dataset.id)); });


const O = window.KSOrder.make(C);
const unit = (p, o) => O.unit(p, o);
const byId = O.byId;
const isDrink = O.isDrink;
const variant = (p, o) => !isDrink(p) ? "" : [o.size === "Large" ? "Large" : "Regular", o.sugar === "Normal" ? "Normal Sugar" : o.sugar, o.ice === "Normal" ? "Normal Ice" : o.ice, o.shot ? C.addons.shot.label : "", o.milk ? C.addons.milk.label : ""].filter(Boolean).join(", ");
function openCust(p) {
  const f = $("#custForm"), r = (n, vals, d) => vals.map(v => `<label class="inl"><input type="radio" name="${n}" value="${v}" ${v === d ? "checked" : ""}> ${v}</label>`).join("");
  f.innerHTML = `<h2>${esc(p.name)}</h2><p>${esc(p.desc)}</p>` + (isDrink(p) ? `
   <fieldset><legend>Size</legend>${r("size", ["Regular", "Large"], "Regular")} <small>(Large +${rp(C.largeExtra)})</small></fieldset>
   <fieldset><legend>Sugar</legend>${r("sugar", ["Normal", "Less Sugar", "No Sugar"], "Normal")}</fieldset>
   <fieldset><legend>Ice</legend>${r("ice", ["Normal", "Less Ice", "No Ice"], "Normal")}</fieldset>
   <fieldset><legend>Add-on</legend><label class="inl"><input type="checkbox" name="shot"> ${C.addons.shot.label} (+${rp(C.addons.shot.price)})</label><label class="inl"><input type="checkbox" name="milk"> ${C.addons.milk.label} (+${rp(C.addons.milk.price)})</label></fieldset>` : "") +
    `<label>Catatan produk<textarea name="pnote" rows="1" placeholder="Opsional, mis. tanpa sedotan"></textarea></label><div class="row tot"><span>Harga</span><b id="custPrice"></b></div><button class="btn full" value="add">Add to Order</button><button class="btn btn-ghost full" type="button" id="custCancel">Batal</button>`;
  const read = () => { const d = new FormData(f); return { size: d.get("size"), sugar: d.get("sugar"), ice: d.get("ice"), shot: d.has("shot"), milk: d.has("milk"), note: (d.get("pnote") || "").trim() }; };
  const upd = () => $("#custPrice").textContent = rp(unit(p, read()));
  f.onchange = upd; upd();
  $("#custCancel").onclick = () => $("#custDlg").close();
  f.onsubmit = () => addToCart(p, read());
  $("#custDlg").showModal();
}

let cart = []; try { cart = JSON.parse(localStorage.getItem("ks_cart") || "[]"); } catch (e) {}
cart = cart.filter(l => byId(l.id));
const save = () => { try { localStorage.setItem("ks_cart", JSON.stringify(cart)); } catch (e) {} };
function addToCart(p, o) {
  const v = variant(p, o), note = (o.note || "").trim(), l = cart.find(x => O.itemKey(x.id, x.v, x.note) === O.itemKey(p.id, v, note));
  if (l) l.qty++; else cart.push({ id: p.id, v, opt: o, qty: 1, note });
  save(); renderCart(); toast(p.name + " ditambahkan");
}
const lineTotal = l => O.lineTotal(l);
const total = () => O.total(cart);
function renderCart() {
  const n = cart.reduce((s, l) => s + l.qty, 0);
  $("#cartCount").textContent = n; $("#drawerCount").textContent = n ? `(${n})` : "";
  $("#cartList").innerHTML = cart.length ? cart.map((l, i) => { const p = byId(l.id); return `<div class="line"><div><b>${esc(p.name)}</b>${l.v ? `<small>${esc(l.v)}</small>` : ""}${l.note ? `<small>Catatan: ${esc(l.note)}</small>` : ""}<small>${rp(unit(p, l.opt))} / item</small></div><b>${rp(lineTotal(l))}</b><div class="qty"><button data-a="dec" data-i="${i}" aria-label="Kurangi ${esc(p.name)}">&minus;</button><span>${l.qty}</span><button data-a="inc" data-i="${i}" aria-label="Tambah ${esc(p.name)}">+</button></div><button class="rm" data-a="rm" data-i="${i}">Hapus</button></div>`; }).join("") : `<p>Keranjang masih kosong. Pilih menu dan tekan Add to Order.</p>`;
  $("#subtotal").textContent = $("#total").textContent = rp(total());
  $("#checkoutBtn").disabled = !cart.length;
}
$("#cartList").addEventListener("click", e => {
  const b = e.target.closest("button[data-a]"); if (!b) return; const i = +b.dataset.i, a = b.dataset.a;
  if (a === "inc") cart[i].qty++; else if (a === "dec") { if (--cart[i].qty <= 0) cart.splice(i, 1); } else cart.splice(i, 1);
  save(); renderCart();
});
const drawer = $("#drawer"), scrim = $("#scrim");
const cartOpen = o => { drawer.classList.toggle("open", o); drawer.setAttribute("aria-hidden", !o); scrim.hidden = !o; if (o) $("#closeCart").focus(); };
$("#openCart").onclick = () => cartOpen(true); $("#closeCart").onclick = scrim.onclick = () => cartOpen(false);
addEventListener("keydown", e => { if (e.key === "Escape") { cartOpen(false); setNav(false); } });

const form = $("#coForm");
const typeVal = () => form.elements.type.value;
const syncTable = () => $("#tableWrap").hidden = typeVal() !== "Dine-in";
form.addEventListener("change", e => { if (e.target.name === "type") syncTable(); });
$("#checkoutBtn").onclick = () => {
  if (!cart.length) return toast("Keranjang masih kosong");
  $("#coSum").innerHTML = cart.map(l => `<div><span>${l.qty}x ${esc(byId(l.id).name)}${l.v ? " (" + esc(l.v) + ")" : ""}${l.note ? " — " + esc(l.note) : ""}</span><span>${rp(lineTotal(l))}</span></div>`).join("") + `<div><b>Total</b><b>${rp(total())}</b></div>`;
  syncTable(); cartOpen(false); $("#coDlg").showModal();
};
const setErr = (el, m) => { el.parentElement.querySelector(".err").textContent = m; return !m; };
form.onsubmit = e => {
  e.preventDefault();
  const F = form.elements, name = F.name.value.trim(), phone = F.phone.value.replace(/[\s-]/g, ""), table = F.table.value.trim();
  let ok = setErr(F.name, name.length < 2 ? "Isi nama minimal 2 huruf." : "");
  ok = setErr(F.phone, /^(\+62|62|0)8\d{7,12}$/.test(phone) ? "" : "Gunakan nomor Indonesia, contoh 08123456789.") && ok;
  ok = setErr(F.table, typeVal() === "Dine-in" && !/^\d{1,3}$/.test(table) ? "Isi nomor meja untuk dine-in." : "") && ok;
  if (!ok) return form.querySelector(".err:not(:empty)").parentElement.querySelector("input").focus();
  // Validasi sebelum membuka WhatsApp
  if (!cart.length) return toast("Keranjang kosong. Tambahkan menu dulu.");
  const qtyOk = cart.every(l => Number.isInteger(l.qty) && l.qty >= 1 && byId(l.id));
  if (!qtyOk) return toast("Kuantitas pesanan tidak valid. Periksa kembali keranjang.");
  if (!C.whatsapp || !/^62\d{8,14}$/.test(C.whatsapp)) return toast("Nomor WhatsApp tujuan tidak valid.");
  const msg = O.buildMessage(cart, { name, method: typeVal(), table, pay: F.pay.value, note: F.note.value });
  const finalTotal = O.total(cart);
  if (finalTotal <= 0) return toast("Total pesanan tidak valid.");
  if (!msg.includes(rp(finalTotal))) return toast("Total pesanan tidak sesuai keranjang. Coba lagi.");
  const w = window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  $("#coDlg").close();
  toast(w ? "WhatsApp dibuka. Pesanan belum dikonfirmasi sampai admin membalas." : "Pop-up diblokir. Izinkan pop-up lalu coba lagi.");
};

let li = 0; const lb = $("#lbDlg");
const showLb = i => { li = (i + C.gallery.length) % C.gallery.length; $("#lbImg").src = U(C.gallery[li][0], 1200); $("#lbImg").alt = C.gallery[li][1]; };
$("#galGrid").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { showLb(+b.dataset.i); lb.showModal(); } });
$("#lbPrev").onclick = () => showLb(li - 1); $("#lbNext").onclick = () => showLb(li + 1);
lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") showLb(li - 1); if (e.key === "ArrowRight") showLb(li + 1); });

renderMenu(); renderCart();
})();
