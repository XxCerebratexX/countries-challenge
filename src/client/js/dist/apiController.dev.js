"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountriesList = getCountriesList;
exports.getCountryInfo = getCountryInfo;
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
//# sourceMappingURL=apiController.dev.js.map
