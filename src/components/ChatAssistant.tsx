import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  User,
  Bot,
  RotateCcw,
  Copy,
  Check,
  Lightbulb,
} from "lucide-react";
import Markdown from "react-markdown";
import { ChatMessage } from "../types";

interface ChatAssistantProps {
  currentContextText?: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  currentContextText = "",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: `Assalamu'alaikum Wr. Wb. Saya adalah **Asisten Publikasi MTsN 1 Padang Pariaman**. 

Saya siap membantu Anda:
1. Menyusun & memoles berita kegiatan atau artikel madrasah.
2. Memeriksa judul, 5W+1H, data angka, privasi siswa, dan netralitas politik.
3. Mengubah data capaian menjadi caption Instagram/FB yang ringkas dan terpercaya.
4. Membuat alternatif judul maksimal 15 kata tanpa hiperbola.
5. Menyusun tabel kinerja dan checklist pra-publikasi.

Silakan ajukan pertanyaan atau tempelkan data kegiatan yang ingin Anda susun!`,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    "Buatkan 5 alternatif judul berita maksimal 15 kata tanpa klaim berlebihan",
    "Ubah teks ini menjadi caption Instagram yang informatif dengan hashtag resmi",
    "Bagaimana panduan etika menampilkan foto siswa di medsos madrasah?",
    "Tandai semua angka yang belum mencantumkan sumber dan periode",
  ];

  const handleSend = async (textToSend?: string) => {
    const messageContent = textToSend || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          currentContext: currentContextText,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else if (data.error) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Maaf, terjadi kendala: ${data.error}`,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Gagal menghubungi server: ${err?.message || "Kesalahan jaringan"}`,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Percakapan telah direset. Silakan ajukan pertanyaan atau kirimkan naskah baru yang ingin diproses.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[700px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">
              Dialog Humas MTsN 1 Padang Pariaman
            </h3>
            <p className="text-[11px] text-slate-500">
              Asisten AI interaktif bersertifikasi prinsip jurnalistik & etika madrasah
            </p>
          </div>
        </div>

        <button
          id="btn-reset-chat"
          type="button"
          onClick={handleResetChat}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
          title="Mulai percakapan baru"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sesi</span>
        </button>
      </div>

      {/* Context Badge if there's active draft */}
      {currentContextText && (
        <div className="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 text-[11px] text-emerald-800 flex items-center justify-between">
          <span className="truncate">
            <span className="font-semibold">Konteks Draft Terhubung:</span> "{currentContextText.slice(0, 70)}..."
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium ml-2 shrink-0">
            Aktif
          </span>
        </div>
      )}

      {/* Message List */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 shadow-2xs ${
                  isUser
                    ? "bg-emerald-700 text-white rounded-tr-xs"
                    : "bg-slate-100/90 text-slate-800 rounded-tl-xs border border-slate-200/70"
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-70 pb-1 border-b border-black/5">
                  <span>{isUser ? "Anda (Humas)" : "Asisten Publikasi MTsN 1"}</span>
                  <span>{m.timestamp}</span>
                </div>

                <div className={isUser ? "text-white" : "prose prose-sm max-w-none text-slate-800 text-xs"}>
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <Markdown>{m.content}</Markdown>
                  )}
                </div>

                {!isUser && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-slate-800 px-1.5 py-0.5 rounded"
                      title="Salin jawaban"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-[11px]">Asisten sedang merumuskan jawaban...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-1.5 text-[11px] whitespace-nowrap">
          <span className="text-slate-500 flex items-center gap-1 font-medium pl-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            Saran:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-emerald-300 rounded-full text-slate-700 hover:text-emerald-800 text-[11px] transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="chat-user-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan rekomendasi judul, perbaikan kalimat, atau aturan publikasi madrasah..."
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            id="btn-chat-send"
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50 transition-colors shadow-xs"
            title="Kirim pesan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
