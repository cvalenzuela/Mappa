
function CanvasLayer(opt_options) {
  this.isAdded_ = false;
  this.isAnimated_ = false;
  this.paneName_ = CanvasLayer.DEFAULT_PANE_NAME_;
  this.updateHandler_ = null;
  this.resizeHandler_ = null;
  this.topLeft_ = null;
  this.centerListener_ = null;
  this.resizeListener_ = null;
  this.needsResize_ = true;
  this.requestAnimationFrameId_ = null;

  var canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = 'none';
  this.canvas = canvas;
  this.canvasCssWidth_ = 300;
  this.canvasCssHeight_ = 150;
  this.resolutionScale_ = 1;

  function simpleBindShim(thisArg, func) {
    return function() { func.apply(thisArg); };
  }

  this.repositionFunction_ = simpleBindShim(this, this.repositionCanvas_);
  this.resizeFunction_ = simpleBindShim(this, this.resize_);
  this.requestUpdateFunction_ = simpleBindShim(this, this.update_);

  // set provided options, if any
  if (opt_options) {
    this.setOptions(opt_options);
  }
}

CanvasLayer.prototype = new google.maps.OverlayView();
CanvasLayer.DEFAULT_PANE_NAME_ = 'overlayLayer';
CanvasLayer.CSS_TRANSFORM_ = (function() {
  var div = document.createElement('div');
  var transformProps = [
    'transform',
    'WebkitTransform',
    'MozTransform',
    'OTransform',
    'msTransform'
  ];
  for (var i = 0; i < transformProps.length; i++) {
    var prop = transformProps[i];
    if (div.style[prop] !== undefined) {
      return prop;
    }
  }

  // return unprefixed version by default
  return transformProps[0];
})();

CanvasLayer.prototype.requestAnimFrame_ =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function (callback) {
  return window.setTimeout(callback, 1000 / 60);
};

CanvasLayer.prototype.cancelAnimFrame_ =
window.cancelAnimationFrame ||
window.webkitCancelAnimationFrame ||
window.mozCancelAnimationFrame ||
window.oCancelAnimationFrame ||
window.msCancelAnimationFrame ||
function (requestId) {};

CanvasLayer.prototype.setOptions = function (options) {
  if (options.animate !== undefined) {
    this.setAnimate(options.animate);
  }

  if (options.paneName !== undefined) {
    this.setPaneName(options.paneName);
  }

  if (options.updateHandler !== undefined) {
    this.setUpdateHandler(options.updateHandler);
  }

  if (options.resizeHandler !== undefined) {
    this.setResizeHandler(options.resizeHandler);
  }

  if (options.resolutionScale !== undefined) {
    this.setResolutionScale(options.resolutionScale);
  }

  if (options.map !== undefined) {
    this.setMap(options.map);
  }
};

CanvasLayer.prototype.setAnimate = function(animate) {
  this.isAnimated_ = !!animate;

  if (this.isAnimated_) {
    this.scheduleUpdate();
  }
};


CanvasLayer.prototype.isAnimated = function() {
  return this.isAnimated_;
};

CanvasLayer.prototype.setPaneName = function(paneName) {
  this.paneName_ = paneName;

  this.setPane_();
};

CanvasLayer.prototype.getPaneName = function() {
  return this.paneName_;
};

CanvasLayer.prototype.setPane_ = function() {
  if (!this.isAdded_) {
    return;
  }

  // onAdd has been called, so panes can be used
  var panes = this.getPanes();
  if (!panes[this.paneName_]) {
    throw new Error('"' + this.paneName_ + '" is not a valid MapPane name.');
  }

  panes[this.paneName_].appendChild(this.canvas);
};

CanvasLayer.prototype.setResizeHandler = function(opt_resizeHandler) {
  this.resizeHandler_ = opt_resizeHandler;
};

CanvasLayer.prototype.setResolutionScale = function(scale) {
  if (typeof scale === 'number') {
    this.resolutionScale_ = scale;
    this.resize_();
  }
};

CanvasLayer.prototype.setUpdateHandler = function(opt_updateHandler) {
  this.updateHandler_ = opt_updateHandler;
};

