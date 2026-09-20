import React from "react";
import {
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  Users,
  Scale,
  FileCheck,
  Workflow,
  Sparkles,
} from "lucide-react";
import { SIX_PRINCIPLES, OFFICIAL_CHECKLIST } from "../data/constants";
import { useMadrasahAssets } from "../context/AssetContext";
import { Mtsn1Logo } from "./Mtsn1Logo";

export const GuidelinesModal: React.FC = () => {
  const { assets } = useMadrasahAssets();

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl p-1 bg-white border border-emerald-200 shadow-2xs shrink-0 flex items-center justify-center overflow-hidden">
              <Mtsn1Logo className="w-full h-full" imgClassName="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Pedoman Resmi Penulisan Berita & Laporan Kinerja MTsN 1 Padang Pariaman
              </h2>
              <p className="text-xs text-slate-500">
                Rujukan standar humas, guru, dan tim publikasi madrasah untuk mewujudkan informasi publik yang kredibel, beretika, dan berdampak.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Profile Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <div className="w-14 h-18 rounded overflow-hidden border border-emerald-600 shadow-2xs shrink-0 bg-slate-100 flex items-center justify-center p-0.5">
              <img
                src={assets.kepala}
                alt="Jusma Yanti, S.Pd., M.Pd."
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/WhatsApp_Image_2026-03-08_at_16.56.19-removebg-preview.png";
                }}
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                Kepala Madrasah
              </span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">Jusma Yanti, S.Pd., M.Pd.</p>
              <p className="text-[11px] text-slate-600">
                Penanggung jawab utama & pemberi persetujuan akhir rilis publikasi madrasah.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-14 h-18 rounded overflow-hidden border border-slate-700 shadow-2xs shrink-0 bg-slate-100 flex items-center justify-center p-0.5">
              <img
                src={assets.humas}
                alt="Mhd. Ishra Alriady, S.AP."
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/WhatsApp Image 2025-10-29 at 10.37.29.jpeg";
                }}
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded uppercase">
                Waka Bidang Humas
              </span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">Mhd. Ishra Alriady, S.AP.</p>
              <p className="text-[11px] text-slate-600">
                Pemeriksa akurasi data kegiatan, kepatuhan etika jurnalistik, dan koordinasi kanal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Core Principles */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            6 Prinsip Utama Publikasi Madrasah
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SIX_PRINCIPLES.map((prinsip, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-emerald-50/40 hover:border-emerald-200 transition-colors space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-900">{prinsip.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                {prinsip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Internal Workflow */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            Alur Kerja Internal yang Direkomendasikan
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          Setiap naskah publikasi harus melalui rantai validasi berjenjang sebelum diunggah ke website madrasah atau media sosial resmi:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 1</span>
            <p className="text-xs font-bold text-slate-800">Penyusunan Naskah</p>
            <p className="text-[10px] text-slate-500">Oleh Tim Humas atau Panitia Kegiatan</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 2</span>
            <p className="text-xs font-bold text-slate-800">Verifikasi Unit Data</p>
            <p className="text-[10px] text-slate-500">Validasi angka, tanggal, & peserta</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 3</span>
            <p className="text-xs font-bold text-slate-800">Pemeriksaan Humas</p>
            <p className="text-[10px] text-slate-500 font-medium text-emerald-800">Mhd. Ishra Alriady, S.AP.</p>
            <p className="text-[9px] text-slate-400">Waka Humas MTsN 1</p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Tahap 4</span>
            <p className="text-xs font-bold text-emerald-900">Persetujuan Akhir</p>
            <p className="text-[10px] text-emerald-800 font-medium">Jusma Yanti, S.Pd., M.Pd.</p>
            <p className="text-[9px] text-emerald-600">Kepala Madrasah</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 5</span>
            <p className="text-xs font-bold text-slate-800">Publikasi & Arsip</p>
            <p className="text-[10px] text-slate-500">Tayang di portal resmi & catat nomor</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 6</span>
            <p className="text-xs font-bold text-slate-800">Koreksi Jika Perlu</p>
            <p className="text-[10px] text-slate-500">Ralat transparan bila ada kekeliruan</p>
          </div>
        </div>
      </div>

      {/* 11 Checklist Details */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            11 Parameter Checklist Sebelum Publikasi
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {OFFICIAL_CHECKLIST.map((c) => (
            <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-800">{c.id}. {c.title}</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Legal, Privacy & Neutrality Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-700">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-xs font-bold uppercase tracking-wide">
              Perlindungan Privasi Siswa & Anak di Bawah Umur
            </h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <span className="font-semibold text-slate-800">Data Terlarang:</span> NIK, NISN, nomor Kartu Keluarga, nomor telepon pribadi siswa/wali, alamat rumah lengkap, data rekam medis/kesehatan, rincian ekonomi keluarga yang memalukan, atau catatan sanksi disiplin.
            </li>
            <li>
              <span className="font-semibold text-slate-800">Testimoni Siswa:</span> Wajib memperoleh izin wali murid/orang tua. Tuliskan identitas secara proporsional (contoh: "Ahmad, siswa kelas VIII").
            </li>
            <li>
              <span className="font-semibold text-slate-800">Foto & Video Bermartabat:</span> Tidak menampilkan siswa dalam posisi rentan, cemas, atau memalukan.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-700">
            <Scale className="w-5 h-5 text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wide">
              Netralitas Politik & Hak Kekayaan Intelektual
            </h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <span className="font-semibold text-slate-800">Bebas Politik Praktis:</span> Dilarang menampilkan logo/atribut partai politik, ajakan memilih kandidat caleg/pilkada, atau orasi politisi yang tidak terkait kedinasan pendidikan.
            </li>
            <li>
              <span className="font-semibold text-slate-800">Hak Cipta Foto & Grafis:</span> Gunakan foto dokumentasi internal madrasah sendiri. Jika menggunakan karya pihak ketiga, pastikan berlisensi sah dan cantumkan kredit sumber.
            </li>
            <li>
              <span className="font-semibold text-slate-800">Fokus Kinerja Edukatif:</span> Tonjolkan perkembangan karakter, capaian akademik/ekstrakurikuler, dan layanan madrasah.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
