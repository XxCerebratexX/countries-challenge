const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const port = 8003;
// Setup empty JS object to act as endpoint for all routes
// Require Express to run server and routes
const express = require('express');
const app = express({ origin: true });
const savedTrip = [];
// Start up an instance of app
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
dotenv.config();
app.use(express.static('dist'));
app.use(cors({ origin: true }));

// Setup Server
app.get("/getCountries", getCountries);
app.get("/getCountriesByName", getCountriesDataByName);

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

const headersForGetCall = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
};

async function getCountries(req, res) {
    const response = await fetch('https://restcountries.eu/rest/v2/all?fields=name', headersForGetCall).then(res => res.json()).then(data => {
        console.log("Call was successful");
        return data;
    }).catch(err => {
        console.log(err);
        return handleError(err, "REST Countries");
    });
    /*  //this block of code can function as well in case the REST didn't had the query filter option
    if(response !== null && response.length){
        let countriesRes = response.map(el => {
            return {name: el.name};
        });

    res.send({countriesRes})
    } else {
        res.send({
            type: 'Error',
            message: "Call was succesful but data for countries is empty"
        });
    } */
    res.send({ response })
}

async function getCountriesDataByName(req, res) {
    console.log(req.query);
    if (req.query.name) {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${req.query.name}?fields=name;region;currencies;languages;population`, headersForGetCall)
            .then(res => res.json()).then(data => data).catch(err => handleError(err, 'REST Countries'));

        /* //this block of code can function as well in case the REST didn't had the query filter option as above
        if (response !== null && response.length) {
            let countriesRes = response.map(el => {
                return { 
                    name: el.name,
                    region: el.region,
                    currencies: el.currencies,
                    languages: el.languages,
                    population: el.population
                 };
            });

            res.send({ countriesRes })
        } else {
            res.send({
                type: 'Error',
                message: "Call was succesful but data for countries is empty"
            });
        } */

        res.send({ response })
    }
}

function handleError(err, api) {
    return {
        type: 'Error',
        message: err.message.replace(/((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g, api) || 'Something went wrong, try again later',
        from: api
    };
}

function handleErrorResponse(...arg) {
    for (let element of arg) {
        if (element.type === "Error" || element.error) {
            return element;
        }
    }
}
module.exports = app;