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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -----------
// Static Map
// -----------

var _parseGeoJSON = __webpack_require__(3);

var _parseGeoJSON2 = _interopRequireDefault(_parseGeoJSON);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      if (!this.options.scale) {
        this.options.scale = 1;
      }
      if (this.options.scale === 2) {
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
  }], [{
    key: 'geoJSON',
    value: function geoJSON() {
      return (0, _parseGeoJSON2.default)(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    }
  }]);

  return StaticMap;
}();

exports.default = StaticMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -----------
// Tile Map
// -----------

var _parseGeoJSON = __webpack_require__(3);

var _parseGeoJSON2 = _interopRequireDefault(_parseGeoJSON);

var _GUID = __webpack_require__(13);

var _GUID2 = _interopRequireDefault(_GUID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileMap = function () {
  function TileMap(options) {
    _classCallCheck(this, TileMap);

    this.options = options;
    this.mappaDiv = null;
    this.id = (0, _GUID2.default)();
    this.srcLoaded = false;
  }

  _createClass(TileMap, [{
    key: 'loadSrc',
    value: function loadSrc() {
      var _this = this;

      var scriptPromise = new Promise(function (resolve, reject) {
        _this.scriptTag = document.createElement('script');
        document.body.appendChild(_this.scriptTag);
        _this.scriptTag.id = _this.options.provider;
        _this.scriptTag.onload = resolve;
        _this.scriptTag.onerror = reject;
        _this.scriptTag.async = true;
        _this.scriptTag.src = _this.scriptSrc;
        if (_this.styleSrc) {
          var styleTag = document.createElement('link');
          document.head.appendChild(styleTag);
          styleTag.rel = 'stylesheet';
          styleTag.href = _this.styleSrc;
        }
      });
      scriptPromise.then(function () {
        _this.srcLoaded = true;
      });
    }
  }, {
    key: 'overlay',
    value: function overlay(canvas, callback) {
      var _this2 = this;

      if (canvas.elt !== undefined) {
        this.canvas = canvas.elt;
      } else {
        this.canvas = canvas;
      }
      this.scriptTag.onload = function () {
        _this2.mappaDiv = document.createElement('div');
        if (_this2.canvas.parentElement) {
          _this2.canvas.parentElement.appendChild(_this2.mappaDiv);
        } else {
          document.body.appendChild(_this2.mappaDiv);
        }
        _this2.mappaDiv.setAttribute('style', 'width:' + canvas.width + 'px;height:' + canvas.height + 'px;');
        _this2.mappaDiv.setAttribute('id', _this2.id);
        _this2.createMap();
        if (typeof callback === 'function') {
          callback();
        }
      };
    }
  }, {
    key: 'latLngToPixel',
    value: function latLngToPixel() {
      var pos = void 0;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_typeof(args[0]) === 'object') {
        pos = args[0];
      } else {
        pos = {
          lat: Number(args[0]),
          lng: Number(args[1])
        };
      }
      return this.fromLatLngToPixel(pos);
    }
  }, {
    key: 'pixelToLatLng',
    value: function pixelToLatLng() {
      return this.fromPointToLatLng.apply(this, arguments);
    }
  }, {
    key: 'zoom',
    value: function zoom() {
      return Math.floor(this.getZoom());
    }
  }, {
    key: 'geoJSON',
    value: function geoJSON() {
      return (0, _parseGeoJSON2.default)(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    }
  }]);

  return TileMap;
}();

exports.default = TileMap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(1);

var _TileMap3 = _interopRequireDefault(_TileMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Leaflet v1.3.0
// Reference: http://leafletjs.com/reference-1.3.0.html
//-----------

var Leaflet = function (_TileMap) {
  _inherits(Leaflet, _TileMap);

  function Leaflet(options) {
    _classCallCheck(this, Leaflet);

    var _this = _possibleConstructorReturn(this, (Leaflet.__proto__ || Object.getPrototypeOf(Leaflet)).call(this, options));

    _this.scriptSrc = 'https://unpkg.com/leaflet@1.3.0/dist/leaflet.js';
    _this.styleSrc = 'https://unpkg.com/leaflet@1.3.0/dist/leaflet.css';
    _this.ready = false;
    if (_this.constructor.name === 'Leaflet') {
      _this.loadSrc();
    }
    return _this;
  }

  _createClass(Leaflet, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      this.map = L.map(this.id, {
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
          var container = L.DomUtil.create('div', 'leaflet-layer');
          container.appendChild(_this3.canvas);
          overlayPane.appendChild(container);
        },
        drawLayer: function drawLayer() {}
      });
      var overlay = new L.overlay();
      this.map.addLayer(overlay);

      var cnvs = this.canvas.getContext('webgl') || this.canvas.getContext('2d');
      this.map.on('move', function () {
        var d = _this3.map.dragging._draggable;
        if (d._newPos) {
          cnvs.canvas.style.transform = 'translate(' + -d._newPos.x + 'px, ' + -d._newPos.y + 'px)';
        };
      });
    }
  }, {
    key: 'fromLatLngToPixel',
    value: function fromLatLngToPixel(position) {
      if (this.ready) {
        var containerPoint = this.map.latLngToContainerPoint(position);
        return {
          x: containerPoint.x,
          y: containerPoint.y
        };
      }
      return {
        x: -100,
        y: -100
      };
    }
  }, {
    key: 'fromPointToLatLng',
    value: function fromPointToLatLng() {
      if (this.ready) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.map.containerPointToLatLng(args);
      }
      return {
        lat: -100,
        lng: -100
      };
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      if (this.ready) {
        return this.map.getZoom();
      }
      return 0;
    }
  }, {
    key: 'onChange',
    value: function onChange(callback) {
      var _this4 = this;

      if (this.ready) {
        callback();
        this.map.on('move', callback);
      } else {
        setTimeout(function () {
          _this4.onChange(callback);
        }, 200);
      }
    }
  }, {
    key: 'removeOnChange',
    value: function removeOnChange(callback) {
      this.map.on('move', callback);
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
}(_TileMap3.default);

exports.default = Leaflet;

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

var eachFeature = function eachFeature(feature, type) {
  if (feature.hasOwnProperty('geometry') && feature.geometry.type === type) {
    return feature.geometry.coordinates;
  } else if (feature.hasOwnProperty('geometries') && feature.geometries instanceof Array && feature.geometry.type === type) {
    feature.geometries.forEach(function (geometry) {
      return feature.geometry.coordinates;
    });
  } else if (feature.hasOwnProperty('coordinates') && feature.geometry.type === type) {
    return feature.geometry.coordinates;
  } else {
    return null;
  }
};

var parseGeoJSON = function parseGeoJSON(data, type) {
  var result = [];

  if (data.type === 'FeatureCollection') {
    if (data.features instanceof Array) {
      data.features.forEach(function (feature) {
        var f = eachFeature(feature, type);
        if (f != undefined) {
          result.push(f);
        }
      });
    }
  } else {
    result = eachFeature(data, type);
  }
  return result;
};

exports.default = parseGeoJSON;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticMap = exports.Mapquest = exports.Google = exports.Mapbox = undefined;

var _Mapbox = __webpack_require__(8);

var _Mapbox2 = _interopRequireDefault(_Mapbox);

var _Google = __webpack_require__(7);

var _Google2 = _interopRequireDefault(_Google);

var _Mapquest = __webpack_require__(9);

var _Mapquest2 = _interopRequireDefault(_Mapquest);

var _StaticMap = __webpack_require__(0);

var _StaticMap2 = _interopRequireDefault(_StaticMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -----------
// Static Map Providers
// -----------

exports.Mapbox = _Mapbox2.default;
exports.Google = _Google2.default;
exports.Mapquest = _Mapquest2.default;
exports.StaticMap = _StaticMap2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapbox = exports.Leaflet = exports.Google = exports.MapboxGL = undefined;

var _MapboxGL = __webpack_require__(12);

var _MapboxGL2 = _interopRequireDefault(_MapboxGL);

var _Google = __webpack_require__(10);

var _Google2 = _interopRequireDefault(_Google);

var _Leaflet = __webpack_require__(2);

var _Leaflet2 = _interopRequireDefault(_Leaflet);

var _Mapbox = __webpack_require__(11);

var _Mapbox2 = _interopRequireDefault(_Mapbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -----------
// Tile Map Providers
// -----------

exports.MapboxGL = _MapboxGL2.default;
exports.Google = _Google2.default;
exports.Leaflet = _Leaflet2.default;
exports.Mapbox = _Mapbox2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tileMap2 = __webpack_require__(5);

var _tileMap = _interopRequireWildcard(_tileMap2);

var _staticMap2 = __webpack_require__(4);

var _staticMap = _interopRequireWildcard(_staticMap2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      if (_typeof(args[0]) === 'object') {
        options = Object.assign({}, args[0]);
      } else {
        var opts = _staticMap[this.provider].options().userInput;
        args.forEach(function (el, i) {
          var option = opts[i];
          options[option] = el;
        });
      }
      options.key = this.key;
      if (this.provider === undefined) {
        this.provider = 'StaticMap';
      }
      return new _staticMap[this.provider](options);
    }
  }, {
    key: 'tileMap',
    value: function tileMap() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var options = {};

      if (_typeof(args[0]) === 'object') {
        options = Object.assign({}, args[0]);
      } else {
        ['lat', 'lng', 'zoom'].forEach(function (el, i) {
          options[el] = args[i];
        });
      }
      options.key = this.key;
      options.provider = this.provider;
      return new _tileMap[this.provider](options);
    }
  }]);

  return Mappa;
}();

