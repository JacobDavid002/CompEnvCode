// Matter.js Stuff (js libary allowing physics)
// https://brm.io/matter-js/docs/classes/Engine.html
// Stops the neet to write Matter. infront of all these
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;
let world, engine;
let mConstraint;

// Game Objects
let ground;
const boxes = [];
const enemys = [];
// const enemyBods = [];
const birds = [];
let slingshot;
const tutorialEnemy = [];

let slingdis = 0;

let currentEnemy = 0;
let currentEnemyBod = 0;
let currentBird = 0;

let RanX = 0;

// Timer
let spawnTimer = 2;

// New Timer
let gameTimer;

let Startgametimer;
let Endgametimer;

// 3 sec countdown for visuals hover
let threecountdown = 3;

// New Score
let gameScore;

// scores
let Startbarcolour = '#ffffff';
let Restartbarcolour;

let EnemyHits = 0;
let EnemyKilled = 0


// Start screen
let startGame;
let startTutorial;
let endGame;

// !!!!!Visuals!!!!!

let Backdropimg;
let CharacterIntro;
let CharacterLoop;
let HeightWarning;
let StartBackdrop;
let Explosion;
let ThreeTwoOne;
let IntroFilm;
let Boss;
let EndScreen;


let BossY =  -200;
let EnemyY = -50;

let RobotHand1;
let RobotHand2;
let RobotHand3;
let RobotHand4;
let RobotHand5;
let RobotHand6;
let RobotHand7;
let RobotHand8;
let RobotHand9;
let RobotHand10;

  
let robohands = [];


let RanImage;

// let intro = false;
// let introTime = 15000;

let IntroX;
let IntroY;
let LoopX;
let LoopY;

// let SecTimer = 1000;
// let StopWatch = 0;

function preload() {
  Backdropimg = img = loadImage('Images/Backdrop unanimated.png'); 
  StartBackdrop = img = loadImage("Images/StartScreen.gif");

  // ThreeTwoOne = img = loadImage("Images/321.gif");

   CharacterIntro = img = loadImage("Images/CharacterIntro.gif");
   CharacterLoop = img = loadImage("Images/CharacterLoop.gif");
   HeightWarning = img = loadImage("Images/HeightWarning.png");  
   Explosion = img = loadImage("Images/explosion.gif");
   IntroFilm = img = loadImage("Images/Intro film.gif");

   Boss = img = loadImage("Images/roboBoss.gif");
   EndScreen = img = loadImage("Images/EndScreen.gif");

   RobotHand1 = img = loadImage("Images/RobotHandAssets/Robothand1.png");
   RobotHand2 = img = loadImage("Images/RobotHandAssets/Robothand2.png");
   RobotHand3 = img = loadImage("Images/RobotHandAssets/Robothand3.png");
   RobotHand4 = img = loadImage("Images/RobotHandAssets/Robothand4.png");
   RobotHand5 = img = loadImage("Images/RobotHandAssets/Robothand5.png");
   RobotHand6 = img = loadImage("Images/RobotHandAssets/Robothand6.png");
   RobotHand7 = img = loadImage("Images/RobotHandAssets/Robothand7.png");
   RobotHand8 = img = loadImage("Images/RobotHandAssets/Robothand8.png");
   RobotHand9 = img = loadImage("Images/RobotHandAssets/Robothand9.png");
   RobotHand10 = img = loadImage("Images/RobotHandAssets/Robothand10.png");

   robohands = [
    RobotHand1,
    RobotHand2,
    RobotHand3,
    RobotHand4,
    RobotHand5,
    RobotHand6,
    RobotHand7,
    RobotHand8,
    RobotHand9,
    RobotHand10
  ];
  //  for(var i = 0; i < 11; i++){
  //  RobotHand[i] = img = loadImage("Imagees/RobotHandAssest/Robothand",i,".png");
  //  }
}

