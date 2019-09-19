let aH, aS, aB; // active HSB -- this is the active color (or "current color") swatch at the top, the big one.
let tempHue; // this is used to store the hue when it's rotated clockwise or counter-clockwise, or 180 degrees.
let col1, col2, col3; // the horizontal coordinates of where the 9 swatches appear.
let midColA, midColB; // between column 1 and 2, and between 2 and 3, with double-weight toward the non-middle column
let row1, row2, row3; // the vertical coordinates of where the 9 swatches appear.  the accompanying text above them is relative to the row value
let ccwH, ccwA, ccwS, cH, cA, cS, cwH, cwA, cwS; // these are the colors of the 9 swatch options.  counter-clockwise highlight, ccw accent, ccw shadow, complementary highlight, c accent, c shadow, clockwise highlight, cw accent, and cw shadow

let swatch1, swatch2, swatch3, swatch4; // swatches chosen by the user
let s12H, s34H; // swatch height

let textColor; // the color of all text.  this should change with the theme
let strokeColor; // the color of the stroke.  this should change with the theme
let backgroundColor; // the color of the background.  this should change with the theme.  gradients will just sit on top of this

let whatScreen; // what screen are we on?  0 = intro screen, 1 = suggestion screen, 2 = explore screen.

let roboto, playball;

let rSlider, gSlider, bSlider;


function preload() {
  roboto = loadFont('assets/Roboto-Regular.ttf');
  playball = loadFont('assets/Playball-Regular.ttf');
}

function setup() {
  createCanvas(640,960);
  colorMode(HSB);
  strokeColor = (0,0,12);
  stroke(strokeColor); // the color of the outlines
  textAlign(CENTER);

  // starting values of the Current Color (HSB -- actually it should be noted that all colors are in HSB unless specifically converted otherwise, temporarily
  aH = 0;
  aS = 0;
  aB = 100;

  // column height in the 3x3 grid of suggestions
  col1 = 120;
  col2 = 320; // this will basically never change until I resize this app
  col3 = col2 - col1 + col2;

  // these are column locations based relative to col1, col2, and col3.  these are not NECESSARILY exactly between two of those columns
  midColA = col1;
  midColB = (col2 + col3) / 2;

  // row height in the 3x3 grid of suggestions
  row1 = 570;
  row2 = 730;
  row3 = 890;

  textColor = (0, 0, 90);

  whatScreen = 0;

  backgroundColor = color(0,0,23);

  swatch1 = color(0, 0);
  swatch2 = color(0, 0);
  swatch3 = color(0, 0);
  swatch4 = color(0, 0);

  s12H = 174;
  s34H = 292;

  rSlider = createSlider(0, 255, 255);
  gSlider = createSlider(0, 255, 249);
  bSlider = createSlider(0, 255, 255);
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
  textFont(playball);

  strokeWeight(5);
  fill(textColor);
  textSize(80);
  text('SW@CHES', col2, 120);
  textFont(roboto);

  strokeWeight(3);
  textSize(20);
  text('Jonathan Sjelin', col2, 160);
  text('Matthew Weissman', col2, 185);

  // page-break barrier
  textSize(30);
  textFont('Arial');
  text('__________________________________', col2, 230);
  textFont(roboto);

  // lower page-break barrier
  textSize(30);
  textFont('Arial');
  text('__________________________________', col2, 850);
  textFont(roboto);

  // copyright nonsense
  strokeWeight(1.8);
  textSize(12);
  text("© 2019 Nobody.  Content is property of the developers, although I think now it's", col2, 900);
  text("technically property of the school?  I honestly don't know.  Sue me.  Wait don't--", col2, 920);

  rSlider.position(col2 - 67, 550);
  gSlider.position(col2 - 67, 625);
  bSlider.position(col2 - 67, 700);

  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();

  let chosenHex = '#' + hex(round(red(swatch4)), 2) + hex(round(green(swatch4)), 2) + hex(round(blue(swatch4)));
  aH = round(hue(chosenHex));
  aS = round(saturation(chosenHex));
  aB = round(brightness(chosenHex));

  // Your Color
  strokeWeight(5);
  fill(aH, aS, aB);
  ellipse(col2, 410, 150, 150);
  fill(textColor);
  textSize(42);
  text('Your Color:', col2, 300);
  // the actual color stuff
  /*fill(aH,aS,aB);
  ellipse((col1*2 + col2) / 3, 410, 150, 150);
  ellipse((col3*2 + col2) / 3, 410, 150, 150);
  rectMode(CENTER);
  rect(col2, 410, ((col3*2 + col2) / 3) - ((col1*2 + col2) / 3), 150);
  strokeWeight(0);
  ellipse((col1*2 + col2) / 3, 410, 145.01, 145.01);
  ellipse((col3*2 + col2) / 3, 410, 145.01, 145.01);
  rect(col2, 410, ((col3*2 + col2) / 3) - ((col1*2 + col2) / 3) + 6, 145);
  rectMode(CORNER);
  strokeWeight(3);*/
  // i don't like the rounded rectangle window

  /*  colorMode(RGB, 255, 255, 255);
    let tempColor = color(r, g, b);
    aH = round(hue(tempColor));
    text(round(hue(tempColor)), col2 - 30, 800);
    aS = round(saturation(tempColor));
    text(round(saturation(tempColor)), col2, 800);
    aB = round(brightness(tempColor));
    text(round(brightness(tempColor)), col2 + 30, 800);
    colorMode(HSL);*/


  // run this when the user switches from intro to explore
  swatch1 = color(aH, aS, aB);
  swatch2 = color(0,0,0,0);
  swatch3 = color(0,0,0,0);
  swatch4 = color(0,0,0,0);
}

