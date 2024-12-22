'use strict';

const playingField = document.querySelector('.playing-field');
const sizeCircle = 30;
const sizePlayingField = 400;
const quantityCircle = 8;
const additionalInformationAboutCircle = true;

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

function chekDataPosition(data, position) {
  return data.every((item) => {
    if (
      (position.top > item.top + sizeCircle / 2 ||
        position.top < item.top - sizeCircle / 2) &&
      (position.left > item.left + sizeCircle ||
        position.left < item.left - sizeCircle)
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

  if (chekDataPosition(data, { top, left })) {
    return {
      top: top,
      left: left,
    };
  }
  return generatePosition(data);
}

function generateMugs() {
  const dataCircle = [];
  const dataHex = [];

  playingField.style.cssText = `width: ${sizePlayingField}px;
                                height: ${sizePlayingField}px;`;

  for (let i = 0; i < quantityCircle; i++) {
    const hex = generateHex(dataHex);

    dataHex.push(hex);

    playingField.innerHTML += `<div class="circle" id = id-${hex}></div>`;

    const circle = document.querySelector(`#id-${hex}`);
    const position = generatePosition(dataCircle);
    dataCircle.push({ id: `#id-${hex}`, ...position, num: i + 1 });

    if (additionalInformationAboutCircle) {
      circle.textContent = `${dataCircle[i].num}, ${dataCircle[i].top}`;
    }
    circle.style.background = `#${hex}`;
    circle.style.width = `${sizeCircle}px`;
    circle.style.height = `${sizeCircle}px`;
    circle.style.fontSize = `8px`;

    setPositonInStyle(circle, position);
  }
}

function mouseDownMoveElem(e) {
  const item = e.target;

  let top = e.clientY - playingField.getBoundingClientRect().top;
  let left = e.clientX - playingField.getBoundingClientRect().left;
  {
    setPositonInStyle(item, { top: top, left: left });
  }
}

function setPositonInStyle(elem, position) {
  if (
    position.top < playingField.offsetHeight - elem.offsetHeight &&
    position.left < playingField.offsetWidth - elem.offsetWidth
  ) {
    elem.style.top = `${position.top - sizeCircle / 2}px`;
    elem.style.left = `${position.left - sizeCircle / 2}px`;
    elem.textContent = `${Math.floor(
      position.top + playingField.getBoundingClientRect().top
    )}`;
  }
}

function addEventHandlersForCircle() {
  playingField.addEventListener('mousedown', () => {
    playingField.addEventListener('mousemove', mouseDownMoveElem);
  });
  playingField.addEventListener('mouseup', () => {
    playingField.removeEventListener('mousemove', mouseDownMoveElem);
  });
}

generateMugs();
addEventHandlersForCircle();
