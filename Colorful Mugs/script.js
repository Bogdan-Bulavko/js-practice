'use strict';

const playingField = document.querySelector('.playing-field');

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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function chekDataPosition(data, position, sizeCircle) {
  return data.forEach((item, i) => {
    console.log(
      position.top > item.top + sizeCircle ||
        position.top < item.top - sizeCircle,
      `position ${position.top} end ${i + 1} item ${item.top}`
    );
  });
}

//
//
//

function generatePosition(data, sizeCircle) {
  let top = Math.floor(
    Math.random() * (playingField.clientHeight - sizeCircle)
  );

  let left = Math.floor(
    Math.random() * (playingField.clientWidth - sizeCircle)
  );

  chekDataPosition(data, { top, left }, sizeCircle);

  return {
    top: top,
    left: left,
  };
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function generateMugs() {
  const sizeCircle = 20;
  const sizePlayingField = 200;
  const quantityCircle = 6;
  const dataCircle = [];
  const dataHex = [];

  playingField.style.cssText = `width: ${sizePlayingField}px;
                                height: ${sizePlayingField}px;`;

  for (let i = 0; i < quantityCircle; i++) {
    const hex = generateHex(dataHex);

    dataHex.push(hex);

    playingField.innerHTML += `<div class="circle" id = id-${hex}></div>`;

    const circle = document.querySelector(`#id-${hex}`);
    const position = generatePosition(dataCircle, sizeCircle);
    dataCircle.push({ id: `#id-${hex}`, ...position, num: i + 1 });
    circle.textContent = `${dataCircle[i].num}, ${dataCircle[i].top}`;
    circle.style.cssText = `width: ${sizeCircle}px;
                            height: ${sizeCircle}px; 
                            top: ${position.top}px;
                            // left: ${position.left}px;
                            background: #${hex};

                            font-size: 8px`;
  }

  console.log(dataCircle);
}

generateMugs();