console.log('Mappa loaded!');
module.exports = Mappa;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(0);

var _StaticMap3 = _interopRequireDefault(_StaticMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      if (this.options.scale === 1 || this.options.scale === undefined) {
        this.options.pixels = 128;
        this.options.scale = 1;
      } else if (this.options.scale === 2) {
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
      var _this2 = this;

      if (!this.options.key) {
        delete this.options.key;
        Google.messages().key();
      }
      if (!this.options.center) {
        this.options.center = this.options.lat + ',' + this.options.lng;
      }
      if (!this.options.scale) {
        this.options.scale = 1;
      }
      this.options.size = this.options.width + 'x' + this.options.height;

      Object.keys(this.options).forEach(function (option) {
        if (Google.options().valid.indexOf(option) > -1) {
          _this2.imgUrl += '&' + option + '=' + _this2.options[option];
        }
      });
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
          console.warn('For better results please provide an API key for your Google Maps Static API.');
        }
      };
    }
  }]);

  return Google;
}(_StaticMap3.default);

exports.default = Google;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(0);

var _StaticMap3 = _interopRequireDefault(_StaticMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      if (!this.options.scale) {
        this.options.scale = 1;
      }
      if (this.options.scale === 2) {
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
        return null;
      }
      if (this.options.username !== undefined) {
        this.imgUrl += this.options.username + '/';
      } else {
        this.imgUrl += 'mapbox/';
      }
      if (this.options.style !== undefined) {
        this.imgUrl += this.options.style + '/';
      } else {
        this.imgUrl += 'streets-v10/';
      }

      this.imgUrl += 'static/';

      if (this.options.overlay !== undefined) {
        this.imgUrl += this.options.overlay + '/';
      }

      this.imgUrl += this.options.lng + ',' + this.options.lat + ',';

      if (this.options.auto === false || this.options.auto === undefined) {
        ['zoom', 'bearing', 'pitch'].forEach(function (e, i) {
          if (_this2.options[e] !== undefined) {
            _this2.imgUrl += _this2.options[e];
          } else {
            _this2.imgUrl += 0;
          }
          if (i < 2) {
            _this2.imgUrl += ',';
          }
        });
      } else {
        this.imgUrl += 'auto';
      }

      this.imgUrl += '/' + this.options.width + 'x' + this.options.height;

      if (this.options.scale === 2) {
        this.imgUrl += '@2x';
      }
      this.imgUrl += '?access_token=' + this.options.key;
      if (this.options.attribution) {
        this.imgUrl += '&attribution=' + this.options.attribution;
      } else {
        this.imgUrl += '&attribution=false';
      }
      if (this.options.logo) {
        this.imgUrl += '&logo=' + this.options.logo;
      } else {
        this.imgUrl += '&logo=false';
      }
      if (this.options.before_layer) {
        this.imgUrl += '&before_layer=' + this.options.before_layer;
      } else {
        this.imgUrl += '&before_layer=false';
      }
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
}(_StaticMap3.default);

