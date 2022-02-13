var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.velocityY = 2 
  ghost.scale = 0.5
  climbersGroup=new Group()
  doorsGroup=new Group()
  invisibleBlocksGroup=new Group()
  
}

function draw() {
  background(200);
  
if(gameState=="play")
{
  if(tower.y > 400){
    tower.y = 300
  }

//To make the ghost jump
if(keyDown("space"))
{
ghost.velocityY = -4
}
ghost.velocityY+=0.8

if(keyDown("LEFT_ARROW"))
{
ghost.velocityX = -4
}
if(keyDown("RIGHT_ARROW"))
{
ghost.velocityX = 4
}
if(climbersGroup.isTouching(ghost))
{
ghost.velocityY=0
}

if(ghost.y>600||invisibleBlocksGroup.isTouching(ghost))
{
ghost.destroy()
gameState="end"
}



}


if(gameState=="end")
{
stroke("yellow")
fill ("yellow")
textSize(30)
text("GAMEOVER",230,250)
}



    drawSprites()
}

function spawndoors(){
  
  if(frameCount%60==0)
  {
  var door=createSprite(200,-50)
  door.addImage("door",doorImg)

  //climber
  var climber=createSprite(200,-50)
  climber.addImage("climber",climberImg)

//Invisble Block
var invisibleBlock=createsprite(200,15)




  door.velocityY=1
  door.lifetime=800

  climber.velocityY=1
  climber.lifetime=800

  invisibleBlock.velocityY=1
  invisibleBlock.lifetime=800

  door.x=Math.round(random(120,400))
  climber.x=door.x
  invisibleBlock.x=door.x

  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlocksGroup.add(invisibleBlock)
  }
}