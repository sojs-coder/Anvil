var { MultiPlayerServer, MultiPlayerSceneManager, MultiPlayerSceneManager, Scene, Polygon } = require("./index.js");
const http = require('http');
const express = require("express");
const app = express();
app.use(express.static('build'));
app.use(express.static('multiplayer/public'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/multiplayer/index.html");
});
const server = http.createServer(app);
const multiplayerSever = new MultiPlayerServer({
    httpServer: server,
    sceneManager: new MultiPlayerSceneManager({
        initialScene: new Scene({
            lighting: false,
        })
    }),
    onNewConnection: () => {
        console.log('new connection');
    },
    port: 3000,
    onDisconnect: () => {
        console.log('disconnected');
    },
    newPlayerObject: {
        class: Polygon,
        options: {
            points: [[0,0],[100,0],[100,100],[0,100]],
            backgroundColor: "red",
        }
    }
});