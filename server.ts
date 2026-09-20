import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// System Prompt for Asisten Publikasi MTsN 1 Padang Pariaman
export const MTSN1_SYSTEM_PROMPT = `Anda adalah "Asisten Publikasi MTsN 1 Padang Pariaman", asisten khusus untuk membantu Humas/tim madrasah membuat publikasi yang akurat, berbasis data, berdampak, aman secara hukum dan etika, serta mudah dipahami masyarakat.

IDENTITAS SKILL:
- Nama Skill: Asisten Publikasi MTsN 1 Padang Pariaman
- Satuan Kerja: Madrasah Tsanawiyah Negeri 1 Padang Pariaman (MTsN 1 Padang Pariaman), Kementerian Agama Kabupaten Padang Pariaman, Sumatera Barat.
- Pimpinan Madrasah:
  * Kepala Madrasah: Jusma Yanti, S.Pd., M.Pd. (Pejabat yang berwenang memberikan persetujuan akhir publikasi).
  * Wakil Kepala Madrasah Bidang Hubungan Masyarakat (Waka Humas): Mhd. Ishra Alriady, S.AP. (Pemeriksa substansi, kepatuhan jurnalistik, data, dan etika privasi).
- Fungsi: Membantu menyusun, memeriksa, memperbaiki, dan memformat berita kegiatan, laporan capaian kinerja, profil/kisah inspiratif, caption media sosial, serta konten website madrasah.
- Prinsip Utama:
  1. Akurat: Berdasarkan fakta yang terverifikasi, bukan karangan/asumsi.
  2. Berbasis Bukti (Evidence-Based): Menggunakan data angka valid dengan sumber dan periode.
  3. Bermanfaat bagi Publik: Berorientasi pada outcome/dampak nyata bagi siswa, wali murid, dan masyarakat madrasah, bukan sekadar seremonial.
  4. Netral: Bebas dari kepentingan politik praktis, promosi figur caleg/partai, atau klaim sepihak.
  5. Melindungi Data Pribadi: Menjaga privasi siswa dan guru (bebas dari NIK, NISN, nomor KK, nomor HP pribadi, alamat rumah lengkap, kondisi ekonomi sensitif, data kesehatan pribadi, atau catatan disiplin).
  6. Jelas & Ringkas: Bahasa Indonesia yang baku, santun, hangat, tidak berlebihan, dan mudah dipahami.

TUGAS UTAMA:
1. Menulis dan mengedit berita kegiatan madrasah.
2. Menyusun laporan capaian kinerja untuk media sosial, website, atau infografis.
3. Menulis profil dan kisah inspiratif siswa, guru, program, dan inovasi pembelajaran.
4. Mengubah data/catatan kegiatan mentah menjadi naskah publikasi yang rapi.
5. Memeriksa judul, 5W+1H, angka, klaim, narasumber, privasi, hak cipta, netralitas, dan kelayakan publikasi.
6. Membuat caption, ringkasan, judul alternatif, tabel capaian, dan checklist publikasi.

ATURAN WAJIB & KETAT:
- Hanya gunakan fakta yang tersedia dan/atau telah diverifikasi. JANGAN PERNAH mengarang nama orang, angka/statistik, tanggal, lokasi, prestasi, kutipan narasumber, atau dampak jika pengguna belum menyediakannya!
- Untuk setiap angka/capaian, minta atau tandai sumber data dan periode data jika belum tersedia (contoh: "[Sumber data & periode: perlu diverifikasi unit terkait]").
- Hindari klaim berlebihan tanpa bukti objektif seperti "terbaik", "luar biasa", "sangat berhasil", "sukses besar", "paling unggul", "spektakuler", dsb. Ganti dengan fakta konkret apa yang dicapai.
- Utamakan outcome/manfaat nyata bagi peserta didik dan madrasah, bukan hanya jumlah acara yang diadakan.
- Judul ideal maksimal 12–15 kata, memuat siapa, apa, dan hasil/manfaat, tanpa klaim berlebihan.
- Berita mengikuti struktur baku: Judul → Teras (5W+1H) → Isi Berita → Kutipan Narasumber Asli (hanya jika ada) → Data Pendukung → Penutup → Catatan Verifikasi (bila ada bagian yang perlu konfirmasi).
- Laporan kinerja memuat: Judul → Ringkasan Eksekutif (bila perlu) → Tujuan & Sasaran → Indikator & Target → Realisasi (disajikan rapi/tabel) → Sumber Data & Metode → Manfaat/Dampak → Kendala & Pembelajaran → Rencana Tindak Lanjut.
- Caption Media Sosial memuat: Judul/Hook informatif → Isi singkat berbasis data → Manfaat/Capaian → Sumber data bila relevan → Tindak lanjut/Ajakan informatif → Hashtag secukupnya tanpa klaim berlebihan (#MTsN1PadangPariaman #MadrasahMajuBermutuMendunia dsb).
- Privasi & Etika Siswa: JANGAN tampilkan NIK, NISN, nomor KK, nomor telepon, alamat lengkap rumah, data kesehatan siswa, kondisi ekonomi rinci, masalah disiplin, atau informasi memalukan. Untuk siswa di bawah umur, testimoni memerlukan izin orang tua/wali.
- Hak Cipta & Netralitas: Pastikan visual/materi berizin. Tolak dan hilangkan segala bentuk atribut partai, ajakan memilih calon/figur politik, atau kampanye politik praktis. Fokus 100% pada kinerja pendidikan madrasah.
- Jika informasi penting belum ada, jangan mengarang! Ajukan pertanyaan singkat atau beri placeholder seperti [tanggal belum dicantumkan] atau [perlu konfirmasi Humas].
- Bila diminta "siap posting", berikan naskah final yang rapi dan dapat langsung disalin, namun tetap beri catatan verifikasi jika masih ada data yang perlu dikonfirmasi.`;

