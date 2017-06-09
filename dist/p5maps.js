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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Static Maps

var _staticProviders = __webpack_require__(11);

var staticProviders = _interopRequireWildcard(_staticProviders);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StaticMap = function () {
  function StaticMap(provider, options) {
    _classCallCheck(this, StaticMap);

    this.provider = staticProviders[provider];
    this.options = options;
    this.img = this.image();
  }

  _createClass(StaticMap, [{
    key: 'image',
    value: function image() {
      return this.provider.urlParser(this.options);
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

  return StaticMap;
}();

exports.StaticMap = StaticMap;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TileMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Tiled Maps

var _tileProviders = __webpack_require__(12);

var tileProviders = _interopRequireWildcard(_tileProviders);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileMap = function () {
  function TileMap(provider, options) {
    _classCallCheck(this, TileMap);

    this.provider = tileProviders[provider];
    this.options = options;
  }

  _createClass(TileMap, [{
    key: 'append',
    value: function append(canvas) {
      var div = document.createElement('div');
      document.body.appendChild(div);
      div.setAttribute('style', 'position:absolute;width:' + canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:-99');
      div.setAttribute('id', 'mappa');
      this.provider.createMap(canvas, div, this.options);
    }
  }]);

  return TileMap;
}();

exports.TileMap = TileMap;

/***/ }),
/* 4 */
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

var _StaticMap = __webpack_require__(2);

var _TileMap = __webpack_require__(3);

var _staticProviders = __webpack_require__(11);

var staticMapProviders = _interopRequireWildcard(_staticProviders);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('%c p5.maps Loaded ✓', 'color:white; background:green;');

var Mappa = function () {
  function Mappa(provider, key) {
    _classCallCheck(this, Mappa);

    this.provider = provider;
    this.key = key;
  }

  _createClass(Mappa, [{
    key: 'staticMap',
    value: function staticMap() {
      var _this = this;

      var options = {};

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_typeof(args[0]) == 'object') {
        options = Object.assign({}, args[0]);
      } else {
        args.forEach(function (el, i) {
          var option = staticMapProviders[_this.provider].options[i];
          options[option] = el;
        });
      };
      options.key = this.key;

      return new _StaticMap.StaticMap(this.provider, options);
    }
  }, {
    key: 'tileMap',
    value: function tileMap() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var options = void 0;

      if (_typeof(args[0]) == 'object') {
        options = Object.assign({}, args[0]);
      } else {
        ['lat', 'lng', 'zoom'].forEach(function (el, i) {
          options[el] = args[i];
        });
      };
      options.key = this.key;

      return new _TileMap.TileMap(this.provider, options);
    }
  }]);

  return Mappa;
}();

module.exports = Mappa;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlParser = exports.options = undefined;

var _messages = __webpack_require__(14);

// Query parameters
var options = ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature', 'center'];

// Url builder
// Google Static Maps API v2
// Reference: https://developers.google.com/maps/documentation/static-maps/

var urlParser = function urlParser(OPTIONS) {
  adjustScale(OPTIONS);
  var url = 'https://maps.googleapis.com/maps/api/staticmap?';
  var _OPTIONS = Object.assign({}, OPTIONS);
  _OPTIONS.size = _OPTIONS.width + 'x' + _OPTIONS.height;
  !_OPTIONS.center && (_OPTIONS.center = _OPTIONS.lat + ',' + _OPTIONS.lng);
  !_OPTIONS.scale && (_OPTIONS.scale = 1);
  ['width', 'height', 'lat', 'lng', 'pixels'].forEach(function (e) {
    return delete _OPTIONS[e];
  });
  for (var option in _OPTIONS) {
    _OPTIONS[option] != undefined && (url += '&' + option + '=' + _OPTIONS[option]);
  }return url;
};

// Image/Screen scale adjustment
var adjustScale = function adjustScale(options) {
  if (options.scale == 1 || options.scale == undefined) {
    options.pixels = 128;
    options.scale = 1;
  } else if (options.scale == 2) {
    options.pixels = 256;
  }
  if (options.width > 640) {
    _messages.google.staticSize('width', options.width);
    options.width = 640;
  }
  if (options.height > 640) {
    _messages.google.staticSize('height', options.height);
    options.height = 640;
  }
};

exports.options = options;
exports.urlParser = urlParser;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlParser = exports.options = undefined;

var _messages = __webpack_require__(14);

// Query parameters
var options = ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'];

// Url builder
// Mapbox Static API v1
// Reference: https://www.mapbox.com/api-documentation/#styles

var urlParser = function urlParser(OPTIONS) {
  adjustScale(OPTIONS);
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
};

// Image/Screen scale adjustment
var adjustScale = function adjustScale(options) {
  options.pixels = 256;
  !options.scale && (options.scale = 1);
  if (options.scale == 2) {
    options.pixels = 512;
  } else {
    if (options.width > 1024) {
      _messages.mapbox.staticSize('width', options.width);
      options.width = 1024;
    }
    if (options.height > 1024) {
      _messages.mapbox.staticSize('height', options.height);
      options.height = 1024;
    }
  }
};

exports.options = options;
exports.urlParser = urlParser;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapbox = exports.google = undefined;

var _google = __webpack_require__(7);

var google = _interopRequireWildcard(_google);

var _mapbox = __webpack_require__(8);

var mapbox = _interopRequireWildcard(_mapbox);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Static Map Providers

exports.google = google;
exports.mapbox = mapbox;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapboxgl = undefined;

var _mapboxGl = __webpack_require__(13);

var mapboxgl = _interopRequireWildcard(_mapboxGl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.mapboxgl = mapboxgl; // Tile Map Provider

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMap = undefined;

var _messages = __webpack_require__(14);

var _addLibrary = __webpack_require__(15);

// Mapbox-gl v0.37.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/

var createMap = function createMap(canvas, div, options) {

  if (!options.key) {
    return _messages.mapboxgl.noKey();
  }

  var script = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
  var style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';

  var lib = (0, _addLibrary.addLibrary)(options.key, 'mapbox', script, style);

  lib.onload = function () {

    mapboxgl.accessToken = options.key;

    var map = new mapboxgl.Map({
      container: 'mappa',
      style: options.style,
      center: [options.lng, options.lat],
      zoom: options.zoom
    });

    canvas.parent(map.getCanvasContainer());
    canvas.elt.style.position = 'absolute';

    function project(d) {
      return map.project(getLL(d));
    }
    function getLL(d) {
      return new mapboxgl.LngLat(+d.lng, +d.lat);
    }

    window.tileMappa = map;
  };
  // function render() {
  //   //clear();
  // }
  //
  // // render for the first time
  // render();
  //
  // // re-render whenever the view changes
  // mappa.on('viewreset', function () {
  //   render();
  // });
  //
  // mappa.on('move', function () {
  //   render();
  // });
  // let url = "https://{s}.tiles.mapbox.com/v4/";
  // (OPTIONS.style) ? url += OPTIONS.style: url += 'mapbox.light';
  // url += '/{z}/{x}/{y}@2x.png?access_token='
  // url += OPTIONS.key
  // let leafletMap = L.map(div).setView([options.lat, options.lng], options.zoom);
  // L.tileLayer(url).addTo(leafletMap);
};

exports.createMap = createMap;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Collection of console messages

var mapbox = {
  staticSize: function staticSize(s, m) {
    console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Mapbox Static API max ' + s + ' value is 1024px.');
  },
  noKey: function noKey() {
    console.warn('Please provide an API key for your map provider.');
  }
};

var mapboxgl = {
  noKey: function noKey() {
    console.error('Mapbox need an API key to work. Please provide an API key for your map provider. To get a key visit: ');
  }
};

var google = {
  staticSize: function staticSize(s, m) {
    console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Google Maps Static API max ' + s + ' value is 640px. For larger images, change the scale to 2 and keep the ' + s + ' between 1-640px. i.e: if you want an image 800x800px, set the width and height to 400x400 and the scale to 2.');
  },
  noKey: function noKey() {
    console.warn('Please provide an API key for your map provider.');
  }
};

exports.mapbox = mapbox;
exports.google = google;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Add a library(.js) and style(.css) to the DOM


var addLibrary = function addLibrary(key, provider, script, style) {

  var scriptTag = void 0;

  if (!document.getElementById(provider)) {
    scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = script;
    scriptTag.id = provider;
    document.head.appendChild(scriptTag);
    if (style) {
      var styleTag = document.createElement('link');
      styleTag.rel = 'stylesheet';
      styleTag.href = style;
      document.head.appendChild(styleTag);
    }
  }

  return scriptTag;
};

exports.addLibrary = addLibrary;

/***/ })
/******/ ]);
});