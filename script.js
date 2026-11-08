const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const projectDetails = {
  inventory: {
    title: "Dashboard Persediaan Produk Toko (Proyek Simulasi)",
    html: `<p><strong>Latar belakang:</strong> Pengelolaan persediaan membantu toko memantau ketersediaan produk.</p>
      <p><strong>Tujuan:</strong> Memahami stok awal, barang masuk, barang keluar, dan stok akhir melalui data contoh.</p>
      <p><strong>Proses:</strong> Menyusun tabel produk, membuat rumus perhitungan, dan menandai produk yang mencapai batas minimum.</p>
      <p><strong>Tools:</strong> [Microsoft Excel / Google Sheets].</p>
      <p><strong>Hasil:</strong> Dashboard sederhana untuk memantau persediaan berdasarkan data simulasi.</p>
      <p><em>Ganti uraian ini dengan proses dan hasil proyek Anda yang sebenarnya.</em></p>`
  },
  promotion: {
    title: "Rencana Promosi untuk UMKM",
    html: `<p><strong>Latar belakang:</strong> UMKM membutuhkan promosi yang sesuai dengan target pelanggan dan sumber daya yang tersedia.</p>
      <p><strong>Proses:</strong> Tentukan target pelanggan, tujuan promosi, ide konten, kalender publikasi, dan indikator evaluasi.</p>
      <p><strong>Tools:</strong> [Canva / spreadsheet / platform lain].</p>
      <p><strong>Hasil:</strong> [Tuliskan hasil atau rekomendasi yang benar-benar Anda buat].</p>`
  },
  customer: {
    title: "Analisis Pengalaman Pelanggan",
    html: `<p><strong>Tujuan:</strong> Memetakan perjalanan pelanggan dari masuk toko hingga pembayaran.</p>
      <p><strong>Metode:</strong> [Observasi / wawancara / survei]. Jelaskan lokasi, waktu, dan jumlah responden jika ada.</p>
      <p><strong>Temuan:</strong> [Masukkan temuan berdasarkan pengamatan atau data Anda].</p>
      <p><strong>Rekomendasi:</strong> [Tuliskan saran perbaikan yang realistis].</p>`
  }
};

const dialog = document.getElementById("projectDialog");
document.querySelectorAll(".detail-button").forEach(button => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    document.getElementById("dialogTitle").textContent = project.title;
    document.getElementById("dialogContent").innerHTML = project.html;
    dialog.showModal();
  });
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

let activeFilter = "all";
const cards = [...document.querySelectorAll(".project-card")];
const search = document.getElementById("projectSearch");
function filterProjects() {
  const term = search.value.toLowerCase().trim();
  cards.forEach(card => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesText = card.dataset.title.toLowerCase().includes(term) || card.textContent.toLowerCase().includes(term);
    card.hidden = !(matchesCategory && matchesText);
  });
}
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    filterProjects();
  });
});
search.addEventListener("input", filterProjects);

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const recipient = "emailanda@example.com"; // GANTI dengan email Anda
  const subject = encodeURIComponent(`Pesan portofolio dari ${name}`);
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