// Initialize Gemini Client safely
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY tidak ditemukan di environment variables. Silakan atur di Settings > Secrets.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "Asisten Publikasi MTsN 1 Padang Pariaman",
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Endpoint: Upload authentic image assets (100% exact match without AI distortion)
app.post("/api/upload-asset", async (req, res) => {
  try {
    const { assetKey, dataUrl } = req.body;
    if (!assetKey || !dataUrl) {
      return res.status(400).json({ error: "assetKey dan dataUrl wajib diisi." });
    }

    const validKeys: Record<string, string> = {
      logo: "mtsn1-logo.jpg",
      kepala: "kepala-madrasah.jpg",
      humas: "waka-humas.jpg",
    };

    const fileName = validKeys[assetKey];
    if (!fileName) {
      return res.status(400).json({ error: "assetKey tidak valid (gunakan 'logo', 'kepala', atau 'humas')." });
    }

    // Extract base64 buffer
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Format dataUrl tidak valid." });
    }

    const imageBuffer = Buffer.from(matches[2], "base64");

    const targetDirs = [
      path.join(process.cwd(), "public", "assets", "images"),
      path.join(process.cwd(), "dist", "assets", "images"),
    ];

    for (const dir of targetDirs) {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, fileName), imageBuffer);
      } catch (err) {
        // Continue if dist doesn't exist yet
      }
    }

    const publicUrl = `/assets/images/${fileName}?t=${Date.now()}`;
    return res.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Error in /api/upload-asset:", error);
    return res.status(500).json({ error: error?.message || "Gagal menyimpan aset gambar." });
  }
});

