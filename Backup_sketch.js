let oH, oS, oB; // original HSB
let tempHue;
let col1, col2, col3;

function setup() {
  createCanvas(640,960);
  colorMode(HSB);
  strokeWeight(3);
  stroke(0,0,15);
  textAlign(CENTER);

  oH = 60;
  oS = 40;
  oB = 100;

  col1 = 120;
  col2 = 320; // this will basically never change until I resize this app
  col3 = col2 - col1 + col2;
}

function draw() {
  // Background
  fill(0,0,25);
  rect(0,0,640,960);

  // title
  /*fill(0,0,90);
  textSize(72);
  text('SW@CHES', 320, 150);*/

  // Original Color
  fill(oH,oS,oB);
  textSize(42);
  text('Original Color', col2, 120);
  ellipse(col2,220,120,120);

  // Hue Ratio I
  rotateHueCW(oH); // change the temp hue to Hue degrees + 61.8034 (golden ratio) -- clockwise
  textSize(24);
  fill(0,0,90);
  text('Golden Ratio', col1, 400);
  text('Counter-Clockwise', col1, 425);
  // Generate Swatches
  textSize(24);
  highlight(col1); // generate highlight swatch at column 1
  accentGray(col1); // generate accent gray swatch at column 1
  shadow(col1); // generate shadow swatch at column 1

  // Complementary
  rotateHue180(oH); // change the temp hue to Hue degrees - 61.8034 (golden ratio) -- counter-clockwise
  textSize(24);
  fill(0,0,90);
  text('Complementary', col2, 400);
  // Generate Swatches
  textSize(24);
  highlight(col2); // generate highlight swatch at column 1
  accentGray(col2); // generate accent gray swatch at column 1
  shadow(col2); // generate shadow swatch at column 1

  // Hue Ratio II
  rotateHueCCW(oH); // change the temp hue to Hue degrees - 61.8034 (golden ratio) -- counter-clockwise
  textSize(24);
  fill(0,0,90);
  text('Golden Ratio', col3, 425);
  // Generate Swatches
  textSize(24);
  highlight(col3); // generate highlight swatch at column 1
  accentGray(col3); // generate accent gray swatch at column 1
  shadow(col3); // generate shadow swatch at column 1
}

function rotateHueCW(myHue) {
  var temp = 360 * 0.618034;

  if (myHue + temp > 360){
    tempHue = myHue + temp - 360;
  }
  else {
    tempHue = myHue + temp;
  }
}

function rotateHueCCW(myHue) {
  var temp = 360 * 0.618034;

  if (myHue - temp < 0){
    tempHue = myHue - temp + 360;
  }
  else {
    tempHue = myHue - temp;
  }
}

function rotateHue180(myHue) {
  var temp = 360 * 0.5;

  if (myHue - temp < 0){
    tempHue = myHue - temp + 360;
  }
  else {
    tempHue = myHue - temp;
  }
}

function highlight(column) {
  fill(tempHue, (20 + oS) / 2.5, 100);
  ellipse(column, 550, 60, 60);
  fill(tempHue, (20 + oS) / 5, 100);
  text('Highlight', column, 490);
}

function accentGray(column) {
  fill(tempHue, oS / 5, 55);
  ellipse(column, 710, 60, 60);
  fill(tempHue, oS / 10, 85);
  text('Accent Gray', column, 650);
}

function shadow(column) {
  fill(tempHue, (10 + oS) / 7.5, 20);
  ellipse(column, 870, 60, 60);
  fill(tempHue, (10 + oS) / 15, 45);
  text('Shadow', column, 810);
}












// doink
