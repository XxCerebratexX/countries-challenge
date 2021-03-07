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
export { countries, getCountriesList}
