
interface translateTextParameters {
    text: string,
    srcLang: string,
    to: string,
}

export const translateText = async ({text, srcLang, to}: translateTextParameters) => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${srcLang}|${to}`
    );
  
    const data = await response.json();
    const translatedText = data.responseData.translatedText;

    if (response.ok === false) {
      return null
    }

    return translatedText;
}