//
// FUNCTIONS

const translateText = async (text, sourceLang, translationLang) => {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${translationLang}`
  );

  const data = await response.json();
  const translatedText = data.responseData.translatedText;
  return translatedText;
};

const requestAdvice = async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  const advice = data.slip.advice;
  return advice;
};

const textAnimation = (text, element, time = 1000, delay = 0) => {
  let index = 0;
  const textArray = text.split("");
  element.textContent = "";

  setTimeout(() => {
    const interval = setInterval(() => {
      element.textContent += textArray[index];
      index < textArray.length - 1 ? index++ : clearInterval(interval);
    }, time);
  }, delay);
};

const giveAdvice = async () => {
  crystalBall.src = crystalBallGifPath;
  const advice = await requestAdvice();
  const translatedAdvice = await translateText(advice, "en", "pt-BR");

  textAnimation("A Bola de Cristal diz...", adviceTitle, 100);
  textAnimation(translatedAdvice, adviceText, 50, 2000);
};

const crystalBallImagePath = "images/crystal-ball-image.jpeg";
const crystalBallGifPath = "images/crystal-ball-gif.gif";
const crystalBall = document.querySelector(".js-crystal-ball-image");

const adviceContainer = document.querySelector(".js-advice-container");
const adviceTitle = adviceContainer.querySelector(".js-title");
const adviceText = adviceContainer.querySelector(".js-advice");

crystalBall.addEventListener("click", giveAdvice);
