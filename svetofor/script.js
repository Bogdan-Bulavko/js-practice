'use strict';

const colorRed = document.querySelector('#red'); // Получение красного цвета
const colorYellow = document.querySelector('#yellow'); // Получение жёлтого цвета
const colorGreen = document.querySelector('#green'); // Получение зелёного цвета
const countGreen = document.querySelector('.count-green'); // Получение поля отображение остаточного времени красного цвета
const countRed = document.querySelector('.count-red'); // Получение поля отображение остаточного времени зелёного цвета

let timeColorGreen = 10; // Таймер красного цвета
let timeColorYellow = 2; // Таймер жёлтого цвета
let timeColorRed = 10; // Таймер зелёного цвета

function activeTrafficLight() {
  let countTimeColorGreen = timeColorGreen; // Счётчик отсчета красного цвета
  let countTimeColorRed = timeColorRed; // Счётчик отсчета зеленого цвета

  setInterval(() => {
    if (countTimeColorGreen > 0) {
      countGreen.textContent = countTimeColorGreen; // Отобразить текущее время зелёного цвета
      countTimeColorGreen--; // Отсчитать 1 секунду у Счётчика отсчета зеленого цвета
      colorGreen.classList.add('green'); // Добавить зелёный цвет

      if (countTimeColorGreen <= timeColorYellow) {
        colorYellow.classList.add('yellow'); // Удалить жёлтый цвет
        setTimeout(() => {
          colorGreen.classList.remove('green'); // Удалить зелёный цвет
        }, 500);
      }
    } else {
      countRed.textContent = countTimeColorRed; // Отобразить текущее время красного цвета
      countGreen.textContent = ''; // Обнулить поле отображение остаточного времени зелёного цвета
      countTimeColorRed--; // Отсчитать 1 секунду у Счётчика отсчета красного цвета
      colorYellow.classList.remove('yellow'); // Удалить желтый цвет
      colorGreen.classList.remove('green'); // Удалить зелёный цвет
      colorRed.classList.add('red'); // Добавить красный цвет
      if (countTimeColorRed <= timeColorYellow) {
        colorYellow.classList.add('yellow'); // Удалить жёлтый цвет
      }

      if (countTimeColorRed === -1) {
        countRed.textContent = ''; // Обнулить поле отображение остаточного времени красного цвета
        colorRed.classList.remove('red'); // Удалить красный цвет
        colorYellow.classList.remove('yellow'); // Удалить желтый цвет
        colorGreen.classList.add('green'); // Добавить зелёный цвет
        countTimeColorRed = timeColorRed; // Отобразить время по умолчанию
        countTimeColorGreen = timeColorGreen; // Отобразить время по умолчанию
        countGreen.textContent = countTimeColorGreen; // Отобразить текущее время зелёного цвета
        countTimeColorGreen--; // Отсчитать 1 секунду у Счётчика отсчета зеленого цвета
      }
    }
  }, 1000);
}

activeTrafficLight();
