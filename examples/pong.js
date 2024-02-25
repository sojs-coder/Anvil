const { Scene, SceneManager, Polygon, Input, Text } = ANVIL;

const scene = new Scene({
    backgroundColor: 'black',
    update
});

const p1Paddle = new Polygon({
    points: [
        [0, 0],
        [10, 0],
        [10, 50],
        [0, 50]
    ],
    backgroundColor: 'white',
});

const p2Paddle = new Polygon({
    points: [
        [0, 0],
        [10, 0],
        [10, 50],
        [0, 50]
    ],
    backgroundColor: 'white',
});

p1Paddle.move([20, 200]);
p2Paddle.move([460, 200]);

p1Paddle.setBounds([500, 500]);
p2Paddle.setBounds([500, 500]);
scene.addObject(p1Paddle);
scene.addObject(p2Paddle);

const ball = new Polygon({
    points: [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10]
    ],
    backgroundColor: 'white',
});
ball.move([240, 240]);
ball.meta.velocity = [1, 0];
scene.addObject(ball);

const p1Up = new Input("w", 10);
const p1Down = new Input("s", 10);
const p2Up = new Input("ArrowUp", 10);
const p2Down = new Input("ArrowDown", 10);


const rWall = new Polygon({
    points: [
        [0, 0],
        [1, 0],
        [1, 500],
        [0, 500]
    ],
    backgroundColor: 'white',
});
const lWall = new Polygon({
    points: [
        [495, 0],
        [500, 0],
        [500, 500],
        [495, 500]
    ],
    backgroundColor: 'white',
});
scene.addObject(rWall);
scene.addObject(lWall);
scene.enableCollisionsBetween(ball, rWall, () => {
    p1Score.text = (parseInt(p1Score.text) + 1).toString();
    resetBall(1);
}, () => { });
scene.enableCollisionsBetween(ball, lWall, () => {
    p2Score.text = (parseInt(p2Score.text) + 1).toString();
    resetBall(-1);
}, () => { });
function resetBall(direction) {
    ball.moveTo([240, 240])
    ball.meta.velocity = [direction, 0];
}
for (var i = 0; i < 500; i += 20) {
    const net = new Polygon({
        points: [
            [245, i],
            [255, i],
            [255, i + 10],
            [245, i + 10]
        ],
        backgroundColor: 'rgba(255,255,255,0.5)',
    });
    scene.addObject(net);
}
const p1Score = new Text({
    text: "0",
    fontSize: 30,
    color: "white",
    coordinates: [200, 40]
});
const p2Score = new Text({
    text: "0",
    fontSize: 30,
    color: "white",
    coordinates: [300, 40]
});
scene.addObject(p1Score);
scene.addObject(p2Score);

p1Up.on = () => {
    p1Paddle.move([0, -5]);
}
p1Down.on = () => {
    p1Paddle.move([0, 5]);
}
p2Up.on = () => {
    p2Paddle.move([0, -5]);
}
p2Down.on = () => {
    p2Paddle.move([0, 5]);
}
p1Up.activate();
p1Down.activate();
p2Up.activate();
p2Down.activate();

scene.enableCollisionsBetween(p1Paddle, ball, () => {
    ballPaddleCollision(ball, p1Paddle);
}, () => { });

scene.enableCollisionsBetween(p2Paddle, ball, () => {
    ballPaddleCollision(ball, p2Paddle);
}, () => { });
function ballPaddleCollision(ball, paddle) {
    const ballCenter = ANVIL.getCentroid(ball.polify());
    const paddleCenter = ANVIL.getCentroid(paddle.polify());
    const ballY = ballCenter[1];
    const paddleY = paddleCenter[1];
    const diff = ballY - paddleY;
    ball.meta.velocity[1] = diff / 10;
    ball.meta.velocity = ANVIL.multArrays(ball.meta.velocity, [-1.1, 1.1]);
}
function update() {
    ball.move(ball.meta.velocity);
    var ballBottom = ball.points[2][1];
    var ballTop = ball.points[0][1];
    if (ballTop <= 5 || ballBottom >= 495) { // give a little buffer to the top and bottom
        ball.meta.velocity[1] = -1 * ball.meta.velocity[1];
    }
}

const manager = new SceneManager({
    initialScene: scene,
    width: 500,
    height: 500,
    canvas: document.getElementById('can')
})