// Endpoint: Generate publication based on template or custom prompt
app.post("/api/generate", async (req, res) => {
  try {
    const {
      contentType, // 'berita' | 'laporan' | 'caption' | 'profil' | 'custom'
      activityName,
      date,
      place,
      participants,
      objective,
      results,
      numericalData,
      dataSource,
      spokesperson,
      quote,
      impact,
      challenges,
      followUp,
      supportingLinks,
      channel,
      desiredLength,
      rawDraft,
      presetAction,
    } = req.body;

    const ai = getGenAI();

    let userPrompt = "";

    if (presetAction) {
      userPrompt += `[INSTRUKSI PERINTAH KHUSUS]\n${presetAction}\n\n`;
    }

    userPrompt += `[DATA DARI PENGGUNA]\n`;
    userPrompt += `- Jenis Konten yang diminta: ${contentType || "Berita Kegiatan"}\n`;
    if (activityName) userPrompt += `- Nama Kegiatan / Program: ${activityName}\n`;
    if (date) userPrompt += `- Tanggal / Waktu: ${date}\n`;
    if (place) userPrompt += `- Tempat / Lokasi: ${place}\n`;
    if (participants) userPrompt += `- Peserta / Jumlah: ${participants}\n`;
    if (objective) userPrompt += `- Tujuan: ${objective}\n`;
    if (results) userPrompt += `- Hasil / Capaian: ${results}\n`;
    if (numericalData) userPrompt += `- Data Angka & Periode: ${numericalData}\n`;
    if (dataSource) userPrompt += `- Sumber Data: ${dataSource}\n`;
    if (spokesperson) userPrompt += `- Narasumber & Jabatan: ${spokesperson}\n`;
    if (quote) userPrompt += `- Kutipan Asli: "${quote}"\n`;
    if (impact) userPrompt += `- Manfaat / Dampak Nyata: ${impact}\n`;
    if (challenges) userPrompt += `- Kendala / Pembelajaran: ${challenges}\n`;
    if (followUp) userPrompt += `- Rencana Tindak Lanjut: ${followUp}\n`;
    if (supportingLinks) userPrompt += `- Dokumen / Tautan / Foto: ${supportingLinks}\n`;
    if (channel) userPrompt += `- Kanal Publikasi: ${channel}\n`;
    if (desiredLength) userPrompt += `- Panjang yang diinginkan: ${desiredLength}\n`;

    if (rawDraft) {
      userPrompt += `\n[DRAFT / CATATAN AWAL DARI PENGGUNA]:\n${rawDraft}\n`;
    }

    userPrompt += `\nSilakan susun naskah publikasi berkualitas tinggi sesuai pedoman MTsN 1 Padang Pariaman:
- Terapkan 6 prinsip utama (Akurat, Evidence-Based, Manfaat Publik, Netral, Perlindungan Data Pribadi, Jelas & Ringkas).
- Gunakan format output standar yang sesuai (${contentType || "berita"}).
- Jika ada fakta penting yang belum dicantumkan pengguna, JANGAN MENGARANG, gunakan tanda kurung siku [perlu dilengkapi: ...].
- Cantumkan bagian "Catatan Verifikasi" di akhir bila ada poin yang perlu divalidasi ke unit pemilik data atau pimpinan sebelum tayang.
- Lampirkan checklist status kelayakan publikasi di bagian akhir.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction: MTSN1_SYSTEM_PROMPT,
        temperature: 0.3, // low temperature to avoid hallucination and uphold factual accuracy
      },
    });

    const outputText = response.text || "";
    res.json({ text: outputText });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({
      error: error?.message || "Terjadi kesalahan saat memproses permintaan dengan Gemini AI.",
    });
  }
});

// Endpoint: Audit & Check Compliance of a Draft
app.post("/api/audit", async (req, res) => {
  try {
    const { draftText } = req.body;
    if (!draftText || !draftText.trim()) {
      return res.status(400).json({ error: "Draft teks tidak boleh kosong." });
    }

    const ai = getGenAI();

    const auditPrompt = `Periksalah naskah publikasi berikut secara ketat berdasarkan "Panduan Penulisan Postingan Berita dan Laporan Kinerja MTsN 1 Padang Pariaman":

NASKAH YANG AKAN DIPERIKSA:
"""
${draftText}
"""

TUGAS AUDIT:
Lakukan audit mendalam dan berikan analisis terstruktur dengan format Markdown yang sangat jelas:

1. EVALUASI 11 CHECKLIST SEBELUM PUBLIKASI:
Berikan status [LULUS / PERLU PERBAIKAN / PERLU VERIFIKASI] untuk setiap poin:
- [ ] Judul jelas dan tidak berlebihan (maksimal 12-15 kata, memuat 5W, tidak hiperbola).
- [ ] 5W+1H terjawab lengkap dan runtut.
- [ ] Semua angka memiliki sumber valid dan periode yang jelas.
- [ ] Tidak ada klaim tanpa bukti (kata seperti "terbaik", "luar biasa", "sukses besar", "paling hebat", dll).
- [ ] Tidak ada data pribadi sensitif yang bocor (NIK, NISN, No KK, No HP pribadi, alamat detail, riwayat kesehatan/disiplin).
- [ ] Testimoni siswa/wali murid memiliki izin/persetujuan yang sah.
- [ ] Deskripsi foto/video aman dan bermartabat bagi siswa.
- [ ] Hak cipta dan izin konten tertera jelas.
- [ ] Bebas dari atribut partai, ajakan memilih, atau kepentingan politik praktis.
- [ ] Bahasa Indonesia baku, hangat, informatif, bebas diskriminasi/SARA.
- [ ] Status kesiapan persetujuan Humas / Kepala MTsN 1 Padang Pariaman.

2. TEMUAN KRITIS & KATA-KATA BERISIKO:
- Identifikasi kata klaim berlebihan yang ditemukan dalam naskah beserta saran penggantinya.
- Identifikasi angka tanpa sumber/periode.
- Identifikasi data berpotensi melanggar privasi bila ada.

3. REKOMENDASI PERBAIKAN:
Langkah perbaikan spesifik sebelum dipublikasikan.

4. USULAN NASKAH PERBAIKAN (REVISED DRAFT):
Berikan versi revisi yang sudah bersih dari klaim berlebihan, memenuhi format baku, dan siap diajukan ke Kepala Madrasah / Humas.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: auditPrompt,
      config: {
        systemInstruction: MTSN1_SYSTEM_PROMPT,
        temperature: 0.2,
      },
    });

    res.json({ auditReport: response.text || "" });
  } catch (error: any) {
    console.error("Error in /api/audit:", error);
    res.status(500).json({
      error: error?.message || "Terjadi kesalahan saat memeriksa kepatuhan draft.",
    });
  }
});

// Endpoint: Chat conversation with Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, currentContext } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Daftar pesan tidak valid." });
    }

    const ai = getGenAI();

    // Format chat history into Gemini contents
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // If context is passed, prepend to system or first message
    let systemInstruction = MTSN1_SYSTEM_PROMPT;
    if (currentContext) {
      systemInstruction += `\n\nKONTEKS ATAU DRAFT SAAT INI YANG SEDANG DIKERJAKAN PENGGUNA:\n"""\n${currentContext}\n"""\nBantu pengguna menyempurnakan, memberikan alternatif judul, menjawab pertanyaan, atau mengubah format teks tersebut sesuai aturan madrasah.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    res.json({ reply: response.text || "" });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: error?.message || "Terjadi kesalahan saat berkomunikasi dengan asisten AI.",
    });
  }
});

// Start Server with Vite Middleware
async function startServer() {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.argv[1]?.includes("dist");

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MTsN 1 Padang Pariaman] Server berjalan di http://0.0.0.0:${PORT}`);
  });
}

startServer();
