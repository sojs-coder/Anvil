# Anvil.js

Anvil.js is a lightweight JavaScript library that simplifies the creation and management of 2D scenes for web applications. It provides an easy-to-use interface for rendering graphics, handling user input, implementing physics simulations, and incorporating lighting effects.

## Capabilities
- multiple scenes
- lighting
- physics
- collision detection
- keyboard input
- mouse input

# Getting Started


To get started, add the script to HTML file.
```html
<script src = "/dist/anvil.min.js"></script>
```

> Make sure to grab `.min.js`, as that is the bundled version. Otherwise, install `/deps/gpu.js` and `/deps/matter.js` alongside it.

Create a canvas element in your HTML file where you want to render the scene.

```html
<canvas id="myCanvas" width="800" height="600"></canvas>
```


Now, you can start using Anvil.js to create and manage your 2D scenes.

# Features

## 1. Scene Management

Anvil.js provides a `Scene` class for managing 2D scenes. You can easily create scenes, add objects (polygons and sprites), enable physics, and control the rendering loop.

```js
const myScene = new Scene({
  width: 800,
  height: 600,
  canvas: document.getElementById("myCanvas"),
  fpsMonitoringEnabled: true,
  lighting: true,
  physics: true,
  start: true,
});
```

## 2. Polygon and Sprite Objects
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

## 3. Input Monitoring
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

## 4. Lighting Effects
Anvil.js supports lighting effects within the scene. You can create and manipulate light sources to enhance the visual appeal of your application.

Example: Adding Lights
```js
const myLight = new Light([100, 100], 0.7, 0.8, [255, 255, 255]);

myScene.addLight(myLight);
```

## 5. Physics Simulation
Anvil.js enables physics simulations for objects within the scene. You can enable physics on polygons and control their interactions.

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

# Examples

Check out the provided demo examples to see Anvil.js in action:

1. [Lighting example wth multiple lights](/demos/demo1.html)
2. [Physics Demo with Player-Controlled Square](/demos/demo2.html)
3. [No Physics and No lights demo](/demos/demo3.html)

# Documentation

For detailed documentation and usage instructions, refer to the [Anvil.js Documentation](https://github.com/sojs-coder/Anvil/wiki).

# License

Anvil.js is licensed under the MIT License.
