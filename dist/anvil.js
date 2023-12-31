const FPS_BUFFER_LENGTH = 150;
function calculateFPS(buffer) {
  buffer = buffer.map(t => {
    var seconds = 1000 / t;
    return seconds
  });
  const average = array => array.reduce((a, b) => a + b) / array.length;
  if (buffer.length < FPS_BUFFER_LENGTH) return "--"
  return Math.round(average(buffer));
}
function getCentroid(points) {
  var x = 0, y = 0;
  for (var i = 0; i < points.length; i++) {
    x += points[i][0];
    y += points[i][1];
  }
  return [x / points.length, y / points.length];
}
function isConvex(points) {
  if (points.length < 3) {
    // A polygon must have at least 3 points
    return false;
  }

  function crossProduct(p1, p2, p3) {
    // Cross product of vectors (p2 - p1) and (p3 - p2)
    return (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0]);
  }

  let signDetected = false;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];

    const crossProductResult = crossProduct(p1, p2, p3);

    if (crossProductResult !== 0) {
      // Check if the sign of the cross product changes
      if (signDetected === false) {
        signDetected = crossProductResult > 0 ? 'positive' : 'negative';
      } else {
        if ((crossProductResult > 0 && signDetected === 'negative') ||
          (crossProductResult < 0 && signDetected === 'positive')) {
          // If the sign changes again, the polygon is concave
          return false;
        }
      }
    }
  }

  // If no sign change is detected, the polygon is convex
  return true;
}

function findTopLeftMostPoint(points) {
  if (points.length === 0) {
    // Return null for an empty array
    return null;
  }

  // Initialize with the first point
  let topLeftMost = points[0];

  // Iterate through the rest of the points
  for (let i = 1; i < points.length; i++) {
    const currentPoint = points[i];

    // Compare x-coordinates first
    if (currentPoint[0] < topLeftMost[0]) {
      // If the current point's x-coordinate is smaller, update topLeftMost
      topLeftMost = currentPoint;
    } else if (currentPoint[0] === topLeftMost[0]) {
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

// Helper function to get the bounding box of the feasible region
function isSquare(points) {
  if (points.length !== 4) return false;
  // Assuming points is an array of 4 points
  const sideLengths = [
    distance(points[0], points[1]),
    distance(points[1], points[2]),
    distance(points[2], points[3]),
    distance(points[3], points[0])
  ];
  const uniqueSideLengths = new Set(sideLengths);
  return uniqueSideLengths.size === 1;
}

function distance(point1, point2) {
  return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}
function getBoundingBox(vertices) {
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;

  for (const vertex of vertices) {
    minX = Math.min(minX, vertex.x);
    minY = Math.min(minY, vertex.y);
    maxX = Math.max(maxX, vertex.x);
    maxY = Math.max(maxY, vertex.y);
  }

  return [minX, minY, maxX, maxY];
}


/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * @param {Array} polygon an array representation of the polygon where polygon[i][0] is the x Value of the i-th point and polygon[i][1] is the y Value.
 * @param {Array} point   an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
 */
function sumArrays(...arrays) {
  const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
  const result = Array.from({ length: n });
  return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}
function multArrays(...arrays) {
  const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
  const result = Array.from({ length: n });
  return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum * x, 1));
}
const uid = () => {
  let
    d = new Date().getTime(),
    d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
};
function checkSquareCollision(poly1, poly2) {
  function getAxes(poly) {
    const axes = [];
    for (let i = 0; i < poly.length; i++) {
      const p1 = poly[i];
      const p2 = i + 1 < poly.length ? poly[i + 1] : poly[0];
      const edge = [p2[0] - p1[0], p2[1] - p1[1]];
      const perpendicular = [-edge[1], edge[0]]; // Perpendicular vector
      axes.push(perpendicular);
    }
    return axes;
  }

  function project(poly, axis) {
    let min = Infinity;
    let max = -Infinity;
    for (const point of poly) {
      const dotProduct = point[0] * axis[0] + point[1] * axis[1];
      min = Math.min(min, dotProduct);
      max = Math.max(max, dotProduct);
    }
    return { min, max };
  }

  function overlap(projection1, projection2) {
    return (
      projection1.max >= projection2.min && projection2.max >= projection1.min
    );
  }

  const axes1 = getAxes(poly1);
  const axes2 = getAxes(poly2);

  for (const axis of [...axes1, ...axes2]) {
    const projection1 = project(poly1, axis);
    const projection2 = project(poly2, axis);

    if (!overlap(projection1, projection2)) {
      // If there is any axis of separation, the polygons do not intersect
      return false;
    }
  }

  // If no separating axis is found, the polygons intersect
  return true;
}
function checkCollision(polygon, pointsArray) {
  // Ensure the polygon has at least 3 points
  if (polygon.length < 3) {
    console.error('Polygon must have at least 3 points');
    return false;
  }

  // Helper function to check if a point is on the left side of a line
  function isOnLeftSide(lineStart, lineEnd, testPoint) {
    return (
      (lineEnd[0] - lineStart[0]) * (testPoint[1] - lineStart[1]) -
      (testPoint[0] - lineStart[0]) * (lineEnd[1] - lineStart[1])
    );
  }

  // Loop over each point in the array
  for (const point of pointsArray) {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const vertex1 = polygon[i];
      const vertex2 = polygon[j];

      if (
        (vertex1[1] > point[1]) !== (vertex2[1] > point[1]) &&
        point[0] <
        ((vertex2[0] - vertex1[0]) * (point[1] - vertex1[1])) /
        (vertex2[1] - vertex1[1]) +
        vertex1[0]
      ) {
        inside = !inside;
      }

      // Check if the test point lies on an edge of the polygon
      if (
        isOnLeftSide(vertex1, vertex2, point) === 0 &&
        point[0] >= Math.min(vertex1[0], vertex2[0]) &&
        point[0] <= Math.max(vertex1[0], vertex2[0]) &&
        point[1] >= Math.min(vertex1[1], vertex2[1]) &&
        point[1] <= Math.max(vertex1[1], vertex2[1])
      ) {
        return true; // Return true if any point is on an edge
      }
    }

    if (inside) {
      return true; // Return true if any point is inside the polygon
    }
  }

  return false; // Return false if none of the points are inside the polygon
}

