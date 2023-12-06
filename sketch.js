var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var engine;0
var cueBall;
var walls;
var balls;
//var MAX_STRIKE=30;


function setup(){
    createCanvas(800,600);
    engine = Engine.create();
    engine.world.gravity.y = 0;
    
    balls = [];
    walls = [];
    generateCueBall();
    setupWalls();
    generateBalls();
    generatePockets();
    
}

function draw(){
    background(1,50,32);
    Engine.update(engine)
    
    drawWalls();
    drawCueBall();
    drawForceLine()
    drawBalls();
    drawPockets();
    
}

function generateBalls(){
    for (var i = 0; i < 5; i++){
        var ball = Bodies.circle(width/2, i*30+250,15,{restitution:1,friction:0.2});
        
        balls.push(ball);
    }
    World.add(engine.world,balls);
}


function drawBalls(){
    fill(0,0,255);
    for (var i = 0; i < balls.length; i++){
        drawVerticles(balls[i].vertices);
    }
}

function setupWalls(){
    var wall1 = Bodies.rectangle(450,580,900,10,{isStatic:true});
    var wall2 = Bodies.rectangle(450,10,900,10,{isStatic:true});
    var wall3 = Bodies.rectangle(10,150,10,900,{isStatic:true});
    var wall4 = Bodies.rectangle(790,150,10,900,{isStatic:true});
    
    walls.push(wall1);
    walls.push(wall2);
    walls.push(wall3);
    walls.push(wall4);
    World.add(engine.world,{wall1,wall2,wall3,wall4});
    
}

function drawWalls(){
    fill(125);
    for (var i = 0; i < walls.length; i++){
        drawVerticles(walls[i].vertices);
    }
}

function generateCueBall(){
    cueBall = Bodies.circle(width/2-200,height/2,15,{restitution:1,friction:0.2})
    World.add(engine.world,[cueBall]);
}

function drawCueBall(){
    fill(255);
    drawVerticles(cueBall.vertices);
}

function drawForceLine(){
    stroke(255);
    line(mouseX,mouseY,cueBall.position.x, cueBall.position.y);
}

function mousePressed(){
    var force =  1000;
    var forceX = (cueBall.position.x-mouseX)/force;
    var forceY = (cueBall.position.y - mouseY)/force;
    var appliedForce = {x:forceX, y: forceY};
    print(forceX,forceY);
    Body.applyForce(cueBall,{x:cueBall.position.x, y: cueBall.position.y},appliedForce);
    
}

function drawVerticles(verticles) {
    beginShape();
    for (var i = 0; i < verticles.length;i++){
        vertex(verticles[i].x, verticles[i].y);
    }
    
    endShape(CLOSE);
}

function generatePockets() {
    var pocket1 = Bodies.circle(width / 2 - 150, height / 2 - 150, 10, { isStatic: true });
    var pocket2 = Bodies.circle(width / 2 + 150, height / 2 - 150, 10, { isStatic: true });
    var pocket3 = Bodies.circle(width / 2 + 150, height / 2 + 150, 10, { isStatic: true });
    var pocket4 = Bodies.circle(width / 2 - 150, height / 2 + 150, 10, { isStatic: true });
    var pocket5 = Bodies.circle(width/2 - 150, height / 2 + 150, 10, {isStatic:true});
    var pocket6 = Bodies.circle(width/2 - 150, height / 2 + 150, 10, {isStatic:true});
     

    World.add(engine.world, {pocket1, pocket2, pocket3, pocket4, pocket5,pocket6});
}

function drawPockets() {
    fill(0, 0, 0);
    for (var i = 0; i < 4; i++) {
        ellipse(walls[i].position.x, walls[i].position.y, 10 * 2, 10 * 2);
    }
}
