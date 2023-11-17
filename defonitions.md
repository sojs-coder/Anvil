# Class Method, Attributes, and Available helper functions

## Object()
Base class for all objects

### Methods

#### `unpin()`
Currently does nothing
#### `pin()`
Currently does nothing
#### `draw()`
Does nothing in the base class
#### `checkCollision(object)`
Returns true/false, depending on whether the current object and the parameter object are collided or not
#### `disableBounds()`
Disables bounds for that object (allows it to move past bounds set in `Scene.setBounds()`
#### `activateBounds()`
Activated bounds for that objects (does not allow it to move past bounds set in `Scene.setBounds()`
#### `move(vector)`
Moves the object in the direction of the vector

## Attributes
- `id`: Unique ID for each object
- `bounds`: Boundaries set with `Scene.setBoundaries()`
- `boundsActive`: true or false whether `Object.bounds` has any effect. Mofiy with `Scene.activateBounds()/disableBounds()`
- `pinned`: Does nothing

## Polygon(points,backgroundColor)
- `points`: each point in the polygon
- `backgroundColor`: the background color of the polygon.
  - Modify by directly changing the attribute (`Polygon.backgroundColor = x`)
### Methods

#### `setHitBox(width,height)`
Disables standard polygon collision detection and builds a square hitbox with width of `width` and height of `height`. Useful for concave polygons.

#### `draw(ctx,cameraAngle)`
Draws the polygon on the passed canvas context (`ctx`), in accordance with the `cameraAngle` (position of camera in the scene)

#### `polify()`
Returns the vertices of the polygon

#### `getWidth()`
Returns the width of the polygon.

#### `getHeight()`
Returns the height of the polygon

#### `move(vector)`
Identical to `object.move()` except specialized for polygons

### Attributes
- `points`: Set of points that construct the polygon
- `backgroundColor`: Color of the polygon
- `coordinates`: Top-left most point of the polygon
- `convex`: boolean, true if the polygon is convex, false otherwise (used for collision detection
- `hitbox`: undefined until set with `setHitBox()`
- `square`: true/false if the hitbox is activated or no (undefined until `setHitBox()`

## Sprite(image, x, y, width, height)
- `image`: URL to the image source of the sprite
- `x`: initial X coordinate of the sprite
- `y`: initial Y coordinate of the sprite
- `width`: width of the sprite
- `height`: height of the sprite

### Methods

#### `getWidth()`
Returns the width of the sprite

#### `getHeight()`
Returns the height of the sprite

#### `reload()`
Reloads the image source

#### `draw(ctx,cameraAngle)`
Draws the sprite on the passed canvas context (`ctx`), in accordance with the `cameraAngle` (position of camera in the scene)

#### `reshape(width,height)`
Reshapes the sprite

#### `scale(factor)`
Scales the sprite up or down by the factor (must be positive)

#### `changeSource(image)`
Changes the source of the image. To have any effect, must be followed by `Sprite.reload()`

#### `polify()`
Returns a list of the vertices of the sprite.

### Attributes
- `image`: URL of the image source
- `coordinates`: array, `[x,y]`, top left of the sprite
- `width`: Width of the sprite
- `height`: height of the sprite
- `square`: True... the sprite must be square. Used for collision detection
- `hitbox`: Array `[width,height]` of the sprite hitbox

## Scene(HTMLCanvasElement, width, height)

Creates a new scene on the specified canvas with a width of `width` and a height of `height`.

### Methods

#### `setBoundaries(rightBound,bottomBound, activate=true)`
Sets boundaries for the scene. Does not allow objects to move outside of the bounds with `object.move`.
If activate is false, the bounds will not work until `scene.activateBounds()` is called. Otherwise, bounds are automatically active.

#### `disableBounds()`
Disables bounds set with `Scene.setBoundaries()`.

#### `activateBounds()`
Activates bounds set with `Scene.setBoundaries()`.

#### `addObject(object)`
Adds the specific object to the render queue. Order is important.
For example, the following code will render `object2` on top of `object`.

```js
scene.addObject(object1)
scene.addObject(object2)
```

#### `clear()`
Clears the canvas

#### `draw(clear=true)`
Draws each object in the scene. If `clear` is set to true (defualt), then the previous frame will be cleared before drawing the next one.

#### `removeObject(object)`
Removes an object from the scene

#### `enableCollisionsBetween(object1, object2, onFunction, offFunction)`
Enables collisions between `object1` and `object2`. `onFunction` is called when the collision happens, and when the objects are no longer colliding, `offFunction` is called. Both are called one time (even if the object stays collided for multiple frames)

#### `bindCamera(object)`
Binds the scene's camera to the specified object

#### `unbindCamera()`
Unbinds the camera from an object (allows the object to move freely, seperate from the camera)

#### `cameraTo(object)`
Moves the camera to the specified object. If the object moves, the camera will not move after the function is called. To keep the camera on an object forever, us `bindCamera`.

#### `moveCamera(vector)`
Moves the scene camera in accordance with that vector.

#### `enableFPS()`
Enables an FPS counter on the top left of the canvas

#### `disableFPS()`
Disables the FPS counter.

### Attributes
- `id`: Unique identifier for the scene
- `width`: width of the canvas
- `height`: height of the canvas
- `objects`: Array, list of objects in the scene
- `canvas`: HTMLCanvasElement, reference to the canvas that the scene draws on
- `ctx`: canvas drawing context
- `collisionMonitors`: List of collision monitors (each monitor is a list iteslf `[object1: Object, object2: Object, onFunction: Function, offFunction: Function, active: Boolean]`
- `cameraAngle`: Position of camera in scene
- `fpsBuffer`: (Array, 120 long) How long it took for last 120 frames to render
- `fpsMonitoringEnabled`: Boolean, enable with `enableFPS()`, disable with `disableFPS()`
- `lastFrameStamp`: Timestamp of when the last frame finished rendering

## Input(key, fireRate)
Flow:
1. Create the monitor
2. Assign a `.on` event to the monitor
3. Activate the monitor

### Methods

#### `startFiring(event)`
Fires the function assigned to `Input.on`, fires once every `fireRate` milliseconds

#### `stopFiring()`
Stops firing `Input.on()`

#### `activate()`
Activates the monitor. Listens to keypress events events that match with `key`, and fires the `Input.on()` function every `fireRate` milliseconds until the key is lifted

### Attributes
- `key`: The specific `event.key` that the event listens to
- `fireRate`: how often the `.on` event is fired (in milliseconds)
- `firing`: Boolean, is the event currently firing
- `on`: Set by user, function that is called when the key is pressed
- `fireInterval`: Reference to the interval that calls the `on` function
- `active`: boolean, is the monitor currently active (set with `Input.activate`, `Input.deactivate()`, and `Input.reactivate()` 

## Helper Functions
- `calculateFPS(fpsBUffer)`:
  - fpsBuffer: list of frame rendering times
  - returns FPS as string
- `isConvex(points)`
  - points: List of points in a polygon
  - Returns true if the polygon is convex, false otherwise
- `findTopLeftMostPoint(points)`
  - points: List of points in a polygon
  - Returns the top-left most point
- `getBoundingBox(vertices)`
  - Vertices: list of points
  - Returns: bounding box [minX, minY, maxX, MaxY]
- `sumArrays(...arrays)`
  - Sums the elements of the arrays passed (must be number arrays
  - Returns 1 array
- `uid()`
  - Generates a UID
- `checkSquareCollision(square1, sqaure2)`
  - checks to see if the two squares are colliding (returns boolean)
  - Both squares must be list of points
- `checkCollision(polyon, points)`
  - Rudimentary collision detector, can not detect if no points are inside the polygon
  - Used for concave polygons
  - polygon is a list of points
  - points is a list of points
  - Returns boolean