function setup() {
  startGame = false;
  endGame = false;
  startTutorial = false;
  essentialCode = false;
  imageCode = false;

  gameTimer = new Timer();
  gameScore = new Score();

  Startgametimer = new Timer();
  Endgametimer = new Timer();
  
  // size of background image
  const canvas = createCanvas(1428, 793);
  // const canvas = createCanvas(windowWidth, windowHeight);

  // Matter.Js Stuff
  engine = Engine.create();
  world = engine.world;
  // Setting Gravity
  engine.world.gravity.y = 0.5;

  RanImage = random(robohands);
  tutorialEnemy[1] = new Enemy(width/2, -50, 50, 50, 0.0, 0, width/2,width/2, RanImage );

  // Ground is static object
  push();
  ground = new Ground(width / 2 + 55, height - 15, 800, 50);
  pop();
  //Bird interacts with gravity
  // bird = new Bird(width/2, height-200, 16);
  birds[currentBird] = new Bird(width / 2, height - 200, 20);
  // currentBird++;

  for (let bird of birds) {
    slingshot = new Slingshot(width / 2, height - 200, bird.body);
  }

  // Gonna want to switch these to hand tracking controls
  const canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  const options = {
    mouse: canvasmouse,
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  // Visuals
  IntroX= width/2;
  IntroY = height/2 + 20;
  LoopX = 1000;
  LoopY = 1000;
}

// Gonna want to switch these to hand tracking controls
function keyPressed() {
  if (key == 'r') {
    // removes old bird
    // World.remove(world, birds[currentBird].body);
    // currentBird++;
    // birds[currentBird] = new Bird(width / 2, height - 200, 20);
    // birds[currentBird].show();
    // slingshot.attach(birds[currentBird].body);
  }
}

function mouseReleased() {

   setTimeout(() => {
    slingshot.fly();
   }, 100);

  setTimeout(() => {
    currentBird++;
    birds[currentBird] = new Bird(width / 2, height - 185, 20);
    birds[currentBird].show();
    slingshot.attach(birds[currentBird].body);
  }, 600);
}

//////////////////////////////////////////////
///////////////Draw Function//////////////////
//////////////////////////////////////////////
function draw() {
  background(0);

  // console.log(startGame);

  if (imageCode == true){
    images();
  }
  
  if (startTutorial == false && startGame == false) {
    StartScreen();
  } else if (startTutorial == true && startGame == false){
    Tutorial();
    Startgametimer.start();
    if (Startgametimer.time < 11){

      imageMode(CENTER);
      image(IntroFilm , width/2, height/2, windowWidth, windowHeight);
    
  
    } else if(Startgametimer.time > 11){
    imageCode = true
    }
  }
  else if (startGame == true || endGame == false) {
    essentialCode = true
    startTutorial = false;
    EnemySpawn();
    BirdColission();
    TimerScore();
    // TimerScore();
     gameTimer.start();
    gameTimer.draw();
  } 

  if (essentialCode == true){
    BossSpawn();
    Spawning();
    gameScore.draw();
  }

  if (gameTimer.time>120 || endGame == true){
    // if (gameTimer.time>10 || endGame == true){
    
    for(var i = 0; i < birds.length; i++){
      World.remove(world, birds[i].body);
      // console.log("removed bird", i);
   }
   for(var i = 0; i < enemys.length; i++){
    enemys.splice(i, 1);
    // console.log("removed enemy", i);
 }
   
    // console.log('EndGame!');
    gameTimer.stop();
    
    startGame = false;
    startTutorial = false;
    EndGame();
  }

  Engine.update(engine);

  // if (mConstraint.body){
  //   var pos = mConstraint.body.position;
  //   var m = mConstraint.mouse.position;

  //   fill (0, 255, 0);
  //   ellipse(pos.x, pos.y, 20, 20);
  // }
}

//////////////////////////////////////////////
/////////////Spawming Function////////////////
//////////////////////////////////////////////

function Spawning() {
  // for (let box of boxes){
  // box.show();
  // }

  slingshot.show();
  ground.show();

  for (let i = 0; i < birds.length; i++) {
    birds[i].show();
  }
  for (let i = 0; i < enemys.length; i++) {
    // Checks if enemy exists at that index in enemys array
    if (!enemys[i]) continue;
    enemys[i].show();
  }

  slingdis = dist(width/2, height-200, birds[currentBird].body.position.x, birds[currentBird].body.position.y);
  // console.log(slingdis);

  // if the sling is contracting to 10px or is over 150px 
  // if (slingdis < 10){
  //   SlingReleased();
  // }

  // console.log(currentBird);
  // if(currentBird > 5){

  //   birds.splice(0,1);

  // }
}

//////////////////////////////////////////////
/////////////tutorial Function////////////////
//////////////////////////////////////////////

function Tutorial(){

  for (let i = 0; i < tutorialEnemy.length; i++) {
    // Checks if enemy exists at that index in enemys array
    if (!tutorialEnemy[i]) continue;
    tutorialEnemy[i].show();
  }

  // console.log('tutorial started');

  // tutorialEnemy = new Enemy(width/2, 50, 16, 0.0, 0, width/2,width/2 );
  if (Startgametimer.time > 16){
  if (tutorialEnemy[1].y < height/2) {
    // console.log('enemy on the move');
    tutorialEnemy[1].y += 0.7;
    // Causes enemys to fall
  } else {
    tutorialEnemy[1].y += 0;
  } 
}

  for (let bird of birds) {
    // Checks if enemy exists at that index in enemys array
      let dT = dist(
        bird.body.position.x,
        bird.body.position.y,
        tutorialEnemy[1].Ransway + tutorialEnemy[1].x,
        tutorialEnemy[1].y
      );

      // Removed extra for loop here - William
      if (dT < 50) {

        imageMode(CENTER);
        image(Explosion , tutorialEnemy[1].x + tutorialEnemy[1].Ransway, tutorialEnemy[1].y);
      
        tutorialEnemy.splice(1,1);
        console.log('enemy tutorial hit');
        // Adds 100 points to the score - William
        gameScore.add(100);
        gameTimer.time = 0;
        startGame = true;
        startTutorial = false;
      }

      // Just for testing
      if (!tutorialEnemy) continue;
      // line(
      //   birds[currentBird].body.position.x,
      //   birds[currentBird].body.position.y,
      //   enemys[i].Ransway + enemys[i].x,
      //   enemys[i].y
      // );
      //  console.log(d);
    }
  }

//////////////////////////////////////////////
/////////////image Function///////////////////
//////////////////////////////////////////////


  function images(){
    imageMode(CENTER);
    image(Backdropimg , width/2, height/2, width, Backdropimg.height*width/Backdropimg.width);
  
    if (Startgametimer.time > 25){
      // console.log("yes");
      IntroX = 1000;
      IntroY = 10000;
      LoopX = width/2;
      LoopY = height/2 + 20;
      essentialCode = true
    }
    image(CharacterIntro, IntroX, IntroY );
    image(CharacterLoop, LoopX , LoopY);


  }

//////////////////////////////////////////////
///////////Enemy Spawn Function///////////////
//////////////////////////////////////////////

function EnemySpawn() {
  // Spawns enemy every 2 seconds NEED TO CHANGE
  if (gameTimer.get() > spawnTimer) {
    RanX = random(400, width - 400);

    RanImage = random(robohands);
    enemys[currentEnemy] = new Enemy(RanX, EnemyY, 50, 50, 0.0, 0, RanX, RanX, RanImage);
    currentEnemy++;

    if(gameTimer.time < 5){
    spawnTimer += 2;
    }
    if(gameTimer.time > 5 && gameTimer.time< 10){
    spawnTimer += 4;
    }
    if(gameTimer.time > 10 && gameTimer.time< 20){
      spawnTimer += 3;
      }
    if(gameTimer.time > 20 && gameTimer.time < 30){
      spawnTimer += 2;
      }
    if(gameTimer.time > 30 && gameTimer.time < 40){
        spawnTimer += 1.5;
      }
    if(gameTimer.time > 40 && gameTimer.time < 60){
        spawnTimer += 1;
      }
    if(gameTimer.time > 60 && gameTimer.time < 80){
      spawnTimer += 0.5;
      }  
    if(gameTimer.time > 80 && gameTimer.time < 105){
      spawnTimer += 0.2;
      } 
    if(gameTimer.time > 105 && gameTimer.time < 120){
      spawnTimer += 20;
      }


      
  }

  for (let i = 0; i < enemys.length; i++) {
    // Checks if enemy exists at that index in enemys array
    if (enemys[i] && enemys[i].y > height - 200) {
      console.log('removing enemy at index: ' + i);

      imageMode(CENTER);
      image(Explosion , enemys[i].x + enemys[i].Ransway, enemys[i].y);

      // Removes enemy when it hits 200 pixles from bottom
      enemys.splice(i, 1);
      // removes 200 points from the score - William
      gameScore.remove(200);

      EnemyHits = EnemyHits + 1;
      // Causes enemys to fall
    } else if (enemys[i]) {
      enemys[i].y += 0.7;

      if(enemys[i].y > height - 400){

        // push();
        // strokeWeight(10);
        // stroke(255, 54, 54, 50);
        // setLineDash([30, 30]);
        // line(400, height - 200, width - 400, height - 200);
  
        // pop();

        imageMode(CENTER);
        image(HeightWarning , width/2, height/2, width, Backdropimg.height*width/Backdropimg.width);
      
      }

    } else {
      continue;
    }
  }
  if(gameTimer.time > 80){
    if( BossY < height- 450){
      BossY = BossY + 0.2;
      EnemyY = EnemyY + 0.2;
    }
  }
}

function BossSpawn(){
  if(gameTimer.time > 80){
    if( BossY < height- 450){
      BossY = BossY + 0.2;
      EnemyY = EnemyY + 0.2;
    }
  }
  console.log(BossY);

  push();
  imageMode(CENTER);
  image(Boss, width/2, BossY);
  pop();
}

//////////////////////////////////////////////
////////////Bird Collision Function///////////
//////////////////////////////////////////////

function BirdColission() {
  for (let bird of birds) {
    // Changed for loop to use i as index - William
    for (let i = 0; i < enemys.length; i++) {
      // Checks if enemy exists at that index in enemys array
      if (!enemys[i]) continue;
      let d = dist(
        bird.body.position.x,
        bird.body.position.y,
        enemys[i].Ransway + enemys[i].x,
        enemys[i].y
      );

      if (d < 50) {
        imageMode(CENTER);
        image(Explosion , enemys[i].x + enemys[i].Ransway, enemys[i].y);
      
        enemys.splice(i, 1);
        console.log(i, 'enemy hit');
        // Adds 100 points to the score
        gameScore.add(100);
        EnemyKilled = EnemyKilled + 1;

      }

      // Just for testing
      if (!enemys[i]) continue;
      // line(
      //   birds[currentBird].body.position.x,
      //   birds[currentBird].body.position.y,
      //   enemys[i].Ransway + enemys[i].x,
      //   enemys[i].y
      // );
      //  console.log(d);
    }
  }
}

function TimerScore(){

  let countdown = round(120 - gameTimer.time);

  push();
  stroke(66, 66, 66);
  strokeWeight(5);
  textSize(50);
  fill(5, 5, 5);
  rect(20, 20, 280, 40);
  pop();

  
  push();
  stroke(66, 66, 66);
  strokeWeight(5);
  textSize(50);
  fill(5, 5, 5);
  rect(width - 300, 20, 280, 40);
  pop();

  push();
  strokeWeight(1);
  textSize(20);
  fill(255, 255, 255);
  text("Score:", width - 180, 47);
  text(countdown, 260, 47);
  pop();

  push();
  strokeWeight(1);
  textSize(20);
  fill(255, 255, 255);
  text("Time Before Destruction:", 30, 47);
  text(countdown, 260, 47);
  pop();
}

//////////////////////////////////////////////
//////////////StartScreen Function////////////
//////////////////////////////////////////////

function StartScreen() {


  imageMode(CENTER);
  image(StartBackdrop , width/2, height/2);

  // push();
  // rectMode(CENTER);
  // fill(255, 255, 255);
  // rect(width / 2, height / 2, width - 500, height - 500);
  // pop();

  push();
  rectMode(CENTER);
  fill(Startbarcolour);
  rect(width / 2, height - 162, 700,  70)
  pop();

  push();
  // strokeWeight(10);
  textSize(50);
  textAlign(CENTER);
  fill('#eb4034');
  text('Hover to Start', width / 2, height - 150);
  pop();


  // console.log(mouseX, ",", mouseY);

  if (mouseX > 365 && mouseX < 1060 && mouseY > 597 && mouseY < 665) {
    Startbarcolour = '#eb4034';
    
    // imageMode(CENTER);
    // image(ThreeTwoOne , width/2, height - 170);

        //  console.log('ding ding');
        Startgametimer.start();
        Startgametimer.draw();

// 
        threecountdown = round(3 - Startgametimer.time);
        push();
        textSize(50);
        textAlign(CENTER);
        fill(255, 255, 255);
        if(threecountdown > 1 || threecountdown == 1){
        text(threecountdown, width / 2, height - 150);
        }else if (threecountdown < 1){
          text("GOOD LUCK", width / 2, height - 150);
        }
        pop();
    if(Startgametimer.time>4 ){
    startTutorial = true;
    Startgametimer.time = 0;
    }
  } else {
    Startgametimer.time = 0;
    Startbarcolour = '#ffffff';
    threecountdown = 3;
  }
}

function EndGame(){

  push();
  rectMode(CENTER);
  fill(0, 0, 0);
  rect(width/2, height/2, width, height);
  pop();
  
  imageMode(CENTER);
  image(EndScreen , width/2, height/2);
  
  
  // console.log("MX", mouseX);
  // console.log("MY", mouseY);

  if (mouseX > 654 && mouseX < 893 && mouseY > 605 && mouseY < 676) {
    Restartbarcolour = '#eb4034';

    Endgametimer.start();
    if (Endgametimer.time > 3){
     console.log('rest game');
      RestSketch();
    }

  } else {
    Endgametimer.time = 0;
    Restartbarcolour = '#ffffff';
  }

  push();
  rectMode(CORNER)
  fill(Restartbarcolour);
  rect(654, 605, 239, 71);
  pop();

  if (mouseX > 918 && mouseX < 1158 && mouseY > 605 && mouseY < 676) {
    MoreInfobarcolour = '#eb4034';

  } else {
    MoreInfobarcolour  = '#ffffff';
  }

  push();
  rectMode(CORNER)
  fill(MoreInfobarcolour );
  rect(918, 605, 238, 71);
  pop();

  
  // let gameScore = 100;

  push();
  textSize(30);
  textAlign(CENTER);
  color('255, 255, 255, 255');

  text("Score:", 855, 380);
  text(gameScore.Score, 930, 380);

  text("Enemys Killed :", 800, 440);
  text(EnemyKilled, 930, 440);

  text("Enemy Hits:", 830, 500);
  text(EnemyHits, 930, 500);

  pop();

  push();
  textSize(20);
  textAlign(CENTER);
  color('#eb4034');
  text("Back To Start Menue", 764, 627);
  text("About Game", 1032, 627);
  pop();
  


}

function RestSketch(){

  startGame = false;
  endGame = false;
  startTutorial = false;
  essentialCode = false;
  imageCode = false;

  // gameScore.score = 0;
  gameTimer.stop();
  gameTimer.time = 0

  currentEnemy = 0;
  currentEnemyBod = 0;
  currentBird = 0;
  RanX = 0;
  spawnTimer = 2;

  EnemyHits = 0;
  EnemyKilled = 0

  BossY =  -200;
  EnemyY = -50;



  // Ground is static object
  ground = new Ground(width / 2, height - 20, 100, 20);

  //Bird interacts with gravity
  // bird = new Bird(width/2, height-200, 16);
  birds[currentBird] = new Bird(width / 2, height - 200, 20);
  // currentBird++;

  for (let bird of birds) {
    slingshot = new Slingshot(width / 2, height - 200, bird.body);
  }
}