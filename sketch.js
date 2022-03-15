// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;

var myEngine;
var world;
var balls = [];
var squares = [];

var button;

var ground;
var mConstraint;

let img;
let sphereSize;
let mainFont;

var generatorState;

const pluckSynth = new Tone.PluckSynth();
const fmSynth = new Tone.FMSynth();
const pingPong = new Tone.PingPongDelay("1n", 0.5);
const freeverb = new Tone.Freeverb();
var tune;

function preload(){
  img = loadImage("assets/metal.png");

  //load fonts
  mainFont = loadFont('fonts/HiBlack.otf');
}

function setup(){

  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  //Generator state
  generatorState = false;

  button = createButton('Start');

  //Text
  textFont(mainFont);
  textSize(60);
  textAlign(CENTER, CENTER);

  //Microtuning Settings
  tune = new Tune();
  tune.loadScale('degung1');
  tune.tonicize(363);


  //freeverb
  freeverb.dampening = 1000;

  //connect all audio it to the main output
  fmSynth.connect(freeverb);
  pluckSynth.connect(freeverb);
  pingPong.connect(freeverb);
  freeverb.toMaster();

  // Create physics engine
  myEngine = Engine.create();
  world = myEngine.world;
  Engine.run(myEngine);
  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle(0, windowHeight/2, windowWidth, 10, options);
  World.add(world, ground);
}

function draw(){
  background(0);
  //translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
  ambientLight(200);
 // directionalLight(255,255,255,0,0,1);

  
  if(generatorState == false) {
    push();
    fill(0);
    rect(-windowWidth/2,-windowHeight/2, windowWidth, windowHeight);
    fill(255);
    textSize(50);
    text('Plinko Sound', 0, -100);
    textSize(60);
    text('Generator', 0, -50);
    textSize(30);
    // text('Press  to Start', 0, 100);
    
    button.position(windowWidth/2,windowHeight/2);
    button.mousePressed(buttonStart);
    pop();
  } else {


    for(let i = 0; i < balls.length; i++) {
      balls[i].show();
      if(balls[i].isOffScreen()){
        balls[i].removeFromWorld();
        balls.splice(i,1);
        i--;
      }
    }

    for(let i = 0; i < squares.length; i++) {
      squares[i].show();
      if(squares[i].isOffScreen()){
        squares[i].removeFromWorld();
        squares.splice(i,1);
        i--;
      }
    }

  }
}

function mouseDragged() {

  balls.push(new Ball(mouseX, mouseY, 0, random(30,50)));
  pluckSynth.triggerAttackRelease(random(400,8000), 0.1);

  squares.push(new Square(mouseX, mouseY, random(30,60), random(30,60)));
  pluckSynth.triggerAttackRelease(random(400,8000) * 0.8, 0.1);
  
  fmSynth.triggerAttackRelease(random(400,8000) * 0.1, 0.01);


}

async function buttonStart() {

  //Press mouse to start
  if (keyCode == 32 || generatorState === false ) {  
    generatorState = true;
    button.hide();
  }

  await Tone.start();
  console.log('audio is ready');
  
}