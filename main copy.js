img = "";
stats = null;
object = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    img = "pen.jpg";
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 380, 380);

    if (stats != null) {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        objectDetector.detect(img, gotResult)
        for (var i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("num_obj").innerHTML = "Number of abjects are : " + object.length;

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}

function modelLoaded() {
    console.log("Model loaded");
    stats = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}