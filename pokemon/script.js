'use strict';
const POKEMON_API = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 12;
let pokemonOffset = 0;
const START_ID = '#0000';
const quantityCellGraphPokemonPage = 15;
const listGraphStats = [
  'HP',
  'Attack',
  'Defense',
  'Special-Attack',
  'Special-Defense',
  'Speed',
];

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
const cardCatalogButton = document.querySelector(
  '.container__wrapper-for-button'
);
const container = document.querySelector('.container');
const home = document.querySelector('.home');

let dataPokemons = [];

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

const hideCardCatalog = function () {
  cardCatalog.style.display = 'none';
  cardCatalogButton.style.display = 'none';
};

const showCardCatalog = function () {
  cardCatalog.style.display = 'flex';
  cardCatalogButton.style.display = 'flex';
};

const formId = function (id) {
  return START_ID.slice(-START_ID.length, -String(id).length) + id;
};

const formName = function (name) {
  return name.replace(name[0], name[0].toUpperCase());
};

const generatePokemonCard = function (pokemon) {
  const { img, id, name } = pokemon;

  cardCatalog.insertAdjacentHTML(
    'beforeend',
    `     <div class="pokemon-card" id="${id}">
            <div class="pokemon-card__image">
              <img class="imgPC "src="${
                img === '' ? './image/not-images.png' : img
              }" alt="image pokemon">
            </div>
            <div class="pokemon-card__info">
              <p class="pokemon-card__id">${formId(id)}</p>
              <h2 class="pokemon-card__name">${formName(
                name.length < 15 ? name : name.slice(0, 15) + '...'
              )}</h2>
              <div class="pokemon-card__set-of-forces" id=${formId(id)}></div>
            </div>
          </div>`
  );
  renderThePokemonType(pokemon, document.getElementById(formId(id)));
};

const addAllPokemonCards = async function () {
  await getPokemons();

  for (let i = 0; i < POKEMON_LIMIT; i++) {
    generatePokemonCard(dataPokemons[pokemonOffset]);
    pokemonOffset++;
  }
};

const fetchPokemonData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const getPokemons = async function () {
  try {
    const data = await fetch(
      `${POKEMON_API}/pokemon?limit=${POKEMON_LIMIT}&offset=${pokemonOffset}`
    );

    const pokemons = await data.json();

    let arrURL = pokemons.results.map((pokemon) => pokemon.url);

    const pokemonsObjects = await Promise.all(
      arrURL.map(async (url) => {
        return await fetchPokemonData(url);
      })
    );

    pokemonsObjects.forEach(async (pokemon) => {
      const obj = {
        img: pokemon.sprites.other.dream_world.front_default,
        id: pokemon.id,
        name: pokemon.name,
        setOfForces: pokemon.types.map((power) =>
          power.type.name.replace(
            power.type.name[0],
            power.type.name[0].toUpperCase()
          )
        ),
        abilities: pokemon.abilities[0].ability.name,
        height: pokemon.height,
        weight: pokemon.weight,
        stats: pokemon.stats,
      };
      dataPokemons.push(obj);
    });
  } catch (e) {
    console.log(e);
  }
};

cardCatalogButton.addEventListener('click', async () => {
  addAllPokemonCards();
});

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

const renderThePokemonTypeForPage = function (setOfForces) {
  let result = '';

  for (let i = 0; i < setOfForces.length; i++) {
    result += `<li class="pokemon__type-of-force" style="background: ${
      pokemonTypeDatabase[setOfForces[i]].backgroundColor
    }; color: ${pokemonTypeDatabase[setOfForces[i]].textColor}">${
      setOfForces[i]
    }</li>`;
  }

  return result;
};

