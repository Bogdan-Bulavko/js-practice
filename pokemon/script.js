'use strict';
const POKEMON_API = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 12;
let countPokemon = 12;
let countCard = 0;
const START_ID = '#0000';

const cardCatalog = document.querySelector('.card-catalog');
const cardCatalogButton = document.querySelector('.card-catalog__button');

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

async function addAllPokemonCards() {
  let dataPokemon = await getPokemons();
  dataPokemon.forEach((pokemon) => generatePokemonCard(pokemon));
}

addAllPokemonCards();

async function getPokemons() {
  try {
    const arr = [];
    for (countCard; countCard < countPokemon; countCard++) {
      const data = await fetch(`${POKEMON_API}/pokemon/${[countCard + 1]}`);
      const pokemon = await data.json();
      const obj = {
        img: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${
          '000'.slice(String(pokemon.id).length) + pokemon.id
        }.png`,
        id:
          START_ID.slice(-START_ID.length, -String(pokemon.id).length) +
          pokemon.id,
        name: pokemon.name.replace(
          pokemon.name[0],
          pokemon.name[0].toUpperCase()
        ),
        setOfForces: pokemon.types.map((power) =>
          power.type.name.replace(
            power.type.name[0],
            power.type.name[0].toUpperCase()
          )
        ),
      };
      arr.push(obj);
    }
    return arr;
  } catch (e) {
    console.log(e);
  }
}

cardCatalogButton.addEventListener('click', async () => {
  countPokemon += POKEMON_LIMIT;
  addAllPokemonCards();
});
