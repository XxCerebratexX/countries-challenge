"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountriesList = getCountriesList;
exports.getCountryInfo = getCountryInfo;
exports.createCard = createCard;
exports.countries = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var countries;
exports.countries = countries;
var headers = {
  method: "GET",
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
};

function getCountriesList() {
  var restCall;
  return regeneratorRuntime.async(function getCountriesList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])('http://localhost:8003/getCountries', headers).then(function (response) {
            if (!response.ok) {
              throw response;
            } else {
              return response;
            }
          }).then(function (res) {
            return res.json();
          }).then(function (resp) {
            return resp;
          })["catch"](function (err) {
            return err.json();
          }).then(function (error) {
            return error;
          }));

        case 2:
          restCall = _context.sent;
          exports.countries = countries = restCall.response;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getCountryInfo(value) {
  var restCall;
  return regeneratorRuntime.async(function getCountryInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])("http://localhost:8003/getCountriesbyName?name=".concat(value), headers).then(function (response) {
            if (!response.ok) {
              throw response;
            } else {
              return response;
            }
          }).then(function (res) {
            return res.json();
          }).then(function (resp) {
            return resp;
          })["catch"](function (err) {
            return err.json();
          }).then(function (error) {
            return error;
          }));

        case 2:
          restCall = _context2.sent;
          return _context2.abrupt("return", restCall);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function createCard(array) {
  array.forEach(function (el) {
    console.log(el);
    var DOMObject = document.createElement('div');
    DOMObject.setAttribute('class', 'country-card');
    var heading = document.createElement('h2');
    heading.innerText = el.name;
    DOMObject.appendChild(heading);
    var info = document.createElement('div');
    info.setAttribute('class', 'country-info');
    var region = document.createElement('div');
    region.setAttribute('class', 'region');
    region.innerHTML = "<div class=\"region\"><span>Region: ".concat(el.region, "</span></div>");
    var population = document.createElement('div');
    population.setAttribute('class', 'population');
    population.innerHTML = "<div class=\"population\"><span>Population: ".concat(el.population, "</span></div>");
    var currencies = document.createElement('ul');
    currencies.setAttribute('class', 'currency');
    currencies.innerHTML = el.currencies.map(function (currency) {
      return " Currency(ies)\n                <li>Symbol: ".concat(currency.symbol, "</li> \n                <li>Code: ").concat(currency.code, " </li> \n                <li>Name: ").concat(currency.name, " </li>");
    });
    var languages = document.createElement('ul');
    languages.setAttribute('class', 'language');
    languages.innerHTML = "Language(s): ".concat(el.languages.map(function (language) {
      return "<li> ".concat(language.nativeName, " </li>");
    }));
    info.appendChild(region);
    info.appendChild(currencies);
    info.appendChild(languages);
    info.appendChild(population);
    DOMObject.appendChild(info);
    document.getElementById('main-body').appendChild(DOMObject);
  });
}
//# sourceMappingURL=apiController.dev.js.map
