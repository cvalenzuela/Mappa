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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -----------
// Static Map
// -----------

var _parseGeoJSON = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StaticMap = function () {
  function StaticMap(options) {
    _classCallCheck(this, StaticMap);

    this.options = options;
    this.init();
  }

  _createClass(StaticMap, [{
    key: 'init',
    value: function init() {
      this.options.pixels = 256;
      !this.options.scale && (this.options.scale = 1);
      if (this.options.scale == 2) {
        this.options.pixels = 512;
      }
    }
  }, {
    key: 'latLngToPixel',
    value: function latLngToPixel(lat, lng) {
      return {
        x: this.fromLngToPoint(lng) - this.fromLngToPoint(this.options.lng) + this.options.width / (2 / this.options.scale),
        y: this.fromLatToPoint(lat) - this.fromLatToPoint(this.options.lat) + this.options.height / (2 / this.options.scale)
      };
    }
  }, {
    key: 'fromLatToPoint',
    value: function fromLatToPoint(l) {
      return this.options.pixels / Math.PI * Math.pow(2, this.options.zoom) * (Math.PI - Math.log(Math.tan(Math.PI / 4 + l * Math.PI / 180 / 2)));
    }
  }, {
    key: 'fromLngToPoint',
    value: function fromLngToPoint(l) {
      return this.options.pixels / Math.PI * Math.pow(2, this.options.zoom) * (l * Math.PI / 180 + Math.PI);
    }
  }, {
    key: 'geoJSON',
    value: function geoJSON() {
      return (0, _parseGeoJSON.parseGeoJSON)(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    }
  }]);

  return StaticMap;
}();

exports.StaticMap = StaticMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Leaflet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ----------- 
// Leaflet v1.0.3 
// Reference: http://leafletjs.com/reference-1.0.3.html 
//-----------

var Leaflet = function (_TileMap) {
  _inherits(Leaflet, _TileMap);

  function Leaflet(options) {
    _classCallCheck(this, Leaflet);

    var _this = _possibleConstructorReturn(this, (Leaflet.__proto__ || Object.getPrototypeOf(Leaflet)).call(this, options));

    _this.script = 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.js';
    _this.style = 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.css';
    _this.constructor.name == 'Leaflet' && _this.init();
    return _this;
  }

  _createClass(Leaflet, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      this.map = L.map('mappa', {
        center: [this.options.lat, this.options.lng],
        zoom: this.options.zoom,
        inertia: false
      });

      if (!this.options.style) {
        Leaflet.messages().tiles();
        this.ready = true;
      } else {
        this.tiles = L.tileLayer(this.options.style).addTo(this.map);
        this.tiles.on('tileload', function () {
          _this2.ready = true;
        });
      }
      this.canvasOverlay();
    }
  }, {
    key: 'canvasOverlay',
    value: function canvasOverlay() {
      var _this3 = this;

      if (this.tiles) {
        this.tiles.options.opacity = this.options.opacity;
      }

      L.overlay = L.Layer.extend({
        onAdd: function onAdd() {
          var overlayPane = overlay.getPane();
          var _container = L.DomUtil.create('div', 'leaflet-layer');
          _container.appendChild(_this3.canvas);
          overlayPane.appendChild(_container);
        },
        drawLayer: function drawLayer() {}
      });

      var overlay = new L.overlay();
      this.map.addLayer(overlay);

      var _canvas = this.canvas.getContext('webgl') || this.canvas.getContext('2d');

      this.map.on('move', function () {
        var d = _this3.map.dragging._draggable;
        d._newPos && (_canvas.canvas.style.transform = 'translate(' + -d._newPos.x + 'px,' + -d._newPos.y + 'px)');
      });
    }
  }, {
    key: 'fromLatLngtoPixel',
    value: function fromLatLngtoPixel(position) {
      if (this.ready) {
        var containerPoint = this.map.latLngToContainerPoint(position);
        return { x: containerPoint.x, y: containerPoint.y };
      } else {
        return { x: -100, y: -100 };
      }
    }
  }, {
    key: 'fromPointToLatLng',
    value: function fromPointToLatLng() {
      if (this.ready) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.map.containerPointToLatLng(args);
      } else {
        return { lat: -100, lng: -100 };
      }
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      if (this.ready) {
        return this.map.getZoom();
      } else {
        return 0;
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(callback) {
      var _this4 = this;

      if (this.ready) {
        callback();
        this.map.on('move', function () {
          callback();
        });
      } else {
        setTimeout(function () {
          _this4.onChange(callback);
        }, 200);
      }
    }
  }], [{
    key: 'messages',
    value: function messages() {
      return {
        tiles: function tiles() {
          console.warn('You are not using any tiles for your map. Try with: http://{s}.tile.osm.org/{z}/' + '{x}/{y}.png');
        }
      };
    }
  }]);

  return Leaflet;
}(_TileMap2.TileMap);

