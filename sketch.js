var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var bullet, bulletImg;
var zombieGroup;
var bulletGroup;
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var score = 0;
var life = 3;
var bullets = 70;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bullet.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicione a imagem de fundo
// bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
// bg.addImage(bgImg);
// bg.scale = 0.8;
  

//crie o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
player.addImage(shooterImg);
player.scale = 0.3;
//   player.debug = true;
//   player.setCollider("rectangle",0,0,300,300);
heart1 = createSprite(500,40);
heart1.addImage(heart1Img);
heart1.scale = 0.4;
heart1.visible = false;

heart2 = createSprite(545,40);
heart2.addImage(heart2Img);
heart2.scale = 0.4;
heart2.visible = false;

heart3 = createSprite(502,40);
heart3.addImage(heart3Img);
heart3.scale = 0.4;
heart3.visible = true;

// bullet = createSprite(displayWidth-1150, displayHeight-325);
bulletGroup = new Group();
zombieGroup = new Group();
}


function draw() {
  background(bgImg); 



  //mova o jogador para cima e para baixo e torne o jogo compatível com dispositivos móveis usando touches (toques)
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30;
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30;
}


if(keyWentDown("space")){
   bullet = createSprite(displayWidth-1150,player.y-30,20,10)
   bullet.velocityX = 20;
   bullet.addImage(bulletImg);
   bullet.scale = 0.05;
   bulletGroup.add(bullet)
   player.depth =bullet.depth;
   player.depth = player.depth+2;
  //  player.depth = bullet.depth;
  //  player.depth = player.depth+2;
   player.addImage(shooter_shooting);
   bullets = bullets-1;
// explosionSound.play(); 
 }
//libere as balas e mude a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
 
 
//o jogador volta à imagem original quando pararmos de pressionar a tecla espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg);
}


if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy();
  life -=1; 
  }
 }
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(bulletGroup)){
  zombieGroup[i].destroy();
  bulletGroup.destroyEach(); 
//  explosionSound.play();
  score = score+5;
  } 
 }
}

if(life === 3){
  heart3.visible = true;
  heart1.visible = false;
  heart2.visible = false;
}

if(life === 2){
  heart2.visible = true;
  heart1.visible = false;
  heart3.visible = false;
}

if(life === 1){
  heart1.visible = true;
  heart3.visible = false;
  heart2.visible = false;
}

if(life === 0){
  heart1.visible = false;
  heart2.visible = false;
  heart3.visible = false;
  textSize(40);
  fill("orange");
  text("O jogo acabou, obrigado por jogar!!!",500,350);
  zombieGroup.setVelocityXEach(0);
  zombieGroup.destroyEach();
  // player.velocityY = 0;
}

enemy();
drawSprites();
textSize(30);
fill("white");
text("score: "+ score,50,50)
}

function enemy(){
  if(frameCount%100 === 0){
  zombie = createSprite(1200,500);
  zombie.velocityX = -2;
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.y = random(20,480);
  zombieGroup.add(zombie);
}
}