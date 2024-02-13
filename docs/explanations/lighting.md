# Lighting a Scene

Lighting a scene is easy. Just switch "lighting" to true in your scene's options:

```js
const myScene = new Scene({
	lighting: true,
	lightOptions: {
		ambient: 0.2 // must be non-zero
		fog: 1.2
	}
});
```
Here, we initialize an empty scene with no active lights. 

We set the ambient lighting to 0.2, which is the default, and dimly lights each object in the scene. Fog controls how the light spreads in a scene. A fog of 1 means that the brightness of the light will decrease linearly from the origin.

To add a light into the scene, use the [`Light`](https://sojs-coder.github.io/Anvil/docs/classes/Light.html) constructor.

```js
var myLight = new Light(position, diffuse, strength, color)
```

- position: [x,y]- coordinates of the light
- diffuse controls the radius of the light. A diffuse of 100 means that the max distance that the light can diffuse is 100 pixels in every direction from the light's position
- strength controls how bright each pixel is as they become farther from the light
- color should be in [r,g,b] format... eg: [255,255,255] for white light.

Once we have configured our light, we can add it to the scene.

```js
myScene.addLight(myLight);
```

The light class also has multiple features that you can use to make your experience easier.

These include `pin`:

```js
light.pin(gameObject);
```
This pins the light's position to any game object, and it updates every frame.

For a full list of methods, see the [documentation](https://sojs-coder.github.io/Anvil/docs/classes/Light.html#brighten)