exports.Leaflet = Leaflet;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TileMap = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -----------
// Tiled Map
// -----------

var _parseGeoJSON = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileMap = function () {
  function TileMap(options) {
    _classCallCheck(this, TileMap);

    this.options = options;
    this.scriptTag;
  }

  _createClass(TileMap, [{
    key: 'init',
    value: function init() {
      if (!document.getElementById(this.options.provider)) {
        this.scriptTag = document.createElement('script');
        this.scriptTag.type = 'text/javascript';
        this.scriptTag.src = this.script;
        this.scriptTag.id = this.options.provider;
        document.head.appendChild(this.scriptTag);
        if (this.style) {
          var styleTag = document.createElement('link');
          styleTag.rel = 'stylesheet';
          styleTag.href = this.style;
          document.head.appendChild(styleTag);
        }
      }
    }
  }, {
    key: 'overlay',
    value: function overlay(canvas) {
      var _this = this;

      this.scriptTag.onload = function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        div.setAttribute('style', 'position:relative;width:' + canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:10');
        div.setAttribute('id', 'mappa');
        canvas.elt != undefined ? _this.canvas = canvas.elt : _this.canvas = canvas;
        _this.createMap();
      };
    }
  }, {
    key: 'latLngToPixel',
    value: function latLngToPixel() {
      var pos = void 0;
      _typeof(arguments.length <= 0 ? undefined : arguments[0]) == 'object' ? pos = arguments.length <= 0 ? undefined : arguments[0] : pos = { lat: Number(arguments.length <= 0 ? undefined : arguments[0]), lng: Number(arguments.length <= 1 ? undefined : arguments[1]) };
      return this.fromLatLngtoPixel(pos);
    }
  }, {
    key: 'pixelToLatLng',
    value: function pixelToLatLng() {
      return this.fromPointToLatLng.apply(this, arguments);
    }
  }, {
    key: 'geoJSON',
    value: function geoJSON() {
      return (0, _parseGeoJSON.parseGeoJSON)(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    }
  }, {
    key: 'zoom',
    value: function zoom() {
      return Math.floor(this.getZoom());
    }
  }]);

  return TileMap;
}();

exports.TileMap = TileMap;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// -----------
// Parse a GeoJSON file.
// -----------

var parseGeoJSON = function parseGeoJSON(data, type) {
  var result = [];

  if (data.type === 'FeatureCollection') {
    if (data.features instanceof Array) {
      data.features.forEach(function (feature) {
        var f = eachFeature(feature, type);
        f != undefined && result.push(f);
      });
    }
  } else {
    result = eachFeature(data, type);
  }
  return result;
};

var eachFeature = function eachFeature(feature, type) {
  if (feature.hasOwnProperty('geometry') && feature.geometry.type == type) {
    return feature.geometry.coordinates;
  } else if (feature.hasOwnProperty('geometries') && feature.geometries instanceof Array && feature.geometry.type == type) {
    feature.geometries.forEach(function (geometry) {
      return feature.geometry.coordinates;
    });
  } else if (feature.hasOwnProperty('coordinates') && feature.geometry.type == type) {
    return feature.geometry.coordinates;
  }
};

exports.parseGeoJSON = parseGeoJSON;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mapbox = __webpack_require__(8);

Object.keys(_Mapbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mapbox[key];
    }
  });
});

var _Google = __webpack_require__(7);

Object.keys(_Google).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Google[key];
    }
  });
});

var _Mapquest = __webpack_require__(9);

Object.keys(_Mapquest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mapquest[key];
    }
  });
});

var _StaticMap = __webpack_require__(0);

