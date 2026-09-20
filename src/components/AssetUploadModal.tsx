import React, { useState, useRef } from "react";
import { X, Upload, CheckCircle2, RotateCcw, AlertCircle, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { useMadrasahAssets, MadrasahAssets } from "../context/AssetContext";

export const AssetUploadModal: React.FC = () => {
  const { assets, isCustom, updateAsset, resetAsset, isUploadModalOpen, setIsUploadModalOpen } = useMadrasahAssets();
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRefs = {
    logo: useRef<HTMLInputElement | null>(null),
    kepala: useRef<HTMLInputElement | null>(null),
    humas: useRef<HTMLInputElement | null>(null),
  };

  if (!isUploadModalOpen) return null;

  const handleFileChange = async (key: keyof MadrasahAssets, file: File) => {
    if (!file) return;
    setLoadingKey(key);
    try {
      await updateAsset(key, file);
      setSuccessMsg(`File asli untuk ${key === 'logo' ? 'Logo' : key === 'kepala' ? 'Kepala Madrasah' : 'Waka Humas'} berhasil diterapkan 100% identik!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      alert("Gagal memproses file gambar. Pastikan format berupa gambar (PNG/JPG/WEBP).");
    } finally {
      setLoadingKey(null);
    }
  };

  const items: {
    key: keyof MadrasahAssets;
    title: string;
    targetName: string;
    subtitle: string;
    aspectHint: string;
  }[] = [
    {
      key: "logo",
      title: "Logo Resmi MTsN 1 Padang Pariaman",
      targetName: "Gemini_Generated_Image_j5e30ej5e30ej5e3.png",
      subtitle: "Lambang resmi bintang lima hijau dengan Al-Qur'an dan pita emas.",
      aspectHint: "Bentuk: Lingkaran / Lambang Asli (1:1)",
    },
    {
      key: "kepala",
      title: "Foto Kepala Madrasah (Jusma Yanti, S.Pd., M.Pd.)",
      targetName: "WhatsApp_Image_2026-03-08_at_16.56.19-removebg-preview.png",
      subtitle: "Foto resmi Kepala Madrasah berhijab zaitun dengan bros perak.",
      aspectHint: "Bentuk: Pasfoto / Potret Asli (3:4)",
    },
    {
      key: "humas",
      title: "Foto Waka Humas (Mhd. Ishra Alriady, S.AP.)",
      targetName: "WhatsApp Image 2025-10-29 at 10.37.29.jpeg",
      subtitle: "Foto resmi Waka Humas berpeci hitam, jas rapi, dan pin KORPRI.",
      aspectHint: "Bentuk: Pasfoto / Potret Asli (3:4)",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Manajer File Gambar Asli (Kemiripan 100%)
              </h2>
              <p className="text-xs text-emerald-200/80">
                Penerapan foto asli dan logo tanpa rekayasa AI, tanpa peregangan, dan tanpa distorsi wajah.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Notification / Advice Card */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold">
                Jaminan Kemiripan 100% File Asli:
              </p>
              <p className="leading-relaxed text-amber-800">
                Gambar di bawah ditampilkan dengan proporsi asli (rasio alami <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">object-contain</code>) tanpa pemotongan wajah atau distorsi bentuk. Bila Anda ingin menyematkan file asli dari perangkat Anda, klik tombol <strong>"Pilih File Asli"</strong> pada slot masing-masing.
              </p>
            </div>
          </div>

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              {successMsg}
            </div>
          )}

          {/* Grid of 3 Asset Slots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((item) => {
              const currentSrc = assets[item.key];
              const isItemCustom = isCustom[item.key];
              const isDrag = dragOverKey === item.key;
              const isLoading = loadingKey === item.key;

              return (
                <div
                  key={item.key}
                  className={`rounded-xl border transition-all p-4 flex flex-col justify-between ${
                    isItemCustom
                      ? "border-emerald-300 bg-emerald-50/30"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Title & Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.key === "logo" ? "Emblem Logo" : item.key === "kepala" ? "Pimpinan" : "Humas"}
                        </span>
                        {isItemCustom ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> 100% File Asli
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            Aktif
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{item.subtitle}</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                        File target: {item.targetName}
                      </p>
                    </div>

                    {/* Image Display Area with 100% preservation (no distortion) */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverKey(item.key);
                      }}
                      onDragLeave={() => setDragOverKey(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverKey(null);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleFileChange(item.key, e.dataTransfer.files[0]);
                        }
                      }}
                      className={`relative w-full h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 transition-all overflow-hidden ${
                        isDrag
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-300 bg-slate-50/80 hover:bg-slate-50"
                      }`}
                    >
                      {isLoading ? (
                        <div className="text-center text-xs text-slate-500 space-y-2">
                          <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                          <p>Menerapkan file...</p>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-1">
                          <img
                            src={currentSrc}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain drop-shadow-xs"
                          />
                        </div>
                      )}

                      <div className="absolute bottom-1.5 inset-x-2 bg-slate-900/70 backdrop-blur-2xs text-[10px] text-white text-center py-0.5 rounded px-1 font-medium">
                        {item.aspectHint}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 space-y-2 mt-2 border-t border-slate-100">
                    <input
                      type="file"
                      ref={fileInputRefs[item.key]}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(item.key, e.target.files[0]);
                        }
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRefs[item.key].current?.click()}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Pilih File Asli (100%)
                    </button>

                    {isItemCustom && (
                      <button
                        type="button"
                        onClick={() => resetAsset(item.key)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-[11px] font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Kembalikan ke Awal
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
            File gambar langsung diterapkan ke Header, Bilah Pimpinan, Kop Surat, dan Lembar Verifikasi Cetak.
          </p>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(false)}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
