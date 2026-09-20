export const OFFICIAL_CHECKLIST = [
  {
    id: 1,
    title: "Judul Jelas & Tidak Berlebihan",
    desc: "Maksimal 12–15 kata, memuat subjek, tindakan, dan hasil/manfaat nyata tanpa sensasionalisme.",
  },
  {
    id: 2,
    title: "5W+1H Terjawab",
    desc: "Apa kegiatannya, siapa pelaksananya, kapan, di mana, mengapa penting, dan bagaimana berlangsung.",
  },
  {
    id: 3,
    title: "Semua Angka Memiliki Sumber & Periode",
    desc: "Tidak ada angka berdiri sendiri tanpa konteks satuan, periode pendataan, dan unit sumber data.",
  },
  {
    id: 4,
    title: "Tidak Ada Klaim Tanpa Bukti",
    desc: "Bebas dari kata 'terbaik', 'luar biasa', 'sangat berhasil', 'sukses besar' kecuali didukung piagam/data terverifikasi.",
  },
  {
    id: 5,
    title: "Perlindungan Data Pribadi Terjamin",
    desc: "Bebas dari NIK, NISN, No KK, No HP pribadi, alamat rumah lengkap, info ekonomi sensitif, atau data kesehatan pribadi.",
  },
  {
    id: 6,
    title: "Testimoni Siswa Berizin Sah",
    desc: "Untuk siswa di bawah umur, telah mengantongi izin orang tua/wali dan hak koreksi/penarikan dihormati.",
  },
  {
    id: 7,
    title: "Foto / Video Aman & Bermartabat",
    desc: "Tidak menampilkan siswa dalam kondisi memalukan, rentan, melanggar norma madrasah, atau merugikan masa depan.",
  },
  {
    id: 8,
    title: "Hak Penggunaan Konten Sah",
    desc: "Karya foto, grafis, atau instrumen musik dibuat mandiri, berizin resmi, atau mencantumkan atribusi sumber asli.",
  },
  {
    id: 9,
    title: "Netralitas Politik Terjaga",
    desc: "Bebas dari atribut partai, ajakan memilih, kampanye figur caleg/pilkada, dan murni fokus pada kinerja madrasah.",
  },
  {
    id: 10,
    title: "Bahasa Indonesia Baku & Santun",
    desc: "Menggunakan tata bahasa baku yang hangat, komunikatif, bebas diskriminasi, serta tidak mengandung ujaran kebencian.",
  },
  {
    id: 11,
    title: "Diverifikasi & Disetujui Pejabat Berwenang",
    desc: "Telah melewati verifikasi unit data dan mendapatkan persetujuan Humas atau Kepala Madrasah sebelum tayang.",
  },
];

export const SIX_PRINCIPLES = [
  {
    title: "Akurat",
    icon: "ShieldCheck",
    desc: "Hanya gunakan fakta yang tersedia atau telah diverifikasi. Jangan mengarang nama, angka, tanggal, lokasi, prestasi, kutipan, atau dampak.",
  },
  {
    title: "Berbasis Bukti (Evidence-Based)",
    icon: "BarChart3",
    desc: "Setiap angka dan capaian wajib menyertakan sumber data yang jelas dan periode pencatatan.",
  },
  {
    title: "Bermanfaat bagi Publik",
    icon: "HeartHandshake",
    desc: "Utamakan dampak dan manfaat nyata bagi peserta didik, madrasah, dan masyarakat, bukan sekadar seremonial.",
  },
  {
    title: "Netral & Bebas Politik",
    icon: "Scale",
    desc: "Tidak memuat atribut partai politik, ajakan memilih calon tertentu, atau promosi figur politik praktis.",
  },
  {
    title: "Perlindungan Data Pribadi",
    icon: "Lock",
    desc: "Lindungi privasi dengan tidak mencantumkan NIK, NISN, No KK, kontak pribadi, atau data sensitif tanpa izin.",
  },
  {
    title: "Jelas & Ringkas",
    icon: "Sparkles",
    desc: "Gunakan bahasa Indonesia baku yang hangat, lugas, tidak berlebihan, dan mudah dipahami masyarakat umum.",
  },
];

