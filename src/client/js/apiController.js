import fetch from "node-fetch";

let countries;
const headers = {
    method: "GET",
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
};

async function getCountriesList() {

    let restCall = await fetch('http://localhost:8003/getCountries', headers)
        .then(response => {
            if (!response.ok) {
                throw response;
            } else {
                return response;
            }
        })
        .then(res => res.json())
        .then(resp => {
            return resp;
        }).catch(err => err.json()).then(error => error);

    countries = restCall.response;
}

async function getCountryInfo(value) {

    let restCall = await fetch(`http://localhost:8003/getCountriesbyName?name=${value}`, headers)
        .then(response => {
            if (!response.ok) {
                throw response;
            } else {
                return response;
            }
        }).then(res => res.json())
        .then(resp => resp)
        .catch(err => err.json()).then(error => error);
    return restCall;

}

function createCard(array) {
    array.forEach(el => {
                console.log(el)
                let DOMObject = document.createElement('div');
                DOMObject.setAttribute('class', 'country-card');
                let heading = document.createElement('h2')
                heading.innerText = el.name;
                DOMObject.appendChild(heading);

                let info = document.createElement('div');
                info.setAttribute('class', 'country-info');

                let region = document.createElement('div');
                region.setAttribute('class', 'region');
                region.innerHTML = `<div class="region"><span>Region: ${el.region}</span></div>`

                let population = document.createElement('div');
                population.setAttribute('class', 'population');
                population.innerHTML = `<div class="population"><span>Population: ${el.population}</span></div>`

                let currencies = document.createElement('ul');
                currencies.setAttribute('class', 'currency');
                currencies.innerHTML = el.currencies.map(currency => {
                    return ` Currency(ies)
                <li>Symbol: ${currency.symbol}</li> 
                <li>Code: ${currency.code} </li> 
                <li>Name: ${currency.name} </li>`
                });

                let languages = document.createElement('ul');
                languages.setAttribute('class', 'language');
                languages.innerHTML = `Language(s): ${el.languages.map(language => {
            return `<li> ${language.nativeName} </li>`
        })}`

        info.appendChild(region);
        info.appendChild(currencies);
        info.appendChild(languages);
        info.appendChild(population);

        DOMObject.appendChild(info);
        document.getElementById('main-body').appendChild(DOMObject);
    })
}
export { countries, getCountriesList, getCountryInfo, createCard }