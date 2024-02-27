// import everything from ANVIL
const { Scene, SceneManager, Layer, Sprite, Input, Sound, Polygon } = ANVIL;

// Raw image data for the background, player, and aliens
const BACKGROUND_IMAGE = "space.png";
const PLAYER_IMAGE = "ship.png";
const ALIEN_IMAGE = "alien.png";

// create layers for the background and foreground
const backgroundLayer = new Layer({
  parallax: [0.5, 0.5],
});
const foregroundLayer = new Layer({
  parallax: [1, 1],
});

// here we create the scene, providing the layers and the update function, as well as a background color that matches our background image
const scene = new Scene({
  layers: [backgroundLayer, foregroundLayer],
  backgroundColor: "#000",
  update,
});

// here we create the player sprite and add it to the scene
var player = new Sprite({
  url: PLAYER_IMAGE,
  coordinates: [200, 400],
  width: 64,
  height: 64,
});
scene.addObject(player);

// we do the same for the background
var backgroundSprite = new Sprite({
  url: BACKGROUND_IMAGE,
  coordinates: [-100, 0],
  width: 900,
  height: 504,
});
scene.addObject(backgroundSprite, backgroundLayer.id);

// create a group for aliens
var aliens = []

// this function adds a new alien to the scene at a random location, within bounds
function addAlien() {
  var x = Math.floor(Math.random() * (400 - 64 + 1) + 64);
  var y = Math.floor(Math.random() * (50 - 64 + 1) + 64);
  var alien = new Sprite({
    url: ALIEN_IMAGE,
    coordinates: [x, y],
    width: 64,
    height: 64,
  });
  scene.addObject(alien);
}

// add 10 aliens to the scene
for (var i = 0; i < 10; i++) {
  addAlien();
}

// we need to keep track of the player's shots and the aliens in the scene
var shots = [];
var alienCount = aliens.length;

function update() {
  // move each alien to the right
  aliens.forEach((alien) => {
    alien.move([1, 0]);
  });

  // if any alien reaches the right side of the screen, move all aliens down and to the left
  aliens.forEach((alien) => {
    if (alien.coordinates[0] >= 400) {
      aliens.forEach((alien) => {
        alien.move([0, 50]);
        alien.move([-1, 0]);
      });
    }
  });

  // check for collisions between shots and aliens
  shots.forEach((shot) => {
    aliens.forEach((alien) => {
      if (shot.collidesWith(alien)) {
        shot.destroy();
        alien.destroy();
        alienCount--;
        if (alienCount === 0) {
          alert("You win!");
          location.reload();
        }
      }
    });
  });

  // remove any shots that have moved off the screen
  shots = shots.filter((shot) => shot.coordinates[1] > 0);
}

// create a polygon for the bottom of the screen so that the player can't move off
var bottom = new Polygon({
  points: [
    [-200, 480],
    [600, 480],
    [600, 500],
    [-200, 500],
  ],
  backgroundColor: "green",
  blocks: [player],
});
scene.addObject(bottom);

// add a new shot when the player presses space
var space = new Input(" ", 500);
space.on = () => {
  var shot = new Sprite({
    url: "shot.png",
    coordinates: [player.coordinates[0] + 16, player.coordinates[1] - 16],
    width: 32,
    height: 32,
  });
  shots.push(shot);
  scene.addObject(shot, foregroundLayer.id);
};
space.activate();

// initialize everything and start the game
const sceneManager = new SceneManager({
  initialScene: scene,
  width: 500,
  height: 500,
  canvas: document.getElementById("can"),
});