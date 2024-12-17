'use strict';

const playingField = document.querySelector('.playing-field');

function generatePosition(id, elem, data) {
  let top = Math.floor(
    Math.random() * (playingField.clientHeight - elem.clientWidth)
  );

  let left = Math.floor(
    Math.random() * (playingField.clientWidth - elem.clientWidth)
  );

  data[`#id-${id}`] = elem.getBoundingClientRect();

  console.log(data);

  return { top, left };
}

function generateMugs() {
  let dataPosition = {};
  const hexSymbol = [
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

  for (let i = 0; i < 10; i++) {
    let hex = '';
    for (let i = 0; i < 6; i++) {
      hex += hexSymbol[Math.floor(Math.random() * hexSymbol.length)];
    }

    playingField.innerHTML += `<div class="circle" id = id-${hex}></div>`;
    const circle = document.querySelector(`#id-${hex}`);

    const position = generatePosition(hex, circle, dataPosition);

    circle.style.top = position.top + 'px';
    circle.style.left = position.left + 'px';
    circle.style.background = `#${hex}`;
  }
}

generateMugs();