exports.default = Mapbox;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(0);

var _StaticMap3 = _interopRequireDefault(_StaticMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      if (this.options.scale === 1 || this.options.scale === undefined) {
        this.options.pixels = 128;
        this.options.scale = 1;
      } else if (this.options.scale === 2) {
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
      var _this2 = this;

      if (!this.options.key) {
        Mapquest.messages().key();
        return null;
      }

      this.options.size = this.options.width + ',' + this.options.height;
      if (this.options.scale === 2) {
        this.options.size += '@2x';
      }
      if (!this.options.center) {
        this.options.center = this.options.lat + ',' + this.options.lng;
      }
      Object.keys(this.options).forEach(function (opt) {
        if (Mapquest.options().valid.indexOf(opt) > -1) {
          _this2.imgUrl += '&' + opt + '=' + _this2.options[opt];
        }
      });
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
}(_StaticMap3.default);

exports.default = Mapquest;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(1);

var _TileMap3 = _interopRequireDefault(_TileMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    _this.scriptSrc = 'https://maps.googleapis.com/maps/api/js?v=3';
    if (_this.options.key) {
      _this.scriptSrc += '&key=' + _this.options.key;
    }
    if (_this.options.language) {
      _this.scriptSrc += '&language=' + _this.options.language;
    }
    if (_this.options.region) {
      _this.scriptSrc += '&region=' + _this.options.region;
    }
    _this.onChangeMethods = {};
    _this.loadSrc();
    return _this;
  }

  _createClass(Google, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      if (!this.options.key) {
        Google.messages().key();
      }

      this.map = new google.maps.Map(document.getElementById(this.id), {
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
        var pixels = 2;
        if (window.devicePixelRatio >= 2) {
          pixels = 4;
        }
        var offsetX = -Math.round(_this2.canvas.width / pixels - center.x);
        var offsetY = -Math.round(_this2.canvas.height / pixels - center.y);
        var cvs = _this2.canvas.getContext('webgl') || _this2.canvas.getContext('2d');
        cvs.canvas.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
      });
      google.maps.event.addListenerOnce(this.map, 'tilesloaded', function () {
        _this2.ready = true;
      });
    }
  }, {
    key: 'fromLatLngToPixel',
    value: function fromLatLngToPixel(inputPos) {
      if (this.ready) {
        var position = new google.maps.LatLng(inputPos);
        var topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
        var bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
        var scale = Math.pow(2, this.map.getZoom());
        var point = this.map.getProjection().fromLatLngToPoint(position);
        return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
      }
      return {
        x: -100,
        y: -100
      };
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
        return {
          lat: latlng.lat(),
          lng: latlng.lng()
        };
      }
      return {
        lat: -100,
        lng: -100
      };
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      if (this.ready) {
        return this.map.getZoom();
      }
      return 0;
    }
  }, {
    key: 'onChange',
    value: function onChange(callback) {
      var _this3 = this;

      if (this.ready) {
        callback();
        this.onChangeMethods[callback] = google.maps.event.addListener(this.map, 'bounds_changed', callback);
      } else {
        setTimeout(function () {
          _this3.onChange(callback);
        }, 200);
      }
    }
  }, {
    key: 'removeOnChange',
    value: function removeOnChange(callback) {
      google.maps.event.removeListener(this.onChangeMethods[callback]);
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
}(_TileMap3.default);

exports.default = Google;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Leaflet2 = __webpack_require__(2);

var _Leaflet3 = _interopRequireDefault(_Leaflet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    _this.scriptSrc = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
    _this.styleSrc = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css';
    _this.loadSrc();
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
      }
      this.map = L.mapbox.map(this.id).setView([this.options.lat, this.options.lng], this.options.zoom);

      if (this.options.studio) {
        this.tiles = L.mapbox.styleLayer(this.options.style || 'mapbox://styles/mapbox/emerald-v8').addTo(this.map);
      } else {
        this.tiles = L.mapbox.tileLayer(this.options.style || 'mapbox.streets').addTo(this.map);
      }

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
}(_Leaflet3.default);

