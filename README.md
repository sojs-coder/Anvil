# Anvil
Forge HTML games

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
