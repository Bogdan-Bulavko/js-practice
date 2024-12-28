'use strict';

const playingField = document.querySelector('.playing-field');
const sizeCircle = 100;
const sizePlayingField = 1000;
const quantityCircle = 10;
const additionalInformationAboutCircle = false;
let dataCircle = [];
const dataHex = [];
let clickTop = 0;
let clickLeft = 0;

function generateMugs() {
  playingField.style.cssText = `width: ${sizePlayingField}px; height: ${sizePlayingField}px;`;

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

function generatePosition(id) {
  const top = Math.floor(Math.random() * (sizePlayingField - sizeCircle));
  const left = Math.floor(Math.random() * (sizePlayingField - sizeCircle));

  if (checkCoord(top, left)) {
    return {
      top: top,
      left: left,
    };
  }

  return generatePosition(id);
}

// !!! deprecated
// function checkDataPosition(top, left) {
//   return dataCircle.every((item) => {
//     return (
//       (top > item.top + sizeCircle || top < item.top - sizeCircle) &&
//       (left > item.left + sizeCircle || left < item.left - sizeCircle)
//     );
//   });
// }

function checkCoord(top, left) {
  return dataCircle.every((circle) => {
    const distance = Math.sqrt(
      Math.pow(left - (circle.left + sizeCircle / 2), 2) +
        Math.pow(top - (circle.top + sizeCircle / 2), 2)
    );

    // console.log('distance', distance);
    return distance > sizeCircle;
  });
}

// !!! deprecated
// function checkDataPositionForDoubleClick(top, left) {
//   return dataCircle.every((item) => {
//     if (top > item.top + sizeCircle + sizeCircle / 2) {
//       return true;
//       // if (left > item.left + sizeCircle || left < item.left - sizeCircle) {
//       //   return true;
//       // }
//     } else {
//       if (
//         left > item.left + sizeCircle + sizeCircle / 2 ||
//         left < item.left - sizeCircle - sizeCircle / 2
//       ) {
//         return true;
//       }
//     }
//   });
// }

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
  // console.log('addCircleOnDoubleClick', e);

  const radius = sizeCircle / 2;
  const computedPlayingFieldSize = sizePlayingField - radius;
  const cord = playingField.getBoundingClientRect();
  const clientX = e.clientX - cord.left;
  const clientY = e.clientY - cord.top;

  if (
    clientX > computedPlayingFieldSize ||
    clientY > computedPlayingFieldSize ||
    clientY < radius ||
    clientX < radius
  ) {
    return errorFunc();
  }

  if (checkCoord(clickTop, clickLeft)) {
    const circle = createCircle();

    dataCircle.push({
      id: `#${circle.getAttribute('id')}`,
      top: clickTop - sizeCircle / 2,
      left: clickLeft - sizeCircle / 2,
    });
    circle.style.top = `${clickTop - sizeCircle / 2}px`;
    circle.style.left = `${clickLeft - sizeCircle / 2}px`;

    if (additionalInformationAboutCircle) {
      // circle.textContent = `${clickTop}`;
    }
  } else {
    return errorFunc();
  }
}

function deleteCircle(e) {
  e.target.remove();
  dataCircle = dataCircle.filter((item) => {
    return item.id !== '#' + e.target.getAttribute('id');
  });
}

function mouseDown(e) {
  // console.log('mouseDown', e);

  clickTop = e.y - e.target.getBoundingClientRect().top;
  clickLeft = e.x - e.target.getBoundingClientRect().left;

  if (e.target.getAttribute('id') !== 'playing-field') {
    playingField.addEventListener('mousemove', mouseMove);
  }
}

function mouseMove(e) {
  // console.log('mouseMove', e);

  const top = Math.floor(e.y - playingField.getBoundingClientRect().top);
  const left = Math.floor(e.x - playingField.getBoundingClientRect().left);
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

  elem.addEventListener('mouseup', () => {
    elem.style.top = top;
    elem.style.left = left;

    dataCircle = dataCircle.map((item) => {
      if (item.id === `#${elem.getAttribute('id')}`) {
        return {
          ...item,
          top,
          left,
        };
      }

      return item;
    });

    playingField.removeEventListener('mousemove', mouseMove);
  });
}

function errorFunc() {
  playingField.style['border-color'] = 'red';

  setTimeout(() => {
    playingField.style['border-color'] = '#000';
  }, 300);
}

generateMugs();

playingField.addEventListener('mousedown', mouseDown);

// !!! метод EventListener вызван не в том месте, из-за этого потребовалась лишняя проверка и вычисления
// !!! перенёс этот метод во внутрь mousemove
// playingField.addEventListener('mouseup', (e) => {
//   console.log('playingField-mouseup', e);

//   if (e.target.getAttribute('id') !== 'playing-field') {
//     dataCircle = dataCircle.map((item) => {
//       if (item.id === '#' + e.target.getAttribute('id')) {
//         return {
//           ...item,
//           top:
//             e.target.getBoundingClientRect().top -
//             playingField.getBoundingClientRect().top -
//             1,
//           left:
//             e.target.getBoundingClientRect().left -
//             playingField.getBoundingClientRect().left -
//             1,
//         };
//       }
//       return item;
//     });
//   }

//   playingField.removeEventListener('mousemove', mouseMove);
// });

playingField.addEventListener('dblclick', (e) => {
  if (e.target.getAttribute('id') === 'playing-field') {
    addCircleOnDoubleClick(e);
  } else {
    deleteCircle(e);
  }
});
