"use strict";

var fetch = require('node-fetch');

var bodyParser = require('body-parser');

var mockAPIResponse = require('./mockAPI.js');

var dotenv = require('dotenv');

var port = 8003; // Setup empty JS object to act as endpoint for all routes
// Require Express to run server and routes

var express = require('express');

var app = express({
  origin: true
});
var savedTrip = []; // Start up an instance of app

app.listen(port, function () {
  console.log("Server is running on ".concat(port));
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var cors = require('cors');

dotenv.config();
app.use(express["static"]('dist'));
app.use(cors({
  origin: true
})); // Setup Server

app.get("/getCountries", getCountries);
app.get("/getCountriesByName", getCountriesDataByName);
app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});
var headersForGetCall = {
  method: "GET",
  headers: {
    'Content-Type': 'application/json'
  }
};

function getCountries(req, res) {
  var response;
  return regeneratorRuntime.async(function getCountries$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('https://restcountries.eu/rest/v2/all?fields=name', headersForGetCall).then(function (res) {
            return res.json();
          }).then(function (data) {
            console.log("Call was successful");
            return data;
          })["catch"](function (err) {
            console.log(err);
            return handleError(err, "REST Countries");
          }));

        case 2:
          response = _context.sent;

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
          res.send({
            response: response
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getCountriesDataByName(req, res) {
  var response;
  return regeneratorRuntime.async(function getCountriesDataByName$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.query);

          if (!req.query.name) {
            _context2.next = 6;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch("https://restcountries.eu/rest/v2/name/".concat(req.query.name, "?fields=name;region;currencies;languages;population"), headersForGetCall).then(function (res) {
            return res.json();
          }).then(function (data) {
            return data;
          })["catch"](function (err) {
            return handleError(err, 'REST Countries');
          }));

        case 4:
          response = _context2.sent;

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
          res.send({
            response: response
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function handleError(err, api) {
  return {
    type: 'Error',
    message: err.message.replace(/((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g, api) || 'Something went wrong, try again later',
    from: api
  };
}

function handleErrorResponse() {
  for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
    arg[_key] = arguments[_key];
  }

  for (var _i = 0, _arg = arg; _i < _arg.length; _i++) {
    var element = _arg[_i];

    if (element.type === "Error" || element.error) {
      return element;
    }
  }
}

module.exports = app;
//# sourceMappingURL=server.dev.js.map