class GameObject {
  constructor(options) {
    // will physics work on this object?
    this.physicsEnabled = options.physicsEnabled;
    this.physicsOptions = options.physicsOptions;

    // unique ID for each object
    this.id = uid();

    // where can it move? set with scene.setBoundaries()
    this.bounds = [];
    this.boundsActive = false;

    // does nothing!
    this.pinned = true;

    this._state = {};
  }

  // changes an attribute of the object (non destructive). To return to the orignal object, use returnState.
  state(attr, value) {
    Object.keys(this).forEach(key => {
      if (key == "_state") return;
      this._state[key] = this[key];
    });
    this[attr] = value;
  }

  // returns to the old state (before state() was called)
  returnState() {
    Object.keys(this._state).forEach(key => {
      this[key] = this._state[key];
    })
  }

  // updates object physics 1 tick
  updatePhysics() {
    var vertices = this.body.vertices;
    if (this.square) {
      var width = (vertices[0].x - 10) - (vertices[1].x + 10);
      var height = (vertices[0].y - 10) - (vertices[1].y + 10);
      this.hitbox = [width, height];
      if (this.type == "sprite") {
        this.coordinates = [this.body.bounds.min.x, this.body.bounds.min.y];
        this.points = this.body.vertices.map(v => {
          return [v.x, v.y]
        });
      } else if (this.type == "polygon") {
        this.points = this.body.vertices.map(v => {
          return [v.x, v.y]
        });
        this.coordinates = findTopLeftMostPoint(this.points);
      }
    } else {
      this.points = this.body.vertices.map(v => {
        return [v.x, v.y]
      });
      this.coordinates = findTopLeftMostPoint(this.points);
    }
  }

  // applies a force to the object (only works if physics enabled)
  applyForce(vector) {
    var vec = Matter.Vector.create(vector[0], vector[1]);
    Matter.Body.applyForce(this.body, this.body.position, vec);
  }

  // modifies pin
  unpin() {
    this.pinned = false;
  }
  pin() {
    this.pinned = true
  }

  // up to you to fill
  draw({ ctx, camera, canvas }) { }

  // should return an array of points (eg: objects bounds). used for collision detection
  polify() { }

  // sets the object's bounds
  setBounds(bounds) {
    this.bounds = bounds;
    this.boundsActive = true;
  }
  disableBounds() {
    this.boundsActive = false;
  }
  activateBounds() {
    this.boundsActive = true;
  }

