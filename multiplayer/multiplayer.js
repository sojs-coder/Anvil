var { MultiPlayerServer, MultiPlayerSceneManager, MultiPlayerInputHandler, MultiPlayerSceneManager, Scene, Polygon, ServerInputHandler, Light } = require("../index.js");
const http = require('http');
const express = require("express");


const app = express();
app.use(express.static(__dirname+'/../build'));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
const server = http.createServer(app);


const scene = new Scene()

const multiplayerSever = new MultiPlayerServer({

    // server config
    httpServer: server, // const server = http.createServer(=);
    showPlayerLabels: true,
    port: 3000,

    // game config
    newPlayerObject: {
        class: Polygon,
        options: {
            points: [[0,0],[100,0],[100,100],[0,100]],
            backgroundColor: "red",
        }
    },
    sceneManager: new MultiPlayerSceneManager({
        initialScene: scene,
        showPlayerLabels: true
    }),

    // events
    onNewConnection: () => {
        console.log('new connection');
    },
    onDisconnect: () => {
        console.log('disconnected');
    }, 
    onNewPlayer: (socket, id, data) => {
        console.log("new player", id, data);
        gameObject = new Polygon({
            points: [[0,0],[100,0],[100,100],[0,100]],
            backgroundColor: "red",
        });
        return new Promise((resolve, reject) => {
            socket.on("send_username", (username) => {
                console.log("got username", username);
                console.log(gameObject)
                resolve([gameObject, username])
            });
        })
    },

    // input
    inputHandler: new MultiPlayerInputHandler({
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
    })
});