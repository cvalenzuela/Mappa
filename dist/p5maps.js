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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Module to add maps providers libraries and store static URL's

// Map Provider libraries
var addLibrary = function addLibrary(provider, key) {
  var vendor = void 0;
  !key ? console.warn('Plase provide an API key for your map provider.') : null;

  if (provider === 'google') {
    vendor = 'https://maps.googleapis.com/maps/api/js';
    key && (vendor += '?key=' + key);
  } else if (provider === 'mapbox' && key != null) {
    vendor = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
  } else if (provider === 'osm') {
    vendor = null;
  } else if (provider === 'mapzen') {
    vendor = null;
  } else {
    vendor = null;
  }

  if (!document.getElementById(provider)) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = vendor;
    s.id = provider;
    document.head.appendChild(s);
  }
};

// Static URL
var staticProviders = {
  google: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature'],
    parser: function parser(OPTIONS) {
      var url = 'https://maps.googleapis.com/maps/api/staticmap?';
      for (var option in OPTIONS) {
        OPTIONS[option] != undefined && (url += '&' + option + '=' + OPTIONS[option]);
      }return url;
    }
  },
  mapbox: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'bearing', 'pitch', 'style', 'username', 'overlay', 'at', 'attribution', 'logo', 'before_layer', 'center', 'size'],
    parser: function parser(OPTIONS) {
      var url = 'https://api.mapbox.com/styles/v1/';
      var center = OPTIONS.center.split(',');
      OPTIONS.username != undefined ? url += OPTIONS.username + '/' : url += 'mapbox/';
      OPTIONS.style != undefined ? url += OPTIONS.style + '/' : url += 'streets-v10/';
      url += 'static/';
      OPTIONS.overlay != undefined && (url += OPTIONS.overlay + '/');
      url += center[1] + ',' + center[0] + ',';
      OPTIONS.auto == false || OPTIONS.auto == undefined ? ['zoom', 'bearing', 'pitch'].forEach(function (e, i) {
        OPTIONS[e] != undefined ? url += OPTIONS[e] : url += 0;
        i < 2 && (url += ',');
      }) : url += 'auto';
      url += '/' + OPTIONS.size;
      OPTIONS.scale != undefined && (url += '@' + OPTIONS.scale);
      url += '?access_token=' + OPTIONS.key;
      !OPTIONS.attribution && (url += '&attribution=false');
      !OPTIONS.logo && (url += '&logo=false');
      !OPTIONS.before_layer && (url += '&before_layer=' + OPTIONS.before_layer);
      return url;
    }
  }
};

exports.addLibrary = addLibrary;
exports.staticProviders = staticProviders;

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
  OPTIONS.size = OPTIONS.width + 'x' + OPTIONS.height;
  OPTIONS.center = OPTIONS.lat + ',' + OPTIONS.lng;
  ['width', 'height', 'lat', 'lng'].forEach(function (e) {
    return delete OPTIONS[e];
  });

  return PROVIDER.parser(OPTIONS);
}; // Static Maps

exports.staticMappa = staticMappa;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* Mappa: A library to work with maps and p5.js
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
    this.key = key || undefined;
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

      _typeof(args[0]) == 'object' && (args = args[0]);
      var staticMap = (0, _staticMappa.staticMappa)(this.provider, this.key, args);
      this.staticMaps.push(staticMap);
      return staticMap;
    }

    // check amount of request ot prevent max amount of api's

  }]);

  return Mappa;
}();

module.exports = Mappa;

/***/ })
/******/ ]);
});