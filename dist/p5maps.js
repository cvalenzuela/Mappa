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
/* 0 */,
/* 1 */,
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

var _staticMapProviders = __webpack_require__(5);

var _StaticMappa = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('%c p5.maps Loaded ', 'color:white; background:black;');

var Mappa = function () {
  function Mappa(provider, key) {
    _classCallCheck(this, Mappa);

    this.provider = provider;
    this.key = key;
    this.provider && this.init();
  }

  _createClass(Mappa, [{
    key: 'init',
    value: function init() {
      (0, _staticMapProviders.addLibrary)(this.provider, this.key);
    }
  }, {
    key: 'staticMap',
    value: function staticMap() {
      var OPTIONS = {};

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_typeof(args[0]) == 'object') {
        OPTIONS = Object.assign({}, args[0]);
      } else {
        args.forEach(function (el, i) {
          var option = PROVIDER.options[i];
          OPTIONS[option] = el;
        });
      };
      OPTIONS.key = this.key;

      return new _StaticMappa.StaticMappa(this.provider, OPTIONS);
    }
    // check amount of request ot prevent max amount of api's

  }]);

  return Mappa;
}();

module.exports = Mappa;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticMappa = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Static Maps

var _consoleMessages = __webpack_require__(4);

var _staticMapProviders = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StaticMappa = function () {
  function StaticMappa(PROVIDER, OPTIONS) {
    _classCallCheck(this, StaticMappa);

    this.mapProvider = PROVIDER;
    this.mapConstructor = _staticMapProviders.staticMapProviders[PROVIDER];
    this.options = OPTIONS;
    this.img = this.image();
  }

  _createClass(StaticMappa, [{
    key: 'image',
    value: function image() {
      (0, _staticMapProviders.adjustSize)(this.mapProvider, this.options);
      return this.mapConstructor.urlParser(this.options);
    }
  }, {
    key: 'latLng',
    value: function latLng(lat, lng) {
      return {
        x: this.fromLngToPoint(lng) - this.fromLngToPoint(this.options.lng) + this.options.width / (2 / this.options.scale),
        y: this.fromLatToPoint(lat) - this.fromLatToPoint(this.options.lat) + this.options.height / (2 / this.options.scale)
      };
    }
  }, {
    key: 'fromLatToPoint',
    value: function fromLatToPoint(l) {
      return this.options.pixels / PI * pow(2, this.options.zoom) * (PI - log(tan(PI / 4 + radians(l) / 2)));
    }
  }, {
    key: 'fromLngToPoint',
    value: function fromLngToPoint(l) {
      return this.options.pixels / PI * pow(2, this.options.zoom) * (radians(l) + PI);
    }
  }]);

  return StaticMappa;
}();

exports.StaticMappa = StaticMappa;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Collection of console messages


var warnings = {
  staticSize: {
    google: function google(s, m) {
      console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Google Maps Static API max ' + s + ' value is 640px. For larger images, change the scale to 2 and keep the ' + s + ' between 1-640px. i.e: if you want an image 800x800px, set the width and height to 400x400 and the scale to 2.');
    },
    mapbox: function mapbox(s, m) {
      console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Mapbox Static API max ' + s + ' value is 1024px.');
    }
  },
  noKey: console.warn('Plase provide an API key for your map provider.')
};

exports.warnings = warnings;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adjustSize = exports.staticMapProviders = exports.addLibrary = undefined;

var _consoleMessages = __webpack_require__(4);

// Map Provider libraries
var addLibrary = function addLibrary(provider, key) {
  var vendor = void 0;
  !key ? _consoleMessages.warnings.noKey : null;

  if (provider === 'google') {
    vendor = 'https://maps.googleapis.com/maps/api/js';
    key && (vendor += '?key=' + key);
  } else if (provider === 'mapbox' && key != null) {
    vendor = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
  } else if (provider === 'osm') {
    vendor = null;
  } else if (provider === 'mapzen') {
    vendor = null;
  } else if (provider === 'carto') {
    vendor = null;
  } else if (provider === 'mapquest') {
    vendor = null;
  } else {
    vendor = null;
  }

  // Add provider's library to DOM
  if (!document.getElementById(provider)) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = vendor;
    s.id = provider;
    document.head.appendChild(s);
  }
};

// Static URL
// Module to add maps providers libraries and store static URL's

var staticMapProviders = {
  google: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature'],
    urlParser: function urlParser(OPTIONS) {
      var url = 'https://maps.googleapis.com/maps/api/staticmap?';
      var _OPTIONS = Object.assign({}, OPTIONS);
      _OPTIONS.size = _OPTIONS.width + 'x' + _OPTIONS.height;
      _OPTIONS.center = _OPTIONS.lat + ',' + _OPTIONS.lng;
      !_OPTIONS.scale && (_OPTIONS.scale = 1);
      ['width', 'height', 'lat', 'lng'].forEach(function (e) {
        return delete _OPTIONS[e];
      });
      for (var option in _OPTIONS) {
        _OPTIONS[option] != undefined && (url += '&' + option + '=' + _OPTIONS[option]);
      }return url;
    }
  },
  mapbox: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'],
    urlParser: function urlParser(OPTIONS) {
      var url = 'https://api.mapbox.com/styles/v1/';
      OPTIONS.username != undefined ? url += OPTIONS.username + '/' : url += 'mapbox/';
      OPTIONS.style != undefined ? url += OPTIONS.style + '/' : url += 'streets-v10/';
      url += 'static/';
      OPTIONS.overlay != undefined && (url += OPTIONS.overlay + '/');
      url += OPTIONS.lng + ',' + OPTIONS.lat + ',';
      OPTIONS.auto == false || OPTIONS.auto == undefined ? ['zoom', 'bearing', 'pitch'].forEach(function (e, i) {
        OPTIONS[e] != undefined ? url += OPTIONS[e] : url += 0;
        i < 2 && (url += ',');
      }) : url += 'auto';
      url += '/' + OPTIONS.width + 'x' + OPTIONS.height;
      OPTIONS.scale == 2 && (url += '@2x');
      url += '?access_token=' + OPTIONS.key;
      !OPTIONS.attribution && (url += '&attribution=false');
      !OPTIONS.logo && (url += '&logo=false');
      !OPTIONS.before_layer && (url += '&before_layer=' + OPTIONS.before_layer);
      return url;
    }
  }
};

// Check the size and scale and adjust output to match requirements from providers when necessary
var adjustSize = function adjustSize(provider, options) {
  if (provider == 'google') {
    if (options.scale == 1 || options.scale == undefined) {
      options.pixels = 128;
      options.scale = 1;
    } else if (options.scale == 2) {
      options.pixels = 256;
    }
    if (options.width > 640) {
      _consoleMessages.warnings.staticSize.google('width', options.width);
      options.width = 640;
    }
    if (options.height > 640) {
      _consoleMessages.warnings.staticSize.google('height', options.height);
      options.height = 640;
    }
  } else if (provider == 'mapbox') {
    options.pixels = 256;
    !options.scale && (options.scale = 1);
    if (options.scale == 2) {
      options.pixels = 512;
    } else {
      if (options.width > 1024) {
        _consoleMessages.warnings.staticSize.mapbox('width', options.width);
        options.width = 1024;
      }
      if (options.height > 1024) {
        _consoleMessages.warnings.staticSize.mapbox('height', options.height);
        options.height = 1024;
      }
    }
  }
};

exports.addLibrary = addLibrary;
exports.staticMapProviders = staticMapProviders;
exports.adjustSize = adjustSize;

/***/ })
/******/ ]);
});