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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------
// Tiled Map
// -----------

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
    key: 'append',
    value: function append(canvas) {
      var _this = this;

      this.scriptTag.onload = function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        div.setAttribute('style', 'position:absolute;width:' + canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:-99');
        div.setAttribute('id', 'mappa');
        _this.canvas = canvas;
        _this.map = _this.createMap();
      };
    }
  }, {
    key: 'latLng',
    value: function latLng() {
      var pos = { lat: float(arguments.length <= 0 ? undefined : arguments[0]), lng: float(arguments.length <= 1 ? undefined : arguments[1]) };
      return this.fromLatLngtoPixel(pos);
    }
  }, {
    key: 'zoom',
    value: function zoom() {
      return Math.floor(this.fromZoomtoPixel());
    }
  }]);

  return TileMap;
}();

exports.TileMap = TileMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------
// Static Map
// -----------

var StaticMap = function () {
  function StaticMap(options) {
    _classCallCheck(this, StaticMap);

    this.options = options;
  }

  _createClass(StaticMap, [{
    key: "latLng",
    value: function latLng(lat, lng) {
      return {
        x: this.fromLngToPoint(lng) - this.fromLngToPoint(this.options.lng) + this.options.width / (2 / this.options.scale),
        y: this.fromLatToPoint(lat) - this.fromLatToPoint(this.options.lat) + this.options.height / (2 / this.options.scale)
      };
    }
  }, {
    key: "fromLatToPoint",
    value: function fromLatToPoint(l) {
      return this.options.pixels / PI * pow(2, this.options.zoom) * (PI - log(tan(PI / 4 + radians(l) / 2)));
    }
  }, {
    key: "fromLngToPoint",
    value: function fromLngToPoint(l) {
      return this.options.pixels / PI * pow(2, this.options.zoom) * (radians(l) + PI);
    }
  }]);

  return StaticMap;
}();

exports.StaticMap = StaticMap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mapbox = __webpack_require__(6);

Object.keys(_Mapbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mapbox[key];
    }
  });
});

var _Google = __webpack_require__(5);

Object.keys(_Google).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Google[key];
    }
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mapboxgl = __webpack_require__(9);

Object.keys(_Mapboxgl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mapboxgl[key];
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

var _Leaflet = __webpack_require__(8);

Object.keys(_Leaflet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Leaflet[key];
    }
  });
});

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

var _tileMap2 = __webpack_require__(3);

var _tileMap = _interopRequireWildcard(_tileMap2);

var _staticMap2 = __webpack_require__(2);

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
      var options = void 0;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_typeof(args[0]) == 'object') {
        options = Object.assign({}, args[0]);
      } else {
        var _options = _staticMap[this.provider].options();
        args.forEach(function (el, i) {
          var option = _options[i];
          options[option] = el;
        });
      };
      options.key = this.key;

      return new _staticMap[this.provider](options);
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
      options.provider = this.provider;
      return new _tileMap[this.provider](options);
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
exports.Google = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(1);

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

    _this.url = 'https://maps.googleapis.com/maps/api/staticmap?';
    _this.init();
    _this.img = _this.createImage();
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
        Google.messages().size('width', options.width);
        this.options.width = 640;
      }
      if (this.options.height > 640) {
        Google.messages().size('height', options.height);
        this.options.height = 640;
      }
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      !this.options.key && Google.messages().key();

      this.options.size = this.options.width + 'x' + this.options.height;
      !this.options.center && (this.options.center = this.options.lat + ',' + this.options.lng);
      !this.options.scale && (this.options.scale = 1);

      for (var option in this.options) {
        options().valid.indexOf(this.options[option]) > -1 && (this.url += '&' + option + '=' + this.options[option]);
      }return this.url;
    }
  }], [{
    key: 'options',
    value: function options() {
      return {
        valid: ['center', 'zoom', 'size', 'scale', 'format', 'maptype', 'language', 'region', 'markers', 'path', 'visible', 'style', 'signature', 'key', 'signature'],
        userInput: ['lat', 'lng', 'center', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'markers', 'path', 'visible', 'style', 'key', 'signature']
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticMap2 = __webpack_require__(1);

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

    _this.url = 'https://api.mapbox.com/styles/v1/';
    _this.init();
    _this.img = _this.createImage();
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
        if (this.options.width > 1024) {
          Mapbox.messages().size('width', this.options.width);
          this.options.width = 1024;
        }
        if (this.options.height > 1024) {
          Mapbox.messages().size('height', this.options.width);
          this.options.height = 1024;
        }
      }
      console.log(this.options);
    }
  }, {
    key: 'createImage',
    value: function createImage() {
      var _this2 = this;

      if (!this.options.key) {
        Mapbox.messages().key();
        return;
      }
      this.options.username != undefined ? this.url += this.options.username + '/' : this.url += 'mapbox/';
      this.options.style != undefined ? this.url += this.options.style + '/' : this.url += 'streets-v10/';
      this.url += 'static/';
      this.options.overlay != undefined && (this.url += this.options.overlay + '/');
      this.url += this.options.lng + ',' + this.options.lat + ',';
      this.options.auto == false || this.options.auto == undefined ? ['zoom', 'bearing', 'pitch'].forEach(function (e, i) {
        _this2.options[e] != undefined ? _this2.url += _this2.options[e] : _this2.url += 0;
        i < 2 && (_this2.url += ',');
      }) : this.url += 'auto';
      this.url += '/' + this.options.width + 'x' + this.options.height;
      this.options.scale == 2 && (this.url += '@2x');
      this.url += '?access_token=' + this.options.key;
      this.options.attribution ? this.url += '&attribution=' + this.options.attribution : this.url += '&attribution=false';
      this.options.logo ? this.url += '&logo=' + this.options.logo : this.url += '&logo=false';
      this.options.before_layer ? this.url += '&before_layer=' + this.options.before_layer : this.url += '&before_layer=false';
      return this.url;
    }
  }], [{
    key: 'options',
    value: function options() {
      return ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'];
    }
  }, {
    key: 'messages',
    value: function messages() {
      return {
        size: function size(s, m) {
          return console.warn('You requested an image with a ' + s + ' of ' + m + 'px. Mapbox Static API max ' + s + ' value is 1024px.');
        },
        key: function key() {
          console.error('Mapbox need an API key to work. Please provide an API key for your map provider. To get a key visit: https://www.mapbox.com/api-documentation/#static');
        }
      };
    }
  }]);

  return Mapbox;
}(_StaticMap2.StaticMap);

