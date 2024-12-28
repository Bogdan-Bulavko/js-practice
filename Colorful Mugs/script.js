'use strict';

const playingField = document.querySelector('.playing-field');
const sizeCircle = 20;
const sizePlayingField = 100;
const quantityCircle = 3;
const additionalInformationAboutCircle = true;
let dataCircle = [];
const dataHex = [];
let clickTop = 0;
let clickLeft = 0;

function generateMugs() {
  playingField.style.cssText = `width: ${sizePlayingField}px;
                                height: ${sizePlayingField}px;`;

  for (let i = 0; i < quantityCircle; i++) {
    const circle = createCircle();

    const position = generatePosition();

    addDataCircle(`#${circle.getAttribute('id')}`, position.top, position.left);

    circle.style.top = `${position.top - clickTop}px`;
    circle.style.left = `${position.left - clickLeft}px`;

    if (additionalInformationAboutCircle) {
      circle.textContent = `${position.top}`;
    }
  }
}

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

  dataHex.push(color);

  return color;
}

function generatePosition() {
  let top = Math.floor(Math.random() * (sizePlayingField - sizeCircle));

  let left = Math.floor(Math.random() * (sizePlayingField - sizeCircle));

  if (checkDataPosition(top, left)) {
    console.log(top, left);
    return {
      top: top,
      left: left,
    };
  }
  return generatePosition();
}

function checkDataPosition(top, left) {
  return dataCircle.every((item) => {
    return (
      (top > item.top + sizeCircle || top < item.top - sizeCircle) &&
      (left > item.left + sizeCircle || left < item.left - sizeCircle)
    );
  });
}

function checkDataPositionForDoubleClick(top, left) {
  return true;
}

function createCircle() {
  const hex = generateHex(dataHex);

  playingField.innerHTML += `<div class='circle' id ='id-${hex}'></div>`;

  const circle = document.querySelector(`#id-${hex}`);

  circle.style.background = `#${hex}`;
  circle.style.width = `${sizeCircle}px`;
  circle.style.height = `${sizeCircle}px`;
  circle.style.fontSize = `8px`;

  return circle;
}

function addCircleOnDoubleClick(e) {
  clickTop = e.y - e.target.getBoundingClientRect().top;
  clickLeft = e.x - e.target.getBoundingClientRect().left;

  const circle = createCircle();

  if (
    clickTop < sizePlayingField - sizeCircle &&
    clickLeft < sizePlayingField - sizeCircle
  ) {
    circle.style.top = clickTop + 'px';
    circle.style.left = clickLeft + 'px';

    addDataCircle(`#${circle.getAttribute('id')}`, clickTop, clickLeft);
  } else if (
    clickTop > sizePlayingField - sizeCircle &&
    clickLeft > sizePlayingField - sizeCircle
  ) {
    circle.style.top = clickTop - sizeCircle + 'px';
    circle.style.left = clickLeft - sizeCircle + 'px';

    addDataCircle(
      `#${circle.getAttribute('id')}`,
      clickTop - sizeCircle,
      clickLeft - sizeCircle
    );
  } else if (clickTop > sizePlayingField - sizeCircle) {
    circle.style.top = clickTop - sizeCircle + 'px';
    circle.style.left = clickLeft + 'px';

    addDataCircle(
      `#${circle.getAttribute('id')}`,
      clickTop - sizeCircle,
      clickLeft
    );
  } else {
    circle.style.top = clickTop + 'px';
    circle.style.left = clickLeft - sizeCircle + 'px';

    addDataCircle(
      `#${circle.getAttribute('id')}`,
      clickTop,
      clickLeft - sizeCircle
    );
  }

  // if (additionalInformationAboutCircle) {
  //   circle.textContent = `${clickTop}`;
  // }
  console.log(clickTop, clickLeft);
}

function addDataCircle(id, top, left) {
  dataCircle.push({
    id: id,
    top: top,
    left: left,
  });
}

function deleteCircle(e) {
  e.target.remove();
  dataCircle = dataCircle.filter((item) => {
    return item.id !== '#' + e.target.getAttribute('id');
  });
}

function mouseDown(e) {
  clickTop = e.y - e.target.getBoundingClientRect().top;
  clickLeft = e.x - e.target.getBoundingClientRect().left;

  if (e.target.getAttribute('id') !== 'playing-field') {
    playingField.addEventListener('mousemove', mouseMove);
  }
}

function mouseMove(e) {
  let top = Math.floor(e.y - playingField.getBoundingClientRect().top);
  let left = Math.floor(e.x - playingField.getBoundingClientRect().left);
  const elem = e.target;
  if (
    top < playingField.offsetHeight - elem.offsetHeight + clickTop &&
    top - clickTop >= 0 &&
    left < playingField.offsetWidth - elem.offsetWidth + clickLeft &&
    left - clickLeft >= 0
  ) {
    elem.style.top = `${top - clickTop}px`;
    elem.style.left = `${left - clickLeft}px`;
  }
  if (additionalInformationAboutCircle) {
    elem.textContent = `${top - clickTop}`;
  }
}

generateMugs();

playingField.addEventListener('mousedown', mouseDown);

playingField.addEventListener('mouseup', (e) => {
  if (e.target.getAttribute('id') !== 'playing-field') {
    dataCircle = dataCircle.map((item) => {
      if (item.id === '#' + e.target.getAttribute('id')) {
        return {
          ...item,
          top:
            e.target.getBoundingClientRect().top -
            playingField.getBoundingClientRect().top -
            1,
          left:
            e.target.getBoundingClientRect().left -
            playingField.getBoundingClientRect().left -
            1,
        };
      }
      return item;
    });
  }

  playingField.removeEventListener('mousemove', mouseMove);
});

playingField.addEventListener('dblclick', (e) => {
  if (e.target.getAttribute('id') === 'playing-field') {
    addCircleOnDoubleClick(e);
  } else {
    deleteCircle(e);
  }
});
