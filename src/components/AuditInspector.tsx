import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  FileCheck2,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import Markdown from "react-markdown";
import { PROHIBITED_WORDS, OFFICIAL_CHECKLIST } from "../data/constants";

interface AuditInspectorProps {
  initialText?: string;
  onApplyRevisedDraft?: (revisedText: string) => void;
}

export const AuditInspector: React.FC<AuditInspectorProps> = ({
  initialText = "",
  onApplyRevisedDraft,
}) => {
  const [draftInput, setDraftInput] = useState<string>(initialText);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [manualCheckedItems, setManualCheckedItems] = useState<{ [key: number]: boolean }>({});

  // Real-time client-side heuristic scans
  const heuristicScan = useMemo(() => {
    const text = draftInput.toLowerCase();
    const foundProhibitedWords: string[] = [];
    PROHIBITED_WORDS.forEach((w) => {
      if (text.includes(w)) {
        foundProhibitedWords.push(w);
      }
    });

    // Privacy detection patterns
    const nikPattern = /\b\d{16}\b/g;
    const nisnPattern = /\b\d{10}\b/g;
    const phonePattern = /\b(08|628)\d{8,12}\b/g;

    const nikMatches = draftInput.match(nikPattern) || [];
    const nisnMatches = draftInput.match(nisnPattern) || [];
    const phoneMatches = draftInput.match(phonePattern) || [];

    // Headline check: check first line length
    const lines = draftInput.trim().split("\n");
    const firstLine = lines.length > 0 ? lines[0].trim() : "";
    const firstLineWords = firstLine ? firstLine.split(/\s+/).length : 0;
    const isHeadlineTooLong = firstLineWords > 15;

    return {
      foundProhibitedWords,
      nikMatches,
      nisnMatches,
      phoneMatches,
      firstLineWords,
      isHeadlineTooLong,
      wordCount: draftInput.trim() ? draftInput.trim().split(/\s+/).length : 0,
    };
  }, [draftInput]);

  const handleRunAiAudit = async () => {
    if (!draftInput.trim()) return;
    setIsAuditing(true);
    setAuditResult("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftText: draftInput }),
      });
      const data = await res.json();
      if (data.auditReport) {
        setAuditResult(data.auditReport);
      } else if (data.error) {
        setAuditResult(`**Gagal melakukan audit:** ${data.error}`);
      }
    } catch (err: any) {
      setAuditResult(`**Terjadi kesalahan jaringan:** ${err?.message || "Koneksi gagal"}`);
    } finally {
      setIsAuditing(false);
    }
  };

  const toggleManualCheck = (id: number) => {
    setManualCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              Pemeriksaan & Audit Kepatuhan Publikasi
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Uji draft berita atau laporan terhadap 11 checklist wajib, deteksi dini klaim berlebihan, serta pencegahan kebocoran data sensitif.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              11 Poin Standar Humas MTsN 1
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Draft Input & Instant Scanner */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-emerald-600" />
                Naskah / Draft yang Akan Diperiksa:
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {heuristicScan.wordCount} kata
              </span>
            </div>

            <textarea
              id="audit-draft-input"
              rows={12}
              value={draftInput}
              onChange={(e) => setDraftInput(e.target.value)}
              placeholder="Tempel draft berita, caption, atau laporan kegiatan di sini untuk diaudit..."
              className="w-full text-xs font-sans p-3.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed"
            />

            {/* Instant Scanner Badges */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
              <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Pemindaian Instan (Heuristik Sistem):</span>
                <span className="text-[10px] text-slate-400">Deteksi otomatis saat mengetik</span>
              </div>

              {/* Prohibited words flag */}
              {heuristicScan.foundProhibitedWords.length > 0 ? (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Klaim berlebihan ditemukan: </span>
                    <span className="font-bold underline">
                      {heuristicScan.foundProhibitedWords.join(", ")}
                    </span>
                    <p className="text-[11px] text-rose-700 mt-0.5">
                      Aturan wajib: Hindari kata 'terbaik', 'luar biasa', 'sukses besar' tanpa bukti piagam/sertifikat terverifikasi.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bebas dari kata klaim berlebihan yang dilarang.</span>
                </div>
              )}

              {/* Privacy flags */}
              {heuristicScan.nikMatches.length > 0 ||
              heuristicScan.nisnMatches.length > 0 ||
              heuristicScan.phoneMatches.length > 0 ? (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Peringatan Privasi Siswa/Guru: </span>
                    Ditemukan potensi data pribadi yang harus disamarkan atau dihapus:
                    <ul className="list-disc list-inside text-[11px] mt-1 space-y-0.5 font-mono">
                      {heuristicScan.nikMatches.length > 0 && (
                        <li>Pola NIK/KK 16 digit: {heuristicScan.nikMatches.join(", ")}</li>
                      )}
                      {heuristicScan.nisnMatches.length > 0 && (
                        <li>Pola NISN 10 digit: {heuristicScan.nisnMatches.join(", ")}</li>
                      )}
                      {heuristicScan.phoneMatches.length > 0 && (
                        <li>Nomor telepon: {heuristicScan.phoneMatches.join(", ")}</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Tidak terdeteksi kebocoran NIK/NISN/nomor telepon langsung.</span>
                </div>
              )}

              {/* Headline length */}
              {heuristicScan.isHeadlineTooLong && (
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    Judul baris pertama terdiri dari {heuristicScan.firstLineWords} kata (ideal maksimal 12–15 kata).
                  </span>
                </div>
              )}
            </div>

            {/* Run Button */}
            <div className="mt-5 flex items-center justify-between">
              <button
                id="btn-sample-audit-text"
                type="button"
                onClick={() =>
                  setDraftInput(
                    "MTsN 1 Padang Pariaman Sukses Besar Menyelenggarakan Acara Terbaik Se-Sumatera Barat\n\nPauh Kambar, 15 September 2026 - MTsN 1 Padang Pariaman sukses luar biasa menggelar bimtek riset untuk siswa kelas 8 dengan NISN 0098765432 dan kontak 08123456789. Kegiatan ini dinilai paling hebat oleh seluruh pihak tanpa ada kendala sama sekali."
                  )
                }
                className="text-[11px] text-emerald-700 hover:text-emerald-900 font-medium underline"
              >
                Muat Contoh Draft Berisiko
              </button>

              <button
                id="btn-run-deep-audit"
                type="button"
                onClick={handleRunAiAudit}
                disabled={isAuditing || !draftInput.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all disabled:opacity-50"
              >
                {isAuditing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Menganalisis 11 Indikator...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Jalankan Audit AI Mendalam</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Checklist Checklist Pra-Publikasi */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              Checklist Manual Persetujuan Humas (11 Poin Resmi):
            </h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {OFFICIAL_CHECKLIST.map((item) => {
                const isChecked = !!manualCheckedItems[item.id];
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleManualCheck(item.id)}
                      className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-500 w-3.5 h-3.5"
                    />
                    <div>
                      <span className="font-semibold">{item.title}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Audit Report & Revised Draft */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold text-slate-800">
                  Laporan Audit & Rekomendasi Revisi
                </h3>
              </div>
              {auditResult && (
                <button
                  id="btn-copy-audit"
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin" : "Salin Laporan"}</span>
                </button>
              )}
            </div>

            <div className="p-5 flex-1 overflow-y-auto max-h-[750px]">
              {isAuditing ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-slate-500">
                  <div className="w-8 h-8 border-3 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin"></div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-700">
                      Memeriksa akurasi, 5W+1H, privasi, dan netralitas politik...
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Berdasarkan Dokumen Panduan Penulisan MTsN 1 Padang Pariaman
                    </p>
                  </div>
                </div>
              ) : auditResult ? (
                <div className="prose prose-sm max-w-none text-slate-800 text-xs leading-relaxed space-y-4">
                  <Markdown>{auditResult}</Markdown>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                  <ShieldCheck className="w-12 h-12 text-slate-300 stroke-1" />
                  <p className="text-xs font-medium text-slate-600">
                    Belum ada audit yang dijalankan.
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-xs">
                    Ketik atau tempel naskah publikasi di sebelah kiri, lalu tekan tombol "Jalankan Audit AI Mendalam".
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
