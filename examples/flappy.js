const {
    Scene, SceneManager, Layer, Sprite, Input, Sound, Polygon
} = ANVIL;
const BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAAH4CAIAAACdU7T/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEM1REM1ODQ4RkEwMTFFM0E3QjBDMkZCNkQxNDdFNDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEM1REM1ODM4RkEwMTFFM0E3QjBDMkZCNkQxNDdFNDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE4MDgzOTM3MkQwRUNFNDc1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE4MDgzOTM3MkQwRUNFNDc1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3KDNfAAADlJJREFUeNrs3b+O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";
const PLAYER_IMAGE = "data:image/png;base64,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";
const BOTTOM_PIPE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAAJEBAMAAADJaPQfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAAAAAAAAowbW/3Wh3lJ52TgaggD///8MNErLAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQfoAhMDMQNTvXAPAAABbUlEQVR42u3XsQ3CMABFQbMBUNATUAYgYgGUDRADhCL7j0CMZJALikixQ3GvshtfZ+mH3YoFOBwOL47vm6lTt2yXJnXup25N1hEOh8Nr49dH6p4/ML92TD3z67sBDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+HwpfHDWD04HA6vhK8VHA6Hl8Vjm3iq9scOUduGFBwOh5fHvzu5y8fy/MXcfqCf6xgOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBz+b/gLnaQ0mOVy75sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDItMTlUMDM6NDg6MzErMDA6MDBIaGVxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTAyLTE5VDAzOjQ4OjMxKzAwOjAwOTXdzQAAAABJRU5ErkJggg==";
const TOP_PIPE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAAJEBAMAAADJaPQfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAAAAAAAaggAAowbW/3V52Tih3lL///90Ce8QAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQfoAhMDMRWnacVeAAABaklEQVR42u3XvQ3CMBCAUbMBgQkgE/AjFiDZIEwQif1HwClSHFWEYofifZ0l26876VLK7Zrc4Rxqb7lrPC7o3uX6V2jo5p7Tlcuk7dMcHA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4/M/xcp3gcDi8Et5sGBwOh5fHq03WrxkLh8Ph1fEft+MFG/MQ92Q4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PXxI/xxeOdG+MHKwaHw+E18a2Cw+Hwon0ANri7WT9CXk0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDItMTlUMDM6NDk6MTkrMDA6MDDWYEdVAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTAyLTE5VDAzOjQ5OjE5KzAwOjAwpz3/6QAAAABJRU5ErkJggg==";
const backgroundLayer = new Layer({
    parallax: [0.5, 0.5]
});
const foregroundLayer = new Layer({
    parallax: [1, 1]
});
const scene = new Scene({
    layers: [backgroundLayer, foregroundLayer],
    backgroundColor: "#0099CC",
    update
});
var player = new Sprite({
    url: PLAYER_IMAGE,
    coordinates: [100, 0],
    width: 600 / 10,
    height: 333 / 10
});
scene.addObject(player);
var backgroundSprite = new Sprite({
    url: BACKGROUND_IMAGE,
    coordinates: [-100, 0],
    width: 900,
    height: 504
});
var backgrounds = [backgroundSprite]
scene.addObject(backgroundSprite, backgroundLayer.id)
const sceneManager = new SceneManager({
    initialScene: scene,
    width: 500,
    height: 500,
    canvas: document.getElementById("can"),
});
var dy = 0;
var pipes = [];
function update() {
    for (let i = 0; i < backgrounds.length; i++) {
        backgrounds[i].coordinates[0] -= 1;
    }
    if (backgrounds[backgrounds.length - 1].coordinates[0] <= 900) {
        let newBackground = new Sprite({
            url: BACKGROUND_IMAGE,
            coordinates: [backgrounds[backgrounds.length - 1].coordinates[0] + 900, 0],
            width: 900,
            height: 504
        });
        backgrounds.push(newBackground);
        scene.addObject(newBackground, backgroundLayer.id)
    }
    if (pipes) {
        pipes.forEach(([top_pipe, bottom_pipe]) => {
            top_pipe.move([-1.5, 0]);
            bottom_pipe.move([-1.5, 0]);
        })
    }
    if(player.coordinates[1] < 500+player.height/2) {
        dy += 0.2;
    }
    player.move([0, dy])
}
var bottom = new Polygon({
    points: [
        [-200, 480],
        [500, 480],
        [500, 500],
        [-200, 500]
    ],
    backgroundColor: "green",
    blocks: [player]
});
scene.addObject(bottom);
setInterval(addPipe, 2000);
function addPipe() {
    var offSet = Math.random() * 150;
    var between = 100;
    var top_pipe = new Sprite({
        coordinates: [500, (-250-(between/2))+offSet],
        height: 500,
        width: 75,
        url: TOP_PIPE
    });
    var bottom_pipe = new Sprite({
        coordinates: [500, (250+(between/2))+offSet],
        height: 500,
        width: 75,
        url: BOTTOM_PIPE
    });
    scene.addObject(top_pipe, foregroundLayer.id);
    scene.addObject(bottom_pipe, foregroundLayer.id);

    scene.enableCollisionsBetween(player, top_pipe, die, ()=>{});
    scene.enableCollisionsBetween(player, bottom_pipe, die, ()=>{});
    pipes.push([top_pipe, bottom_pipe]);
}
function die() {
    alert("You died!");
    location.reload();
}
var space = new Input(" ", 500);
space.on = () => {
    dy = -4;
    flap.play();
}
space.activate();
var flap = new Sound({
    source: "sfx_wing.mp3"
});