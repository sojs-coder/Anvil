function calculateFPS(buffer){
  buffer = buffer.map(t=>{
    var seconds = 1000/t;
    return seconds
  });
  const average = array => array.reduce((a, b) => a + b) / array.length;
  return average(buffer).toFixed(2);
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
function getFRegion(vertices) {
  return function x(point) {
    // Check if the point is within the feasible region
    // You can implement a point-in-polygon algorithm here

    // For simplicity, let's assume a basic bounding box check
    const [minX, minY, maxX, maxY] = getBoundingBox(vertices);

    return (
      point.x >= minX &&
      point.x <= maxX &&
      point.y >= minY &&
      point.y <= maxY
    );
  };
}

// Helper function to get the bounding box of the feasible region
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

// Example usage:
const feasibleRegionVertices = [
  { x: -0.5, y: -1 },
  { x: 0.43, y: 3.32 },
  { x: -2.64, y: 2.31 },
  { x: 5.15, y: 0.55 },
];

const isInFeasibleRegion = getFRegion(feasibleRegionVertices);
// wait...
// Test points

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

class Object{
  constructor(){
    this.id = uid();
    this.bounds = [];
    this.boundsActive = false;
    this.pinned = true;
  }
  unpin(){
    this.pinned = false;
  }
  pin(){
    this.pinned = true
  }
  draw(){ }
  polify() { }
  setBounds(bounds){
    this.bounds = bounds;
    this.boundsActive = true;
  }
  disableBounds(){
    this.boundsActive = false;
  }
  activateBounds(){
    this.boundsActive = true;
  }
  move(vector){
    var newCoords = sumArrays(this.coordinates,vector);
    if(this.boundsActive){
      if(newCoords[0] < 0 || newCoords[0]+this.getWidth() > this.bounds[0] || newCoords[1] < 0 || newCoords[1]+this.getHeight() > this.bounds[1]){
        return false;
      }else{
        this.coordinates = newCoords;
        return true;
      }
    }else{
      this.coordinates = newCoords;
      return true;
    }
  }
  checkCollision(object){
    var p1 = this.polify();
    var p2 = object.polify();
    
    if((this.square || this.convex) && (object.square || object.convex)){
      return checkSquareCollision(p1,p2);
    }else{
      return checkCollision(p1,p2);
    }
  }
  
}
class Polygon extends Object{
  constructor(points,backgroundColor){
    super();
    this.points = points;
    this.backgroundColor = backgroundColor;
    this.coordinates = findTopLeftMostPoint(this.points);
    this.convex = isConvex(this.points);
  }
  setHitBox(width,height){
    this.hitbox = [width,height];
    this.square = true;
  }
  draw(ctx,camera){
    ctx.fillStyle = this.backgroundColor;
    ctx.beginPath();
    
    ctx.moveTo(this.points[0][0]-camera[0],this.points[0][1]-camera[1]);
    for(var point of this.points){
      ctx.lineTo(point[0]-camera[0],point[1]-camera[1]);
    }
    ctx.closePath();
    ctx.fill();

  }
  polify(){
    return this.points;
  }
  getWidth(){
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
  getHeight(){
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
  move(vector){
    var newPoints = []
    for(var point of this.points){
      var newCoords = sumArrays(point,vector);
      if(this.boundsActive){
        if(newCoords[0] >= 0 && newCoords[0] <= this.bounds[0] && newCoords[1] >= 0 && newCoords[1] <= this.bounds[1]){
          newPoints.push(newCoords);
        }else{
          newPoints = this.points;
          break;
        }
      }else{
        newPoints.push(newCoords);
      }
    }
    this.points = newPoints;
    this.coordinates = findTopLeftMostPoint(this.points);
  }
}
class Sprite extends Object{
  constructor(image, x, y, width, height){
    super();
    this.image = image;
    this.coordinates = [x,y];
    this.width = width;
    this.height = height;
    this.square = true;
    this.hitbox = [this.width,this.height];
    this.reload();
  }
  getWidth(){
    return this.width;
  }
  getHeight(){
    return this.height;
  }
  reload(){
    var image = document.createElement("img");
    image.src = this.image;
    image.width = this.width;
    image.height = this.height;
    this.source = image;
  }
  draw(ctx,camera){
    if(this.pinned){
      ctx.drawImage(this.source,this.coordinates[0]-camera[0],this.coordinates[1]-camera[1],this.width,this.height);
    }else{
      ctx.drawImage(this.source,this.coordinates[0]-camera[0],this.coordinates[1]-camera[1],this.width,this.height);
    }
  }
  reshape(width,height){
    this.width = width;
    this.height = height;
    this.hitbox = [this.width,this.height]
  }
  scale(factor){
    this.width = this.width * factor;
    this.height = this.height * factor;
    this.hitbox = [this.width, this.height];
  }
  changeSource(image){
    this.image = image;
  }
  polify(){
    var point1 = [this.coordinates[0],this.coordinates[1]];
    var point2 = [this.coordinates[0]+this.width, this.coordinates[1]];
    var point3 = [this.coordinates[0]+this.width, this.coordinates[1]+this.height];
    var point4 = [this.coordinates[0], this.coordinates[1]+this.height];
    return [point1,point2,point3,point4]
  }
}
class Input{
  constructor(key,fireRate){ 
    this.key = key;
    this.fireRate = fireRate
    this.id = uid();
    this.fireInterval;
    this.firing = false;
  }
  startFiring(e){
    if(!this.firing){
      this.firing = true;
      this.fireInterval = setInterval(()=>{
        if(this.firing){
          this.on(e);
        }
      },this.fireRate)
    }
  }
  stopFiring(e){
    if(this.firing){
      this.firing = false;
      clearInterval(this.fireInterval);
    }
  }
  activate(){
    this.active = true;
    document.addEventListener("keydown",(e)=>{
      if(this.active){
        if(e.key == this.key){
          this.startFiring(e);
        }
      }
    })
    document.addEventListener("keyup",(e)=>{
      if(this.active){
        if(e.key == this.key){
          this.stopFiring(e);
        }
      }
    })
  } 
  reactivate(){
    this.active = true;
  }
  deactivate(){
    this.active = false;
    this.stopFiring();
  }
}
class Scene{
  constructor(canvas,width,height){
    this.width = width;
    this.height = height;
    this.objects = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.collisionMonitors = [];
    this.cameraAngle = [0,0];
    this.fpsBuffer = [];
    this.fpsMonitoringEnabled = false;
    this.lastFrameStamp = performance.now();
    this.id = uid();
  }
  setBoundaries(rightBound,bottomBound,activate=true){
    this.bounds = [rightBound || this.canvas.width,bottomBound || this.canvas.height];
    this.objects.forEach(object=>{
      object.setBounds(this.bounds);
    })
    this.boundsActive = activate;
 
  }
  disableBounds(){
    this.boundsActive = false;
    this.objects.forEach(object=>{
      object.disableBounds();
    })
  }
  activateBounds(){
    this.boundsActive = true;
    this.objects.forEach(object=>{
      object.activateBounds();
    })
  }
  addObject(object){
    object.scene = this.id;
    this.objects.push(object);
  }
  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(clear=true){
    if(clear) this.clear();
    if(this.cameraBind){
      this.cameraTo(this.cameraBind);
    }
    this.objects.forEach(object=>{
      object.draw(this.ctx,this.cameraAngle);
    });
    this.collisionMonitors = this.collisionMonitors.map((monitor)=>{
      var [o1, o2, f, f2, active] = monitor;
      document.getElementById("c").innerHTML = o1.checkCollision(o2)
      if (o1.checkCollision(o2)){
        if(!active){
          active = true;
          f();
        }
      }else{
        if(active){
          active = false
          f2();
        }
      }
      return [o1, o2, f, f2, active];
    });
    var t1 = performance.now();
    var elapsedTime = t1 - this.lastFrameStamp;
    this.lastFrameStamp = t1;
    
    if(this.fpsMonitoringEnabled){
      this.fpsBuffer.push(elapsedTime);
      
      if(this.fpsBuffer.length > 120){
        this.fpsBuffer.shift();
      }
      this.ctx.font = "20px Georgia";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("FPS: "+ calculateFPS(this.fpsBuffer), 5, 20);
    }
  }
  removeObject(object){
    this.objects.filter(compare=>{
      return !(compare.id == object.id);
    })
  }
  enableCollisionsBetween(o1,o2,fo,ff){
    this.collisionMonitors.push([o1,o2,fo,ff,false]);
    this.collisionMonitors.push([o2,o1,fo,ff,false]);
  }
  bindCamera(object){
    this.cameraBind = object
  }
  unbindCamera(){
    this.cameraBind = false;
  }
  cameraTo(object){
    var middleOfObject = [object.coordinates[0]+object.getWidth()/2,object.coordinates[1]+object.getHeight()/2];
    var middleOfCanvas = [this.width/2,this.height/2];
    this.cameraAngle = [middleOfObject[0]-middleOfCanvas[0],middleOfObject[1]-middleOfCanvas[1]];
  }
  moveCamera(vector){
    this.cameraAngle = sumArrays(this.cameraAngle, vector);
  }
  enableFPS(){
    this.fpsMonitoringEnabled = true;
  }
  disableFPS(){
    this.fpsMonitoringEnabled = false;
  }
}
