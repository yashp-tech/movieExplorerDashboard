export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
  isoCode: string; // ISO 639-1 code for translation API
}

export const LANGUAGES: LanguageOption[] = [
  { code: '', label: 'All Languages', flag: '🌐', isoCode: '' },
  { code: 'english', label: 'English', flag: '🇬🇧', isoCode: 'en' },
  { code: 'hindi', label: 'Hindi', flag: '🇮🇳', isoCode: 'hi' },
  { code: 'spanish', label: 'Spanish', flag: '🇪🇸', isoCode: 'es' },
  { code: 'french', label: 'French', flag: '🇫🇷', isoCode: 'fr' },
  { code: 'german', label: 'German', flag: '🇩🇪', isoCode: 'de' },
  { code: 'japanese', label: 'Japanese', flag: '🇯🇵', isoCode: 'ja' },
  { code: 'korean', label: 'Korean', flag: '🇰🇷', isoCode: 'ko' },
  { code: 'italian', label: 'Italian', flag: '🇮🇹', isoCode: 'it' },
  { code: 'chinese', label: 'Chinese', flag: '🇨🇳', isoCode: 'zh' },
  { code: 'portuguese', label: 'Portuguese', flag: '🇵🇹', isoCode: 'pt' },
];
