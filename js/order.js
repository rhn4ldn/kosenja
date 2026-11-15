// KSOrder — satu-satunya sumber perhitungan harga dan pembentuk pesan WhatsApp.
// Dipakai oleh keranjang, checkout, dan generator pesan agar total selalu sama.
window.KSOrder = (() => {
  const rp = n => "Rp" + n.toLocaleString("id-ID");
  const make = (C) => {
    const byId = id => C.products.find(p => p.id === id);
    const isDrink = p => p.cat !== "Food";
    const unit = (p, o) => p.price
      + (isDrink(p) && o.size === "Large" ? C.largeExtra : 0)
      + (isDrink(p) && o.shot ? C.addons.shot.price : 0)
      + (isDrink(p) && o.milk ? C.addons.milk.price : 0);
    const lineTotal = l => unit(byId(l.id), l.opt) * l.qty;
    const total = cart => cart.reduce((s, l) => s + lineTotal(l), 0);
    const totalQty = cart => cart.reduce((s, l) => s + l.qty, 0);
    const extrasTotal = cart => cart.reduce((s, l) => s + (unit(byId(l.id), l.opt) - byId(l.id).price) * l.qty, 0);
    const baseTotal = cart => cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
    const addonsOf = (p, o) => {
      if (!isDrink(p)) return [];
      const a = [];
      if (o.shot) a.push(C.addons.shot.label);
      if (o.milk) a.push(C.addons.milk.label);
      return a;
    };
    const sugarLabel = v => v === "Normal" ? "Normal Sugar" : v;
    const iceLabel = v => v === "Normal" ? "Normal Ice" : v;
    const itemKey = (id, v, note) => [id, v, (note || "").trim()].join("|");
    const SEP = "================================";
    const DIV = "--------------------------------";
    function buildMessage(cart, c) {
      const lines = ["Halo Kopi Senja! Saya ingin memesan.", "", `NAMA: ${c.name}`];
      lines.push(`METODE: ${c.method === "Takeaway" ? "Take Away" : "Dine-in" + (c.table ? " (Meja " + c.table + ")" : "")}`);
      if (c.pay) lines.push(`PEMBAYARAN: ${c.pay} (preferensi)`);
      lines.push("", SEP, "DETAIL PESANAN", SEP, "");
      cart.forEach((l, i) => {
        const p = byId(l.id), drink = isDrink(p);
        lines.push(`${i + 1}. ${p.name}`);
        if (p.code) lines.push(`   Kode: ${p.code}`);
        lines.push(`   Jumlah: ${l.qty}`, "");
        if (drink) {
          lines.push(`   - Size: ${l.opt.size}`);
          lines.push(`   - Gula: ${sugarLabel(l.opt.sugar)}`);
          lines.push(`   - Es: ${iceLabel(l.opt.ice)}`);
          const a = addonsOf(p, l.opt);
          lines.push(`   - Add-on: ${a.length ? a.join(", ") : "Tidak ada"}`);
        }
        lines.push(`   - Catatan: ${(l.note || "").trim() || "Tidak ada"}`, "");
        lines.push(`   Harga: ${rp(unit(p, l.opt))}`);
        lines.push(`   Subtotal: ${rp(lineTotal(l))}`);
        lines.push("", DIV, "");
      });
      while (lines.length && (lines[lines.length - 1] === "" || lines[lines.length - 1] === DIV)) lines.pop();
      lines.push("", SEP, "RINGKASAN PEMBAYARAN", SEP, "");
      lines.push(`Total Item: ${totalQty(cart)}`);
      lines.push(`Subtotal: ${rp(baseTotal(cart))}`);
      lines.push(`Biaya Tambahan: ${rp(extrasTotal(cart))}`);
      lines.push(`TOTAL PESANAN: ${rp(total(cart))}`, "");
      lines.push("Catatan Umum:");
      lines.push((c.note || "").trim() || "Tidak ada", "");
      lines.push(SEP, "", "Mohon konfirmasi ketersediaan dan", "pesanan saya.", "", "Terima kasih!", "Kopi Senja");
      return lines.join("\n");
    }
    return { byId, isDrink, unit, lineTotal, total, totalQty, extrasTotal, baseTotal, buildMessage, itemKey, rp };
  };
  return { make };
})();
