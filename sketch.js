var x, y;
var gSlider, fVal;
var strokeColor, database;
var colours,
  red1,
  black1,
  white1;

var drawing = [];
var db_drawing = [];

function setup() {
    createCanvas(800,800);
    background(255);

    database = firebase.database();
  
    strokeColor = "black";
  
    red1 = createButton("red");
    red1.position(400, 790);

    black1 = createButton("black");
    black1.position(470, 790);

    white1 = createButton("ERASER");
    white1.position(530, 790);

    gSlider = createSlider(x,y)
    gSlider.position(375, 750);
    readData();
}

function mouseDragged() {
    var point = {
      x: mouseX,
      y: mouseY,
      x1: pmouseX,
      y1: pmouseY,
      stroke_weight: fVal,
      stroke_color: strokeColor,
    };
    drawing.push(point);
    var drawingRef = database.ref("drawing");
    drawingRef.set({
      d: drawing,
    })
  }

function draw() {

    x = mouseX;
    y = mouseY;

    fVal = gSlider.value();
  
    white1.mousePressed(() => {
        strokeColor = "white";
    });
      
    red1.mousePressed(() => {
        strokeColor = "red";
    });
      
    black1.mousePressed(() => {
        strokeColor = "black";
    });
    
  if (mouseIsPressed && mouseY < 600) {
        stroke(0);
        stroke(strokeColor);
        strokeWeight(fVal);
        line(x, y, pmouseX, pmouseY);
   }
  

}

function readData() {
    var query = database.ref("drawing/").on("value", (data) => {
      db_drawing = data.val().d;
    });
  }
  
  function clearDrawing() {
    db_drawing = [];
    var drawingRef = database.ref("drawing");
    drawingRef.set({
      d: [],
    });
  }
  

