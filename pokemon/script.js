'use strict';
const POKEMON_API = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 12;
let pokemonOffset = 0;
const START_ID = '#0000';
const quantityCellGraphPokemonPage = 15;
const pokemonTypeDatabase = {
  Bug: { typeName: 'Bug', backgroundColor: '#729f3f', textColor: '#fff' },
  Dragon: {
    typeName: 'Dragon',
    backgroundColor: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
    textColor: '#fff',
  },
  Fairy: {
    typeName: 'Fairy',
    backgroundColor: '#fdb9e9',
    textColor: '#212121',
  },
  Fire: {
    typeName: 'Fire',
    backgroundColor: '#fd7d24',
    textColor: '#fff',
  },
  Ghost: {
    typeName: 'Ghost',
    backgroundColor: '#7b62a3',
    textColor: '#fff',
  },
  Ground: {
    typeName: 'Ground',
    backgroundColor: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
    textColor: '#212121',
  },
  Normal: {
    typeName: 'Normal',
    backgroundColor: '#a4acaf',
    textColor: '#212121',
  },
  Psychic: {
    typeName: 'Psychic',
    backgroundColor: '#a4acaf',
    textColor: '#fff',
  },
  Steel: {
    typeName: 'Steel',
    backgroundColor: '#9eb7b8',
    textColor: '#212121',
  },
  Dark: {
    typeName: 'Dark',
    backgroundColor: '#707070',
    textColor: '#fff',
  },
  Electric: {
    typeName: 'Electric',
    backgroundColor: '#eed535',
    textColor: '#212121',
  },
  Fighting: {
    typeName: 'Fighting',
    backgroundColor: '#d56723',
    textColor: '#fff',
  },
  Flying: {
    typeName: 'Flying',
    backgroundColor: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)',
    textColor: '#212121',
  },
  Grass: {
    typeName: 'Grass',
    backgroundColor: '#9bcc50',
    textColor: '#212121',
  },
  Ice: {
    typeName: 'Ice',
    backgroundColor: '#51c4e7',
    textColor: '#212121',
  },
  Poison: {
    typeName: 'Poison',
    backgroundColor: '#b97fc9',
    textColor: '#fff',
  },
  Rock: {
    typeName: 'Rock',
    backgroundColor: '#a38c21',
    textColor: '#fff',
  },
  Water: {
    typeName: 'Water',
    backgroundColor: '#4592c4',
    textColor: '#fff',
  },
};

const cardCatalog = document.querySelector('.card-catalog');
const cardCatalogButton = document.querySelector('.card-catalog__button');
const container = document.querySelector('.container');

