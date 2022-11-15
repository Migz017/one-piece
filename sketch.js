const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground;
var powcanon
var backgroundImg;
var canonball
var torre, torreImg;
var angle
var balls= []
var ships = []
var boatjason,boatsprite,boatanimation = []
var brokenjason,brokensprite,brokenanimation = []
var tiro,splash,piratebackground,laughpirate
var tarindo = false
var issplash = false
function preload() {
  backgroundImg = loadImage("assets/background.gif");
  torreImg = loadImage("assets/tower.png");
  boatsprite = loadImage("assets/boat/boat.png")
  boatjason = loadJSON ("assets/boat/boat.json")
  brokensprite = loadImage("assets/boat/broken_boat.png")
  brokenjason = loadJSON ("assets/boat/broken_boat.json")
  tiro = loadSound("assets/cannon_explosion.mp3")
  splash = loadSound("assets/cannon_water.mp3")
  piratebackground = loadSound ("assets/piratasdocaribe.mp3")
  laughpirate = loadSound ("assets/pirate_laugh.mp3")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
angle = 20
  var options = {
    isStatic: true,

  };

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  torre = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, torre);

  powcanon = new Canhao(180,110,130,100,angle)
  var frames = boatjason.frames
for (var len = 0;len<frames.length;len++){
  var pos = frames [len].position
  var img = boatsprite.get (pos.x,pos.y,pos.w,pos.h)
  boatanimation.push(img)
  
  //que poggers
}
var frames2 = brokenjason.frames
for (var len = 0;len<frames2.length;len++){
  var pos = frames2 [len].position
  var img = brokensprite.get (pos.x,pos.y,pos.w,pos.h)
  brokenanimation.push(img)
  
}
}

function draw() {
  background(189);
if(!piratebackground.isPlaying()){
  piratebackground.play()
}
  //image(imagem,posicao x, posicao y, largura , altura)

  image(backgroundImg, 0, 0, 1200, 600);

  push();
  imageMode(CENTER);
  image(torreImg, torre.position.x, torre.position.y, 160, 310);
  pop();
  powcanon.show()
for(var i = 0;i<balls.length;i++){
  showcanonballs(balls[i],i)
  collision(i)
}

  rect(ground.position.x, ground.position.y, width * 2, 1);

  Engine.update(engine);
spawnships()
}
function keyReleased(){
  if(keyCode===32){
    balls[balls.length-1].shoot()
    tiro.play()
  }
}
function keyPressed(){
  if(keyCode===32){
    var canonball = new Canonball(powcanon.x,powcanon.y)
    balls.push (canonball)
  } 
}
function showcanonballs(ball,i){
   if(ball){ball.show()
if (ball.body.position.x >=width||ball.body.position.y>=height-50){
  ball.remove(i)
  
  if (!issplash){
    splash.play()
    issplash=true
    setTimeout(() => {
      issplash=false
    },1000 );
  }
}
  }
}
function spawnships(){
  if(ships.length>0){
    if(ships.length<4&& ships[ships.length-1].body.position.x<width-300){
      var p = [-50,-60,-70,-80]
      var pr=random (p)
      var ship = new Ship(width,height-60,170,170,pr,boatanimation)
      ships.push(ship)
    }
    for(var i = 0;i<ships.length;i++){
      Matter.Body.setVelocity(ships[i].body,{x:-0.9,y:0})
      ships[i].show()
      ships[i].animar() 
      var collisione = Matter.SAT.collides(torre,ships[i].body)
      if(collisione.collided){
        gameOver()
        
        if(!laughpirate.isPlaying()&& !tarindo){
          laughpirate.play()
          tarindo=true
        }
      }
    }
  }
  else{
    var ship = new Ship(width,height-60,170,170,-60,boatanimation)
    ships.push(ship)
  }
}
function collision(index){
  for(var i = 0;i<ships.length;i++){
    if (balls[index]!==undefined && ships[i]!==undefined ) {
      var colliseu = Matter.SAT.collides(balls[index].body,ships[i].body)
      if (colliseu.collided){
        ships[i].remove(i)
        World.remove(world,balls[index].body)
        delete balls[index]
      }
    }
  }
}
function gameOver() {
  swal(
    {
      title: `nao tankou`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}