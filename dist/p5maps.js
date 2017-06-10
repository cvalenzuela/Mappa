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
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// -----------
// Collection of console messages
// -----------

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapbox = exports.google = undefined;

var _google = __webpack_require__(5);

var google = _interopRequireWildcard(_google);

var _mapbox = __webpack_require__(6);

var mapbox = _interopRequireWildcard(_mapbox);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// -----------
// Static Map Providers
// -----------

exports.google = google;
exports.mapbox = mapbox;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -----------
// Static Maps
// -----------

var _staticProviders = __webpack_require__(1);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -----------
// Tiled Maps
// -----------

var _tileProviders = __webpack_require__(9);

var tileProviders = _interopRequireWildcard(_tileProviders);

var _messages = __webpack_require__(0);

var messages = _interopRequireWildcard(_messages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileMap = function () {
  function TileMap(provider, options) {
    _classCallCheck(this, TileMap);

    this.provider = tileProviders[provider];
    this.options = options;
    this.ready = false; // false by default
    !this.options.key ? messages[provider].noKey() : this.init(provider);
  }

  _createClass(TileMap, [{
    key: 'init',
    value: function init(provider) {
      var _this = this;

      var scriptTag = void 0;
      if (!document.getElementById(provider)) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = this.provider.script(this.options.key);
        scriptTag.id = provider;
        document.head.appendChild(scriptTag);
        if (this.provider.style) {
          var styleTag = document.createElement('link');
          styleTag.rel = 'stylesheet';
          styleTag.href = this.provider.style;
          document.head.appendChild(styleTag);
        }
      }
      scriptTag.onload = function () {
        _this.ready = true;
      };
    }
  }, {
    key: 'append',
    value: function append(canvas) {
      var _this2 = this;

      if (this.ready) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        div.setAttribute('style', 'position:absolute;width:' + canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:-99');
        div.setAttribute('id', 'mappa');
        this.map = this.provider.createMap(canvas, this.options);
      } else {
        setTimeout(function () {
          _this2.append(canvas);
        }, 300);
      }
    }
  }, {
    key: 'latLng',
    value: function latLng() {
      var pos = { lat: arguments.length <= 0 ? undefined : arguments[0], lng: arguments.length <= 1 ? undefined : arguments[1] };

      if (this.map) {
        return this.provider.latLng(pos);
      } else {
        return { x: 0, y: 0 };
      }
    }
  }, {
    key: 'zoom',
    value: function zoom() {
      if (this.map) {
        return Math.floor(this.provider.zoom());
      } else {
        return 0;
      }
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

var _staticProviders = __webpack_require__(1);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlParser = exports.options = undefined;

var _messages = __webpack_require__(0);

// Query parameters
var options = ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature', 'center'];

// Url builder
// -----------
// Google Static Maps API v2
// Reference: https://developers.google.com/maps/documentation/static-maps/
// -----------

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlParser = exports.options = undefined;

var _messages = __webpack_require__(0);

// Query parameters
var options = ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'];

// Url builder
// -----------
// Mapbox Static API v1
// Reference: https://www.mapbox.com/api-documentation/#styles
// -----------

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.latLng = exports.createMap = exports.style = exports.script = undefined;

var _messages = __webpack_require__(0);

// Library
var script = function script(key) {
  return 'https://maps.googleapis.com/maps/api/js?key=' + key;
}; // -----------
// Google Maps JavaScript v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

var style = null;

var map = void 0;
var overlay = void 0;
var overlayProjection = void 0;

// Create the map
var createMap = function createMap(canvas, options) {
  map = new google.maps.Map(document.getElementById('mappa'), {
    center: { lat: options.lat, lng: options.lng },
    zoom: options.zoom
  });

  overlay = new google.maps.OverlayView();
  overlay.setMap(map);
  overlay.onAdd = function () {
    canvas.elt.style.position = 'absolute';
    var div = canvas.elt;
    overlay.getPanes().overlayLayer.appendChild(div);
    overlayProjection = overlay.getProjection();
  };
  overlay.draw = function () {
    overlayProjection = overlay.getProjection();
  };

  return map;
};

// Get LatLng
var latLng = function latLng(position) {
  if (overlayProjection) {
    return overlayProjection.fromLatLngToContainerPixel(new google.maps.LatLng(position.lat, position.lng));
  } else {
    return { x: 0, y: 0 };
  }
};

// Get Zoom
var zoom = function zoom() {};

exports.script = script;
exports.style = style;
exports.createMap = createMap;
exports.latLng = latLng;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoom = exports.latLng = exports.createMap = exports.style = exports.script = undefined;

var _messages = __webpack_require__(0);

// Library
var script = function script() {
  return 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
}; // -----------
// Mapbox-gl v0.37.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/
// -----------

var style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';

var map = void 0;

// Create a Map
var createMap = function createMap(canvas, options) {
  mapboxgl.accessToken = options.key;

  map = new mapboxgl.Map({
    container: 'mappa',
    style: options.style,
    center: [options.lng, options.lat],
    zoom: options.zoom
  });

  canvas.parent(map.getCanvasContainer());
  canvas.elt.style.position = 'absolute';

  return map;
};

// Get LatLng
var latLng = function latLng(position) {
  return map.project(position);
};

// Get Zoom
var zoom = function zoom() {
  return map.getZoom();
};

exports.script = script;
exports.style = style;
exports.createMap = createMap;
exports.latLng = latLng;
exports.zoom = zoom;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.google = exports.mapboxgl = undefined;

var _mapboxGl = __webpack_require__(8);

var mapboxgl = _interopRequireWildcard(_mapboxGl);

var _google = __webpack_require__(7);

var google = _interopRequireWildcard(_google);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// -----------
// Tile Map Provider
// -----------

exports.mapboxgl = mapboxgl;
exports.google = google;

/***/ })
/******/ ]);
});