Object.keys(_StaticMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _StaticMap[key];
    }
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mapboxgl = __webpack_require__(12);

Object.keys(_Mapboxgl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mapboxgl[key];
    }
  });
});

var _Google = __webpack_require__(10);

Object.keys(_Google).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Google[key];
    }
  });
});

var _Leaflet = __webpack_require__(1);

Object.keys(_Leaflet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Leaflet[key];
    }
  });
});

var _Mapbox = __webpack_require__(11);

Object.keys(_Mapbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mapbox[key];
    }
  });
});

var _Mapzen = __webpack_require__(13);

Object.keys(_Mapzen).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mapzen[key];
    }
  });
});

var _Tangram = __webpack_require__(14);

Object.keys(_Tangram).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Tangram[key];
    }
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* Mappa: A library to work with maps and p5.js
* https://github.com/cvalenzuela/mappa
*
* Cristóbal Valenzuela
* cv965@nyu.edu
* Google Summer of Code 2017
*/



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tileMap2 = __webpack_require__(5);

var _tileMap = _interopRequireWildcard(_tileMap2);

var _staticMap2 = __webpack_require__(4);

var _staticMap = _interopRequireWildcard(_staticMap2);

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
      var options = {};

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_typeof(args[0]) == 'object') {
        options = Object.assign({}, args[0]);
      } else {
        var _options = _staticMap[this.provider].options().userInput;
        args.forEach(function (el, i) {
          var option = _options[i];
          options[option] = el;
        });
      };
      options.key = this.key;
      this.provider == undefined && (this.provider = 'StaticMap');
      return new _staticMap[this.provider](options);
    }
  }, {
    key: 'tileMap',
    value: function tileMap() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var options = {};

      if (_typeof(args[0]) == 'object') {
        options = Object.assign({}, args[0]);
      } else {
        ['lat', 'lng', 'zoom'].forEach(function (el, i) {
          options[el] = args[i];
        });
      };
      options.key = this.key;
      options.provider = this.provider;
      return new _tileMap[this.provider](options);
    }
  }]);

  return Mappa;
}();

module.exports = Mappa;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Google = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Google Static Maps API v2
// Reference: https://developers.google.com/maps/documentation/static-maps/
// -----------

var Google = function (_StaticMap) {
  _inherits(Google, _StaticMap);

  function Google(options) {
    _classCallCheck(this, Google);

    var _this = _possibleConstructorReturn(this, (Google.__proto__ || Object.getPrototypeOf(Google)).call(this, options));

    _this.imgUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
    _this.createImage();
    return _this;
  }

  _createClass(Google, [{
    key: 'init',
    value: function init() {
      if (this.options.scale == 1 || this.options.scale == undefined) {
        this.options.pixels = 128;
        this.options.scale = 1;
      } else if (this.options.scale == 2) {
        this.options.pixels = 256;
      }
      if (this.options.width > 640) {
        Google.messages().size('width', this.options.width);
        this.options.width = 640;
      }
      if (this.options.height > 640) {
        Google.messages().size('height', this.options.height);
        this.options.height = 640;
      }
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      !this.options.key && delete this.options.key && Google.messages().key();

      this.options.size = this.options.width + 'x' + this.options.height;
      !this.options.center && (this.options.center = this.options.lat + ',' + this.options.lng);
      !this.options.scale && (this.options.scale = 1);

      for (var option in this.options) {
        Google.options().valid.indexOf(option) > -1 && (this.imgUrl += '&' + option + '=' + this.options[option]);
      }

      return this.imgUrl;
    }
  }], [{
    key: 'options',
    value: function options() {
      return {
        valid: ['center', 'zoom', 'size', 'scale', 'format', 'maptype', 'language', 'region', 'markers', 'path', 'visible', 'style', 'signature', 'key', 'signature'],
        userInput: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'markers', 'path', 'visible', 'style', 'key', 'signature', 'center']
      };
    }
  }, {
    key: 'messages',
    value: function messages() {
      return {
        size: function size(s, m) {
          console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Google Maps Static API max ' + s + ' value is 640px. For larger images, change the scale to 2 and keep the ' + s + ' between 1-640px. i.e: if you want an image 800x800px, set the width and height to 400x400 and the scale to 2.');
        },
        key: function key() {
          console.warn('For large requests please provide an API key for your Google Maps Static API.');
        }
      };
    }
  }]);

  return Google;
}(_StaticMap2.StaticMap);

