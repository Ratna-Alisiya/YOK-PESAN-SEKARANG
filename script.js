
const form = document.getElementById('orderForm');
const menu = document.getElementById('menu');
const varianWrapper = document.getElementById('varianWrapper');
const varian = document.getElementById('varian');
const topping = document.getElementById('topping');
const jumlah = document.getElementById('jumlah');
const totalHarga = document.getElementById('totalHarga');

const hargaPisang = 13000;
const hargaMix = 15000;
const hargaCilok = 1000;

const hargaTopping = {
  'Almond': 3000,
  'Milo': 2000,
  'Keju': 2000,
  'Oreo': 2000,
  'Ekstra Keju': 2000
};

function updateHarga() {
  let total = 0;
  const jml = parseInt(jumlah.value || 1);
  const selectedMenu = menu.value;
  const selectedVarian = varian.value;
  const selectedTopping = Array.from(topping.selectedOptions).map(opt => opt.value);

  if (selectedMenu === "Pisang Gembul") {
    total += (selectedVarian === "Mix Glaze" ? hargaMix : hargaPisang);
  } else if (selectedMenu === "Cilok Kuah Kacang") {
    total += hargaCilok;
  }

  selectedTopping.forEach(t => {
    total += hargaTopping[t] || 0;
  });

  total *= jml;
  totalHarga.textContent = "Total: Rp " + total.toLocaleString();
}

menu.addEventListener('change', function() {
  if (menu.value === "Pisang Gembul") {
    varianWrapper.style.display = "block";
  } else {
    varianWrapper.style.display = "none";
    varian.value = "-";
  }
  updateHarga();
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    nama: form.nama.value,
    nohp: form.nohp.value,
    menu: form.menu.value,
    varian: form.varian.value || "-",
    topping: Array.from(topping.selectedOptions).map(opt => opt.value).join(', '),
    jumlah: form.jumlah.value,
    catatan: form.catatan.value,
    total: totalHarga.textContent.replace("Total: Rp ", "")
  };

  fetch("https://script.google.com/macros/s/AKfycbx14jmUQFYaFxJ4P2ckhiPgJflBV7yMLvqNLKOpi_qc3HeCkmPLqqeac642f37-BuJg8Q/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(response => {
    alert("Pesanan berhasil dikirim!");
    form.reset();
    totalHarga.textContent = "Total: Rp 0";
  })
  .catch(err => {
    alert("Gagal mengirim data!");
    console.error(err);
  });
});
