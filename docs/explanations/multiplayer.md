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
You'll notice that when we configured the MultiPlayerServer, we passed a `multiPlayerSceneManager` as the scene manager.

Create a MultiPlayerSceneManager the same way you would create any other scene manager:

```js
const multiPlayerSceneManager = new ANVIL.MultiPlayerSceneManager({
    width: 500,
    height: 500,
    initialScene: //.. any generic scene object, configured the same as you would make one on the client
})
```

Thats it!

### `onNewConnection`, `onDisconnect`, and `onNewPlayer`

#### `onNewConnection`

This method is called every time a new connection is made with the server.

> Note: Just becuase a connection was made does not mean that a new player should be created! If a new player is created, `onNewPlayer` will be called

```js
function onNewConnection(socket){
    console.log("Socket with id of "+socket.id+" just connected");
}
```

#### `onDisconnect`

Sadly, we do not know which socket disconnected
