import './css/common.scss';
import countryCardTpl from './templates/country-cards.hbs';
import debounce from "lodash.debounce";
//import template from "handlebars-loader";

const refs = {
    cardCountainer: document.querySelector('description'),
};

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.form-input');
    input.addEventListener('input', debounce((e) => {
        e.preventDefault();

        const currInput = e.target;
        const searchQuery = currInput && currInput.value;

        fetchCountrybyId(searchQuery)
            .then(renderCountryCard)
            .catch(error => console.log(error))
            .finally(() => { currInput.value =''; });
    }, 500));
});

function fetchCountrybyId(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => {
            return response.json();
        });
}

function renderCountryCard(countries) {
  const cardCountainer = document.querySelector('.description');
  if (countries && countries.length > 0) {
    countries.forEach((country) => {
      const block = document.createElement('div');
      const markup = countryCardTpl(country);
      block.innerHTML = markup;
      cardCountainer.appendChild(block);
    })
  }
}

