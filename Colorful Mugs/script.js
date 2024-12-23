'use strict';

const playingField = document.querySelector('.playing-field');
const sizeCircle = 30;
const sizePlayingField = 400;
const quantityCircle = 8;
const additionalInformationAboutCircle = false;
const dataCircle = [];
const dataHex = [];

function generateHex(data) {
  const colorSymbol = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];

  let color = '';

  for (let i = 0; i < 6; i++) {
    color += colorSymbol[Math.floor(Math.random() * colorSymbol.length)];
  }

  if (data.includes(color)) {
    return generateHex(data);
  }

  return color;
}

function chekDataPosition(data, top, left) {
  return data.every((item) => {
    if (
      (top > item.top + sizeCircle / 2 || top < item.top - sizeCircle / 2) &&
      (left > item.left + sizeCircle || left < item.left - sizeCircle)
    ) {
      return true;
    }
    return false;
  });
}

function generatePosition(data) {
  let top = Math.floor(
    Math.random() * (playingField.clientHeight - sizeCircle)
  );

  let left = Math.floor(
    Math.random() * (playingField.clientWidth - sizeCircle)
  );

  if (chekDataPosition(data, top, left)) {
    return {
      top: top,
      left: left,
    };
  }
  return generatePosition(data);
}

function createCercle() {
  const hex = generateHex(dataHex);

  dataHex.push(hex);

  playingField.innerHTML += `<div class="circle" id = id-${hex}></div>`;

  const circle = document.querySelector(`#id-${hex}`);

  const position =
    dataCircle.length < quantityCircle
      ? generatePosition(dataCircle)
      : { top: clickTop, left: clickLeft };

  dataCircle.push({ id: `#id-${hex}`, ...position });

  setPositonInStyle(circle, position);

  circle.style.background = `#${hex}`;
  circle.style.width = `${sizeCircle}px`;
  circle.style.height = `${sizeCircle}px`;
  circle.style.fontSize = `8px`;
}

function generateMugs() {
  playingField.style.cssText = `width: ${sizePlayingField}px;
                                height: ${sizePlayingField}px;`;

  for (let i = 0; i < quantityCircle; i++) {
    createCercle(i);
  }
}

function mouseDownMoveElem(e) {
  let top = e.clientY - playingField.getBoundingClientRect().top;
  let left = e.clientX - playingField.getBoundingClientRect().left;

  {
    setPositonInStyle(e.target, { top: top, left: left });
  }
}

let clickTop = 0;
let clickLeft = 0;

function setPositonInStyle(elem, position) {
  if (
    position.top < playingField.offsetHeight - elem.offsetHeight + clickTop &&
    position.left < playingField.offsetWidth - elem.offsetWidth + clickLeft &&
    position.left - clickLeft >= 0 &&
    position.top - clickTop >= 0
  ) {
    if (clickTop === 0 && clickLeft === 0) {
      elem.style.top = `${position.top}px`;
      elem.style.left = `${position.left}px`;
    } else if (clickTop === position.top && clickLeft === position.left) {
      elem.style.top = `${position.top - sizeCircle / 2}px`;
      elem.style.left = `${position.left - sizeCircle / 2}px`;
    } else {
      console.log(elem, position);
      elem.style.top = `${position.top - clickTop}px`;
      elem.style.left = `${position.left - clickLeft}px`;
    }
  }
}

function addEventHandlersForCircle() {
  playingField.addEventListener('mousedown', (e) => {
    clickTop = e.y - e.target.getBoundingClientRect().top;
    clickLeft = e.x - e.target.getBoundingClientRect().left;

    playingField.addEventListener('mousemove', mouseDownMoveElem);
  });
  playingField.addEventListener('mouseup', () => {
    playingField.removeEventListener('mousemove', mouseDownMoveElem);
  });
}

playingField.addEventListener('dblclick', (e) => {
  clickTop = e.y - e.target.getBoundingClientRect().top;
  clickLeft = e.x - e.target.getBoundingClientRect().left;
  createCercle();
});

generateMugs();
addEventHandlersForCircle();
