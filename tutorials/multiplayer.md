# Multiplayer

> Multiplayer is currently in beta

To create a multiplayer server, you need nodejs.


## Setup
Your file structure should look somethings like:

```
-client
|----index.html
-public
|----script.js
-index.js
```

You need to install `http` as well to host the server.

```bash
npm i http
```

In this guide, we will also be using express to manage our routes:

```bash
npm i express
```

## The Server


### Building the server
The server-side code will all be on `index.js`, and all client javascript will be in `/public/script.js`.

First, we need to build an HTTP server.

```js
const http = require('http');
const express = require("express");

const app = express();
const server = http.createServer(app);
```

Here, we import `http` and `express` into our project, and then we create an express app to handle routing, and we finally pass that to `http.createServer`.

Then, we create serve all the public assets and the main route.
```js
app.use(express.static('./public');
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/client/index.html');
});
```

### Connecting Anvil.js

```js
// this should be the multiplayer build- in this repository, it is `index.js`
const ANVIL = require('./path/to/anvil.js');
```

The `ANVIL` constant has all the same methods and properties that you would normally access on the client.

For example, you can create a polygon using `new ANVIL.polygon()` as you normally would, or a scene with `new ANVIL.scene`.

However, we want players to be able to connect to the server and play all on one scene, so we can not use a normal `SceneManager`. 

The first step to creating a multiplayer server is to create a new [MultiplayerServer](https://sojs-coder.github.io/Anvil/docs/classes/MultiPlayerServer.html) instance, to which we will pass the previously created `server`.

```js
const myMultiPlayerServer = new ANVIL.MultiPlayerServer({
	httpServer: server, // previously created server instance
	sceneManager: multiPlayerSceneManager,
	onNewConnection: onNewConnection
	onDisconnect: onDisconnect,
	onNewPlayer: onNewPlayer,
	inputHandler: inputHandler
});
```

### MultiPlayerSceneManager
You'll notice that when we configured the MultiPlayerServer, we passed a `multiPlayerSceneManager` as the scene manger for the server. 

MultiplayerSceneManager works the same way as a normal [`SceneManager`](https://sojs-coder.github.io/Anvil/docs/classes/SceneManager.html), but with a couple more properties and options.

```js
const mySceneManager = new MultiPlayerSceneManager({
    initialScene: scene,
    showPlayerLabels: true
})
```

### onNewConnection

This function is called every time a new player connects. This does not mean that they have joined the game though, so do not handle game login here. This could be used for analytics purposes though.

In this example, we will just log when a new connection is recieved.

```js
function onNewConnection(){
	console.log("A new connection has been recieved");
}
```

### onDisconnect

The same as `onNewConnection`, except when a player disconnects.

Once again, we will just log this to the console.

```js
function disConnect(){
	console.log("A player has disconnected");
}
```

### onNewPlayer

This function is called once a new player responds to the server, saying that it does indeed wan to join the game. The function must return a username for the player and game object to assign to it.

In this example, we will randomly assign a username and assign him a red square.

```js
function onNewPlayer(socket, id, data){
	console.log("A new player with id of " + id + " wants to join");
	const player = new Polygon({
		points: [[0,0],[100,0],[100,100],[0,100]],
		backgroundColor: "red",
	});
	const adjs = ["cool","happy","nerdy","bubbly","fresh","blue","fast","sneaky"];
	const nouns = ["Snake","Dog","Helicopter","Ninja","Croc","Honda Civic"];

	var username = adjs[Math.floor(Math.random() * adjs.length)] + nouns[Math.floor(Math.random()*nouns.length)];
	return [player,username]
}
```

### inputHandler

A `MultiPlayerInputHandler` allows you to handle input from multiple clients and take action accordingly.

The `MultiPlayerInputHandler` class basically takes multiple `ServerInputHandler` instances and manages them all for you.

For example, here is some code that listens for the WASD keys and moves the player that pressed them accordingly.

```js
const inputHandler = new MultiPlayerInputHandler({
	monitors: [
		new ServerInputHandler({
			key: "w",
			on: (socket, playerGameObject) => {
				playerGameObject.move([0, -10])
			}
		}),
		new ServerInputHandler({
			key: "a",
			on: (socket, playerGameObject) => {
				playerGameObject.move([-10,0])
			}
		}),
		new ServerInputHandler({
			key: "s",
			on: (socket, playerGameObject) => {
				playerGameObject.move([0, 10])
			}
		}),
		new ServerInputHandler({
			key: "d",
			on: (socket, playerGameObject) => {
				playerGameObject.move([10,0])
			}
		})
	]
});
```

That is all the configuration we need on the server-side.

## The Client

### The `localObject`

The local object is the `gameObject` that is assigned to the player when you create one in `onNewPlayer`. This is object is unique to each connected client.


### The HTML

All we need in the HTML is just a simple page with a canvas.

```html
<canvas id = "canvas"></canvas>
```

Make sure to import your dependencies as well.

```html
<script src = "/anvil.js"></script>
<script src = "/index.js"></script>
```


### The JS

The javascript relies on one anvil class called `PlayerClient`. This class will automatically establish connection with the server and manage data flow between the client and user.


Here is how it is set up:


```js
const playerClient = new ANVIL.PlayerClient({
	canvas: document.getElementById("canvas"),
	modifyLocalObject: modifyLocalObject,
	sceneOptions: {
		fpsMonitoringEnabled: true
	}
})
```

The first option we pass is the canvas object we want to draw everything to. We just pass the canvas we defined in the HTML sample.

#### `modifyLocalObject`

This function is passed the current local object and allows the client to modify it based off of that information.

For example, here we turn the player blue, and leave all other players red (how we defined the color in `onNewPlayer` on the server side)

```js
function modifyLocalObject(object){
	object.backgroundColor = "blue";
	this.scene.bindCamera(object);
}
```

We also bind the scene's camera to the object.

#### Input on the Client

Remember how we configured the WASD keys on the server? We also need to specify to the client that we want to send the WASD key press over to the server. (It would be very expensive to send over every keystroke, so instead we just specify the ones we want to act on)

This is done using the `MultiPlayerClientInput` class. 

```js
new ANVIL.MultiPlayerClientInput("w",playerClient);
new ANVIL.MultiPlayerClientInput("a",playerClient);
new ANVIL.MultiPlayerClientInput("s",playerClient);
new ANVIL.MultiPlayerClientInput("d",playerClient);
```

Each input takes in a key and the player client that you want to listen for the event.

# Fin!