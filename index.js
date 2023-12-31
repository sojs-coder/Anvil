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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Matter = require("matter-js");
var GPU = require("gpu.js");
function GPULightingKernel(pix, width, height, lights, numLights, dlights, numDlights, ambient, fog, globalAlpha) {
    var i = this.thread.y;
    var j = this.thread.x;
    var rowsDown = height - i;
    var pixNum = ((width * rowsDown) + j) * 4;
    var brightness = [ambient, ambient, ambient];
    for (var k = 0; k < numLights; k++) {
        var ln = k * 7;
        var attenuation = (1 - Math.pow(Math.min(distance([j, i], [lights[ln], height - lights[ln + 1]]), lights[ln + 3]) / lights[ln + 3], fog));
        var strength = lights[ln + 2];
        brightness[0] += attenuation * strength * (lights[ln + 4] / 255);
        brightness[1] += attenuation * strength * (lights[ln + 5] / 255);
        brightness[2] += attenuation * strength * (lights[ln + 6] / 255);
    }
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
        if (angleDiff <= spread / 2) {
            var diffuseFactor = Math.max(0, Math.cos(angleDiff) * (1 - (dist / diffuse)));
            brightness[0] += diffuseFactor * intensity * (redL / 255);
            brightness[1] += diffuseFactor * intensity * (greenL / 255);
            brightness[2] += diffuseFactor * intensity * (blueL / 255);
        }
    }
    var red = ((pix[pixNum] / 255) * brightness[0]) * globalAlpha;
    var green = ((pix[pixNum + 1] / 255) * brightness[1]) * globalAlpha;
    var blue = ((pix[pixNum + 2] / 255) * brightness[2]) * globalAlpha;
    var alpha = (pix[pixNum + 3] / 255) * globalAlpha;
    this.color(red, green, blue, alpha);
}
// checks if a polygon is convex
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
function instanceOfDirectionalLight(light) {
    return light.angle !== undefined;
}
// gets the centroid of a polygon
function getCentroid(points) {
    var x = 0, y = 0;
    for (var i = 0; i < points.length; i++) {
        x += points[i][0];
        y += points[i][1];
    }
    return [x / points.length, y / points.length];
}
// calculates FPS based on a buffer
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
    var uniqueSideLengths = new Set(sideLengths);
    return uniqueSideLengths.size === 1;
}
// gets the distance between two points
function distance(point1, point2) {
    return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}