exports.Google = Google;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Mapbox Static API v1
// Reference: https://www.mapbox.com/api-documentation/#static
// -----------

var Mapbox = function (_StaticMap) {
  _inherits(Mapbox, _StaticMap);

  function Mapbox(options) {
    _classCallCheck(this, Mapbox);

    var _this = _possibleConstructorReturn(this, (Mapbox.__proto__ || Object.getPrototypeOf(Mapbox)).call(this, options));

    _this.imgUrl = 'https://api.mapbox.com/styles/v1/';
    _this.createImage();
    return _this;
  }

  _createClass(Mapbox, [{
    key: 'init',
    value: function init() {
      this.options.pixels = 256;
      !this.options.scale && (this.options.scale = 1);
      if (this.options.scale == 2) {
        this.options.pixels = 512;
      } else {
        if (this.options.width > 1280) {
          Mapbox.messages().size('width', this.options.width);
          this.options.width = 1280;
        }
        if (this.options.height > 1280) {
          Mapbox.messages().size('height', this.options.width);
          this.options.height = 1280;
        }
      }
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      var _this2 = this;

      if (!this.options.key) {
        Mapbox.messages().key();
        return;
      }
      this.options.username != undefined ? this.imgUrl += this.options.username + '/' : this.imgUrl += 'mapbox/';
      this.options.style != undefined ? this.imgUrl += this.options.style + '/' : this.imgUrl += 'streets-v10/';
      this.imgUrl += 'static/';
      this.options.overlay != undefined && (this.imgUrl += this.options.overlay + '/');
      this.imgUrl += this.options.lng + ',' + this.options.lat + ',';
      this.options.auto == false || this.options.auto == undefined ? ['zoom', 'bearing', 'pitch'].forEach(function (e, i) {
        _this2.options[e] != undefined ? _this2.imgUrl += _this2.options[e] : _this2.imgUrl += 0;
        i < 2 && (_this2.imgUrl += ',');
      }) : this.imgUrl += 'auto';
      this.imgUrl += '/' + this.options.width + 'x' + this.options.height;
      this.options.scale == 2 && (this.imgUrl += '@2x');
      this.imgUrl += '?access_token=' + this.options.key;
      this.options.attribution ? this.imgUrl += '&attribution=' + this.options.attribution : this.imgUrl += '&attribution=false';
      this.options.logo ? this.imgUrl += '&logo=' + this.options.logo : this.imgUrl += '&logo=false';
      this.options.before_layer ? this.imgUrl += '&before_layer=' + this.options.before_layer : this.imgUrl += '&before_layer=false';
      return this.imgUrl;
    }
  }], [{
    key: 'options',
    value: function options() {
      return {
        valid: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'],
        userInput: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size']
      };
    }
  }, {
    key: 'messages',
    value: function messages() {
      return {
        size: function size(s, m) {
          return console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Mapbox Static API max ' + s + ' value is 1280px. If you want a large image change the scale to 2.');
        },
        key: function key() {
          console.error('Mapbox Static API needs a key to work. To get a key visit: https://www.mapbox.com/api-documentation/#static');
        }
      };
    }
  }]);

  return Mapbox;
}(_StaticMap2.StaticMap);

exports.Mapbox = Mapbox;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapquest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Mapquest v5
// Reference: https://developer.mapquest.com/documentation/static-map-api/v5/
// -----------

