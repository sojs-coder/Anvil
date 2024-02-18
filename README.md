# Anvil.js

Anvil.js is a lightweight JavaScript library that simplifies the creation and management of 2D scenes for web applications. It provides an easy-to-use interface for rendering graphics, handling user input, implementing physics simulations, and incorporating lighting effects.

## Capabilities
1. multiple scenes
2. cross-scene animation
3. lighting
4. physics
5. collision detection
6. keyboard input
7. mouse input
8. multiple layers
9. sound
10. directional sound
11. multiplayer

# Getting Started


To get started, add the script to HTML file.
```html
<script src = "/build/anvil.js"></script>
```

Create a canvas element in your HTML file where you want to render the scene.

```html
<canvas id="myCanvas" width="800" height="600"></canvas>
```


Now, you can start using Anvil.js to create and manage your 2D scenes.

# Features

## Scene Management

Anvil.js provides a `Scene` class and `SceneManager` class for managing 2D scenes. You can easily create scenes, add objects (polygons and sprites), enable physics, and control the rendering loop.
If you do not want to manage multiple layers yourself, you can create simple scene with 1 layer, without specifying it in the options.

```js
const myScene = new Scene({
  fpsMonitoringEnabled: true,
  lighting: true,
});

const sceneManager = new SceneManager({
     initialScene: myScene,
     canvas: document.getElementById("canvas")
});
```

## Polygon and Sprite Objects
Anvil.js supports two types of objects: `Polygon` for geometric shapes and `Sprite` for image-based objects. You can create, manipulate, and add these objects to the scene.

Example: Creating a Polygon
```js
const myPolygon = new Polygon({
  points: [[0, 0], [50, 0], [50, 50], [0, 50]],
  backgroundColor: "#00FF00",
});

myScene.addObject(myPolygon);
```

Example: Creating a Sprite
```js
const mySprite = new Sprite({
  url: "path/to/image.png",
  coordinates: [100, 100],
  width: 50,
  height: 50,
});

myScene.addObject(mySprite);
```

On top of that, Anvil.js also allows for creating your own game objects by extending the parent class `GameObject`:

```js
class MyFancyGameObject extends GameObject
```

## Input Monitoring
Anvil.js provides an `Input` class for monitoring keyboard and mouse events. You can easily create monitors and handle events.

Example: Monitoring Arrow Keys
```js
const moveLeft = new Input("ArrowLeft");
const moveRight = new Input("ArrowRight");

moveLeft.on = () => {
  // Handle left arrow key press
};

moveRight.on = () => {
  // Handle right arrow key press
};

moveLeft.activate();
moveRight.activate();
```
You can also use the input class to monitor for click input.

```js
const clickMonit = new Input("click");
clickMonit.on = (e)=>{
  console.log(e.realX);
  console.log(e.realY); // coordinates on the screen that were clicked

  console.log(e.x);
  console.log(e.y); // game-space coordinates (accounts for camera movement)

  console.log(e.gameObject) // top-most layer game object that was click (null if no game object was clicked)
}
```

## Lighting Effects
Anvil.js supports lighting effects within the scene. You can create and manipulate light sources to enhance the visual appeal of your application.

Example: Adding Lights
```js
const myLight = new Light([100, 100], 0.7, 0.8, [255, 255, 255]);

myScene.addLight(myLight);
```

## Physics Simulation
Anvil.js enables physics simulations for objects within the scene. You can enable physics on polygons and control their interactions.

For the engine to update the interactions between bodies, the layer that the object is in must also have physics enabled, or if no layers were specified, the scene should have physics enabled.

Example: Enabling Physics on a Polygon
```js
const physicsPolygon = new Polygon({
  points: [[0, 0], [50, 0], [50, 50], [0, 50]],
  backgroundColor: "#0000FF",
  physicsEnabled: true,
  physicsOptions: { mass: 10, friction: 0.5 },
});

myScene.addObject(physicsPolygon);
```

## Collision Detection

Anvil.js provides a super-easy to use collision detection interface.

For example, say we have two polygons that we want to detect collisions on.

```js
const poly1 = //...
const poly2 = //...

myScene.enableCollisionsBetween(poly1,poly2,on,off);

function on(){
  console.log("collision started");
}
function off(){
  console.log("polygons separated");
}
```

## Multiple layers

By defualt, Anvil will configure 1 layer for your scene. If you want to manually configure the layers to have multiple or enable parallax, you can do so very easily.

```js
const background = new Layer({
  parallax: [0.5,0.5] // 50% on both X and Y axes
});
const foreground = new Layer() // default parallax is [1,1]

const scene = new Scene({
  layers: [background, foreground]
});

// to add objects to a certain layer, pass the ID of the layer you want to add the object to when calling `addObject`.

scene.addObject(backgroundSprite, background.id);
scene.addObject(playerSprite, foreground.id);

// if no layer ID is specified, the object will be added automatically to the top-most layer.

```


## Sound
Anvil.js provides a super quick and easy way to play sounds. It takes two lines, in fact.

```js
const mySound = new Sound({ source: "path/to/sound.mp3" });
mySound.play();
```

You can also tie objects to sounds. Anvil.js provides two classes for this: `SoundEmitterPolygon` and `SoundEmitterSprite`.

These will play their sounds (looping by default, unless otherwise specified) to a specified game object.

For example, let us say you have an object you consider to be the player called `player`:

```js
const player = new Sprite(/*...*/);

const speaker = new SoundEmitterSprite({
  coordinates: [100,100],
  url: "/path/to/sprite.png",
  width: 100,
  height: 100,
  soundOptions: {
    source: "path/to/sound.mp3",
    listener: player
  }
});
```

As the `player` game object gets farther and farther away from the `speaker` game object, the sound will play quieter and quieter. 

## Multiplayer
Multiplayer in anvil.js is super quick and painless to set up. Check out the [multiplayer folder](https://github.com/sojs-coder/Anvil/tree/main/multiplayer) on github for a >100 line example.

The structure of Anvil.js multiplayer is as follows:
- each client connects and is assigned a game object to be considered the "local player" on the client
- the local player game object is modified in some way to show that it is the current player (in the example, the polygon is turned blue)
- on the client, input is sent over to the server, which connects it back to the correct "local player
, where an action can be taken on it. In the example, we make "WASD" move the players around.

Currently, multiplayer does not support multiple layers.


# Examples

Check out the provided demo examples to see Anvil.js in action:

1. [Lighting example wth multiple lights](/demos/demo1.html)
2. [Physics Demo with Player-Controlled Square](/demos/demo2.html)
3. [No Physics and No lights demo](/demos/demo3.html)
4. [Example game](/demos/demo4.html)
5. [Example of multiple layers with parallax processing and layers](/demos/parallax.html)
6. [Example with sound emitting objects](/demos/sound.html)
7. [Multiplayer example source code](https://github.com/sojs-coder/Anvil/tree/main/multiplayer)

# License

Anvil.js is licensed under the MIT License.
