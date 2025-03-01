import  tabs from "./modules/tabs";
import  modal from "./modules/modal";
import  calculate from "./modules/calculate";
import  cards from "./modules/cards";
import  forms from "./modules/forms";
import  slider from "./modules//slider";
import  timer from "./modules/timer";
import {showWindow} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
    const timerWindow = setTimeout(() => showWindow(".modal", timerWindow), 120000);

    tabs(".tabheader__item", ".tabcontent", "tabheader__item_active");
    modal("[data-modal]", ".modal", timerWindow);
    calculate();
    cards();
    forms("form", timerWindow);
    slider({
        currentCounter: "#current",
        slide: ".offer__slide",
        next: ".offer__slider-next",
        prew: ".offer__slider-prev",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider--iner",
    });
    timer(".timer", "2024-06-22");
});
