/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modal = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
function calculate() {
  const parentGender = document.querySelector("#gender");
  const choiseGender = parentGender.querySelectorAll(".calculating__choose-item");
  const parentPhysicalActivity = document.querySelector(".calculating__choose_big");
  const choisePhysicalActivity = parentPhysicalActivity.querySelectorAll(".calculating__choose-item");
  const parentConstitutionBody = document.querySelector(".calculating__choose_medium");
  const calculatingResult = document.querySelector(".calculating__result span");
  let gender = 'Женщина';
  let physicalActivity = 1.55;
  let height = 0;
  let age = 0;
  let weight = 0;
  let totalCalc = 0;
  if (localStorage.getItem("gender")) {
    gender = localStorage.getItem("gender");
    staticDate(choiseGender, localStorage.getItem("gender"));
  }
  if (localStorage.getItem("physicalActivity")) {
    physicalActivity = localStorage.getItem("physicalActivity");
    staticDate(choisePhysicalActivity, localStorage.getItem("physicalActivity"));
    physicalActivity = 1.55;
  }
  function staticDate(collection, localStorage) {
    collection.forEach(item => {
      item.classList.remove("calculating__choose-item_active");
      if (item.innerText === localStorage) {
        item.classList.add("calculating__choose-item_active");
      }
    });
  }
  ;
  function chooseAnOption(parent, collection) {
    collection.forEach(item => {
      item.addEventListener("click", e => {
        if (item.parentElement === parent) {
          collection.forEach(item => {
            item.classList.remove("calculating__choose-item_active");
          });
          item.classList.add("calculating__choose-item_active");
        }
        ;
        if (parent === parentGender) {
          gender = e.target.innerText;
          localStorage.setItem("gender", e.target.innerText);
        } else if (parent === parentPhysicalActivity) {
          if (e.target.innerText === "Низкая активность") {
            physicalActivity = 1.2;
            localStorage.setItem("physicalActivity", e.target.innerText);
          } else if (e.target.innerText === "Невысокая активность") {
            physicalActivity = 1.375;
            localStorage.setItem("physicalActivity", e.target.innerText);
          } else if (e.target.innerText === "Умеренная активность") {
            physicalActivity = 1.55;
            localStorage.setItem("physicalActivity", e.target.innerText);
          } else if (e.target.innerText === "Высокая активность") {
            physicalActivity = 1.725;
            localStorage.setItem("physicalActivity", e.target.innerText);
          }
        }
        calculatDate();
      });
    });
  }
  ;
  parentConstitutionBody.addEventListener("input", e => {
    if (e.target.value.match(/\D/g)) {
      e.target.style.cssText = "border: 1px solid red";
    } else {
      e.target.style.cssText = "border: 0px";
    }
    if (e.target && e.target.className === "calculating__choose-item") {
      if (e.target.id === "height") {
        height = +e.target.value;
      } else if (e.target.id === "age") {
        age = +e.target.value;
      } else if (e.target.id === "weight") {
        weight = +e.target.value;
      }
    }
    calculatDate();
  });
  function calculatDate() {
    if (gender === "Мужчина") {
      totalCalc = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * physicalActivity);
    } else {
      totalCalc = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * physicalActivity);
    }
    if (!height || !weight || !age || !gender || !physicalActivity) {
      calculatingResult.innerText = "____";
    } else {
      calculatingResult.innerText = totalCalc;
    }
  }
  ;
  chooseAnOption(parentGender, choiseGender);
  chooseAnOption(parentPhysicalActivity, choisePhysicalActivity);
  calculatDate();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculate);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
  const menuItem = document.querySelectorAll(".menu__item");
  const menuField = document.querySelector(".menu__field .container");
  const menu = [{
    img: "img/tabs/vegy.jpg",
    altimg: "vegy",
    title: "Меню 'Фитнес'",
    descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    price: 9,
    id: "cdac"
  }, {
    img: "img/tabs/post.jpg",
    altimg: "post",
    title: "Меню 'Постное'",
    descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    price: 14,
    id: "86d5"
  }, {
    img: "img/tabs/elite.jpg",
    altimg: "elite",
    title: "Меню 'Премиум'",
    descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    price: 21,
    id: "f671"
  }];
  class MenuItem {
    constructor(img, alt, menuItemSubtitle, menuItemDescr, menuItemTotal, ...clases) {
      this.img = img;
      this.alt = alt;
      this.menuItemSubtitle = menuItemSubtitle;
      this.menuItemDescr = menuItemDescr;
      this.menuItemTotal = menuItemTotal;
      this.clases = clases;
    }
  }
  function addMenuItem() {
    menuItem.forEach(item => {
      item.remove();
    });
    menu.forEach(({
      img,
      alt,
      title,
      descr,
      price
    }) => {
      menuField.innerHTML += `<div class="menu__item">
            <img src="${img}" alt="${alt}">
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
            </div>
            </div>`;
    });
  }
  addMenuItem();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formSelector, modalTimerID) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(item => {
    bindPostForm(item);
  });
  const answer = {
    loading: "img/spinner/spinner.svg",
    fail: "Ошибка сервера, попробуйте попытку позже",
    succes: "Спасибо за отправку ваших данных, скоро мы с вам свяжемся"
  };
  function bindPostForm(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const div = document.createElement("img");
      div.src = answer.loading;
      div.style.cssText = `
                                    display: block;
                                    margin: 0 auto`;
      form.append(div);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(answer.succes);
        div.remove();
        e.stopPropagation();
      }).catch(() => {
        showThanksModal(answer.fail);
      }).finally(() => {
        form.reset();
      });
    });
  }
  ;
  function showThanksModal(answer) {
    const prewModalDialog = document.querySelector(".modal__dialog");
    prewModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showWindow)(".modal", modalTimerID);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${answer}</div>
            </div>
        `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prewModalDialog.classList.add("show");
      prewModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeWindow)(".modal");
    }, 4000);
  }
  ;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeWindow: () => (/* binding */ closeWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showWindow: () => (/* binding */ showWindow)
/* harmony export */ });
function showWindow(modalSelector, modalTimerID) {
  const modalWindow = document.querySelector(modalSelector);
  document.body.style.overflow = "hidden";
  modalWindow.style.display = "block";
  if (modalSelector) {
    clearInterval(modalTimerID);
  }
}
function closeWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  document.body.style.overflow = "";
  modalWindow.style.display = "none";
}
function modal(triggerSelector, modalSelector, modalTimerID) {
  const btnOpenModalWindow = document.querySelectorAll(triggerSelector);
  const btnCloseModalWindow = document.querySelector("[data-close]");
  const modalWindow = document.querySelector(modalSelector);
  btnOpenModalWindow.forEach(btnOpen => {
    btnOpen.addEventListener("click", () => showWindow(modalSelector, modalTimerID));
  });
  btnCloseModalWindow.addEventListener("click", () => closeWindow(modalSelector));
  modalWindow.addEventListener("click", e => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeWindow(modalSelector);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modalWindow.style.display === "block") {
      closeWindow(modalSelector);
    }
  });
  window.addEventListener("scroll", () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      showWindow(modalSelector, modalTimerID);
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  currentCounter,
  slide,
  next,
  prew,
  wrapper,
  field
}) {
  const counter = document.querySelector(currentCounter),
    slides = document.querySelectorAll(slide),
    sliderNext = document.querySelector(next),
    sliderPrew = document.querySelector(prew),
    wrapSlider = document.querySelector(wrapper),
    inner = document.querySelector(field),
    width = window.getComputedStyle(wrapSlider).width;
  let total = document.querySelector("#total");
  let i = 0;
  let offset = 0;
  inner.style.width = 100 * slides.length + `%`;
  inner.style.display = "flex";
  inner.style.transition = '0.5s';
  wrapSlider.style.overflow = "hidden";
  slides.forEach(slide => {
    slide.style.width = width;
  });
  sliderPrew.addEventListener("click", () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    inner.style.transform = `translateX(-${offset}px)`;
    if (i > 0) {
      i--;
      showCounter();
      activeDot();
    } else if (i === 0) {
      i = slides.length - 1;
      showCounter();
      activeDot();
    }
  });
  sliderNext.addEventListener("click", () => {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    inner.style.transform = `translateX(-${offset}px)`;
    if (i < slides.length - 1) {
      i++;
      showCounter();
      activeDot();
    } else if (i === slides.length - 1) {
      i = 0;
      showCounter();
      activeDot();
    }
  });
  function activeDot() {
    dots.forEach(dot => {
      dot.style.cssText = 'opacity: 0.5';
    });
    dots[i].style.cssText = 'opacity: 1';
  }
  if (slides.length < 10) {
    total.innerText = `0${slides.length}`;
  } else {
    total.innerText = slides.length;
  }
  function showCounter() {
    if (i + 1 > 9) {
      counter.innerText = i + 1;
    } else {
      counter.innerText = `0${i + 1}`;
    }
  }
  ;
  const containerNav = document.createElement("div");
  containerNav.classList.add("carousel-indicators");
  wrapSlider.append(containerNav);
  for (let i = 0; i < slides.length; i++) {
    containerNav.insertAdjacentHTML("afterbegin", `<div class="dot"></div>`);
  }
  ;
  wrapSlider.style.position = "relative";
  const dots = document.querySelectorAll(".dot");
  dots[i].style.cssText = 'opacity: 1';
  containerNav.addEventListener("click", e => {
    if (e.target && e.target.className === "dot") {
      dots.forEach((dot, it) => {
        if (e.target === dot) {
          offset = it * +width.slice(0, width.length - 2);
          inner.style.transform = `translateX(-${offset}px)`;
          i = it;
          showCounter();
          activeDot();
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsActiveClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = "none";
    });
    tabs.forEach(item => {
      item.classList.remove(tabsActiveClass);
    });
  }
  ;
  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add(tabsActiveClass);
  }
  hideTabContent();
  showTabContent();
  tabs.forEach(item => {
    item.addEventListener("click", event => {
      if (event.target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
          if (event.target == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
      ;
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(t / 1000 / 60 % 60);
    const seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
  function corectlyDaysTimer(time, selector) {
    const timer = document.querySelector(selector);
    const daysWord = timer.querySelector(".days-word");
    if (time < 5 && time > 1) {
      return daysWord.innerHTML = "Дня";
    } else if (time === 1) {
      return daysWord.innerHTML = "День";
    } else if (time < 1) {
      return daysWord.innerHTML = "Дней";
    }
  }
  function corectlyHoursTimer(time, selector) {
    const timer = document.querySelector(selector);
    const hoursWord = timer.querySelector(".hours-word");
    if (time < 5 && time > 1) {
      return hoursWord.innerHTML = "Часа";
    } else if (time === 1) {
      return hoursWord.innerHTML = "Час";
    } else {
      return hoursWord.innerHTML = "Часов";
    }
  }
  function corectlyMinutesTimer(time, selector) {
    const timer = document.querySelector(selector);
    const minutesWord = timer.querySelector(".minutes-word");
    if (time < 5 && time > 1) {
      return minutesWord.innerHTML = "Минуты";
    } else if (time === 1) {
      return minutesWord.innerHTML = "Минута";
    } else {
      return minutesWord.innerHTML = "Минут";
    }
  }
  function corectlySecondsTimer(time, selector) {
    const timer = document.querySelector(selector);
    const secondsWord = timer.querySelector(".seconds-word");
    if (time < 5 && time > 1) {
      return secondsWord.innerHTML = "Секунды";
    } else if (time === 1) {
      return secondsWord.innerHTML = "Секунда";
    } else {
      return secondsWord.innerHTML = "Секунд";
    }
  }
  function setClocks(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      corectlyDaysTimer(t.days, selector);
      corectlyHoursTimer(t.hours, selector);
      corectlyMinutesTimer(t.minutes, selector);
      corectlySecondsTimer(t.seconds, selector);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClocks(id, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDataCard: () => (/* binding */ getDataCard),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await res.json();
};
const getDataCard = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calculate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules//slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
  const timerWindow = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showWindow)(".modal", timerWindow), 120000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", "tabheader__item_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", timerWindow);
  (0,_modules_calculate__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", timerWindow);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    currentCounter: "#current",
    slide: ".offer__slide",
    next: ".offer__slider-next",
    prew: ".offer__slider-prev",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider--iner"
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer", "2024-06-22");
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map