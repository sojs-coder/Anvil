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
var Matter = require("matter-js");
var createCanvas = require("canvas").createCanvas;
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
        this.gameObjectOptions = options;
        // will physics work on this object?
        this.physicsEnabled = options.physicsEnabled || false;
        this.physicsOptions = options.physicsOptions || {};
        if (this.physicsEnabled) {
            this.body = {};
        }
        // unique ID for each object
        this.id = options.id || uid();
        // where can it move? set with scene.setBoundaries()
        this.bounds = options.bounds || [0, 0];
        this.boundsActive = options.boundsActive || false;
        // does nothing!
        this.pinned = true;
        this._state = options._state || {};
        this.square = options.square || false; // assume the worst
        this.hitbox = options.hitbox || [0, 0];
        this.points = options.points || [];
        this.coordinates = options.coordinates || [0, 0];
        this.type = options.type || "gameObject";
        this.convex = options.convex || false; // assume the worst
        this.meta = options.meta || {};
        this.isLocalPlayer = false;
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
     * Modifies pin
     */
    GameObject.prototype.unpin = function () {
        this.pinned = false;
    };
    /**
     * Modifies pin
     */
    GameObject.prototype.pin = function () {
        this.pinned = true;
    };
    /**
     * Returns the gameobject represented as an array of points.
     * @returns An array of points (eg: objects bounds). used for collision detection
     */
    GameObject.prototype.polify = function () {
        return [];
    };
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
     * Moves the object by a vector (no forces involved)
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
     * Gets the width of the object.
     * @returns The width of the object. Useful for polygons, as polygons do not have a reliable width property
     */
    GameObject.prototype.getWidth = function () {
        return 0;
    };
    /**
     * Gets the height of the object.
     * @returns The height of the object. Useful for polygons, as polygons do not have a reliable height property
     */
    GameObject.prototype.getHeight = function () {
        return 0;
    };
    /**
     * Top level move function (works with both physics enabled and disabled)... needs helper functions getWidth(), getHeight() to be defined. Recommended to re-write based on your use case (if extending)
     * @param vector Vector to move the object by
     * @param continueAfterPhysics If set to false, the object will not move if physics are not enabled. If true, the object will move if physics are not enabled. True by defualt
     * @returns Boolean, true if the move was successful, false if it was not (if it was out of bounds, it will not move)
     */
    GameObject.prototype.move = function (vector, continueAfterPhysics) {
        if (continueAfterPhysics === void 0) { continueAfterPhysics = true; }
        var newCoords = sumArrays(this.coordinates, vector);
        if (this.physicsEnabled) {
            Matter.Body.setVelocity(this.body, { x: vector[0] + this.body.velocity.x, y: vector[1] + this.body.velocity.y });
            return true;
        }
        else {
            if (!continueAfterPhysics)
                return false;
        }
        if (this.boundsActive) {
            if (newCoords[0] < 0 || newCoords[0] + this.getWidth() > this.bounds[0] || newCoords[1] < 0 || newCoords[1] + this.getHeight() > this.bounds[1]) {
                var passesRightBound = (newCoords[0] + this.getWidth() > this.bounds[0]);
                var passesLeftBound = (newCoords[0] < 0);
                var passesTopBound = (newCoords[1] < 0);
                var passesBottomBound = (newCoords[1] + this.getHeight() > this.bounds[1]);
                if (passesRightBound) {
                    this.coordinates[0] = this.bounds[0] - this.getWidth();
                }
                if (passesLeftBound) {
                    this.coordinates[0] = 0;
                }
                if (passesTopBound) {
                    this.coordinates[1] = 0;
                }
                if (passesBottomBound) {
                    this.coordinates[1] = this.bounds[1] - this.getHeight();
                }
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
     * Does nothing
     */
    GameObject.prototype.update = function () {
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
        this.source.src = this.image;
        this.source.crossOrigin = 'anonymous';
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
        _super.prototype.draw.call(this, options);
        var ctx = options.ctx, camera = options.camera;
        if (!this.physicsEnabled) {
            ctx.drawImage(this.source, this.coordinates[0] - camera[0], this.coordinates[1] - camera[1], this.width, this.height);
        }
        else {
            var c = getCentroid(this.points);
            var _a = [c[0] - camera[0], c[1] - camera[1]], x = _a[0], y = _a[1];
            var rotation = this.body.angle;
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
    return Sprite;
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
 * // light at position [0, 0], diffuse 0.5, strength 0.8, color [255, 255, 255] (white)
 * const light = new DirectionalLight([0, 0], 0.5, 0.8, [255, 255, 255]);
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
 * @class Scene
 * @classdesc Scene class, used for building scenes
 * @property {Array<GameObject>} objects - Objects in the scene
 * @property {Array<CollisionMonitor>} collisionMonitors - Collision monitors in the scene
 * @property {Vec2} cameraAngle - Position of the camera
 * @property {Array<number>} fpsBuffer - Buffer that holds the last FPS_BUFFER_SIZE frames rendering times (in ms)
 * @property {boolean} fpsMonitoringEnabled - Whether or not to monitor the fps
 * @property {number} lastFrameStamp - Last frame stamp
 * @property {number} lastPhysicsUpdate - Last physics update
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
 * @property {boolean} physics - Whether or not physics is enabled
 * @property {any} Engine - Matter.js Engine
 * @property {any} Bodies - Matter.js Bodies
 * @property {any} Composite - Matter.js Composite
 * @property {any} engine - Matter.js engine instance
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
 *
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
        this.lastPhysicsUpdate = performance.now();
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
        if (options.physics) {
            this.physics = true;
            this.Engine = Matter.Engine;
            this.Bodies = Matter.Bodies;
            this.Composite = Matter.Composite;
            this.engine = Matter.Engine.create(options.physicsOptions);
        }
        else {
            this.physics = false;
            this.Engine = null;
            this.Bodies = null;
            this.Composite = null;
            this.engine = null;
        }
        this.readyToDraw = false;
        this.drawMode = "full";
    }
    /**
     * Initializes the scene, specifically the light rendering kernel
     */
    Scene.prototype.ready = function () {
        this.configureLightingKernel();
        this.readyToDraw = true;
    };
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
        // lights = this.lights.filter((light) => {
        //     // only draw if within the camera view
        //     var cameraX = this.cameraAngle[0];
        //     var cameraY = this.cameraAngle[1];
        //     var x = light.point[0];
        //     var y = light.point[1];
        //     var dx = x - cameraX;
        //     var dy = y - cameraY;
        //     var sceneWidth = this.canvas.width;
        //     var sceneHeight = this.canvas.height;
        //     var diffuseFactor = light.diffuse;
        //     var isBoundedLeft = dx + diffuseFactor > 0;
        //     var isBoundedRight = dx - diffuseFactor < sceneWidth;
        //     var isBoundedTop = dy + diffuseFactor > 0;
        //     var isBoundedBottom = dy - diffuseFactor < sceneHeight;
        //     // take in a account the diffuse factor
        //     var isInBounds = isBoundedLeft && isBoundedRight && isBoundedTop && isBoundedBottom;
        //     return isInBounds;
        // });
        var dlights = this.dlights;
        var width = this.canvas.width;
        var height = this.canvas.height;
        var numLights = lights.length;
        var numDLights = dlights.length;
        var pix = this.ctx.getImageData(0, 0, width, height).data;
        var flights = this.formatLights(lights, this.cameraAngle);
        var dflights = this.formatDLights(dlights, this.cameraAngle);
        // var flights = Array.from(this.formattedLights);
        // var dflights = Array.from(this.formattedDLights);
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
        this.bounds = [rightBound || this.canvas.width, bottomBound || this.canvas.height];
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
     * Disables the boundaries of the scene
     */
    Scene.prototype.disableBounds = function () {
        this.boundsActive = false;
        this.objects.forEach(function (object) {
            object.disableBounds();
        });
    };
    /**
     * Enables the boundaries of the scene
     */
    Scene.prototype.activateBounds = function () {
        this.boundsActive = true;
        this.objects.forEach(function (object) {
            object.activateBounds();
        });
    };
    /**
     * Adds the specified GameObject to the scene
     *
     * @param object GameObject to add to the scene
     */
    Scene.prototype.addObject = function (object) {
        object.scene = this.id;
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
        this.objects.push(object);
    };
    /**
     * Clears the canvas that the scene is being drawn on
     */
    Scene.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
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
    Scene.prototype.plainDraw = function () {
        var _this = this;
        this.check();
        if (!this.readyToDraw)
            return;
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        this.objects.forEach(function (object) {
            object.draw({ ctx: _this.ctx, camera: _this.cameraAngle, canvas: _this.canvas });
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
        var _this = this;
        this.check();
        if (!this.readyToDraw)
            return;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        if (this.clearScene)
            this.clear();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.physics) {
            var physicsNow = performance.now();
            var pElapsedTime = physicsNow - this.lastPhysicsUpdate;
            Matter.Engine.update(this.engine, pElapsedTime);
            this.lastPhysicsUpdate = physicsNow;
            this.objects.forEach(function (object) {
                if (object.physicsEnabled) {
                    object.updatePhysics();
                }
            });
        }
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        this.objects.forEach(function (object) {
            object.draw({ ctx: _this.ctx, camera: _this.cameraAngle, canvas: _this.canvas });
        });
        this.collisionMonitors = this.collisionMonitors.map(function (monitor) {
            var o1 = monitor[0], o2 = monitor[1], f = monitor[2], f2 = monitor[3], active = monitor[4];
            if (o1.checkCollision(o2)) {
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
            return [o1, o2, f, f2, active];
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
    Scene.prototype.drawFromPassedObjects = function (objects) {
        this.objects = objects;
    };
    Scene.prototype.updateAll = function () {
        if (!this.readyToDraw)
            return;
        this.update();
        if (this.physics) {
            var physicsNow = performance.now();
            var pElapsedTime = physicsNow - this.lastPhysicsUpdate;
            Matter.Engine.update(this.engine, pElapsedTime);
            this.lastPhysicsUpdate = physicsNow;
            this.objects.forEach(function (object) {
                if (object.physicsEnabled) {
                    object.updatePhysics();
                }
            });
        }
        if (this.cameraBind) {
            this.cameraTo(this.cameraBind);
        }
        this.objects.forEach(function (object) {
            object.update();
        });
        this.collisionMonitors = this.collisionMonitors.map(function (monitor) {
            var o1 = monitor[0], o2 = monitor[1], f = monitor[2], f2 = monitor[3], active = monitor[4];
            if (o1.checkCollision(o2)) {
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
            return [o1, o2, f, f2, active];
        });
        this.updateLights();
    };
    /**
     * Removes a GameObject from the scene
     * @param object GameObject to remove from the scene
     */
    Scene.prototype.removeObject = function (object) {
        this.objects.filter(function (compare) {
            return !(compare.id == object.id);
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
     */
    Scene.prototype.enableCollisionsBetween = function (o1, o2, fo, ff) {
        this.collisionMonitors.push([o1, o2, fo, ff, false]);
        this.collisionMonitors.push([o2, o1, fo, ff, false]);
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
        window.requestAnimationFrame(function () {
            _this.draw();
        });
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
     * @param scene Scene to activate the input on (Only matters if the input is a click monitor)
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
                activateOn.objects.forEach(function (object) {
                    var r = sumArrays([x, y], activateOn.cameraAngle);
                    if (checkCollision(object.polify(), [r])) {
                        _this.on(object);
                        document.addEventListener("mouseup", function (event) {
                            object.returnState();
                        });
                    }
                });
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
var MultiPlayerClientInput = /** @class */ (function () {
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
var MultiPlayerInputHandler = /** @class */ (function () {
    function MultiPlayerInputHandler(options) {
        this.monitors = options.monitors;
    }
    return MultiPlayerInputHandler;
}());
var ServerInputHandler = /** @class */ (function () {
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
    ServerInputHandler.prototype.init = function (sceneManager) {
        this.sceneManager = sceneManager;
        this.active = true;
    };
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
    ServerInputHandler.prototype.stopFiring = function (socket) {
        if (this.firing[socket.id]) {
            this.firing[socket.id] = false;
            clearInterval(this.fireIntervals[socket.id]);
        }
    };
    return ServerInputHandler;
}());
var Player = /** @class */ (function () {
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
    Player.prototype.enterScene = function (scene) {
        scene.addObject(this.gameObject);
        this.inSceneID = scene.id;
    };
    Player.prototype.emit = function () {
        this.socket.emit("__player_data__", this.gameObject);
    };
    return Player;
}());
var MultiPlayerSceneManager = /** @class */ (function (_super) {
    __extends(MultiPlayerSceneManager, _super);
    function MultiPlayerSceneManager(options) {
        var _this = _super.call(this, __assign(__assign({}, options), { canvas: createCanvas(options.width || 500, options.height || 500), width: options.width || 500, height: options.height || 500, start: false })) || this;
        _this.players = [];
        _this.showPlayerLabels = options.showPlayerLabels || false;
        _this.draw();
        return _this;
    }
    MultiPlayerSceneManager.prototype.addPlayer = function (player) {
        player.gameObject.meta.showLabel = this.showPlayerLabels;
        this.players.push(player);
    };
    MultiPlayerSceneManager.prototype.removePlayer = function (player) {
        this.players = this.players.filter(function (p) { return p.id != player.id; });
    };
    MultiPlayerSceneManager.prototype.getPlayer = function (id) {
        return this.players.filter(function (p) { return p.id == id; })[0];
    };
    MultiPlayerSceneManager.prototype.getPlayerByLabel = function (label) {
        return this.players.filter(function (p) { return p.label == label; })[0];
    };
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
var MultiPlayerServer = /** @class */ (function () {
    function MultiPlayerServer(multiPlayerServerOptions) {
        var _this = this;
        var socketio = require("socket.io");
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
        this.newPlayerObject = multiPlayerServerOptions.newPlayerObject || new GameObject();
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
                _this.onDisconnect(s.socket);
                return s.id != socket.id;
            });
        });
    };
    MultiPlayerServer.prototype.broadcastData = function (data) {
        this.io.emit("data", data);
    };
    MultiPlayerServer.prototype.broadcastEvent = function (event, data) {
        this.io.emit(event, data);
    };
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
    MultiPlayerServer.prototype.on = function (event, callback) {
        this.io.on(event, callback);
    };
    return MultiPlayerServer;
}());
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
        this.modifyLocalObject = options.modifyLocalObject || (function (gameObject) {
            gameObject.backgroundColor = "blue";
            _this.scene.bindCamera(gameObject);
        });
        this.modifyLocalObject.bind(this);
    }
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
    PlayerClient.prototype.update = function (data) {
        this.objects = data.objects.map(function (object) {
            var obj = GameObject.From(object);
            return obj;
        });
        this.scene.objects = this.objects;
        this.scene.formattedLights = data.lights;
        this.scene.formattedDLights = data.dlights;
        this.scene.fog = data.fog;
        this.scene.ambient = data.ambient;
        this.scene.lightsPreFormatted = true;
        this.scene.lighting = data.lighting;
    };
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
var ANVIL = {
    GameObject: GameObject,
    Polygon: Polygon,
    Sprite: Sprite,
    Light: Light,
    DirectionalLight: DirectionalLight,
    Scene: Scene,
    SceneManager: SceneManager,
    MultiPlayerSceneManager: MultiPlayerSceneManager,
    Player: Player,
    MultiPlayerServer: MultiPlayerServer,
    PlayerClient: PlayerClient,
    Input: Input,
    MultiPlayerClientInput: MultiPlayerClientInput,
    MultiPlayerInputHandler: MultiPlayerInputHandler,
    ServerInputHandler: ServerInputHandler
};
if (typeof window != "undefined") {
    window.ANVIL = ANVIL;
}
module.exports = ANVIL;
