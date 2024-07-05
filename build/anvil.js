/* This is the full build for anvil.js, including lighting and physics engines All liscened under MIT. */ 
// Path: matter.js
/*!
 * matter-js 0.19.0 by @liabru
 * http://brm.io/matter-js/
 * License MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define("Matter", [], factory);
  else if(typeof exports === 'object')
    exports["Matter"] = factory();
  else
    root["Matter"] = factory();
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
* The `Matter.Common` module contains utility functions that are common to all modules.
*
* @class Common
*/

var Common = {};

module.exports = Common;

(function() {

    Common._baseDelta = 1000 / 60;
    Common._nextId = 0;
    Common._seed = 0;
    Common._nowStartTime = +(new Date());
    Common._warnedOnce = {};
    Common._decomp = null;

    /**
     * Extends the object in the first argument using the object in the second argument.
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */
    Common.extend = function(obj, deep) {
        var argsStart,
            args,
            deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        for (var i = argsStart; i < arguments.length; i++) {
            var source = arguments[i];

            if (source) {
                for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }

        return obj;
    };

    /**
     * Creates a new clone of the object, if deep is true references will also be cloned.
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */
    Common.clone = function(obj, deep) {
        return Common.extend({}, deep, obj);
    };

    /**
     * Returns the list of keys for the given object.
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */
    Common.keys = function(obj) {
        if (Object.keys)
            return Object.keys(obj);

        // avoid hasOwnProperty for performance
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    };

    /**
     * Returns the list of values for the given object.
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */
    Common.values = function(obj) {
        var values = [];

        if (Object.keys) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        }

        // avoid hasOwnProperty for performance
        for (var key in obj)
            values.push(obj[key]);
        return values;
    };

    /**
     * Gets a value from `base` relative to the `path` string.
     * @method get
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} The object at the given path
     */
    Common.get = function(obj, path, begin, end) {
        path = path.split('.').slice(begin, end);

        for (var i = 0; i < path.length; i += 1) {
            obj = obj[path[i]];
        }

        return obj;
    };

    /**
     * Sets a value on `base` relative to the given `path` string.
     * @method set
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {} val The value to set
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} Pass through `val` for chaining
     */
    Common.set = function(obj, path, val, begin, end) {
        var parts = path.split('.').slice(begin, end);
        Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
        return val;
    };

    /**
     * Shuffles the given array in-place.
     * The function uses a seeded random generator.
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */
    Common.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    /**
     * Randomly chooses a value from a list with equal probability.
     * The function uses a seeded random generator.
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */
    Common.choose = function(choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    /**
     * Returns true if the object is a HTMLElement, otherwise false.
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */
    Common.isElement = function(obj) {
        if (typeof HTMLElement !== 'undefined') {
            return obj instanceof HTMLElement;
        }

        return !!(obj && obj.nodeType && obj.nodeName);
    };

    /**
     * Returns true if the object is an array.
     * @method isArray
     * @param {object} obj
     * @return {boolean} True if the object is an array, otherwise false
     */
    Common.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Returns true if the object is a function.
     * @method isFunction
     * @param {object} obj
     * @return {boolean} True if the object is a function, otherwise false
     */
    Common.isFunction = function(obj) {
        return typeof obj === "function";
    };

    /**
     * Returns true if the object is a plain object.
     * @method isPlainObject
     * @param {object} obj
     * @return {boolean} True if the object is a plain object, otherwise false
     */
    Common.isPlainObject = function(obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    };

    /**
     * Returns true if the object is a string.
     * @method isString
     * @param {object} obj
     * @return {boolean} True if the object is a string, otherwise false
     */
    Common.isString = function(obj) {
        return toString.call(obj) === '[object String]';
    };

    /**
     * Returns the given value clamped between a minimum and maximum value.
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */
    Common.clamp = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };

    /**
     * Returns the sign of the given value.
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */
    Common.sign = function(value) {
        return value < 0 ? -1 : 1;
    };

    /**
     * Returns the current timestamp since the time origin (e.g. from page load).
     * The result is in milliseconds and will use high-resolution timing if available.
     * @method now
     * @return {number} the current timestamp in milliseconds
     */
    Common.now = function() {
        if (typeof window !== 'undefined' && window.performance) {
            if (window.performance.now) {
                return window.performance.now();
            } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
            }
        }

        if (Date.now) {
            return Date.now();
        }

        return (new Date()) - Common._nowStartTime;
    };

    /**
     * Returns a random value between a minimum and a maximum value inclusive.
     * The function uses a seeded random generator.
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */
    Common.random = function(min, max) {
        min = (typeof min !== "undefined") ? min : 0;
        max = (typeof max !== "undefined") ? max : 1;
        return min + _seededRandom() * (max - min);
    };

    var _seededRandom = function() {
        // https://en.wikipedia.org/wiki/Linear_congruential_generator
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
    };

    /**
     * Converts a CSS hex colour string into an integer.
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */
    Common.colorToNumber = function(colorString) {
        colorString = colorString.replace('#','');

        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0)
                        + colorString.charAt(1) + colorString.charAt(1)
                        + colorString.charAt(2) + colorString.charAt(2);
        }

        return parseInt(colorString, 16);
    };

    /**
     * The console logging level to use, where each level includes all levels above and excludes the levels below.
     * The default level is 'debug' which shows all console messages.  
     *
     * Possible level values are:
     * - 0 = None
     * - 1 = Debug
     * - 2 = Info
     * - 3 = Warn
     * - 4 = Error
     * @static
     * @property logLevel
     * @type {Number}
     * @default 1
     */
    Common.logLevel = 1;

    /**
     * Shows a `console.log` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method log
     * @param ...objs {} The objects to log.
     */
    Common.log = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.log.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.info` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method info
     * @param ...objs {} The objects to log.
     */
    Common.info = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
            console.info.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method warn
     * @param ...objs {} The objects to log.
     */
    Common.warn = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.warn.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Uses `Common.warn` to log the given message one time only.
     * @method warnOnce
     * @param ...objs {} The objects to log.
     */
    Common.warnOnce = function() {
        var message = Array.prototype.slice.call(arguments).join(' ');

        if (!Common._warnedOnce[message]) {
            Common.warn(message);
            Common._warnedOnce[message] = true;
        }
    };

    /**
     * Shows a deprecated console warning when the function on the given object is called.
     * The target function will be replaced with a new function that first shows the warning
     * and then calls the original function.
     * @method deprecated
     * @param {object} obj The object or module
     * @param {string} name The property name of the function on obj
     * @param {string} warning The one-time message to show if the function is called
     */
    Common.deprecated = function(obj, prop, warning) {
        obj[prop] = Common.chain(function() {
            Common.warnOnce('🔅 deprecated 🔅', warning);
        }, obj[prop]);
    };

    /**
     * Returns the next unique sequential ID.
     * @method nextId
     * @return {Number} Unique sequential ID
     */
    Common.nextId = function() {
        return Common._nextId++;
    };

    /**
     * A cross browser compatible indexOf implementation.
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     * @return {number} The position of needle in haystack, otherwise -1.
     */
    Common.indexOf = function(haystack, needle) {
        if (haystack.indexOf)
            return haystack.indexOf(needle);

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                return i;
        }

        return -1;
    };

    /**
     * A cross browser compatible array map implementation.
     * @method map
     * @param {array} list
     * @param {function} func
     * @return {array} Values from list transformed by func.
     */
    Common.map = function(list, func) {
        if (list.map) {
            return list.map(func);
        }

        var mapped = [];

        for (var i = 0; i < list.length; i += 1) {
            mapped.push(func(list[i]));
        }

        return mapped;
    };

    /**
     * Takes a directed graph and returns the partially ordered set of vertices in topological order.
     * Circular dependencies are allowed.
     * @method topologicalSort
     * @param {object} graph
     * @return {array} Partially ordered set of vertices in topological order.
     */
    Common.topologicalSort = function(graph) {
        // https://github.com/mgechev/javascript-algorithms
        // Copyright (c) Minko Gechev (MIT license)
        // Modifications: tidy formatting and naming
        var result = [],
            visited = [],
            temp = [];

        for (var node in graph) {
            if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
            }
        }

        return result;
    };

    Common._topologicalSort = function(node, visited, temp, graph, result) {
        var neighbors = graph[node] || [];
        temp[node] = true;

        for (var i = 0; i < neighbors.length; i += 1) {
            var neighbor = neighbors[i];

            if (temp[neighbor]) {
                // skip circular dependencies
                continue;
            }

            if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
            }
        }

        temp[node] = false;
        visited[node] = true;

        result.push(node);
    };

    /**
     * Takes _n_ functions as arguments and returns a new function that calls them in order.
     * The arguments applied when calling the new function will also be applied to every function passed.
     * The value of `this` refers to the last value returned in the chain that was not `undefined`.
     * Therefore if a passed function does not return a value, the previously returned value is maintained.
     * After all passed functions have been called the new function returns the last returned value (if any).
     * If any of the passed functions are a chain, then the chain will be flattened.
     * @method chain
     * @param ...funcs {function} The functions to chain.
     * @return {function} A new function that calls the passed functions in order.
     */
    Common.chain = function() {
        var funcs = [];

        for (var i = 0; i < arguments.length; i += 1) {
            var func = arguments[i];

            if (func._chained) {
                // flatten already chained functions
                funcs.push.apply(funcs, func._chained);
            } else {
                funcs.push(func);
            }
        }

        var chain = function() {
            // https://github.com/GoogleChrome/devtools-docs/issues/53#issuecomment-51941358
            var lastResult,
                args = new Array(arguments.length);

            for (var i = 0, l = arguments.length; i < l; i++) {
                args[i] = arguments[i];
            }

            for (i = 0; i < funcs.length; i += 1) {
                var result = funcs[i].apply(lastResult, args);

                if (typeof result !== 'undefined') {
                    lastResult = result;
                }
            }

            return lastResult;
        };

        chain._chained = funcs;

        return chain;
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathBefore
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathBefore = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            func,
            Common.get(base, path)
        ));
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathAfter
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathAfter = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            Common.get(base, path),
            func
        ));
    };

    /**
     * Provide the [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module to enable
     * concave vertex decomposition support when using `Bodies.fromVertices` e.g. `Common.setDecomp(require('poly-decomp'))`.
     * @method setDecomp
     * @param {} decomp The [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module.
     */
    Common.setDecomp = function(decomp) {
        Common._decomp = decomp;
    };

    /**
     * Returns the [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module provided through `Common.setDecomp`,
     * otherwise returns the global `decomp` if set.
     * @method getDecomp
     * @return {} The [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module if provided.
     */
    Common.getDecomp = function() {
        // get user provided decomp if set
        var decomp = Common._decomp;

        try {
            // otherwise from window global
            if (!decomp && typeof window !== 'undefined') {
                decomp = window.decomp;
            }

            // otherwise from node global
            if (!decomp && typeof global !== 'undefined') {
                decomp = global.decomp;
            }
        } catch (e) {
            // decomp not available
            decomp = null;
        }

        return decomp;
    };
})();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
* The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
*
* @class Bounds
*/

var Bounds = {};

module.exports = Bounds;

(function() {

    /**
     * Creates a new axis-aligned bounding box (AABB) for the given vertices.
     * @method create
     * @param {vertices} vertices
     * @return {bounds} A new bounds object
     */
    Bounds.create = function(vertices) {
        var bounds = { 
            min: { x: 0, y: 0 }, 
            max: { x: 0, y: 0 }
        };

        if (vertices)
            Bounds.update(bounds, vertices);

        return bounds;
    };

    /**
     * Updates bounds using the given vertices and extends the bounds given a velocity.
     * @method update
     * @param {bounds} bounds
     * @param {vertices} vertices
     * @param {vector} velocity
     */
    Bounds.update = function(bounds, vertices, velocity) {
        bounds.min.x = Infinity;
        bounds.max.x = -Infinity;
        bounds.min.y = Infinity;
        bounds.max.y = -Infinity;

        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
            if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
            if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
            if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
        }

        if (velocity) {
            if (velocity.x > 0) {
                bounds.max.x += velocity.x;
            } else {
                bounds.min.x += velocity.x;
            }

            if (velocity.y > 0) {
                bounds.max.y += velocity.y;
            } else {
                bounds.min.y += velocity.y;
            }
        }
    };

    /**
     * Returns true if the bounds contains the given point.
     * @method contains
     * @param {bounds} bounds
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */
    Bounds.contains = function(bounds, point) {
        return point.x >= bounds.min.x && point.x <= bounds.max.x 
               && point.y >= bounds.min.y && point.y <= bounds.max.y;
    };

    /**
     * Returns true if the two bounds intersect.
     * @method overlaps
     * @param {bounds} boundsA
     * @param {bounds} boundsB
     * @return {boolean} True if the bounds overlap, otherwise false
     */
    Bounds.overlaps = function(boundsA, boundsB) {
        return (boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x
                && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y);
    };

    /**
     * Translates the bounds by the given vector.
     * @method translate
     * @param {bounds} bounds
     * @param {vector} vector
     */
    Bounds.translate = function(bounds, vector) {
        bounds.min.x += vector.x;
        bounds.max.x += vector.x;
        bounds.min.y += vector.y;
        bounds.max.y += vector.y;
    };

    /**
     * Shifts the bounds to the given position.
     * @method shift
     * @param {bounds} bounds
     * @param {vector} position
     */
    Bounds.shift = function(bounds, position) {
        var deltaX = bounds.max.x - bounds.min.x,
            deltaY = bounds.max.y - bounds.min.y;

        bounds.min.x = position.x;
        bounds.max.x = position.x + deltaX;
        bounds.min.y = position.y;
        bounds.max.y = position.y + deltaY;
    };

})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
* The `Matter.Vector` module contains methods for creating and manipulating vectors.
* Vectors are the basis of all the geometry related operations in the engine.
* A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vector
*/

// TODO: consider params for reusing vector objects

var Vector = {};

module.exports = Vector;

(function() {

    /**
     * Creates a new vector.
     * @method create
     * @param {number} x
     * @param {number} y
     * @return {vector} A new vector
     */
    Vector.create = function(x, y) {
        return { x: x || 0, y: y || 0 };
    };

    /**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */
    Vector.clone = function(vector) {
        return { x: vector.x, y: vector.y };
    };

    /**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */
    Vector.magnitude = function(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };

    /**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */
    Vector.magnitudeSquared = function(vector) {
        return (vector.x * vector.x) + (vector.y * vector.y);
    };

    /**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} [output]
     * @return {vector} The vector rotated about (0, 0)
     */
    Vector.rotate = function(vector, angle, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    };

    /**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @param {vector} [output]
     * @return {vector} A new vector rotated about the point
     */
    Vector.rotateAbout = function(vector, angle, point, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
        output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
        output.x = x;
        return output;
    };

    /**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */
    Vector.normalise = function(vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    /**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */
    Vector.dot = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    };

    /**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */
    Vector.cross = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    };

    /**
     * Returns the cross-product of three vectors.
     * @method cross3
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} vectorC
     * @return {number} The cross product of the three vectors
     */
    Vector.cross3 = function(vectorA, vectorB, vectorC) {
        return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
    };

    /**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB added
     */
    Vector.add = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    };

    /**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */
    Vector.sub = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    };

    /**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */
    Vector.mult = function(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    /**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */
    Vector.div = function(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    /**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */
    Vector.perp = function(vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    /**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */
    Vector.neg = function(vector) {
        return { x: -vector.x, y: -vector.y };
    };

    /**
     * Returns the angle between the vector `vectorB - vectorA` and the x-axis in radians.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */
    Vector.angle = function(vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };

    /**
     * Temporary vector pool (not thread-safe).
     * @property _temp
     * @type {vector[]}
     * @private
     */
    Vector._temp = [
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create()
    ];

})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vertices
*/

var Vertices = {};

module.exports = Vertices;

var Vector = __webpack_require__(2);
var Common = __webpack_require__(0);

(function() {

    /**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Vertices must be specified in clockwise order.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */
    Vertices.create = function(points, body) {
        var vertices = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body: body,
                    isInternal: false
                };

            vertices.push(vertex);
        }

        return vertices;
    };

    /**
     * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
     * into a `Matter.Vertices` object for the given `Matter.Body`.
     * For parsing SVG paths, see `Svg.pathToVertices`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */
    Vertices.fromPath = function(path, body) {
        var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,
            points = [];

        path.replace(pathPattern, function(match, x, y) {
            points.push({ x: parseFloat(x), y: parseFloat(y) });
        });

        return Vertices.create(points, body);
    };

    /**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */
    Vertices.centre = function(vertices) {
        var area = Vertices.area(vertices, true),
            centre = { x: 0, y: 0 },
            cross,
            temp,
            j;

        for (var i = 0; i < vertices.length; i++) {
            j = (i + 1) % vertices.length;
            cross = Vector.cross(vertices[i], vertices[j]);
            temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
            centre = Vector.add(centre, temp);
        }

        return Vector.div(centre, 6 * area);
    };

    /**
     * Returns the average (mean) of the set of vertices.
     * @method mean
     * @param {vertices} vertices
     * @return {vector} The average point
     */
    Vertices.mean = function(vertices) {
        var average = { x: 0, y: 0 };

        for (var i = 0; i < vertices.length; i++) {
            average.x += vertices[i].x;
            average.y += vertices[i].y;
        }

        return Vector.div(average, vertices.length);
    };

    /**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */
    Vertices.area = function(vertices, signed) {
        var area = 0,
            j = vertices.length - 1;

        for (var i = 0; i < vertices.length; i++) {
            area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
            j = i;
        }

        if (signed)
            return area / 2;

        return Math.abs(area) / 2;
    };

    /**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */
    Vertices.inertia = function(vertices, mass) {
        var numerator = 0,
            denominator = 0,
            v = vertices,
            cross,
            j;

        // find the polygon's moment of inertia, using second moment of area
        // from equations at http://www.physicsforums.com/showthread.php?t=25293
        for (var n = 0; n < v.length; n++) {
            j = (n + 1) % v.length;
            cross = Math.abs(Vector.cross(v[j], v[n]));
            numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    };

    /**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */
    Vertices.translate = function(vertices, vector, scalar) {
        scalar = typeof scalar !== 'undefined' ? scalar : 1;

        var verticesLength = vertices.length,
            translateX = vector.x * scalar,
            translateY = vector.y * scalar,
            i;

        for (i = 0; i < verticesLength; i++) {
            vertices[i].x += translateX;
            vertices[i].y += translateY;
        }

        return vertices;
    };

    /**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */
    Vertices.rotate = function(vertices, angle, point) {
        if (angle === 0)
            return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            pointX = point.x,
            pointY = point.y,
            verticesLength = vertices.length,
            vertex,
            dx,
            dy,
            i;

        for (i = 0; i < verticesLength; i++) {
            vertex = vertices[i];
            dx = vertex.x - pointX;
            dy = vertex.y - pointY;
            vertex.x = pointX + (dx * cos - dy * sin);
            vertex.y = pointY + (dx * sin + dy * cos);
        }

        return vertices;
    };

    /**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */
    Vertices.contains = function(vertices, point) {
        var pointX = point.x,
            pointY = point.y,
            verticesLength = vertices.length,
            vertex = vertices[verticesLength - 1],
            nextVertex;

        for (var i = 0; i < verticesLength; i++) {
            nextVertex = vertices[i];

            if ((pointX - vertex.x) * (nextVertex.y - vertex.y) 
                + (pointY - vertex.y) * (vertex.x - nextVertex.x) > 0) {
                return false;
            }

            vertex = nextVertex;
        }

        return true;
    };

    /**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */
    Vertices.scale = function(vertices, scaleX, scaleY, point) {
        if (scaleX === 1 && scaleY === 1)
            return vertices;

        point = point || Vertices.centre(vertices);

        var vertex,
            delta;

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            delta = Vector.sub(vertex, point);
            vertices[i].x = point.x + delta.x * scaleX;
            vertices[i].y = point.y + delta.y * scaleY;
        }

        return vertices;
    };

    /**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */
    Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
        if (typeof radius === 'number') {
            radius = [radius];
        } else {
            radius = radius || [8];
        }

        // quality defaults to -1, which is auto
        quality = (typeof quality !== 'undefined') ? quality : -1;
        qualityMin = qualityMin || 2;
        qualityMax = qualityMax || 14;

        var newVertices = [];

        for (var i = 0; i < vertices.length; i++) {
            var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                vertex = vertices[i],
                nextVertex = vertices[(i + 1) % vertices.length],
                currentRadius = radius[i < radius.length ? i : radius.length - 1];

            if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
            }

            var prevNormal = Vector.normalise({ 
                x: vertex.y - prevVertex.y, 
                y: prevVertex.x - vertex.x
            });

            var nextNormal = Vector.normalise({ 
                x: nextVertex.y - vertex.y, 
                y: vertex.x - nextVertex.x
            });

            var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
                radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
                midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
                scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));

            var precision = quality;

            if (quality === -1) {
                // automatically decide precision
                precision = Math.pow(currentRadius, 0.32) * 1.75;
            }

            precision = Common.clamp(precision, qualityMin, qualityMax);

            // use an even value for precision, more likely to reduce axes by using symmetry
            if (precision % 2 === 1)
                precision += 1;

            var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
                theta = alpha / precision;

            for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
            }
        }

        return newVertices;
    };

    /**
     * Sorts the input vertices into clockwise order in place.
     * @method clockwiseSort
     * @param {vertices} vertices
     * @return {vertices} vertices
     */
    Vertices.clockwiseSort = function(vertices) {
        var centre = Vertices.mean(vertices);

        vertices.sort(function(vertexA, vertexB) {
            return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
        });

        return vertices;
    };

    /**
     * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
     * @method isConvex
     * @param {vertices} vertices
     * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
     */
    Vertices.isConvex = function(vertices) {
        // http://paulbourke.net/geometry/polygonmesh/
        // Copyright (c) Paul Bourke (use permitted)

        var flag = 0,
            n = vertices.length,
            i,
            j,
            k,
            z;

        if (n < 3)
            return null;

        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            k = (i + 2) % n;
            z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
            z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);

            if (z < 0) {
                flag |= 1;
            } else if (z > 0) {
                flag |= 2;
            }

            if (flag === 3) {
                return false;
            }
        }

        if (flag !== 0){
            return true;
        } else {
            return null;
        }
    };

    /**
     * Returns the convex hull of the input vertices as a new array of points.
     * @method hull
     * @param {vertices} vertices
     * @return [vertex] vertices
     */
    Vertices.hull = function(vertices) {
        // http://geomalgorithms.com/a10-_hull-1.html

        var upper = [],
            lower = [], 
            vertex,
            i;

        // sort vertices on x-axis (y-axis for ties)
        vertices = vertices.slice(0);
        vertices.sort(function(vertexA, vertexB) {
            var dx = vertexA.x - vertexB.x;
            return dx !== 0 ? dx : vertexA.y - vertexB.y;
        });

        // build lower hull
        for (i = 0; i < vertices.length; i += 1) {
            vertex = vertices[i];

            while (lower.length >= 2 
                   && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
            }

            lower.push(vertex);
        }

        // build upper hull
        for (i = vertices.length - 1; i >= 0; i -= 1) {
            vertex = vertices[i];

            while (upper.length >= 2 
                   && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
            }

            upper.push(vertex);
        }

        // concatenation of the lower and upper hulls gives the convex hull
        // omit last points because they are repeated at the beginning of the other list
        upper.pop();
        lower.pop();

        return upper.concat(lower);
    };

})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Body` module contains methods for creating and manipulating rigid bodies.
* For creating bodies with common configurations such as rectangles, circles and other polygons see the module `Matter.Bodies`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).

* @class Body
*/

var Body = {};

module.exports = Body;

var Vertices = __webpack_require__(3);
var Vector = __webpack_require__(2);
var Sleeping = __webpack_require__(7);
var Common = __webpack_require__(0);
var Bounds = __webpack_require__(1);
var Axes = __webpack_require__(11);

(function() {

    Body._timeCorrection = true;
    Body._inertiaScale = 4;
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;
    Body._baseDelta = 1000 / 60;

    /**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * Vertices must be specified in clockwise order.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */
    Body.create = function(options) {
        var defaults = {
            id: Common.nextId(),
            type: 'body',
            label: 'Body',
            parts: [],
            plugin: {},
            angle: 0,
            vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
            position: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            torque: 0,
            positionImpulse: { x: 0, y: 0 },
            constraintImpulse: { x: 0, y: 0, angle: 0 },
            totalContacts: 0,
            speed: 0,
            angularSpeed: 0,
            velocity: { x: 0, y: 0 },
            angularVelocity: 0,
            isSensor: false,
            isStatic: false,
            isSleeping: false,
            motion: 0,
            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.01,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            },
            slop: 0.05,
            timeScale: 1,
            render: {
                visible: true,
                opacity: 1,
                strokeStyle: null,
                fillStyle: null,
                lineWidth: null,
                sprite: {
                    xScale: 1,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0
                }
            },
            events: null,
            bounds: null,
            chamfer: null,
            circleRadius: 0,
            positionPrev: null,
            anglePrev: 0,
            parent: null,
            axes: null,
            area: 0,
            mass: 0,
            inertia: 0,
            deltaTime: 1000 / 60,
            _original: null
        };

        var body = Common.extend(defaults, options);

        _initProperties(body, options);

        return body;
    };

    /**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */
    Body.nextGroup = function(isNonColliding) {
        if (isNonColliding)
            return Body._nextNonCollidingGroupId--;

        return Body._nextCollidingGroupId++;
    };

    /**
     * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
     * There are 32 available. See `body.collisionFilter` for more information.
     * @method nextCategory
     * @return {Number} Unique category bitfield
     */
    Body.nextCategory = function() {
        Body._nextCategory = Body._nextCategory << 1;
        return Body._nextCategory;
    };

    /**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} [options]
     */
    var _initProperties = function(body, options) {
        options = options || {};

        // init required properties (order is important)
        Body.set(body, {
            bounds: body.bounds || Bounds.create(body.vertices),
            positionPrev: body.positionPrev || Vector.clone(body.position),
            anglePrev: body.anglePrev || body.angle,
            vertices: body.vertices,
            parts: body.parts || [body],
            isStatic: body.isStatic,
            isSleeping: body.isSleeping,
            parent: body.parent || body
        });

        Vertices.rotate(body.vertices, body.angle, body.position);
        Axes.rotate(body.axes, body.angle);
        Bounds.update(body.bounds, body.vertices, body.velocity);

        // allow options to override the automatically calculated properties
        Body.set(body, {
            axes: options.axes || body.axes,
            area: options.area || body.area,
            mass: options.mass || body.mass,
            inertia: options.inertia || body.inertia
        });

        // render properties
        var defaultFillStyle = (body.isStatic ? '#14151f' : Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1'])),
            defaultStrokeStyle = body.isStatic ? '#555' : '#ccc',
            defaultLineWidth = body.isStatic && body.render.fillStyle === null ? 1 : 0;
        body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
        body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
        body.render.lineWidth = body.render.lineWidth || defaultLineWidth;
        body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
        body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
    };

    /**
     * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
     * Prefer to use the actual setter functions in performance critical situations.
     * @method set
     * @param {body} body
     * @param {} settings A property name (or map of properties and values) to set on the body.
     * @param {} value The value to set if `settings` is a single property name.
     */
    Body.set = function(body, settings, value) {
        var property;

        if (typeof settings === 'string') {
            property = settings;
            settings = {};
            settings[property] = value;
        }

        for (property in settings) {
            if (!Object.prototype.hasOwnProperty.call(settings, property))
                continue;

            value = settings[property];
            switch (property) {

            case 'isStatic':
                Body.setStatic(body, value);
                break;
            case 'isSleeping':
                Sleeping.set(body, value);
                break;
            case 'mass':
                Body.setMass(body, value);
                break;
            case 'density':
                Body.setDensity(body, value);
                break;
            case 'inertia':
                Body.setInertia(body, value);
                break;
            case 'vertices':
                Body.setVertices(body, value);
                break;
            case 'position':
                Body.setPosition(body, value);
                break;
            case 'angle':
                Body.setAngle(body, value);
                break;
            case 'velocity':
                Body.setVelocity(body, value);
                break;
            case 'angularVelocity':
                Body.setAngularVelocity(body, value);
                break;
            case 'speed':
                Body.setSpeed(body, value);
                break;
            case 'angularSpeed':
                Body.setAngularSpeed(body, value);
                break;
            case 'parts':
                Body.setParts(body, value);
                break;
            case 'centre':
                Body.setCentre(body, value);
                break;
            default:
                body[property] = value;

            }
        }
    };

    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */
    Body.setStatic = function(body, isStatic) {
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.isStatic = isStatic;

            if (isStatic) {
                part._original = {
                    restitution: part.restitution,
                    friction: part.friction,
                    mass: part.mass,
                    inertia: part.inertia,
                    density: part.density,
                    inverseMass: part.inverseMass,
                    inverseInertia: part.inverseInertia
                };

                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;

                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
            } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;

                part._original = null;
            }
        }
    };

    /**
     * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */
    Body.setMass = function(body, mass) {
        var moment = body.inertia / (body.mass / 6);
        body.inertia = moment * (mass / 6);
        body.inverseInertia = 1 / body.inertia;

        body.mass = mass;
        body.inverseMass = 1 / body.mass;
        body.density = body.mass / body.area;
    };

    /**
     * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */
    Body.setDensity = function(body, density) {
        Body.setMass(body, density * body.area);
        body.density = density;
    };

    /**
     * Sets the moment of inertia of the body. This is the second moment of area in two dimensions.
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */
    Body.setInertia = function(body, inertia) {
        body.inertia = inertia;
        body.inverseInertia = 1 / body.inertia;
    };

    /**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull. Concave vertices must be decomposed into convex parts.
     * 
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */
    Body.setVertices = function(body, vertices) {
        // change vertices
        if (vertices[0].body === body) {
            body.vertices = vertices;
        } else {
            body.vertices = Vertices.create(vertices, body);
        }

        // update properties
        body.axes = Axes.fromVertices(body.vertices);
        body.area = Vertices.area(body.vertices);
        Body.setMass(body, body.density * body.area);

        // orient vertices around the centre of mass at origin (0, 0)
        var centre = Vertices.centre(body.vertices);
        Vertices.translate(body.vertices, centre, -1);

        // update inertia while vertices are at origin (0, 0)
        Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

        // update geometry
        Vertices.translate(body.vertices, body.position);
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the parts of the `body` and updates mass, inertia and centroid.
     * Each part will have its parent set to `body`.
     * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
     * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
     * @method setParts
     * @param {body} body
     * @param {body[]} parts
     * @param {bool} [autoHull=true]
     */
    Body.setParts = function(body, parts, autoHull) {
        var i;

        // add all the parts, ensuring that the first part is always the parent body
        parts = parts.slice(0);
        body.parts.length = 0;
        body.parts.push(body);
        body.parent = body;

        for (i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== body) {
                part.parent = body;
                body.parts.push(part);
            }
        }

        if (body.parts.length === 1)
            return;

        autoHull = typeof autoHull !== 'undefined' ? autoHull : true;

        // find the convex hull of all parts to set on the parent body
        if (autoHull) {
            var vertices = [];
            for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
            }

            Vertices.clockwiseSort(vertices);

            var hull = Vertices.hull(vertices),
                hullCentre = Vertices.centre(hull);

            Body.setVertices(body, hull);
            Vertices.translate(body.vertices, hullCentre);
        }

        // sum the properties of all compound parts of the parent body
        var total = Body._totalProperties(body);

        body.area = total.area;
        body.parent = body;
        body.position.x = total.centre.x;
        body.position.y = total.centre.y;
        body.positionPrev.x = total.centre.x;
        body.positionPrev.y = total.centre.y;

        Body.setMass(body, total.mass);
        Body.setInertia(body, total.inertia);
        Body.setPosition(body, total.centre);
    };

    /**
     * Set the centre of mass of the body. 
     * The `centre` is a vector in world-space unless `relative` is set, in which case it is a translation.
     * The centre of mass is the point the body rotates about and can be used to simulate non-uniform density.
     * This is equal to moving `body.position` but not the `body.vertices`.
     * Invalid if the `centre` falls outside the body's convex hull.
     * @method setCentre
     * @param {body} body
     * @param {vector} centre
     * @param {bool} relative
     */
    Body.setCentre = function(body, centre, relative) {
        if (!relative) {
            body.positionPrev.x = centre.x - (body.position.x - body.positionPrev.x);
            body.positionPrev.y = centre.y - (body.position.y - body.positionPrev.y);
            body.position.x = centre.x;
            body.position.y = centre.y;
        } else {
            body.positionPrev.x += centre.x;
            body.positionPrev.y += centre.y;
            body.position.x += centre.x;
            body.position.y += centre.y;
        }
    };

    /**
     * Sets the position of the body. By default velocity is unchanged.
     * If `updateVelocity` is `true` then velocity is inferred from the change in position.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     * @param {boolean} [updateVelocity=false]
     */
    Body.setPosition = function(body, position, updateVelocity) {
        var delta = Vector.sub(position, body.position);

        if (updateVelocity) {
            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;
            body.velocity.x = delta.x;
            body.velocity.y = delta.y;
            body.speed = Vector.magnitude(delta);
        } else {
            body.positionPrev.x += delta.x;
            body.positionPrev.y += delta.y;
        }

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.position.x += delta.x;
            part.position.y += delta.y;
            Vertices.translate(part.vertices, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Sets the angle of the body. By default angular velocity is unchanged.
     * If `updateVelocity` is `true` then angular velocity is inferred from the change in angle.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     * @param {boolean} [updateVelocity=false]
     */
    Body.setAngle = function(body, angle, updateVelocity) {
        var delta = angle - body.angle;

        if (updateVelocity) {
            body.anglePrev = body.angle;
            body.angularVelocity = delta;
            body.angularSpeed = Math.abs(delta);
        } else {
            body.anglePrev += delta;
        }

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.angle += delta;
            Vertices.rotate(part.vertices, delta, body.position);
            Axes.rotate(part.axes, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
            if (i > 0) {
                Vector.rotateAbout(part.position, delta, body.position, part.position);
            }
        }
    };

    /**
     * Sets the current linear velocity of the body.  
     * Affects body speed.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */
    Body.setVelocity = function(body, velocity) {
        var timeScale = body.deltaTime / Body._baseDelta;
        body.positionPrev.x = body.position.x - velocity.x * timeScale;
        body.positionPrev.y = body.position.y - velocity.y * timeScale;
        body.velocity.x = (body.position.x - body.positionPrev.x) / timeScale;
        body.velocity.y = (body.position.y - body.positionPrev.y) / timeScale;
        body.speed = Vector.magnitude(body.velocity);
    };

    /**
     * Gets the current linear velocity of the body.
     * @method getVelocity
     * @param {body} body
     * @return {vector} velocity
     */
    Body.getVelocity = function(body) {
        var timeScale = Body._baseDelta / body.deltaTime;

        return {
            x: (body.position.x - body.positionPrev.x) * timeScale,
            y: (body.position.y - body.positionPrev.y) * timeScale
        };
    };

    /**
     * Gets the current linear speed of the body.  
     * Equivalent to the magnitude of its velocity.
     * @method getSpeed
     * @param {body} body
     * @return {number} speed
     */
    Body.getSpeed = function(body) {
        return Vector.magnitude(Body.getVelocity(body));
    };

    /**
     * Sets the current linear speed of the body.  
     * Direction is maintained. Affects body velocity.
     * @method setSpeed
     * @param {body} body
     * @param {number} speed
     */
    Body.setSpeed = function(body, speed) {
        Body.setVelocity(body, Vector.mult(Vector.normalise(Body.getVelocity(body)), speed));
    };

    /**
     * Sets the current rotational velocity of the body.  
     * Affects body angular speed.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */
    Body.setAngularVelocity = function(body, velocity) {
        var timeScale = body.deltaTime / Body._baseDelta;
        body.anglePrev = body.angle - velocity * timeScale;
        body.angularVelocity = (body.angle - body.anglePrev) / timeScale;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Gets the current rotational velocity of the body.
     * @method getAngularVelocity
     * @param {body} body
     * @return {number} angular velocity
     */
    Body.getAngularVelocity = function(body) {
        return (body.angle - body.anglePrev) * Body._baseDelta / body.deltaTime;
    };

    /**
     * Gets the current rotational speed of the body.  
     * Equivalent to the magnitude of its angular velocity.
     * @method getAngularSpeed
     * @param {body} body
     * @return {number} angular speed
     */
    Body.getAngularSpeed = function(body) {
        return Math.abs(Body.getAngularVelocity(body));
    };

    /**
     * Sets the current rotational speed of the body.  
     * Direction is maintained. Affects body angular velocity.
     * @method setAngularSpeed
     * @param {body} body
     * @param {number} speed
     */
    Body.setAngularSpeed = function(body, speed) {
        Body.setAngularVelocity(body, Common.sign(Body.getAngularVelocity(body)) * speed);
    };

    /**
     * Moves a body by a given vector relative to its current position. By default velocity is unchanged.
     * If `updateVelocity` is `true` then velocity is inferred from the change in position.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     * @param {boolean} [updateVelocity=false]
     */
    Body.translate = function(body, translation, updateVelocity) {
        Body.setPosition(body, Vector.add(body.position, translation), updateVelocity);
    };

    /**
     * Rotates a body by a given angle relative to its current angle. By default angular velocity is unchanged.
     * If `updateVelocity` is `true` then angular velocity is inferred from the change in angle.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     * @param {vector} [point]
     * @param {boolean} [updateVelocity=false]
     */
    Body.rotate = function(body, rotation, point, updateVelocity) {
        if (!point) {
            Body.setAngle(body, body.angle + rotation, updateVelocity);
        } else {
            var cos = Math.cos(rotation),
                sin = Math.sin(rotation),
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;

            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            }, updateVelocity);

            Body.setAngle(body, body.angle + rotation, updateVelocity);
        }
    };

    /**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */
    Body.scale = function(body, scaleX, scaleY, point) {
        var totalArea = 0,
            totalInertia = 0;

        point = point || body.position;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            // scale vertices
            Vertices.scale(part.vertices, scaleX, scaleY, point);

            // update properties
            part.axes = Axes.fromVertices(part.vertices);
            part.area = Vertices.area(part.vertices);
            Body.setMass(part, body.density * part.area);

            // update inertia (requires vertices to be at origin)
            Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
            Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
            Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });

            if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
            }

            // scale position
            part.position.x = point.x + (part.position.x - point.x) * scaleX;
            part.position.y = point.y + (part.position.y - point.y) * scaleY;

            // update bounds
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }

        // handle parent body
        if (body.parts.length > 1) {
            body.area = totalArea;

            if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
            }
        }

        // handle circles
        if (body.circleRadius) { 
            if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
            } else {
                // body is no longer a circle
                body.circleRadius = null;
            }
        }
    };

    /**
     * Performs an update by integrating the equations of motion on the `body`.
     * This is applied every update by `Matter.Engine` automatically.
     * @method update
     * @param {body} body
     * @param {number} [deltaTime=16.666]
     */
    Body.update = function(body, deltaTime) {
        deltaTime = (typeof deltaTime !== 'undefined' ? deltaTime : (1000 / 60)) * body.timeScale;

        var deltaTimeSquared = deltaTime * deltaTime,
            correction = Body._timeCorrection ? deltaTime / (body.deltaTime || deltaTime) : 1;

        // from the previous step
        var frictionAir = 1 - body.frictionAir * (deltaTime / Common._baseDelta),
            velocityPrevX = (body.position.x - body.positionPrev.x) * correction,
            velocityPrevY = (body.position.y - body.positionPrev.y) * correction;

        // update velocity with Verlet integration
        body.velocity.x = (velocityPrevX * frictionAir) + (body.force.x / body.mass) * deltaTimeSquared;
        body.velocity.y = (velocityPrevY * frictionAir) + (body.force.y / body.mass) * deltaTimeSquared;

        body.positionPrev.x = body.position.x;
        body.positionPrev.y = body.position.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;
        body.deltaTime = deltaTime;

        // update angular velocity with Verlet integration
        body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
        body.anglePrev = body.angle;
        body.angle += body.angularVelocity;

        // transform the body geometry
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            Vertices.translate(part.vertices, body.velocity);

            if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
            }

            if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                    Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
            }

            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Updates properties `body.velocity`, `body.speed`, `body.angularVelocity` and `body.angularSpeed` which are normalised in relation to `Body._baseDelta`.
     * @method updateVelocities
     * @param {body} body
     */
    Body.updateVelocities = function(body) {
        var timeScale = Body._baseDelta / body.deltaTime,
            bodyVelocity = body.velocity;

        bodyVelocity.x = (body.position.x - body.positionPrev.x) * timeScale;
        bodyVelocity.y = (body.position.y - body.positionPrev.y) * timeScale;
        body.speed = Math.sqrt((bodyVelocity.x * bodyVelocity.x) + (bodyVelocity.y * bodyVelocity.y));

        body.angularVelocity = (body.angle - body.anglePrev) * timeScale;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Applies the `force` to the `body` from the force origin `position` in world-space, over a single timestep, including applying any resulting angular torque.
     * 
     * Forces are useful for effects like gravity, wind or rocket thrust, but can be difficult in practice when precise control is needed. In these cases see `Body.setVelocity` and `Body.setPosition` as an alternative.
     * 
     * The force from this function is only applied once for the duration of a single timestep, in other words the duration depends directly on the current engine update `delta` and the rate of calls to this function.
     * 
     * Therefore to account for time, you should apply the force constantly over as many engine updates as equivalent to the intended duration.
     * 
     * If all or part of the force duration is some fraction of a timestep, first multiply the force by `duration / timestep`.
     * 
     * The force origin `position` in world-space must also be specified. Passing `body.position` will result in zero angular effect as the force origin would be at the centre of mass.
     * 
     * The `body` will take time to accelerate under a force, the resulting effect depends on duration of the force, the body mass and other forces on the body including friction combined.
     * @method applyForce
     * @param {body} body
     * @param {vector} position The force origin in world-space. Pass `body.position` to avoid angular torque.
     * @param {vector} force
     */
    Body.applyForce = function(body, position, force) {
        var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
        body.force.x += force.x;
        body.force.y += force.y;
        body.torque += offset.x * force.y - offset.y * force.x;
    };

    /**
     * Returns the sums of the properties of all compound parts of the parent body.
     * @method _totalProperties
     * @private
     * @param {body} body
     * @return {}
     */
    Body._totalProperties = function(body) {
        // from equations at:
        // https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
        // http://output.to/sideway/default.asp?qno=121100087

        var properties = {
            mass: 0,
            area: 0,
            inertia: 0,
            centre: { x: 0, y: 0 }
        };

        // sum the properties of all compound parts of the parent body
        for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
            var part = body.parts[i],
                mass = part.mass !== Infinity ? part.mass : 1;

            properties.mass += mass;
            properties.area += part.area;
            properties.inertia += part.inertia;
            properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
        }

        properties.centre = Vector.div(properties.centre, properties.mass);

        return properties;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a body starts sleeping (where `this` is the body).
    *
    * @event sleepStart
    * @this {body} The body that has started sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a body ends sleeping (where `this` is the body).
    *
    * @event sleepEnd
    * @this {body} The body that has ended sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * _Read only_. Set by `Body.create`.
     * 
     * A `String` denoting the type of object.
     *
     * @readOnly
     * @property type
     * @type string
     * @default "body"
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     */

    /**
     * _Read only_. Use `Body.setParts` to set. 
     * 
     * An array of bodies that make up this body. 
     * The first body in the array must always be a self reference to the current body instance.
     * All bodies in the `parts` array together form a single rigid compound body.
     * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
     * Parts themselves should never be added to a `World`, only the parent body should be.
     * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
     *
     * @readOnly
     * @property parts
     * @type body[]
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * _Read only_. Updated by `Body.setParts`.
     * 
     * A reference to the body that this is a part of. See `body.parts`.
     * This is a self reference if the body is not a part of another body.
     *
     * @readOnly
     * @property parent
     * @type body
     */

    /**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setVertices` or `Body.setParts` to set. See also `Bodies.fromVertices`.
     * 
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     * `[{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]`
     * 
     * Vertices must always be convex, in clockwise order and must not contain any duplicate points.
     * 
     * Concave vertices should be decomposed into convex `parts`, see `Bodies.fromVertices` and `Body.setParts`.
     *
     * When set the vertices are translated such that `body.position` is at the centre of mass.
     * Many other body properties are automatically calculated from these vertices when set including `density`, `area` and `inertia`.
     * 
     * The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @readOnly
     * @property vertices
     * @type vector[]
     */

    /**
     * _Read only_. Use `Body.setPosition` to set. 
     * 
     * A `Vector` that specifies the current world-space position of the body.
     * 
     * @readOnly
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that accumulates the total force applied to the body for a single update.
     * Force is zeroed after every `Engine.update`, so constant forces should be applied for every update they are needed. See also `Body.applyForce`.
     * 
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that accumulates the total torque (turning force) applied to the body for a single update. See also `Body.applyForce`.
     * Torque is zeroed after every `Engine.update`, so constant torques should be applied for every update they are needed.
     *
     * Torques result in angular acceleration on every update, which depends on body inertia and the engine update delta.
     * 
     * @property torque
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setSpeed` to set. 
     * 
     * See `Body.getSpeed` for details.
     * 
     * Equivalent to the magnitude of `body.velocity` (always positive).
     * 
     * @readOnly
     * @property speed
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setVelocity` to set. 
     * 
     * See `Body.getVelocity` for details.
     * 
     * Equivalent to the magnitude of `body.angularVelocity` (always positive).
     * 
     * @readOnly
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * _Read only_. Use `Body.setAngularSpeed` to set. 
     * 
     * See `Body.getAngularSpeed` for details.
     * 
     * 
     * @readOnly
     * @property angularSpeed
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setAngularVelocity` to set. 
     * 
     * See `Body.getAngularVelocity` for details.
     * 
     *
     * @readOnly
     * @property angularVelocity
     * @type number
     * @default 0
     */

    /**
     * _Read only_. Use `Body.setStatic` to set. 
     * 
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     *
     * @readOnly
     * @property isStatic
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
     *
     * @property isSensor
     * @type boolean
     * @default false
     */

    /**
     * _Read only_. Use `Sleeping.set` to set. 
     * 
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     *
     * @readOnly
     * @property isSleeping
     * @type boolean
     * @default false
     */

    /**
     * _Read only_. Calculated during engine update only when sleeping is enabled.
     * 
     * A `Number` that loosely measures the amount of movement a body currently has.
     *
     * Derived from `body.speed^2 + body.angularSpeed^2`. See `Sleeping.update`.
     * 
     * @readOnly
     * @property motion
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the length of time during which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     * 
     * @property sleepThreshold
     * @type number
     * @default 60
     */

    /**
     * _Read only_. Use `Body.setDensity` to set. 
     * 
     * A `Number` that defines the density of the body (mass per unit area).
     * 
     * Mass will also be updated when set.
     *
     * @readOnly
     * @property density
     * @type number
     * @default 0.001
     */

    /**
     * _Read only_. Use `Body.setMass` to set. 
     * 
     * A `Number` that defines the mass of the body.
     * 
     * Density will also be updated when set.
     * 
     * @readOnly
     * @property mass
     * @type number
     */

    /**
     * _Read only_. Use `Body.setMass` to set. 
     * 
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     *
     * @readOnly
     * @property inverseMass
     * @type number
     */

    /**
     * _Read only_. Automatically calculated when vertices, mass or density are set or set through `Body.setInertia`.
     * 
     * A `Number` that defines the moment of inertia of the body. This is the second moment of area in two dimensions.
     * 
     * Can be manually set to `Infinity` to prevent rotation of the body. See `Body.setInertia`.
     * 
     * @readOnly
     * @property inertia
     * @type number
     */

    /**
     * _Read only_. Automatically calculated when vertices, mass or density are set or calculated by `Body.setInertia`.
     * 
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     * 
     * @readOnly
     * @property inverseInertia
     * @type number
     */

    /**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     * `Math.max(bodyA.restitution, bodyB.restitution)`
     *
     * @property restitution
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear. 
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     * `Math.min(bodyA.friction, bodyB.friction)`
     *
     * @property friction
     * @type number
     * @default 0.1
     */

    /**
     * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
     * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
     * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
     * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
     *
     * @property frictionStatic
     * @type number
     * @default 0.5
     */

    /**
     * A `Number` that defines the air friction of the body (air resistance). 
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear. 
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     */

    /**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     */

    /**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     */

    /**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     */

    /**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     */

    /**
     * A `Number` that specifies a thin boundary around the body where it is allowed to slightly sink into other bodies.
     * 
     * This is required for proper collision response, including friction and restitution effects.
     * 
     * The default should generally suffice in most cases. You may need to decrease this value for very small bodies that are nearing the default value in scale.
     *
     * @property slop
     * @type number
     * @default 0.05
     */

    /**
     * A `Number` that specifies per-body time scaling.
     *
     * @property timeScale
     * @type number
     * @default 1
     */

    /**
     * _Read only_. Updated during engine update.
     * 
     * A `Number` that records the last delta time value used to update this body.
     * Used to calculate speed and velocity.
     *
     * @readOnly
     * @property deltaTime
     * @type number
     * @default 1000 / 60
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * Sets the opacity to use when rendering.
     *
     * @property render.opacity
     * @type number
     * @default 1
    */

    /**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     */

    /**
     * An `String` that defines the path to the image to use as the sprite texture, if any.
     *
     * @property render.sprite.texture
     * @type string
     */

    /**
     * A `Number` that defines the scaling in the x-axis for the sprite, if any.
     *
     * @property render.sprite.xScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the scaling in the y-axis for the sprite, if any.
     *
     * @property render.sprite.yScale
     * @type number
     * @default 1
     */

    /**
      * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
      *
      * @property render.sprite.xOffset
      * @type number
      * @default 0
      */

    /**
      * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
      *
      * @property render.sprite.yOffset
      * @type number
      * @default 0
      */

    /**
     * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 0
     */

    /**
     * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.fillStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * _Read only_. Calculated automatically when vertices are set.
     * 
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated when vertices are set.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @readOnly
     * @property axes
     * @type vector[]
     */

    /**
     * _Read only_. Calculated automatically when vertices are set.
     * 
     * A `Number` that measures the area of the body's convex hull.
     * 
     * @readOnly
     * @property area
     * @type string
     * @default 
     */

    /**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated when vertices are set and constantly updated by `Body.update` during simulation.
     * 
     * @property bounds
     * @type bounds
     */

})();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Events` module contains methods to fire and listen to events on other objects.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Events
*/

var Events = {};

module.exports = Events;

var Common = __webpack_require__(0);

(function() {

    /**
     * Subscribes a callback function to the given object's `eventName`.
     * @method on
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.on = function(object, eventNames, callback) {
        var names = eventNames.split(' '),
            name;

        for (var i = 0; i < names.length; i++) {
            name = names[i];
            object.events = object.events || {};
            object.events[name] = object.events[name] || [];
            object.events[name].push(callback);
        }

        return callback;
    };

    /**
     * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
     * @method off
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.off = function(object, eventNames, callback) {
        if (!eventNames) {
            object.events = {};
            return;
        }

        // handle Events.off(object, callback)
        if (typeof eventNames === 'function') {
            callback = eventNames;
            eventNames = Common.keys(object.events).join(' ');
        }

        var names = eventNames.split(' ');

        for (var i = 0; i < names.length; i++) {
            var callbacks = object.events[names[i]],
                newCallbacks = [];

            if (callback && callbacks) {
                for (var j = 0; j < callbacks.length; j++) {
                    if (callbacks[j] !== callback)
                        newCallbacks.push(callbacks[j]);
                }
            }

            object.events[names[i]] = newCallbacks;
        }
    };

    /**
     * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
     * @method trigger
     * @param {} object
     * @param {string} eventNames
     * @param {} event
     */
    Events.trigger = function(object, eventNames, event) {
        var names,
            name,
            callbacks,
            eventClone;

        var events = object.events;

        if (events && Common.keys(events).length > 0) {
            if (!event)
                event = {};

            names = eventNames.split(' ');

            for (var i = 0; i < names.length; i++) {
                name = names[i];
                callbacks = events[name];

                if (callbacks) {
                    eventClone = Common.clone(event, false);
                    eventClone.name = name;
                    eventClone.source = object;

                    for (var j = 0; j < callbacks.length; j++) {
                        callbacks[j].apply(object, [eventClone]);
                    }
                }
            }
        }
    };

})();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
* A composite is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite` objects.
*
* They are a container that can represent complex objects made of multiple parts, even if they are not physically connected.
* A composite could contain anything from a single body all the way up to a whole world.
* 
* When making any changes to composites, use the included functions rather than changing their properties directly.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composite
*/

var Composite = {};

module.exports = Composite;

var Events = __webpack_require__(5);
var Common = __webpack_require__(0);
var Bounds = __webpack_require__(1);
var Body = __webpack_require__(4);

(function() {

    /**
     * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} [options]
     * @return {composite} A new composite
     */
    Composite.create = function(options) {
        return Common.extend({ 
            id: Common.nextId(),
            type: 'composite',
            parent: null,
            isModified: false,
            bodies: [], 
            constraints: [], 
            composites: [],
            label: 'Composite',
            plugin: {},
            cache: {
                allBodies: null,
                allConstraints: null,
                allComposites: null
            }
        }, options);
    };

    /**
     * Sets the composite's `isModified` flag. 
     * If `updateParents` is true, all parents will be set (default: false).
     * If `updateChildren` is true, all children will be set (default: false).
     * @private
     * @method setModified
     * @param {composite} composite
     * @param {boolean} isModified
     * @param {boolean} [updateParents=false]
     * @param {boolean} [updateChildren=false]
     */
    Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
        composite.isModified = isModified;

        if (isModified && composite.cache) {
            composite.cache.allBodies = null;
            composite.cache.allConstraints = null;
            composite.cache.allComposites = null;
        }

        if (updateParents && composite.parent) {
            Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
        }

        if (updateChildren) {
            for (var i = 0; i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(childComposite, isModified, updateParents, updateChildren);
            }
        }
    };

    /**
     * Generic single or multi-add function. Adds a single or an array of body(s), constraint(s) or composite(s) to the given composite.
     * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
     * @method add
     * @param {composite} composite
     * @param {object|array} object A single or an array of body(s), constraint(s) or composite(s)
     * @return {composite} The original composite with the objects added
     */
    Composite.add = function(composite, object) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeAdd', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                // skip adding compound parts
                if (obj.parent !== obj) {
                    Common.warn('Composite.add: skipped adding a compound body part (you must add its parent instead)');
                    break;
                }

                Composite.addBody(composite, obj);
                break;
            case 'constraint':
                Composite.addConstraint(composite, obj);
                break;
            case 'composite':
                Composite.addComposite(composite, obj);
                break;
            case 'mouseConstraint':
                Composite.addConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterAdd', { object: object });

        return composite;
    };

    /**
     * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Optionally searching its children recursively.
     * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
     * @method remove
     * @param {composite} composite
     * @param {object|array} object
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the objects removed
     */
    Composite.remove = function(composite, object, deep) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeRemove', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                Composite.removeBody(composite, obj, deep);
                break;
            case 'constraint':
                Composite.removeConstraint(composite, obj, deep);
                break;
            case 'composite':
                Composite.removeComposite(composite, obj, deep);
                break;
            case 'mouseConstraint':
                Composite.removeConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterRemove', { object: object });

        return composite;
    };

    /**
     * Adds a composite to the given composite.
     * @private
     * @method addComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @return {composite} The original compositeA with the objects from compositeB added
     */
    Composite.addComposite = function(compositeA, compositeB) {
        compositeA.composites.push(compositeB);
        compositeB.parent = compositeA;
        Composite.setModified(compositeA, true, true, false);
        return compositeA;
    };

    /**
     * Removes a composite from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @param {boolean} [deep=false]
     * @return {composite} The original compositeA with the composite removed
     */
    Composite.removeComposite = function(compositeA, compositeB, deep) {
        var position = Common.indexOf(compositeA.composites, compositeB);
        if (position !== -1) {
            Composite.removeCompositeAt(compositeA, position);
        }

        if (deep) {
            for (var i = 0; i < compositeA.composites.length; i++){
                Composite.removeComposite(compositeA.composites[i], compositeB, true);
            }
        }

        return compositeA;
    };

    /**
     * Removes a composite from the given composite.
     * @private
     * @method removeCompositeAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the composite removed
     */
    Composite.removeCompositeAt = function(composite, position) {
        composite.composites.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a body to the given composite.
     * @private
     * @method addBody
     * @param {composite} composite
     * @param {body} body
     * @return {composite} The original composite with the body added
     */
    Composite.addBody = function(composite, body) {
        composite.bodies.push(body);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a body from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeBody
     * @param {composite} composite
     * @param {body} body
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBody = function(composite, body, deep) {
        var position = Common.indexOf(composite.bodies, body);
        if (position !== -1) {
            Composite.removeBodyAt(composite, position);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeBody(composite.composites[i], body, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeBodyAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBodyAt = function(composite, position) {
        composite.bodies.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a constraint to the given composite.
     * @private
     * @method addConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @return {composite} The original composite with the constraint added
     */
    Composite.addConstraint = function(composite, constraint) {
        composite.constraints.push(constraint);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a constraint from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraint = function(composite, constraint, deep) {
        var position = Common.indexOf(composite.constraints, constraint);
        if (position !== -1) {
            Composite.removeConstraintAt(composite, position);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeConstraint(composite.composites[i], constraint, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeConstraintAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraintAt = function(composite, position) {
        composite.constraints.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes all bodies, constraints and composites from the given composite.
     * Optionally clearing its children recursively.
     * @method clear
     * @param {composite} composite
     * @param {boolean} keepStatic
     * @param {boolean} [deep=false]
     */
    Composite.clear = function(composite, keepStatic, deep) {
        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.clear(composite.composites[i], keepStatic, true);
            }
        }

        if (keepStatic) {
            composite.bodies = composite.bodies.filter(function(body) { return body.isStatic; });
        } else {
            composite.bodies.length = 0;
        }

        composite.constraints.length = 0;
        composite.composites.length = 0;

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Returns all bodies in the given composite, including all bodies in its children, recursively.
     * @method allBodies
     * @param {composite} composite
     * @return {body[]} All the bodies
     */
    Composite.allBodies = function(composite) {
        if (composite.cache && composite.cache.allBodies) {
            return composite.cache.allBodies;
        }

        var bodies = [].concat(composite.bodies);

        for (var i = 0; i < composite.composites.length; i++)
            bodies = bodies.concat(Composite.allBodies(composite.composites[i]));

        if (composite.cache) {
            composite.cache.allBodies = bodies;
        }

        return bodies;
    };

    /**
     * Returns all constraints in the given composite, including all constraints in its children, recursively.
     * @method allConstraints
     * @param {composite} composite
     * @return {constraint[]} All the constraints
     */
    Composite.allConstraints = function(composite) {
        if (composite.cache && composite.cache.allConstraints) {
            return composite.cache.allConstraints;
        }

        var constraints = [].concat(composite.constraints);

        for (var i = 0; i < composite.composites.length; i++)
            constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));

        if (composite.cache) {
            composite.cache.allConstraints = constraints;
        }

        return constraints;
    };

    /**
     * Returns all composites in the given composite, including all composites in its children, recursively.
     * @method allComposites
     * @param {composite} composite
     * @return {composite[]} All the composites
     */
    Composite.allComposites = function(composite) {
        if (composite.cache && composite.cache.allComposites) {
            return composite.cache.allComposites;
        }

        var composites = [].concat(composite.composites);

        for (var i = 0; i < composite.composites.length; i++)
            composites = composites.concat(Composite.allComposites(composite.composites[i]));

        if (composite.cache) {
            composite.cache.allComposites = composites;
        }

        return composites;
    };

    /**
     * Searches the composite recursively for an object matching the type and id supplied, null if not found.
     * @method get
     * @param {composite} composite
     * @param {number} id
     * @param {string} type
     * @return {object} The requested object, if found
     */
    Composite.get = function(composite, id, type) {
        var objects,
            object;

        switch (type) {
        case 'body':
            objects = Composite.allBodies(composite);
            break;
        case 'constraint':
            objects = Composite.allConstraints(composite);
            break;
        case 'composite':
            objects = Composite.allComposites(composite).concat(composite);
            break;
        }

        if (!objects)
            return null;

        object = objects.filter(function(object) { 
            return object.id.toString() === id.toString(); 
        });

        return object.length === 0 ? null : object[0];
    };

    /**
     * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
     * @method move
     * @param {compositeA} compositeA
     * @param {object[]} objects
     * @param {compositeB} compositeB
     * @return {composite} Returns compositeA
     */
    Composite.move = function(compositeA, objects, compositeB) {
        Composite.remove(compositeA, objects);
        Composite.add(compositeB, objects);
        return compositeA;
    };

    /**
     * Assigns new ids for all objects in the composite, recursively.
     * @method rebase
     * @param {composite} composite
     * @return {composite} Returns composite
     */
    Composite.rebase = function(composite) {
        var objects = Composite.allBodies(composite)
            .concat(Composite.allConstraints(composite))
            .concat(Composite.allComposites(composite));

        for (var i = 0; i < objects.length; i++) {
            objects[i].id = Common.nextId();
        }

        return composite;
    };

    /**
     * Translates all children in the composite by a given vector relative to their current positions, 
     * without imparting any velocity.
     * @method translate
     * @param {composite} composite
     * @param {vector} translation
     * @param {bool} [recursive=true]
     */
    Composite.translate = function(composite, translation, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            Body.translate(bodies[i], translation);
        }

        return composite;
    };

    /**
     * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
     * @method rotate
     * @param {composite} composite
     * @param {number} rotation
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.rotate = function(composite, rotation, point, recursive) {
        var cos = Math.cos(rotation),
            sin = Math.sin(rotation),
            bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;

            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.rotate(body, rotation);
        }

        return composite;
    };

    /**
     * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
     * @method scale
     * @param {composite} composite
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;

            Body.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY
            });

            Body.scale(body, scaleX, scaleY);
        }

        return composite;
    };

    /**
     * Returns the union of the bounds of all of the composite's bodies.
     * @method bounds
     * @param {composite} composite The composite.
     * @returns {bounds} The composite bounds.
     */
    Composite.bounds = function(composite) {
        var bodies = Composite.allBodies(composite),
            vertices = [];

        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i];
            vertices.push(body.bounds.min, body.bounds.max);
        }

        return Bounds.create(vertices);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a call to `Composite.add` is made, before objects have been added.
    *
    * @event beforeAdd
    * @param {} event An event object
    * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.add` is made, after objects have been added.
    *
    * @event afterAdd
    * @param {} event An event object
    * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, before objects have been removed.
    *
    * @event beforeRemove
    * @param {} event An event object
    * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, after objects have been removed.
    *
    * @event afterRemove
    * @param {} event An event object
    * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "composite"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage composites.
     *
     * @property label
     * @type string
     * @default "Composite"
     */

    /**
     * A flag that specifies whether the composite has been modified during the current step.
     * This is automatically managed when bodies, constraints or composites are added or removed.
     *
     * @property isModified
     * @type boolean
     * @default false
     */

    /**
     * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
     *
     * @property parent
     * @type composite
     * @default null
     */

    /**
     * An array of `Body` that are _direct_ children of this composite.
     * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
     *
     * @property bodies
     * @type body[]
     * @default []
     */

    /**
     * An array of `Constraint` that are _direct_ children of this composite.
     * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
     *
     * @property constraints
     * @type constraint[]
     * @default []
     */

    /**
     * An array of `Composite` that are _direct_ children of this composite.
     * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
     *
     * @property composites
     * @type composite[]
     * @default []
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * An object used for storing cached results for performance reasons.
     * This is used internally only and is automatically managed.
     *
     * @private
     * @property cache
     * @type {}
     */

})();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
*
* @class Sleeping
*/

var Sleeping = {};

module.exports = Sleeping;

var Body = __webpack_require__(4);
var Events = __webpack_require__(5);
var Common = __webpack_require__(0);

(function() {

    Sleeping._motionWakeThreshold = 0.18;
    Sleeping._motionSleepThreshold = 0.08;
    Sleeping._minBias = 0.9;

    /**
     * Puts bodies to sleep or wakes them up depending on their motion.
     * @method update
     * @param {body[]} bodies
     * @param {number} delta
     */
    Sleeping.update = function(bodies, delta) {
        var timeScale = delta / Common._baseDelta,
            motionSleepThreshold = Sleeping._motionSleepThreshold;

        // update bodies sleeping status
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                speed = Body.getSpeed(body),
                angularSpeed = Body.getAngularSpeed(body),
                motion = speed * speed + angularSpeed * angularSpeed;

            // wake up bodies if they have a force applied
            if (body.force.x !== 0 || body.force.y !== 0) {
                Sleeping.set(body, false);
                continue;
            }

            var minMotion = Math.min(body.motion, motion),
                maxMotion = Math.max(body.motion, motion);

            // biased average motion estimation between frames
            body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;

            if (body.sleepThreshold > 0 && body.motion < motionSleepThreshold) {
                body.sleepCounter += 1;

                if (body.sleepCounter >= body.sleepThreshold / timeScale) {
                    Sleeping.set(body, true);
                }
            } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
            }
        }
    };

    /**
     * Given a set of colliding pairs, wakes the sleeping bodies involved.
     * @method afterCollisions
     * @param {pair[]} pairs
     */
    Sleeping.afterCollisions = function(pairs) {
        var motionSleepThreshold = Sleeping._motionSleepThreshold;

        // wake up bodies involved in collisions
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];

            // don't wake inactive pairs
            if (!pair.isActive)
                continue;

            var collision = pair.collision,
                bodyA = collision.bodyA.parent, 
                bodyB = collision.bodyB.parent;

            // don't wake if at least one body is static
            if ((bodyA.isSleeping && bodyB.isSleeping) || bodyA.isStatic || bodyB.isStatic)
                continue;

            if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody = (bodyA.isSleeping && !bodyA.isStatic) ? bodyA : bodyB,
                    movingBody = sleepingBody === bodyA ? bodyB : bodyA;

                if (!sleepingBody.isStatic && movingBody.motion > motionSleepThreshold) {
                    Sleeping.set(sleepingBody, false);
                }
            }
        }
    };

    /**
     * Set a body as sleeping or awake.
     * @method set
     * @param {body} body
     * @param {boolean} isSleeping
     */
    Sleeping.set = function(body, isSleeping) {
        var wasSleeping = body.isSleeping;

        if (isSleeping) {
            body.isSleeping = true;
            body.sleepCounter = body.sleepThreshold;

            body.positionImpulse.x = 0;
            body.positionImpulse.y = 0;

            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;

            body.anglePrev = body.angle;
            body.speed = 0;
            body.angularSpeed = 0;
            body.motion = 0;

            if (!wasSleeping) {
                Events.trigger(body, 'sleepStart');
            }
        } else {
            body.isSleeping = false;
            body.sleepCounter = 0;

            if (wasSleeping) {
                Events.trigger(body, 'sleepEnd');
            }
        }
    };

})();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Collision` module contains methods for detecting collisions between a given pair of bodies.
*
* For efficient detection between a list of bodies, see `Matter.Detector` and `Matter.Query`.
*
* See `Matter.Engine` for collision events.
*
* @class Collision
*/

var Collision = {};

module.exports = Collision;

var Vertices = __webpack_require__(3);
var Pair = __webpack_require__(9);

(function() {
    var _supports = [];

    var _overlapAB = {
        overlap: 0,
        axis: null
    };

    var _overlapBA = {
        overlap: 0,
        axis: null
    };

    /**
     * Creates a new collision record.
     * @method create
     * @param {body} bodyA The first body part represented by the collision record
     * @param {body} bodyB The second body part represented by the collision record
     * @return {collision} A new collision record
     */
    Collision.create = function(bodyA, bodyB) {
        return { 
            pair: null,
            collided: false,
            bodyA: bodyA,
            bodyB: bodyB,
            parentA: bodyA.parent,
            parentB: bodyB.parent,
            depth: 0,
            normal: { x: 0, y: 0 },
            tangent: { x: 0, y: 0 },
            penetration: { x: 0, y: 0 },
            supports: []
        };
    };

    /**
     * Detect collision between two bodies.
     * @method collides
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {pairs} [pairs] Optionally reuse collision records from existing pairs.
     * @return {collision|null} A collision record if detected, otherwise null
     */
    Collision.collides = function(bodyA, bodyB, pairs) {
        Collision._overlapAxes(_overlapAB, bodyA.vertices, bodyB.vertices, bodyA.axes);

        if (_overlapAB.overlap <= 0) {
            return null;
        }

        Collision._overlapAxes(_overlapBA, bodyB.vertices, bodyA.vertices, bodyB.axes);

        if (_overlapBA.overlap <= 0) {
            return null;
        }

        // reuse collision records for gc efficiency
        var pair = pairs && pairs.table[Pair.id(bodyA, bodyB)],
            collision;

        if (!pair) {
            collision = Collision.create(bodyA, bodyB);
            collision.collided = true;
            collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
            collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
            collision.parentA = collision.bodyA.parent;
            collision.parentB = collision.bodyB.parent;
        } else {
            collision = pair.collision;
        }

        bodyA = collision.bodyA;
        bodyB = collision.bodyB;

        var minOverlap;

        if (_overlapAB.overlap < _overlapBA.overlap) {
            minOverlap = _overlapAB;
        } else {
            minOverlap = _overlapBA;
        }

        var normal = collision.normal,
            supports = collision.supports,
            minAxis = minOverlap.axis,
            minAxisX = minAxis.x,
            minAxisY = minAxis.y;

        // ensure normal is facing away from bodyA
        if (minAxisX * (bodyB.position.x - bodyA.position.x) + minAxisY * (bodyB.position.y - bodyA.position.y) < 0) {
            normal.x = minAxisX;
            normal.y = minAxisY;
        } else {
            normal.x = -minAxisX;
            normal.y = -minAxisY;
        }

        collision.tangent.x = -normal.y;
        collision.tangent.y = normal.x;

        collision.depth = minOverlap.overlap;

        collision.penetration.x = normal.x * collision.depth;
        collision.penetration.y = normal.y * collision.depth;

        // find support points, there is always either exactly one or two
        var supportsB = Collision._findSupports(bodyA, bodyB, normal, 1),
            supportCount = 0;

        // find the supports from bodyB that are inside bodyA
        if (Vertices.contains(bodyA.vertices, supportsB[0])) {
            supports[supportCount++] = supportsB[0];
        }

        if (Vertices.contains(bodyA.vertices, supportsB[1])) {
            supports[supportCount++] = supportsB[1];
        }

        // find the supports from bodyA that are inside bodyB
        if (supportCount < 2) {
            var supportsA = Collision._findSupports(bodyB, bodyA, normal, -1);

            if (Vertices.contains(bodyB.vertices, supportsA[0])) {
                supports[supportCount++] = supportsA[0];
            }

            if (supportCount < 2 && Vertices.contains(bodyB.vertices, supportsA[1])) {
                supports[supportCount++] = supportsA[1];
            }
        }

        // account for the edge case of overlapping but no vertex containment
        if (supportCount === 0) {
            supports[supportCount++] = supportsB[0];
        }

        // update supports array size
        supports.length = supportCount;

        return collision;
    };

    /**
     * Find the overlap between two sets of vertices.
     * @method _overlapAxes
     * @private
     * @param {object} result
     * @param {vertices} verticesA
     * @param {vertices} verticesB
     * @param {axes} axes
     */
    Collision._overlapAxes = function(result, verticesA, verticesB, axes) {
        var verticesALength = verticesA.length,
            verticesBLength = verticesB.length,
            verticesAX = verticesA[0].x,
            verticesAY = verticesA[0].y,
            verticesBX = verticesB[0].x,
            verticesBY = verticesB[0].y,
            axesLength = axes.length,
            overlapMin = Number.MAX_VALUE,
            overlapAxisNumber = 0,
            overlap,
            overlapAB,
            overlapBA,
            dot,
            i,
            j;

        for (i = 0; i < axesLength; i++) {
            var axis = axes[i],
                axisX = axis.x,
                axisY = axis.y,
                minA = verticesAX * axisX + verticesAY * axisY,
                minB = verticesBX * axisX + verticesBY * axisY,
                maxA = minA,
                maxB = minB;

            for (j = 1; j < verticesALength; j += 1) {
                dot = verticesA[j].x * axisX + verticesA[j].y * axisY;

                if (dot > maxA) { 
                    maxA = dot;
                } else if (dot < minA) { 
                    minA = dot;
                }
            }

            for (j = 1; j < verticesBLength; j += 1) {
                dot = verticesB[j].x * axisX + verticesB[j].y * axisY;

                if (dot > maxB) { 
                    maxB = dot;
                } else if (dot < minB) { 
                    minB = dot;
                }
            }

            overlapAB = maxA - minB;
            overlapBA = maxB - minA;
            overlap = overlapAB < overlapBA ? overlapAB : overlapBA;

            if (overlap < overlapMin) {
                overlapMin = overlap;
                overlapAxisNumber = i;

                if (overlap <= 0) {
                    // can not be intersecting
                    break;
                }
            } 
        }

        result.axis = axes[overlapAxisNumber];
        result.overlap = overlapMin;
    };

    /**
     * Projects vertices on an axis and returns an interval.
     * @method _projectToAxis
     * @private
     * @param {} projection
     * @param {} vertices
     * @param {} axis
     */
    Collision._projectToAxis = function(projection, vertices, axis) {
        var min = vertices[0].x * axis.x + vertices[0].y * axis.y,
            max = min;

        for (var i = 1; i < vertices.length; i += 1) {
            var dot = vertices[i].x * axis.x + vertices[i].y * axis.y;

            if (dot > max) { 
                max = dot; 
            } else if (dot < min) { 
                min = dot; 
            }
        }

        projection.min = min;
        projection.max = max;
    };

    /**
     * Finds supporting vertices given two bodies along a given direction using hill-climbing.
     * @method _findSupports
     * @private
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {vector} normal
     * @param {number} direction
     * @return [vector]
     */
    Collision._findSupports = function(bodyA, bodyB, normal, direction) {
        var vertices = bodyB.vertices,
            verticesLength = vertices.length,
            bodyAPositionX = bodyA.position.x,
            bodyAPositionY = bodyA.position.y,
            normalX = normal.x * direction,
            normalY = normal.y * direction,
            nearestDistance = Number.MAX_VALUE,
            vertexA,
            vertexB,
            vertexC,
            distance,
            j;

        // find deepest vertex relative to the axis
        for (j = 0; j < verticesLength; j += 1) {
            vertexB = vertices[j];
            distance = normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y);

            // convex hill-climbing
            if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertexB;
            }
        }

        // measure next vertex
        vertexC = vertices[(verticesLength + vertexA.index - 1) % verticesLength];
        nearestDistance = normalX * (bodyAPositionX - vertexC.x) + normalY * (bodyAPositionY - vertexC.y);

        // compare with previous vertex
        vertexB = vertices[(vertexA.index + 1) % verticesLength];
        if (normalX * (bodyAPositionX - vertexB.x) + normalY * (bodyAPositionY - vertexB.y) < nearestDistance) {
            _supports[0] = vertexA;
            _supports[1] = vertexB;

            return _supports;
        }

        _supports[0] = vertexA;
        _supports[1] = vertexC;

        return _supports;
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A reference to the pair using this collision record, if there is one.
     *
     * @property pair
     * @type {pair|null}
     * @default null
     */

    /**
     * A flag that indicates if the bodies were colliding when the collision was last updated.
     * 
     * @property collided
     * @type boolean
     * @default false
     */

    /**
     * The first body part represented by the collision (see also `collision.parentA`).
     * 
     * @property bodyA
     * @type body
     */

    /**
     * The second body part represented by the collision (see also `collision.parentB`).
     * 
     * @property bodyB
     * @type body
     */

    /**
     * The first body represented by the collision (i.e. `collision.bodyA.parent`).
     * 
     * @property parentA
     * @type body
     */

    /**
     * The second body represented by the collision (i.e. `collision.bodyB.parent`).
     * 
     * @property parentB
     * @type body
     */

    /**
     * A `Number` that represents the minimum separating distance between the bodies along the collision normal.
     *
     * @readOnly
     * @property depth
     * @type number
     * @default 0
     */

    /**
     * A normalised `Vector` that represents the direction between the bodies that provides the minimum separating distance.
     *
     * @property normal
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A normalised `Vector` that is the tangent direction to the collision normal.
     *
     * @property tangent
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that represents the direction and depth of the collision.
     *
     * @property penetration
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * An array of body vertices that represent the support points in the collision.
     * These are the deepest vertices (along the collision normal) of each body that are contained by the other body's vertices.
     *
     * @property supports
     * @type vector[]
     * @default []
     */

})();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
*
* @class Pair
*/

var Pair = {};

module.exports = Pair;

var Contact = __webpack_require__(16);

(function() {

    /**
     * Creates a pair.
     * @method create
     * @param {collision} collision
     * @param {number} timestamp
     * @return {pair} A new pair
     */
    Pair.create = function(collision, timestamp) {
        var bodyA = collision.bodyA,
            bodyB = collision.bodyB;

        var pair = {
            id: Pair.id(bodyA, bodyB),
            bodyA: bodyA,
            bodyB: bodyB,
            collision: collision,
            contacts: [],
            activeContacts: [],
            separation: 0,
            isActive: true,
            confirmedActive: true,
            isSensor: bodyA.isSensor || bodyB.isSensor,
            timeCreated: timestamp,
            timeUpdated: timestamp,
            inverseMass: 0,
            friction: 0,
            frictionStatic: 0,
            restitution: 0,
            slop: 0
        };

        Pair.update(pair, collision, timestamp);

        return pair;
    };

    /**
     * Updates a pair given a collision.
     * @method update
     * @param {pair} pair
     * @param {collision} collision
     * @param {number} timestamp
     */
    Pair.update = function(pair, collision, timestamp) {
        var contacts = pair.contacts,
            supports = collision.supports,
            activeContacts = pair.activeContacts,
            parentA = collision.parentA,
            parentB = collision.parentB,
            parentAVerticesLength = parentA.vertices.length;

        pair.isActive = true;
        pair.timeUpdated = timestamp;
        pair.collision = collision;
        pair.separation = collision.depth;
        pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
        pair.friction = parentA.friction < parentB.friction ? parentA.friction : parentB.friction;
        pair.frictionStatic = parentA.frictionStatic > parentB.frictionStatic ? parentA.frictionStatic : parentB.frictionStatic;
        pair.restitution = parentA.restitution > parentB.restitution ? parentA.restitution : parentB.restitution;
        pair.slop = parentA.slop > parentB.slop ? parentA.slop : parentB.slop;

        collision.pair = pair;
        activeContacts.length = 0;

        for (var i = 0; i < supports.length; i++) {
            var support = supports[i],
                contactId = support.body === parentA ? support.index : parentAVerticesLength + support.index,
                contact = contacts[contactId];

            if (contact) {
                activeContacts.push(contact);
            } else {
                activeContacts.push(contacts[contactId] = Contact.create(support));
            }
        }
    };

    /**
     * Set a pair as active or inactive.
     * @method setActive
     * @param {pair} pair
     * @param {bool} isActive
     * @param {number} timestamp
     */
    Pair.setActive = function(pair, isActive, timestamp) {
        if (isActive) {
            pair.isActive = true;
            pair.timeUpdated = timestamp;
        } else {
            pair.isActive = false;
            pair.activeContacts.length = 0;
        }
    };

    /**
     * Get the id for the given pair.
     * @method id
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {string} Unique pairId
     */
    Pair.id = function(bodyA, bodyB) {
        if (bodyA.id < bodyB.id) {
            return 'A' + bodyA.id + 'B' + bodyB.id;
        } else {
            return 'A' + bodyB.id + 'B' + bodyA.id;
        }
    };

})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Constraint` module contains methods for creating and manipulating constraints.
* Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
* The stiffness of constraints can be modified to create springs or elastic.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Constraint
*/

var Constraint = {};

module.exports = Constraint;

var Vertices = __webpack_require__(3);
var Vector = __webpack_require__(2);
var Sleeping = __webpack_require__(7);
var Bounds = __webpack_require__(1);
var Axes = __webpack_require__(11);
var Common = __webpack_require__(0);

(function() {

    Constraint._warming = 0.4;
    Constraint._torqueDampen = 1;
    Constraint._minLength = 0.000001;

    /**
     * Creates a new constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * To simulate a revolute constraint (or pin joint) set `length: 0` and a high `stiffness` value (e.g. `0.7` or above).
     * If the constraint is unstable, try lowering the `stiffness` value and / or increasing `engine.constraintIterations`.
     * For compound bodies, constraints must be applied to the parent body (not one of its parts).
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {constraint} constraint
     */
    Constraint.create = function(options) {
        var constraint = options;

        // if bodies defined but no points, use body centre
        if (constraint.bodyA && !constraint.pointA)
            constraint.pointA = { x: 0, y: 0 };
        if (constraint.bodyB && !constraint.pointB)
            constraint.pointB = { x: 0, y: 0 };

        // calculate static length using initial world space points
        var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA,
            initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB,
            length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));

        constraint.length = typeof constraint.length !== 'undefined' ? constraint.length : length;

        // option defaults
        constraint.id = constraint.id || Common.nextId();
        constraint.label = constraint.label || 'Constraint';
        constraint.type = 'constraint';
        constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
        constraint.damping = constraint.damping || 0;
        constraint.angularStiffness = constraint.angularStiffness || 0;
        constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
        constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
        constraint.plugin = {};

        // render
        var render = {
            visible: true,
            lineWidth: 2,
            strokeStyle: '#ffffff',
            type: 'line',
            anchors: true
        };

        if (constraint.length === 0 && constraint.stiffness > 0.1) {
            render.type = 'pin';
            render.anchors = false;
        } else if (constraint.stiffness < 0.9) {
            render.type = 'spring';
        }

        constraint.render = Common.extend(render, constraint.render);

        return constraint;
    };

    /**
     * Prepares for solving by constraint warming.
     * @private
     * @method preSolveAll
     * @param {body[]} bodies
     */
    Constraint.preSolveAll = function(bodies) {
        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
                continue;
            }

            body.position.x += impulse.x;
            body.position.y += impulse.y;
            body.angle += impulse.angle;
        }
    };

    /**
     * Solves all constraints in a list of collisions.
     * @private
     * @method solveAll
     * @param {constraint[]} constraints
     * @param {number} delta
     */
    Constraint.solveAll = function(constraints, delta) {
        var timeScale = Common.clamp(delta / Common._baseDelta, 0, 1);

        // Solve fixed constraints first.
        for (var i = 0; i < constraints.length; i += 1) {
            var constraint = constraints[i],
                fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic),
                fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);

            if (fixedA || fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }

        // Solve free constraints last.
        for (i = 0; i < constraints.length; i += 1) {
            constraint = constraints[i];
            fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic);
            fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);

            if (!fixedA && !fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }
    };

    /**
     * Solves a distance constraint with Gauss-Siedel method.
     * @private
     * @method solve
     * @param {constraint} constraint
     * @param {number} timeScale
     */
    Constraint.solve = function(constraint, timeScale) {
        var bodyA = constraint.bodyA,
            bodyB = constraint.bodyB,
            pointA = constraint.pointA,
            pointB = constraint.pointB;

        if (!bodyA && !bodyB)
            return;

        // update reference angle
        if (bodyA && !bodyA.isStatic) {
            Vector.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
            constraint.angleA = bodyA.angle;
        }

        // update reference angle
        if (bodyB && !bodyB.isStatic) {
            Vector.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
            constraint.angleB = bodyB.angle;
        }

        var pointAWorld = pointA,
            pointBWorld = pointB;

        if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
        if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);

        if (!pointAWorld || !pointBWorld)
            return;

        var delta = Vector.sub(pointAWorld, pointBWorld),
            currentLength = Vector.magnitude(delta);

        // prevent singularity
        if (currentLength < Constraint._minLength) {
            currentLength = Constraint._minLength;
        }

        // solve distance constraint with Gauss-Siedel method
        var difference = (currentLength - constraint.length) / currentLength,
            isRigid = constraint.stiffness >= 1 || constraint.length === 0,
            stiffness = isRigid ? constraint.stiffness * timeScale 
                : constraint.stiffness * timeScale * timeScale,
            damping = constraint.damping * timeScale,
            force = Vector.mult(delta, difference * stiffness),
            massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0),
            inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0),
            resistanceTotal = massTotal + inertiaTotal,
            torque,
            share,
            normal,
            normalVelocity,
            relativeVelocity;

        if (damping > 0) {
            var zero = Vector.create();
            normal = Vector.div(delta, currentLength);

            relativeVelocity = Vector.sub(
                bodyB && Vector.sub(bodyB.position, bodyB.positionPrev) || zero,
                bodyA && Vector.sub(bodyA.position, bodyA.positionPrev) || zero
            );

            normalVelocity = Vector.dot(normal, relativeVelocity);
        }

        if (bodyA && !bodyA.isStatic) {
            share = bodyA.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyA.constraintImpulse.x -= force.x * share;
            bodyA.constraintImpulse.y -= force.y * share;

            // apply forces
            bodyA.position.x -= force.x * share;
            bodyA.position.y -= force.y * share;

            // apply damping
            if (damping > 0) {
                bodyA.positionPrev.x -= damping * normal.x * normalVelocity * share;
                bodyA.positionPrev.y -= damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque = (Vector.cross(pointA, force) / resistanceTotal) * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
            bodyA.constraintImpulse.angle -= torque;
            bodyA.angle -= torque;
        }

        if (bodyB && !bodyB.isStatic) {
            share = bodyB.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyB.constraintImpulse.x += force.x * share;
            bodyB.constraintImpulse.y += force.y * share;

            // apply forces
            bodyB.position.x += force.x * share;
            bodyB.position.y += force.y * share;

            // apply damping
            if (damping > 0) {
                bodyB.positionPrev.x += damping * normal.x * normalVelocity * share;
                bodyB.positionPrev.y += damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque = (Vector.cross(pointB, force) / resistanceTotal) * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
            bodyB.constraintImpulse.angle += torque;
            bodyB.angle += torque;
        }

    };

    /**
     * Performs body updates required after solving constraints.
     * @private
     * @method postSolveAll
     * @param {body[]} bodies
     */
    Constraint.postSolveAll = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
                continue;
            }

            Sleeping.set(body, false);

            // update geometry and reset
            for (var j = 0; j < body.parts.length; j++) {
                var part = body.parts[j];

                Vertices.translate(part.vertices, impulse);

                if (j > 0) {
                    part.position.x += impulse.x;
                    part.position.y += impulse.y;
                }

                if (impulse.angle !== 0) {
                    Vertices.rotate(part.vertices, impulse.angle, body.position);
                    Axes.rotate(part.axes, impulse.angle);
                    if (j > 0) {
                        Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
                    }
                }

                Bounds.update(part.bounds, part.vertices, body.velocity);
            }

            // dampen the cached impulse for warming next step
            impulse.angle *= Constraint._warming;
            impulse.x *= Constraint._warming;
            impulse.y *= Constraint._warming;
        }
    };

    /**
     * Returns the world-space position of `constraint.pointA`, accounting for `constraint.bodyA`.
     * @method pointAWorld
     * @param {constraint} constraint
     * @returns {vector} the world-space position
     */
    Constraint.pointAWorld = function(constraint) {
        return {
            x: (constraint.bodyA ? constraint.bodyA.position.x : 0) 
                + (constraint.pointA ? constraint.pointA.x : 0),
            y: (constraint.bodyA ? constraint.bodyA.position.y : 0) 
                + (constraint.pointA ? constraint.pointA.y : 0)
        };
    };

    /**
     * Returns the world-space position of `constraint.pointB`, accounting for `constraint.bodyB`.
     * @method pointBWorld
     * @param {constraint} constraint
     * @returns {vector} the world-space position
     */
    Constraint.pointBWorld = function(constraint) {
        return {
            x: (constraint.bodyB ? constraint.bodyB.position.x : 0) 
                + (constraint.pointB ? constraint.pointB.x : 0),
            y: (constraint.bodyB ? constraint.bodyB.position.y : 0) 
                + (constraint.pointB ? constraint.pointB.y : 0)
        };
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Constraint"
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the constraint should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * A `Number` that defines the line width to use when rendering the constraint outline.
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 2
     */

    /**
     * A `String` that defines the stroke style to use when rendering the constraint outline.
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the constraint rendering type. 
     * The possible values are 'line', 'pin', 'spring'.
     * An appropriate render type will be automatically chosen unless one is given in options.
     *
     * @property render.type
     * @type string
     * @default 'line'
     */

    /**
     * A `Boolean` that defines if the constraint's anchor points should be rendered.
     *
     * @property render.anchors
     * @type boolean
     * @default true
     */

    /**
     * The first possible `Body` that this constraint is attached to.
     *
     * @property bodyA
     * @type body
     * @default null
     */

    /**
     * The second possible `Body` that this constraint is attached to.
     *
     * @property bodyB
     * @type body
     * @default null
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointA
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyB` if defined, otherwise a world-space position.
     *
     * @property pointB
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
     * A value of `1` means the constraint should be very stiff.
     * A value of `0.2` means the constraint acts like a soft spring.
     *
     * @property stiffness
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the damping of the constraint, 
     * i.e. the amount of resistance applied to each body based on their velocities to limit the amount of oscillation.
     * Damping will only be apparent when the constraint also has a very low `stiffness`.
     * A value of `0.1` means the constraint will apply heavy damping, resulting in little to no oscillation.
     * A value of `0` means the constraint will apply no damping.
     *
     * @property damping
     * @type number
     * @default 0
     */

    /**
     * A `Number` that specifies the target resting length of the constraint. 
     * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
     *
     * @property length
     * @type number
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

})();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Axes` module contains methods for creating and manipulating sets of axes.
*
* @class Axes
*/

var Axes = {};

module.exports = Axes;

var Vector = __webpack_require__(2);
var Common = __webpack_require__(0);

(function() {

    /**
     * Creates a new set of axes from the given vertices.
     * @method fromVertices
     * @param {vertices} vertices
     * @return {axes} A new axes from the given vertices
     */
    Axes.fromVertices = function(vertices) {
        var axes = {};

        // find the unique axes, using edge normal gradients
        for (var i = 0; i < vertices.length; i++) {
            var j = (i + 1) % vertices.length, 
                normal = Vector.normalise({ 
                    x: vertices[j].y - vertices[i].y, 
                    y: vertices[i].x - vertices[j].x
                }),
                gradient = (normal.y === 0) ? Infinity : (normal.x / normal.y);

            // limit precision
            gradient = gradient.toFixed(3).toString();
            axes[gradient] = normal;
        }

        return Common.values(axes);
    };

    /**
     * Rotates a set of axes by the given angle.
     * @method rotate
     * @param {axes} axes
     * @param {number} angle
     */
    Axes.rotate = function(axes, angle) {
        if (angle === 0)
            return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i],
                xx;
            xx = axis.x * cos - axis.y * sin;
            axis.y = axis.x * sin + axis.y * cos;
            axis.x = xx;
        }
    };

})();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Bodies` module contains factory methods for creating rigid body models 
* with commonly used body configurations (such as rectangles, circles and other polygons).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Bodies
*/

// TODO: true circle bodies

var Bodies = {};

module.exports = Bodies;

var Vertices = __webpack_require__(3);
var Common = __webpack_require__(0);
var Body = __webpack_require__(4);
var Bounds = __webpack_require__(1);
var Vector = __webpack_require__(2);

(function() {

    /**
     * Creates a new rigid body model with a rectangle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method rectangle
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {object} [options]
     * @return {body} A new rectangle body
     */
    Bodies.rectangle = function(x, y, width, height, options) {
        options = options || {};

        var rectangle = { 
            label: 'Rectangle Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath('L 0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            rectangle.vertices = Vertices.chamfer(rectangle.vertices, chamfer.radius, 
                chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, rectangle, options));
    };

    /**
     * Creates a new rigid body model with a trapezoid hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method trapezoid
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} slope
     * @param {object} [options]
     * @return {body} A new trapezoid body
     */
    Bodies.trapezoid = function(x, y, width, height, slope, options) {
        options = options || {};

        slope *= 0.5;
        var roof = (1 - (slope * 2)) * width;

        var x1 = width * slope,
            x2 = x1 + roof,
            x3 = x2 + x1,
            verticesPath;

        if (slope < 0.5) {
            verticesPath = 'L 0 0 L ' + x1 + ' ' + (-height) + ' L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
        } else {
            verticesPath = 'L 0 0 L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
        }

        var trapezoid = { 
            label: 'Trapezoid Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath(verticesPath)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            trapezoid.vertices = Vertices.chamfer(trapezoid.vertices, chamfer.radius, 
                chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, trapezoid, options));
    };

    /**
     * Creates a new rigid body model with a circle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method circle
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {object} [options]
     * @param {number} [maxSides]
     * @return {body} A new circle body
     */
    Bodies.circle = function(x, y, radius, options, maxSides) {
        options = options || {};

        var circle = {
            label: 'Circle Body',
            circleRadius: radius
        };

        // approximate circles with polygons until true circles implemented in SAT
        maxSides = maxSides || 25;
        var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));

        // optimisation: always use even number of sides (half the number of unique axes)
        if (sides % 2 === 1)
            sides += 1;

        return Bodies.polygon(x, y, sides, radius, Common.extend({}, circle, options));
    };

    /**
     * Creates a new rigid body model with a regular polygon hull with the given number of sides. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method polygon
     * @param {number} x
     * @param {number} y
     * @param {number} sides
     * @param {number} radius
     * @param {object} [options]
     * @return {body} A new regular polygon body
     */
    Bodies.polygon = function(x, y, sides, radius, options) {
        options = options || {};

        if (sides < 3)
            return Bodies.circle(x, y, radius, options);

        var theta = 2 * Math.PI / sides,
            path = '',
            offset = theta * 0.5;

        for (var i = 0; i < sides; i += 1) {
            var angle = offset + (i * theta),
                xx = Math.cos(angle) * radius,
                yy = Math.sin(angle) * radius;

            path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
        }

        var polygon = { 
            label: 'Polygon Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath(path)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            polygon.vertices = Vertices.chamfer(polygon.vertices, chamfer.radius, 
                chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, polygon, options));
    };

    /**
     * Utility to create a compound body based on set(s) of vertices.
     * 
     * _Note:_ To optionally enable automatic concave vertices decomposition the [poly-decomp](https://github.com/schteppe/poly-decomp.js) 
     * package must be first installed and provided see `Common.setDecomp`, otherwise the convex hull of each vertex set will be used.
     * 
     * The resulting vertices are reorientated about their centre of mass,
     * and offset such that `body.position` corresponds to this point.
     * 
     * The resulting offset may be found if needed by subtracting `body.bounds` from the original input bounds.
     * To later move the centre of mass see `Body.setCentre`.
     * 
     * Note that automatic conconcave decomposition results are not always optimal. 
     * For best results, simplify the input vertices as much as possible first.
     * By default this function applies some addtional simplification to help.
     * 
     * Some outputs may also require further manual processing afterwards to be robust.
     * In particular some parts may need to be overlapped to avoid collision gaps.
     * Thin parts and sharp points should be avoided or removed where possible.
     *
     * The options parameter object specifies any `Matter.Body` properties you wish to override the defaults.
     * 
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method fromVertices
     * @param {number} x
     * @param {number} y
     * @param {array} vertexSets One or more arrays of vertex points e.g. `[[{ x: 0, y: 0 }...], ...]`.
     * @param {object} [options] The body options.
     * @param {bool} [flagInternal=false] Optionally marks internal edges with `isInternal`.
     * @param {number} [removeCollinear=0.01] Threshold when simplifying vertices along the same edge.
     * @param {number} [minimumArea=10] Threshold when removing small parts.
     * @param {number} [removeDuplicatePoints=0.01] Threshold when simplifying nearby vertices.
     * @return {body}
     */
    Bodies.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea, removeDuplicatePoints) {
        var decomp = Common.getDecomp(),
            canDecomp,
            body,
            parts,
            isConvex,
            isConcave,
            vertices,
            i,
            j,
            k,
            v,
            z;

        // check decomp is as expected
        canDecomp = Boolean(decomp && decomp.quickDecomp);

        options = options || {};
        parts = [];

        flagInternal = typeof flagInternal !== 'undefined' ? flagInternal : false;
        removeCollinear = typeof removeCollinear !== 'undefined' ? removeCollinear : 0.01;
        minimumArea = typeof minimumArea !== 'undefined' ? minimumArea : 10;
        removeDuplicatePoints = typeof removeDuplicatePoints !== 'undefined' ? removeDuplicatePoints : 0.01;

        // ensure vertexSets is an array of arrays
        if (!Common.isArray(vertexSets[0])) {
            vertexSets = [vertexSets];
        }

        for (v = 0; v < vertexSets.length; v += 1) {
            vertices = vertexSets[v];
            isConvex = Vertices.isConvex(vertices);
            isConcave = !isConvex;

            if (isConcave && !canDecomp) {
                Common.warnOnce(
                    'Bodies.fromVertices: Install the \'poly-decomp\' library and use Common.setDecomp or provide \'decomp\' as a global to decompose concave vertices.'
                );
            }

            if (isConvex || !canDecomp) {
                if (isConvex) {
                    vertices = Vertices.clockwiseSort(vertices);
                } else {
                    // fallback to convex hull when decomposition is not possible
                    vertices = Vertices.hull(vertices);
                }

                parts.push({
                    position: { x: x, y: y },
                    vertices: vertices
                });
            } else {
                // initialise a decomposition
                var concave = vertices.map(function(vertex) {
                    return [vertex.x, vertex.y];
                });

                // vertices are concave and simple, we can decompose into parts
                decomp.makeCCW(concave);
                if (removeCollinear !== false)
                    decomp.removeCollinearPoints(concave, removeCollinear);
                if (removeDuplicatePoints !== false && decomp.removeDuplicatePoints)
                    decomp.removeDuplicatePoints(concave, removeDuplicatePoints);

                // use the quick decomposition algorithm (Bayazit)
                var decomposed = decomp.quickDecomp(concave);

                // for each decomposed chunk
                for (i = 0; i < decomposed.length; i++) {
                    var chunk = decomposed[i];

                    // convert vertices into the correct structure
                    var chunkVertices = chunk.map(function(vertices) {
                        return {
                            x: vertices[0],
                            y: vertices[1]
                        };
                    });

                    // skip small chunks
                    if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                        continue;

                    // create a compound part
                    parts.push({
                        position: Vertices.centre(chunkVertices),
                        vertices: chunkVertices
                    });
                }
            }
        }

        // create body parts
        for (i = 0; i < parts.length; i++) {
            parts[i] = Body.create(Common.extend(parts[i], options));
        }

        // flag internal edges (coincident part edges)
        if (flagInternal) {
            var coincident_max_dist = 5;

            for (i = 0; i < parts.length; i++) {
                var partA = parts[i];

                for (j = i + 1; j < parts.length; j++) {
                    var partB = parts[j];

                    if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                        var pav = partA.vertices,
                            pbv = partB.vertices;

                        // iterate vertices of both parts
                        for (k = 0; k < partA.vertices.length; k++) {
                            for (z = 0; z < partB.vertices.length; z++) {
                                // find distances between the vertices
                                var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])),
                                    db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));

                                // if both vertices are very close, consider the edge concident (internal)
                                if (da < coincident_max_dist && db < coincident_max_dist) {
                                    pav[k].isInternal = true;
                                    pbv[z].isInternal = true;
                                }
                            }
                        }

                    }
                }
            }
        }

        if (parts.length > 1) {
            // create the parent body to be returned, that contains generated compound parts
            body = Body.create(Common.extend({ parts: parts.slice(0) }, options));

            // offset such that body.position is at the centre off mass
            Body.setPosition(body, { x: x, y: y });

            return body;
        } else {
            return parts[0];
        }
    };

})();


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Detector` module contains methods for efficiently detecting collisions between a list of bodies using a broadphase algorithm.
*
* @class Detector
*/

var Detector = {};

module.exports = Detector;

var Common = __webpack_require__(0);
var Collision = __webpack_require__(8);

(function() {

    /**
     * Creates a new collision detector.
     * @method create
     * @param {} options
     * @return {detector} A new collision detector
     */
    Detector.create = function(options) {
        var defaults = {
            bodies: [],
            pairs: null
        };

        return Common.extend(defaults, options);
    };

    /**
     * Sets the list of bodies in the detector.
     * @method setBodies
     * @param {detector} detector
     * @param {body[]} bodies
     */
    Detector.setBodies = function(detector, bodies) {
        detector.bodies = bodies.slice(0);
    };

    /**
     * Clears the detector including its list of bodies.
     * @method clear
     * @param {detector} detector
     */
    Detector.clear = function(detector) {
        detector.bodies = [];
    };

    /**
     * Efficiently finds all collisions among all the bodies in `detector.bodies` using a broadphase algorithm.
     * 
     * _Note:_ The specific ordering of collisions returned is not guaranteed between releases and may change for performance reasons.
     * If a specific ordering is required then apply a sort to the resulting array.
     * @method collisions
     * @param {detector} detector
     * @return {collision[]} collisions
     */
    Detector.collisions = function(detector) {
        var collisions = [],
            pairs = detector.pairs,
            bodies = detector.bodies,
            bodiesLength = bodies.length,
            canCollide = Detector.canCollide,
            collides = Collision.collides,
            i,
            j;

        bodies.sort(Detector._compareBoundsX);

        for (i = 0; i < bodiesLength; i++) {
            var bodyA = bodies[i],
                boundsA = bodyA.bounds,
                boundXMax = bodyA.bounds.max.x,
                boundYMax = bodyA.bounds.max.y,
                boundYMin = bodyA.bounds.min.y,
                bodyAStatic = bodyA.isStatic || bodyA.isSleeping,
                partsALength = bodyA.parts.length,
                partsASingle = partsALength === 1;

            for (j = i + 1; j < bodiesLength; j++) {
                var bodyB = bodies[j],
                    boundsB = bodyB.bounds;

                if (boundsB.min.x > boundXMax) {
                    break;
                }

                if (boundYMax < boundsB.min.y || boundYMin > boundsB.max.y) {
                    continue;
                }

                if (bodyAStatic && (bodyB.isStatic || bodyB.isSleeping)) {
                    continue;
                }

                if (!canCollide(bodyA.collisionFilter, bodyB.collisionFilter)) {
                    continue;
                }

                var partsBLength = bodyB.parts.length;

                if (partsASingle && partsBLength === 1) {
                    var collision = collides(bodyA, bodyB, pairs);

                    if (collision) {
                        collisions.push(collision);
                    }
                } else {
                    var partsAStart = partsALength > 1 ? 1 : 0,
                        partsBStart = partsBLength > 1 ? 1 : 0;

                    for (var k = partsAStart; k < partsALength; k++) {
                        var partA = bodyA.parts[k],
                            boundsA = partA.bounds;

                        for (var z = partsBStart; z < partsBLength; z++) {
                            var partB = bodyB.parts[z],
                                boundsB = partB.bounds;

                            if (boundsA.min.x > boundsB.max.x || boundsA.max.x < boundsB.min.x
                                || boundsA.max.y < boundsB.min.y || boundsA.min.y > boundsB.max.y) {
                                continue;
                            }

                            var collision = collides(partA, partB, pairs);

                            if (collision) {
                                collisions.push(collision);
                            }
                        }
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Returns `true` if both supplied collision filters will allow a collision to occur.
     * See `body.collisionFilter` for more information.
     * @method canCollide
     * @param {} filterA
     * @param {} filterB
     * @return {bool} `true` if collision can occur
     */
    Detector.canCollide = function(filterA, filterB) {
        if (filterA.group === filterB.group && filterA.group !== 0)
            return filterA.group > 0;

        return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
    };

    /**
     * The comparison function used in the broadphase algorithm.
     * Returns the signed delta of the bodies bounds on the x-axis.
     * @private
     * @method _sortCompare
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {number} The signed delta used for sorting
     */
    Detector._compareBoundsX = function(bodyA, bodyB) {
        return bodyA.bounds.min.x - bodyB.bounds.min.x;
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * The array of `Matter.Body` between which the detector finds collisions.
     * 
     * _Note:_ The order of bodies in this array _is not fixed_ and will be continually managed by the detector.
     * @property bodies
     * @type body[]
     * @default []
     */

    /**
     * Optional. A `Matter.Pairs` object from which previous collision objects may be reused. Intended for internal `Matter.Engine` usage.
     * @property pairs
     * @type {pairs|null}
     * @default null
     */

})();


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Mouse` module contains methods for creating and manipulating mouse inputs.
*
* @class Mouse
*/

var Mouse = {};

module.exports = Mouse;

var Common = __webpack_require__(0);

(function() {

    /**
     * Creates a mouse input.
     * @method create
     * @param {HTMLElement} element
     * @return {mouse} A new mouse
     */
    Mouse.create = function(element) {
        var mouse = {};

        if (!element) {
            Common.log('Mouse.create: element was undefined, defaulting to document.body', 'warn');
        }

        mouse.element = element || document.body;
        mouse.absolute = { x: 0, y: 0 };
        mouse.position = { x: 0, y: 0 };
        mouse.mousedownPosition = { x: 0, y: 0 };
        mouse.mouseupPosition = { x: 0, y: 0 };
        mouse.offset = { x: 0, y: 0 };
        mouse.scale = { x: 1, y: 1 };
        mouse.wheelDelta = 0;
        mouse.button = -1;
        mouse.pixelRatio = parseInt(mouse.element.getAttribute('data-pixel-ratio'), 10) || 1;

        mouse.sourceEvents = {
            mousemove: null,
            mousedown: null,
            mouseup: null,
            mousewheel: null
        };

        mouse.mousemove = function(event) { 
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                mouse.button = 0;
                event.preventDefault();
            }

            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.sourceEvents.mousemove = event;
        };

        mouse.mousedown = function(event) {
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                mouse.button = 0;
                event.preventDefault();
            } else {
                mouse.button = event.button;
            }

            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.mousedownPosition.x = mouse.position.x;
            mouse.mousedownPosition.y = mouse.position.y;
            mouse.sourceEvents.mousedown = event;
        };

        mouse.mouseup = function(event) {
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                event.preventDefault();
            }

            mouse.button = -1;
            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.mouseupPosition.x = mouse.position.x;
            mouse.mouseupPosition.y = mouse.position.y;
            mouse.sourceEvents.mouseup = event;
        };

        mouse.mousewheel = function(event) {
            mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
            event.preventDefault();
        };

        Mouse.setElement(mouse, mouse.element);

        return mouse;
    };

    /**
     * Sets the element the mouse is bound to (and relative to).
     * @method setElement
     * @param {mouse} mouse
     * @param {HTMLElement} element
     */
    Mouse.setElement = function(mouse, element) {
        mouse.element = element;

        element.addEventListener('mousemove', mouse.mousemove);
        element.addEventListener('mousedown', mouse.mousedown);
        element.addEventListener('mouseup', mouse.mouseup);

        element.addEventListener('mousewheel', mouse.mousewheel);
        element.addEventListener('DOMMouseScroll', mouse.mousewheel);

        element.addEventListener('touchmove', mouse.mousemove);
        element.addEventListener('touchstart', mouse.mousedown);
        element.addEventListener('touchend', mouse.mouseup);
    };

    /**
     * Clears all captured source events.
     * @method clearSourceEvents
     * @param {mouse} mouse
     */
    Mouse.clearSourceEvents = function(mouse) {
        mouse.sourceEvents.mousemove = null;
        mouse.sourceEvents.mousedown = null;
        mouse.sourceEvents.mouseup = null;
        mouse.sourceEvents.mousewheel = null;
        mouse.wheelDelta = 0;
    };

    /**
     * Sets the mouse position offset.
     * @method setOffset
     * @param {mouse} mouse
     * @param {vector} offset
     */
    Mouse.setOffset = function(mouse, offset) {
        mouse.offset.x = offset.x;
        mouse.offset.y = offset.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
    };

    /**
     * Sets the mouse position scale.
     * @method setScale
     * @param {mouse} mouse
     * @param {vector} scale
     */
    Mouse.setScale = function(mouse, scale) {
        mouse.scale.x = scale.x;
        mouse.scale.y = scale.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
    };

    /**
     * Gets the mouse position relative to an element given a screen pixel ratio.
     * @method _getRelativeMousePosition
     * @private
     * @param {} event
     * @param {} element
     * @param {number} pixelRatio
     * @return {}
     */
    Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
        var elementBounds = element.getBoundingClientRect(),
            rootNode = (document.documentElement || document.body.parentNode || document.body),
            scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : rootNode.scrollLeft,
            scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : rootNode.scrollTop,
            touches = event.changedTouches,
            x, y;

        if (touches) {
            x = touches[0].pageX - elementBounds.left - scrollX;
            y = touches[0].pageY - elementBounds.top - scrollY;
        } else {
            x = event.pageX - elementBounds.left - scrollX;
            y = event.pageY - elementBounds.top - scrollY;
        }

        return { 
            x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
            y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
        };
    };

})();


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Plugin` module contains functions for registering and installing plugins on modules.
*
* @class Plugin
*/

var Plugin = {};

module.exports = Plugin;

var Common = __webpack_require__(0);

(function() {

    Plugin._registry = {};

    /**
     * Registers a plugin object so it can be resolved later by name.
     * @method register
     * @param plugin {} The plugin to register.
     * @return {object} The plugin.
     */
    Plugin.register = function(plugin) {
        if (!Plugin.isPlugin(plugin)) {
            Common.warn('Plugin.register:', Plugin.toString(plugin), 'does not implement all required fields.');
        }

        if (plugin.name in Plugin._registry) {
            var registered = Plugin._registry[plugin.name],
                pluginVersion = Plugin.versionParse(plugin.version).number,
                registeredVersion = Plugin.versionParse(registered.version).number;

            if (pluginVersion > registeredVersion) {
                Common.warn('Plugin.register:', Plugin.toString(registered), 'was upgraded to', Plugin.toString(plugin));
                Plugin._registry[plugin.name] = plugin;
            } else if (pluginVersion < registeredVersion) {
                Common.warn('Plugin.register:', Plugin.toString(registered), 'can not be downgraded to', Plugin.toString(plugin));
            } else if (plugin !== registered) {
                Common.warn('Plugin.register:', Plugin.toString(plugin), 'is already registered to different plugin object');
            }
        } else {
            Plugin._registry[plugin.name] = plugin;
        }

        return plugin;
    };

    /**
     * Resolves a dependency to a plugin object from the registry if it exists. 
     * The `dependency` may contain a version, but only the name matters when resolving.
     * @method resolve
     * @param dependency {string} The dependency.
     * @return {object} The plugin if resolved, otherwise `undefined`.
     */
    Plugin.resolve = function(dependency) {
        return Plugin._registry[Plugin.dependencyParse(dependency).name];
    };

    /**
     * Returns a pretty printed plugin name and version.
     * @method toString
     * @param plugin {} The plugin.
     * @return {string} Pretty printed plugin name and version.
     */
    Plugin.toString = function(plugin) {
        return typeof plugin === 'string' ? plugin : (plugin.name || 'anonymous') + '@' + (plugin.version || plugin.range || '0.0.0');
    };

    /**
     * Returns `true` if the object meets the minimum standard to be considered a plugin.
     * This means it must define the following properties:
     * - `name`
     * - `version`
     * - `install`
     * @method isPlugin
     * @param obj {} The obj to test.
     * @return {boolean} `true` if the object can be considered a plugin otherwise `false`.
     */
    Plugin.isPlugin = function(obj) {
        return obj && obj.name && obj.version && obj.install;
    };

    /**
     * Returns `true` if a plugin with the given `name` been installed on `module`.
     * @method isUsed
     * @param module {} The module.
     * @param name {string} The plugin name.
     * @return {boolean} `true` if a plugin with the given `name` been installed on `module`, otherwise `false`.
     */
    Plugin.isUsed = function(module, name) {
        return module.used.indexOf(name) > -1;
    };

    /**
     * Returns `true` if `plugin.for` is applicable to `module` by comparing against `module.name` and `module.version`.
     * If `plugin.for` is not specified then it is assumed to be applicable.
     * The value of `plugin.for` is a string of the format `'module-name'` or `'module-name@version'`.
     * @method isFor
     * @param plugin {} The plugin.
     * @param module {} The module.
     * @return {boolean} `true` if `plugin.for` is applicable to `module`, otherwise `false`.
     */
    Plugin.isFor = function(plugin, module) {
        var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
        return !plugin.for || (module.name === parsed.name && Plugin.versionSatisfies(module.version, parsed.range));
    };

    /**
     * Installs the plugins by calling `plugin.install` on each plugin specified in `plugins` if passed, otherwise `module.uses`.
     * For installing plugins on `Matter` see the convenience function `Matter.use`.
     * Plugins may be specified either by their name or a reference to the plugin object.
     * Plugins themselves may specify further dependencies, but each plugin is installed only once.
     * Order is important, a topological sort is performed to find the best resulting order of installation.
     * This sorting attempts to satisfy every dependency's requested ordering, but may not be exact in all cases.
     * This function logs the resulting status of each dependency in the console, along with any warnings.
     * - A green tick ✅ indicates a dependency was resolved and installed.
     * - An orange diamond 🔶 indicates a dependency was resolved but a warning was thrown for it or one if its dependencies.
     * - A red cross ❌ indicates a dependency could not be resolved.
     * Avoid calling this function multiple times on the same module unless you intend to manually control installation order.
     * @method use
     * @param module {} The module install plugins on.
     * @param [plugins=module.uses] {} The plugins to install on module (optional, defaults to `module.uses`).
     */
    Plugin.use = function(module, plugins) {
        module.uses = (module.uses || []).concat(plugins || []);

        if (module.uses.length === 0) {
            Common.warn('Plugin.use:', Plugin.toString(module), 'does not specify any dependencies to install.');
            return;
        }

        var dependencies = Plugin.dependencies(module),
            sortedDependencies = Common.topologicalSort(dependencies),
            status = [];

        for (var i = 0; i < sortedDependencies.length; i += 1) {
            if (sortedDependencies[i] === module.name) {
                continue;
            }

            var plugin = Plugin.resolve(sortedDependencies[i]);

            if (!plugin) {
                status.push('❌ ' + sortedDependencies[i]);
                continue;
            }

            if (Plugin.isUsed(module, plugin.name)) {
                continue;
            }

            if (!Plugin.isFor(plugin, module)) {
                Common.warn('Plugin.use:', Plugin.toString(plugin), 'is for', plugin.for, 'but installed on', Plugin.toString(module) + '.');
                plugin._warned = true;
            }

            if (plugin.install) {
                plugin.install(module);
            } else {
                Common.warn('Plugin.use:', Plugin.toString(plugin), 'does not specify an install function.');
                plugin._warned = true;
            }

            if (plugin._warned) {
                status.push('🔶 ' + Plugin.toString(plugin));
                delete plugin._warned;
            } else {
                status.push('✅ ' + Plugin.toString(plugin));
            }

            module.used.push(plugin.name);
        }

        if (status.length > 0) {
            Common.info(status.join('  '));
        }
    };

    /**
     * Recursively finds all of a module's dependencies and returns a flat dependency graph.
     * @method dependencies
     * @param module {} The module.
     * @return {object} A dependency graph.
     */
    Plugin.dependencies = function(module, tracked) {
        var parsedBase = Plugin.dependencyParse(module),
            name = parsedBase.name;

        tracked = tracked || {};

        if (name in tracked) {
            return;
        }

        module = Plugin.resolve(module) || module;

        tracked[name] = Common.map(module.uses || [], function(dependency) {
            if (Plugin.isPlugin(dependency)) {
                Plugin.register(dependency);
            }

            var parsed = Plugin.dependencyParse(dependency),
                resolved = Plugin.resolve(dependency);

            if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                Common.warn(
                    'Plugin.dependencies:', Plugin.toString(resolved), 'does not satisfy',
                    Plugin.toString(parsed), 'used by', Plugin.toString(parsedBase) + '.'
                );

                resolved._warned = true;
                module._warned = true;
            } else if (!resolved) {
                Common.warn(
                    'Plugin.dependencies:', Plugin.toString(dependency), 'used by',
                    Plugin.toString(parsedBase), 'could not be resolved.'
                );

                module._warned = true;
            }

            return parsed.name;
        });

        for (var i = 0; i < tracked[name].length; i += 1) {
            Plugin.dependencies(tracked[name][i], tracked);
        }

        return tracked;
    };

    /**
     * Parses a dependency string into its components.
     * The `dependency` is a string of the format `'module-name'` or `'module-name@version'`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * This function can also handle dependencies that are already resolved (e.g. a module object).
     * @method dependencyParse
     * @param dependency {string} The dependency of the format `'module-name'` or `'module-name@version'`.
     * @return {object} The dependency parsed into its components.
     */
    Plugin.dependencyParse = function(dependency) {
        if (Common.isString(dependency)) {
            var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;

            if (!pattern.test(dependency)) {
                Common.warn('Plugin.dependencyParse:', dependency, 'is not a valid dependency string.');
            }

            return {
                name: dependency.split('@')[0],
                range: dependency.split('@')[1] || '*'
            };
        }

        return {
            name: dependency.name,
            range: dependency.range || dependency.version
        };
    };

    /**
     * Parses a version string into its components.  
     * Versions are strictly of the format `x.y.z` (as in [semver](http://semver.org/)).
     * Versions may optionally have a prerelease tag in the format `x.y.z-alpha`.
     * Ranges are a strict subset of [npm ranges](https://docs.npmjs.com/misc/semver#advanced-range-syntax).
     * Only the following range types are supported:
     * - Tilde ranges e.g. `~1.2.3`
     * - Caret ranges e.g. `^1.2.3`
     * - Greater than ranges e.g. `>1.2.3`
     * - Greater than or equal ranges e.g. `>=1.2.3`
     * - Exact version e.g. `1.2.3`
     * - Any version `*`
     * @method versionParse
     * @param range {string} The version string.
     * @return {object} The version range parsed into its components.
     */
    Plugin.versionParse = function(range) {
        var pattern = /^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;

        if (!pattern.test(range)) {
            Common.warn('Plugin.versionParse:', range, 'is not a valid version or range.');
        }

        var parts = pattern.exec(range);
        var major = Number(parts[4]);
        var minor = Number(parts[5]);
        var patch = Number(parts[6]);

        return {
            isRange: Boolean(parts[1] || parts[2]),
            version: parts[3],
            range: range,
            operator: parts[1] || parts[2] || '',
            major: major,
            minor: minor,
            patch: patch,
            parts: [major, minor, patch],
            prerelease: parts[7],
            number: major * 1e8 + minor * 1e4 + patch
        };
    };

    /**
     * Returns `true` if `version` satisfies the given `range`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * If a version or range is not specified, then any version (`*`) is assumed to satisfy.
     * @method versionSatisfies
     * @param version {string} The version string.
     * @param range {string} The range string.
     * @return {boolean} `true` if `version` satisfies `range`, otherwise `false`.
     */
    Plugin.versionSatisfies = function(version, range) {
        range = range || '*';

        var r = Plugin.versionParse(range),
            v = Plugin.versionParse(version);

        if (r.isRange) {
            if (r.operator === '*' || version === '*') {
                return true;
            }

            if (r.operator === '>') {
                return v.number > r.number;
            }

            if (r.operator === '>=') {
                return v.number >= r.number;
            }

            if (r.operator === '~') {
                return v.major === r.major && v.minor === r.minor && v.patch >= r.patch;
            }

            if (r.operator === '^') {
                if (r.major > 0) {
                    return v.major === r.major && v.number >= r.number;
                }

                if (r.minor > 0) {
                    return v.minor === r.minor && v.patch >= r.patch;
                }

                return v.patch === r.patch;
            }
        }

        return version === range || version === '*';
    };

})();


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
* The `Matter.Contact` module contains methods for creating and manipulating collision contacts.
*
* @class Contact
*/

var Contact = {};

module.exports = Contact;

(function() {

    /**
     * Creates a new contact.
     * @method create
     * @param {vertex} vertex
     * @return {contact} A new contact
     */
    Contact.create = function(vertex) {
        return {
            vertex: vertex,
            normalImpulse: 0,
            tangentImpulse: 0
        };
    };

})();


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Engine` module contains methods for creating and manipulating engines.
* An engine is a controller that manages updating the simulation of the world.
* See `Matter.Runner` for an optional game loop utility.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Engine
*/

var Engine = {};

module.exports = Engine;

var Sleeping = __webpack_require__(7);
var Resolver = __webpack_require__(18);
var Detector = __webpack_require__(13);
var Pairs = __webpack_require__(19);
var Events = __webpack_require__(5);
var Composite = __webpack_require__(6);
var Constraint = __webpack_require__(10);
var Common = __webpack_require__(0);
var Body = __webpack_require__(4);

(function() {

    /**
     * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {engine} engine
     */
    Engine.create = function(options) {
        options = options || {};

        var defaults = {
            positionIterations: 6,
            velocityIterations: 4,
            constraintIterations: 2,
            enableSleeping: false,
            events: [],
            plugin: {},
            gravity: {
                x: 0,
                y: 1,
                scale: 0.001
            },
            timing: {
                timestamp: 0,
                timeScale: 1,
                lastDelta: 0,
                lastElapsed: 0
            }
        };

        var engine = Common.extend(defaults, options);

        engine.world = options.world || Composite.create({ label: 'World' });
        engine.pairs = options.pairs || Pairs.create();
        engine.detector = options.detector || Detector.create();

        // for temporary back compatibility only
        engine.grid = { buckets: [] };
        engine.world.gravity = engine.gravity;
        engine.broadphase = engine.grid;
        engine.metrics = {};

        return engine;
    };

    /**
     * Moves the simulation forward in time by `delta` milliseconds.
     * Triggers `beforeUpdate` and `afterUpdate` events.
     * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
     * @method update
     * @param {engine} engine
     * @param {number} [delta=16.666]
     */
    Engine.update = function(engine, delta) {
        var startTime = Common.now();

        var world = engine.world,
            detector = engine.detector,
            pairs = engine.pairs,
            timing = engine.timing,
            timestamp = timing.timestamp,
            i;

        delta = typeof delta !== 'undefined' ? delta : Common._baseDelta;
        delta *= timing.timeScale;

        // increment timestamp
        timing.timestamp += delta;
        timing.lastDelta = delta;

        // create an event object
        var event = {
            timestamp: timing.timestamp,
            delta: delta
        };

        Events.trigger(engine, 'beforeUpdate', event);

        // get all bodies and all constraints in the world
        var allBodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world);

        // if the world has changed
        if (world.isModified) {
            // update the detector bodies
            Detector.setBodies(detector, allBodies);

            // reset all composite modified flags
            Composite.setModified(world, false, false, true);
        }

        // update sleeping if enabled
        if (engine.enableSleeping)
            Sleeping.update(allBodies, delta);

        // apply gravity to all bodies
        Engine._bodiesApplyGravity(allBodies, engine.gravity);

        // update all body position and rotation by integration
        if (delta > 0) {
            Engine._bodiesUpdate(allBodies, delta);
        }

        // update all constraints (first pass)
        Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            Constraint.solveAll(allConstraints, delta);
        }
        Constraint.postSolveAll(allBodies);

        // find all collisions
        detector.pairs = engine.pairs;
        var collisions = Detector.collisions(detector);

        // update collision pairs
        Pairs.update(pairs, collisions, timestamp);

        // wake up bodies involved in collisions
        if (engine.enableSleeping)
            Sleeping.afterCollisions(pairs.list);

        // trigger collision events
        if (pairs.collisionStart.length > 0)
            Events.trigger(engine, 'collisionStart', { pairs: pairs.collisionStart });

        // iteratively resolve position between collisions
        var positionDamping = Common.clamp(20 / engine.positionIterations, 0, 1);

        Resolver.preSolvePosition(pairs.list);
        for (i = 0; i < engine.positionIterations; i++) {
            Resolver.solvePosition(pairs.list, delta, positionDamping);
        }
        Resolver.postSolvePosition(allBodies);

        // update all constraints (second pass)
        Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            Constraint.solveAll(allConstraints, delta);
        }
        Constraint.postSolveAll(allBodies);

        // iteratively resolve velocity between collisions
        Resolver.preSolveVelocity(pairs.list);
        for (i = 0; i < engine.velocityIterations; i++) {
            Resolver.solveVelocity(pairs.list, delta);
        }

        // update body speed and velocity properties
        Engine._bodiesUpdateVelocities(allBodies);

        // trigger collision events
        if (pairs.collisionActive.length > 0)
            Events.trigger(engine, 'collisionActive', { pairs: pairs.collisionActive });

        if (pairs.collisionEnd.length > 0)
            Events.trigger(engine, 'collisionEnd', { pairs: pairs.collisionEnd });

        // clear force buffers
        Engine._bodiesClearForces(allBodies);

        Events.trigger(engine, 'afterUpdate', event);

        // log the time elapsed computing this update
        engine.timing.lastElapsed = Common.now() - startTime;

        return engine;
    };

    /**
     * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
     * @method merge
     * @param {engine} engineA
     * @param {engine} engineB
     */
    Engine.merge = function(engineA, engineB) {
        Common.extend(engineA, engineB);

        if (engineB.world) {
            engineA.world = engineB.world;

            Engine.clear(engineA);

            var bodies = Composite.allBodies(engineA.world);

            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                Sleeping.set(body, false);
                body.id = Common.nextId();
            }
        }
    };

    /**
     * Clears the engine pairs and detector.
     * @method clear
     * @param {engine} engine
     */
    Engine.clear = function(engine) {
        Pairs.clear(engine.pairs);
        Detector.clear(engine.detector);
    };

    /**
     * Zeroes the `body.force` and `body.torque` force buffers.
     * @method _bodiesClearForces
     * @private
     * @param {body[]} bodies
     */
    Engine._bodiesClearForces = function(bodies) {
        var bodiesLength = bodies.length;

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i];

            // reset force buffers
            body.force.x = 0;
            body.force.y = 0;
            body.torque = 0;
        }
    };

    /**
     * Applies gravitational acceleration to all `bodies`.
     * This models a [uniform gravitational field](https://en.wikipedia.org/wiki/Gravity_of_Earth), similar to near the surface of a planet.
     * 
     * @method _bodiesApplyGravity
     * @private
     * @param {body[]} bodies
     * @param {vector} gravity
     */
    Engine._bodiesApplyGravity = function(bodies, gravity) {
        var gravityScale = typeof gravity.scale !== 'undefined' ? gravity.scale : 0.001,
            bodiesLength = bodies.length;

        if ((gravity.x === 0 && gravity.y === 0) || gravityScale === 0) {
            return;
        }

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            // add the resultant force of gravity
            body.force.y += body.mass * gravity.y * gravityScale;
            body.force.x += body.mass * gravity.x * gravityScale;
        }
    };

    /**
     * Applies `Body.update` to all given `bodies`.
     * @method _bodiesUpdate
     * @private
     * @param {body[]} bodies
     * @param {number} delta The amount of time elapsed between updates
     */
    Engine._bodiesUpdate = function(bodies, delta) {
        var bodiesLength = bodies.length;

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            Body.update(body, delta);
        }
    };

    /**
     * Applies `Body.updateVelocities` to all given `bodies`.
     * @method _bodiesUpdateVelocities
     * @private
     * @param {body[]} bodies
     */
    Engine._bodiesUpdateVelocities = function(bodies) {
        var bodiesLength = bodies.length;

        for (var i = 0; i < bodiesLength; i++) {
            Body.updateVelocities(bodies[i]);
        }
    };

    /**
     * A deprecated alias for `Runner.run`, use `Matter.Runner.run(engine)` instead and see `Matter.Runner` for more information.
     * @deprecated use Matter.Runner.run(engine) instead
     * @method run
     * @param {engine} engine
     */

    /**
    * Fired just before an update
    *
    * @event beforeUpdate
    * @param {object} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {number} event.delta The delta time in milliseconds value used in the update
    * @param {engine} event.source The source object of the event
    * @param {string} event.name The name of the event
    */

    /**
    * Fired after engine update and all collision events
    *
    * @event afterUpdate
    * @param {object} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {number} event.delta The delta time in milliseconds value used in the update
    * @param {engine} event.source The source object of the event
    * @param {string} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
    *
    * @event collisionStart
    * @param {object} event An event object
    * @param {pair[]} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {number} event.delta The delta time in milliseconds value used in the update
    * @param {engine} event.source The source object of the event
    * @param {string} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
    *
    * @event collisionActive
    * @param {object} event An event object
    * @param {pair[]} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {number} event.delta The delta time in milliseconds value used in the update
    * @param {engine} event.source The source object of the event
    * @param {string} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
    *
    * @event collisionEnd
    * @param {object} event An event object
    * @param {pair[]} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {number} event.delta The delta time in milliseconds value used in the update
    * @param {engine} event.source The source object of the event
    * @param {string} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` that specifies the number of position iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property positionIterations
     * @type number
     * @default 6
     */

    /**
     * An integer `Number` that specifies the number of velocity iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property velocityIterations
     * @type number
     * @default 4
     */

    /**
     * An integer `Number` that specifies the number of constraint iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     * The default value of `2` is usually very adequate.
     *
     * @property constraintIterations
     * @type number
     * @default 2
     */

    /**
     * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
     * Sleeping can improve stability and performance, but often at the expense of accuracy.
     *
     * @property enableSleeping
     * @type boolean
     * @default false
     */

    /**
     * An `Object` containing properties regarding the timing systems of the engine. 
     *
     * @property timing
     * @type object
     */

    /**
     * A `Number` that specifies the global scaling factor of time for all bodies.
     * A value of `0` freezes the simulation.
     * A value of `0.1` gives a slow-motion effect.
     * A value of `1.2` gives a speed-up effect.
     *
     * @property timing.timeScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the current simulation-time in milliseconds starting from `0`. 
     * It is incremented on every `Engine.update` by the given `delta` argument. 
     * 
     * @property timing.timestamp
     * @type number
     * @default 0
     */

    /**
     * A `Number` that represents the total execution time elapsed during the last `Engine.update` in milliseconds.
     * It is updated by timing from the start of the last `Engine.update` call until it ends.
     *
     * This value will also include the total execution time of all event handlers directly or indirectly triggered by the engine update.
     * 
     * @property timing.lastElapsed
     * @type number
     * @default 0
     */

    /**
     * A `Number` that represents the `delta` value used in the last engine update.
     * 
     * @property timing.lastDelta
     * @type number
     * @default 0
     */

    /**
     * A `Matter.Detector` instance.
     *
     * @property detector
     * @type detector
     * @default a Matter.Detector instance
     */

    /**
     * A `Matter.Grid` instance.
     *
     * @deprecated replaced by `engine.detector`
     * @property grid
     * @type grid
     * @default a Matter.Grid instance
     */

    /**
     * Replaced by and now alias for `engine.grid`.
     *
     * @deprecated replaced by `engine.detector`
     * @property broadphase
     * @type grid
     * @default a Matter.Grid instance
     */

    /**
     * The root `Matter.Composite` instance that will contain all bodies, constraints and other composites to be simulated by this engine.
     *
     * @property world
     * @type composite
     * @default a Matter.Composite instance
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * An optional gravitational acceleration applied to all bodies in `engine.world` on every update.
     * 
     * This models a [uniform gravitational field](https://en.wikipedia.org/wiki/Gravity_of_Earth), similar to near the surface of a planet. For gravity in other contexts, disable this and apply forces as needed.
     * 
     * To disable set the `scale` component to `0`.
     * 
     * This is split into three components for ease of use:  
     * a normalised direction (`x` and `y`) and magnitude (`scale`).
     *
     * @property gravity
     * @type object
     */

    /**
     * The gravitational direction normal `x` component, to be multiplied by `gravity.scale`.
     * 
     * @property gravity.x
     * @type object
     * @default 0
     */

    /**
     * The gravitational direction normal `y` component, to be multiplied by `gravity.scale`.
     *
     * @property gravity.y
     * @type object
     * @default 1
     */

    /**
     * The magnitude of the gravitational acceleration.
     * 
     * @property gravity.scale
     * @type object
     * @default 0.001
     */

})();


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Resolver` module contains methods for resolving collision pairs.
*
* @class Resolver
*/

var Resolver = {};

module.exports = Resolver;

var Vertices = __webpack_require__(3);
var Common = __webpack_require__(0);
var Bounds = __webpack_require__(1);

(function() {

    Resolver._restingThresh = 2;
    Resolver._restingThreshTangent = Math.sqrt(6);
    Resolver._positionDampen = 0.9;
    Resolver._positionWarming = 0.8;
    Resolver._frictionNormalMultiplier = 5;
    Resolver._frictionMaxStatic = Number.MAX_VALUE;

    /**
     * Prepare pairs for position solving.
     * @method preSolvePosition
     * @param {pair[]} pairs
     */
    Resolver.preSolvePosition = function(pairs) {
        var i,
            pair,
            activeCount,
            pairsLength = pairs.length;

        // find total contacts on each body
        for (i = 0; i < pairsLength; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            activeCount = pair.activeContacts.length;
            pair.collision.parentA.totalContacts += activeCount;
            pair.collision.parentB.totalContacts += activeCount;
        }
    };

    /**
     * Find a solution for pair positions.
     * @method solvePosition
     * @param {pair[]} pairs
     * @param {number} delta
     * @param {number} [damping=1]
     */
    Resolver.solvePosition = function(pairs, delta, damping) {
        var i,
            pair,
            collision,
            bodyA,
            bodyB,
            normal,
            contactShare,
            positionImpulse,
            positionDampen = Resolver._positionDampen * (damping || 1),
            slopDampen = Common.clamp(delta / Common._baseDelta, 0, 1),
            pairsLength = pairs.length;

        // find impulses required to resolve penetration
        for (i = 0; i < pairsLength; i++) {
            pair = pairs[i];

            if (!pair.isActive || pair.isSensor)
                continue;

            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;

            // get current separation between body edges involved in collision
            pair.separation = 
                normal.x * (bodyB.positionImpulse.x + collision.penetration.x - bodyA.positionImpulse.x)
                + normal.y * (bodyB.positionImpulse.y + collision.penetration.y - bodyA.positionImpulse.y);
        }

        for (i = 0; i < pairsLength; i++) {
            pair = pairs[i];

            if (!pair.isActive || pair.isSensor)
                continue;

            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;
            positionImpulse = pair.separation - pair.slop * slopDampen;

            if (bodyA.isStatic || bodyB.isStatic)
                positionImpulse *= 2;

            if (!(bodyA.isStatic || bodyA.isSleeping)) {
                contactShare = positionDampen / bodyA.totalContacts;
                bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
            }

            if (!(bodyB.isStatic || bodyB.isSleeping)) {
                contactShare = positionDampen / bodyB.totalContacts;
                bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
            }
        }
    };

    /**
     * Apply position resolution.
     * @method postSolvePosition
     * @param {body[]} bodies
     */
    Resolver.postSolvePosition = function(bodies) {
        var positionWarming = Resolver._positionWarming,
            bodiesLength = bodies.length,
            verticesTranslate = Vertices.translate,
            boundsUpdate = Bounds.update;

        for (var i = 0; i < bodiesLength; i++) {
            var body = bodies[i],
                positionImpulse = body.positionImpulse,
                positionImpulseX = positionImpulse.x,
                positionImpulseY = positionImpulse.y,
                velocity = body.velocity;

            // reset contact count
            body.totalContacts = 0;

            if (positionImpulseX !== 0 || positionImpulseY !== 0) {
                // update body geometry
                for (var j = 0; j < body.parts.length; j++) {
                    var part = body.parts[j];
                    verticesTranslate(part.vertices, positionImpulse);
                    boundsUpdate(part.bounds, part.vertices, velocity);
                    part.position.x += positionImpulseX;
                    part.position.y += positionImpulseY;
                }

                // move the body without changing velocity
                body.positionPrev.x += positionImpulseX;
                body.positionPrev.y += positionImpulseY;

                if (positionImpulseX * velocity.x + positionImpulseY * velocity.y < 0) {
                    // reset cached impulse if the body has velocity along it
                    positionImpulse.x = 0;
                    positionImpulse.y = 0;
                } else {
                    // warm the next iteration
                    positionImpulse.x *= positionWarming;
                    positionImpulse.y *= positionWarming;
                }
            }
        }
    };

    /**
     * Prepare pairs for velocity solving.
     * @method preSolveVelocity
     * @param {pair[]} pairs
     */
    Resolver.preSolveVelocity = function(pairs) {
        var pairsLength = pairs.length,
            i,
            j;

        for (i = 0; i < pairsLength; i++) {
            var pair = pairs[i];

            if (!pair.isActive || pair.isSensor)
                continue;

            var contacts = pair.activeContacts,
                contactsLength = contacts.length,
                collision = pair.collision,
                bodyA = collision.parentA,
                bodyB = collision.parentB,
                normal = collision.normal,
                tangent = collision.tangent;

            // resolve each contact
            for (j = 0; j < contactsLength; j++) {
                var contact = contacts[j],
                    contactVertex = contact.vertex,
                    normalImpulse = contact.normalImpulse,
                    tangentImpulse = contact.tangentImpulse;

                if (normalImpulse !== 0 || tangentImpulse !== 0) {
                    // total impulse from contact
                    var impulseX = normal.x * normalImpulse + tangent.x * tangentImpulse,
                        impulseY = normal.y * normalImpulse + tangent.y * tangentImpulse;

                    // apply impulse from contact
                    if (!(bodyA.isStatic || bodyA.isSleeping)) {
                        bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                        bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                        bodyA.anglePrev += bodyA.inverseInertia * (
                            (contactVertex.x - bodyA.position.x) * impulseY
                            - (contactVertex.y - bodyA.position.y) * impulseX
                        );
                    }

                    if (!(bodyB.isStatic || bodyB.isSleeping)) {
                        bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                        bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                        bodyB.anglePrev -= bodyB.inverseInertia * (
                            (contactVertex.x - bodyB.position.x) * impulseY 
                            - (contactVertex.y - bodyB.position.y) * impulseX
                        );
                    }
                }
            }
        }
    };

    /**
     * Find a solution for pair velocities.
     * @method solveVelocity
     * @param {pair[]} pairs
     * @param {number} delta
     */
    Resolver.solveVelocity = function(pairs, delta) {
        var timeScale = delta / Common._baseDelta,
            timeScaleSquared = timeScale * timeScale,
            timeScaleCubed = timeScaleSquared * timeScale,
            restingThresh = -Resolver._restingThresh * timeScale,
            restingThreshTangent = Resolver._restingThreshTangent,
            frictionNormalMultiplier = Resolver._frictionNormalMultiplier * timeScale,
            frictionMaxStatic = Resolver._frictionMaxStatic,
            pairsLength = pairs.length,
            tangentImpulse,
            maxFriction,
            i,
            j;

        for (i = 0; i < pairsLength; i++) {
            var pair = pairs[i];

            if (!pair.isActive || pair.isSensor)
                continue;

            var collision = pair.collision,
                bodyA = collision.parentA,
                bodyB = collision.parentB,
                bodyAVelocity = bodyA.velocity,
                bodyBVelocity = bodyB.velocity,
                normalX = collision.normal.x,
                normalY = collision.normal.y,
                tangentX = collision.tangent.x,
                tangentY = collision.tangent.y,
                contacts = pair.activeContacts,
                contactsLength = contacts.length,
                contactShare = 1 / contactsLength,
                inverseMassTotal = bodyA.inverseMass + bodyB.inverseMass,
                friction = pair.friction * pair.frictionStatic * frictionNormalMultiplier;

            // update body velocities
            bodyAVelocity.x = bodyA.position.x - bodyA.positionPrev.x;
            bodyAVelocity.y = bodyA.position.y - bodyA.positionPrev.y;
            bodyBVelocity.x = bodyB.position.x - bodyB.positionPrev.x;
            bodyBVelocity.y = bodyB.position.y - bodyB.positionPrev.y;
            bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
            bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;

            // resolve each contact
            for (j = 0; j < contactsLength; j++) {
                var contact = contacts[j],
                    contactVertex = contact.vertex;

                var offsetAX = contactVertex.x - bodyA.position.x,
                    offsetAY = contactVertex.y - bodyA.position.y,
                    offsetBX = contactVertex.x - bodyB.position.x,
                    offsetBY = contactVertex.y - bodyB.position.y;

                var velocityPointAX = bodyAVelocity.x - offsetAY * bodyA.angularVelocity,
                    velocityPointAY = bodyAVelocity.y + offsetAX * bodyA.angularVelocity,
                    velocityPointBX = bodyBVelocity.x - offsetBY * bodyB.angularVelocity,
                    velocityPointBY = bodyBVelocity.y + offsetBX * bodyB.angularVelocity;

                var relativeVelocityX = velocityPointAX - velocityPointBX,
                    relativeVelocityY = velocityPointAY - velocityPointBY;

                var normalVelocity = normalX * relativeVelocityX + normalY * relativeVelocityY,
                    tangentVelocity = tangentX * relativeVelocityX + tangentY * relativeVelocityY;

                // coulomb friction
                var normalOverlap = pair.separation + normalVelocity;
                var normalForce = Math.min(normalOverlap, 1);
                normalForce = normalOverlap < 0 ? 0 : normalForce;

                var frictionLimit = normalForce * friction;

                if (tangentVelocity < -frictionLimit || tangentVelocity > frictionLimit) {
                    maxFriction = (tangentVelocity > 0 ? tangentVelocity : -tangentVelocity);
                    tangentImpulse = pair.friction * (tangentVelocity > 0 ? 1 : -1) * timeScaleCubed;

                    if (tangentImpulse < -maxFriction) {
                        tangentImpulse = -maxFriction;
                    } else if (tangentImpulse > maxFriction) {
                        tangentImpulse = maxFriction;
                    }
                } else {
                    tangentImpulse = tangentVelocity;
                    maxFriction = frictionMaxStatic;
                }

                // account for mass, inertia and contact offset
                var oAcN = offsetAX * normalY - offsetAY * normalX,
                    oBcN = offsetBX * normalY - offsetBY * normalX,
                    share = contactShare / (inverseMassTotal + bodyA.inverseInertia * oAcN * oAcN + bodyB.inverseInertia * oBcN * oBcN);

                // raw impulses
                var normalImpulse = (1 + pair.restitution) * normalVelocity * share;
                tangentImpulse *= share;

                // handle high velocity and resting collisions separately
                if (normalVelocity < restingThresh) {
                    // high normal velocity so clear cached contact normal impulse
                    contact.normalImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // impulse constraint tends to 0
                    var contactNormalImpulse = contact.normalImpulse;
                    contact.normalImpulse += normalImpulse;
                    if (contact.normalImpulse > 0) contact.normalImpulse = 0;
                    normalImpulse = contact.normalImpulse - contactNormalImpulse;
                }

                // handle high velocity and resting collisions separately
                if (tangentVelocity < -restingThreshTangent || tangentVelocity > restingThreshTangent) {
                    // high tangent velocity so clear cached contact tangent impulse
                    contact.tangentImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // tangent impulse tends to -tangentSpeed or +tangentSpeed
                    var contactTangentImpulse = contact.tangentImpulse;
                    contact.tangentImpulse += tangentImpulse;
                    if (contact.tangentImpulse < -maxFriction) contact.tangentImpulse = -maxFriction;
                    if (contact.tangentImpulse > maxFriction) contact.tangentImpulse = maxFriction;
                    tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                }

                // total impulse from contact
                var impulseX = normalX * normalImpulse + tangentX * tangentImpulse,
                    impulseY = normalY * normalImpulse + tangentY * tangentImpulse;

                // apply impulse from contact
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    bodyA.positionPrev.x += impulseX * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulseY * bodyA.inverseMass;
                    bodyA.anglePrev += (offsetAX * impulseY - offsetAY * impulseX) * bodyA.inverseInertia;
                }

                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    bodyB.positionPrev.x -= impulseX * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulseY * bodyB.inverseMass;
                    bodyB.anglePrev -= (offsetBX * impulseY - offsetBY * impulseX) * bodyB.inverseInertia;
                }
            }
        }
    };

})();


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
*
* @class Pairs
*/

var Pairs = {};

module.exports = Pairs;

var Pair = __webpack_require__(9);
var Common = __webpack_require__(0);

(function() {

    /**
     * Creates a new pairs structure.
     * @method create
     * @param {object} options
     * @return {pairs} A new pairs structure
     */
    Pairs.create = function(options) {
        return Common.extend({ 
            table: {},
            list: [],
            collisionStart: [],
            collisionActive: [],
            collisionEnd: []
        }, options);
    };

    /**
     * Updates pairs given a list of collisions.
     * @method update
     * @param {object} pairs
     * @param {collision[]} collisions
     * @param {number} timestamp
     */
    Pairs.update = function(pairs, collisions, timestamp) {
        var pairsList = pairs.list,
            pairsListLength = pairsList.length,
            pairsTable = pairs.table,
            collisionsLength = collisions.length,
            collisionStart = pairs.collisionStart,
            collisionEnd = pairs.collisionEnd,
            collisionActive = pairs.collisionActive,
            collision,
            pairIndex,
            pair,
            i;

        // clear collision state arrays, but maintain old reference
        collisionStart.length = 0;
        collisionEnd.length = 0;
        collisionActive.length = 0;

        for (i = 0; i < pairsListLength; i++) {
            pairsList[i].confirmedActive = false;
        }

        for (i = 0; i < collisionsLength; i++) {
            collision = collisions[i];
            pair = collision.pair;

            if (pair) {
                // pair already exists (but may or may not be active)
                if (pair.isActive) {
                    // pair exists and is active
                    collisionActive.push(pair);
                } else {
                    // pair exists but was inactive, so a collision has just started again
                    collisionStart.push(pair);
                }

                // update the pair
                Pair.update(pair, collision, timestamp);
                pair.confirmedActive = true;
            } else {
                // pair did not exist, create a new pair
                pair = Pair.create(collision, timestamp);
                pairsTable[pair.id] = pair;

                // push the new pair
                collisionStart.push(pair);
                pairsList.push(pair);
            }
        }

        // find pairs that are no longer active
        var removePairIndex = [];
        pairsListLength = pairsList.length;

        for (i = 0; i < pairsListLength; i++) {
            pair = pairsList[i];

            if (!pair.confirmedActive) {
                Pair.setActive(pair, false, timestamp);
                collisionEnd.push(pair);

                if (!pair.collision.bodyA.isSleeping && !pair.collision.bodyB.isSleeping) {
                    removePairIndex.push(i);
                }
            }
        }

        // remove inactive pairs
        for (i = 0; i < removePairIndex.length; i++) {
            pairIndex = removePairIndex[i] - i;
            pair = pairsList[pairIndex];
            pairsList.splice(pairIndex, 1);
            delete pairsTable[pair.id];
        }
    };

    /**
     * Clears the given pairs structure.
     * @method clear
     * @param {pairs} pairs
     * @return {pairs} pairs
     */
    Pairs.clear = function(pairs) {
        pairs.table = {};
        pairs.list.length = 0;
        pairs.collisionStart.length = 0;
        pairs.collisionActive.length = 0;
        pairs.collisionEnd.length = 0;
        return pairs;
    };

})();


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var Matter = module.exports = __webpack_require__(21);

Matter.Axes = __webpack_require__(11);
Matter.Bodies = __webpack_require__(12);
Matter.Body = __webpack_require__(4);
Matter.Bounds = __webpack_require__(1);
Matter.Collision = __webpack_require__(8);
Matter.Common = __webpack_require__(0);
Matter.Composite = __webpack_require__(6);
Matter.Composites = __webpack_require__(22);
Matter.Constraint = __webpack_require__(10);
Matter.Contact = __webpack_require__(16);
Matter.Detector = __webpack_require__(13);
Matter.Engine = __webpack_require__(17);
Matter.Events = __webpack_require__(5);
Matter.Grid = __webpack_require__(23);
Matter.Mouse = __webpack_require__(14);
Matter.MouseConstraint = __webpack_require__(24);
Matter.Pair = __webpack_require__(9);
Matter.Pairs = __webpack_require__(19);
Matter.Plugin = __webpack_require__(15);
Matter.Query = __webpack_require__(25);
Matter.Render = __webpack_require__(26);
Matter.Resolver = __webpack_require__(18);
Matter.Runner = __webpack_require__(27);
Matter.SAT = __webpack_require__(28);
Matter.Sleeping = __webpack_require__(7);
Matter.Svg = __webpack_require__(29);
Matter.Vector = __webpack_require__(2);
Matter.Vertices = __webpack_require__(3);
Matter.World = __webpack_require__(30);

// temporary back compatibility
Matter.Engine.run = Matter.Runner.run;
Matter.Common.deprecated(Matter.Engine, 'run', 'Engine.run ➤ use Matter.Runner.run(engine) instead');


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter` module is the top level namespace. It also includes a function for installing plugins on top of the library.
*
* @class Matter
*/

var Matter = {};

module.exports = Matter;

var Plugin = __webpack_require__(15);
var Common = __webpack_require__(0);

(function() {

    /**
     * The library name.
     * @property name
     * @readOnly
     * @type {String}
     */
    Matter.name = 'matter-js';

    /**
     * The library version.
     * @property version
     * @readOnly
     * @type {String}
     */
    Matter.version =  true ? "0.19.0" : undefined;

    /**
     * A list of plugin dependencies to be installed. These are normally set and installed through `Matter.use`.
     * Alternatively you may set `Matter.uses` manually and install them by calling `Plugin.use(Matter)`.
     * @property uses
     * @type {Array}
     */
    Matter.uses = [];

    /**
     * The plugins that have been installed through `Matter.Plugin.install`. Read only.
     * @property used
     * @readOnly
     * @type {Array}
     */
    Matter.used = [];

    /**
     * Installs the given plugins on the `Matter` namespace.
     * This is a short-hand for `Plugin.use`, see it for more information.
     * Call this function once at the start of your code, with all of the plugins you wish to install as arguments.
     * Avoid calling this function multiple times unless you intend to manually control installation order.
     * @method use
     * @param ...plugin {Function} The plugin(s) to install on `base` (multi-argument).
     */
    Matter.use = function() {
        Plugin.use(Matter, Array.prototype.slice.call(arguments));
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method before
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Matter.before = function(path, func) {
        path = path.replace(/^Matter./, '');
        return Common.chainPathBefore(Matter, path, func);
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method after
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Matter.after = function(path, func) {
        path = path.replace(/^Matter./, '');
        return Common.chainPathAfter(Matter, path, func);
    };

})();


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Composites` module contains factory methods for creating composite bodies
* with commonly used configurations (such as stacks and chains).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composites
*/

var Composites = {};

module.exports = Composites;

var Composite = __webpack_require__(6);
var Constraint = __webpack_require__(10);
var Common = __webpack_require__(0);
var Body = __webpack_require__(4);
var Bodies = __webpack_require__(12);
var deprecated = Common.deprecated;

(function() {

    /**
     * Create a new composite containing bodies created in the callback in a grid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method stack
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.stack = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
        var stack = Composite.create({ label: 'Stack' }),
            x = xx,
            y = yy,
            lastBody,
            i = 0;

        for (var row = 0; row < rows; row++) {
            var maxHeight = 0;

            for (var column = 0; column < columns; column++) {
                var body = callback(x, y, column, row, lastBody, i);

                if (body) {
                    var bodyHeight = body.bounds.max.y - body.bounds.min.y,
                        bodyWidth = body.bounds.max.x - body.bounds.min.x; 

                    if (bodyHeight > maxHeight)
                        maxHeight = bodyHeight;

                    Body.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });

                    x = body.bounds.max.x + columnGap;

                    Composite.addBody(stack, body);

                    lastBody = body;
                    i += 1;
                } else {
                    x += columnGap;
                }
            }

            y += maxHeight + rowGap;
            x = xx;
        }

        return stack;
    };

    /**
     * Chains all bodies in the given composite together using constraints.
     * @method chain
     * @param {composite} composite
     * @param {number} xOffsetA
     * @param {number} yOffsetA
     * @param {number} xOffsetB
     * @param {number} yOffsetB
     * @param {object} options
     * @return {composite} A new composite containing objects chained together with constraints
     */
    Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
        var bodies = composite.bodies;

        for (var i = 1; i < bodies.length; i++) {
            var bodyA = bodies[i - 1],
                bodyB = bodies[i],
                bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
                bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, 
                bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
                bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;

            var defaults = {
                bodyA: bodyA,
                pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                bodyB: bodyB,
                pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
            };

            var constraint = Common.extend(defaults, options);

            Composite.addConstraint(composite, Constraint.create(constraint));
        }

        composite.label += ' Chain';

        return composite;
    };

    /**
     * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
     * @method mesh
     * @param {composite} composite
     * @param {number} columns
     * @param {number} rows
     * @param {boolean} crossBrace
     * @param {object} options
     * @return {composite} The composite containing objects meshed together with constraints
     */
    Composites.mesh = function(composite, columns, rows, crossBrace, options) {
        var bodies = composite.bodies,
            row,
            col,
            bodyA,
            bodyB,
            bodyC;

        for (row = 0; row < rows; row++) {
            for (col = 1; col < columns; col++) {
                bodyA = bodies[(col - 1) + (row * columns)];
                bodyB = bodies[col + (row * columns)];
                Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));
            }

            if (row > 0) {
                for (col = 0; col < columns; col++) {
                    bodyA = bodies[col + ((row - 1) * columns)];
                    bodyB = bodies[col + (row * columns)];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));

                    if (crossBrace && col > 0) {
                        bodyC = bodies[(col - 1) + ((row - 1) * columns)];
                        Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                    }

                    if (crossBrace && col < columns - 1) {
                        bodyC = bodies[(col + 1) + ((row - 1) * columns)];
                        Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                    }
                }
            }
        }

        composite.label += ' Mesh';

        return composite;
    };

    /**
     * Create a new composite containing bodies created in the callback in a pyramid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method pyramid
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.pyramid = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
        return Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y, column, row, lastBody, i) {
            var actualRows = Math.min(rows, Math.ceil(columns / 2)),
                lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;

            if (row > actualRows)
                return;

            // reverse row order
            row = actualRows - row;

            var start = row,
                end = columns - 1 - row;

            if (column < start || column > end)
                return;

            // retroactively fix the first body's position, since width was unknown
            if (i === 1) {
                Body.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
            }

            var xOffset = lastBody ? column * lastBodyWidth : 0;

            return callback(xx + xOffset + column * columnGap, y, column, row, lastBody, i);
        });
    };

    /**
     * This has now moved to the [newtonsCradle example](https://github.com/liabru/matter-js/blob/master/examples/newtonsCradle.js), follow that instead as this function is deprecated here.
     * @deprecated moved to newtonsCradle example
     * @method newtonsCradle
     * @param {number} xx
     * @param {number} yy
     * @param {number} number
     * @param {number} size
     * @param {number} length
     * @return {composite} A new composite newtonsCradle body
     */
    Composites.newtonsCradle = function(xx, yy, number, size, length) {
        var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

        for (var i = 0; i < number; i++) {
            var separation = 1.9,
                circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                    { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1 }),
                constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

            Composite.addBody(newtonsCradle, circle);
            Composite.addConstraint(newtonsCradle, constraint);
        }

        return newtonsCradle;
    };

    deprecated(Composites, 'newtonsCradle', 'Composites.newtonsCradle ➤ moved to newtonsCradle example');

    /**
     * This has now moved to the [car example](https://github.com/liabru/matter-js/blob/master/examples/car.js), follow that instead as this function is deprecated here.
     * @deprecated moved to car example
     * @method car
     * @param {number} xx
     * @param {number} yy
     * @param {number} width
     * @param {number} height
     * @param {number} wheelSize
     * @return {composite} A new composite car body
     */
    Composites.car = function(xx, yy, width, height, wheelSize) {
        var group = Body.nextGroup(true),
            wheelBase = 20,
            wheelAOffset = -width * 0.5 + wheelBase,
            wheelBOffset = width * 0.5 - wheelBase,
            wheelYOffset = 0;

        var car = Composite.create({ label: 'Car' }),
            body = Bodies.rectangle(xx, yy, width, height, { 
                collisionFilter: {
                    group: group
                },
                chamfer: {
                    radius: height * 0.5
                },
                density: 0.0002
            });

        var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });

        var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });

        var axelA = Constraint.create({
            bodyB: body,
            pointB: { x: wheelAOffset, y: wheelYOffset },
            bodyA: wheelA,
            stiffness: 1,
            length: 0
        });

        var axelB = Constraint.create({
            bodyB: body,
            pointB: { x: wheelBOffset, y: wheelYOffset },
            bodyA: wheelB,
            stiffness: 1,
            length: 0
        });

        Composite.addBody(car, body);
        Composite.addBody(car, wheelA);
        Composite.addBody(car, wheelB);
        Composite.addConstraint(car, axelA);
        Composite.addConstraint(car, axelB);

        return car;
    };

    deprecated(Composites, 'car', 'Composites.car ➤ moved to car example');

    /**
     * This has now moved to the [softBody example](https://github.com/liabru/matter-js/blob/master/examples/softBody.js)
     * and the [cloth example](https://github.com/liabru/matter-js/blob/master/examples/cloth.js), follow those instead as this function is deprecated here.
     * @deprecated moved to softBody and cloth examples
     * @method softBody
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {boolean} crossBrace
     * @param {number} particleRadius
     * @param {} particleOptions
     * @param {} constraintOptions
     * @return {composite} A new composite softBody
     */
    Composites.softBody = function(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
        particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
        constraintOptions = Common.extend({ stiffness: 0.2, render: { type: 'line', anchors: false } }, constraintOptions);

        var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
            return Bodies.circle(x, y, particleRadius, particleOptions);
        });

        Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);

        softBody.label = 'Soft Body';

        return softBody;
    };

    deprecated(Composites, 'softBody', 'Composites.softBody ➤ moved to softBody and cloth examples');
})();


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
* This module has now been replaced by `Matter.Detector`.
*
* All usage should be migrated to `Matter.Detector` or another alternative.
* For back-compatibility purposes this module will remain for a short term and then later removed in a future release.
*
* The `Matter.Grid` module contains methods for creating and manipulating collision broadphase grid structures.
*
* @class Grid
* @deprecated
*/

var Grid = {};

module.exports = Grid;

var Pair = __webpack_require__(9);
var Common = __webpack_require__(0);
var deprecated = Common.deprecated;

(function() {

    /**
     * Creates a new grid.
     * @deprecated replaced by Matter.Detector
     * @method create
     * @param {} options
     * @return {grid} A new grid
     */
    Grid.create = function(options) {
        var defaults = {
            buckets: {},
            pairs: {},
            pairsList: [],
            bucketWidth: 48,
            bucketHeight: 48
        };

        return Common.extend(defaults, options);
    };

    /**
     * The width of a single grid bucket.
     *
     * @property bucketWidth
     * @type number
     * @default 48
     */

    /**
     * The height of a single grid bucket.
     *
     * @property bucketHeight
     * @type number
     * @default 48
     */

    /**
     * Updates the grid.
     * @deprecated replaced by Matter.Detector
     * @method update
     * @param {grid} grid
     * @param {body[]} bodies
     * @param {engine} engine
     * @param {boolean} forceUpdate
     */
    Grid.update = function(grid, bodies, engine, forceUpdate) {
        var i, col, row,
            world = engine.world,
            buckets = grid.buckets,
            bucket,
            bucketId,
            gridChanged = false;

        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isSleeping && !forceUpdate)
                continue;

            // temporary back compatibility bounds check
            if (world.bounds && (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x
                || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y))
                continue;

            var newRegion = Grid._getRegion(grid, body);

            // if the body has changed grid region
            if (!body.region || newRegion.id !== body.region.id || forceUpdate) {

                if (!body.region || forceUpdate)
                    body.region = newRegion;

                var union = Grid._regionUnion(newRegion, body.region);

                // update grid buckets affected by region change
                // iterate over the union of both regions
                for (col = union.startCol; col <= union.endCol; col++) {
                    for (row = union.startRow; row <= union.endRow; row++) {
                        bucketId = Grid._getBucketId(col, row);
                        bucket = buckets[bucketId];

                        var isInsideNewRegion = (col >= newRegion.startCol && col <= newRegion.endCol
                                                && row >= newRegion.startRow && row <= newRegion.endRow);

                        var isInsideOldRegion = (col >= body.region.startCol && col <= body.region.endCol
                                                && row >= body.region.startRow && row <= body.region.endRow);

                        // remove from old region buckets
                        if (!isInsideNewRegion && isInsideOldRegion) {
                            if (isInsideOldRegion) {
                                if (bucket)
                                    Grid._bucketRemoveBody(grid, bucket, body);
                            }
                        }

                        // add to new region buckets
                        if (body.region === newRegion || (isInsideNewRegion && !isInsideOldRegion) || forceUpdate) {
                            if (!bucket)
                                bucket = Grid._createBucket(buckets, bucketId);
                            Grid._bucketAddBody(grid, bucket, body);
                        }
                    }
                }

                // set the new region
                body.region = newRegion;

                // flag changes so we can update pairs
                gridChanged = true;
            }
        }

        // update pairs list only if pairs changed (i.e. a body changed region)
        if (gridChanged)
            grid.pairsList = Grid._createActivePairsList(grid);
    };

    deprecated(Grid, 'update', 'Grid.update ➤ replaced by Matter.Detector');

    /**
     * Clears the grid.
     * @deprecated replaced by Matter.Detector
     * @method clear
     * @param {grid} grid
     */
    Grid.clear = function(grid) {
        grid.buckets = {};
        grid.pairs = {};
        grid.pairsList = [];
    };

    deprecated(Grid, 'clear', 'Grid.clear ➤ replaced by Matter.Detector');

    /**
     * Finds the union of two regions.
     * @method _regionUnion
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} regionA
     * @param {} regionB
     * @return {} region
     */
    Grid._regionUnion = function(regionA, regionB) {
        var startCol = Math.min(regionA.startCol, regionB.startCol),
            endCol = Math.max(regionA.endCol, regionB.endCol),
            startRow = Math.min(regionA.startRow, regionB.startRow),
            endRow = Math.max(regionA.endRow, regionB.endRow);

        return Grid._createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Gets the region a given body falls in for a given grid.
     * @method _getRegion
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} grid
     * @param {} body
     * @return {} region
     */
    Grid._getRegion = function(grid, body) {
        var bounds = body.bounds,
            startCol = Math.floor(bounds.min.x / grid.bucketWidth),
            endCol = Math.floor(bounds.max.x / grid.bucketWidth),
            startRow = Math.floor(bounds.min.y / grid.bucketHeight),
            endRow = Math.floor(bounds.max.y / grid.bucketHeight);

        return Grid._createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Creates a region.
     * @method _createRegion
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} startCol
     * @param {} endCol
     * @param {} startRow
     * @param {} endRow
     * @return {} region
     */
    Grid._createRegion = function(startCol, endCol, startRow, endRow) {
        return { 
            id: startCol + ',' + endCol + ',' + startRow + ',' + endRow,
            startCol: startCol, 
            endCol: endCol, 
            startRow: startRow, 
            endRow: endRow 
        };
    };

    /**
     * Gets the bucket id at the given position.
     * @method _getBucketId
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} column
     * @param {} row
     * @return {string} bucket id
     */
    Grid._getBucketId = function(column, row) {
        return 'C' + column + 'R' + row;
    };

    /**
     * Creates a bucket.
     * @method _createBucket
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} buckets
     * @param {} bucketId
     * @return {} bucket
     */
    Grid._createBucket = function(buckets, bucketId) {
        var bucket = buckets[bucketId] = [];
        return bucket;
    };

    /**
     * Adds a body to a bucket.
     * @method _bucketAddBody
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    Grid._bucketAddBody = function(grid, bucket, body) {
        var gridPairs = grid.pairs,
            pairId = Pair.id,
            bucketLength = bucket.length,
            i;

        // add new pairs
        for (i = 0; i < bucketLength; i++) {
            var bodyB = bucket[i];

            if (body.id === bodyB.id || (body.isStatic && bodyB.isStatic))
                continue;

            // keep track of the number of buckets the pair exists in
            // important for Grid.update to work
            var id = pairId(body, bodyB),
                pair = gridPairs[id];

            if (pair) {
                pair[2] += 1;
            } else {
                gridPairs[id] = [body, bodyB, 1];
            }
        }

        // add to bodies (after pairs, otherwise pairs with self)
        bucket.push(body);
    };

    /**
     * Removes a body from a bucket.
     * @method _bucketRemoveBody
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    Grid._bucketRemoveBody = function(grid, bucket, body) {
        var gridPairs = grid.pairs,
            pairId = Pair.id,
            i;

        // remove from bucket
        bucket.splice(Common.indexOf(bucket, body), 1);

        var bucketLength = bucket.length;

        // update pair counts
        for (i = 0; i < bucketLength; i++) {
            // keep track of the number of buckets the pair exists in
            // important for _createActivePairsList to work
            var pair = gridPairs[pairId(body, bucket[i])];

            if (pair)
                pair[2] -= 1;
        }
    };

    /**
     * Generates a list of the active pairs in the grid.
     * @method _createActivePairsList
     * @deprecated replaced by Matter.Detector
     * @private
     * @param {} grid
     * @return [] pairs
     */
    Grid._createActivePairsList = function(grid) {
        var pair,
            gridPairs = grid.pairs,
            pairKeys = Common.keys(gridPairs),
            pairKeysLength = pairKeys.length,
            pairs = [],
            k;

        // iterate over grid.pairs
        for (k = 0; k < pairKeysLength; k++) {
            pair = gridPairs[pairKeys[k]];

            // if pair exists in at least one bucket
            // it is a pair that needs further collision testing so push it
            if (pair[2] > 0) {
                pairs.push(pair);
            } else {
                delete gridPairs[pairKeys[k]];
            }
        }

        return pairs;
    };

})();


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.MouseConstraint` module contains methods for creating mouse constraints.
* Mouse constraints are used for allowing user interaction, providing the ability to move bodies via the mouse or touch.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class MouseConstraint
*/

var MouseConstraint = {};

module.exports = MouseConstraint;

var Vertices = __webpack_require__(3);
var Sleeping = __webpack_require__(7);
var Mouse = __webpack_require__(14);
var Events = __webpack_require__(5);
var Detector = __webpack_require__(13);
var Constraint = __webpack_require__(10);
var Composite = __webpack_require__(6);
var Common = __webpack_require__(0);
var Bounds = __webpack_require__(1);

(function() {

    /**
     * Creates a new mouse constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {engine} engine
     * @param {} options
     * @return {MouseConstraint} A new MouseConstraint
     */
    MouseConstraint.create = function(engine, options) {
        var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);

        if (!mouse) {
            if (engine && engine.render && engine.render.canvas) {
                mouse = Mouse.create(engine.render.canvas);
            } else if (options && options.element) {
                mouse = Mouse.create(options.element);
            } else {
                mouse = Mouse.create();
                Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
            }
        }

        var constraint = Constraint.create({ 
            label: 'Mouse Constraint',
            pointA: mouse.position,
            pointB: { x: 0, y: 0 },
            length: 0.01, 
            stiffness: 0.1,
            angularStiffness: 1,
            render: {
                strokeStyle: '#90EE90',
                lineWidth: 3
            }
        });

        var defaults = {
            type: 'mouseConstraint',
            mouse: mouse,
            element: null,
            body: null,
            constraint: constraint,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            }
        };

        var mouseConstraint = Common.extend(defaults, options);

        Events.on(engine, 'beforeUpdate', function() {
            var allBodies = Composite.allBodies(engine.world);
            MouseConstraint.update(mouseConstraint, allBodies);
            MouseConstraint._triggerEvents(mouseConstraint);
        });

        return mouseConstraint;
    };

    /**
     * Updates the given mouse constraint.
     * @private
     * @method update
     * @param {MouseConstraint} mouseConstraint
     * @param {body[]} bodies
     */
    MouseConstraint.update = function(mouseConstraint, bodies) {
        var mouse = mouseConstraint.mouse,
            constraint = mouseConstraint.constraint,
            body = mouseConstraint.body;

        if (mouse.button === 0) {
            if (!constraint.bodyB) {
                for (var i = 0; i < bodies.length; i++) {
                    body = bodies[i];
                    if (Bounds.contains(body.bounds, mouse.position) 
                            && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                        for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                            var part = body.parts[j];
                            if (Vertices.contains(part.vertices, mouse.position)) {
                                constraint.pointA = mouse.position;
                                constraint.bodyB = mouseConstraint.body = body;
                                constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                                constraint.angleB = body.angle;

                                Sleeping.set(body, false);
                                Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });

                                break;
                            }
                        }
                    }
                }
            } else {
                Sleeping.set(constraint.bodyB, false);
                constraint.pointA = mouse.position;
            }
        } else {
            constraint.bodyB = mouseConstraint.body = null;
            constraint.pointB = null;

            if (body)
                Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
        }
    };

    /**
     * Triggers mouse constraint events.
     * @method _triggerEvents
     * @private
     * @param {mouse} mouseConstraint
     */
    MouseConstraint._triggerEvents = function(mouseConstraint) {
        var mouse = mouseConstraint.mouse,
            mouseEvents = mouse.sourceEvents;

        if (mouseEvents.mousemove)
            Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });

        if (mouseEvents.mousedown)
            Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });

        if (mouseEvents.mouseup)
            Events.trigger(mouseConstraint, 'mouseup', { mouse: mouse });

        // reset the mouse state ready for the next step
        Mouse.clearSourceEvents(mouse);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when the mouse has moved (or a touch moves) during the last step
    *
    * @event mousemove
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the mouse is down (or a touch has started) during the last step
    *
    * @event mousedown
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the mouse is up (or a touch has ended) during the last step
    *
    * @event mouseup
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the user starts dragging a body
    *
    * @event startdrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the user ends dragging a body
    *
    * @event enddrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body that has stopped being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     */

    /**
     * The `Mouse` instance in use. If not supplied in `MouseConstraint.create`, one will be created.
     *
     * @property mouse
     * @type mouse
     * @default mouse
     */

    /**
     * The `Body` that is currently being moved by the user, or `null` if no body.
     *
     * @property body
     * @type body
     * @default null
     */

    /**
     * The `Constraint` object that is used to move the body during interaction.
     *
     * @property constraint
     * @type constraint
     */

    /**
     * An `Object` that specifies the collision filter properties.
     * The collision filter allows the user to define which types of body this mouse constraint can interact with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter
     * @type object
     */

})();


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Query` module contains methods for performing collision queries.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Query
*/

var Query = {};

module.exports = Query;

var Vector = __webpack_require__(2);
var Collision = __webpack_require__(8);
var Bounds = __webpack_require__(1);
var Bodies = __webpack_require__(12);
var Vertices = __webpack_require__(3);

(function() {

    /**
     * Returns a list of collisions between `body` and `bodies`.
     * @method collides
     * @param {body} body
     * @param {body[]} bodies
     * @return {collision[]} Collisions
     */
    Query.collides = function(body, bodies) {
        var collisions = [],
            bodiesLength = bodies.length,
            bounds = body.bounds,
            collides = Collision.collides,
            overlaps = Bounds.overlaps;

        for (var i = 0; i < bodiesLength; i++) {
            var bodyA = bodies[i],
                partsALength = bodyA.parts.length,
                partsAStart = partsALength === 1 ? 0 : 1;

            if (overlaps(bodyA.bounds, bounds)) {
                for (var j = partsAStart; j < partsALength; j++) {
                    var part = bodyA.parts[j];

                    if (overlaps(part.bounds, bounds)) {
                        var collision = collides(part, body);

                        if (collision) {
                            collisions.push(collision);
                            break;
                        }
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
     * @method ray
     * @param {body[]} bodies
     * @param {vector} startPoint
     * @param {vector} endPoint
     * @param {number} [rayWidth]
     * @return {collision[]} Collisions
     */
    Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
        rayWidth = rayWidth || 1e-100;

        var rayAngle = Vector.angle(startPoint, endPoint),
            rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)),
            rayX = (endPoint.x + startPoint.x) * 0.5,
            rayY = (endPoint.y + startPoint.y) * 0.5,
            ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }),
            collisions = Query.collides(ray, bodies);

        for (var i = 0; i < collisions.length; i += 1) {
            var collision = collisions[i];
            collision.body = collision.bodyB = collision.bodyA;            
        }

        return collisions;
    };

    /**
     * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
     * @method region
     * @param {body[]} bodies
     * @param {bounds} bounds
     * @param {bool} [outside=false]
     * @return {body[]} The bodies matching the query
     */
    Query.region = function(bodies, bounds, outside) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                overlaps = Bounds.overlaps(body.bounds, bounds);
            if ((overlaps && !outside) || (!overlaps && outside))
                result.push(body);
        }

        return result;
    };

    /**
     * Returns all bodies whose vertices contain the given point, from the given set of bodies.
     * @method point
     * @param {body[]} bodies
     * @param {vector} point
     * @return {body[]} The bodies matching the query
     */
    Query.point = function(bodies, point) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (Bounds.contains(body.bounds, point)) {
                for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                    var part = body.parts[j];

                    if (Bounds.contains(part.bounds, point)
                        && Vertices.contains(part.vertices, point)) {
                        result.push(body);
                        break;
                    }
                }
            }
        }

        return result;
    };

})();


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Render` module is a simple canvas based renderer for visualising instances of `Matter.Engine`.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* It includes a number of drawing options including wireframe, vector with support for sprites and viewports.
*
* @class Render
*/

var Render = {};

module.exports = Render;

var Body = __webpack_require__(4);
var Common = __webpack_require__(0);
var Composite = __webpack_require__(6);
var Bounds = __webpack_require__(1);
var Events = __webpack_require__(5);
var Vector = __webpack_require__(2);
var Mouse = __webpack_require__(14);

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
                                      || function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };

        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }

    Render._goodFps = 30;
    Render._goodDelta = 1000 / 60;

    /**
     * Creates a new renderer. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {render} A new renderer
     */
    Render.create = function(options) {
        var defaults = {
            engine: null,
            element: null,
            canvas: null,
            mouse: null,
            frameRequestId: null,
            timing: {
                historySize: 60,
                delta: 0,
                deltaHistory: [],
                lastTime: 0,
                lastTimestamp: 0,
                lastElapsed: 0,
                timestampElapsed: 0,
                timestampElapsedHistory: [],
                engineDeltaHistory: [],
                engineElapsedHistory: [],
                elapsedHistory: []
            },
            options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: '#14151f',
                wireframeBackground: '#14151f',
                hasBounds: !!options.bounds,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showStats: false,
                showPerformance: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false,
                showMousePosition: false
            }
        };

        var render = Common.extend(defaults, options);

        if (render.canvas) {
            render.canvas.width = render.options.width || render.canvas.width;
            render.canvas.height = render.options.height || render.canvas.height;
        }

        render.mouse = options.mouse;
        render.engine = options.engine;
        render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
        render.context = render.canvas.getContext('2d');
        render.textures = {};

        render.bounds = render.bounds || {
            min: {
                x: 0,
                y: 0
            },
            max: {
                x: render.canvas.width,
                y: render.canvas.height
            }
        };

        // for temporary back compatibility only
        render.controller = Render;
        render.options.showBroadphase = false;

        if (render.options.pixelRatio !== 1) {
            Render.setPixelRatio(render, render.options.pixelRatio);
        }

        if (Common.isElement(render.element)) {
            render.element.appendChild(render.canvas);
        }

        return render;
    };

    /**
     * Continuously updates the render canvas on the `requestAnimationFrame` event.
     * @method run
     * @param {render} render
     */
    Render.run = function(render) {
        (function loop(time){
            render.frameRequestId = _requestAnimationFrame(loop);

            _updateTiming(render, time);

            Render.world(render, time);

            if (render.options.showStats || render.options.showDebug) {
                Render.stats(render, render.context, time);
            }

            if (render.options.showPerformance || render.options.showDebug) {
                Render.performance(render, render.context, time);
            }
        })();
    };

    /**
     * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
     * @method stop
     * @param {render} render
     */
    Render.stop = function(render) {
        _cancelAnimationFrame(render.frameRequestId);
    };

    /**
     * Sets the pixel ratio of the renderer and updates the canvas.
     * To automatically detect the correct ratio, pass the string `'auto'` for `pixelRatio`.
     * @method setPixelRatio
     * @param {render} render
     * @param {number} pixelRatio
     */
    Render.setPixelRatio = function(render, pixelRatio) {
        var options = render.options,
            canvas = render.canvas;

        if (pixelRatio === 'auto') {
            pixelRatio = _getPixelRatio(canvas);
        }

        options.pixelRatio = pixelRatio;
        canvas.setAttribute('data-pixel-ratio', pixelRatio);
        canvas.width = options.width * pixelRatio;
        canvas.height = options.height * pixelRatio;
        canvas.style.width = options.width + 'px';
        canvas.style.height = options.height + 'px';
    };

    /**
     * Positions and sizes the viewport around the given object bounds.
     * Objects must have at least one of the following properties:
     * - `object.bounds`
     * - `object.position`
     * - `object.min` and `object.max`
     * - `object.x` and `object.y`
     * @method lookAt
     * @param {render} render
     * @param {object[]} objects
     * @param {vector} [padding]
     * @param {bool} [center=true]
     */
    Render.lookAt = function(render, objects, padding, center) {
        center = typeof center !== 'undefined' ? center : true;
        objects = Common.isArray(objects) ? objects : [objects];
        padding = padding || {
            x: 0,
            y: 0
        };

        // find bounds of all objects
        var bounds = {
            min: { x: Infinity, y: Infinity },
            max: { x: -Infinity, y: -Infinity }
        };

        for (var i = 0; i < objects.length; i += 1) {
            var object = objects[i],
                min = object.bounds ? object.bounds.min : (object.min || object.position || object),
                max = object.bounds ? object.bounds.max : (object.max || object.position || object);

            if (min && max) {
                if (min.x < bounds.min.x)
                    bounds.min.x = min.x;

                if (max.x > bounds.max.x)
                    bounds.max.x = max.x;

                if (min.y < bounds.min.y)
                    bounds.min.y = min.y;

                if (max.y > bounds.max.y)
                    bounds.max.y = max.y;
            }
        }

        // find ratios
        var width = (bounds.max.x - bounds.min.x) + 2 * padding.x,
            height = (bounds.max.y - bounds.min.y) + 2 * padding.y,
            viewHeight = render.canvas.height,
            viewWidth = render.canvas.width,
            outerRatio = viewWidth / viewHeight,
            innerRatio = width / height,
            scaleX = 1,
            scaleY = 1;

        // find scale factor
        if (innerRatio > outerRatio) {
            scaleY = innerRatio / outerRatio;
        } else {
            scaleX = outerRatio / innerRatio;
        }

        // enable bounds
        render.options.hasBounds = true;

        // position and size
        render.bounds.min.x = bounds.min.x;
        render.bounds.max.x = bounds.min.x + width * scaleX;
        render.bounds.min.y = bounds.min.y;
        render.bounds.max.y = bounds.min.y + height * scaleY;

        // center
        if (center) {
            render.bounds.min.x += width * 0.5 - (width * scaleX) * 0.5;
            render.bounds.max.x += width * 0.5 - (width * scaleX) * 0.5;
            render.bounds.min.y += height * 0.5 - (height * scaleY) * 0.5;
            render.bounds.max.y += height * 0.5 - (height * scaleY) * 0.5;
        }

        // padding
        render.bounds.min.x -= padding.x;
        render.bounds.max.x -= padding.x;
        render.bounds.min.y -= padding.y;
        render.bounds.max.y -= padding.y;

        // update mouse
        if (render.mouse) {
            Mouse.setScale(render.mouse, {
                x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
            });

            Mouse.setOffset(render.mouse, render.bounds.min);
        }
    };

    /**
     * Applies viewport transforms based on `render.bounds` to a render context.
     * @method startViewTransform
     * @param {render} render
     */
    Render.startViewTransform = function(render) {
        var boundsWidth = render.bounds.max.x - render.bounds.min.x,
            boundsHeight = render.bounds.max.y - render.bounds.min.y,
            boundsScaleX = boundsWidth / render.options.width,
            boundsScaleY = boundsHeight / render.options.height;

        render.context.setTransform(
            render.options.pixelRatio / boundsScaleX, 0, 0, 
            render.options.pixelRatio / boundsScaleY, 0, 0
        );

        render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
    };

    /**
     * Resets all transforms on the render context.
     * @method endViewTransform
     * @param {render} render
     */
    Render.endViewTransform = function(render) {
        render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
    };

    /**
     * Renders the given `engine`'s `Matter.World` object.
     * This is the entry point for all rendering and should be called every time the scene changes.
     * @method world
     * @param {render} render
     */
    Render.world = function(render, time) {
        var startTime = Common.now(),
            engine = render.engine,
            world = engine.world,
            canvas = render.canvas,
            context = render.context,
            options = render.options,
            timing = render.timing;

        var allBodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world),
            background = options.wireframes ? options.wireframeBackground : options.background,
            bodies = [],
            constraints = [],
            i;

        var event = {
            timestamp: engine.timing.timestamp
        };

        Events.trigger(render, 'beforeRender', event);

        // apply background if it has changed
        if (render.currentBackground !== background)
            _applyBackground(render, background);

        // clear the canvas with a transparent fill, to allow the canvas background to show
        context.globalCompositeOperation = 'source-in';
        context.fillStyle = "transparent";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'source-over';

        // handle bounds
        if (options.hasBounds) {
            // filter out bodies that are not in view
            for (i = 0; i < allBodies.length; i++) {
                var body = allBodies[i];
                if (Bounds.overlaps(body.bounds, render.bounds))
                    bodies.push(body);
            }

            // filter out constraints that are not in view
            for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i],
                    bodyA = constraint.bodyA,
                    bodyB = constraint.bodyB,
                    pointAWorld = constraint.pointA,
                    pointBWorld = constraint.pointB;

                if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);

                if (!pointAWorld || !pointBWorld)
                    continue;

                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                    constraints.push(constraint);
            }

            // transform the view
            Render.startViewTransform(render);

            // update mouse
            if (render.mouse) {
                Mouse.setScale(render.mouse, {
                    x: (render.bounds.max.x - render.bounds.min.x) / render.options.width,
                    y: (render.bounds.max.y - render.bounds.min.y) / render.options.height
                });

                Mouse.setOffset(render.mouse, render.bounds.min);
            }
        } else {
            constraints = allConstraints;
            bodies = allBodies;

            if (render.options.pixelRatio !== 1) {
                render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
            }
        }

        if (!options.wireframes || (engine.enableSleeping && options.showSleeping)) {
            // fully featured rendering of bodies
            Render.bodies(render, bodies, context);
        } else {
            if (options.showConvexHulls)
                Render.bodyConvexHulls(render, bodies, context);

            // optimised method for wireframes only
            Render.bodyWireframes(render, bodies, context);
        }

        if (options.showBounds)
            Render.bodyBounds(render, bodies, context);

        if (options.showAxes || options.showAngleIndicator)
            Render.bodyAxes(render, bodies, context);

        if (options.showPositions)
            Render.bodyPositions(render, bodies, context);

        if (options.showVelocity)
            Render.bodyVelocity(render, bodies, context);

        if (options.showIds)
            Render.bodyIds(render, bodies, context);

        if (options.showSeparations)
            Render.separations(render, engine.pairs.list, context);

        if (options.showCollisions)
            Render.collisions(render, engine.pairs.list, context);

        if (options.showVertexNumbers)
            Render.vertexNumbers(render, bodies, context);

        if (options.showMousePosition)
            Render.mousePosition(render, render.mouse, context);

        Render.constraints(constraints, context);

        if (options.hasBounds) {
            // revert view transforms
            Render.endViewTransform(render);
        }

        Events.trigger(render, 'afterRender', event);

        // log the time elapsed computing this update
        timing.lastElapsed = Common.now() - startTime;
    };

    /**
     * Renders statistics about the engine and world useful for debugging.
     * @private
     * @method stats
     * @param {render} render
     * @param {RenderingContext} context
     * @param {Number} time
     */
    Render.stats = function(render, context, time) {
        var engine = render.engine,
            world = engine.world,
            bodies = Composite.allBodies(world),
            parts = 0,
            width = 55,
            height = 44,
            x = 0,
            y = 0;

        // count parts
        for (var i = 0; i < bodies.length; i += 1) {
            parts += bodies[i].parts.length;
        }

        // sections
        var sections = {
            'Part': parts,
            'Body': bodies.length,
            'Cons': Composite.allConstraints(world).length,
            'Comp': Composite.allComposites(world).length,
            'Pair': engine.pairs.list.length
        };

        // background
        context.fillStyle = '#0e0f19';
        context.fillRect(x, y, width * 5.5, height);

        context.font = '12px Arial';
        context.textBaseline = 'top';
        context.textAlign = 'right';

        // sections
        for (var key in sections) {
            var section = sections[key];
            // label
            context.fillStyle = '#aaa';
            context.fillText(key, x + width, y + 8);

            // value
            context.fillStyle = '#eee';
            context.fillText(section, x + width, y + 26);

            x += width;
        }
    };

    /**
     * Renders engine and render performance information.
     * @private
     * @method performance
     * @param {render} render
     * @param {RenderingContext} context
     */
    Render.performance = function(render, context) {
        var engine = render.engine,
            timing = render.timing,
            deltaHistory = timing.deltaHistory,
            elapsedHistory = timing.elapsedHistory,
            timestampElapsedHistory = timing.timestampElapsedHistory,
            engineDeltaHistory = timing.engineDeltaHistory,
            engineElapsedHistory = timing.engineElapsedHistory,
            lastEngineDelta = engine.timing.lastDelta;

        var deltaMean = _mean(deltaHistory),
            elapsedMean = _mean(elapsedHistory),
            engineDeltaMean = _mean(engineDeltaHistory),
            engineElapsedMean = _mean(engineElapsedHistory),
            timestampElapsedMean = _mean(timestampElapsedHistory),
            rateMean = (timestampElapsedMean / deltaMean) || 0,
            fps = (1000 / deltaMean) || 0;

        var graphHeight = 4,
            gap = 12,
            width = 60,
            height = 34,
            x = 10,
            y = 69;

        // background
        context.fillStyle = '#0e0f19';
        context.fillRect(0, 50, gap * 4 + width * 5 + 22, height);

        // show FPS
        Render.status(
            context, x, y, width, graphHeight, deltaHistory.length, 
            Math.round(fps) + ' fps', 
            fps / Render._goodFps,
            function(i) { return (deltaHistory[i] / deltaMean) - 1; }
        );

        // show engine delta
        Render.status(
            context, x + gap + width, y, width, graphHeight, engineDeltaHistory.length,
            lastEngineDelta.toFixed(2) + ' dt', 
            Render._goodDelta / lastEngineDelta,
            function(i) { return (engineDeltaHistory[i] / engineDeltaMean) - 1; }
        );

        // show engine update time
        Render.status(
            context, x + (gap + width) * 2, y, width, graphHeight, engineElapsedHistory.length,
            engineElapsedMean.toFixed(2) + ' ut', 
            1 - (engineElapsedMean / Render._goodFps),
            function(i) { return (engineElapsedHistory[i] / engineElapsedMean) - 1; }
        );

        // show render time
        Render.status(
            context, x + (gap + width) * 3, y, width, graphHeight, elapsedHistory.length,
            elapsedMean.toFixed(2) + ' rt', 
            1 - (elapsedMean / Render._goodFps),
            function(i) { return (elapsedHistory[i] / elapsedMean) - 1; }
        );

        // show effective speed
        Render.status(
            context, x + (gap + width) * 4, y, width, graphHeight, timestampElapsedHistory.length, 
            rateMean.toFixed(2) + ' x', 
            rateMean * rateMean * rateMean,
            function(i) { return (((timestampElapsedHistory[i] / deltaHistory[i]) / rateMean) || 0) - 1; }
        );
    };

    /**
     * Renders a label, indicator and a chart.
     * @private
     * @method status
     * @param {RenderingContext} context
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} count
     * @param {string} label
     * @param {string} indicator
     * @param {function} plotY
     */
    Render.status = function(context, x, y, width, height, count, label, indicator, plotY) {
        // background
        context.strokeStyle = '#888';
        context.fillStyle = '#444';
        context.lineWidth = 1;
        context.fillRect(x, y + 7, width, 1);

        // chart
        context.beginPath();
        context.moveTo(x, y + 7 - height * Common.clamp(0.4 * plotY(0), -2, 2));
        for (var i = 0; i < width; i += 1) {
            context.lineTo(x + i, y + 7 - (i < count ? height * Common.clamp(0.4 * plotY(i), -2, 2) : 0));
        }
        context.stroke();

        // indicator
        context.fillStyle = 'hsl(' + Common.clamp(25 + 95 * indicator, 0, 120) + ',100%,60%)';
        context.fillRect(x, y - 7, 4, 4);

        // label
        context.font = '12px Arial';
        context.textBaseline = 'middle';
        context.textAlign = 'right';
        context.fillStyle = '#eee';
        context.fillText(label, x + width, y - 5);
    };

    /**
     * Description
     * @private
     * @method constraints
     * @param {constraint[]} constraints
     * @param {RenderingContext} context
     */
    Render.constraints = function(constraints, context) {
        var c = context;

        for (var i = 0; i < constraints.length; i++) {
            var constraint = constraints[i];

            if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                continue;

            var bodyA = constraint.bodyA,
                bodyB = constraint.bodyB,
                start,
                end;

            if (bodyA) {
                start = Vector.add(bodyA.position, constraint.pointA);
            } else {
                start = constraint.pointA;
            }

            if (constraint.render.type === 'pin') {
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.closePath();
            } else {
                if (bodyB) {
                    end = Vector.add(bodyB.position, constraint.pointB);
                } else {
                    end = constraint.pointB;
                }

                c.beginPath();
                c.moveTo(start.x, start.y);

                if (constraint.render.type === 'spring') {
                    var delta = Vector.sub(end, start),
                        normal = Vector.perp(Vector.normalise(delta)),
                        coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)),
                        offset;

                    for (var j = 1; j < coils; j += 1) {
                        offset = j % 2 === 0 ? 1 : -1;

                        c.lineTo(
                            start.x + delta.x * (j / coils) + normal.x * offset * 4,
                            start.y + delta.y * (j / coils) + normal.y * offset * 4
                        );
                    }
                }

                c.lineTo(end.x, end.y);
            }

            if (constraint.render.lineWidth) {
                c.lineWidth = constraint.render.lineWidth;
                c.strokeStyle = constraint.render.strokeStyle;
                c.stroke();
            }

            if (constraint.render.anchors) {
                c.fillStyle = constraint.render.strokeStyle;
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
                c.closePath();
                c.fill();
            }
        }
    };

    /**
     * Description
     * @private
     * @method bodies
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodies = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            showInternalEdges = options.showInternalEdges || !options.wireframes,
            body,
            part,
            i,
            k;

        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];

                if (!part.render.visible)
                    continue;

                if (options.showSleeping && body.isSleeping) {
                    c.globalAlpha = 0.5 * part.render.opacity;
                } else if (part.render.opacity !== 1) {
                    c.globalAlpha = part.render.opacity;
                }

                if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                    // part sprite
                    var sprite = part.render.sprite,
                        texture = _getTexture(render, sprite.texture);

                    c.translate(part.position.x, part.position.y);
                    c.rotate(part.angle);

                    c.drawImage(
                        texture,
                        texture.width * -sprite.xOffset * sprite.xScale,
                        texture.height * -sprite.yOffset * sprite.yScale,
                        texture.width * sprite.xScale,
                        texture.height * sprite.yScale
                    );

                    // revert translation, hopefully faster than save / restore
                    c.rotate(-part.angle);
                    c.translate(-part.position.x, -part.position.y);
                } else {
                    // part polygon
                    if (part.circleRadius) {
                        c.beginPath();
                        c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                    } else {
                        c.beginPath();
                        c.moveTo(part.vertices[0].x, part.vertices[0].y);

                        for (var j = 1; j < part.vertices.length; j++) {
                            if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                                c.lineTo(part.vertices[j].x, part.vertices[j].y);
                            } else {
                                c.moveTo(part.vertices[j].x, part.vertices[j].y);
                            }

                            if (part.vertices[j].isInternal && !showInternalEdges) {
                                c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                            }
                        }

                        c.lineTo(part.vertices[0].x, part.vertices[0].y);
                        c.closePath();
                    }

                    if (!options.wireframes) {
                        c.fillStyle = part.render.fillStyle;

                        if (part.render.lineWidth) {
                            c.lineWidth = part.render.lineWidth;
                            c.strokeStyle = part.render.strokeStyle;
                            c.stroke();
                        }

                        c.fill();
                    } else {
                        c.lineWidth = 1;
                        c.strokeStyle = '#bbb';
                        c.stroke();
                    }
                }

                c.globalAlpha = 1;
            }
        }
    };

    /**
     * Optimised method for drawing body wireframes in one pass
     * @private
     * @method bodyWireframes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyWireframes = function(render, bodies, context) {
        var c = context,
            showInternalEdges = render.options.showInternalEdges,
            body,
            part,
            i,
            j,
            k;

        c.beginPath();

        // render all bodies
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];

                c.moveTo(part.vertices[0].x, part.vertices[0].y);

                for (j = 1; j < part.vertices.length; j++) {
                    if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                    } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                    }

                    if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                    }
                }

                c.lineTo(part.vertices[0].x, part.vertices[0].y);
            }
        }

        c.lineWidth = 1;
        c.strokeStyle = '#bbb';
        c.stroke();
    };

    /**
     * Optimised method for drawing body convex hull wireframes in one pass
     * @private
     * @method bodyConvexHulls
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyConvexHulls = function(render, bodies, context) {
        var c = context,
            body,
            part,
            i,
            j,
            k;

        c.beginPath();

        // render convex hulls
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible || body.parts.length === 1)
                continue;

            c.moveTo(body.vertices[0].x, body.vertices[0].y);

            for (j = 1; j < body.vertices.length; j++) {
                c.lineTo(body.vertices[j].x, body.vertices[j].y);
            }

            c.lineTo(body.vertices[0].x, body.vertices[0].y);
        }

        c.lineWidth = 1;
        c.strokeStyle = 'rgba(255,255,255,0.2)';
        c.stroke();
    };

    /**
     * Renders body vertex numbers.
     * @private
     * @method vertexNumbers
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.vertexNumbers = function(render, bodies, context) {
        var c = context,
            i,
            j,
            k;

        for (i = 0; i < bodies.length; i++) {
            var parts = bodies[i].parts;
            for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                var part = parts[k];
                for (j = 0; j < part.vertices.length; j++) {
                    c.fillStyle = 'rgba(255,255,255,0.2)';
                    c.fillText(i + '_' + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                }
            }
        }
    };

    /**
     * Renders mouse position.
     * @private
     * @method mousePosition
     * @param {render} render
     * @param {mouse} mouse
     * @param {RenderingContext} context
     */
    Render.mousePosition = function(render, mouse, context) {
        var c = context;
        c.fillStyle = 'rgba(255,255,255,0.8)';
        c.fillText(mouse.position.x + '  ' + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
    };

    /**
     * Draws body bounds
     * @private
     * @method bodyBounds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyBounds = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options;

        c.beginPath();

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.render.visible) {
                var parts = bodies[i].parts;
                for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    var part = parts[j];
                    c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                }
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,255,255,0.08)';
        } else {
            c.strokeStyle = 'rgba(0,0,0,0.1)';
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Draws body angle indicators and axes
     * @private
     * @method bodyAxes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyAxes = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            part,
            i,
            j,
            k;

        c.beginPath();

        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                parts = body.parts;

            if (!body.render.visible)
                continue;

            if (options.showAxes) {
                // render all axes
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    part = parts[j];
                    for (k = 0; k < part.axes.length; k++) {
                        var axis = part.axes[k];
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                    }
                }
            } else {
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    part = parts[j];
                    for (k = 0; k < part.axes.length; k++) {
                        // render a single axis indicator
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo((part.vertices[0].x + part.vertices[part.vertices.length-1].x) / 2,
                            (part.vertices[0].y + part.vertices[part.vertices.length-1].y) / 2);
                    }
                }
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'indianred';
            c.lineWidth = 1;
        } else {
            c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            c.globalCompositeOperation = 'overlay';
            c.lineWidth = 2;
        }

        c.stroke();
        c.globalCompositeOperation = 'source-over';
    };

    /**
     * Draws body positions
     * @private
     * @method bodyPositions
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyPositions = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            body,
            part,
            i,
            k;

        c.beginPath();

        // render current positions
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = 0; k < body.parts.length; k++) {
                part = body.parts[k];
                c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                c.closePath();
            }
        }

        if (options.wireframes) {
            c.fillStyle = 'indianred';
        } else {
            c.fillStyle = 'rgba(0,0,0,0.5)';
        }
        c.fill();

        c.beginPath();

        // render previous positions
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];
            if (body.render.visible) {
                c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                c.closePath();
            }
        }

        c.fillStyle = 'rgba(255,165,0,0.8)';
        c.fill();
    };

    /**
     * Draws body velocity
     * @private
     * @method bodyVelocity
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyVelocity = function(render, bodies, context) {
        var c = context;

        c.beginPath();

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (!body.render.visible)
                continue;

            var velocity = Body.getVelocity(body);

            c.moveTo(body.position.x, body.position.y);
            c.lineTo(body.position.x + velocity.x, body.position.y + velocity.y);
        }

        c.lineWidth = 3;
        c.strokeStyle = 'cornflowerblue';
        c.stroke();
    };

    /**
     * Draws body ids
     * @private
     * @method bodyIds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyIds = function(render, bodies, context) {
        var c = context,
            i,
            j;

        for (i = 0; i < bodies.length; i++) {
            if (!bodies[i].render.visible)
                continue;

            var parts = bodies[i].parts;
            for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                var part = parts[j];
                c.font = "12px Arial";
                c.fillStyle = 'rgba(255,255,255,0.5)';
                c.fillText(part.id, part.position.x + 10, part.position.y - 10);
            }
        }
    };

    /**
     * Description
     * @private
     * @method collisions
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */
    Render.collisions = function(render, pairs, context) {
        var c = context,
            options = render.options,
            pair,
            collision,
            corrected,
            bodyA,
            bodyB,
            i,
            j;

        c.beginPath();

        // render collision positions
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;
            for (j = 0; j < pair.activeContacts.length; j++) {
                var contact = pair.activeContacts[j],
                    vertex = contact.vertex;
                c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
            }
        }

        if (options.wireframes) {
            c.fillStyle = 'rgba(255,255,255,0.7)';
        } else {
            c.fillStyle = 'orange';
        }
        c.fill();

        c.beginPath();

        // render collision normals
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;

            if (pair.activeContacts.length > 0) {
                var normalPosX = pair.activeContacts[0].vertex.x,
                    normalPosY = pair.activeContacts[0].vertex.y;

                if (pair.activeContacts.length === 2) {
                    normalPosX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
                    normalPosY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
                }

                if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                    c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                } else {
                    c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                }

                c.lineTo(normalPosX, normalPosY);
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,165,0,0.7)';
        } else {
            c.strokeStyle = 'orange';
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method separations
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */
    Render.separations = function(render, pairs, context) {
        var c = context,
            options = render.options,
            pair,
            collision,
            corrected,
            bodyA,
            bodyB,
            i,
            j;

        c.beginPath();

        // render separations
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;

            var k = 1;

            if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
            if (bodyB.isStatic) k = 0;

            c.moveTo(bodyB.position.x, bodyB.position.y);
            c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);

            k = 1;

            if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
            if (bodyA.isStatic) k = 0;

            c.moveTo(bodyA.position.x, bodyA.position.y);
            c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,165,0,0.5)';
        } else {
            c.strokeStyle = 'orange';
        }
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method inspector
     * @param {inspector} inspector
     * @param {RenderingContext} context
     */
    Render.inspector = function(inspector, context) {
        var engine = inspector.engine,
            selected = inspector.selected,
            render = inspector.render,
            options = render.options,
            bounds;

        if (options.hasBounds) {
            var boundsWidth = render.bounds.max.x - render.bounds.min.x,
                boundsHeight = render.bounds.max.y - render.bounds.min.y,
                boundsScaleX = boundsWidth / render.options.width,
                boundsScaleY = boundsHeight / render.options.height;

            context.scale(1 / boundsScaleX, 1 / boundsScaleY);
            context.translate(-render.bounds.min.x, -render.bounds.min.y);
        }

        for (var i = 0; i < selected.length; i++) {
            var item = selected[i].data;

            context.translate(0.5, 0.5);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,165,0,0.9)';
            context.setLineDash([1,2]);

            switch (item.type) {

            case 'body':

                // render body selections
                bounds = item.bounds;
                context.beginPath();
                context.rect(Math.floor(bounds.min.x - 3), Math.floor(bounds.min.y - 3),
                    Math.floor(bounds.max.x - bounds.min.x + 6), Math.floor(bounds.max.y - bounds.min.y + 6));
                context.closePath();
                context.stroke();

                break;

            case 'constraint':

                // render constraint selections
                var point = item.pointA;
                if (item.bodyA)
                    point = item.pointB;
                context.beginPath();
                context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                context.closePath();
                context.stroke();

                break;

            }

            context.setLineDash([]);
            context.translate(-0.5, -0.5);
        }

        // render selection region
        if (inspector.selectStart !== null) {
            context.translate(0.5, 0.5);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,165,0,0.6)';
            context.fillStyle = 'rgba(255,165,0,0.1)';
            bounds = inspector.selectBounds;
            context.beginPath();
            context.rect(Math.floor(bounds.min.x), Math.floor(bounds.min.y),
                Math.floor(bounds.max.x - bounds.min.x), Math.floor(bounds.max.y - bounds.min.y));
            context.closePath();
            context.stroke();
            context.fill();
            context.translate(-0.5, -0.5);
        }

        if (options.hasBounds)
            context.setTransform(1, 0, 0, 1, 0, 0);
    };

    /**
     * Updates render timing.
     * @method _updateTiming
     * @private
     * @param {render} render
     * @param {number} time
     */
    var _updateTiming = function(render, time) {
        var engine = render.engine,
            timing = render.timing,
            historySize = timing.historySize,
            timestamp = engine.timing.timestamp;

        timing.delta = time - timing.lastTime || Render._goodDelta;
        timing.lastTime = time;

        timing.timestampElapsed = timestamp - timing.lastTimestamp || 0;
        timing.lastTimestamp = timestamp;

        timing.deltaHistory.unshift(timing.delta);
        timing.deltaHistory.length = Math.min(timing.deltaHistory.length, historySize);

        timing.engineDeltaHistory.unshift(engine.timing.lastDelta);
        timing.engineDeltaHistory.length = Math.min(timing.engineDeltaHistory.length, historySize);

        timing.timestampElapsedHistory.unshift(timing.timestampElapsed);
        timing.timestampElapsedHistory.length = Math.min(timing.timestampElapsedHistory.length, historySize);

        timing.engineElapsedHistory.unshift(engine.timing.lastElapsed);
        timing.engineElapsedHistory.length = Math.min(timing.engineElapsedHistory.length, historySize);

        timing.elapsedHistory.unshift(timing.lastElapsed);
        timing.elapsedHistory.length = Math.min(timing.elapsedHistory.length, historySize);
    };

    /**
     * Returns the mean value of the given numbers.
     * @method _mean
     * @private
     * @param {Number[]} values
     * @return {Number} the mean of given values
     */
    var _mean = function(values) {
        var result = 0;
        for (var i = 0; i < values.length; i += 1) {
            result += values[i];
        }
        return (result / values.length) || 0;
    };

    /**
     * @method _createCanvas
     * @private
     * @param {} width
     * @param {} height
     * @return canvas
     */
    var _createCanvas = function(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.oncontextmenu = function() { return false; };
        canvas.onselectstart = function() { return false; };
        return canvas;
    };

    /**
     * Gets the pixel ratio of the canvas.
     * @method _getPixelRatio
     * @private
     * @param {HTMLElement} canvas
     * @return {Number} pixel ratio
     */
    var _getPixelRatio = function(canvas) {
        var context = canvas.getContext('2d'),
            devicePixelRatio = window.devicePixelRatio || 1,
            backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio
                                      || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio
                                      || context.backingStorePixelRatio || 1;

        return devicePixelRatio / backingStorePixelRatio;
    };

    /**
     * Gets the requested texture (an Image) via its path
     * @method _getTexture
     * @private
     * @param {render} render
     * @param {string} imagePath
     * @return {Image} texture
     */
    var _getTexture = function(render, imagePath) {
        var image = render.textures[imagePath];

        if (image)
            return image;

        image = render.textures[imagePath] = new Image();
        image.src = imagePath;

        return image;
    };

    /**
     * Applies the background to the canvas using CSS.
     * @method applyBackground
     * @private
     * @param {render} render
     * @param {string} background
     */
    var _applyBackground = function(render, background) {
        var cssBackground = background;

        if (/(jpg|gif|png)$/.test(background))
            cssBackground = 'url(' + background + ')';

        render.canvas.style.background = cssBackground;
        render.canvas.style.backgroundSize = "contain";
        render.currentBackground = background;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A back-reference to the `Matter.Render` module.
     *
     * @deprecated
     * @property controller
     * @type render
     */

    /**
     * A reference to the `Matter.Engine` instance to be used.
     *
     * @property engine
     * @type engine
     */

    /**
     * A reference to the element where the canvas is to be inserted (if `render.canvas` has not been specified)
     *
     * @property element
     * @type HTMLElement
     * @default null
     */

    /**
     * The canvas element to render to. If not specified, one will be created if `render.element` has been specified.
     *
     * @property canvas
     * @type HTMLCanvasElement
     * @default null
     */

    /**
     * A `Bounds` object that specifies the drawing view region.
     * Rendering will be automatically transformed and scaled to fit within the canvas size (`render.options.width` and `render.options.height`).
     * This allows for creating views that can pan or zoom around the scene.
     * You must also set `render.options.hasBounds` to `true` to enable bounded rendering.
     *
     * @property bounds
     * @type bounds
     */

    /**
     * The 2d rendering context from the `render.canvas` element.
     *
     * @property context
     * @type CanvasRenderingContext2D
     */

    /**
     * The sprite texture cache.
     *
     * @property textures
     * @type {}
     */

    /**
     * The mouse to render if `render.options.showMousePosition` is enabled.
     *
     * @property mouse
     * @type mouse
     * @default null
     */

    /**
     * The configuration options of the renderer.
     *
     * @property options
     * @type {}
     */

    /**
     * The target width in pixels of the `render.canvas` to be created.
     * See also the `options.pixelRatio` property to change render quality.
     *
     * @property options.width
     * @type number
     * @default 800
     */

    /**
     * The target height in pixels of the `render.canvas` to be created.
     * See also the `options.pixelRatio` property to change render quality.
     *
     * @property options.height
     * @type number
     * @default 600
     */

    /**
     * The [pixel ratio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) to use when rendering.
     *
     * @property options.pixelRatio
     * @type number
     * @default 1
     */

    /**
     * A CSS background color string to use when `render.options.wireframes` is disabled.
     * This may be also set to `'transparent'` or equivalent.
     *
     * @property options.background
     * @type string
     * @default '#14151f'
     */

    /**
     * A CSS background color string to use when `render.options.wireframes` is enabled.
     * This may be also set to `'transparent'` or equivalent.
     *
     * @property options.wireframeBackground
     * @type string
     * @default '#14151f'
     */

    /**
     * A flag that specifies if `render.bounds` should be used when rendering.
     *
     * @property options.hasBounds
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable all debug information overlays together.  
     * This includes and has priority over the values of:
     *
     * - `render.options.showStats`
     * - `render.options.showPerformance`
     *
     * @property options.showDebug
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the engine stats info overlay.  
     * From left to right, the values shown are:
     *
     * - body parts total
     * - body total
     * - constraints total
     * - composites total
     * - collision pairs total
     *
     * @property options.showStats
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable performance charts.  
     * From left to right, the values shown are:
     *
     * - average render frequency (e.g. 60 fps)
     * - exact engine delta time used for last update (e.g. 16.66ms)
     * - average engine execution duration (e.g. 5.00ms)
     * - average render execution duration (e.g. 0.40ms)
     * - average effective play speed (e.g. '1.00x' is 'real-time')
     *
     * Each value is recorded over a fixed sample of past frames (60 frames).
     *
     * A chart shown below each value indicates the variance from the average over the sample.
     * The more stable or fixed the value is the flatter the chart will appear.
     *
     * @property options.showPerformance
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable rendering entirely.
     *
     * @property options.enabled
     * @type boolean
     * @default false
     */

    /**
     * A flag to toggle wireframe rendering otherwise solid fill rendering is used.
     *
     * @property options.wireframes
     * @type boolean
     * @default true
     */

    /**
     * A flag to enable or disable sleeping bodies indicators.
     *
     * @property options.showSleeping
     * @type boolean
     * @default true
     */

    /**
     * A flag to enable or disable the debug information overlay.
     *
     * @property options.showDebug
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the collision broadphase debug overlay.
     *
     * @deprecated no longer implemented
     * @property options.showBroadphase
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body bounds debug overlay.
     *
     * @property options.showBounds
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body velocity debug overlay.
     *
     * @property options.showVelocity
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body collisions debug overlay.
     *
     * @property options.showCollisions
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the collision resolver separations debug overlay.
     *
     * @property options.showSeparations
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body axes debug overlay.
     *
     * @property options.showAxes
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body positions debug overlay.
     *
     * @property options.showPositions
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body angle debug overlay.
     *
     * @property options.showAngleIndicator
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body and part ids debug overlay.
     *
     * @property options.showIds
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body vertex numbers debug overlay.
     *
     * @property options.showVertexNumbers
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body convex hulls debug overlay.
     *
     * @property options.showConvexHulls
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the body internal edges debug overlay.
     *
     * @property options.showInternalEdges
     * @type boolean
     * @default false
     */

    /**
     * A flag to enable or disable the mouse position debug overlay.
     *
     * @property options.showMousePosition
     * @type boolean
     * @default false
     */

})();


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Runner` module is an optional utility which provides a game loop, 
* that handles continuously updating a `Matter.Engine` for you within a browser.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* If you are using your own game loop instead, then you do not need the `Matter.Runner` module.
* Instead just call `Engine.update(engine, delta)` in your own loop.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Runner
*/

var Runner = {};

module.exports = Runner;

var Events = __webpack_require__(5);
var Engine = __webpack_require__(17);
var Common = __webpack_require__(0);

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }

    if (!_requestAnimationFrame) {
        var _frameTimeout;

        _requestAnimationFrame = function(callback){ 
            _frameTimeout = setTimeout(function() { 
                callback(Common.now()); 
            }, 1000 / 60);
        };

        _cancelAnimationFrame = function() {
            clearTimeout(_frameTimeout);
        };
    }

    /**
     * Creates a new Runner. The options parameter is an object that specifies any properties you wish to override the defaults.
     * @method create
     * @param {} options
     */
    Runner.create = function(options) {
        var defaults = {
            fps: 60,
            deltaSampleSize: 60,
            counterTimestamp: 0,
            frameCounter: 0,
            deltaHistory: [],
            timePrev: null,
            frameRequestId: null,
            isFixed: false,
            enabled: true
        };

        var runner = Common.extend(defaults, options);

        runner.delta = runner.delta || 1000 / runner.fps;
        runner.deltaMin = runner.deltaMin || 1000 / runner.fps;
        runner.deltaMax = runner.deltaMax || 1000 / (runner.fps * 0.5);
        runner.fps = 1000 / runner.delta;

        return runner;
    };

    /**
     * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
     * @method run
     * @param {engine} engine
     */
    Runner.run = function(runner, engine) {
        // create runner if engine is first argument
        if (typeof runner.positionIterations !== 'undefined') {
            engine = runner;
            runner = Runner.create();
        }

        (function run(time){
            runner.frameRequestId = _requestAnimationFrame(run);

            if (time && runner.enabled) {
                Runner.tick(runner, engine, time);
            }
        })();

        return runner;
    };

    /**
     * A game loop utility that updates the engine and renderer by one step (a 'tick').
     * Features delta smoothing, time correction and fixed or dynamic timing.
     * Consider just `Engine.update(engine, delta)` if you're using your own loop.
     * @method tick
     * @param {runner} runner
     * @param {engine} engine
     * @param {number} time
     */
    Runner.tick = function(runner, engine, time) {
        var timing = engine.timing,
            delta;

        if (runner.isFixed) {
            // fixed timestep
            delta = runner.delta;
        } else {
            // dynamic timestep based on wall clock between calls
            delta = (time - runner.timePrev) || runner.delta;
            runner.timePrev = time;

            // optimistically filter delta over a few frames, to improve stability
            runner.deltaHistory.push(delta);
            runner.deltaHistory = runner.deltaHistory.slice(-runner.deltaSampleSize);
            delta = Math.min.apply(null, runner.deltaHistory);

            // limit delta
            delta = delta < runner.deltaMin ? runner.deltaMin : delta;
            delta = delta > runner.deltaMax ? runner.deltaMax : delta;

            // update engine timing object
            runner.delta = delta;
        }

        // create an event object
        var event = {
            timestamp: timing.timestamp
        };

        Events.trigger(runner, 'beforeTick', event);

        // fps counter
        runner.frameCounter += 1;
        if (time - runner.counterTimestamp >= 1000) {
            runner.fps = runner.frameCounter * ((time - runner.counterTimestamp) / 1000);
            runner.counterTimestamp = time;
            runner.frameCounter = 0;
        }

        Events.trigger(runner, 'tick', event);

        // update
        Events.trigger(runner, 'beforeUpdate', event);

        Engine.update(engine, delta);

        Events.trigger(runner, 'afterUpdate', event);

        Events.trigger(runner, 'afterTick', event);
    };

    /**
     * Ends execution of `Runner.run` on the given `runner`, by canceling the animation frame request event loop.
     * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
     * @method stop
     * @param {runner} runner
     */
    Runner.stop = function(runner) {
        _cancelAnimationFrame(runner.frameRequestId);
    };

    /**
     * Alias for `Runner.run`.
     * @method start
     * @param {runner} runner
     * @param {engine} engine
     */
    Runner.start = function(runner, engine) {
        Runner.run(runner, engine);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired at the start of a tick, before any updates to the engine or timing
    *
    * @event beforeTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine timing updated, but just before update
    *
    * @event tick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired at the end of a tick, after engine update and after rendering
    *
    * @event afterTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired before update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after update
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A flag that specifies whether the runner is running or not.
     *
     * @property enabled
     * @type boolean
     * @default true
     */

    /**
     * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
     * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
     * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
     *
     * @property isFixed
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that specifies the time step between updates in milliseconds.
     * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
     * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
     *
     * @property delta
     * @type number
     * @default 1000 / 60
     */

})();


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
* This module has now been replaced by `Matter.Collision`.
*
* All usage should be migrated to `Matter.Collision`.
* For back-compatibility purposes this module will remain for a short term and then later removed in a future release.
*
* The `Matter.SAT` module contains methods for detecting collisions using the Separating Axis Theorem.
*
* @class SAT
* @deprecated
*/

var SAT = {};

module.exports = SAT;

var Collision = __webpack_require__(8);
var Common = __webpack_require__(0);
var deprecated = Common.deprecated;

(function() {

    /**
     * Detect collision between two bodies using the Separating Axis Theorem.
     * @deprecated replaced by Collision.collides
     * @method collides
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {collision} collision
     */
    SAT.collides = function(bodyA, bodyB) {
        return Collision.collides(bodyA, bodyB);
    };

    deprecated(SAT, 'collides', 'SAT.collides ➤ replaced by Collision.collides');

})();


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Svg` module contains methods for converting SVG images into an array of vector points.
*
* To use this module you also need the SVGPathSeg polyfill: https://github.com/progers/pathseg
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Svg
*/

var Svg = {};

module.exports = Svg;

var Bounds = __webpack_require__(1);
var Common = __webpack_require__(0);

(function() {

    /**
     * Converts an SVG path into an array of vector points.
     * If the input path forms a concave shape, you must decompose the result into convex parts before use.
     * See `Bodies.fromVertices` which provides support for this.
     * Note that this function is not guaranteed to support complex paths (such as those with holes).
     * You must load the `pathseg.js` polyfill on newer browsers.
     * @method pathToVertices
     * @param {SVGPathElement} path
     * @param {Number} [sampleLength=15]
     * @return {Vector[]} points
     */
    Svg.pathToVertices = function(path, sampleLength) {
        if (typeof window !== 'undefined' && !('SVGPathSeg' in window)) {
            Common.warn('Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.');
        }

        // https://github.com/wout/svg.topoly.js/blob/master/svg.topoly.js
        var i, il, total, point, segment, segments, 
            segmentsQueue, lastSegment, 
            lastPoint, segmentIndex, points = [],
            lx, ly, length = 0, x = 0, y = 0;

        sampleLength = sampleLength || 15;

        var addPoint = function(px, py, pathSegType) {
            // all odd-numbered path types are relative except PATHSEG_CLOSEPATH (1)
            var isRelative = pathSegType % 2 === 1 && pathSegType > 1;

            // when the last point doesn't equal the current point add the current point
            if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                if (lastPoint && isRelative) {
                    lx = lastPoint.x;
                    ly = lastPoint.y;
                } else {
                    lx = 0;
                    ly = 0;
                }

                var point = {
                    x: lx + px,
                    y: ly + py
                };

                // set last point
                if (isRelative || !lastPoint) {
                    lastPoint = point;
                }

                points.push(point);

                x = lx + px;
                y = ly + py;
            }
        };

        var addSegmentPoint = function(segment) {
            var segType = segment.pathSegTypeAsLetter.toUpperCase();

            // skip path ends
            if (segType === 'Z') 
                return;

            // map segment to x and y
            switch (segType) {

            case 'M':
            case 'L':
            case 'T':
            case 'C':
            case 'S':
            case 'Q':
                x = segment.x;
                y = segment.y;
                break;
            case 'H':
                x = segment.x;
                break;
            case 'V':
                y = segment.y;
                break;
            }

            addPoint(x, y, segment.pathSegType);
        };

        // ensure path is absolute
        Svg._svgPathToAbsolute(path);

        // get total length
        total = path.getTotalLength();

        // queue segments
        segments = [];
        for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
            segments.push(path.pathSegList.getItem(i));

        segmentsQueue = segments.concat();

        // sample through path
        while (length < total) {
            // get segment at position
            segmentIndex = path.getPathSegAtLength(length);
            segment = segments[segmentIndex];

            // new segment
            if (segment != lastSegment) {
                while (segmentsQueue.length && segmentsQueue[0] != segment)
                    addSegmentPoint(segmentsQueue.shift());

                lastSegment = segment;
            }

            // add points in between when curving
            // TODO: adaptive sampling
            switch (segment.pathSegTypeAsLetter.toUpperCase()) {

            case 'C':
            case 'T':
            case 'S':
            case 'Q':
            case 'A':
                point = path.getPointAtLength(length);
                addPoint(point.x, point.y, 0);
                break;

            }

            // increment by sample value
            length += sampleLength;
        }

        // add remaining segments not passed by sampling
        for (i = 0, il = segmentsQueue.length; i < il; ++i)
            addSegmentPoint(segmentsQueue[i]);

        return points;
    };

    Svg._svgPathToAbsolute = function(path) {
        // http://phrogz.net/convert-svg-path-to-all-absolute-commands
        // Copyright (c) Gavin Kistner
        // http://phrogz.net/js/_ReuseLicense.txt
        // Modifications: tidy formatting and naming
        var x0, y0, x1, y1, x2, y2, segs = path.pathSegList,
            x = 0, y = 0, len = segs.numberOfItems;

        for (var i = 0; i < len; ++i) {
            var seg = segs.getItem(i),
                segType = seg.pathSegTypeAsLetter;

            if (/[MLHVCSQTA]/.test(segType)) {
                if ('x' in seg) x = seg.x;
                if ('y' in seg) y = seg.y;
            } else {
                if ('x1' in seg) x1 = x + seg.x1;
                if ('x2' in seg) x2 = x + seg.x2;
                if ('y1' in seg) y1 = y + seg.y1;
                if ('y2' in seg) y2 = y + seg.y2;
                if ('x' in seg) x += seg.x;
                if ('y' in seg) y += seg.y;

                switch (segType) {

                case 'm':
                    segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                    break;
                case 'l':
                    segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                    break;
                case 'h':
                    segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                    break;
                case 'v':
                    segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                    break;
                case 'c':
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                    break;
                case 's':
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                    break;
                case 'q':
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                    break;
                case 't':
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                    break;
                case 'a':
                    segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                    break;
                case 'z':
                case 'Z':
                    x = x0;
                    y = y0;
                    break;

                }
            }

            if (segType == 'M' || segType == 'm') {
                x0 = x;
                y0 = y;
            }
        }
    };

})();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
* This module has now been replaced by `Matter.Composite`.
*
* All usage should be migrated to the equivalent functions found on `Matter.Composite`.
* For example `World.add(world, body)` now becomes `Composite.add(world, body)`.
*
* The property `world.gravity` has been moved to `engine.gravity`.
*
* For back-compatibility purposes this module will remain as a direct alias to `Matter.Composite` in the short term during migration.
* Eventually this alias module will be marked as deprecated and then later removed in a future release.
*
* @class World
*/

var World = {};

module.exports = World;

var Composite = __webpack_require__(6);
var Common = __webpack_require__(0);

(function() {

    /**
     * See above, aliases for back compatibility only
     */
    World.create = Composite.create;
    World.add = Composite.add;
    World.remove = Composite.remove;
    World.clear = Composite.clear;
    World.addComposite = Composite.addComposite;
    World.addBody = Composite.addBody;
    World.addConstraint = Composite.addConstraint;

})();


/***/ })
/******/ ]);
});

// Path: gpu.js
/**
 * gpu.js
 * http://gpu.rocks/
 *
 * GPU Accelerated JavaScript
 *
 * @version 2.16.0
 * @date Wed Nov 16 2022 15:48:40 GMT-0500 (Eastern Standard Time)
 *
 * @license MIT
 * The MIT License
 *
 * Copyright (c) 2022 gpu.js Team
 *//**
 * gpu.js
 * http://gpu.rocks/
 *
 * GPU Accelerated JavaScript
 *
 * @version 2.16.0
 * @date Wed Nov 16 2022 15:48:37 GMT-0500 (Eastern Standard Time)
 *
 * @license MIT
 * The MIT License
 *
 * Copyright (c) 2022 gpu.js Team
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).GPU=e()}}((function(){return function e(t,n,r){function i(a,o){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!o&&u)return u(a,!0);if(s)return s(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var h=n[a]={exports:{}};t[a][0].call(h.exports,(function(e){return i(t[a][1][e]||e)}),h,h.exports,e,t,n,r)}return n[a].exports}for(var s="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t,n){!function(e,r){"object"==typeof n&&void 0!==t?r(n):r((e=e||self).acorn={})}(this,(function(e){"use strict";var t={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},n="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",r={5:n,"5module":n+" export import",6:n+" const class extends export import super"},i=/^in(stanceof)?$/,s="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿯ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-Ᶎꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭧꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",a="‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿",o=new RegExp("["+s+"]"),u=new RegExp("["+s+a+"]");s=a=null;var l=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,477,28,11,0,9,21,155,22,13,52,76,44,33,24,27,35,30,0,12,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,21,0,33,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,230,43,117,63,32,0,161,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,35,56,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,270,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,689,63,129,74,6,0,67,12,65,1,2,0,29,6135,9,754,9486,286,50,2,18,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,2357,44,11,6,17,0,370,43,1301,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,15,7472,3104,541],h=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,525,10,176,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,4,9,83,11,7,0,161,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,232,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,19306,9,135,4,60,6,26,9,1014,0,2,54,8,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,262,6,10,9,419,13,1495,6,110,6,6,9,792487,239];function c(e,t){for(var n=65536,r=0;r<t.length;r+=2){if((n+=t[r])>e)return!1;if((n+=t[r+1])>=e)return!0}}function p(e,t){return e<65?36===e:e<91||(e<97?95===e:e<123||(e<=65535?e>=170&&o.test(String.fromCharCode(e)):!1!==t&&c(e,l)))}function d(e,t){return e<48?36===e:e<58||!(e<65)&&(e<91||(e<97?95===e:e<123||(e<=65535?e>=170&&u.test(String.fromCharCode(e)):!1!==t&&(c(e,l)||c(e,h)))))}var m=function(e,t){void 0===t&&(t={}),this.label=e,this.keyword=t.keyword,this.beforeExpr=!!t.beforeExpr,this.startsExpr=!!t.startsExpr,this.isLoop=!!t.isLoop,this.isAssign=!!t.isAssign,this.prefix=!!t.prefix,this.postfix=!!t.postfix,this.binop=t.binop||null,this.updateContext=null};function f(e,t){return new m(e,{beforeExpr:!0,binop:t})}var g={beforeExpr:!0},x={startsExpr:!0},y={};function b(e,t){return void 0===t&&(t={}),t.keyword=e,y[e]=new m(e,t)}var T={num:new m("num",x),regexp:new m("regexp",x),string:new m("string",x),name:new m("name",x),eof:new m("eof"),bracketL:new m("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new m("]"),braceL:new m("{",{beforeExpr:!0,startsExpr:!0}),braceR:new m("}"),parenL:new m("(",{beforeExpr:!0,startsExpr:!0}),parenR:new m(")"),comma:new m(",",g),semi:new m(";",g),colon:new m(":",g),dot:new m("."),question:new m("?",g),arrow:new m("=>",g),template:new m("template"),invalidTemplate:new m("invalidTemplate"),ellipsis:new m("...",g),backQuote:new m("`",x),dollarBraceL:new m("${",{beforeExpr:!0,startsExpr:!0}),eq:new m("=",{beforeExpr:!0,isAssign:!0}),assign:new m("_=",{beforeExpr:!0,isAssign:!0}),incDec:new m("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new m("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:f("||",1),logicalAND:f("&&",2),bitwiseOR:f("|",3),bitwiseXOR:f("^",4),bitwiseAND:f("&",5),equality:f("==/!=/===/!==",6),relational:f("</>/<=/>=",7),bitShift:f("<</>>/>>>",8),plusMin:new m("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:f("%",10),star:f("*",10),slash:f("/",10),starstar:new m("**",{beforeExpr:!0}),_break:b("break"),_case:b("case",g),_catch:b("catch"),_continue:b("continue"),_debugger:b("debugger"),_default:b("default",g),_do:b("do",{isLoop:!0,beforeExpr:!0}),_else:b("else",g),_finally:b("finally"),_for:b("for",{isLoop:!0}),_function:b("function",x),_if:b("if"),_return:b("return",g),_switch:b("switch"),_throw:b("throw",g),_try:b("try"),_var:b("var"),_const:b("const"),_while:b("while",{isLoop:!0}),_with:b("with"),_new:b("new",{beforeExpr:!0,startsExpr:!0}),_this:b("this",x),_super:b("super",x),_class:b("class",x),_extends:b("extends",g),_export:b("export"),_import:b("import",x),_null:b("null",x),_true:b("true",x),_false:b("false",x),_in:b("in",{beforeExpr:!0,binop:7}),_instanceof:b("instanceof",{beforeExpr:!0,binop:7}),_typeof:b("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:b("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:b("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},v=/\r\n?|\n|\u2028|\u2029/,S=new RegExp(v.source,"g");function A(e,t){return 10===e||13===e||!t&&(8232===e||8233===e)}var _=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,E=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,w=Object.prototype,k=w.hasOwnProperty,I=w.toString;function D(e,t){return k.call(e,t)}var C=Array.isArray||function(e){return"[object Array]"===I.call(e)};function $(e){return new RegExp("^(?:"+e.replace(/ /g,"|")+")$")}var L=function(e,t){this.line=e,this.column=t};L.prototype.offset=function(e){return new L(this.line,this.column+e)};var R=function(e,t,n){this.start=t,this.end=n,null!==e.sourceFile&&(this.source=e.sourceFile)};function F(e,t){for(var n=1,r=0;;){S.lastIndex=r;var i=S.exec(e);if(!(i&&i.index<t))return new L(n,t-r);++n,r=i.index+i[0].length}}var N={ecmaVersion:10,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:!1,allowHashBang:!1,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1};function V(e){var t={};for(var n in N)t[n]=e&&D(e,n)?e[n]:N[n];if(t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),null==t.allowReserved&&(t.allowReserved=t.ecmaVersion<5),C(t.onToken)){var r=t.onToken;t.onToken=function(e){return r.push(e)}}return C(t.onComment)&&(t.onComment=function(e,t){return function(n,r,i,s,a,o){var u={type:n?"Block":"Line",value:r,start:i,end:s};e.locations&&(u.loc=new R(this,a,o)),e.ranges&&(u.range=[i,s]),t.push(u)}}(t,t.onComment)),t}function M(e,t){return 2|(e?4:0)|(t?8:0)}var O=function(e,n,i){this.options=e=V(e),this.sourceFile=e.sourceFile,this.keywords=$(r[e.ecmaVersion>=6?6:"module"===e.sourceType?"5module":5]);var s="";if(!0!==e.allowReserved){for(var a=e.ecmaVersion;!(s=t[a]);a--);"module"===e.sourceType&&(s+=" await")}this.reservedWords=$(s);var o=(s?s+" ":"")+t.strict;this.reservedWordsStrict=$(o),this.reservedWordsStrictBind=$(o+" "+t.strictBind),this.input=String(n),this.containsEsc=!1,i?(this.pos=i,this.lineStart=this.input.lastIndexOf("\n",i-1)+1,this.curLine=this.input.slice(0,this.lineStart).split(v).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=T.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule="module"===e.sourceType,this.strict=this.inModule||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports={},0===this.pos&&e.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(1),this.regexpState=null},z={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0}};O.prototype.parse=function(){var e=this.options.program||this.startNode();return this.nextToken(),this.parseTopLevel(e)},z.inFunction.get=function(){return(2&this.currentVarScope().flags)>0},z.inGenerator.get=function(){return(8&this.currentVarScope().flags)>0},z.inAsync.get=function(){return(4&this.currentVarScope().flags)>0},z.allowSuper.get=function(){return(64&this.currentThisScope().flags)>0},z.allowDirectSuper.get=function(){return(128&this.currentThisScope().flags)>0},z.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())},O.prototype.inNonArrowFunction=function(){return(2&this.currentThisScope().flags)>0},O.extend=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];for(var n=this,r=0;r<e.length;r++)n=e[r](n);return n},O.parse=function(e,t){return new this(t,e).parse()},O.parseExpressionAt=function(e,t,n){var r=new this(n,e,t);return r.nextToken(),r.parseExpression()},O.tokenizer=function(e,t){return new this(t,e)},Object.defineProperties(O.prototype,z);var P=O.prototype,K=/^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;function G(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1}P.strictDirective=function(e){for(;;){E.lastIndex=e,e+=E.exec(this.input)[0].length;var t=K.exec(this.input.slice(e));if(!t)return!1;if("use strict"===(t[1]||t[2]))return!0;e+=t[0].length,E.lastIndex=e,e+=E.exec(this.input)[0].length,";"===this.input[e]&&e++}},P.eat=function(e){return this.type===e&&(this.next(),!0)},P.isContextual=function(e){return this.type===T.name&&this.value===e&&!this.containsEsc},P.eatContextual=function(e){return!!this.isContextual(e)&&(this.next(),!0)},P.expectContextual=function(e){this.eatContextual(e)||this.unexpected()},P.canInsertSemicolon=function(){return this.type===T.eof||this.type===T.braceR||v.test(this.input.slice(this.lastTokEnd,this.start))},P.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},P.semicolon=function(){this.eat(T.semi)||this.insertSemicolon()||this.unexpected()},P.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0},P.expect=function(e){this.eat(e)||this.unexpected()},P.unexpected=function(e){this.raise(null!=e?e:this.start,"Unexpected token")},P.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var n=t?e.parenthesizedAssign:e.parenthesizedBind;n>-1&&this.raiseRecoverable(n,"Parenthesized pattern")}},P.checkExpressionErrors=function(e,t){if(!e)return!1;var n=e.shorthandAssign,r=e.doubleProto;if(!t)return n>=0||r>=0;n>=0&&this.raise(n,"Shorthand property assignments are valid only in destructuring patterns"),r>=0&&this.raiseRecoverable(r,"Redefinition of __proto__ property")},P.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")},P.isSimpleAssignTarget=function(e){return"ParenthesizedExpression"===e.type?this.isSimpleAssignTarget(e.expression):"Identifier"===e.type||"MemberExpression"===e.type};var U=O.prototype;U.parseTopLevel=function(e){var t={};for(e.body||(e.body=[]);this.type!==T.eof;){var n=this.parseStatement(null,!0,t);e.body.push(n)}if(this.inModule)for(var r=0,i=Object.keys(this.undefinedExports);r<i.length;r+=1){var s=i[r];this.raiseRecoverable(this.undefinedExports[s].start,"Export '"+s+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType,this.finishNode(e,"Program")};var B={kind:"loop"},W={kind:"switch"};U.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;E.lastIndex=this.pos;var t=E.exec(this.input),n=this.pos+t[0].length,r=this.input.charCodeAt(n);if(91===r)return!0;if(e)return!1;if(123===r)return!0;if(p(r,!0)){for(var s=n+1;d(this.input.charCodeAt(s),!0);)++s;var a=this.input.slice(n,s);if(!i.test(a))return!0}return!1},U.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;E.lastIndex=this.pos;var e=E.exec(this.input),t=this.pos+e[0].length;return!(v.test(this.input.slice(this.pos,t))||"function"!==this.input.slice(t,t+8)||t+8!==this.input.length&&d(this.input.charAt(t+8)))},U.parseStatement=function(e,t,n){var r,i=this.type,s=this.startNode();switch(this.isLet(e)&&(i=T._var,r="let"),i){case T._break:case T._continue:return this.parseBreakContinueStatement(s,i.keyword);case T._debugger:return this.parseDebuggerStatement(s);case T._do:return this.parseDoStatement(s);case T._for:return this.parseForStatement(s);case T._function:return e&&(this.strict||"if"!==e&&"label"!==e)&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(s,!1,!e);case T._class:return e&&this.unexpected(),this.parseClass(s,!0);case T._if:return this.parseIfStatement(s);case T._return:return this.parseReturnStatement(s);case T._switch:return this.parseSwitchStatement(s);case T._throw:return this.parseThrowStatement(s);case T._try:return this.parseTryStatement(s);case T._const:case T._var:return r=r||this.value,e&&"var"!==r&&this.unexpected(),this.parseVarStatement(s,r);case T._while:return this.parseWhileStatement(s);case T._with:return this.parseWithStatement(s);case T.braceL:return this.parseBlock(!0,s);case T.semi:return this.parseEmptyStatement(s);case T._export:case T._import:if(this.options.ecmaVersion>10&&i===T._import){E.lastIndex=this.pos;var a=E.exec(this.input),o=this.pos+a[0].length;if(40===this.input.charCodeAt(o))return this.parseExpressionStatement(s,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),i===T._import?this.parseImport(s):this.parseExport(s,n);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(s,!0,!e);var u=this.value,l=this.parseExpression();return i===T.name&&"Identifier"===l.type&&this.eat(T.colon)?this.parseLabeledStatement(s,u,l,e):this.parseExpressionStatement(s,l)}},U.parseBreakContinueStatement=function(e,t){var n="break"===t;this.next(),this.eat(T.semi)||this.insertSemicolon()?e.label=null:this.type!==T.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var r=0;r<this.labels.length;++r){var i=this.labels[r];if(null==e.label||i.name===e.label.name){if(null!=i.kind&&(n||"loop"===i.kind))break;if(e.label&&n)break}}return r===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,n?"BreakStatement":"ContinueStatement")},U.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")},U.parseDoStatement=function(e){return this.next(),this.labels.push(B),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(T._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(T.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")},U.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&(this.inAsync||!this.inFunction&&this.options.allowAwaitOutsideFunction)&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(B),this.enterScope(0),this.expect(T.parenL),this.type===T.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var n=this.isLet();if(this.type===T._var||this.type===T._const||n){var r=this.startNode(),i=n?"let":this.value;return this.next(),this.parseVar(r,!0,i),this.finishNode(r,"VariableDeclaration"),(this.type===T._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&1===r.declarations.length?(this.options.ecmaVersion>=9&&(this.type===T._in?t>-1&&this.unexpected(t):e.await=t>-1),this.parseForIn(e,r)):(t>-1&&this.unexpected(t),this.parseFor(e,r))}var s=new G,a=this.parseExpression(!0,s);return this.type===T._in||this.options.ecmaVersion>=6&&this.isContextual("of")?(this.options.ecmaVersion>=9&&(this.type===T._in?t>-1&&this.unexpected(t):e.await=t>-1),this.toAssignable(a,!1,s),this.checkLVal(a),this.parseForIn(e,a)):(this.checkExpressionErrors(s,!0),t>-1&&this.unexpected(t),this.parseFor(e,a))},U.parseFunctionStatement=function(e,t,n){return this.next(),this.parseFunction(e,H|(n?0:X),!1,t)},U.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(T._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")},U.parseReturnStatement=function(e){return this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(T.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")},U.parseSwitchStatement=function(e){var t;this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(T.braceL),this.labels.push(W),this.enterScope(0);for(var n=!1;this.type!==T.braceR;)if(this.type===T._case||this.type===T._default){var r=this.type===T._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),r?t.test=this.parseExpression():(n&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),n=!0,t.test=null),this.expect(T.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")},U.parseThrowStatement=function(e){return this.next(),v.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var j=[];U.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===T._catch){var t=this.startNode();if(this.next(),this.eat(T.parenL)){t.param=this.parseBindingAtom();var n="Identifier"===t.param.type;this.enterScope(n?32:0),this.checkLVal(t.param,n?4:2),this.expect(T.parenR)}else this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0);t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(T._finally)?this.parseBlock():null,e.handler||e.finalizer||this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")},U.parseVarStatement=function(e,t){return this.next(),this.parseVar(e,!1,t),this.semicolon(),this.finishNode(e,"VariableDeclaration")},U.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(B),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")},U.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")},U.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")},U.parseLabeledStatement=function(e,t,n,r){for(var i=0,s=this.labels;i<s.length;i+=1){s[i].name===t&&this.raise(n.start,"Label '"+t+"' is already declared")}for(var a=this.type.isLoop?"loop":this.type===T._switch?"switch":null,o=this.labels.length-1;o>=0;o--){var u=this.labels[o];if(u.statementStart!==e.start)break;u.statementStart=this.start,u.kind=a}return this.labels.push({name:t,kind:a,statementStart:this.start}),e.body=this.parseStatement(r?-1===r.indexOf("label")?r+"label":r:"label"),this.labels.pop(),e.label=n,this.finishNode(e,"LabeledStatement")},U.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")},U.parseBlock=function(e,t){for(void 0===e&&(e=!0),void 0===t&&(t=this.startNode()),t.body=[],this.expect(T.braceL),e&&this.enterScope(0);!this.eat(T.braceR);){var n=this.parseStatement(null);t.body.push(n)}return e&&this.exitScope(),this.finishNode(t,"BlockStatement")},U.parseFor=function(e,t){return e.init=t,this.expect(T.semi),e.test=this.type===T.semi?null:this.parseExpression(),this.expect(T.semi),e.update=this.type===T.parenR?null:this.parseExpression(),this.expect(T.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")},U.parseForIn=function(e,t){var n=this.type===T._in;return this.next(),"VariableDeclaration"===t.type&&null!=t.declarations[0].init&&(!n||this.options.ecmaVersion<8||this.strict||"var"!==t.kind||"Identifier"!==t.declarations[0].id.type)?this.raise(t.start,(n?"for-in":"for-of")+" loop variable declaration may not have an initializer"):"AssignmentPattern"===t.type&&this.raise(t.start,"Invalid left-hand side in for-loop"),e.left=t,e.right=n?this.parseExpression():this.parseMaybeAssign(),this.expect(T.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,n?"ForInStatement":"ForOfStatement")},U.parseVar=function(e,t,n){for(e.declarations=[],e.kind=n;;){var r=this.startNode();if(this.parseVarId(r,n),this.eat(T.eq)?r.init=this.parseMaybeAssign(t):"const"!==n||this.type===T._in||this.options.ecmaVersion>=6&&this.isContextual("of")?"Identifier"===r.id.type||t&&(this.type===T._in||this.isContextual("of"))?r.init=null:this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):this.unexpected(),e.declarations.push(this.finishNode(r,"VariableDeclarator")),!this.eat(T.comma))break}return e},U.parseVarId=function(e,t){e.id=this.parseBindingAtom(),this.checkLVal(e.id,"var"===t?1:2,!1)};var H=1,X=2;U.parseFunction=function(e,t,n,r){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!r)&&(this.type===T.star&&t&X&&this.unexpected(),e.generator=this.eat(T.star)),this.options.ecmaVersion>=8&&(e.async=!!r),t&H&&(e.id=4&t&&this.type!==T.name?null:this.parseIdent(),!e.id||t&X||this.checkLVal(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?1:2:3));var i=this.yieldPos,s=this.awaitPos,a=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(M(e.async,e.generator)),t&H||(e.id=this.type===T.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,n,!1),this.yieldPos=i,this.awaitPos=s,this.awaitIdentPos=a,this.finishNode(e,t&H?"FunctionDeclaration":"FunctionExpression")},U.parseFunctionParams=function(e){this.expect(T.parenL),e.params=this.parseBindingList(T.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()},U.parseClass=function(e,t){this.next();var n=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var r=this.startNode(),i=!1;for(r.body=[],this.expect(T.braceL);!this.eat(T.braceR);){var s=this.parseClassElement(null!==e.superClass);s&&(r.body.push(s),"MethodDefinition"===s.type&&"constructor"===s.kind&&(i&&this.raise(s.start,"Duplicate constructor in the same class"),i=!0))}return e.body=this.finishNode(r,"ClassBody"),this.strict=n,this.finishNode(e,t?"ClassDeclaration":"ClassExpression")},U.parseClassElement=function(e){var t=this;if(this.eat(T.semi))return null;var n=this.startNode(),r=function(e,r){void 0===r&&(r=!1);var i=t.start,s=t.startLoc;return!!t.eatContextual(e)&&(!(t.type===T.parenL||r&&t.canInsertSemicolon())||(n.key&&t.unexpected(),n.computed=!1,n.key=t.startNodeAt(i,s),n.key.name=e,t.finishNode(n.key,"Identifier"),!1))};n.kind="method",n.static=r("static");var i=this.eat(T.star),s=!1;i||(this.options.ecmaVersion>=8&&r("async",!0)?(s=!0,i=this.options.ecmaVersion>=9&&this.eat(T.star)):r("get")?n.kind="get":r("set")&&(n.kind="set")),n.key||this.parsePropertyName(n);var a=n.key,o=!1;return n.computed||n.static||!("Identifier"===a.type&&"constructor"===a.name||"Literal"===a.type&&"constructor"===a.value)?n.static&&"Identifier"===a.type&&"prototype"===a.name&&this.raise(a.start,"Classes may not have a static property named prototype"):("method"!==n.kind&&this.raise(a.start,"Constructor can't have get/set modifier"),i&&this.raise(a.start,"Constructor can't be a generator"),s&&this.raise(a.start,"Constructor can't be an async method"),n.kind="constructor",o=e),this.parseClassMethod(n,i,s,o),"get"===n.kind&&0!==n.value.params.length&&this.raiseRecoverable(n.value.start,"getter should have no params"),"set"===n.kind&&1!==n.value.params.length&&this.raiseRecoverable(n.value.start,"setter should have exactly one param"),"set"===n.kind&&"RestElement"===n.value.params[0].type&&this.raiseRecoverable(n.value.params[0].start,"Setter cannot use rest params"),n},U.parseClassMethod=function(e,t,n,r){return e.value=this.parseMethod(t,n,r),this.finishNode(e,"MethodDefinition")},U.parseClassId=function(e,t){this.type===T.name?(e.id=this.parseIdent(),t&&this.checkLVal(e.id,2,!1)):(!0===t&&this.unexpected(),e.id=null)},U.parseClassSuper=function(e){e.superClass=this.eat(T._extends)?this.parseExprSubscripts():null},U.parseExport=function(e,t){if(this.next(),this.eat(T.star))return this.expectContextual("from"),this.type!==T.string&&this.unexpected(),e.source=this.parseExprAtom(),this.semicolon(),this.finishNode(e,"ExportAllDeclaration");if(this.eat(T._default)){var n;if(this.checkExport(t,"default",this.lastTokStart),this.type===T._function||(n=this.isAsyncFunction())){var r=this.startNode();this.next(),n&&this.next(),e.declaration=this.parseFunction(r,4|H,!1,n)}else if(this.type===T._class){var i=this.startNode();e.declaration=this.parseClass(i,"nullableID")}else e.declaration=this.parseMaybeAssign(),this.semicolon();return this.finishNode(e,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())e.declaration=this.parseStatement(null),"VariableDeclaration"===e.declaration.type?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id.name,e.declaration.id.start),e.specifiers=[],e.source=null;else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==T.string&&this.unexpected(),e.source=this.parseExprAtom();else{for(var s=0,a=e.specifiers;s<a.length;s+=1){var o=a[s];this.checkUnreserved(o.local),this.checkLocalExport(o.local)}e.source=null}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")},U.checkExport=function(e,t,n){e&&(D(e,t)&&this.raiseRecoverable(n,"Duplicate export '"+t+"'"),e[t]=!0)},U.checkPatternExport=function(e,t){var n=t.type;if("Identifier"===n)this.checkExport(e,t.name,t.start);else if("ObjectPattern"===n)for(var r=0,i=t.properties;r<i.length;r+=1){var s=i[r];this.checkPatternExport(e,s)}else if("ArrayPattern"===n)for(var a=0,o=t.elements;a<o.length;a+=1){var u=o[a];u&&this.checkPatternExport(e,u)}else"Property"===n?this.checkPatternExport(e,t.value):"AssignmentPattern"===n?this.checkPatternExport(e,t.left):"RestElement"===n?this.checkPatternExport(e,t.argument):"ParenthesizedExpression"===n&&this.checkPatternExport(e,t.expression)},U.checkVariableExport=function(e,t){if(e)for(var n=0,r=t;n<r.length;n+=1){var i=r[n];this.checkPatternExport(e,i.id)}},U.shouldParseExportStatement=function(){return"var"===this.type.keyword||"const"===this.type.keyword||"class"===this.type.keyword||"function"===this.type.keyword||this.isLet()||this.isAsyncFunction()},U.parseExportSpecifiers=function(e){var t=[],n=!0;for(this.expect(T.braceL);!this.eat(T.braceR);){if(n)n=!1;else if(this.expect(T.comma),this.afterTrailingComma(T.braceR))break;var r=this.startNode();r.local=this.parseIdent(!0),r.exported=this.eatContextual("as")?this.parseIdent(!0):r.local,this.checkExport(e,r.exported.name,r.exported.start),t.push(this.finishNode(r,"ExportSpecifier"))}return t},U.parseImport=function(e){return this.next(),this.type===T.string?(e.specifiers=j,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===T.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(e,"ImportDeclaration")},U.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===T.name){var n=this.startNode();if(n.local=this.parseIdent(),this.checkLVal(n.local,2),e.push(this.finishNode(n,"ImportDefaultSpecifier")),!this.eat(T.comma))return e}if(this.type===T.star){var r=this.startNode();return this.next(),this.expectContextual("as"),r.local=this.parseIdent(),this.checkLVal(r.local,2),e.push(this.finishNode(r,"ImportNamespaceSpecifier")),e}for(this.expect(T.braceL);!this.eat(T.braceR);){if(t)t=!1;else if(this.expect(T.comma),this.afterTrailingComma(T.braceR))break;var i=this.startNode();i.imported=this.parseIdent(!0),this.eatContextual("as")?i.local=this.parseIdent():(this.checkUnreserved(i.imported),i.local=i.imported),this.checkLVal(i.local,2),e.push(this.finishNode(i,"ImportSpecifier"))}return e},U.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)},U.isDirectiveCandidate=function(e){return"ExpressionStatement"===e.type&&"Literal"===e.expression.type&&"string"==typeof e.expression.value&&('"'===this.input[e.start]||"'"===this.input[e.start])};var q=O.prototype;q.toAssignable=function(e,t,n){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&"await"===e.name&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",n&&this.checkPatternErrors(n,!0);for(var r=0,i=e.properties;r<i.length;r+=1){var s=i[r];this.toAssignable(s,t),"RestElement"!==s.type||"ArrayPattern"!==s.argument.type&&"ObjectPattern"!==s.argument.type||this.raise(s.argument.start,"Unexpected token")}break;case"Property":"init"!==e.kind&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",n&&this.checkPatternErrors(n,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),"AssignmentPattern"===e.argument.type&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":"="!==e.operator&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);case"AssignmentPattern":break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,n);break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else n&&this.checkPatternErrors(n,!0);return e},q.toAssignableList=function(e,t){for(var n=e.length,r=0;r<n;r++){var i=e[r];i&&this.toAssignable(i,t)}if(n){var s=e[n-1];6===this.options.ecmaVersion&&t&&s&&"RestElement"===s.type&&"Identifier"!==s.argument.type&&this.unexpected(s.argument.start)}return e},q.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")},q.parseRestBinding=function(){var e=this.startNode();return this.next(),6===this.options.ecmaVersion&&this.type!==T.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")},q.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case T.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(T.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case T.braceL:return this.parseObj(!0)}return this.parseIdent()},q.parseBindingList=function(e,t,n){for(var r=[],i=!0;!this.eat(e);)if(i?i=!1:this.expect(T.comma),t&&this.type===T.comma)r.push(null);else{if(n&&this.afterTrailingComma(e))break;if(this.type===T.ellipsis){var s=this.parseRestBinding();this.parseBindingListItem(s),r.push(s),this.type===T.comma&&this.raise(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}var a=this.parseMaybeDefault(this.start,this.startLoc);this.parseBindingListItem(a),r.push(a)}return r},q.parseBindingListItem=function(e){return e},q.parseMaybeDefault=function(e,t,n){if(n=n||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(T.eq))return n;var r=this.startNodeAt(e,t);return r.left=n,r.right=this.parseMaybeAssign(),this.finishNode(r,"AssignmentPattern")},q.checkLVal=function(e,t,n){switch(void 0===t&&(t=0),e.type){case"Identifier":2===t&&"let"===e.name&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(t?"Binding ":"Assigning to ")+e.name+" in strict mode"),n&&(D(n,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),n[e.name]=!0),0!==t&&5!==t&&this.declareName(e.name,t,e.start);break;case"MemberExpression":t&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ObjectPattern":for(var r=0,i=e.properties;r<i.length;r+=1){var s=i[r];this.checkLVal(s,t,n)}break;case"Property":this.checkLVal(e.value,t,n);break;case"ArrayPattern":for(var a=0,o=e.elements;a<o.length;a+=1){var u=o[a];u&&this.checkLVal(u,t,n)}break;case"AssignmentPattern":this.checkLVal(e.left,t,n);break;case"RestElement":this.checkLVal(e.argument,t,n);break;case"ParenthesizedExpression":this.checkLVal(e.expression,t,n);break;default:this.raise(e.start,(t?"Binding":"Assigning to")+" rvalue")}};var Y=O.prototype;Y.checkPropClash=function(e,t,n){if(!(this.options.ecmaVersion>=9&&"SpreadElement"===e.type||this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var r,i=e.key;switch(i.type){case"Identifier":r=i.name;break;case"Literal":r=String(i.value);break;default:return}var s=e.kind;if(this.options.ecmaVersion>=6)"__proto__"===r&&"init"===s&&(t.proto&&(n?n.doubleProto<0&&(n.doubleProto=i.start):this.raiseRecoverable(i.start,"Redefinition of __proto__ property")),t.proto=!0);else{var a=t[r="$"+r];if(a)("init"===s?this.strict&&a.init||a.get||a.set:a.init||a[s])&&this.raiseRecoverable(i.start,"Redefinition of property");else a=t[r]={init:!1,get:!1,set:!1};a[s]=!0}}},Y.parseExpression=function(e,t){var n=this.start,r=this.startLoc,i=this.parseMaybeAssign(e,t);if(this.type===T.comma){var s=this.startNodeAt(n,r);for(s.expressions=[i];this.eat(T.comma);)s.expressions.push(this.parseMaybeAssign(e,t));return this.finishNode(s,"SequenceExpression")}return i},Y.parseMaybeAssign=function(e,t,n){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var r=!1,i=-1,s=-1;t?(i=t.parenthesizedAssign,s=t.trailingComma,t.parenthesizedAssign=t.trailingComma=-1):(t=new G,r=!0);var a=this.start,o=this.startLoc;this.type!==T.parenL&&this.type!==T.name||(this.potentialArrowAt=this.start);var u=this.parseMaybeConditional(e,t);if(n&&(u=n.call(this,u,a,o)),this.type.isAssign){var l=this.startNodeAt(a,o);return l.operator=this.value,l.left=this.type===T.eq?this.toAssignable(u,!1,t):u,r||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=l.left.start&&(t.shorthandAssign=-1),this.checkLVal(u),this.next(),l.right=this.parseMaybeAssign(e),this.finishNode(l,"AssignmentExpression")}return r&&this.checkExpressionErrors(t,!0),i>-1&&(t.parenthesizedAssign=i),s>-1&&(t.trailingComma=s),u},Y.parseMaybeConditional=function(e,t){var n=this.start,r=this.startLoc,i=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return i;if(this.eat(T.question)){var s=this.startNodeAt(n,r);return s.test=i,s.consequent=this.parseMaybeAssign(),this.expect(T.colon),s.alternate=this.parseMaybeAssign(e),this.finishNode(s,"ConditionalExpression")}return i},Y.parseExprOps=function(e,t){var n=this.start,r=this.startLoc,i=this.parseMaybeUnary(t,!1);return this.checkExpressionErrors(t)||i.start===n&&"ArrowFunctionExpression"===i.type?i:this.parseExprOp(i,n,r,-1,e)},Y.parseExprOp=function(e,t,n,r,i){var s=this.type.binop;if(null!=s&&(!i||this.type!==T._in)&&s>r){var a=this.type===T.logicalOR||this.type===T.logicalAND,o=this.value;this.next();var u=this.start,l=this.startLoc,h=this.parseExprOp(this.parseMaybeUnary(null,!1),u,l,s,i),c=this.buildBinary(t,n,e,h,o,a);return this.parseExprOp(c,t,n,r,i)}return e},Y.buildBinary=function(e,t,n,r,i,s){var a=this.startNodeAt(e,t);return a.left=n,a.operator=i,a.right=r,this.finishNode(a,s?"LogicalExpression":"BinaryExpression")},Y.parseMaybeUnary=function(e,t){var n,r=this.start,i=this.startLoc;if(this.isContextual("await")&&(this.inAsync||!this.inFunction&&this.options.allowAwaitOutsideFunction))n=this.parseAwait(),t=!0;else if(this.type.prefix){var s=this.startNode(),a=this.type===T.incDec;s.operator=this.value,s.prefix=!0,this.next(),s.argument=this.parseMaybeUnary(null,!0),this.checkExpressionErrors(e,!0),a?this.checkLVal(s.argument):this.strict&&"delete"===s.operator&&"Identifier"===s.argument.type?this.raiseRecoverable(s.start,"Deleting local variable in strict mode"):t=!0,n=this.finishNode(s,a?"UpdateExpression":"UnaryExpression")}else{if(n=this.parseExprSubscripts(e),this.checkExpressionErrors(e))return n;for(;this.type.postfix&&!this.canInsertSemicolon();){var o=this.startNodeAt(r,i);o.operator=this.value,o.prefix=!1,o.argument=n,this.checkLVal(n),this.next(),n=this.finishNode(o,"UpdateExpression")}}return!t&&this.eat(T.starstar)?this.buildBinary(r,i,n,this.parseMaybeUnary(null,!1),"**",!1):n},Y.parseExprSubscripts=function(e){var t=this.start,n=this.startLoc,r=this.parseExprAtom(e);if("ArrowFunctionExpression"===r.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd))return r;var i=this.parseSubscripts(r,t,n);return e&&"MemberExpression"===i.type&&(e.parenthesizedAssign>=i.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=i.start&&(e.parenthesizedBind=-1)),i},Y.parseSubscripts=function(e,t,n,r){for(var i=this.options.ecmaVersion>=8&&"Identifier"===e.type&&"async"===e.name&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&"async"===this.input.slice(e.start,e.end);;){var s=this.parseSubscript(e,t,n,r,i);if(s===e||"ArrowFunctionExpression"===s.type)return s;e=s}},Y.parseSubscript=function(e,t,n,r,i){var s=this.eat(T.bracketL);if(s||this.eat(T.dot)){var a=this.startNodeAt(t,n);a.object=e,a.property=s?this.parseExpression():this.parseIdent("never"!==this.options.allowReserved),a.computed=!!s,s&&this.expect(T.bracketR),e=this.finishNode(a,"MemberExpression")}else if(!r&&this.eat(T.parenL)){var o=new G,u=this.yieldPos,l=this.awaitPos,h=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var c=this.parseExprList(T.parenR,this.options.ecmaVersion>=8,!1,o);if(i&&!this.canInsertSemicolon()&&this.eat(T.arrow))return this.checkPatternErrors(o,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=u,this.awaitPos=l,this.awaitIdentPos=h,this.parseArrowExpression(this.startNodeAt(t,n),c,!0);this.checkExpressionErrors(o,!0),this.yieldPos=u||this.yieldPos,this.awaitPos=l||this.awaitPos,this.awaitIdentPos=h||this.awaitIdentPos;var p=this.startNodeAt(t,n);p.callee=e,p.arguments=c,e=this.finishNode(p,"CallExpression")}else if(this.type===T.backQuote){var d=this.startNodeAt(t,n);d.tag=e,d.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(d,"TaggedTemplateExpression")}return e},Y.parseExprAtom=function(e){this.type===T.slash&&this.readRegexp();var t,n=this.potentialArrowAt===this.start;switch(this.type){case T._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),t=this.startNode(),this.next(),this.type!==T.parenL||this.allowDirectSuper||this.raise(t.start,"super() call outside constructor of a subclass"),this.type!==T.dot&&this.type!==T.bracketL&&this.type!==T.parenL&&this.unexpected(),this.finishNode(t,"Super");case T._this:return t=this.startNode(),this.next(),this.finishNode(t,"ThisExpression");case T.name:var r=this.start,i=this.startLoc,s=this.containsEsc,a=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!s&&"async"===a.name&&!this.canInsertSemicolon()&&this.eat(T._function))return this.parseFunction(this.startNodeAt(r,i),0,!1,!0);if(n&&!this.canInsertSemicolon()){if(this.eat(T.arrow))return this.parseArrowExpression(this.startNodeAt(r,i),[a],!1);if(this.options.ecmaVersion>=8&&"async"===a.name&&this.type===T.name&&!s)return a=this.parseIdent(!1),!this.canInsertSemicolon()&&this.eat(T.arrow)||this.unexpected(),this.parseArrowExpression(this.startNodeAt(r,i),[a],!0)}return a;case T.regexp:var o=this.value;return(t=this.parseLiteral(o.value)).regex={pattern:o.pattern,flags:o.flags},t;case T.num:case T.string:return this.parseLiteral(this.value);case T._null:case T._true:case T._false:return(t=this.startNode()).value=this.type===T._null?null:this.type===T._true,t.raw=this.type.keyword,this.next(),this.finishNode(t,"Literal");case T.parenL:var u=this.start,l=this.parseParenAndDistinguishExpression(n);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(l)&&(e.parenthesizedAssign=u),e.parenthesizedBind<0&&(e.parenthesizedBind=u)),l;case T.bracketL:return t=this.startNode(),this.next(),t.elements=this.parseExprList(T.bracketR,!0,!0,e),this.finishNode(t,"ArrayExpression");case T.braceL:return this.parseObj(!1,e);case T._function:return t=this.startNode(),this.next(),this.parseFunction(t,0);case T._class:return this.parseClass(this.startNode(),!1);case T._new:return this.parseNew();case T.backQuote:return this.parseTemplate();case T._import:return this.options.ecmaVersion>=11?this.parseExprImport():this.unexpected();default:this.unexpected()}},Y.parseExprImport=function(){var e=this.startNode();if(this.next(),this.type===T.parenL)return this.parseDynamicImport(e);this.unexpected()},Y.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),!this.eat(T.parenR)){var t=this.start;this.eat(T.comma)&&this.eat(T.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")},Y.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),110===t.raw.charCodeAt(t.raw.length-1)&&(t.bigint=t.raw.slice(0,-1)),this.next(),this.finishNode(t,"Literal")},Y.parseParenExpression=function(){this.expect(T.parenL);var e=this.parseExpression();return this.expect(T.parenR),e},Y.parseParenAndDistinguishExpression=function(e){var t,n=this.start,r=this.startLoc,i=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var s,a=this.start,o=this.startLoc,u=[],l=!0,h=!1,c=new G,p=this.yieldPos,d=this.awaitPos;for(this.yieldPos=0,this.awaitPos=0;this.type!==T.parenR;){if(l?l=!1:this.expect(T.comma),i&&this.afterTrailingComma(T.parenR,!0)){h=!0;break}if(this.type===T.ellipsis){s=this.start,u.push(this.parseParenItem(this.parseRestBinding())),this.type===T.comma&&this.raise(this.start,"Comma is not permitted after the rest element");break}u.push(this.parseMaybeAssign(!1,c,this.parseParenItem))}var m=this.start,f=this.startLoc;if(this.expect(T.parenR),e&&!this.canInsertSemicolon()&&this.eat(T.arrow))return this.checkPatternErrors(c,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=p,this.awaitPos=d,this.parseParenArrowList(n,r,u);u.length&&!h||this.unexpected(this.lastTokStart),s&&this.unexpected(s),this.checkExpressionErrors(c,!0),this.yieldPos=p||this.yieldPos,this.awaitPos=d||this.awaitPos,u.length>1?((t=this.startNodeAt(a,o)).expressions=u,this.finishNodeAt(t,"SequenceExpression",m,f)):t=u[0]}else t=this.parseParenExpression();if(this.options.preserveParens){var g=this.startNodeAt(n,r);return g.expression=t,this.finishNode(g,"ParenthesizedExpression")}return t},Y.parseParenItem=function(e){return e},Y.parseParenArrowList=function(e,t,n){return this.parseArrowExpression(this.startNodeAt(e,t),n)};var Z=[];Y.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode(),t=this.parseIdent(!0);if(this.options.ecmaVersion>=6&&this.eat(T.dot)){e.meta=t;var n=this.containsEsc;return e.property=this.parseIdent(!0),("target"!==e.property.name||n)&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is new.target"),this.inNonArrowFunction()||this.raiseRecoverable(e.start,"new.target can only be used in functions"),this.finishNode(e,"MetaProperty")}var r=this.start,i=this.startLoc,s=this.type===T._import;return e.callee=this.parseSubscripts(this.parseExprAtom(),r,i,!0),s&&"ImportExpression"===e.callee.type&&this.raise(r,"Cannot use new with import()"),this.eat(T.parenL)?e.arguments=this.parseExprList(T.parenR,this.options.ecmaVersion>=8,!1):e.arguments=Z,this.finishNode(e,"NewExpression")},Y.parseTemplateElement=function(e){var t=e.isTagged,n=this.startNode();return this.type===T.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),n.value={raw:this.value,cooked:null}):n.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value},this.next(),n.tail=this.type===T.backQuote,this.finishNode(n,"TemplateElement")},Y.parseTemplate=function(e){void 0===e&&(e={});var t=e.isTagged;void 0===t&&(t=!1);var n=this.startNode();this.next(),n.expressions=[];var r=this.parseTemplateElement({isTagged:t});for(n.quasis=[r];!r.tail;)this.type===T.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(T.dollarBraceL),n.expressions.push(this.parseExpression()),this.expect(T.braceR),n.quasis.push(r=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(n,"TemplateLiteral")},Y.isAsyncProp=function(e){return!e.computed&&"Identifier"===e.key.type&&"async"===e.key.name&&(this.type===T.name||this.type===T.num||this.type===T.string||this.type===T.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===T.star)&&!v.test(this.input.slice(this.lastTokEnd,this.start))},Y.parseObj=function(e,t){var n=this.startNode(),r=!0,i={};for(n.properties=[],this.next();!this.eat(T.braceR);){if(r)r=!1;else if(this.expect(T.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(T.braceR))break;var s=this.parseProperty(e,t);e||this.checkPropClash(s,i,t),n.properties.push(s)}return this.finishNode(n,e?"ObjectPattern":"ObjectExpression")},Y.parseProperty=function(e,t){var n,r,i,s,a=this.startNode();if(this.options.ecmaVersion>=9&&this.eat(T.ellipsis))return e?(a.argument=this.parseIdent(!1),this.type===T.comma&&this.raise(this.start,"Comma is not permitted after the rest element"),this.finishNode(a,"RestElement")):(this.type===T.parenL&&t&&(t.parenthesizedAssign<0&&(t.parenthesizedAssign=this.start),t.parenthesizedBind<0&&(t.parenthesizedBind=this.start)),a.argument=this.parseMaybeAssign(!1,t),this.type===T.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(a,"SpreadElement"));this.options.ecmaVersion>=6&&(a.method=!1,a.shorthand=!1,(e||t)&&(i=this.start,s=this.startLoc),e||(n=this.eat(T.star)));var o=this.containsEsc;return this.parsePropertyName(a),!e&&!o&&this.options.ecmaVersion>=8&&!n&&this.isAsyncProp(a)?(r=!0,n=this.options.ecmaVersion>=9&&this.eat(T.star),this.parsePropertyName(a,t)):r=!1,this.parsePropertyValue(a,e,n,r,i,s,t,o),this.finishNode(a,"Property")},Y.parsePropertyValue=function(e,t,n,r,i,s,a,o){if((n||r)&&this.type===T.colon&&this.unexpected(),this.eat(T.colon))e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,a),e.kind="init";else if(this.options.ecmaVersion>=6&&this.type===T.parenL)t&&this.unexpected(),e.kind="init",e.method=!0,e.value=this.parseMethod(n,r);else if(t||o||!(this.options.ecmaVersion>=5)||e.computed||"Identifier"!==e.key.type||"get"!==e.key.name&&"set"!==e.key.name||this.type===T.comma||this.type===T.braceR)this.options.ecmaVersion>=6&&!e.computed&&"Identifier"===e.key.type?((n||r)&&this.unexpected(),this.checkUnreserved(e.key),"await"!==e.key.name||this.awaitIdentPos||(this.awaitIdentPos=i),e.kind="init",t?e.value=this.parseMaybeDefault(i,s,e.key):this.type===T.eq&&a?(a.shorthandAssign<0&&(a.shorthandAssign=this.start),e.value=this.parseMaybeDefault(i,s,e.key)):e.value=e.key,e.shorthand=!0):this.unexpected();else{(n||r)&&this.unexpected(),e.kind=e.key.name,this.parsePropertyName(e),e.value=this.parseMethod(!1);var u="get"===e.kind?0:1;if(e.value.params.length!==u){var l=e.value.start;"get"===e.kind?this.raiseRecoverable(l,"getter should have no params"):this.raiseRecoverable(l,"setter should have exactly one param")}else"set"===e.kind&&"RestElement"===e.value.params[0].type&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")}},Y.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(T.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(T.bracketR),e.key;e.computed=!1}return e.key=this.type===T.num||this.type===T.string?this.parseExprAtom():this.parseIdent("never"!==this.options.allowReserved)},Y.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)},Y.parseMethod=function(e,t,n){var r=this.startNode(),i=this.yieldPos,s=this.awaitPos,a=this.awaitIdentPos;return this.initFunction(r),this.options.ecmaVersion>=6&&(r.generator=e),this.options.ecmaVersion>=8&&(r.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(64|M(t,r.generator)|(n?128:0)),this.expect(T.parenL),r.params=this.parseBindingList(T.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(r,!1,!0),this.yieldPos=i,this.awaitPos=s,this.awaitIdentPos=a,this.finishNode(r,"FunctionExpression")},Y.parseArrowExpression=function(e,t,n){var r=this.yieldPos,i=this.awaitPos,s=this.awaitIdentPos;return this.enterScope(16|M(n,!1)),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!n),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1),this.yieldPos=r,this.awaitPos=i,this.awaitIdentPos=s,this.finishNode(e,"ArrowFunctionExpression")},Y.parseFunctionBody=function(e,t,n){var r=t&&this.type!==T.braceL,i=this.strict,s=!1;if(r)e.body=this.parseMaybeAssign(),e.expression=!0,this.checkParams(e,!1);else{var a=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);i&&!a||(s=this.strictDirective(this.end))&&a&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list");var o=this.labels;this.labels=[],s&&(this.strict=!0),this.checkParams(e,!i&&!s&&!t&&!n&&this.isSimpleParamList(e.params)),e.body=this.parseBlock(!1),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=o}this.exitScope(),this.strict&&e.id&&this.checkLVal(e.id,5),this.strict=i},Y.isSimpleParamList=function(e){for(var t=0,n=e;t<n.length;t+=1){if("Identifier"!==n[t].type)return!1}return!0},Y.checkParams=function(e,t){for(var n={},r=0,i=e.params;r<i.length;r+=1){var s=i[r];this.checkLVal(s,1,t?null:n)}},Y.parseExprList=function(e,t,n,r){for(var i=[],s=!0;!this.eat(e);){if(s)s=!1;else if(this.expect(T.comma),t&&this.afterTrailingComma(e))break;var a=void 0;n&&this.type===T.comma?a=null:this.type===T.ellipsis?(a=this.parseSpread(r),r&&this.type===T.comma&&r.trailingComma<0&&(r.trailingComma=this.start)):a=this.parseMaybeAssign(!1,r),i.push(a)}return i},Y.checkUnreserved=function(e){var t=e.start,n=e.end,r=e.name;(this.inGenerator&&"yield"===r&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&"await"===r&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),this.keywords.test(r)&&this.raise(t,"Unexpected keyword '"+r+"'"),this.options.ecmaVersion<6&&-1!==this.input.slice(t,n).indexOf("\\"))||(this.strict?this.reservedWordsStrict:this.reservedWords).test(r)&&(this.inAsync||"await"!==r||this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+r+"' is reserved"))},Y.parseIdent=function(e,t){var n=this.startNode();return this.type===T.name?n.name=this.value:this.type.keyword?(n.name=this.type.keyword,"class"!==n.name&&"function"!==n.name||this.lastTokEnd===this.lastTokStart+1&&46===this.input.charCodeAt(this.lastTokStart)||this.context.pop()):this.unexpected(),this.next(!!e),this.finishNode(n,"Identifier"),e||(this.checkUnreserved(n),"await"!==n.name||this.awaitIdentPos||(this.awaitIdentPos=n.start)),n},Y.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===T.semi||this.canInsertSemicolon()||this.type!==T.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(T.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")},Y.parseAwait=function(){this.awaitPos||(this.awaitPos=this.start);var e=this.startNode();return this.next(),e.argument=this.parseMaybeUnary(null,!1),this.finishNode(e,"AwaitExpression")};var J=O.prototype;J.raise=function(e,t){var n=F(this.input,e);t+=" ("+n.line+":"+n.column+")";var r=new SyntaxError(t);throw r.pos=e,r.loc=n,r.raisedAt=this.pos,r},J.raiseRecoverable=J.raise,J.curPosition=function(){if(this.options.locations)return new L(this.curLine,this.pos-this.lineStart)};var Q=O.prototype,ee=function(e){this.flags=e,this.var=[],this.lexical=[],this.functions=[]};Q.enterScope=function(e){this.scopeStack.push(new ee(e))},Q.exitScope=function(){this.scopeStack.pop()},Q.treatFunctionsAsVarInScope=function(e){return 2&e.flags||!this.inModule&&1&e.flags},Q.declareName=function(e,t,n){var r=!1;if(2===t){var i=this.currentScope();r=i.lexical.indexOf(e)>-1||i.functions.indexOf(e)>-1||i.var.indexOf(e)>-1,i.lexical.push(e),this.inModule&&1&i.flags&&delete this.undefinedExports[e]}else if(4===t){this.currentScope().lexical.push(e)}else if(3===t){var s=this.currentScope();r=this.treatFunctionsAsVar?s.lexical.indexOf(e)>-1:s.lexical.indexOf(e)>-1||s.var.indexOf(e)>-1,s.functions.push(e)}else for(var a=this.scopeStack.length-1;a>=0;--a){var o=this.scopeStack[a];if(o.lexical.indexOf(e)>-1&&!(32&o.flags&&o.lexical[0]===e)||!this.treatFunctionsAsVarInScope(o)&&o.functions.indexOf(e)>-1){r=!0;break}if(o.var.push(e),this.inModule&&1&o.flags&&delete this.undefinedExports[e],3&o.flags)break}r&&this.raiseRecoverable(n,"Identifier '"+e+"' has already been declared")},Q.checkLocalExport=function(e){-1===this.scopeStack[0].lexical.indexOf(e.name)&&-1===this.scopeStack[0].var.indexOf(e.name)&&(this.undefinedExports[e.name]=e)},Q.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]},Q.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(3&t.flags)return t}},Q.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(3&t.flags&&!(16&t.flags))return t}};var te=function(e,t,n){this.type="",this.start=t,this.end=0,e.options.locations&&(this.loc=new R(e,n)),e.options.directSourceFile&&(this.sourceFile=e.options.directSourceFile),e.options.ranges&&(this.range=[t,0])},ne=O.prototype;function re(e,t,n,r){return e.type=t,e.end=n,this.options.locations&&(e.loc.end=r),this.options.ranges&&(e.range[1]=n),e}ne.startNode=function(){return new te(this,this.start,this.startLoc)},ne.startNodeAt=function(e,t){return new te(this,e,t)},ne.finishNode=function(e,t){return re.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)},ne.finishNodeAt=function(e,t,n,r){return re.call(this,e,t,n,r)};var ie=function(e,t,n,r,i){this.token=e,this.isExpr=!!t,this.preserveSpace=!!n,this.override=r,this.generator=!!i},se={b_stat:new ie("{",!1),b_expr:new ie("{",!0),b_tmpl:new ie("${",!1),p_stat:new ie("(",!1),p_expr:new ie("(",!0),q_tmpl:new ie("`",!0,!0,(function(e){return e.tryReadTemplateToken()})),f_stat:new ie("function",!1),f_expr:new ie("function",!0),f_expr_gen:new ie("function",!0,!1,null,!0),f_gen:new ie("function",!1,!1,null,!0)},ae=O.prototype;ae.initialContext=function(){return[se.b_stat]},ae.braceIsBlock=function(e){var t=this.curContext();return t===se.f_expr||t===se.f_stat||(e!==T.colon||t!==se.b_stat&&t!==se.b_expr?e===T._return||e===T.name&&this.exprAllowed?v.test(this.input.slice(this.lastTokEnd,this.start)):e===T._else||e===T.semi||e===T.eof||e===T.parenR||e===T.arrow||(e===T.braceL?t===se.b_stat:e!==T._var&&e!==T._const&&e!==T.name&&!this.exprAllowed):!t.isExpr)},ae.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if("function"===t.token)return t.generator}return!1},ae.updateContext=function(e){var t,n=this.type;n.keyword&&e===T.dot?this.exprAllowed=!1:(t=n.updateContext)?t.call(this,e):this.exprAllowed=n.beforeExpr},T.parenR.updateContext=T.braceR.updateContext=function(){if(1!==this.context.length){var e=this.context.pop();e===se.b_stat&&"function"===this.curContext().token&&(e=this.context.pop()),this.exprAllowed=!e.isExpr}else this.exprAllowed=!0},T.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?se.b_stat:se.b_expr),this.exprAllowed=!0},T.dollarBraceL.updateContext=function(){this.context.push(se.b_tmpl),this.exprAllowed=!0},T.parenL.updateContext=function(e){var t=e===T._if||e===T._for||e===T._with||e===T._while;this.context.push(t?se.p_stat:se.p_expr),this.exprAllowed=!0},T.incDec.updateContext=function(){},T._function.updateContext=T._class.updateContext=function(e){!e.beforeExpr||e===T.semi||e===T._else||e===T._return&&v.test(this.input.slice(this.lastTokEnd,this.start))||(e===T.colon||e===T.braceL)&&this.curContext()===se.b_stat?this.context.push(se.f_stat):this.context.push(se.f_expr),this.exprAllowed=!1},T.backQuote.updateContext=function(){this.curContext()===se.q_tmpl?this.context.pop():this.context.push(se.q_tmpl),this.exprAllowed=!1},T.star.updateContext=function(e){if(e===T._function){var t=this.context.length-1;this.context[t]===se.f_expr?this.context[t]=se.f_expr_gen:this.context[t]=se.f_gen}this.exprAllowed=!0},T.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==T.dot&&("of"===this.value&&!this.exprAllowed||"yield"===this.value&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var oe="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",ue=oe+" Extended_Pictographic",le={9:oe,10:ue,11:"ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic"},he="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",ce="Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",pe=ce+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",de={9:ce,10:pe,11:"Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho"},me={};function fe(e){var t=me[e]={binary:$(le[e]+" "+he),nonBinary:{General_Category:$(he),Script:$(de[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}fe(9),fe(10),fe(11);var ge=O.prototype,xe=function(e){this.parser=e,this.validFlags="gim"+(e.options.ecmaVersion>=6?"uy":"")+(e.options.ecmaVersion>=9?"s":""),this.unicodeProperties=me[e.options.ecmaVersion>=11?11:e.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=[],this.backReferenceNames=[]};function ye(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode(55296+(e>>10),56320+(1023&e)))}function be(e){return 36===e||e>=40&&e<=43||46===e||63===e||e>=91&&e<=94||e>=123&&e<=125}function Te(e){return e>=65&&e<=90||e>=97&&e<=122}function ve(e){return Te(e)||95===e}function Se(e){return ve(e)||Ae(e)}function Ae(e){return e>=48&&e<=57}function _e(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function Ee(e){return e>=65&&e<=70?e-65+10:e>=97&&e<=102?e-97+10:e-48}function we(e){return e>=48&&e<=55}xe.prototype.reset=function(e,t,n){var r=-1!==n.indexOf("u");this.start=0|e,this.source=t+"",this.flags=n,this.switchU=r&&this.parser.options.ecmaVersion>=6,this.switchN=r&&this.parser.options.ecmaVersion>=9},xe.prototype.raise=function(e){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+e)},xe.prototype.at=function(e){var t=this.source,n=t.length;if(e>=n)return-1;var r=t.charCodeAt(e);if(!this.switchU||r<=55295||r>=57344||e+1>=n)return r;var i=t.charCodeAt(e+1);return i>=56320&&i<=57343?(r<<10)+i-56613888:r},xe.prototype.nextIndex=function(e){var t=this.source,n=t.length;if(e>=n)return n;var r,i=t.charCodeAt(e);return!this.switchU||i<=55295||i>=57344||e+1>=n||(r=t.charCodeAt(e+1))<56320||r>57343?e+1:e+2},xe.prototype.current=function(){return this.at(this.pos)},xe.prototype.lookahead=function(){return this.at(this.nextIndex(this.pos))},xe.prototype.advance=function(){this.pos=this.nextIndex(this.pos)},xe.prototype.eat=function(e){return this.current()===e&&(this.advance(),!0)},ge.validateRegExpFlags=function(e){for(var t=e.validFlags,n=e.flags,r=0;r<n.length;r++){var i=n.charAt(r);-1===t.indexOf(i)&&this.raise(e.start,"Invalid regular expression flag"),n.indexOf(i,r+1)>-1&&this.raise(e.start,"Duplicate regular expression flag")}},ge.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&e.groupNames.length>0&&(e.switchN=!0,this.regexp_pattern(e))},ge.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames.length=0,e.backReferenceNames.length=0,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,n=e.backReferenceNames;t<n.length;t+=1){var r=n[t];-1===e.groupNames.indexOf(r)&&e.raise("Invalid named capture referenced")}},ge.regexp_disjunction=function(e){for(this.regexp_alternative(e);e.eat(124);)this.regexp_alternative(e);this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")},ge.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););},ge.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):!!(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))&&(this.regexp_eatQuantifier(e),!0)},ge.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var n=!1;if(this.options.ecmaVersion>=9&&(n=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!n,!0}return e.pos=t,!1},ge.regexp_eatQuantifier=function(e,t){return void 0===t&&(t=!1),!!this.regexp_eatQuantifierPrefix(e,t)&&(e.eat(63),!0)},ge.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)},ge.regexp_eatBracedQuantifier=function(e,t){var n=e.pos;if(e.eat(123)){var r=0,i=-1;if(this.regexp_eatDecimalDigits(e)&&(r=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(i=e.lastIntValue),e.eat(125)))return-1!==i&&i<r&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=n}return!1},ge.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)},ge.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1},ge.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)&&e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}e.pos=t}return!1},ge.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):63===e.current()&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1},ge.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)},ge.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1},ge.regexp_eatSyntaxCharacter=function(e){var t=e.current();return!!be(t)&&(e.lastIntValue=t,e.advance(),!0)},ge.regexp_eatPatternCharacters=function(e){for(var t=e.pos,n=0;-1!==(n=e.current())&&!be(n);)e.advance();return e.pos!==t},ge.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return!(-1===t||36===t||t>=40&&t<=43||46===t||63===t||91===t||94===t||124===t)&&(e.advance(),!0)},ge.regexp_groupSpecifier=function(e){if(e.eat(63)){if(this.regexp_eatGroupName(e))return-1!==e.groupNames.indexOf(e.lastStringValue)&&e.raise("Duplicate capture group name"),void e.groupNames.push(e.lastStringValue);e.raise("Invalid group")}},ge.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1},ge.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=ye(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=ye(e.lastIntValue);return!0}return!1},ge.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,n=e.current();return e.advance(),92===n&&this.regexp_eatRegExpUnicodeEscapeSequence(e)&&(n=e.lastIntValue),function(e){return p(e,!0)||36===e||95===e}(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)},ge.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,n=e.current();return e.advance(),92===n&&this.regexp_eatRegExpUnicodeEscapeSequence(e)&&(n=e.lastIntValue),function(e){return d(e,!0)||36===e||95===e||8204===e||8205===e}(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)},ge.regexp_eatAtomEscape=function(e){return!!(this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e))||(e.switchU&&(99===e.current()&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)},ge.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var n=e.lastIntValue;if(e.switchU)return n>e.maxBackReference&&(e.maxBackReference=n),!0;if(n<=e.numCapturingParens)return!0;e.pos=t}return!1},ge.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1},ge.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)},ge.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1},ge.regexp_eatZero=function(e){return 48===e.current()&&!Ae(e.lookahead())&&(e.lastIntValue=0,e.advance(),!0)},ge.regexp_eatControlEscape=function(e){var t=e.current();return 116===t?(e.lastIntValue=9,e.advance(),!0):110===t?(e.lastIntValue=10,e.advance(),!0):118===t?(e.lastIntValue=11,e.advance(),!0):102===t?(e.lastIntValue=12,e.advance(),!0):114===t&&(e.lastIntValue=13,e.advance(),!0)},ge.regexp_eatControlLetter=function(e){var t=e.current();return!!Te(t)&&(e.lastIntValue=t%32,e.advance(),!0)},ge.regexp_eatRegExpUnicodeEscapeSequence=function(e){var t,n=e.pos;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var r=e.lastIntValue;if(e.switchU&&r>=55296&&r<=56319){var i=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var s=e.lastIntValue;if(s>=56320&&s<=57343)return e.lastIntValue=1024*(r-55296)+(s-56320)+65536,!0}e.pos=i,e.lastIntValue=r}return!0}if(e.switchU&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&((t=e.lastIntValue)>=0&&t<=1114111))return!0;e.switchU&&e.raise("Invalid unicode escape"),e.pos=n}return!1},ge.regexp_eatIdentityEscape=function(e){if(e.switchU)return!!this.regexp_eatSyntaxCharacter(e)||!!e.eat(47)&&(e.lastIntValue=47,!0);var t=e.current();return!(99===t||e.switchN&&107===t)&&(e.lastIntValue=t,e.advance(),!0)},ge.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do{e.lastIntValue=10*e.lastIntValue+(t-48),e.advance()}while((t=e.current())>=48&&t<=57);return!0}return!1},ge.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(function(e){return 100===e||68===e||115===e||83===e||119===e||87===e}(t))return e.lastIntValue=-1,e.advance(),!0;if(e.switchU&&this.options.ecmaVersion>=9&&(80===t||112===t)){if(e.lastIntValue=-1,e.advance(),e.eat(123)&&this.regexp_eatUnicodePropertyValueExpression(e)&&e.eat(125))return!0;e.raise("Invalid property name")}return!1},ge.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var n=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var r=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,n,r),!0}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var i=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,i),!0}return!1},ge.regexp_validateUnicodePropertyNameAndValue=function(e,t,n){D(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(n)||e.raise("Invalid property value")},ge.regexp_validateUnicodePropertyNameOrValue=function(e,t){e.unicodeProperties.binary.test(t)||e.raise("Invalid property name")},ge.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";ve(t=e.current());)e.lastStringValue+=ye(t),e.advance();return""!==e.lastStringValue},ge.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";Se(t=e.current());)e.lastStringValue+=ye(t),e.advance();return""!==e.lastStringValue},ge.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)},ge.regexp_eatCharacterClass=function(e){if(e.eat(91)){if(e.eat(94),this.regexp_classRanges(e),e.eat(93))return!0;e.raise("Unterminated character class")}return!1},ge.regexp_classRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var n=e.lastIntValue;!e.switchU||-1!==t&&-1!==n||e.raise("Invalid character class"),-1!==t&&-1!==n&&t>n&&e.raise("Range out of order in character class")}}},ge.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var n=e.current();(99===n||we(n))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var r=e.current();return 93!==r&&(e.lastIntValue=r,e.advance(),!0)},ge.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)},ge.regexp_eatClassControlLetter=function(e){var t=e.current();return!(!Ae(t)&&95!==t)&&(e.lastIntValue=t%32,e.advance(),!0)},ge.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1},ge.regexp_eatDecimalDigits=function(e){var t=e.pos,n=0;for(e.lastIntValue=0;Ae(n=e.current());)e.lastIntValue=10*e.lastIntValue+(n-48),e.advance();return e.pos!==t},ge.regexp_eatHexDigits=function(e){var t=e.pos,n=0;for(e.lastIntValue=0;_e(n=e.current());)e.lastIntValue=16*e.lastIntValue+Ee(n),e.advance();return e.pos!==t},ge.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var n=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=64*t+8*n+e.lastIntValue:e.lastIntValue=8*t+n}else e.lastIntValue=t;return!0}return!1},ge.regexp_eatOctalDigit=function(e){var t=e.current();return we(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)},ge.regexp_eatFixedHexDigits=function(e,t){var n=e.pos;e.lastIntValue=0;for(var r=0;r<t;++r){var i=e.current();if(!_e(i))return e.pos=n,!1;e.lastIntValue=16*e.lastIntValue+Ee(i),e.advance()}return!0};var ke=function(e){this.type=e.type,this.value=e.value,this.start=e.start,this.end=e.end,e.options.locations&&(this.loc=new R(e,e.startLoc,e.endLoc)),e.options.ranges&&(this.range=[e.start,e.end])},Ie=O.prototype;function De(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode(55296+(e>>10),56320+(1023&e)))}Ie.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new ke(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},Ie.getToken=function(){return this.next(),new ke(this)},"undefined"!=typeof Symbol&&(Ie[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===T.eof,value:t}}}}),Ie.curContext=function(){return this.context[this.context.length-1]},Ie.nextToken=function(){var e=this.curContext();return e&&e.preserveSpace||this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length?this.finishToken(T.eof):e.override?e.override(this):void this.readToken(this.fullCharCodeAtPos())},Ie.readToken=function(e){return p(e,this.options.ecmaVersion>=6)||92===e?this.readWord():this.getTokenFromCode(e)},Ie.fullCharCodeAtPos=function(){var e=this.input.charCodeAt(this.pos);return e<=55295||e>=57344?e:(e<<10)+this.input.charCodeAt(this.pos+1)-56613888},Ie.skipBlockComment=function(){var e,t=this.options.onComment&&this.curPosition(),n=this.pos,r=this.input.indexOf("*/",this.pos+=2);if(-1===r&&this.raise(this.pos-2,"Unterminated comment"),this.pos=r+2,this.options.locations)for(S.lastIndex=n;(e=S.exec(this.input))&&e.index<this.pos;)++this.curLine,this.lineStart=e.index+e[0].length;this.options.onComment&&this.options.onComment(!0,this.input.slice(n+2,r),n,this.pos,t,this.curPosition())},Ie.skipLineComment=function(e){for(var t=this.pos,n=this.options.onComment&&this.curPosition(),r=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!A(r);)r=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,n,this.curPosition())},Ie.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:10===this.input.charCodeAt(this.pos+1)&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(!(e>8&&e<14||e>=5760&&_.test(String.fromCharCode(e))))break e;++this.pos}}},Ie.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var n=this.type;this.type=e,this.value=t,this.updateContext(n)},Ie.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&46===e&&46===t?(this.pos+=3,this.finishToken(T.ellipsis)):(++this.pos,this.finishToken(T.dot))},Ie.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):61===e?this.finishOp(T.assign,2):this.finishOp(T.slash,1)},Ie.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),n=1,r=42===e?T.star:T.modulo;return this.options.ecmaVersion>=7&&42===e&&42===t&&(++n,r=T.starstar,t=this.input.charCodeAt(this.pos+2)),61===t?this.finishOp(T.assign,n+1):this.finishOp(r,n)},Ie.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?this.finishOp(124===e?T.logicalOR:T.logicalAND,2):61===t?this.finishOp(T.assign,2):this.finishOp(124===e?T.bitwiseOR:T.bitwiseAND,1)},Ie.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(T.assign,2):this.finishOp(T.bitwiseXOR,1)},Ie.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?45!==t||this.inModule||62!==this.input.charCodeAt(this.pos+2)||0!==this.lastTokEnd&&!v.test(this.input.slice(this.lastTokEnd,this.pos))?this.finishOp(T.incDec,2):(this.skipLineComment(3),this.skipSpace(),this.nextToken()):61===t?this.finishOp(T.assign,2):this.finishOp(T.plusMin,1)},Ie.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),n=1;return t===e?(n=62===e&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+n)?this.finishOp(T.assign,n+1):this.finishOp(T.bitShift,n)):33!==t||60!==e||this.inModule||45!==this.input.charCodeAt(this.pos+2)||45!==this.input.charCodeAt(this.pos+3)?(61===t&&(n=2),this.finishOp(T.relational,n)):(this.skipLineComment(4),this.skipSpace(),this.nextToken())},Ie.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return 61===t?this.finishOp(T.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===e&&62===t&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(T.arrow)):this.finishOp(61===e?T.eq:T.prefix,1)},Ie.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(T.parenL);case 41:return++this.pos,this.finishToken(T.parenR);case 59:return++this.pos,this.finishToken(T.semi);case 44:return++this.pos,this.finishToken(T.comma);case 91:return++this.pos,this.finishToken(T.bracketL);case 93:return++this.pos,this.finishToken(T.bracketR);case 123:return++this.pos,this.finishToken(T.braceL);case 125:return++this.pos,this.finishToken(T.braceR);case 58:return++this.pos,this.finishToken(T.colon);case 63:return++this.pos,this.finishToken(T.question);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(T.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(120===t||88===t)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(111===t||79===t)return this.readRadixNumber(8);if(98===t||66===t)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 126:return this.finishOp(T.prefix,1)}this.raise(this.pos,"Unexpected character '"+De(e)+"'")},Ie.finishOp=function(e,t){var n=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,n)},Ie.readRegexp=function(){for(var e,t,n=this.pos;;){this.pos>=this.input.length&&this.raise(n,"Unterminated regular expression");var r=this.input.charAt(this.pos);if(v.test(r)&&this.raise(n,"Unterminated regular expression"),e)e=!1;else{if("["===r)t=!0;else if("]"===r&&t)t=!1;else if("/"===r&&!t)break;e="\\"===r}++this.pos}var i=this.input.slice(n,this.pos);++this.pos;var s=this.pos,a=this.readWord1();this.containsEsc&&this.unexpected(s);var o=this.regexpState||(this.regexpState=new xe(this));o.reset(n,i,a),this.validateRegExpFlags(o),this.validateRegExpPattern(o);var u=null;try{u=new RegExp(i,a)}catch(e){}return this.finishToken(T.regexp,{pattern:i,flags:a,value:u})},Ie.readInt=function(e,t){for(var n=this.pos,r=0,i=0,s=null==t?1/0:t;i<s;++i){var a=this.input.charCodeAt(this.pos),o=void 0;if((o=a>=97?a-97+10:a>=65?a-65+10:a>=48&&a<=57?a-48:1/0)>=e)break;++this.pos,r=r*e+o}return this.pos===n||null!=t&&this.pos-n!==t?null:r},Ie.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var n=this.readInt(e);return null==n&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&110===this.input.charCodeAt(this.pos)?(n="undefined"!=typeof BigInt?BigInt(this.input.slice(t,this.pos)):null,++this.pos):p(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(T.num,n)},Ie.readNumber=function(e){var t=this.pos;e||null!==this.readInt(10)||this.raise(t,"Invalid number");var n=this.pos-t>=2&&48===this.input.charCodeAt(t);n&&this.strict&&this.raise(t,"Invalid number");var r=this.input.charCodeAt(this.pos);if(!n&&!e&&this.options.ecmaVersion>=11&&110===r){var i=this.input.slice(t,this.pos),s="undefined"!=typeof BigInt?BigInt(i):null;return++this.pos,p(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(T.num,s)}n&&/[89]/.test(this.input.slice(t,this.pos))&&(n=!1),46!==r||n||(++this.pos,this.readInt(10),r=this.input.charCodeAt(this.pos)),69!==r&&101!==r||n||(43!==(r=this.input.charCodeAt(++this.pos))&&45!==r||++this.pos,null===this.readInt(10)&&this.raise(t,"Invalid number")),p(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var a=this.input.slice(t,this.pos),o=n?parseInt(a,8):parseFloat(a);return this.finishToken(T.num,o)},Ie.readCodePoint=function(){var e;if(123===this.input.charCodeAt(this.pos)){this.options.ecmaVersion<6&&this.unexpected();var t=++this.pos;e=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,e>1114111&&this.invalidStringToken(t,"Code point out of bounds")}else e=this.readHexChar(4);return e},Ie.readString=function(e){for(var t="",n=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var r=this.input.charCodeAt(this.pos);if(r===e)break;92===r?(t+=this.input.slice(n,this.pos),t+=this.readEscapedChar(!1),n=this.pos):(A(r,this.options.ecmaVersion>=10)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(n,this.pos++),this.finishToken(T.string,t)};var Ce={};Ie.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e!==Ce)throw e;this.readInvalidTemplateToken()}this.inTemplateElement=!1},Ie.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw Ce;this.raise(e,t)},Ie.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var n=this.input.charCodeAt(this.pos);if(96===n||36===n&&123===this.input.charCodeAt(this.pos+1))return this.pos!==this.start||this.type!==T.template&&this.type!==T.invalidTemplate?(e+=this.input.slice(t,this.pos),this.finishToken(T.template,e)):36===n?(this.pos+=2,this.finishToken(T.dollarBraceL)):(++this.pos,this.finishToken(T.backQuote));if(92===n)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(A(n)){switch(e+=this.input.slice(t,this.pos),++this.pos,n){case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:e+="\n";break;default:e+=String.fromCharCode(n)}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}},Ie.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if("{"!==this.input[this.pos+1])break;case"`":return this.finishToken(T.invalidTemplate,this.input.slice(this.start,this.pos))}this.raise(this.start,"Unterminated template")},Ie.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return De(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(e){var n=this.pos-1;return this.invalidStringToken(n,"Invalid escape sequence in template string"),null}default:if(t>=48&&t<=55){var r=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],i=parseInt(r,8);return i>255&&(r=r.slice(0,-1),i=parseInt(r,8)),this.pos+=r.length-1,t=this.input.charCodeAt(this.pos),"0"===r&&56!==t&&57!==t||!this.strict&&!e||this.invalidStringToken(this.pos-1-r.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(i)}return A(t)?"":String.fromCharCode(t)}},Ie.readHexChar=function(e){var t=this.pos,n=this.readInt(16,e);return null===n&&this.invalidStringToken(t,"Bad character escape sequence"),n},Ie.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,n=this.pos,r=this.options.ecmaVersion>=6;this.pos<this.input.length;){var i=this.fullCharCodeAtPos();if(d(i,r))this.pos+=i<=65535?1:2;else{if(92!==i)break;this.containsEsc=!0,e+=this.input.slice(n,this.pos);var s=this.pos;117!==this.input.charCodeAt(++this.pos)&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var a=this.readCodePoint();(t?p:d)(a,r)||this.invalidStringToken(s,"Invalid Unicode escape"),e+=De(a),n=this.pos}t=!1}return e+this.input.slice(n,this.pos)},Ie.readWord=function(){var e=this.readWord1(),t=T.name;return this.keywords.test(e)&&(t=y[e]),this.finishToken(t,e)};var $e="7.1.0";O.acorn={Parser:O,version:$e,defaultOptions:N,Position:L,SourceLocation:R,getLineInfo:F,Node:te,TokenType:m,tokTypes:T,keywordTypes:y,TokContext:ie,tokContexts:se,isIdentifierChar:d,isIdentifierStart:p,Token:ke,isNewLine:A,lineBreak:v,lineBreakG:S,nonASCIIwhitespace:_},e.Node=te,e.Parser=O,e.Position=L,e.SourceLocation=R,e.TokContext=ie,e.Token=ke,e.TokenType=m,e.defaultOptions=N,e.getLineInfo=F,e.isIdentifierChar=d,e.isIdentifierStart=p,e.isNewLine=A,e.keywordTypes=y,e.lineBreak=v,e.lineBreakG=S,e.nonASCIIwhitespace=_,e.parse=function(e,t){return O.parse(e,t)},e.parseExpressionAt=function(e,t,n){return O.parseExpressionAt(e,t,n)},e.tokContexts=se,e.tokTypes=T,e.tokenizer=function(e,t){return O.tokenizer(e,t)},e.version=$e,Object.defineProperty(e,"__esModule",{value:!0})}))},{}],2:[function(e,t,n){},{}],3:[function(e,t,n){function r(e,t={}){const{contextName:n="gl",throwGetError:r,useTrackablePrimitives:o,readPixelsFile:u,recording:l=[],variables:h={},onReadPixels:c,onUnrecognizedArgumentLookup:p}=t,d=new Proxy(e,{get:function(t,d){switch(d){case"addComment":return w;case"checkThrowError":return k;case"getReadPixelsVariableName":return g;case"insertVariable":return v;case"reset":return T;case"setIndent":return A;case"toString":return b;case"getContextVariableName":return C}if("function"==typeof e[d])return function(){switch(d){case"getError":return r?l.push(`${y}if (${n}.getError() !== ${n}.NONE) throw new Error('error');`):l.push(`${y}${n}.getError();`),e.getError();case"getExtension":{const t=`${n}Variables${m.length}`;l.push(`${y}const ${t} = ${n}.getExtension('${arguments[0]}');`);const r=e.getExtension(arguments[0]);if(r&&"object"==typeof r){const e=i(r,{getEntity:S,useTrackablePrimitives:o,recording:l,contextName:t,contextVariables:m,variables:h,indent:y,onUnrecognizedArgumentLookup:p});return m.push(e),e}return m.push(null),r}case"readPixels":const t=m.indexOf(arguments[6]);let a;if(-1===t){const e=D(arguments[6]);e?(a=e,l.push(`${y}${e}`)):(a=`${n}Variable${m.length}`,m.push(arguments[6]),l.push(`${y}const ${a} = new ${arguments[6].constructor.name}(${arguments[6].length});`))}else a=`${n}Variable${t}`;g=a;const d=[arguments[0],arguments[1],arguments[2],arguments[3],S(arguments[4]),S(arguments[5]),a];return l.push(`${y}${n}.readPixels(${d.join(", ")});`),u&&E(arguments[2],arguments[3]),c&&c(a,d),e.readPixels.apply(e,arguments);case"drawBuffers":return l.push(`${y}${n}.drawBuffers([${s(arguments[0],{contextName:n,contextVariables:m,getEntity:S,addVariable:_,variables:h,onUnrecognizedArgumentLookup:p})}]);`),e.drawBuffers(arguments[0])}let t=e[d].apply(e,arguments);switch(typeof t){case"undefined":return void l.push(`${y}${I(d,arguments)};`);case"number":case"boolean":if(o&&-1===m.indexOf(a(t))){l.push(`${y}const ${n}Variable${m.length} = ${I(d,arguments)};`),m.push(t=a(t));break}default:null===t?l.push(`${I(d,arguments)};`):l.push(`${y}const ${n}Variable${m.length} = ${I(d,arguments)};`),m.push(t)}return t};return f[e[d]]=d,e[d]}}),m=[],f={};let g,x=0,y="";return d;function b(){return l.join("\n")}function T(){for(;l.length>0;)l.pop()}function v(e,t){h[e]=t}function S(e){const t=f[e];return t?n+"."+t:e}function A(e){y=" ".repeat(e)}function _(e,t){const r=`${n}Variable${m.length}`;return l.push(`${y}const ${r} = ${t};`),m.push(e),r}function E(e,t){const r=`${n}Variable${m.length}`,i=`imageDatum${x}`;l.push(`${y}let ${i} = ["P3\\n# ${u}.ppm\\n", ${e}, ' ', ${t}, "\\n255\\n"].join("");`),l.push(`${y}for (let i = 0; i < ${i}.length; i += 4) {`),l.push(`${y}  ${i} += ${r}[i] + ' ' + ${r}[i + 1] + ' ' + ${r}[i + 2] + ' ';`),l.push(`${y}}`),l.push(`${y}if (typeof require !== "undefined") {`),l.push(`${y}  require('fs').writeFileSync('./${u}.ppm', ${i});`),l.push(`${y}}`),x++}function w(e){l.push(`${y}// ${e}`)}function k(){l.push(`${y}(() => {\n${y}const error = ${n}.getError();\n${y}if (error !== ${n}.NONE) {\n${y}  const names = Object.getOwnPropertyNames(gl);\n${y}  for (let i = 0; i < names.length; i++) {\n${y}    const name = names[i];\n${y}    if (${n}[name] === error) {\n${y}      throw new Error('${n} threw ' + name);\n${y}    }\n${y}  }\n${y}}\n${y}})();`)}function I(e,t){return`${n}.${e}(${s(t,{contextName:n,contextVariables:m,getEntity:S,addVariable:_,variables:h,onUnrecognizedArgumentLookup:p})})`}function D(e){if(h)for(const t in h)if(h[t]===e)return t;return null}function C(e){const t=m.indexOf(e);return-1!==t?`${n}Variable${t}`:null}}function i(e,t){const n=new Proxy(e,{get:function(t,n){if("function"==typeof t[n])return function(){if("drawBuffersWEBGL"===n)return h.push(`${p}${i}.drawBuffersWEBGL([${s(arguments[0],{contextName:i,contextVariables:o,getEntity:m,addVariable:g,variables:c,onUnrecognizedArgumentLookup:d})}]);`),e.drawBuffersWEBGL(arguments[0]);let t=e[n].apply(e,arguments);switch(typeof t){case"undefined":return void h.push(`${p}${f(n,arguments)};`);case"number":case"boolean":l&&-1===o.indexOf(a(t))?(h.push(`${p}const ${i}Variable${o.length} = ${f(n,arguments)};`),o.push(t=a(t))):(h.push(`${p}const ${i}Variable${o.length} = ${f(n,arguments)};`),o.push(t));break;default:null===t?h.push(`${f(n,arguments)};`):h.push(`${p}const ${i}Variable${o.length} = ${f(n,arguments)};`),o.push(t)}return t};return r[e[n]]=n,e[n]}}),r={},{contextName:i,contextVariables:o,getEntity:u,useTrackablePrimitives:l,recording:h,variables:c,indent:p,onUnrecognizedArgumentLookup:d}=t;return n;function m(e){return r.hasOwnProperty(e)?`${i}.${r[e]}`:u(e)}function f(e,t){return`${i}.${e}(${s(t,{contextName:i,contextVariables:o,getEntity:m,addVariable:g,variables:c,onUnrecognizedArgumentLookup:d})})`}function g(e,t){const n=`${i}Variable${o.length}`;return o.push(e),h.push(`${p}const ${n} = ${t};`),n}}function s(e,t){const{variables:n,onUnrecognizedArgumentLookup:r}=t;return Array.from(e).map((e=>{const i=function(e){if(n)for(const t in n)if(n.hasOwnProperty(t)&&n[t]===e)return t;if(r)return r(e);return null}(e);return i||function(e,t){const{contextName:n,contextVariables:r,getEntity:i,addVariable:s,onUnrecognizedArgumentLookup:a}=t;if(void 0===e)return"undefined";if(null===e)return"null";const o=r.indexOf(e);if(o>-1)return`${n}Variable${o}`;switch(e.constructor.name){case"String":const t=/\n/.test(e),n=/'/.test(e),r=/"/.test(e);return t?"`"+e+"`":n&&!r?'"'+e+'"':"'"+e+"'";case"Number":case"Boolean":return i(e);case"Array":return s(e,`new ${e.constructor.name}([${Array.from(e).join(",")}])`);case"Float32Array":case"Uint8Array":case"Uint16Array":case"Int32Array":return s(e,`new ${e.constructor.name}(${JSON.stringify(Array.from(e))})`);default:if(a){const t=a(e);if(t)return t}throw new Error(`unrecognized argument type ${e.constructor.name}`)}}(e,t)})).join(", ")}function a(e){return new e.constructor(e)}void 0!==t&&(t.exports={glWiretap:r,glExtensionWiretap:i}),"undefined"!=typeof window&&(r.glExtensionWiretap=i,window.glWiretap=r)},{}],4:[function(e,t,n){function r(e){const t=new Array(e.length);for(let n=0;n<e.length;n++){const r=e[n];r.toArray?t[n]=r.toArray():t[n]=r}return t}function i(){const e=r(arguments),t=new Float32Array(this.output.x);for(let n=0;n<this.output.x;n++)this.thread.x=n,this.thread.y=0,this.thread.z=0,t[n]=this._fn.apply(this,e);return t}function s(){const e=r(arguments),t=new Array(this.output.y);for(let n=0;n<this.output.y;n++){const r=new Float32Array(this.output.x);for(let t=0;t<this.output.x;t++)this.thread.x=t,this.thread.y=n,this.thread.z=0,r[t]=this._fn.apply(this,e);t[n]=r}return t}function a(){const e=r(arguments);for(let t=0;t<this.output.y;t++)for(let n=0;n<this.output.x;n++)this.thread.x=n,this.thread.y=t,this.thread.z=0,this._fn.apply(this,e)}function o(){const e=r(arguments),t=new Array(this.output.z);for(let n=0;n<this.output.z;n++){const r=new Array(this.output.y);for(let t=0;t<this.output.y;t++){const i=new Float32Array(this.output.x);for(let r=0;r<this.output.x;r++)this.thread.x=r,this.thread.y=t,this.thread.z=n,i[r]=this._fn.apply(this,e);r[t]=i}t[n]=r}return t}function u(e){e.setOutput=t=>{e.output=h(t),e.graphical&&l(e)},e.toJSON=()=>{throw new Error("Not usable with gpuMock")},e.setConstants=t=>(e.constants=t,e),e.setGraphical=t=>(e.graphical=t,e),e.setCanvas=t=>(e.canvas=t,e),e.setContext=t=>(e.context=t,e),e.destroy=()=>{},e.validateSettings=()=>{},e.graphical&&e.output&&l(e),e.exec=function(){return new Promise(((t,n)=>{try{t(e.apply(e,arguments))}catch(e){n(e)}}))},e.getPixels=t=>{const{x:n,y:r}=e.output;return t?function(e,t,n){const r=n/2|0,i=4*t,s=new Uint8ClampedArray(4*t),a=e.slice(0);for(let e=0;e<r;++e){const t=e*i,r=(n-e-1)*i;s.set(a.subarray(t,t+i)),a.copyWithin(t,r,r+i),a.set(s,r)}return a}(e._imageData.data,n,r):e._imageData.data.slice(0)},e.color=function(t,n,r,i){void 0===i&&(i=1),t=Math.floor(255*t),n=Math.floor(255*n),r=Math.floor(255*r),i=Math.floor(255*i);const s=e.output.x,a=e.output.y,o=e.thread.x+(a-e.thread.y-1)*s;e._colorData[4*o+0]=t,e._colorData[4*o+1]=n,e._colorData[4*o+2]=r,e._colorData[4*o+3]=i};const t=()=>e,n=["setWarnVarUsage","setArgumentTypes","setTactic","setOptimizeFloatMemory","setDebug","setLoopMaxIterations","setConstantTypes","setFunctions","setNativeFunctions","setInjectedNative","setPipeline","setPrecision","setOutputToTexture","setImmutable","setStrictIntegers","setDynamicOutput","setHardcodeConstants","setDynamicArguments","setUseLegacyEncoder","setWarnVarUsage","addSubKernel"];for(let r=0;r<n.length;r++)e[n[r]]=t;return e}function l(e){const{x:t,y:n}=e.output;if(e.context&&e.context.createImageData){const r=new Uint8ClampedArray(t*n*4);e._imageData=e.context.createImageData(t,n),e._colorData=r}else{const r=new Uint8ClampedArray(t*n*4);e._imageData={data:r},e._colorData=r}}function h(e){let t=null;if(e.length)if(3===e.length){const[n,r,i]=e;t={x:n,y:r,z:i}}else if(2===e.length){const[n,r]=e;t={x:n,y:r}}else{const[n]=e;t={x:n}}else t=e;return t}t.exports={gpuMock:function(e,t={}){const n=t.output?h(t.output):null;function r(){return r.output.z?o.apply(r,arguments):r.output.y?r.graphical?a.apply(r,arguments):s.apply(r,arguments):i.apply(r,arguments)}return r._fn=e,r.constants=t.constants||null,r.context=t.context||null,r.canvas=t.canvas||null,r.graphical=t.graphical||!1,r._imageData=null,r._colorData=null,r.output=n,r.thread={x:0,y:0,z:0},u(r)}}},{}],5:[function(e,t,n){const{utils:r}=e("./utils");t.exports={alias:function(e,t){const n=t.toString();return new Function(`return function ${e} (${r.getArgumentNamesFromString(n).join(", ")}) {\n  ${r.getFunctionBodyFromString(n)}\n}`)()}}},{"./utils":114}],6:[function(e,t,n){const{FunctionNode:r}=e("../function-node");t.exports={CPUFunctionNode:class extends r{astFunction(e,t){if(!this.isRootKernel){t.push("function"),t.push(" "),t.push(this.name),t.push("(");for(let e=0;e<this.argumentNames.length;++e){const n=this.argumentNames[e];e>0&&t.push(", "),t.push("user_"),t.push(n)}t.push(") {\n")}for(let n=0;n<e.body.body.length;++n)this.astGeneric(e.body.body[n],t),t.push("\n");return this.isRootKernel||t.push("}\n"),t}astReturnStatement(e,t){const n=this.returnType||this.getType(e.argument);return this.returnType||(this.returnType=n),this.isRootKernel?(t.push(this.leadingReturnStatement),this.astGeneric(e.argument,t),t.push(";\n"),t.push(this.followingReturnStatement),t.push("continue;\n")):this.isSubKernel?(t.push(`subKernelResult_${this.name} = `),this.astGeneric(e.argument,t),t.push(";"),t.push(`return subKernelResult_${this.name};`)):(t.push("return "),this.astGeneric(e.argument,t),t.push(";")),t}astLiteral(e,t){if(isNaN(e.value))throw this.astErrorOutput("Non-numeric literal not supported : "+e.value,e);return t.push(e.value),t}astBinaryExpression(e,t){return t.push("("),this.astGeneric(e.left,t),t.push(e.operator),this.astGeneric(e.right,t),t.push(")"),t}astIdentifierExpression(e,t){if("Identifier"!==e.type)throw this.astErrorOutput("IdentifierExpression - not an Identifier",e);if("Infinity"===e.name)t.push("Infinity");else this.constants&&this.constants.hasOwnProperty(e.name)?t.push("constants_"+e.name):t.push("user_"+e.name);return t}astForStatement(e,t){if("ForStatement"!==e.type)throw this.astErrorOutput("Invalid for statement",e);const n=[],r=[],i=[],s=[];let a=null;if(e.init){this.pushState("in-for-loop-init"),this.astGeneric(e.init,n);for(let e=0;e<n.length;e++)n[e].includes&&n[e].includes(",")&&(a=!1);this.popState("in-for-loop-init")}else a=!1;if(e.test?this.astGeneric(e.test,r):a=!1,e.update?this.astGeneric(e.update,i):a=!1,e.body&&(this.pushState("loop-body"),this.astGeneric(e.body,s),this.popState("loop-body")),null===a&&(a=this.isSafe(e.init)&&this.isSafe(e.test)),a)t.push(`for (${n.join("")};${r.join("")};${i.join("")}){\n`),t.push(s.join("")),t.push("}\n");else{const e=this.getInternalVariableName("safeI");n.length>0&&t.push(n.join(""),";\n"),t.push(`for (let ${e}=0;${e}<LOOP_MAX;${e}++){\n`),r.length>0&&t.push(`if (!${r.join("")}) break;\n`),t.push(s.join("")),t.push(`\n${i.join("")};`),t.push("}\n")}return t}astWhileStatement(e,t){if("WhileStatement"!==e.type)throw this.astErrorOutput("Invalid while statement",e);return t.push("for (let i = 0; i < LOOP_MAX; i++) {"),t.push("if ("),this.astGeneric(e.test,t),t.push(") {\n"),this.astGeneric(e.body,t),t.push("} else {\n"),t.push("break;\n"),t.push("}\n"),t.push("}\n"),t}astDoWhileStatement(e,t){if("DoWhileStatement"!==e.type)throw this.astErrorOutput("Invalid while statement",e);return t.push("for (let i = 0; i < LOOP_MAX; i++) {"),this.astGeneric(e.body,t),t.push("if (!"),this.astGeneric(e.test,t),t.push(") {\n"),t.push("break;\n"),t.push("}\n"),t.push("}\n"),t}astAssignmentExpression(e,t){const n=this.getDeclaration(e.left);if(n&&!n.assignable)throw this.astErrorOutput(`Variable ${e.left.name} is not assignable here`,e);return this.astGeneric(e.left,t),t.push(e.operator),this.astGeneric(e.right,t),t}astBlockStatement(e,t){if(this.isState("loop-body")){this.pushState("block-body");for(let n=0;n<e.body.length;n++)this.astGeneric(e.body[n],t);this.popState("block-body")}else{t.push("{\n");for(let n=0;n<e.body.length;n++)this.astGeneric(e.body[n],t);t.push("}\n")}return t}astVariableDeclaration(e,t){t.push(`${e.kind} `);const{declarations:n}=e;for(let e=0;e<n.length;e++){e>0&&t.push(",");const r=n[e],i=this.getDeclaration(r.id);i.valueType||(i.valueType=this.getType(r.init)),this.astGeneric(r,t)}return this.isState("in-for-loop-init")||t.push(";"),t}astIfStatement(e,t){return t.push("if ("),this.astGeneric(e.test,t),t.push(")"),"BlockStatement"===e.consequent.type?this.astGeneric(e.consequent,t):(t.push(" {\n"),this.astGeneric(e.consequent,t),t.push("\n}\n")),e.alternate&&(t.push("else "),"BlockStatement"===e.alternate.type||"IfStatement"===e.alternate.type?this.astGeneric(e.alternate,t):(t.push(" {\n"),this.astGeneric(e.alternate,t),t.push("\n}\n"))),t}astSwitchStatement(e,t){const{discriminant:n,cases:r}=e;t.push("switch ("),this.astGeneric(n,t),t.push(") {\n");for(let e=0;e<r.length;e++)null!==r[e].test?(t.push("case "),this.astGeneric(r[e].test,t),t.push(":\n"),r[e].consequent&&r[e].consequent.length>0&&(this.astGeneric(r[e].consequent,t),t.push("break;\n"))):(t.push("default:\n"),this.astGeneric(r[e].consequent,t),r[e].consequent&&r[e].consequent.length>0&&t.push("break;\n"));t.push("\n}")}astThisExpression(e,t){return t.push("_this"),t}astMemberExpression(e,t){const{signature:n,type:r,property:i,xProperty:s,yProperty:a,zProperty:o,name:u,origin:l}=this.getMemberExpressionDetails(e);switch(n){case"this.thread.value":return t.push(`_this.thread.${u}`),t;case"this.output.value":switch(u){case"x":t.push("outputX");break;case"y":t.push("outputY");break;case"z":t.push("outputZ");break;default:throw this.astErrorOutput("Unexpected expression",e)}return t;case"value":default:throw this.astErrorOutput("Unexpected expression",e);case"value[]":case"value[][]":case"value[][][]":case"value.value":if("Math"===l)return t.push(Math[u]),t;switch(i){case"r":return t.push(`user_${u}[0]`),t;case"g":return t.push(`user_${u}[1]`),t;case"b":return t.push(`user_${u}[2]`),t;case"a":return t.push(`user_${u}[3]`),t}break;case"this.constants.value":case"this.constants.value[]":case"this.constants.value[][]":case"this.constants.value[][][]":break;case"fn()[]":return this.astGeneric(e.object,t),t.push("["),this.astGeneric(e.property,t),t.push("]"),t;case"fn()[][]":return this.astGeneric(e.object.object,t),t.push("["),this.astGeneric(e.object.property,t),t.push("]"),t.push("["),this.astGeneric(e.property,t),t.push("]"),t}if(!e.computed)switch(r){case"Number":case"Integer":case"Float":case"Boolean":return t.push(`${l}_${u}`),t}const h=`${l}_${u}`;{let e,n;if("constants"===l){const t=this.constants[u];n="Input"===this.constantTypes[u],e=n?t.size:null}else n=this.isInput(u),e=n?this.argumentSizes[this.argumentNames.indexOf(u)]:null;t.push(`${h}`),o&&a?n?(t.push("[("),this.astGeneric(o,t),t.push(`*${this.dynamicArguments?"(outputY * outputX)":e[1]*e[0]})+(`),this.astGeneric(a,t),t.push(`*${this.dynamicArguments?"outputX":e[0]})+`),this.astGeneric(s,t),t.push("]")):(t.push("["),this.astGeneric(o,t),t.push("]"),t.push("["),this.astGeneric(a,t),t.push("]"),t.push("["),this.astGeneric(s,t),t.push("]")):a?n?(t.push("[("),this.astGeneric(a,t),t.push(`*${this.dynamicArguments?"outputX":e[0]})+`),this.astGeneric(s,t),t.push("]")):(t.push("["),this.astGeneric(a,t),t.push("]"),t.push("["),this.astGeneric(s,t),t.push("]")):void 0!==s&&(t.push("["),this.astGeneric(s,t),t.push("]"))}return t}astCallExpression(e,t){if("CallExpression"!==e.type)throw this.astErrorOutput("Unknown CallExpression",e);let n=this.astMemberExpressionUnroll(e.callee);this.calledFunctions.indexOf(n)<0&&this.calledFunctions.push(n);this.isAstMathFunction(e);this.onFunctionCall&&this.onFunctionCall(this.name,n,e.arguments),t.push(n),t.push("(");const r=this.lookupFunctionArgumentTypes(n)||[];for(let i=0;i<e.arguments.length;++i){const s=e.arguments[i];let a=this.getType(s);r[i]||this.triggerImplyArgumentType(n,i,a,this),i>0&&t.push(", "),this.astGeneric(s,t)}return t.push(")"),t}astArrayExpression(e,t){const n=this.getType(e),r=e.elements.length,i=[];for(let t=0;t<r;++t){const n=[];this.astGeneric(e.elements[t],n),i.push(n.join(""))}switch(n){case"Matrix(2)":case"Matrix(3)":case"Matrix(4)":t.push(`[${i.join(", ")}]`);break;default:t.push(`new Float32Array([${i.join(", ")}])`)}return t}astDebuggerStatement(e,t){return t.push("debugger;"),t}}}},{"../function-node":10}],7:[function(e,t,n){const{utils:r}=e("../../utils");t.exports={cpuKernelString:function(e,t){const n=[],i=[],s=[],a=!/^function/.test(e.color.toString());if(n.push("  const { context, canvas, constants: incomingConstants } = settings;",`  const output = new Int32Array(${JSON.stringify(Array.from(e.output))});`,`  const _constantTypes = ${JSON.stringify(e.constantTypes)};`,`  const _constants = ${function(e,t){const n=[];for(const r in t){if(!t.hasOwnProperty(r))continue;const i=t[r],s=e[r];switch(i){case"Number":case"Integer":case"Float":case"Boolean":n.push(`${r}:${s}`);break;case"Array(2)":case"Array(3)":case"Array(4)":case"Matrix(2)":case"Matrix(3)":case"Matrix(4)":n.push(`${r}:new ${s.constructor.name}(${JSON.stringify(Array.from(s))})`)}}return`{ ${n.join()} }`}(e.constants,e.constantTypes)};`),i.push("    constants: _constants,","    context,","    output,","    thread: {x: 0, y: 0, z: 0},"),e.graphical){n.push(`  const _imageData = context.createImageData(${e.output[0]}, ${e.output[1]});`),n.push(`  const _colorData = new Uint8ClampedArray(${e.output[0]} * ${e.output[1]} * 4);`);const t=r.flattenFunctionToString((a?"function ":"")+e.color.toString(),{thisLookup:t=>{switch(t){case"_colorData":return"_colorData";case"_imageData":return"_imageData";case"output":return"output";case"thread":return"this.thread"}return JSON.stringify(e[t])},findDependency:(e,t)=>null}),o=r.flattenFunctionToString((a?"function ":"")+e.getPixels.toString(),{thisLookup:t=>{switch(t){case"_colorData":return"_colorData";case"_imageData":return"_imageData";case"output":return"output";case"thread":return"this.thread"}return JSON.stringify(e[t])},findDependency:()=>null});i.push("    _imageData,","    _colorData,",`    color: ${t},`),s.push(`  kernel.getPixels = ${o};`)}const o=[],u=Object.keys(e.constantTypes);for(let t=0;t<u.length;t++)o.push(e.constantTypes[u]);if(-1!==e.argumentTypes.indexOf("HTMLImageArray")||-1!==o.indexOf("HTMLImageArray")){const t=r.flattenFunctionToString((a?"function ":"")+e._imageTo3DArray.toString(),{doNotDefine:["canvas"],findDependency:(t,n)=>"this"===t?(a?"function ":"")+e[n].toString():null,thisLookup:e=>{switch(e){case"canvas":return;case"context":return"context"}}});s.push(t),i.push("    _mediaTo2DArray,"),i.push("    _imageTo3DArray,")}else if(-1!==e.argumentTypes.indexOf("HTMLImage")||-1!==o.indexOf("HTMLImage")){const t=r.flattenFunctionToString((a?"function ":"")+e._mediaTo2DArray.toString(),{findDependency:(e,t)=>null,thisLookup:e=>{switch(e){case"canvas":return"settings.canvas";case"context":return"settings.context"}throw new Error("unhandled thisLookup")}});s.push(t),i.push("    _mediaTo2DArray,")}return`function(settings) {\n${n.join("\n")}\n  for (const p in _constantTypes) {\n    if (!_constantTypes.hasOwnProperty(p)) continue;\n    const type = _constantTypes[p];\n    switch (type) {\n      case 'Number':\n      case 'Integer':\n      case 'Float':\n      case 'Boolean':\n      case 'Array(2)':\n      case 'Array(3)':\n      case 'Array(4)':\n      case 'Matrix(2)':\n      case 'Matrix(3)':\n      case 'Matrix(4)':\n        if (incomingConstants.hasOwnProperty(p)) {\n          console.warn('constant ' + p + ' of type ' + type + ' cannot be resigned');\n        }\n        continue;\n    }\n    if (!incomingConstants.hasOwnProperty(p)) {\n      throw new Error('constant ' + p + ' not found');\n    }\n    _constants[p] = incomingConstants[p];\n  }\n  const kernel = (function() {\n${e._kernelString}\n  })\n    .apply({ ${i.join("\n")} });\n  ${s.join("\n")}\n  return kernel;\n}`}}},{"../../utils":114}],8:[function(e,t,n){const{Kernel:r}=e("../kernel"),{FunctionBuilder:i}=e("../function-builder"),{CPUFunctionNode:s}=e("./function-node"),{utils:a}=e("../../utils"),{cpuKernelString:o}=e("./kernel-string");t.exports={CPUKernel:class extends r{static getFeatures(){return this.features}static get features(){return Object.freeze({kernelMap:!0,isIntegerDivisionAccurate:!0})}static get isSupported(){return!0}static isContextMatch(e){return!1}static get mode(){return"cpu"}static nativeFunctionArguments(){return null}static nativeFunctionReturnType(){throw new Error(`Looking up native function return type not supported on ${this.name}`)}static combineKernels(e){return e}static getSignature(e,t){return"cpu"+(t.length>0?":"+t.join(","):"")}constructor(e,t){super(e,t),this.mergeSettings(e.settings||t),this._imageData=null,this._colorData=null,this._kernelString=null,this._prependedString=[],this.thread={x:0,y:0,z:0},this.translatedSources=null}initCanvas(){return"undefined"!=typeof document?document.createElement("canvas"):"undefined"!=typeof OffscreenCanvas?new OffscreenCanvas(0,0):void 0}initContext(){return this.canvas?this.canvas.getContext("2d"):null}initPlugins(e){return[]}validateSettings(e){if(!this.output||0===this.output.length){if(1!==e.length)throw new Error("Auto output only supported for kernels with only one input");const t=a.getVariableType(e[0],this.strictIntegers);if("Array"===t)this.output=a.getDimensions(t);else{if("NumberTexture"!==t&&"ArrayTexture(4)"!==t)throw new Error("Auto output not supported for input type: "+t);this.output=e[0].output}}if(this.graphical&&2!==this.output.length)throw new Error("Output must have 2 dimensions on graphical mode");this.checkOutput()}translateSource(){if(this.leadingReturnStatement=this.output.length>1?"resultX[x] = ":"result[x] = ",this.subKernels){const e=[];for(let t=0;t<this.subKernels.length;t++){const{name:n}=this.subKernels[t];e.push(this.output.length>1?`resultX_${n}[x] = subKernelResult_${n};\n`:`result_${n}[x] = subKernelResult_${n};\n`)}this.followingReturnStatement=e.join("")}const e=i.fromKernel(this,s);this.translatedSources=e.getPrototypes("kernel"),this.graphical||this.returnType||(this.returnType=e.getKernelResultType())}build(){if(this.built)return;if(this.setupConstants(),this.setupArguments(arguments),this.validateSettings(arguments),this.translateSource(),this.graphical){const{canvas:e,output:t}=this;if(!e)throw new Error("no canvas available for using graphical output");const n=t[0],r=t[1]||1;e.width=n,e.height=r,this._imageData=this.context.createImageData(n,r),this._colorData=new Uint8ClampedArray(n*r*4)}const e=this.getKernelString();this.kernelString=e,this.debug&&(console.log("Function output:"),console.log(e));try{this.run=new Function([],e).bind(this)()}catch(e){console.error("An error occurred compiling the javascript: ",e)}this.buildSignature(arguments),this.built=!0}color(e,t,n,r){void 0===r&&(r=1),e=Math.floor(255*e),t=Math.floor(255*t),n=Math.floor(255*n),r=Math.floor(255*r);const i=this.output[0],s=this.output[1],a=this.thread.x+(s-this.thread.y-1)*i;this._colorData[4*a+0]=e,this._colorData[4*a+1]=t,this._colorData[4*a+2]=n,this._colorData[4*a+3]=r}getKernelString(){if(null!==this._kernelString)return this._kernelString;let e=null,{translatedSources:t}=this;return t.length>1?t=t.filter((t=>/^function/.test(t)?t:(e=t,!1))):e=t.shift(),this._kernelString=`  const LOOP_MAX = ${this._getLoopMaxString()};\n  ${this.injectedNative||""}\n  const _this = this;\n  ${this._resultKernelHeader()}\n  ${this._processConstants()}\n  return (${this.argumentNames.map((e=>"user_"+e)).join(", ")}) => {\n    ${this._prependedString.join("")}\n    ${this._earlyThrows()}\n    ${this._processArguments()}\n    ${this.graphical?this._graphicalKernelBody(e):this._resultKernelBody(e)}\n    ${t.length>0?t.join("\n"):""}\n  };`}toString(){return o(this)}_getLoopMaxString(){return this.loopMaxIterations?` ${parseInt(this.loopMaxIterations)};`:" 1000;"}_processConstants(){if(!this.constants)return"";const e=[];for(let t in this.constants){switch(this.constantTypes[t]){case"HTMLCanvas":case"OffscreenCanvas":case"HTMLImage":case"ImageBitmap":case"ImageData":case"HTMLVideo":e.push(`    const constants_${t} = this._mediaTo2DArray(this.constants.${t});\n`);break;case"HTMLImageArray":e.push(`    const constants_${t} = this._imageTo3DArray(this.constants.${t});\n`);break;case"Input":e.push(`    const constants_${t} = this.constants.${t}.value;\n`);break;default:e.push(`    const constants_${t} = this.constants.${t};\n`)}}return e.join("")}_earlyThrows(){if(this.graphical)return"";if(this.immutable)return"";if(!this.pipeline)return"";const e=[];for(let t=0;t<this.argumentTypes.length;t++)"Array"===this.argumentTypes[t]&&e.push(this.argumentNames[t]);if(0===e.length)return"";const t=[];for(let n=0;n<e.length;n++){const r=e[n],i=this._mapSubKernels((e=>`user_${r} === result_${e.name}`)).join(" || ");t.push(`user_${r} === result${i?` || ${i}`:""}`)}return`if (${t.join(" || ")}) throw new Error('Source and destination arrays are the same.  Use immutable = true');`}_processArguments(){const e=[];for(let t=0;t<this.argumentTypes.length;t++){const n=`user_${this.argumentNames[t]}`;switch(this.argumentTypes[t]){case"HTMLCanvas":case"OffscreenCanvas":case"HTMLImage":case"ImageBitmap":case"ImageData":case"HTMLVideo":e.push(`    ${n} = this._mediaTo2DArray(${n});\n`);break;case"HTMLImageArray":e.push(`    ${n} = this._imageTo3DArray(${n});\n`);break;case"Input":e.push(`    ${n} = ${n}.value;\n`);break;case"ArrayTexture(1)":case"ArrayTexture(2)":case"ArrayTexture(3)":case"ArrayTexture(4)":case"NumberTexture":case"MemoryOptimizedNumberTexture":e.push(`\n    if (${n}.toArray) {\n      if (!_this.textureCache) {\n        _this.textureCache = [];\n        _this.arrayCache = [];\n      }\n      const textureIndex = _this.textureCache.indexOf(${n});\n      if (textureIndex !== -1) {\n        ${n} = _this.arrayCache[textureIndex];\n      } else {\n        _this.textureCache.push(${n});\n        ${n} = ${n}.toArray();\n        _this.arrayCache.push(${n});\n      }\n    }`)}}return e.join("")}_mediaTo2DArray(e){const t=this.canvas,n=e.width>0?e.width:e.videoWidth,r=e.height>0?e.height:e.videoHeight;t.width<n&&(t.width=n),t.height<r&&(t.height=r);const i=this.context;let s;e.constructor===ImageData?s=e.data:(i.drawImage(e,0,0,n,r),s=i.getImageData(0,0,n,r).data);const a=new Array(r);let o=0;for(let e=r-1;e>=0;e--){const t=a[e]=new Array(n);for(let e=0;e<n;e++){const n=new Float32Array(4);n[0]=s[o++]/255,n[1]=s[o++]/255,n[2]=s[o++]/255,n[3]=s[o++]/255,t[e]=n}}return a}getPixels(e){const[t,n]=this.output;return e?a.flipPixels(this._imageData.data,t,n):this._imageData.data.slice(0)}_imageTo3DArray(e){const t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=this._mediaTo2DArray(e[n]);return t}_resultKernelHeader(){if(this.graphical)return"";if(this.immutable)return"";if(!this.pipeline)return"";switch(this.output.length){case 1:return this._mutableKernel1DResults();case 2:return this._mutableKernel2DResults();case 3:return this._mutableKernel3DResults()}}_resultKernelBody(e){switch(this.output.length){case 1:return(!this.immutable&&this.pipeline?this._resultMutableKernel1DLoop(e):this._resultImmutableKernel1DLoop(e))+this._kernelOutput();case 2:return(!this.immutable&&this.pipeline?this._resultMutableKernel2DLoop(e):this._resultImmutableKernel2DLoop(e))+this._kernelOutput();case 3:return(!this.immutable&&this.pipeline?this._resultMutableKernel3DLoop(e):this._resultImmutableKernel3DLoop(e))+this._kernelOutput();default:throw new Error("unsupported size kernel")}}_graphicalKernelBody(e){if(2===this.output.length)return this._graphicalKernel2DLoop(e)+this._graphicalOutput();throw new Error("unsupported size kernel")}_graphicalOutput(){return"\n    this._imageData.data.set(this._colorData);\n    this.context.putImageData(this._imageData, 0, 0);\n    return;"}_getKernelResultTypeConstructorString(){switch(this.returnType){case"LiteralInteger":case"Number":case"Integer":case"Float":return"Float32Array";case"Array(2)":case"Array(3)":case"Array(4)":return"Array";default:if(this.graphical)return"Float32Array";throw new Error(`unhandled returnType ${this.returnType}`)}}_resultImmutableKernel1DLoop(e){const t=this._getKernelResultTypeConstructorString();return`  const outputX = _this.output[0];\n    const result = new ${t}(outputX);\n    ${this._mapSubKernels((e=>`const result_${e.name} = new ${t}(outputX);\n`)).join("    ")}\n    ${this._mapSubKernels((e=>`let subKernelResult_${e.name};\n`)).join("    ")}\n    for (let x = 0; x < outputX; x++) {\n      this.thread.x = x;\n      this.thread.y = 0;\n      this.thread.z = 0;\n      ${e}\n    }`}_mutableKernel1DResults(){const e=this._getKernelResultTypeConstructorString();return`  const outputX = _this.output[0];\n    const result = new ${e}(outputX);\n    ${this._mapSubKernels((t=>`const result_${t.name} = new ${e}(outputX);\n`)).join("    ")}\n    ${this._mapSubKernels((e=>`let subKernelResult_${e.name};\n`)).join("    ")}`}_resultMutableKernel1DLoop(e){return`  const outputX = _this.output[0];\n    for (let x = 0; x < outputX; x++) {\n      this.thread.x = x;\n      this.thread.y = 0;\n      this.thread.z = 0;\n      ${e}\n    }`}_resultImmutableKernel2DLoop(e){const t=this._getKernelResultTypeConstructorString();return`  const outputX = _this.output[0];\n    const outputY = _this.output[1];\n    const result = new Array(outputY);\n    ${this._mapSubKernels((e=>`const result_${e.name} = new Array(outputY);\n`)).join("    ")}\n    ${this._mapSubKernels((e=>`let subKernelResult_${e.name};\n`)).join("    ")}\n    for (let y = 0; y < outputY; y++) {\n      this.thread.z = 0;\n      this.thread.y = y;\n      const resultX = result[y] = new ${t}(outputX);\n      ${this._mapSubKernels((e=>`const resultX_${e.name} = result_${e.name}[y] = new ${t}(outputX);\n`)).join("")}\n      for (let x = 0; x < outputX; x++) {\n        this.thread.x = x;\n        ${e}\n      }\n    }`}_mutableKernel2DResults(){const e=this._getKernelResultTypeConstructorString();return`  const outputX = _this.output[0];\n    const outputY = _this.output[1];\n    const result = new Array(outputY);\n    ${this._mapSubKernels((e=>`const result_${e.name} = new Array(outputY);\n`)).join("    ")}\n    ${this._mapSubKernels((e=>`let subKernelResult_${e.name};\n`)).join("    ")}\n    for (let y = 0; y < outputY; y++) {\n      const resultX = result[y] = new ${e}(outputX);\n      ${this._mapSubKernels((t=>`const resultX_${t.name} = result_${t.name}[y] = new ${e}(outputX);\n`)).join("")}\n    }`}_resultMutableKernel2DLoop(e){const t=this._getKernelResultTypeConstructorString();return`  const outputX = _this.output[0];\n    const outputY = _this.output[1];\n    for (let y = 0; y < outputY; y++) {\n      this.thread.z = 0;\n      this.thread.y = y;\n      const resultX = result[y];\n      ${this._mapSubKernels((e=>`const resultX_${e.name} = result_${e.name}[y] = new ${t}(outputX);\n`)).join("")}\n      for (let x = 0; x < outputX; x++) {\n        this.thread.x = x;\n        ${e}\n      }\n    }`}_graphicalKernel2DLoop(e){return`  const outputX = _this.output[0];\n    const outputY = _this.output[1];\n    for (let y = 0; y < outputY; y++) {\n      this.thread.z = 0;\n      this.thread.y = y;\n      for (let x = 0; x < outputX; x++) {\n        this.thread.x = x;\n        ${e}\n      }\n    }`}_resultImmutableKernel3DLoop(e){const t=this._getKernelResultTypeConstructorString();return`  const outputX = _this.output[0];\n    const outputY = _this.output[1];\n    const outputZ = _this.output[2];\n    const result = new Array(outputZ);\n    ${this._mapSubKernels((e=>`const result_${e.name} = new Array(outputZ);\n`)).join("    ")}\n    ${this._mapSubKernels((e=>`let subKernelResult_${e.name};\n`)).join("    ")}\n    for (let z = 0; z < outputZ; z++) {\n      this.thread.z = z;\n      const resultY = result[z] = new Array(outputY);\n      ${this._mapSubKernels((e=>`const resultY_${e.name} = result_${e.name}[z] = new Array(outputY);\n`)).join("      ")}\n      for (let y = 0; y < outputY; y++) {\n        this.thread.y = y;\n        const resultX = resultY[y] = new ${t}(outputX);\n        ${this._mapSubKernels((e=>`const resultX_${e.name} = resultY_${e.name}[y] = new ${t}(outputX);\n`)).join("        ")}\n        for (let x = 0; x < outputX; x++) {\n          this.thread.x = x;\n          ${e}\n        }\n      }\n    }`}_mutableKernel3DResults(){const e=this._getKernelResultTypeConstructorString();return`  const outputX = _this.output[0];\n    const outputY = _this.output[1];\n    const outputZ = _this.output[2];\n    const result = new Array(outputZ);\n    ${this._mapSubKernels((e=>`const result_${e.name} = new Array(outputZ);\n`)).join("    ")}\n    ${this._mapSubKernels((e=>`let subKernelResult_${e.name};\n`)).join("    ")}\n    for (let z = 0; z < outputZ; z++) {\n      const resultY = result[z] = new Array(outputY);\n      ${this._mapSubKernels((e=>`const resultY_${e.name} = result_${e.name}[z] = new Array(outputY);\n`)).join("      ")}\n      for (let y = 0; y < outputY; y++) {\n        const resultX = resultY[y] = new ${e}(outputX);\n        ${this._mapSubKernels((t=>`const resultX_${t.name} = resultY_${t.name}[y] = new ${e}(outputX);\n`)).join("        ")}\n      }\n    }`}_resultMutableKernel3DLoop(e){return`  const outputX = _this.output[0];\n    const outputY = _this.output[1];\n    const outputZ = _this.output[2];\n    for (let z = 0; z < outputZ; z++) {\n      this.thread.z = z;\n      const resultY = result[z];\n      for (let y = 0; y < outputY; y++) {\n        this.thread.y = y;\n        const resultX = resultY[y];\n        for (let x = 0; x < outputX; x++) {\n          this.thread.x = x;\n          ${e}\n        }\n      }\n    }`}_kernelOutput(){return this.subKernels?`\n    return {\n      result: result,\n      ${this.subKernels.map((e=>`${e.property}: result_${e.name}`)).join(",\n      ")}\n    };`:"\n    return result;"}_mapSubKernels(e){return null===this.subKernels?[""]:this.subKernels.map(e)}destroy(e){e&&delete this.canvas}static destroyContext(e){}toJSON(){const e=super.toJSON();return e.functionNodes=i.fromKernel(this,s).toJSON(),e}setOutput(e){super.setOutput(e);const[t,n]=this.output;this.graphical&&(this._imageData=this.context.createImageData(t,n),this._colorData=new Uint8ClampedArray(t*n*4))}prependString(e){if(this._kernelString)throw new Error("Kernel already built");this._prependedString.push(e)}hasPrependString(e){return this._prependedString.indexOf(e)>-1}}}},{"../../utils":114,"../function-builder":9,"../kernel":36,"./function-node":6,"./kernel-string":7}],9:[function(e,t,n){class r{static fromKernel(e,t,n){const{kernelArguments:i,kernelConstants:s,argumentNames:a,argumentSizes:o,argumentBitRatios:u,constants:l,constantBitRatios:h,debug:c,loopMaxIterations:p,nativeFunctions:d,output:m,optimizeFloatMemory:f,precision:g,plugins:x,source:y,subKernels:b,functions:T,leadingReturnStatement:v,followingReturnStatement:S,dynamicArguments:A,dynamicOutput:_}=e,E=new Array(i.length),w={};for(let e=0;e<i.length;e++)E[e]=i[e].type;for(let e=0;e<s.length;e++){const t=s[e];w[t.name]=t.type}const k=(e,t)=>G.needsArgumentType(e,t),I=(e,t,n)=>{G.assignArgumentType(e,t,n)},D=(e,t,n)=>G.lookupReturnType(e,t,n),C=e=>G.lookupFunctionArgumentTypes(e),$=(e,t)=>G.lookupFunctionArgumentName(e,t),L=(e,t)=>G.lookupFunctionArgumentBitRatio(e,t),R=(e,t,n,r)=>{G.assignArgumentType(e,t,n,r)},F=(e,t,n,r)=>{G.assignArgumentBitRatio(e,t,n,r)},N=(e,t,n)=>{G.trackFunctionCall(e,t,n)},V=(e,n)=>{const r=[];for(let t=0;t<e.params.length;t++)r.push(e.params[t].name);const i=new t(n,Object.assign({},M,{returnType:null,ast:e,name:e.id.name,argumentNames:r,lookupReturnType:D,lookupFunctionArgumentTypes:C,lookupFunctionArgumentName:$,lookupFunctionArgumentBitRatio:L,needsArgumentType:k,assignArgumentType:I,triggerImplyArgumentType:R,triggerImplyArgumentBitRatio:F,onFunctionCall:N}));i.traceFunctionAST(e),G.addFunctionNode(i)},M=Object.assign({isRootKernel:!1,onNestedFunction:V,lookupReturnType:D,lookupFunctionArgumentTypes:C,lookupFunctionArgumentName:$,lookupFunctionArgumentBitRatio:L,needsArgumentType:k,assignArgumentType:I,triggerImplyArgumentType:R,triggerImplyArgumentBitRatio:F,onFunctionCall:N,optimizeFloatMemory:f,precision:g,constants:l,constantTypes:w,constantBitRatios:h,debug:c,loopMaxIterations:p,output:m,plugins:x,dynamicArguments:A,dynamicOutput:_},n||{}),O=Object.assign({},M,{isRootKernel:!0,name:"kernel",argumentNames:a,argumentTypes:E,argumentSizes:o,argumentBitRatios:u,leadingReturnStatement:v,followingReturnStatement:S});if("object"==typeof y&&y.functionNodes)return(new r).fromJSON(y.functionNodes,t);const z=new t(y,O);let P=null;T&&(P=T.map((e=>new t(e.source,{returnType:e.returnType,argumentTypes:e.argumentTypes,output:m,plugins:x,constants:l,constantTypes:w,constantBitRatios:h,optimizeFloatMemory:f,precision:g,lookupReturnType:D,lookupFunctionArgumentTypes:C,lookupFunctionArgumentName:$,lookupFunctionArgumentBitRatio:L,needsArgumentType:k,assignArgumentType:I,triggerImplyArgumentType:R,triggerImplyArgumentBitRatio:F,onFunctionCall:N,onNestedFunction:V}))));let K=null;b&&(K=b.map((e=>{const{name:n,source:r}=e;return new t(r,Object.assign({},M,{name:n,isSubKernel:!0,isRootKernel:!1}))})));const G=new r({kernel:e,rootNode:z,functionNodes:P,nativeFunctions:d,subKernelNodes:K});return G}constructor(e){if(e=e||{},this.kernel=e.kernel,this.rootNode=e.rootNode,this.functionNodes=e.functionNodes||[],this.subKernelNodes=e.subKernelNodes||[],this.nativeFunctions=e.nativeFunctions||[],this.functionMap={},this.nativeFunctionNames=[],this.lookupChain=[],this.functionNodeDependencies={},this.functionCalls={},this.rootNode&&(this.functionMap.kernel=this.rootNode),this.functionNodes)for(let e=0;e<this.functionNodes.length;e++)this.functionMap[this.functionNodes[e].name]=this.functionNodes[e];if(this.subKernelNodes)for(let e=0;e<this.subKernelNodes.length;e++)this.functionMap[this.subKernelNodes[e].name]=this.subKernelNodes[e];if(this.nativeFunctions)for(let e=0;e<this.nativeFunctions.length;e++){const t=this.nativeFunctions[e];this.nativeFunctionNames.push(t.name)}}addFunctionNode(e){if(!e.name)throw new Error("functionNode.name needs set");this.functionMap[e.name]=e,e.isRootKernel&&(this.rootNode=e)}traceFunctionCalls(e,t){if(e=e||"kernel",t=t||[],this.nativeFunctionNames.indexOf(e)>-1){const n=t.indexOf(e);if(-1===n)t.push(e);else{const e=t.splice(n,1)[0];t.push(e)}return t}const n=this.functionMap[e];if(n){const r=t.indexOf(e);if(-1===r){t.push(e),n.toString();for(let e=0;e<n.calledFunctions.length;++e)this.traceFunctionCalls(n.calledFunctions[e],t)}else{const e=t.splice(r,1)[0];t.push(e)}}return t}getPrototypeString(e){return this.getPrototypes(e).join("\n")}getPrototypes(e){return this.rootNode&&this.rootNode.toString(),e?this.getPrototypesFromFunctionNames(this.traceFunctionCalls(e,[]).reverse()):this.getPrototypesFromFunctionNames(Object.keys(this.functionMap))}getStringFromFunctionNames(e){const t=[];for(let n=0;n<e.length;++n){this.functionMap[e[n]]&&t.push(this.functionMap[e[n]].toString())}return t.join("\n")}getPrototypesFromFunctionNames(e){const t=[];for(let n=0;n<e.length;++n){const r=e[n],i=this.nativeFunctionNames.indexOf(r);if(i>-1){t.push(this.nativeFunctions[i].source);continue}const s=this.functionMap[r];s&&t.push(s.toString())}return t}toJSON(){return this.traceFunctionCalls(this.rootNode.name).reverse().map((e=>{const t=this.nativeFunctions.indexOf(e);if(t>-1)return{name:e,source:this.nativeFunctions[t].source};if(this.functionMap[e])return this.functionMap[e].toJSON();throw new Error(`function ${e} not found`)}))}fromJSON(e,t){this.functionMap={};for(let n=0;n<e.length;n++){const r=e[n];this.functionMap[r.settings.name]=new t(r.ast,r.settings)}return this}getString(e){return e?this.getStringFromFunctionNames(this.traceFunctionCalls(e).reverse()):this.getStringFromFunctionNames(Object.keys(this.functionMap))}lookupReturnType(e,t,n){if("CallExpression"!==t.type)throw new Error(`expected ast type of "CallExpression", but is ${t.type}`);if(this._isNativeFunction(e))return this._lookupNativeFunctionReturnType(e);if(this._isFunction(e)){const r=this._getFunction(e);if(r.returnType)return r.returnType;{for(let e=0;e<this.lookupChain.length;e++)if(this.lookupChain[e].ast===t){if(0===r.argumentTypes.length&&t.arguments.length>0){const i=t.arguments;for(let t=0;t<i.length;t++)this.lookupChain.push({name:n.name,ast:i[e],requestingNode:n}),r.argumentTypes[t]=n.getType(i[t]),this.lookupChain.pop();return r.returnType=r.getType(r.getJsAST())}throw new Error("circlical logic detected!")}this.lookupChain.push({name:n.name,ast:t,requestingNode:n});const e=r.getType(r.getJsAST());return this.lookupChain.pop(),r.returnType=e}}return null}_getFunction(e){return this._isFunction(e)||new Error(`Function ${e} not found`),this.functionMap[e]}_isFunction(e){return Boolean(this.functionMap[e])}_getNativeFunction(e){for(let t=0;t<this.nativeFunctions.length;t++)if(this.nativeFunctions[t].name===e)return this.nativeFunctions[t];return null}_isNativeFunction(e){return Boolean(this._getNativeFunction(e))}_lookupNativeFunctionReturnType(e){let t=this._getNativeFunction(e);if(t)return t.returnType;throw new Error(`Native function ${e} not found`)}lookupFunctionArgumentTypes(e){return this._isNativeFunction(e)?this._getNativeFunction(e).argumentTypes:this._isFunction(e)?this._getFunction(e).argumentTypes:null}lookupFunctionArgumentName(e,t){return this._getFunction(e).argumentNames[t]}lookupFunctionArgumentBitRatio(e,t){if(!this._isFunction(e))throw new Error("function not found");if(this.rootNode.name===e){const e=this.rootNode.argumentNames.indexOf(t);if(-1!==e)return this.rootNode.argumentBitRatios[e]}const n=this._getFunction(e),r=n.argumentNames.indexOf(t);if(-1===r)throw new Error("argument not found");const i=n.argumentBitRatios[r];if("number"!=typeof i)throw new Error("argument bit ratio not found");return i}needsArgumentType(e,t){if(!this._isFunction(e))return!1;return!this._getFunction(e).argumentTypes[t]}assignArgumentType(e,t,n,r){if(!this._isFunction(e))return;const i=this._getFunction(e);i.argumentTypes[t]||(i.argumentTypes[t]=n)}assignArgumentBitRatio(e,t,n,r){const i=this._getFunction(e);if(this._isNativeFunction(n))return null;const s=this._getFunction(n),a=i.argumentNames.indexOf(t);if(-1===a)throw new Error(`Argument ${t} not found in arguments from function ${e}`);const o=i.argumentBitRatios[a];if("number"!=typeof o)throw new Error(`Bit ratio for argument ${t} not found in function ${e}`);s.argumentBitRatios||(s.argumentBitRatios=new Array(s.argumentNames.length));const u=s.argumentBitRatios[a];if("number"==typeof u){if(u!==o)throw new Error(`Incompatible bit ratio found at function ${e} at argument ${t}`);return u}return s.argumentBitRatios[a]=o,o}trackFunctionCall(e,t,n){this.functionNodeDependencies[e]||(this.functionNodeDependencies[e]=new Set,this.functionCalls[e]=[]),this.functionNodeDependencies[e].add(t),this.functionCalls[e].push(n)}getKernelResultType(){return this.rootNode.returnType||this.rootNode.getType(this.rootNode.ast)}getSubKernelResultType(e){const t=this.subKernelNodes[e];let n=!1;for(let e=0;e<this.rootNode.functionCalls.length;e++){this.rootNode.functionCalls[e].ast.callee.name===t.name&&(n=!0)}if(!n)throw new Error(`SubKernel ${t.name} never called by kernel`);return t.returnType||t.getType(t.getJsAST())}getReturnTypes(){const e={[this.rootNode.name]:this.rootNode.getType(this.rootNode.ast)},t=this.traceFunctionCalls(this.rootNode.name);for(let n=0;n<t.length;n++){const r=t[n],i=this.functionMap[r];e[r]=i.getType(i.ast)}return e}}t.exports={FunctionBuilder:r}},{}],10:[function(e,t,n){const r=e("acorn"),{utils:i}=e("../utils"),{FunctionTracer:s}=e("./function-tracer");const a={Number:"Number",Float:"Float",Integer:"Integer",Array:"Number","Array(2)":"Number","Array(3)":"Number","Array(4)":"Number","Matrix(2)":"Number","Matrix(3)":"Number","Matrix(4)":"Number",Array2D:"Number",Array3D:"Number",Input:"Number",HTMLCanvas:"Array(4)",OffscreenCanvas:"Array(4)",HTMLImage:"Array(4)",ImageBitmap:"Array(4)",ImageData:"Array(4)",HTMLVideo:"Array(4)",HTMLImageArray:"Array(4)",NumberTexture:"Number",MemoryOptimizedNumberTexture:"Number","Array1D(2)":"Array(2)","Array1D(3)":"Array(3)","Array1D(4)":"Array(4)","Array2D(2)":"Array(2)","Array2D(3)":"Array(3)","Array2D(4)":"Array(4)","Array3D(2)":"Array(2)","Array3D(3)":"Array(3)","Array3D(4)":"Array(4)","ArrayTexture(1)":"Number","ArrayTexture(2)":"Array(2)","ArrayTexture(3)":"Array(3)","ArrayTexture(4)":"Array(4)"};t.exports={FunctionNode:class{constructor(e,t){if(!e&&!t.ast)throw new Error("source parameter is missing");if(t=t||{},this.source=e,this.ast=null,this.name="string"==typeof e?t.isRootKernel?"kernel":t.name||i.getFunctionNameFromString(e):null,this.calledFunctions=[],this.constants={},this.constantTypes={},this.constantBitRatios={},this.isRootKernel=!1,this.isSubKernel=!1,this.debug=null,this.functions=null,this.identifiers=null,this.contexts=null,this.functionCalls=null,this.states=[],this.needsArgumentType=null,this.assignArgumentType=null,this.lookupReturnType=null,this.lookupFunctionArgumentTypes=null,this.lookupFunctionArgumentBitRatio=null,this.triggerImplyArgumentType=null,this.triggerImplyArgumentBitRatio=null,this.onNestedFunction=null,this.onFunctionCall=null,this.optimizeFloatMemory=null,this.precision=null,this.loopMaxIterations=null,this.argumentNames="string"==typeof this.source?i.getArgumentNamesFromString(this.source):null,this.argumentTypes=[],this.argumentSizes=[],this.argumentBitRatios=null,this.returnType=null,this.output=[],this.plugins=null,this.leadingReturnStatement=null,this.followingReturnStatement=null,this.dynamicOutput=null,this.dynamicArguments=null,this.strictTypingChecking=!1,this.fixIntegerDivisionAccuracy=null,t)for(const e in t)t.hasOwnProperty(e)&&this.hasOwnProperty(e)&&(this[e]=t[e]);this.literalTypes={},this.validate(),this._string=null,this._internalVariableNames={}}validate(){if("string"!=typeof this.source&&!this.ast)throw new Error("this.source not a string");if(!this.ast&&!i.isFunctionString(this.source))throw new Error("this.source not a function string");if(!this.name)throw new Error("this.name could not be set");if(this.argumentTypes.length>0&&this.argumentTypes.length!==this.argumentNames.length)throw new Error(`argumentTypes count of ${this.argumentTypes.length} exceeds ${this.argumentNames.length}`);if(this.output.length<1)throw new Error("this.output is not big enough")}isIdentifierConstant(e){return!!this.constants&&this.constants.hasOwnProperty(e)}isInput(e){return"Input"===this.argumentTypes[this.argumentNames.indexOf(e)]}pushState(e){this.states.push(e)}popState(e){if(this.state!==e)throw new Error(`Cannot popState ${e} when in ${this.state}`);this.states.pop()}isState(e){return this.state===e}get state(){return this.states[this.states.length-1]}astMemberExpressionUnroll(e){if("Identifier"===e.type)return e.name;if("ThisExpression"===e.type)return"this";if("MemberExpression"===e.type&&e.object&&e.property)return e.object.hasOwnProperty("name")&&"Math"!==e.object.name?this.astMemberExpressionUnroll(e.property):this.astMemberExpressionUnroll(e.object)+"."+this.astMemberExpressionUnroll(e.property);if(e.hasOwnProperty("expressions")){const t=e.expressions[0];if("Literal"===t.type&&0===t.value&&2===e.expressions.length)return this.astMemberExpressionUnroll(e.expressions[1])}throw this.astErrorOutput("Unknown astMemberExpressionUnroll",e)}getJsAST(e){if(this.ast)return this.ast;if("object"==typeof this.source)return this.traceFunctionAST(this.source),this.ast=this.source;if(null===(e=e||r))throw new Error("Missing JS to AST parser");const t=Object.freeze(e.parse(`const parser_${this.name} = ${this.source};`,{locations:!0})),n=t.body[0].declarations[0].init;if(this.traceFunctionAST(n),!t)throw new Error("Failed to parse JS code");return this.ast=n}traceFunctionAST(e){const{contexts:t,declarations:n,functions:r,identifiers:i,functionCalls:a}=new s(e);this.contexts=t,this.identifiers=i,this.functionCalls=a,this.functions=r;for(let e=0;e<n.length;e++){const t=n[e],{ast:r,inForLoopInit:i,inForLoopTest:s}=t,{init:a}=r,o=this.getDependencies(a);let u=null;if(i&&s)u="Integer";else if(a){const e=this.getType(a);switch(e){case"Integer":case"Float":case"Number":u="MemberExpression"===a.type?e:"Number";break;case"LiteralInteger":u="Number";break;default:u=e}}t.valueType=u,t.dependencies=o,t.isSafe=this.isSafeDependencies(o)}for(let e=0;e<r.length;e++)this.onNestedFunction(r[e],this.source)}getDeclaration(e){for(let t=0;t<this.identifiers.length;t++){const n=this.identifiers[t];if(e===n.ast)return n.declaration}return null}getVariableType(e){if("Identifier"!==e.type)throw new Error(`ast of ${e.type} not "Identifier"`);let t=null;const n=this.argumentNames.indexOf(e.name);if(-1===n){const t=this.getDeclaration(e);if(t)return t.valueType}else{const e=this.argumentTypes[n];e&&(t=e)}if(!t&&this.strictTypingChecking)throw new Error(`Declaration of ${name} not found`);return t}getLookupType(e){if(!a.hasOwnProperty(e))throw new Error(`unknown typeLookupMap ${e}`);return a[e]}getConstantType(e){if(this.constantTypes[e]){const t=this.constantTypes[e];return"Float"===t?"Number":t}throw new Error(`Type for constant "${e}" not declared`)}toString(){return this._string?this._string:this._string=this.astGeneric(this.getJsAST(),[]).join("").trim()}toJSON(){const e={source:this.source,name:this.name,constants:this.constants,constantTypes:this.constantTypes,isRootKernel:this.isRootKernel,isSubKernel:this.isSubKernel,debug:this.debug,output:this.output,loopMaxIterations:this.loopMaxIterations,argumentNames:this.argumentNames,argumentTypes:this.argumentTypes,argumentSizes:this.argumentSizes,returnType:this.returnType,leadingReturnStatement:this.leadingReturnStatement,followingReturnStatement:this.followingReturnStatement};return{ast:this.ast,settings:e}}getType(e){if(Array.isArray(e))return this.getType(e[e.length-1]);switch(e.type){case"BlockStatement":return this.getType(e.body);case"ArrayExpression":switch(this.getType(e.elements[0])){case"Array(2)":case"Array(3)":case"Array(4)":return`Matrix(${e.elements.length})`}return`Array(${e.elements.length})`;case"Literal":const t=this.astKey(e);return this.literalTypes[t]?this.literalTypes[t]:Number.isInteger(e.value)?"LiteralInteger":!0===e.value||!1===e.value?"Boolean":"Number";case"AssignmentExpression":return this.getType(e.left);case"CallExpression":if(this.isAstMathFunction(e))return"Number";if(!e.callee||!e.callee.name){if("SequenceExpression"===e.callee.type&&e.callee.expressions[e.callee.expressions.length-1].property.name){const t=e.callee.expressions[e.callee.expressions.length-1].property.name;return this.inferArgumentTypesIfNeeded(t,e.arguments),this.lookupReturnType(t,e,this)}if("this.color"===this.getVariableSignature(e.callee,!0))return null;if("MemberExpression"===e.callee.type&&e.callee.object&&e.callee.property&&e.callee.property.name&&e.arguments){const t=e.callee.property.name;return this.inferArgumentTypesIfNeeded(t,e.arguments),this.lookupReturnType(t,e,this)}throw this.astErrorOutput("Unknown call expression",e)}if(e.callee&&e.callee.name){const t=e.callee.name;return this.inferArgumentTypesIfNeeded(t,e.arguments),this.lookupReturnType(t,e,this)}throw this.astErrorOutput(`Unhandled getType Type "${e.type}"`,e);case"LogicalExpression":return"Boolean";case"BinaryExpression":switch(e.operator){case"%":case"/":if(this.fixIntegerDivisionAccuracy)return"Number";break;case">":case"<":return"Boolean";case"&":case"|":case"^":case"<<":case">>":case">>>":return"Integer"}const n=this.getType(e.left);if(this.isState("skip-literal-correction"))return n;if("LiteralInteger"===n){const t=this.getType(e.right);return"LiteralInteger"===t?e.left.value%1==0?"Integer":"Float":t}return a[n]||n;case"UpdateExpression":case"ReturnStatement":return this.getType(e.argument);case"UnaryExpression":return"~"===e.operator?"Integer":this.getType(e.argument);case"VariableDeclaration":{const t=e.declarations;let n;for(let e=0;e<t.length;e++){const r=t[e];n=this.getType(r)}if(!n)throw this.astErrorOutput("Unable to find type for declaration",e);return n}case"VariableDeclarator":const r=this.getDeclaration(e.id);if(!r)throw this.astErrorOutput("Unable to find declarator",e);if(!r.valueType)throw this.astErrorOutput("Unable to find declarator valueType",e);return r.valueType;case"Identifier":if("Infinity"===e.name)return"Number";if(this.isAstVariable(e)){if("value"===this.getVariableSignature(e))return this.getCheckVariableType(e)}const i=this.findIdentifierOrigin(e);return i&&i.init?this.getType(i.init):null;case"MemberExpression":if(this.isAstMathFunction(e)){switch(e.property.name){case"ceil":case"floor":case"round":return"Integer"}return"Number"}if(this.isAstVariable(e)){switch(this.getVariableSignature(e)){case"value[]":return this.getLookupType(this.getCheckVariableType(e.object));case"value[][]":return this.getLookupType(this.getCheckVariableType(e.object.object));case"value[][][]":return this.getLookupType(this.getCheckVariableType(e.object.object.object));case"value[][][][]":return this.getLookupType(this.getCheckVariableType(e.object.object.object.object));case"value.thread.value":case"this.thread.value":return"Integer";case"this.output.value":return this.dynamicOutput?"Integer":"LiteralInteger";case"this.constants.value":return this.getConstantType(e.property.name);case"this.constants.value[]":return this.getLookupType(this.getConstantType(e.object.property.name));case"this.constants.value[][]":return this.getLookupType(this.getConstantType(e.object.object.property.name));case"this.constants.value[][][]":return this.getLookupType(this.getConstantType(e.object.object.object.property.name));case"this.constants.value[][][][]":return this.getLookupType(this.getConstantType(e.object.object.object.object.property.name));case"fn()[]":case"fn()[][]":case"fn()[][][]":return this.getLookupType(this.getType(e.object));case"value.value":if(this.isAstMathVariable(e))return"Number";switch(e.property.name){case"r":case"g":case"b":case"a":return this.getLookupType(this.getCheckVariableType(e.object))}case"[][]":return"Number"}throw this.astErrorOutput("Unhandled getType MemberExpression",e)}throw this.astErrorOutput("Unhandled getType MemberExpression",e);case"ConditionalExpression":case"IfStatement":return this.getType(e.consequent);case"FunctionDeclaration":case"FunctionExpression":const s=this.findLastReturn(e.body);return s?this.getType(s):null;case"SequenceExpression":return this.getType(e.expressions[e.expressions.length-1]);default:throw this.astErrorOutput(`Unhandled getType Type "${e.type}"`,e)}}getCheckVariableType(e){const t=this.getVariableType(e);if(!t)throw this.astErrorOutput(`${e.type} is not defined`,e);return t}inferArgumentTypesIfNeeded(e,t){for(let n=0;n<t.length;n++){if(!this.needsArgumentType(e,n))continue;const r=this.getType(t[n]);if(!r)throw this.astErrorOutput(`Unable to infer argument ${n}`,t[n]);this.assignArgumentType(e,n,r)}}isAstMathVariable(e){return"MemberExpression"===e.type&&e.object&&"Identifier"===e.object.type&&"Math"===e.object.name&&e.property&&"Identifier"===e.property.type&&["E","PI","SQRT2","SQRT1_2","LN2","LN10","LOG2E","LOG10E"].indexOf(e.property.name)>-1}isAstMathFunction(e){return"CallExpression"===e.type&&e.callee&&"MemberExpression"===e.callee.type&&e.callee.object&&"Identifier"===e.callee.object.type&&"Math"===e.callee.object.name&&e.callee.property&&"Identifier"===e.callee.property.type&&["abs","acos","acosh","asin","asinh","atan","atan2","atanh","cbrt","ceil","clz32","cos","cosh","expm1","exp","floor","fround","imul","log","log2","log10","log1p","max","min","pow","random","round","sign","sin","sinh","sqrt","tan","tanh","trunc"].indexOf(e.callee.property.name)>-1}isAstVariable(e){return"Identifier"===e.type||"MemberExpression"===e.type}isSafe(e){return this.isSafeDependencies(this.getDependencies(e))}isSafeDependencies(e){return!e||!e.every||e.every((e=>e.isSafe))}getDependencies(e,t,n){if(t||(t=[]),!e)return null;if(Array.isArray(e)){for(let r=0;r<e.length;r++)this.getDependencies(e[r],t,n);return t}switch(e.type){case"AssignmentExpression":return this.getDependencies(e.left,t,n),this.getDependencies(e.right,t,n),t;case"ConditionalExpression":return this.getDependencies(e.test,t,n),this.getDependencies(e.alternate,t,n),this.getDependencies(e.consequent,t,n),t;case"Literal":t.push({origin:"literal",value:e.value,isSafe:!0!==n&&(e.value>-1/0&&e.value<1/0&&!isNaN(e.value))});break;case"VariableDeclarator":return this.getDependencies(e.init,t,n);case"Identifier":const r=this.getDeclaration(e);if(r)t.push({name:e.name,origin:"declaration",isSafe:!n&&this.isSafeDependencies(r.dependencies)});else if(this.argumentNames.indexOf(e.name)>-1)t.push({name:e.name,origin:"argument",isSafe:!1});else if(this.strictTypingChecking)throw new Error(`Cannot find identifier origin "${e.name}"`);break;case"FunctionDeclaration":return this.getDependencies(e.body.body[e.body.body.length-1],t,n);case"ReturnStatement":return this.getDependencies(e.argument,t);case"BinaryExpression":case"LogicalExpression":return n="/"===e.operator||"*"===e.operator,this.getDependencies(e.left,t,n),this.getDependencies(e.right,t,n),t;case"UnaryExpression":case"UpdateExpression":return this.getDependencies(e.argument,t,n);case"VariableDeclaration":return this.getDependencies(e.declarations,t,n);case"ArrayExpression":return t.push({origin:"declaration",isSafe:!0}),t;case"CallExpression":return t.push({origin:"function",isSafe:!0}),t;case"MemberExpression":const i=this.getMemberExpressionDetails(e);switch(i.signature){case"value[]":this.getDependencies(e.object,t,n);break;case"value[][]":this.getDependencies(e.object.object,t,n);break;case"value[][][]":this.getDependencies(e.object.object.object,t,n);break;case"this.output.value":this.dynamicOutput&&t.push({name:i.name,origin:"output",isSafe:!1})}if(i)return i.property&&this.getDependencies(i.property,t,n),i.xProperty&&this.getDependencies(i.xProperty,t,n),i.yProperty&&this.getDependencies(i.yProperty,t,n),i.zProperty&&this.getDependencies(i.zProperty,t,n),t;case"SequenceExpression":return this.getDependencies(e.expressions,t,n);default:throw this.astErrorOutput(`Unhandled type ${e.type} in getDependencies`,e)}return t}getVariableSignature(e,t){if(!this.isAstVariable(e))throw new Error(`ast of type "${e.type}" is not a variable signature`);if("Identifier"===e.type)return"value";const n=[];for(;e;)e.computed?n.push("[]"):"ThisExpression"===e.type?n.unshift("this"):e.property&&e.property.name?"x"===e.property.name||"y"===e.property.name||"z"===e.property.name?n.unshift(t?"."+e.property.name:".value"):"constants"===e.property.name||"thread"===e.property.name||"output"===e.property.name?n.unshift("."+e.property.name):n.unshift(t?"."+e.property.name:".value"):e.name?n.unshift(t?e.name:"value"):e.callee&&e.callee.name?n.unshift(t?e.callee.name+"()":"fn()"):e.elements?n.unshift("[]"):n.unshift("unknown"),e=e.object;const r=n.join("");if(t)return r;return["value","value[]","value[][]","value[][][]","value[][][][]","value.value","value.thread.value","this.thread.value","this.output.value","this.constants.value","this.constants.value[]","this.constants.value[][]","this.constants.value[][][]","this.constants.value[][][][]","fn()[]","fn()[][]","fn()[][][]","[][]"].indexOf(r)>-1?r:null}build(){return this.toString().length>0}astGeneric(e,t){if(null===e)throw this.astErrorOutput("NULL ast",e);if(Array.isArray(e)){for(let n=0;n<e.length;n++)this.astGeneric(e[n],t);return t}switch(e.type){case"FunctionDeclaration":return this.astFunctionDeclaration(e,t);case"FunctionExpression":return this.astFunctionExpression(e,t);case"ReturnStatement":return this.astReturnStatement(e,t);case"Literal":return this.astLiteral(e,t);case"BinaryExpression":return this.astBinaryExpression(e,t);case"Identifier":return this.astIdentifierExpression(e,t);case"AssignmentExpression":return this.astAssignmentExpression(e,t);case"ExpressionStatement":return this.astExpressionStatement(e,t);case"EmptyStatement":return this.astEmptyStatement(e,t);case"BlockStatement":return this.astBlockStatement(e,t);case"IfStatement":return this.astIfStatement(e,t);case"SwitchStatement":return this.astSwitchStatement(e,t);case"BreakStatement":return this.astBreakStatement(e,t);case"ContinueStatement":return this.astContinueStatement(e,t);case"ForStatement":return this.astForStatement(e,t);case"WhileStatement":return this.astWhileStatement(e,t);case"DoWhileStatement":return this.astDoWhileStatement(e,t);case"VariableDeclaration":return this.astVariableDeclaration(e,t);case"VariableDeclarator":return this.astVariableDeclarator(e,t);case"ThisExpression":return this.astThisExpression(e,t);case"SequenceExpression":return this.astSequenceExpression(e,t);case"UnaryExpression":return this.astUnaryExpression(e,t);case"UpdateExpression":return this.astUpdateExpression(e,t);case"LogicalExpression":return this.astLogicalExpression(e,t);case"MemberExpression":return this.astMemberExpression(e,t);case"CallExpression":return this.astCallExpression(e,t);case"ArrayExpression":return this.astArrayExpression(e,t);case"DebuggerStatement":return this.astDebuggerStatement(e,t);case"ConditionalExpression":return this.astConditionalExpression(e,t)}throw this.astErrorOutput("Unknown ast type : "+e.type,e)}astErrorOutput(e,t){if("string"!=typeof this.source)return new Error(e);const n=i.getAstString(this.source,t),r=this.source.substr(t.start).split(/\n/),s=r.length>0?r[r.length-1]:0;return new Error(`${e} on line ${r.length}, position ${s.length}:\n ${n}`)}astDebuggerStatement(e,t){return t}astConditionalExpression(e,t){if("ConditionalExpression"!==e.type)throw this.astErrorOutput("Not a conditional expression",e);return t.push("("),this.astGeneric(e.test,t),t.push("?"),this.astGeneric(e.consequent,t),t.push(":"),this.astGeneric(e.alternate,t),t.push(")"),t}astFunction(e,t){throw new Error(`"astFunction" not defined on ${this.constructor.name}`)}astFunctionDeclaration(e,t){return this.isChildFunction(e)?t:this.astFunction(e,t)}astFunctionExpression(e,t){return this.isChildFunction(e)?t:this.astFunction(e,t)}isChildFunction(e){for(let t=0;t<this.functions.length;t++)if(this.functions[t]===e)return!0;return!1}astReturnStatement(e,t){return t}astLiteral(e,t){return this.literalTypes[this.astKey(e)]="Number",t}astBinaryExpression(e,t){return t}astIdentifierExpression(e,t){return t}astAssignmentExpression(e,t){return t}astExpressionStatement(e,t){return this.astGeneric(e.expression,t),t.push(";"),t}astEmptyStatement(e,t){return t}astBlockStatement(e,t){return t}astIfStatement(e,t){return t}astSwitchStatement(e,t){return t}astBreakStatement(e,t){return t.push("break;"),t}astContinueStatement(e,t){return t.push("continue;\n"),t}astForStatement(e,t){return t}astWhileStatement(e,t){return t}astDoWhileStatement(e,t){return t}astVariableDeclarator(e,t){return this.astGeneric(e.id,t),null!==e.init&&(t.push("="),this.astGeneric(e.init,t)),t}astThisExpression(e,t){return t}astSequenceExpression(e,t){const{expressions:n}=e,r=[];for(let e=0;e<n.length;e++){const t=n[e],i=[];this.astGeneric(t,i),r.push(i.join(""))}return r.length>1?t.push("(",r.join(","),")"):t.push(r[0]),t}astUnaryExpression(e,t){return this.checkAndUpconvertBitwiseUnary(e,t)||(e.prefix?(t.push(e.operator),this.astGeneric(e.argument,t)):(this.astGeneric(e.argument,t),t.push(e.operator))),t}checkAndUpconvertBitwiseUnary(e,t){}astUpdateExpression(e,t){return e.prefix?(t.push(e.operator),this.astGeneric(e.argument,t)):(this.astGeneric(e.argument,t),t.push(e.operator)),t}astLogicalExpression(e,t){return t.push("("),this.astGeneric(e.left,t),t.push(e.operator),this.astGeneric(e.right,t),t.push(")"),t}astMemberExpression(e,t){return t}astCallExpression(e,t){return t}astArrayExpression(e,t){return t}getMemberExpressionDetails(e){if("MemberExpression"!==e.type)throw this.astErrorOutput(`Expression ${e.type} not a MemberExpression`,e);let t=null,n=null;const r=this.getVariableSignature(e);switch(r){case"value":return null;case"value.thread.value":case"this.thread.value":case"this.output.value":return{signature:r,type:"Integer",name:e.property.name};case"value[]":if("string"!=typeof e.object.name)throw this.astErrorOutput("Unexpected expression",e);return t=e.object.name,{name:t,origin:"user",signature:r,type:this.getVariableType(e.object),xProperty:e.property};case"value[][]":if("string"!=typeof e.object.object.name)throw this.astErrorOutput("Unexpected expression",e);return t=e.object.object.name,{name:t,origin:"user",signature:r,type:this.getVariableType(e.object.object),yProperty:e.object.property,xProperty:e.property};case"value[][][]":if("string"!=typeof e.object.object.object.name)throw this.astErrorOutput("Unexpected expression",e);return t=e.object.object.object.name,{name:t,origin:"user",signature:r,type:this.getVariableType(e.object.object.object),zProperty:e.object.object.property,yProperty:e.object.property,xProperty:e.property};case"value[][][][]":if("string"!=typeof e.object.object.object.object.name)throw this.astErrorOutput("Unexpected expression",e);return t=e.object.object.object.object.name,{name:t,origin:"user",signature:r,type:this.getVariableType(e.object.object.object.object),zProperty:e.object.object.property,yProperty:e.object.property,xProperty:e.property};case"value.value":if("string"!=typeof e.property.name)throw this.astErrorOutput("Unexpected expression",e);if(this.isAstMathVariable(e))return t=e.property.name,{name:t,origin:"Math",type:"Number",signature:r};switch(e.property.name){case"r":case"g":case"b":case"a":return t=e.object.name,{name:t,property:e.property.name,origin:"user",signature:r,type:"Number"};default:throw this.astErrorOutput("Unexpected expression",e)}case"this.constants.value":if("string"!=typeof e.property.name)throw this.astErrorOutput("Unexpected expression",e);if(t=e.property.name,n=this.getConstantType(t),!n)throw this.astErrorOutput("Constant has no type",e);return{name:t,type:n,origin:"constants",signature:r};case"this.constants.value[]":if("string"!=typeof e.object.property.name)throw this.astErrorOutput("Unexpected expression",e);if(t=e.object.property.name,n=this.getConstantType(t),!n)throw this.astErrorOutput("Constant has no type",e);return{name:t,type:n,origin:"constants",signature:r,xProperty:e.property};case"this.constants.value[][]":if("string"!=typeof e.object.object.property.name)throw this.astErrorOutput("Unexpected expression",e);if(t=e.object.object.property.name,n=this.getConstantType(t),!n)throw this.astErrorOutput("Constant has no type",e);return{name:t,type:n,origin:"constants",signature:r,yProperty:e.object.property,xProperty:e.property};case"this.constants.value[][][]":if("string"!=typeof e.object.object.object.property.name)throw this.astErrorOutput("Unexpected expression",e);if(t=e.object.object.object.property.name,n=this.getConstantType(t),!n)throw this.astErrorOutput("Constant has no type",e);return{name:t,type:n,origin:"constants",signature:r,zProperty:e.object.object.property,yProperty:e.object.property,xProperty:e.property};case"fn()[]":case"fn()[][]":case"[][]":return{signature:r,property:e.property};default:throw this.astErrorOutput("Unexpected expression",e)}}findIdentifierOrigin(e){const t=[this.ast];for(;t.length>0;){const n=t[0];if("VariableDeclarator"===n.type&&n.id&&n.id.name&&n.id.name===e.name)return n;if(t.shift(),n.argument)t.push(n.argument);else if(n.body)t.push(n.body);else if(n.declarations)t.push(n.declarations);else if(Array.isArray(n))for(let e=0;e<n.length;e++)t.push(n[e])}return null}findLastReturn(e){const t=[e||this.ast];for(;t.length>0;){const e=t.pop();if("ReturnStatement"===e.type)return e;if("FunctionDeclaration"!==e.type)if(e.argument)t.push(e.argument);else if(e.body)t.push(e.body);else if(e.declarations)t.push(e.declarations);else if(Array.isArray(e))for(let n=0;n<e.length;n++)t.push(e[n]);else e.consequent?t.push(e.consequent):e.cases&&t.push(e.cases)}return null}getInternalVariableName(e){return this._internalVariableNames.hasOwnProperty(e)||(this._internalVariableNames[e]=0),this._internalVariableNames[e]++,1===this._internalVariableNames[e]?e:e+this._internalVariableNames[e]}astKey(e,t=","){if(!e.start||!e.end)throw new Error("AST start and end needed");return`${e.start}${t}${e.end}`}}}},{"../utils":114,"./function-tracer":11,acorn:1}],11:[function(e,t,n){const{utils:r}=e("../utils");function i(e){return e.length>0?e[e.length-1]:null}const s="trackIdentifiers",a="memberExpression",o="inForLoopInit";t.exports={FunctionTracer:class{constructor(e){this.runningContexts=[],this.functionContexts=[],this.contexts=[],this.functionCalls=[],this.declarations=[],this.identifiers=[],this.functions=[],this.returnStatements=[],this.trackedIdentifiers=null,this.states=[],this.newFunctionContext(),this.scan(e)}isState(e){return this.states[this.states.length-1]===e}hasState(e){return this.states.indexOf(e)>-1}pushState(e){this.states.push(e)}popState(e){if(!this.isState(e))throw new Error(`Cannot pop the non-active state "${e}"`);this.states.pop()}get currentFunctionContext(){return i(this.functionContexts)}get currentContext(){return i(this.runningContexts)}newFunctionContext(){const e={"@contextType":"function"};this.contexts.push(e),this.functionContexts.push(e)}newContext(e){const t=Object.assign({"@contextType":"const/let"},this.currentContext);this.contexts.push(t),this.runningContexts.push(t),e();const{currentFunctionContext:n}=this;for(const e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e]);return this.runningContexts.pop(),t}useFunctionContext(e){const t=i(this.functionContexts);this.runningContexts.push(t),e(),this.runningContexts.pop()}getIdentifiers(e){const t=this.trackedIdentifiers=[];return this.pushState(s),e(),this.trackedIdentifiers=null,this.popState(s),t}getDeclaration(e){const{currentContext:t,currentFunctionContext:n,runningContexts:r}=this,i=t[e]||n[e]||null;if(!i&&t===n&&r.length>0){const t=r[r.length-2];if(t[e])return t[e]}return i}scan(e){if(e)if(Array.isArray(e))for(let t=0;t<e.length;t++)this.scan(e[t]);else switch(e.type){case"Program":this.useFunctionContext((()=>{this.scan(e.body)}));break;case"BlockStatement":this.newContext((()=>{this.scan(e.body)}));break;case"AssignmentExpression":case"LogicalExpression":case"BinaryExpression":this.scan(e.left),this.scan(e.right);break;case"UpdateExpression":if("++"===e.operator){const t=this.getDeclaration(e.argument.name);t&&(t.suggestedType="Integer")}this.scan(e.argument);break;case"UnaryExpression":this.scan(e.argument);break;case"VariableDeclaration":"var"===e.kind?this.useFunctionContext((()=>{e.declarations=r.normalizeDeclarations(e),this.scan(e.declarations)})):(e.declarations=r.normalizeDeclarations(e),this.scan(e.declarations));break;case"VariableDeclarator":{const{currentContext:t}=this,n=this.hasState(o),r={ast:e,context:t,name:e.id.name,origin:"declaration",inForLoopInit:n,inForLoopTest:null,assignable:t===this.currentFunctionContext||!n&&!t.hasOwnProperty(e.id.name),suggestedType:null,valueType:null,dependencies:null,isSafe:null};t[e.id.name]||(t[e.id.name]=r),this.declarations.push(r),this.scan(e.id),this.scan(e.init);break}case"FunctionExpression":case"FunctionDeclaration":0===this.runningContexts.length?this.scan(e.body):this.functions.push(e);break;case"IfStatement":this.scan(e.test),this.scan(e.consequent),e.alternate&&this.scan(e.alternate);break;case"ForStatement":{let t;const n=this.newContext((()=>{this.pushState(o),this.scan(e.init),this.popState(o),t=this.getIdentifiers((()=>{this.scan(e.test)})),this.scan(e.update),this.newContext((()=>{this.scan(e.body)}))}));if(t)for(const e in n)"@contextType"!==e&&t.indexOf(e)>-1&&(n[e].inForLoopTest=!0);break}case"DoWhileStatement":case"WhileStatement":this.newContext((()=>{this.scan(e.body),this.scan(e.test)}));break;case"Identifier":this.isState(s)&&this.trackedIdentifiers.push(e.name),this.identifiers.push({context:this.currentContext,declaration:this.getDeclaration(e.name),ast:e});break;case"ReturnStatement":this.returnStatements.push(e),this.scan(e.argument);break;case"MemberExpression":this.pushState(a),this.scan(e.object),this.scan(e.property),this.popState(a);break;case"ExpressionStatement":this.scan(e.expression);break;case"SequenceExpression":this.scan(e.expressions);break;case"CallExpression":this.functionCalls.push({context:this.currentContext,ast:e}),this.scan(e.arguments);break;case"ArrayExpression":this.scan(e.elements);break;case"ConditionalExpression":this.scan(e.test),this.scan(e.alternate),this.scan(e.consequent);break;case"SwitchStatement":this.scan(e.discriminant),this.scan(e.cases);break;case"SwitchCase":this.scan(e.test),this.scan(e.consequent);break;case"ThisExpression":case"Literal":case"DebuggerStatement":case"EmptyStatement":case"BreakStatement":case"ContinueStatement":break;default:throw new Error(`unhandled type "${e.type}"`)}}}}},{"../utils":114}],12:[function(e,t,n){const{glWiretap:r}=e("gl-wiretap"),{utils:i}=e("../../utils");function s(e){return e.toString().replace("=>","").replace(/^function /,"").replace(/utils[.]/g,"/*utils.*/")}function a(e,t){const n="single"===t.precision?e:`new Float32Array(${e}.buffer)`;return t.output[2]?`renderOutput(${n}, ${t.output[0]}, ${t.output[1]}, ${t.output[2]})`:t.output[1]?`renderOutput(${n}, ${t.output[0]}, ${t.output[1]})`:`renderOutput(${n}, ${t.output[0]})`}function o(e,t,n){const r=e.toArray.toString(),s=!/^function/.test(r);return`() => {\n  function framebuffer() { return ${n}; };\n  ${i.flattenFunctionToString(`${s?"function ":""}${r}`,{findDependency:(t,n)=>{if("utils"===t)return`const ${n} = ${i[n].toString()};`;if("this"===t)return"framebuffer"===n?"":`${s?"function ":""}${e[n].toString()}`;throw new Error("unhandled fromObject")},thisLookup:(n,r)=>{if("texture"===n)return t;if("context"===n)return r?null:"gl";if(e.hasOwnProperty(n))return JSON.stringify(e[n]);throw new Error(`unhandled thisLookup ${n}`)}})}\n  return toArray();\n  }`}function u(e,t,n,r,i){if(null===e)return null;if(null===t)return null;switch(typeof e){case"boolean":case"number":return null}if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement)for(let i=0;i<t.length;i++){const s=t[i];if("HTMLImageArray"!==s.type&&s)continue;if(s.uploadValue!==e)continue;const a=n[i].indexOf(e);if(-1===a)continue;const o=`uploadValue_${s.name}[${a}]`;return r.insertVariable(o,e),o}for(let n=0;n<t.length;n++){const i=t[n];if(e!==i.uploadValue)continue;const s=`uploadValue_${i.name}`;return r.insertVariable(s,i),s}return null}t.exports={glKernelString:function(e,t,n,l,h){n.built||n.build.apply(n,t),t=t?Array.from(t).map((e=>{switch(typeof e){case"boolean":return new Boolean(e);case"number":return new Number(e);default:return e}})):null;const c=[],p=[],d=r(n.context,{useTrackablePrimitives:!0,onReadPixels:e=>{if(N.subKernels){if(m){const t=N.subKernels[f++].property;p.push(`    result${isNaN(t)?"."+t:`[${t}]`} = ${a(e,N)};`)}else p.push(`    const result = { result: ${a(e,N)} };`),m=!0;f===N.subKernels.length&&p.push("    return result;")}else e?p.push(`    return ${a(e,N)};`):p.push("    return null;")},onUnrecognizedArgumentLookup:e=>{const t=u(e,N.kernelArguments,[],d,c);if(t)return t;const n=u(e,N.kernelConstants,S?Object.keys(S).map((e=>S[e])):[],d,c);return n||null}});let m=!1,f=0;const{source:g,canvas:x,output:y,pipeline:b,graphical:T,loopMaxIterations:v,constants:S,optimizeFloatMemory:A,precision:_,fixIntegerDivisionAccuracy:E,functions:w,nativeFunctions:k,subKernels:I,immutable:D,argumentTypes:C,constantTypes:$,kernelArguments:L,kernelConstants:R,tactic:F}=n,N=new e(g,{canvas:x,context:d,checkContext:!1,output:y,pipeline:b,graphical:T,loopMaxIterations:v,constants:S,optimizeFloatMemory:A,precision:_,fixIntegerDivisionAccuracy:E,functions:w,nativeFunctions:k,subKernels:I,immutable:D,argumentTypes:C,constantTypes:$,tactic:F});let V=[];if(d.setIndent(2),N.build.apply(N,t),V.push(d.toString()),d.reset(),N.kernelArguments.forEach(((e,n)=>{switch(e.type){case"Integer":case"Boolean":case"Number":case"Float":case"Array":case"Array(2)":case"Array(3)":case"Array(4)":case"HTMLCanvas":case"HTMLImage":case"HTMLVideo":case"Input":d.insertVariable(`uploadValue_${e.name}`,e.uploadValue);break;case"HTMLImageArray":for(let r=0;r<t[n].length;r++){const i=t[n];d.insertVariable(`uploadValue_${e.name}[${r}]`,i[r])}break;case"MemoryOptimizedNumberTexture":case"NumberTexture":case"Array1D(2)":case"Array1D(3)":case"Array1D(4)":case"Array2D(2)":case"Array2D(3)":case"Array2D(4)":case"Array3D(2)":case"Array3D(3)":case"Array3D(4)":case"ArrayTexture(1)":case"ArrayTexture(2)":case"ArrayTexture(3)":case"ArrayTexture(4)":d.insertVariable(`uploadValue_${e.name}`,t[n].texture);break;default:throw new Error(`unhandled kernelArgumentType insertion for glWiretap of type ${e.type}`)}})),V.push("/** start of injected functions **/"),V.push(`function ${s(i.flattenTo)}`),V.push(`function ${s(i.flatten2dArrayTo)}`),V.push(`function ${s(i.flatten3dArrayTo)}`),V.push(`function ${s(i.flatten4dArrayTo)}`),V.push(`function ${s(i.isArray)}`),N.renderOutput!==N.renderTexture&&N.formatValues&&V.push(`  const renderOutput = function ${s(N.formatValues)};`),V.push("/** end of injected functions **/"),V.push(`  const innerKernel = function (${N.kernelArguments.map((e=>e.varName)).join(", ")}) {`),d.setIndent(4),N.run.apply(N,t),N.renderKernels?N.renderKernels():N.renderOutput&&N.renderOutput(),V.push("    /** start setup uploads for kernel values **/"),N.kernelArguments.forEach((e=>{V.push("    "+e.getStringValueHandler().split("\n").join("\n    "))})),V.push("    /** end setup uploads for kernel values **/"),V.push(d.toString()),N.renderOutput===N.renderTexture){d.reset();const e=d.getContextVariableName(N.framebuffer);if(N.renderKernels){const t=N.renderKernels(),n=d.getContextVariableName(N.texture.texture);V.push(`    return {\n      result: {\n        texture: ${n},\n        type: '${t.result.type}',\n        toArray: ${o(t.result,n,e)}\n      },`);const{subKernels:r,mappedTextures:i}=N;for(let n=0;n<r.length;n++){const s=i[n],a=r[n],u=t[a.property],l=d.getContextVariableName(s.texture);V.push(`\n      ${a.property}: {\n        texture: ${l},\n        type: '${u.type}',\n        toArray: ${o(u,l,e)}\n      },`)}V.push("    };")}else{const t=N.renderOutput(),n=d.getContextVariableName(N.texture.texture);V.push(`    return {\n        texture: ${n},\n        type: '${t.type}',\n        toArray: ${o(t,n,e)}\n      };`)}}V.push("    "+(h?"\n"+h+"    ":"")),V.push(p.join("\n")),V.push("  };"),N.graphical&&(V.push(function(e){const t=e.getPixels.toString(),n=!/^function/.test(t);return i.flattenFunctionToString(`${n?"function ":""}${t}`,{findDependency:(e,t)=>"utils"===e?`const ${t} = ${i[t].toString()};`:null,thisLookup:t=>{if("context"===t)return null;if(e.hasOwnProperty(t))return JSON.stringify(e[t]);throw new Error(`unhandled thisLookup ${t}`)}})}(N)),V.push("  innerKernel.getPixels = getPixels;")),V.push("  return innerKernel;");let M=[];return R.forEach((e=>{M.push(`${e.getStringValueHandler()}`)})),`function kernel(settings) {\n  const { context, constants } = settings;\n  ${M.join("")}\n  ${l||""}\n${V.join("\n")}\n}`}}},{"../../utils":114,"gl-wiretap":3}],13:[function(e,t,n){const{Kernel:r}=e("../kernel"),{utils:i}=e("../../utils"),{GLTextureArray2Float:s}=e("./texture/array-2-float"),{GLTextureArray2Float2D:a}=e("./texture/array-2-float-2d"),{GLTextureArray2Float3D:o}=e("./texture/array-2-float-3d"),{GLTextureArray3Float:u}=e("./texture/array-3-float"),{GLTextureArray3Float2D:l}=e("./texture/array-3-float-2d"),{GLTextureArray3Float3D:h}=e("./texture/array-3-float-3d"),{GLTextureArray4Float:c}=e("./texture/array-4-float"),{GLTextureArray4Float2D:p}=e("./texture/array-4-float-2d"),{GLTextureArray4Float3D:d}=e("./texture/array-4-float-3d"),{GLTextureFloat:m}=e("./texture/float"),{GLTextureFloat2D:f}=e("./texture/float-2d"),{GLTextureFloat3D:g}=e("./texture/float-3d"),{GLTextureMemoryOptimized:x}=e("./texture/memory-optimized"),{GLTextureMemoryOptimized2D:y}=e("./texture/memory-optimized-2d"),{GLTextureMemoryOptimized3D:b}=e("./texture/memory-optimized-3d"),{GLTextureUnsigned:T}=e("./texture/unsigned"),{GLTextureUnsigned2D:v}=e("./texture/unsigned-2d"),{GLTextureUnsigned3D:S}=e("./texture/unsigned-3d"),{GLTextureGraphical:A}=e("./texture/graphical");const _={int:"Integer",float:"Number",vec2:"Array(2)",vec3:"Array(3)",vec4:"Array(4)"};t.exports={GLKernel:class extends r{static get mode(){return"gpu"}static getIsFloatRead(){const e=new this("function kernelFunction() {\n      return 1;\n    }",{context:this.testContext,canvas:this.testCanvas,validate:!1,output:[1],precision:"single",returnType:"Number",tactic:"speed"});e.build(),e.run();const t=e.renderOutput();return e.destroy(!0),1===t[0]}static getIsIntegerDivisionAccurate(){const e=new this(function(e,t){return e[this.thread.x]/t[this.thread.x]}.toString(),{context:this.testContext,canvas:this.testCanvas,validate:!1,output:[2],returnType:"Number",precision:"unsigned",tactic:"speed"}),t=[[6,6030401],[3,3991]];e.build.apply(e,t),e.run.apply(e,t);const n=e.renderOutput();return e.destroy(!0),2===n[0]&&1511===n[1]}static getIsSpeedTacticSupported(){const e=new this(function(e){return e[this.thread.x]}.toString(),{context:this.testContext,canvas:this.testCanvas,validate:!1,output:[4],returnType:"Number",precision:"unsigned",tactic:"speed"}),t=[[0,1,2,3]];e.build.apply(e,t),e.run.apply(e,t);const n=e.renderOutput();return e.destroy(!0),0===Math.round(n[0])&&1===Math.round(n[1])&&2===Math.round(n[2])&&3===Math.round(n[3])}static get testCanvas(){throw new Error(`"testCanvas" not defined on ${this.name}`)}static get testContext(){throw new Error(`"testContext" not defined on ${this.name}`)}static getFeatures(){const e=this.testContext,t=this.getIsDrawBuffers();return Object.freeze({isFloatRead:this.getIsFloatRead(),isIntegerDivisionAccurate:this.getIsIntegerDivisionAccurate(),isSpeedTacticSupported:this.getIsSpeedTacticSupported(),isTextureFloat:this.getIsTextureFloat(),isDrawBuffers:t,kernelMap:t,channelCount:this.getChannelCount(),maxTextureSize:this.getMaxTextureSize(),lowIntPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_INT),lowFloatPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_FLOAT),mediumIntPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_INT),mediumFloatPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),highIntPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_INT),highFloatPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT)})}static setupFeatureChecks(){throw new Error(`"setupFeatureChecks" not defined on ${this.name}`)}static getSignature(e,t){return e.getVariablePrecisionString()+(t.length>0?":"+t.join(","):"")}setFixIntegerDivisionAccuracy(e){return this.fixIntegerDivisionAccuracy=e,this}setPrecision(e){return this.precision=e,this}setFloatTextures(e){return i.warnDeprecated("method","setFloatTextures","setOptimizeFloatMemory"),this.floatTextures=e,this}static nativeFunctionArguments(e){const t=[],n=[],r=[],i=/^[a-zA-Z_]/,s=/[a-zA-Z_0-9]/;let a=0,o=null,u=null;for(;a<e.length;){const l=e[a],h=e[a+1],c=r.length>0?r[r.length-1]:null;if("FUNCTION_ARGUMENTS"!==c||"/"!==l||"*"!==h)if("MULTI_LINE_COMMENT"!==c||"*"!==l||"/"!==h)if("FUNCTION_ARGUMENTS"!==c||"/"!==l||"/"!==h)if("COMMENT"!==c||"\n"!==l)if(null!==c||"("!==l){if("FUNCTION_ARGUMENTS"===c){if(")"===l){r.pop();break}if("f"===l&&"l"===h&&"o"===e[a+2]&&"a"===e[a+3]&&"t"===e[a+4]&&" "===e[a+5]){r.push("DECLARE_VARIABLE"),u="float",o="",a+=6;continue}if("i"===l&&"n"===h&&"t"===e[a+2]&&" "===e[a+3]){r.push("DECLARE_VARIABLE"),u="int",o="",a+=4;continue}if("v"===l&&"e"===h&&"c"===e[a+2]&&"2"===e[a+3]&&" "===e[a+4]){r.push("DECLARE_VARIABLE"),u="vec2",o="",a+=5;continue}if("v"===l&&"e"===h&&"c"===e[a+2]&&"3"===e[a+3]&&" "===e[a+4]){r.push("DECLARE_VARIABLE"),u="vec3",o="",a+=5;continue}if("v"===l&&"e"===h&&"c"===e[a+2]&&"4"===e[a+3]&&" "===e[a+4]){r.push("DECLARE_VARIABLE"),u="vec4",o="",a+=5;continue}}else if("DECLARE_VARIABLE"===c){if(""===o){if(" "===l){a++;continue}if(!i.test(l))throw new Error("variable name is not expected string")}o+=l,s.test(h)||(r.pop(),n.push(o),t.push(_[u]))}a++}else r.push("FUNCTION_ARGUMENTS"),a++;else r.pop(),a++;else r.push("COMMENT"),a+=2;else r.pop(),a+=2;else r.push("MULTI_LINE_COMMENT"),a+=2}if(r.length>0)throw new Error("GLSL function was not parsable");return{argumentNames:n,argumentTypes:t}}static nativeFunctionReturnType(e){return _[e.match(/int|float|vec[2-4]/)[0]]}static combineKernels(e,t){e.apply(null,arguments);const{texSize:n,context:r,threadDim:s}=t.texSize;let a;if("single"===t.precision){const e=n[0],t=Math.ceil(n[1]/4);a=new Float32Array(e*t*4*4),r.readPixels(0,0,e,4*t,r.RGBA,r.FLOAT,a)}else{const e=new Uint8Array(n[0]*n[1]*4);r.readPixels(0,0,n[0],n[1],r.RGBA,r.UNSIGNED_BYTE,e),a=new Float32Array(e.buffer)}if(a=a.subarray(0,s[0]*s[1]*s[2]),1===t.output.length)return a;if(2===t.output.length)return i.splitArray(a,t.output[0]);if(3===t.output.length){return i.splitArray(a,t.output[0]*t.output[1]).map((function(e){return i.splitArray(e,t.output[0])}))}}constructor(e,t){super(e,t),this.transferValues=null,this.formatValues=null,this.TextureConstructor=null,this.renderOutput=null,this.renderRawOutput=null,this.texSize=null,this.translatedSource=null,this.compiledFragmentShader=null,this.compiledVertexShader=null,this.switchingKernels=null,this._textureSwitched=null,this._mappedTextureSwitched=null}checkTextureSize(){const{features:e}=this.constructor;if(this.texSize[0]>e.maxTextureSize||this.texSize[1]>e.maxTextureSize)throw new Error(`Texture size [${this.texSize[0]},${this.texSize[1]}] generated by kernel is larger than supported size [${e.maxTextureSize},${e.maxTextureSize}]`)}translateSource(){throw new Error(`"translateSource" not defined on ${this.constructor.name}`)}pickRenderStrategy(e){if(this.graphical)return this.renderRawOutput=this.readPackedPixelsToUint8Array,this.transferValues=e=>e,this.TextureConstructor=A,null;if("unsigned"===this.precision)if(this.renderRawOutput=this.readPackedPixelsToUint8Array,this.transferValues=this.readPackedPixelsToFloat32Array,this.pipeline)switch(this.renderOutput=this.renderTexture,null!==this.subKernels&&(this.renderKernels=this.renderKernelsToTextures),this.returnType){case"LiteralInteger":case"Float":case"Number":case"Integer":return this.output[2]>0?(this.TextureConstructor=S,null):this.output[1]>0?(this.TextureConstructor=v,null):(this.TextureConstructor=T,null);case"Array(2)":case"Array(3)":case"Array(4)":return this.requestFallback(e)}else switch(null!==this.subKernels&&(this.renderKernels=this.renderKernelsToArrays),this.returnType){case"LiteralInteger":case"Float":case"Number":case"Integer":return this.renderOutput=this.renderValues,this.output[2]>0?(this.TextureConstructor=S,this.formatValues=i.erect3DPackedFloat,null):this.output[1]>0?(this.TextureConstructor=v,this.formatValues=i.erect2DPackedFloat,null):(this.TextureConstructor=T,this.formatValues=i.erectPackedFloat,null);case"Array(2)":case"Array(3)":case"Array(4)":return this.requestFallback(e)}else{if("single"!==this.precision)throw new Error(`unhandled precision of "${this.precision}"`);if(this.renderRawOutput=this.readFloatPixelsToFloat32Array,this.transferValues=this.readFloatPixelsToFloat32Array,this.pipeline)switch(this.renderOutput=this.renderTexture,null!==this.subKernels&&(this.renderKernels=this.renderKernelsToTextures),this.returnType){case"LiteralInteger":case"Float":case"Number":case"Integer":return this.optimizeFloatMemory?this.output[2]>0?(this.TextureConstructor=b,null):this.output[1]>0?(this.TextureConstructor=y,null):(this.TextureConstructor=x,null):this.output[2]>0?(this.TextureConstructor=g,null):this.output[1]>0?(this.TextureConstructor=f,null):(this.TextureConstructor=m,null);case"Array(2)":return this.output[2]>0?(this.TextureConstructor=o,null):this.output[1]>0?(this.TextureConstructor=a,null):(this.TextureConstructor=s,null);case"Array(3)":return this.output[2]>0?(this.TextureConstructor=h,null):this.output[1]>0?(this.TextureConstructor=l,null):(this.TextureConstructor=u,null);case"Array(4)":return this.output[2]>0?(this.TextureConstructor=d,null):this.output[1]>0?(this.TextureConstructor=p,null):(this.TextureConstructor=c,null)}if(this.renderOutput=this.renderValues,null!==this.subKernels&&(this.renderKernels=this.renderKernelsToArrays),this.optimizeFloatMemory)switch(this.returnType){case"LiteralInteger":case"Float":case"Number":case"Integer":return this.output[2]>0?(this.TextureConstructor=b,this.formatValues=i.erectMemoryOptimized3DFloat,null):this.output[1]>0?(this.TextureConstructor=y,this.formatValues=i.erectMemoryOptimized2DFloat,null):(this.TextureConstructor=x,this.formatValues=i.erectMemoryOptimizedFloat,null);case"Array(2)":return this.output[2]>0?(this.TextureConstructor=o,this.formatValues=i.erect3DArray2,null):this.output[1]>0?(this.TextureConstructor=a,this.formatValues=i.erect2DArray2,null):(this.TextureConstructor=s,this.formatValues=i.erectArray2,null);case"Array(3)":return this.output[2]>0?(this.TextureConstructor=h,this.formatValues=i.erect3DArray3,null):this.output[1]>0?(this.TextureConstructor=l,this.formatValues=i.erect2DArray3,null):(this.TextureConstructor=u,this.formatValues=i.erectArray3,null);case"Array(4)":return this.output[2]>0?(this.TextureConstructor=d,this.formatValues=i.erect3DArray4,null):this.output[1]>0?(this.TextureConstructor=p,this.formatValues=i.erect2DArray4,null):(this.TextureConstructor=c,this.formatValues=i.erectArray4,null)}else switch(this.returnType){case"LiteralInteger":case"Float":case"Number":case"Integer":return this.output[2]>0?(this.TextureConstructor=g,this.formatValues=i.erect3DFloat,null):this.output[1]>0?(this.TextureConstructor=f,this.formatValues=i.erect2DFloat,null):(this.TextureConstructor=m,this.formatValues=i.erectFloat,null);case"Array(2)":return this.output[2]>0?(this.TextureConstructor=o,this.formatValues=i.erect3DArray2,null):this.output[1]>0?(this.TextureConstructor=a,this.formatValues=i.erect2DArray2,null):(this.TextureConstructor=s,this.formatValues=i.erectArray2,null);case"Array(3)":return this.output[2]>0?(this.TextureConstructor=h,this.formatValues=i.erect3DArray3,null):this.output[1]>0?(this.TextureConstructor=l,this.formatValues=i.erect2DArray3,null):(this.TextureConstructor=u,this.formatValues=i.erectArray3,null);case"Array(4)":return this.output[2]>0?(this.TextureConstructor=d,this.formatValues=i.erect3DArray4,null):this.output[1]>0?(this.TextureConstructor=p,this.formatValues=i.erect2DArray4,null):(this.TextureConstructor=c,this.formatValues=i.erectArray4,null)}}throw new Error(`unhandled return type "${this.returnType}"`)}getKernelString(){throw new Error("abstract method call")}getMainResultTexture(){switch(this.returnType){case"LiteralInteger":case"Float":case"Integer":case"Number":return this.getMainResultNumberTexture();case"Array(2)":return this.getMainResultArray2Texture();case"Array(3)":return this.getMainResultArray3Texture();case"Array(4)":return this.getMainResultArray4Texture();default:throw new Error(`unhandled returnType type ${this.returnType}`)}}getMainResultKernelNumberTexture(){throw new Error("abstract method call")}getMainResultSubKernelNumberTexture(){throw new Error("abstract method call")}getMainResultKernelArray2Texture(){throw new Error("abstract method call")}getMainResultSubKernelArray2Texture(){throw new Error("abstract method call")}getMainResultKernelArray3Texture(){throw new Error("abstract method call")}getMainResultSubKernelArray3Texture(){throw new Error("abstract method call")}getMainResultKernelArray4Texture(){throw new Error("abstract method call")}getMainResultSubKernelArray4Texture(){throw new Error("abstract method call")}getMainResultGraphical(){throw new Error("abstract method call")}getMainResultMemoryOptimizedFloats(){throw new Error("abstract method call")}getMainResultPackedPixels(){throw new Error("abstract method call")}getMainResultString(){return this.graphical?this.getMainResultGraphical():"single"===this.precision?this.optimizeFloatMemory?this.getMainResultMemoryOptimizedFloats():this.getMainResultTexture():this.getMainResultPackedPixels()}getMainResultNumberTexture(){return i.linesToString(this.getMainResultKernelNumberTexture())+i.linesToString(this.getMainResultSubKernelNumberTexture())}getMainResultArray2Texture(){return i.linesToString(this.getMainResultKernelArray2Texture())+i.linesToString(this.getMainResultSubKernelArray2Texture())}getMainResultArray3Texture(){return i.linesToString(this.getMainResultKernelArray3Texture())+i.linesToString(this.getMainResultSubKernelArray3Texture())}getMainResultArray4Texture(){return i.linesToString(this.getMainResultKernelArray4Texture())+i.linesToString(this.getMainResultSubKernelArray4Texture())}getFloatTacticDeclaration(){return`precision ${this.getVariablePrecisionString(this.texSize,this.tactic)} float;\n`}getIntTacticDeclaration(){return`precision ${this.getVariablePrecisionString(this.texSize,this.tactic,!0)} int;\n`}getSampler2DTacticDeclaration(){return`precision ${this.getVariablePrecisionString(this.texSize,this.tactic)} sampler2D;\n`}getSampler2DArrayTacticDeclaration(){return`precision ${this.getVariablePrecisionString(this.texSize,this.tactic)} sampler2DArray;\n`}renderTexture(){return this.immutable?this.texture.clone():this.texture}readPackedPixelsToUint8Array(){if("unsigned"!==this.precision)throw new Error('Requires this.precision to be "unsigned"');const{texSize:e,context:t}=this,n=new Uint8Array(e[0]*e[1]*4);return t.readPixels(0,0,e[0],e[1],t.RGBA,t.UNSIGNED_BYTE,n),n}readPackedPixelsToFloat32Array(){return new Float32Array(this.readPackedPixelsToUint8Array().buffer)}readFloatPixelsToFloat32Array(){if("single"!==this.precision)throw new Error('Requires this.precision to be "single"');const{texSize:e,context:t}=this,n=e[0],r=e[1],i=new Float32Array(n*r*4);return t.readPixels(0,0,n,r,t.RGBA,t.FLOAT,i),i}getPixels(e){const{context:t,output:n}=this,[r,s]=n,a=new Uint8Array(r*s*4);return t.readPixels(0,0,r,s,t.RGBA,t.UNSIGNED_BYTE,a),new Uint8ClampedArray((e?a:i.flipPixels(a,r,s)).buffer)}renderKernelsToArrays(){const e={result:this.renderOutput()};for(let t=0;t<this.subKernels.length;t++)e[this.subKernels[t].property]=this.mappedTextures[t].toArray();return e}renderKernelsToTextures(){const e={result:this.renderOutput()};if(this.immutable)for(let t=0;t<this.subKernels.length;t++)e[this.subKernels[t].property]=this.mappedTextures[t].clone();else for(let t=0;t<this.subKernels.length;t++)e[this.subKernels[t].property]=this.mappedTextures[t];return e}resetSwitchingKernels(){const e=this.switchingKernels;return this.switchingKernels=null,e}setOutput(e){const t=this.toKernelOutput(e);if(this.program){if(!this.dynamicOutput)throw new Error("Resizing a kernel with dynamicOutput: false is not possible");const n=[t[0],t[1]||1,t[2]||1],r=i.getKernelTextureSize({optimizeFloatMemory:this.optimizeFloatMemory,precision:this.precision},n),s=this.texSize;if(s){const t=this.getVariablePrecisionString(s,this.tactic),n=this.getVariablePrecisionString(r,this.tactic);if(t!==n)return this.debug&&console.warn("Precision requirement changed, asking GPU instance to recompile"),void this.switchKernels({type:"outputPrecisionMismatch",precision:n,needed:e})}this.output=t,this.threadDim=n,this.texSize=r;const{context:a}=this;if(a.bindFramebuffer(a.FRAMEBUFFER,this.framebuffer),this.updateMaxTexSize(),this.framebuffer.width=this.texSize[0],this.framebuffer.height=this.texSize[1],a.viewport(0,0,this.maxTexSize[0],this.maxTexSize[1]),this.canvas.width=this.maxTexSize[0],this.canvas.height=this.maxTexSize[1],this.texture&&this.texture.delete(),this.texture=null,this._setupOutputTexture(),this.mappedTextures&&this.mappedTextures.length>0){for(let e=0;e<this.mappedTextures.length;e++)this.mappedTextures[e].delete();this.mappedTextures=null,this._setupSubOutputTextures()}}else this.output=t;return this}renderValues(){return this.formatValues(this.transferValues(),this.output[0],this.output[1],this.output[2])}switchKernels(e){this.switchingKernels?this.switchingKernels.push(e):this.switchingKernels=[e]}getVariablePrecisionString(e=this.texSize,t=this.tactic,n=!1){if(!t){if(!this.constructor.features.isSpeedTacticSupported)return"highp";const t=this.constructor.features[n?"lowIntPrecision":"lowFloatPrecision"],r=this.constructor.features[n?"mediumIntPrecision":"mediumFloatPrecision"],i=this.constructor.features[n?"highIntPrecision":"highFloatPrecision"],s=Math.log2(e[0]*e[1]);if(s<=t.rangeMax)return"lowp";if(s<=r.rangeMax)return"mediump";if(s<=i.rangeMax)return"highp";throw new Error("The required size exceeds that of the ability of your system")}switch(t){case"speed":return"lowp";case"balanced":return"mediump";case"precision":return"highp";default:throw new Error(`Unknown tactic "${t}" use "speed", "balanced", "precision", or empty for auto`)}}updateTextureArgumentRefs(e,t){if(this.immutable)if(this.texture.texture===t.texture){const{prevArg:n}=e;n&&(1===n.texture._refs&&(this.texture.delete(),this.texture=n.clone(),this._textureSwitched=!0),n.delete()),e.prevArg=t.clone()}else if(this.mappedTextures&&this.mappedTextures.length>0){const{mappedTextures:n}=this;for(let r=0;r<n.length;r++){const i=n[r];if(i.texture===t.texture){const{prevArg:s}=e;return s&&(1===s.texture._refs&&(i.delete(),n[r]=s.clone(),this._mappedTextureSwitched[r]=!0),s.delete()),void(e.prevArg=t.clone())}}}}onActivate(e){if(this._textureSwitched=!0,this.texture=e.texture,this.mappedTextures){for(let e=0;e<this.mappedTextures.length;e++)this._mappedTextureSwitched[e]=!0;this.mappedTextures=e.mappedTextures}}initCanvas(){}}}},{"../../utils":114,"../kernel":36,"./texture/array-2-float":16,"./texture/array-2-float-2d":14,"./texture/array-2-float-3d":15,"./texture/array-3-float":19,"./texture/array-3-float-2d":17,"./texture/array-3-float-3d":18,"./texture/array-4-float":22,"./texture/array-4-float-2d":20,"./texture/array-4-float-3d":21,"./texture/float":25,"./texture/float-2d":23,"./texture/float-3d":24,"./texture/graphical":26,"./texture/memory-optimized":30,"./texture/memory-optimized-2d":28,"./texture/memory-optimized-3d":29,"./texture/unsigned":33,"./texture/unsigned-2d":31,"./texture/unsigned-3d":32}],14:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray2Float2D:class extends i{constructor(e){super(e),this.type="ArrayTexture(2)"}toArray(){return r.erect2DArray2(this.renderValues(),this.output[0],this.output[1])}}}},{"../../../utils":114,"./float":25}],15:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray2Float3D:class extends i{constructor(e){super(e),this.type="ArrayTexture(2)"}toArray(){return r.erect3DArray2(this.renderValues(),this.output[0],this.output[1],this.output[2])}}}},{"../../../utils":114,"./float":25}],16:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray2Float:class extends i{constructor(e){super(e),this.type="ArrayTexture(2)"}toArray(){return r.erectArray2(this.renderValues(),this.output[0],this.output[1])}}}},{"../../../utils":114,"./float":25}],17:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray3Float2D:class extends i{constructor(e){super(e),this.type="ArrayTexture(3)"}toArray(){return r.erect2DArray3(this.renderValues(),this.output[0],this.output[1])}}}},{"../../../utils":114,"./float":25}],18:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray3Float3D:class extends i{constructor(e){super(e),this.type="ArrayTexture(3)"}toArray(){return r.erect3DArray3(this.renderValues(),this.output[0],this.output[1],this.output[2])}}}},{"../../../utils":114,"./float":25}],19:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray3Float:class extends i{constructor(e){super(e),this.type="ArrayTexture(3)"}toArray(){return r.erectArray3(this.renderValues(),this.output[0])}}}},{"../../../utils":114,"./float":25}],20:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray4Float2D:class extends i{constructor(e){super(e),this.type="ArrayTexture(4)"}toArray(){return r.erect2DArray4(this.renderValues(),this.output[0],this.output[1])}}}},{"../../../utils":114,"./float":25}],21:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray4Float3D:class extends i{constructor(e){super(e),this.type="ArrayTexture(4)"}toArray(){return r.erect3DArray4(this.renderValues(),this.output[0],this.output[1],this.output[2])}}}},{"../../../utils":114,"./float":25}],22:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureArray4Float:class extends i{constructor(e){super(e),this.type="ArrayTexture(4)"}toArray(){return r.erectArray4(this.renderValues(),this.output[0])}}}},{"../../../utils":114,"./float":25}],23:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureFloat2D:class extends i{constructor(e){super(e),this.type="ArrayTexture(1)"}toArray(){return r.erect2DFloat(this.renderValues(),this.output[0],this.output[1])}}}},{"../../../utils":114,"./float":25}],24:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureFloat3D:class extends i{constructor(e){super(e),this.type="ArrayTexture(1)"}toArray(){return r.erect3DFloat(this.renderValues(),this.output[0],this.output[1],this.output[2])}}}},{"../../../utils":114,"./float":25}],25:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTexture:i}=e("./index");t.exports={GLTextureFloat:class extends i{get textureType(){return this.context.FLOAT}constructor(e){super(e),this.type="ArrayTexture(1)"}renderRawOutput(){const e=this.context,t=this.size;e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer()),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.texture,0);const n=new Float32Array(t[0]*t[1]*4);return e.readPixels(0,0,t[0],t[1],e.RGBA,e.FLOAT,n),n}renderValues(){return this._deleted?null:this.renderRawOutput()}toArray(){return r.erectFloat(this.renderValues(),this.output[0])}}}},{"../../../utils":114,"./index":27}],26:[function(e,t,n){const{GLTextureUnsigned:r}=e("./unsigned");t.exports={GLTextureGraphical:class extends r{constructor(e){super(e),this.type="ArrayTexture(4)"}toArray(){return this.renderValues()}}}},{"./unsigned":33}],27:[function(e,t,n){const{Texture:r}=e("../../../texture");function i(e,t){e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)}t.exports={GLTexture:class extends r{get textureType(){throw new Error(`"textureType" not implemented on ${this.name}`)}clone(){return new this.constructor(this)}beforeMutate(){return this.texture._refs>1&&(this.newTexture(),!0)}cloneTexture(){this.texture._refs--;const{context:e,size:t,texture:n,kernel:r}=this;r.debug&&console.warn("cloning internal texture"),e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer()),i(e,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);const s=e.createTexture();i(e,s),e.texImage2D(e.TEXTURE_2D,0,this.internalFormat,t[0],t[1],0,this.textureFormat,this.textureType,null),e.copyTexSubImage2D(e.TEXTURE_2D,0,0,0,0,0,t[0],t[1]),s._refs=1,this.texture=s}newTexture(){this.texture._refs--;const e=this.context,t=this.size;this.kernel.debug&&console.warn("new internal texture");const n=e.createTexture();i(e,n),e.texImage2D(e.TEXTURE_2D,0,this.internalFormat,t[0],t[1],0,this.textureFormat,this.textureType,null),n._refs=1,this.texture=n}clear(){if(this.texture._refs){this.texture._refs--;const e=this.context,t=this.texture=e.createTexture();i(e,t);const n=this.size;t._refs=1,e.texImage2D(e.TEXTURE_2D,0,this.internalFormat,n[0],n[1],0,this.textureFormat,this.textureType,null)}const{context:e,texture:t}=this;e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer()),e.bindTexture(e.TEXTURE_2D,t),i(e,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT)}delete(){this._deleted||(this._deleted=!0,this.texture._refs&&(this.texture._refs--,this.texture._refs)||this.context.deleteTexture(this.texture))}framebuffer(){return this._framebuffer||(this._framebuffer=this.kernel.getRawValueFramebuffer(this.size[0],this.size[1])),this._framebuffer}}}},{"../../../texture":113}],28:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureMemoryOptimized2D:class extends i{constructor(e){super(e),this.type="MemoryOptimizedNumberTexture"}toArray(){return r.erectMemoryOptimized2DFloat(this.renderValues(),this.output[0],this.output[1])}}}},{"../../../utils":114,"./float":25}],29:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureMemoryOptimized3D:class extends i{constructor(e){super(e),this.type="MemoryOptimizedNumberTexture"}toArray(){return r.erectMemoryOptimized3DFloat(this.renderValues(),this.output[0],this.output[1],this.output[2])}}}},{"../../../utils":114,"./float":25}],30:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureFloat:i}=e("./float");t.exports={GLTextureMemoryOptimized:class extends i{constructor(e){super(e),this.type="MemoryOptimizedNumberTexture"}toArray(){return r.erectMemoryOptimizedFloat(this.renderValues(),this.output[0])}}}},{"../../../utils":114,"./float":25}],31:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureUnsigned:i}=e("./unsigned");t.exports={GLTextureUnsigned2D:class extends i{constructor(e){super(e),this.type="NumberTexture"}toArray(){return r.erect2DPackedFloat(this.renderValues(),this.output[0],this.output[1])}}}},{"../../../utils":114,"./unsigned":33}],32:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTextureUnsigned:i}=e("./unsigned");t.exports={GLTextureUnsigned3D:class extends i{constructor(e){super(e),this.type="NumberTexture"}toArray(){return r.erect3DPackedFloat(this.renderValues(),this.output[0],this.output[1],this.output[2])}}}},{"../../../utils":114,"./unsigned":33}],33:[function(e,t,n){const{utils:r}=e("../../../utils"),{GLTexture:i}=e("./index");t.exports={GLTextureUnsigned:class extends i{get textureType(){return this.context.UNSIGNED_BYTE}constructor(e){super(e),this.type="NumberTexture"}renderRawOutput(){const{context:e}=this;e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer()),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.texture,0);const t=new Uint8Array(this.size[0]*this.size[1]*4);return e.readPixels(0,0,this.size[0],this.size[1],e.RGBA,e.UNSIGNED_BYTE,t),t}renderValues(){return this._deleted?null:new Float32Array(this.renderRawOutput().buffer)}toArray(){return r.erectPackedFloat(this.renderValues(),this.output[0])}}}},{"../../../utils":114,"./index":27}],34:[function(e,t,n){const r=e("gl"),{WebGLKernel:i}=e("../web-gl/kernel"),{glKernelString:s}=e("../gl/kernel-string");let a=null,o=null,u=null,l=null,h=null;t.exports={HeadlessGLKernel:class extends i{static get isSupported(){return null!==a||(this.setupFeatureChecks(),a=null!==u),a}static setupFeatureChecks(){if(o=null,l=null,"function"==typeof r)try{if(u=r(2,2,{preserveDrawingBuffer:!0}),!u||!u.getExtension)return;l={STACKGL_resize_drawingbuffer:u.getExtension("STACKGL_resize_drawingbuffer"),STACKGL_destroy_context:u.getExtension("STACKGL_destroy_context"),OES_texture_float:u.getExtension("OES_texture_float"),OES_texture_float_linear:u.getExtension("OES_texture_float_linear"),OES_element_index_uint:u.getExtension("OES_element_index_uint"),WEBGL_draw_buffers:u.getExtension("WEBGL_draw_buffers"),WEBGL_color_buffer_float:u.getExtension("WEBGL_color_buffer_float")},h=this.getFeatures()}catch(e){console.warn(e)}}static isContextMatch(e){try{return"ANGLE"===e.getParameter(e.RENDERER)}catch(e){return!1}}static getIsTextureFloat(){return Boolean(l.OES_texture_float)}static getIsDrawBuffers(){return Boolean(l.WEBGL_draw_buffers)}static getChannelCount(){return l.WEBGL_draw_buffers?u.getParameter(l.WEBGL_draw_buffers.MAX_DRAW_BUFFERS_WEBGL):1}static getMaxTextureSize(){return u.getParameter(u.MAX_TEXTURE_SIZE)}static get testCanvas(){return o}static get testContext(){return u}static get features(){return h}initCanvas(){return{}}initContext(){return r(2,2,{preserveDrawingBuffer:!0})}initExtensions(){this.extensions={STACKGL_resize_drawingbuffer:this.context.getExtension("STACKGL_resize_drawingbuffer"),STACKGL_destroy_context:this.context.getExtension("STACKGL_destroy_context"),OES_texture_float:this.context.getExtension("OES_texture_float"),OES_texture_float_linear:this.context.getExtension("OES_texture_float_linear"),OES_element_index_uint:this.context.getExtension("OES_element_index_uint"),WEBGL_draw_buffers:this.context.getExtension("WEBGL_draw_buffers")}}build(){super.build.apply(this,arguments),this.fallbackRequested||this.extensions.STACKGL_resize_drawingbuffer.resize(this.maxTexSize[0],this.maxTexSize[1])}destroyExtensions(){this.extensions.STACKGL_resize_drawingbuffer=null,this.extensions.STACKGL_destroy_context=null,this.extensions.OES_texture_float=null,this.extensions.OES_texture_float_linear=null,this.extensions.OES_element_index_uint=null,this.extensions.WEBGL_draw_buffers=null}static destroyContext(e){const t=e.getExtension("STACKGL_destroy_context");t&&t.destroy&&t.destroy()}toString(){return s(this.constructor,arguments,this,"const gl = context || require('gl')(1, 1);\n","    if (!context) { gl.getExtension('STACKGL_destroy_context').destroy(); }\n")}setOutput(e){return super.setOutput(e),this.graphical&&this.extensions.STACKGL_resize_drawingbuffer&&this.extensions.STACKGL_resize_drawingbuffer.resize(this.maxTexSize[0],this.maxTexSize[1]),this}}}},{"../gl/kernel-string":12,"../web-gl/kernel":70,gl:2}],35:[function(e,t,n){t.exports={KernelValue:class{constructor(e,t){const{name:n,kernel:r,context:i,checkContext:s,onRequestContextHandle:a,onUpdateValueMismatch:o,origin:u,strictIntegers:l,type:h,tactic:c}=t;if(!n)throw new Error("name not set");if(!h)throw new Error("type not set");if(!u)throw new Error("origin not set");if("user"!==u&&"constants"!==u)throw new Error(`origin must be "user" or "constants" value is "${u}"`);if(!a)throw new Error("onRequestContextHandle is not set");this.name=n,this.origin=u,this.tactic=c,this.varName="constants"===u?`constants.${n}`:n,this.kernel=r,this.strictIntegers=l,this.type=e.type||h,this.size=e.size||null,this.index=null,this.context=i,this.checkContext=null==s||s,this.contextHandle=null,this.onRequestContextHandle=a,this.onUpdateValueMismatch=o,this.forceUploadEachRun=null}get id(){return`${this.origin}_${name}`}getSource(){throw new Error(`"getSource" not defined on ${this.constructor.name}`)}updateValue(e){throw new Error(`"updateValue" not defined on ${this.constructor.name}`)}}}},{}],36:[function(e,t,n){const{utils:r}=e("../utils"),{Input:i}=e("../input");t.exports={Kernel:class{static get isSupported(){throw new Error(`"isSupported" not implemented on ${this.name}`)}static isContextMatch(e){throw new Error(`"isContextMatch" not implemented on ${this.name}`)}static getFeatures(){throw new Error(`"getFeatures" not implemented on ${this.name}`)}static destroyContext(e){throw new Error(`"destroyContext" called on ${this.name}`)}static nativeFunctionArguments(){throw new Error(`"nativeFunctionArguments" called on ${this.name}`)}static nativeFunctionReturnType(){throw new Error(`"nativeFunctionReturnType" called on ${this.name}`)}static combineKernels(){throw new Error(`"combineKernels" called on ${this.name}`)}constructor(e,t){if("object"!=typeof e){if("string"!=typeof e)throw new Error("source not a string");if(!r.isFunctionString(e))throw new Error("source not a function string")}this.useLegacyEncoder=!1,this.fallbackRequested=!1,this.onRequestFallback=null,this.argumentNames="string"==typeof e?r.getArgumentNamesFromString(e):null,this.argumentTypes=null,this.argumentSizes=null,this.argumentBitRatios=null,this.kernelArguments=null,this.kernelConstants=null,this.forceUploadKernelConstants=null,this.source=e,this.output=null,this.debug=!1,this.graphical=!1,this.loopMaxIterations=0,this.constants=null,this.constantTypes=null,this.constantBitRatios=null,this.dynamicArguments=!1,this.dynamicOutput=!1,this.canvas=null,this.context=null,this.checkContext=null,this.gpu=null,this.functions=null,this.nativeFunctions=null,this.injectedNative=null,this.subKernels=null,this.validate=!0,this.immutable=!1,this.pipeline=!1,this.precision=null,this.tactic=null,this.plugins=null,this.returnType=null,this.leadingReturnStatement=null,this.followingReturnStatement=null,this.optimizeFloatMemory=null,this.strictIntegers=!1,this.fixIntegerDivisionAccuracy=null,this.built=!1,this.signature=null}mergeSettings(e){for(let t in e)if(e.hasOwnProperty(t)&&this.hasOwnProperty(t)){switch(t){case"output":if(!Array.isArray(e.output)){this.setOutput(e.output);continue}break;case"functions":this.functions=[];for(let t=0;t<e.functions.length;t++)this.addFunction(e.functions[t]);continue;case"graphical":e[t]&&!e.hasOwnProperty("precision")&&(this.precision="unsigned"),this[t]=e[t];continue;case"nativeFunctions":if(!e.nativeFunctions)continue;this.nativeFunctions=[];for(let t=0;t<e.nativeFunctions.length;t++){const n=e.nativeFunctions[t],{name:r,source:i}=n;this.addNativeFunction(r,i,n)}continue}this[t]=e[t]}this.canvas||(this.canvas=this.initCanvas()),this.context||(this.context=this.initContext()),this.plugins||(this.plugins=this.initPlugins(e))}build(){throw new Error(`"build" not defined on ${this.constructor.name}`)}run(){throw new Error(`"run" not defined on ${this.constructor.name}`)}initCanvas(){throw new Error(`"initCanvas" not defined on ${this.constructor.name}`)}initContext(){throw new Error(`"initContext" not defined on ${this.constructor.name}`)}initPlugins(e){throw new Error(`"initPlugins" not defined on ${this.constructor.name}`)}addFunction(e,t={}){if(e.name&&e.source&&e.argumentTypes&&"returnType"in e)this.functions.push(e);else if("settings"in e&&"source"in e)this.functions.push(this.functionToIGPUFunction(e.source,e.settings));else{if("string"!=typeof e&&"function"!=typeof e)throw new Error("function not properly defined");this.functions.push(this.functionToIGPUFunction(e,t))}return this}addNativeFunction(e,t,n={}){const{argumentTypes:r,argumentNames:i}=n.argumentTypes?function(e){const t=Object.keys(e),n=[];for(let r=0;r<t.length;r++){const i=t[r];n.push(e[i])}return{argumentTypes:n,argumentNames:t}}(n.argumentTypes):this.constructor.nativeFunctionArguments(t)||{};return this.nativeFunctions.push({name:e,source:t,settings:n,argumentTypes:r,argumentNames:i,returnType:n.returnType||this.constructor.nativeFunctionReturnType(t)}),this}setupArguments(e){if(this.kernelArguments=[],this.argumentTypes)for(let e=0;e<this.argumentTypes.length;e++)this.kernelArguments.push({type:this.argumentTypes[e]});else if(!this.argumentTypes){this.argumentTypes=[];for(let t=0;t<e.length;t++){const n=r.getVariableType(e[t],this.strictIntegers),i="Integer"===n?"Number":n;this.argumentTypes.push(i),this.kernelArguments.push({type:i})}}this.argumentSizes=new Array(e.length),this.argumentBitRatios=new Int32Array(e.length);for(let t=0;t<e.length;t++){const n=e[t];this.argumentSizes[t]=n.constructor===i?n.size:null,this.argumentBitRatios[t]=this.getBitRatio(n)}if(this.argumentNames.length!==e.length)throw new Error("arguments are miss-aligned")}setupConstants(){this.kernelConstants=[];let e=null===this.constantTypes;if(e&&(this.constantTypes={}),this.constantBitRatios={},this.constants)for(let t in this.constants){if(e){const e=r.getVariableType(this.constants[t],this.strictIntegers);this.constantTypes[t]=e,this.kernelConstants.push({name:t,type:e})}else this.kernelConstants.push({name:t,type:this.constantTypes[t]});this.constantBitRatios[t]=this.getBitRatio(this.constants[t])}}setOptimizeFloatMemory(e){return this.optimizeFloatMemory=e,this}toKernelOutput(e){return e.hasOwnProperty("x")?e.hasOwnProperty("y")?e.hasOwnProperty("z")?[e.x,e.y,e.z]:[e.x,e.y]:[e.x]:e}setOutput(e){return this.output=this.toKernelOutput(e),this}setDebug(e){return this.debug=e,this}setGraphical(e){return this.graphical=e,this.precision="unsigned",this}setLoopMaxIterations(e){return this.loopMaxIterations=e,this}setConstants(e){return this.constants=e,this}setConstantTypes(e){return this.constantTypes=e,this}setFunctions(e){for(let t=0;t<e.length;t++)this.addFunction(e[t]);return this}setNativeFunctions(e){for(let t=0;t<e.length;t++){const n=e[t],{name:r,source:i}=n;this.addNativeFunction(r,i,n)}return this}setInjectedNative(e){return this.injectedNative=e,this}setPipeline(e){return this.pipeline=e,this}setPrecision(e){return this.precision=e,this}setDimensions(e){return r.warnDeprecated("method","setDimensions","setOutput"),this.output=e,this}setOutputToTexture(e){return r.warnDeprecated("method","setOutputToTexture","setPipeline"),this.pipeline=e,this}setImmutable(e){return this.immutable=e,this}setCanvas(e){return this.canvas=e,this}setStrictIntegers(e){return this.strictIntegers=e,this}setDynamicOutput(e){return this.dynamicOutput=e,this}setHardcodeConstants(e){return r.warnDeprecated("method","setHardcodeConstants"),this.setDynamicOutput(e),this.setDynamicArguments(e),this}setDynamicArguments(e){return this.dynamicArguments=e,this}setUseLegacyEncoder(e){return this.useLegacyEncoder=e,this}setWarnVarUsage(e){return r.warnDeprecated("method","setWarnVarUsage"),this}getCanvas(){return r.warnDeprecated("method","getCanvas"),this.canvas}getWebGl(){return r.warnDeprecated("method","getWebGl"),this.context}setContext(e){return this.context=e,this}setArgumentTypes(e){if(Array.isArray(e))this.argumentTypes=e;else{this.argumentTypes=[];for(const t in e){if(!e.hasOwnProperty(t))continue;const n=this.argumentNames.indexOf(t);if(-1===n)throw new Error(`unable to find argument ${t}`);this.argumentTypes[n]=e[t]}}return this}setTactic(e){return this.tactic=e,this}requestFallback(e){if(!this.onRequestFallback)throw new Error(`"onRequestFallback" not defined on ${this.constructor.name}`);return this.fallbackRequested=!0,this.onRequestFallback(e)}validateSettings(){throw new Error(`"validateSettings" not defined on ${this.constructor.name}`)}addSubKernel(e){if(null===this.subKernels&&(this.subKernels=[]),!e.source)throw new Error('subKernel missing "source" property');if(!e.property&&isNaN(e.property))throw new Error('subKernel missing "property" property');if(!e.name)throw new Error('subKernel missing "name" property');return this.subKernels.push(e),this}destroy(e){throw new Error(`"destroy" called on ${this.constructor.name}`)}getBitRatio(e){if("single"===this.precision)return 4;if(Array.isArray(e[0]))return this.getBitRatio(e[0]);if(e.constructor===i)return this.getBitRatio(e.value);switch(e.constructor){case Uint8ClampedArray:case Uint8Array:case Int8Array:return 1;case Uint16Array:case Int16Array:return 2;case Float32Array:case Int32Array:default:return 4}}getPixels(e){throw new Error(`"getPixels" called on ${this.constructor.name}`)}checkOutput(){if(!this.output||!r.isArray(this.output))throw new Error("kernel.output not an array");if(this.output.length<1)throw new Error("kernel.output is empty, needs at least 1 value");for(let e=0;e<this.output.length;e++)if(isNaN(this.output[e])||this.output[e]<1)throw new Error(`${this.constructor.name}.output[${e}] incorrectly defined as \`${this.output[e]}\`, needs to be numeric, and greater than 0`)}prependString(e){throw new Error(`"prependString" called on ${this.constructor.name}`)}hasPrependString(e){throw new Error(`"hasPrependString" called on ${this.constructor.name}`)}toJSON(){return{settings:{output:this.output,pipeline:this.pipeline,argumentNames:this.argumentNames,argumentsTypes:this.argumentTypes,constants:this.constants,pluginNames:this.plugins?this.plugins.map((e=>e.name)):null,returnType:this.returnType}}}buildSignature(e){const t=this.constructor;this.signature=t.getSignature(this,t.getArgumentTypes(this,e))}static getArgumentTypes(e,t){const n=new Array(t.length);for(let i=0;i<t.length;i++){const s=t[i],a=e.argumentTypes[i];if(s.type)n[i]=s.type;else switch(a){case"Number":case"Integer":case"Float":case"ArrayTexture(1)":n[i]=r.getVariableType(s);break;default:n[i]=a}}return n}static getSignature(e,t){throw new Error(`"getSignature" not implemented on ${this.name}`)}functionToIGPUFunction(e,t={}){if("string"!=typeof e&&"function"!=typeof e)throw new Error("source not a string or function");const n="string"==typeof e?e:e.toString();let i=[];return i=Array.isArray(t.argumentTypes)?t.argumentTypes:"object"==typeof t.argumentTypes?r.getArgumentNamesFromString(n).map((e=>t.argumentTypes[e]))||[]:t.argumentTypes||[],{name:r.getFunctionNameFromString(n)||null,source:n,argumentTypes:i,returnType:t.returnType||null}}onActivate(e){}}}},{"../input":110,"../utils":114}],37:[function(e,t,n){const r=`__HEADER__;\n__FLOAT_TACTIC_DECLARATION__;\n__INT_TACTIC_DECLARATION__;\n__SAMPLER_2D_TACTIC_DECLARATION__;\n\nconst int LOOP_MAX = __LOOP_MAX__;\n\n__PLUGINS__;\n__CONSTANTS__;\n\nvarying vec2 vTexCoord;\n\nfloat acosh(float x) {\n  return log(x + sqrt(x * x - 1.0));\n}\n\nfloat sinh(float x) {\n  return (pow(${Math.E}, x) - pow(${Math.E}, -x)) / 2.0;\n}\n\nfloat asinh(float x) {\n  return log(x + sqrt(x * x + 1.0));\n}\n\nfloat atan2(float v1, float v2) {\n  if (v1 == 0.0 || v2 == 0.0) return 0.0;\n  return atan(v1 / v2);\n}\n\nfloat atanh(float x) {\n  x = (x + 1.0) / (x - 1.0);\n  if (x < 0.0) {\n    return 0.5 * log(-x);\n  }\n  return 0.5 * log(x);\n}\n\nfloat cbrt(float x) {\n  if (x >= 0.0) {\n    return pow(x, 1.0 / 3.0);\n  } else {\n    return -pow(x, 1.0 / 3.0);\n  }\n}\n\nfloat cosh(float x) {\n  return (pow(${Math.E}, x) + pow(${Math.E}, -x)) / 2.0; \n}\n\nfloat expm1(float x) {\n  return pow(${Math.E}, x) - 1.0; \n}\n\nfloat fround(highp float x) {\n  return x;\n}\n\nfloat imul(float v1, float v2) {\n  return float(int(v1) * int(v2));\n}\n\nfloat log10(float x) {\n  return log2(x) * (1.0 / log2(10.0));\n}\n\nfloat log1p(float x) {\n  return log(1.0 + x);\n}\n\nfloat _pow(float v1, float v2) {\n  if (v2 == 0.0) return 1.0;\n  return pow(v1, v2);\n}\n\nfloat tanh(float x) {\n  float e = exp(2.0 * x);\n  return (e - 1.0) / (e + 1.0);\n}\n\nfloat trunc(float x) {\n  if (x >= 0.0) {\n    return floor(x); \n  } else {\n    return ceil(x);\n  }\n}\n\nvec4 _round(vec4 x) {\n  return floor(x + 0.5);\n}\n\nfloat _round(float x) {\n  return floor(x + 0.5);\n}\n\nconst int BIT_COUNT = 32;\nint modi(int x, int y) {\n  return x - y * (x / y);\n}\n\nint bitwiseOr(int a, int b) {\n  int result = 0;\n  int n = 1;\n  \n  for (int i = 0; i < BIT_COUNT; i++) {\n    if ((modi(a, 2) == 1) || (modi(b, 2) == 1)) {\n      result += n;\n    }\n    a = a / 2;\n    b = b / 2;\n    n = n * 2;\n    if(!(a > 0 || b > 0)) {\n      break;\n    }\n  }\n  return result;\n}\nint bitwiseXOR(int a, int b) {\n  int result = 0;\n  int n = 1;\n  \n  for (int i = 0; i < BIT_COUNT; i++) {\n    if ((modi(a, 2) == 1) != (modi(b, 2) == 1)) {\n      result += n;\n    }\n    a = a / 2;\n    b = b / 2;\n    n = n * 2;\n    if(!(a > 0 || b > 0)) {\n      break;\n    }\n  }\n  return result;\n}\nint bitwiseAnd(int a, int b) {\n  int result = 0;\n  int n = 1;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if ((modi(a, 2) == 1) && (modi(b, 2) == 1)) {\n      result += n;\n    }\n    a = a / 2;\n    b = b / 2;\n    n = n * 2;\n    if(!(a > 0 && b > 0)) {\n      break;\n    }\n  }\n  return result;\n}\nint bitwiseNot(int a) {\n  int result = 0;\n  int n = 1;\n  \n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (modi(a, 2) == 0) {\n      result += n;    \n    }\n    a = a / 2;\n    n = n * 2;\n  }\n  return result;\n}\nint bitwiseZeroFillLeftShift(int n, int shift) {\n  int maxBytes = BIT_COUNT;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (maxBytes >= n) {\n      break;\n    }\n    maxBytes *= 2;\n  }\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= shift) {\n      break;\n    }\n    n *= 2;\n  }\n\n  int result = 0;\n  int byteVal = 1;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= maxBytes) break;\n    if (modi(n, 2) > 0) { result += byteVal; }\n    n = int(n / 2);\n    byteVal *= 2;\n  }\n  return result;\n}\n\nint bitwiseSignedRightShift(int num, int shifts) {\n  return int(floor(float(num) / pow(2.0, float(shifts))));\n}\n\nint bitwiseZeroFillRightShift(int n, int shift) {\n  int maxBytes = BIT_COUNT;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (maxBytes >= n) {\n      break;\n    }\n    maxBytes *= 2;\n  }\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= shift) {\n      break;\n    }\n    n /= 2;\n  }\n  int result = 0;\n  int byteVal = 1;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= maxBytes) break;\n    if (modi(n, 2) > 0) { result += byteVal; }\n    n = int(n / 2);\n    byteVal *= 2;\n  }\n  return result;\n}\n\nvec2 integerMod(vec2 x, float y) {\n  vec2 res = floor(mod(x, y));\n  return res * step(1.0 - floor(y), -res);\n}\n\nvec3 integerMod(vec3 x, float y) {\n  vec3 res = floor(mod(x, y));\n  return res * step(1.0 - floor(y), -res);\n}\n\nvec4 integerMod(vec4 x, vec4 y) {\n  vec4 res = floor(mod(x, y));\n  return res * step(1.0 - floor(y), -res);\n}\n\nfloat integerMod(float x, float y) {\n  float res = floor(mod(x, y));\n  return res * (res > floor(y) - 1.0 ? 0.0 : 1.0);\n}\n\nint integerMod(int x, int y) {\n  return x - (y * int(x / y));\n}\n\n__DIVIDE_WITH_INTEGER_CHECK__;\n\n// Here be dragons!\n// DO NOT OPTIMIZE THIS CODE\n// YOU WILL BREAK SOMETHING ON SOMEBODY'S MACHINE\n// LEAVE IT AS IT IS, LEST YOU WASTE YOUR OWN TIME\nconst vec2 MAGIC_VEC = vec2(1.0, -256.0);\nconst vec4 SCALE_FACTOR = vec4(1.0, 256.0, 65536.0, 0.0);\nconst vec4 SCALE_FACTOR_INV = vec4(1.0, 0.00390625, 0.0000152587890625, 0.0); // 1, 1/256, 1/65536\nfloat decode32(vec4 texel) {\n  __DECODE32_ENDIANNESS__;\n  texel *= 255.0;\n  vec2 gte128;\n  gte128.x = texel.b >= 128.0 ? 1.0 : 0.0;\n  gte128.y = texel.a >= 128.0 ? 1.0 : 0.0;\n  float exponent = 2.0 * texel.a - 127.0 + dot(gte128, MAGIC_VEC);\n  float res = exp2(_round(exponent));\n  texel.b = texel.b - 128.0 * gte128.x;\n  res = dot(texel, SCALE_FACTOR) * exp2(_round(exponent-23.0)) + res;\n  res *= gte128.y * -2.0 + 1.0;\n  return res;\n}\n\nfloat decode16(vec4 texel, int index) {\n  int channel = integerMod(index, 2);\n  if (channel == 0) return texel.r * 255.0 + texel.g * 65280.0;\n  if (channel == 1) return texel.b * 255.0 + texel.a * 65280.0;\n  return 0.0;\n}\n\nfloat decode8(vec4 texel, int index) {\n  int channel = integerMod(index, 4);\n  if (channel == 0) return texel.r * 255.0;\n  if (channel == 1) return texel.g * 255.0;\n  if (channel == 2) return texel.b * 255.0;\n  if (channel == 3) return texel.a * 255.0;\n  return 0.0;\n}\n\nvec4 legacyEncode32(float f) {\n  float F = abs(f);\n  float sign = f < 0.0 ? 1.0 : 0.0;\n  float exponent = floor(log2(F));\n  float mantissa = (exp2(-exponent) * F);\n  // exponent += floor(log2(mantissa));\n  vec4 texel = vec4(F * exp2(23.0-exponent)) * SCALE_FACTOR_INV;\n  texel.rg = integerMod(texel.rg, 256.0);\n  texel.b = integerMod(texel.b, 128.0);\n  texel.a = exponent*0.5 + 63.5;\n  texel.ba += vec2(integerMod(exponent+127.0, 2.0), sign) * 128.0;\n  texel = floor(texel);\n  texel *= 0.003921569; // 1/255\n  __ENCODE32_ENDIANNESS__;\n  return texel;\n}\n\n// https://github.com/gpujs/gpu.js/wiki/Encoder-details\nvec4 encode32(float value) {\n  if (value == 0.0) return vec4(0, 0, 0, 0);\n\n  float exponent;\n  float mantissa;\n  vec4  result;\n  float sgn;\n\n  sgn = step(0.0, -value);\n  value = abs(value);\n\n  exponent = floor(log2(value));\n\n  mantissa = value*pow(2.0, -exponent)-1.0;\n  exponent = exponent+127.0;\n  result   = vec4(0,0,0,0);\n\n  result.a = floor(exponent/2.0);\n  exponent = exponent - result.a*2.0;\n  result.a = result.a + 128.0*sgn;\n\n  result.b = floor(mantissa * 128.0);\n  mantissa = mantissa - result.b / 128.0;\n  result.b = result.b + exponent*128.0;\n\n  result.g = floor(mantissa*32768.0);\n  mantissa = mantissa - result.g/32768.0;\n\n  result.r = floor(mantissa*8388608.0);\n  return result/255.0;\n}\n// Dragons end here\n\nint index;\nivec3 threadId;\n\nivec3 indexTo3D(int idx, ivec3 texDim) {\n  int z = int(idx / (texDim.x * texDim.y));\n  idx -= z * int(texDim.x * texDim.y);\n  int y = int(idx / texDim.x);\n  int x = int(integerMod(idx, texDim.x));\n  return ivec3(x, y, z);\n}\n\nfloat get32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture2D(tex, st / vec2(texSize));\n  return decode32(texel);\n}\n\nfloat get16(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int w = texSize.x * 2;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture2D(tex, st / vec2(texSize.x * 2, texSize.y));\n  return decode16(texel, index);\n}\n\nfloat get8(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int w = texSize.x * 4;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture2D(tex, st / vec2(texSize.x * 4, texSize.y));\n  return decode8(texel, index);\n}\n\nfloat getMemoryOptimized32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int channel = integerMod(index, 4);\n  index = index / 4;\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture2D(tex, st / vec2(texSize));\n  if (channel == 0) return texel.r;\n  if (channel == 1) return texel.g;\n  if (channel == 2) return texel.b;\n  if (channel == 3) return texel.a;\n  return 0.0;\n}\n\nvec4 getImage2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  return texture2D(tex, st / vec2(texSize));\n}\n\nfloat getFloatFromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);\n  return result[0];\n}\n\nvec2 getVec2FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);\n  return vec2(result[0], result[1]);\n}\n\nvec2 getMemoryOptimizedVec2(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + (texDim.x * (y + (texDim.y * z)));\n  int channel = integerMod(index, 2);\n  index = index / 2;\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture2D(tex, st / vec2(texSize));\n  if (channel == 0) return vec2(texel.r, texel.g);\n  if (channel == 1) return vec2(texel.b, texel.a);\n  return vec2(0.0, 0.0);\n}\n\nvec3 getVec3FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);\n  return vec3(result[0], result[1], result[2]);\n}\n\nvec3 getMemoryOptimizedVec3(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int fieldIndex = 3 * (x + texDim.x * (y + texDim.y * z));\n  int vectorIndex = fieldIndex / 4;\n  int vectorOffset = fieldIndex - vectorIndex * 4;\n  int readY = vectorIndex / texSize.x;\n  int readX = vectorIndex - readY * texSize.x;\n  vec4 tex1 = texture2D(tex, (vec2(readX, readY) + 0.5) / vec2(texSize));\n  \n  if (vectorOffset == 0) {\n    return tex1.xyz;\n  } else if (vectorOffset == 1) {\n    return tex1.yzw;\n  } else {\n    readX++;\n    if (readX >= texSize.x) {\n      readX = 0;\n      readY++;\n    }\n    vec4 tex2 = texture2D(tex, vec2(readX, readY) / vec2(texSize));\n    if (vectorOffset == 2) {\n      return vec3(tex1.z, tex1.w, tex2.x);\n    } else {\n      return vec3(tex1.w, tex2.x, tex2.y);\n    }\n  }\n}\n\nvec4 getVec4FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  return getImage2D(tex, texSize, texDim, z, y, x);\n}\n\nvec4 getMemoryOptimizedVec4(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int channel = integerMod(index, 2);\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture2D(tex, st / vec2(texSize));\n  return vec4(texel.r, texel.g, texel.b, texel.a);\n}\n\nvec4 actualColor;\nvoid color(float r, float g, float b, float a) {\n  actualColor = vec4(r,g,b,a);\n}\n\nvoid color(float r, float g, float b) {\n  color(r,g,b,1.0);\n}\n\nvoid color(sampler2D image) {\n  actualColor = texture2D(image, vTexCoord);\n}\n\nfloat modulo(float number, float divisor) {\n  if (number < 0.0) {\n    number = abs(number);\n    if (divisor < 0.0) {\n      divisor = abs(divisor);\n    }\n    return -mod(number, divisor);\n  }\n  if (divisor < 0.0) {\n    divisor = abs(divisor);\n  }\n  return mod(number, divisor);\n}\n\n__INJECTED_NATIVE__;\n__MAIN_CONSTANTS__;\n__MAIN_ARGUMENTS__;\n__KERNEL__;\n\nvoid main(void) {\n  index = int(vTexCoord.s * float(uTexSize.x)) + int(vTexCoord.t * float(uTexSize.y)) * uTexSize.x;\n  __MAIN_RESULT__;\n}`;t.exports={fragmentShader:r}},{}],38:[function(e,t,n){const{utils:r}=e("../../utils"),{FunctionNode:i}=e("../function-node");const s={Array:"sampler2D","Array(2)":"vec2","Array(3)":"vec3","Array(4)":"vec4","Matrix(2)":"mat2","Matrix(3)":"mat3","Matrix(4)":"mat4",Array2D:"sampler2D",Array3D:"sampler2D",Boolean:"bool",Float:"float",Input:"sampler2D",Integer:"int",Number:"float",LiteralInteger:"float",NumberTexture:"sampler2D",MemoryOptimizedNumberTexture:"sampler2D","ArrayTexture(1)":"sampler2D","ArrayTexture(2)":"sampler2D","ArrayTexture(3)":"sampler2D","ArrayTexture(4)":"sampler2D",HTMLVideo:"sampler2D",HTMLCanvas:"sampler2D",OffscreenCanvas:"sampler2D",HTMLImage:"sampler2D",ImageBitmap:"sampler2D",ImageData:"sampler2D",HTMLImageArray:"sampler2DArray"},a={"===":"==","!==":"!="};t.exports={WebGLFunctionNode:class extends i{constructor(e,t){super(e,t),t&&t.hasOwnProperty("fixIntegerDivisionAccuracy")&&(this.fixIntegerDivisionAccuracy=t.fixIntegerDivisionAccuracy)}astConditionalExpression(e,t){if("ConditionalExpression"!==e.type)throw this.astErrorOutput("Not a conditional expression",e);const n=this.getType(e.consequent),r=this.getType(e.alternate);return null===n&&null===r?(t.push("if ("),this.astGeneric(e.test,t),t.push(") {"),this.astGeneric(e.consequent,t),t.push(";"),t.push("} else {"),this.astGeneric(e.alternate,t),t.push(";"),t.push("}"),t):(t.push("("),this.astGeneric(e.test,t),t.push("?"),this.astGeneric(e.consequent,t),t.push(":"),this.astGeneric(e.alternate,t),t.push(")"),t)}astFunction(e,t){if(this.isRootKernel)t.push("void");else{if(!this.returnType){this.findLastReturn()&&(this.returnType=this.getType(e.body),"LiteralInteger"===this.returnType&&(this.returnType="Number"))}const{returnType:n}=this;if(n){const e=s[n];if(!e)throw new Error(`unknown type ${n}`);t.push(e)}else t.push("void")}if(t.push(" "),t.push(this.name),t.push("("),!this.isRootKernel)for(let n=0;n<this.argumentNames.length;++n){const i=this.argumentNames[n];n>0&&t.push(", ");let a=this.argumentTypes[this.argumentNames.indexOf(i)];if(!a)throw this.astErrorOutput(`Unknown argument ${i} type`,e);"LiteralInteger"===a&&(this.argumentTypes[n]=a="Number");const o=s[a];if(!o)throw this.astErrorOutput("Unexpected expression",e);const u=r.sanitizeName(i);"sampler2D"===o||"sampler2DArray"===o?t.push(`${o} user_${u},ivec2 user_${u}Size,ivec3 user_${u}Dim`):t.push(`${o} user_${u}`)}t.push(") {\n");for(let n=0;n<e.body.body.length;++n)this.astGeneric(e.body.body[n],t),t.push("\n");return t.push("}\n"),t}astReturnStatement(e,t){if(!e.argument)throw this.astErrorOutput("Unexpected return statement",e);this.pushState("skip-literal-correction");const n=this.getType(e.argument);this.popState("skip-literal-correction");const r=[];switch(this.returnType||(this.returnType="LiteralInteger"===n||"Integer"===n?"Number":n),this.returnType){case"LiteralInteger":case"Number":case"Float":switch(n){case"Integer":r.push("float("),this.astGeneric(e.argument,r),r.push(")");break;case"LiteralInteger":this.castLiteralToFloat(e.argument,r),"Integer"===this.getType(e)&&(r.unshift("float("),r.push(")"));break;default:this.astGeneric(e.argument,r)}break;case"Integer":switch(n){case"Float":case"Number":this.castValueToInteger(e.argument,r);break;case"LiteralInteger":this.castLiteralToInteger(e.argument,r);break;default:this.astGeneric(e.argument,r)}break;case"Array(4)":case"Array(3)":case"Array(2)":case"Matrix(2)":case"Matrix(3)":case"Matrix(4)":case"Input":this.astGeneric(e.argument,r);break;default:throw this.astErrorOutput(`unhandled return type ${this.returnType}`,e)}return this.isRootKernel?(t.push(`kernelResult = ${r.join("")};`),t.push("return;")):this.isSubKernel?(t.push(`subKernelResult_${this.name} = ${r.join("")};`),t.push(`return subKernelResult_${this.name};`)):t.push(`return ${r.join("")};`),t}astLiteral(e,t){if(isNaN(e.value))throw this.astErrorOutput("Non-numeric literal not supported : "+e.value,e);const n=this.astKey(e);return Number.isInteger(e.value)?this.isState("casting-to-integer")||this.isState("building-integer")?(this.literalTypes[n]="Integer",t.push(`${e.value}`)):(this.isState("casting-to-float")||this.isState("building-float"),this.literalTypes[n]="Number",t.push(`${e.value}.0`)):this.isState("casting-to-integer")||this.isState("building-integer")?(this.literalTypes[n]="Integer",t.push(Math.round(e.value))):(this.literalTypes[n]="Number",t.push(`${e.value}`)),t}astBinaryExpression(e,t){if(this.checkAndUpconvertOperator(e,t))return t;if(this.fixIntegerDivisionAccuracy&&"/"===e.operator){switch(t.push("divWithIntCheck("),this.pushState("building-float"),this.getType(e.left)){case"Integer":this.castValueToFloat(e.left,t);break;case"LiteralInteger":this.castLiteralToFloat(e.left,t);break;default:this.astGeneric(e.left,t)}switch(t.push(", "),this.getType(e.right)){case"Integer":this.castValueToFloat(e.right,t);break;case"LiteralInteger":this.castLiteralToFloat(e.right,t);break;default:this.astGeneric(e.right,t)}return this.popState("building-float"),t.push(")"),t}t.push("(");const n=this.getType(e.left)||"Number",r=this.getType(e.right)||"Number";if(!n||!r)throw this.astErrorOutput("Unhandled binary expression",e);const i=n+" & "+r;switch(i){case"Integer & Integer":this.pushState("building-integer"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.astGeneric(e.right,t),this.popState("building-integer");break;case"Number & Float":case"Float & Number":case"Float & Float":case"Number & Number":this.pushState("building-float"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.astGeneric(e.right,t),this.popState("building-float");break;case"LiteralInteger & LiteralInteger":this.isState("casting-to-integer")||this.isState("building-integer")?(this.pushState("building-integer"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.astGeneric(e.right,t),this.popState("building-integer")):(this.pushState("building-float"),this.castLiteralToFloat(e.left,t),t.push(a[e.operator]||e.operator),this.castLiteralToFloat(e.right,t),this.popState("building-float"));break;case"Integer & Float":case"Integer & Number":if((">"===e.operator||"<"===e.operator&&"Literal"===e.right.type)&&!Number.isInteger(e.right.value)){this.pushState("building-float"),this.castValueToFloat(e.left,t),t.push(a[e.operator]||e.operator),this.astGeneric(e.right,t),this.popState("building-float");break}if(this.pushState("building-integer"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.pushState("casting-to-integer"),"Literal"===e.right.type){const n=[];this.astGeneric(e.right,n);if("Integer"!==this.getType(e.right))throw this.astErrorOutput("Unhandled binary expression with literal",e);t.push(n.join(""))}else t.push("int("),this.astGeneric(e.right,t),t.push(")");this.popState("casting-to-integer"),this.popState("building-integer");break;case"Integer & LiteralInteger":this.pushState("building-integer"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.castLiteralToInteger(e.right,t),this.popState("building-integer");break;case"Number & Integer":case"Float & Integer":this.pushState("building-float"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.castValueToFloat(e.right,t),this.popState("building-float");break;case"Float & LiteralInteger":case"Number & LiteralInteger":this.pushState("building-float"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.castLiteralToFloat(e.right,t),this.popState("building-float");break;case"LiteralInteger & Float":case"LiteralInteger & Number":this.isState("casting-to-integer")?(this.pushState("building-integer"),this.castLiteralToInteger(e.left,t),t.push(a[e.operator]||e.operator),this.castValueToInteger(e.right,t),this.popState("building-integer")):(this.pushState("building-float"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.pushState("casting-to-float"),this.astGeneric(e.right,t),this.popState("casting-to-float"),this.popState("building-float"));break;case"LiteralInteger & Integer":this.pushState("building-integer"),this.castLiteralToInteger(e.left,t),t.push(a[e.operator]||e.operator),this.astGeneric(e.right,t),this.popState("building-integer");break;case"Boolean & Boolean":this.pushState("building-boolean"),this.astGeneric(e.left,t),t.push(a[e.operator]||e.operator),this.astGeneric(e.right,t),this.popState("building-boolean");break;default:throw this.astErrorOutput(`Unhandled binary expression between ${i}`,e)}return t.push(")"),t}checkAndUpconvertOperator(e,t){const n=this.checkAndUpconvertBitwiseOperators(e,t);if(n)return n;const r={"%":this.fixIntegerDivisionAccuracy?"integerCorrectionModulo":"modulo","**":"pow"}[e.operator];if(!r)return null;switch(t.push(r),t.push("("),this.getType(e.left)){case"Integer":this.castValueToFloat(e.left,t);break;case"LiteralInteger":this.castLiteralToFloat(e.left,t);break;default:this.astGeneric(e.left,t)}switch(t.push(","),this.getType(e.right)){case"Integer":this.castValueToFloat(e.right,t);break;case"LiteralInteger":this.castLiteralToFloat(e.right,t);break;default:this.astGeneric(e.right,t)}return t.push(")"),t}checkAndUpconvertBitwiseOperators(e,t){const n={"&":"bitwiseAnd","|":"bitwiseOr","^":"bitwiseXOR","<<":"bitwiseZeroFillLeftShift",">>":"bitwiseSignedRightShift",">>>":"bitwiseZeroFillRightShift"}[e.operator];if(!n)return null;t.push(n),t.push("(");switch(this.getType(e.left)){case"Number":case"Float":this.castValueToInteger(e.left,t);break;case"LiteralInteger":this.castLiteralToInteger(e.left,t);break;default:this.astGeneric(e.left,t)}t.push(",");switch(this.getType(e.right)){case"Number":case"Float":this.castValueToInteger(e.right,t);break;case"LiteralInteger":this.castLiteralToInteger(e.right,t);break;default:this.astGeneric(e.right,t)}return t.push(")"),t}checkAndUpconvertBitwiseUnary(e,t){const n={"~":"bitwiseNot"}[e.operator];if(!n)return null;switch(t.push(n),t.push("("),this.getType(e.argument)){case"Number":case"Float":this.castValueToInteger(e.argument,t);break;case"LiteralInteger":this.castLiteralToInteger(e.argument,t);break;default:this.astGeneric(e.argument,t)}return t.push(")"),t}castLiteralToInteger(e,t){return this.pushState("casting-to-integer"),this.astGeneric(e,t),this.popState("casting-to-integer"),t}castLiteralToFloat(e,t){return this.pushState("casting-to-float"),this.astGeneric(e,t),this.popState("casting-to-float"),t}castValueToInteger(e,t){return this.pushState("casting-to-integer"),t.push("int("),this.astGeneric(e,t),t.push(")"),this.popState("casting-to-integer"),t}castValueToFloat(e,t){return this.pushState("casting-to-float"),t.push("float("),this.astGeneric(e,t),t.push(")"),this.popState("casting-to-float"),t}astIdentifierExpression(e,t){if("Identifier"!==e.type)throw this.astErrorOutput("IdentifierExpression - not an Identifier",e);const n=this.getType(e),i=r.sanitizeName(e.name);return"Infinity"===e.name?t.push("3.402823466e+38"):"Boolean"===n&&this.argumentNames.indexOf(i)>-1?t.push(`bool(user_${i})`):t.push(`user_${i}`),t}astForStatement(e,t){if("ForStatement"!==e.type)throw this.astErrorOutput("Invalid for statement",e);const n=[],r=[],i=[],s=[];let a=null;if(e.init){const{declarations:t}=e.init;t.length>1&&(a=!1),this.astGeneric(e.init,n);for(let e=0;e<t.length;e++)t[e].init&&"Literal"!==t[e].init.type&&(a=!1)}else a=!1;if(e.test?this.astGeneric(e.test,r):a=!1,e.update?this.astGeneric(e.update,i):a=!1,e.body&&(this.pushState("loop-body"),this.astGeneric(e.body,s),this.popState("loop-body")),null===a&&(a=this.isSafe(e.init)&&this.isSafe(e.test)),a){const e=n.join(""),a=";"!==e[e.length-1];t.push(`for (${e}${a?";":""}${r.join("")};${i.join("")}){\n`),t.push(s.join("")),t.push("}\n")}else{const e=this.getInternalVariableName("safeI");n.length>0&&t.push(n.join(""),"\n"),t.push(`for (int ${e}=0;${e}<LOOP_MAX;${e}++){\n`),r.length>0&&t.push(`if (!${r.join("")}) break;\n`),t.push(s.join("")),t.push(`\n${i.join("")};`),t.push("}\n")}return t}astWhileStatement(e,t){if("WhileStatement"!==e.type)throw this.astErrorOutput("Invalid while statement",e);const n=this.getInternalVariableName("safeI");return t.push(`for (int ${n}=0;${n}<LOOP_MAX;${n}++){\n`),t.push("if (!"),this.astGeneric(e.test,t),t.push(") break;\n"),this.astGeneric(e.body,t),t.push("}\n"),t}astDoWhileStatement(e,t){if("DoWhileStatement"!==e.type)throw this.astErrorOutput("Invalid while statement",e);const n=this.getInternalVariableName("safeI");return t.push(`for (int ${n}=0;${n}<LOOP_MAX;${n}++){\n`),this.astGeneric(e.body,t),t.push("if (!"),this.astGeneric(e.test,t),t.push(") break;\n"),t.push("}\n"),t}astAssignmentExpression(e,t){if("%="===e.operator)this.astGeneric(e.left,t),t.push("="),t.push("mod("),this.astGeneric(e.left,t),t.push(","),this.astGeneric(e.right,t),t.push(")");else{if("**="!==e.operator){const n=this.getType(e.left),r=this.getType(e.right);return this.astGeneric(e.left,t),t.push(e.operator),"Integer"!==n&&"Integer"===r?(t.push("float("),this.astGeneric(e.right,t),t.push(")")):this.astGeneric(e.right,t),t}this.astGeneric(e.left,t),t.push("="),t.push("pow("),this.astGeneric(e.left,t),t.push(","),this.astGeneric(e.right,t),t.push(")")}}astBlockStatement(e,t){if(this.isState("loop-body")){this.pushState("block-body");for(let n=0;n<e.body.length;n++)this.astGeneric(e.body[n],t);this.popState("block-body")}else{t.push("{\n");for(let n=0;n<e.body.length;n++)this.astGeneric(e.body[n],t);t.push("}\n")}return t}astVariableDeclaration(e,t){const n=e.declarations;if(!n||!n[0]||!n[0].init)throw this.astErrorOutput("Unexpected expression",e);const i=[];let a=null;const o=[];let u=[];for(let t=0;t<n.length;t++){const i=n[t],l=i.init,h=this.getDeclaration(i.id),c=this.getType(i.init);let p=c;"LiteralInteger"===p&&(p="Integer"===h.suggestedType?"Integer":"Number");const d=s[p];if(!d)throw this.astErrorOutput(`Markup type ${p} not handled`,e);const m=[];if("Integer"===c&&"Integer"===p){if(h.valueType="Number",0===t||null===a)m.push("float ");else if(p!==a)throw new Error("Unhandled declaration");a=p,m.push(`user_${r.sanitizeName(i.id.name)}=`),m.push("float("),this.astGeneric(l,m),m.push(")")}else h.valueType=p,0===t||null===a?m.push(`${d} `):p!==a&&(o.push(u.join(",")),u=[],m.push(`${d} `)),a=p,m.push(`user_${r.sanitizeName(i.id.name)}=`),"Number"===c&&"Integer"===p?l.left&&"Literal"===l.left.type?this.astGeneric(l,m):(m.push("int("),this.astGeneric(l,m),m.push(")")):"LiteralInteger"===c&&"Integer"===p?this.castLiteralToInteger(l,m):this.astGeneric(l,m);u.push(m.join(""))}return u.length>0&&o.push(u.join(",")),i.push(o.join(";")),t.push(i.join("")),t.push(";"),t}astIfStatement(e,t){return t.push("if ("),this.astGeneric(e.test,t),t.push(")"),"BlockStatement"===e.consequent.type?this.astGeneric(e.consequent,t):(t.push(" {\n"),this.astGeneric(e.consequent,t),t.push("\n}\n")),e.alternate&&(t.push("else "),"BlockStatement"===e.alternate.type||"IfStatement"===e.alternate.type?this.astGeneric(e.alternate,t):(t.push(" {\n"),this.astGeneric(e.alternate,t),t.push("\n}\n"))),t}astSwitchStatement(e,t){if("SwitchStatement"!==e.type)throw this.astErrorOutput("Invalid switch statement",e);const{discriminant:n,cases:r}=e,i=this.getType(n),s=`switchDiscriminant${this.astKey(e,"_")}`;switch(i){case"Float":case"Number":t.push(`float ${s} = `),this.astGeneric(n,t),t.push(";\n");break;case"Integer":t.push(`int ${s} = `),this.astGeneric(n,t),t.push(";\n")}if(1===r.length&&!r[0].test)return this.astGeneric(r[0].consequent,t),t;let a=!1,o=[],u=!1,l=!1;for(let e=0;e<r.length;e++){if(r[e].test){if(0!==e&&l?a?(t.push(`${s} == `),a=!1):t.push(` else if (${s} == `):(l=!0,t.push(`if (${s} == `)),"Integer"===i){switch(this.getType(r[e].test)){case"Number":case"Float":this.castValueToInteger(r[e].test,t);break;case"LiteralInteger":this.castLiteralToInteger(r[e].test,t)}}else{if("Float"!==i)throw new Error("unhanlded");switch(this.getType(r[e].test)){case"LiteralInteger":this.castLiteralToFloat(r[e].test,t);break;case"Integer":this.castValueToFloat(r[e].test,t)}}if(!r[e].consequent||0===r[e].consequent.length){a=!0,t.push(" || ");continue}t.push(") {\n")}else{if(r.length>e+1){u=!0,this.astGeneric(r[e].consequent,o);continue}t.push(" else {\n")}this.astGeneric(r[e].consequent,t),t.push("\n}")}return u&&(t.push(" else {"),t.push(o.join("")),t.push("}")),t}astThisExpression(e,t){return t.push("this"),t}astMemberExpression(e,t){const{property:n,name:i,signature:s,origin:a,type:o,xProperty:u,yProperty:l,zProperty:h}=this.getMemberExpressionDetails(e);switch(s){case"value.thread.value":case"this.thread.value":if("x"!==i&&"y"!==i&&"z"!==i)throw this.astErrorOutput("Unexpected expression, expected `this.thread.x`, `this.thread.y`, or `this.thread.z`",e);return t.push(`threadId.${i}`),t;case"this.output.value":if(this.dynamicOutput)switch(i){case"x":this.isState("casting-to-float")?t.push("float(uOutputDim.x)"):t.push("uOutputDim.x");break;case"y":this.isState("casting-to-float")?t.push("float(uOutputDim.y)"):t.push("uOutputDim.y");break;case"z":this.isState("casting-to-float")?t.push("float(uOutputDim.z)"):t.push("uOutputDim.z");break;default:throw this.astErrorOutput("Unexpected expression",e)}else switch(i){case"x":this.isState("casting-to-integer")?t.push(this.output[0]):t.push(this.output[0],".0");break;case"y":this.isState("casting-to-integer")?t.push(this.output[1]):t.push(this.output[1],".0");break;case"z":this.isState("casting-to-integer")?t.push(this.output[2]):t.push(this.output[2],".0");break;default:throw this.astErrorOutput("Unexpected expression",e)}return t;case"value":throw this.astErrorOutput("Unexpected expression",e);case"value[]":case"value[][]":case"value[][][]":case"value[][][][]":case"value.value":if("Math"===a)return t.push(Math[i]),t;const s=r.sanitizeName(i);switch(n){case"r":return t.push(`user_${s}.r`),t;case"g":return t.push(`user_${s}.g`),t;case"b":return t.push(`user_${s}.b`),t;case"a":return t.push(`user_${s}.a`),t}break;case"this.constants.value":if(void 0===u)switch(o){case"Array(2)":case"Array(3)":case"Array(4)":return t.push(`constants_${r.sanitizeName(i)}`),t}case"this.constants.value[]":case"this.constants.value[][]":case"this.constants.value[][][]":case"this.constants.value[][][][]":break;case"fn()[]":return this.astCallExpression(e.object,t),t.push("["),t.push(this.memberExpressionPropertyMarkup(n)),t.push("]"),t;case"fn()[][]":return this.astCallExpression(e.object.object,t),t.push("["),t.push(this.memberExpressionPropertyMarkup(e.object.property)),t.push("]"),t.push("["),t.push(this.memberExpressionPropertyMarkup(e.property)),t.push("]"),t;case"[][]":return this.astArrayExpression(e.object,t),t.push("["),t.push(this.memberExpressionPropertyMarkup(n)),t.push("]"),t;default:throw this.astErrorOutput("Unexpected expression",e)}if(!1===e.computed)switch(o){case"Number":case"Integer":case"Float":case"Boolean":return t.push(`${a}_${r.sanitizeName(i)}`),t}const c=`${a}_${r.sanitizeName(i)}`;switch(o){case"Array(2)":case"Array(3)":case"Array(4)":this.astGeneric(e.object,t),t.push("["),t.push(this.memberExpressionPropertyMarkup(u)),t.push("]");break;case"HTMLImageArray":t.push(`getImage3D(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"ArrayTexture(1)":t.push(`getFloatFromSampler2D(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"Array1D(2)":case"Array2D(2)":case"Array3D(2)":t.push(`getMemoryOptimizedVec2(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"ArrayTexture(2)":t.push(`getVec2FromSampler2D(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"Array1D(3)":case"Array2D(3)":case"Array3D(3)":t.push(`getMemoryOptimizedVec3(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"ArrayTexture(3)":t.push(`getVec3FromSampler2D(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"Array1D(4)":case"Array2D(4)":case"Array3D(4)":t.push(`getMemoryOptimizedVec4(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"ArrayTexture(4)":case"HTMLCanvas":case"OffscreenCanvas":case"HTMLImage":case"ImageBitmap":case"ImageData":case"HTMLVideo":t.push(`getVec4FromSampler2D(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"NumberTexture":case"Array":case"Array2D":case"Array3D":case"Array4D":case"Input":case"Number":case"Float":case"Integer":if("single"===this.precision)t.push(`getMemoryOptimized32(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");else{const e="user"===a?this.lookupFunctionArgumentBitRatio(this.name,i):this.constantBitRatios[i];switch(e){case 1:t.push(`get8(${c}, ${c}Size, ${c}Dim, `);break;case 2:t.push(`get16(${c}, ${c}Size, ${c}Dim, `);break;case 4:case 0:t.push(`get32(${c}, ${c}Size, ${c}Dim, `);break;default:throw new Error(`unhandled bit ratio of ${e}`)}this.memberExpressionXYZ(u,l,h,t),t.push(")")}break;case"MemoryOptimizedNumberTexture":t.push(`getMemoryOptimized32(${c}, ${c}Size, ${c}Dim, `),this.memberExpressionXYZ(u,l,h,t),t.push(")");break;case"Matrix(2)":case"Matrix(3)":case"Matrix(4)":t.push(`${c}[${this.memberExpressionPropertyMarkup(l)}]`),l&&t.push(`[${this.memberExpressionPropertyMarkup(u)}]`);break;default:throw new Error(`unhandled member expression "${o}"`)}return t}astCallExpression(e,t){if(!e.callee)throw this.astErrorOutput("Unknown CallExpression",e);let n=null;const i=this.isAstMathFunction(e);if(n=i||e.callee.object&&"ThisExpression"===e.callee.object.type?e.callee.property.name:"SequenceExpression"!==e.callee.type||"Literal"!==e.callee.expressions[0].type||isNaN(e.callee.expressions[0].raw)?e.callee.name:e.callee.expressions[1].property.name,!n)throw this.astErrorOutput("Unhandled function, couldn't find name",e);switch(n){case"pow":n="_pow";break;case"round":n="_round"}if(this.calledFunctions.indexOf(n)<0&&this.calledFunctions.push(n),"random"===n&&this.plugins&&this.plugins.length>0)for(let e=0;e<this.plugins.length;e++){const n=this.plugins[e];if("Math.random()"===n.functionMatch&&n.functionReplace)return t.push(n.functionReplace),t}if(this.onFunctionCall&&this.onFunctionCall(this.name,n,e.arguments),t.push(n),t.push("("),i)for(let n=0;n<e.arguments.length;++n){const r=e.arguments[n],i=this.getType(r);if(n>0&&t.push(", "),"Integer"===i)this.castValueToFloat(r,t);else this.astGeneric(r,t)}else{const i=this.lookupFunctionArgumentTypes(n)||[];for(let s=0;s<e.arguments.length;++s){const a=e.arguments[s];let o=i[s];s>0&&t.push(", ");const u=this.getType(a);switch(o||(this.triggerImplyArgumentType(n,s,u,this),o=u),u){case"Boolean":this.astGeneric(a,t);continue;case"Number":case"Float":if("Integer"===o){t.push("int("),this.astGeneric(a,t),t.push(")");continue}if("Number"===o||"Float"===o){this.astGeneric(a,t);continue}if("LiteralInteger"===o){this.castLiteralToFloat(a,t);continue}break;case"Integer":if("Number"===o||"Float"===o){t.push("float("),this.astGeneric(a,t),t.push(")");continue}if("Integer"===o){this.astGeneric(a,t);continue}break;case"LiteralInteger":if("Integer"===o){this.castLiteralToInteger(a,t);continue}if("Number"===o||"Float"===o){this.castLiteralToFloat(a,t);continue}if("LiteralInteger"===o){this.astGeneric(a,t);continue}break;case"Array(2)":case"Array(3)":case"Array(4)":if(o===u){if("Identifier"===a.type)t.push(`user_${r.sanitizeName(a.name)}`);else{if("ArrayExpression"!==a.type&&"MemberExpression"!==a.type&&"CallExpression"!==a.type)throw this.astErrorOutput(`Unhandled argument type ${a.type}`,e);this.astGeneric(a,t)}continue}break;case"HTMLCanvas":case"OffscreenCanvas":case"HTMLImage":case"ImageBitmap":case"ImageData":case"HTMLImageArray":case"HTMLVideo":case"ArrayTexture(1)":case"ArrayTexture(2)":case"ArrayTexture(3)":case"ArrayTexture(4)":case"Array":case"Input":if(o===u){if("Identifier"!==a.type)throw this.astErrorOutput(`Unhandled argument type ${a.type}`,e);this.triggerImplyArgumentBitRatio(this.name,a.name,n,s);const i=r.sanitizeName(a.name);t.push(`user_${i},user_${i}Size,user_${i}Dim`);continue}}throw this.astErrorOutput(`Unhandled argument combination of ${u} and ${o} for argument named "${a.name}"`,e)}}return t.push(")"),t}astArrayExpression(e,t){const n=this.getType(e),r=e.elements.length;switch(n){case"Matrix(2)":case"Matrix(3)":case"Matrix(4)":t.push(`mat${r}(`);break;default:t.push(`vec${r}(`)}for(let n=0;n<r;++n){n>0&&t.push(", ");const r=e.elements[n];this.astGeneric(r,t)}return t.push(")"),t}memberExpressionXYZ(e,t,n,r){return n?r.push(this.memberExpressionPropertyMarkup(n),", "):r.push("0, "),t?r.push(this.memberExpressionPropertyMarkup(t),", "):r.push("0, "),r.push(this.memberExpressionPropertyMarkup(e)),r}memberExpressionPropertyMarkup(e){if(!e)throw new Error("Property not set");const t=[];switch(this.getType(e)){case"Number":case"Float":this.castValueToInteger(e,t);break;case"LiteralInteger":this.castLiteralToInteger(e,t);break;default:this.astGeneric(e,t)}return t.join("")}}}},{"../../utils":114,"../function-node":10}],39:[function(e,t,n){const{WebGLKernelValueBoolean:r}=e("./kernel-value/boolean"),{WebGLKernelValueFloat:i}=e("./kernel-value/float"),{WebGLKernelValueInteger:s}=e("./kernel-value/integer"),{WebGLKernelValueHTMLImage:a}=e("./kernel-value/html-image"),{WebGLKernelValueDynamicHTMLImage:o}=e("./kernel-value/dynamic-html-image"),{WebGLKernelValueHTMLVideo:u}=e("./kernel-value/html-video"),{WebGLKernelValueDynamicHTMLVideo:l}=e("./kernel-value/dynamic-html-video"),{WebGLKernelValueSingleInput:h}=e("./kernel-value/single-input"),{WebGLKernelValueDynamicSingleInput:c}=e("./kernel-value/dynamic-single-input"),{WebGLKernelValueUnsignedInput:p}=e("./kernel-value/unsigned-input"),{WebGLKernelValueDynamicUnsignedInput:d}=e("./kernel-value/dynamic-unsigned-input"),{WebGLKernelValueMemoryOptimizedNumberTexture:m}=e("./kernel-value/memory-optimized-number-texture"),{WebGLKernelValueDynamicMemoryOptimizedNumberTexture:f}=e("./kernel-value/dynamic-memory-optimized-number-texture"),{WebGLKernelValueNumberTexture:g}=e("./kernel-value/number-texture"),{WebGLKernelValueDynamicNumberTexture:x}=e("./kernel-value/dynamic-number-texture"),{WebGLKernelValueSingleArray:y}=e("./kernel-value/single-array"),{WebGLKernelValueDynamicSingleArray:b}=e("./kernel-value/dynamic-single-array"),{WebGLKernelValueSingleArray1DI:T}=e("./kernel-value/single-array1d-i"),{WebGLKernelValueDynamicSingleArray1DI:v}=e("./kernel-value/dynamic-single-array1d-i"),{WebGLKernelValueSingleArray2DI:S}=e("./kernel-value/single-array2d-i"),{WebGLKernelValueDynamicSingleArray2DI:A}=e("./kernel-value/dynamic-single-array2d-i"),{WebGLKernelValueSingleArray3DI:_}=e("./kernel-value/single-array3d-i"),{WebGLKernelValueDynamicSingleArray3DI:E}=e("./kernel-value/dynamic-single-array3d-i"),{WebGLKernelValueArray2:w}=e("./kernel-value/array2"),{WebGLKernelValueArray3:k}=e("./kernel-value/array3"),{WebGLKernelValueArray4:I}=e("./kernel-value/array4"),{WebGLKernelValueUnsignedArray:D}=e("./kernel-value/unsigned-array"),{WebGLKernelValueDynamicUnsignedArray:C}=e("./kernel-value/dynamic-unsigned-array"),$={unsigned:{dynamic:{Boolean:r,Integer:s,Float:i,Array:C,"Array(2)":w,"Array(3)":k,"Array(4)":I,"Array1D(2)":!1,"Array1D(3)":!1,"Array1D(4)":!1,"Array2D(2)":!1,"Array2D(3)":!1,"Array2D(4)":!1,"Array3D(2)":!1,"Array3D(3)":!1,"Array3D(4)":!1,Input:d,NumberTexture:x,"ArrayTexture(1)":x,"ArrayTexture(2)":x,"ArrayTexture(3)":x,"ArrayTexture(4)":x,MemoryOptimizedNumberTexture:f,HTMLCanvas:o,OffscreenCanvas:o,HTMLImage:o,ImageBitmap:o,ImageData:o,HTMLImageArray:!1,HTMLVideo:l},static:{Boolean:r,Float:i,Integer:s,Array:D,"Array(2)":w,"Array(3)":k,"Array(4)":I,"Array1D(2)":!1,"Array1D(3)":!1,"Array1D(4)":!1,"Array2D(2)":!1,"Array2D(3)":!1,"Array2D(4)":!1,"Array3D(2)":!1,"Array3D(3)":!1,"Array3D(4)":!1,Input:p,NumberTexture:g,"ArrayTexture(1)":g,"ArrayTexture(2)":g,"ArrayTexture(3)":g,"ArrayTexture(4)":g,MemoryOptimizedNumberTexture:m,HTMLCanvas:a,OffscreenCanvas:a,HTMLImage:a,ImageBitmap:a,ImageData:a,HTMLImageArray:!1,HTMLVideo:u}},single:{dynamic:{Boolean:r,Integer:s,Float:i,Array:b,"Array(2)":w,"Array(3)":k,"Array(4)":I,"Array1D(2)":v,"Array1D(3)":v,"Array1D(4)":v,"Array2D(2)":A,"Array2D(3)":A,"Array2D(4)":A,"Array3D(2)":E,"Array3D(3)":E,"Array3D(4)":E,Input:c,NumberTexture:x,"ArrayTexture(1)":x,"ArrayTexture(2)":x,"ArrayTexture(3)":x,"ArrayTexture(4)":x,MemoryOptimizedNumberTexture:f,HTMLCanvas:o,OffscreenCanvas:o,HTMLImage:o,ImageBitmap:o,ImageData:o,HTMLImageArray:!1,HTMLVideo:l},static:{Boolean:r,Float:i,Integer:s,Array:y,"Array(2)":w,"Array(3)":k,"Array(4)":I,"Array1D(2)":T,"Array1D(3)":T,"Array1D(4)":T,"Array2D(2)":S,"Array2D(3)":S,"Array2D(4)":S,"Array3D(2)":_,"Array3D(3)":_,"Array3D(4)":_,Input:h,NumberTexture:g,"ArrayTexture(1)":g,"ArrayTexture(2)":g,"ArrayTexture(3)":g,"ArrayTexture(4)":g,MemoryOptimizedNumberTexture:m,HTMLCanvas:a,OffscreenCanvas:a,HTMLImage:a,ImageBitmap:a,ImageData:a,HTMLImageArray:!1,HTMLVideo:u}}};t.exports={lookupKernelValueType:function(e,t,n,r){if(!e)throw new Error("type missing");if(!t)throw new Error("dynamic missing");if(!n)throw new Error("precision missing");r.type&&(e=r.type);const i=$[n][t];if(!1===i[e])return null;if(void 0===i[e])throw new Error(`Could not find a KernelValue for ${e}`);return i[e]},kernelValueMaps:$}},{"./kernel-value/array2":41,"./kernel-value/array3":42,"./kernel-value/array4":43,"./kernel-value/boolean":44,"./kernel-value/dynamic-html-image":45,"./kernel-value/dynamic-html-video":46,"./kernel-value/dynamic-memory-optimized-number-texture":47,"./kernel-value/dynamic-number-texture":48,"./kernel-value/dynamic-single-array":49,"./kernel-value/dynamic-single-array1d-i":50,"./kernel-value/dynamic-single-array2d-i":51,"./kernel-value/dynamic-single-array3d-i":52,"./kernel-value/dynamic-single-input":53,"./kernel-value/dynamic-unsigned-array":54,"./kernel-value/dynamic-unsigned-input":55,"./kernel-value/float":56,"./kernel-value/html-image":57,"./kernel-value/html-video":58,"./kernel-value/integer":60,"./kernel-value/memory-optimized-number-texture":61,"./kernel-value/number-texture":62,"./kernel-value/single-array":63,"./kernel-value/single-array1d-i":64,"./kernel-value/single-array2d-i":65,"./kernel-value/single-array3d-i":66,"./kernel-value/single-input":67,"./kernel-value/unsigned-array":68,"./kernel-value/unsigned-input":69}],40:[function(e,t,n){const{WebGLKernelValue:r}=e("./index"),{Input:i}=e("../../../input");t.exports={WebGLKernelArray:class extends r{checkSize(e,t){if(!this.kernel.validate)return;const{maxTextureSize:n}=this.kernel.constructor.features;if(e>n||t>n)throw e>t?new Error(`Argument texture width of ${e} larger than maximum size of ${n} for your GPU`):e<t?new Error(`Argument texture height of ${t} larger than maximum size of ${n} for your GPU`):new Error(`Argument texture height and width of ${t} larger than maximum size of ${n} for your GPU`)}setup(){this.requestTexture(),this.setupTexture(),this.defineTexture()}requestTexture(){this.texture=this.onRequestTexture()}defineTexture(){const{context:e}=this;e.activeTexture(this.contextHandle),e.bindTexture(e.TEXTURE_2D,this.texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)}setupTexture(){this.contextHandle=this.onRequestContextHandle(),this.index=this.onRequestIndex(),this.dimensionsId=this.id+"Dim",this.sizeId=this.id+"Size"}getBitRatio(e){if(Array.isArray(e[0]))return this.getBitRatio(e[0]);if(e.constructor===i)return this.getBitRatio(e.value);switch(e.constructor){case Uint8ClampedArray:case Uint8Array:case Int8Array:return 1;case Uint16Array:case Int16Array:return 2;case Float32Array:case Int32Array:default:return 4}}destroy(){this.prevArg&&this.prevArg.delete(),this.context.deleteTexture(this.texture)}}}},{"../../../input":110,"./index":59}],41:[function(e,t,n){const{WebGLKernelValue:r}=e("./index");t.exports={WebGLKernelValueArray2:class extends r{constructor(e,t){super(e,t),this.uploadValue=e}getSource(e){return"constants"===this.origin?`const vec2 ${this.id} = vec2(${e[0]},${e[1]});\n`:`uniform vec2 ${this.id};\n`}getStringValueHandler(){return"constants"===this.origin?"":`const uploadValue_${this.name} = ${this.varName};\n`}updateValue(e){"constants"!==this.origin&&this.kernel.setUniform2fv(this.id,this.uploadValue=e)}}}},{"./index":59}],42:[function(e,t,n){const{WebGLKernelValue:r}=e("./index");t.exports={WebGLKernelValueArray3:class extends r{constructor(e,t){super(e,t),this.uploadValue=e}getSource(e){return"constants"===this.origin?`const vec3 ${this.id} = vec3(${e[0]},${e[1]},${e[2]});\n`:`uniform vec3 ${this.id};\n`}getStringValueHandler(){return"constants"===this.origin?"":`const uploadValue_${this.name} = ${this.varName};\n`}updateValue(e){"constants"!==this.origin&&this.kernel.setUniform3fv(this.id,this.uploadValue=e)}}}},{"./index":59}],43:[function(e,t,n){const{WebGLKernelValue:r}=e("./index");t.exports={WebGLKernelValueArray4:class extends r{constructor(e,t){super(e,t),this.uploadValue=e}getSource(e){return"constants"===this.origin?`const vec4 ${this.id} = vec4(${e[0]},${e[1]},${e[2]},${e[3]});\n`:`uniform vec4 ${this.id};\n`}getStringValueHandler(){return"constants"===this.origin?"":`const uploadValue_${this.name} = ${this.varName};\n`}updateValue(e){"constants"!==this.origin&&this.kernel.setUniform4fv(this.id,this.uploadValue=e)}}}},{"./index":59}],44:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValue:i}=e("./index");t.exports={WebGLKernelValueBoolean:class extends i{constructor(e,t){super(e,t),this.uploadValue=e}getSource(e){return"constants"===this.origin?`const bool ${this.id} = ${e};\n`:`uniform bool ${this.id};\n`}getStringValueHandler(){return`const uploadValue_${this.name} = ${this.varName};\n`}updateValue(e){"constants"!==this.origin&&this.kernel.setUniform1i(this.id,this.uploadValue=e)}}}},{"../../../utils":114,"./index":59}],45:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueHTMLImage:i}=e("./html-image");t.exports={WebGLKernelValueDynamicHTMLImage:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){const{width:t,height:n}=e;this.checkSize(t,n),this.dimensions=[t,n,1],this.textureSize=[t,n],this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./html-image":57}],46:[function(e,t,n){const{WebGLKernelValueDynamicHTMLImage:r}=e("./dynamic-html-image");t.exports={WebGLKernelValueDynamicHTMLVideo:class extends r{}}},{"./dynamic-html-image":45}],47:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueMemoryOptimizedNumberTexture:i}=e("./memory-optimized-number-texture");t.exports={WebGLKernelValueDynamicMemoryOptimizedNumberTexture:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){this.dimensions=e.dimensions,this.checkSize(e.size[0],e.size[1]),this.textureSize=e.size,this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./memory-optimized-number-texture":61}],48:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueNumberTexture:i}=e("./number-texture");t.exports={WebGLKernelValueDynamicNumberTexture:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){this.dimensions=e.dimensions,this.checkSize(e.size[0],e.size[1]),this.textureSize=e.size,this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./number-texture":62}],49:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray:i}=e("./single-array");t.exports={WebGLKernelValueDynamicSingleArray:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){this.dimensions=r.getDimensions(e,!0),this.textureSize=r.getMemoryOptimizedFloatTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./single-array":63}],50:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray1DI:i}=e("./single-array1d-i");t.exports={WebGLKernelValueDynamicSingleArray1DI:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){this.setShape(e),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./single-array1d-i":64}],51:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray2DI:i}=e("./single-array2d-i");t.exports={WebGLKernelValueDynamicSingleArray2DI:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){this.setShape(e),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./single-array2d-i":65}],52:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray3DI:i}=e("./single-array3d-i");t.exports={WebGLKernelValueDynamicSingleArray3DI:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){this.setShape(e),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./single-array3d-i":66}],53:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleInput:i}=e("./single-input");t.exports={WebGLKernelValueDynamicSingleInput:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){let[t,n,i]=e.size;this.dimensions=new Int32Array([t||1,n||1,i||1]),this.textureSize=r.getMemoryOptimizedFloatTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./single-input":67}],54:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueUnsignedArray:i}=e("./unsigned-array");t.exports={WebGLKernelValueDynamicUnsignedArray:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){this.dimensions=r.getDimensions(e,!0),this.textureSize=r.getMemoryOptimizedPackedTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*(4/this.bitRatio),this.checkSize(this.textureSize[0],this.textureSize[1]);const t=this.getTransferArrayType(e);this.preUploadValue=new t(this.uploadArrayLength),this.uploadValue=new Uint8Array(this.preUploadValue.buffer),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./unsigned-array":68}],55:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueUnsignedInput:i}=e("./unsigned-input");t.exports={WebGLKernelValueDynamicUnsignedInput:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}updateValue(e){let[t,n,i]=e.size;this.dimensions=new Int32Array([t||1,n||1,i||1]),this.textureSize=r.getMemoryOptimizedPackedTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*(4/this.bitRatio),this.checkSize(this.textureSize[0],this.textureSize[1]);const s=this.getTransferArrayType(e.value);this.preUploadValue=new s(this.uploadArrayLength),this.uploadValue=new Uint8Array(this.preUploadValue.buffer),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./unsigned-input":69}],56:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValue:i}=e("./index");t.exports={WebGLKernelValueFloat:class extends i{constructor(e,t){super(e,t),this.uploadValue=e}getStringValueHandler(){return`const uploadValue_${this.name} = ${this.varName};\n`}getSource(e){return"constants"===this.origin?Number.isInteger(e)?`const float ${this.id} = ${e}.0;\n`:`const float ${this.id} = ${e};\n`:`uniform float ${this.id};\n`}updateValue(e){"constants"!==this.origin&&this.kernel.setUniform1f(this.id,this.uploadValue=e)}}}},{"../../../utils":114,"./index":59}],57:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueHTMLImage:class extends i{constructor(e,t){super(e,t);const{width:n,height:r}=e;this.checkSize(n,r),this.dimensions=[n,r,1],this.textureSize=[n,r],this.uploadValue=e}getStringValueHandler(){return`const uploadValue_${this.name} = ${this.varName};\n`}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,this.uploadValue=e),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],58:[function(e,t,n){const{WebGLKernelValueHTMLImage:r}=e("./html-image");t.exports={WebGLKernelValueHTMLVideo:class extends r{}}},{"./html-image":57}],59:[function(e,t,n){const{utils:r}=e("../../../utils"),{KernelValue:i}=e("../../kernel-value");t.exports={WebGLKernelValue:class extends i{constructor(e,t){super(e,t),this.dimensionsId=null,this.sizeId=null,this.initialValueConstructor=e.constructor,this.onRequestTexture=t.onRequestTexture,this.onRequestIndex=t.onRequestIndex,this.uploadValue=null,this.textureSize=null,this.bitRatio=null,this.prevArg=null}get id(){return`${this.origin}_${r.sanitizeName(this.name)}`}setup(){}getTransferArrayType(e){if(Array.isArray(e[0]))return this.getTransferArrayType(e[0]);switch(e.constructor){case Array:case Int32Array:case Int16Array:case Int8Array:return Float32Array;case Uint8ClampedArray:case Uint8Array:case Uint16Array:case Uint32Array:case Float32Array:case Float64Array:return e.constructor}return console.warn("Unfamiliar constructor type.  Will go ahead and use, but likley this may result in a transfer of zeros"),e.constructor}getStringValueHandler(){throw new Error(`"getStringValueHandler" not implemented on ${this.constructor.name}`)}getVariablePrecisionString(){return this.kernel.getVariablePrecisionString(this.textureSize||void 0,this.tactic||void 0)}destroy(){}}}},{"../../../utils":114,"../../kernel-value":35}],60:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValue:i}=e("./index");t.exports={WebGLKernelValueInteger:class extends i{constructor(e,t){super(e,t),this.uploadValue=e}getStringValueHandler(){return`const uploadValue_${this.name} = ${this.varName};\n`}getSource(e){return"constants"===this.origin?`const int ${this.id} = ${parseInt(e)};\n`:`uniform int ${this.id};\n`}updateValue(e){"constants"!==this.origin&&this.kernel.setUniform1i(this.id,this.uploadValue=e)}}}},{"../../../utils":114,"./index":59}],61:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array"),s="Source and destination textures are the same.  Use immutable = true and manually cleanup kernel output texture memory with texture.delete()";t.exports={WebGLKernelValueMemoryOptimizedNumberTexture:class extends i{constructor(e,t){super(e,t);const[n,r]=e.size;this.checkSize(n,r),this.dimensions=e.dimensions,this.textureSize=e.size,this.uploadValue=e.texture,this.forceUploadEachRun=!0}setup(){this.setupTexture()}getStringValueHandler(){return`const uploadValue_${this.name} = ${this.varName}.texture;\n`}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);if(this.checkContext&&e.context!==this.context)throw new Error(`Value ${this.name} (${this.type}) must be from same context`);const{kernel:t,context:n}=this;if(t.pipeline)if(t.immutable)t.updateTextureArgumentRefs(this,e);else{if(t.texture&&t.texture.texture===e.texture)throw new Error(s);if(t.mappedTextures){const{mappedTextures:n}=t;for(let t=0;t<n.length;t++)if(n[t].texture===e.texture)throw new Error(s)}}n.activeTexture(this.contextHandle),n.bindTexture(n.TEXTURE_2D,this.uploadValue=e.texture),this.kernel.setUniform1i(this.id,this.index)}},sameError:s}},{"../../../utils":114,"./array":40}],62:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array"),{sameError:s}=e("./memory-optimized-number-texture");t.exports={WebGLKernelValueNumberTexture:class extends i{constructor(e,t){super(e,t);const[n,r]=e.size;this.checkSize(n,r);const{size:i,dimensions:s}=e;this.bitRatio=this.getBitRatio(e),this.dimensions=s,this.textureSize=i,this.uploadValue=e.texture,this.forceUploadEachRun=!0}setup(){this.setupTexture()}getStringValueHandler(){return`const uploadValue_${this.name} = ${this.varName}.texture;\n`}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);if(this.checkContext&&e.context!==this.context)throw new Error(`Value ${this.name} (${this.type}) must be from same context`);const{kernel:t,context:n}=this;if(t.pipeline)if(t.immutable)t.updateTextureArgumentRefs(this,e);else{if(t.texture&&t.texture.texture===e.texture)throw new Error(s);if(t.mappedTextures){const{mappedTextures:n}=t;for(let t=0;t<n.length;t++)if(n[t].texture===e.texture)throw new Error(s)}}n.activeTexture(this.contextHandle),n.bindTexture(n.TEXTURE_2D,this.uploadValue=e.texture),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40,"./memory-optimized-number-texture":61}],63:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueSingleArray:class extends i{constructor(e,t){super(e,t),this.bitRatio=4,this.dimensions=r.getDimensions(e,!0),this.textureSize=r.getMemoryOptimizedFloatTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength)}getStringValueHandler(){return r.linesToString([`const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,`flattenTo(${this.varName}, uploadValue_${this.name})`])}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flattenTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],64:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueSingleArray1DI:class extends i{constructor(e,t){super(e,t),this.bitRatio=4,this.setShape(e)}setShape(e){const t=r.getDimensions(e,!0);this.textureSize=r.getMemoryOptimizedFloatTextureSize(t,this.bitRatio),this.dimensions=new Int32Array([t[1],1,1]),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength)}getStringValueHandler(){return r.linesToString([`const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,`flattenTo(${this.varName}, uploadValue_${this.name})`])}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flatten2dArrayTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],65:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueSingleArray2DI:class extends i{constructor(e,t){super(e,t),this.bitRatio=4,this.setShape(e)}setShape(e){const t=r.getDimensions(e,!0);this.textureSize=r.getMemoryOptimizedFloatTextureSize(t,this.bitRatio),this.dimensions=new Int32Array([t[1],t[2],1]),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength)}getStringValueHandler(){return r.linesToString([`const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,`flattenTo(${this.varName}, uploadValue_${this.name})`])}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flatten3dArrayTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],66:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueSingleArray3DI:class extends i{constructor(e,t){super(e,t),this.bitRatio=4,this.setShape(e)}setShape(e){const t=r.getDimensions(e,!0);this.textureSize=r.getMemoryOptimizedFloatTextureSize(t,this.bitRatio),this.dimensions=new Int32Array([t[1],t[2],t[3]]),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength)}getStringValueHandler(){return r.linesToString([`const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,`flattenTo(${this.varName}, uploadValue_${this.name})`])}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flatten4dArrayTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],67:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueSingleInput:class extends i{constructor(e,t){super(e,t),this.bitRatio=4;let[n,i,s]=e.size;this.dimensions=new Int32Array([n||1,i||1,s||1]),this.textureSize=r.getMemoryOptimizedFloatTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength)}getStringValueHandler(){return r.linesToString([`const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,`flattenTo(${this.varName}.value, uploadValue_${this.name})`])}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flattenTo(e.value,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],68:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueUnsignedArray:class extends i{constructor(e,t){super(e,t),this.bitRatio=this.getBitRatio(e),this.dimensions=r.getDimensions(e,!0),this.textureSize=r.getMemoryOptimizedPackedTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*(4/this.bitRatio),this.checkSize(this.textureSize[0],this.textureSize[1]),this.TranserArrayType=this.getTransferArrayType(e),this.preUploadValue=new this.TranserArrayType(this.uploadArrayLength),this.uploadValue=new Uint8Array(this.preUploadValue.buffer)}getStringValueHandler(){return r.linesToString([`const preUploadValue_${this.name} = new ${this.TranserArrayType.name}(${this.uploadArrayLength})`,`const uploadValue_${this.name} = new Uint8Array(preUploadValue_${this.name}.buffer)`,`flattenTo(${this.varName}, preUploadValue_${this.name})`])}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flattenTo(e,this.preUploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.UNSIGNED_BYTE,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],69:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("./array");t.exports={WebGLKernelValueUnsignedInput:class extends i{constructor(e,t){super(e,t),this.bitRatio=this.getBitRatio(e);const[n,i,s]=e.size;this.dimensions=new Int32Array([n||1,i||1,s||1]),this.textureSize=r.getMemoryOptimizedPackedTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*(4/this.bitRatio),this.checkSize(this.textureSize[0],this.textureSize[1]),this.TranserArrayType=this.getTransferArrayType(e.value),this.preUploadValue=new this.TranserArrayType(this.uploadArrayLength),this.uploadValue=new Uint8Array(this.preUploadValue.buffer)}getStringValueHandler(){return r.linesToString([`const preUploadValue_${this.name} = new ${this.TranserArrayType.name}(${this.uploadArrayLength})`,`const uploadValue_${this.name} = new Uint8Array(preUploadValue_${this.name}.buffer)`,`flattenTo(${this.varName}.value, preUploadValue_${this.name})`])}getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(value.constructor);const{context:t}=this;r.flattenTo(e.value,this.preUploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.UNSIGNED_BYTE,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"./array":40}],70:[function(e,t,n){const{GLKernel:r}=e("../gl/kernel"),{FunctionBuilder:i}=e("../function-builder"),{WebGLFunctionNode:s}=e("./function-node"),{utils:a}=e("../../utils"),o=e("../../plugins/math-random-uniformly-distributed"),{fragmentShader:u}=e("./fragment-shader"),{vertexShader:l}=e("./vertex-shader"),{glKernelString:h}=e("../gl/kernel-string"),{lookupKernelValueType:c}=e("./kernel-value-maps");let p=null,d=null,m=null,f=null,g=null;const x=[o],y=[],b={};t.exports={WebGLKernel:class extends r{static get isSupported(){return null!==p||(this.setupFeatureChecks(),p=this.isContextMatch(m)),p}static setupFeatureChecks(){"undefined"!=typeof document?d=document.createElement("canvas"):"undefined"!=typeof OffscreenCanvas&&(d=new OffscreenCanvas(0,0)),d&&(m=d.getContext("webgl")||d.getContext("experimental-webgl"),m&&m.getExtension&&(f={OES_texture_float:m.getExtension("OES_texture_float"),OES_texture_float_linear:m.getExtension("OES_texture_float_linear"),OES_element_index_uint:m.getExtension("OES_element_index_uint"),WEBGL_draw_buffers:m.getExtension("WEBGL_draw_buffers")},g=this.getFeatures()))}static isContextMatch(e){return"undefined"!=typeof WebGLRenderingContext&&e instanceof WebGLRenderingContext}static getIsTextureFloat(){return Boolean(f.OES_texture_float)}static getIsDrawBuffers(){return Boolean(f.WEBGL_draw_buffers)}static getChannelCount(){return f.WEBGL_draw_buffers?m.getParameter(f.WEBGL_draw_buffers.MAX_DRAW_BUFFERS_WEBGL):1}static getMaxTextureSize(){return m.getParameter(m.MAX_TEXTURE_SIZE)}static lookupKernelValueType(e,t,n,r){return c(e,t,n,r)}static get testCanvas(){return d}static get testContext(){return m}static get features(){return g}static get fragmentShader(){return u}static get vertexShader(){return l}constructor(e,t){super(e,t),this.program=null,this.pipeline=t.pipeline,this.endianness=a.systemEndianness(),this.extensions={},this.argumentTextureCount=0,this.constantTextureCount=0,this.fragShader=null,this.vertShader=null,this.drawBuffersMap=null,this.maxTexSize=null,this.onRequestSwitchKernel=null,this.texture=null,this.mappedTextures=null,this.mergeSettings(e.settings||t),this.threadDim=null,this.framebuffer=null,this.buffer=null,this.textureCache=[],this.programUniformLocationCache={},this.uniform1fCache={},this.uniform1iCache={},this.uniform2fCache={},this.uniform2fvCache={},this.uniform2ivCache={},this.uniform3fvCache={},this.uniform3ivCache={},this.uniform4fvCache={},this.uniform4ivCache={}}initCanvas(){if("undefined"!=typeof document){const e=document.createElement("canvas");return e.width=2,e.height=2,e}if("undefined"!=typeof OffscreenCanvas)return new OffscreenCanvas(0,0)}initContext(){const e={alpha:!1,depth:!1,antialias:!1};return this.canvas.getContext("webgl",e)||this.canvas.getContext("experimental-webgl",e)}initPlugins(e){const t=[],{source:n}=this;if("string"==typeof n)for(let e=0;e<x.length;e++){const r=x[e];n.match(r.functionMatch)&&t.push(r)}else if("object"==typeof n&&e.pluginNames)for(let n=0;n<x.length;n++){const r=x[n];e.pluginNames.some((e=>e===r.name))&&t.push(r)}return t}initExtensions(){this.extensions={OES_texture_float:this.context.getExtension("OES_texture_float"),OES_texture_float_linear:this.context.getExtension("OES_texture_float_linear"),OES_element_index_uint:this.context.getExtension("OES_element_index_uint"),WEBGL_draw_buffers:this.context.getExtension("WEBGL_draw_buffers"),WEBGL_color_buffer_float:this.context.getExtension("WEBGL_color_buffer_float")}}validateSettings(e){if(!this.validate)return void(this.texSize=a.getKernelTextureSize({optimizeFloatMemory:this.optimizeFloatMemory,precision:this.precision},this.output));const{features:t}=this.constructor;if(!0===this.optimizeFloatMemory&&!t.isTextureFloat)throw new Error("Float textures are not supported");if("single"===this.precision&&!t.isFloatRead)throw new Error("Single precision not supported");if(!this.graphical&&null===this.precision&&t.isTextureFloat&&(this.precision=t.isFloatRead?"single":"unsigned"),this.subKernels&&this.subKernels.length>0&&!this.extensions.WEBGL_draw_buffers)throw new Error("could not instantiate draw buffers extension");if(null===this.fixIntegerDivisionAccuracy?this.fixIntegerDivisionAccuracy=!t.isIntegerDivisionAccurate:this.fixIntegerDivisionAccuracy&&t.isIntegerDivisionAccurate&&(this.fixIntegerDivisionAccuracy=!1),this.checkOutput(),!this.output||0===this.output.length){if(1!==e.length)throw new Error("Auto output only supported for kernels with only one input");const t=a.getVariableType(e[0],this.strictIntegers);switch(t){case"Array":this.output=a.getDimensions(t);break;case"NumberTexture":case"MemoryOptimizedNumberTexture":case"ArrayTexture(1)":case"ArrayTexture(2)":case"ArrayTexture(3)":case"ArrayTexture(4)":this.output=e[0].output;break;default:throw new Error("Auto output not supported for input type: "+t)}}if(this.graphical){if(2!==this.output.length)throw new Error("Output must have 2 dimensions on graphical mode");return"precision"===this.precision&&(this.precision="unsigned",console.warn("Cannot use graphical mode and single precision at the same time")),void(this.texSize=a.clone(this.output))}null===this.precision&&t.isTextureFloat&&(this.precision="single"),this.texSize=a.getKernelTextureSize({optimizeFloatMemory:this.optimizeFloatMemory,precision:this.precision},this.output),this.checkTextureSize()}updateMaxTexSize(){const{texSize:e,canvas:t}=this;if(null===this.maxTexSize){let n=y.indexOf(t);-1===n&&(n=y.length,y.push(t),b[n]=[e[0],e[1]]),this.maxTexSize=b[n]}this.maxTexSize[0]<e[0]&&(this.maxTexSize[0]=e[0]),this.maxTexSize[1]<e[1]&&(this.maxTexSize[1]=e[1])}setupArguments(e){this.kernelArguments=[],this.argumentTextureCount=0;const t=null===this.argumentTypes;if(t&&(this.argumentTypes=[]),this.argumentSizes=[],this.argumentBitRatios=[],e.length<this.argumentNames.length)throw new Error("not enough arguments for kernel");if(e.length>this.argumentNames.length)throw new Error("too many arguments for kernel");const{context:n}=this;let r=0;const i=()=>this.createTexture(),s=()=>this.constantTextureCount+r++,o=e=>{this.switchKernels({type:"argumentMismatch",needed:e})},u=()=>n.TEXTURE0+this.constantTextureCount+this.argumentTextureCount++;for(let r=0;r<e.length;r++){const l=e[r],h=this.argumentNames[r];let c;t?(c=a.getVariableType(l,this.strictIntegers),this.argumentTypes.push(c)):c=this.argumentTypes[r];const p=this.constructor.lookupKernelValueType(c,this.dynamicArguments?"dynamic":"static",this.precision,e[r]);if(null===p)return this.requestFallback(e);const d=new p(l,{name:h,type:c,tactic:this.tactic,origin:"user",context:n,checkContext:this.checkContext,kernel:this,strictIntegers:this.strictIntegers,onRequestTexture:i,onRequestIndex:s,onUpdateValueMismatch:o,onRequestContextHandle:u});this.kernelArguments.push(d),d.setup(),this.argumentSizes.push(d.textureSize),this.argumentBitRatios[r]=d.bitRatio}}createTexture(){const e=this.context.createTexture();return this.textureCache.push(e),e}setupConstants(e){const{context:t}=this;this.kernelConstants=[],this.forceUploadKernelConstants=[];let n=null===this.constantTypes;n&&(this.constantTypes={}),this.constantBitRatios={};let r=0;for(const i in this.constants){const s=this.constants[i];let o;n?(o=a.getVariableType(s,this.strictIntegers),this.constantTypes[i]=o):o=this.constantTypes[i];const u=this.constructor.lookupKernelValueType(o,"static",this.precision,s);if(null===u)return this.requestFallback(e);const l=new u(s,{name:i,type:o,tactic:this.tactic,origin:"constants",context:this.context,checkContext:this.checkContext,kernel:this,strictIntegers:this.strictIntegers,onRequestTexture:()=>this.createTexture(),onRequestIndex:()=>r++,onRequestContextHandle:()=>t.TEXTURE0+this.constantTextureCount++});this.constantBitRatios[i]=l.bitRatio,this.kernelConstants.push(l),l.setup(),l.forceUploadEachRun&&this.forceUploadKernelConstants.push(l)}}build(){if(this.built)return;if(this.initExtensions(),this.validateSettings(arguments),this.setupConstants(arguments),this.fallbackRequested)return;if(this.setupArguments(arguments),this.fallbackRequested)return;this.updateMaxTexSize(),this.translateSource();const e=this.pickRenderStrategy(arguments);if(e)return e;const{texSize:t,context:n,canvas:r}=this;n.enable(n.SCISSOR_TEST),this.pipeline&&this.precision,n.viewport(0,0,this.maxTexSize[0],this.maxTexSize[1]),r.width=this.maxTexSize[0],r.height=this.maxTexSize[1];const i=this.threadDim=Array.from(this.output);for(;i.length<3;)i.push(1);const s=this.getVertexShader(arguments),a=n.createShader(n.VERTEX_SHADER);n.shaderSource(a,s),n.compileShader(a),this.vertShader=a;const o=this.getFragmentShader(arguments),u=n.createShader(n.FRAGMENT_SHADER);if(n.shaderSource(u,o),n.compileShader(u),this.fragShader=u,this.debug&&(console.log("GLSL Shader Output:"),console.log(o)),!n.getShaderParameter(a,n.COMPILE_STATUS))throw new Error("Error compiling vertex shader: "+n.getShaderInfoLog(a));if(!n.getShaderParameter(u,n.COMPILE_STATUS))throw new Error("Error compiling fragment shader: "+n.getShaderInfoLog(u));const l=this.program=n.createProgram();n.attachShader(l,a),n.attachShader(l,u),n.linkProgram(l),this.framebuffer=n.createFramebuffer(),this.framebuffer.width=t[0],this.framebuffer.height=t[1],this.rawValueFramebuffers={};const h=new Float32Array([-1,-1,1,-1,-1,1,1,1]),c=new Float32Array([0,0,1,0,0,1,1,1]),p=h.byteLength;let d=this.buffer;d?n.bindBuffer(n.ARRAY_BUFFER,d):(d=this.buffer=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,d),n.bufferData(n.ARRAY_BUFFER,h.byteLength+c.byteLength,n.STATIC_DRAW)),n.bufferSubData(n.ARRAY_BUFFER,0,h),n.bufferSubData(n.ARRAY_BUFFER,p,c);const m=n.getAttribLocation(this.program,"aPos");n.enableVertexAttribArray(m),n.vertexAttribPointer(m,2,n.FLOAT,!1,0,0);const f=n.getAttribLocation(this.program,"aTexCoord");n.enableVertexAttribArray(f),n.vertexAttribPointer(f,2,n.FLOAT,!1,0,p),n.bindFramebuffer(n.FRAMEBUFFER,this.framebuffer);let g=0;n.useProgram(this.program);for(let e in this.constants)this.kernelConstants[g++].updateValue(this.constants[e]);this._setupOutputTexture(),null!==this.subKernels&&this.subKernels.length>0&&(this._mappedTextureSwitched={},this._setupSubOutputTextures()),this.buildSignature(arguments),this.built=!0}translateSource(){const e=i.fromKernel(this,s,{fixIntegerDivisionAccuracy:this.fixIntegerDivisionAccuracy});this.translatedSource=e.getPrototypeString("kernel"),this.setupReturnTypes(e)}setupReturnTypes(e){if(this.graphical||this.returnType||(this.returnType=e.getKernelResultType()),this.subKernels&&this.subKernels.length>0)for(let t=0;t<this.subKernels.length;t++){const n=this.subKernels[t];n.returnType||(n.returnType=e.getSubKernelResultType(t))}}run(){const{kernelArguments:e,texSize:t,forceUploadKernelConstants:n,context:r}=this;r.useProgram(this.program),r.scissor(0,0,t[0],t[1]),this.dynamicOutput&&(this.setUniform3iv("uOutputDim",new Int32Array(this.threadDim)),this.setUniform2iv("uTexSize",t)),this.setUniform2f("ratio",t[0]/this.maxTexSize[0],t[1]/this.maxTexSize[1]);for(let e=0;e<n.length;e++){const t=n[e];if(t.updateValue(this.constants[t.name]),this.switchingKernels)return}for(let t=0;t<e.length;t++)if(e[t].updateValue(arguments[t]),this.switchingKernels)return;if(this.plugins)for(let e=0;e<this.plugins.length;e++){const t=this.plugins[e];t.onBeforeRun&&t.onBeforeRun(this)}if(this.graphical)return this.pipeline?(r.bindRenderbuffer(r.RENDERBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),this.immutable&&this._replaceOutputTexture(),r.drawArrays(r.TRIANGLE_STRIP,0,4),this.immutable?this.texture.clone():this.texture):(r.bindRenderbuffer(r.RENDERBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,null),void r.drawArrays(r.TRIANGLE_STRIP,0,4));r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),this.immutable&&this._replaceOutputTexture(),null!==this.subKernels&&(this.immutable&&this._replaceSubOutputTextures(),this.drawBuffers()),r.drawArrays(r.TRIANGLE_STRIP,0,4)}drawBuffers(){this.extensions.WEBGL_draw_buffers.drawBuffersWEBGL(this.drawBuffersMap)}getInternalFormat(){return this.context.RGBA}getTextureFormat(){const{context:e}=this;if(this.getInternalFormat()===e.RGBA)return e.RGBA;throw new Error("Unknown internal format")}_replaceOutputTexture(){if(this.texture.beforeMutate()||this._textureSwitched){const e=this.context;e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.texture.texture,0),this._textureSwitched=!1}}_setupOutputTexture(){const e=this.context,t=this.texSize;if(this.texture)return void e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.texture.texture,0);const n=this.createTexture();e.activeTexture(e.TEXTURE0+this.constantTextureCount+this.argumentTextureCount),e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const r=this.getInternalFormat();"single"===this.precision?e.texImage2D(e.TEXTURE_2D,0,r,t[0],t[1],0,e.RGBA,e.FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,r,t[0],t[1],0,r,e.UNSIGNED_BYTE,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),this.texture=new this.TextureConstructor({texture:n,size:t,dimensions:this.threadDim,output:this.output,context:this.context,internalFormat:this.getInternalFormat(),textureFormat:this.getTextureFormat(),kernel:this})}_replaceSubOutputTextures(){const e=this.context;for(let t=0;t<this.mappedTextures.length;t++){const n=this.mappedTextures[t];(n.beforeMutate()||this._mappedTextureSwitched[t])&&(e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t+1,e.TEXTURE_2D,n.texture,0),this._mappedTextureSwitched[t]=!1)}}_setupSubOutputTextures(){const e=this.context;if(this.mappedTextures){for(let t=0;t<this.subKernels.length;t++)e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t+1,e.TEXTURE_2D,this.mappedTextures[t].texture,0);return}const t=this.texSize;this.drawBuffersMap=[e.COLOR_ATTACHMENT0],this.mappedTextures=[];for(let n=0;n<this.subKernels.length;n++){const r=this.createTexture();this.drawBuffersMap.push(e.COLOR_ATTACHMENT0+n+1),e.activeTexture(e.TEXTURE0+this.constantTextureCount+this.argumentTextureCount+n),e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),"single"===this.precision?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t[0],t[1],0,e.RGBA,e.FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t[0],t[1],0,e.RGBA,e.UNSIGNED_BYTE,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n+1,e.TEXTURE_2D,r,0),this.mappedTextures.push(new this.TextureConstructor({texture:r,size:t,dimensions:this.threadDim,output:this.output,context:this.context,internalFormat:this.getInternalFormat(),textureFormat:this.getTextureFormat(),kernel:this}))}}setUniform1f(e,t){if(this.uniform1fCache.hasOwnProperty(e)){if(t===this.uniform1fCache[e])return}this.uniform1fCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform1f(n,t)}setUniform1i(e,t){if(this.uniform1iCache.hasOwnProperty(e)){if(t===this.uniform1iCache[e])return}this.uniform1iCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform1i(n,t)}setUniform2f(e,t,n){if(this.uniform2fCache.hasOwnProperty(e)){const r=this.uniform2fCache[e];if(t===r[0]&&n===r[1])return}this.uniform2fCache[e]=[t,n];const r=this.getUniformLocation(e);this.context.uniform2f(r,t,n)}setUniform2fv(e,t){if(this.uniform2fvCache.hasOwnProperty(e)){const n=this.uniform2fvCache[e];if(t[0]===n[0]&&t[1]===n[1])return}this.uniform2fvCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform2fv(n,t)}setUniform2iv(e,t){if(this.uniform2ivCache.hasOwnProperty(e)){const n=this.uniform2ivCache[e];if(t[0]===n[0]&&t[1]===n[1])return}this.uniform2ivCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform2iv(n,t)}setUniform3fv(e,t){if(this.uniform3fvCache.hasOwnProperty(e)){const n=this.uniform3fvCache[e];if(t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2])return}this.uniform3fvCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform3fv(n,t)}setUniform3iv(e,t){if(this.uniform3ivCache.hasOwnProperty(e)){const n=this.uniform3ivCache[e];if(t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2])return}this.uniform3ivCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform3iv(n,t)}setUniform4fv(e,t){if(this.uniform4fvCache.hasOwnProperty(e)){const n=this.uniform4fvCache[e];if(t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3])return}this.uniform4fvCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform4fv(n,t)}setUniform4iv(e,t){if(this.uniform4ivCache.hasOwnProperty(e)){const n=this.uniform4ivCache[e];if(t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3])return}this.uniform4ivCache[e]=t;const n=this.getUniformLocation(e);this.context.uniform4iv(n,t)}getUniformLocation(e){return this.programUniformLocationCache.hasOwnProperty(e)?this.programUniformLocationCache[e]:this.programUniformLocationCache[e]=this.context.getUniformLocation(this.program,e)}_getFragShaderArtifactMap(e){return{HEADER:this._getHeaderString(),LOOP_MAX:this._getLoopMaxString(),PLUGINS:this._getPluginsString(),CONSTANTS:this._getConstantsString(),DECODE32_ENDIANNESS:this._getDecode32EndiannessString(),ENCODE32_ENDIANNESS:this._getEncode32EndiannessString(),DIVIDE_WITH_INTEGER_CHECK:this._getDivideWithIntegerCheckString(),INJECTED_NATIVE:this._getInjectedNative(),MAIN_CONSTANTS:this._getMainConstantsString(),MAIN_ARGUMENTS:this._getMainArgumentsString(e),KERNEL:this.getKernelString(),MAIN_RESULT:this.getMainResultString(),FLOAT_TACTIC_DECLARATION:this.getFloatTacticDeclaration(),INT_TACTIC_DECLARATION:this.getIntTacticDeclaration(),SAMPLER_2D_TACTIC_DECLARATION:this.getSampler2DTacticDeclaration(),SAMPLER_2D_ARRAY_TACTIC_DECLARATION:this.getSampler2DArrayTacticDeclaration()}}_getVertShaderArtifactMap(e){return{FLOAT_TACTIC_DECLARATION:this.getFloatTacticDeclaration(),INT_TACTIC_DECLARATION:this.getIntTacticDeclaration(),SAMPLER_2D_TACTIC_DECLARATION:this.getSampler2DTacticDeclaration(),SAMPLER_2D_ARRAY_TACTIC_DECLARATION:this.getSampler2DArrayTacticDeclaration()}}_getHeaderString(){return null!==this.subKernels?"#extension GL_EXT_draw_buffers : require\n":""}_getLoopMaxString(){return this.loopMaxIterations?` ${parseInt(this.loopMaxIterations)};\n`:" 1000;\n"}_getPluginsString(){return this.plugins?this.plugins.map((e=>e.source&&this.source.match(e.functionMatch)?e.source:"")).join("\n"):"\n"}_getConstantsString(){const e=[],{threadDim:t,texSize:n}=this;return this.dynamicOutput?e.push("uniform ivec3 uOutputDim","uniform ivec2 uTexSize"):e.push(`ivec3 uOutputDim = ivec3(${t[0]}, ${t[1]}, ${t[2]})`,`ivec2 uTexSize = ivec2(${n[0]}, ${n[1]})`),a.linesToString(e)}_getTextureCoordinate(){const e=this.subKernels;return null===e||e.length<1?"varying vec2 vTexCoord;\n":"out vec2 vTexCoord;\n"}_getDecode32EndiannessString(){return"LE"===this.endianness?"":"  texel.rgba = texel.abgr;\n"}_getEncode32EndiannessString(){return"LE"===this.endianness?"":"  texel.rgba = texel.abgr;\n"}_getDivideWithIntegerCheckString(){return this.fixIntegerDivisionAccuracy?"float divWithIntCheck(float x, float y) {\n  if (floor(x) == x && floor(y) == y && integerMod(x, y) == 0.0) {\n    return float(int(x) / int(y));\n  }\n  return x / y;\n}\n\nfloat integerCorrectionModulo(float number, float divisor) {\n  if (number < 0.0) {\n    number = abs(number);\n    if (divisor < 0.0) {\n      divisor = abs(divisor);\n    }\n    return -(number - (divisor * floor(divWithIntCheck(number, divisor))));\n  }\n  if (divisor < 0.0) {\n    divisor = abs(divisor);\n  }\n  return number - (divisor * floor(divWithIntCheck(number, divisor)));\n}":""}_getMainArgumentsString(e){const t=[],{argumentNames:n}=this;for(let r=0;r<n.length;r++)t.push(this.kernelArguments[r].getSource(e[r]));return t.join("")}_getInjectedNative(){return this.injectedNative||""}_getMainConstantsString(){const e=[],{constants:t}=this;if(t){let n=0;for(const r in t)this.constants.hasOwnProperty(r)&&e.push(this.kernelConstants[n++].getSource(this.constants[r]))}return e.join("")}getRawValueFramebuffer(e,t){if(this.rawValueFramebuffers[e]||(this.rawValueFramebuffers[e]={}),!this.rawValueFramebuffers[e][t]){const n=this.context.createFramebuffer();n.width=e,n.height=t,this.rawValueFramebuffers[e][t]=n}return this.rawValueFramebuffers[e][t]}getKernelResultDeclaration(){switch(this.returnType){case"Array(2)":return"vec2 kernelResult";case"Array(3)":return"vec3 kernelResult";case"Array(4)":return"vec4 kernelResult";case"LiteralInteger":case"Float":case"Number":case"Integer":return"float kernelResult";default:if(this.graphical)return"float kernelResult";throw new Error(`unrecognized output type "${this.returnType}"`)}}getKernelString(){const e=[this.getKernelResultDeclaration()],{subKernels:t}=this;if(null!==t)switch(this.returnType){case"Number":case"Float":case"Integer":for(let n=0;n<t.length;n++){const r=t[n];e.push("Integer"===r.returnType?`int subKernelResult_${r.name} = 0`:`float subKernelResult_${r.name} = 0.0`)}break;case"Array(2)":for(let n=0;n<t.length;n++)e.push(`vec2 subKernelResult_${t[n].name}`);break;case"Array(3)":for(let n=0;n<t.length;n++)e.push(`vec3 subKernelResult_${t[n].name}`);break;case"Array(4)":for(let n=0;n<t.length;n++)e.push(`vec4 subKernelResult_${t[n].name}`)}return a.linesToString(e)+this.translatedSource}getMainResultGraphical(){return a.linesToString(["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  gl_FragColor = actualColor"])}getMainResultPackedPixels(){switch(this.returnType){case"LiteralInteger":case"Number":case"Integer":case"Float":return this.getMainResultKernelPackedPixels()+this.getMainResultSubKernelPackedPixels();default:throw new Error(`packed output only usable with Numbers, "${this.returnType}" specified`)}}getMainResultKernelPackedPixels(){return a.linesToString(["  threadId = indexTo3D(index, uOutputDim)","  kernel()",`  gl_FragData[0] = ${this.useLegacyEncoder?"legacyEncode32":"encode32"}(kernelResult)`])}getMainResultSubKernelPackedPixels(){const e=[];if(!this.subKernels)return"";for(let t=0;t<this.subKernels.length;t++){"Integer"===this.subKernels[t].returnType?e.push(`  gl_FragData[${t+1}] = ${this.useLegacyEncoder?"legacyEncode32":"encode32"}(float(subKernelResult_${this.subKernels[t].name}))`):e.push(`  gl_FragData[${t+1}] = ${this.useLegacyEncoder?"legacyEncode32":"encode32"}(subKernelResult_${this.subKernels[t].name})`)}return a.linesToString(e)}getMainResultMemoryOptimizedFloats(){const e=["  index *= 4"];switch(this.returnType){case"Number":case"Integer":case"Float":const t=["r","g","b","a"];for(let n=0;n<t.length;n++){const r=t[n];this.getMainResultKernelMemoryOptimizedFloats(e,r),this.getMainResultSubKernelMemoryOptimizedFloats(e,r),n+1<t.length&&e.push("  index += 1")}break;default:throw new Error(`optimized output only usable with Numbers, ${this.returnType} specified`)}return a.linesToString(e)}getMainResultKernelMemoryOptimizedFloats(e,t){e.push("  threadId = indexTo3D(index, uOutputDim)","  kernel()",`  gl_FragData[0].${t} = kernelResult`)}getMainResultSubKernelMemoryOptimizedFloats(e,t){if(!this.subKernels)return e;for(let n=0;n<this.subKernels.length;n++){"Integer"===this.subKernels[n].returnType?e.push(`  gl_FragData[${n+1}].${t} = float(subKernelResult_${this.subKernels[n].name})`):e.push(`  gl_FragData[${n+1}].${t} = subKernelResult_${this.subKernels[n].name}`)}}getMainResultKernelNumberTexture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  gl_FragData[0][0] = kernelResult"]}getMainResultSubKernelNumberTexture(){const e=[];if(!this.subKernels)return e;for(let t=0;t<this.subKernels.length;++t){const n=this.subKernels[t];"Integer"===n.returnType?e.push(`  gl_FragData[${t+1}][0] = float(subKernelResult_${n.name})`):e.push(`  gl_FragData[${t+1}][0] = subKernelResult_${n.name}`)}return e}getMainResultKernelArray2Texture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  gl_FragData[0][0] = kernelResult[0]","  gl_FragData[0][1] = kernelResult[1]"]}getMainResultSubKernelArray2Texture(){const e=[];if(!this.subKernels)return e;for(let t=0;t<this.subKernels.length;++t)e.push(`  gl_FragData[${t+1}][0] = subKernelResult_${this.subKernels[t].name}[0]`,`  gl_FragData[${t+1}][1] = subKernelResult_${this.subKernels[t].name}[1]`);return e}getMainResultKernelArray3Texture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  gl_FragData[0][0] = kernelResult[0]","  gl_FragData[0][1] = kernelResult[1]","  gl_FragData[0][2] = kernelResult[2]"]}getMainResultSubKernelArray3Texture(){const e=[];if(!this.subKernels)return e;for(let t=0;t<this.subKernels.length;++t)e.push(`  gl_FragData[${t+1}][0] = subKernelResult_${this.subKernels[t].name}[0]`,`  gl_FragData[${t+1}][1] = subKernelResult_${this.subKernels[t].name}[1]`,`  gl_FragData[${t+1}][2] = subKernelResult_${this.subKernels[t].name}[2]`);return e}getMainResultKernelArray4Texture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  gl_FragData[0] = kernelResult"]}getMainResultSubKernelArray4Texture(){const e=[];if(!this.subKernels)return e;switch(this.returnType){case"Number":case"Float":case"Integer":for(let t=0;t<this.subKernels.length;++t){"Integer"===this.subKernels[t].returnType?e.push(`  gl_FragData[${t+1}] = float(subKernelResult_${this.subKernels[t].name})`):e.push(`  gl_FragData[${t+1}] = subKernelResult_${this.subKernels[t].name}`)}break;case"Array(2)":for(let t=0;t<this.subKernels.length;++t)e.push(`  gl_FragData[${t+1}][0] = subKernelResult_${this.subKernels[t].name}[0]`,`  gl_FragData[${t+1}][1] = subKernelResult_${this.subKernels[t].name}[1]`);break;case"Array(3)":for(let t=0;t<this.subKernels.length;++t)e.push(`  gl_FragData[${t+1}][0] = subKernelResult_${this.subKernels[t].name}[0]`,`  gl_FragData[${t+1}][1] = subKernelResult_${this.subKernels[t].name}[1]`,`  gl_FragData[${t+1}][2] = subKernelResult_${this.subKernels[t].name}[2]`);break;case"Array(4)":for(let t=0;t<this.subKernels.length;++t)e.push(`  gl_FragData[${t+1}][0] = subKernelResult_${this.subKernels[t].name}[0]`,`  gl_FragData[${t+1}][1] = subKernelResult_${this.subKernels[t].name}[1]`,`  gl_FragData[${t+1}][2] = subKernelResult_${this.subKernels[t].name}[2]`,`  gl_FragData[${t+1}][3] = subKernelResult_${this.subKernels[t].name}[3]`)}return e}replaceArtifacts(e,t){return e.replace(/[ ]*__([A-Z]+[0-9]*([_]?[A-Z]*[0-9]?)*)__;\n/g,((e,n)=>{if(t.hasOwnProperty(n))return t[n];throw`unhandled artifact ${n}`}))}getFragmentShader(e){return null!==this.compiledFragmentShader?this.compiledFragmentShader:this.compiledFragmentShader=this.replaceArtifacts(this.constructor.fragmentShader,this._getFragShaderArtifactMap(e))}getVertexShader(e){return null!==this.compiledVertexShader?this.compiledVertexShader:this.compiledVertexShader=this.replaceArtifacts(this.constructor.vertexShader,this._getVertShaderArtifactMap(e))}toString(){const e=a.linesToString(["const gl = context"]);return h(this.constructor,arguments,this,e)}destroy(e){if(!this.context)return;this.buffer&&this.context.deleteBuffer(this.buffer),this.framebuffer&&this.context.deleteFramebuffer(this.framebuffer);for(const e in this.rawValueFramebuffers){for(const t in this.rawValueFramebuffers[e])this.context.deleteFramebuffer(this.rawValueFramebuffers[e][t]),delete this.rawValueFramebuffers[e][t];delete this.rawValueFramebuffers[e]}if(this.vertShader&&this.context.deleteShader(this.vertShader),this.fragShader&&this.context.deleteShader(this.fragShader),this.program&&this.context.deleteProgram(this.program),this.texture){this.texture.delete();const e=this.textureCache.indexOf(this.texture.texture);e>-1&&this.textureCache.splice(e,1),this.texture=null}if(this.mappedTextures&&this.mappedTextures.length){for(let e=0;e<this.mappedTextures.length;e++){const t=this.mappedTextures[e];t.delete();const n=this.textureCache.indexOf(t.texture);n>-1&&this.textureCache.splice(n,1)}this.mappedTextures=null}if(this.kernelArguments)for(let e=0;e<this.kernelArguments.length;e++)this.kernelArguments[e].destroy();if(this.kernelConstants)for(let e=0;e<this.kernelConstants.length;e++)this.kernelConstants[e].destroy();for(;this.textureCache.length>0;){const e=this.textureCache.pop();this.context.deleteTexture(e)}if(e){const e=y.indexOf(this.canvas);e>=0&&(y[e]=null,b[e]=null)}if(this.destroyExtensions(),delete this.context,delete this.canvas,!this.gpu)return;const t=this.gpu.kernels.indexOf(this);-1!==t&&this.gpu.kernels.splice(t,1)}destroyExtensions(){this.extensions.OES_texture_float=null,this.extensions.OES_texture_float_linear=null,this.extensions.OES_element_index_uint=null,this.extensions.WEBGL_draw_buffers=null}static destroyContext(e){const t=e.getExtension("WEBGL_lose_context");t&&t.loseContext()}toJSON(){const e=super.toJSON();return e.functionNodes=i.fromKernel(this,s).toJSON(),e.settings.threadDim=this.threadDim,e}}}},{"../../plugins/math-random-uniformly-distributed":112,"../../utils":114,"../function-builder":9,"../gl/kernel":13,"../gl/kernel-string":12,"./fragment-shader":37,"./function-node":38,"./kernel-value-maps":39,"./vertex-shader":71}],71:[function(e,t,n){t.exports={vertexShader:"__FLOAT_TACTIC_DECLARATION__;\n__INT_TACTIC_DECLARATION__;\n__SAMPLER_2D_TACTIC_DECLARATION__;\n\nattribute vec2 aPos;\nattribute vec2 aTexCoord;\n\nvarying vec2 vTexCoord;\nuniform vec2 ratio;\n\nvoid main(void) {\n  gl_Position = vec4((aPos + vec2(1)) * ratio + vec2(-1), 0, 1);\n  vTexCoord = aTexCoord;\n}"}},{}],72:[function(e,t,n){const r=`#version 300 es\n__HEADER__;\n__FLOAT_TACTIC_DECLARATION__;\n__INT_TACTIC_DECLARATION__;\n__SAMPLER_2D_TACTIC_DECLARATION__;\n__SAMPLER_2D_ARRAY_TACTIC_DECLARATION__;\n\nconst int LOOP_MAX = __LOOP_MAX__;\n\n__PLUGINS__;\n__CONSTANTS__;\n\nin vec2 vTexCoord;\n\nfloat atan2(float v1, float v2) {\n  if (v1 == 0.0 || v2 == 0.0) return 0.0;\n  return atan(v1 / v2);\n}\n\nfloat cbrt(float x) {\n  if (x >= 0.0) {\n    return pow(x, 1.0 / 3.0);\n  } else {\n    return -pow(x, 1.0 / 3.0);\n  }\n}\n\nfloat expm1(float x) {\n  return pow(${Math.E}, x) - 1.0; \n}\n\nfloat fround(highp float x) {\n  return x;\n}\n\nfloat imul(float v1, float v2) {\n  return float(int(v1) * int(v2));\n}\n\nfloat log10(float x) {\n  return log2(x) * (1.0 / log2(10.0));\n}\n\nfloat log1p(float x) {\n  return log(1.0 + x);\n}\n\nfloat _pow(float v1, float v2) {\n  if (v2 == 0.0) return 1.0;\n  return pow(v1, v2);\n}\n\nfloat _round(float x) {\n  return floor(x + 0.5);\n}\n\n\nconst int BIT_COUNT = 32;\nint modi(int x, int y) {\n  return x - y * (x / y);\n}\n\nint bitwiseOr(int a, int b) {\n  int result = 0;\n  int n = 1;\n  \n  for (int i = 0; i < BIT_COUNT; i++) {\n    if ((modi(a, 2) == 1) || (modi(b, 2) == 1)) {\n      result += n;\n    }\n    a = a / 2;\n    b = b / 2;\n    n = n * 2;\n    if(!(a > 0 || b > 0)) {\n      break;\n    }\n  }\n  return result;\n}\nint bitwiseXOR(int a, int b) {\n  int result = 0;\n  int n = 1;\n  \n  for (int i = 0; i < BIT_COUNT; i++) {\n    if ((modi(a, 2) == 1) != (modi(b, 2) == 1)) {\n      result += n;\n    }\n    a = a / 2;\n    b = b / 2;\n    n = n * 2;\n    if(!(a > 0 || b > 0)) {\n      break;\n    }\n  }\n  return result;\n}\nint bitwiseAnd(int a, int b) {\n  int result = 0;\n  int n = 1;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if ((modi(a, 2) == 1) && (modi(b, 2) == 1)) {\n      result += n;\n    }\n    a = a / 2;\n    b = b / 2;\n    n = n * 2;\n    if(!(a > 0 && b > 0)) {\n      break;\n    }\n  }\n  return result;\n}\nint bitwiseNot(int a) {\n  int result = 0;\n  int n = 1;\n  \n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (modi(a, 2) == 0) {\n      result += n;    \n    }\n    a = a / 2;\n    n = n * 2;\n  }\n  return result;\n}\nint bitwiseZeroFillLeftShift(int n, int shift) {\n  int maxBytes = BIT_COUNT;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (maxBytes >= n) {\n      break;\n    }\n    maxBytes *= 2;\n  }\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= shift) {\n      break;\n    }\n    n *= 2;\n  }\n\n  int result = 0;\n  int byteVal = 1;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= maxBytes) break;\n    if (modi(n, 2) > 0) { result += byteVal; }\n    n = int(n / 2);\n    byteVal *= 2;\n  }\n  return result;\n}\n\nint bitwiseSignedRightShift(int num, int shifts) {\n  return int(floor(float(num) / pow(2.0, float(shifts))));\n}\n\nint bitwiseZeroFillRightShift(int n, int shift) {\n  int maxBytes = BIT_COUNT;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (maxBytes >= n) {\n      break;\n    }\n    maxBytes *= 2;\n  }\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= shift) {\n      break;\n    }\n    n /= 2;\n  }\n  int result = 0;\n  int byteVal = 1;\n  for (int i = 0; i < BIT_COUNT; i++) {\n    if (i >= maxBytes) break;\n    if (modi(n, 2) > 0) { result += byteVal; }\n    n = int(n / 2);\n    byteVal *= 2;\n  }\n  return result;\n}\n\nvec2 integerMod(vec2 x, float y) {\n  vec2 res = floor(mod(x, y));\n  return res * step(1.0 - floor(y), -res);\n}\n\nvec3 integerMod(vec3 x, float y) {\n  vec3 res = floor(mod(x, y));\n  return res * step(1.0 - floor(y), -res);\n}\n\nvec4 integerMod(vec4 x, vec4 y) {\n  vec4 res = floor(mod(x, y));\n  return res * step(1.0 - floor(y), -res);\n}\n\nfloat integerMod(float x, float y) {\n  float res = floor(mod(x, y));\n  return res * (res > floor(y) - 1.0 ? 0.0 : 1.0);\n}\n\nint integerMod(int x, int y) {\n  return x - (y * int(x/y));\n}\n\n__DIVIDE_WITH_INTEGER_CHECK__;\n\n// Here be dragons!\n// DO NOT OPTIMIZE THIS CODE\n// YOU WILL BREAK SOMETHING ON SOMEBODY'S MACHINE\n// LEAVE IT AS IT IS, LEST YOU WASTE YOUR OWN TIME\nconst vec2 MAGIC_VEC = vec2(1.0, -256.0);\nconst vec4 SCALE_FACTOR = vec4(1.0, 256.0, 65536.0, 0.0);\nconst vec4 SCALE_FACTOR_INV = vec4(1.0, 0.00390625, 0.0000152587890625, 0.0); // 1, 1/256, 1/65536\nfloat decode32(vec4 texel) {\n  __DECODE32_ENDIANNESS__;\n  texel *= 255.0;\n  vec2 gte128;\n  gte128.x = texel.b >= 128.0 ? 1.0 : 0.0;\n  gte128.y = texel.a >= 128.0 ? 1.0 : 0.0;\n  float exponent = 2.0 * texel.a - 127.0 + dot(gte128, MAGIC_VEC);\n  float res = exp2(round(exponent));\n  texel.b = texel.b - 128.0 * gte128.x;\n  res = dot(texel, SCALE_FACTOR) * exp2(round(exponent-23.0)) + res;\n  res *= gte128.y * -2.0 + 1.0;\n  return res;\n}\n\nfloat decode16(vec4 texel, int index) {\n  int channel = integerMod(index, 2);\n  return texel[channel*2] * 255.0 + texel[channel*2 + 1] * 65280.0;\n}\n\nfloat decode8(vec4 texel, int index) {\n  int channel = integerMod(index, 4);\n  return texel[channel] * 255.0;\n}\n\nvec4 legacyEncode32(float f) {\n  float F = abs(f);\n  float sign = f < 0.0 ? 1.0 : 0.0;\n  float exponent = floor(log2(F));\n  float mantissa = (exp2(-exponent) * F);\n  // exponent += floor(log2(mantissa));\n  vec4 texel = vec4(F * exp2(23.0-exponent)) * SCALE_FACTOR_INV;\n  texel.rg = integerMod(texel.rg, 256.0);\n  texel.b = integerMod(texel.b, 128.0);\n  texel.a = exponent*0.5 + 63.5;\n  texel.ba += vec2(integerMod(exponent+127.0, 2.0), sign) * 128.0;\n  texel = floor(texel);\n  texel *= 0.003921569; // 1/255\n  __ENCODE32_ENDIANNESS__;\n  return texel;\n}\n\n// https://github.com/gpujs/gpu.js/wiki/Encoder-details\nvec4 encode32(float value) {\n  if (value == 0.0) return vec4(0, 0, 0, 0);\n\n  float exponent;\n  float mantissa;\n  vec4  result;\n  float sgn;\n\n  sgn = step(0.0, -value);\n  value = abs(value);\n\n  exponent = floor(log2(value));\n\n  mantissa = value*pow(2.0, -exponent)-1.0;\n  exponent = exponent+127.0;\n  result   = vec4(0,0,0,0);\n\n  result.a = floor(exponent/2.0);\n  exponent = exponent - result.a*2.0;\n  result.a = result.a + 128.0*sgn;\n\n  result.b = floor(mantissa * 128.0);\n  mantissa = mantissa - result.b / 128.0;\n  result.b = result.b + exponent*128.0;\n\n  result.g = floor(mantissa*32768.0);\n  mantissa = mantissa - result.g/32768.0;\n\n  result.r = floor(mantissa*8388608.0);\n  return result/255.0;\n}\n// Dragons end here\n\nint index;\nivec3 threadId;\n\nivec3 indexTo3D(int idx, ivec3 texDim) {\n  int z = int(idx / (texDim.x * texDim.y));\n  idx -= z * int(texDim.x * texDim.y);\n  int y = int(idx / texDim.x);\n  int x = int(integerMod(idx, texDim.x));\n  return ivec3(x, y, z);\n}\n\nfloat get32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture(tex, st / vec2(texSize));\n  return decode32(texel);\n}\n\nfloat get16(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + (texDim.x * (y + (texDim.y * z)));\n  int w = texSize.x * 2;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture(tex, st / vec2(texSize.x * 2, texSize.y));\n  return decode16(texel, index);\n}\n\nfloat get8(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + (texDim.x * (y + (texDim.y * z)));\n  int w = texSize.x * 4;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture(tex, st / vec2(texSize.x * 4, texSize.y));\n  return decode8(texel, index);\n}\n\nfloat getMemoryOptimized32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + (texDim.x * (y + (texDim.y * z)));\n  int channel = integerMod(index, 4);\n  index = index / 4;\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  index = index / 4;\n  vec4 texel = texture(tex, st / vec2(texSize));\n  return texel[channel];\n}\n\nvec4 getImage2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  return texture(tex, st / vec2(texSize));\n}\n\nvec4 getImage3D(sampler2DArray tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  return texture(tex, vec3(st / vec2(texSize), z));\n}\n\nfloat getFloatFromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);\n  return result[0];\n}\n\nvec2 getVec2FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);\n  return vec2(result[0], result[1]);\n}\n\nvec2 getMemoryOptimizedVec2(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int channel = integerMod(index, 2);\n  index = index / 2;\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture(tex, st / vec2(texSize));\n  if (channel == 0) return vec2(texel.r, texel.g);\n  if (channel == 1) return vec2(texel.b, texel.a);\n  return vec2(0.0, 0.0);\n}\n\nvec3 getVec3FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);\n  return vec3(result[0], result[1], result[2]);\n}\n\nvec3 getMemoryOptimizedVec3(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int fieldIndex = 3 * (x + texDim.x * (y + texDim.y * z));\n  int vectorIndex = fieldIndex / 4;\n  int vectorOffset = fieldIndex - vectorIndex * 4;\n  int readY = vectorIndex / texSize.x;\n  int readX = vectorIndex - readY * texSize.x;\n  vec4 tex1 = texture(tex, (vec2(readX, readY) + 0.5) / vec2(texSize));\n\n  if (vectorOffset == 0) {\n    return tex1.xyz;\n  } else if (vectorOffset == 1) {\n    return tex1.yzw;\n  } else {\n    readX++;\n    if (readX >= texSize.x) {\n      readX = 0;\n      readY++;\n    }\n    vec4 tex2 = texture(tex, vec2(readX, readY) / vec2(texSize));\n    if (vectorOffset == 2) {\n      return vec3(tex1.z, tex1.w, tex2.x);\n    } else {\n      return vec3(tex1.w, tex2.x, tex2.y);\n    }\n  }\n}\n\nvec4 getVec4FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  return getImage2D(tex, texSize, texDim, z, y, x);\n}\n\nvec4 getMemoryOptimizedVec4(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {\n  int index = x + texDim.x * (y + texDim.y * z);\n  int channel = integerMod(index, 2);\n  int w = texSize.x;\n  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;\n  vec4 texel = texture(tex, st / vec2(texSize));\n  return vec4(texel.r, texel.g, texel.b, texel.a);\n}\n\nvec4 actualColor;\nvoid color(float r, float g, float b, float a) {\n  actualColor = vec4(r,g,b,a);\n}\n\nvoid color(float r, float g, float b) {\n  color(r,g,b,1.0);\n}\n\nfloat modulo(float number, float divisor) {\n  if (number < 0.0) {\n    number = abs(number);\n    if (divisor < 0.0) {\n      divisor = abs(divisor);\n    }\n    return -mod(number, divisor);\n  }\n  if (divisor < 0.0) {\n    divisor = abs(divisor);\n  }\n  return mod(number, divisor);\n}\n\n__INJECTED_NATIVE__;\n__MAIN_CONSTANTS__;\n__MAIN_ARGUMENTS__;\n__KERNEL__;\n\nvoid main(void) {\n  index = int(vTexCoord.s * float(uTexSize.x)) + int(vTexCoord.t * float(uTexSize.y)) * uTexSize.x;\n  __MAIN_RESULT__;\n}`;t.exports={fragmentShader:r}},{}],73:[function(e,t,n){const{utils:r}=e("../../utils"),{WebGLFunctionNode:i}=e("../web-gl/function-node");t.exports={WebGL2FunctionNode:class extends i{astIdentifierExpression(e,t){if("Identifier"!==e.type)throw this.astErrorOutput("IdentifierExpression - not an Identifier",e);const n=this.getType(e),i=r.sanitizeName(e.name);return"Infinity"===e.name?t.push("intBitsToFloat(2139095039)"):"Boolean"===n&&this.argumentNames.indexOf(i)>-1?t.push(`bool(user_${i})`):t.push(`user_${i}`),t}}}},{"../../utils":114,"../web-gl/function-node":38}],74:[function(e,t,n){const{WebGL2KernelValueBoolean:r}=e("./kernel-value/boolean"),{WebGL2KernelValueFloat:i}=e("./kernel-value/float"),{WebGL2KernelValueInteger:s}=e("./kernel-value/integer"),{WebGL2KernelValueHTMLImage:a}=e("./kernel-value/html-image"),{WebGL2KernelValueDynamicHTMLImage:o}=e("./kernel-value/dynamic-html-image"),{WebGL2KernelValueHTMLImageArray:u}=e("./kernel-value/html-image-array"),{WebGL2KernelValueDynamicHTMLImageArray:l}=e("./kernel-value/dynamic-html-image-array"),{WebGL2KernelValueHTMLVideo:h}=e("./kernel-value/html-video"),{WebGL2KernelValueDynamicHTMLVideo:c}=e("./kernel-value/dynamic-html-video"),{WebGL2KernelValueSingleInput:p}=e("./kernel-value/single-input"),{WebGL2KernelValueDynamicSingleInput:d}=e("./kernel-value/dynamic-single-input"),{WebGL2KernelValueUnsignedInput:m}=e("./kernel-value/unsigned-input"),{WebGL2KernelValueDynamicUnsignedInput:f}=e("./kernel-value/dynamic-unsigned-input"),{WebGL2KernelValueMemoryOptimizedNumberTexture:g}=e("./kernel-value/memory-optimized-number-texture"),{WebGL2KernelValueDynamicMemoryOptimizedNumberTexture:x}=e("./kernel-value/dynamic-memory-optimized-number-texture"),{WebGL2KernelValueNumberTexture:y}=e("./kernel-value/number-texture"),{WebGL2KernelValueDynamicNumberTexture:b}=e("./kernel-value/dynamic-number-texture"),{WebGL2KernelValueSingleArray:T}=e("./kernel-value/single-array"),{WebGL2KernelValueDynamicSingleArray:v}=e("./kernel-value/dynamic-single-array"),{WebGL2KernelValueSingleArray1DI:S}=e("./kernel-value/single-array1d-i"),{WebGL2KernelValueDynamicSingleArray1DI:A}=e("./kernel-value/dynamic-single-array1d-i"),{WebGL2KernelValueSingleArray2DI:_}=e("./kernel-value/single-array2d-i"),{WebGL2KernelValueDynamicSingleArray2DI:E}=e("./kernel-value/dynamic-single-array2d-i"),{WebGL2KernelValueSingleArray3DI:w}=e("./kernel-value/single-array3d-i"),{WebGL2KernelValueDynamicSingleArray3DI:k}=e("./kernel-value/dynamic-single-array3d-i"),{WebGL2KernelValueArray2:I}=e("./kernel-value/array2"),{WebGL2KernelValueArray3:D}=e("./kernel-value/array3"),{WebGL2KernelValueArray4:C}=e("./kernel-value/array4"),{WebGL2KernelValueUnsignedArray:$}=e("./kernel-value/unsigned-array"),{WebGL2KernelValueDynamicUnsignedArray:L}=e("./kernel-value/dynamic-unsigned-array"),R={unsigned:{dynamic:{Boolean:r,Integer:s,Float:i,Array:L,"Array(2)":I,"Array(3)":D,"Array(4)":C,"Array1D(2)":!1,"Array1D(3)":!1,"Array1D(4)":!1,"Array2D(2)":!1,"Array2D(3)":!1,"Array2D(4)":!1,"Array3D(2)":!1,"Array3D(3)":!1,"Array3D(4)":!1,Input:f,NumberTexture:b,"ArrayTexture(1)":b,"ArrayTexture(2)":b,"ArrayTexture(3)":b,"ArrayTexture(4)":b,MemoryOptimizedNumberTexture:x,HTMLCanvas:o,OffscreenCanvas:o,HTMLImage:o,ImageBitmap:o,ImageData:o,HTMLImageArray:l,HTMLVideo:c},static:{Boolean:r,Float:i,Integer:s,Array:$,"Array(2)":I,"Array(3)":D,"Array(4)":C,"Array1D(2)":!1,"Array1D(3)":!1,"Array1D(4)":!1,"Array2D(2)":!1,"Array2D(3)":!1,"Array2D(4)":!1,"Array3D(2)":!1,"Array3D(3)":!1,"Array3D(4)":!1,Input:m,NumberTexture:y,"ArrayTexture(1)":y,"ArrayTexture(2)":y,"ArrayTexture(3)":y,"ArrayTexture(4)":y,MemoryOptimizedNumberTexture:x,HTMLCanvas:a,OffscreenCanvas:a,HTMLImage:a,ImageBitmap:a,ImageData:a,HTMLImageArray:u,HTMLVideo:h}},single:{dynamic:{Boolean:r,Integer:s,Float:i,Array:v,"Array(2)":I,"Array(3)":D,"Array(4)":C,"Array1D(2)":A,"Array1D(3)":A,"Array1D(4)":A,"Array2D(2)":E,"Array2D(3)":E,"Array2D(4)":E,"Array3D(2)":k,"Array3D(3)":k,"Array3D(4)":k,Input:d,NumberTexture:b,"ArrayTexture(1)":b,"ArrayTexture(2)":b,"ArrayTexture(3)":b,"ArrayTexture(4)":b,MemoryOptimizedNumberTexture:x,HTMLCanvas:o,OffscreenCanvas:o,HTMLImage:o,ImageBitmap:o,ImageData:o,HTMLImageArray:l,HTMLVideo:c},static:{Boolean:r,Float:i,Integer:s,Array:T,"Array(2)":I,"Array(3)":D,"Array(4)":C,"Array1D(2)":S,"Array1D(3)":S,"Array1D(4)":S,"Array2D(2)":_,"Array2D(3)":_,"Array2D(4)":_,"Array3D(2)":w,"Array3D(3)":w,"Array3D(4)":w,Input:p,NumberTexture:y,"ArrayTexture(1)":y,"ArrayTexture(2)":y,"ArrayTexture(3)":y,"ArrayTexture(4)":y,MemoryOptimizedNumberTexture:g,HTMLCanvas:a,OffscreenCanvas:a,HTMLImage:a,ImageBitmap:a,ImageData:a,HTMLImageArray:u,HTMLVideo:h}}};t.exports={kernelValueMaps:R,lookupKernelValueType:function(e,t,n,r){if(!e)throw new Error("type missing");if(!t)throw new Error("dynamic missing");if(!n)throw new Error("precision missing");r.type&&(e=r.type);const i=R[n][t];if(!1===i[e])return null;if(void 0===i[e])throw new Error(`Could not find a KernelValue for ${e}`);return i[e]}}},{"./kernel-value/array2":75,"./kernel-value/array3":76,"./kernel-value/array4":77,"./kernel-value/boolean":78,"./kernel-value/dynamic-html-image":80,"./kernel-value/dynamic-html-image-array":79,"./kernel-value/dynamic-html-video":81,"./kernel-value/dynamic-memory-optimized-number-texture":82,"./kernel-value/dynamic-number-texture":83,"./kernel-value/dynamic-single-array":84,"./kernel-value/dynamic-single-array1d-i":85,"./kernel-value/dynamic-single-array2d-i":86,"./kernel-value/dynamic-single-array3d-i":87,"./kernel-value/dynamic-single-input":88,"./kernel-value/dynamic-unsigned-array":89,"./kernel-value/dynamic-unsigned-input":90,"./kernel-value/float":91,"./kernel-value/html-image":93,"./kernel-value/html-image-array":92,"./kernel-value/html-video":94,"./kernel-value/integer":95,"./kernel-value/memory-optimized-number-texture":96,"./kernel-value/number-texture":97,"./kernel-value/single-array":98,"./kernel-value/single-array1d-i":99,"./kernel-value/single-array2d-i":100,"./kernel-value/single-array3d-i":101,"./kernel-value/single-input":102,"./kernel-value/unsigned-array":103,"./kernel-value/unsigned-input":104}],75:[function(e,t,n){const{WebGLKernelValueArray2:r}=e("../../web-gl/kernel-value/array2");t.exports={WebGL2KernelValueArray2:class extends r{}}},{"../../web-gl/kernel-value/array2":41}],76:[function(e,t,n){const{WebGLKernelValueArray3:r}=e("../../web-gl/kernel-value/array3");t.exports={WebGL2KernelValueArray3:class extends r{}}},{"../../web-gl/kernel-value/array3":42}],77:[function(e,t,n){const{WebGLKernelValueArray4:r}=e("../../web-gl/kernel-value/array4");t.exports={WebGL2KernelValueArray4:class extends r{}}},{"../../web-gl/kernel-value/array4":43}],78:[function(e,t,n){const{WebGLKernelValueBoolean:r}=e("../../web-gl/kernel-value/boolean");t.exports={WebGL2KernelValueBoolean:class extends r{}}},{"../../web-gl/kernel-value/boolean":44}],79:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueHTMLImageArray:i}=e("./html-image-array");t.exports={WebGL2KernelValueDynamicHTMLImageArray:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2DArray ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}updateValue(e){const{width:t,height:n}=e[0];this.checkSize(t,n),this.dimensions=[t,n,e.length],this.textureSize=[t,n],this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"./html-image-array":92}],80:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueDynamicHTMLImage:i}=e("../../web-gl/kernel-value/dynamic-html-image");t.exports={WebGL2KernelValueDynamicHTMLImage:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/dynamic-html-image":45}],81:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueDynamicHTMLImage:i}=e("./dynamic-html-image");t.exports={WebGL2KernelValueDynamicHTMLVideo:class extends i{}}},{"../../../utils":114,"./dynamic-html-image":80}],82:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueDynamicMemoryOptimizedNumberTexture:i}=e("../../web-gl/kernel-value/dynamic-memory-optimized-number-texture");t.exports={WebGL2KernelValueDynamicMemoryOptimizedNumberTexture:class extends i{getSource(){return r.linesToString([`uniform sampler2D ${this.id}`,`uniform ivec2 ${this.sizeId}`,`uniform ivec3 ${this.dimensionsId}`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/dynamic-memory-optimized-number-texture":47}],83:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueDynamicNumberTexture:i}=e("../../web-gl/kernel-value/dynamic-number-texture");t.exports={WebGL2KernelValueDynamicNumberTexture:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/dynamic-number-texture":48}],84:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueSingleArray:i}=e("../../web-gl2/kernel-value/single-array");t.exports={WebGL2KernelValueDynamicSingleArray:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}updateValue(e){this.dimensions=r.getDimensions(e,!0),this.textureSize=r.getMemoryOptimizedFloatTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"../../web-gl2/kernel-value/single-array":98}],85:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueSingleArray1DI:i}=e("../../web-gl2/kernel-value/single-array1d-i");t.exports={WebGL2KernelValueDynamicSingleArray1DI:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}updateValue(e){this.setShape(e),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"../../web-gl2/kernel-value/single-array1d-i":99}],86:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueSingleArray2DI:i}=e("../../web-gl2/kernel-value/single-array2d-i");t.exports={WebGL2KernelValueDynamicSingleArray2DI:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}updateValue(e){this.setShape(e),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"../../web-gl2/kernel-value/single-array2d-i":100}],87:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueSingleArray3DI:i}=e("../../web-gl2/kernel-value/single-array3d-i");t.exports={WebGL2KernelValueDynamicSingleArray3DI:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}updateValue(e){this.setShape(e),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"../../web-gl2/kernel-value/single-array3d-i":101}],88:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueSingleInput:i}=e("../../web-gl2/kernel-value/single-input");t.exports={WebGL2KernelValueDynamicSingleInput:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}updateValue(e){let[t,n,i]=e.size;this.dimensions=new Int32Array([t||1,n||1,i||1]),this.textureSize=r.getMemoryOptimizedFloatTextureSize(this.dimensions,this.bitRatio),this.uploadArrayLength=this.textureSize[0]*this.textureSize[1]*this.bitRatio,this.checkSize(this.textureSize[0],this.textureSize[1]),this.uploadValue=new Float32Array(this.uploadArrayLength),this.kernel.setUniform3iv(this.dimensionsId,this.dimensions),this.kernel.setUniform2iv(this.sizeId,this.textureSize),super.updateValue(e)}}}},{"../../../utils":114,"../../web-gl2/kernel-value/single-input":102}],89:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueDynamicUnsignedArray:i}=e("../../web-gl/kernel-value/dynamic-unsigned-array");t.exports={WebGL2KernelValueDynamicUnsignedArray:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/dynamic-unsigned-array":54}],90:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueDynamicUnsignedInput:i}=e("../../web-gl/kernel-value/dynamic-unsigned-input");t.exports={WebGL2KernelValueDynamicUnsignedInput:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`uniform ${e} ivec2 ${this.sizeId}`,`uniform ${e} ivec3 ${this.dimensionsId}`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/dynamic-unsigned-input":55}],91:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueFloat:i}=e("../../web-gl/kernel-value/float");t.exports={WebGL2KernelValueFloat:class extends i{}}},{"../../../utils":114,"../../web-gl/kernel-value/float":56}],92:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelArray:i}=e("../../web-gl/kernel-value/array");t.exports={WebGL2KernelValueHTMLImageArray:class extends i{constructor(e,t){super(e,t),this.checkSize(e[0].width,e[0].height),this.dimensions=[e[0].width,e[0].height,e.length],this.textureSize=[e[0].width,e[0].height]}defineTexture(){const{context:e}=this;e.activeTexture(this.contextHandle),e.bindTexture(e.TEXTURE_2D_ARRAY,this.texture),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.NEAREST)}getStringValueHandler(){return`const uploadValue_${this.name} = ${this.varName};\n`}getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2DArray ${this.id}`,`${e} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`${e} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){const{context:t}=this;t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D_ARRAY,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage3D(t.TEXTURE_2D_ARRAY,0,t.RGBA,e[0].width,e[0].height,e.length,0,t.RGBA,t.UNSIGNED_BYTE,null);for(let n=0;n<e.length;n++){const r=0,i=0,s=1;t.texSubImage3D(t.TEXTURE_2D_ARRAY,0,r,i,n,e[n].width,e[n].height,s,t.RGBA,t.UNSIGNED_BYTE,this.uploadValue=e[n])}this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"../../web-gl/kernel-value/array":40}],93:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueHTMLImage:i}=e("../../web-gl/kernel-value/html-image");t.exports={WebGL2KernelValueHTMLImage:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`${e} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`${e} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/html-image":57}],94:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGL2KernelValueHTMLImage:i}=e("./html-image");t.exports={WebGL2KernelValueHTMLVideo:class extends i{}}},{"../../../utils":114,"./html-image":93}],95:[function(e,t,n){const{WebGLKernelValueInteger:r}=e("../../web-gl/kernel-value/integer");t.exports={WebGL2KernelValueInteger:class extends r{getSource(e){const t=this.getVariablePrecisionString();return"constants"===this.origin?`const ${t} int ${this.id} = ${parseInt(e)};\n`:`uniform ${t} int ${this.id};\n`}updateValue(e){"constants"!==this.origin&&this.kernel.setUniform1i(this.id,this.uploadValue=e)}}}},{"../../web-gl/kernel-value/integer":60}],96:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueMemoryOptimizedNumberTexture:i}=e("../../web-gl/kernel-value/memory-optimized-number-texture");t.exports={WebGL2KernelValueMemoryOptimizedNumberTexture:class extends i{getSource(){const{id:e,sizeId:t,textureSize:n,dimensionsId:i,dimensions:s}=this,a=this.getVariablePrecisionString();return r.linesToString([`uniform sampler2D ${e}`,`${a} ivec2 ${t} = ivec2(${n[0]}, ${n[1]})`,`${a} ivec3 ${i} = ivec3(${s[0]}, ${s[1]}, ${s[2]})`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/memory-optimized-number-texture":61}],97:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueNumberTexture:i}=e("../../web-gl/kernel-value/number-texture");t.exports={WebGL2KernelValueNumberTexture:class extends i{getSource(){const{id:e,sizeId:t,textureSize:n,dimensionsId:i,dimensions:s}=this,a=this.getVariablePrecisionString();return r.linesToString([`uniform ${a} sampler2D ${e}`,`${a} ivec2 ${t} = ivec2(${n[0]}, ${n[1]})`,`${a} ivec3 ${i} = ivec3(${s[0]}, ${s[1]}, ${s[2]})`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/number-texture":62}],98:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray:i}=e("../../web-gl/kernel-value/single-array");t.exports={WebGL2KernelValueSingleArray:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`${e} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`${e} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flattenTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"../../web-gl/kernel-value/single-array":63}],99:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray1DI:i}=e("../../web-gl/kernel-value/single-array1d-i");t.exports={WebGL2KernelValueSingleArray1DI:class extends i{updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flattenTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"../../web-gl/kernel-value/single-array1d-i":64}],100:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray2DI:i}=e("../../web-gl/kernel-value/single-array2d-i");t.exports={WebGL2KernelValueSingleArray2DI:class extends i{updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flattenTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"../../web-gl/kernel-value/single-array2d-i":65}],101:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleArray3DI:i}=e("../../web-gl/kernel-value/single-array3d-i");t.exports={WebGL2KernelValueSingleArray3DI:class extends i{updateValue(e){if(e.constructor!==this.initialValueConstructor)return void this.onUpdateValueMismatch(e.constructor);const{context:t}=this;r.flattenTo(e,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"../../web-gl/kernel-value/single-array3d-i":66}],102:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueSingleInput:i}=e("../../web-gl/kernel-value/single-input");t.exports={WebGL2KernelValueSingleInput:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`${e} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`${e} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}updateValue(e){const{context:t}=this;r.flattenTo(e.value,this.uploadValue),t.activeTexture(this.contextHandle),t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,this.textureSize[0],this.textureSize[1],0,t.RGBA,t.FLOAT,this.uploadValue),this.kernel.setUniform1i(this.id,this.index)}}}},{"../../../utils":114,"../../web-gl/kernel-value/single-input":67}],103:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueUnsignedArray:i}=e("../../web-gl/kernel-value/unsigned-array");t.exports={WebGL2KernelValueUnsignedArray:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`${e} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`${e} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/unsigned-array":68}],104:[function(e,t,n){const{utils:r}=e("../../../utils"),{WebGLKernelValueUnsignedInput:i}=e("../../web-gl/kernel-value/unsigned-input");t.exports={WebGL2KernelValueUnsignedInput:class extends i{getSource(){const e=this.getVariablePrecisionString();return r.linesToString([`uniform ${e} sampler2D ${this.id}`,`${e} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,`${e} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`])}}}},{"../../../utils":114,"../../web-gl/kernel-value/unsigned-input":69}],105:[function(e,t,n){const{WebGLKernel:r}=e("../web-gl/kernel"),{WebGL2FunctionNode:i}=e("./function-node"),{FunctionBuilder:s}=e("../function-builder"),{utils:a}=e("../../utils"),{fragmentShader:o}=e("./fragment-shader"),{vertexShader:u}=e("./vertex-shader"),{lookupKernelValueType:l}=e("./kernel-value-maps");let h=null,c=null,p=null,d=null,m=null;t.exports={WebGL2Kernel:class extends r{static get isSupported(){return null!==h||(this.setupFeatureChecks(),h=this.isContextMatch(p)),h}static setupFeatureChecks(){"undefined"!=typeof document?c=document.createElement("canvas"):"undefined"!=typeof OffscreenCanvas&&(c=new OffscreenCanvas(0,0)),c&&(p=c.getContext("webgl2"),p&&p.getExtension&&(d={EXT_color_buffer_float:p.getExtension("EXT_color_buffer_float"),OES_texture_float_linear:p.getExtension("OES_texture_float_linear")},m=this.getFeatures()))}static isContextMatch(e){return"undefined"!=typeof WebGL2RenderingContext&&e instanceof WebGL2RenderingContext}static getFeatures(){const e=this.testContext;return Object.freeze({isFloatRead:this.getIsFloatRead(),isIntegerDivisionAccurate:this.getIsIntegerDivisionAccurate(),isSpeedTacticSupported:this.getIsSpeedTacticSupported(),kernelMap:!0,isTextureFloat:!0,isDrawBuffers:!0,channelCount:this.getChannelCount(),maxTextureSize:this.getMaxTextureSize(),lowIntPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_INT),lowFloatPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.LOW_FLOAT),mediumIntPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_INT),mediumFloatPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),highIntPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_INT),highFloatPrecision:e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT)})}static getIsTextureFloat(){return!0}static getChannelCount(){return p.getParameter(p.MAX_DRAW_BUFFERS)}static getMaxTextureSize(){return p.getParameter(p.MAX_TEXTURE_SIZE)}static lookupKernelValueType(e,t,n,r){return l(e,t,n,r)}static get testCanvas(){return c}static get testContext(){return p}static get features(){return m}static get fragmentShader(){return o}static get vertexShader(){return u}initContext(){return this.canvas.getContext("webgl2",{alpha:!1,depth:!1,antialias:!1})}initExtensions(){this.extensions={EXT_color_buffer_float:this.context.getExtension("EXT_color_buffer_float"),OES_texture_float_linear:this.context.getExtension("OES_texture_float_linear")}}validateSettings(e){if(!this.validate)return void(this.texSize=a.getKernelTextureSize({optimizeFloatMemory:this.optimizeFloatMemory,precision:this.precision},this.output));const{features:t}=this.constructor;if("single"===this.precision&&!t.isFloatRead)throw new Error("Float texture outputs are not supported");if(this.graphical||null!==this.precision||(this.precision=t.isFloatRead?"single":"unsigned"),null===this.fixIntegerDivisionAccuracy?this.fixIntegerDivisionAccuracy=!t.isIntegerDivisionAccurate:this.fixIntegerDivisionAccuracy&&t.isIntegerDivisionAccurate&&(this.fixIntegerDivisionAccuracy=!1),this.checkOutput(),!this.output||0===this.output.length){if(1!==e.length)throw new Error("Auto output only supported for kernels with only one input");const t=a.getVariableType(e[0],this.strictIntegers);switch(t){case"Array":this.output=a.getDimensions(t);break;case"NumberTexture":case"MemoryOptimizedNumberTexture":case"ArrayTexture(1)":case"ArrayTexture(2)":case"ArrayTexture(3)":case"ArrayTexture(4)":this.output=e[0].output;break;default:throw new Error("Auto output not supported for input type: "+t)}}if(this.graphical){if(2!==this.output.length)throw new Error("Output must have 2 dimensions on graphical mode");return"single"===this.precision&&(console.warn("Cannot use graphical mode and single precision at the same time"),this.precision="unsigned"),void(this.texSize=a.clone(this.output))}!this.graphical&&null===this.precision&&t.isTextureFloat&&(this.precision="single"),this.texSize=a.getKernelTextureSize({optimizeFloatMemory:this.optimizeFloatMemory,precision:this.precision},this.output),this.checkTextureSize()}translateSource(){const e=s.fromKernel(this,i,{fixIntegerDivisionAccuracy:this.fixIntegerDivisionAccuracy});this.translatedSource=e.getPrototypeString("kernel"),this.setupReturnTypes(e)}drawBuffers(){this.context.drawBuffers(this.drawBuffersMap)}getTextureFormat(){const{context:e}=this;switch(this.getInternalFormat()){case e.R32F:return e.RED;case e.RG32F:return e.RG;case e.RGBA32F:case e.RGBA:return e.RGBA;default:throw new Error("Unknown internal format")}}getInternalFormat(){const{context:e}=this;if("single"===this.precision){if(this.pipeline)switch(this.returnType){case"Number":case"Float":case"Integer":return this.optimizeFloatMemory?e.RGBA32F:e.R32F;case"Array(2)":return e.RG32F;case"Array(3)":case"Array(4)":return e.RGBA32F;default:throw new Error("Unhandled return type")}return e.RGBA32F}return e.RGBA}_setupOutputTexture(){const e=this.context;if(this.texture)return void e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.texture.texture,0);e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer);const t=e.createTexture(),n=this.texSize;e.activeTexture(e.TEXTURE0+this.constantTextureCount+this.argumentTextureCount),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const r=this.getInternalFormat();"single"===this.precision?e.texStorage2D(e.TEXTURE_2D,1,r,n[0],n[1]):e.texImage2D(e.TEXTURE_2D,0,r,n[0],n[1],0,r,e.UNSIGNED_BYTE,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),this.texture=new this.TextureConstructor({texture:t,size:n,dimensions:this.threadDim,output:this.output,context:this.context,internalFormat:this.getInternalFormat(),textureFormat:this.getTextureFormat(),kernel:this})}_setupSubOutputTextures(){const e=this.context;if(this.mappedTextures){for(let t=0;t<this.subKernels.length;t++)e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t+1,e.TEXTURE_2D,this.mappedTextures[t].texture,0);return}const t=this.texSize;this.drawBuffersMap=[e.COLOR_ATTACHMENT0],this.mappedTextures=[];for(let n=0;n<this.subKernels.length;n++){const r=this.createTexture();this.drawBuffersMap.push(e.COLOR_ATTACHMENT0+n+1),e.activeTexture(e.TEXTURE0+this.constantTextureCount+this.argumentTextureCount+n),e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const i=this.getInternalFormat();"single"===this.precision?e.texStorage2D(e.TEXTURE_2D,1,i,t[0],t[1]):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t[0],t[1],0,e.RGBA,e.UNSIGNED_BYTE,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n+1,e.TEXTURE_2D,r,0),this.mappedTextures.push(new this.TextureConstructor({texture:r,size:t,dimensions:this.threadDim,output:this.output,context:this.context,internalFormat:this.getInternalFormat(),textureFormat:this.getTextureFormat(),kernel:this}))}}_getHeaderString(){return""}_getTextureCoordinate(){const e=this.subKernels,t=this.getVariablePrecisionString(this.texSize,this.tactic);return null===e||e.length<1?`in ${t} vec2 vTexCoord;\n`:`out ${t} vec2 vTexCoord;\n`}_getMainArgumentsString(e){const t=[],n=this.argumentNames;for(let r=0;r<n.length;r++)t.push(this.kernelArguments[r].getSource(e[r]));return t.join("")}getKernelString(){const e=[this.getKernelResultDeclaration()],t=this.subKernels;if(null!==t)switch(e.push("layout(location = 0) out vec4 data0"),this.returnType){case"Number":case"Float":case"Integer":for(let n=0;n<t.length;n++){const r=t[n];e.push("Integer"===r.returnType?`int subKernelResult_${r.name} = 0`:`float subKernelResult_${r.name} = 0.0`,`layout(location = ${n+1}) out vec4 data${n+1}`)}break;case"Array(2)":for(let n=0;n<t.length;n++)e.push(`vec2 subKernelResult_${t[n].name}`,`layout(location = ${n+1}) out vec4 data${n+1}`);break;case"Array(3)":for(let n=0;n<t.length;n++)e.push(`vec3 subKernelResult_${t[n].name}`,`layout(location = ${n+1}) out vec4 data${n+1}`);break;case"Array(4)":for(let n=0;n<t.length;n++)e.push(`vec4 subKernelResult_${t[n].name}`,`layout(location = ${n+1}) out vec4 data${n+1}`)}else e.push("out vec4 data0");return a.linesToString(e)+this.translatedSource}getMainResultGraphical(){return a.linesToString(["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  data0 = actualColor"])}getMainResultPackedPixels(){switch(this.returnType){case"LiteralInteger":case"Number":case"Integer":case"Float":return this.getMainResultKernelPackedPixels()+this.getMainResultSubKernelPackedPixels();default:throw new Error(`packed output only usable with Numbers, "${this.returnType}" specified`)}}getMainResultKernelPackedPixels(){return a.linesToString(["  threadId = indexTo3D(index, uOutputDim)","  kernel()",`  data0 = ${this.useLegacyEncoder?"legacyEncode32":"encode32"}(kernelResult)`])}getMainResultSubKernelPackedPixels(){const e=[];if(!this.subKernels)return"";for(let t=0;t<this.subKernels.length;t++){"Integer"===this.subKernels[t].returnType?e.push(`  data${t+1} = ${this.useLegacyEncoder?"legacyEncode32":"encode32"}(float(subKernelResult_${this.subKernels[t].name}))`):e.push(`  data${t+1} = ${this.useLegacyEncoder?"legacyEncode32":"encode32"}(subKernelResult_${this.subKernels[t].name})`)}return a.linesToString(e)}getMainResultKernelMemoryOptimizedFloats(e,t){e.push("  threadId = indexTo3D(index, uOutputDim)","  kernel()",`  data0.${t} = kernelResult`)}getMainResultSubKernelMemoryOptimizedFloats(e,t){if(!this.subKernels)return e;for(let n=0;n<this.subKernels.length;n++){const r=this.subKernels[n];"Integer"===r.returnType?e.push(`  data${n+1}.${t} = float(subKernelResult_${r.name})`):e.push(`  data${n+1}.${t} = subKernelResult_${r.name}`)}}getMainResultKernelNumberTexture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  data0[0] = kernelResult"]}getMainResultSubKernelNumberTexture(){const e=[];if(!this.subKernels)return e;for(let t=0;t<this.subKernels.length;++t){const n=this.subKernels[t];"Integer"===n.returnType?e.push(`  data${t+1}[0] = float(subKernelResult_${n.name})`):e.push(`  data${t+1}[0] = subKernelResult_${n.name}`)}return e}getMainResultKernelArray2Texture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  data0[0] = kernelResult[0]","  data0[1] = kernelResult[1]"]}getMainResultSubKernelArray2Texture(){const e=[];if(!this.subKernels)return e;for(let t=0;t<this.subKernels.length;++t){const n=this.subKernels[t];e.push(`  data${t+1}[0] = subKernelResult_${n.name}[0]`,`  data${t+1}[1] = subKernelResult_${n.name}[1]`)}return e}getMainResultKernelArray3Texture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  data0[0] = kernelResult[0]","  data0[1] = kernelResult[1]","  data0[2] = kernelResult[2]"]}getMainResultSubKernelArray3Texture(){const e=[];if(!this.subKernels)return e;for(let t=0;t<this.subKernels.length;++t){const n=this.subKernels[t];e.push(`  data${t+1}[0] = subKernelResult_${n.name}[0]`,`  data${t+1}[1] = subKernelResult_${n.name}[1]`,`  data${t+1}[2] = subKernelResult_${n.name}[2]`)}return e}getMainResultKernelArray4Texture(){return["  threadId = indexTo3D(index, uOutputDim)","  kernel()","  data0 = kernelResult"]}getMainResultSubKernelArray4Texture(){const e=[];if(!this.subKernels)return e;for(let t=0;t<this.subKernels.length;++t)e.push(`  data${t+1} = subKernelResult_${this.subKernels[t].name}`);return e}destroyExtensions(){this.extensions.EXT_color_buffer_float=null,this.extensions.OES_texture_float_linear=null}toJSON(){const e=super.toJSON();return e.functionNodes=s.fromKernel(this,i).toJSON(),e.settings.threadDim=this.threadDim,e}}}},{"../../utils":114,"../function-builder":9,"../web-gl/kernel":70,"./fragment-shader":72,"./function-node":73,"./kernel-value-maps":74,"./vertex-shader":106}],106:[function(e,t,n){t.exports={vertexShader:"#version 300 es\n__FLOAT_TACTIC_DECLARATION__;\n__INT_TACTIC_DECLARATION__;\n__SAMPLER_2D_TACTIC_DECLARATION__;\n\nin vec2 aPos;\nin vec2 aTexCoord;\n\nout vec2 vTexCoord;\nuniform vec2 ratio;\n\nvoid main(void) {\n  gl_Position = vec4((aPos + vec2(1)) * ratio + vec2(-1), 0, 1);\n  vTexCoord = aTexCoord;\n}"}},{}],107:[function(e,t,n){const r=e("./index"),i=r.GPU;for(const e in r)r.hasOwnProperty(e)&&"GPU"!==e&&(i[e]=r[e]);function s(e){e.GPU||Object.defineProperty(e,"GPU",{get:()=>i})}"undefined"!=typeof window&&s(window),"undefined"!=typeof self&&s(self),t.exports=r},{"./index":109}],108:[function(e,t,n){const{gpuMock:r}=e("gpu-mock.js"),{utils:i}=e("./utils"),{Kernel:s}=e("./backend/kernel"),{CPUKernel:a}=e("./backend/cpu/kernel"),{HeadlessGLKernel:o}=e("./backend/headless-gl/kernel"),{WebGL2Kernel:u}=e("./backend/web-gl2/kernel"),{WebGLKernel:l}=e("./backend/web-gl/kernel"),{kernelRunShortcut:h}=e("./kernel-run-shortcut"),c=[o,u,l],p=["gpu","cpu"],d={headlessgl:o,webgl2:u,webgl:l};let m=!0;function f(e){if(!e)return{};const t=Object.assign({},e);return e.hasOwnProperty("floatOutput")&&(i.warnDeprecated("setting","floatOutput","precision"),t.precision=e.floatOutput?"single":"unsigned"),e.hasOwnProperty("outputToTexture")&&(i.warnDeprecated("setting","outputToTexture","pipeline"),t.pipeline=Boolean(e.outputToTexture)),e.hasOwnProperty("outputImmutable")&&(i.warnDeprecated("setting","outputImmutable","immutable"),t.immutable=Boolean(e.outputImmutable)),e.hasOwnProperty("floatTextures")&&(i.warnDeprecated("setting","floatTextures","optimizeFloatMemory"),t.optimizeFloatMemory=Boolean(e.floatTextures)),t}t.exports={GPU:class{static disableValidation(){m=!1}static enableValidation(){m=!0}static get isGPUSupported(){return c.some((e=>e.isSupported))}static get isKernelMapSupported(){return c.some((e=>e.isSupported&&e.features.kernelMap))}static get isOffscreenCanvasSupported(){return"undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas||"undefined"!=typeof importScripts}static get isWebGLSupported(){return l.isSupported}static get isWebGL2Supported(){return u.isSupported}static get isHeadlessGLSupported(){return o.isSupported}static get isCanvasSupported(){return"undefined"!=typeof HTMLCanvasElement}static get isGPUHTMLImageArraySupported(){return u.isSupported}static get isSinglePrecisionSupported(){return c.some((e=>e.isSupported&&e.features.isFloatRead&&e.features.isTextureFloat))}constructor(e){if(e=e||{},this.canvas=e.canvas||null,this.context=e.context||null,this.mode=e.mode,this.Kernel=null,this.kernels=[],this.functions=[],this.nativeFunctions=[],this.injectedNative=null,"dev"!==this.mode){if(this.chooseKernel(),e.functions)for(let t=0;t<e.functions.length;t++)this.addFunction(e.functions[t]);if(e.nativeFunctions)for(const t in e.nativeFunctions){if(!e.nativeFunctions.hasOwnProperty(t))continue;const n=e.nativeFunctions[t],{name:r,source:i}=n;this.addNativeFunction(r,i,n)}}}chooseKernel(){if(this.Kernel)return;let e=null;if(this.context){for(let t=0;t<c.length;t++){const n=c[t];if(n.isContextMatch(this.context)){if(!n.isSupported)throw new Error(`Kernel type ${n.name} not supported`);e=n;break}}if(null===e)throw new Error("unknown Context")}else if(this.mode){if(this.mode in d)m&&!d[this.mode].isSupported||(e=d[this.mode]);else if("gpu"===this.mode){for(let t=0;t<c.length;t++)if(c[t].isSupported){e=c[t];break}}else"cpu"===this.mode&&(e=a);if(!e)throw new Error(`A requested mode of "${this.mode}" and is not supported`)}else{for(let t=0;t<c.length;t++)if(c[t].isSupported){e=c[t];break}e||(e=a)}this.mode||(this.mode=e.mode),this.Kernel=e}createKernel(e,t){if(void 0===e)throw new Error("Missing source parameter");if("object"!=typeof e&&!i.isFunction(e)&&"string"!=typeof e)throw new Error("source parameter not a function");const n=this.kernels;if("dev"===this.mode){const i=r(e,f(t));return n.push(i),i}e="function"==typeof e?e.toString():e;const s={},o=f(t)||{};function u(t){console.warn("Falling back to CPU");const n=new a(e,{argumentTypes:p.argumentTypes,constantTypes:p.constantTypes,graphical:p.graphical,loopMaxIterations:p.loopMaxIterations,constants:p.constants,dynamicOutput:p.dynamicOutput,dynamicArgument:p.dynamicArguments,output:p.output,precision:p.precision,pipeline:p.pipeline,immutable:p.immutable,optimizeFloatMemory:p.optimizeFloatMemory,fixIntegerDivisionAccuracy:p.fixIntegerDivisionAccuracy,functions:p.functions,nativeFunctions:p.nativeFunctions,injectedNative:p.injectedNative,subKernels:p.subKernels,strictIntegers:p.strictIntegers,debug:p.debug});n.build.apply(n,t);const r=n.run.apply(n,t);return p.replaceKernel(n),r}t&&"object"==typeof t.argumentTypes&&(o.argumentTypes=Object.keys(t.argumentTypes).map((e=>t.argumentTypes[e])));const l=Object.assign({context:this.context,canvas:this.canvas,functions:this.functions,nativeFunctions:this.nativeFunctions,injectedNative:this.injectedNative,gpu:this,validate:m,onRequestFallback:u,onRequestSwitchKernel:function t(r,i,a){a.debug&&console.warn("Switching kernels");let o=null;if(a.signature&&!s[a.signature]&&(s[a.signature]=a),a.dynamicOutput)for(let e=r.length-1;e>=0;e--){const t=r[e];"outputPrecisionMismatch"===t.type&&(o=t.needed)}const l=a.constructor,h=l.getArgumentTypes(a,i),c=l.getSignature(a,h),d=s[c];if(d)return d.onActivate(a),d;const f=s[c]=new l(e,{argumentTypes:h,constantTypes:a.constantTypes,graphical:a.graphical,loopMaxIterations:a.loopMaxIterations,constants:a.constants,dynamicOutput:a.dynamicOutput,dynamicArgument:a.dynamicArguments,context:a.context,canvas:a.canvas,output:o||a.output,precision:a.precision,pipeline:a.pipeline,immutable:a.immutable,optimizeFloatMemory:a.optimizeFloatMemory,fixIntegerDivisionAccuracy:a.fixIntegerDivisionAccuracy,functions:a.functions,nativeFunctions:a.nativeFunctions,injectedNative:a.injectedNative,subKernels:a.subKernels,strictIntegers:a.strictIntegers,debug:a.debug,gpu:a.gpu,validate:m,returnType:a.returnType,tactic:a.tactic,onRequestFallback:u,onRequestSwitchKernel:t,texture:a.texture,mappedTextures:a.mappedTextures,drawBuffersMap:a.drawBuffersMap});return f.build.apply(f,i),p.replaceKernel(f),n.push(f),f}},o),c=new this.Kernel(e,l),p=h(c);return this.canvas||(this.canvas=c.canvas),this.context||(this.context=c.context),n.push(c),p}createKernelMap(){let e,t;const n=typeof arguments[arguments.length-2];if("function"===n||"string"===n?(e=arguments[arguments.length-2],t=arguments[arguments.length-1]):e=arguments[arguments.length-1],"dev"!==this.mode&&(!this.Kernel.isSupported||!this.Kernel.features.kernelMap)&&this.mode&&p.indexOf(this.mode)<0)throw new Error(`kernelMap not supported on ${this.Kernel.name}`);const r=f(t);if(t&&"object"==typeof t.argumentTypes&&(r.argumentTypes=Object.keys(t.argumentTypes).map((e=>t.argumentTypes[e]))),Array.isArray(arguments[0])){r.subKernels=[];const e=arguments[0];for(let t=0;t<e.length;t++){const n=e[t].toString(),s=i.getFunctionNameFromString(n);r.subKernels.push({name:s,source:n,property:t})}}else{r.subKernels=[];const e=arguments[0];for(let t in e){if(!e.hasOwnProperty(t))continue;const n=e[t].toString(),s=i.getFunctionNameFromString(n);r.subKernels.push({name:s||t,source:n,property:t})}}return this.createKernel(e,r)}combineKernels(){const e=arguments[arguments.length-1];if("cpu"===arguments[0].kernel.constructor.mode)return e;const t=arguments[0].canvas,n=arguments[0].context,r=arguments.length-1;for(let e=0;e<r;e++)arguments[e].setCanvas(t).setContext(n).setPipeline(!0);return function(){const t=e.apply(this,arguments);return t.toArray?t.toArray():t}}setFunctions(e){return this.functions=e,this}setNativeFunctions(e){return this.nativeFunctions=e,this}addFunction(e,t){return this.functions.push({source:e,settings:t}),this}addNativeFunction(e,t,n){if(this.kernels.length>0)throw new Error('Cannot call "addNativeFunction" after "createKernels" has been called.');return this.nativeFunctions.push(Object.assign({name:e,source:t},n)),this}injectNative(e){return this.injectedNative=e,this}destroy(){return new Promise(((e,t)=>{this.kernels||e(),setTimeout((()=>{try{for(let e=0;e<this.kernels.length;e++)this.kernels[e].destroy(!0);let e=this.kernels[0];e&&(e.kernel&&(e=e.kernel),e.constructor.destroyContext&&e.constructor.destroyContext(this.context))}catch(e){t(e)}e()}),0)}))}},kernelOrder:c,kernelTypes:p}},{"./backend/cpu/kernel":8,"./backend/headless-gl/kernel":34,"./backend/kernel":36,"./backend/web-gl/kernel":70,"./backend/web-gl2/kernel":105,"./kernel-run-shortcut":111,"./utils":114,"gpu-mock.js":4}],109:[function(e,t,n){const{GPU:r}=e("./gpu"),{alias:i}=e("./alias"),{utils:s}=e("./utils"),{Input:a,input:o}=e("./input"),{Texture:u}=e("./texture"),{FunctionBuilder:l}=e("./backend/function-builder"),{FunctionNode:h}=e("./backend/function-node"),{CPUFunctionNode:c}=e("./backend/cpu/function-node"),{CPUKernel:p}=e("./backend/cpu/kernel"),{HeadlessGLKernel:d}=e("./backend/headless-gl/kernel"),{WebGLFunctionNode:m}=e("./backend/web-gl/function-node"),{WebGLKernel:f}=e("./backend/web-gl/kernel"),{kernelValueMaps:g}=e("./backend/web-gl/kernel-value-maps"),{WebGL2FunctionNode:x}=e("./backend/web-gl2/function-node"),{WebGL2Kernel:y}=e("./backend/web-gl2/kernel"),{kernelValueMaps:b}=e("./backend/web-gl2/kernel-value-maps"),{GLKernel:T}=e("./backend/gl/kernel"),{Kernel:v}=e("./backend/kernel"),{FunctionTracer:S}=e("./backend/function-tracer"),A=e("./plugins/math-random-uniformly-distributed");t.exports={alias:i,CPUFunctionNode:c,CPUKernel:p,GPU:r,FunctionBuilder:l,FunctionNode:h,HeadlessGLKernel:d,Input:a,input:o,Texture:u,utils:s,WebGL2FunctionNode:x,WebGL2Kernel:y,webGL2KernelValueMaps:b,WebGLFunctionNode:m,WebGLKernel:f,webGLKernelValueMaps:g,GLKernel:T,Kernel:v,FunctionTracer:S,plugins:{mathRandom:A}}},{"./alias":5,"./backend/cpu/function-node":6,"./backend/cpu/kernel":8,"./backend/function-builder":9,"./backend/function-node":10,"./backend/function-tracer":11,"./backend/gl/kernel":13,"./backend/headless-gl/kernel":34,"./backend/kernel":36,"./backend/web-gl/function-node":38,"./backend/web-gl/kernel":70,"./backend/web-gl/kernel-value-maps":39,"./backend/web-gl2/function-node":73,"./backend/web-gl2/kernel":105,"./backend/web-gl2/kernel-value-maps":74,"./gpu":108,"./input":110,"./plugins/math-random-uniformly-distributed":112,"./texture":113,"./utils":114}],110:[function(e,t,n){class r{constructor(e,t){this.value=e,Array.isArray(t)?this.size=t:(this.size=new Int32Array(3),t.z?this.size=new Int32Array([t.x,t.y,t.z]):t.y?this.size=new Int32Array([t.x,t.y]):this.size=new Int32Array([t.x]));const[n,r,i]=this.size;if(i){if(this.value.length!==n*r*i)throw new Error(`Input size ${this.value.length} does not match ${n} * ${r} * ${i} = ${r*n*i}`)}else if(r){if(this.value.length!==n*r)throw new Error(`Input size ${this.value.length} does not match ${n} * ${r} = ${r*n}`)}else if(this.value.length!==n)throw new Error(`Input size ${this.value.length} does not match ${n}`)}toArray(){const{utils:t}=e("./utils"),[n,r,i]=this.size;return i?t.erectMemoryOptimized3DFloat(this.value.subarray?this.value:new Float32Array(this.value),n,r,i):r?t.erectMemoryOptimized2DFloat(this.value.subarray?this.value:new Float32Array(this.value),n,r):this.value}}t.exports={Input:r,input:function(e,t){return new r(e,t)}}},{"./utils":114}],111:[function(e,t,n){const{utils:r}=e("./utils");function i(e,t){if(t.kernel)return void(t.kernel=e);const n=r.allPropertiesOf(e);for(let r=0;r<n.length;r++){const i=n[r];"_"===i[0]&&"_"===i[1]||("function"==typeof e[i]?"add"===i.substring(0,3)||"set"===i.substring(0,3)?t[i]=function(){return t.kernel[i].apply(t.kernel,arguments),t}:t[i]=function(){return t.kernel[i].apply(t.kernel,arguments)}:(t.__defineGetter__(i,(()=>t.kernel[i])),t.__defineSetter__(i,(e=>{t.kernel[i]=e}))))}t.kernel=e}t.exports={kernelRunShortcut:function(e){let t=function(){return e.build.apply(e,arguments),t=function(){let t=e.run.apply(e,arguments);if(e.switchingKernels){const r=e.resetSwitchingKernels(),i=e.onRequestSwitchKernel(r,arguments,e);n.kernel=e=i,t=i.run.apply(i,arguments)}return e.renderKernels?e.renderKernels():e.renderOutput?e.renderOutput():t},t.apply(e,arguments)};const n=function(){return t.apply(e,arguments)};return n.exec=function(){return new Promise(((e,n)=>{try{e(t.apply(this,arguments))}catch(e){n(e)}}))},n.replaceKernel=function(t){i(e=t,n)},i(e,n),n}}},{"./utils":114}],112:[function(e,t,n){const r={name:"math-random-uniformly-distributed",onBeforeRun:e=>{e.setUniform1f("randomSeed1",Math.random()),e.setUniform1f("randomSeed2",Math.random())},functionMatch:"Math.random()",functionReplace:"nrand(vTexCoord)",functionReturnType:"Number",source:"// https://www.shadertoy.com/view/4t2SDh\n//note: uniformly distributed, normalized rand, [0,1]\nhighp float randomSeedShift = 1.0;\nhighp float slide = 1.0;\nuniform highp float randomSeed1;\nuniform highp float randomSeed2;\n\nhighp float nrand(highp vec2 n) {\n  highp float result = fract(sin(dot((n.xy + 1.0) * vec2(randomSeed1 * slide, randomSeed2 * randomSeedShift), vec2(12.9898, 78.233))) * 43758.5453);\n  randomSeedShift = result;\n  if (randomSeedShift > 0.5) {\n    slide += 0.00009; \n  } else {\n    slide += 0.0009;\n  }\n  return result;\n}"};t.exports=r},{}],113:[function(e,t,n){t.exports={Texture:class{constructor(e){const{texture:t,size:n,dimensions:r,output:i,context:s,type:a="NumberTexture",kernel:o,internalFormat:u,textureFormat:l}=e;if(!i)throw new Error('settings property "output" required.');if(!s)throw new Error('settings property "context" required.');if(!t)throw new Error('settings property "texture" required.');if(!o)throw new Error('settings property "kernel" required.');this.texture=t,t._refs?t._refs++:t._refs=1,this.size=n,this.dimensions=r,this.output=i,this.context=s,this.kernel=o,this.type=a,this._deleted=!1,this.internalFormat=u,this.textureFormat=l}toArray(){throw new Error(`Not implemented on ${this.constructor.name}`)}clone(){throw new Error(`Not implemented on ${this.constructor.name}`)}delete(){throw new Error(`Not implemented on ${this.constructor.name}`)}clear(){throw new Error(`Not implemented on ${this.constructor.name}`)}}}},{}],114:[function(e,t,n){const r=e("acorn"),{Input:i}=e("./input"),{Texture:s}=e("./texture"),a=/function ([^(]*)/,o=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,u=/([^\s,]+)/g,l={systemEndianness:()=>d,getSystemEndianness(){const e=new ArrayBuffer(4),t=new Uint32Array(e),n=new Uint8Array(e);if(t[0]=3735928559,239===n[0])return"LE";if(222===n[0])return"BE";throw new Error("unknown endianness")},isFunction:e=>"function"==typeof e,isFunctionString:e=>"string"==typeof e&&"function"===e.slice(0,"function".length).toLowerCase(),getFunctionNameFromString(e){const t=a.exec(e);return t&&0!==t.length?t[1].trim():null},getFunctionBodyFromString:e=>e.substring(e.indexOf("{")+1,e.lastIndexOf("}")),getArgumentNamesFromString(e){const t=e.replace(o,"");let n=t.slice(t.indexOf("(")+1,t.indexOf(")")).match(u);return null===n&&(n=[]),n},clone(e){if(null===e||"object"!=typeof e||e.hasOwnProperty("isActiveClone"))return e;const t=e.constructor();for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&(e.isActiveClone=null,t[n]=l.clone(e[n]),delete e.isActiveClone);return t},isArray:e=>!isNaN(e.length),getVariableType(e,t){if(l.isArray(e))return e.length>0&&"IMG"===e[0].nodeName?"HTMLImageArray":"Array";switch(e.constructor){case Boolean:return"Boolean";case Number:return t&&Number.isInteger(e)?"Integer":"Float";case s:return e.type;case i:return"Input"}if("nodeName"in e)switch(e.nodeName){case"IMG":case"CANVAS":return"HTMLImage";case"VIDEO":return"HTMLVideo"}else{if(e.hasOwnProperty("type"))return e.type;if("undefined"!=typeof OffscreenCanvas&&e instanceof OffscreenCanvas)return"OffscreenCanvas";if("undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap)return"ImageBitmap";if("undefined"!=typeof ImageData&&e instanceof ImageData)return"ImageData"}return"Unknown"},getKernelTextureSize(e,t){let[n,r,i]=t,s=(n||1)*(r||1)*(i||1);return e.optimizeFloatMemory&&"single"===e.precision&&(n=s=Math.ceil(s/4)),r>1&&n*r===s?new Int32Array([n,r]):l.closestSquareDimensions(s)},closestSquareDimensions(e){const t=Math.sqrt(e);let n=Math.ceil(t),r=Math.floor(t);for(;n*r<e;)n--,r=Math.ceil(e/n);return new Int32Array([r,Math.ceil(e/r)])},getMemoryOptimizedFloatTextureSize(e,t){const n=l.roundTo((e[0]||1)*(e[1]||1)*(e[2]||1)*(e[3]||1),4)/t;return l.closestSquareDimensions(n)},getMemoryOptimizedPackedTextureSize(e,t){const[n,r,i]=e,s=l.roundTo((n||1)*(r||1)*(i||1),4)/(4/t);return l.closestSquareDimensions(s)},roundTo:(e,t)=>Math.floor((e+t-1)/t)*t,getDimensions(e,t){let n;if(l.isArray(e)){const t=[];let r=e;for(;l.isArray(r);)t.push(r.length),r=r[0];n=t.reverse()}else if(e instanceof s)n=e.output;else{if(!(e instanceof i))throw new Error(`Unknown dimensions of ${e}`);n=e.size}if(t)for(n=Array.from(n);n.length<3;)n.push(1);return new Int32Array(n)},flatten2dArrayTo(e,t){let n=0;for(let r=0;r<e.length;r++)t.set(e[r],n),n+=e[r].length},flatten3dArrayTo(e,t){let n=0;for(let r=0;r<e.length;r++)for(let i=0;i<e[r].length;i++)t.set(e[r][i],n),n+=e[r][i].length},flatten4dArrayTo(e,t){let n=0;for(let r=0;r<e.length;r++)for(let i=0;i<e[r].length;i++)for(let s=0;s<e[r][i].length;s++)t.set(e[r][i][s],n),n+=e[r][i][s].length},flattenTo(e,t){l.isArray(e[0])?l.isArray(e[0][0])?l.isArray(e[0][0][0])?l.flatten4dArrayTo(e,t):l.flatten3dArrayTo(e,t):l.flatten2dArrayTo(e,t):t.set(e)},splitArray(e,t){const n=[];for(let r=0;r<e.length;r+=t)n.push(new e.constructor(e.buffer,4*r+e.byteOffset,t));return n},getAstString(e,t){const n=Array.isArray(e)?e:e.split(/\r?\n/g),r=t.loc.start,i=t.loc.end,s=[];if(r.line===i.line)s.push(n[r.line-1].substring(r.column,i.column));else{s.push(n[r.line-1].slice(r.column));for(let e=r.line;e<i.line;e++)s.push(n[e]);s.push(n[i.line-1].slice(0,i.column))}return s.join("\n")},allPropertiesOf(e){const t=[];do{t.push.apply(t,Object.getOwnPropertyNames(e))}while(e=Object.getPrototypeOf(e));return t},linesToString:e=>e.length>0?e.join(";\n")+";\n":"\n",warnDeprecated(e,t,n){n?console.warn(`You are using a deprecated ${e} "${t}". It has been replaced with "${n}". Fixing, but please upgrade as it will soon be removed.`):console.warn(`You are using a deprecated ${e} "${t}". It has been removed. Fixing, but please upgrade as it will soon be removed.`)},flipPixels:(e,t,n)=>{const r=n/2|0,i=4*t,s=new Uint8ClampedArray(4*t),a=e.slice(0);for(let e=0;e<r;++e){const t=e*i,r=(n-e-1)*i;s.set(a.subarray(t,t+i)),a.copyWithin(t,r,r+i),a.set(s,r)}return a},erectPackedFloat:(e,t)=>e.subarray(0,t),erect2DPackedFloat:(e,t,n)=>{const r=new Array(n);for(let i=0;i<n;i++){const n=i*t,s=n+t;r[i]=e.subarray(n,s)}return r},erect3DPackedFloat:(e,t,n,r)=>{const i=new Array(r);for(let s=0;s<r;s++){const r=new Array(n);for(let i=0;i<n;i++){const a=s*n*t+i*t,o=a+t;r[i]=e.subarray(a,o)}i[s]=r}return i},erectMemoryOptimizedFloat:(e,t)=>e.subarray(0,t),erectMemoryOptimized2DFloat:(e,t,n)=>{const r=new Array(n);for(let i=0;i<n;i++){const n=i*t;r[i]=e.subarray(n,n+t)}return r},erectMemoryOptimized3DFloat:(e,t,n,r)=>{const i=new Array(r);for(let s=0;s<r;s++){const r=new Array(n);for(let i=0;i<n;i++){const a=s*n*t+i*t;r[i]=e.subarray(a,a+t)}i[s]=r}return i},erectFloat:(e,t)=>{const n=new Float32Array(t);let r=0;for(let i=0;i<t;i++)n[i]=e[r],r+=4;return n},erect2DFloat:(e,t,n)=>{const r=new Array(n);let i=0;for(let s=0;s<n;s++){const n=new Float32Array(t);for(let r=0;r<t;r++)n[r]=e[i],i+=4;r[s]=n}return r},erect3DFloat:(e,t,n,r)=>{const i=new Array(r);let s=0;for(let a=0;a<r;a++){const r=new Array(n);for(let i=0;i<n;i++){const n=new Float32Array(t);for(let r=0;r<t;r++)n[r]=e[s],s+=4;r[i]=n}i[a]=r}return i},erectArray2:(e,t)=>{const n=new Array(t),r=4*t;let i=0;for(let t=0;t<r;t+=4)n[i++]=e.subarray(t,t+2);return n},erect2DArray2:(e,t,n)=>{const r=new Array(n),i=4*t;for(let s=0;s<n;s++){const n=new Array(t),a=s*i;let o=0;for(let t=0;t<i;t+=4)n[o++]=e.subarray(t+a,t+a+2);r[s]=n}return r},erect3DArray2:(e,t,n,r)=>{const i=4*t,s=new Array(r);for(let a=0;a<r;a++){const r=new Array(n);for(let s=0;s<n;s++){const o=new Array(t),u=a*i*n+s*i;let l=0;for(let t=0;t<i;t+=4)o[l++]=e.subarray(t+u,t+u+2);r[s]=o}s[a]=r}return s},erectArray3:(e,t)=>{const n=new Array(t),r=4*t;let i=0;for(let t=0;t<r;t+=4)n[i++]=e.subarray(t,t+3);return n},erect2DArray3:(e,t,n)=>{const r=4*t,i=new Array(n);for(let s=0;s<n;s++){const n=new Array(t),a=s*r;let o=0;for(let t=0;t<r;t+=4)n[o++]=e.subarray(t+a,t+a+3);i[s]=n}return i},erect3DArray3:(e,t,n,r)=>{const i=4*t,s=new Array(r);for(let a=0;a<r;a++){const r=new Array(n);for(let s=0;s<n;s++){const o=new Array(t),u=a*i*n+s*i;let l=0;for(let t=0;t<i;t+=4)o[l++]=e.subarray(t+u,t+u+3);r[s]=o}s[a]=r}return s},erectArray4:(e,t)=>{const n=new Array(e),r=4*t;let i=0;for(let t=0;t<r;t+=4)n[i++]=e.subarray(t,t+4);return n},erect2DArray4:(e,t,n)=>{const r=4*t,i=new Array(n);for(let s=0;s<n;s++){const n=new Array(t),a=s*r;let o=0;for(let t=0;t<r;t+=4)n[o++]=e.subarray(t+a,t+a+4);i[s]=n}return i},erect3DArray4:(e,t,n,r)=>{const i=4*t,s=new Array(r);for(let a=0;a<r;a++){const r=new Array(n);for(let s=0;s<n;s++){const o=new Array(t),u=a*i*n+s*i;let l=0;for(let t=0;t<i;t+=4)o[l++]=e.subarray(t+u,t+u+4);r[s]=o}s[a]=r}return s},flattenFunctionToString:(e,t)=>{const{findDependency:n,thisLookup:i,doNotDefine:s}=t;let a=t.flattened;a||(a=t.flattened={});const o=r.parse(e),u=[];let h=0;const c=function e(t){if(Array.isArray(t)){const n=[];for(let r=0;r<t.length;r++)n.push(e(t[r]));return n.join("")}switch(t.type){case"Program":return e(t.body)+("VariableDeclaration"===t.body[0].type?";":"");case"FunctionDeclaration":return`function ${t.id.name}(${t.params.map(e).join(", ")}) ${e(t.body)}`;case"BlockStatement":{const n=[];h+=2;for(let r=0;r<t.body.length;r++){const i=e(t.body[r]);i&&n.push(" ".repeat(h)+i,";\n")}return h-=2,`{\n${n.join("")}}`}case"VariableDeclaration":const r=l.normalizeDeclarations(t).map(e).filter((e=>null!==e));return r.length<1?"":`${t.kind} ${r.join(",")}`;case"VariableDeclarator":if(t.init.object&&"ThisExpression"===t.init.object.type){return i(t.init.property.name,!0)?`${t.id.name} = ${e(t.init)}`:null}return`${t.id.name} = ${e(t.init)}`;case"CallExpression":if("subarray"===t.callee.property.name)return`${e(t.callee.object)}.${e(t.callee.property)}(${t.arguments.map((t=>e(t))).join(", ")})`;if("gl"===t.callee.object.name||"context"===t.callee.object.name)return`${e(t.callee.object)}.${e(t.callee.property)}(${t.arguments.map((t=>e(t))).join(", ")})`;if("ThisExpression"===t.callee.object.type)return u.push(n("this",t.callee.property.name)),`${t.callee.property.name}(${t.arguments.map((t=>e(t))).join(", ")})`;if(t.callee.object.name){const r=n(t.callee.object.name,t.callee.property.name);return null===r?`${t.callee.object.name}.${t.callee.property.name}(${t.arguments.map((t=>e(t))).join(", ")})`:(u.push(r),`${t.callee.property.name}(${t.arguments.map((t=>e(t))).join(", ")})`)}if("MemberExpression"===t.callee.object.type)return`${e(t.callee.object)}.${t.callee.property.name}(${t.arguments.map((t=>e(t))).join(", ")})`;throw new Error("unknown ast.callee");case"ReturnStatement":return`return ${e(t.argument)}`;case"BinaryExpression":return`(${e(t.left)}${t.operator}${e(t.right)})`;case"UnaryExpression":return t.prefix?`${t.operator} ${e(t.argument)}`:`${e(t.argument)} ${t.operator}`;case"ExpressionStatement":return`${e(t.expression)}`;case"SequenceExpression":return`(${e(t.expressions)})`;case"ArrowFunctionExpression":return`(${t.params.map(e).join(", ")}) => ${e(t.body)}`;case"Literal":return t.raw;case"Identifier":return t.name;case"MemberExpression":return"ThisExpression"===t.object.type?i(t.property.name):t.computed?`${e(t.object)}[${e(t.property)}]`:e(t.object)+"."+e(t.property);case"ThisExpression":return"this";case"NewExpression":return`new ${e(t.callee)}(${t.arguments.map((t=>e(t))).join(", ")})`;case"ForStatement":return`for (${e(t.init)};${e(t.test)};${e(t.update)}) ${e(t.body)}`;case"AssignmentExpression":return`${e(t.left)}${t.operator}${e(t.right)}`;case"UpdateExpression":return`${e(t.argument)}${t.operator}`;case"IfStatement":return`if (${e(t.test)}) ${e(t.consequent)}`;case"ThrowStatement":return`throw ${e(t.argument)}`;case"ObjectPattern":return t.properties.map(e).join(", ");case"ArrayPattern":return t.elements.map(e).join(", ");case"DebuggerStatement":return"debugger;";case"ConditionalExpression":return`${e(t.test)}?${e(t.consequent)}:${e(t.alternate)}`;case"Property":if("init"===t.kind)return e(t.key)}throw new Error(`unhandled ast.type of ${t.type}`)}(o);if(u.length>0){const e=[];for(let n=0;n<u.length;n++){const r=u[n];a[r]||(a[r]=!0),r&&e.push(l.flattenFunctionToString(r,t)+"\n")}return e.join("")+c}return c},normalizeDeclarations:e=>{if("VariableDeclaration"!==e.type)throw new Error('Ast is not of type "VariableDeclaration"');const t=[];for(let n=0;n<e.declarations.length;n++){const r=e.declarations[n];if(r.id&&"ObjectPattern"===r.id.type&&r.id.properties){const{properties:e}=r.id;for(let n=0;n<e.length;n++){const i=e[n];if("ObjectPattern"===i.value.type&&i.value.properties)for(let e=0;e<i.value.properties.length;e++){const n=i.value.properties[e];if("Property"!==n.type)throw new Error("unexpected state");t.push({type:"VariableDeclarator",id:{type:"Identifier",name:n.key.name},init:{type:"MemberExpression",object:{type:"MemberExpression",object:r.init,property:{type:"Identifier",name:i.key.name},computed:!1},property:{type:"Identifier",name:n.key.name},computed:!1}})}else{if("Identifier"!==i.value.type)throw new Error("unexpected state");t.push({type:"VariableDeclarator",id:{type:"Identifier",name:i.value&&i.value.name?i.value.name:i.key.name},init:{type:"MemberExpression",object:r.init,property:{type:"Identifier",name:i.key.name},computed:!1}})}}}else if(r.id&&"ArrayPattern"===r.id.type&&r.id.elements){const{elements:e}=r.id;for(let n=0;n<e.length;n++){const i=e[n];if("Identifier"!==i.type)throw new Error("unexpected state");t.push({type:"VariableDeclarator",id:{type:"Identifier",name:i.name},init:{type:"MemberExpression",object:r.init,property:{type:"Literal",value:n,raw:n.toString(),start:i.start,end:i.end},computed:!0}})}}else t.push(r)}return t},splitHTMLImageToRGB:(e,t)=>{const n=e.createKernel((function(e){return 255*e[this.thread.y][this.thread.x].r}),{output:[t.width,t.height],precision:"unsigned",argumentTypes:{a:"HTMLImage"}}),r=e.createKernel((function(e){return 255*e[this.thread.y][this.thread.x].g}),{output:[t.width,t.height],precision:"unsigned",argumentTypes:{a:"HTMLImage"}}),i=e.createKernel((function(e){return 255*e[this.thread.y][this.thread.x].b}),{output:[t.width,t.height],precision:"unsigned",argumentTypes:{a:"HTMLImage"}}),s=e.createKernel((function(e){return 255*e[this.thread.y][this.thread.x].a}),{output:[t.width,t.height],precision:"unsigned",argumentTypes:{a:"HTMLImage"}}),a=[n(t),r(t),i(t),s(t)];return a.rKernel=n,a.gKernel=r,a.bKernel=i,a.aKernel=s,a.gpu=e,a},splitRGBAToCanvases:(e,t,n,r)=>{const i=e.createKernel((function(e){const t=e[this.thread.y][this.thread.x];this.color(t.r/255,0,0,255)}),{output:[n,r],graphical:!0,argumentTypes:{v:"Array2D(4)"}});i(t);const s=e.createKernel((function(e){const t=e[this.thread.y][this.thread.x];this.color(0,t.g/255,0,255)}),{output:[n,r],graphical:!0,argumentTypes:{v:"Array2D(4)"}});s(t);const a=e.createKernel((function(e){const t=e[this.thread.y][this.thread.x];this.color(0,0,t.b/255,255)}),{output:[n,r],graphical:!0,argumentTypes:{v:"Array2D(4)"}});a(t);const o=e.createKernel((function(e){const t=e[this.thread.y][this.thread.x];this.color(255,255,255,t.a/255)}),{output:[n,r],graphical:!0,argumentTypes:{v:"Array2D(4)"}});return o(t),[i.canvas,s.canvas,a.canvas,o.canvas]},getMinifySafeName:e=>{try{const t=r.parse(`const value = ${e.toString()}`),{init:n}=t.body[0].declarations[0];return n.body.name||n.body.body[0].argument.name}catch(e){throw new Error("Unrecognized function type.  Please use `() => yourFunctionVariableHere` or function() { return yourFunctionVariableHere; }")}},sanitizeName:function(e){return h.test(e)&&(e=e.replace(h,"S_S")),c.test(e)?e=e.replace(c,"U_U"):p.test(e)&&(e=e.replace(p,"u_u")),e}},h=/\$/,c=/__/,p=/_/,d=l.getSystemEndianness();t.exports={utils:l}},{"./input":110,"./texture":113,acorn:1}]},{},[107])(107)}));

// Path: anvil.js
const ANVIL = (() => {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 
/**
 * Used to amplify the sound of a media element
 * https://cwestblog.com/2017/08/17/html5-getting-more-volume-from-the-web-audio-api/
 *
 * @param mediaElem Media element to apply gain on
 * @param multiplier % to amplify sound
 * @returns All relevant data for the amplified media
 */
function amplifyMedia(mediaElem, multiplier) {
    var context = new (window.AudioContext), result = {
        context: context,
        source: context.createMediaElementSource(mediaElem),
        gain: context.createGain(),
        media: mediaElem,
        amplify: function (multiplier) { result.gain.gain.value = multiplier; },
        getAmpLevel: function () { return result.gain.gain.value; }
    };
    result.source.connect(result.gain);
    result.gain.connect(context.destination);
    result.amplify(multiplier);
    return result;
}
// Used for rendering lights onto a scene, called each pixel and calculates the brightness of the pixel based on the lights in the scene
/**
 * Used for rendering lights onto a scene, called each pixel and calculates the brightness of the pixel based on the lights in the scene
 * @param pix Uint8ClampedArray of the pixels of the canvas
 * @param width Width of the canvas
 * @param height Height of the canvas
 * @param lights Array of lights in the scene (formatted)
 * @param numLights Number of lights in the scene
 * @param dlights Array of directional lights in the scene (formatted)
 * @param numDlights Number of directional lights in the scene
 * @param ambient Ambient lighting in the scene
 * @param fog Constant that defines how lights spread in the scene
 * @param globalAlpha Contant transparency of the scene
 */
function GPULightingKernel(pix, width, height, lights, numLights, dlights, numDlights, ambient, fog, globalAlpha) {
    // aliases for coordinates (loop friendly)
    var i = this.thread.y;
    var j = this.thread.x;
    // calculates the rows down from the top of the canvas
    var rowsDown = height - i;
    // calculates the pixel number
    var pixNum = ((width * rowsDown) + j) * 4;
    // initial brightness (format is r,g,b)
    var brightness = [ambient, ambient, ambient];
    // loop over each light, calculate brightness of each pixel based on proximity to the light, how far the light spreads (diffuse), and the strength of the light
    for (var k = 0; k < numLights; k++) {
        var ln = k * 7;
        var attenuation = (1 - Math.pow(Math.min(distance([j, i], [lights[ln], height - lights[ln + 1]]), lights[ln + 3]) / lights[ln + 3], fog));
        var strength = lights[ln + 2];
        brightness[0] += attenuation * strength * (lights[ln + 4] / 255);
        brightness[1] += attenuation * strength * (lights[ln + 5] / 255);
        brightness[2] += attenuation * strength * (lights[ln + 6] / 255);
    }
    // loops over each directional light, calculates brightness of each pixel based on proximity to the light, how far the light spreads (diffuse), the angle of the light, and the strength of the light
    for (var d = 0; d < numDlights; d++) {
        var ln = d * 9;
        var angle = dlights[ln];
        var lightDir = angle;
        var lightX = dlights[ln + 1];
        var lightY = dlights[ln + 2];
        var intensity = dlights[ln + 3];
        var diffuse = dlights[ln + 4];
        var spread = dlights[ln + 5];
        var redL = dlights[ln + 6];
        var greenL = dlights[ln + 7];
        var blueL = dlights[ln + 8];
        var dirX = this.thread.x - lightX;
        var dirY = this.thread.y - (height - lightY);
        var dist = Math.sqrt(dirX * dirX + dirY * dirY);
        var angleToLight = (Math.atan2(dirY, dirX) + 2 * Math.PI) % (2 * Math.PI);
        var angleDiff = Math.acos(Math.cos(angleToLight - lightDir));
        // if the pixel is within the spread of the light, calculate the brightness of the pixel
        if (angleDiff <= spread / 2) {
            var diffuseFactor = Math.max(0, Math.cos(angleDiff) * (1 - (dist / diffuse)));
            brightness[0] += diffuseFactor * intensity * (redL / 255);
            brightness[1] += diffuseFactor * intensity * (greenL / 255);
            brightness[2] += diffuseFactor * intensity * (blueL / 255);
        }
    }
    // apply brightness to the pixel
    var red = ((pix[pixNum] / 255) * brightness[0]) * globalAlpha;
    var green = ((pix[pixNum + 1] / 255) * brightness[1]) * globalAlpha;
    var blue = ((pix[pixNum + 2] / 255) * brightness[2]) * globalAlpha;
    var alpha = (pix[pixNum + 3] / 255) * globalAlpha;
    // return the color
    this.color(red, green, blue, alpha);
}
// checks if a polygon is convex
/**
 * Checks if a polygon is convex
 *
 * @param points List of points that make up the polygon
 * @returns Returns true of the polygon is convex, false if it is concave
 */
function isConvex(points) {
    if (points.length < 3) {
        // A polygon must have at least 3 points
        return false;
    }
    function crossProduct(p1, p2, p3) {
        // Cross product of vectors (p2 - p1) and (p3 - p2)
        return (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0]);
    }
    var signDetected = false;
    var foundSign = '';
    for (var i = 0; i < points.length; i++) {
        var p1 = points[i];
        var p2 = points[(i + 1) % points.length];
        var p3 = points[(i + 2) % points.length];
        var crossProductResult = crossProduct(p1, p2, p3);
        if (crossProductResult !== 0) {
            // Check if the sign of the cross product changes
            if (signDetected === false) {
                foundSign = crossProductResult > 0 ? 'positive' : 'negative';
                signDetected = true;
            }
            else {
                if ((crossProductResult > 0 && foundSign === 'negative') ||
                    (crossProductResult < 0 && foundSign === 'positive')) {
                    // If the sign changes again, the polygon is concave
                    return false;
                }
            }
        }
    }
    // If no sign change is detected, the polygon is convex
    return true;
}
/**
 * Checks to see if a light is a directional light or not
 *
 * @param light Light instnace to check
 * @returns Returns true if the light is a directional light, false if it is not
 */
function instanceOfDirectionalLight(light) {
    return light.angle !== undefined;
}
// gets the centroid of a polygon
/**
 * Finds the centroid of the polygon
 *
 * @param points List of points that make up the polygon
 * @returns Returns the centroid of the polygon
 */
function getCentroid(points) {
    var x = 0, y = 0;
    for (var i = 0; i < points.length; i++) {
        x += points[i][0];
        y += points[i][1];
    }
    return [x / points.length, y / points.length];
}
// calculates FPS based on a buffer
/**
 * Calculates FPS of the scene based on a buffer of timestamps
 *
 * @param buffer Array of numbers that represent the time between frames
 * @param FPS_BUFFER_LENGTH How long the buffer should be before an accurate FPS can be calculated
 * @returns FPS of the scene
 */
function calculateFPS(buffer, FPS_BUFFER_LENGTH) {
    if (FPS_BUFFER_LENGTH === void 0) { FPS_BUFFER_LENGTH = 60; }
    buffer = buffer.map(function (t) {
        var seconds = 1000 / t;
        return seconds;
    });
    var average = function (array) { return array.reduce(function (a, b) { return a + b; }) / array.length; };
    if (buffer.length < FPS_BUFFER_LENGTH)
        return "--";
    return Math.round(average(buffer));
}
// gets the top left most point of a polygon
/**
 * Finds the top left most point of a given polyogon
 *
 * @param points List of points that make up the polygon
 * @returns Returns the top left most point of the polygon
 */
function findTopLeftMostPoint(points) {
    if (points.length === 0) {
        throw new Error('Points array must not be empty');
    }
    // Initialize with the first point
    var topLeftMost = points[0];
    // Iterate through the rest of the points
    for (var i = 1; i < points.length; i++) {
        var currentPoint = points[i];
        // Compare x-coordinates first
        if (currentPoint[0] < topLeftMost[0]) {
            // If the current point's x-coordinate is smaller, update topLeftMost
            topLeftMost = currentPoint;
        }
        else if (currentPoint[0] === topLeftMost[0]) {
            // If x-coordinates are equal, compare y-coordinates
            if (currentPoint[1] < topLeftMost[1]) {
                // If the current point's y-coordinate is smaller, update topLeftMost
                topLeftMost = currentPoint;
            }
        }
        // If the x-coordinate is greater, no need to update
    }
    return topLeftMost;
}
// checks to see if a polygon is a square
/**
 * Checks to see if a given polygon is a square (used for collision detection)
 *
 * @param points List of points that make up the polygon
 * @returns Returns true if the polygon is a square, false if it is not
 */
function isSquare(points) {
    if (points.length !== 4)
        return false;
    // Assuming points is an array of 4 points
    var sideLengths = [
        distance(points[0], points[1]),
        distance(points[1], points[2]),
        distance(points[2], points[3]),
        distance(points[3], points[0])
    ];
    // A square has 4 equal side lengths, Set() removes duplicates
    var uniqueSideLengths = new Set(sideLengths);
    return uniqueSideLengths.size === 1;
}
// gets the distance between two points
/**
 * Gets the distance between two points
 *
 * @param point1 The first point
 * @param point2 The second point
 * @returns The distance between the points
 */
function distance(point1, point2) {
    return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}
// calculates the bounding box of a polygon based on a set of vertices
/**
 * Calculates the bounding box of a polygon based on a set of vertices
 *
 * @param vertices List of vertices that make up the polygon
 * @returns An array representing the bounding box of the polygon
 */
function getBoundingBox(vertices) {
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;
    for (var _i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
        var vertex = vertices_1[_i];
        minX = Math.min(minX, vertex.x);
        minY = Math.min(minY, vertex.y);
        maxX = Math.max(maxX, vertex.x);
        maxY = Math.max(maxY, vertex.y);
    }
    return [minX, minY, maxX, maxY];
}
// adds the elements of two arrays together
/**
 * Adds up multiple arrays
 *
 * @param arrays List of arrays to add together
 * @returns The arrays, each element summed with the corresponding element of the other arrays
 */
function sumArrays() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var n = arrays.reduce(function (max, xs) { return Math.max(max, xs.length); }, 0);
    var result = Array.from({ length: n });
    return result.map(function (_, i) { return arrays.map(function (xs) { return xs[i] || 0; }).reduce(function (sum, x) { return sum + x; }, 0); });
}
// multiplies the elements of two arrays together
/**
 * Multiples the elements of two arrays together
 *
 * @param arrays List of arrays to multiply together
 * @returns The arrays, each element multiplied with the corresponding element of the other arrays
 */
function multArrays() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var n = arrays.reduce(function (max, xs) { return Math.max(max, xs.length); }, 0);
    var result = Array.from({ length: n });
    return result.map(function (_, i) { return arrays.map(function (xs) { return xs[i] || 0; }).reduce(function (sum, x) { return sum * x; }, 1); });
}
// generates a unique identifier
/**
 * Generates a unique identifier
 *
 * @returns A unique identifier
 */
function uid() {
    var d = new Date().getTime(), d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
}
;
// checks to see if two polygons are colliding (used for convex polygons)
/**
 * Checks to see if two polygons are intersecting (used for convex polygons)
 *
 * @param poly1 The first polygon
 * @param poly2 The second polygon
 * @returns True if the polygons are colliding, false otherwise
 */
function checkSquareCollision(poly1, poly2) {
    // Helper function to get the axes of a polygon
    function getAxes(poly) {
        var axes = [];
        for (var i = 0; i < poly.length; i++) {
            var p1 = poly[i];
            var p2 = i + 1 < poly.length ? poly[i + 1] : poly[0];
            var edge = [p2[0] - p1[0], p2[1] - p1[1]];
            var perpendicular = [-edge[1], edge[0]]; // Perpendicular vector
            axes.push(perpendicular);
        }
        return axes;
    }
    // generates a projection of the polygon onto an axis
    function project(poly, axis) {
        var min = Infinity;
        var max = -Infinity;
        for (var _i = 0, poly_1 = poly; _i < poly_1.length; _i++) {
            var point = poly_1[_i];
            var dotProduct = point[0] * axis[0] + point[1] * axis[1];
            min = Math.min(min, dotProduct);
            max = Math.max(max, dotProduct);
        }
        return { min: min, max: max };
    }
    // checks to see if two projections overlap
    function overlap(projection1, projection2) {
        return (projection1.max >= projection2.min && projection2.max >= projection1.min);
    }
    // get the axes of each polygon
    var axes1 = getAxes(poly1);
    var axes2 = getAxes(poly2);
    // loop over each axis of each polygon
    for (var _i = 0, _a = __spreadArray(__spreadArray([], axes1, true), axes2, true); _i < _a.length; _i++) {
        var axis = _a[_i];
        // calculate the projection of each polygon onto the axis
        var projection1 = project(poly1, axis);
        var projection2 = project(poly2, axis);
        // check if the projections overlap
        if (!overlap(projection1, projection2)) {
            // If there is any axis of separation, the polygons do not intersect
            return false;
        }
    }
    // If no separating axis is found, the polygons intersect
    return true;
}
// checks if a point is inside a polygon (not good for collision detection (does not check for edges intersecting) use checkSquareCollision()
/**
 * Used for concave collision detection, not good for collision detection (does not check for edges intersecting) use checkSquareCollision()
 * @param polygon The polygon to check
 * @param pointsArray List of point to check against the polygon
 * @returns True if any of the points lie inside the polygon
 */
function checkCollision(polygon, pointsArray) {
    // Ensure the polygon has at least 3 points
    if (polygon.length < 3) {
        throw new Error('Polygon must have at least 3 points');
        return false;
    }
    // Helper function to check if a point is on the left side of a line
    function isOnLeftSide(lineStart, lineEnd, testPoint) {
        return ((lineEnd[0] - lineStart[0]) * (testPoint[1] - lineStart[1]) -
            (testPoint[0] - lineStart[0]) * (lineEnd[1] - lineStart[1]));
    }
    // Loop over each point in the array
    for (var _i = 0, pointsArray_1 = pointsArray; _i < pointsArray_1.length; _i++) {
        var point = pointsArray_1[_i];
        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var vertex1 = polygon[i];
            var vertex2 = polygon[j];
            if ((vertex1[1] > point[1]) !== (vertex2[1] > point[1]) &&
                point[0] <
                    ((vertex2[0] - vertex1[0]) * (point[1] - vertex1[1])) /
                        (vertex2[1] - vertex1[1]) +
                        vertex1[0]) {
                inside = !inside;
            }
            // Check if the test point lies on an edge of the polygon
            if (isOnLeftSide(vertex1, vertex2, point) === 0 &&
                point[0] >= Math.min(vertex1[0], vertex2[0]) &&
                point[0] <= Math.max(vertex1[0], vertex2[0]) &&
                point[1] >= Math.min(vertex1[1], vertex2[1]) &&
                point[1] <= Math.max(vertex1[1], vertex2[1])) {
                return true; // Return true if any point is on an edge
            }
        }
        if (inside) {
            return true; // Return true if any point is inside the polygon
        }
    }
    return false; // Return false if none of the points are inside the polygon
}
/**
 * @class GameObject
 * @classdesc Base class for all objects in the scene
 * @property {boolean} physicsEnabled - boolean if physics is enabled on the object
 * @property {PhysicsOptions} physicsOptions - options for the physics engine
 * @property {string} id - unique ID for each object
 * @property {Array<number>} bounds - how the object is bounded in the scene (set with scene.setBoundaries())
 * @property {boolean} boundsActive - are the bounds active on this object?
 * @property {boolean} pinned - does nothing!
 * @property {Object} _state - used for state() and returnState(), builds states that are returnable. Stacking two states is destructive.
 * @property {boolean} square - True if the object is a square, false otherwise
 * @property {Vec2} hitbox - Hitbox of the object, if the object is a square
 * @property {any} body - reference to the physics body (matter.js). Empty if physics is not enabled
 * @property {Array<Vec2>} points - points of the object (used for collision detection)
 * @property {Vec2} coordinates - coordinates of the object, or the top left most point of the object
 * @property {string} type - Type of the object, either "gameObject", "sprite", or "polygon"
 * @property {boolean} convex - true if the object is convex, false otherwise
 * @property {any} [key: string] - any other properties that are added to the object
 * @property {GameObjectOptions} gameObjectOptions - Game object options of the game object (for serialization and recreation)
 * @property {any} meta - Meta data of the object
 * @property {boolean} isLocalPlayer - True if the object is the local player, false otherwise
 * @property {Array<GameObject>} blocks - List of objects that this object blocks
 * @property {Array<GameObject>} blockedBy - List of objects that block this object
 * @property {"coordinates" | "center"} pinRef - Reference point to pin the object to (only applies if the object is pinned)
 * @example
 * ```js
 *  const gameObject = new GameObject({
 *      physicsEnabled: true,
 *      physicsOptions: {
 *          restitution: 0.5
 *     }
 *  });
 * ```
 * @example
 * ```js
 *  const gameObject = new GameObject();
 * ```
 */
var GameObject = /** @class */ (function () {
    /**
     *
     * @param options GameObjectOptions to initialize the object with
     */
    function GameObject(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.gameObjectOptions = options;
        this.physicsEnabled = options.physicsEnabled || false;
        this.physicsOptions = options.physicsOptions || {};
        if (this.physicsEnabled) {
            this.body = {};
        }
        this.id = options.id || uid();
        this.bounds = options.bounds || [0, 0];
        this.boundsActive = options.boundsActive || false;
        this.pinned = null;
        this._state = options._state || {};
        this.square = options.square || false; // assume the worst
        this.hitbox = options.hitbox || [0, 0];
        this.points = options.points || [];
        this.coordinates = options.coordinates || [0, 0];
        this.type = options.type || "gameObject";
        this.convex = options.convex || false; // assume the worst
        this.meta = options.meta || {};
        this.isLocalPlayer = false;
        this.blocks = options.blocks || [];
        this.blockedBy = [];
        this.pinRef = "coordinates";
        this.blocks.forEach(function (object) {
            object.blockedBy.push(_this);
        });
    }
    GameObject.From = function (options) {
        var object;
        switch (options.type) {
            case "sprite":
                object = new Sprite(options.gameObjectOptions);
                break;
            case "polygon":
                object = new Polygon(options.gameObjectOptions);
                break;
            default:
                object = new GameObject(options.gameObjectOptions);
                break;
        }
        object.physicsEnabled = options.physicsEnabled || false;
        object.physicsOptions = options.physicsOptions || {};
        object.bounds = options.bounds || [0, 0];
        object.boundsActive = options.boundsActive || false;
        object._state = options._state;
        object.square = options.square || false;
        object.hitbox = options.hitbox || [0, 0];
        object.points = options.points || [[0, 0]];
        object.coordinates = options.coordinates || [0, 0];
        object.type = options.type || "gameObject";
        object.convex = options.convex || false;
        object.gameObjectOptions = options.gameObjectOptions || {};
        object.meta = options.meta || {};
        return object;
    };
    /**
     * Returns the object as a JSON object
     * @returns The object as a JSON object
     */
    GameObject.prototype.serialize = function () {
        return {
            // return all data that is crucial for recreating the object
            physicsEnabled: this.physicsEnabled,
            physicsOptions: this.physicsOptions,
            bounds: this.bounds,
            boundsActive: this.boundsActive,
            _state: this._state,
            square: this.square,
            hitbox: this.hitbox,
            points: this.points,
            coordinates: this.coordinates,
            type: this.type,
            convex: this.convex,
            gameObjectOptions: this.gameObjectOptions,
            meta: this.meta
        };
    };
    /**
     * Changes an attribute of the object (non destructive). To return to the original object, use returnState. Used for clicking
     *
     * @param attr The attribute to change
     * @param value The new value of that attribute
     */
    GameObject.prototype.state = function (attr, value) {
        var _this = this;
        Object.keys(this).forEach(function (key) {
            if (key == "_state")
                return;
            _this._state[key] = _this[key];
        });
        this[attr] = value;
    };
    /**
     * Returns to the old state (before state() was called). Used for clicking
     */
    GameObject.prototype.returnState = function () {
        var _this = this;
        Object.keys(this._state).forEach(function (key) {
            _this[key] = _this._state[key];
        });
    };
    /**
     * Updates object physics 1 tick
     */
    GameObject.prototype.updatePhysics = function () {
        var vertices = this.body.vertices;
        if (this.square) {
            var width = (vertices[0].x - 10) - (vertices[1].x + 10);
            var height = (vertices[0].y - 10) - (vertices[1].y + 10);
            this.hitbox = [width, height];
            if (this.type == "sprite") {
                this.coordinates = [this.body.bounds.min.x, this.body.bounds.min.y];
                this.points = this.body.vertices.map(function (v) {
                    return [v.x, v.y];
                });
            }
            else if (this.type == "polygon") {
                this.points = this.body.vertices.map(function (v) {
                    return [v.x, v.y];
                });
                this.coordinates = findTopLeftMostPoint(this.points);
            }
        }
        else {
            this.points = this.body.vertices.map(function (v) {
                return [v.x, v.y];
            });
            this.coordinates = findTopLeftMostPoint(this.points);
        }
    };
    /**
     * Applies a force to the object (only works if physics enabled)
     *
     * @param vector The force vector to apply to the object
     */
    GameObject.prototype.applyForce = function (vector) {
        var vec = Matter.Vector.create(vector[0], vector[1]);
        Matter.Body.applyForce(this.body, this.body.position, vec);
    };
    /**
     * Removes the pinned object
     */
    GameObject.prototype.unpin = function () {
        this.pinned = null;
    };
    /**
     * Modifies pin to a game object
     *
     * @param object The game object to pin to
     * @param to The reference point to pin to (either "center" or "coordinates")
     */
    GameObject.prototype.pin = function (object, to) {
        this.pinned = object;
        this.pinRef = to;
    };
    /**
     * Returns the gameobject represented as an array of points.
     * @returns An array of points (eg: objects bounds). used for collision detection
     */
    GameObject.prototype.polify = function () {
        return [];
    };
    /**
     * Returns the gameobject represented as an array of points, with an offset applied.
     *
     * @param offset The offset to apply to the object
     * @returns List of points that make up the object, with the offset applied
     */
    GameObject.prototype.polifyWithOffset = function (offset) {
        return [];
    };
    /**
     * Draws the object's label on top of the object
     * The label is the objects meta label (eg: object.meta.label = "...")
     *
     * @param options The DrawOptions for the object
     */
    GameObject.prototype.drawLabel = function (options) {
        if (options.ctx) {
            options.ctx.font = "15px Arial";
            options.ctx.fillStyle = this.backgroundColor || "black";
            options.ctx.textAlign = "center";
            options.ctx.fillText((this.meta) ? this.meta.label || "" : "", getCentroid(this.polify())[0] - options.camera[0], getCentroid(this.polify())[1] - (this.getHeight() / 2) - 15 - options.camera[1]);
        }
    };
    /**
     * Draws the object on the provided drawing context, in accordance with the camera position. This is handled automatically with scene and scene managers
     *
     * @param options The DrawOptions for the object
     */
    GameObject.prototype.draw = function (options) {
        if (this.meta && this.meta.showLabel)
            this.drawLabel(options);
    };
    /**
     * Sets the object's bounds (where it can move)
     * @param bounds The bounds to set the object to
     */
    GameObject.prototype.setBounds = function (bounds) {
        this.bounds = bounds;
        this.boundsActive = true;
    };
    /**
     * Disables bounds on that object
     */
    GameObject.prototype.disableBounds = function () {
        this.boundsActive = false;
    };
    /**
     * Activates bounds on that object
     */
    GameObject.prototype.activateBounds = function () {
        this.boundsActive = true;
    };
    /**
     * Moves an object that has physics enabled by a vector (no forces pr boundaries involved)
     *
     * @param vector The vector to move the object by
     * @returns Whether the object was moved or not (if it was out of bounds, it will not move)
     */
    GameObject.prototype.moveStatic = function (vector) {
        if (!this.physicsEnabled)
            return this.move(vector);
        var newX = this.body.position.x + vector[0];
        var newY = this.body.position.y + vector[1];
        Matter.Body.setPosition(this.body, Matter.Vector.create(newX, newY));
        return true;
    };
    /**
     * Top level move function (works with both physics enabled and disabled)... needs helper functions getWidth(), getHeight() to be defined. Recommended to re-write based on your use case (if extending)
     * @param vector Vector to move the object by
     * @param continueAfterPhysics If set to false, the object will not move if physics are not enabled. If true, the object will move if physics are not enabled. True by defualt
     * @returns Boolean, true if the move was successful, false if it was not (if it was out of bounds, it will not move)
     */
    GameObject.prototype.move = function (vector, continueAfterPhysics) {
        var _this = this;
        if (continueAfterPhysics === void 0) { continueAfterPhysics = true; }
        var newCoords = sumArrays(this.coordinates, vector);
        var newPoly = this.polifyWithOffset(vector);
        // check to see if the object is colliding with any objects in `blockedBy`
        for (var _i = 0, _a = this.blockedBy; _i < _a.length; _i++) {
            var object = _a[_i];
            if (object.checkPolygonalCollision(newPoly)) {
                return false;
            }
        }
        if (this.physicsEnabled) {
            Matter.Body.setVelocity(this.body, { x: vector[0] + this.body.velocity.x, y: vector[1] + this.body.velocity.y });
            return true;
        }
        else {
            if (!continueAfterPhysics)
                return false;
        }
        if (this.boundsActive) {
            if (newPoly.some(function (point) { return point[0] < 0 || point[0] > _this.bounds[0] || point[1] < 0 || point[1] > _this.bounds[1]; })) {
                return false;
            }
            else {
                this.coordinates = newCoords;
                return true;
            }
        }
        else {
            this.coordinates = newCoords;
            return true;
        }
    };
    /**
     * Checks for a collision with another object
     *
     * @param object The object to check for a collision with
     * @returns Boolean, true of the object is colliding with the other object, false otherwise
     */
    GameObject.prototype.checkCollision = function (object) {
        var p1 = this.polify();
        var p2 = object.polify();
        if ((this.square || this.convex) && (object.square || object.convex)) {
            return checkSquareCollision(p1, p2);
        }
        else {
            return checkCollision(p1, p2);
        }
    };
    /**
     * Checks for a collision with a polygon
     *
     * @param polygon The polygon (lower case, not type Polygon) to check for a collision with
     * @returns Boolean, true of the object is colliding with the other object, false otherwise
     */
    GameObject.prototype.checkPolygonalCollision = function (polygon) {
        var p1 = this.polify();
        var p2 = polygon;
        var square = isSquare(p2);
        var convex = isConvex(p2);
        if ((this.square || this.convex) && (square || convex)) {
            return checkSquareCollision(p1, p2);
        }
        else {
            return checkCollision(p1, p2);
        }
    };
    /**
     * Does nothing
     */
    GameObject.prototype.update = function () {
        if (this.pinned) {
            if (this.pinRef == "center") {
                var centroid = getCentroid(this.polify());
                var pinnedCentroid = getCentroid(this.pinned.polify());
                var vector = [pinnedCentroid[0] - centroid[0], pinnedCentroid[1] - centroid[1]];
                this.moveStatic(vector);
            }
            else {
                this.coordinates = this.pinned.coordinates;
            }
        }
    };
    GameObject.prototype.initialize = function (scene) {
    };
    GameObject.prototype.moveTo = function (point) {
        this.coordinates = point;
    };
    return GameObject;
}());
/**
 * @class Polygon
 * @classdesc Polygon class, used for rendering polygons
 * @property {Array<Point>} points - points of the polygon
 * @property {string} backgroundColor - background color of the polygon
 * @property {Vec2} coordinates - coordinates of the polygon, or the top left most point of the polygon
 * @property {boolean} convex - true if the polygon is convex, false otherwise
 * @property {boolean} square - true if the polygon is a square, false otherwise
 * @property {Vec2} hitbox - hitbox of the polygon, if the polygon is a square
 * @property {string} type - type of the object, either "gameObject", "sprite", or "polygon"
 * @example
 * ```js
 *  const polygon = new Polygon({
 *      points: [[0, 0], [0, 100], [100, 100], [100, 0]],
 *      backgroundColor: "red"
 *  });
 * ```
 */
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    /**
     *
     * @param options PolygonOptions to initialize the polygon with
     */
    function Polygon(options) {
        var _this = _super.call(this, options) || this;
        _this.type = "polygon";
        _this.points = options.points;
        if (_this.points.length < 3) {
            throw new Error("Polygon must have at least 3 points");
        }
        _this.backgroundColor = options.backgroundColor;
        _this.coordinates = findTopLeftMostPoint(_this.points);
        _this.convex = isConvex(_this.points);
        _this.square = isSquare(_this.points);
        if (_this.square) {
            _this.hitbox = [_this.points[0][0] - _this.points[1][0], _this.points[0][1] - _this.points[1][1]];
        }
        return _this;
    }
    /**
     * Sets the hitbox of the polygon. Useful if the polygon is concave and you need more reliable collision detection.
     * @param width The width of the hitbox
     * @param height The height of the hitbox
     * @example
     * ```js
     * const polygon = new Polygon({
     *      points: [[0, 0], [0, 100], [100, 100], [100, 0]],
     *      backgroundColor: "red"
     * });
     * polygon.setHitBox(polygon.getWidth(), polygon.getHeight());
     * ```
     */
    Polygon.prototype.setHitBox = function (width, height) {
        this.hitbox = [width, height];
        this.square = true;
    };
    /**
     * Draws the polygon onto the provided drawing context. This is handled automatically with scene and scene managers
     * @param options The DrawOptions for the object
     */
    Polygon.prototype.draw = function (options) {
        _super.prototype.draw.call(this, options);
        var ctx = options.ctx, camera = options.camera;
        ctx.fillStyle = this.backgroundColor;
        ctx.beginPath();
        ctx.moveTo(this.points[0][0] - camera[0], this.points[0][1] - camera[1]);
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            ctx.lineTo(point[0] - camera[0], point[1] - camera[1]);
        }
        ctx.closePath();
        ctx.fill();
    };
    /**
     * Returns the vertices of the polygon.
     * @returns The vertices of the polygon
     */
    Polygon.prototype.polify = function () {
        return this.points;
    };
    /**
     * Returns a list of points that make up the polygon, with an offset applied.
     *
     * @param offset The offset to apply to the polygon
     * @returns The vertices of the polygon, with the offset applied
     */
    Polygon.prototype.polifyWithOffset = function (offset) {
        var newPoints = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            newPoints.push(sumArrays(point, offset));
        }
        return newPoints;
    };
    /**
     * Calculates the width of the polygon.
     * @returns The width of the polygon.
     */
    Polygon.prototype.getWidth = function () {
        var points = this.points;
        // Initialize min and max X-coordinates with the first point
        var minX = points[0][0];
        var maxX = points[0][0];
        // Iterate through the rest of the points to find the min and max X-coordinates
        for (var i = 1; i < points.length; i++) {
            var x = points[i][0];
            // Update minX and maxX if needed
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
        }
        // Calculate and return the width
        var width = maxX - minX;
        return width;
    };
    /**
     * Calculates the height of the polygon.
     * @returns The height of the polygon.
     */
    Polygon.prototype.getHeight = function () {
        var points = this.points;
        // Initialize min and max Y-coordinates with the first point
        var minY = points[0][1];
        var maxY = points[0][1];
        // Iterate through the rest of the points to find the min and max Y-coordinates
        for (var i = 1; i < points.length; i++) {
            var y = points[i][1];
            // Update minY and maxY if needed
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        // Calculate and return the height
        var height = maxY - minY;
        return height;
    };
    /**
     * Moves the polygon
     *
     * @param vector The vector to move the polygon by
     * @returns Boolean, true if the move was successful, false if it was not (if it was out of bounds, it will not move)
     */
    Polygon.prototype.move = function (vector) {
        var moved = _super.prototype.move.call(this, vector);
        if (!moved)
            return false;
        var newPoints = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var newCoords = sumArrays(point, vector);
            if (this.boundsActive) {
                if (newCoords[0] >= 0 && newCoords[0] <= this.bounds[0] && newCoords[1] >= 0 && newCoords[1] <= this.bounds[1]) {
                    newPoints.push(newCoords);
                }
                else {
                    newPoints = this.points;
                    break;
                }
            }
            else {
                newPoints.push(newCoords);
            }
        }
        this.points = newPoints;
        this.coordinates = findTopLeftMostPoint(this.points);
        return moved;
    };
    /**
     * Moves the polygon to a point as apposed to moving it by a vector
     *
     * @param point The point in space to move the polygon to
     * @returns True
     */
    Polygon.prototype.moveTo = function (point) {
        var newPoints = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            newPoints.push(sumArrays(p, sumArrays(point, multArrays([-1, -1], this.coordinates))));
        }
        this.points = newPoints;
        this.coordinates = findTopLeftMostPoint(this.points);
        return true;
    };
    return Polygon;
}(GameObject));
/**
 * @class Sprite
 * @classdesc Sprite class, used for rendering sprites
 * @property {string} image - url of the image to use for the sprite
 * @property {HTMLImageElement} source - the image element to use for the sprite
 * @property {Vec2} coordinates - coordinates of the sprite, or the top left most point of the sprite
 * @property {boolean} spriteLoaded - true if the sprite is loaded, false otherwise
 * @property {number} width - width of the sprite
 * @property {number} height - height of the sprite
 * @property {string} type - type of the object, either "gameObject", "sprite", or "polygon"
 * @example
 * ```js
 * const sprite = new Sprite({
 *      url: "https://i.imgur.com/9Nc8fFp.png",
 *      coordinates: [0, 0],
 *      width: 100,
 *      height: 100
 * });
 * ```
 */
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    /**
     *
     * @param options SpriteOptions to initialize the sprite with
     */
    function Sprite(options) {
        var _this = _super.call(this, options) || this;
        _this.type = "sprite";
        _this.image = options.url;
        _this.coordinates = options.coordinates;
        _this.width = options.width;
        _this.height = options.height;
        _this.square = true;
        _this.hitbox = [_this.width, _this.height];
        _this.source = new Image(_this.width, _this.height);
        _this.spriteLoaded = false;
        _this.reload();
        return _this;
    }
    /**
     * @returns The width of the sprite
     */
    Sprite.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * @returns The height of the sprite
     */
    Sprite.prototype.getHeight = function () {
        return this.height;
    };
    /**
     * Loads the sprite, or reloads the image source when the image is changed
     */
    Sprite.prototype.reload = function () {
        var _this = this;
        // this.source.crossOrigin = "anonymous";
        this.source.src = this.image;
        this.source.onload = function () {
            _this.spriteLoaded = true;
        };
    };
    /**
     * Draws the sprite onto the provided drawing context. This is handled automatically with scene and scene managers
     *
     * @param options The DrawOptions for the object
     */
    Sprite.prototype.draw = function (options) {
        if (!this.spriteLoaded)
            return;
        _super.prototype.draw.call(this, options);
        var ctx = options.ctx, camera = options.camera;
        if (!this.angle || this.angle == 0) {
            ctx.drawImage(this.source, this.coordinates[0] - camera[0], this.coordinates[1] - camera[1], this.width, this.height);
        }
        else {
            var c = getCentroid(this.polify());
            var _a = [c[0] - camera[0], c[1] - camera[1]], x = _a[0], y = _a[1];
            var rotation = (this.body && this.body.angle) ? this.body.angle || this.angle || 0 : this.angle || 0;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.drawImage(this.source, -this.getWidth() / 2, -this.getHeight() / 2, this.getHeight(), this.getWidth());
            ctx.restore();
        }
    };
    /**
     * Reshapes the sprite according to the provided dimensions
     *
     * @param width The new width of the sprite
     * @param height The new height of the sprite
     */
    Sprite.prototype.reshape = function (width, height) {
        this.width = width;
        this.height = height;
        this.hitbox = [this.width, this.height];
    };
    /**
     * Scales the sprite by the provided factor. 1 is the default size, 2 is twice the size, 0.5 is half the size, etc.
     * @param factor The factor to scale the sprite by
     */
    Sprite.prototype.scale = function (factor) {
        this.width = this.width * factor;
        this.height = this.height * factor;
        this.hitbox = [this.width, this.height];
    };
    /**
     * Changes the sprites image source
     *
     * @param image The new image URL to use for the sprite
     */
    Sprite.prototype.changeSource = function (image) {
        this.image = image;
        this.reload();
    };
    /**
     * Calculates the vertices of the sprite
     * @returns The vertices of the sprite
     */
    Sprite.prototype.polify = function () {
        var point1 = [this.coordinates[0], this.coordinates[1]];
        var point2 = [this.coordinates[0] + this.width, this.coordinates[1]];
        var point3 = [this.coordinates[0] + this.width, this.coordinates[1] + this.height];
        var point4 = [this.coordinates[0], this.coordinates[1] + this.height];
        return [point1, point2, point3, point4];
    };
    /**
     * Calculates the vertices of the sprite, with an offset applied
     *
     * @param offset The offset to apply to the sprite
     * @returns The vertices of the sprite, with the offset applied
     */
    Sprite.prototype.polifyWithOffset = function (offset) {
        var points = this.polify();
        var newPoints = [];
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            newPoints.push(sumArrays(point, offset));
        }
        return newPoints;
    };
    return Sprite;
}(GameObject));
/**
 * @class Particle
 * @classdesc Particle class, renders a single particle
 * @property {number} speed - The speed of the particles (in pixels per tick)
 * @property {number} life - The life of the particles (in milliseconds)
 * @property {number} angle - The angle of the particles (in radians)
 * @property {number} spawnedAt - The time the particle was spawned
 */
var Particle = /** @class */ (function (_super) {
    __extends(Particle, _super);
    function Particle(options, childOpts) {
        var _this = _super.call(this, options) || this;
        _this.type = "particle_child";
        _this.speed = childOpts.speed;
        _this.life = childOpts.life;
        _this.angle = childOpts.angle;
        _this.spawnedAt = performance.now();
        return _this;
    }
    Particle.prototype.update = function () {
        _super.prototype.update.call(this);
        this.move([this.speed * Math.cos(this.angle), this.speed * Math.sin(this.angle)]);
    };
    Particle.prototype.draw = function (options) {
        _super.prototype.draw.call(this, options);
    };
    return Particle;
}(Sprite));
/**
 * @class Particles
 * @classdesc Particles class, used for rendering particles
 * @property {number} spread - The spread of the particles (in radians)
 * @property {number} speed - The speed of the particles (in pixels per tick)
 * @property {number} life - The life of the particles (in milliseconds)
 * @property {Array<Particle>} children - The children of the particles (each particle object)
 * @property {number} lifeVariability - The variability of the life of the particles (in milliseconds)
 * @example
 * ```js
 *  const particles = new Particles({
 *      url: "https://i.imgur.com/9Nc8fFp.png",
 *      coordinates: [0, 0],
 *      width: 100,
 *      height: 100,
 *      spread: Math.PI * 2,
 *      speed: 1,
 *      life: 500,
 *      angle: Math.PI / 2,
 *      lifeVariability: 0,
 *      spawnRate: 50
 *  });
 */
var Particles = /** @class */ (function (_super) {
    __extends(Particles, _super);
    function Particles(options) {
        var _this = _super.call(this, options) || this;
        _this.type = "particle";
        _this.spread = options.spread || Math.PI * 2;
        _this.speed = options.speed || 1;
        _this.life = options.life || 500;
        _this.children = [];
        _this.spawnRate = options.spawnRate || 50;
        _this.angle = options.angle || 0;
        _this.lifeVariability = options.lifeVariability || 0;
        _this.spawn();
        return _this;
    }
    /**
     * Spawns a number (n) of particles
     *
     * @param n The number of particles to spawn
     */
    Particles.prototype.spawn = function (n) {
        var _this = this;
        if (n === void 0) { n = 1; }
        for (var i = 0; i < n; i++) {
            var angle = (Math.random() * this.spread - this.spread / 2) - (this.angle);
            var child = new Particle({
                url: this.image,
                coordinates: this.coordinates,
                width: this.width,
                height: this.height,
            }, {
                angle: angle,
                speed: this.speed,
                life: this.life * (1 + Math.random() * this.lifeVariability - this.lifeVariability / 2)
            });
            this.children.push(child);
        }
        if (this.spawnRate >= 10) {
            setTimeout(function () {
                _this.spawn();
            }, this.spawnRate);
        }
        else {
            setTimeout(function () {
                _this.spawn(Math.floor(10 / _this.spawnRate));
            });
        }
    };
    /**
     * Updates all of the particles
     */
    Particles.prototype.update = function () {
        _super.prototype.update.call(this);
        this.children = this.children.filter(function (child) {
            return performance.now() - child.spawnedAt < child.life;
        });
    };
    /**
     * Draws all of the particles
     *
     * @param drawOptions The DrawOptions for the object
     */
    Particles.prototype.draw = function (drawOptions) {
        this.children.forEach(function (child) {
            child.update();
            child.draw(drawOptions);
        });
    };
    return Particles;
}(Sprite));
/**
 * @class Text
 * @classdesc Text class, used for rendering text
 * @property {string} text - The text to render
 * @property {Point} coordinates - The coordinates of the text
 * @property {string} font - The font of the text, eg: "Arial", "Times New Roman", etc.
 * @property {number} fontSize - The font size of the text, in pixels
 * @property {string} color - The color of the text, in hex or rgb format
 * @property {string} type - The type of the object, "text"
 * @example
 * ```js
 *  const text = new Text({
 *      text: "Hello, World!",
 *      coordinates: [0, 0],
 *      font: "Arial",
 *      fontSize: 20,
 *      color: "black"
 *  });
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(options) {
        var _this = _super.call(this, options) || this;
        _this.text = options.text;
        _this.coordinates = options.coordinates;
        _this.font = options.font;
        _this.fontSize = options.fontSize;
        _this.color = options.color;
        _this.ctx = null;
        _this.type = "text";
        return _this;
    }
    ;
    /**
     * Draws the text onto the provided drawing context. This is handled automatically with scene and scene managers
     *
     * @param options DrawOptions for the object
     */
    Text.prototype.draw = function (options) {
        if (!options.ctx)
            return;
        this.ctx = options.ctx;
        this.ctx.font = "".concat(this.fontSize, "px ").concat(this.font);
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, this.coordinates[0] - options.camera[0], this.coordinates[1] - options.camera[1]);
    };
    /**
     * Gets the width, as rendered, of the text
     *
     * @param scene The scene that the text is in
     * @returns The width of the text, in pixels
     */
    Text.prototype.getWidth = function (scene) {
        if (!scene && !this.ctx)
            return 0;
        if (scene) {
            if (!scene.readyToDraw)
                return 0;
            this.ctx = scene.ctx;
        }
        if (!this.ctx)
            return 0;
        this.ctx.font = "".concat(this.fontSize, "px ").concat(this.font);
        return this.ctx.measureText(this.text).width;
    };
    /**
     * Gets the height, as rendered, of the text
     *
     * @param scene The scene that the text is in
     * @returns The height of the text, in pixels
     */
    Text.prototype.getHeight = function (scene) {
        if (!scene && !this.ctx)
            return 0;
        if (scene) {
            if (!scene.readyToDraw)
                return 0;
            this.ctx = scene.ctx;
        }
        if (!this.ctx)
            return 0;
        this.ctx.font = "".concat(this.fontSize, "px ").concat(this.font);
        return this.ctx.measureText(this.text).actualBoundingBoxAscent;
    };
    /**
     * Gets a list of points representing the bounding box of the text
     *
     * @returns A list of points representing the bounding box of the text
     */
    Text.prototype.polify = function () {
        return [
            [this.coordinates[0], this.coordinates[1]],
            [this.coordinates[0] + this.getWidth(null), this.coordinates[1]],
            [this.coordinates[0] + this.getWidth(null), this.coordinates[1] + this.getHeight(null)],
            [this.coordinates[0], this.coordinates[1] + this.getHeight(null)]
        ];
    };
    return Text;
}(GameObject));
/**
 * @class Light
 * @classdesc Light class, used for creating lights in the scene
 * @property {Point} point - Coordinates of the light
 * @property {number} diffuse - How much the light diffuses (measured in pixels)
 * @property {number} strength - Strength of the light. No matter how strong it is, it will never go past the bounds defined by diffuse
 * @property {Array<number>} color - Color of the light. Format is [r,g,b]. White by default
 * @property {string} type - Type of the light, either "light" or "directional"
 * @property {GameObject} pinnedTo - Object to pin the light's position to. Null by default.
 * @example
 * ```js
 * // light at position [0, 0], diffuse 100, strength 0.8, color [255, 255, 255] (white)
 * const light = new Light([0, 0], 100, 0.8, [255, 255, 255]);
 * ```
 * @example
 * // light at position [0, 0], diffuse 150, defualt strength (0.8), defualt color (white)
 * const light = new Light([0, 0], 150);
 */
var Light = /** @class */ (function () {
    /**
     *
     * @param position The position of the light in wolrd space [x,y]
     * @param diffuse How far the light diffuses, in pixels
     * @param strength The strength of the light. Default is 0.8
     * @param color The color of the light, [r,g,b]. By defualt is [255, 255, 255] (white)
     */
    function Light(position, diffuse, strength, color) {
        if (strength === void 0) { strength = 0.8; }
        if (color === void 0) { color = [255, 255, 255]; }
        if (typeof color != "object" || color.length != 3)
            throw new Error("Light color format is [r,g,b]");
        this.point = position;
        this.type = "light";
        this.diffuse = diffuse;
        this.strength = strength;
        this.color = color;
        this.pinnedTo = null;
    }
    /**
     * Pins the light's position to a certain GameObject
     * @param object The GameObject to pin the light to
     */
    Light.prototype.pin = function (object) {
        this.pinnedTo = object;
    };
    /**
     * Brightens the light by the specified factor
     *
     * @param factor The factor to brighten the light by
     */
    Light.prototype.brighten = function (factor) {
        this.strength *= factor;
    };
    /**
     * Dims the light by the specified factor
     *
     * @param factor The factor to dim the light by
     */
    Light.prototype.dim = function (factor) {
        this.strength /= factor;
    };
    /**
     * Moves the light by the specified vector
     * @param vector The vector to move the light by
     * @example
     * ```js
     * const light = new Light([0, 0], 0.5);
     * light.move([10, 10]); // moves the light ten pixels to the right and ten pixels down
     */
    Light.prototype.move = function (vector) {
        this.point = sumArrays(this.point, vector);
    };
    /**
     * Moves the light to the center of the specified GameObject (Good for things like lanterns, etc.)
     *
     * @param object GameObject to move the light's position to
     */
    Light.prototype.moveToObject = function (object) {
        var sumOfX = 0;
        var sumOfY = 0;
        object.polify().forEach(function (point) {
            sumOfX += point[0];
            sumOfY += point[1];
        });
        var a1 = sumOfX / object.polify().length;
        var a2 = sumOfY / object.polify().length;
        var middleOfObject = [a1, a2];
        this.point = [middleOfObject[0], middleOfObject[1]];
    };
    /**
     * Updates the light's position if pinned to an object, otherwise does nothing
     * @param canvas The canvas to draw the light on (Optional).
     */
    Light.prototype.update = function (canvas) {
        if (this.pinnedTo) {
            this.moveToObject(this.pinnedTo);
        }
    };
    return Light;
}());
/**
 * @class DirectionalLight
 * @classdesc DirectionalLight class, used for creating directional lights in the scene
 * @property {Point} point - Coordinates of the light
 * @property {number} diffuse - How much the light diffuses (measured in pixels)
 * @property {number} strength - Strength of the light. No matter how strong it is, it will never go past the bounds defined by diffuse
 * @property {Array<number>} color - Color of the light. Format is [r,g,b]. White by default
 * @property {string} type - Type of the light, either "light" or "directional"
 * @property {number} angle - Angle of the light (in radians)
 * @property {number} spread - Spread of the light (in radians)
 * @property {GameObject} pinnedToAngle - Object to pin the light's angle to. Null by default.
 * @beta
 * @devnote Directional lights are not fully implemented yet. They are not recommended for use.
 * @example
 * ```js
 * // light at position [0, 0], diffuse 150, strength 0.8, color [255, 255, 255] (white)
 * const light = new DirectionalLight([0, 0], 150, 0.8, [255, 255, 255]);
 * ```
 */
var DirectionalLight = /** @class */ (function (_super) {
    __extends(DirectionalLight, _super);
    /**
     *
     * @param position Position of the light in the world. [x,y]
     * @param angle Angle of the light, in radians
     * @param spread The spread of the light, in radians
     * @param diffuse How far the light diffuses, in pixels
     * @param strength The strength of the light.
     * @param color The color of the light, [r,g,b]. By defualt is [255, 255, 255] (white)
     */
    function DirectionalLight(position, angle, spread, diffuse, strength, color) {
        if (color === void 0) { color = [255, 255, 255]; }
        var _this = _super.call(this, position, diffuse, strength, color) || this;
        if (typeof color != "object" || color.length != 3)
            throw new Error("Light color format is [r,g,b]");
        _this.point = position;
        _this.diffuse = diffuse;
        _this.strength = strength;
        _this.color = color;
        _this.angle = angle;
        _this.type = "directional";
        _this.spread = spread;
        _this.pinnedToAngle = null;
        return _this;
    }
    /**
     * Point the light to a certain object
     * @param object Object to point the light to
     * @param canvas Canvas that the light is being rendered on (used for calculating the angle)
     */
    DirectionalLight.prototype.pointTo = function (object, canvas) {
        var sumOfX = 0;
        var sumOfY = 0;
        object.polify().forEach(function (point) {
            sumOfX += point[0];
            sumOfY += point[1];
        });
        var a1 = sumOfX / object.polify().length;
        var a2 = sumOfY / object.polify().length;
        var middleOfObject = [a1, a2];
        var vector = [middleOfObject[0] - this.point[0], canvas.height - middleOfObject[1] - this.point[1]];
        var angleToPoint = Math.atan2(vector[1], vector[0]);
        this.angle = angleToPoint;
    };
    /**
     * Pins the angle of the light toward a given GameObject
     *
     * @param object GameObject to pin the light's angle to (points the light to the center of the object)
     */
    DirectionalLight.prototype.pinAngleTo = function (object) {
        this.pinnedToAngle = object;
    };
    /**
     * Updates the light's position and angle if pinned to an object, otherwise does nothing
     * @param canvas Required to calculate the angle of the light (if the angle is pinned)
     */
    DirectionalLight.prototype.update = function (canvas) {
        if (this.pinnedTo) {
            this.moveToObject(this.pinnedTo);
        }
        if (this.pinnedToAngle) {
            this.pointTo(this.pinnedToAngle, canvas);
        }
    };
    return DirectionalLight;
}(Light));
/**
 * @class Layer
 * @classdesc Layer class, used for creating layers in the scene. Layers are independent of each other, and can have their own physics engines, objects, etc. Like multiple scenes within a single scene, drawn on top of each other.
 * @property {Array<GameObject>} objects - Objects in the layer
 * @property {boolean} physics - Whether or not the layer has physics enabled
 * @property {String} id - Unique ID of the layer
 * @property {any} Engine - Matter.js Engine
 * @property {any} Bodies - Matter.js Bodies
 * @property {any} Composite - Matter.js Composite
 * @property {any} engine - Matter.js engine instance
 * @property {boolean} boundsActive - Whether or not the bounds are active
 * @property {Array<number>} bounds - Bounds of the layer
 * @property {Vec2} parallax - How the layer processes camrea position. [1, 1] by default. [0, 0] would mean the layer is fixed to the camera, [1, 1] would mean the layer moves with the camera, [2, 2] would mean the layer moves at twice the speed of the camera, etc.
 * @property {number} lastPhysicsUpdate - Last time the physics were updated in the layer
 *
 * @example
 * ```js
 *  const background = new Layer({
 *      parallax: [0.75, .75]
 *  });
 *  background.addObject(...);
 *  const foreground = new Layer();
 *  foreground.addObject(...);
 *  foreground.addObject(...);
 *
 *  const scene = new Scene({
 *      layers: [background, foreground]
 *  });
 */
var Layer = /** @class */ (function () {
    function Layer(options) {
        this.objects = options.objects || [];
        this.physics = options.physics || false;
        this.boundsActive = options.boundsActive || false;
        this.bounds = options.bounds || [0, 0];
        this.id = uid();
        this.parallax = options.parallax || [1, 1];
        if (options.physics) {
            this.physics = true;
            this.Engine = Matter.Engine;
            this.Bodies = Matter.Bodies;
            this.Composite = Matter.Composite;
            this.engine = Matter.Engine.create(options.physicsOptions);
            this.lastPhysicsUpdate = performance.now();
        }
        else {
            this.physics = false;
            this.Engine = null;
            this.Bodies = null;
            this.Composite = null;
            this.engine = null;
            this.lastPhysicsUpdate = 0;
        }
    }
    /**
     * Adds an object to the layer
     *
     * @param object The object to add to the layer
     * @param scene A reference to the parent scene
     */
    Layer.prototype.addObject = function (object, scene) {
        object.scene = scene.id;
        object.layerID = this.id;
        object.physicsEnabled = (this.physics) ? object.physicsEnabled : false;
        if (object.physicsEnabled && this.physics) {
            if (!object.square) {
                var vertexSet = object.polify().map(function (point) {
                    return { x: point[0], y: point[1] };
                });
                var objectBody = this.Bodies.fromVertices(object.coordinates[0], object.coordinates[1], vertexSet, object.physicsOptions);
                object.body = objectBody;
            }
            else {
                var objectBody = this.Bodies.rectangle(object.coordinates[0], object.coordinates[1], object.getWidth(), object.getHeight(), object.physicsOptions);
                object.body = objectBody;
            }
            this.Composite.add(this.engine.world, [object.body]);
        }
        if (this.boundsActive)
            object.setBounds(this.bounds);
        object.initialize(scene);
        this.objects.push(object);
    };
    /**
     * Removes an object from the layer
     *
     * @param object The object to remove from the layer
     */
    Layer.prototype.removeObject = function (object) {
        this.objects = this.objects.filter(function (obj) { return obj.id != object.id; });
    };
    /**
     * Draws the layer onto the provided drawing context. This is handled automatically with scene and scene managers
     * @param options The DrawOptions for the layer
     */
    Layer.prototype.draw = function (options) {
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var object = _a[_i];
            object.update();
            var newCamera = [options.camera[0] * this.parallax[0], options.camera[1] * this.parallax[1]];
            object.draw({
                ctx: options.ctx,
                camera: newCamera,
                canvas: options.canvas
            });
        }
    };
    /**
     * Sets the boundaries of a scene
     * @param rightBound How far to the right objects can go
     * @param bottomBound How far down objects can go
     * @param canvas The canvas that the layer is drawn on
     * @param activate Whether or not to activate the bounds. True by default. If the scene has physics enabled, the bounds will be activated no matter what.
     */
    Layer.prototype.setBoundaries = function (rightBound, bottomBound, canvas, activate) {
        var _this = this;
        if (activate === void 0) { activate = true; }
        this.bounds = [rightBound || canvas.width, bottomBound || canvas.height];
        this.objects.forEach(function (object) {
            object.setBounds(_this.bounds);
        });
        this.boundsActive = activate;
        if (this.physics) {
            var topBoundObj = this.Bodies.rectangle(this.bounds[0] / 2, -10, this.bounds[0], 10, { isStatic: true, friction: 0 });
            var bottomBoundObj = this.Bodies.rectangle(this.bounds[0] / 2, this.bounds[1] + 10, this.bounds[0], 10, { isStatic: true, friction: 0 });
            var leftBoundObj = this.Bodies.rectangle(-10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
            var rightBoundObj = this.Bodies.rectangle(this.bounds[0] + 10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
            this.Composite.add(this.engine.world, [topBoundObj, bottomBoundObj, leftBoundObj, rightBoundObj]);
        }
    };
    /**
     * Disables the bounds of the layer
     */
    Layer.prototype.disableBounds = function () {
        this.boundsActive = false;
        this.objects.forEach(function (object) {
            object.disableBounds();
        });
    };
    /**
     * Activates the bounds of the layer
     */
    Layer.prototype.activateBounds = function () {
        this.boundsActive = true;
        this.objects.forEach(function (object) {
            object.activateBounds();
        });
    };
    return Layer;
}());
/**
 * @class Scene
 * @classdesc Scene class, used for building scenes
 * @property {Array<GameObject>} objects - Objects in the scene
 * @property {Array<CollisionMonitor>} collisionMonitors - Collision monitors in the scene
 * @property {Vec2} cameraAngle - Position of the camera
 * @property {Array<number>} fpsBuffer - Buffer that holds the last FPS_BUFFER_SIZE frames rendering times (in ms)
 * @property {boolean} fpsMonitoringEnabled - Whether or not to monitor the fps
 * @property {number} lastFrameStamp - Last frame stamp
 * @property {boolean} lighting - Whether or not lighting is enabled
 * @property {string} id - Unique ID of the scene
 * @property {Function} update - Update function of the scene (called every frame)
 * @property {Array<Light>} lights - Lights in the scene
 * @property {Array<DirectionalLight>} dlights - Directional lights in the scene
 * @property {any} gpu - GPU.js instance
 * @property {boolean} readyToDraw - Whether or not the scene is ready to draw
 * @property {any} diffuseKernel - GPU.js kernel for diffuse lighting
 * @property {number} fog - Fog of the scene
 * @property {number} ambient - Ambient of the scene
 * @property {boolean} clearScene - Whether or not to clear the scene
 * @property {HTMLCanvasElement} canvas - Canvas of the scene
 * @property {CanvasRenderingContext2D} ctx - Canvas rendering context of the scene
 * @property {number} width - Width of the scene
 * @property {number} height - Height of the scene
 * @property {Vec2} bounds - Bounds of the scene
 * @property {boolean} boundsActive - Whether or not the bounds are active
 * @property {GameObject | null} cameraBind - Object to bind the camera to
 * @property {number} FPS_BUFFER_SIZE - Size of the fps buffer
 * @property {boolean} isActiveScene - Whether or not the scene is the active scene
 * @property {"full" | "plain"} drawMode - Draw mode of the scene. "full" is defualt and used when objects need to be updated as well. "plain" just draws objects (eg: when the scene is handled on the server)
 * @property {Array<number>} formattedLights - Formatted lights for the diffuse kernel
 * @property {Array<number>} formattedDLights - Formatted directional lights for the diffuse kernel
 * @property {boolean} lightsPreFormatted - Whether or not the lights are pre-formatted
 * @property {boolean} isClient - Whether or not the scene is running on the client
 * @property {Object} GPUSettings - GPU.js settings
 * @property {Array<Layer>} layers - Layers of the scene
 * @property {string} backgroundColor - Background color of the scene
 * @example
 * ```js
 * const scene = new Scene({
 *      lighting: true,
 *      physics: true,
 *      physicsOptions: {
 *      gravity: {
 *          x: 0,
 *          y: 0
 *      }
 * }
 * });
 * ```
 * @example
 * ```js
 * const scene = new Scene({
 *      lighting: true,
 *      physics: true,
 *      physicsOptions: {
 *          gravity: {
 *              x: 0,
 *              y: 0
 *          }
 *      },
 *      lightOptions: {
 *          fog: 1.3,
 *          ambient: 0.2
 *      }
 * });
 * ```
 * @example
 * ```js
 * const scene = new Scene({
 *      layers: [background, middle, foreground]
 * });
 * ```
 */
var Scene = /** @class */ (function () {
    /**
     *
     * @param options SceneOptions object passed to initialize the scene
     */
    function Scene(options) {
        if (options === void 0) { options = {}; }
        this.objects = [];
        this.collisionMonitors = [];
        this.cameraAngle = [0, 0];
        this.fpsBuffer = [];
        this.fpsMonitoringEnabled = options.fpsMonitoringEnabled || false;
        this.lastFrameStamp = performance.now();
        this.lighting = options.lighting || false;
        this.id = uid();
        this.update = options.update || function () { };
        this.lights = [];
        this.dlights = [];
        this.formattedLights = [];
        this.formattedDLights = [];
        this.lightsPreFormatted = false;
        this.clearScene = (options.clear == undefined) ? true : options.clear;
        this.bounds = options.bounds || [0, 0];
        this.boundsActive = (options.bounds) ? true : false;
        this.cameraBind = options.bindCameraTo || null;
        this.FPS_BUFFER_SIZE = options.FPS_BUFFER_SIZE || 60;
        this.isActiveScene = false;
        this.isClient = (typeof document == "undefined") ? false : true;
        this.GPUSettings = options.GPUsettings || {};
        this.layers = options.layers || [];
        if (this.layers.length == 0) {
            var layer1 = new Layer({
                physics: options.physics || false,
                physicsOptions: options.physicsOptions || {},
                objects: [],
                boundsActive: this.boundsActive,
                bounds: this.bounds,
                parallax: [1, 1]
            });
            this.layers.push(layer1);
            // layers are linear... first layer is layer 0, second is layer 1, etc.
        }
        if (this.boundsActive) {
            this.setBoundaries(this.bounds[0], this.bounds[1], this.boundsActive);
        }
        if (this.lighting) {
            this.fog = (options.lightOptions) ? options.lightOptions.fog || 1.3 : 1.3;
            this.ambient = (options.lightOptions) ? options.lightOptions.ambient || 0.2 : 0.2;
        }
        else {
            this.fog = 1.3;
            this.ambient = 0.2;
        }
        if (typeof GPU == "function" && this.lighting && this.isClient) {
            this.gpu = new GPU(this.GPUSettings);
        }
        else if (this.lighting && this.isClient) {
            this.gpu = new GPU.GPU(this.GPUSettings);
        }
        this.readyToDraw = false;
        this.drawMode = "full";
        this.backgroundColor = options.backgroundColor || "white";
    }
    /**
     * Initializes the scene, specifically the light rendering kernel
     */
    Scene.prototype.ready = function () {
        this.configureLightingKernel();
        this.readyToDraw = true;
    };
    /**
     * Configures the lighting kernel (if lighting is enabled and the scene is on the client side)
     */
    Scene.prototype.configureLightingKernel = function () {
        if (this.lighting && this.isClient) {
            this.diffuseKernel = this.gpu.createKernel(GPULightingKernel, {
                output: [this.canvas.width, this.canvas.height],
                functions: {
                    distance: function (a, b) {
                        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
                    }
                },
                graphical: true,
                dynamicArguments: true
            });
        }
    };
    /**
     * Used to add lights to the scene
     * @param light Light to add to the scene (can be either a Light or DirectionalLight)
     */
    Scene.prototype.addLight = function (light) {
        if (instanceOfDirectionalLight(light)) {
            this.dlights.push(light);
        }
        else {
            this.lights.push(light);
        }
    };
    /**
     * Formats the lights into a format that the diffuseKernel can understand
     * Updates the formattedLights array property
     *
     * @param lights List of lights in the scene
     */
    Scene.prototype.formatLights = function (lights, cameraAngle) {
        if (!cameraAngle)
            cameraAngle = this.cameraAngle;
        var flights = lights.map(function (l) {
            return [l.point[0] - cameraAngle[0], l.point[1] - cameraAngle[1], l.strength, l.diffuse, l.color];
        });
        //this.formattedLights = flights.flat(2);
        return flights.flat(2);
    };
    /**
     * Formats the directional lights into a format that the diffuseKernel can understand
     * Updates the formattedDLights property
     *
     * @param lights List of directional lights in the scene
     */
    Scene.prototype.formatDLights = function (lights, cameraAngle) {
        if (!cameraAngle)
            cameraAngle = this.cameraAngle;
        var dlights = lights.map(function (l) {
            return [l.angle, l.point[0] - cameraAngle[0], l.point[1] - cameraAngle[1], l.strength, l.diffuse, l.spread, l.color];
        });
        //this.formattedDLights = dlights.flat(2);
        return dlights.flat(2);
    };
    /**
     * Configures the scene to draw on the provided canvas
     *
     * @param canvas Canvas that the scene will draw on
     * @param ctx The canvas rendering context of the scene
     * @param width The width of the scene
     * @param height The height of the scene
     */
    Scene.prototype.setDrawingCapabilities = function (canvas, ctx, width, height, drawMode) {
        if (drawMode === void 0) { drawMode = "full"; }
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.drawMode = drawMode;
    };
    /**
     * Renders lights onto the scene. Automatically calculates if lights are in the camera view and removes them from the render if they are not.
     *
     * @param ambient The ambient lighting in the scene
     * @param fog The fog constant in the scene
     */
    Scene.prototype.diffuseLights = function (ambient, fog) {
        var _this = this;
        if (ambient === void 0) { ambient = 0.2; }
        if (fog === void 0) { fog = 1.3; }
        var lights = Array.from(this.lights);
        var dlights = Array.from(this.dlights);
        if (!this.lightsPreFormatted) {
            this.lights.forEach(function (l) {
                l.update(_this.canvas);
            });
            this.dlights.forEach(function (l) {
                l.update(_this.canvas);
            });
        }
        if (this.lightsPreFormatted) {
            // generate lights from formatted lights
            var formattedLights = this.formattedLights;
            var formattedDLights = this.formattedDLights;
            var numLights = this.formattedLights.length / 7;
            var numDLights = this.formattedDLights.length / 9;
            var lightIndex = 0;
            var dlightIndex = 0;
            for (var i = 0; i < numLights; i++) {
                var light = new Light([formattedLights[lightIndex], formattedLights[lightIndex + 1]], formattedLights[lightIndex + 3], formattedLights[lightIndex + 2], [formattedLights[lightIndex + 4], formattedLights[lightIndex + 5], formattedLights[lightIndex + 6]]);
                lightIndex += 7;
                lights.push(light);
            }
            for (var i = 0; i < numDLights; i++) {
                var dlight = new DirectionalLight([formattedDLights[dlightIndex + 1], formattedDLights[dlightIndex + 2]], formattedDLights[dlightIndex], formattedDLights[dlightIndex + 5], formattedDLights[dlightIndex + 4], formattedDLights[dlightIndex + 3], [formattedDLights[dlightIndex + 6], formattedDLights[dlightIndex + 7], formattedDLights[dlightIndex + 8]]);
                dlightIndex += 9;
                dlights.push(dlight);
            }
        }
        lights = this.lights.filter(function (light) {
            // only draw if within the camera view
            var cameraX = _this.cameraAngle[0];
            var cameraY = _this.cameraAngle[1];
            var x = light.point[0];
            var y = light.point[1];
            var dx = x - cameraX;
            var dy = y - cameraY;
            var sceneWidth = _this.canvas.width;
            var sceneHeight = _this.canvas.height;
            var diffuseFactor = light.diffuse;
            var isBoundedLeft = dx + diffuseFactor > 0;
            var isBoundedRight = dx - diffuseFactor < sceneWidth;
            var isBoundedTop = dy + diffuseFactor > 0;
            var isBoundedBottom = dy - diffuseFactor < sceneHeight;
            // take in a account the diffuse factor
            var isInBounds = isBoundedLeft && isBoundedRight && isBoundedTop && isBoundedBottom;
            return isInBounds;
        });
        var dlights = this.dlights;
        var width = this.canvas.width;
        var height = this.canvas.height;
        var numLights = lights.length;
        var numDLights = dlights.length;
        var pix = this.ctx.getImageData(0, 0, width, height).data;
        var flights = this.formatLights(lights, this.cameraAngle);
        var dflights = this.formatDLights(dlights, this.cameraAngle);
        // Run the GPU kernel
        if (flights.length <= 0) {
            flights = [0, 0, 0, 0, 0, 0, 0];
            numLights = 0;
        }
        ;
        if (dflights.length <= 0) {
            dflights = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            numDLights = 0;
        }
        var globalAlpha = this.ctx.globalAlpha || 1;
        this.diffuseKernel(pix, width, height, flights, numLights, dflights, numDLights, ambient, fog, globalAlpha);
        var pixels = this.diffuseKernel.getPixels();
        this.ctx.putImageData(new ImageData(pixels, width, height), 0, 0);
    };
    /**
     * Sets the boundaries of the scene (eg: where object can move)
     *
     * @param rightBound How far right (in pixel) can objects in the scene move. If object are initialized outside the bounds, they will not be able to move, unless physics is enabled, in which case they will not be able to enter the scene.
     * @param bottomBound How far down (in pixel) can objects in the scene move. If object are initialized outside the bounds, they will not be able to move, unless physics is enabled, in which case they will not be able to enter the scene.
     * @param activate Boolean, if true, bounds will be active by defualt, if false, bounds will be inactive by default
     */
    Scene.prototype.setBoundaries = function (rightBound, bottomBound, activate) {
        var _this = this;
        if (activate === void 0) { activate = true; }
        this.layers.forEach(function (layer) {
            layer.setBoundaries(rightBound, bottomBound, _this.canvas, activate);
        });
    };
    /**
     * Disables the boundaries of the scene
     */
    Scene.prototype.disableBounds = function () {
        this.layers.forEach(function (layer) {
            layer.disableBounds();
        });
    };
    /**
     * Enables the boundaries of the scene
     */
    Scene.prototype.activateBounds = function () {
        this.layers.forEach(function (layer) {
            layer.activateBounds();
        });
    };
    /**
     * Used to quickly set up an object as the player. Binds the camera to the object and sets up WASD movement (the object will move `movementSpeed` pixels every 10ms)
     * (Only for sigle-player games)
     * @param object GameObject to configure as player
     * @param movementSpeed How quickly the player should move
     */
    Scene.prototype.treatAsPlayer = function (object, movementSpeed) {
        if (movementSpeed === void 0) { movementSpeed = 2; }
        var upInput = new Input("w", 10);
        var downInput = new Input("s", 10);
        var leftInput = new Input("a", 10);
        var rightInput = new Input("d", 10);
        upInput.on = function () {
            object.move([0, -movementSpeed]);
        };
        downInput.on = function () {
            object.move([0, movementSpeed]);
        };
        leftInput.on = function () {
            object.move([-movementSpeed, 0]);
        };
        rightInput.on = function () {
            object.move([movementSpeed, 0]);
        };
        upInput.activate();
        downInput.activate();
        leftInput.activate();
        rightInput.activate();
        this.bindCamera(object);
    };
    /**
     * Adds the specified GameObject to the scene
     *
     * @param object GameObject to add to the scene
     */
    Scene.prototype.addObject = function (object, layerID) {
        if (layerID) {
            var layer = this.layers.find(function (l) { return l.id == layerID; });
            if (layer) {
                layer.addObject(object, this);
            }
        }
        else {
            this.layers[this.layers.length - 1].addObject(object, this);
        }
        this.objects.push(object);
    };
    /**
     * Clears the canvas that the scene is being drawn on
     */
    Scene.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    /**
     * Checks to see if the scene is configured to draw, if not, it configures it (eg: initializes lighting kernel, etc.)
     */
    Scene.prototype.check = function () {
        if (this.lighting && this.isClient && !this.gpu) {
            if (typeof GPU == "function" && this.lighting && this.isClient) {
                this.gpu = new GPU(this.GPUSettings || {});
            }
            else if (this.lighting && this.isClient) {
                this.gpu = new GPU.GPU(this.GPUSettings || {});
            }
        }
        if (this.lighting && this.isClient && !this.diffuseKernel) {
            this.configureLightingKernel();
        }
    };
    /**
     * Draws the scene without updating any of the objects
     */
    Scene.prototype.plainDraw = function () {
        var _this = this;
        this.check();
        if (!this.readyToDraw)
            return;
        this.ctx.fillStyle = this.backgroundColor || "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        this.layers.forEach(function (layer) {
            layer.draw({ ctx: _this.ctx, camera: _this.cameraAngle, canvas: _this.canvas });
        });
        if (this.lighting && this.isClient) {
            this.diffuseLights(this.ambient, this.fog);
        }
        var t1 = performance.now();
        var elapsedTime = t1 - this.lastFrameStamp;
        this.lastFrameStamp = t1;
        if (this.fpsMonitoringEnabled) {
            this.fpsBuffer.push(elapsedTime);
            if (this.fpsBuffer.length > this.FPS_BUFFER_SIZE) {
                this.fpsBuffer.shift();
            }
            this.ctx.font = "20px Ariel";
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = "left";
            this.ctx.fillText("FPS: " + calculateFPS(this.fpsBuffer), 5, 20);
        }
    };
    /**
     * Updates all lights in the scene
     */
    Scene.prototype.updateLights = function () {
        var _this = this;
        this.lights.forEach(function (l) {
            l.update(_this.canvas);
        });
        this.dlights.forEach(function (l) {
            l.update(_this.canvas);
        });
    };
    /**
     * Draws all of the objects, lights, and directional lights in the scene.
     * Also updates each physics object and checks for collisions.
     * It also recalculates the FPS if enabled.
     */
    Scene.prototype.draw = function () {
        this.check();
        if (!this.readyToDraw)
            return;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        if (this.clearScene)
            this.clear();
        this.ctx.fillStyle = this.backgroundColor || "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer.physics) {
                var physicsNow = performance.now();
                var pElapsedTime = physicsNow - layer.lastPhysicsUpdate;
                Matter.Engine.update(layer.engine, pElapsedTime);
                layer.lastPhysicsUpdate = physicsNow;
                layer.objects.forEach(function (object) {
                    if (object.physicsEnabled) {
                        object.updatePhysics();
                    }
                });
            }
            layer.draw({ ctx: this.ctx, camera: this.cameraAngle, canvas: this.canvas });
        }
        this.collisionMonitors.forEach(function (monitor) {
            var o1 = monitor[0], o2 = monitor[1], f = monitor[2], f2 = monitor[3], active = monitor[4];
            if (o1.checkCollision(o2) || o2.checkCollision(o1)) {
                if (!active) {
                    active = true;
                    f();
                }
            }
            else {
                if (active) {
                    active = false;
                    f2();
                }
            }
            monitor[4] = active;
        });
        if (this.lighting && this.isClient) {
            this.diffuseLights(this.ambient, this.fog);
        }
        var t1 = performance.now();
        var elapsedTime = t1 - this.lastFrameStamp;
        this.lastFrameStamp = t1;
        if (this.fpsMonitoringEnabled) {
            this.fpsBuffer.push(elapsedTime);
            if (this.fpsBuffer.length > this.FPS_BUFFER_SIZE) {
                this.fpsBuffer.shift();
            }
            this.ctx.font = "20px Ariel";
            this.ctx.fillStyle = "black";
            this.ctx.fillText("FPS: " + calculateFPS(this.fpsBuffer), 5, 20);
        }
    };
    /**
     * Reloads scene objects from the passed list, used for multiplayer when objects are handled on the server
     * @param objects Objects to draw from
     */
    Scene.prototype.drawFromPassedObjects = function (objects) {
        this.objects = objects;
    };
    /**
     * Updates all of the objects, lights, physics, and collision monitors in the scene
     */
    Scene.prototype.updateAll = function () {
        this.check();
        if (!this.readyToDraw)
            return;
        this.update();
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer.physics) {
                var physicsNow = performance.now();
                var pElapsedTime = physicsNow - layer.lastPhysicsUpdate;
                Matter.Engine.update(layer.engine, pElapsedTime);
                layer.lastPhysicsUpdate = physicsNow;
                layer.objects.forEach(function (object) {
                    if (object.physicsEnabled) {
                        object.updatePhysics();
                    }
                    object.update();
                });
            }
            else {
                layer.objects.forEach(function (object) {
                    object.update();
                });
            }
        }
        this.collisionMonitors.forEach(function (monitor) {
            var o1 = monitor[0], o2 = monitor[1], f = monitor[2], f2 = monitor[3], active = monitor[4];
            if (o1.checkCollision(o2) || o2.checkCollision(o1)) {
                if (!active) {
                    active = true;
                    f();
                }
            }
            else {
                if (active) {
                    active = false;
                    f2();
                }
            }
            monitor[4] = active;
        });
        this.updateLights();
    };
    /**
     * Removes a GameObject from the scene
     * @param object GameObject to remove from the scene
     */
    Scene.prototype.removeObject = function (object) {
        this.collisionMonitors = this.collisionMonitors.filter(function (monitor) {
            return monitor[0].id != object.id && monitor[1].id != object.id;
        });
        this.objects = this.objects.filter(function (compare) {
            return !(compare.id == object.id);
        });
        this.layers.forEach(function (layer) {
            if (layer.id == object.layerID) {
                layer.removeObject(object);
            }
        });
    };
    /**
     * Enables collisions between the specified objects
     * Adds a CollisionMonitor to the scene
     *
     * @param o1 First object to check for collisions
     * @param o2 Second object to check for collisions
     * @param fo Function that runs when the objects collide (called once)
     * @param ff Function that runs when the objects separate (called once)
     * @param options Options for the collision monitor
     */
    Scene.prototype.enableCollisionsBetween = function (o1, o2, fo, ff, options) {
        var objectsExist = true;
        if (!this.objects.includes(o1) || !this.objects.includes(o2)) {
            objectsExist = false;
        }
        if (!objectsExist) {
            throw new Error("One or more of the objects passed to enableCollisionsBetween do not exist in scene ".concat(this.id, "'s object list.\nPlease make sure to add the objects to the scene before enabling collisions between them."));
        }
        if (options && options.crossLayers) {
            this.collisionMonitors.push([o1, o2, fo, ff, false]);
        }
        else {
            if (o1.layerID == o2.layerID) {
                this.collisionMonitors.push([o1, o2, fo, ff, false]);
            }
        }
    };
    /**
     * Binds the scene's camera to a GameObject
     *
     * @param object GameObject to bind the scene's camera to
     */
    Scene.prototype.bindCamera = function (object) {
        this.cameraBind = object;
    };
    /**
     * Unbinds the scene's camera from a GameObject
     */
    Scene.prototype.unbindCamera = function () {
        this.cameraBind = null;
    };
    /**
     * Moves the camera to a GameObject
     * @param object GameObject to move the camera to
     */
    Scene.prototype.cameraTo = function (object) {
        var sumOfX = 0;
        var sumOfY = 0;
        object.polify().forEach(function (point) {
            sumOfX += point[0];
            sumOfY += point[1];
        });
        var a1 = sumOfX / object.polify().length;
        var a2 = sumOfY / object.polify().length;
        var middleOfObject = [a1, a2];
        var middleOfCanvas = [this.width / 2, this.height / 2];
        this.cameraAngle = [middleOfObject[0] - middleOfCanvas[0], middleOfObject[1] - middleOfCanvas[1]];
    };
    /**
     * Moves the scene's camera
     *
     * @param vector Vector to move the scene's camera by
     */
    Scene.prototype.moveCamera = function (vector) {
        this.cameraAngle = sumArrays(this.cameraAngle, vector);
    };
    /**
     * Enables FPS monitoring
     */
    Scene.prototype.enableFPS = function () {
        this.fpsMonitoringEnabled = true;
    };
    /**
     * Disables FPS monitoring
     */
    Scene.prototype.disableFPS = function () {
        this.fpsMonitoringEnabled = false;
    };
    return Scene;
}());
/**
 * @class SceneManager
 * @classdesc SceneManager class, used for managing scenes and to transition between scenes
 * @property {Object} scenes - Scenes in the scene manager
 * @property {string} activeScene - ID of the active scene
 * @property {number} width - Width of the canvas (Will resize the canvas to this width). By default is the width of the canvas element
 * @property {number} height - Height of the canvas (Will resize the canvas to this height). By default is the width of the canvas element
 * @property {HTMLCanvasElement} canvas - Canvas element to draw the scenes on
 * @property {CanvasRenderingContext2D} ctx - Canvas rendering context of the canvas
 * @property {string} sceneAnimation - Animation to use when transitioning between scenes
 * @property {number} animationStartTime - Time when the animation started
 * @property {number} animationRunTime - How long the animation should run for
 * @property {Scene} animateTo - Scene to animate to
 * @property {Array<string>} animationNames - Names of the animations that can be used
 * @property {boolean} animationRunning - Whether or not the animation is running
 * @property {boolean} fromScenePrevHadLights - Whether or not the scene that the animation is coming from had lighting enabled
 * @property {boolean} toScenePrevHadLights - Whether or not the scene that the animation is going to had lighting enabled
 * @property {boolean} start - Whether or not to start the scene manager when it is initialized (true by default)
 * @property {boolean} autoDraw - Should the scene manager start drawing the scene onto the canvas (true, default), or will this be handled by the user (false)
 *
 * @example
 * ```js
 * const sceneManager = new SceneManager({
 *      initialScene: scene,
 *      canvas: document.getElementById("canvas")
 * });
 * ```
 * @example
 * ```js
 * // Example animation between two scene
 * const sceneManger = new SceneManager({
 *      initialScene: scene,
 *      canvas: document.getElementById("canvas")
 * });
 * sceneManager.addScene(scene2);
 * sceneManager.animate("quickFade", scene2, 1000);
 * ```
 */
var SceneManager = /** @class */ (function () {
    /**
     *
     * @param options SceneManagerOptions object passed to initialize the scene manager
     */
    function SceneManager(options) {
        var initialScene = options.initialScene;
        if (!initialScene)
            throw new Error("Initial scene not provided");
        this.scenes = {};
        this.scenes[initialScene.id] = initialScene;
        this.activeScene = initialScene.id;
        this.width = options.width || 500;
        this.height = options.height || 500;
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start = (options.start == undefined) ? true : options.start;
        this.autoDraw = (options.autoDraw == undefined) ? true : options.autoDraw;
        this.scenes[initialScene.id].width = this.width;
        this.scenes[initialScene.id].height = this.height;
        this.scenes[initialScene.id].canvas = this.canvas;
        this.scenes[initialScene.id].ctx = this.ctx;
        this.scenes[initialScene.id].setDrawingCapabilities(this.canvas, this.ctx, this.width, this.height);
        this.scenes[initialScene.id].ready();
        if (this.start) {
            this.draw();
        }
        this.animationNames = ["quickFade", "slowFade", "slideLeft", "crossFade"];
        this.animationRunning = false;
        initialScene.isActiveScene = true;
    }
    /**
     * Changes the active scene, with no transition
     * @param scene Scene to change to
     */
    SceneManager.prototype.changeScene = function (scene) {
        this.scenes[this.activeScene].isActiveScene = false;
        this.scenes[scene.id] = scene;
        this.scenes[scene.id].isActiveScene = true;
        this.activeScene = scene.id;
    };
    /**
     * Adds a sceen to the scene manager
     * @param scene Scene to add to the scene manager
     */
    SceneManager.prototype.addScene = function (scene) {
        var arg1 = scene;
        this.scenes[arg1.id] = arg1;
        arg1.width = this.width;
        arg1.height = this.height;
        arg1.canvas = this.canvas;
        arg1.ctx = this.ctx;
        arg1.ready();
    };
    /**
     * Smoothly animates between scenes (unless lighting is enabled, in which case lighting is temporarily disabled as the animation is running)
     * @param transition Name of the transition to use
     * @param scene Scene to transition to
     * @param duration Time (in ms) to run the transition for
     */
    SceneManager.prototype.animate = function (transition, scene, duration) {
        if (duration === void 0) { duration = 1000; }
        if (!this.animationNames.includes(transition))
            throw new Error("Invalid transition type");
        this.sceneAnimation = transition;
        this.animationStartTime = performance.now();
        this.animationRunTime = duration;
        this.animateTo = scene;
        if (transition.startsWith('slide')) {
            this.fromScenePrevHadLights = this.scenes[this.activeScene].lighting;
            this.toScenePrevHadLights = this.scenes[this.animateTo.id].lighting;
        }
    };
    /**
     * Draws the active scene onto the canvas, also runs animations if they are running
     */
    SceneManager.prototype.draw = function () {
        var _this = this;
        // check if animations are running
        if (this.animationRunning && this.sceneAnimation && this.animationStartTime + this.animationRunTime > performance.now()) {
            if (this.sceneAnimation.startsWith('slide')) {
                this.scenes[this.activeScene].lighting = false;
                this.scenes[this.animateTo.id].lighting = false;
            }
            switch (this.sceneAnimation) {
                case "quickFade":
                    var timeElapsed = performance.now() - this.animationStartTime;
                    var progress = timeElapsed / (this.animationRunTime);
                    var opacity = progress;
                    if (progress < 1) {
                        this.ctx.globalAlpha = 1 - opacity;
                        this.scenes[this.activeScene].draw();
                    }
                    break;
                case "slowFade":
                    this.ctx.fillStyle = "black";
                    this.ctx.fillRect(0, 0, this.width, this.height);
                    var timeElapsed = performance.now() - this.animationStartTime;
                    var progress = timeElapsed / (this.animationRunTime / 2);
                    if (progress < 1) {
                        this.ctx.globalAlpha = 1 - progress;
                        this.scenes[this.activeScene].draw();
                    }
                    else {
                        this.ctx.globalAlpha = progress - 1;
                        this.scenes[this.animateTo.id].draw();
                    }
                    break;
                case "slideLeft":
                    var timeElapsed = performance.now() - this.animationStartTime;
                    var progress = timeElapsed / this.animationRunTime;
                    var translateX = this.width * progress;
                    this.ctx.save();
                    this.ctx.translate(-translateX, 0);
                    this.scenes[this.activeScene].draw();
                    this.ctx.restore();
                    this.ctx.save();
                    this.ctx.translate(this.width - translateX, 0);
                    this.scenes[this.animateTo.id].draw();
                    this.ctx.restore();
                    break;
                case "crossFade":
                    var timeElapsed = performance.now() - this.animationStartTime;
                    var progress = timeElapsed / this.animationRunTime;
                    var opacity = progress;
                    this.ctx.globalAlpha = 1 - opacity;
                    this.scenes[this.activeScene].draw();
                    this.ctx.globalAlpha = opacity;
                    this.scenes[this.animateTo.id].draw();
                    break;
                default:
                    this.animateTo.draw();
                    break;
            }
        }
        else {
            if (this.animationRunning) {
                if (this.sceneAnimation.startsWith('slide')) {
                    this.scenes[this.activeScene].lighting = this.fromScenePrevHadLights;
                    this.scenes[this.animateTo.id].lighting = this.toScenePrevHadLights;
                }
                this.scenes[this.activeScene].isActiveScene = false;
                this.activeScene = this.animateTo.id;
                this.animateTo.isActiveScene = true;
                this.animationRunning = false;
                this.sceneAnimation = '';
                this.animationRunTime = 0;
                this.animationStartTime = 0;
                this.ctx.globalAlpha = 1;
            }
            this.scenes[this.activeScene].draw();
        }
        if (this.autoDraw) {
            window.requestAnimationFrame(function () {
                _this.draw();
            });
        }
    };
    return SceneManager;
}());
/**
 * @class Input
 * @classdesc Input class, used for handling input
 * @property {boolean} active - Whether or not the input is active
 * @property {string} key - Key that the input is bound to
 * @property {number} fireRate - Fire rate of the input
 * @property {string} id - Unique ID of the input
 * @property {any} fireInterval - Interval that the input fires on
 * @property {boolean} firing - Whether or not the input is firing
 * @property {boolean} clickMonitor - Whether or not the input is a click monitor
 * @property {EventOnFunction} on - Function to run when the input is fired (EventOnFunction)
 * @example
 * ```js
 * const input = new Input("w", 100);
 * input.on = (event) => {
 *      console.log("w pressed");
 * }
 * input.activate(scene);
 * ```
 */
var Input = /** @class */ (function () {
    /**
     *
     * @param key The key that the input is bound to ("click" is you want to monitor clicks)
     * @param fireRate How often the input fires (in ms)
     */
    function Input(key, fireRate) {
        if (key == "click") {
            this.clickMonitor = true;
        }
        else {
            this.clickMonitor = false;
        }
        this.key = key;
        this.fireRate = fireRate;
        this.id = uid();
        this.fireInterval;
        this.firing = false;
        this.active = false;
    }
    /**
     * Starts firing the on function ever fireRate ms
     * @param e Event to pass to the on function
     */
    Input.prototype.startFiring = function (e) {
        var _this = this;
        if (!this.firing) {
            this.firing = true;
            this.on();
            this.fireInterval = setInterval(function () {
                if (_this.firing) {
                    _this.on(e);
                }
            }, this.fireRate);
        }
    };
    /**
     * Stops firing the on function
     */
    Input.prototype.stopFiring = function () {
        if (this.firing) {
            this.firing = false;
            clearInterval(this.fireInterval);
        }
    };
    /**
     * Activates the input monitor
     * @param activateOn Scene to activate the input on (Only matters if the input is a click monitor)
     */
    Input.prototype.activate = function (activateOn) {
        var _this = this;
        this.active = true;
        if (activateOn && this.clickMonitor && activateOn instanceof Scene) {
            document.addEventListener("mousedown", function (event) {
                if (!activateOn.isActiveScene)
                    return;
                var rect = activateOn.canvas.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;
                var foundObjects = [];
                activateOn.objects.forEach(function (object) {
                    var r = sumArrays([x, y], activateOn.cameraAngle);
                    if (checkCollision(object.polify(), [r])) {
                        foundObjects.push(object);
                    }
                });
                if (foundObjects.length > 0) {
                    var topObject = foundObjects[0];
                    var layerIDs = activateOn.layers.map(function (layer) { return layer.id; });
                    foundObjects.forEach(function (object) {
                        if (layerIDs.indexOf(object.layerID) > layerIDs.indexOf(topObject.layerID)) {
                            topObject = object;
                        }
                    });
                    _this.on({
                        gameObject: topObject,
                        realX: x,
                        realY: y,
                        x: x + activateOn.cameraAngle[0],
                        y: y + activateOn.cameraAngle[1]
                    });
                    document.addEventListener("mouseup", function (event) {
                        topObject.returnState();
                    });
                }
                else {
                    _this.on({
                        gameObject: null,
                        realX: x,
                        realY: y,
                        x: x + activateOn.cameraAngle[0],
                        y: y + activateOn.cameraAngle[1]
                    });
                }
            });
        }
        else {
            document.addEventListener("keydown", function (e) {
                if (_this.active) {
                    if (e.key == _this.key) {
                        _this.startFiring(e);
                    }
                }
            });
            document.addEventListener("keyup", function (e) {
                if (_this.active) {
                    if (e.key == _this.key) {
                        _this.stopFiring();
                    }
                }
            });
        }
    };
    /**
     * Reactivates the input monitor (if it was deactivated- do not use input.active(scene) as this will cause the on function to be called twice every fireRate ms)
     */
    Input.prototype.reactivate = function () {
        this.active = true;
    };
    /**
     * Temporarily deactivates the input monitor
     */
    Input.prototype.deactivate = function () {
        this.active = false;
        this.stopFiring();
    };
    return Input;
}());
/**
 * @class MultiPlayerClientInput
 * @classdesc MultiPlayerClientInput class, used for handling input on the client side of a multiplayer game
 * @property {boolean} down - Whether or key is currently down
 * @property {string} key - Key that the input is bound to
 * @property {boolean} sleeping - Whether or not the input is sleeping (waiting for the player to be ready)
 * @property {any} socket - Socket.io socket to emit events on
 * @static {Array<MultiPlayerClientInput>} activeInputs - Array of all active inputs
 * @example
 * ```js
 * const input = new MultiPlayerClientInput("w", playerClient); // passes all "w" key presses to the server
 * ```
 */
var MultiPlayerClientInput = /** @class */ (function () {
    /**
     *
     * @param key The key to listen to events on
     * @param playerClient The playerClient instance that the input is bound to
     */
    function MultiPlayerClientInput(key, playerClient) {
        this.key = key;
        this.down = false;
        if (playerClient.ready) {
            this.sleeping = false;
            this.activate(playerClient);
        }
        else {
            this.socket = null;
            this.sleeping = true;
            playerClient.inputStack.push(this);
        }
    }
    /**
     * Activates the input (called when playerClient is ready)
     * @param playerClient PlayerClient instance to activate the input on
     */
    MultiPlayerClientInput.prototype.activate = function (playerClient) {
        var _this = this;
        this.socket = playerClient.socket;
        document.addEventListener("keydown", function (e) {
            if (e.key == _this.key && !_this.down) {
                _this.down = true;
                _this.socket.emit("__key_down__", _this.key);
            }
        });
        document.addEventListener("keyup", function (e) {
            if (e.key == _this.key && _this.down) {
                _this.down = false;
                _this.socket.emit("__key_up__", _this.key);
            }
        });
        MultiPlayerClientInput.activeInputs.push(this);
    };
    MultiPlayerClientInput.activeInputs = [];
    return MultiPlayerClientInput;
}());
/**
 * @class MultiplayerInputHandler
 * @classdesc MultiplayerInputHandler class, used for handling input on the server side of a multiplayer game
 * @property {Array<ServerInputHandler>} monitors - Array of ServerInputHandlers to monitor
 * @example
 * ```js
 * const inputHandler = new MultiPlayerInputHandler({
 *      monitors: [
 *          new ServerInputHandler({
 *          key: "w",
 *          fireRate: 10,
 *          on: (socket, playerObject) => {
 *              playerObject.move(0, -1);
 *          }
 *      }),
 *      new ServerInputHandler({
 *          key: "s",
 *          fireRate: 10,
 *          on: (socket, playerObject) => {
 *              playerObject.move(0, 1);
 *          }
 *      })
 *    ]
 * });
 * ```
 */
var MultiPlayerInputHandler = /** @class */ (function () {
    function MultiPlayerInputHandler(options) {
        this.monitors = options.monitors;
    }
    return MultiPlayerInputHandler;
}());
/**
 * @class MultiPlayerServerInput
 * @classdesc MultiPlayerServerInput class, used for handling input on the server side of a multiplayer game
 * @property {string} key - Key that the input is bound to
 * @property {number} fireRate - Fire rate of the input
 * @property {string} id - Unique ID of the input
 * @property {[key: string]: NodeJS.Timeout} fireIntervals - Reference to all of the fire intervals
 * @property {[key: string]: boolean} firing - Whether or not the input is firing for each socket
 * @property {boolean} active - Whether or not the input is active
 * @property {MultiPlayerSceneManager} sceneManager - SceneManager instance that the input is bound to
 * @property {Function} on - Function to run when the input is fired (EventOnFunction)
 * @example
 * ```js
 * const input = new MultiPlayerServerInput({
 *      key: "w",
 *      fireRate: 10,
 *      on: (socket, playerObject) => {
 *      playerObject.move(0, -1);
 *      }
 * });
 * ```
 */
var ServerInputHandler = /** @class */ (function () {
    /**
     *
     * @param options ServerInputHandlerOptions object passed to initialize the ServerInputHandler
     */
    function ServerInputHandler(options) {
        var _this = this;
        this.key = options.key;
        this.fireRate = options.fireRate || 10;
        this.id = uid();
        this.fireIntervals = {};
        this.firing = {};
        this.active = false;
        this.sceneManager = null;
        this.on = function (socket, playerObject) {
            if (_this.active) {
                options.on(socket, playerObject);
            }
        };
    }
    /**
     * Activates the input on the given sceneManager (MultiPlayerSceneManager instance)
     * @param sceneManager SceneManager instance to activate the input on
     */
    ServerInputHandler.prototype.init = function (sceneManager) {
        this.sceneManager = sceneManager;
        this.active = true;
    };
    /**
     * Activates the input on the given socket
     * @param socket Socket.io socket to activate the input on
     */
    ServerInputHandler.prototype.activateOn = function (socket) {
        var _this = this;
        socket.on("__key_down__", function (key) {
            if (key == _this.key) {
                _this.startFiring(socket);
            }
        });
        socket.on("__key_up__", function (key) {
            if (key == _this.key) {
                _this.stopFiring(socket);
            }
        });
    };
    /**
     * Fires the input on a given socket every fireRate ms
     * @param socket Socket.io socket to start firing the input on
     */
    ServerInputHandler.prototype.startFiring = function (socket) {
        var _this = this;
        if (!this.firing[socket.id]) {
            this.firing[socket.id] = true;
            // find the player object based on socket.id, scanning for matching ID in the scene manager
            var playerGameObject = this.sceneManager.players.filter(function (player) {
                return player.id == socket.id;
            })[0].gameObject;
            this.on(socket, playerGameObject);
            this.fireIntervals[socket.id] = setInterval(function () {
                if (_this.firing[socket.id]) {
                    _this.on(socket, playerGameObject);
                }
            }, this.fireRate);
        }
    };
    /**
     * Stops firing the input to a given socket
     * @param socket Socket.io socket to stop firing the input on
     */
    ServerInputHandler.prototype.stopFiring = function (socket) {
        if (this.firing[socket.id]) {
            this.firing[socket.id] = false;
            clearInterval(this.fireIntervals[socket.id]);
        }
    };
    return ServerInputHandler;
}());
/**
 * @class Player
 * @classdesc Player class, used for managing players in a multiplayer game. Handled automatically when using MultiPlayerServer
 * @property {string} id - ID of the player
 * @property {string} label - Label of the player
 * @property {any} socket - Socket.io socket of the player
 * @property {GameObject} gameObject - GameObject of the player
 * @property {string | null} inSceneID - ID of the scene that the player is in
 */
var Player = /** @class */ (function () {
    /**
     *
     * @param options PlayerOptions object passed to initialize the Player
     */
    function Player(options) {
        this.id = options.id;
        this.label = options.label;
        this.socket = options.socket;
        this.gameObject = options.playerGameObject || new GameObject();
        this.gameObject.meta = {
            player: true,
            id: this.id,
            label: this.label,
            showLabel: options.showLabel || false
        };
        this.inSceneID = null;
    }
    /**
     * Changes the scene that the player is in
     * @param scene Scene to enter
     */
    Player.prototype.enterScene = function (scene) {
        scene.addObject(this.gameObject);
        this.inSceneID = scene.id;
    };
    /**
     * Emits the player's data to the client
     */
    Player.prototype.emit = function () {
        this.socket.emit("__player_data__", this.gameObject);
    };
    return Player;
}());
/**
 * @class MultiPlayerSceneManager
 * @classdesc MultiPlayerSceneManager class, used for managing scenes, players, and transitions between scenes in a multiplayer game
 * @property {Array<Player>} players - Array of players in the scene manager
 * @property {boolean} showPlayerLabels - Whether or not to show player labels
 * @example
 * ```js
 * const sceneManager = new MultiPlayerSceneManager({
 *      initialScene: scene,
 *      canvas: createCanvas(), // create a synthetic canvas... nothing will be rendered on it, it is just for SceneManager to use under the hood
 *      width: 500,
 *      height: 500,
 *      showPlayerLabels: true
 * });
 * ```
 */
var MultiPlayerSceneManager = /** @class */ (function (_super) {
    __extends(MultiPlayerSceneManager, _super);
    /**
     *
     * @param options MultiPlayerSceneManagerOptions object passed to initialize the MultiPlayerSceneManager
     */
    function MultiPlayerSceneManager(options) {
        var _this = _super.call(this, __assign(__assign({}, options), { canvas: createCanvas(options.width || 500, options.height || 500), width: options.width || 500, height: options.height || 500, start: false })) || this;
        _this.players = [];
        _this.showPlayerLabels = options.showPlayerLabels || false;
        _this.draw();
        return _this;
    }
    /**
     * Adds a player into the scene manager
     * @param player Player to add to the scene manager
     */
    MultiPlayerSceneManager.prototype.addPlayer = function (player) {
        player.gameObject.meta.showLabel = this.showPlayerLabels;
        this.players.push(player);
    };
    /**
     * Removes a player from the scene manager
     * @param player Player to remove from the scene manager
     */
    MultiPlayerSceneManager.prototype.removePlayer = function (player) {
        this.players = this.players.filter(function (p) { return p.id != player.id; });
    };
    /**
     * Retrieves a given player from the scene manager. Has O(n) time complexity, so not recommended to use often
     * @param id ID of the player to get
     * @returns The player with the given ID
     */
    MultiPlayerSceneManager.prototype.getPlayer = function (id) {
        return this.players.filter(function (p) { return p.id == id; })[0];
    };
    /**
     * Retrieves a given player from the scene manager. Has O(n) time complexity, so not recommended to use often
     * @param label Label of the player to get
     * @returns The first player with the given label
     */
    MultiPlayerSceneManager.prototype.getPlayerByLabel = function (label) {
        return this.players.filter(function (p) { return p.label == label; })[0];
    };
    /**
     * Gets all players that match a given label
     * @param label Label of the players to get
     * @returns Array of players with the given label (eg: if multiple players have the same label)
     */
    MultiPlayerSceneManager.prototype.getPlayersByLabel = function (label) {
        return this.players.filter(function (p) { return p.label == label; });
    };
    /**
     * Updates all scenes with players in them
     */
    MultiPlayerSceneManager.prototype.draw = function () {
        var _this = this;
        // filter out the scenes with no players in them
        var scenesWithPlayers = Object.keys(this.scenes).filter(function (sceneID) {
            return _this.players.filter(function (player) {
                return player.inSceneID == sceneID;
            }).length > 0;
        });
        // update the scenes with players in them
        scenesWithPlayers.forEach(function (sceneID) {
            _this.scenes[sceneID].updateAll();
        });
    };
    return MultiPlayerSceneManager;
}(SceneManager));
/**
 * @class MultiPlayerServer
 * @classdesc MultiPlayerServer class, used for constructing, running, and managing a multiplayer server
 * @property {Array<Connection>} socketConnections - Array of socket connections that the server is connected to
 * @property {Function} onNewConnection - Function to run when a new connection is made
 * @property {Function} onDisconnect - Function to run when a connection is disconnected
 * @property {any} io - Socket.io instance
 * @property {MultiPlayerSceneManager} sceneManager - SceneManager instance that the server is using
 * @property {number} tickSpeed - Speed (in ms) of the server tick (Default: 1000/60)
 * @property {GameObject} newPlayerObject - GameObject to use when a new player joins the server
 * @property {MultiPlayerInputHandler} inputHandler - InputHandler to use on the server
 * @property {Function} onNewPlayer - Function to run when a new player joins the server. Should return a GameObject and a label for the player, or a promise that will resolve into a GameObject and a label for the player. If no function is provided, the GameObject will be a clone of newPlayerObject
 *
 * @example
 * ```js
 * const multiplayerSever = new MultiPlayerServer({
 *
 *  // server config
 *  httpServer: server, // const server = http.createServer(=);
 *  showPlayerLabels: true,
 *  port: 3000,
 *  // game config
 *  newPlayerObject: {
 *      class: Polygon,
 *      options: {
 *          points: [[0,0],[100,0],[100,100],[0,100]],
 *          backgroundColor: "red",
 *      }
 *  },
 *  sceneManager: new MultiPlayerSceneManager({
 *      initialScene: new Scene({
 *          lighting: true,
 *          lightOptions: {
 *              ambient: 0.2
 *          }
 *      }),
 *      showPlayerLabels: true
 *  }),
 *
 *   // events
 *  onNewConnection: () => {
 *      console.log('new connection');
 *  },
 *  onDisconnect: () => {
 *      console.log('disconnected');
 *  },
 *  onNewPlayer: (socket, id, data) => {
 *      console.log("new player", id, data);
 *      gameObject = new Polygon({
 *          points: [[0,0],[100,0],[100,100],[0,100]],
 *          backgroundColor: "red",
 *      });
 *      return new Promise((resolve, reject) => {
 *          socket.on("send_username", (username) => {
 *              console.log("got username", username)
 *              resolve([gameObject, username])
 *          });
 *      })
 *  },
 *
 *  // input
 *  inputHandler: new MultiPlayerInputHandler({
 *      monitors: [
 *          new ServerInputHandler({
 *              key: "w",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([0, -10])
 *              }
 *          }),
 *          new ServerInputHandler({
 *              key: "a",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([-10,0])
 *              }
 *          }),
 *          new ServerInputHandler({
 *              key: "s",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([0, 10])
 *              }
 *          }),
 *          new ServerInputHandler({
 *              key: "d",
 *              on: (socket, playerGameObject) => {
 *                  playerGameObject.move([10,0])
 *              }
 *          })
 *
 *      ]
 *  })
 *});
 */
var MultiPlayerServer = /** @class */ (function () {
    /**
     *
     * @param multiPlayerServerOptions MultiPlayerServerOptions object passed to initialize the MultiPlayerServer
     */
    function MultiPlayerServer(multiPlayerServerOptions) {
        var _this = this;
        var io = socketio(multiPlayerServerOptions.httpServer);
        this.socketConnections = [];
        this.onNewConnection = multiPlayerServerOptions.onNewConnection;
        this.onDisconnect = multiPlayerServerOptions.onDisconnect;
        io.on("connection", function (socket) {
            _this.addSocketConnection(socket);
        });
        this.io = io;
        this.sceneManager = multiPlayerServerOptions.sceneManager;
        this.tickSpeed = multiPlayerServerOptions.tickSpeed || 1000 / 60;
        this.newPlayerObject = multiPlayerServerOptions.newPlayerObject || {
            class: GameObject,
            options: {}
        };
        this.onNewPlayer = multiPlayerServerOptions.onNewPlayer || (function (socket, id) {
            return [new _this.newPlayerObject.class(_this.newPlayerObject.options), id];
        });
        this.inputHandler = multiPlayerServerOptions.inputHandler || new MultiPlayerInputHandler({
            monitors: []
        });
        this.inputHandler.monitors.forEach(function (monitor) {
            monitor.init(_this.sceneManager);
        });
        multiPlayerServerOptions.httpServer.listen(multiPlayerServerOptions.port, function () {
            _this.tick();
            (multiPlayerServerOptions.serverLive) ? multiPlayerServerOptions.serverLive() : (function () { })();
        });
    }
    /**
     * Ticks the server 1 tick (called automatically ever tickSpeed ms)
     */
    MultiPlayerServer.prototype.tick = function () {
        var _this = this;
        this.sceneManager.players.forEach(function (player) {
            player.emit();
        });
        this.sceneManager.draw();
        this.socketConnections.forEach(function (connection) {
            var player = _this.sceneManager.getPlayer(connection.id);
            if (!player)
                return;
            var scene = _this.sceneManager.scenes[player.inSceneID];
            var objects = scene.objects;
            _this.emitData(connection, {
                objects: objects.map(function (object) {
                    return object.serialize();
                }),
                lights: scene.formatLights(scene.lights, [0, 0]),
                dlights: scene.formatDLights(scene.dlights, [0, 0]),
                ambient: scene.ambient,
                fog: scene.fog,
                lighting: scene.lighting
            });
        });
        setTimeout(function () {
            _this.tick();
        }, this.tickSpeed);
    };
    /**
     * Adds a connection and fires onNewConnection event
     * @param socket Socket.io socket to add to the server
     */
    MultiPlayerServer.prototype.addSocketConnection = function (socket) {
        var _this = this;
        var label = this.onNewConnection(socket) || uid();
        this.socketConnections.push({
            socket: socket,
            id: socket.id,
            label: label
        });
        socket.on("__player_initialized__", function (data) { return __awaiter(_this, void 0, void 0, function () {
            var res, playerObject, label, player, playerObject, label, player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = this.onNewPlayer(socket, socket.id, data);
                        if (!(res instanceof Promise)) return [3 /*break*/, 2];
                        return [4 /*yield*/, res];
                    case 1:
                        res = _a.sent();
                        playerObject = res[0];
                        label = res[1];
                        player = new Player({
                            id: socket.id,
                            label: label,
                            socket: socket,
                            playerGameObject: playerObject
                        });
                        this.sceneManager.addPlayer(player);
                        player.enterScene(this.sceneManager.scenes[this.sceneManager.activeScene]);
                        return [3 /*break*/, 3];
                    case 2:
                        if (res instanceof Array) {
                            playerObject = res[0];
                            label = res[1];
                            player = new Player({
                                id: socket.id,
                                label: label,
                                socket: socket,
                                playerGameObject: playerObject
                            });
                            this.sceneManager.addPlayer(player);
                            player.enterScene(this.sceneManager.scenes[this.sceneManager.activeScene]);
                        }
                        _a.label = 3;
                    case 3:
                        this.inputHandler.monitors.forEach(function (monitor) {
                            monitor.activateOn(socket);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("disconnect", function () {
            _this.socketConnections = _this.socketConnections.filter(function (s) {
                return s.id != socket.id;
            });
            _this.onDisconnect(socket);
        });
    };
    /**
     * Broadcasts data to all connected sockets
     * @param data Data to broadcast
     */
    MultiPlayerServer.prototype.broadcastData = function (data) {
        this.io.emit("data", data);
    };
    /**
     * Broadcasts an event to all connected sockets. "__key_down__", "__key_up__", "__player_data__", and "__player_initialized__" are reserved events.
     * @param event Event to broadcast to all connected sockets
     * @param data Data to broadcast to all connected sockets
     */
    MultiPlayerServer.prototype.broadcastEvent = function (event, data) {
        this.io.emit(event, data);
    };
    /**
     * Emits data to a given socket
     * @param socket Either socket.io socket, label of a connection, or a connection to emit data to
     * @param data The data to emit
     */
    MultiPlayerServer.prototype.emitData = function (socket, data) {
        switch (typeof socket) {
            case "string":
                this.socketConnections.forEach(function (s) {
                    if (s.label == socket) {
                        s.socket.emit("data", data);
                    }
                });
                break;
            case "object":
                if (socket.label) {
                    socket.socket.emit("data", data);
                }
                else {
                    socket.emit("data", data);
                }
                break;
            default:
                socket.emit("data", data);
                break;
        }
    };
    /**
     * Emits an event to a given socket. "__key_down__", "__key_up__", "__player_data__", and "__player_initialized__" are reserved events.
     * @param socket Either socket.io socket, label of a connection, or a connection to emit an event to
     * @param event Event to fire
     * @param data Data to emit
     */
    MultiPlayerServer.prototype.emitEvent = function (socket, event, data) {
        switch (typeof socket) {
            case "string":
                this.socketConnections.forEach(function (s) {
                    if (s.label == socket) {
                        s.socket.emit(event, data);
                    }
                });
                break;
            case "object":
                if (socket.label) {
                    socket.socket.emit(event, data);
                }
                else {
                    socket.emit(event, data);
                }
                break;
            default:
                socket.emit(event, data);
                break;
        }
    };
    /**
     * Listens for an event on the server
     * @param event Event to listen for
     * @param callback Callback function to call when the event is fired
     */
    MultiPlayerServer.prototype.on = function (event, callback) {
        this.io.on(event, callback);
    };
    return MultiPlayerServer;
}());
/**
 * @class PlayerClient
 * @classdesc PlayerClient class, used for constructing, running, and managing a multiplayer client
 * @property {any} socket - Socket.io socket of the client
 * @property {any} io - Socket.io instance (used to generate socket)
 * @property {boolean} ready - Whether or not the client is ready
 * @property {Array<NotReadyStackEmitItem>} emitStack - Stack data to emitwhen the client is ready
 * @property {Array<MultiPlayerClientInput>} inputStack - Stack of inputs to activate when the client is ready
 * @property {HTMLCanvasElement} canvas - Canvas to draw the scene on
 * @property {CanvasRenderingContext2D} ctx - CanvasRenderingContext2D of the canvas
 * @property {number} width - Width of the scene
 * @property {number} height - Height of the scene
 * @property {Scene} scene - A Scene reference used to render the objects and lights sent by the server
 * @property {Array<GameObject>} objects - Array of GameObjects in the scene
 * @property {Function} modifyLocalObject - Function to modify the local player's GameObject
 * @property {GameObject | null} localPlayer - Local player's GameObject
 * @example
 * ```js
 * const playerClient = new ANVIL.PlayerClient({
 *   canvas: document.getElementById('canvas'),
 *   modifyLocalObject: function (obj) {
 *      obj.backgroundColor = "blue";
 *      this.scene.bindCamera(obj)
 *  },
 *  sceneOptions: {
 *      fpsMonitoringEnabled: true
 *  }
 * });
 * ```
 */
var PlayerClient = /** @class */ (function () {
    function PlayerClient(options) {
        var _this = this;
        this.io = null;
        var script = document.createElement("script");
        script.src = "/socket.io/socket.io.js";
        document.head.appendChild(script);
        script.addEventListener("load", function () {
            _this.init(window.io);
        });
        this.ready = false;
        this.emitStack = [];
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.scene = new Scene(options.sceneOptions || {});
        this.objects = [];
        this.width = options.width || 500;
        this.height = options.height || 500;
        this.inputStack = [];
        this.localPlayer = null;
        this.modifyLocalObject = options.modifyLocalObject || (function (gameObject) {
            gameObject.backgroundColor = "blue";
            _this.scene.bindCamera(gameObject);
        });
        this.modifyLocalObject.bind(this);
    }
    /**
     * Initializes the client after socket.io is loaded, empties the emitStack and inputStack, and sets the client to ready
     * @param io Socket.io instance
     */
    PlayerClient.prototype.init = function (io) {
        var _this = this;
        this.io = io;
        this.socket = this.io();
        this.socket.emit("__player_initialized__", {
            timestamp: new Date().getTime(),
            cookies: document.cookie
        });
        window.ANVIL.multiplayer = {
            socket: this.socket,
            playerClient: this
        };
        this.on("data", function (data) {
            _this.update(data);
        });
        this.on("__player_data__", function (data) {
            _this.updatePlayer(data);
        });
        this.scene.setDrawingCapabilities(this.canvas, this.ctx, this.width, this.height, "plain");
        this.scene.ready();
        this.setReady();
    };
    /**
     * Updates the client's local player
     * @param data Sets the local player
     */
    PlayerClient.prototype.updatePlayer = function (data) {
        if (this.localPlayer)
            return;
        var player = this.objects.filter(function (object) {
            return object.meta.player && object.meta.id == data.meta.id;
        })[0];
        if (!player)
            return;
        player.isLocalPlayer = true;
        this.localPlayer = player;
    };
    /**
     * Listens for an event, fires the given callback when the event is fired.
     *
     * @param event Event to listen to
     * @param callback Callback to run when the event is fired
     */
    PlayerClient.prototype.on = function (event, callback) {
        if (!this.ready) {
            this.emitStack.push({
                type: "on",
                args: [event, callback]
            });
            return;
        }
        this.socket.on(event, callback);
    };
    /**
     * Emits an event to the server
     *
     * @param event Event to emit. "__key_down__", "__key_up__", "__player_data__", and "__player_initialized__" are reserved events.
     * @param data Data to send to the server
     */
    PlayerClient.prototype.emit = function (event, data) {
        if (!this.ready) {
            this.emitStack.push({
                type: "emit",
                args: [event, data]
            });
            return;
        }
        this.socket.emit(event, data);
    };
    /**
     * Emits data to the server
     * @param data Data to send to the server
     */
    PlayerClient.prototype.emitData = function (data) {
        if (!this.ready) {
            this.emitStack.push({
                type: "emitData",
                args: [data]
            });
            return;
        }
        this.socket.emit("data", data);
    };
    /**
     * Empties the emitStack and inputStack, and sets the client to ready, starts the render loop
     */
    PlayerClient.prototype.setReady = function () {
        var _this = this;
        this.ready = true;
        this.emitStack.forEach(function (item) {
            _this[item.type].apply(_this, item.args);
        });
        this.inputStack.forEach(function (input) {
            input.activate(_this);
        });
        this.on("data", function (data) {
            _this.update(data);
        });
        this.draw();
    };
    /**
     * Updates the scene with data from the server
     *
     * @param data Data to update the client with (Updates lights, objects, fog, ambient lighting, and directional lights)
     */
    PlayerClient.prototype.update = function (data) {
        this.objects = data.objects.map(function (object) {
            var obj = GameObject.From(object);
            return obj;
        });
        this.scene.objects = this.objects;
        this.scene.layers[this.scene.layers.length - 1].objects = this.objects;
        this.scene.formattedLights = data.lights;
        this.scene.formattedDLights = data.dlights;
        this.scene.fog = data.fog;
        this.scene.ambient = data.ambient;
        this.scene.lightsPreFormatted = true;
        this.scene.lighting = data.lighting;
    };
    /**
     * Draws the scene on the canvas
     */
    PlayerClient.prototype.draw = function () {
        var _this = this;
        this.objects.forEach(function (object) {
            if (_this.localPlayer && object.meta.id == _this.socket.id && _this.localPlayer.meta.id == _this.socket.id && _this.localPlayer.meta.id == object.meta.id) {
                _this.modifyLocalObject(object);
            }
        });
        this.scene.plainDraw();
        window.requestAnimationFrame(function () {
            _this.draw();
        });
    };
    return PlayerClient;
}());
/**
 * @class Sound
 * @classdesc Sound class, used for playing sounds in a scene
 * @property {HTMLAudioElement} sound A reference to the HTMLAudioElement that actually plays the sound
 * @property {number} volume The volume that the sound plays at. Value 0-1 where 0 is muted and 1 is full volume. In order to get more volume from the sound, do `amplifyMedia(mySound.sound,x)` where X is the volume multiplier
 * @property {boolean} loop True if the audio loops, false otherwise
 * @property {number} playbackRate The rate of playback of the audio
 * @property {boolean} ready Boolean if the audio is ready to play
 * @property {boolean} wantsToPlay Boolean, true if the `play()` method was called before `ready` became true
 * @property {Array<HTMLAudioElement>} audios List of all audio elements that are playing the sound
 * @property {boolean} playing True if the sound is currently playing on the base source. False otherwise
 */
var Sound = /** @class */ (function () {
    function Sound(options) {
        var _this = this;
        this.sound = new Audio(options.source);
        this.sound.setAttribute("data-uid", "ANVIL_SOUND_INSTANCE_" + uid());
        this.volume = options.volume || 1;
        this.loop = options.loop || false;
        this.playbackRate = options.playbackRate || 1;
        this.audios = [];
        this.wantsToPlay = false;
        this.ready = false;
        this.playing = false;
        this.sound.addEventListener("canplaythrough", function () {
            _this.ready = true;
            if (_this.wantsToPlay)
                _this.play();
        });
        this.sound.addEventListener("ended", function () {
            _this.playing = false;
        });
    }
    Sound.prototype.play = function () {
        var _this = this;
        if (!this.ready) {
            this.wantsToPlay = true;
            return false;
        }
        if (!this.playing) {
            this.sound.volume = this.volume;
            this.sound.loop = this.loop;
            this.sound.playbackRate = this.playbackRate;
            this.sound.play();
            this.playing = true;
        }
        else {
            var audio = new Audio(this.sound.src);
            audio.volume = this.volume;
            audio.setAttribute("data-uid", "ANVIL_SOUND_INSTANCE_" + uid());
            audio.loop = this.loop;
            audio.playbackRate = this.playbackRate;
            audio.play();
            this.audios.push(audio);
            audio.addEventListener("ended", function () {
                _this.audios = _this.audios.filter(function (a) { return a.getAttribute("data-uid") != audio.getAttribute("data-uid"); });
            });
        }
        return true;
    };
    Sound.prototype.setVolume = function (volume) {
        this.volume = volume;
        this.sound.volume = volume;
    };
    Sound.prototype.stop = function () {
        this.playing = false;
        this.sound.pause();
    };
    return Sound;
}());
/**
 * @class SoundEmitterPolygon
 * @classdesc SoundEmitterPolygon class, used for emitting sounds from a polygon. This treats the polygon as a sort of speaker
 * @property {Sound} sound The Sound instance that the SoundEmitterPolygon plays
 * @property {GameObject} listener The GameObject that "listens" to the sound. Sound volume will be determined by distance to this game object
 * @property {number} maxDistance The maximum distance that the sound can be heard from (if the listener is farther than this, the sound will not be heard)
 * @property {number} minDistance The minimum distance that the sound can be heard from (if the listener is closer than this, the sound will be heard at full volume)
 * @property {Function} fallOffFunction The function that determines the fall off of the sound. Takes in a distance and returns a volume (0-1). By default, the fall off is linear.
 * @example
 * ```js
 *  const soundEmitter = new ANVIL.SoundEmitterPolygon({
 *      points: [[0,0],[100,0],[100,100],[0,100]],
 *      backgroundColor: "red",
 *      }, {
 *          listener: playerObject,
 *          source: "path/to/sound.mp3",
 *          loop: true,
 *          volume: 1,
 *          maxDistance: 1000,
 *          minDistance: 0,
 *          fallOffFunction: (distance) => {
 *              var falloffstart = this.maxDistance - this.minDistance;
 *              var dist = distance - this.minDistance;
 *              var vol = 1 - (dist / falloffstart);
 *              if (vol < 0) vol = 0;
 *              return vol;
 *          }
 *      }
 *  });
 * ```
 */
var SoundEmitterPolygon = /** @class */ (function (_super) {
    __extends(SoundEmitterPolygon, _super);
    function SoundEmitterPolygon(options, soundOptions) {
        var _this = _super.call(this, options) || this;
        soundOptions.loop = (soundOptions.loop == undefined) ? true : soundOptions.loop;
        _this.sound = new Sound(soundOptions);
        _this.listener = soundOptions.listener;
        _this.maxDistance = soundOptions.maxDistance || 1000;
        _this.minDistance = soundOptions.minDistance || 0;
        _this.fallOffFunction = soundOptions.fallOffFunction || (function (distance) {
            var falloffstart = _this.maxDistance - _this.minDistance;
            var dist = distance - _this.minDistance;
            var vol = 1 - (dist / falloffstart);
            if (vol < 0)
                vol = 0;
            return vol;
        });
        var startPlaying = (soundOptions.startPlaying == undefined) ? true : soundOptions.startPlaying;
        if (startPlaying)
            _this.sound.play();
        return _this;
    }
    /**
     * Updates the sound based on the listener's position, then calls the update method of the Polygon
     * @returns {void}
     */
    SoundEmitterPolygon.prototype.update = function () {
        var dist = distance(getCentroid(this.polify()), getCentroid(this.listener.polify()));
        if (dist < this.minDistance) {
            this.sound.setVolume(1);
        }
        else if (dist > this.maxDistance) {
            this.sound.setVolume(0);
        }
        else {
            this.sound.setVolume(this.fallOffFunction(dist));
        }
        _super.prototype.update.call(this);
    };
    /**
     * Plays the sound
     * @returns {void}
     */
    SoundEmitterPolygon.prototype.play = function () {
        this.sound.play();
    };
    /**
     * Stops the sound
     * @returns {void}
     */
    SoundEmitterPolygon.prototype.stop = function () {
        this.sound.stop();
    };
    return SoundEmitterPolygon;
}(Polygon));
/**
 * @class
 * @classdesc SoundEmitterSprite class, used for emitting sounds from a Sprite. This treats the Sprite as a sort of speaker
 * @property {Sound} sound The Sound instance that the SoundEmitterPolygon plays
 * @property {GameObject} listener The GameObject that "listens" to the sound. Sound volume will be determined by distance to this game object
 * @property {number} maxDistance The maximum distance that the sound can be heard from (if the listener is farther than this, the sound will not be heard)
 * @property {number} minDistance The minimum distance that the sound can be heard from (if the listener is closer than this, the sound will be heard at full volume)
 * @property {Function} fallOffFunction The function that determines the fall off of the sound. Takes in a distance and returns a volume (0-1). By default, the fall off is linear.
 * @example
 * ```js
 *  const soundEmitter = new ANVIL.SoundEmitterSprite({
 *      coordinates: [0,0],
 *      width: 100,
 *      height: 100,
 *      url: "path/to/sprite.png",
 *      soundOptions: {
 *          source: "path/to/sound.mp3",
 *          listener: playerObject,
 *          loop: true,
 *          volume: 1,
 *          maxDistance: 1000,
 *          minDistance: 0,
 *          fallOffFunction: (distance) => {
 *              var falloffstart = this.maxDistance - this.minDistance;
 *              var dist = distance - this.minDistance;
 *              var vol = 1 - (dist / falloffstart);
 *              if (vol < 0) vol = 0;
 *              return vol;
 *          }
 *      }
 *  });
 * ```
 */
var SoundEmitterSprite = /** @class */ (function (_super) {
    __extends(SoundEmitterSprite, _super);
    function SoundEmitterSprite(options, soundOptions) {
        var _this = _super.call(this, options) || this;
        _this.sound = new Sound(soundOptions);
        _this.listener = soundOptions.listener;
        _this.maxDistance = soundOptions.maxDistance || 1000;
        _this.minDistance = soundOptions.minDistance || 0;
        _this.fallOffFunction = soundOptions.fallOffFunction || (function (distance) {
            var falloffstart = _this.maxDistance - _this.minDistance;
            var dist = distance - _this.minDistance;
            var vol = 1 - (dist / falloffstart);
            if (vol < 0)
                vol = 0;
            return vol;
        });
        var startPlaying = (soundOptions.startPlaying == undefined) ? true : soundOptions.startPlaying;
        if (startPlaying)
            _this.sound.play();
        return _this;
    }
    /**
     * Updates the sound based on the listener's position, then calls the update method of the Sprite
     * @returns {void}
     */
    SoundEmitterSprite.prototype.update = function () {
        var dist = distance(getCentroid(this.polify()), getCentroid(this.listener.polify()));
        if (dist < this.minDistance) {
            this.sound.setVolume(1);
        }
        else if (dist > this.maxDistance) {
            this.sound.setVolume(0);
        }
        else {
            this.sound.setVolume(this.fallOffFunction(dist));
        }
        _super.prototype.update.call(this);
    };
    /**
     * Plays the sound
     * @returns {void}
     */
    SoundEmitterSprite.prototype.playSound = function () {
        this.sound.play();
    };
    /**
     * Stops the sound
     * @returns {void}
     */
    SoundEmitterSprite.prototype.stopSound = function () {
        this.sound.stop();
    };
    return SoundEmitterSprite;
}(Sprite));
var ANVIL = {
    GameObject: GameObject,
    Polygon: Polygon,
    Sprite: Sprite,
    Particle: Particle,
    Particles: Particles,
    Text: Text,
    Sound: Sound,
    SoundEmitterPolygon: SoundEmitterPolygon,
    SoundEmitterSprite: SoundEmitterSprite,
    Light: Light,
    DirectionalLight: DirectionalLight,
    Scene: Scene,
    Layer: Layer,
    SceneManager: SceneManager,
    MultiPlayerSceneManager: MultiPlayerSceneManager,
    Player: Player,
    MultiPlayerServer: MultiPlayerServer,
    PlayerClient: PlayerClient,
    Input: Input,
    MultiPlayerClientInput: MultiPlayerClientInput,
    MultiPlayerInputHandler: MultiPlayerInputHandler,
    ServerInputHandler: ServerInputHandler,
    isConvex: isConvex,
    instanceOfDirectionalLight: instanceOfDirectionalLight,
    getCentroid: getCentroid,
    calculateFPS: calculateFPS,
    findTopLeftMostPoint: findTopLeftMostPoint,
    isSquare: isSquare,
    distance: distance,
    getBoundingBox: getBoundingBox,
    sumArrays: sumArrays,
    multArrays: multArrays,
    uid: uid,
    checkSquareCollision: checkSquareCollision,
    checkCollision: checkCollision,
    amplifyMedia: amplifyMedia
};
if (typeof window != "undefined") {
    window.ANVIL = ANVIL;
}

return ANVIL;
})();