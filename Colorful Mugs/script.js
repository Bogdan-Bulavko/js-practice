'use strict';

const playingField = document.querySelector('.playing-field');
const sizeCircle = 30;
const sizePlayingField = 200;
const quantityCircle = 1;
const additionalInformationAboutCircle = false;
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

    dataCircle.push({ id: `#${circle.getAttribute('id')}`, ...position });

    circle.style.top = `${position.top - clickTop}px`;
    circle.style.left = `${position.left - clickLeft}px`;

    if (additionalInformationAboutCircle) {
      circle.textContent = `${i + 1}`;
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
  return dataCircle.every((item) => {
    if (top > item.top + sizeCircle + sizeCircle / 2) {
      return true;
      // if (left > item.left + sizeCircle || left < item.left - sizeCircle) {
      //   return true;
      // }
    } else {
      if (
        left > item.left + sizeCircle + sizeCircle / 2 ||
        left < item.left - sizeCircle - sizeCircle / 2
      ) {
        return true;
      }
    }
  });
}

function createCircle() {
  const hex = generateHex(dataHex);

  playingField.innerHTML += `<div class='circle' id = 'id-${hex}'></div>`;

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

  dataCircle.push({
    id: `#${circle.getAttribute('id')}`,
    top: clickTop - sizeCircle / 2,
    left: clickLeft - sizeCircle / 2,
  });

  setPosition(circle);

  if (additionalInformationAboutCircle) {
    circle.textContent = `${clickTop}`;
  }

  // console.log(dataCircle);
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
    top < playingField.clientHeight - elem.clientHeight + clickTop &&
    top - clickTop >= 0 &&
    left < playingField.clientWidth - elem.clientWidth + clickLeft &&
    left - clickLeft >= 0
  ) {
    elem.style.top = `${top - clickTop}px`;
    elem.style.left = `${left - clickLeft}px`;
    if (additionalInformationAboutCircle) {
      elem.textContent = `${top - clickTop}`;
    }
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

function setPosition(elem) {
  if (
    // Генерация кружка при двойном щелчке когда top и left меньше ширины кружка в левом верхнем углу
    clickTop < sizeCircle &&
    clickLeft < sizeCircle
  ) {
    elem.style.top = `${0}px`;
    elem.style.left = `${0}px`;
  } else if (
    // Генерация кружка при двойном щелчке если left > ширины кружка, но top < высоты кружка (верхняя граница)
    clickTop < sizeCircle &&
    clickTop < playingField.clientHeight &&
    clickLeft > sizeCircle &&
    clickLeft < playingField.clientWidth - sizeCircle
  ) {
    elem.style.top = `${0}px`;
    elem.style.left = `${clickLeft - sizeCircle / 2}px`;
  } else if (
    //Генерация кружка при двойном щелчке если left < ширины кружка, но top < высоты поля (левый нижний угол)
    clickTop > playingField.clientHeight - sizeCircle &&
    clickLeft < sizeCircle
  ) {
    elem.style.top = `${playingField.clientHeight - sizeCircle}px`;
    elem.style.left = `${0}px`;
  } else if (
    //Генерация кружка при двойном щелчке если left < ширины кружка, но top < высоты поля отняв высоту кружка(левая граница)
    clickTop < playingField.clientHeight &&
    clickLeft < sizeCircle
  ) {
    elem.style.top = `${clickTop - sizeCircle / 2}px`;
    elem.style.left = `${0}px`;
  } else if (
    //Генерация кружка при двойном щелчке если left < ширины поля, но больше ширины поля отняв ширину кружка, но top < высоты поля отняв высоту кружка (правый нижний угол)
    clickTop > playingField.clientHeight - sizeCircle &&
    clickLeft > playingField.clientWidth - sizeCircle
  ) {
    elem.style.top = `${playingField.clientHeight - sizeCircle}px`;
    elem.style.left = `${playingField.clientWidth - sizeCircle}px`;
  } else if (
    //Генерация кружка при двойном щелчке если left < ширины поля, но больше ширины поля отняв ширину кружка, и top < высоты поля (правая граница)
    clickTop < playingField.clientHeight &&
    clickTop > sizeCircle &&
    clickLeft > playingField.clientWidth - sizeCircle
  ) {
    elem.style.top = `${clickTop - sizeCircle / 2}px`;
    elem.style.left = `${playingField.clientWidth - sizeCircle}px`;
  } else if (
    //Генерация кружка при двойном щелчке если left > ширины кружка, но top < высоты поля отняв высоту кружка (нижняя граница)
    clickTop > playingField.clientHeight - sizeCircle &&
    clickLeft > sizeCircle
  ) {
    elem.style.top = `${playingField.clientHeight - sizeCircle}px`;
    elem.style.left = `${clickLeft - sizeCircle / 2}px`;
  } else if (
    //Генерация кружка при двойном щелчке если left < ширины поля, но больше ширины поля отняв ширину кружка, и top < высоты поля и меньше высоты кружка(правый верхний угол)
    clickTop < sizeCircle &&
    clickLeft < playingField.clientWidth
  ) {
    elem.style.top = `${0}px`;
    elem.style.left = `${playingField.clientWidth - sizeCircle}px`;
  } else {
    // Генерация кружка в свободной генерации кружка
    elem.style.top = `${clickTop - sizeCircle / 2}px`;
    elem.style.left = `${clickLeft - sizeCircle / 2}px`;
  }
}

// function setCirclePosition(elem) {
//   const fieldHeight = playingField.clientHeight;
//   const fieldWidth = playingField.clientWidth;

//   let caseType;

//   if (clickTop < sizeCircle && clickLeft < sizeCircle) {
//     caseType = 'topLeftCorner';
//   } else if (
//     clickTop < sizeCircle &&
//     clickLeft > sizeCircle &&
//     clickLeft < fieldWidth - sizeCircle
//   ) {
//     caseType = 'topCenter';
//   } else if (clickTop > fieldHeight - sizeCircle && clickLeft < sizeCircle) {
//     caseType = 'bottomLeftCorner';
//   } else if (clickTop < fieldHeight && clickLeft < sizeCircle) {
//     caseType = 'middleLeft';
//   } else if (
//     clickTop > fieldHeight - sizeCircle &&
//     clickLeft > fieldWidth - sizeCircle
//   ) {
//     caseType = 'bottomRightCorner';
//   } else if (
//     clickTop < fieldHeight &&
//     clickTop > sizeCircle &&
//     clickLeft > fieldWidth - sizeCircle
//   ) {
//     caseType = 'middleRight';
//   } else if (clickTop > fieldHeight - sizeCircle && clickLeft > sizeCircle) {
//     caseType = 'bottomCenter';
//   } else if (clickTop < sizeCircle && clickLeft < fieldWidth) {
//     caseType = 'topRightCorner';
//   } else {
//     caseType = 'freePlacement';
//   }

//   switch (caseType) {
//     case 'topLeftCorner':
//       elem.style.top = `${0}px`;
//       elem.style.left = `${0}px`;
//       break;

//     case 'topCenter':
//       elem.style.top = `${0}px`;
//       elem.style.left = `${clickLeft - sizeCircle / 2}px`;
//       break;

//     case 'bottomLeftCorner':
//       elem.style.top = `${fieldHeight - sizeCircle}px`;
//       elem.style.left = `${0}px`;
//       break;

//     case 'middleLeft':
//       elem.style.top = `${clickTop - sizeCircle / 2}px`;
//       elem.style.left = `${0}px`;
//       break;

//     case 'bottomRightCorner':
//       elem.style.top = `${fieldHeight - sizeCircle}px`;
//       elem.style.left = `${fieldWidth - sizeCircle}px`;
//       break;

//     case 'middleRight':
//       elem.style.top = `${clickTop - sizeCircle / 2}px`;
//       elem.style.left = `${fieldWidth - sizeCircle}px`;
//       break;

//     case 'bottomCenter':
//       elem.style.top = `${fieldHeight - sizeCircle}px`;
//       elem.style.left = `${clickLeft - sizeCircle / 2}px`;
//       break;

//     case 'topRightCorner':
//       elem.style.top = `${0}px`;
//       elem.style.left = `${fieldWidth - sizeCircle}px`;
//       break;

//     case 'freePlacement':
//     default:
//       elem.style.top = `${clickTop - sizeCircle / 2}px`;
//       elem.style.left = `${clickLeft - sizeCircle / 2}px`;
//       break;
//   }
// }
