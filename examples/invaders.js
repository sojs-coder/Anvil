// Import everything from ANVIL
const { Scene, SceneManager, Layer, Sprite, Input, Sound, Polygon } = ANVIL;

// image sources for the sprites
const PLAYER_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVsAAADVCAYAAAD5AlPxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAABQlJREFUeNrt3UFuG2UcxuF3YielO1iwZIcEEitOwQZOwBG4A8foReAerJDoFcqCFSpNHA+L8SRuVSHF4nvtVs9TWdNV/5nP05+/jCzNFDiHOVeZss+cP5J8leQuydWASfsk10leZsrXD3OhbMTFDcA7xBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQq25/4BuCBzkinJnKuM/yDeZM79w8TGmc3ZHs0daZ8p+4f1hIgt77c/vEbaHR1HJ2k6zFlfUCe2HLvKEtlvk3yT5D7jdrjrrE8Px1HBnY7m/Hg0d4R9kk2S35P8NngW8MGa8+xwfJG5+ucuc3YDX3fl83nx1npC7Gx523rv9K8kb5K8TnIzeOZNHu/bjtjdrv/uLsnt4HO5TfI8y/qtsyGJ2PJ+myTPsvwKPDq2q5G3Edbj6J3mOmMzeA4fIF/9AigQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKNgOnzAnmQ7H5W9crilzphy/YzzVcsWv6zi75i/c/HC1D36nxsf23RPjkr05HHfxwXiqKcv6zXlcT6jG9pMkn6fyGcKJrpPcJfksPhhPNWdZvy/yuJ5cnrVDfyb5pzFwfPTmbDLlPnO+T/JL46T4X9jdnmZO/zdGTvdDpvz60KmBmhfFLsl9ktdJbopzebqrpHUn66Oyrtcuyf7cPwz/6TbJ8yzvVUUztlOSTZb/yJviXE4ntE8zHR1d45dt7VDtGvfVL4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAArEFKBBbgAKxBSgQW4ACsQUoEFuAgm3m4Y8V32TOfZYn+Xo0NnAJpiw9Whu4dmqYbZbnpze8OjpBgHNaN36vUmrgNsnPg2esgf0yyT7Ls9oBzmmTpUc/JfkuhY3glLm609zFbQTgMiy3EUqmzPl7+IzlpK6SXMd9W+D81g7dZdnhVna2u3OfNcDHzle/AArEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQrEFqBAbAEKxBagQGwBCsQWoEBsAQr+BRj4ILx+MOVkAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjEyQwRr7AAAAABJRU5ErkJggg==";
const ALIEN_IMAGE = "https://codeheir.com/wp-content/uploads/2019/03/invader1.png";

// create a new scene with a black background and an update function
const scene = new Scene({
  backgroundColor: "#000",
  update,
});

// define the player sprite and player controls
var player = new Sprite({
  url: PLAYER_IMAGE,
  coordinates: [200, 460],
  width: 32,
  height: 15,
});
scene.addObject(player);
var left = new Input("ArrowLeft", 10);
left.on = () => {
  player.move([-5, 0]);
}
left.activate();
var right = new Input("ArrowRight", 10);
right.on = () => {
  player.move([5, 0]);
}
right.activate();

// alien sprites
var aliens = []
function addAlien(i, j) {
  // this adds an alien to the scene at the specified row and colmn
  var w = 698 / 20;
  var h = 496 / 20;
  var x = 20 + i * (w + 20);
  var y = 20 + j * (h + 20);
  var alien = new Sprite({
    url: ALIEN_IMAGE,
    coordinates: [x, y],
    width: w,
    height: h,
  });
  aliens.push(alien);
  scene.addObject(alien);
}

// we build a nice little 7x5 grid of aliens
for (var i = 0; i < 7; i++) {
  for (var j = 0; j < 5; j++) {
    addAlien(i, j);
  }
}

