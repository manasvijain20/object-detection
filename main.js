img = ""
objects = [];
status = "";
function setup(){
   canvas = createCanvas(360,380);
    canvas.position(460,140);
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    imageDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}
function modelLoaded(){
  console.log("model is loaded");
  status = true;
 // imageDetector.detect(video, gotResult);
}

function gotResult(error, results){
  if (error){
    console.log("Error is there");
  }
  else{
    console.log(results);
    objects = results;
  }
}

function draw(){
  image(video,0,0,380,380);
  imageDetector.detect(video, gotResult);
  if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255)
    for(i=0; i<objects.length; i++){
      document.getElementById("status").innerHTML = "Status : Object detected";
      document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length;
      fill(r,g,b);
      percent = floor(objects[i].confidence*100);
      text(objects[i].label+" " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  } 
  else{
    document.getElementById("status").innerHTML="Status : Object not detected";
  }
}
function preload(){
    img = loadImage("test10.jpg");
}

