'use strict';

const trafficLight = document.querySelector('.traffic-light-wrapper');
const colorRed = document.querySelector('#red');
const colorYellow = document.querySelector('#yellow');
const colorGreen = document.querySelector('#green');
const countGreen = document.querySelector('.count-green');
const countRed = document.querySelector('.count-red');

let timeColorGreen = 10;
let timeColorYellow = 2;
let timeColorRed = 10;

function activeTrafficLight() {
  let countTimeColorGreen = timeColorGreen;
  let countTimeColorRed = timeColorRed;

  setInterval(() => {
    if (countTimeColorGreen > 0) {
      countGreen.textContent = countTimeColorGreen;
      countTimeColorGreen--;
      colorGreen.classList.add('green');
      if (countTimeColorGreen <= timeColorYellow) {
        colorYellow.classList.add('yellow');
        setTimeout(() => {
          colorGreen.classList.remove('green');
        }, 500);
      }
    } else {
      countRed.textContent = countTimeColorRed;
      countGreen.textContent = '';
      countTimeColorRed--;
      colorYellow.classList.remove('yellow');
      colorGreen.classList.remove('green');
      colorRed.classList.add('red');
      if (countTimeColorRed <= timeColorYellow) {
        colorYellow.classList.add('yellow');
      }
      if (countTimeColorRed === -1) {
        countRed.textContent = '';
        colorRed.classList.remove('red');
        colorYellow.classList.remove('yellow');
        colorGreen.classList.add('green');
        countTimeColorRed = timeColorRed;
        countTimeColorGreen = timeColorGreen;
        countGreen.textContent = countTimeColorGreen;
        countTimeColorGreen--;
      }
    }
  }, 1000);
}

activeTrafficLight();