var Mapquest = function (_StaticMap) {
  _inherits(Mapquest, _StaticMap);

  function Mapquest(options) {
    _classCallCheck(this, Mapquest);

    var _this = _possibleConstructorReturn(this, (Mapquest.__proto__ || Object.getPrototypeOf(Mapquest)).call(this, options));

    _this.imgUrl = 'https://www.mapquestapi.com/staticmap/v5/map?';
    _this.createImage();
    return _this;
  }

  _createClass(Mapquest, [{
    key: 'init',
    value: function init() {
      if (this.options.scale == 1 || this.options.scale == undefined) {
        this.options.pixels = 128;
        this.options.scale = 1;
      } else if (this.options.scale == 2) {
        this.options.pixels = 256;
      }
      if (this.options.width > 1920) {
        Mapquest.messages().size('width', this.options.width);
        this.options.width = 1920;
      }
      if (this.options.height > 1920) {
        Mapquest.messages().size('height', this.options.height);
        this.options.height = 1920;
      }
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      if (!this.options.key) {
        Mapquest.messages().key();
        return;
      }

      this.options.size = this.options.width + ',' + this.options.height;
      this.options.scale == 2 && (this.options.size += '@2x');
      !this.options.center && (this.options.center = this.options.lat + ',' + this.options.lng);

      for (var option in this.options) {
        Mapquest.options().valid.indexOf(option) > -1 && (this.imgUrl += '&' + option + '=' + this.options[option]);
      }

      return this.imgUrl;
    }
  }], [{
    key: 'options',
    value: function options() {
      return {
        valid: ['key', 'size', 'zoom', 'center', 'boundingBox', 'margin', 'format', 'type', 'scalebar', 'locations', 'declutter', 'defaultMarker', 'banner', 'traffic', 'key'],
        userInput: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'boundingBox', 'margin', 'format', 'type', 'scalebar', 'locations', 'declutter', 'defaultMarker', 'banner', 'traffic', 'key']
      };
    }
  }, {
    key: 'messages',
    value: function messages() {
      return {
        size: function size(s, m) {
          console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Mapquest Static API max ' + s + ' value is 1920px. For larger images, change the scale to 2 and keep the ' + s + ' between 170x30px. i.e: if you want an 3840x3840px image, set the width and height to 1920x1920 and the scale to 2.');
        },
        key: function key() {
          console.warn('Please provide and API key to work with Mapquest Static API. Get one here: https://developer.mapquest.com/documentation/');
        }
      };
    }
  }]);

  return Mapquest;
}(_StaticMap2.StaticMap);

exports.Mapquest = Mapquest;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Google = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Google Maps JavaScript v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

var Google = function (_TileMap) {
  _inherits(Google, _TileMap);

  function Google(options) {
    _classCallCheck(this, Google);

    var _this = _possibleConstructorReturn(this, (Google.__proto__ || Object.getPrototypeOf(Google)).call(this, options));

    _this.script = 'https://maps.googleapis.com/maps/api/js';
    _this.options.key && (_this.script += '?key=' + _this.options.key);
    _this.options.language && (_this.script += '&language=' + _this.options.language);
    _this.options.region && (_this.script += '&region=' + _this.options.region);
    _this.init();
    return _this;
  }

  _createClass(Google, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      !this.options.key && Google.messages().key();

      this.map = new google.maps.Map(document.getElementById('mappa'), {
        center: { lat: this.options.lat, lng: this.options.lng },
        zoom: this.options.zoom || 6,
        mapTypeId: this.options.maptype || 'terrain',
        styles: this.options.styles || '',
        minZoom: 1 || this.options.minZoom
      });

      var overlay = new google.maps.OverlayView();
      overlay.onAdd = function () {
        overlay.getPanes().overlayLayer.appendChild(_this2.canvas);
      };
      overlay.draw = function () {};
      overlay.setMap(this.map);

      google.maps.event.addListener(this.map, 'bounds_changed', function () {
        var center = overlay.getProjection().fromLatLngToDivPixel(_this2.map.getCenter());
        var pixels = void 0;
        window.devicePixelRatio >= 2 ? pixels = 4 : pixels = 2;
        var offsetX = -Math.round(_this2.canvas.width / pixels - center.x);
        var offsetY = -Math.round(_this2.canvas.height / pixels - center.y);
        var _canvas = _this2.canvas.getContext('webgl') || _this2.canvas.getContext('2d');
        _canvas.canvas.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
      });

      google.maps.event.addListenerOnce(this.map, 'tilesloaded', function () {
        _this2.ready = true;
      });
    }
  }, {
    key: 'fromLatLngtoPixel',
    value: function fromLatLngtoPixel(position) {
      if (this.ready) {
        position = new google.maps.LatLng(position);
        var topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
        var bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
        var scale = Math.pow(2, this.map.getZoom());
        var point = this.map.getProjection().fromLatLngToPoint(position);
        return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
      } else {
        return { x: -100, y: -100 };
      }
    }
  }, {
    key: 'fromPointToLatLng',
    value: function fromPointToLatLng() {
      if (this.ready) {
        var topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
        var bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
        var scale = Math.pow(2, this.map.getZoom());
        var point = new google.maps.Point((arguments.length <= 0 ? undefined : arguments[0]) / scale + bottomLeft.x, (arguments.length <= 1 ? undefined : arguments[1]) / scale + topRight.y);
        var latlng = this.map.getProjection().fromPointToLatLng(point);
        return { lat: latlng.lat(), lng: latlng.lng() };
      } else {
        return { lat: -100, lng: -100 };
      }
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      if (this.ready) {
        return this.map.getZoom();
      } else {
        return 0;
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(callback) {
      var _this3 = this;

      if (this.ready) {
        callback();
        google.maps.event.addListener(this.map, 'bounds_changed', function () {
          callback();
        });
      } else {
        setTimeout(function () {
          _this3.onChange(callback);
        }, 200);
      }
    }
  }], [{
    key: 'messages',
    value: function messages() {
      return {
        key: function key() {
          console.warn('Please provide a Goolge Maps API Key. Get one here: https://developers.google.com/maps/documentation/javascript/ ');
        }
      };
    }
  }]);

  return Google;
}(_TileMap2.TileMap);

