import React, { useState } from "react";
import {
  Sparkles,
  RotateCcw,
  BookCheck,
  Send,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import {
  PublicationFormData,
  ContentType,
} from "../types";
import {
  PRESET_PROMPTS,
  SAMPLE_ACTIVITY_DATA,
} from "../data/constants";

interface FormGeneratorProps {
  onGenerate: (data: PublicationFormData, customPreset?: string) => Promise<void>;
  isLoading: boolean;
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({
  onGenerate,
  isLoading,
}) => {
  const initialData: PublicationFormData = {
    contentType: "berita",
    activityName: "",
    date: "",
    place: "",
    participants: "",
    objective: "",
    results: "",
    numericalData: "",
    dataSource: "",
    spokesperson: "",
    quote: "",
    impact: "",
    challenges: "",
    followUp: "",
    supportingLinks: "",
    channel: "Website Resmi & Media Sosial MTsN 1 Padang Pariaman",
    desiredLength: "standar",
    rawDraft: "",
  };

  const [formData, setFormData] = useState<PublicationFormData>(initialData);
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [showAdvancedFields, setShowAdvancedFields] = useState<boolean>(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadSample = () => {
    setFormData(SAMPLE_ACTIVITY_DATA);
    setSelectedPreset("");
  };

  const handleReset = () => {
    setFormData(initialData);
    setSelectedPreset("");
  };

  const applyPreset = (promptText: string, suggestedType: ContentType) => {
    setSelectedPreset(promptText);
    if (suggestedType !== "custom") {
      setFormData((prev) => ({ ...prev, contentType: suggestedType }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData, selectedPreset);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header bar of the form */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-emerald-700" />
            Penyusunan Publikasi & Laporan Kinerja
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formulir berstandar 6 prinsip madrasah: data terverifikasi, bebas klaim berlebihan, dan melindungi privasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-load-sample"
            type="button"
            onClick={loadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Muat Data Contoh Kegiatan
          </button>
          <button
            id="btn-reset-form"
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Bersihkan formulir"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
        {/* Quick Actions / Preset Prompts */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Pilih Perintah Cepat (Preset Panduan Penulisan MTsN 1):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_PROMPTS.map((preset, index) => {
              const isSelected = selectedPreset === preset.prompt;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => applyPreset(preset.prompt, preset.contentType)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all text-left ${
                    isSelected
                      ? "bg-emerald-700 text-white border-emerald-700 font-medium shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
          {selectedPreset && (
            <div className="mt-2 text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-200 flex items-start justify-between gap-2">
              <div>
                <span className="font-semibold">Instruksi Aktif: </span>"{selectedPreset}"
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreset("")}
                className="text-emerald-600 hover:text-emerald-900 text-xs font-bold px-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Core Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Jenis Konten <span className="text-rose-500">*</span>
            </label>
            <select
              id="field-contentType"
              name="contentType"
              value={formData.contentType}
              onChange={handleInputChange}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="berita">Berita Kegiatan Resmi</option>
              <option value="laporan">Laporan Capaian Kinerja</option>
              <option value="caption">Caption Media Sosial (IG/FB)</option>
              <option value="profil">Profil & Kisah Inspiratif</option>
              <option value="custom">Format Kustom / Lainnya</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Kanal Publikasi Dituju
            </label>
            <input
              id="field-channel"
              type="text"
              name="channel"
              value={formData.channel}
              onChange={handleInputChange}
              placeholder="e.g. Website Madrasah, Instagram, Facebook, WhatsApp Humas"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Panjang Naskah yang Diinginkan
            </label>
            <select
              id="field-desiredLength"
              name="desiredLength"
              value={formData.desiredLength}
              onChange={handleInputChange}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="singkat">Singkat & Padat (150–250 kata)</option>
              <option value="standar">Standar Jurnalistik (300–450 kata)</option>
              <option value="komprehensif">Komprehensif & Mendalam (500+ kata)</option>
            </select>
          </div>
        </div>

        {/* Activity Name, Date, Place */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nama Kegiatan / Program <span className="text-rose-500">*</span>
            </label>
            <input
              id="field-activityName"
              type="text"
              name="activityName"
              value={formData.activityName}
              onChange={handleInputChange}
              placeholder="Contoh: Bimbingan Teknis Literasi Digital dan Riset Madrasah"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Tanggal & Waktu
            </label>
            <input
              id="field-date"
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="Contoh: Senin, 15 September 2026"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Tempat / Lokasi
            </label>
            <input
              id="field-place"
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              placeholder="Contoh: Aula MTsN 1 Padang Pariaman"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Participants & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Peserta / Jumlah Terlibat
            </label>
            <input
              id="field-participants"
              type="text"
              name="participants"
              value={formData.participants}
              onChange={handleInputChange}
              placeholder="Contoh: 84 siswa kelas VIII dan 6 guru pembina IPA/IPS"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Tujuan Kegiatan
            </label>
            <input
              id="field-objective"
              type="text"
              name="objective"
              value={formData.objective}
              onChange={handleInputChange}
              placeholder="Contoh: Meningkatkan kecakapan riset ilmiah siswa madrasah jelang MYRES"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Results & Evidence (Evidence-Based Principle) */}
        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Prinsip Bukti & Data Capaian (Wajib Berkonteks)
            </div>
            <span className="text-[11px] text-emerald-700 italic">
              Hindari klaim "terbaik" atau "sukses besar" tanpa bukti angka
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Hasil / Capaian Nyata
              </label>
              <textarea
                id="field-results"
                name="results"
                rows={2}
                value={formData.results}
                onChange={handleInputChange}
                placeholder="Contoh: 84 siswa menghasilkan 21 rancangan proposal penelitian terstruktur"
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Data Angka & Periode <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="field-numericalData"
                name="numericalData"
                rows={2}
                value={formData.numericalData}
                onChange={handleInputChange}
                placeholder="Contoh: 21 proposal disusun; skor pre-test 62,5 naik ke post-test 86,0 (September 2026)"
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Sumber Data Valid <span className="text-rose-500">*</span>
              </label>
              <input
                id="field-dataSource"
                type="text"
                name="dataSource"
                value={formData.dataSource}
                onChange={handleInputChange}
                placeholder="Contoh: Tim Pembina Riset & Kurikulum MTsN 1"
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Narasumber & Jabatan
              </label>
              <input
                id="field-spokesperson"
                type="text"
                name="spokesperson"
                value={formData.spokesperson}
                onChange={handleInputChange}
                placeholder="Contoh: Drs. H. Syahrul, M.Pd. (Kepala MTsN 1)"
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Kutipan Asli Narasumber
              </label>
              <input
                id="field-quote"
                type="text"
                name="quote"
                value={formData.quote}
                onChange={handleInputChange}
                placeholder="Hanya isi jika kutipan nyata diberikan narasumber"
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Impact, Challenges, Follow-Up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Manfaat / Dampak Nyata bagi Publik
            </label>
            <textarea
              id="field-impact"
              name="impact"
              rows={2}
              value={formData.impact}
              onChange={handleInputChange}
              placeholder="Contoh: Siswa mandiri menyeleksi informasi riset dan siap observasi lapangan"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Kendala & Pembelajaran (Bila ada)
            </label>
            <textarea
              id="field-challenges"
              name="challenges"
              rows={2}
              value={formData.challenges}
              onChange={handleInputChange}
              placeholder="Contoh: Waktu pendampingan intensif satu-satu untuk 21 tim terbatas"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Rencana Tindak Lanjut
            </label>
            <textarea
              id="field-followUp"
              name="followUp"
              rows={2}
              value={formData.followUp}
              onChange={handleInputChange}
              placeholder="Contoh: Klinik bimbingan proposal tiap Sabtu pekan ke-3 & ke-4 September"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Optional raw draft or field notes */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              Draft Awal / Catatan Kasar Lapangan (Opsional)
              <span className="text-[11px] text-slate-400 font-normal">
                (Bila Anda sudah memiliki naskah kasar untuk diperbaiki AI)
              </span>
            </label>
          </div>
          <textarea
            id="field-rawDraft"
            name="rawDraft"
            rows={3}
            value={formData.rawDraft}
            onChange={handleInputChange}
            placeholder="Tempel draft awal atau catatan poin-poin kegiatan di sini jika ada. AI akan mempertahankan fakta dan memperbaiki struktur, bahasa, serta kepatuhan pada panduan madrasah."
            className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Privacy Notice Reminder */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Perlindungan Data Pribadi & Etika Siswa:</p>
            <p className="text-amber-800 text-[11px]">
              Dilarang memasukkan NIK, NISN, nomor KK, nomor HP pribadi, alamat rumah lengkap, data kesehatan, atau catatan disiplin.
              Pastikan foto siswa tidak memalukan dan telah mendapat persetujuan orang tua/wali.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            id="btn-submit-generate"
            type="submit"
            disabled={isLoading || (!formData.activityName && !formData.rawDraft)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Menyusun Publikasi Sesuai Panduan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Susun Publikasi Otomatis (Gemini AI)</span>
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
