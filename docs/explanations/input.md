# Input
Anvil.js makes monitoring input extremely easy- no need to monitor which keys are down, how fast the key fires when it is held, etc.

## Single Player (SP)
Single player input relies only on the [Input](https://sojs-coder.github.io/Anvil/docs/classes/Input.html) class.
### Click
To monitor a click event, create a new instance of the input class and pass it "click" as the event to listen for.
```js
const clickInput = new Input("click");
```
Then, build your `on` function:
```js
function onClick(clickedGameObject){
	console.log(clickedGameObject.id + " was clicked");
}
```
Assign your on function to the input, and then activate it on the whichever scene you want to watch for clicks on:
```js
clickInput.on = onClick;
clickInput.activate(myScene);
```
> Note: click events will only be fired if myScene is the active scene

#### Using click events with `state`
Click events are designed to work with object `state`, making it easy to modify properties of an object that will return to the original state once the mouse is lifted. 

For example, let's say we have a polygon, and when it is clicked, we want to turn it permanently red:
```js
const poly = new Polygon({
	points: [
		[0,0]
		[100,0]
		[100,50]
		[0,50]
	],
	backgroundColor: "green"
});

function onClick(gameObject){
	if(gameObject.id == poly.id){
		gameObject.backgroundColor = "red";
	}
}

...
clickInput.on = onClick;
```
This, however, will permanently change how the polygon looks. If we want to make it reversible, we can take advantage of object `state`:

```js
...
function onClick(gameObject){
	if(gameObject.id == poly.id){
		gameObject.state("backgroundColor","red");
	}
}
...
```
Now, when the player lifts the mouse, the polygon will turn back green.

### Keyboard

To monitor keyboard input, we just pass the key that we want to monitor. For example, let's say we have a player sprite that we want the player to be able to move around the screen:
```js
const player = new Sprite({
	url: "sprite.png",
	width: 50,
	height: 50,
	coordinates: [0,0]
});
```

To do this, we would create 4 input instances that each monitor a different key (Say, the arrow keys, or WASD)
```js
const up = new Input("w");
const down = new Input("s");
const left = new Input("a");
const right = new Input("d");

// or, with arrow keys
const up = new Input("ArrowUp");
const down = new Input("ArrowDown");
const left = new Input("ArrowLeft");
const right = new Input("ArrowRight");
```
Then, we assign `on` methods and activate the inputs

```js
up.on = ()=>{
	player.move([0,-10]);
}
down.on = ()=>{
	player.move([0,10]);
}
// etc
up.activate()
down.activate();
left.activate();
right.activate();
```

> Note: Input takes two parameters: key and fireRate. fireRate by defualt is ten, which means that the even will fire every 10ms. You can slow this down to any number you want. 10ms is the fastest that it will run.
> 
> Note: Non-click input monitors are activated over the whole page, so it does not matter what scene is the active scene. (This is why we did not pass anything to activate). To get around this, check for the scene you want in your `on` functions. Eg:
> ```js
> down.on = ()=>{
>     if(!myScene.isActiveScene) return;
>     player.move([0,10]);
>}
## Multi-player (MP)
If you have not read the multiplayer documentation, it is recommended you do so. 

Multiplayer input relies on the [MultiPlayerClientInput](https://sojs-coder.github.io/Anvil/docs/classes/MultiPlayerClientInput.html), [MultiPlayerInputHandler](https://sojs-coder.github.io/Anvil/docs/classes/MultiPlayerInputHandler.html), and [ServerInputHandler](https://sojs-coder.github.io/Anvil/docs/classes/ServerInputHandler.html) classes.
Multiplayer input requires you to set up a handler on the server side and monitors on the client side. You must pass the handler to a [MultiPlayerServer](https://sojs-coder.github.io/Anvil/docs/classes/MultiPlayerServer.html) instance for it to work, and client-side monitors should by tied to a [PlayerClient](https://sojs-coder.github.io/Anvil/docs/classes/PlayerClient.html)

### One the Client
Client-side input handling is very easy. Just create a new `MultiPlayerClientInput` instance and pass it the key you want to fire. No `fireRate` or `on` functions needed.

```js
const input = new MultiPlayerClientInput("w", playerClient); // passes all "w" key presses to the server
```

### On the Sever

#### The MultiPlayerInputHandler
Though it looks super complicated, the `MultiPlayerInputHandler` class is super simple. Just pass it a list of `ServerInputHandlers` you want to handle.

```js
const inputHandler = new MultiPlayerInputHandler({
	monitors: [
		new ServerInputHandler({
			key: "w",
			fireRate: 10,
			on: (socket, playerObject) => {
				playerObject.move(0, -1);
			}
		}),
		new ServerInputHandler({
			key: "s",
			fireRate: 10,
			on: (socket, playerObject) => {
				playerObject.move(0, 1);
			}
		})
	]
});
```
You would then pass the `inputHandler` to a `MultiPlayerServer` instance: 

```js
const multiplayerSever = new MultiPlayerServer({
	...
	inputHandler
});
```

Lets break down the example code:
1. First, we create a new `MultiPlayerInputHandler` to manage all of the inputs the server will handler
2. Then, we pass a bunch of `ServerInputHandlers` to the `monitors` option.

Each `ServerInputHandler` takes the following options:

- key: The key to listen to events on... this should match the ones specified when defining you `MultiPlayerClientInput` instances
- fireRate: this is the same as `fireRate` for basic input. The `on` function will be called once every `fireRate` milliseconds as long as the key is down on the client side
- on: this is the `on` function the is called whenever the key is pressed. It is passed two objects, the `socket` instance that fired the event, and a `gameObject` reference the the player that fired the event.
