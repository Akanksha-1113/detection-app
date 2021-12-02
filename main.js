img = "";
status = "";
objectDetector = "";
objects = [];

function preload() {
    img = loadImage('https://media.istockphoto.com/photos/aerial-view-of-cars-in-traffic-picture-id159406920?k=20&m=159406920&s=612x612&w=0&h=Td8cfJU5jLDvz1hAlxQqxcThWKrNVq4RTnm69o4Cbxc=');
}

function modeLoaded() {
    console.log("Model Loaded")
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    }
    console.log(results);
    objects = results;
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modeLoaded);
    document.getElementById("status").innerHTML = "Status : detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : object detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+ " " + percent + "%", objects[i].x + 15,objects[i].y +15 )
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}