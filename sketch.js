//Declaring variables
var fish, happyFish, database, foodS, foodStock, foodCount;
var fishImg, happyFishImg;
var sleepyFish, sleepyFishImage;
var addB, feedB;
var lastFed;
var food;
var changeState;
var readState;
var gameState;
var bg1, bgImg1;
var bg2, bgImg2;


//Loading the images
function preload(){
fishImg=loadImage("fish.png");
happyFishImg=loadImage("happyFish.png");
sleepyFishImage=loadImage("sleepyfish.png");
bgImg1=loadImage("Image2.png");
bgImg2=loadImage("Image.jpg");
}

function setup() {
	createCanvas(800,600);
  database=firebase.database();

  foodS=10;

  //Creating hungry background
  bg1=createSprite(250,250,500,500);
  bg1.addImage(bgImg1);

  //Creating the fish
  fish=createSprite(320,250,40,40);
  fish.addImage(fishImg);
  fish.scale=0.3;

  //Creating the fish-food
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  //Creating food
  food=new Food(0);

  //Creating the FEED BUTTON
  feedB=createButton("Feed Goldie");
  feedB.position(450,100,40,40);
  feedB.mousePressed(feedFish);

  //Creating the ADD BUTTON
  addB=createButton("Refresh Stock");
  addB.position(700,100,40,40);
  addB.mousePressed(addFood);
  
  //Creating the time
  lastFed=hour();

  

}


function draw() {  
drawSprites();
textSize(17);
text("Dark background: Goldie is Hungry",500,200);
text("Aquarium background: Goldie is Full",500,250);
text("Goldie's sleep-time: 12 AM",500,300);


//Displaying text for the time 
fill("white");
textSize(20);
if(lastFed>=12){
  text("Last you fed Goldie: "+ lastFed%12+" PM ",150,460);
}
else if(lastFed==0){
 text("Last you fed Goldie:12 AM",150,460);
 bg1.addImage(bgImg1);
 fish.addImage(sleepyFishImage);
}
else{
 text("Last you fed Goldie: "+lastFed+" AM ",150,460);
}


//Displaying  text for FOOD LEFT 
fill("white");
textSize(20);
text("Fish food left: "+foodS,190,30);
}

//Creating function for reading the databse value
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  //Decreasing the number of food if only foodS>0 
  if(x<=0){
  x=0;
  textSize(50);
  fill("red");
  text("Goldie is full!!!",100,450);
  fish.scale=0.3;
  bg1.addImage(bgImg2);
  bg1.scale=1.8;
  feedB.hide();
  addB.hide();
  }
  else{
  x=x-1;  
  food.display();
  fish.scale=fish.scale+0.1;
    feedB.show();
    addB.show();
  

  }
  database.ref('/').update({
  Food:x
  })
}

//Creating function for feeding fish
function addFood(){
  if(foodS>=10){
    foodS=10;
  }
  else{
    foodS=foodS+1;
  }
}

//Creating function for adding food
function feedFish(){
  writeStock(foodS);
  fish.addImage(happyFishImg);
}


