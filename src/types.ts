export type ContentType = 'berita' | 'laporan' | 'caption' | 'profil' | 'custom';

export type PublicationStatus = 'draft' | 'verifikasi' | 'disetujui' | 'siap_posting';

export interface PublicationFormData {
  contentType: ContentType;
  activityName: string;
  date: string;
  place: string;
  participants: string;
  objective: string;
  results: string;
  numericalData: string;
  dataSource: string;
  spokesperson: string;
  quote: string;
  impact: string;
  challenges: string;
  followUp: string;
  supportingLinks: string;
  channel: string;
  desiredLength: 'singkat' | 'standar' | 'komprehensif';
  rawDraft: string;
}

export interface ChecklistItemStatus {
  id: number;
  text: string;
  status: 'passed' | 'warning' | 'unverified';
  note?: string;
}

export interface SavedPublication {
  id: string;
  title: string;
  contentType: ContentType;
  channel: string;
  createdAt: string;
  updatedAt: string;
  status: PublicationStatus;
  content: string;
  formData?: Partial<PublicationFormData>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
