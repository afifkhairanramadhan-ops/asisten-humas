import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { FormGenerator } from "./components/FormGenerator";
import { AuditInspector } from "./components/AuditInspector";
import { OutputViewer } from "./components/OutputViewer";
import { ChatAssistant } from "./components/ChatAssistant";
import { GuidelinesModal } from "./components/GuidelinesModal";
import { DraftArchive } from "./components/DraftArchive";
import { LeadershipBanner } from "./components/LeadershipBanner";
import { AssetProvider } from "./context/AssetContext";
import { AssetUploadModal } from "./components/AssetUploadModal";
import {
  PublicationFormData,
  SavedPublication,
  PublicationStatus,
} from "./types";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Award,
} from "lucide-react";

function AppContent() {
  const [activeTab, setActiveTab] = useState<
    "generator" | "audit" | "chat" | "guidelines" | "archive"
  >("generator");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [currentActivityTitle, setCurrentActivityTitle] = useState<string>("");
  const [currentChannel, setCurrentChannel] = useState<string>("Website Madrasah");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cross-tab transfer states
  const [auditTargetText, setAuditTargetText] = useState<string>("");
  const [chatContextText, setChatContextText] = useState<string>("");

  // Local storage for publications
  const [savedPublications, setSavedPublications] = useState<SavedPublication[]>(
    () => {
      try {
        const local = localStorage.getItem("mtsn1_saved_publications");
        return local ? JSON.parse(local) : [];
      } catch (e) {
        return [];
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        "mtsn1_saved_publications",
        JSON.stringify(savedPublications)
      );
    } catch (e) {
      console.error("Gagal menyimpan publikasi ke localStorage", e);
    }
  }, [savedPublications]);

  // Handle generating content
  const handleGenerate = async (
    data: PublicationFormData,
    presetAction?: string
  ) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentActivityTitle(data.activityName || "Publikasi MTsN 1 Padang Pariaman");
    setCurrentChannel(data.channel || "Website Madrasah");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          presetAction,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || "Gagal menghasilkan naskah publikasi");
      }

      setGeneratedContent(json.text || "");
      setChatContextText(json.text || "");
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Terjadi kendala saat menghubungi server AI."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Save to local archive
  const handleSaveToArchive = (content: string, title: string) => {
    const newPub: SavedPublication = {
      id: Date.now().toString(),
      title: title || "Publikasi MTsN 1",
      contentType: "berita",
      channel: currentChannel,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "draft",
      content,
    };
    setSavedPublications((prev) => [newPub, ...prev]);
  };

  const handleUpdatePublicationStatus = (
    id: string,
    status: PublicationStatus
  ) => {
    setSavedPublications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const handleDeletePublication = (id: string) => {
    setSavedPublications((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSelectFromArchive = (pub: SavedPublication) => {
    setGeneratedContent(pub.content);
    setCurrentActivityTitle(pub.title);
    setCurrentChannel(pub.channel);
    setChatContextText(pub.content);
    setActiveTab("generator");
  };

  const handleSendToAudit = (text: string) => {
    setAuditTargetText(text);
    setActiveTab("audit");
  };

  const handleSendToChat = (text: string) => {
    setChatContextText(text);
    setActiveTab("chat");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedPublications.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Kendala Pemrosesan: </span>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-600 hover:text-rose-800 font-bold px-1.5"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab 1: Form Generator */}
        {activeTab === "generator" && (
          <div className="space-y-6">
            {/* Leadership Profile Card */}
            <LeadershipBanner />

            {/* Quick Informational Pill */}
            <div className="bg-emerald-900/90 text-white p-4 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 border border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-emerald-100">
                    SOP Penulisan Berita & Laporan Kinerja MTsN 1 Padang Pariaman
                  </h3>
                  <p className="text-[11px] text-emerald-300">
                    6 Prinsip Mutlak: Akurat • Evidence-Based • Manfaat Publik • Netral • Bebas Bocoran Data Pribadi • Jelas & Ringkas.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("guidelines")}
                className="text-xs text-emerald-200 hover:text-white underline whitespace-nowrap self-start md:self-auto"
              >
                Pelajari Pedoman Lengkap →
              </button>
            </div>

            {/* Form Input Component */}
            <FormGenerator onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Output Viewer Section */}
            {generatedContent && (
              <div id="output-viewer-section" className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Hasil Naskah Publikasi Siap Verifikasi:
                  </h2>
                </div>
                <OutputViewer
                  content={generatedContent}
                  activityTitle={currentActivityTitle}
                  channel={currentChannel}
                  onSaveToArchive={handleSaveToArchive}
                  onSendToAudit={handleSendToAudit}
                  onSendToChat={handleSendToChat}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Audit & Verification */}
        {activeTab === "audit" && (
          <AuditInspector
            initialText={auditTargetText || generatedContent}
            onApplyRevisedDraft={(revised) => {
              setGeneratedContent(revised);
              setActiveTab("generator");
            }}
          />
        )}

        {/* Tab 3: Chat Assistant */}
        {activeTab === "chat" && (
          <ChatAssistant currentContextText={chatContextText || generatedContent} />
        )}

        {/* Tab 4: Guidelines & Workflow */}
        {activeTab === "guidelines" && <GuidelinesModal />}

        {/* Tab 5: Draft Archive */}
        {activeTab === "archive" && (
          <DraftArchive
            publications={savedPublications}
            onSelectPublication={handleSelectFromArchive}
            onDeletePublication={handleDeletePublication}
            onUpdateStatus={handleUpdatePublicationStatus}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-slate-500 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-700">
              Madrasah Tsanawiyah Negeri 1 Padang Pariaman
            </p>
            <p className="text-[11px] text-slate-400">
              Kementerian Agama Kabupaten Padang Pariaman, Sumatera Barat
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Aman Hukum & Etika Jurnalistik</span>
            <span>•</span>
            <span>Perlindungan Data Siswa</span>
            <span>•</span>
            <span>Bebas Politik Praktis</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AssetProvider>
      <AppContent />
      <AssetUploadModal />
    </AssetProvider>
  );
}
