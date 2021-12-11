image1 = "";
statusofmodel = "";
newresults = [];
alertsound = ""

function preload() {
   image1 = loadImage('living room.jpg');
   alertsound = loadSound('alarm.mp3');
}

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Model Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Cocossd has been initialized");
    statusofmodel = true;
    
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
        console.log("Error occured.");
    }
        console.log(results);
        console.log("Results sent!");
        newresults = results;
    }

function draw() {
  image(video, 0, 0, 640, 420);
    
   if(statusofmodel != "") {
    objectDetector.detect(video, gotResults);
    //console.log(newresults.length()); 
    for(i=0;i<newresults.length;i++) {
     document.getElementById("status").innerHTML = "Model Status: Objects Detected";
        if(newresults[i].label = "person") {
            document.getElementById("status").innerHTML = "Model Status: Baby Detected";
            alertsound.stop();
            fill("#FF0000");
        percentage = floor(newresults[i].confidence * 100);
        text(newresults[i].label + " " + percentage + "%", newresults[i].x, newresults[i].y);
        noFill();
        stroke("#FF0000");
        rect(newresults[i].x, newresults[i].y, newresults[i].width, newresults[i].height);
        }
        else {
          document.getElementById("status").innerHTML = "Model Status: Baby Not Detected";
          alertsound.play();
          console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEfffffffffffffffffffffffffffffffffffff")
        }
        
      }
    }
}
 


