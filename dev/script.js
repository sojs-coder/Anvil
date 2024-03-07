var { Scene, SceneManager, Particles } = ANVIL;
var scene = new Scene({
  fpsMonitoringEnabled: true,
});

var particles = new Particles({
  coordinates: [500,550],
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png",
  width: 100,
  height: 100,
  spread: Math.PI * 2,
  speed: 1,
  life: 1000,
  spawnRate: 10
});

scene.addObject(particles);


var sceneManager = new SceneManager({
  canvas: document.getElementById("canv1"),
  initialScene: scene,
  width: window.innerWidth,
  height: window.innerHeight,
});