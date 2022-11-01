video = "";
status = "";
object_list = [];

function preload(){
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects....";
}

function draw(){
    image(video,0,0,500,400);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i <= object_list.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "Number of Objects Detected : " + object_list.length;
            noFill();
            rect(object_list[i].x, object_list[i].y, object_list[i].width, object_list[i].height);
            stroke("red");
            strokeWeight(2);
            percentage = floor(object_list[i].confidence*100);
            text(object_list[i].label + percentage);
        }
    }
}

function modelLoaded(){
    console.log("Model Is Loaded");
    video.loop();
    video.speed(1);
    video.volume(0);
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object_list = results;
    }
}