// a couple of variables to keep track of aliens and shots and their movement
var shots = [];
var alienCount = aliens.length;
var alienDir = 1;
var moved = false;
function update() {
  // here we move the aliens down 0.5 pixels to the left or right depending on the current direction 
  aliens.forEach((alien) => {
    alien.move([0.5 * alienDir, 0]);
  });

  // move the shots up/down depending on their direction
  shots.forEach((shot) => {
    shot.move([0, 5 * shot.meta.direction]);
  });

  // this removes the shots that are off the screen
  shots = shots.filter((shot) => {
    if (shot.coordinates[1] < shot.getHeight() / 2) {
      scene.removeObject(shot);
      return false;
    }
    return true;
  });

  // make the aliens move down and change direction if they hit the edge of the screen
  aliens.forEach((alien) => {
    if (moved) return;
    if (alien.coordinates[0] >= 500 - 15 - alien.getWidth() || alien.coordinates[0] <= 15) {
      aliens.forEach((alien) => {
        alien.move([0, alien.getHeight()]);
      });
      alienDir *= -1;
      moved = true;
    }
  });

  // if 0 aliens are left, the player wins
  if (alienCount === 0) {
    alert("You win!");
    location.reload();
  }
  moved = false;
}

// the little green bar
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

// shooting mechanics
var space = new Input(" ", 500);
space.on = () => {
  var width = 5
  var height = 20;
  var shot = new Polygon({
    points: [
      [player.coordinates[0] + (player.getWidth() / 2) - width / 2, player.coordinates[1] - height],
      [player.coordinates[0] + (player.getWidth() / 2) + width / 2, player.coordinates[1] - height],
      [player.coordinates[0] + (player.getWidth() / 2) + width / 2, player.coordinates[1]],
      [player.coordinates[0] + (player.getWidth() / 2) - width / 2, player.coordinates[1]],
    ],
    backgroundColor: "red",
  });
  shot.meta.direction = -1;
  shots.push(shot);
  scene.addObject(shot);
  aliens.forEach(alien => {
    scene.enableCollisionsBetween(shot, alien, () => {
      aliens = aliens.filter((a) => a.id !== alien.id);
      shots = shots.filter((s) => s.id !== shot.id);
      scene.removeObject(shot);
      scene.removeObject(alien);
      alienCount--;
    });
  })
};
space.activate();

// initialize the scene
const sceneManager = new SceneManager({
  initialScene: scene,
  width: 500,
  height: 500,
  canvas: document.getElementById("can"),
});

// alien shooting mechanics
function getAlien(x,y) {
  return aliens[(y * 7) + x];
}
// this goes through each column and finds the lowest alien in that column
function getBottomAliens() {
  let allXPositions = getAllXPositions();
  let aliensAtTheBottom = [];
  for (let alienAtX of allXPositions) {
      let bestYPosition = 0;
      let lowestAlien = null;
      for (let alien of aliens) {
          if (alien.coordinates[0] == alienAtX) {
              if (alien.coordinates[1] > bestYPosition) {
                  bestYPosition = alien.coordinates[1];
                  lowestAlien = alien;
              }
          }
      }
      aliensAtTheBottom.push(lowestAlien);
  }
  return aliensAtTheBottom;
}

// this picks a random alien at the bottom of the column and spawns a bullet from it
function makeAlienShoot() {
  var bottomAliens = getBottomAliens();
  var randomAlien = bottomAliens[Math.floor(Math.random() * bottomAliens.length)];
  var width = 5
  var height = 20;
  var shot = new Polygon({
    points: [
      [randomAlien.coordinates[0] + (randomAlien.getWidth() / 2) - width / 2, randomAlien.coordinates[1] + height],
      [randomAlien.coordinates[0] + (randomAlien.getWidth() / 2) + width / 2, randomAlien.coordinates[1] + height],
      [randomAlien.coordinates[0] + (randomAlien.getWidth() / 2) + width / 2, randomAlien.coordinates[1]],
      [randomAlien.coordinates[0] + (randomAlien.getWidth() / 2) - width / 2, randomAlien.coordinates[1]],
    ],
    backgroundColor: "blue",
  });
  shot.meta.direction = 1;
  shots.push(shot);
  scene.addObject(shot);
  scene.enableCollisionsBetween(shot, player, () => {
    alert("You lose!");
    location.reload();
  });
}

// helper function to get all the x positions (columns) of the aliens
function getAllXPositions() {
  let allXPositions = new Set();
  for (let alien of aliens) {
      allXPositions.add(alien.coordinates[0]);
  }
  return allXPositions
}

// this makes the aliens shoot every 200ms
setInterval(() => {
  makeAlienShoot();
}, 200);