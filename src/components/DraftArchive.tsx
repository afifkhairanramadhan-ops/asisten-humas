import React, { useState } from "react";
import {
  FolderArchive,
  Trash2,
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  Send,
  Download,
  Search,
} from "lucide-react";
import { SavedPublication, PublicationStatus } from "../types";

interface DraftArchiveProps {
  publications: SavedPublication[];
  onSelectPublication: (pub: SavedPublication) => void;
  onDeletePublication: (id: string) => void;
  onUpdateStatus: (id: string, status: PublicationStatus) => void;
}

export const DraftArchive: React.FC<DraftArchiveProps> = ({
  publications,
  onSelectPublication,
  onDeletePublication,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredPubs = publications.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: PublicationStatus) => {
    switch (status) {
      case "draft":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
            <Clock className="w-3 h-3 text-slate-500" />
            Draft Konsep
          </span>
        );
      case "verifikasi":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
            <Clock className="w-3 h-3 text-amber-600" />
            Perlu Verifikasi Unit
          </span>
        );
      case "disetujui":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Disetujui Pejabat
          </span>
        );
      case "siap_posting":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-700 text-white font-medium shadow-2xs">
            <Send className="w-3 h-3" />
            Siap Posting
          </span>
        );
    }
  };

  const exportAllToJson = () => {
    const dataStr = JSON.stringify(publications, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `arsip-publikasi-mtsn1-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
      {/* Top Banner & Stats */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-emerald-700" />
            Arsip & Riwayat Draft Publikasi MTsN 1
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar naskah tersimpan secara aman di penyimpanan browser lokal untuk dokumentasi dan pelacakan status.
          </p>
        </div>

        {publications.length > 0 && (
          <button
            id="btn-export-archive"
            onClick={exportAllToJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Cadangkan Semua (JSON)
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="px-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="archive-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari judul naskah atau kata kunci..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "Semua" },
            { id: "draft", label: "Draft" },
            { id: "verifikasi", label: "Perlu Verifikasi" },
            { id: "disetujui", label: "Disetujui" },
            { id: "siap_posting", label: "Siap Posting" },
          ].map((statusTab) => (
            <button
              key={statusTab.id}
              onClick={() => setFilterStatus(statusTab.id)}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filterStatus === statusTab.id
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {statusTab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Publications List */}
      <div className="p-5 pt-0">
        {filteredPubs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl space-y-2">
            <FolderArchive className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">
              Belum ada draft publikasi yang tersimpan.
            </p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Susun naskah di tab "Susun Publikasi", lalu klik "Simpan Draft" untuk mengarsipkan hasil di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPubs.map((pub) => (
              <div
                key={pub.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                      {pub.title}
                    </h3>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {pub.contentType}
                    </span>
                    {getStatusBadge(pub.status)}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(pub.createdAt).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>

                {/* Content snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {pub.content.slice(0, 180)}...
                </p>

                {/* Actions & Status Changer */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">Ubah Status:</span>
                    <select
                      value={pub.status}
                      onChange={(e) => onUpdateStatus(pub.id, e.target.value as PublicationStatus)}
                      className="text-[11px] bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="draft">Draft Konsep</option>
                      <option value="verifikasi">Perlu Verifikasi Unit</option>
                      <option value="disetujui">Disetujui Pejabat</option>
                      <option value="siap_posting">Siap Posting</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPublication(pub)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Buka Naskah</span>
                    </button>

                    <button
                      onClick={() => onDeletePublication(pub.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Hapus draft ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
