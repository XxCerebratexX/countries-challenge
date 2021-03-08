import "./styles/style.scss";

import {
    getCountriesList,
    getCountryInfo,
    createCard,
    countries
} from "./js/apiController"
document.addEventListener('DOMContentLoaded', () => {

    getCountriesList()
    let searchBar = document.getElementById('search-bar');

    function autoComplete() {
        searchBar.addEventListener('input', (e) => {
            let div1, div2;
            closeList();
            let searchValue = searchBar.value;
            if (searchValue.length >= 3) {
                let countryReturn = [];
                document.getElementById('submit-search').disabled = false;

                div1 = document.createElement('div');
                div1.setAttribute('id', `${searchBar.id}-autocomplete`);
                div1.setAttribute('class', 'autocomplete-list');
                searchBar.parentNode.appendChild(div1);

                countries.forEach(el => {
                    if (el.name.substr(0, searchValue.length).toLowerCase() === searchValue.toLowerCase()) {
                        countryReturn.push(el);
                        div2 = document.createElement('div');
                        div2.innerHTML = `<strong>${el.name.substr(0, searchValue.length)}</strong>`;
                        div2.innerHTML += el.name.substr(searchValue.length);
                        div2.innerHTML += `<input type='hidden' value='${el.name}'>`;
                        div2.addEventListener('click', (ev) => {
                            let newValue = ev.target.getElementsByTagName('input')[0].value;
                            searchBar.value = newValue;
                            closeList();
                        })
                        div1.appendChild(div2);
                    }
                });
            } else {
                document.getElementById('submit-search').disabled = true;
            }
        });
    }

    function searchCountry() {
        document.getElementById('submit-search').addEventListener('click', async(e) => {
            let info = await getCountryInfo(searchBar.value);
            console.log(info);
            createCard(info.response);
        })

    }

    document.addEventListener("click", (e) => {
        closeList(e.target);
    })

    function closeList(element) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-list");
        for (var i = 0; i < x.length; i++) {
            if (element != x[i] && element != searchBar) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    autoComplete();
    searchCountry();
    closeList();
})

export {
    getCountriesList,
    getCountryInfo,
    createCard
}