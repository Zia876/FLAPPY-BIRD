var start = 2;
var PLAY = 1;
var END = 0;
var gameState = start;

var bg, bgimg;
var wallpaperimg;
var ground, groundimg;
var bird, birdimg, birdcollideimg;
var obstacle1, obstacle1img, obstacle2, obstacle2img, obstacle3, obstacle3img, obstacle4, obstacle4img, obstaclesGroup;
var bgsound, diesound;
var play, playimg;
var replaybuttonimg;

function preload() {
  bgimg = loadImage("bg.png");
  groundimg = loadImage("ground2.png");
  birdimg = loadAnimation("bird 1.png","bird 2.png");
  birdcollideimg = loadAnimation("bird 3.png");
  obstacle1img = loadImage("obstacle 1.png");
  obstacle2img = loadImage("obstacle 2.jpg");
  obstacle3img = loadImage("obstacle 3.png");
  obstacle4img = loadImage("obstacle 4.png");
  bgsound = loadSound("bg sound.mp3");
  diesound = loadSound("die sound.mp3");
  wallpaperimg = loadImage("wallpaper.jpg");
  playimg = loadImage("play 4.png");
  //replaybuttonimg = loadImage("replay button.png");
}

function setup() {
  createCanvas(1600,800);
  bgsound.loop();

  bg = createSprite(800, 395, 50, 50);
  bg.addImage(wallpaperimg);
  bg.scale= 4;
  // bg.velocityX = -2;

  ground = createSprite(573,780,20,20);
  ground.addImage(groundimg);

  bird = createSprite(80, 256, 20,20);
  bird.addAnimation("flying", birdimg);
  bird.scale = 0.3;
  bird.setCollider("circle", 0,0,80);

  play = createSprite(800, 500);
  play.addImage(playimg);
  

  obstaclesGroup=new Group();

}

function draw() {
  background(255,255,255); 
  

  if(gameState === PLAY){
    if(bg.x<10){
      bg.x = bg.width/4;
    }
  
  if(keyDown("space")){
    bird.y = bird.y - 15;
  }
  else{
    bird.velocityY = 5;
  }
  if(bird.isTouching(obstaclesGroup)){
    diesound.play();
    gameState = END;
    bird.velocityY = 0;
    bird.addAnimation("flying", birdcollideimg);
    bg.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
  }
  obstacle()
  }
  else if(gameState === END){
    replay.visible = true;
    if(mousePressedOver(replay)){
      gameState=PLAY;
    }

  
  }
  drawSprites();
  
  if(gameState === start){
    if(mousePressedOver(play)){
      gameState = PLAY;
      play.destroy();
      bg.addImage(bgimg);
      bg.scale= 2;
      bg.velocityX = -3;
    }
  }
}

function obstacle() {
  if(frameCount%200=== 0){
    obstacle3 = createSprite(1600,80, 20,20);
    obstacle1 = createSprite(1600,random(650,700), 20,20);
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle3.addImage(obstacle1img);
              break;
      case 2: obstacle3.addImage(obstacle3img);
              break;
    //   case 3: obstacle3.addImage(obstacle3img);
    //           break;
      default: break;
    }
    switch(rand) {
      case 1: obstacle1.addImage(obstacle2img);
              break;
      case 2: obstacle1.addImage(obstacle4img);
              break;
    //   case 3: obstacle3.addImage(obstacle3img);
    //           break;
      default: break;
    }
    // obstacle3.debug=true;
    // obstacle1.debug=true;
  obstacle3.scale = 1.9;
  obstacle1.scale = 1.9;
  obstacle3.velocityX = -3;
  obstacle1.velocityX = -3;
  obstacle3.lifetime = 800;
  obstacle1.lifetime = 800;
  obstaclesGroup.add(obstacle3);
  obstaclesGroup.add(obstacle1);
  ground.depth=obstacle1.depth+1;
  }
}