var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feeddog;
var feed;
var lastFed;
var lastfedData;
var currenttime = 2;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  lastFed = database.ref('FeedTime');
  lastFed.on("value", readTime);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feeddog = createButton("Feed Dog");
  feeddog.position(1000,95)
  feeddog.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

 
 textSize(30);
 fill("black")
 text("Last Time Fed: "+lastfedData, 100,100)

  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  currenttime = hour()
  database.ref('/').update({
FeedTime:currenttime,
Food: foodObj.foodStock-1
  })

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function readTime(data) {
  lastfedData = data.val();
}