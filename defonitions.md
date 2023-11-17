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