CanvasLayer.prototype.onAdd = function() {
  if (this.isAdded_) {
    return;
  }

  this.isAdded_ = true;
  this.setPane_();

  this.resizeListener_ = google.maps.event.addListener(this.getMap(),
  'resize', this.resizeFunction_);
  this.centerListener_ = google.maps.event.addListener(this.getMap(),
  'center_changed', this.repositionFunction_);

  this.resize_();
  this.repositionCanvas_();
};

CanvasLayer.prototype.onRemove = function() {
  if (!this.isAdded_) {
    return;
  }

  this.isAdded_ = false;
  this.topLeft_ = null;

  // remove canvas and listeners for pan and resize from map
  this.canvas.parentElement.removeChild(this.canvas);
  if (this.centerListener_) {
    google.maps.event.removeListener(this.centerListener_);
    this.centerListener_ = null;
  }
  if (this.resizeListener_) {
    google.maps.event.removeListener(this.resizeListener_);
    this.resizeListener_ = null;
  }

  // cease canvas update callbacks
  if (this.requestAnimationFrameId_) {
    this.cancelAnimFrame_.call(window, this.requestAnimationFrameId_);
    this.requestAnimationFrameId_ = null;
  }
};

CanvasLayer.prototype.resize_ = function () {
  if(!this.isAdded_) {
    return;
  }

  var map = this.getMap();
  var mapWidth = map.getDiv().offsetWidth;
  var mapHeight = map.getDiv().offsetHeight;

  var newWidth = mapWidth * this.resolutionScale_;
  var newHeight = mapHeight * this.resolutionScale_;
  var oldWidth = this.canvas.width;
  var oldHeight = this.canvas.height;

  // resizing may allocate a new back buffer, so do so conservatively
  if (oldWidth !== newWidth || oldHeight !== newHeight) {
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;

    this.needsResize_ = true;
    this.scheduleUpdate();
  }

  // reset styling if new sizes don't match; resize of data not needed
  if (this.canvasCssWidth_ !== mapWidth ||
    this.canvasCssHeight_ !== mapHeight) {
      this.canvasCssWidth_ = mapWidth;
      this.canvasCssHeight_ = mapHeight;
      this.canvas.style.width = mapWidth + 'px';
      this.canvas.style.height = mapHeight + 'px';
    }
  };

  CanvasLayer.prototype.draw = function() {
    this.repositionCanvas_();
  };

  CanvasLayer.prototype.repositionCanvas_ = function() {

    var map = this.getMap();
    var top = map.getBounds().getNorthEast().lat();
    var center = map.getCenter();
    var scale = Math.pow(2, map.getZoom());
    var left = center.lng() - (this.canvasCssWidth_ * 180) / (256 * scale);
    this.topLeft_ = new google.maps.LatLng(top, left);
    var projection = this.getProjection();
    var divCenter = projection.fromLatLngToDivPixel(center);
    var offsetX = -Math.round(this.canvasCssWidth_ / 2 - divCenter.x);
    var offsetY = -Math.round(this.canvasCssHeight_ / 2 - divCenter.y);
    this.canvas.style[CanvasLayer.CSS_TRANSFORM_] = 'translate(' +
    offsetX + 'px,' + offsetY + 'px)';

    this.scheduleUpdate();
  };

  CanvasLayer.prototype.update_ = function() {
    this.requestAnimationFrameId_ = null;
    if (!this.isAdded_) {
      return;
    }
    if (this.isAnimated_) {
      this.scheduleUpdate();
    }

    if (this.needsResize_ && this.resizeHandler_) {
      this.needsResize_ = false;
      this.resizeHandler_();
    }

    if (this.updateHandler_) {
      this.updateHandler_();
    }
  };

  CanvasLayer.prototype.getTopLeft = function() {
    return this.topLeft_;
  };

  CanvasLayer.prototype.scheduleUpdate = function() {
    if (this.isAdded_ && !this.requestAnimationFrameId_) {
      this.requestAnimationFrameId_ =
      this.requestAnimFrame_.call(window, this.requestUpdateFunction_);
    }
  };
