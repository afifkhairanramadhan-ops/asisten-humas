import React from "react";
import {
  FileText,
  ShieldCheck,
  MessageSquareText,
  BookOpen,
  FolderArchive,
  Sparkles,
  Camera,
} from "lucide-react";
import { useMadrasahAssets } from "../context/AssetContext";
import { Mtsn1Logo } from "./Mtsn1Logo";

interface HeaderProps {
  activeTab: "generator" | "audit" | "chat" | "guidelines" | "archive";
  setActiveTab: (tab: "generator" | "audit" | "chat" | "guidelines" | "archive") => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
}) => {
  const { setIsUploadModalOpen, isCustom } = useMadrasahAssets();
  const hasCustomAssets = isCustom.logo || isCustom.kepala || isCustom.humas;
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner with Kemenag Green Tone */}
      <div className="bg-emerald-900 text-white px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide">
              KEMENTERIAN AGAMA REPUBLIK INDONESIA
            </span>
            <span className="text-emerald-300 hidden sm:inline">•</span>
            <span className="text-emerald-200 hidden sm:inline">
              Kantor Kementerian Agama Kabupaten Padang Pariaman
            </span>
          </div>
          <div className="flex items-center gap-3 text-emerald-200 text-[11px]">
            <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-100 border border-emerald-700">
              Sistem Humas & Tata Kelola Informasi
            </span>
            <span className="hidden md:inline italic">
              "Madrasah Maju, Bermutu, Mendunia"
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Title & Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              onClick={() => setIsUploadModalOpen(true)}
              title="Klik untuk membuka pengelola logo & foto asli 100%"
              className="w-12 h-12 rounded-xl bg-white p-1 border border-emerald-200 shadow-2xs shrink-0 flex items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-400 transition-colors group"
            >
              <Mtsn1Logo className="w-full h-full" imgClassName="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Asisten Publikasi MTsN 1 Padang Pariaman
                </h1>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  AI Berbasis Pedoman
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Penyusunan Berita, Laporan Kinerja, Audit Privasi, & Kepatuhan Etika Jurnalistik Madrasah
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                id="nav-tab-generator"
                onClick={() => setActiveTab("generator")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "generator"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FileText className="w-4 h-4" />
                Susun Publikasi
              </button>

              <button
                id="nav-tab-audit"
                onClick={() => setActiveTab("audit")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "audit"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Audit Kepatuhan
              </button>

              <button
                id="nav-tab-chat"
                onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "chat"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <MessageSquareText className="w-4 h-4" />
                Asisten Dialog
              </button>

              <button
                id="nav-tab-guidelines"
                onClick={() => setActiveTab("guidelines")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "guidelines"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Pedoman & Alur
              </button>

              <button
                id="nav-tab-archive"
                onClick={() => setActiveTab("archive")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all relative ${
                  activeTab === "archive"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FolderArchive className="w-4 h-4" />
                Arsip Draft
                {savedCount > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
                    {savedCount}
                  </span>
                )}
              </button>
            </nav>

            <button
              id="btn-header-open-asset-modal"
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
              title="Kelola foto dan logo asli tanpa perubahan bentuk (100% sesuai file upload)"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-700" />
              <span>Foto & Logo Asli (100%)</span>
              {hasCustomAssets && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
