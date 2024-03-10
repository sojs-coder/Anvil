var { Scene, SceneManager, Particles } = ANVIL;
var scene = new Scene({
  fpsMonitoringEnabled: true,
});

var particles = new Particles({
  coordinates: [window.innerWidth-100,window.innerHeight-100],
  url: "./smoke.gif",
  width: 100,
  height: 100,
  spread: Math.PI * 2,
  angle: 0,
  speed: 1,
  life: 10000,
  spawnRate: 0.5,
  lifeVariability: 0
});

scene.addObject(particles);
scene.treatAsPlayer(particles);

var sceneManager = new SceneManager({
  canvas: document.getElementById("canv1"),
  initialScene: scene,
  width: window.innerWidth,
  height: window.innerHeight,
});