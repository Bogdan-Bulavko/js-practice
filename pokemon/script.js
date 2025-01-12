'use strict';

const dataPokemon = {
  bulbasaur: {
    img: '',
    id: '#0001',
    name: 'Bulbasaur',
    setOfForces: ['Grass', 'Poison'],
  },
  ivysaur: {
    img: '',
    id: '#0002',
    name: 'Ivysaur',
    setOfForces: ['Grass', 'Poison'],
  },
};

const cardCatalog = document.querySelector('.card-catalog');

function generatePokemonCard(pokemon) {
  const { img, id, name, setOfForces } = pokemon;

  let TypeOfForce = '';

  setOfForces.forEach((force) => {
    TypeOfForce += `<div class="pokemon-card__type-of-force type-of-force--${force}">${force}</div>`;
  });

  cardCatalog.insertAdjacentHTML(
    'beforeend',
    `     <div class="pokemon-card">
            <div class="pokemon-card__image">
              <img class="imgPC "src="${
                img === '' ? './image/not-images.png' : img
              }" alt="image pokemon">
            </div>
            <div class="pokemon-card__info">
              <p class="pokemon-card__id">${id}</p>
              <h2 class="pokemon-card__name">${
                name.length < 15 ? name : name.slice(0, 15) + '...'
              }</h2>
              <div class="pokemon-card__set-of-forces">
                    ${TypeOfForce}
              </div>
            </div>
          </div>`
  );
}

function addAllPokemonCards() {
  for (let key in dataPokemon) {
    generatePokemonCard(dataPokemon[key]);
  }
}

addAllPokemonCards();
