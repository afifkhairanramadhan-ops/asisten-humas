import React, { useRef } from "react";
import { Award, Camera, CheckCircle2 } from "lucide-react";
import { useMadrasahAssets } from "../context/AssetContext";
import { Mtsn1Logo } from "./Mtsn1Logo";

export const LeadershipBanner: React.FC = () => {
  const { assets, isCustom, updateAsset, setIsUploadModalOpen } = useMadrasahAssets();
  const kepalaInputRef = useRef<HTMLInputElement | null>(null);
  const humasInputRef = useRef<HTMLInputElement | null>(null);

  const handleQuickFile = async (key: "kepala" | "humas", e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await updateAsset(key, e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setIsUploadModalOpen(true)}
            title="Klik untuk membuka pengelola gambar asli 100%"
            className="w-10 h-10 rounded-lg p-0.5 bg-emerald-50 border border-emerald-200 shrink-0 flex items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors"
          >
            <Mtsn1Logo className="w-full h-full" imgClassName="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              Pimpinan & Tim Publikasi MTsN 1 Padang Pariaman
            </h2>
            <p className="text-[11px] text-slate-500">
              Penanggung jawab kebijakan informasi, integritas data publik, dan persetujuan naskah
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            Kelola Foto Asli 100%
          </button>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Rantai Otorisasi Resmi
          </span>
        </div>
      </div>

      {/* Hidden inputs for quick replacement */}
      <input
        type="file"
        ref={kepalaInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleQuickFile("kepala", e)}
      />
      <input
        type="file"
        ref={humasInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleQuickFile("humas", e)}
      />

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Kepala Madrasah Card */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/70 to-slate-50 border border-emerald-100 hover:border-emerald-200 transition-colors">
          <div
            onClick={() => kepalaInputRef.current?.click()}
            title="Klik untuk memilih foto asli Kepala Madrasah (100% kemiripan asli)"
            className="group relative w-18 h-24 sm:w-20 sm:h-26 rounded-lg overflow-hidden border-2 border-emerald-600 shadow-2xs shrink-0 bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <img
              src={assets.kepala}
              alt="Jusma Yanti, S.Pd., M.Pd. - Kepala MTsN 1 Padang Pariaman"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/WhatsApp_Image_2026-03-08_at_16.56.19-removebg-preview.png";
              }}
            />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[9px] font-semibold transition-opacity p-1 text-center">
              <Camera className="w-4 h-4 mb-0.5" />
              Ganti Foto Asli
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-emerald-800/90 text-[9px] text-white text-center py-0.5 font-bold">
              KEPALA
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                Persetujuan Akhir
              </span>
              {isCustom.kepala && (
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> 100% Asli
                </span>
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Jusma Yanti, S.Pd., M.Pd.
            </h3>
            <p className="text-[11px] font-medium text-emerald-800">
              Kepala MTsN 1 Padang Pariaman
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Otorisator resmi publikasi, penjamin netralitas madrasah, dan legalitas rilis informasi publik.
            </p>
          </div>
        </div>

        {/* Waka Humas Card */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50/40 border border-slate-200 hover:border-emerald-200 transition-colors">
          <div
            onClick={() => humasInputRef.current?.click()}
            title="Klik untuk memilih foto asli Waka Humas (100% kemiripan asli)"
            className="group relative w-18 h-24 sm:w-20 sm:h-26 rounded-lg overflow-hidden border-2 border-slate-700 shadow-2xs shrink-0 bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <img
              src={assets.humas}
              alt="Mhd. Ishra Alriady, S.AP. - Waka Humas MTsN 1 Padang Pariaman"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/WhatsApp Image 2025-10-29 at 10.37.29.jpeg";
              }}
            />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[9px] font-semibold transition-opacity p-1 text-center">
              <Camera className="w-4 h-4 mb-0.5" />
              Ganti Foto Asli
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-slate-800/90 text-[9px] text-white text-center py-0.5 font-bold">
              HUMAS
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded">
                Pemeriksa Substansi
              </span>
              {isCustom.humas && (
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> 100% Asli
                </span>
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Mhd. Ishra Alriady, S.AP.
            </h3>
            <p className="text-[11px] font-medium text-slate-800">
              Wakil Kepala Madrasah Bidang Humas
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Pengawas akurasi data kegiatan, kepatuhan etika jurnalistik, etika foto siswa, dan saluran media madrasah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
