"use strict";

var vehicles = [];
var food = [];
var poison = [];

var borders = [
	new Border([ 800, 0, 720, 210 ]),
  new Border([ 720, 210, 740, 330 ]),
  new Border([ 740, 330, 830, 450 ]),
  new Border([ 830, 450, 760, 470 ]),
  new Border([ 760, 470, 680, 550 ]), 
  new Border([ 680, 550, 680, 640 ]),
  new Border([ 680, 640, 580, 720 ]),
	new Border([ 580, 720, 500, 810 ]),
	new Border([ 500, 810, 460, 820 ]),
	new Border([ 460, 820, 450, 720 ]),
	new Border([ 450, 720, 460, 630 ]),
	new Border([ 460, 630, 560, 525 ]),
	new Border([ 560, 525, 508, 480 ]),
	new Border([ 508, 480, 420, 570 ]),
	new Border([ 420, 570, 400, 620 ]),
  new Border([ 400, 620, 420, 670 ]),
  new Border([ 420, 670, 400, 700 ]),
  new Border([ 400, 700, 365, 640 ]),
  new Border([ 365, 640, 300, 640 ]),
  new Border([ 300, 640, 225, 680 ]),
  new Border([ 225, 680, 200, 730 ]),
  new Border([ 200, 730, 200, 770 ]),
  new Border([ 200, 770, 220, 800 ]),
  new Border([ 220, 800, 190, 900 ]),
  new Border([ 90, 900, 78, 769 ]),
  new Border([ 78, 769, 130, 760 ]),
  new Border([ 130, 760, 80, 715 ]),
  new Border([ 80, 715, 0, 730 ]),

];

var debug;

function setup() {
  createCanvas(900, 900);

  // create vehicles on canvas
  for (var i = 0; i < 0; i++) {
    x = random(width);
    y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }

  // make food on canvas
  for (var i = 0; i < 0; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  
  //foodの位置指定
  //東京
  var x = 475;
  var y = 441;
  food.push(createVector(x, y));
  //千葉
  var x = 570;
  var y = 500;
  food.push(createVector(x, y));
  //木更津
  var x = 485;
  var y = 635;
  food.push(createVector(x, y));
　//横浜
  var x = 430;
  var y = 540;
  food.push(createVector(x, y));
  //横須賀
  var x = 405;
  var y = 670;
  food.push(createVector(x, y));
  //鎌倉
  var x = 330;
  var y = 630;
  food.push(createVector(x, y));
  //小田原
  var x = 220;
  var y = 670;
  food.push(createVector(x, y));
  //安房
  var x = 480;
  var y = 780;
  food.push(createVector(x, y));
  //成田
  var x = 660;
  var y = 480;
  food.push(createVector(x, y));
  //銚子
  var x = 790;
  var y = 440;
  food.push(createVector(x, y));
  //水戸
  var x = 720;
  var y = 160;
  food.push(createVector(x, y));
  //鹿島
  var x = 711;
  var y = 300;
  food.push(createVector(x, y));
　//相模原
  var x = 300;
  var y = 460;
  food.push(createVector(x, y));
  //大宮
  var x = 420;
  var y = 360;
  food.push(createVector(x, y));
  //宇都宮
  var x = 450;
  var y = 130;
  food.push(createVector(x, y));
  //高崎
  var x = 200;
  var y = 170;
  food.push(createVector(x, y));
  //市原
  var x = 650;
  var y = 630;
  food.push(createVector(x, y));
  //日立
  var x = 750;
  var y = 60;
  food.push(createVector(x, y));
  
  // make poison on canvas
  for (var i = 0; i < 0; i++) {
    var x1= random(width);
    var y1= random(height);
    var x2 = random(width);
    var y2 = random(height);
    poison.push(createVector(x1, y1, x2, y2));
  }
  
  debug = createCheckbox();
}

// add more vehicles on canvas　クリックで増やす奴(Pressedも可)
function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

/**
 * DRAW FUNCTION
 **/
function draw() {
  background(31, 20, 82);
  fill(color(255, 0, 0));
  
  
  
  // foodをcanvasに描く
  fill(0, 255, 0);
  noStroke();
  for (let i = 0; i < food.length; i++) {
    ellipse(food[i].x, food[i].y, 7, 7);
  }
  
  // poisonをcanvasに描く
  noFill();
  stroke(255, 0, 0);
  for (let border of borders) {
  border.draw();
  }
  
  noFill();
  noStroke();
  
  // forを逆ループにするのは、dead時にspliceするときに起こるエラーを回避するため
  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison); // eatした時の行動
    vehicles[i].update();
    vehicles[i].display();

    // 条件が合えばcloneを生成
    //var newVehicle = vehicles[i].clone();
    //if (newVehicle != null) {
    //  vehicles.push(newVehicle);
    //}

    // deadだったらspliceする
    if (vehicles[i].dead()) {
      var x = vehicles[i].position.x;
      var y = vehicles[i].position.y;
      food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }
  }
}
