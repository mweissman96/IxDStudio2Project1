let aH, aS, aB; // active HSB -- this is the active color (or "current color") swatch at the top, the big one.
let tempHue; // this is used to store the hue when it's rotated clockwise or counter-clockwise, or 180 degrees.
let col1, col2, col3; // the horizontal coordinates of where the 9 swatches appear.
let midColA, midColB; // between column 1 and 2, and between 2 and 3, with double-weight toward the non-middle column
let row1, row2, row3; // the vertical coordinates of where the 9 swatches appear.  the accompanying text above them is relative to the row value
let ccwH, ccwA, ccwS, cH, cA, cS, cwH, cwA, cwS; // these are the colors of the 9 swatch options.  counter-clockwise highlight, ccw accent, ccw shadow, complementary highlight, c accent, c shadow, clockwise highlight, cw accent, and cw shadow

let swatch1, swatch2, swatch3, swatch4; // swatches chosen by the user

let textColor; // the color of all text.  this should change with the theme
let strokeColor; // the color of the stroke.  this should change with the theme
let backgroundColor; // the color of the background.  this should change with the theme.  gradients will just sit on top of this

let whatScreen; // what screen are we on?  0 = intro screen, 1 = suggestion screen, 2 = explore screen.

function setup() {
  createCanvas(640,960);
  colorMode(HSB);
  strokeColor = (0,0,12);
  stroke(strokeColor); // the color of the outlines
  textAlign(CENTER);

  aH = 220;
  aS = 80;
  aB = 100;

  col1 = 120;
  col2 = 320; // this will basically never change until I resize this app
  col3 = col2 - col1 + col2;

  midColA = (col1 + col1 + col2) / 3;
  midColB = (col2 + col3 + col3) / 3;

  row1 = 570;
  row2 = 730;
  row3 = 890;

  textColor = (0, 0, 90);

  whatScreen = 2;

  backgroundColor = color(0,0,23);

  swatch1 = backgroundColor;
  swatch2 = backgroundColor;
  swatch3 = backgroundColor;
  swatch4 = backgroundColor;
}

function draw() {
  if (whatScreen == 0) {
    introScreen();
  } else if (whatScreen == 1) {
    suggestionScreen();
  } else {
    exploreScreen();
  }
}


function introScreen() {
  // Background
  fill(backgroundColor);
  rect(0,0,640,960);

  // run this when the user switches from intro to explore
  swatch1 = color(aH, aS, aB);
  swatch2 = backgroundColor;
  swatch3 = backgroundColor;
  swatch4 = backgroundColor;
}

