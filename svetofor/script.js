'use strict';

const trafficLight = document.querySelector('.traffic-light-wrapper');
const colorRed = trafficLight.children[0];
const colorYellow = trafficLight.children[1];
const colorGreen = trafficLight.children[2];
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
      if (colorGreen.classList.contains('green')) {
        countTimeColorGreen--;
      } else {
        colorGreen.classList.add('green');
        countTimeColorGreen--;
      }
      if (countTimeColorGreen <= 5) {
        setTimeout(() => {
          colorGreen.classList.remove('green');
        }, 500);
      }
      if (countTimeColorGreen <= timeColorYellow) {
        colorYellow.classList.add('yellow');
      }
    } else if (countTimeColorGreen === 0) {
      countGreen.textContent = '';
      countRed.textContent = countTimeColorRed;
      if (colorRed.classList.contains('red')) {
        countTimeColorRed--;
      } else {
        colorGreen.classList.remove('green');
        colorYellow.classList.remove('yellow');
        colorRed.classList.add('red');
        countTimeColorRed--;
      }
      if (countTimeColorRed === timeColorYellow) {
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
