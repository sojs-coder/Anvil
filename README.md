# Anvil
Forge HTML games
- [Full documentation](defonitions.md)

## Usage
### Install 
```html
<script src = "https://raw.githubusercontent.com/sojs-coder/Anvil/main/script.js"></script>
```

## Background

Each game is composed of multiple `scenes`, and each scene is composed of multiple `objects`.
To build a scene, call the `new Scene` method.

## Building a Scene

```js
var scene = new Scene(document.getElementById("game"),300,300);
```

`new Scene` takes in 3 parameters, the first is a reference to a canvas element in your HTML, the second and third are the width and height of the scene, in pixels.

## Building Objects

As of version 1.0.0, there are 2 objects you can create and add to a scene. These two are `Polygons` and `Sprites`. Polygons are abstract, and are really just a list of points. Sprites are a lot more versatile, with support for images.

### Creating Sprites

```js
var sprite = new Sprite("https://assets.codepen.io/t-1/user-default-avatar.jpg?fit=crop&format=auto&height=512&version=0&width=512",500,500,64,64);
```

Sprite takes in 5 parameters:
- `url`: the URL of the image
- `width`: The width of the image (this will resize images)
- `height`: The height of the image (modifying this will resize the image)
- `x`: The starting X coordinate of the sprite, from the top left corner
- `y`: The starting Y coordinate of the sprite, from the top left corner

### Creating Polygons

```js
var poly = new Polygon([
  [0,0],
  [0,100],
  [100,100]
],"blue");
```
This will create a polygon that looks like the following:

![image](https://github.com/sojs-coder/Anvil/assets/77751154/b3816cd2-a25f-4976-9046-8550e00cbaf0)

The first parameter is an array of point, and the last is the color, which supports CSS colors (such as "blue", "green", and hex, like "#FE94AC").

You may notice, if you have been following along, that none of the shapes or sprites are appearing on-screen.

## Adding Objects to a Scene

```js
scene.addObject(object)
```

In our case, we should do

```js
scene.addObject(poly);
scene.addObject(sprite);
```
This will add both objects to our game

## Drawing the scene

To draw the scene, just call `draw()`
```
scene.draw(clear)
```
- Options
  - `clear` (bool, optional): t/f whether to clear the previous frame when drawing the new one (defualt is true)

 To draw the scene over and over again, put it in a function and call `window.requestAnimationFrame(func)`
 ```js
function drawBoard(){
  scene.draw();
  window.requestAnimationFrame(drawBoard);
```

## Monitoring User Input

To monitor user input, create a new `Input` monitor.

```js
var upArrowMonit = new Input("ArrowUp",10);
```

Where the first parameter is `event.key` and the second parameter is `fireRate`, in milliseconds.

Firerate will change how often the `press` event is fired as they key is pressed down. 10 milliseconds is the fastest possible.

To act on the input, assign a function to the monitor's `on` attribute;

```js
upArrowMonit.on = ()=>{
  console.log("Up Arrow Pressed");
});
```

Then, active the monitor:

```js
upArrowMonit.activate();
```

To deactivate, call `inputMonitor.deactivate()`, and then to reactivate it, call `inputMonitor.reactivate()`. (NOTE: do not use `inputMonitor.active()` to reactivate, use `reactivate()` instead.

## Moving Objects

To move an object, use the inbuilt `Object.move` method.
It takes 1 parameter, a vector (`[x,y]`). The vector represents how to modify the position of the objects.

For example, to move the object to the right 10px, call `object.move([10,0])`.
To move down 10px, call `object.move([0,10])`.

> Remember, Anvil measures pixel from the top left of everything, including the canvas. This means that to go up, you have to decrease in pixels (the up vector is `[0,-1]`), and to go down, increase in pixels (`[0,1]`);

## Collision Detection

> NOTE: collisions work best with convex polygons. Concave polygon support is only partial, and the algorithm is slow and rudimentary, and will fail under pressure.

To enable collisions between two objects, use the `scene.enableCollisionsBetween` method

```js
scene.enableCollisionsBetween(sprite,poly,onCollision,onUncollision)
```

This will enable a collision between `sprite` and `poly`, and when the two collide, it will call `onCollision` once. When the objects are no longer touching, it will call `onUncollision` once.

## Camera Movement

Anvil has two techniques to move the camera.

### Binding the camera to an object

This will center the camera on a specific object in the scene.

```js
scene.bindCamera(object);
```

### Moving the camera to an object

```js
scene.cameraTo(object);
```

This will call once, and if the object moves, the camera will not move with it. For tracking objects, use `bindCamera` instead.

### Moving the camera manually

```js
scene.moveCamera(vector);
```

Works in the same way as `object.move()`, but moves the camera instead.

## Adding scene boundaries

```js
scene.setBoundaries(rightBound, bottomBound);
```

Where bounds is a range `[x,y]`. This will not allow objects that move with the `object.move()` method to move outside these boundaries.

For example:

```js
scene.setBoundaries(500,500);
// this ensures that objects can not move outside of a 500x500 square with the object.move method
poly.move([500,500]); // will not do anything
poly.move([1,1]); // will work!
```

