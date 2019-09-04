function setup() {
  createCanvas(600,600);
  noStroke();
}

function draw() {
  colorMode(HSB);
  fill(8,100,100);
  ellipse(200,200,50,50);
  fill(8,0,100);
  ellipse(200,200,33,33);
  fill(8,100,100);
  ellipse(200,200,16,16);
}