exports.Mapbox = Mapbox;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Google = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(0);

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
    _this.init();
    return _this;
  }

  _createClass(Google, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      !this.options.key && Google.messages().key();

      var map = new google.maps.Map(document.getElementById('mappa'), {
        center: { lat: this.options.lat, lng: this.options.lng },
        zoom: this.options.zoom || 6
      });

      var overlay = new google.maps.OverlayView();
      overlay.draw = function () {};
      overlay.setMap(map);
      overlay.onAdd = function () {
        overlay.getPanes().overlayLayer.appendChild(_this2.canvas.elt);
      };

      google.maps.event.addListener(map, 'bounds_changed', function () {
        var center = overlay.getProjection().fromLatLngToDivPixel(map.getCenter());
        var offsetX = -Math.round(_this2.canvas.width / 2 - center.x);
        var offsetY = -Math.round(_this2.canvas.height / 2 - center.y);
        var _canvas = _this2.canvas.elt.getContext('webgl') || _this2.canvas.elt.getContext('2d');
        _canvas.canvas.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
      });

      google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
        _this2.ready = true;
      });

      return map;
    }
  }, {
    key: 'fromLatLngtoPixel',
    value: function fromLatLngtoPixel(position) {
      if (this.ready) {
        position = new google.maps.LatLng(position);
        var topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
        var bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
        var scale = Math.pow(2, this.map.getZoom());
        var worldPoint = this.map.getProjection().fromLatLngToPoint(position);
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
      } else {
        return { x: -100, y: -100 };
      }
    }
  }, {
    key: 'fromZoomtoPixel',
    value: function fromZoomtoPixel() {
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Leaflet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // -----------
// Leaflet v1.0.3
// Reference: http://leafletjs.com/reference-1.0.3.html
// -----------

var Leaflet = function (_TileMap) {
  _inherits(Leaflet, _TileMap);

  function Leaflet(options) {
    _classCallCheck(this, Leaflet);

    var _this = _possibleConstructorReturn(this, (Leaflet.__proto__ || Object.getPrototypeOf(Leaflet)).call(this, options));

    _this.script = 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.js';
    _this.style = 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.css';
    _this.init();
    return _this;
  }

  _createClass(Leaflet, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      var map = L.map('mappa').setView([this.options.lat, this.options.lng], this.options.zoom);

      var tiles = L.tileLayer(this.options.style).addTo(map);

      tiles.on('tileload', function () {
        _this2.ready = true;
      });

      L.overlay = L.Layer.extend({
        onAdd: function onAdd() {

          var overlayPane = overlay.getPane();
          var _container = L.DomUtil.create('div', 'leaflet-layer');
          _container.appendChild(_this2.canvas.elt);
          overlayPane.appendChild(_container);
        },
        drawLayer: function drawLayer() {}
      });

      var overlay = new L.overlay();
      map.addLayer(overlay);

      map.on('move', function () {
        var d = map.dragging._draggable;
        var _canvas = _this2.canvas.elt.getContext('webgl') || _this2.canvas.elt.getContext('2d');
        _canvas.canvas.style.transform = 'translate(' + -d._newPos.x + 'px,' + -d._newPos.y + 'px)';
      });

      return map;
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
    key: 'fromZoomtoPixel',
    value: function fromZoomtoPixel() {
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

  return Leaflet;
}(_TileMap2.TileMap);

exports.Leaflet = Leaflet;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapboxgl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileMap2 = __webpack_require__(0);

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
      var map = new mapboxgl.Map({
        container: 'mappa',
        style: this.options.style || 'mapbox://styles/mapbox/satellite-streets-v10',
        center: [this.options.lng, this.options.lat],
        zoom: this.options.zoom
      });
      this.canvas.parent(map.getCanvasContainer());
      this.canvas.elt.style.position = 'absolute';

      map.on('load', function () {
        _this2.ready = true;
      });

      return map;
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
    key: 'fromZoomtoPixel',
    value: function fromZoomtoPixel() {
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

/***/ })
/******/ ]);
});