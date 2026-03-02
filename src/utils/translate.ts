// In-memory translation cache: key = "isoCode::text"
const translationCache = new Map<string, string>();

/**
 * Translates text from English to the given ISO language code
 * using the free MyMemory Translation API.
 * Results are cached in memory to avoid repeated API calls.
 */
export const translateText = async (
  text: string,
  targetLang: string
): Promise<string> => {
  if (!text || !targetLang || targetLang === 'en' || targetLang === '') {
    return text;
  }

  const cacheKey = `${targetLang}::${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated: string = data.responseData.translatedText;
      translationCache.set(cacheKey, translated);
      return translated;
    }
  } catch {
    // fall through to return original
  }

  return text;
};
