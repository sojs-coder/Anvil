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
