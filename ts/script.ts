import { translateText } from "./functions/translateText.js";
import { requestAdvice } from "./functions/requestAdvice.js";

const crystalBallButton = document.querySelector<HTMLButtonElement>('.js-crystal-ball-button');
const crystalBallImage = document.querySelector<HTMLImageElement>('.js-crystal-ball-image');
const pathCrystalBallGif = 'images/crystal-ball-gif.gif';

const adviceParagraph = document.querySelector<HTMLParagraphElement>('.js-advice-paragraph');
const modal = document.querySelector('.js-advice-modal');
const modalBackdrop = document.querySelector<HTMLDivElement>('.js-modal-backdrop');
const hiddenModalClass = 'c-modal--hide';

const checkboxTranslateAdvice = document.querySelector<HTMLInputElement>('.js-checkbox-translate')
const newAdviceButton = document.querySelector('.js-new-advice-button');
const modalCloseButton = document.querySelector('.js-modal-close-button');


const adviceRequestInterval = () => {
    newAdviceButton?.setAttribute('disabled', '')
    newAdviceButton?.classList.add('transition-animation')
    setTimeout(() => {
        newAdviceButton?.removeAttribute('disabled')
        newAdviceButton?.classList.remove('transition-animation')
    }, 2000)
}


const newAdvice = async () => {
    const adviceInEnglish = await requestAdvice();
    return adviceInEnglish
}

const showAdvice = async (advice?: string) => {

    if (!advice) {
        advice = adviceParagraph?.textContent || 'Acabou os conselhos...'
    }

    const adviceInPortuguese = await translateText({
        text: advice,
        srcLang: 'en-US',
        to: 'pt-BR'
    });

    
    checkboxTranslateAdvice?.checked && adviceInPortuguese
        ? adviceParagraph!.textContent = adviceInPortuguese
        : adviceParagraph!.textContent = advice

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
    const advice = await newAdvice()
    showAdvice(advice)
    toggleModal();
    adviceRequestInterval();
});


checkboxTranslateAdvice?.addEventListener('click', async(e) => { 
    e.stopPropagation()
    showAdvice()
});

modalBackdrop?.addEventListener('click', toggleModal);
modalCloseButton?.addEventListener('click', toggleModal)

newAdviceButton?.addEventListener('click', async() => {
    const advice = await newAdvice()
    showAdvice(advice)
    adviceRequestInterval()
})