export const PROHIBITED_WORDS = [
  "terbaik",
  "luar biasa",
  "sangat berhasil",
  "sukses besar",
  "paling hebat",
  "spektakuler",
  "tiada tandingan",
  "paling unggul",
  "tanpa cela",
  "sempurna",
];

export const PRESET_PROMPTS = [
  {
    label: "Berita Website Resmi",
    prompt: "Buatkan berita website dari data kegiatan berikut. Jangan mengarang data yang belum saya berikan.",
    contentType: "berita" as const,
  },
  {
    label: "Audit Kepatuhan & Etika",
    prompt: "Periksa draft berita ini berdasarkan prinsip akurasi, data, privasi, hak cipta, dan netralitas.",
    contentType: "custom" as const,
  },
  {
    label: "Caption Instagram Berbasis Data",
    prompt: "Ubah laporan capaian berikut menjadi caption Instagram yang ringkas dan berbasis data.",
    contentType: "caption" as const,
  },
  {
    label: "5 Alternatif Judul (≤15 Kata)",
    prompt: "Buat 5 alternatif judul maksimal 15 kata, memuat siapa, apa, dan hasil nyata tanpa klaim berlebihan.",
    contentType: "berita" as const,
  },
  {
    label: "Tandai Angka Tanpa Sumber",
    prompt: "Tandai semua angka atau capaian yang belum memiliki sumber data atau periode data yang jelas.",
    contentType: "custom" as const,
  },
  {
    label: "Checklist Pra-Publikasi",
    prompt: "Buatkan lembar checklist kepatuhan sebelum berita ini dipublikasikan.",
    contentType: "custom" as const,
  },
  {
    label: "Tabel Laporan Kinerja",
    prompt: "Ubah data target dan realisasi kegiatan ini menjadi tabel laporan kinerja yang terstruktur.",
    contentType: "laporan" as const,
  },
];

export const SAMPLE_ACTIVITY_DATA = {
  contentType: "berita" as const,
  activityName: "Bimbingan Teknis Literasi Digital dan Riset Madrasah Bagi Siswa Kelas VIII",
  date: "Senin, 15 September 2026, Pukul 08.00 - 12.30 WIB",
  place: "Laboratorium Komputer dan Aula MTsN 1 Padang Pariaman, Pauh Kambar",
  participants: "84 siswa perwakilan kelas VIII dan 6 guru pendamping mata pelajaran IPA dan IPS",
  objective: "Meningkatkan kecakapan riset ilmiah siswa madrasah dalam menyaring referensi digital terpercaya menjelang seleksi Madrasah Young Researchers Supercamp (MYRES)",
  results: "84 siswa menyelesaikan penyusunan 21 proposal awal riset lingkungan dan sosial keagamaan madrasah",
  numericalData: "84 siswa berpartisipasi aktif; 21 rancangan proposal penelitian dihasilkan; tingkat pemahaman konsep dasar riset meningkat dari skor pre-test rata-rata 62,5 menjadi 86,0 pada post-test",
  dataSource: "Unit Kurikulum dan Tim Pembina Riset MTsN 1 Padang Pariaman (Periode September 2026)",
  spokesperson: "Drs. H. Syahrul, M.Pd. (Kepala MTsN 1 Padang Pariaman)",
  quote: "Pembelajaran riset sejak madrasah tsanawiyah membekali anak-anak kita dengan nalar kritis, integritas akademik, serta kebiasaan memverifikasi kebenaran informasi berbasis data nyata.",
  impact: "Siswa memiliki kemampuan mandiri membedakan sumber rujukan ilmiah terpercaya dari hoaks dan siap mengimplementasikan metode observasi lapangan di lingkungan sekitar sekolah.",
  challenges: "Keterbatasan waktu pendampingan intensif satu-satu untuk tiap kelompok penyusun proposal riset.",
  followUp: "Klinik bimbingan proposal riset lanjutan akan diadakan setiap hari Sabtu pekan ke-3 dan ke-4 September 2026 di bawah koordinasi Tim Pembina Riset.",
  supportingLinks: "Dokumentasi foto kegiatan bimtek dan presensi kehadiran digital diarsipkan pada server Humas madrasah.",
  channel: "Website Resmi & Media Sosial MTsN 1 Padang Pariaman",
  desiredLength: "standar" as const,
  rawDraft: "",
};
