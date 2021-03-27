var balloon,balloonImage1,balloonImage2;
var database;
var position;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1 = loadAnimation("Images/HotAirBallon-01.png");
   balloonImage2 = loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png" )
}

function setup(){
  database = firebase.database();
  createCanvas(1500,700);

  balloon = createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBallon",balloonImage1);
  balloon.scale=0.5;

 var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError);
}

function draw(){
  background(bg);
  
if(keyDown(LEFT_ARROW)){
  updatePosition(-10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
}
else if(keyDown(RIGHT_ARROW)){
  updatePosition(+10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
}
else if(keyDown(UP_ARROW)){
  updatePosition(0,-10);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale = balloon.scale-0.005
}
else if(keyDown(DOWN_ARROW)){
  updatePosition(0,+10);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale = balloon.scale+0.005
}

  drawSprites();
  stroke("white");
  textSize(30);
  text("*Use Arrow Keys to Move the HotAirBalloon",40,40);
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}