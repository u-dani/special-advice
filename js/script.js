var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { translateText } from "./functions/translateText.js";
import { requestAdvice } from "./functions/requestAdvice.js";
const crystalBallButton = document.querySelector('.js-crystal-ball-button');
const crystalBallImage = document.querySelector('.js-crystal-ball-image');
const pathCrystalBallGif = 'images/crystal-ball-gif.gif';
const adviceParagraph = document.querySelector('.js-advice-paragraph');
const modal = document.querySelector('.js-advice-modal');
const modalBackdrop = document.querySelector('.js-modal-backdrop');
const hiddenModalClass = 'c-modal--hide';
const newAdviceButton = document.querySelector('.js-new-advice-button');
const modalCloseButton = document.querySelector('.js-modal-close-button');
const showAdvice = () => __awaiter(void 0, void 0, void 0, function* () {
    const adviceInEnglish = yield requestAdvice();
    const adviceInPortuguese = yield translateText({
        text: adviceInEnglish,
        srcLang: 'en-US',
        to: 'pt-BR'
    });
    adviceParagraph
        ? adviceParagraph.textContent = adviceInPortuguese
        : alert(`Conselho: ${adviceInPortuguese}`);
});
const toggleModal = () => {
    const modalIsHidden = modal === null || modal === void 0 ? void 0 : modal.className.includes(hiddenModalClass);
    if (modalIsHidden) {
        modal === null || modal === void 0 ? void 0 : modal.classList.remove(hiddenModalClass);
        modalBackdrop.style.display = 'block';
    }
    else {
        modal === null || modal === void 0 ? void 0 : modal.classList.add(hiddenModalClass);
        modalBackdrop.style.display = 'none';
    }
    crystalBallButton === null || crystalBallButton === void 0 ? void 0 : crystalBallButton.removeAttribute('disabled');
};
crystalBallButton === null || crystalBallButton === void 0 ? void 0 : crystalBallButton.addEventListener('click', ({ target }) => __awaiter(void 0, void 0, void 0, function* () {
    if (crystalBallImage) {
        crystalBallImage.src = pathCrystalBallGif;
    }
    crystalBallButton.setAttribute('disabled', '');
    yield showAdvice();
    toggleModal();
}));
modalBackdrop === null || modalBackdrop === void 0 ? void 0 : modalBackdrop.addEventListener('click', toggleModal);
newAdviceButton === null || newAdviceButton === void 0 ? void 0 : newAdviceButton.addEventListener('click', showAdvice);
modalCloseButton === null || modalCloseButton === void 0 ? void 0 : modalCloseButton.addEventListener('click', toggleModal);
