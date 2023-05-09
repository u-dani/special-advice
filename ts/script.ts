import { translateText } from "./functions/translateText.js";
import { requestAdvice } from "./functions/requestAdvice.js";

const crystalBallButton = document.querySelector<HTMLButtonElement>('.js-crystal-ball-button');
const crystalBallImage = document.querySelector<HTMLImageElement>('.js-crystal-ball-image');
const pathCrystalBallGif = 'images/crystal-ball-gif.gif';

const adviceParagraph = document.querySelector<HTMLParagraphElement>('.js-advice-paragraph');
const modal = document.querySelector('.js-advice-modal');
const modalBackdrop = document.querySelector<HTMLDivElement>('.js-modal-backdrop');
const hiddenModalClass = 'c-modal--hide';

const newAdviceButton = document.querySelector('.js-new-advice-button');
const modalCloseButton = document.querySelector('.js-modal-close-button');


const showAdvice = async () => {
    const adviceInEnglish = await requestAdvice();

    const adviceInPortuguese = await translateText({
        text: adviceInEnglish,
        srcLang: 'en-US',
        to: 'pt-BR'
    });

    adviceParagraph
        ? adviceParagraph.textContent = adviceInPortuguese
        : alert(`Conselho: ${adviceInPortuguese}`);
}

const toggleModal = () => {
    const modalIsHidden = modal?.className.includes(hiddenModalClass);

    if ( modalIsHidden ) {
        modal?.classList.remove(hiddenModalClass);
        modalBackdrop!.style.display = 'block';
    }

    else {
        modal?.classList.add(hiddenModalClass);
        modalBackdrop!.style.display = 'none';
    }

    crystalBallButton?.removeAttribute('disabled');
}

crystalBallButton?.addEventListener('click', async ({ target }) => {
    if (crystalBallImage) {
        crystalBallImage.src = pathCrystalBallGif;
    }

    crystalBallButton.setAttribute('disabled', '');
    await showAdvice();
    toggleModal();
});

modalBackdrop?.addEventListener('click', toggleModal);
newAdviceButton?.addEventListener('click', showAdvice)
modalCloseButton?.addEventListener('click', toggleModal)