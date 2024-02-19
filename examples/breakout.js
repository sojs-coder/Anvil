
const {
    Scene, SceneManager, Polygon, Input
} = ANVIL;
const scene = new Scene({
    backgroundColor: 'black',
    update
});
const paddle = new Polygon({
    points: [
        [0, 0],
        [100, 0],
        [100, 20],
        [0, 20]
    ],
    backgroundColor: 'white',
});
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
ball.move([350, 250]);
ball.meta.velocity = [1, 2];
scene.addObject(ball);
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
scene.enableCollisionsBetween(paddle, ball, () => {
    var ballCenter = ANVIL.getCentroid(ball.polify());
    var paddleCenter = ANVIL.getCentroid(paddle.polify());
    var ballX = ballCenter[0];
    var paddleX = paddleCenter[0];
    var diff = ballX - paddleX;


    ball.meta.velocity[1] = -1 * ball.meta.velocity[1];
    ball.meta.velocity[0] = diff / 10;
}, () => { });
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
    if(blocks.length === 0){
        alert('You win!');
        window.location.reload();
    }
}
const manager = new SceneManager({
    initialScene: scene,
    canvas: document.getElementById('can'),
    width: 800,
    height: 500
});