import './css/style.css';
import fetchCountries from './fetchCountries.js';
import countryCardTpl from './templates/country-cards.hbs';
import countriesListTemplate from './templates/countriesListTemplate.hbs';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';


const cardCountainer = document.querySelector('.description');

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector('.form-input');
  input.addEventListener('input', debounce((e) => {
    e.preventDefault();

    const currInput = e.target;
    const searchQuery = currInput && currInput.value;
    clearListItems();
    fetchCountries(searchQuery)
      .then(renderCountryCard)
      .catch(error => console.log('Error: ', error))
      .finally(() => { currInput.value = ''; });
  }, 1000));
});

function handleSingleCountry(country) {
  const cardCountainer = document.querySelector('.description');
  const block = document.createElement('div');
  const markup = countryCardTpl(country);
  block.innerHTML = markup;
  cardCountainer.appendChild(block);
}

function handleMultipleCountries(countries) {
  const cardCountainer = document.querySelector('.description');
  countries.forEach((country) => {
    const block = document.createElement('li');
    block.innerHTML = country && country.name;
    cardCountainer.appendChild(block);
  })
}

function renderCountryCard(countries) {
  if (!countries || countries.length === 0) return;

  if (countries.length === 1) {
    handleSingleCountry(countries[0]);
  } else if (countries.length > 2 && countries.length <= 10) {
    handleMultipleCountries(countries);
  } else if (countries.length > 10) {
      PNotify.defaults.styling = 'material';
      PNotify.error({
        title: 'Oh No!',
        text: 'Too many matches found.Please enter a more specific query',
      });
  }
}

function clearListItems() {
  cardCountainer.innerHTML = '';
}

/*const refs = {
  searchForm: document.querySelector('.search-form'),
  countryList: document.querySelector('.description'),
  searchInput: document.querySelector('.form-input'),
};

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

refs.searchForm.addEventListener(
  'input',
  debounce(e => {
    searchFormInputHandler(e);
  }, 500),
);

function searchFormInputHandler(e) {
  const searchQuery = e.target.value;

  clearListItems();

  fetchCountries(searchQuery).then(data => {
    const markup = buildListItemMarkup(data);
    const renderCountriesList = buildCountriesList(data);
    if (!data) {
      return;
    } else if (data.length > 10) {
      PNotify.defaults.styling = 'material';
      PNotify.error({
        title: 'Oh No!',
        text: 'Too many matches found.Please enter a more specific query',
      });
    } else if (data.length >= 2 && data.length <= 10) {
      insertListItem(renderCountriesList);
    } else if (data.length === 1) {
      insertListItem(markup);
    } else {
      alert('Ничего не найдено.Корректно введите запрос');
    }
  });
}

function insertListItem(items) {
  refs.countryList.insertAdjacentHTML('beforeend', items);
}

function buildCountriesList(items) {
  return countriesListTemplate(items);
}

function buildListItemMarkup(items) {
  return countryCardTpl(items);
}

function clearListItems() {
  refs.countryList.innerHTML = '';
}
*/
