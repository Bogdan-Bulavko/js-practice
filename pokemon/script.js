'use strict';

const dataPokemon = [
  {
    img: '',
    id: '#0001',
    name: 'Bulbasaur',
    setOfForces: ['Grass', 'Poison'],
  },
  {
    img: '',
    id: '#0002',
    name: 'Ivysaur',
    setOfForces: ['Grass', 'Poison'],
  },
  {
    img: '',
    id: '#0003',
    name: 'Charmander',
    setOfForces: ['Fire'],
  },
  {
    img: '',
    id: '#0004',
    name: 'Squirtle',
    setOfForces: ['Water'],
  },
  {
    img: '',
    id: '#0005',
    name: 'Pidgey',
    setOfForces: ['Flying', 'Fire'],
  },
  {
    img: '',
    id: '#0006',
    name: 'Flareon',
    setOfForces: ['Fire'],
  },
  {
    img: '',
    id: '#0007',
    name: 'Vaporeon',
    setOfForces: ['Water'],
  },
  {
    img: '',
    id: '#0008',
    name: 'Articuno',
    setOfForces: ['Fire', 'Flying'],
  },
  {
    img: '',
    id: '#0009',
    name: 'Zapdos',
    setOfForces: ['Fire', 'Flying'],
  },
  {
    img: '',
    id: '#0010',
    name: 'Moltres',
    setOfForces: ['Fire', 'Flying'],
  },
  {
    img: '',
    id: '#0011',
    name: 'Leafeon',
    setOfForces: ['Grass'],
  },
  {
    img: '',
    id: '#0012',
    name: 'Gyarados',
    setOfForces: ['Water', 'Flying'],
  },
];

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
  dataPokemon.forEach((pokemon) => generatePokemonCard(pokemon));
}

addAllPokemonCards();
