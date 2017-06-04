(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mappa"] = factory();
	else
		root["Mappa"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token, expected , (40:4)\n\n\u001b[0m \u001b[90m 38 | \u001b[39m  mapbox\u001b[33m:\u001b[39m {\n \u001b[90m 39 | \u001b[39m    url\u001b[33m:\u001b[39m \u001b[32m'https://api.mapbox.com/v4/'\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 40 | \u001b[39m    options\u001b[33m:\u001b[39m \n \u001b[90m    | \u001b[39m    \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 41 | \u001b[39m  }\n \u001b[90m 42 | \u001b[39m}\n \u001b[90m 43 | \u001b[39m\u001b[0m\n");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staticMappa = undefined;

var _mapProviders = __webpack_require__(0);

var staticMappa = function staticMappa(provider, key, args) {
  var PROVIDER = _mapProviders.staticProviders[provider],
      URL = PROVIDER.url,
      OPTIONS = {};

  if (Array.isArray(args)) {
    args.map(function (el, i) {
      var option = PROVIDER.options[i];
      OPTIONS[option] = el;
    });
  } else {
    OPTIONS = args;
  }
  OPTIONS.key = key;

  for (var option in OPTIONS) {
    if (option == 'width' || option == 'height') {
      OPTIONS.size = OPTIONS.width + 'x' + OPTIONS.height;
      delete OPTIONS.width;
      delete OPTIONS.height;
    } else if (option == 'lat' || option == 'lng') {
      OPTIONS.center = OPTIONS.lat + ',' + OPTIONS.lng;
      delete OPTIONS.lat;
      delete OPTIONS.lng;
    }
  }

  for (var _option in OPTIONS) {
    OPTIONS[_option] != null ? URL += '&' + _option + '=' + OPTIONS[_option] : null;
  }

  return URL;
}; // Static Maps

exports.staticMappa = staticMappa;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* Mappa: A simple library to work with maps and p5.js
* https://github.com/cvalenzuela/p5.maps
*
* Cristóbal Valenzuela
* Google Summer of Code 2017
*/



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapProviders = __webpack_require__(0);

var _staticMappa = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('%c p5.maps Loaded ', 'color:white; background:black;');

var Mappa = function () {
  function Mappa(provider, key) {
    _classCallCheck(this, Mappa);

    this.provider = provider || 'google';
    this.key = key || null;
    this.staticMaps = [];
    this.init();
  }

  _createClass(Mappa, [{
    key: 'init',
    value: function init() {
      (0, _mapProviders.addLibrary)(this.provider, this.key);
    }
  }, {
    key: 'staticMap',
    value: function staticMap() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _typeof(args[0]) == 'object' ? args = args[0] : null;
      var staticMap = (0, _staticMappa.staticMappa)(this.provider, this.key, args);
      this.staticMaps.push(staticMap);
      return staticMap;
    }
  }]);

  return Mappa;
}();

module.exports = Mappa;

/***/ })
/******/ ]);
});