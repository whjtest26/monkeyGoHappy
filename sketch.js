
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score = 0;
var ground;
var gameState = "play";

function preload(){
                  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
    createCanvas(600,500);
  
    monkey = createSprite(50,400,20,60);
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.15;
    
    ground = createSprite(300,450,600,10);
    ground.shapeColor = "black";
  
    bananaGroup = new Group();
    obstaclesGroup = new Group();
}


function draw() {
  
  background("lightblue");
  
  fill("orange");
  stroke("purple")
  textSize(23);
  text("Survival Time = " + score,225,50); 
  
  if(gameState === "play"){
    
    score = score + Math.round(getFrameRate()/30);
    ground.velocityX = -6;
    if(ground.x < 300){
    
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && monkey.y > 380){
    
        monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.5; 
    
    spawnBananas();
  
    spawnObastacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      
        gameState = "end";
        
    }
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    
  }
  else if(gameState === "end"){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    
    
  }
  
  
  monkey.collide(ground);
  
  drawSprites();
  
}


function spawnBananas(){
  
  if(frameCount % 80 === 0){
    
      banana = createSprite(600,Math.round(random(150,280)),30,50);
      banana.addImage(bananaImage);
      banana.velocityX = -3;
      banana.scale = 0.1; 
      banana.lifetime = 200;
      banana.depth = monkey.depth;
      monkey.depth = banana.depth + 1;

      bananaGroup.add(banana);
     
  
  }
 
}

function spawnObastacles(){
  
  if(frameCount % 200 === 0){
    
    obstacle = createSprite(600,410,50,70);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
    
    obstaclesGroup.add(obstacle);
    
  }
   
}