const renderPokemonPage = async function (pokemon) {
  const { id, img, name, abilities, height, setOfForces, stats, weight } =
    pokemon;

  // const fetchDescription = await fetchPokemonData(
  //   `${POKEMON_API}/characteristic/${id}`
  // );

  const fetchGenderFemale = await fetchPokemonData(`${POKEMON_API}/gender/1`);
  const fetchGenderMale = await fetchPokemonData(`${POKEMON_API}/gender/2`);
  const fetchGenderGenderless = await fetchPokemonData(
    `${POKEMON_API}/gender/3`
  );

  let gender = '';

  fetchGenderMale.pokemon_species_details.some(
    (detail) => detail.pokemon_species.name === name
  )
    ? (gender += 'Female ')
    : (gender += '');

  fetchGenderFemale.pokemon_species_details.some(
    (detail) => detail.pokemon_species.name === name
  )
    ? (gender += 'Male ')
    : (gender += '');

  fetchGenderGenderless.pokemon_species_details.some(
    (detail) => detail.pokemon_species.name === name
  )
    ? (gender = 'Unknow')
    : '';

  // const description = fetchDescription.descriptions[7].description || 'awdf';

  const pokedexPokemonDetails = document.createElement('section');
  pokedexPokemonDetails.classList.add('pokedex-pokemon-details');

  const pokemonPageNavigation = document.createElement('nav');
  pokemonPageNavigation.classList.add('pokemon-page__navigation');
  console.log();
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
          <div>${formName(name)}<span id="pokemon__id__page">${formId(
      id
    )}</span></div>
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
          src="${img}"
          alt="pokemon image"
        />
      </div>
      <div class="pokemon-page__stats-info">
        <h3 class="pokemon-page__stats-info__tittle">Stats</h3>
        <ul class="pokemon-page__stats-table">
        ${createGrapOnStatsPokemonPage(
          'HP',
          quantityCellGraphPokemonPage,
          Math.floor(stats[0].base_stat / quantityCellGraphPokemonPage)
        )}
        ${createGrapOnStatsPokemonPage(
          'Attack',
          quantityCellGraphPokemonPage,
          Math.floor(stats[1].base_stat / quantityCellGraphPokemonPage)
        )}
        ${createGrapOnStatsPokemonPage(
          'Defense',
          quantityCellGraphPokemonPage,
          Math.floor(stats[2].base_stat / quantityCellGraphPokemonPage)
        )}

        ${createGrapOnStatsPokemonPage(
          'Special-Attack',
          quantityCellGraphPokemonPage,
          Math.floor(stats[3].base_stat / quantityCellGraphPokemonPage)
        )}
        ${createGrapOnStatsPokemonPage(
          'Special-Defense',
          quantityCellGraphPokemonPage,
          Math.floor(stats[4].base_stat / quantityCellGraphPokemonPage)
        )}
        ${createGrapOnStatsPokemonPage(
          'Speed',
          quantityCellGraphPokemonPage,
          Math.floor(stats[5].base_stat / quantityCellGraphPokemonPage)
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
        ${'здесь должно быть описание'}
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
            ${createPokemonPageInfo('Height', height)}
            ${createPokemonPageInfo('Weight', weight)}
            ${createPokemonPageInfo('Gender', gender)}
          </ul>
        </div>
        <div class="pokemon-page__info__column2">
          <ul class="pokemon-page__info__list">
            ${createPokemonPageInfo('Category', 'text')}
            ${createPokemonPageInfo('Abilities', abilities)}
          </ul>
        </div>
      </div>

      <h3 class="pokemon-page__tittle-type">Type</h3>
      <ul class="pokemon__set-of-forces">
          ${renderThePokemonTypeForPage(setOfForces)}
      </ul>

      <h3 class="pokemon-page__tittle-type">Weaknesses</h3>
      <ul class="pokemon__set-of-forces">
          ${renderThePokemonTypeForPage(['Grass', 'Poison', 'Grass', 'Poison'])}
      </ul>
    `
  );

  pokemonPageContainer.append(
    pokemonPageContainerColumn1,
    pokemonPageContainerColumn2
  );
  pokemonPage.append(pokemonPageContainer);

  pokedexPokemonDetails.append(pokemonPageNavigation, pokemonPage);
  container.append(pokedexPokemonDetails);
};

home.addEventListener('click', () => {
  showCardCatalog();
  document.querySelector('.pokedex-pokemon-details').remove();
});

cardCatalog.addEventListener('click', function (event) {
  const card = event.target.closest('.pokemon-card');
  if (card) {
    renderPokemonPage(dataPokemons[+card.id - 1]);
    hideCardCatalog();
  }
});
