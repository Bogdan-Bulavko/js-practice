'use strict';
const POKEMON_API = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 12;
let pokemonOffset = 0;
const START_ID = '#0000';
const pokemonTypeDatabase = [
  { typeName: 'Bug', backgroundColor: '#729f3f', textColor: '#fff' },
  {
    typeName: 'Dragon',
    backgroundColor: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
    textColor: '#fff',
  },
  {
    typeName: 'Fairy',
    backgroundColor: '#fdb9e9',
    textColor: '#212121',
  },
  {
    typeName: 'Fire',
    backgroundColor: '#fd7d24',
    textColor: '#fff',
  },
  {
    typeName: 'Ghost',
    backgroundColor: '#7b62a3',
    textColor: '#fff',
  },
  {
    typeName: 'Ground',
    backgroundColor: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
    textColor: '#212121',
  },
  {
    typeName: 'Normal',
    backgroundColor: '#a4acaf',
    textColor: '#212121',
  },
  {
    typeName: 'Psychic',
    backgroundColor: '#a4acaf',
    textColor: '#fff',
  },
  {
    typeName: 'Steel',
    backgroundColor: '#9eb7b8',
    textColor: '#212121',
  },
  {
    typeName: 'Dark',
    backgroundColor: '#707070',
    textColor: '#fff',
  },
  {
    typeName: 'Electric',
    backgroundColor: '#eed535',
    textColor: '#212121',
  },
  {
    typeName: 'Fighting',
    backgroundColor: '#d56723',
    textColor: '#fff',
  },
  {
    typeName: 'Flying',
    backgroundColor: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)',
    textColor: '#212121',
  },
  {
    typeName: 'Grass',
    backgroundColor: '#9bcc50',
    textColor: '#212121',
  },
  {
    typeName: 'Ice',
    backgroundColor: '#51c4e7',
    textColor: '#212121',
  },
  {
    typeName: 'Poison',
    backgroundColor: '#b97fc9',
    textColor: '#fff',
  },
  {
    typeName: 'Rock',
    backgroundColor: '#a38c21',
    textColor: '#fff',
  },
  {
    typeName: 'Water',
    backgroundColor: '#4592c4',
    textColor: '#fff',
  },
];

const cardCatalog = document.querySelector('.card-catalog');
const cardCatalogButton = document.querySelector('.card-catalog__button');

const renderThePokemonType = function (pokemon, typeWrapper) {
  pokemon.setOfForces.forEach((power) => {
    const typeStyle = pokemonTypeDatabase.find((PT) => PT.typeName === power);
    const type = document.createElement('div');
    type.classList.add('pokemon-card__type-of-force');
    type.textContent = power;
    type.style.background = typeStyle.backgroundColor;
    type.style.color = typeStyle.textColor;
    typeWrapper.append(type);
  });
};

const generatePokemonCard = function (pokemon) {
  const { img, id, name } = pokemon;

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
              <div class="pokemon-card__set-of-forces" id=${id}></div>
            </div>
          </div>`
  );
  renderThePokemonType(pokemon, document.getElementById(id));
};

const addAllPokemonCards = async function () {
  let dataPokemons = await getPokemons();
  pokemonOffset += POKEMON_LIMIT;
  dataPokemons.forEach((pokemon) => generatePokemonCard(pokemon));
};

const fetchPokemonData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const getPokemons = async function () {
  let arr = [];
  try {
    const data = await fetch(
      `${POKEMON_API}/pokemon?limit=12&offset=${pokemonOffset}`
    );

    const pokemons = await data.json();

    let arrURL = pokemons.results.map((pokemon) => pokemon.url);

    const pokemonsObjects = await Promise.all(
      arrURL.map(async (url) => {
        return await fetchPokemonData(url);
      })
    );

    pokemonsObjects.forEach((pokemon) => {
      const obj = {
        img: pokemon.sprites.front_default,
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
    });

    return arr;
  } catch (e) {
    console.log(e);
  }
};

cardCatalogButton.addEventListener('click', async () => {
  addAllPokemonCards();
});

addAllPokemonCards();