exports.Google = Google;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Leaflet2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Mapbox v3.1.1
// Reference: https://www.mapbox.com/mapbox.js/api/v3.1.1/
// -----------

var Mapbox = function (_Leaflet) {
  _inherits(Mapbox, _Leaflet);

  function Mapbox(options) {
    _classCallCheck(this, Mapbox);

    var _this = _possibleConstructorReturn(this, (Mapbox.__proto__ || Object.getPrototypeOf(Mapbox)).call(this, options));

    _this.script = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
    _this.style = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css';
    _this.init();
    return _this;
  }

  _createClass(Mapbox, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      if (this.options.key) {
        L.mapbox.accessToken = this.options.key;
      } else {
        Mapbox.messages().key();
        return;
      }

      // Create a Mapbox Map
      this.map = L.mapbox.map('mappa').setView([this.options.lat, this.options.lng], this.options.zoom);

      this.options.studio ? this.tiles = L.mapbox.styleLayer(this.options.style || 'mapbox://styles/mapbox/emerald-v8').addTo(this.map) : this.tiles = L.mapbox.tileLayer(this.options.style || 'mapbox.streets').addTo(this.map);

      this.tiles.on('ready', function () {
        _this2.ready = true;
      });

      this.canvasOverlay();
    }
  }], [{
    key: 'messages',
    value: function messages() {
      return {
        key: function key() {
          console.warn('Please provide a Mapbox API key. Get one here: https://www.mapbox.com/mapbox.js/api/v3.1.1');
        }
      };
    }
  }]);

  return Mapbox;
}(_Leaflet2.Leaflet);

exports.Mapbox = Mapbox;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapboxgl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Mapbox-gl v0.37.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/
// -----------

var Mapboxgl = function (_TileMap) {
  _inherits(Mapboxgl, _TileMap);

  function Mapboxgl(options) {
    _classCallCheck(this, Mapboxgl);

    var _this = _possibleConstructorReturn(this, (Mapboxgl.__proto__ || Object.getPrototypeOf(Mapboxgl)).call(this, options));

    _this.script = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
    _this.style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';
    !_this.options.key ? Mapboxgl.messages().key() : _this.init();
    return _this;
  }

  _createClass(Mapboxgl, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      mapboxgl.accessToken = this.options.key;
      this.map = new mapboxgl.Map({
        container: 'mappa',
        style: this.options.style || 'mapbox://styles/mapbox/satellite-streets-v10',
        center: [this.options.lng, this.options.lat],
        zoom: this.options.zoom,
        minZoom: this.options.minZoom || 0,
        maxZoom: this.options.maxZoom || 22,
        bearing: this.options.bearing || 0,
        pitch: this.options.pitch || 0,
        renderWorldCopies: true && this.options.renderWorldCopies,
        maxBounds: this.options.maxBounds || undefined
      });

      this.map.getCanvasContainer().appendChild(this.canvas);
      this.canvas.style.position = 'relative';
      this.options.opacity && (document.getElementsByClassName('mapboxgl-canvas')[0].style.opacity = this.options.opacity);
      this.map.on('load', function () {
        _this2.ready = true;
      });
    }
  }, {
    key: 'fromLatLngtoPixel',
    value: function fromLatLngtoPixel(latLng) {
      if (this.ready) {
        return this.map.project(latLng);
      } else {
        return { x: -100, y: -100 };
      }
    }
  }, {
    key: 'fromPointToLatLng',
    value: function fromPointToLatLng() {
      if (this.ready) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.map.unproject(args);
      } else {
        return { lat: -100, lng: -100 };
      }
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      if (this.ready) {
        return this.map.getZoom();
      } else {
        return 0;
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(callback) {
      var _this3 = this;

      if (this.ready) {
        callback();
        this.map.on('render', function () {
          callback();
        });
      } else {
        setTimeout(function () {
          _this3.onChange(callback);
        }, 200);
      }
    }
  }], [{
    key: 'messages',
    value: function messages() {
      return {
        key: function key() {
          console.warn('Please provide a Mapbox-gl API key. Get one here: https://www.mapbox.com/mapbox-gl-js/api/');
        }
      };
    }
  }]);

  return Mapboxgl;
}(_TileMap2.TileMap);

