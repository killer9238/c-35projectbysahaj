var balloon,balloonimage;
var database;
var balloonposition;
var position;
var bgimage;

function preload(){
    balloonimage=loadImage("Hot Air Ballon-02.png")
    bgimage=loadImage("Hot Air Ballon-01.png")
}
function setup(){
    createCanvas(1300,800);
    balloon = createSprite(500,600,10,10);
    balloon.addImage(balloonimage)
    database=firebase.database();
    console.log(database);
    balloonposition=database.ref('balloon/position');
    balloonposition.on("value",readposition)
}

function draw(){
    
    background(bgimage);
    textSize(20)
    text("Press UP arrow to go up, Down arrow for coming down,Left arrow for going left and right for going right.",50,50)
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updateHeight(0,-10)
        changePosition(0,-1);
        
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('balloon/position').set({
       'x':position.x+x,
       'y':position.y+y
    })
}

function readposition(data){
     position=data.val()
     balloon.x=position.x;
     balloon.y=position.y;
}