  // statically moves the object (no forces involved)
  moveStatic(vector) {
    if (!this.physicsEnabled) return this.move(vector);
    var newX = this.body.position.x + vector[0];
    var newY = this.body.position.y + vector[1];
    Matter.Body.setPosition(this.body, Matter.Vector.create(newX, newY));
    return true;
  }

  // top level move function (works with both physics enabled and disabled)... needs helper functions getWidth(), getHeight() to be defined. Recommended to re-write based on your use case (if extending) 
  move(vector, continueAfterPhysics = true) {
    var newCoords = sumArrays(this.coordinates, vector);
    if (this.physicsEnabled) {
      Matter.Body.setVelocity(this.body, { x: vector[0] + this.body.velocity.x, y: vector[1] + this.body.velocity.y });
      return true;
    } else {
      if (!continueAfterPhysics) return false;
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
      } else {
        this.coordinates = newCoords;
        return true;
      }
    } else {
      this.coordinates = newCoords;
      return true;
    }
  }

  // used polify() to check for a collision between this and that object (remember to set whether the bounds are square, or a convex polygon... changes the collision detection method used)
  checkCollision(object) {
    var p1 = this.polify();
    var p2 = object.polify();

    if ((this.square || this.convex) && (object.square || object.convex)) {
      return checkSquareCollision(p1, p2);
    } else {
      return checkCollision(p1, p2);
    }
  }
}
class Polygon extends GameObject {
  constructor(options) {
    super(options);
    this.type = "polygon"
    this.points = options.points;
    this.backgroundColor = options.backgroundColor;
    this.coordinates = findTopLeftMostPoint(this.points);
    this.convex = isConvex(this.points);
    this.square = isSquare(this.points);
    if (this.square) {
      this.hitbox = [this.points[0].x - this.points[1].x, this.points[0].y - this.points[1].y];
    }
  }
  setHitBox(width, height) {
    this.hitbox = [width, height];
    this.square = true;
  }
  draw({ ctx, camera }) {
    ctx.fillStyle = this.backgroundColor;
    ctx.beginPath();

    ctx.moveTo(this.points[0][0] - camera[0], this.points[0][1] - camera[1]);
    for (var point of this.points) {
      ctx.lineTo(point[0] - camera[0], point[1] - camera[1]);
    }
    ctx.closePath();
    ctx.fill();

  }
  polify() {
    return this.points;
  }
  getWidth() {
    var points = this.points;
    if (!Array.isArray(points) || points.length < 2) {
      // Check if the input is valid
      console.error('Invalid input. Please provide an array of at least two points.');
      return null;
    }

    // Initialize min and max X-coordinates with the first point
    let minX = points[0][0];
    let maxX = points[0][0];

    // Iterate through the rest of the points to find the min and max X-coordinates
    for (let i = 1; i < points.length; i++) {
      const x = points[i][0];

      // Update minX and maxX if needed
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }

    // Calculate and return the width
    const width = maxX - minX;
    return width;
  }
  getHeight() {
    var points = this.points;
    if (!Array.isArray(points) || points.length < 2) {
      // Check if the input is valid
      console.error('Invalid input. Please provide an array of at least two points.');
      return null;
    }

    // Initialize min and max Y-coordinates with the first point
    let minY = points[0][1];
    let maxY = points[0][1];

    // Iterate through the rest of the points to find the min and max Y-coordinates
    for (let i = 1; i < points.length; i++) {
      const y = points[i][1];

      // Update minY and maxY if needed
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    // Calculate and return the height
    const height = maxY - minY;
    return height;
  }
  move(vector) {
    super.move(vector);
    var newPoints = []
    for (var point of this.points) {
      var newCoords = sumArrays(point, vector);
      if (this.boundsActive) {
        if (newCoords[0] >= 0 && newCoords[0] <= this.bounds[0] && newCoords[1] >= 0 && newCoords[1] <= this.bounds[1]) {
          newPoints.push(newCoords);
        } else {
          newPoints = this.points;
          break;
        }
      } else {
        newPoints.push(newCoords);
      }
    }
    this.points = newPoints;
    this.coordinates = findTopLeftMostPoint(this.points);
  }
}
class Sprite extends GameObject {
  constructor(options) {
    super(options);
    this.type = "sprite"
    this.image = options.url;
    this.coordinates = options.coordinates;
    this.width = options.width;
    this.height = options.height;
    this.square = true;
    this.hitbox = [this.width, this.height];
    this.reload();
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  reload() {
    var image = document.createElement("img");
    image.src = this.image;
    image.width = this.width;
    image.height = this.height;
    image.crossOrigin = 'anonymous'
    this.source = image;
    image.onload = () => {
      this.source = image
    }
  }
  draw({ ctx, camera, canvas }) {
    if (!this.physicsEnabled) {
      ctx.drawImage(this.source, this.coordinates[0] - camera[0], this.coordinates[1] - camera[1], this.width, this.height);
    } else {
      var c = getCentroid(this.points);
      var [x, y] = [c[0] - camera[0], c[1] - camera[1]];
      var rotation = this.body.angle;


      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.drawImage(this.source, -this.getWidth() / 2, -this.getHeight() / 2, this.getHeight(), this.getWidth());
      ctx.restore();
    }
  }
  reshape(width, height) {
    this.width = width;
    this.height = height;
    this.hitbox = [this.width, this.height]
  }
  scale(factor) {
    this.width = this.width * factor;
    this.height = this.height * factor;
    this.hitbox = [this.width, this.height];
  }
  changeSource(image) {
    this.image = image;
    this.reload();
  }
  polify() {
    var point1 = [this.coordinates[0], this.coordinates[1]];
    var point2 = [this.coordinates[0] + this.width, this.coordinates[1]];
    var point3 = [this.coordinates[0] + this.width, this.coordinates[1] + this.height];
    var point4 = [this.coordinates[0], this.coordinates[1] + this.height];
    return [point1, point2, point3, point4]
  }
}
class Light {
  constructor(position, diffuse, strength = 0.8, color = [255, 255, 255]) {
    if (typeof color != "object" && color.length != 3) throw new Error("Light color format is [r,g,b]");
    this.point = position;
    this.type = "light"
    this.diffuse = diffuse;
    this.strength = strength;
    this.color = color;
  }
  pin(object) {
    this.pinnedTo = object
  }
  brighten(factor) {
    this.strength *= factor;
  }
  dim(factor) {
    this.strength /= factor;
  }
  move(vector) {
    this.point = sumArrays(this.point, vector)
  }
  moveToObject(object) {

    var sumOfX = 0;
    var sumOfY = 0;
    object.polify().forEach(point => {
      sumOfX += point[0];
      sumOfY += point[1];
    })
    var a1 = sumOfX / object.polify().length;
    var a2 = sumOfY / object.polify().length;
    var middleOfObject = [a1, a2]
    this.point = [middleOfObject[0], middleOfObject[1]];
  }
  update() {
    if (this.pinnedTo) {
      this.moveToObject(this.pinnedTo)
    }
  }
}
class DirectionalLight extends Light {
  constructor(position, angle, spread, diffuse, strength, color) {
    super(position, diffuse, strength, color)
    if (typeof color != "object" && color.length != 3) throw new Error("Light color format is [r,g,b]");
    this.point = position;
    this.diffuse = diffuse;
    this.strength = strength;
    this.color = color;
    this.angle = angle;
    this.type = "directional";
    this.spread = spread;
  }
  pointTo(object, canvas) {
    var sumOfX = 0;
    var sumOfY = 0;
    object.polify().forEach(point => {
      sumOfX += point[0];
      sumOfY += point[1];
    })
    var a1 = sumOfX / object.polify().length;
    var a2 = sumOfY / object.polify().length;
    var middleOfObject = [a1, a2];
    var vector = [middleOfObject[0] - this.point[0], canvas.height - middleOfObject[1] - this.point[1]];
    var angleToPoint = Math.atan2(vector[1], vector[0]);
    this.angle = angleToPoint;
  }
  pinAngleTo(object) {
    this.pinnedToAngle = object;
  }
  update(canvas) {

    if (this.pinnedTo) {
      this.moveToObject(this.pinnedTo)
    }
    if (this.pinnedToAngle) {
      this.pointTo(this.pinnedToAngle, canvas);
    }
  }
}
class Scene {
  constructor(options = {}) {
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
    if (this.lighting) {
      this.clearScene = options.clear || true;
      this.fog = options.fog || 1.3;
      this.ambient = options.ambient || 0.2;
    }
    if (typeof GPU == "function") {
      this.gpu = new GPU(options.GPUsettings || {});
    } else {
      this.gpu = new GPU.GPU(options.GPUsettings || {})
    }
    if (options.physics) {
      this.physics = true;
      this.Engine = Matter.Engine
      this.Bodies = Matter.Bodies
      this.Composite = Matter.Composite;
      this.engine = Matter.Engine.create(options.physicsOptions);
    }
    this.readyToDraw = false;
  }
  ready() {


    if (this.lighting) {
      this.diffuseKernel = this.gpu.createKernel(function (pix, width, height, lights, numLights, dlights, numDlights, ambient, fog, globalAlpha) {
        const i = this.thread.y;
        const j = this.thread.x;
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
          var lightDir = angle
          const lightX = dlights[ln + 1];
          const lightY = dlights[ln + 2];
          const intensity = dlights[ln + 3];
          const diffuse = dlights[ln + 4];
          const spread = dlights[ln + 5];

          const redL = dlights[ln + 6];
          const greenL = dlights[ln + 7];
          const blueL = dlights[ln + 8];

          const dirX = this.thread.x - lightX;
          const dirY = this.thread.y - (height - lightY);

          const dist = Math.sqrt(dirX * dirX + dirY * dirY);

          const angleToLight = (Math.atan(dirY, dirX) + 2 * Math.PI) % (2 * Math.PI);

          const angleDiff = Math.acos(Math.cos(angleToLight - lightDir));


          if (angleDiff <= spread / 2) {
            const diffuseFactor = Math.max(0, Math.cos(angleDiff) * (1 - (dist / diffuse)));
            brightness[0] += diffuseFactor * intensity * (redL / 255);
            brightness[1] += diffuseFactor * intensity * (greenL / 255);
            brightness[2] += diffuseFactor * intensity * (blueL / 255);
          }
        }

        var red = ((pix[pixNum] / 255) * brightness[0]) * globalAlpha;
        var green = ((pix[pixNum + 1] / 255) * brightness[1]) * globalAlpha;
        var blue = ((pix[pixNum + 2] / 255) * brightness[2]) * globalAlpha;
        var alpha = (pix[pixNum + 3] / 255) * globalAlpha;
        this.color(
          red, green, blue, alpha
        )
      }, {
        output: [this.canvas.width, this.canvas.height],
        functions: {
          distance: (a, b) => {
            return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
          }
        },
        graphical: true,
        dynamicArguments: true
      });
    }
    this.readyToDraw = true;

  }
  addLight(light) {
    if (light.type == "directional") {
      this.dlights.push(light);
    } else {
      this.lights.push(light);
    }
  }
  formatLights(lights) {
    var flights = lights.map(l => {
      return [l.point[0] - this.cameraAngle[0], l.point[1] - this.cameraAngle[1], l.strength, l.diffuse, l.color]
    });
    return flights.flat(2);
  }
  formatDLights(lights) {
    var dlights = lights.map(l => {
      return [l.angle, l.point[0] - this.cameraAngle[0], l.point[1] - this.cameraAngle[1], l.strength, l.diffuse, l.spread, l.color];
    });
    return dlights.flat(2);
  }
  diffuseLights(ambient = 0.2, fog = 1.3) {
    this.lights.forEach(l => {
      l.update(this.canvas);
    });
    this.dlights.forEach(l => {
      l.update(this.canvas);
    });
    var lights = this.lights.filter((light) => {
      // only draw if within the camera view
      var cameraX = this.cameraAngle[0];
      var cameraY = this.cameraAngle[1];
      var x = light.point[0];
      var y = light.point[1];
      var dx = x - cameraX;
      var dy = y - cameraY;
      var sceneWidth = this.canvas.width;
      var sceneHeight = this.canvas.height;
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

    const width = this.canvas.width;
    const height = this.canvas.height;
    var numLights = lights.length;
    var numDLights = dlights.length;
    const pix = this.ctx.getImageData(0, 0, width, height).data;
    var flights = this.formatLights(lights);
    var dflights = this.formatDLights(dlights);
    // Run the GPU kernel

    if (flights.length <= 0) {
      flights = [0, 0, 0, 0, 0, 0, 0];
      numLights = 0;
    };
    if (dflights.length <= 0) {
      dflights = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      numDLights = 0;
    }
    var globalAlpha = this.ctx.globalAlpha || 1;
    this.diffuseKernel(pix, width, height, flights, numLights, dflights, numDLights, ambient, fog, globalAlpha);
    const pixels = this.diffuseKernel.getPixels();

    this.ctx.putImageData(new ImageData(pixels, width, height), 0, 0);
  }
  setBoundaries(rightBound, bottomBound, activate = true) {
    this.bounds = [rightBound || this.canvas.width, bottomBound || this.canvas.height];
    this.objects.forEach(object => {
      object.setBounds(this.bounds);
    });
    this.boundsActive = activate;
    if (this.physics == "matter") {
      var topBound = this.Bodies.rectangle(this.bounds[0] / 2, -10, this.bounds[0], 10, { isStatic: true, friction: 0 });
      var bottomBound = this.Bodies.rectangle(this.bounds[0] / 2, this.bounds[1] + 10, this.bounds[0], 10, { isStatic: true, friction: 0 });
      var leftBound = this.Bodies.rectangle(-10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
      var rightBound = this.Bodies.rectangle(this.bounds[0] + 10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
      this.Composite.add(this.engine.world, [topBound, bottomBound, leftBound, rightBound]);
    }else{
      this.Engine.setBoundaries(this.bounds);
    }
  }
  disableBounds() {
    this.boundsActive = false;
    this.objects.forEach(object => {
      object.disableBounds();
    })
  }
  activateBounds() {
    this.boundsActive = true;
    this.objects.forEach(object => {
      object.activateBounds();
    })
  }
  addObject(object) {
    object.scene = this.id;
    object.physicsEnabled = (this.physics) ? object.physicsEnabled : false;
    if (object.physicsEnabled && this.physics) {
      if (!object.square) {
        var vertexSet = object.polify().map(point => {
          return { x: point[0], y: point[1] }
        })
        var objectBody = this.Bodies.fromVertices(object.coordinates[0], object.coordinates[1], vertexSet, object.physicsOptions);
        object.body = objectBody;
      } else {
        var objectBody = this.Bodies.rectangle(object.coordinates[0], object.coordinates[1], object.getWidth(), object.getHeight(), object.physicsOptions);
        object.body = objectBody
      }
      this.Composite.add(this.engine.world, [object.body]);
    }
    this.objects.push(object);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw() {
    if (!this.readyToDraw) return;
    this.update();
    if (this.clearScene) this.clear();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.physics) {
      var physicsNow = performance.now();
      var pElapsedTime = physicsNow - this.lastPhysicsUpdate;
      Matter.Engine.update(this.engine, pElapsedTime);
      this.lastPhysicsUpdate = physicsNow;
      this.objects.forEach(object => {
        if (object.physicsEnabled) {
          object.updatePhysics();
        }
      })
    }
    if (this.cameraBind) {
      this.cameraTo(this.cameraBind);
    }
    this.objects.forEach(object => {
      object.draw({ ctx: this.ctx, camera: this.cameraAngle, canvas: this.canvas });
    });
    this.collisionMonitors = this.collisionMonitors.map((monitor) => {
      var [o1, o2, f, f2, active] = monitor;
      if (o1.checkCollision(o2)) {
        if (!active) {
          active = true;
          f();
        }
      } else {
        if (active) {
          active = false
          f2();
        }
      }
      return [o1, o2, f, f2, active];
    });
    if (this.lighting) {
      this.diffuseLights(this.ambient, this.fog)
    }
    var t1 = performance.now();
    var elapsedTime = t1 - this.lastFrameStamp;
    this.lastFrameStamp = t1;

    if (this.fpsMonitoringEnabled) {
      this.fpsBuffer.push(elapsedTime);

      if (this.fpsBuffer.length > FPS_BUFFER_LENGTH) {
        this.fpsBuffer.shift();
      }
      this.ctx.font = "20px Ariel";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("FPS: " + calculateFPS(this.fpsBuffer), 5, 20);
    }
  }
  removeObject(object) {
    this.objects.filter(compare => {
      return !(compare.id == object.id);
    })
  }
  enableCollisionsBetween(o1, o2, fo, ff) {
    this.collisionMonitors.push([o1, o2, fo, ff, false]);
    this.collisionMonitors.push([o2, o1, fo, ff, false]);
  }
  bindCamera(object) {
    this.cameraBind = object
  }
  unbindCamera() {
    this.cameraBind = false;
  }
  cameraTo(object) {
    var sumOfX = 0;
    var sumOfY = 0;
    object.polify().forEach(point => {
      sumOfX += point[0];
      sumOfY += point[1];
    })
    var a1 = sumOfX / object.polify().length;
    var a2 = sumOfY / object.polify().length;
    var middleOfObject = [a1, a2]
    var middleOfCanvas = [this.width / 2, this.height / 2];
    this.cameraAngle = [middleOfObject[0] - middleOfCanvas[0], middleOfObject[1] - middleOfCanvas[1]];
  }
  moveCamera(vector) {
    this.cameraAngle = sumArrays(this.cameraAngle, vector);
  }
  enableFPS() {
    this.fpsMonitoringEnabled = true;
  }
  disableFPS() {
    this.fpsMonitoringEnabled = false;
  }
}
class Input {
  constructor(key, fireRate) {
    if (key == "click") {
      this.clickMonitor = true;
    }
    this.key = key;
    this.fireRate = fireRate
    this.id = uid();
    this.fireInterval;
    this.firing = false;

  }
  startFiring(e) {
    if (!this.firing) {
      this.firing = true;
      this.on();
      this.fireInterval = setInterval(() => {
        if (this.firing) {
          this.on(e);
        }
      }, this.fireRate)
    }
  }
  stopFiring(e) {
    if (this.firing) {
      this.firing = false;
      clearInterval(this.fireInterval);
    }
  }
  activate(scene = false) {
    this.active = true;
    if (this.clickMonitor) {

      document.addEventListener("mousedown", (event) => {
        let rect = scene.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        scene.objects.forEach(object => {
          var r = sumArrays([x, y], scene.cameraAngle);
          if (checkCollision(object.polify(), [r])) {
            this.on(object);
            document.addEventListener("mouseup", (event) => {
              object.returnState();
            })
          }
        })
      })
    } else {
      document.addEventListener("keydown", (e) => {
        if (this.active) {
          if (e.key == this.key) {
            this.startFiring(e);
          }
        }
      })
      document.addEventListener("keyup", (e) => {
        if (this.active) {
          if (e.key == this.key) {
            this.stopFiring(e);
          }
        }
      })
    }
  }
  reactivate() {
    this.active = true;
  }
  deactivate() {
    this.active = false;
    this.stopFiring();
  }
}


class SceneManager {
  constructor(options) {
    var initialScene = options.initialScene;
    if (!initialScene) throw new Error("Initial scene not provided");
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
  }
  changeScene(scene) {
    this.scenes[scene.id] = scene;
    this.activeScene = scene.id;
  }
  addScene(scene) {
    var arg1 = scene;
    this.scenes[arg1.id] = arg1;
    arg1.width = this.width;
    arg1.height = this.height;
    arg1.canvas = this.canvas;
    arg1.ctx = this.ctx;
    arg1.ready()
  }
  animate(transition, scene, duration = 1000) {
    if (!this.animationNames.includes(transition)) throw new Error("Invalid transition type");
    this.sceneAnimation = transition;
    this.animationStartTime = performance.now();
    this.animationRunTime = duration;
    this.animateTo = scene;

    if(transition.startsWith('slide')){
      this.fromScenePrevHadLights = this.scenes[this.activeScene].lighting;
      this.toScenePrevHadLights = this.scenes[this.animateTo.id].lighting;
    }
  }
  draw(clear = true, ambient = 0.2, fog = 1.3) {
    // check if animations are running
    if (this.animationStartTime + this.animationRunTime > performance.now()) {
      if(this.sceneAnimation.startsWith('slide')){
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
            this.scenes[this.activeScene].draw(clear, ambient, fog);
          }
          break;
        case "slowFade":
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(0, 0, this.width, this.height)
          var timeElapsed = performance.now() - this.animationStartTime;
          var progress = timeElapsed / (this.animationRunTime / 2);
          if (progress < 1) {
            this.ctx.globalAlpha = 1 - progress;
            this.scenes[this.activeScene].draw(clear, ambient, fog);
          } else {
            this.ctx.globalAlpha = progress - 1;
            this.scenes[this.animateTo.id].draw(clear, ambient, fog);
          }
          break;
        case "slideLeft":
          var timeElapsed = performance.now() - this.animationStartTime;
          var progress = timeElapsed / this.animationRunTime;
          var translateX = this.width * progress;

          this.ctx.save();
          this.ctx.translate(-translateX, 0);
          this.scenes[this.activeScene].draw(clear, ambient, fog);
          this.ctx.restore();

          this.ctx.save();
          this.ctx.translate(this.width - translateX, 0);
          this.scenes[this.animateTo.id].draw(clear, ambient, fog);
          this.ctx.restore();
          break;

        case "crossFade":
          var timeElapsed = performance.now() - this.animationStartTime;
          var progress = timeElapsed / this.animationRunTime;
          var opacity = progress;

          this.ctx.globalAlpha = 1 - opacity;
          this.scenes[this.activeScene].draw(clear, ambient, fog);

          this.ctx.globalAlpha = opacity;
          this.scenes[this.animateTo.id].draw(clear, ambient, fog);
          break;
        default:
          this.animateTo.draw(clear, ambient, fog);
          break;
      }
    } else {
      if (this.sceneAnimation) {
        if(this.sceneAnimation.startsWith('slide')){
          this.scenes[this.activeScene].lighting = this.fromScenePrevHadLights;
          this.scenes[this.animateTo.id].lighting = this.toScenePrevHadLights;
        }
        this.activeScene = this.animateTo.id;
        this.sceneAnimation = false;
        this.animationRunTime = null;
        this.animationStartTime = null;
        this.ctx.globalAlpha = 1;
        
      }
      this.scenes[this.activeScene].draw(clear, ambient, fog);
    }
    window.requestAnimationFrame(() => {
      this.draw(clear, ambient, fog);
    })
  }
}

class BasicPhysicsComposite{
  static add(engine,object){
    engine.objects.push(object);
  }
}

class BasicPhysicsBodies{
  constructor(){

  }
  static rectangle(x,y,width,height,options){
    return new PhysicsPolygon([Vec2.fromArray([0,0]),Vec2.fromArray([width,0]),Vec2.fromArray([width,height]),Vec2.fromArray([0,height])],options);
  }
  static fromVertices(x,y,vertices,options){
    vertices = vertices.map(v=>{
      return new Vec2(v[0],v[1]);
    });
    var initialCoord = new Vec2(x,y);
    if(vertices.length < 3) throw new Error("Invalid number of vertices");
    if(!Vec2.inSet(vertices,initialCoord)) throw new Error("Vertices does not contain initial coordinate");
    return new PhysicsPolygon(vertices,options);
  }
}
class PhysicsPolygon{
  constructor(vertices,options){
    this.vertices = vertices;
    this.options = options;
    this.type = "polygon";
    this.physicsEnabled = true;
    this.body = this;
    this.uid = uid();
    this.position = getCentroid(this.vertices.map(v=>{return [v.x,v.y]}));
    this.physicsOptions = options;

    this.bounds = {
      min: new Vec2(0,0),
      max: new Vec2(0,0)
    }
  }
  updatePosition(){
    this.position = getCentroid(this.vertices.map(v=>{return [v.x,v.y]}));
  }
  updateBounds(){

  }
  polify(){
    return this.vertices.map(v=>{
      return [v.x,v.y];
    })
  }
  move(vector){
    this.vertices = this.vertices.map(v=>{
      return Vec2.add(v,vector);
    })
  }
}
class Vec2{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  static fromArray(array){
    return new Vec2(array[0],array[1]);
  }
  static add(v1,v2){
    return new Vec2(v1.x + v2.x,v1.y + v2.y);
  }
  static sub(v1,v2){
    return new Vec2(v1.x - v2.x,v1.y - v2.y);
  }
  static mult(v1,v2){
    return new Vec2(v1.x * v2.x,v1.y * v2.y);
  }
  static div(v1,v2){
    return new Vec2(v1.x / v2.x,v1.y / v2.y);
  }
  static compare(v1, v2){
    return v1.x == v2.x && v1.y == v2.y;
  }
  static compareSet(vs1,vs2){
    return vs1.every((v,i)=>{
      return Vec2.compare(v,vs2[i]);
    })
  }
  static inSet(vs,v){
    return vs.some((vec)=>{
      return Vec2.compare(vec,v);
    })
  }
}