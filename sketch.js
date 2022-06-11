var ground,groundimg
var coin,coinimg
var superhero_run,superhero_slide,superhero,superhero_jump
var robber,robber_run,robber_slide,robber_jump
var box,boximg
var arrow,arrowimg
var chest,chestimg
var invisibleGround
var gameover,gameoverimg
var score=0
var PLAY = 1
var END = 0
var gamestate =PLAY

function preload(){
groundimg = loadImage("background.jpg")
superhero_run = loadAnimation("superherorun1.png","superherorun2.png","superherorun3.png")
robber_run = loadAnimation("run robber 3.png","run robber 2.png")
coinimg = loadImage("coin.png")
boximg = loadImage("box.png")
chestimg = loadImage("chest.png")
arrowimg = loadImage("arrow.png")
robber_jump = loadAnimation("run robber 2.png")
gameoverimg = loadImage("gameover.jpg")
}

function setup() {
createCanvas(300,280)

 ground=createSprite(300,160)
 ground.addImage(groundimg)
 ground.velocityX = -3
 ground.depth = 0

 superhero = createSprite(35,220,20,20)
 superhero.addAnimation("running",superhero_run)
 superhero.scale = 0.05


 robber = createSprite(150,250,20,20)
 robber.addAnimation("running",robber_run)
 robber.scale = 0.45

 invisibleGround = createSprite(200,260,400,10);
 invisibleGround.visible = false;

 coing = new Group()
 chestg = new Group()
 arrowg = new Group()
 boxg = new Group()
 score = 0

}

function draw() {
  background("lightblue")

if(gamestate === PLAY){
  if (ground.x < 0){
    ground.x = ground.width/2;
    }  

  
   text("Score: "+ score,200,15)

    if(keyDown("space")&& robber.y >= 200 ){
     robber.velocityY = -10
   }
   
   robber.collide(invisibleGround)
   
   robber.velocityY = robber.velocityY + 0.8
     var select_sprites = Math.round(random(1,4))
     if (frameCount%80 === 0){
       if(select_sprites === 3){
         spawnbox()
       }
       else if(select_sprites === 2){
         spawncoin()
       }
       else if(select_sprites === 1){
       spawnchest()
       }
       else{
         spawnarrow()
       }
         }
      
    if (coing.isTouching(robber)) {
           coing.destroyEach();
           score = score + 1
         }
    if(chestg.isTouching(robber)){
     chestg.destroyEach();
     score = score + 10
    }
   
    if (coing.isTouching(superhero)) {
     coing.destroyEach()
      score = score - 2
     
    }
   
    if (chestg.isTouching(superhero)){
     chestg.destroyEach()
     score = score - 5}
     if(boxg.isTouching(robber)||arrowg.isTouching(robber)){ 
  gamestate = END
}
}
else if(gamestate === END){
  background("white")
  gameover = createSprite(150,160,20,20)
  gameover.addImage(gameoverimg)
  gameover.scale=0.6
  ground.destroy()
  superhero.destroy()
  robber.destroy()
  coing.destroyEach(0)
  chestg.destroyEach(0)
  boxg.destroyEach(0)
  arrowg.destroyEach(0)
}

drawSprites()

}

function spawncoin(){
var a = Math.round(random(1,4))
coin = createSprite(400,240,10,10)
coin.velocityX = -3
coin.addImage(coinimg)
coin.scale = 0.02
coin.lifetime = width/2
coin.setCollider("circle",0,0,10)
coin.debug = false
coing.add(coin)

}

function spawnbox(){
  var a = Math.round(random(1,4))
  box = createSprite(400,240,10,10)
  box.velocityX = -3
  box.addImage(boximg)
  box.scale = 0.1
  box.lifetime = width/2
  box.setCollider("rectangle",0,0,10,10)
  box.debug = false
  boxg.add(box)
}

function spawnchest(){
  var a = Math.round(random(1,4))
  chest = createSprite(400,235,10,10)
  chest.velocityX = -3
  chest.addImage(chestimg)
  chest.scale = 0.03
  chest.lifetime = width/2
  chest.setCollider("rectangle",0,0,20,20)
  chest.debug  = false
  chestg.add(chest)
}
function spawnarrow(){
  var a = Math.round(random(1,4))
  arrow = createSprite(400,240,10,10)
  arrow.velocityX = -3
  arrow.addImage(arrowimg)
  arrow.scale = 0.06
  arrow.lifetime = width/2
  arrow.setCollider("rectangle",0,0,15,15)
  arrow.debug = false
  arrowg.add(arrow)
}