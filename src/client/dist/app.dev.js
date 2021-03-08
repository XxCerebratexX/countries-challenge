"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getCountriesList", {
  enumerable: true,
  get: function get() {
    return _apiController.getCountriesList;
  }
});
Object.defineProperty(exports, "getCountryInfo", {
  enumerable: true,
  get: function get() {
    return _apiController.getCountryInfo;
  }
});
Object.defineProperty(exports, "createCard", {
  enumerable: true,
  get: function get() {
    return _apiController.createCard;
  }
});

require("./styles/style.scss");

var _apiController = require("./js/apiController");

document.addEventListener('DOMContentLoaded', function () {
  (0, _apiController.getCountriesList)();
  var searchBar = document.getElementById('search-bar');

  function autoComplete() {
    searchBar.addEventListener('input', function (e) {
      var div1, div2;
      closeList();
      var searchValue = searchBar.value;

      if (searchValue.length >= 3) {
        var countryReturn = [];
        document.getElementById('submit-search').disabled = false;
        div1 = document.createElement('div');
        div1.setAttribute('id', "".concat(searchBar.id, "-autocomplete"));
        div1.setAttribute('class', 'autocomplete-list');
        searchBar.parentNode.appendChild(div1);

        _apiController.countries.forEach(function (el) {
          if (el.name.substr(0, searchValue.length).toLowerCase() === searchValue.toLowerCase()) {
            countryReturn.push(el);
            div2 = document.createElement('div');
            div2.innerHTML = "<strong>".concat(el.name.substr(0, searchValue.length), "</strong>");
            div2.innerHTML += el.name.substr(searchValue.length);
            div2.innerHTML += "<input type='hidden' value='".concat(el.name, "'>");
            div2.addEventListener('click', function (ev) {
              var newValue = ev.target.getElementsByTagName('input')[0].value;
              searchBar.value = newValue;
              closeList();
            });
            div1.appendChild(div2);
          }
        });
      } else {
        document.getElementById('submit-search').disabled = true;
      }
    });
  }

  function searchCountry() {
    document.getElementById('submit-search').addEventListener('click', function _callee(e) {
      var info;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _apiController.getCountryInfo)(searchBar.value));

            case 2:
              info = _context.sent;
              console.log(info);
              (0, _apiController.createCard)(info.response);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  }

  document.addEventListener("click", function (e) {
    closeList(e.target);
  });

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
});
//# sourceMappingURL=app.dev.js.map
