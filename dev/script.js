var { Scene, SceneManager } = ANVIL;

var scene = new Scene({
  fpsMonitoringEnabled: true,
  physics: "basic",
  physicsOptions: {
    gravity: { x: 0, y: 2 },
  },
  lighting: true
});




var sceneManager = new SceneManager({
  canvas: document.getElementById("canv1"),
  initialScene: scene,
  width: window.innerWidth,
  height: window.innerHeight,
});