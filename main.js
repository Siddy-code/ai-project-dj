song1 = "";
song2 = "";

function preload() {
    song1 = loadSound("johnny.mp3");
    song2 = loadSound("row row.mp3");

}
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
song1status = "";
song2status = "";


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is initiated');

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX=" + rightWristX + "rightWristY" + rightWristY);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;


    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("blue");
    stroke("blue");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        song1.play();
        document.getElementById("song").innerHTML="playing-johnny johnny yes papa";

    }
if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        song2.play();
        document.getElementById("song").innerHTML="playing-row row row your boat";
        
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function stop() {
    song1.stop();
    song2.stop();

}