// calculates the bounding box of a polygon based on a set of vertices
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
function checkSquareCollision(poly1, poly2) {
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
    function overlap(projection1, projection2) {
        return (projection1.max >= projection2.min && projection2.max >= projection1.min);
    }
    var axes1 = getAxes(poly1);
    var axes2 = getAxes(poly2);
    for (var _i = 0, _a = __spreadArray(__spreadArray([], axes1, true), axes2, true); _i < _a.length; _i++) {
        var axis = _a[_i];
        var projection1 = project(poly1, axis);
        var projection2 = project(poly2, axis);
        if (!overlap(projection1, projection2)) {
            // If there is any axis of separation, the polygons do not intersect
            return false;
        }
    }
    // If no separating axis is found, the polygons intersect
    return true;
}
// checks if a point is inside a polygon (not good for collision detection (does not check for edges intersecting) use checkSquareCollision()
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
var GameObject = /** @class */ (function () {
    function GameObject(options) {
        if (options === void 0) { options = {}; }
        // will physics work on this object?
        this.physicsEnabled = options.physicsEnabled || false;
        this.physicsOptions = options.physicsOptions || {};
        if (this.physicsEnabled) {
            this.body = {};
        }
        // unique ID for each object
        this.id = uid();
        // where can it move? set with scene.setBoundaries()
        this.bounds = [];
        this.boundsActive = false;
        // does nothing!
        this.pinned = true;
        this._state = {};
        this.square = false; // assume the worst
        this.hitbox = [0, 0];
        this.points = [];
        this.coordinates = [0, 0];
        this.type = "gameObject";
        this.convex = false; // assume the worst
    }
    // changes an attribute of the object (non destructive). To return to the orignal object, use returnState.
    GameObject.prototype.state = function (attr, value) {
        var _this = this;
        Object.keys(this).forEach(function (key) {
            if (key == "_state")
                return;
            _this._state[key] = _this[key];
        });
        this[attr] = value;
    };
    // returns to the old state (before state() was called)
    GameObject.prototype.returnState = function () {
        var _this = this;
        Object.keys(this._state).forEach(function (key) {
            _this[key] = _this._state[key];
        });
    };
    // updates object physics 1 tick
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
    // applies a force to the object (only works if physics enabled)
    GameObject.prototype.applyForce = function (vector) {
        var vec = Matter.Vector.create(vector[0], vector[1]);
        Matter.Body.applyForce(this.body, this.body.position, vec);
    };
    // modifies pin
    GameObject.prototype.unpin = function () {
        this.pinned = false;
    };
    GameObject.prototype.pin = function () {
        this.pinned = true;
    };
    // should return an array of points (eg: objects bounds). used for collision detection
    GameObject.prototype.polify = function () {
        return [];
    };
    GameObject.prototype.draw = function (options) { };
    // sets the object's bounds
    GameObject.prototype.setBounds = function (bounds) {
        this.bounds = bounds;
        this.boundsActive = true;
    };
    GameObject.prototype.disableBounds = function () {
        this.boundsActive = false;
    };
    GameObject.prototype.activateBounds = function () {
        this.boundsActive = true;
    };
    // statically moves the object (no forces involved)
    GameObject.prototype.moveStatic = function (vector) {
        if (!this.physicsEnabled)
            return this.move(vector);
        var newX = this.body.position.x + vector[0];
        var newY = this.body.position.y + vector[1];
        Matter.Body.setPosition(this.body, Matter.Vector.create(newX, newY));
        return true;
    };
    GameObject.prototype.getWidth = function () {
        return 0;
    };
    GameObject.prototype.getHeight = function () {
        return 0;
    };
    // top level move function (works with both physics enabled and disabled)... needs helper functions getWidth(), getHeight() to be defined. Recommended to re-write based on your use case (if extending) 
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
    // used polify() to check for a collision between this and that object (remember to set whether the bounds are square, or a convex polygon... changes the collision detection method used)
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
    return GameObject;
}());
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
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
    Polygon.prototype.setHitBox = function (width, height) {
        this.hitbox = [width, height];
        this.square = true;
    };
    Polygon.prototype.draw = function (options) {
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
    Polygon.prototype.polify = function () {
        return this.points;
    };
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
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
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
    Sprite.prototype.getWidth = function () {
        return this.width;
    };
    Sprite.prototype.getHeight = function () {
        return this.height;
    };
    Sprite.prototype.reload = function () {
        var _this = this;
        this.source.src = this.image;
        this.source.crossOrigin = 'anonymous';
        this.source.onload = function () {
            _this.spriteLoaded = true;
        };
    };
    Sprite.prototype.draw = function (options) {
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
    Sprite.prototype.reshape = function (width, height) {
        this.width = width;
        this.height = height;
        this.hitbox = [this.width, this.height];
    };
    Sprite.prototype.scale = function (factor) {
        this.width = this.width * factor;
        this.height = this.height * factor;
        this.hitbox = [this.width, this.height];
    };
    Sprite.prototype.changeSource = function (image) {
        this.image = image;
        this.reload();
    };
    Sprite.prototype.polify = function () {
        var point1 = [this.coordinates[0], this.coordinates[1]];
        var point2 = [this.coordinates[0] + this.width, this.coordinates[1]];
        var point3 = [this.coordinates[0] + this.width, this.coordinates[1] + this.height];
        var point4 = [this.coordinates[0], this.coordinates[1] + this.height];
        return [point1, point2, point3, point4];
    };
    return Sprite;
}(GameObject));
var Light = /** @class */ (function () {
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
    Light.prototype.pin = function (object) {
        this.pinnedTo = object;
    };
    Light.prototype.brighten = function (factor) {
        this.strength *= factor;
    };
    Light.prototype.dim = function (factor) {
        this.strength /= factor;
    };
    Light.prototype.move = function (vector) {
        this.point = sumArrays(this.point, vector);
    };
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
    Light.prototype.update = function (canvas) {
        if (this.pinnedTo) {
            this.moveToObject(this.pinnedTo);
        }
    };
    return Light;
}());
var DirectionalLight = /** @class */ (function (_super) {
    __extends(DirectionalLight, _super);
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
    DirectionalLight.prototype.pinAngleTo = function (object) {
        this.pinnedToAngle = object;
    };
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
var Scene = /** @class */ (function () {
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
        this.clearScene = options.clear || true;
        this.bounds = options.bounds || [0, 0];
        this.boundsActive = (options.bounds) ? true : false;
        this.cameraBind = options.bindCameraTo || null;
        this.FPS_BUFFER_SIZE = options.FPS_BUFFER_SIZE || 60;
        this.isActiveScene = false;
        if (this.lighting) {
            this.fog = (options.lightOptions) ? options.lightOptions.fog || 1.3 : 1.3;
            this.ambient = (options.lightOptions) ? options.lightOptions.ambient || 0.2 : 0.2;
        }
        else {
            this.fog = 1.3;
            this.ambient = 0.2;
        }
        if (typeof GPU == "function") {
            this.gpu = new GPU(options.GPUsettings || {});
        }
        else {
            this.gpu = new GPU.GPU(options.GPUsettings || {});
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
    }
    Scene.prototype.ready = function () {
        if (this.lighting) {
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
        this.readyToDraw = true;
    };
    Scene.prototype.addLight = function (light) {
        if (instanceOfDirectionalLight(light)) {
            this.dlights.push(light);
        }
        else {
            this.lights.push(light);
        }
    };
    Scene.prototype.formatLights = function (lights) {
        var _this = this;
        var flights = lights.map(function (l) {
            return [l.point[0] - _this.cameraAngle[0], l.point[1] - _this.cameraAngle[1], l.strength, l.diffuse, l.color];
        });
        return flights.flat(2);
    };
    Scene.prototype.formatDLights = function (lights) {
        var _this = this;
        var dlights = lights.map(function (l) {
            return [l.angle, l.point[0] - _this.cameraAngle[0], l.point[1] - _this.cameraAngle[1], l.strength, l.diffuse, l.spread, l.color];
        });
        return dlights.flat(2);
    };
    Scene.prototype.diffuseLights = function (ambient, fog) {
        var _this = this;
        if (ambient === void 0) { ambient = 0.2; }
        if (fog === void 0) { fog = 1.3; }
        this.lights.forEach(function (l) {
            l.update(_this.canvas);
        });
        this.dlights.forEach(function (l) {
            l.update(_this.canvas);
        });
        var lights = this.lights.filter(function (light) {
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
        var flights = this.formatLights(lights);
        var dflights = this.formatDLights(dlights);
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
    Scene.prototype.disableBounds = function () {
        this.boundsActive = false;
        this.objects.forEach(function (object) {
            object.disableBounds();
        });
    };
    Scene.prototype.activateBounds = function () {
        this.boundsActive = true;
        this.objects.forEach(function (object) {
            object.activateBounds();
        });
    };
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
    Scene.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Scene.prototype.draw = function () {
        var _this = this;
        if (!this.readyToDraw)
            return;
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
        if (this.lighting) {
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
    Scene.prototype.removeObject = function (object) {
        this.objects.filter(function (compare) {
            return !(compare.id == object.id);
        });
    };
    Scene.prototype.enableCollisionsBetween = function (o1, o2, fo, ff) {
        this.collisionMonitors.push([o1, o2, fo, ff, false]);
        this.collisionMonitors.push([o2, o1, fo, ff, false]);
    };
    Scene.prototype.bindCamera = function (object) {
        this.cameraBind = object;
    };
    Scene.prototype.unbindCamera = function () {
        this.cameraBind = null;
    };
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
    Scene.prototype.moveCamera = function (vector) {
        this.cameraAngle = sumArrays(this.cameraAngle, vector);
    };
    Scene.prototype.enableFPS = function () {
        this.fpsMonitoringEnabled = true;
    };
    Scene.prototype.disableFPS = function () {
        this.fpsMonitoringEnabled = false;
    };
    return Scene;
}());
var Input = /** @class */ (function () {
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
    Input.prototype.stopFiring = function () {
        if (this.firing) {
            this.firing = false;
            clearInterval(this.fireInterval);
        }
    };
    Input.prototype.activate = function (scene) {
        var _this = this;
        this.active = true;
        if (this.clickMonitor) {
            document.addEventListener("mousedown", function (event) {
                if (!scene.isActiveScene)
                    return;
                var rect = scene.canvas.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;
                scene.objects.forEach(function (object) {
                    var r = sumArrays([x, y], scene.cameraAngle);
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
    Input.prototype.reactivate = function () {
        this.active = true;
    };
    Input.prototype.deactivate = function () {
        this.active = false;
        this.stopFiring();
    };
    return Input;
}());
var SceneManager = /** @class */ (function () {
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
        this.scenes[initialScene.id].width = this.width;
        this.scenes[initialScene.id].height = this.height;
        this.scenes[initialScene.id].canvas = this.canvas;
        this.scenes[initialScene.id].ctx = this.ctx;
        this.scenes[initialScene.id].ready();
        this.draw();
        this.animationNames = ["quickFade", "slowFade", "slideLeft", "crossFade"];
        this.animationRunning = false;
        initialScene.isActiveScene = true;
    }
    SceneManager.prototype.changeScene = function (scene) {
        this.scenes[this.activeScene].isActiveScene = false;
        this.scenes[scene.id] = scene;
        this.scenes[scene.id].isActiveScene = true;
        this.activeScene = scene.id;
    };
    SceneManager.prototype.addScene = function (scene) {
        var arg1 = scene;
        this.scenes[arg1.id] = arg1;
        arg1.width = this.width;
        arg1.height = this.height;
        arg1.canvas = this.canvas;
        arg1.ctx = this.ctx;
        arg1.ready();
    };
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
