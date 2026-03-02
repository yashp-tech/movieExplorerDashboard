import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { LanguageOption } from '../utils/languageConstants';
import { LANGUAGES } from '../utils/languageConstants';

export interface LanguageContextType {
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  selectedLanguage: LANGUAGES[0],
  setSelectedLanguage: () => {},
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[0]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
