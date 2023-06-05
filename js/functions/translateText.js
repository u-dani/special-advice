var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const translateText = ({ text, srcLang, to }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${srcLang}|${to}`);
    const data = yield response.json();
    const translatedText = data.responseData.translatedText;
    if (response.ok === false) {
        return null;
    }
    return translatedText;
});
