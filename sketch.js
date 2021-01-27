var balloon, database, position;

function preload(){
  backgroundImg = loadImage("Image/background.png")
  balloonAnimation = loadAnimation("Image/1.png","Image/2.png","Image/3.png");
}
function setup() {
  createCanvas(1600,790);

  balloon = createSprite(100, 150);
  balloon.addAnimation("flying",balloonAnimation);

  database = firebase.database();
  ballonPosition = database.ref('balloon/position');
  ballonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);

  if(keyDown(LEFT_ARROW)){
    changePosition(-5,0);

  }else if(keyDown(RIGHT_ARROW)){
    changePosition(5,0);

  }else if(keyDown(UP_ARROW)){
    changePosition(0,-5);
    balloon.scale = balloon.scale-0.01;

  }else if(keyDown(DOWN_ARROW)){
    changePosition(0,5);
    balloon.scale = balloon.scale+0.01;
  }

  drawSprites();
}
function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}
function changePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}
function showError(){
  console.log("Error in writing to the database");
}