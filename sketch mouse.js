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
let BossElement;
let EndScreen;
let finalCutscene;

let tutorial;

let STscreens;

let  STfont;
let  smallerfont;

let BossY =  -200;
let EnemyY = -50;
let ArmJoint = -30;

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


// fonts
let RanImage;

// let intro = false;
// let introTime = 15000;

let IntroX;
let IntroY;
let LoopX;
let LoopY;

// let SecTimer = 1000;
// let StopWatch = 0;


let Name; // Input field for the first column (Data)


function preload() {
  Backdropimg = img = loadImage('Images/Backdrop Animated.gif'); 
  StartBackdrop = img = loadImage("Images/StartScreen.gif");
  console.log("backdrop loaded");

  // ThreeTwoOne = img = loadImage("Images/321.gif");

   CharacterIntro = img = loadImage("Images/CharacterIntro.gif");
   CharacterLoop = img = loadImage("Images/CharacterLoop.gif");
   HeightWarning = img = loadImage("Images/HeightWarning.png");  
   Explosion = img = loadImage("Images/explosion.gif");
   IntroFilm = img = loadImage("Images/Intro film new.gif");
   finalCutscene = img = loadImage("Images/final cut scene.gif");

   Boss = img = loadImage("Images/roboBoss.gif");

   console.log("game assets loaded");

   STscreens = img = loadImage("Images/ScoreandTimeScreens.png");
   EndScreen = img = loadImage("Images/EndScreen.gif");

   
   tutorial = img = loadImage("Images/tutorial.gif");

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

   console.log("robo hands loaded");

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

  
  ///////fonts///////

  STfont = loadFont('Fonts/Arcade.ttf');
  smallerfont = loadFont('Fonts/VCR_OSD_MONO.ttf');



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
  tutorialEnemy[1] = new Enemy(width/2, -50, 50, 50, 0.0, 0, width/2,width/2, RanImage, ArmJoint );

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

  // Score board Related
    // Retrieve the data from the server
    retrieveData();
 
    Name = createInput();
    Name.style('font-family', 'smallerfont'); // Apply the custom font to the input field
    Name.attribute('maxlength', '4'); // Set the maximum length to 4 characters
    Name.style('background-color', '#000000');
    Name.style('color', '#ffffff');
    Name.style('font-size', '20px');
    Name.style('border', '2px solid #333333');
    Name.style('padding', '10px');
    Name.style('border-radius', '5px');
    Name.style('text-align', 'center');
    Name.value('HERE'); // Set the initial value of the input field
    Name.hide();
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
  
  // console.log("X:", mouseX);
  // console.log("Y:", mouseY);
  if (startTutorial == false && startGame == false) {
    StartScreen();
  } else if (startTutorial == true && startGame == false){
    Tutorial();
    Startgametimer.start();
    if (Startgametimer.time < 17){

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
    BossSpawn();
  } 

  if (essentialCode == true){
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

 if (gameTimer.time<126){
  // if (gameTimer.time<10){
 push();
 imageMode(CENTER);
 image(finalCutscene, width/2, height/2, width, height);
 pop();
 }else{
    console.log('EndGame!');
    gameTimer.stop();
    
    startGame = false;
    startTutorial = false;
    EndGame();
 }
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
  if (Startgametimer.time > 19){
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
  
    if (Startgametimer.time > 28){
      // console.log("yes");
      IntroX = 1000;
      IntroY = 10000;
      LoopX = width/2;
      LoopY = height/2 + 20;
      essentialCode = true

    
    if (startTutorial == true && startGame == false){
    push();
    imageMode(CENTER);
    tint(255, 127); // Display at half opacity
    image(tutorial , width/2, height/2,  Backdropimg.width, Backdropimg.height*width/Backdropimg.width);
    pop();
    }
  }

    image(CharacterIntro, IntroX, IntroY );
    image(CharacterLoop, LoopX , LoopY);
  
    push();
    imageMode(CENTER);
    image(STscreens , width/2 , 60, STscreens.width-300, STscreens.height-125);
    pop();


  }

//////////////////////////////////////////////
///////////Enemy Spawn Function///////////////
//////////////////////////////////////////////

function EnemySpawn() {

  if (gameTimer.get() > spawnTimer) {
    RanX = random(400, width - 400);

    RanImage = random(robohands);
    enemys[currentEnemy] = new Enemy(RanX, EnemyY, 50, 50, 0.0, 0, RanX, RanX, RanImage, ArmJoint);
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
      spawnTimer += 0.5;
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
      ArmJoint = ArmJoint + 0.2
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
        gameScore.add(50);
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
  strokeWeight(1);
  textSize(30);
  textAlign(CENTER)
  fill(31, 38, 29);
  textFont(smallerfont);
  text("Score:", 1055, 66);
  text(gameScore.score, 1170, 66);

  text("Time left:", 268, 55);
  text(countdown, 268, 78);
  pop();
}

//////////////////////////////////////////////
//////////////StartScreen Function////////////
//////////////////////////////////////////////

function StartScreen() {


  imageMode(CENTER);
  image(StartBackdrop , width/2, height/2, width, height);

  // console.log(mouseX, ",", mouseY);

  if (mouseX > 753 && mouseX < 1244 && mouseY > 536 && mouseY < 750) {
    // imageMode(CENTER);
    // image(ThreeTwoOne , width/2, height - 170);

        //  console.log('ding ding');
        Startgametimer.start();
        Startgametimer.draw();

// 
        threecountdown = round(3 - Startgametimer.time);
        push();
        textSize(100);
        textAlign(CENTER);
        textFont(smallerfont);
        fill(255, 255, 255);
        if(threecountdown > 1 || threecountdown == 1){
        text(threecountdown, 1034, 690);
        }else if (threecountdown < 1){
          textSize(100);
          text("GOOD", 1034, 637);
          text("LUCK", 1034, 720);
        }
        pop();
    if(Startgametimer.time>4 ){
    startTutorial = true;
    Startgametimer.time = 0;
    }
  } else {
    push();
    // strokeWeight(10);
    textSize(80);
    textAlign(CENTER);
    textFont(smallerfont);
    fill('#eb4034');
    text('Hover to', 1024, 657);
    text('Start', 1034, 720);
    pop();
    Startgametimer.time = 0;
    threecountdown = 3;
  }

    
    // Sort the dataRows array based on the score in descending order
    dataRows.sort((a, b) => b.score - a.score);
    // Display the data rows as a text list
    for (let i = 0; i < dataRows.length; i++) {
      if (i < 10){
      let row = dataRows[i];
      let data = row.data;
      let score = row.score;
      let Hnumber = "";
      let num = i + 1
      let Xrow = 0;
      let Yrow = 0;
      if(num == 1){
        Hnumber = "st";
        leadColour = "#baa534";
      } else if (num == 2){
        Hnumber = "nd";
        leadColour = "#959e9d";
      }else if (num == 3){
        Hnumber = "rd";
        leadColour = "#CD7F32";
      }else{
        Hnumber = "th";
        leadColour = "#000000";
      }
      if(i>4){
        Xrow = 230;
        Yrow =75
      }
      push();
      textSize(20);
      textAlign(CENTER);
      fill(leadColour);
      textFont(smallerfont);
      text(num+Hnumber+' . ' + data + ' / ' + score, 310 + Xrow, 580 + i * 25 - Yrow);
      pop();
    }
    }
}

let dataRows = []; // Array to store the data rows

function EndGame(){

  

  push();
  rectMode(CENTER);
  fill(0, 0, 0);
  rect(width/2, height/2, width, height);
  pop();
  
  imageMode(CENTER);
  image( EndScreen , width/2, height/2);


  // push();
  // rectMode(CENTER)
  // fill('#eb4034');
  // rect(968, 450, 500, 300);
  // pop();

  push();
  strokeWeight(4); // Thicker
  line(968, 330, 968, 586);
  pop();

    push();
  textSize(50);
  textAlign(CENTER);
  fill('#eb4034');
  textFont(STfont);
  // text("Enter Your Name", 968, 160);
  pop();

  Name.show();
  Name.position(968, 190);

  // let Score = 1300;
  // let EnemyKilled = 100
  // let EnemyHits = 10;
  push();
  textSize(30);
  textAlign(RIGHT);
  color('255, 255, 255, 255');
  textFont(STfont);
  // text("Game Stats", 890, 320);
  textAlign(LEFT);
  // text("Leader Board", 910, 320);
  pop();

  push();
  textSize(20);
  textAlign(CENTER);
  textFont(smallerfont);
  color('255, 255, 255, 255');
  text("Score:" + gameScore.Score, 800, 400);

  text("Enemys Killed :" + EnemyKilled, 800, 460);

  text("Enemies That :"+ EnemyHits, 800, 520);
  text(" Reached Target", 770, 540);

  textAlign(CENTER);
  textSize(20); 
  text("Press Enter To Rest Game", 968, 255);
  textSize(15);
  text("(And To Add Your Score To The Leader Board)", 968, 270);

  
    // Sort the dataRows array based on the score in descending order
    dataRows.sort((a, b) => b.score - a.score);
    // Display the data rows as a text list
    for (let i = 0; i < dataRows.length; i++) {
      if (i < 10){
      let row = dataRows[i];
      let data = row.data;
      let score = row.score;
      let Hnumber = "";
      let num = i + 1
      if(num == 1){
        Hnumber = "st";
        leadColour = "#baa534";
      } else if (num == 2){
        Hnumber = "nd";
        leadColour = "#959e9d";
      }else if (num == 3){
        Hnumber = "rd";
        leadColour = "#CD7F32";
      }else{
        Hnumber = "th";
        leadColour = "#000000";
      }
      push();
      textSize(20);
      textAlign(CENTER);
      fill(leadColour);
      textFont(smallerfont);
      text(num+Hnumber+' . ' + data + ' / ' + score, 1150, 370 + i * 25);
      pop();
    }
    }


}

function keyPressed() {
  if (keyCode === ENTER) {
    addToCSV();
  }
}


function addToCSV() {
  let data = Name.value();
  let score = gameScore.score;

  fetch('http://localhost:3000/addtocsv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, score }),
  })
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
      // Update the data on the sketch after adding to CSV
      retrieveData();
    })
    .catch((error) => {
      console.error('Error adding data to CSV file:', error);
    });
}

function retrieveData() {
  fetch('http://localhost:3000/getdata')
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
      // Update the dataRows array with the retrieved data
      fetchDataRows();
    })
    .catch((error) => {
      console.error('Error retrieving data:', error);
    });
}

function fetchDataRows() {
  fetch('http://localhost:3000/datarows')
    .then((response) => response.json())
    .then((jsonData) => {
      dataRows = jsonData.dataRows;
    })
    .catch((error) => {
      console.error('Error fetching data rows:', error);
    });
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