exports.default = Mapbox;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(1);

var _TileMap3 = _interopRequireDefault(_TileMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Mapbox-gl v0.43.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/
// -----------

var MapboxGL = function (_TileMap) {
  _inherits(MapboxGL, _TileMap);

  function MapboxGL(options) {
    _classCallCheck(this, MapboxGL);

    var _this = _possibleConstructorReturn(this, (MapboxGL.__proto__ || Object.getPrototypeOf(MapboxGL)).call(this, options));

    _this.scriptSrc = 'https://api.mapbox.com/mapbox-gl-js/v1.13.0/mapbox-gl.js';
    _this.styleSrc = 'https://api.mapbox.com/mapbox-gl-js/v1.13.0/mapbox-gl.css';
    _this.ready = false;
    if (!_this.options.key) {
      MapboxGL.messages().key();
    } else {
      _this.loadSrc();
    }
    return _this;
  }

  _createClass(MapboxGL, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      mapboxgl.accessToken = this.options.key;
      this.map = new mapboxgl.Map({
        container: this.id,
        style: this.options.style || 'mapbox://styles/mapbox/satellite-streets-v11',
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
      if (this.options.opacity) {
        document.getElementsByClassName('mapboxgl-canvas')[0].style.opacity = this.options.opacity;
      }
      this.map.on('load', function () {
        _this2.ready = true;
      });
    }
  }, {
    key: 'fromLatLngToPixel',
    value: function fromLatLngToPixel(latLng) {
      if (this.ready) {
        return this.map.project(latLng);
      }
      return {
        x: -100,
        y: -100
      };
    }
  }, {
    key: 'fromPointToLatLng',
    value: function fromPointToLatLng() {
      if (this.ready) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.map.unproject(args);
      }
      return {
        lat: -100,
        lng: -100
      };
    }
  }, {
    key: 'getZoom',
    value: function getZoom() {
      if (this.ready) {
        return this.map.getZoom();
      }
      return 0;
    }
  }, {
    key: 'onChange',
    value: function onChange(callback) {
      var _this3 = this;

      if (this.ready) {
        callback();
        this.map.on('render', callback);
      } else {
        setTimeout(function () {
          _this3.onChange(callback);
        }, 200);
      }
    }
  }, {
    key: 'removeOnChange',
    value: function removeOnChange(callback) {
      this.map.off('render', callback);
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

  return MapboxGL;
}(_TileMap3.default);

exports.default = MapboxGL;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// GUID Generator
var s4 = function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
var GUID = function GUID() {
  return "" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};

exports.default = GUID;

/***/ })
/******/ ]);
});