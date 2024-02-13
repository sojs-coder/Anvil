# Physics

Anvil physics implements matter.js physics under the hood, and therefore all matter.js methods and properties are available.

## Matter.js References:

To access the physical body of any GameObject (provided physics is enabled on both the scene and the GameObject), use the `body` property:

```js
const polygonMatterJSBody = myPoly.body
```

To access the matter.js `Engine`, you can access the `Engine` property of any scene with physics enabled:

```js
const Engine = scene.Engine
```

To access matter.js Bodies, you can access the `Bodies` property of any scene with physics enabled:

```js
const Bodies = scene.Bodies
```

To access matter.js Composite, you can access the `Composite` property of any scene with physics enabled:

```js
const Composite = scene.Composite
```

Engine instances are unique to every scene, and can be accessed with the lower case `engine` property:

```js
const sceneEngine = scene.engine
```

## Out-of-the-box
Matter.js works out of the box, no need to configure anything, just set `physics` to true on any scene.

```js
const sceneWithPhysics = new Scene({
	physics: true,
	physicsOptions: {
		gravity: {
			y: 1,
			x: 0
		}
	}
});
```

For a full list of options that the scene takes, reference the [documentation](https://sojs-coder.github.io/Anvil/docs/interfaces/WorldPhysicsOptions.html).

To enable physics on an object, set the `physicsEnabled` property to true in any gameObject's options:

```js
const physicsPolygon = new Polygon({
  points: [[0, 0], [50, 0], [50, 50], [0, 50]],
  backgroundColor: "#0000FF",
  physicsEnabled: true,
  physicsOptions: { mass: 10, friction: 0.5 },
});

myScene.addObject(physicsPolygon);
```

For a full list of options to configure objects, see the [documentation](https://sojs-coder.github.io/Anvil/docs/interfaces/PhysicsOptions.html). All options are also accessible using the `gameObject.body` reference.
