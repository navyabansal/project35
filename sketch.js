//Create variables here
var dogImg , happyDogImg ,dog , database , foodS , foodstock 

function preload()
{
  //load images here
  dogImg = loadImage("dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(800, 700);
  
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog = createSprite(400,500,1900,100);
  dog.addImage(dogImg,200,200);
  dog.scale = 0.5;
  
}

function draw() {  
  background(255, 189, 180);

  
  //food
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg,200,200);
  }
  drawSprites();

  //add styles here
  textSize(20);
  fill("white");
  text("Note: Press UP_ARROW to feed the drago milk!!", 200,50);
  text("Milk bottles remaining :" + foodS , 275, 100)
}

// function to read values from DB
function readStock(data){
  foodS = data.val();
}

//function to write values in DB
function writeStock(x){

  if (x<=0){
    x=0;  
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}


