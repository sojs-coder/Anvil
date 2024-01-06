const playerClient = new ANVIL.PlayerClient({
    canvas: document.getElementById('canvas'),
    modifyLocalObject: function (obj) {
        obj.backgroundColor = "blue";
        this.scene.bindCamera(obj)
    },
    sceneOptions: {
        fpsMonitoringEnabled: true
    }
});

playerClient.emit("send_username", prompt("What is your username?"));

new ANVIL.MultiPlayerClientInput("w",playerClient);
new ANVIL.MultiPlayerClientInput("a",playerClient);
new ANVIL.MultiPlayerClientInput("s",playerClient);
new ANVIL.MultiPlayerClientInput("d",playerClient);