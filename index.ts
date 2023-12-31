const Matter = require("matter-js");
const GPU = require("gpu.js");
type Point = Vec2;
type Vec2 = [number, number];
type Vertex = {
    x: number;
    y: number;
};
type Vector = Vertex;
type Projection = {
    min: number;
    max: number;
};
type CollisionMonitor = [GameObject, GameObject, Function, Function, boolean];
interface GameObjectOptions {
    physicsEnabled?: boolean;
    physicsOptions?: PhysicsOptions;
}
interface Gravity extends Vector {
    scale?: number;
}
interface PolygonOptions extends GameObjectOptions {
    points: Point[];
    backgroundColor?: string;
}
interface SpriteOptions extends GameObjectOptions {
    url: string;
    coordinates: Vec2;
    width: number;
    height: number;
}
interface SceneManagerOptions {
    initialScene?: Scene;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}
interface SceneOptions {
    fpsMonitoringEnabled?: boolean;
    lighting?: boolean;
    lightOptions?: lightingOptions;
    GPUsettings?: GPUsettings;
    physics?: boolean;
    physicsOptions?: WorldPhysicsOptions;
    update?: Function;
    clear?: boolean;
    bounds?: Vec2;
    FPS_BUFFER_SIZE?: number;
    bindCameraTo?: GameObject;
}
interface lightingOptions {
    fog?: number;
    ambient?: number;
}
interface GPUsettings {
    mode?: "dev" | "webgl" | "webgl2" | "headlessgl" | "cpu";
}
interface LightKernelOptions {
    pix: Uint8ClampedArray;
    width: number;
    height: number;
    lights: Array<number>;
    numLights: number;
    dlights: Array<number>;
    numDlights: number;
    ambient: number;
    fog: number;
    globalAlpha: number;
}
interface WorldPhysicsOptions {
    constraintIterations?: number;
    detector?: any;
    enableSleeping?: boolean;
    gravity?: Gravity;
    plugin?: any;
    positionIterations?: number;
    timing?: PhysicsTimingOptions;
    velocityIterations?: number;
    world?: Object;
}
interface PhysicsTimingOptions {
    lastDelta: number;
    lastElapsed: number;
    timeScale: number;
    timestamp: number;
}
interface PhysicsOptions {
    angle?: number;
    readonly angularSpeed?: number;
    anglarVelocity?: number;
    readonly area?: string;
    readonly axes?: Vector;
    bounds?: Bounds;
    collisionFileter?: {
        category?: number;
        group?: number;
        mask?: number;

    };
    readonly deltaTime?: number;
    readonly density?: number;
    force?: Vector;
    friction?: number;
    frictionAir?: number;
    frictionStatic?: number;
    id?: number;
    readonly inertia?: number;
    readonly inverseInertia?: number;
    readonly inverseMass?: number;
    isSensor?: boolean;
    readonly isSleeping?: boolean;
    readonly isStatic?: boolean;
    label?: string;
    readonly mass?: number;
    readonly motion?: number;
    readonly parent?: Object;
    readonly parts?: Object[];
    readonly position?: Vector;
    restitution?: number;
    sleepThreshold?: number;
    slop?: number;
    readonly speed?: number;
    timeScale?: number;
    torque?: number;
    readonly "type"?: string;
    readonly velocity?: Vector;
    readonly vertices?: Vector[];
}
interface DrawOptions {
    canvas?: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    camera: Vec2;
}
type Bounds = {
    min: Vec2;
    max: Vec2;
}
function GPULightingKernel(this: any, pix: Uint8ClampedArray, width: number, height: number, lights: Array<number>, numLights: number, dlights: Array<number>, numDlights: number, ambient: number, fog: number, globalAlpha: number) {
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

        const angleToLight = (Math.atan2(dirY, dirX) + 2 * Math.PI) % (2 * Math.PI);

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

}
// checks if a polygon is convex
function isConvex(points: Point[]): boolean {
    if (points.length < 3) {
        // A polygon must have at least 3 points
        return false;
    }

    function crossProduct(p1: Point, p2: Point, p3: Point): number {
        // Cross product of vectors (p2 - p1) and (p3 - p2)
        return (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0]);
    }

    let signDetected: Boolean = false;
    let foundSign: string = '';

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const p3 = points[(i + 2) % points.length];

        const crossProductResult = crossProduct(p1, p2, p3);

        if (crossProductResult !== 0) {
            // Check if the sign of the cross product changes
            if (signDetected === false) {
                foundSign = crossProductResult > 0 ? 'positive' : 'negative';
                signDetected = true;
            } else {
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
function instanceOfDirectionalLight(light: Light | DirectionalLight): light is DirectionalLight {
    return (<DirectionalLight>light).angle !== undefined;
}
// gets the centroid of a polygon
function getCentroid(points: Point[]): Point {
    var x: number = 0, y: number = 0;
    for (var i = 0; i < points.length; i++) {
        x += points[i][0];
        y += points[i][1];
    }
    return [x / points.length, y / points.length];
}

// calculates FPS based on a buffer
function calculateFPS(buffer: Array<number>, FPS_BUFFER_LENGTH: number = 60): number | string {
    buffer = buffer.map(t => {
        var seconds = 1000 / t;
        return seconds
    });
    const average = (array: Array<number>): number => array.reduce((a, b) => a + b) / array.length;
    if (buffer.length < FPS_BUFFER_LENGTH) return "--"
    return Math.round(average(buffer));
}

// gets the top left most point of a polygon
function findTopLeftMostPoint(points: Point[]): Point {
    if (points.length === 0) {
        throw new Error('Points array must not be empty');
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

// checks to see if a polygon is a square
function isSquare(points: Point[]): boolean {
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

// gets the distance between two points
function distance(point1: Point, point2: Point): number {
    return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}

// calculates the bounding box of a polygon based on a set of vertices
function getBoundingBox(vertices: Array<Vertex>): Array<number> {
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


// adds the elements of two arrays together
function sumArrays(...arrays: Array<Array<number>>): Array<number> {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}

// multiplies the elements of two arrays together
function multArrays(...arrays: Array<Array<number>>): Array<number> {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum * x, 1));
}


// generates a unique identifier
function uid(): string {
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


// checks to see if two polygons are colliding (used for convex polygons)
function checkSquareCollision(poly1: Point[], poly2: Point[]): boolean {
    function getAxes(poly: Point[]): Array<Vec2> {
        const axes: Array<Vec2> = [];
        for (let i = 0; i < poly.length; i++) {
            const p1 = poly[i];
            const p2 = i + 1 < poly.length ? poly[i + 1] : poly[0];
            const edge = [p2[0] - p1[0], p2[1] - p1[1]];
            const perpendicular: Vec2 = [-edge[1], edge[0]]; // Perpendicular vector
            axes.push(perpendicular);
        }
        return axes;
    }

    function project(poly: Point[], axis: Vec2): Projection {
        let min = Infinity;
        let max = -Infinity;
        for (const point of poly) {
            const dotProduct = point[0] * axis[0] + point[1] * axis[1];
            min = Math.min(min, dotProduct);
            max = Math.max(max, dotProduct);
        }
        return { min, max };
    }

    function overlap(projection1: Projection, projection2: Projection): Boolean {
        return (
            projection1.max >= projection2.min && projection2.max >= projection1.min
        );
    }

    const axes1 = getAxes(poly1);
    const axes2 = getAxes(poly2);

    for (const axis of [...axes1, ...axes2]) {
        const projection1: Projection = project(poly1, axis);
        const projection2: Projection = project(poly2, axis);

        if (!overlap(projection1, projection2)) {
            // If there is any axis of separation, the polygons do not intersect
            return false;
        }
    }

    // If no separating axis is found, the polygons intersect
    return true;
}


// checks if a point is inside a polygon (not good for collision detection (does not check for edges intersecting) use checkSquareCollision()
function checkCollision(polygon: Point[], pointsArray: Array<Point>): Boolean {
    // Ensure the polygon has at least 3 points
    if (polygon.length < 3) {
        throw new Error('Polygon must have at least 3 points');
        return false;
    }

    // Helper function to check if a point is on the left side of a line
    function isOnLeftSide(lineStart: Point, lineEnd: Point, testPoint: Point): number {
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
    physicsEnabled: boolean;
    physicsOptions: PhysicsOptions;
    id: string;
    bounds: Array<number>;
    boundsActive: boolean;
    pinned: boolean;
    _state: { [key: string]: any };
    square: boolean;
    hitbox: Vec2;
    body: any;
    points: Array<Vec2>;
    coordinates: Vec2;
    type: string;
    convex: boolean;
    [key: string]: any;
    constructor(options: GameObjectOptions = {}) {
        // will physics work on this object?
        this.physicsEnabled = options.physicsEnabled || false;
        this.physicsOptions = options.physicsOptions || {};

        if (this.physicsEnabled) {
            this.body = {}
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
    state(attr: string, value: any) {
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
                this.points = this.body.vertices.map((v: Vertex) => {
                    return [v.x, v.y]
                });
            } else if (this.type == "polygon") {
                this.points = this.body.vertices.map((v: Vertex) => {
                    return [v.x, v.y]
                });
                this.coordinates = findTopLeftMostPoint(this.points);
            }
        } else {
            this.points = this.body.vertices.map((v: Vertex) => {
                return [v.x, v.y]
            });
            this.coordinates = findTopLeftMostPoint(this.points);
        }
    }
    // applies a force to the object (only works if physics enabled)
    applyForce(vector: Vec2) {
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

    // should return an array of points (eg: objects bounds). used for collision detection
    polify(): Point[] {
        return [];
    }
    draw(options: DrawOptions) { }

    // sets the object's bounds
    setBounds(bounds: Array<number>) {
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
    moveStatic(vector: Vec2) {
        if (!this.physicsEnabled) return this.move(vector);
        var newX = this.body.position.x + vector[0];
        var newY = this.body.position.y + vector[1];
        Matter.Body.setPosition(this.body, Matter.Vector.create(newX, newY));
        return true;
    }
    getWidth(): number {
        return 0;
    }
    getHeight(): number {
        return 0;
    }

    // top level move function (works with both physics enabled and disabled)... needs helper functions getWidth(), getHeight() to be defined. Recommended to re-write based on your use case (if extending) 
    move(vector: Vec2, continueAfterPhysics = true): Boolean {
        var newCoords = <Vec2>sumArrays(this.coordinates, vector);
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
    checkCollision(object: GameObject) {
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
    constructor(options: PolygonOptions) {
        super(options);
        this.type = "polygon"
        this.points = options.points;
        if (this.points.length < 3) {
            throw new Error("Polygon must have at least 3 points");
        }
        this.backgroundColor = options.backgroundColor;
        this.coordinates = findTopLeftMostPoint(this.points);
        this.convex = isConvex(this.points);
        this.square = isSquare(this.points);
        if (this.square) {
            this.hitbox = [this.points[0][0] - this.points[1][0], this.points[0][1] - this.points[1][1]];
        }
    }
    setHitBox(width: number, height: number): void {
        this.hitbox = [width, height];
        this.square = true;
    }
    draw(options: DrawOptions): void {
        var { ctx, camera } = options;
        ctx.fillStyle = this.backgroundColor;
        ctx.beginPath();

        ctx.moveTo(this.points[0][0] - camera[0], this.points[0][1] - camera[1]);
        for (var point of this.points) {
            ctx.lineTo(point[0] - camera[0], point[1] - camera[1]);
        }
        ctx.closePath();
        ctx.fill();

    }
    polify(): Point[] {
        return this.points;
    }
    getWidth(): number {
        var points = this.points;

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
    getHeight(): number {
        var points = this.points;

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
    move(vector: Vec2): Boolean {
        var moved: Boolean = super.move(vector);
        var newPoints: Point[] = []
        for (var point of this.points) {
            var newCoords = <Vec2>sumArrays(point, vector);
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

        return moved;
    }
}

class Sprite extends GameObject {
    image: string;
    source: HTMLImageElement;
    coordinates: Vec2;
    spriteLoaded: boolean;
    width: number;
    height: number;


    constructor(options: SpriteOptions) {
        super(options);
        this.type = "sprite"
        this.image = options.url;
        this.coordinates = options.coordinates;
        this.width = options.width;
        this.height = options.height;
        this.square = true;
        this.hitbox = [this.width, this.height];
        this.source = new Image(this.width, this.height);
        this.spriteLoaded = false
        this.reload();
    }
    getWidth(): number {
        return this.width;
    }
    getHeight(): number {
        return this.height;
    }
    reload(): void {
        this.source.src = this.image;
        this.source.crossOrigin = 'anonymous'
        this.source.onload = () => {
            this.spriteLoaded = true;
        }
    }
    draw(options: DrawOptions): void {
        var { ctx, camera } = options;
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
    reshape(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.hitbox = [this.width, this.height]
    }
    scale(factor: number): void {
        this.width = this.width * factor;
        this.height = this.height * factor;
        this.hitbox = [this.width, this.height];
    }
    changeSource(image: string): void {
        this.image = image;
        this.reload();
    }
    polify(): Point[] {
        var point1: Point = [this.coordinates[0], this.coordinates[1]];
        var point2: Point = [this.coordinates[0] + this.width, this.coordinates[1]];
        var point3: Point = [this.coordinates[0] + this.width, this.coordinates[1] + this.height];
        var point4: Point = [this.coordinates[0], this.coordinates[1] + this.height];
        return [point1, point2, point3, point4]
    }
}

class Light {
    point: Point;
    diffuse: number;
    strength: number;
    color: Array<number>;
    type: string;
    pinnedTo: GameObject | null;

    constructor(position: Point, diffuse: number, strength: number = 0.8, color = [255, 255, 255]) {
        if (typeof color != "object" || color.length != 3) throw new Error("Light color format is [r,g,b]");
        this.point = position;
        this.type = "light";
        this.diffuse = diffuse;
        this.strength = strength;
        this.color = color;
        this.pinnedTo = null;
    }
    pin(object: GameObject): void {
        this.pinnedTo = object
    }
    brighten(factor: number) {
        this.strength *= factor;
    }
    dim(factor: number): void {
        this.strength /= factor;
    }
    move(vector: Vec2): void {
        this.point = <Vec2>sumArrays(this.point, vector)
    }
    moveToObject(object: GameObject): void {

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
    update(canvas: HTMLCanvasElement): void {
        if (this.pinnedTo) {
            this.moveToObject(this.pinnedTo)
        }
    }
}

class DirectionalLight extends Light {
    angle: number;
    spread: number;
    pinnedToAngle: GameObject | null;

    constructor(position: Point, angle: number, spread: number, diffuse: number, strength: number, color = [255, 255, 255]) {
        super(position, diffuse, strength, color)
        if (typeof color != "object" || color.length != 3) throw new Error("Light color format is [r,g,b]");
        this.point = position;
        this.diffuse = diffuse;
        this.strength = strength;
        this.color = color;
        this.angle = angle;
        this.type = "directional";
        this.spread = spread;
        this.pinnedToAngle = null;
    }
    pointTo(object: GameObject, canvas: HTMLCanvasElement) {
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
    pinAngleTo(object: GameObject) {
        this.pinnedToAngle = object;
    }
    update(canvas: HTMLCanvasElement) {

        if (this.pinnedTo) {
            this.moveToObject(this.pinnedTo)
        }
        if (this.pinnedToAngle) {
            this.pointTo(this.pinnedToAngle, canvas);
        }
    }
}


class Scene {
    objects: Array<GameObject>;
    collisionMonitors: Array<CollisionMonitor>;
    cameraAngle: Vec2;
    fpsBuffer: Array<number>;
    fpsMonitoringEnabled: boolean;
    lastFrameStamp: number;
    lastPhysicsUpdate: number;
    lighting: boolean;
    id: string;
    update: Function;
    lights: Array<Light>;
    dlights: Array<DirectionalLight>;
    gpu: any;
    readyToDraw: boolean;
    diffuseKernel: any;
    fog: number;
    ambient: number;
    clearScene: boolean;
    physics: boolean;
    Engine: any;
    Bodies: any;
    Composite: any;
    engine: any;
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    width!: number;
    height!: number;
    bounds: Vec2;
    boundsActive: boolean;
    cameraBind: GameObject | null;
    FPS_BUFFER_SIZE: number;
    isActiveScene: boolean;

    constructor(options: SceneOptions = {}) {
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
        } else {
            this.fog = 1.3;
            this.ambient = 0.2;
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
        } else {
            this.physics = false;
            this.Engine = null;
            this.Bodies = null;
            this.Composite = null;
            this.engine = null;
        }
        this.readyToDraw = false;
    }
    ready(): void {
        if (this.lighting) {
            this.diffuseKernel = this.gpu.createKernel(GPULightingKernel, {
                output: [this.canvas.width, this.canvas.height],
                functions: {
                    distance: (a: Point, b: Point) => {
                        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
                    }
                },
                graphical: true,
                dynamicArguments: true
            });
        }
        this.readyToDraw = true;
    }
    addLight(light: Light | DirectionalLight): void {
        if (instanceOfDirectionalLight(light)) {
            this.dlights.push(light);
        } else {
            this.lights.push(light);
        }
    }
    formatLights(lights: Array<Light>): Array<number> {
        var flights = lights.map(l => {
            return [l.point[0] - this.cameraAngle[0], l.point[1] - this.cameraAngle[1], l.strength, l.diffuse, l.color]
        });
        return flights.flat(2);
    }
    formatDLights(lights: Array<DirectionalLight>): Array<number> {
        var dlights = lights.map(l => {
            return [l.angle, l.point[0] - this.cameraAngle[0], l.point[1] - this.cameraAngle[1], l.strength, l.diffuse, l.spread, l.color];
        });
        return dlights.flat(2);
    }
    diffuseLights(ambient: number = 0.2, fog: number = 1.3): void {
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
    setBoundaries(rightBound: number, bottomBound: number, activate: boolean = true): void {
        this.bounds = [rightBound || this.canvas.width, bottomBound || this.canvas.height];
        this.objects.forEach(object => {
            object.setBounds(this.bounds);
        });
        this.boundsActive = activate;
        if (this.physics) {
            var topBoundObj = this.Bodies.rectangle(this.bounds[0] / 2, -10, this.bounds[0], 10, { isStatic: true, friction: 0 });
            var bottomBoundObj = this.Bodies.rectangle(this.bounds[0] / 2, this.bounds[1] + 10, this.bounds[0], 10, { isStatic: true, friction: 0 });
            var leftBoundObj = this.Bodies.rectangle(-10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
            var rightBoundObj = this.Bodies.rectangle(this.bounds[0] + 10, this.bounds[1] / 2, 10, this.bounds[1], { isStatic: true, friction: 0 });
            this.Composite.add(this.engine.world, [topBoundObj, bottomBoundObj, leftBoundObj, rightBoundObj]);
        }
    }
    disableBounds(): void {
        this.boundsActive = false;
        this.objects.forEach(object => {
            object.disableBounds();
        })
    }
    activateBounds(): void {
        this.boundsActive = true;
        this.objects.forEach(object => {
            object.activateBounds();
        })
    }
    addObject(object: GameObject): void {
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
    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw(): void {
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

            if (this.fpsBuffer.length > this.FPS_BUFFER_SIZE) {
                this.fpsBuffer.shift();
            }
            this.ctx.font = "20px Ariel";
            this.ctx.fillStyle = "black";
            this.ctx.fillText("FPS: " + calculateFPS(this.fpsBuffer), 5, 20);
        }
    }
    removeObject(object: GameObject): void {
        this.objects.filter(compare => {
            return !(compare.id == object.id);
        })
    }
    enableCollisionsBetween(o1: GameObject, o2: GameObject, fo: Function, ff: Function) {
        this.collisionMonitors.push([o1, o2, fo, ff, false]);
        this.collisionMonitors.push([o2, o1, fo, ff, false]);
    }
    bindCamera(object: GameObject): void {
        this.cameraBind = object
    }
    unbindCamera(): void {
        this.cameraBind = null;
    }
    cameraTo(object: GameObject) {
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
    moveCamera(vector: Vec2) {
        this.cameraAngle = <Vec2>sumArrays(this.cameraAngle, vector);
    }
    enableFPS() {
        this.fpsMonitoringEnabled = true;
    }
    disableFPS() {
        this.fpsMonitoringEnabled = false;
    }
}

class Input {
    active: boolean;
    key: string;
    fireRate: number;
    id: string;
    fireInterval: any;
    firing: boolean;
    clickMonitor: boolean;
    on!: Function;

    constructor(key: string, fireRate: number) {
        if (key == "click") {
            this.clickMonitor = true;
        } else {
            this.clickMonitor = false;
        }
        this.key = key;
        this.fireRate = fireRate
        this.id = uid();
        this.fireInterval;
        this.firing = false;
        this.active = false;
    }
    startFiring(e: Event) {
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
    stopFiring() {
        if (this.firing) {
            this.firing = false;
            clearInterval(this.fireInterval);
        }
    }
    activate(scene: Scene) {
        this.active = true;
        if (this.clickMonitor) {

            document.addEventListener("mousedown", (event) => {
                if (!scene.isActiveScene) return;
                let rect = scene.canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;
                scene.objects.forEach(object => {
                    var r = <Point>sumArrays([x, y], scene.cameraAngle);
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
                        this.stopFiring();
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
    scenes: { [key: string]: Scene };
    activeScene: string;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    sceneAnimation!: string;
    animationStartTime!: number;
    animationRunTime!: number;
    animateTo!: Scene;
    animationNames: Array<string>;
    fromScenePrevHadLights!: boolean;
    toScenePrevHadLights!: boolean;
    animationRunning: boolean;
    constructor(options: SceneManagerOptions) {
        var initialScene = options.initialScene;
        if (!initialScene) throw new Error("Initial scene not provided");
        this.scenes = {};
        this.scenes[initialScene.id] = initialScene;
        this.activeScene = initialScene.id;

        this.width = options.width || 500;
        this.height = options.height || 500;
        this.canvas = options.canvas;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d", { willReadFrequently: true });
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
    changeScene(scene: Scene): void {
        this.scenes[this.activeScene].isActiveScene = false;
        this.scenes[scene.id] = scene;
        this.scenes[scene.id].isActiveScene = true;
        this.activeScene = scene.id;
    }
    addScene(scene: Scene): void {
        var arg1 = scene;
        this.scenes[arg1.id] = arg1;
        arg1.width = this.width;
        arg1.height = this.height;
        arg1.canvas = this.canvas;
        arg1.ctx = this.ctx;
        arg1.ready()
    }
    animate(transition: string, scene: Scene, duration: number = 1000): void {
        if (!this.animationNames.includes(transition)) throw new Error("Invalid transition type");
        this.sceneAnimation = transition;
        this.animationStartTime = performance.now();
        this.animationRunTime = duration;
        this.animateTo = scene;

        if (transition.startsWith('slide')) {
            this.fromScenePrevHadLights = this.scenes[this.activeScene].lighting;
            this.toScenePrevHadLights = this.scenes[this.animateTo.id].lighting;
        }
    }
    draw(): void {
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
                    this.ctx.fillRect(0, 0, this.width, this.height)
                    var timeElapsed = performance.now() - this.animationStartTime;
                    var progress = timeElapsed / (this.animationRunTime / 2);
                    if (progress < 1) {
                        this.ctx.globalAlpha = 1 - progress;
                        this.scenes[this.activeScene].draw();
                    } else {
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
        } else {
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
        window.requestAnimationFrame(() => {
            this.draw();
        })
    }
}
