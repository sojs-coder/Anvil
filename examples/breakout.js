// import everything from ANVIL
const {
    Scene, SceneManager, Polygon, Input
} = ANVIL;

// create a new scene with a black background and an update function
const scene = new Scene({
    backgroundColor: 'black',
    bounds: [800, 500],
    boundsActive: true,
    update
});

// create a paddle and a ball
const paddle = new Polygon({
    points: [
        [0, 0],
        [100, 0],
        [100, 20],
        [0, 20]
    ],
    backgroundColor: 'white',
});
// the paddle starts at the bottom of the screen
paddle.move([350, 450]);
scene.addObject(paddle);
const ball = new Polygon({
    points: [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10]
    ],
    backgroundColor: 'white',
});
// the ball starts in the middle of the screen
ball.move([350, 250]);
// here we use the meta property to store the velocity of the ball
ball.meta.velocity = [1, 2];
scene.addObject(ball);

// move the paddle left and right with the arrow keys
const left = new Input("ArrowLeft", 10);
const right = new Input("ArrowRight", 10);
left.on = () => {
    paddle.move([-5, 0]);
}
right.on = () => {
    paddle.move([5, 0]);
}
left.activate();
right.activate();

// here we enable collisions between the paddle and the ball
scene.enableCollisionsBetween(paddle, ball, () => {
    // when the ball hits the paddle, we reverse its y velocity, and assign a new x velocity based on the position of the ball relative to the paddle
    var ballCenter = ANVIL.getCentroid(ball.polify());
    var paddleCenter = ANVIL.getCentroid(paddle.polify());
    var ballX = ballCenter[0];
    var paddleX = paddleCenter[0];
    var diff = ballX - paddleX;


    ball.meta.velocity[1] = -1 * ball.meta.velocity[1];
    ball.meta.velocity[0] = diff / 10;
}, () => { });

// generate the blocks. We use a nested for loop to create 8 rows of 6 blocks each
// the points are [1,1], [99,1], [99,19], [1,19] to create a 100x20 block with a gap of 1px between each block
function genBlock(i,j){
    var block = new Polygon({
        points: [
            [1, 1],
            [99, 1],
            [99, 19],
            [1, 19]
        ],
        backgroundColor: colors[j],
        id: i * 6 + j.toString()
    });
    scene.addObject(block);
    block.move([i * 100, j * 20]);

    // when the ball collides with a block, remove the block and make the ball bounce
    scene.enableCollisionsBetween(ball, block, () => {
        ball.meta.velocity[1] = -1 * ball.meta.velocity[1];
        blocks = blocks.filter(b => b.id !== block.id);
        scene.removeObject(block);
    }, () => { 
    });
    blocks.push(block);
}
var blocks = [];
var colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 6; j++) {
        genBlock(i,j);
    }
}

// all we need to update is the ball position and check to see if it is past the walls
function update() {
    ball.move(ball.meta.velocity)
    var right = ball.points[1][0];
    var left = ball.points[0][0];
    var top = ball.points[0][1];
    var bottom = ball.points[2][1];
    if (right >= 800 || left <= 0) {
        ball.meta.velocity[0] = -1 * ball.meta.velocity[0];
    }
    if (top <= 0) {
        ball.meta.velocity[1] = -1 * ball.meta.velocity[1];
    }
    if (bottom >= 500) {
        ball.move([0, -250]);
    }
    // and also check for a win
    if(blocks.length === 0){
        alert('You win!');
        window.location.reload();
    }
}

// intialize the game!
const manager = new SceneManager({
    initialScene: scene,
    canvas: document.getElementById('can'),
    width: 800,
    height: 500
});