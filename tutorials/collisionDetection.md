# Collision detection

Collision detection in Anvil.js relies on 2 primary functions, an "on" function and an "off" function. These two functions are called a single time, when the collision starts and when the collision ends.

To enable collisions between two game object, call the [Scene.enableCollisionsBetween](https://sojs-coder.github.io/Anvil/docs/classes/Scene.html#enableCollisionsBetween) method.

The method takes two objects (`object1` and `object`) and 2 functions `onFunction` and `offFunction`. `onFunction` is called a single time once the objects collide and `offFunction` is called a single time when the objects separate.

For example, say we have two objects, a triangle [polygon](https://sojs-coder.github.io/Anvil/docs/classes/Polygon.html) and a [sprite](https://sojs-coder.github.io/Anvil/docs/classes/Sprite.html):

```js
const myTriangle = new Polygon({
	points: [
		[0,0]
		[100,0],
		[100,100]
	],
	backgroundColor: "red"
});
const mySprite = new Sprite({
	url: "/path/to/image.png",
	width: 100,
	height: 100,
	coordinates: [50,50]
});
```

If we add these two objects to a scene (let's say `myScene`), we have two methods to check collisions on the objects.

## Collision Detecting (one-shot)

One-shot collision detection works very quickly, but it only checks for a collision at one point in time.

```js
var currentlyColliding = myPolygon.checkCollision(mySprite);

// do something with this information
```

## Collision Detecting (over time)

We can monitor collisions using the previously mentioned `enableCollisionsBetween` method of the [scene](https://sojs-coder.github.io/Anvil/docs/classes/Scene.html) class

```js
function onCollide(){
	console.log("Objects collided");
	myPolygon.backgroundColor = "green"
}
function onSeparate(){
	console.log("Objects separated");
	myPolygon.backgroundColor = "red"
}
myScene.enableCollisionsBetween(myPolygon,mySprite,onCollide, onSeparate);
```

This will automatically check for collisions every tick, simplifying your life.

## When to use

### `object.checkCollision(otherObject)` (One Shot)
One shot collision detection is best for when you only want to check for collisions one time. It takes away the extra step in the draw loop of checking for a collision and allows to to control when the collision is monitored and when you don't care too much.

### `scene.enableCollisionsBetween(...)` (Over time)
This is the easiest to implement and the fastest to get working quickly. It is also the best solution if you want to monitor the collisions every frame.

## TL;DR

Enables collision checking every single frame:
```js
function onCollide(){
	console.log("Objects collided");
	myPolygon.backgroundColor = "green"
}
function onSeparate(){
	console.log("Objects separated");
	myPolygon.backgroundColor = "red"
}
myScene.enableCollisionsBetween(myPolygon,mySprite,onCollide, onSeparate);
```

Checks for a collision a single time and returns a boolean true/false:
```js
var currentlyColliding = myPolygon.checkCollision(mySprite);
```
