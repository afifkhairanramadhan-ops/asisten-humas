import React, { useState } from "react";
import {
  Copy,
  Check,
  Printer,
  Download,
  ShieldCheck,
  MessageSquare,
  BookmarkPlus,
  FileText,
  Building2,
  Calendar,
  Share2,
} from "lucide-react";
import Markdown from "react-markdown";
import { OFFICIAL_CHECKLIST } from "../data/constants";
import { useMadrasahAssets } from "../context/AssetContext";
import { Mtsn1Logo } from "./Mtsn1Logo";

interface OutputViewerProps {
  content: string;
  activityTitle?: string;
  channel?: string;
  onSaveToArchive: (content: string, title: string) => void;
  onSendToAudit: (content: string) => void;
  onSendToChat: (content: string) => void;
}

export const OutputViewer: React.FC<OutputViewerProps> = ({
  content,
  activityTitle = "Publikasi MTsN 1 Padang Pariaman",
  channel = "Website Madrasah",
  onSaveToArchive,
  onSendToAudit,
  onSendToChat,
}) => {
  const { assets } = useMadrasahAssets();
  const [activeView, setActiveView] = useState<"text" | "verification_sheet">("text");
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `naskah-mtsn1-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    onSaveToArchive(content, activityTitle);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Toolbar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-lg">
          <button
            id="tab-output-naskah"
            onClick={() => setActiveView("text")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === "text"
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            Naskah Publikasi
          </button>
          <button
            id="tab-output-verification-sheet"
            onClick={() => setActiveView("verification_sheet")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === "verification_sheet"
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Lembar Verifikasi Internal (Kop Resmi)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-copy-output"
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Naskah</span>
              </>
            )}
          </button>

          <button
            id="btn-save-draft"
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersimpan</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5 text-slate-500" />
                <span>Simpan Draft</span>
              </>
            )}
          </button>

          <button
            id="btn-download-txt"
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            title="Unduh file naskah .txt"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            id="btn-print-output"
            onClick={handlePrint}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            title="Cetak Dokumen"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="p-6">
        {activeView === "text" ? (
          <div className="space-y-6">
            {/* Metadata Summary Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-medium">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>MTsN 1 Padang Pariaman</span>
                <span className="text-emerald-300">•</span>
                <span>Kanal: {channel}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                <span>{wordCount} Kata</span>
                <span>Status: Siap Diperiksa Humas</span>
              </div>
            </div>

            {/* Rendered Content */}
            <div className="prose prose-slate max-w-none text-slate-800 font-sans text-xs sm:text-sm leading-relaxed space-y-4">
              <Markdown>{content}</Markdown>
            </div>

            {/* Action Bar for Next Steps */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                Langkah berikutnya sesuai alur internal:
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="btn-send-to-audit"
                  onClick={() => onSendToAudit(content)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Periksa di Auditor Kepatuhan
                </button>
                <button
                  id="btn-send-to-chat"
                  onClick={() => onSendToChat(content)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                  Iterasi / Tanya AI di Mode Chat
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Official Verification Sheet (Printable Kop) */
          <div className="max-w-3xl mx-auto border-2 border-slate-300 p-8 rounded-lg bg-white shadow-sm space-y-6 print:border-none print:p-0">
            {/* Kop Surat Resmi */}
            <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-4">
              <div className="w-20 h-20 shrink-0 flex items-center justify-center p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <Mtsn1Logo className="w-full h-full" imgClassName="w-full h-full object-contain" />
              </div>

              <div className="flex-1 text-center space-y-0.5">
                <p className="text-[11px] font-semibold tracking-wider text-slate-700 uppercase">
                  Kementerian Agama Republik Indonesia
                </p>
                <p className="text-[11px] font-semibold tracking-wider text-slate-700 uppercase">
                  Kantor Kementerian Agama Kabupaten Padang Pariaman
                </p>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide uppercase">
                  MADRASAH TSANAWIYAH NEGERI 1 PADANG PARIAMAN
                </h1>
                <p className="text-[11px] text-slate-600 italic">
                  Jl. Raya Pariaman - Lubuk Alung Km. 8, Pauh Kambar, Kec. Nan Sabaris, Kab. Padang Pariaman, Sumatera Barat
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Website: mtsn1padangpariaman.sch.id | Email: mtsn1padangpariaman@kemenag.go.id
                </p>
              </div>
            </div>

            {/* Document Title */}
            <div className="text-center space-y-1 py-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide underline underline-offset-4">
                LEMBAR KELAYAKAN & PERSETUJUAN PUBLIKASI
              </h2>
              <p className="text-[11px] text-slate-600">
                Nomor Register Humas: PUB/{new Date().getFullYear()}/MTsN1-PDP/{Math.floor(1000 + Math.random() * 9000)}
              </p>
            </div>

            {/* Publication Details */}
            <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-slate-600">Judul / Kegiatan:</span>
                <span className="col-span-2 font-medium text-slate-900">{activityTitle}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-slate-600">Kanal Publikasi:</span>
                <span className="col-span-2 text-slate-800">{channel}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-slate-600">Tanggal Pemeriksaan:</span>
                <span className="col-span-2 text-slate-800">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-slate-600">Jumlah Kata:</span>
                <span className="col-span-2 text-slate-800 font-mono">{wordCount} kata</span>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase">
                Hasil Pemeriksaan 11 Parameter Kepatuhan:
              </h3>
              <table className="w-full text-[11px] border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border border-slate-300 p-1.5 text-center w-10">No</th>
                    <th className="border border-slate-300 p-1.5 text-left">Indikator Kepatuhan Panduan MTsN 1</th>
                    <th className="border border-slate-300 p-1.5 text-center w-28">Status Verifikasi</th>
                  </tr>
                </thead>
                <tbody>
                  {OFFICIAL_CHECKLIST.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-1.5 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5">
                        <span className="font-semibold">{item.title}</span> — {item.desc}
                      </td>
                      <td className="border border-slate-300 p-1.5 text-center font-semibold text-emerald-700">
                        [✓] Terpenuhi
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signature Block (Alur Internal) */}
            <div className="pt-6 text-xs text-slate-800 space-y-4">
              <p className="text-[11px] text-slate-600 italic">
                Sesuai Alur Internal: Penyusunan → Verifikasi Unit Pemilik Data → Pemeriksaan Substansi Humas → Persetujuan Kepala Madrasah.
              </p>

              <div className="grid grid-cols-3 gap-4 text-center pt-2">
                <div className="space-y-12">
                  <p className="font-semibold text-slate-700">Unit Pemilik Data</p>
                  <div className="h-14 flex items-center justify-center text-slate-300 italic text-[10px]">
                    (Paraf Verifikasi)
                  </div>
                  <div>
                    <p className="font-bold underline text-slate-900">( Penanggung Jawab Kegiatan )</p>
                    <p className="text-[10px] text-slate-500">NIP. ........................................</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-slate-700">Pemeriksa Substansi Humas</p>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 rounded overflow-hidden border border-slate-300 shadow-2xs bg-slate-50 flex items-center justify-center p-0.5">
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
                  </div>
                  <div>
                    <p className="font-bold underline text-slate-900">Mhd. Ishra Alriady, S.AP.</p>
                    <p className="text-[10px] text-slate-600 font-medium">Wakil Kepala Bidang Humas</p>
                    <p className="text-[10px] text-slate-500">MTsN 1 Padang Pariaman</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-slate-700">Mengetahui & Menyetujui,</p>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 rounded overflow-hidden border border-slate-300 shadow-2xs bg-slate-50 flex items-center justify-center p-0.5">
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
                  </div>
                  <div>
                    <p className="font-bold underline text-slate-900">Jusma Yanti, S.Pd., M.Pd.</p>
                    <p className="text-[10px] text-slate-600 font-medium">Kepala Madrasah</p>
                    <p className="text-[10px] text-slate-500">MTsN 1 Padang Pariaman</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
