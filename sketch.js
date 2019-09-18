let oH, oS, oB; // original HSB
let tempHue;
let col1, col2, col3;
let row1, row2, row3;

let ccwH, ccwA, ccwS, cH, cA, cS, cwH, cwA, cwS;

function setup() {
  createCanvas(640,960);
  colorMode(HSB);
  strokeWeight(3);
  stroke(0,0,15);
  textAlign(CENTER);

  oH = 70;
  oS = 60;
  oB = 35;

  col1 = 120;
  col2 = 320; // this will basically never change until I resize this app
  col3 = col2 - col1 + col2;

  row1 = 550;
  row2 = 710;
  row3 = 870;
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
  textSize(48);
  text('Original Color', col2, 100);
  ellipse(col2,220,150,150);

  let tempColor = color(oH,oS,oB);
  textSize(20);
  text('RGB: ' + round(red(tempColor)) + ', ' + round(green(tempColor)) + ', ' + round(blue(tempColor)), col2, 329);
  text('Hex: #' + hex(round(red(tempColor)), 2) + hex(round(green(tempColor)), 2) + hex(round(blue(tempColor)), 2), col2, 355);

  // Hue Ratio I
  rotateHueCW(oH); // change the temp hue to Hue degrees + 61.8034 (golden ratio) -- clockwise
  fill(0,0,90);
  textSize(23);
  text('Golden Ratio', col1, 410);
  textSize(15);
  text('Counter-Clockwise', col1, 430);
  // Generate Swatches
  textSize(24);
  highlight(col1); // generate highlight swatch at column 1
  accentGray(col1); // generate accent gray swatch at column 1
  shadow(col1); // generate shadow swatch at column 1

  // Complementary
  rotateHue180(oH); // change the temp hue to Hue degrees - 61.8034 (golden ratio) -- counter-clockwise
  fill(0,0,90);
  textSize(23);
  text('Complementary', col2, 410);
  // Generate Swatches
  textSize(24);
  highlight(col2); // generate highlight swatch at column 1
  accentGray(col2); // generate accent gray swatch at column 1
  shadow(col2); // generate shadow swatch at column 1

  // Hue Ratio II
  rotateHueCCW(oH); // change the temp hue to Hue degrees - 61.8034 (golden ratio) -- counter-clockwise
  fill(0,0,90);
  textSize(23);
  text('Golden Ratio', col3, 410);
  textSize(15);
  text('Clockwise', col3, 430);
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
  if (column == col1) {
    ccwH = color(tempHue, 48, 100);
  }
  else if (column == col2) {
    cH = color(tempHue, 48, 100);
  }
  else {
    cwH = color(tempHue, 48, 100);
  }

  fill(tempHue, 48, 100);
  ellipse(column, row1, 60, 60);
  fill(tempHue, 24, 100);
  text('Highlight', column, row1 - 60);
}

function accentGray(column) {
  if (column == col1) {
    ccwA = color(tempHue, 20, 55);
  }
  else if (column == col2) {
    cA = color(tempHue, 20, 55);
  }
  else {
    cwA = color(tempHue, 20, 55);
  }

  fill(tempHue, 20, 55);
  ellipse(column, row2, 60, 60);
  fill(tempHue, 10, 85);
  text('Accent Gray', column, row2 - 60);
}

function shadow(column) {
  if (column == col1) {
    ccwS = color(tempHue, 24, 25);
  }
  else if (column == col2) {
    cS = color(tempHue, 24, 25);
  }
  else {
    cwS = color(tempHue, 24, 25);
  }

  fill(tempHue, 24, 25);
  ellipse(column, row3, 60, 60);
  fill(tempHue, 12, 45);
  text('Shadow', column, row3 - 60);
}


function mouseClicked() {
  // upper left
  if (dist(mouseX, mouseY, col1, row1) <= 30) {
    oH = hue(ccwH);
    oS = saturation(ccwH);
    oB = brightness(ccwH);
  }

  // middle left
  if (dist(mouseX, mouseY, col1, row2) <= 30) {
    oH = hue(ccwA);
    oS = saturation(ccwA);
    oB = brightness(ccwA);
  }

  // bottom left
  if (dist(mouseX, mouseY, col1, row3) <= 30) {
    oH = hue(ccwS);
    oS = saturation(ccwS);
    oB = brightness(ccwS);
  }


  // upper center
  if (dist(mouseX, mouseY, col2, row1) <= 30) {
    oH = hue(cH);
    oS = saturation(cH);
    oB = brightness(cH);
  }

  // middle center
  if (dist(mouseX, mouseY, col2, row2) <= 30) {
    oH = hue(cA);
    oS = saturation(cA);
    oB = brightness(cA);
  }

  // bottom center
  if (dist(mouseX, mouseY, col2, row3) <= 30) {
    oH = hue(cS);
    oS = saturation(cS);
    oB = brightness(cS);
  }


  // upper right
  if (dist(mouseX, mouseY, col3, row1) <= 30) {
    oH = hue(cwH);
    oS = saturation(cwH);
    oB = brightness(cwH);
  }

  // middle right
  if (dist(mouseX, mouseY, col3, row2) <= 30) {
    oH = hue(cwA);
    oS = saturation(cwA);
    oB = brightness(cwA);
  }

  // bottom right
  if (dist(mouseX, mouseY, col3, row3) <= 30) {
    oH = hue(cwS);
    oS = saturation(cwS);
    oB = brightness(cwS);
  }
}


















// doink
