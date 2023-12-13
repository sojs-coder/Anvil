var scene = new Scene({
  canvas: document.getElementById("canv1"),
  width: 1000,
  height: 1000,
  fpsMonitoringEnabled: true,
  start: false,
  physics: true,
  physicsOptions: {
    gravity: { x: 0, y: 2 },
  },
  update,
  lighting: true
});
var light = new Light([0,0],100,1,[255,0,0]);

//for(var i = 0; i <= 6; i++){
var i = 0;
  console.log(`${i*2}PI/6`)
  var dlight = new DirectionalLight([100,100],0 ,Math.PI/4, 500, 1, [255,255,255]);
  scene.addLight(dlight)
//
// scene.addLight(light);

var tg = new Sprite({
  url: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/SITE_FLIPS/HOLIDAY23/GW/NOV/CC/CategoryCard_d_1x_HolidayFlip23_Womens_NOV._SY304_CB576715040_.jpg",
  coordinates: [250,250],
  width: 100,
  height: 100,
  physicsEnabled: true,
  physicsOptions: {
  }
});

var tg2 = new Polygon({
  points: [[330, 100], [430, 100], [430, 200], [330, 200]],
  physicsEnabled: true,
  backgroundColor: "blue",
  physicsOptions: {
    mass: 1000,
  }
});
light.pin(tg2);
// dlight.pinAngleTo(tg2)
var bar1 = new Polygon({
  points: [[50, 400], [300, 400], [300, 350], [50, 350]],
  physicsEnabled: true,
  backgroundColor: "black",
  physicsOptions: {
    isStatic: true
  }
});
var bar2 = new Polygon({
  points: [[150, 500], [400, 500], [400, 450], [150, 450]],
  physicsEnabled: true,
  backgroundColor: "black",
  physicsOptions: {
    isStatic: true
  }
})
var bar3 = new Polygon({
  points: [[0+500, 900], [1000+500, 900], [1000+500, 1000], [0+500, 1000]],
  physicsEnabled: true,
  backgroundColor: "black",
  physicsOptions: {
    isStatic: true
  }
});
var input = new Input("ArrowRight", 10);
input.on = () => {
  tg2.move([2.5, 0]);
}
input.activate();
var input2 = new Input("ArrowLeft", 10);
input2.on = () => {
  tg2.move([-2.5, 0]);
}
input2.activate();
var input3 = new Input("ArrowUp", 10);
input3.on = () => {
  tg2.move([0, -2.5]);
}
input3.activate();
var input4 = new Input("ArrowDown", 10);
input4.on = () => {
  tg2.move([0,2.5]);
}
input4.activate();

var input5 = new Input(" ", 10);
function r(min, max) {
  return Math.random() * (max - min) + min;
}
// scene.addObject(tg)
scene.addObject(tg2)
scene.addObject(bar1);
scene.addObject(bar2);
scene.addObject(bar3);
scene.bindCamera(tg2);
// scene.setBoundaries(scene.canvas.width,scene.canvas.height)
var c = 0;
input5.on = ()=>{
  var w = 100;
  var h = 100;
  var x = r(1500,1501);
  var y = r(0,100);
  c++;
  var z = new Polygon({
    points: [[x, y], [x+w, y], [x+w, y+h], [x, y+h]],
    physicsEnabled: true,
    backgroundColor: "green",
    physicsOptions: {
      mass: 300,
      friction: 0.01, // 0-1
      frictionAir: 0.05, // 0-1
      frictionStatic: 0.01,
      restitution: 0.5

    }
  });
  document.getElementById("c").innerHTML = c;
 
  scene.addObject(z);
  scene.enableCollisionsBetween(tg2,z,()=>{
    z.backgroundColor = "red"
  },()=>{
    setTimeout(()=>{
      z.backgroundColor = "green"
    },500)
  })
}
input5.activate();

var clickMonit = new Input("click");
clickMonit.on = (object)=>{
  object.state("backgroundColor","yellow");
}
clickMonit.activate(scene);
scene.draw()
function update() {

}