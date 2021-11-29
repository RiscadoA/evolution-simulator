// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"11zn2":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "3a6cf3c0e7f05703";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jZgE0":[function(require,module,exports) {
var _app = require("./app/app");
document.addEventListener('DOMContentLoaded', ()=>{
    const app = new _app.App();
    app.start();
});

},{"./app/app":"dOyN2"}],"dOyN2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Manages all the application state.
 */ parcelHelpers.export(exports, "App", ()=>App
);
var _gl = require("./gl");
var _math = require("./math");
var _sim = require("./sim");
var _ui = require("./ui");
/** The movement speed of the camera. */ const CAMERA_MOVEMENT_SPEED = 0.002;
/** The zoom speed of the camera. */ const CAMERA_ZOOM_SPEED = 0.1;
/** Maximum number of skipped frames. */ const MAX_SKIP = 5;
/** Help page URL. */ const HELP_URL = 'https://riscadoa.com/portfolio/evolution-simulator/';
class App {
    // Default constructor.
    constructor(){
        this._stage = null;
        // Initialize the loading screen.
        this.loadingScreen = _ui.LoadingScreen.fromSelector('div#loading');
        // Initialize the renderer.
        const canvas = document.getElementById('canvas');
        this._renderer = _gl.createRenderer(canvas);
        // Initialize the resize callback.
        window.addEventListener('resize', ()=>{
            this.loadingScreen.loading = true;
            window.clearTimeout(this._resizeTimer);
            this._resizeTimer = window.setTimeout(()=>{
                this._renderer.resize();
                this.loadingScreen.loading = false;
            }, 250);
        });
        // Initialize the mouse input callbacks.
        this._lastMouse = null;
        this._selectedCreature = null;
        canvas.addEventListener('mousedown', (e)=>{
            if (e.button !== 0) return;
            this._lastMouse = _math.Vec2.new(e.offsetX, e.offsetY);
            this._selectedCreature = this._stage?.pickCreature(this._renderer.camera.canvasToWorld(this._lastMouse)) ?? null;
            if (this._selectedCreature !== null) this._lastMouse = null;
        });
        canvas.addEventListener('mousemove', (e)=>{
            if (this._lastMouse !== null) {
                const mouse = _math.Vec2.new(e.offsetX, e.offsetY);
                const delta = mouse.sub(this._lastMouse);
                this._lastMouse = mouse;
                // Update the camera.
                const movement = _math.Vec2.new(-delta.x, delta.y).mul(CAMERA_MOVEMENT_SPEED / this._renderer.camera.zoom);
                this._renderer.camera.position = this._renderer.camera.position.add(movement);
            }
        });
        canvas.addEventListener('mouseup', (e)=>{
            if (e.button !== 0) return;
            this._lastMouse = null;
        });
        canvas.addEventListener('wheel', (e)=>{
            const delta = e.deltaY;
            const zoom = delta < 0 ? CAMERA_ZOOM_SPEED : -CAMERA_ZOOM_SPEED;
            this._renderer.camera.zoom *= 1 + zoom;
        });
        // Initialize overlay.
        this._bestButton = _ui.Button.fromSelector(document.body, 'button#bestButton');
        this._bestButton.addOnClickCallback(()=>{
            if (this._stage !== null) this._selectedCreature = this._stage.getBestCreature();
        });
        this._currentGeneration = _ui.Display.fromSelector(document.body, 'div#currentGeneration');
        this._currentGeneration.value = 1;
        this._fitness = _ui.Display.fromSelector(document.body, 'div#fitness');
        this._fitness.visible = false;
        this._fitness.value = 0;
        this._simulationSpeed = _ui.Slider.fromSelector(document.body, 'div#simulationSpeed');
        this._fastForwardButton = _ui.Button.fromSelector(document.body, 'button#fastForwardButton');
        this._fastForwardButton.addOnClickCallback(()=>{
            if (this._stage !== null) window.setTimeout(()=>{
                while(this._fastForward);
                this._fastForward = true;
                while(!this._stage.update());
                this._currentGeneration.value += 1;
                this._stage.startRound();
                this._selectedCreature = null;
                this._fastForward = false;
            }, 50);
        });
        this._fastForward = false;
        this._fastForwardIcon = document.body.querySelector('i#fastForward');
        this._fastForwardIcon.classList.toggle('hidden', true);
        this._pauseIcon = document.body.querySelector('i#pause');
        this._pauseIcon.classList.toggle('hidden', true);
        this._helpButton = _ui.Button.fromSelector(document.body, 'button#helpButton');
        this._helpButton.addOnClickCallback(()=>{
            window.open(HELP_URL);
        });
        // Create introduction form.
        const intro = _ui.FormChain.fromSelector('#introduction');
        intro.visible = true;
        intro.setOnSubmit(()=>{
            // Get parameters from the form.
            const params = {
                population: intro.get('population').value,
                mutationRate: intro.get('mutationRate').value,
                eyeCount: intro.get('eyeCount').value,
                minExtraNeuronCount: intro.get('extraNeuronCount').value[0],
                maxExtraNeuronCount: intro.get('extraNeuronCount').value[1],
                minConnectionCount: intro.get('connectionCount').value[0],
                maxConnectionCount: intro.get('connectionCount').value[1],
                initialFoodCount: intro.get('initialFoodCount').value,
                newFoodRate: intro.get('newFoodRate').value,
                roundDuration: intro.get('roundDuration').value
            };
            // Create the stage.
            this._stage = new _sim.Stage(params);
            // Reset the view.
            this._renderer.camera.position = _math.Vec2.ZERO;
            this._renderer.camera.zoom = 0.25;
        });
    }
    /**
   * Starts the application.
   */ start() {
        // Initialize the time step timer.
        this._lastTime = 0;
        this._updateTimeAccumulator = 0;
        this._simulationTime = 0;
        this.loadingScreen.loading = false;
        this._renderer.submit(new _gl.CommandQueue(0));
        requestAnimationFrame(this.onAnimationFrame.bind(this));
    }
    /**
   * Animates the application.
   * @param dt Delta time in seconds.
   */ animate(dt) {
        this._fastForwardIcon.classList.toggle('hidden', !this._fastForward);
        // Update and draw the stage.
        if (this._stage !== null && !this._fastForward) {
            this._updateTimeAccumulator += dt * this._simulationSpeed.value;
            this._simulationTime += dt * this._simulationSpeed.value;
            if (this._updateTimeAccumulator >= _sim.TIME_STEP) {
                // Generate the draw command queue.
                let queue = new _gl.CommandQueue(this._simulationTime);
                this._stage.draw(queue);
                if (this._selectedCreature) {
                    this._renderer.camera.position = this._selectedCreature.position;
                    this._renderer.camera.velocity = this._selectedCreature.velocity;
                    this._selectedCreature.nn.draw(queue, this._selectedCreature.position.add(_math.Vec2.new(0, -0.5)), this._selectedCreature.velocity, 0.5);
                } else this._renderer.camera.velocity = _math.Vec2.ZERO;
                this._renderer.submit(queue);
                // Update the stage.
                for(let i = 0; i < MAX_SKIP && this._updateTimeAccumulator >= _sim.TIME_STEP; i++){
                    if (this._stage.update()) {
                        this._currentGeneration.value += 1;
                        this._stage.startRound();
                    }
                    this._updateTimeAccumulator -= _sim.TIME_STEP;
                }
                this._updateTimeAccumulator = 0;
                // Update the UI.
                this._fitness.visible = this._selectedCreature !== null;
                if (this._selectedCreature) this._fitness.value = this._selectedCreature.fitness;
            } else this._renderer.camera.position = this._renderer.camera.position.add(this._renderer.camera.velocity.mul(dt * this._simulationSpeed.value));
        }
        // Flush the renderer.
        this._renderer.flush(this._simulationTime);
    }
    /**
   * Called when the round ends.
   * @param time Time in milliseconds since the beginning of the application.
   */ onAnimationFrame(time) {
        // Calculate the delta time in seconds.
        const dt = time - this._lastTime;
        this._lastTime = time;
        // Animate the application.
        if (!this.loadingScreen.loading) this.animate(dt * 0.001);
        requestAnimationFrame(this.onAnimationFrame.bind(this));
    }
}

},{"./gl":"imKfc","./math":"gbL8L","./sim":"i5NYN","./ui":"eFpQJ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"imKfc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Camera", ()=>_camera.Camera
);
parcelHelpers.export(exports, "CommandQueue", ()=>_commandQueue.CommandQueue
);
parcelHelpers.export(exports, "Renderer", ()=>_renderer.Renderer
);
/**
 * Creates a new renderer.
 * @param canvas The canvas element.
 */ parcelHelpers.export(exports, "createRenderer", ()=>createRenderer
);
var _renderer = require("./renderer");
var _webglRenderer = require("./webgl-renderer");
var _camera = require("./camera");
var _commandQueue = require("./command-queue");
function createRenderer(canvas) {
    const gl = canvas.getContext('webgl');
    if (gl === null) throw new Error('WebGL is necessary but not supported.');
    return new _webglRenderer.WebGLRenderer(canvas, gl);
}

},{"./renderer":"lV0Mc","./webgl-renderer":"6RLbV","./camera":"71Q4n","./command-queue":"hDdXs","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lV0Mc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class used to draw stuff on the canvas.
 */ parcelHelpers.export(exports, "Renderer", ()=>Renderer
);
var _math = require("../math");
var _camera = require("./camera");
class Renderer {
    /**
   * @param canvas The canvas element.
   */ constructor(canvas){
        /** The last command queue. */ this._commandQueue = null;
        this._canvas = canvas;
        this._camera = new _camera.Camera(_math.Vec2.ZERO, 1, this._canvas.width, this._canvas.height);
        this._commandQueue = null;
        this.resize();
    }
    /**
   * Submits a new command queue to be drawn.
   * @param queue The command queue to be drawn.
   */ submit(queue) {
        this._commandQueue = queue;
    }
    /**
   * Flushes the draw commands queue.
   * @param time The current time.
   */ flush(time) {
        if (this._commandQueue === null) return;
        // Interpolate the queue.
        this._commandQueue = this._commandQueue.interpolate(time);
        // Render the queue.
        this.render();
    }
    /**
   * Gets the camera used to render.
   */ get camera() {
        return this._camera;
    }
    /**
   * Should be called when the window is resized.
   */ resize() {
        // Update the canvas size to match the window size.
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        // Update the camera's canvas size.
        this._camera.width = this._canvas.width;
        this._camera.height = this._canvas.height;
    }
    /**
   * Executes all the draw commands.
   * @param method The method used to draw the commands.
   */ executeCommands(method) {
        if (this._commandQueue === null) return;
        for (const command of this._commandQueue)method(command);
    }
}

},{"../math":"gbL8L","./camera":"71Q4n","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"gbL8L":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>_color.Color
);
parcelHelpers.export(exports, "Mat3", ()=>_mat3.Mat3
);
parcelHelpers.export(exports, "Vec2", ()=>_vec2.Vec2
);
var _color = require("./color");
var _mat3 = require("./mat3");
var _vec2 = require("./vec2");

},{"./color":"fVbDH","./mat3":"gm0vD","./vec2":"5P3FU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fVbDH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a color.
 */ parcelHelpers.export(exports, "Color", ()=>Color
);
class Color {
    /**
   * @param r The red component.
   * @param g The green component.
   * @param b The blue component.
   * @param a The alpha component.
   */ constructor(r, g, b, a = 1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
   * Creates a new color from the given RGBA values.
   * @param r The red component.
   * @param g The green component.
   * @param b The blue component.
   * @param a The alpha component.
   * @returns The new color.
   */ static new(r1, g1, b1, a1 = 1) {
        return new Color(r1, g1, b1, a1);
    }
    /**
   * Creates a random color (fixed alpha).
   * @returns The new color.
   */ static random() {
        return new Color(Math.random(), Math.random(), Math.random());
    }
    /**
   * Returns the black color.
   * @returns The black color.
   */ static black() {
        return new Color(0, 0, 0);
    }
    /**
   * Returns the white color.
   * @returns The white color.
   */ static white() {
        return new Color(1, 1, 1);
    }
    /**
   * Returns the transparent color.
   * @returns The transparent color.
   */ static transparent() {
        return new Color(0, 0, 0, 0);
    }
    /**
   * Clones the color and returns the result.
   * @returns The cloned color.
   */ clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }
    /**
   * Adds the given color to this color and returns the result (fixed alpha).
   * @param other The color to add.
   * @returns The result.
   */ add(other) {
        return new Color(this.r + other.r, this.g + other.g, this.b + other.b, this.a);
    }
    /**
   * Mixes the color with the given color and returns the result (fixed alpha).
   * @param min The minimum value.
   * @param max The maximum value.
   * @param delta The delta value.
   * @returns The mixed color.
   */ mix(other1, delta) {
        return new Color(this.r + (other1.r - this.r) * delta, this.g + (other1.g - this.g) * delta, this.b + (other1.b - this.b) * delta, this.a);
    }
    /**
   * Clamps the color to the given range (fixed alpha).
   * @param min The minimum color.
   * @param max The maximum color.
   * @returns The clamped color.
   */ clamp(min = Color.black(), max = Color.white()) {
        return new Color(Math.max(min.r, Math.min(max.r, this.r)), Math.max(min.g, Math.min(max.g, this.g)), Math.max(min.b, Math.min(max.b, this.b)), Math.max(min.a, Math.min(max.a, this.a)));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"gm0vD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a row-major 3x3 matrix.
 */ parcelHelpers.export(exports, "Mat3", ()=>Mat3
);
var _vec2 = require("./vec2");
class Mat3 {
    /**
   * @param elements The matrix elements.
   */ constructor(...elements){
        if (elements.length !== 9) throw new Error('Invalid Mat3 elements array size, must be 9');
        this.elements = new Float32Array(elements);
    }
    /**
   * Creates a new matrix from the given elements.
   * @param elements The matrix elements.
   * @returns The new matrix.
   */ static new(...elements1) {
        return new Mat3(...elements1);
    }
    /**
   * Creates a new identity matrix.
   * @returns The new identity matrix.
   */ static identity() {
        return new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }
    /**
   * Creates a new translation matrix.
   * @param vec The translation vector.
   * @returns The new translation matrix.
   */ static translation(vec) {
        return new Mat3(1, 0, 0, 0, 1, 0, vec.x, vec.y, 1);
    }
    /**
   * Creates a new rotation matrix.
   * @param angle The angle in radians.
   * @returns The new rotation matrix.
   */ static rotation(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat3(c, -s, 0, s, c, 0, 0, 0, 1);
    }
    // Implementation
    static scale(v) {
        if (v instanceof _vec2.Vec2) return new Mat3(v.x, 0, 0, 0, v.y, 0, 0, 0, 1);
        else return new Mat3(v, 0, 0, 0, v, 0, 0, 0, 1);
    }
    /**
   * Clones this matrix.
   * @returns The clone.
   */ clone() {
        return new Mat3(...Array.from(this.elements));
    }
    // Implementation.
    mul(other) {
        const a = this.elements;
        const c = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        if (other instanceof Mat3) {
            // Matrix multiplication.
            const b = other.elements;
            for(let i = 0; i < 3; i++)for(let j = 0; j < 3; j++)for(let k = 0; k < 3; k++)c[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j];
        } else {
            // Scalar multiplication.
            for(let i = 0; i < 3; i++)for(let j = 0; j < 3; j++)c[i * 3 + j] = a[i * 3 + j] * other;
        }
        return new Mat3(...c);
    }
    /**
   * Calculates the determinant of this matrix.
   * @returns The determinant.
   */ det() {
        const a = this.elements;
        let det = 0;
        det += a[0] * a[4] * a[8] + a[1] * a[5] * a[6] + a[2] * a[3] * a[7];
        det -= a[2] * a[4] * a[6] + a[1] * a[3] * a[8] + a[0] * a[5] * a[7];
        return det;
    }
    /**
   * Calculates the transpose of this matrix.
   * @returns The transpose.
   */ transpose() {
        const a = this.elements;
        const c = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        for(let i = 0; i < 3; i++)for(let j = 0; j < 3; j++)c[i * 3 + j] = a[j * 3 + i];
        return new Mat3(...c);
    }
    /**
   * Calculates the adjunt matrix of this matrix.
   * @returns The adjunt matrix.
   */ adjunt() {
        const a = this.elements;
        const b = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        b[0] = a[4] * a[8] - a[5] * a[7];
        b[1] = a[2] * a[7] - a[1] * a[8];
        b[2] = a[1] * a[5] - a[2] * a[4];
        b[3] = a[5] * a[6] - a[3] * a[8];
        b[4] = a[0] * a[8] - a[2] * a[6];
        b[5] = a[2] * a[3] - a[0] * a[5];
        b[6] = a[3] * a[7] - a[4] * a[6];
        b[7] = a[1] * a[6] - a[0] * a[7];
        b[8] = a[0] * a[4] - a[1] * a[3];
        return new Mat3(...b);
    }
    /**
   * Calculates the inverse of this matrix.
   * @returns The inverse.
   */ inverse() {
        const det = this.det();
        if (det === 0) throw new Error(`Can't find the inverse of the matrix because its determinant is zero`);
        return this.adjunt().mul(1 / det);
    }
}

},{"./vec2":"5P3FU","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5P3FU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a row-major 2D vector.
 */ parcelHelpers.export(exports, "Vec2", ()=>Vec2
);
class Vec2 {
    /**
   * @param x The x coordinate.
   * @param y The y coordinate.
   */ constructor(x, y){
        this._x = x;
        this._y = y;
    }
    /**
   * Gets the x coordinate.
   */ get x() {
        return this._x;
    }
    /**
   * Gets the y coordinate.
   */ get y() {
        return this._y;
    }
    /**
   * Creates a new vector.
   * @param x The x coordinate.
   * @param y The y coordinate.
   * @returns The new vector.
   */ static new(x1, y1) {
        return new Vec2(x1, y1);
    }
    /**
   * Creates a new vector from an angle.
   * @param angle The angle.
   * @returns The new vector.
   */ static fromAngle(angle) {
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }
    /**
   * Returns a random vector within the given range.
   * @param min The minimum value.
   * @param max The maximum value.
   * @returns The result.
   */ static random(min, max) {
        return new Vec2(Math.random() * (max.x - min.x) + min.x, Math.random() * (max.y - min.y) + min.y);
    }
    /**
   * Adds another vector to this vector and returns the result.
   * @param other The other vector.
   * @returns The result.
   */ add(other) {
        return new Vec2(this._x + other._x, this._y + other._y);
    }
    /**
   * Subtracts another vector from this vector and returns the result.
   * @param other The other vector.
   * @returns The result.
   */ sub(other1) {
        return new Vec2(this._x - other1._x, this._y - other1._y);
    }
    /**
   * Multiplies this vector by a scalar and returns the result.
   * @param scalar The scalar.
   * @returns The result.
   */ mul(scalar) {
        return new Vec2(this._x * scalar, this._y * scalar);
    }
    /**
   * Divides this vector by a scalar and returns the result.
   * @param scalar The scalar.
   * @returns The result.
   */ div(scalar1) {
        return new Vec2(this._x / scalar1, this._y / scalar1);
    }
    /**
   * Calculates the dot product of this vector and another vector.
   * @param other The other vector.
   * @returns The dot product.
   */ dot(other2) {
        return this._x * other2._x + this._y * other2._y;
    }
    /**
   * Calculates the squared length of this vector.
   * @returns The squared length.
   */ lengthSquared() {
        return this.dot(this);
    }
    /**
   * Calculates the length of this vector.
   * @returns The length.
   */ length() {
        return Math.sqrt(this.lengthSquared());
    }
    /**
   * Normalizes this vector and returns the result.
   * @returns The result.
   */ normalize() {
        return this.div(this.length());
    }
    /**
   * Calculates the angle between this vector and another vector, or the angle between this vector and the x axis.
   * @param other The other vector.
   * @returns The angle.
   */ angle(other3) {
        if (other3 === undefined) return Math.atan2(this._y, this._x);
        else return Math.acos(this.dot(other3) / (this.length() * other3.length()));
    }
    /**
   * Calculates the perpendicular vector of this vector and returns the result.
   * @returns The result.
   */ perpendicular() {
        return new Vec2(-this._y, this._x);
    }
    /**
   * Multiplies this vector by a matrix.
   * @param mat The matrix.
   * @returns The result.
   */ apply(mat) {
        const a = mat.elements;
        const x = this._x;
        const y = this._y;
        return new Vec2(a[0] * x + a[3] * y + a[6], a[1] * x + a[4] * y + a[7]);
    }
    /**
   * Clamps this vector to a given range.
   * @param min The minimum value.
   * @param max The maximum value.
   * @returns The result.
   */ clamp(min1, max1) {
        return new Vec2(Math.max(min1.x, Math.min(max1.x, this._x)), Math.max(min1.y, Math.min(max1.y, this._y)));
    }
    /**
   * Returns the absolute vector.
   * @returns The result.
   */ abs() {
        return new Vec2(Math.abs(this._x), Math.abs(this._y));
    }
    /**
   * Returns the vector with the maximum components.
   * @param other The other vector.
   * @returns The result.
   */ max(other4) {
        return new Vec2(Math.max(this._x, other4._x), Math.max(this._y, other4._y));
    }
    /**
   * Returns the vector with the minimum components.
   * @param other The other vector.
   * @returns The result.
   */ min(other5) {
        return new Vec2(Math.min(this._x, other5._x), Math.min(this._y, other5._y));
    }
    /**
   * Reflects this vector on a normal vector.
   * @param normal The normal vector.
   * @returns The result.
   */ reflect(normal) {
        return this.sub(normal.mul(2 * this.dot(normal)));
    }
    /**
   * Mixes this vector with another vector.
   * @param other The other vector.
   * @param t The mix factor.
   * @returns The result.
   */ mix(other6, t) {
        return new Vec2(this._x * (1 - t) + other6._x * t, this._y * (1 - t) + other6._y * t);
    }
}
Vec2.ZERO = new Vec2(0, 0);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"71Q4n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a camera used to render a scene.
 */ parcelHelpers.export(exports, "Camera", ()=>Camera
);
var _math = require("../math");
class Camera {
    /**
   * @param position The camera's position.
   * @param zoom The camera's zoom.
   * @param width The canvas' width.
   * @param height The canvas' height.
   */ constructor(position, zoom, width, height){
        this._position = position;
        this.velocity = _math.Vec2.ZERO;
        this._zoom = zoom;
        this._width = width;
        this._height = height;
        this.updateMatrix();
    }
    /**
   * Gets the camera's position.
   */ get position() {
        return this._position;
    }
    /**
   * Sets the camera's position.
   */ set position(value) {
        this._position = value;
        this.updateMatrix();
    }
    /**
   * Gets the camera's zoom.
   */ get zoom() {
        return this._zoom;
    }
    /**
   * Sets the camera's zoom.
   */ set zoom(value1) {
        this._zoom = value1;
        this.updateMatrix();
    }
    /**
   * Sets the canvas' width.
   */ set width(value2) {
        this._width = value2;
        this.updateMatrix();
    }
    /**
   * Sets the canvas' height.
   */ set height(value3) {
        this._height = value3;
        this.updateMatrix();
    }
    /**
   * Gets the camera's transform matrix.
   */ get matrix() {
        return this._matrix.clone();
    }
    /**
   * Converts a point from world coordinates to screen coordinates.
   * @param point The point to convert.
   * @return The converted point.
   */ worldToScreen(point) {
        return point.apply(this._matrix);
    }
    /**
   * Converts a point from screen coordinates to world coordinates.
   * @param point The point to convert.
   * @return The converted point.
   */ screenToWorld(point1) {
        return point1.apply(this._matrix.inverse());
    }
    /**
   * Converts a point from canvas coordinates to world coordinates.
   * @param point The point to convert.
   * @return The converted point.
   */ canvasToWorld(point2) {
        const normalized = _math.Vec2.new(point2.x / this._width, -point2.y / this._height).mul(2).add(_math.Vec2.new(-1, 1));
        return this.screenToWorld(normalized);
    }
    /**
   * Updates the camera's transform matrix.
   */ updateMatrix() {
        const translation = _math.Mat3.translation(this._position.mul(-1));
        const scale = _math.Mat3.scale(_math.Vec2.new(this._zoom * this._height / this._width, this._zoom));
        this._matrix = translation.mul(scale);
    }
}

},{"../math":"gbL8L","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6RLbV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renderer implementation for WebGL.
 */ parcelHelpers.export(exports, "WebGLRenderer", ()=>WebGLRenderer
);
var _math = require("../math");
var _drawArrow = require("./draw-arrow");
var _drawBox = require("./draw-box");
var _drawCircle = require("./draw-circle");
var _drawLine = require("./draw-line");
var _renderer = require("./renderer");
/** Background color. */ const BACKGROUND_COLOR = new _math.Color(0.3, 0.6, 0.9, 1);
/** Number of circle divisions. */ const CIRCLE_DIVISIONS = 64;
/** Line thickness. */ const LINE_THICKNESS = 0.05;
/** Arrow head size. */ const ARROW_HEAD_SIZE = 0.5;
class WebGLRenderer extends _renderer.Renderer {
    /**
   * @param canvas The canvas element.
   */ constructor(canvas, gl){
        super(canvas);
        this._gl = gl;
        // Create the shader program used to draw.
        this._drawShader = new ShaderProgram(this._gl, `
      attribute vec2 position;

      uniform mat3 transform;

      void main() {
        vec3 position = transform * vec3(position, 1.0);
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `, `
      precision mediump float;

      uniform vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `);
        // Get the shader attributes locations and uniform locations.
        this._drawShaderPositionLocation = this._drawShader.getAttributeLocation('position');
        this._drawShaderTransformLocation = this._drawShader.getUniformLocation('transform');
        this._drawShaderColorLocation = this._drawShader.getUniformLocation('color');
        // Generate circle primitive.
        let vertices = [];
        this._circle = [
            0,
            CIRCLE_DIVISIONS + 2
        ];
        vertices.push(0, 0);
        for(let i = 0; i <= CIRCLE_DIVISIONS; i++){
            const angle = 2 * Math.PI * i / CIRCLE_DIVISIONS;
            vertices.push(Math.cos(angle), Math.sin(angle));
        }
        // Generate line primitive.
        this._line = [
            vertices.length / 2,
            4
        ];
        vertices.push(-LINE_THICKNESS, 0);
        vertices.push(-LINE_THICKNESS, 1);
        vertices.push(+LINE_THICKNESS, 1);
        vertices.push(+LINE_THICKNESS, 0);
        // Generate box primitive.
        this._box = [
            vertices.length / 2,
            4
        ];
        vertices.push(-1, -1);
        vertices.push(-1, 1);
        vertices.push(1, 1);
        vertices.push(1, -1);
        // Create the vertex buffer used to draw primitives.
        this._vertexBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(vertices), this._gl.STATIC_DRAW);
    }
    // Flushes the draw commands queue.
    render() {
        // Clear the canvas.
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._gl.clearColor(BACKGROUND_COLOR.r, BACKGROUND_COLOR.g, BACKGROUND_COLOR.b, 1);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        // Execute all the draw commands.
        this._drawShader.use();
        this.executeCommands(this.executeCommand.bind(this));
    }
    /**
   * Executes a draw command.
   * @param command The command to execute.
   */ executeCommand(command) {
        // Draw circle command.
        if (command instanceof _drawCircle.DrawCircle) {
            // Set uniforms.
            const model = _math.Mat3.scale(command.radius).mul(_math.Mat3.translation(command.center));
            const final = model.mul(this.camera.matrix);
            this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, final.elements);
            this._gl.uniform3f(this._drawShaderColorLocation, command.color.r, command.color.g, command.color.b);
            // Draw the circle.
            this._gl.enableVertexAttribArray(this._drawShaderPositionLocation);
            this._gl.vertexAttribPointer(this._drawShaderPositionLocation, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._circle[0], this._circle[1]);
        } else if (command instanceof _drawBox.DrawBox) {
            // Set uniforms.
            const model = _math.Mat3.scale(command.size).mul(_math.Mat3.translation(command.center));
            const final = model.mul(this.camera.matrix);
            this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, final.elements);
            this._gl.uniform3f(this._drawShaderColorLocation, command.color.r, command.color.g, command.color.b);
            // Draw the box.
            this._gl.enableVertexAttribArray(this._drawShaderPositionLocation);
            this._gl.vertexAttribPointer(this._drawShaderPositionLocation, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._box[0], this._box[1]);
        } else if (command instanceof _drawLine.DrawLine) {
            // Set uniforms.
            const offset = command.end.sub(command.start);
            const translation = _math.Mat3.translation(command.start);
            const scale = _math.Mat3.scale(_math.Vec2.new(command.thickness, offset.length()));
            const rotation = _math.Mat3.rotation(Math.PI / 2 - offset.angle());
            const final = scale.mul(rotation).mul(translation).mul(this.camera.matrix);
            this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, final.elements);
            this._gl.uniform3f(this._drawShaderColorLocation, command.color.r, command.color.g, command.color.b);
            // Draw the line.
            this._gl.enableVertexAttribArray(this._drawShaderPositionLocation);
            this._gl.vertexAttribPointer(this._drawShaderPositionLocation, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._line[0], this._line[1]);
        } else if (command instanceof _drawArrow.DrawArrow) {
            // Bind vertex array and set the color.
            this._gl.enableVertexAttribArray(this._drawShaderPositionLocation);
            this._gl.vertexAttribPointer(this._drawShaderPositionLocation, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.uniform3f(this._drawShaderColorLocation, command.color.r, command.color.g, command.color.b);
            // Draw the arrow line.
            const offset = command.end.sub(command.start);
            const translation = _math.Mat3.translation(command.start);
            const scale = _math.Mat3.scale(_math.Vec2.new(command.thickness, offset.length()));
            const rotation = _math.Mat3.rotation(Math.PI / 2 - offset.angle());
            const final = scale.mul(rotation).mul(translation).mul(this.camera.matrix);
            this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, final.elements);
            this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._line[0], this._line[1]);
            // Draw the arrow head.
            const head = _math.Mat3.translation(command.end);
            const headScale = _math.Mat3.scale(_math.Vec2.new(command.thickness, command.thickness * ARROW_HEAD_SIZE));
            const head1Rotation = _math.Mat3.rotation(Math.PI / 6 - Math.PI / 2 - offset.angle());
            const head1Final = headScale.mul(head1Rotation).mul(head).mul(this.camera.matrix);
            const head2Rotation = _math.Mat3.rotation(-Math.PI / 6 - Math.PI / 2 - offset.angle());
            const head2Final = headScale.mul(head2Rotation).mul(head).mul(this.camera.matrix);
            this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, head1Final.elements);
            this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._line[0], this._line[1]);
            this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, head2Final.elements);
            this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._line[0], this._line[1]);
        }
    }
}
/**
 * WebGL shader program wrapper.
 */ class ShaderProgram {
    constructor(gl1, vertexShaderSource, fragmentShaderSource){
        this._gl = gl1;
        // Create shaders.
        this._vertexShader = this.createShader(this._gl.VERTEX_SHADER, vertexShaderSource);
        this._fragmentShader = this.createShader(this._gl.FRAGMENT_SHADER, fragmentShaderSource);
        // Attach and link the shaders.
        this._program = this._gl.createProgram();
        this._gl.attachShader(this._program, this._vertexShader);
        this._gl.attachShader(this._program, this._fragmentShader);
        this._gl.linkProgram(this._program);
        // Check if the program linked successfully.
        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) throw new Error(`Shader linking failed: ${this._gl.getProgramInfoLog(this._program)}`);
    }
    /**
   * Uses the shader program.
   */ use() {
        this._gl.useProgram(this._program);
    }
    /**
   * Gets the attribute location.
   * @param name The attribute name.
   * @return The attribute location.
   */ getAttributeLocation(name) {
        return this._gl.getAttribLocation(this._program, name);
    }
    /**
   * Gets the uniform location.
   * @param name The uniform name.
   * @return The uniform location.
   */ getUniformLocation(name1) {
        const loc = this._gl.getUniformLocation(this._program, name1);
        if (loc === null) throw new Error(`Shader uniform ${name1} not found.`);
        return loc;
    }
    /**
   * Creates a WebGL shader.
   * @param type The shader type.
   * @param source The shader source.
   */ createShader(type, source) {
        const shader = this._gl.createShader(type);
        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);
        // Check if the shader compiled successfully.
        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) throw new Error(`Shader compilation failed: ${this._gl.getShaderInfoLog(shader)}`);
        return shader;
    }
}

},{"../math":"gbL8L","./draw-arrow":"fLfOz","./draw-box":"kVfP5","./draw-circle":"iBqFN","./draw-line":"89Pla","./renderer":"lV0Mc","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fLfOz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Command used to draw an arrow.
 */ parcelHelpers.export(exports, "DrawArrow", ()=>DrawArrow
);
class DrawArrow {
    /**
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param radius The thickness of the arrow.
   * @param color The color of the arrow.
   * @param startVelocity The velocity of the start of the arrow.
   * @param endVelocity The velocity of the end of the arrow.
   */ constructor(start, end, thickness, color, startVelocity, endVelocity){
        this.start = start;
        this.end = end;
        this.thickness = thickness;
        this.color = color;
        this._startVelocity = startVelocity;
        this._endVelocity = endVelocity;
    }
    // Implement the Command interface.
    interpolate(dt) {
        return new DrawArrow(this.start.add(this._startVelocity.mul(dt)), this.end.add(this._endVelocity.mul(dt)), this.thickness, this.color, this._startVelocity, this._endVelocity);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kVfP5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Command used to draw a box.
 */ parcelHelpers.export(exports, "DrawBox", ()=>DrawBox
);
class DrawBox {
    /**
   * @param center The center of the box.
   * @param size The size of the box.
   * @param color The color of the box.
   * @param velocity The velocity of the box.
   */ constructor(center, size, color, velocity){
        this.center = center;
        this.size = size;
        this.color = color;
        this._velocity = velocity;
    }
    // Implement the Command interface.
    interpolate(dt) {
        return new DrawBox(this.center.add(this._velocity.mul(dt)), this.size, this.color, this._velocity);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"iBqFN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Command used to draw a circle.
 */ parcelHelpers.export(exports, "DrawCircle", ()=>DrawCircle
);
class DrawCircle {
    /**
   * @param center The center of the circle.
   * @param radius The radius of the circle.
   * @param color The color of the circle.
   * @param velocity The velocity of the circle.
   */ constructor(center, radius, color, velocity){
        this.center = center;
        this.radius = radius;
        this.color = color;
        this._velocity = velocity;
    }
    // Implement the Command interface.
    interpolate(dt) {
        return new DrawCircle(this.center.add(this._velocity.mul(dt)), this.radius, this.color, this._velocity);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"89Pla":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Command used to draw a line.
 */ parcelHelpers.export(exports, "DrawLine", ()=>DrawLine
);
class DrawLine {
    /**
   * @param start The start of the line.
   * @param end The end of the line.
   * @param radius The thickness of the line.
   * @param color The color of the line.
   * @param startVelocity The velocity of the start of the line.
   * @param endVelocity The velocity of the end of the line.
   */ constructor(start, end, thickness, color, startVelocity, endVelocity){
        this.start = start;
        this.end = end;
        this.thickness = thickness;
        this.color = color;
        this._startVelocity = startVelocity;
        this._endVelocity = endVelocity;
    }
    // Implement the Command interface.
    interpolate(dt) {
        return new DrawLine(this.start.add(this._startVelocity.mul(dt)), this.end.add(this._endVelocity.mul(dt)), this.thickness, this.color, this._startVelocity, this._endVelocity);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hDdXs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Represents a draw command queue. */ parcelHelpers.export(exports, "CommandQueue", ()=>CommandQueue
);
var _math = require("../math");
var _drawArrow = require("./draw-arrow");
var _drawBox = require("./draw-box");
var _drawCircle = require("./draw-circle");
var _drawLine = require("./draw-line");
class CommandQueue {
    // Default constructor.
    constructor(time){
        this._commands = [];
        this._time = time;
    }
    /**
   * Interpolates the queue to the given time.
   * @param time The time to interpolate to.
   */ interpolate(time1) {
        const queue = new CommandQueue(time1);
        queue._commands = this._commands.map((command)=>command.interpolate(time1 - this._time)
        );
        return queue;
    }
    /**
   * Iterates over the commands in the queue.
   */ [Symbol.iterator]() {
        return this._commands[Symbol.iterator]();
    }
    /**
   * Draws a moving box.
   * @param center The center of the box.
   * @param size The size of the box.
   * @param color The color of the box.
   * @param velocity The velocity of the box.
   */ drawMovingBox(center, size, color, velocity) {
        this._commands.push(new _drawBox.DrawBox(center, size, color, velocity));
    }
    /**
   * Draws a moving circle.
   * @param center The circle's center.
   * @param radius The circle's radius.
   * @param color The circle's color.
   * @param velocity The circle's velocity.
   */ drawMovingCircle(center1, radius, color1, velocity1) {
        this._commands.push(new _drawCircle.DrawCircle(center1, radius, color1, velocity1));
    }
    /**
   * Draws a moving line.
   * @param start The start of the line.
   * @param end The end of the line.
   * @param thickness The thickness of the line.
   * @param color The color of the line.
   * @param startVelocity The start velocity of the line.
   * @param endVelocity The end velocity of the line.
   */ drawMovingLine(start, end, thickness, color2, startVelocity, endVelocity) {
        this._commands.push(new _drawLine.DrawLine(start, end, thickness, color2, startVelocity, endVelocity));
    }
    /**
   * Draws a moving arrow.
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param thickness The thickness of the arrow.
   * @param color The color of the arrow.
   * @param startVelocity The start velocity of the arrow.
   * @param endVelocity The end velocity of the arrow.
   */ drawMovingArrow(start1, end1, thickness1, color3, startVelocity1, endVelocity1) {
        this._commands.push(new _drawArrow.DrawArrow(start1, end1, thickness1, color3, startVelocity1, endVelocity1));
    }
    /**
   * Draws a box.
   * @param center The center of the box.
   * @param size The size of the box.
   * @param color The color of the box.
   */ drawBox(center2, size1, color4) {
        this.drawMovingBox(center2, size1, color4, _math.Vec2.ZERO);
    }
    /**
   * Draws a circle.
   * @param center The circle's center.
   * @param radius The circle's radius.
   * @param color The circle's color.
   */ drawCircle(center3, radius1, color5) {
        this.drawMovingCircle(center3, radius1, color5, _math.Vec2.ZERO);
    }
    /**
   * Draws a line.
   * @param start The start of the line.
   * @param end The end of the line.
   * @param thickness The thickness of the line.
   * @param color The color of the line.
   */ drawLine(start2, end2, thickness2, color6) {
        this.drawMovingLine(start2, end2, thickness2, color6, _math.Vec2.ZERO, _math.Vec2.ZERO);
    }
    /**
   * Draws an arrow.
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param thickness The thickness of the arrow.
   * @param color The color of the arrow.
   */ drawArrow(start3, end3, thickness3, color7) {
        this.drawMovingArrow(start3, end3, thickness3, color7, _math.Vec2.ZERO, _math.Vec2.ZERO);
    }
}

},{"../math":"gbL8L","./draw-arrow":"fLfOz","./draw-box":"kVfP5","./draw-circle":"iBqFN","./draw-line":"89Pla","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"i5NYN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Body", ()=>_body.Body
);
parcelHelpers.export(exports, "Creature", ()=>_creature.Creature
);
parcelHelpers.export(exports, "Food", ()=>_food.Food
);
parcelHelpers.export(exports, "Stage", ()=>_stage.Stage
);
parcelHelpers.export(exports, "StageSettings", ()=>_stage.StageSettings
);
parcelHelpers.export(exports, "TIME_STEP", ()=>_stage.TIME_STEP
);
var _body = require("./body");
var _creature = require("./creature");
var _food = require("./food");
var _stage = require("./stage");

},{"./body":"bjDm1","./creature":"kfcYC","./food":"gmkzg","./stage":"feGSM","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bjDm1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a physics body.
 */ parcelHelpers.export(exports, "Body", ()=>Body
);
/**
 * Represents a kinematic body.
 */ parcelHelpers.export(exports, "KinematicBody", ()=>KinematicBody
);
/**
 * Represents a static body.
 */ parcelHelpers.export(exports, "StaticBody", ()=>StaticBody
);
class Body {
    /**
   * @param position The position of the body.
   */ constructor(position){
        this._position = position;
    }
    /**
   * Gets the position of the body.
   */ get position() {
        return this._position;
    }
    /**
   * Sets the position of the body.
   */ set position(position1) {
        this._position = position1;
    }
}
class KinematicBody extends Body {
    /**
   * @param position The position of the body.
   * @param velocity The velocity of the body.
   * @param mass The mass of the body.
   */ constructor(position2, velocity){
        super(position2);
        this._velocity = velocity;
    }
    /**
   * Gets the velocity of the body.
   */ get velocity() {
        return this._velocity;
    }
    /**
   * Sets the velocity of the body.
   */ set velocity(velocity1) {
        this._velocity = velocity1;
    }
}
class StaticBody extends Body {
    /**
   * @param position The position of the body.
   */ constructor(position3){
        super(position3);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kfcYC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a creature in the simulation.
 */ parcelHelpers.export(exports, "Creature", ()=>Creature
);
var _evo = require("../evo");
var _math = require("../math");
var _body = require("./body");
var _collider = require("./collider");
/** Radius of a creature. */ const CREATURE_RADIUS = 0.05;
/** The movement speed. */ const MOVEMENT_SPEED = 1;
/** The rotation speed. */ const ROTATION_SPEED = 5;
class Creature extends _body.KinematicBody {
    /**
   * @param eyeCount The number of eyes.
   * @param genotype The genotype of the creature.
   * @param position The position of the creature.
   * @param forward The forward direction of the creature.
   * @param color The color of the creature.
   */ constructor(eyeCount, genotype, position, forward, color){
        super(position, _math.Vec2.ZERO);
        this._genotype = genotype;
        this._nn = new _evo.Network(genotype.neuronCount, genotype.connections);
        for(let i = 0; i < eyeCount; i++)this._nn.markInput(i);
        this._nn.markOutput(eyeCount);
        this._nn.markOutput(eyeCount + 1);
        this._forward = forward.normalize();
        this._color = color.clone();
        this.fitness = 0;
        // Set the eye angles.
        this._eyes = [];
        if (eyeCount == 1) this._eyes = [
            0
        ];
        else if (eyeCount == 2) this._eyes = [
            -Math.PI / 4,
            Math.PI / 4
        ];
        else if (eyeCount == 3) this._eyes = [
            -Math.PI / 3,
            0,
            Math.PI / 3
        ];
    }
    /**
   * Gets the number of neurons of the creature's neural network.
   * @param eyeCount The number of eyes.
   * @param extraNeuronCount The number of extra neurons.
   * @returns The topology of a creature's neural network.
   */ static getNeuronCount(eyeCount1, extraNeuronCount) {
        return eyeCount1 + extraNeuronCount + 2;
    }
    /**
   * Updates the creature.
   * @param nearestFood The nearest food.
   * @param dt The time step.
   */ update(nearestFood, dt) {
        // Update the creature's neural network inputs.
        for(let i = 0; i < this._eyes.length; i++){
            const eye = this._forward.apply(_math.Mat3.rotation(this._eyes[i])).normalize();
            let distance = 0;
            if (nearestFood === null) distance = Infinity;
            else distance = nearestFood.position.sub(this.position.add(eye)).length();
            this._nn.set(i, distance);
        }
        // Update the creature's neural network outputs.
        this._nn.update();
        // Update the creature's velocity and rotate it.
        const dir = this._nn.get(this._eyes.length) > this._nn.get(this._eyes.length + 1) ? -1 : 1;
        this._rotationVelocity = dir * ROTATION_SPEED;
        this._forward = this._forward.apply(_math.Mat3.rotation(this._rotationVelocity * dt));
        this.velocity = this._forward.mul(MOVEMENT_SPEED);
    }
    /**
   * Gets the genome of the creature.
   */ get genotype() {
        return this._genotype;
    }
    /**
   * Gets the neural network of the creature.
   */ get nn() {
        return this._nn;
    }
    // Gets the creature's collider.
    get collider() {
        return new _collider.CircleCollider(this.position, CREATURE_RADIUS);
    }
    // Draw the creature.
    draw(queue) {
        for(let i = 0; i < this._eyes.length; i++){
            const eyeDir = this._forward.apply(_math.Mat3.rotation(this._eyes[i]));
            const eyeNextDir = this._forward.apply(_math.Mat3.rotation(this._eyes[i] - this._rotationVelocity));
            const eye = this.position.add(eyeDir.mul(CREATURE_RADIUS * 2));
            const eyeNext = this.position.add(eyeNextDir.mul(CREATURE_RADIUS * 2));
            const eyeVelocity = this.velocity.add(eyeNext.sub(eye));
            queue.drawMovingLine(this.position, eye, CREATURE_RADIUS * 4, this._color.mix(_math.Color.black(), 0.2), this.velocity, eyeVelocity);
            queue.drawMovingCircle(eye, CREATURE_RADIUS * 0.25, this._color.mix(_math.Color.black(), 0.2), eyeVelocity);
        }
        queue.drawMovingCircle(this.position, CREATURE_RADIUS, this._color, this.velocity);
    }
}
Creature.Radius = CREATURE_RADIUS;

},{"../evo":"lfYa0","../math":"gbL8L","./body":"bjDm1","./collider":"5oobu","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lfYa0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Genome", ()=>_genome.Genome
);
parcelHelpers.export(exports, "Genotype", ()=>_genotype.Genotype
);
parcelHelpers.export(exports, "Network", ()=>_network.Network
);
parcelHelpers.export(exports, "Population", ()=>_population.Population
);
var _genome = require("./genome");
var _genotype = require("./genotype");
var _network = require("./network");
var _population = require("./population");

},{"./genome":"amO7W","./genotype":"jA6Uz","./network":"2oAXv","./population":"a5wjq","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"amO7W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a genome.
 */ parcelHelpers.export(exports, "Genome", ()=>Genome
);
class Genome {
    /**
   * @param minNeuronCount The genome's minimum neuron count.
   * @param maxNeuronCount The genome's maximum neuron count.
   * @param minConnectionCount The genome's minimum connection count.
   * @param maxConnectionCount The genome's maximum connection count.
   */ constructor(minNeuronCount, maxNeuronCount, minConnectionCount, maxConnectionCount){
        if (minNeuronCount > maxNeuronCount) throw new Error('Genome creation failed: the minimum neuron count must be less than or equal to the maximum neuron count');
        if (minConnectionCount > maxConnectionCount) throw new Error('Genome creation failed: the minimum connection count must be less than or equal to the maximum connection count');
        this._minNeuronCount = minNeuronCount;
        this._maxNeuronCount = maxNeuronCount;
        this._minConnectionCount = minConnectionCount;
        this._maxConnectionCount = maxConnectionCount;
    }
    /**
   * Gets the genome's minimum neuron count.
   */ get minNeuronCount() {
        return this._minNeuronCount;
    }
    /**
   * Gets the genome's maximum neuron count.
   */ get maxNeuronCount() {
        return this._maxNeuronCount;
    }
    /**
   * Gets the genome's minimum connection count.
   */ get minConnectionCount() {
        return this._minConnectionCount;
    }
    /**
   * Gets the genome's maximum connection count.
   */ get maxConnectionCount() {
        return this._maxConnectionCount;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jA6Uz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents an instance of a genome, which can be mutated and crossed over with other genotypes.
 */ parcelHelpers.export(exports, "Genotype", ()=>Genotype
);
var _connection = require("./connection");
class Genotype {
    /**
   * @param genome The genome of this genotype.
   * @param neuronCount The neuron count of this genotype.
   * @param connections The connections of this genotype.
   */ constructor(genome, neuronCount, connections){
        this._genome = genome;
        this._neuronCount = neuronCount;
        this._connections = connections;
    }
    /**
   * Creates a new random genotype.
   * @param genome The genome of this genotype.
   * @returns A new random genotype.
   */ static random(genome1) {
        let neuronCount = Math.round(Math.random() * (genome1.maxNeuronCount - genome1.minNeuronCount)) + genome1.minNeuronCount;
        let connectionCount = Math.round(Math.random() * (genome1.maxConnectionCount - genome1.minConnectionCount)) + genome1.minConnectionCount;
        let connections = new Array(connectionCount).fill(null).map(()=>_connection.Connection.random(neuronCount)
        );
        return new Genotype(genome1, neuronCount, connections);
    }
    /**
   * Gets the genome of this genotype.
   */ get genome() {
        return this._genome;
    }
    /**
   * Gets the neuron count of this genotype.
   */ get neuronCount() {
        return this._neuronCount;
    }
    /**
   * Gets the connections of this genotype.
   */ get connections() {
        return this._connections;
    }
    /**
   * Mutates this genotype.
   * @param rate The mutation rate.
   * @returns The mutated genotype.
   */ mutate(rate) {
        let neuronCount = this.neuronCount;
        // Change the neuron count.
        if (Math.random() < rate) {
            let delta = Math.random() < 0.5 ? 1 : -1;
            let newNeuronCount = this.neuronCount + delta;
            if (newNeuronCount >= this.genome.minNeuronCount && newNeuronCount <= this.genome.maxNeuronCount) neuronCount = newNeuronCount;
        }
        // Change the connections.
        let connections = this.connections.map((connection)=>{
            if (Math.random() < rate) return _connection.Connection.random(neuronCount);
            else if (Math.random() < rate / this.connections.length) return null; // Remove the connection.
            else if (connection.source < neuronCount && connection.target < neuronCount) return connection;
            else return null;
        }).filter((connection)=>connection !== null
        );
        // Add a connection.
        if (connections.length < this.genome.maxConnectionCount && Math.random() < rate) connections.push(_connection.Connection.random(neuronCount));
        return new Genotype(this._genome, neuronCount, connections);
    }
}

},{"./connection":"5eIbq","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5eIbq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a neural network connection between two neurons.
 */ parcelHelpers.export(exports, "Connection", ()=>Connection
);
class Connection {
    /**
   * @param weight The connection's denormalized weight.
   * @param source The connection's source neuron.
   * @param target The connection's target neuron.
   */ constructor(weight, source, target){
        this._weight = Connection.normalizeWeight(weight);
        this._source = source;
        this._target = source === target ? source > 0 ? source - 1 : 1 : target;
    }
    /**
   * Updates the connection.
   * @param inputs The input neurons.
   * @param outputs The output neurons.
   */ update(inputs, outputs) {
        outputs[this._target] += inputs[this._source] * this._weight;
    }
    /**
   * Gets the connection's source neuron.
   */ get source() {
        return this._source;
    }
    /**
   * Gets the connection's target neuron.
   */ get target() {
        return this._target;
    }
    /**
   * Gets the connection's weight.
   */ get weight() {
        return this._weight;
    }
    /**
   * Creates a random connection.
   * @param neuronCount Number of neurons in the network.
   * @returns A random connection.
   */ static random(neuronCount) {
        return new Connection(Math.floor(Math.random() * 65536), Math.floor(Math.random() * neuronCount), Math.floor(Math.random() * neuronCount));
    }
    /**
   * Creates a connection from a 32 bits number.
   * @param u32 The 32 bits number to create the connection from.
   * @returns The connection.
   */ static fromU32(u32) {
        return new Connection(Connection.normalizeWeight(u32 >> 16), u32 >> 8 & 255, u32 & 255);
    }
    /**
   * Converts the connection to 32 bits number.
   * @returns The connection as 32 bits number.
   */ toU32() {
        return Connection.denormalizeWeight(this._weight) << 16 | this._source << 8 | this._target;
    }
    /**
   * Normalizes the connection's weight.
   * @param weight The denormalized connection's weight.
   * @returns The normalized connection's weight.
   */ static normalizeWeight(weight1) {
        weight1 = Math.min(Math.max(weight1, 0), 65535);
        return (weight1 / 65535 * 2 - 1) * Connection.WeightAmplitude;
    }
    /**
   * Denormalizes the connection's weight.
   * @param weight The normalized connection's weight.
   * @returns The denormalized connection's weight.
   */ static denormalizeWeight(weight2) {
        return (weight2 / this.WeightAmplitude + 1) * 65535;
    }
}
Connection.WeightAmplitude = 10;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2oAXv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Neural network implementation.
 */ parcelHelpers.export(exports, "Network", ()=>Network
);
var _math = require("../math");
class Network {
    /**
   * @param neuronCount Number of neurons in the network.
   * @param connections The connections in the network.
   */ constructor(neuronCount, connections){
        this._neurons = new Array(neuronCount).fill(0);
        this._swapNeurons = new Array(neuronCount).fill(0);
        this._connections = connections;
        this._inputs = [];
        this._outputs = [];
    }
    /**
   * Sets the value of a neuron.
   * @param index Index of the neuron to set.
   * @param value Value to set the neuron to.
   */ set(index, value) {
        this._neurons[index] = value;
    }
    /**
   * Gets the value of a neuron.
   * @param index Index of the neuron to get.
   * @returns Neuron value.
   */ get(index1) {
        return this._neurons[index1];
    }
    /**
   * Marks a neuron as an input for drawing.
   * @param index Index of the neuron to mark as an input.
   */ markInput(index2) {
        this._inputs.push(index2);
    }
    /**
   * Marks a neuron as an output for drawing.
   * @param index Index of the neuron to mark as an output.
   */ markOutput(index3) {
        this._outputs.push(index3);
    }
    /**
   * Resets the network.
   */ reset() {
        this._neurons.fill(0);
    }
    /**
   * Updates the network's neurons.
   */ update() {
        for(let i = 0; i < this._connections.length; i++)this._connections[i].update(this._neurons, this._swapNeurons);
        for(let i1 = 0; i1 < this._neurons.length; i1++){
            this._neurons[i1] = Network.sigmoid(this._swapNeurons[i1]);
            this._swapNeurons[i1] = 0;
        }
    }
    /**
   * Draws the neural network.
   * @param queue Command queue to draw the network with.
   * @param translation Where to draw the network.
   * @param velocity Velocity of the network.
   * @param scale The scale to draw the network at.
   */ draw(queue, translation, velocity, scale) {
        const CIRCLE_RADIUS = scale * 0.5;
        const NEURON_RADIUS = scale * 0.1;
        const CONNECTION_THICKNESS = NEURON_RADIUS * 1;
        // Draw all connections in the network.
        for(let i = 0; i < this._connections.length; i++){
            const connection = this._connections[i];
            const from = translation.add(_math.Vec2.new(Math.cos(connection.source / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS), Math.sin(connection.source / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS)));
            const to = translation.add(_math.Vec2.new(Math.cos(connection.target / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS), Math.sin(connection.target / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS)));
            const color = connection.weight > 0 ? _math.Color.black().mix(_math.Color.new(1, 0, 0), connection.weight / 10) : _math.Color.new(0, 0, 1).mix(_math.Color.black(), -connection.weight / 10);
            queue.drawMovingArrow(from, to, CONNECTION_THICKNESS, color, velocity, velocity);
        }
        // Draw all neurons in the network.
        for(let i2 = 0; i2 < this._neurons.length; i2++){
            const position = translation.add(_math.Vec2.new(Math.cos(i2 / this._neurons.length * Math.PI * 2) * CIRCLE_RADIUS, Math.sin(i2 / this._neurons.length * Math.PI * 2) * CIRCLE_RADIUS));
            const color = _math.Color.black().mix(_math.Color.white(), this._neurons[i2]);
            let borderColor;
            if (this._inputs.indexOf(i2) >= 0) borderColor = _math.Color.new(0, 1, 0);
            else if (this._outputs.indexOf(i2) >= 0) borderColor = _math.Color.new(0, 0, 1);
            else borderColor = _math.Color.new(1, 1, 1);
            queue.drawMovingCircle(position, NEURON_RADIUS, borderColor, velocity);
            queue.drawMovingCircle(position, NEURON_RADIUS * 0.9, color, velocity);
        }
    }
    /**
   * The sigmoid function.
   * @param x Value to apply the sigmoid function to.
   * @returns The sigmoid value of the input.
   */ static sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
}

},{"../math":"gbL8L","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"a5wjq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a population of genotypes.
 */ parcelHelpers.export(exports, "Population", ()=>Population
);
var _genotype = require("./genotype");
class Population {
    /**
   * @param genome The genome of the population.
   * @param genotypes The genotypes of the population.
   * @param mutationRate The mutation rate.
   */ constructor(genome, genotypes, mutationRate){
        if (genotypes.length % 2 !== 0) throw new Error('The number of genotypes in a population must be even.');
        this._genome = genome;
        this._genotypes = genotypes;
        this._mutationRate = mutationRate;
    }
    /**
   * Creates a new random population.
   * @param genome The genome of the population.
   * @param genotypeCount The number of genotypes in the population.
   * @param mutationRate The mutation rate.
   */ static random(genome1, genotypeCount, mutationRate1) {
        let genotypes = new Array(genotypeCount).fill(null).map(()=>_genotype.Genotype.random(genome1)
        );
        return new Population(genome1, genotypes, mutationRate1);
    }
    /**
   * Gets the population's genotypes.
   */ get genotypes() {
        return this._genotypes;
    }
    /**
   * Selects the parents of the next generation.
   * @parma fitness The fitness of the population.
   * @returns The indices of the parents.
   */ select(fitness) {
        let sortedFitness = fitness.map((f, i)=>[
                f,
                i
            ]
        ).sort(([a, _1], [b, _2])=>b - a
        );
        let parents = new Array(this._genotypes.length);
        for(let i1 = 0; i1 < parents.length / 2; i1++){
            parents[2 * i1 + 0] = sortedFitness[i1][1];
            parents[2 * i1 + 1] = sortedFitness[i1][1];
        }
        return parents;
    }
    /**
   * Creates a new population from this one, by making the genotypes reproduce.
   * @param parents The indices of the parents of the new population.
   * @returns A new population.
   */ breed(parents) {
        let newGenotypes = new Array(this._genotypes.length).fill(null).map((_, i)=>this._genotypes[parents[i]].mutate(this._mutationRate)
        );
        return new Population(this._genome, newGenotypes, this._mutationRate);
    }
}

},{"./genotype":"jA6Uz","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5oobu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a collision manifold.
 */ parcelHelpers.export(exports, "Manifold", ()=>Manifold
);
/**
 * Represents a circle collider.
 */ parcelHelpers.export(exports, "CircleCollider", ()=>CircleCollider
);
/**
 * Represents a AABB collider.
 */ parcelHelpers.export(exports, "AABBCollider", ()=>AABBCollider
);
/**
 * Group of colliders.
 */ parcelHelpers.export(exports, "GroupCollider", ()=>GroupCollider
);
class Manifold {
    /**
   * @param normal The normal of the collision.
   * @param penetration The penetration depth of the collision.
   */ constructor(normal, penetration){
        this.normal = normal;
        this.penetration = penetration;
    }
}
class CircleCollider {
    /**
   * @param position The position of the circle.
   * @param radius The radius of the circle.
   */ constructor(position, radius){
        this.position = position;
        this.radius = radius;
    }
    // Collision detection.
    colliding(other) {
        if (other instanceof CircleCollider) {
            const offset = other.position.sub(this.position);
            const distanceSquared = offset.lengthSquared();
            const radiusSum = this.radius + other.radius;
            // Check if the circles are colliding
            if (distanceSquared > radiusSum * radiusSum) return null;
            // Get the collision manifold
            const normal = offset.normalize();
            const penetration = radiusSum - Math.sqrt(distanceSquared);
            return new Manifold(normal, penetration);
        } else {
            const manifold = other.colliding(this);
            manifold?.normal.mul(-1);
            return manifold;
        }
    }
}
class AABBCollider {
    /**
   * @param start The top right corner of the rectangle.
   * @param end The bottom left corner of the rectangle.
   */ constructor(start, end){
        this.start = start.max(end);
        this.end = start.min(end);
    }
    // Collision detection.
    colliding(other1) {
        if (other1 instanceof AABBCollider) // AABB vs AABB
        throw new Error('AABB vs AABB not implemented');
        else if (other1 instanceof CircleCollider) {
            // AABB vs Circle
            const halfExtents = this.start.sub(this.end).div(2);
            const center = this.start.add(this.end).div(2);
            const clamped = other1.position.sub(center).clamp(halfExtents.mul(-1), halfExtents);
            const closest = clamped.add(center);
            const offset = closest.sub(other1.position);
            if (offset.lengthSquared() > other1.radius * other1.radius) return null;
            const normal = offset.normalize();
            const penetration = other1.radius - offset.length();
            return new Manifold(normal, penetration);
        } else {
            const manifold = other1.colliding(this);
            manifold?.normal.mul(-1);
            return manifold;
        }
    }
}
class GroupCollider {
    /**
   * @param colliders The colliders in the group.
   */ constructor(colliders){
        this._colliders = colliders;
    }
    // Collision detection.
    colliding(other2) {
        for (const collider of this._colliders){
            const manifold = collider.colliding(other2);
            if (manifold) return manifold;
        }
        return null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"gmkzg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a bullet.
 */ parcelHelpers.export(exports, "Food", ()=>Food
);
var _math = require("../math");
var _body = require("./body");
var _collider = require("./collider");
/** The food radius. */ const FOOD_RADIUS = 0.02;
/** The food color. */ const FOOD_COLOR = _math.Color.new(0.2, 0.9, 0.4);
class Food extends _body.StaticBody {
    /**
   * @param position The position of the food.
   */ constructor(position){
        super(position);
    }
    /**
   * Gets the collider used.
   */ get collider() {
        return new _collider.CircleCollider(this.position, FOOD_RADIUS);
    }
    // Draws the food.
    draw(queue) {
        queue.drawCircle(this.position, FOOD_RADIUS, FOOD_COLOR);
    }
}
Food.Radius = FOOD_RADIUS;

},{"../math":"gbL8L","./body":"bjDm1","./collider":"5oobu","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"feGSM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TIME_STEP", ()=>TIME_STEP
);
parcelHelpers.export(exports, "BOUNDARY_RADIUS", ()=>BOUNDARY_RADIUS
);
parcelHelpers.export(exports, "BOUNDARY_THICKNESS", ()=>BOUNDARY_THICKNESS
);
/**
 * The settings for the stage.
 */ parcelHelpers.export(exports, "StageSettings", ()=>StageSettings
);
/**
 * Represents the simulation's stage, where the creatures are tested.
 */ parcelHelpers.export(exports, "Stage", ()=>Stage
);
var _evo = require("../evo");
var _math = require("../math");
var _collider = require("./collider");
var _creature = require("./creature");
var _food = require("./food");
const TIME_STEP = 1 / 30;
const BOUNDARY_RADIUS = 12;
const BOUNDARY_THICKNESS = 0.05;
class StageSettings {
}
class Stage {
    /**
   * @param settings The settings for the stage.
   */ constructor(settings){
        this._settings = settings;
        this._genome = new _evo.Genome(_creature.Creature.getNeuronCount(settings.eyeCount, settings.minExtraNeuronCount), _creature.Creature.getNeuronCount(settings.eyeCount, settings.maxExtraNeuronCount), settings.minConnectionCount, settings.maxConnectionCount);
        this._population = _evo.Population.random(this._genome, settings.population, settings.mutationRate);
        this._creatures = [];
        this._food = [];
        // Start the first round.
        this.startRound();
    }
    /**
   * Starts a new round.
   */ startRound() {
        if (this._creatures.length !== 0) {
            // Select the best creatures from the previous round.
            let fitness = this._creatures.map((creature)=>creature.fitness
            );
            let parents = this._population.select(fitness);
            this._population = this._population.breed(parents);
        }
        // Create the creatures.
        this._creatures = this._population.genotypes.map((genotype)=>{
            let position = this.randomPosition(_creature.Creature.Radius);
            let color = _math.Color.random();
            return new _creature.Creature(this._settings.eyeCount, genotype, position, position, color);
        });
        // Create the food.
        this._food = [];
        for(let i = 0; i < this._settings.initialFoodCount; i++)this._food.push(new _food.Food(this.randomPosition(_food.Food.Radius)));
        this._newFoodAccumulator = 0;
        this._time = 0;
    }
    /**
   * Updates the stage.
   * @returns Whether the round is over.
   */ update() {
        // Check if the round ended.
        if (this._food.length === 0 || this._time > this._settings.roundDuration) {
            for (const creature of this._creatures)creature.velocity = _math.Vec2.ZERO;
            return true;
        }
        this._time += TIME_STEP;
        // Add new food.
        this._newFoodAccumulator += TIME_STEP * this._settings.newFoodRate;
        while(this._newFoodAccumulator >= 1){
            this._newFoodAccumulator -= 1;
            this._food.push(new _food.Food(this.randomPosition(_food.Food.Radius)));
        }
        // Update the creatures.
        this._creatures.forEach((creature)=>creature.update(this.getClosestFood(creature.position), TIME_STEP)
        );
        this._creatures.forEach((creature)=>creature.position = creature.position.add(creature.velocity.mul(TIME_STEP))
        );
        // Test for collisions between creatures and the bounds.
        this._creatures.forEach((creature)=>{
            if (creature.position.lengthSquared() > (BOUNDARY_RADIUS - _creature.Creature.Radius) ** 2) {
                creature.position = creature.position.normalize();
                creature.velocity = creature.velocity.reflect(creature.position);
                creature.position = creature.position.mul(BOUNDARY_RADIUS - _creature.Creature.Radius);
            }
        });
        // Test for collisions between creatures and food.
        this._creatures.forEach((creature)=>{
            for(let i = this._food.length - 1; i >= 0; i--)if (creature.collider.colliding(this._food[i].collider)) {
                creature.fitness += 1;
                this._food.splice(i, 1);
            }
        });
        // Round is not over.
        return false;
    }
    /**
   * Draws the stage.
   * @param queue The command queue to draw to.
   */ draw(queue) {
        queue.drawCircle(_math.Vec2.ZERO, BOUNDARY_RADIUS + BOUNDARY_THICKNESS, _math.Color.new(0, 0, 0));
        queue.drawCircle(_math.Vec2.ZERO, BOUNDARY_RADIUS, _math.Color.new(0.3, 0.6, 0.9));
        this._food.forEach((food)=>food.draw(queue)
        );
        this._creatures.forEach((creature)=>creature.draw(queue)
        );
    }
    /**
   * Picks a creature from a position.
   * @param position The position to pick from.
   * @returns The creature, or null if none was found.
   */ pickCreature(position) {
        for (const creature of this._creatures)if (creature.collider.colliding(new _collider.CircleCollider(position, 0.00001))) return creature;
        return null;
    }
    /**
   * Gets the best creature in the stage.
   * @returns The best creature, or null if none was found.
   */ getBestCreature() {
        if (this._creatures.length === 0) return null;
        let best = this._creatures[0];
        for (const creature of this._creatures)if (creature.fitness > best.fitness) best = creature;
        return best;
    }
    /**
   * Generates a random position within the stage.
   * @param radius The minimum distance from the edge.
   * @return The random position.
   */ randomPosition(radius) {
        const distance = Math.sqrt(Math.random() * (BOUNDARY_RADIUS - radius) ** 2);
        const angle = Math.random() * Math.PI * 2;
        return _math.Vec2.fromAngle(angle).mul(distance);
    }
    /**
   * Gets the closest food to a position.
   * @param position The position.
   * @return The closest food.
   */ getClosestFood(position1) {
        let closestFood = null;
        let closestDistance = Infinity;
        this._food.forEach((food)=>{
            const distance = position1.sub(food.position).length();
            if (distance < closestDistance) {
                closestFood = food;
                closestDistance = distance;
            }
        });
        return closestFood;
    }
}

},{"../evo":"lfYa0","../math":"gbL8L","./collider":"5oobu","./creature":"kfcYC","./food":"gmkzg","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eFpQJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Button", ()=>_button.Button
);
parcelHelpers.export(exports, "Display", ()=>_display.Display
);
parcelHelpers.export(exports, "Form", ()=>_form.Form
);
parcelHelpers.export(exports, "FormChain", ()=>_formChain.FormChain
);
parcelHelpers.export(exports, "Input", ()=>_input.Input
);
parcelHelpers.export(exports, "LoadingScreen", ()=>_loadingScreen.LoadingScreen
);
parcelHelpers.export(exports, "Range", ()=>_range.Range
);
parcelHelpers.export(exports, "Slider", ()=>_slider.Slider
);
parcelHelpers.export(exports, "Switch", ()=>_switch.Switch
);
parcelHelpers.export(exports, "Toggle", ()=>_toggle.Toggle
);
var _button = require("./button");
var _display = require("./display");
var _form = require("./form");
var _formChain = require("./form-chain");
var _input = require("./input");
var _loadingScreen = require("./loading-screen");
var _range = require("./range");
var _slider = require("./slider");
var _switch = require("./switch");
var _toggle = require("./toggle");

},{"./button":"b0yVv","./display":"kyKZq","./form":"lTd4l","./form-chain":"eTdw5","./input":"4swyu","./loading-screen":"3xqMr","./range":"rcl1Y","./slider":"3OpYJ","./switch":"bkyAD","./toggle":"aOqPX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"b0yVv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a UI button.
 */ parcelHelpers.export(exports, "Button", ()=>Button
);
class Button {
    /**
   * @param element The DOM element that represents the button.
   */ constructor(element){
        this._element = element;
        this._onClick = new Set();
        this._element.addEventListener('click', ()=>{
            this._onClick.forEach((callback)=>callback()
            );
        });
    }
    /**
   * Creates a new button from an element.
   * @param element The element.
   * @return The button.
   */ static fromElement(element1) {
        if (element1 instanceof HTMLButtonElement) return new Button(element1);
        else return null;
    }
    /**
   * Creates a new button from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @return The button.
   */ static fromSelector(root, selector) {
        const element = root.querySelector(selector);
        if (element) return Button.fromElement(element);
        else return null;
    }
    /**
   * Adds a callback to the on click callback set.
   * @param callback The callback to add.
   */ addOnClickCallback(callback) {
        this._onClick.add(callback);
    }
    /**
   * Removes a callback from the on click callback set.
   * @param callback The callback to remove.
   */ removeOnClickCallback(callback1) {
        this._onClick.delete(callback1);
    }
    /**
   * Clears the on click callback set.
   */ clearOnClickCallbacks() {
        this._onClick.clear();
    }
    /**
   * Gets the DOM element that represents the button.
   */ get element() {
        return this._element;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kyKZq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Used to display a single value.
 */ parcelHelpers.export(exports, "Display", ()=>Display
);
class Display {
    /**
   * @param element DOM element to display value in.
   */ constructor(element){
        this._element = element;
        this._display = this._element.querySelector('span');
    }
    /**
   * Creates a display from a DOM element.
   * @param element DOM element to display value in.
   * @returns Display instance.
   */ static fromElement(element1) {
        if (element1.classList.contains('display')) return new Display(element1);
        else return null;
    }
    /**
   * Creates a display from a query selector.
   * @param root Root element to search from.
   * @param selector Query selector to find display in.
   * @returns Display instance.
   */ static fromSelector(root, selector) {
        const element = root.querySelector(selector);
        if (element && element instanceof HTMLDivElement) return Display.fromElement(element);
        else return null;
    }
    /**
   * Sets the value to display.
   */ set value(value) {
        this._display.innerText = value.toString();
    }
    /**
   * Gets the value to display.
   */ get value() {
        return parseFloat(this._display.innerText);
    }
    /**
   * Sets the display's visibility.
   */ set visible(visible) {
        this._element.classList.toggle('hidden', !visible);
    }
    /**
   * Gets the display's visibility.
   */ get visible() {
        return !this._element.classList.contains('hidden');
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lTd4l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a form.
 */ parcelHelpers.export(exports, "Form", ()=>Form
);
var _button = require("./button");
var _range = require("./range");
var _slider = require("./slider");
var _switch = require("./switch");
var _toggle = require("./toggle");
class Form {
    /**
   * @param element The form element.
   * @param inputs The inputs on the form.
   */ constructor(element, inputs){
        this._element = element;
        this._inputs = inputs;
        this._cancelButton = _button.Button.fromSelector(this._element, 'button#cancel');
        const submit = _button.Button.fromSelector(this._element, 'button#submit');
        if (!submit) throw new Error('Submit button not found on form.');
        this._submitButton = submit;
        this._onCancelCallback = ()=>{
        };
        this._onSubmitCallback = ()=>{
        };
        if (this._cancelButton) this._cancelButton.addOnClickCallback(this.cancel.bind(this));
        this._submitButton.addOnClickCallback(this.submit.bind(this));
    }
    /**
   * Creates a new form from an element.
   * @param element The element.
   * @return The form.
   */ static fromElement(element1) {
        if (!(element1 instanceof HTMLDivElement) || !element1.classList.contains('form')) return null;
        // Get all inputs on the form.
        const inputs = new Map();
        _range.Range.fromChildren(element1).forEach(([id, r])=>inputs.set(id, r)
        );
        _slider.Slider.fromChildren(element1).forEach(([id, s])=>inputs.set(id, s)
        );
        _switch.Switch.fromChildren(element1).forEach(([id, s])=>inputs.set(id, s)
        );
        _toggle.Toggle.fromChildren(element1).forEach(([id, t])=>inputs.set(id, t)
        );
        return new Form(element1, inputs);
    }
    /**
   * Creates a new form from a query selector to find the element.
   * @param selector The query selector.
   * @return The form.
   */ static fromSelector(selector) {
        const root = document.querySelector('body>div#forms');
        if (!root) throw new Error('Couldn\'t find forms root element.');
        const element = root.querySelector(selector);
        if (element) return Form.fromElement(element);
        else return null;
    }
    /**
   * Creates new forms from the children of a root element.
   * @param root The root element.
   * @returns The forms.
   */ static fromChildren(root) {
        return Array.from(root.children).map((e)=>[
                e.id,
                Form.fromElement(e)
            ]
        ).filter((t)=>t[1] !== null
        );
    }
    /**
   * Sets the callback for when the form is canceled.
   * @param callback The callback.
   */ setOnCancel(callback) {
        this._onCancelCallback = callback;
    }
    /**
   * Sets the callback for when the form is submitted.
   * @param callback The callback.
   */ setOnSubmit(callback1) {
        this._onSubmitCallback = callback1;
    }
    /**
   * Checks if the form is visible.
   */ get visible() {
        return !this._element.classList.contains('hidden');
    }
    /**
   * Sets the visibility of the form.
   */ set visible(value) {
        this._element.classList.toggle('hidden', !value);
    }
    /**
   * Cancels the form.
   */ cancel() {
        this.visible = false;
        this._onCancelCallback();
    }
    /**
   * Submits the form.
   */ submit() {
        this.visible = false;
        this._onSubmitCallback();
    }
    /**
   * Gets an input from the form.
   * @param name The name of the input.
   * @return The input.
   */ get(name) {
        return this._inputs.get(name) ?? null;
    }
    /**
   * Gets an iterator over the inputs on the form.
   */ get inputs() {
        return this._inputs.entries();
    }
}

},{"./button":"b0yVv","./range":"rcl1Y","./slider":"3OpYJ","./switch":"bkyAD","./toggle":"aOqPX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"rcl1Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Implements an input range.
 */ parcelHelpers.export(exports, "Range", ()=>Range
);
var _input = require("./input");
class Range extends _input.Input {
    /**
   * @param element The DOM element that represents the slider.
   */ constructor(element){
        // Get attributes.
        let min = parseFloat(element.getAttribute('min') ?? '1');
        if (min !== min) min = 1;
        let max = parseFloat(element.getAttribute('max') ?? '100');
        if (max !== max) max = 100;
        [min, max] = [
            Math.min(min, max),
            Math.max(min, max)
        ];
        let step = parseFloat(element.getAttribute('step') ?? '1');
        if (step !== step) step = 1;
        const type = element.getAttribute('type') ?? 'integer';
        if (type != 'integer') throw new Error(`Invalid range type: ${type}`);
        // Initialize properties.
        super([
            min,
            max
        ]);
        this._min = min;
        this._max = max;
        this._step = step;
        this._type = type;
        this._mouseDown = null;
        // Init track and thumb.
        this._track = element.querySelector('div');
        this._leftThumbWrapper = this._track.querySelector('div.left');
        this._leftThumb = this._leftThumbWrapper.querySelector('button');
        this._leftThumb.addEventListener('mousedown', ()=>this._mouseDown = 'left'
        );
        this._rightThumbWrapper = this._track.querySelector('div.right');
        this._rightThumb = this._rightThumbWrapper.querySelector('button');
        this._rightThumb.addEventListener('mousedown', ()=>this._mouseDown = 'right'
        );
        document.addEventListener('mouseup', ()=>this._mouseDown = null
        );
        document.addEventListener('mousemove', (e)=>{
            if (this._mouseDown === 'left') {
                const rect = this._track.getBoundingClientRect();
                const delta = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                if (this._type === 'integer') this.value = [
                    Math.min(Math.round(this._min + delta * (this._max - this._min)), this.value[1]),
                    this.value[1]
                ];
            } else if (this._mouseDown === 'right') {
                const rect = this._track.getBoundingClientRect();
                const delta = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                if (this._type === 'integer') this.value = [
                    this.value[0],
                    Math.max(this.value[0], Math.round(this._min + delta * (this._max - this._min)))
                ];
            }
        });
        // Init input element.
        this._display = element.querySelector('span#display');
        this.updateDisplay();
    }
    /**
   * Creates a new range from an element.
   * @param element The element.
   * @returns The range.
   */ static fromElement(element1) {
        if (element1 instanceof HTMLDivElement && element1.classList.contains('range')) return new Range(element1);
        else return null;
    }
    /**
   * Creates a new range from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @returns The slider.
   */ static fromSelector(root, selector) {
        const element = root.querySelector(selector);
        if (element) return Range.fromElement(element);
        else return null;
    }
    /**
   * Creates new sliders from the children of a root element.
   * @param root The root element.
   * @returns The sliders.
   */ static fromChildren(root1) {
        return Array.from(root1.children).map((e)=>[
                e.id,
                Range.fromElement(e)
            ]
        ).filter(([_, s])=>s !== null
        );
    }
    // Validate the value.
    validate(value) {
        // Fix to step.
        value = [
            Math.round(value[0] / this._step) * this._step,
            Math.round(value[1] / this._step) * this._step
        ];
        if (this._type === 'integer') value = [
            Math.round(value[0]),
            Math.round(value[1])
        ];
        value = [
            Math.max(this._min, value[0]),
            Math.max(value[0], Math.min(this._max, value[1]))
        ];
        return value;
    }
    // Update the range display.
    updateDisplay() {
        if (this._type === 'integer') this._display.innerText = this.value.join(' - ');
        let delta = this.value.map((v)=>(v - this._min) / (this._max - this._min)
        );
        this._leftThumbWrapper.style.transform = `translateX(${delta[0] * 100}%)`;
        this._rightThumbWrapper.style.transform = `translateX(${delta[1] * 100}%)`;
    }
}

},{"./input":"4swyu","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"4swyu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents an input element which can be used to get a value from the user.
 * @tparam Type The type of the value.
 */ parcelHelpers.export(exports, "Input", ()=>Input
);
class Input {
    /**
   * @param initial The initial value.
   */ constructor(initial){
        this._value = initial;
        this._onValueChanged = new Set();
    }
    /**
   * Gets the value of the input.
   */ get value() {
        return this._value;
    }
    /**
   * Sets the value of the input.
   */ set value(value) {
        const newValue = this.validate(value);
        if (newValue === this._value) return;
        this._value = newValue;
        this.updateDisplay();
        this._onValueChanged.forEach((callback)=>callback(this._value)
        );
    }
    /**
   * Adds a callback to be called when the value of the input changes.
   * @param callback The callback.
   */ addOnValueChangedCallback(callback) {
        this._onValueChanged.add(callback);
    }
    /**
   * Removes a callback from being called when the value of the input changes.
   * @param callback The callback.
   */ removeOnValueChangedCallback(callback1) {
        this._onValueChanged.delete(callback1);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3OpYJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Implements an input slider.
 */ parcelHelpers.export(exports, "Slider", ()=>Slider
);
var _input = require("./input");
class Slider extends _input.Input {
    /**
   * @param element The DOM element that represents the slider.
   */ constructor(element){
        // Get attributes.
        let min = parseFloat(element.getAttribute('min') ?? '1');
        if (min !== min) min = 1;
        let max = parseFloat(element.getAttribute('max') ?? '100');
        if (max !== max) max = 100;
        [min, max] = [
            Math.min(min, max),
            Math.max(min, max)
        ];
        let step = parseFloat(element.getAttribute('step') ?? '1');
        if (step !== step) step = 1;
        let initial = parseFloat(element.getAttribute('initial') ?? '50');
        if (initial !== initial) initial = 50;
        let digits = parseInt(element.getAttribute('digits') ?? '2');
        if (digits > 3) digits = 3;
        const type = element.getAttribute('type') ?? 'linear';
        if (type != 'exponential' && type != 'linear' && type != 'integer') throw new Error(`Invalid slider type: ${type}`);
        if (type === 'exponential' && min <= 0) throw new Error('Exponential sliders must have a minimum value greater than 0.');
        // Initialize properties.
        super(initial);
        this._min = min;
        this._max = max;
        this._step = step;
        this._digits = digits;
        this._type = type;
        this._mouseDown = false;
        // Init track and thumb.
        this._track = element.querySelector('div');
        this._thumbWrapper = this._track.querySelector('div');
        this._thumb = this._thumbWrapper.querySelector('button');
        this._thumb.addEventListener('mousedown', ()=>this._mouseDown = true
        );
        document.addEventListener('mouseup', ()=>this._mouseDown = false
        );
        document.addEventListener('mousemove', (e)=>{
            if (this._mouseDown) {
                const rect = this._track.getBoundingClientRect();
                const delta = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                if (this._type == 'exponential') this.value = this._min * Math.pow(10, delta * Math.log10(this._max / this._min));
                else if (this._type == 'linear') this.value = this._min + delta * (this._max - this._min);
                else if (this._type == 'integer') this.value = Math.round(this._min + delta * (this._max - this._min));
            }
        });
        // Init input element.
        this._input = element.querySelector('input');
        this._input.setAttribute('min', this._min.toString());
        this._input.setAttribute('min', this._max.toString());
        this._input.setAttribute('step', this._step.toString());
        this._input.addEventListener('change', ()=>this.value = this._input.valueAsNumber
        );
        this.updateDisplay();
    }
    /**
   * Creates a new slider from an element.
   * @param element The element.
   * @returns The slider.
   */ static fromElement(element1) {
        if (element1 instanceof HTMLDivElement && element1.classList.contains('slider')) return new Slider(element1);
        else return null;
    }
    /**
   * Creates a new slider from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @returns The slider.
   */ static fromSelector(root, selector) {
        const element = root.querySelector(selector);
        if (element) return Slider.fromElement(element);
        else return null;
    }
    /**
   * Creates new sliders from the children of a root element.
   * @param root The root element.
   * @returns The sliders.
   */ static fromChildren(root1) {
        return Array.from(root1.children).map((e)=>[
                e.id,
                Slider.fromElement(e)
            ]
        ).filter(([_, s])=>s !== null
        );
    }
    // Validate the value.
    validate(value) {
        // Fix to step.
        if (this._type === 'exponential') value = Math.pow(10, Math.round(Math.log10(value) / this._step) * this._step);
        else value = Math.round(value / this._step) * this._step;
        if (this._type === 'integer') value = Math.round(value);
        return Math.max(this._min, Math.min(this._max, value));
    }
    // Update the slider display.
    updateDisplay() {
        let delta;
        if (this._type === 'exponential') delta = Math.log10(this.value / this._min) / Math.log10(this._max / this._min);
        else delta = (this.value - this._min) / (this._max - this._min);
        if (this._type === 'integer') this._input.valueAsNumber = this.value;
        else if (this.value > Math.pow(10, -1 - this._digits) && this.value < Math.pow(10, 6 - this._digits) || this.value == 0) this._input.value = this.value.toFixed(this._digits);
        else if (this._digits === 0) this._input.value = this.value.toExponential(0);
        else this._input.value = this.value.toExponential(this._digits);
        this._thumbWrapper.style.transform = `translateX(${delta * 100}%)`;
    }
}

},{"./input":"4swyu","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bkyAD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a set of UI toggles, of which only one can be activated at a time.
 */ parcelHelpers.export(exports, "Switch", ()=>Switch
);
var _input = require("./input");
var _toggle = require("./toggle");
class Switch extends _input.Input {
    /**
   * @param toggles The switch toggles.
   * @param initialState The initial state.
   * @param noneState The state to use when no toggle is activated. If undefined, no state won't be allowed.
   */ constructor(toggles, initialState, noneState){
        super(initialState);
        if (toggles.size === 0) throw new Error('A switch cannot be empty, toggles must be specified.');
        this._toggles = toggles;
        this._noneState = noneState;
        // Initialize toggles.
        this._toggles.forEach((toggle, state)=>{
            // Set the initial state.
            toggle.value = state === this.value;
            // Add the callback.
            toggle.addOnValueChangedCallback((value)=>{
                if (value) this.value = state;
                else if (this.value === state && this._noneState !== undefined) this.value = this._noneState;
                else if (this.value === state) toggle.value = true; // Since no state isn't allowed, we need to activate the toggle.
            });
        });
    }
    /**
   * Creates a new switch from an element.
   * @param element The element.
   * @return The switch.
   */ static fromElement(element) {
        if (!(element instanceof HTMLDivElement) || !element.classList.contains('switch')) return null;
        const toggles = _toggle.Toggle.fromChildren(element);
        const noneState = element.getAttribute('none-state') ?? undefined;
        const initialState = element.getAttribute('initial') ?? noneState;
        if (initialState === undefined) throw new Error('If no initial state is specified, none-state must be specified.');
        return new Switch(new Map(toggles), initialState, noneState);
    }
    /**
   * Creates a new switch from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @return The switch.
   */ static fromSelector(root, selector) {
        const element = root.querySelector(selector);
        if (element) return Switch.fromElement(element);
        else return null;
    }
    /**
   * Creates new switches from the children of a root element.
   * @param root The root element.
   * @returns The switches.
   */ static fromChildren(root1) {
        return Array.from(root1.children).filter((e)=>e instanceof HTMLDivElement && e.classList.contains('switch')
        ).map((e)=>[
                e.id,
                Switch.fromElement(e)
            ]
        ).filter(([_, s])=>s !== null
        );
    }
    // Validate the state.
    validate(state1) {
        return state1;
    }
    // Updates the display of the switch.
    updateDisplay() {
        this._toggles.forEach((toggle, state)=>toggle.value = state === this.value
        );
    }
}

},{"./input":"4swyu","./toggle":"aOqPX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aOqPX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a UI button that toggles a boolean value.
 */ parcelHelpers.export(exports, "Toggle", ()=>Toggle
);
var _button = require("./button");
var _input = require("./input");
class Toggle extends _input.Input {
    /**
   * @param button The UI button that toggles the value.
   * @param initial The initial value.
   */ constructor(button, initial){
        super(initial);
        this._button = button;
        this._button.addOnClickCallback(()=>this.value = !this.value
        );
        this.updateDisplay();
    }
    /**
   * Creates a new toggle from an element.
   * @param element The element.
   * @return The toggle.
   */ static fromElement(element) {
        if (!element.classList.contains('toggle')) return null;
        const button = _button.Button.fromElement(element);
        if (button == null) return null;
        // Get the properties from the attributes.
        const initial = element.classList.contains('activated');
        return new Toggle(button, initial);
    }
    /**
   * Creates a new toggle from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @return The toggle.
   */ static fromSelector(root, selector) {
        const element = root.querySelector(selector);
        if (element) return Toggle.fromElement(element);
        else return null;
    }
    /**
   * Creates new toggles from the children of a root element.
   * @param root The root element.
   * @returns The toggles.
   */ static fromChildren(root1) {
        return Array.from(root1.children).map((e)=>[
                e.id,
                Toggle.fromElement(e)
            ]
        ).filter(([_, t])=>t !== null
        );
    }
    // Validates the value.
    validate(value) {
        return value;
    }
    // Updates the button display.
    updateDisplay() {
        this._button.element.classList.toggle('activated', this.value);
    }
}

},{"./button":"b0yVv","./input":"4swyu","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eTdw5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a chain of forms.
 */ parcelHelpers.export(exports, "FormChain", ()=>FormChain
);
var _form = require("./form");
class FormChain {
    /**
   * @param forms The forms in the chain.
   */ constructor(forms){
        this._forms = forms;
        this._currentIndex = -1;
        this._onCancelCallback = ()=>{
        };
        this._onSubmitCallback = ()=>{
        };
        // Set callbacks for each form.
        for(let i = 0; i < this._forms.length; i++){
            const form = this._forms[i];
            form.setOnSubmit(()=>{
                if (i == this._forms.length - 1) {
                    this._currentIndex = -1;
                    this._onSubmitCallback();
                } else this._forms[i + 1].visible = true;
            });
            form.setOnCancel(()=>{
                if (i == 0) {
                    this._currentIndex = -1;
                    this._onCancelCallback();
                } else this._forms[i - 1].visible = true;
            });
        }
    }
    /**
   * Creates a new form chain from an element.
   * @param element The element.
   * @return The form chain.
   */ static fromElement(element) {
        if (!(element instanceof HTMLDivElement) || !element.classList.contains('form-chain')) return null;
        // Get all forms on the form chain.
        const forms = _form.Form.fromChildren(element).map(([_, f])=>f
        );
        if (forms.length === 0) return null;
        return new FormChain(forms);
    }
    /**
   * Creates a new form chain from a query selector to find the element.
   * @param selector The query selector.
   * @return The form chain.
   */ static fromSelector(selector) {
        const root = document.querySelector('body>div#forms');
        if (!root) throw new Error('Couldn\'t find forms root element.');
        const element = root.querySelector(selector);
        if (element) return FormChain.fromElement(element);
        else return null;
    }
    /**
   * Checks if the form chain is visible.
   */ get visible() {
        return this._currentIndex !== -1;
    }
    /**
   * Skips to the next form in the chain, by submitting the current form.
   */ skip() {
        if (this._currentIndex !== -1) this._forms[this._currentIndex].submit();
    }
    /**
   * Sets the visibility of the form chain.
   */ set visible(value) {
        if (value && this._currentIndex === -1) {
            this._currentIndex = 0;
            this._forms[this._currentIndex].visible = true;
        } else if (!value && this._currentIndex !== -1) {
            this._forms[this._currentIndex].visible = false;
            this._currentIndex = -1;
        }
    }
    /**
   * Gets an input from the form chain.
   * @param name The name of the input.
   * @return The input.
   */ get(name) {
        for (const form of this._forms){
            const input = form.get(name);
            if (input !== null) return input;
        }
        return null;
    }
    /**
   * Gets an iterator over the inputs on the form chain.
   */ get inputs() {
        return this._forms.flatMap((form)=>Array.from(form.inputs)
        ).values();
    }
    /**
   * Sets the on cancel callback.
   * @param callback The callback.
   */ setOnCancel(callback) {
        this._onCancelCallback = callback;
    }
    /**
   * Sets the on submit callback.
   * @param callback The callback.
   */ setOnSubmit(callback1) {
        this._onSubmitCallback = callback1;
    }
}

},{"./form":"lTd4l","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3xqMr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Loading screen implementation.
 */ parcelHelpers.export(exports, "LoadingScreen", ()=>LoadingScreen
);
class LoadingScreen {
    /**
   * @param element The loading screen element.
   */ constructor(element){
        this._element = element;
    }
    /**
   * Creates a new loading screen from a query selector.
   * @param selector The selector for the loading screen element.
   * @return The loading screen.
   */ static fromSelector(selector) {
        const element = document.querySelector(selector);
        if (element === null) throw new Error('Loading screen element not found.');
        return new LoadingScreen(element);
    }
    /**
   * Checks if the the loading screen is visible.
   */ get loading() {
        return this._element.style.display === 'block';
    }
    /**
   * Shows or hides the loading screen.
   */ set loading(value) {
        if (value) this._element.style.display = 'block';
        else this._element.style.display = 'none';
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["11zn2","jZgE0"], "jZgE0", "parcelRequiref32f")

//# sourceMappingURL=index.e7f05703.js.map
