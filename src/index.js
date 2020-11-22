import './css/common.scss';
import countryCardTpl from './templates/country-cards.hbs';

const refs = {
    cardCountainer: document.querySelector('form-input'),
};

refs.cardContainer.addEventListener('input', _.debounce((e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;

    fetchCountrybyId(searchQuery)
      .then(renderCountryCard)
      .catch(error => console.log(error))
      .finally(() => { form.reset(); });
  }, 500),);


function fetchCountrybyId(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => {
            return response.json();
        });
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.cardCountainer.innerHTML = markup;
    }

//console.log(toFindCountry);