const renderThePokemonType = function (pokemon, typeWrapper) {
  pokemon.setOfForces.forEach((power) => {
    const typeStyle = pokemonTypeDatabase[power];
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

let dataPokemons = getPokemons().then((data) => data);

addAllPokemonCards();

const createGrapOnStatsPokemonPage = function (nameGraph, quantityCell, num) {
  let arrDivisionElements = [];

  for (let i = 0; i < quantityCell; i++) {
    let division = '<li class="division"></li>';
    if (quantityCell - i <= num)
      division = '<li class="division division-active"></li>';
    arrDivisionElements.push(division);
  }

  const graph = `                
              <li class="pokemon-page__graph ${nameGraph}">
                <ul class="pokemon-page__graph__division_list">
                   ${arrDivisionElements.join(' ')}
                </ul>
                <p class="graph-name">${nameGraph}</p>
              </li>`;

  return graph;
};

const createPokemonPageInfo = function (nameInfo, text) {
  return `  
            <li class="pokemon-page__info__list__item">
              <span class="pokemon-page__info--name">${nameInfo}</span>
              <span class="pokemon-page__info--value">${text}</span>
            </li>`;
};

const renderPokemonPage = function (pokemon) {
  const pokedexPokemonDetails = document.createElement('section');
  pokedexPokemonDetails.classList.add('pokedex-pokemon-details');

  const pokemonPageNavigation = document.createElement('nav');
  pokemonPageNavigation.classList.add('pokemon-page__navigation');
  pokemonPageNavigation.insertAdjacentHTML(
    'afterbegin',
    `   <a href="#" class="pokemon-navigation__button">
          <div class="pokemon-navigation__button--wrapper previuos">
            <span class="icon-arrow icon-previuos"></span
            ><span class="pokemon__id">#0001</span
            ><span class="pokemon__name">Bulbasaur</span>
          </div>
        </a>
        <a href="#" class="pokemon-navigation__button">
          <div class="pokemon-navigation__button--wrapper next">
            <span class="pokemon__name">Venusaur</span
            ><span class="pokemon__id">#0003</span
            ><span class="icon-arrow icon-next"></span>
          </div>
        </a>
        <div class="pokemon__name__page">
          <div>Ivysaur<span id="pokemon__id__page">#0002</span></div>
        </div>
      </nav>
        `
  );

  const pokemonPage = document.createElement('article');
  pokemonPage.classList.add('pokemon-page');

  const pokemonPageContainer = document.createElement('div');
  pokemonPageContainer.classList.add('pokemon-page__container');

  const pokemonPageContainerColumn1 = document.createElement('div');
  pokemonPageContainerColumn1.classList.add(
    'pokemon-page__container__column-1'
  );

  pokemonPageContainerColumn1.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="pokemon-page__img__wrapper">
        <img
          class="pokemon-page__img"
          src="./image/not-images.png"
          alt="pokemon image"
        />
      </div>
      <div class="pokemon-page__stats-info">
        <h3 class="pokemon-page__stats-info__tittle">Stats</h3>
        <ul class="pokemon-page__stats-table">
        ${createGrapOnStatsPokemonPage('HP', quantityCellGraphPokemonPage, 3)}
        ${createGrapOnStatsPokemonPage(
          'Attack',
          quantityCellGraphPokemonPage,
          4
        )}
        ${createGrapOnStatsPokemonPage(
          'Defense',
          quantityCellGraphPokemonPage,
          5
        )}
        ${createGrapOnStatsPokemonPage(
          'Special-Attack',
          quantityCellGraphPokemonPage,
          1
        )}
        ${createGrapOnStatsPokemonPage(
          'Special-Defense',
          quantityCellGraphPokemonPage,
          4
        )}
        ${createGrapOnStatsPokemonPage(
          'Special-Defense',
          quantityCellGraphPokemonPage,
          7
        )}
        </ul>
    `
  );

  const pokemonPageContainerColumn2 = document.createElement('div');
  pokemonPageContainerColumn2.classList.add(
    'pokemon-page__container__column-2'
  );

  pokemonPageContainerColumn2.insertAdjacentHTML(
    'afterbegin',
    `
      <p class="pokemon-page__description">
        The more sunlight Ivysaur bathes in, the more strength wells up
        within it, allowing the bud on its back to grow larger.
      </p>
      <div class="pokemon-page__version">
        <h3>Versions:</h3>
        <span class="circle-wrapper__icon-pokeball--blue">
          <span class="icon-pokeball blue"></span>
        </span>
        <span
          class="circle-wrapper__icon-pokeball--red circle-wrapper__not-active">
          <span class="icon-pokeball red"></span>
        </span>
      </div>
      <div class="pokemon-page__info">
        <div class="pokemon-page__info__column1">
          <ul class="pokemon-page__info__list">
            ${createPokemonPageInfo('Height', 'text')}
            ${createPokemonPageInfo('Weight', 'text')}
            ${createPokemonPageInfo('Gender', 'text')}
          </ul>
        </div>
        <div class="pokemon-page__info__column2">
          <ul class="pokemon-page__info__list">
            ${createPokemonPageInfo('Category', 'text')}
            ${createPokemonPageInfo('Abilities', 'text')}
          </ul>
        </div>
      </div>

      <h3 class="pokemon-page__tittle-type">Type</h3>
      <ul class="pokemon__set-of-forces" id="${id}">
        <li class="pokemon__type-of-force">Grass</li>
        <li class="pokemon__type-of-force">Poison</li>
      </ul>

      <h3 class="pokemon-page__tittle-type">Weaknesses</h3>
      <ul class="pokemon__set-of-forces">
        <li class="pokemon__type-of-force">Grass</li>
        <li class="pokemon__type-of-force">Poison</li>
        <li class="pokemon__type-of-force">Grass</li>
        <li class="pokemon__type-of-force">Poison</li>
      </ul>
    `
  );

  renderThePokemonType(pokemon, document.getElementById(id));

  pokemonPageContainer.append(
    pokemonPageContainerColumn1,
    pokemonPageContainerColumn2
  );
  pokemonPage.append(pokemonPageContainer);

  pokedexPokemonDetails.append(pokemonPageNavigation, pokemonPage);
  container.append(pokedexPokemonDetails);
};

renderPokemonPage();
