import { useState, useEffect } from 'react';
import useLanguage from './useLanguage';
import { translateText } from '../utils/translate';

/**
 * Translates a piece of text into the currently selected language.
 * Returns { translated, translating }.
 * Falls back to the original text if translation fails.
 */
const useTranslatedText = (text: string) => {
  const { selectedLanguage } = useLanguage();
  const [translated, setTranslated] = useState(text);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (!text) {
      setTranslated('');
      return;
    }

    const isoCode = selectedLanguage.isoCode;

    // No translation needed for English or "All Languages"
    if (!isoCode || isoCode === 'en') {
      setTranslated(text);
      return;
    }

    let cancelled = false;
    setTranslating(true);

    translateText(text, isoCode).then((result) => {
      if (!cancelled) {
        setTranslated(result);
        setTranslating(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [text, selectedLanguage.isoCode]);

  return { translated, translating };
};

export default useTranslatedText;
