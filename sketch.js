var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background1;
var pikachu1;
var animal1,animal1Image
var invisiableGround;
var charmander;
var ostrich;
var foodGroup, foodImage;
var animalsGroup;
var score  = 0;
var restartImage;
//var gameoverImage;

var jumpSound , dieSound;

function preload(){
  background1Image = loadImage("background1.png")
  pikachu1Image = loadAnimation("pikachu1.png","pikachu2.png","pikachu1.png","pikachu2.png")
  animal1Image = loadAnimation("animal1.png","animal2.png","animal3.png")
  charmander = loadAnimation("charmander1.png","charmander2.png","charmander3.png")
  ostrich = loadAnimation("ostrich1.png","ostrich2.png","ostrich3.png","ostrich4.png")
  foodImage = loadImage("food.png")
  
  
  jumpSound = loadSound("Pikachu.mp3")
  dieSound = loadSound("pikaaaa.mp3")

 // gameoverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");




  
}

function setup(){
  createCanvas(400,400);

  background1 = createSprite(200,200)
  background1.addImage(background1Image)
  background1.x = width/2
  background1.velocityX = -(8 + 5*score/50)

  pikachu1 = createSprite(50,330,30,30)
  pikachu1.addAnimation("image",pikachu1Image)
  pikachu1.scale = 0.2
  pikachu1.debug = false;
  pikachu1.setCollider('circle',0,0,150)

   //gameover = createSprite(200,200);
   //gameover.addImage(gameoverImage);

   restart = createSprite(200,200)
   restart.addImage(restartImage)

    //gameover.scale = 0.4;
    restart.scale = 0.1;


 


  //animal1 = createSprite(320,330,30,30)
 // animal1.addAnimation("image",animal1Image)
 // animal1.scale = 0.3
 // animal1.velocityX= -4



  
  
  invisiableGround = createSprite(200,370,400,5)
  invisiableGround.visible = false;

 
  foodGroup = createGroup();
  animalsGroup = createGroup();
 
  
  
  
}
function draw() {

  

   if(gameState===PLAY){
     restart.visible = false;
     
    if(background1.x < 0)
    background1.x = background1.width/2
    background1.velocityX = -(8 + 5*score/50)
   

   
  
    if(keyDown("space") && pikachu1.y >=100){
        pikachu1.velocityY = -21;
        jumpSound.play();
    }
     
    pikachu1.velocityY = pikachu1.velocityY + 0.9
     pikachu1.collide(invisiableGround);
     
  
     spwanAnimal();
     spwanfood();

     if(foodGroup.isTouching(pikachu1)){
       foodGroup.destroyEach()
         score = score+10;
     }

     if(animalsGroup.isTouching(pikachu1)){
       dieSound.play();
       gameState = END;
      
     }
        if(gameState === END){
      // gameover.visible = true;
       restart.visible = true;

       background1.velocityX = 0;
       pikachu1.velocityX = 0;
       //animals.velocityX = 0;
     }

     }
     if(mousePressedOver(restart)){
     reset();
     }

  drawSprites();
  textSize(20);
    fill ("red");
    text ("score:" + score,300,30);
}

function spwanAnimal(){
if(frameCount % 90 === 0){
  var animals = createSprite(320,330,30,30)
  animals.debug = false;
  animals.setCollider('circle',0,0,100)

 
  animals.velocityX = -4;

  var rand = Math.round(random(1,3))
  switch(rand){
    case 1: animals.addAnimation("animal",animal1Image);
      break;
    case 2: animals.addAnimation("animaal",charmander);
      break;  
    case 3: animals.addAnimation("bird",ostrich);
      break;  
      default: break;




      
    


  }
  animals.scale = 0.3;
  animalsGroup.add(animals)
  



}


}
 function reset(){
   gameState = PLAY;
   restart.visible = false;
   pikachu1.changeAnimation("image",pikachu1Image)
   animalsGroup.destroyEach();

   score = 0;


   }




  function spwanfood(){
    if(frameCount % 60 === 0){
    var food = createSprite(330,320,30,30)
    food.y = Math.round(random(290,340))
    food.addImage("fruit",foodImage); 
    food.debug = false;
    food.setCollider ('circle',0,0,200)
    food.scale = 0.2;
    food.velocityX = -4;
    food.lifetime = 200;

    foodGroup.add(food);
    
    
  

    }
  


  }







    


  