function suggestionScreen() {

}

function exploreScreen() {
  // Background
  rSlider.position(col2, -200);
  gSlider.position(col2, -200);
  bSlider.position(col2, -200);

  fill(backgroundColor);
  rect(0,0,640,960);
  textFont(roboto);

  // title
  /*fill(0,0,90);
  textSize(72);
  text('SW@CHES', 320, 150);*/

  // Current Color
  strokeWeight(5);
  fill(aH,aS,aB);
  ellipse(midColA,195,150,150);
  fill(textColor);
  textSize(42);
  text('Current', midColA, 80);
  strokeWeight(3);

  // current color details
  let tempColor = color(aH,aS,aB);
  textSize(20);
  text('RGB: ' + round(red(tempColor)) + ', ' + round(green(tempColor)) + ', ' + round(blue(tempColor)), midColA, 324);
  text('Hex: #' + hex(round(red(tempColor)), 2) + hex(round(green(tempColor)), 2) + hex(round(blue(tempColor)), 2), midColA, 350);

  // user swatches
  textSize(42);
  strokeWeight(5);
  text('Your Swatches', midColB + 14, 80);
  strokeWeight(3);
  textSize(24);
  text('+', midColB - 112, s12H);
  text('+', midColB + 52, s12H);
  text('+', midColB - 112, s34H);
  text('+', midColB + 52, s34H);
  textSize(24);
  textFont('Arial');
  text('→', midColB - 17, s12H - 2.5);
  text('→', midColB + 147, s12H - 2.5);
  text('→', midColB - 17, s34H - 2.5);
  text('→', midColB + 147, s34H - 2.5);
  textFont(roboto);
  textSize(16);
  if (alpha(swatch1) != 0) {
    text('#' + hex(round(red(swatch1)), 2) + hex(round(green(swatch1)), 2) + hex(round(blue(swatch1)), 2), midColB - 67, s12H + 40);
  }
  if (alpha(swatch2) != 0) {
    text('#' + hex(round(red(swatch2)), 2) + hex(round(green(swatch2)), 2) + hex(round(blue(swatch2)), 2), midColB + 97, s12H + 40);
  }
  if (alpha(swatch3) != 0) {
    text('#' + hex(round(red(swatch3)), 2) + hex(round(green(swatch3)), 2) + hex(round(blue(swatch3)), 2), midColB - 67, s34H + 40);
  }
  if (alpha(swatch4) != 0) {
    text('#' + hex(round(red(swatch4)), 2) + hex(round(green(swatch4)), 2) + hex(round(blue(swatch4)), 2), midColB + 97, s34H + 40);
  }
  strokeWeight(2);
  fill(swatch1);
  ellipse(midColB - 67, s12H - 8, 50, 50);
  fill(swatch2);
  ellipse(midColB + 97, s12H - 8, 50, 50);
  fill(swatch3);
  ellipse(midColB - 67, s34H - 8, 50, 50);
  fill(swatch4);
  ellipse(midColB + 97, s34H - 8, 50, 50);

  // top-region barrier
  strokeWeight(1.43);
  fill(textColor);
  rect(((midColA + midColB) / 2) - 20, 43, 3.8, 320)
  // page-break barrier
  strokeWeight(3);
  textSize(30);
  textFont('Arial');
  text('__________________________________', col2, 380);

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
  ellipse(column, row1, 75, 75);
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
  ellipse(column, row2, 75, 75);
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
  ellipse(column, row3, 75, 75);
  fill(textColor);
  text('Shadow', column, row3 - 60);
}


