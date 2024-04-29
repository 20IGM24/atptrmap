import $ from "jquery";

// Styles
import "../css/lang.css";

const LANGS = ["en", "es", "uk"];

function detectLanguage() {
  if (!localStorage.hasOwnProperty("lang")) {
    const browserLang = (navigator.language || navigator.userLanguage).split(
      "-"
    )[0];
    const lang = LANGS.includes(browserLang) ? browserLang : "en";
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }
}

function loadLangButton() {
  const langBtns = document.getElementById("lang-btns");
  const other_langs = getTheOthersOptions();
  other_langs.forEach((lang) => {
    const btn = document.createElement("button");
    btn.classList.add(
      "dropdown-item",
      "rounded",
      "text-light",
      "change-language-btn"
    );
    btn.href = "#";
    btn.value = lang;
    btn.innerHTML = lang.toUpperCase();
    langBtns.appendChild(btn);
  });
}

function getTheOthersOptions() {
  const lang = localStorage.getItem("lang");
  return LANGS.filter((l) => l !== lang);
}
$(function () {
  detectLanguage();
  loadLangButton();
  $(".change-language-btn").on("click", function (e) {
    e.preventDefault();
    const lang = $(this).val();
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
    window.location.reload();
  });
});
