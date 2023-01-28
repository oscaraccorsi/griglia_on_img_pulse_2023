let baseUrlPictures = ' https://oscaraccorsi.github.io/tartan/';
let time = 0,
  height = window.innerHeight,
  width = window.innerWidth;

let img; 
let pictureList = ['tartan01.jpeg', 
                   'tartan02.jpeg', 
                   'tartan03.jpeg', 
                   'tartan04.jpg',
                   'tartan05.jpeg', 
                   'tartan06.jpg', 
                   'tartan07.jpg',  
                   'tartan08.jpeg', 
                   'tartan09.jpg', 
                   'tartan10.jpeg', 
                   'tartan11.jpg',
                   'tartan12.png'];

let spaceArray = [8, 13, 21, 34];
let space, h;
let zoomArray = [0, 10, 20, 30, 50, 80, 130];
let zoom;
let framerateVar;
let u = 0;

//----------------------------------------------------
function preload() {
  h = minute()%12;
  img = loadImage(baseUrlPictures +
                  pictureList[h]);
  img.resize(200, 0);
  img.loadPixels();
}

//----------------------------------------------------WINDOW RESIZED
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//----------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight); 
  noiseSeed(1);
  rectMode(CENTER);
  framerateVar = round(random(1, 10));
  
  setInterval(reloadPage, 1000*30);
  setInterval(changeZoom, 1000*10);
  ellipseMode(CENTER);
  space = random(spaceArray);
  zoom = random(zoomArray);
  console.log(zoom);
}

//----------------------------------------------------DRAW
function draw() {
  frameRate(framerateVar);
  noFill();
  background(10);
  //image(img, 0, 0);
  //noStroke();
 strokeWeight(1);
  
  //let space = floor(map(mouseX, 0, width, 10, 30));
   boxOfDots(space, windowWidth , space, windowHeight, color);
  time += 0.05;  
}

function boxOfDots(x_start, x_width, y_start, y_width) {
   for (let i=x_start; i < x_width; i += space ) {
     for (let j=y_start; j < y_width; j += space) {
    
        let imgX = map(i, 0, width, zoom, img.width-zoom);
        let imgY = map(j, 0, height, zoom, img.height-zoom);

        let c = img.get(imgX, imgY);
      

        stroke(c);
        square(i, j, map(noise(i, j, time), 0, 1, 0, 15));
       
     }
   }
  zoom += round(random(-1, 1));
}
//----------------------------------reLoad
function reloadPage() {
   window.location.reload();
}

function changeZoom() {
  zoom = random(zoomArray);
  framerateVar = round(random(1, 10));
}
//--------------------------------mousePressed
function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
//--------------------------------space bar
function keyPressed() {
   if (keyCode === 32 ) {
    reloadPage(); 
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
function reloadPage() {
   window.location.reload();
}