function mouseClicked() {
  if (whatScreen == 0) {

  } else if (whatScreen == 1) {

  } else {
    // the four Swatches

    // the plus signs

    // swatch 1
    if (dist(mouseX, mouseY, midColB - 112, s12H - 8) <= 25) {
      swatch1 = color(aH, aS, aB);
    }

    // swatch 2
    if (dist(mouseX, mouseY, midColB + 52, s12H - 8) <= 25) {
      swatch2 = color(aH, aS, aB);
    }

    // swatch 3
    if (dist(mouseX, mouseY, midColB - 112, s34H - 8) <= 25) {
      swatch3 = color(aH, aS, aB);
    }

    // swatch 4
    if (dist(mouseX, mouseY, midColB + 52, s34H - 8) <= 25) {
      swatch4 = color(aH, aS, aB);
    }

    // the Find button

    // swatch 1
    if (dist(mouseX, mouseY, midColB - 17, s12H - 8) <= 25) {
      aH = hue(swatch1);
      aS = saturation(swatch1);
      aB = brightness(swatch1);
    }

    // swatch 2
    if (dist(mouseX, mouseY, midColB + 147, s12H - 8) <= 25) {
      aH = hue(swatch2);
      aS = saturation(swatch2);
      aB = brightness(swatch2);
    }

    // swatch 3
    if (dist(mouseX, mouseY, midColB - 17, s34H - 8) <= 25) {
      aH = hue(swatch3);
      aS = saturation(swatch3);
      aB = brightness(swatch3);
    }

    // swatch 4
    if (dist(mouseX, mouseY, midColB + 147, s34H - 8) <= 25) {
      aH = hue(swatch4);
      aS = saturation(swatch4);
      aB = brightness(swatch4);
    }

    // ----------------

    // the suggestions

    // the nine options

    // upper left
    if (dist(mouseX, mouseY, col1, row1) <= 37.5) {
      aH = hue(ccwH);
      aS = saturation(ccwH);
      aB = brightness(ccwH);
    }

    // middle left
    if (dist(mouseX, mouseY, col1, row2) <= 37.5) {
      aH = hue(ccwA);
      aS = saturation(ccwA);
      aB = brightness(ccwA);
    }

    // bottom left
    if (dist(mouseX, mouseY, col1, row3) <= 37.5) {
      aH = hue(ccwS);
      aS = saturation(ccwS);
      aB = brightness(ccwS);
    }


    // upper center
    if (dist(mouseX, mouseY, col2, row1) <= 37.5) {
      aH = hue(cH);
      aS = saturation(cH);
      aB = brightness(cH);
    }

    // middle center
    if (dist(mouseX, mouseY, col2, row2) <= 37.5) {
      aH = hue(cA);
      aS = saturation(cA);
      aB = brightness(cA);
    }

    // bottom center
    if (dist(mouseX, mouseY, col2, row3) <= 37.5) {
      aH = hue(cS);
      aS = saturation(cS);
      aB = brightness(cS);
    }


    // upper right
    if (dist(mouseX, mouseY, col3, row1) <= 37.5) {
      aH = hue(cwH);
      aS = saturation(cwH);
      aB = brightness(cwH);
    }

    // middle right
    if (dist(mouseX, mouseY, col3, row2) <= 37.5) {
      aH = hue(cwA);
      aS = saturation(cwA);
      aB = brightness(cwA);
    }

    // bottom right
    if (dist(mouseX, mouseY, col3, row3) <= 37.5) {
      aH = hue(cwS);
      aS = saturation(cwS);
      aB = brightness(cwS);
    }
  }
}
