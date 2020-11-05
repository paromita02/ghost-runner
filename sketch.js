var towerImg,tower;
var door, doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlockGroup,invisibleBlock;
var gameState ="play";

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  doorsGroup=new Group();
  climberImg = loadImage("climber.png");
  climbersGroup=new Group();
  ghostImg= loadImage("ghost-standing.png");
  
}

function setup (){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  invisibleBlockGroup= new Group();
  
  
}

function draw(){
  background("black");
  
  if(gameState==="play") {
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("SPACE")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(tower.y>400){
    tower.y =300;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy(); 
    gameState="end";
  }
  
  spwanDoors();
  
  drawSprites();
  }
  if(gameState==="end"){
    fill("yellow");
    textSize(30);
    text("GAME OVER",230,250);
  }
}

function spwanDoors(){
  if(frameCount % 240 ===0){
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    climbersGroup.add(climber);
    
    ghost.depth=door.depth+1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}