exports.Mapboxgl = Mapboxgl;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapzen = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Leaflet2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Mapzen v0.12.5
// Reference: https://mapzen.com/documentation/mapzen-js/
// -----------

var Mapzen = function (_Leaflet) {
  _inherits(Mapzen, _Leaflet);

  function Mapzen(options) {
    _classCallCheck(this, Mapzen);

    var _this = _possibleConstructorReturn(this, (Mapzen.__proto__ || Object.getPrototypeOf(Mapzen)).call(this, options));

    _this.script = 'https://mapzen.com/js/mapzen.min.js';
    _this.style = 'https://mapzen.com/js/mapzen.css';
    _this.init();
    return _this;
  }

  _createClass(Mapzen, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      if (this.options.key) {
        L.Mapzen.apiKey = this.options.key;
      } else {
        Mapzen.messages().key();
        return;
      }

      // Create a Mapzen Map
      this.map = L.Mapzen.map('mappa', {
        center: [this.options.lat, this.options.lng],
        zoom: this.options.zoom,
        tangramOptions: {
          scene: this.options.BasemapStyles ? L.Mapzen.BasemapStyles[this.options.scene] : this.options.scene
        }
      });
      this.map.on('tangramloaded', function () {
        _this2.ready = true;
      });

      this.canvasOverlay();
    }
  }], [{
    key: 'messages',
    value: function messages() {
      return {
        key: function key() {
          console.warn('Please provide a API key for your Mapzen map.');
        }
      };
    }
  }]);

  return Mapzen;
}(_Leaflet2.Leaflet);

exports.Mapzen = Mapzen;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tangram = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Leaflet2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Tangram v0.12.5
// Reference: https://mapzen.com/documentation/tangram/
// -----------

var Tangram = function (_Leaflet) {
  _inherits(Tangram, _Leaflet);

  function Tangram(options) {
    _classCallCheck(this, Tangram);

    var _this = _possibleConstructorReturn(this, (Tangram.__proto__ || Object.getPrototypeOf(Tangram)).call(this, options));

    _this.options.provider = 'Leaflet';
    _this.init();
    _this.options.provider = 'Tangram';
    _this.script = 'https://mapzen.com/tangram/tangram.min.js';
    _this.init();
    return _this;
  }

  _createClass(Tangram, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      // Create a Tangram Map
      this.map = L.map('mappa');
      this.tangramScene = window.Tangram.leafletLayer({
        scene: this.options.scene,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
      });
      this.tangramScene.addTo(this.map);
      this.map.setView([this.options.lat, this.options.lng], this.options.zoom);
      this.tangramScene.scene.subscribe({ load: function load() {
          _this2.ready = true;
        } });
      this.canvasOverlay();
    }
  }], [{
    key: 'messages',
    value: function messages() {
      return {
        key: function key() {
          console.warn('Please provide a API key for your Mapzen map.');
        }
      };
    }
  }]);

  return Tangram;
}(_Leaflet2.Leaflet);

exports.Tangram = Tangram;

/***/ })
/******/ ]);
});
//# sourceMappingURL=mappa.js.map