function exploreScreen() {
  // Background
  fill(backgroundColor);
  rect(0,0,640,960);

  // title
  /*fill(0,0,90);
  textSize(72);
  text('SW@CHES', 320, 150);*/

  // Current Color
  strokeWeight(5);
  fill(aH,aS,aB);
  ellipse(midColA,195,150,150);
  fill(textColor);
  textSize(48);
  text('Current Color', midColA, 80);
  strokeWeight(3);

  // current color details
  let tempColor = color(aH,aS,aB);
  textSize(20);
  text('RGB: ' + round(red(tempColor)) + ', ' + round(green(tempColor)) + ', ' + round(blue(tempColor)), midColA, 324);
  text('Hex: #' + hex(round(red(tempColor)), 2) + hex(round(green(tempColor)), 2) + hex(round(blue(tempColor)), 2), midColA, 350);


  // user swatches
  textSize(24);
  text('Your Swatches', midColB, 135);
  text('+', midColB - 75, 200);
  text('+', midColB - 75, 280);
  text('+', midColB + 25, 200);
  text('+', midColB + 25, 280);
  textSize(16);
  text('#' + hex(round(red(swatch1)), 2) + hex(round(green(swatch1)), 2) + hex(round(blue(swatch1)), 2), midColB - 40, 230);
  text('#' + hex(round(red(swatch2)), 2) + hex(round(green(swatch2)), 2) + hex(round(blue(swatch2)), 2), midColB - 40, 310);
  text('#' + hex(round(red(swatch3)), 2) + hex(round(green(swatch3)), 2) + hex(round(blue(swatch3)), 2), midColB + 60, 230);
  text('#' + hex(round(red(swatch4)), 2) + hex(round(green(swatch4)), 2) + hex(round(blue(swatch4)), 2), midColB + 60, 310);
  strokeWeight(2);
  fill(swatch1);
  ellipse(midColB - 40, 192, 40, 40);
  fill(swatch2);
  ellipse(midColB - 40, 272, 40, 40);
  fill(swatch3);
  ellipse(midColB + 60, 192, 40, 40);
  fill(swatch4);
  ellipse(midColB + 60, 272, 40, 40);

  strokeWeight(3);
  fill(textColor);
  textSize(30);
  text('_________________________________', col2, 380);

  // Hue Ratio I
  rotateHueCW(aH); // change the temp hue to Hue degrees + 61.8034 (golden ratio) -- clockwise
  fill(textColor);
  textSize(23);
  text('Golden Ratio', col1, 435);
  textSize(15);
  text('Counter-Clockwise', col1, 455);
  // Generate Swatches
  textSize(24);
  highlight(col1); // generate highlight swatch at column 1
  accentGray(col1); // generate accent gray swatch at column 1
  shadow(col1); // generate shadow swatch at column 1

  // Complementary
  rotateHue180(aH); // change the temp hue to Hue degrees - 61.8034 (golden ratio) -- counter-clockwise
  fill(textColor);
  textSize(23);
  text('Complementary', col2, 435);
  // Generate Swatches
  textSize(24);
  highlight(col2); // generate highlight swatch at column 1
  accentGray(col2); // generate accent gray swatch at column 1
  shadow(col2); // generate shadow swatch at column 1

  // Hue Ratio II
  rotateHueCCW(aH); // change the temp hue to Hue degrees - 61.8034 (golden ratio) -- counter-clockwise
  fill(textColor);
  textSize(23);
  text('Golden Ratio', col3, 435);
  textSize(15);
  text('Clockwise', col3, 455);
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
  fill(textColor);
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
  fill(textColor);
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
  fill(textColor);
  text('Shadow', column, row3 - 60);
}


function mouseClicked() {
  if (whatScreen == 0) {

  } else if (whatScreen == 1) {

  } else {
    // upper left
    if (dist(mouseX, mouseY, col1, row1) <= 30) {
      aH = hue(ccwH);
      aS = saturation(ccwH);
      aB = brightness(ccwH);
    }

    // middle left
    if (dist(mouseX, mouseY, col1, row2) <= 30) {
      aH = hue(ccwA);
      aS = saturation(ccwA);
      aB = brightness(ccwA);
    }

    // bottom left
    if (dist(mouseX, mouseY, col1, row3) <= 30) {
      aH = hue(ccwS);
      aS = saturation(ccwS);
      aB = brightness(ccwS);
    }


    // upper center
    if (dist(mouseX, mouseY, col2, row1) <= 30) {
      aH = hue(cH);
      aS = saturation(cH);
      aB = brightness(cH);
    }

    // middle center
    if (dist(mouseX, mouseY, col2, row2) <= 30) {
      aH = hue(cA);
      aS = saturation(cA);
      aB = brightness(cA);
    }

    // bottom center
    if (dist(mouseX, mouseY, col2, row3) <= 30) {
      aH = hue(cS);
      aS = saturation(cS);
      aB = brightness(cS);
    }


    // upper right
    if (dist(mouseX, mouseY, col3, row1) <= 30) {
      aH = hue(cwH);
      aS = saturation(cwH);
      aB = brightness(cwH);
    }

    // middle right
    if (dist(mouseX, mouseY, col3, row2) <= 30) {
      aH = hue(cwA);
      aS = saturation(cwA);
      aB = brightness(cwA);
    }

    // bottom right
    if (dist(mouseX, mouseY, col3, row3) <= 30) {
      aH = hue(cwS);
      aS = saturation(cwS);
      aB = brightness(cwS);
    }
  }
}


















// doink
