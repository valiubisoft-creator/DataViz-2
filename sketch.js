let allFlowers = []; //empty array to hold the flowers

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 100);

    // creating 20 flowers at random locations
    for(let i=0; i < 15; i++){
        createFlower(random(50,750), random(50,750));
    }
}

function draw() {
    background(5, 0, 0);

    // draw the flowers by calling the drawFlowers function
    for(let i=0; i < allFlowers.length; i++){
        drawFlower(allFlowers[i]);
    }
}

// create a flower function to store values in the array
function createFlower(x, y) {
    let flowerObject = {
        x,
        y,
        numPetals:floor(random(5, 10)),
        petalLength:random(15,75),
        curveIntensity:random(5,15),
        col:color(random(100), random(60,100), random(60,100), 70),
        baseCol: color(random(100), random(60,100), random(60,100)),
        tipCol: color(random(100), random(60,100), random(60,100)),
        noiseOffset: random(50,200),
        rhythm: random(0.01,0.025)
    };
    allFlowers.push(flowerObject);
}

// draw a flower function
function drawFlower(f){

    // hover scale: lerp between 1.0 and 1.4 based on mouse proximity
    let d = dist(mouseX, mouseY, f.x, f.y);
    let threshold = 50;
    let hoverScale;
    if (d < threshold) {
        let factor = map(d, 0, threshold, 1, 0);
        hoverScale = lerp(1.0, 1.4, factor);
    } else {
        hoverScale = 1.0;
    }

    // a push function to wrap the petal drawing and rotation
    push();
    // position the flower where the x,y coordinates are declared and fill them with colour
    translate(f.x, f.y);
    scale(hoverScale);
    let sway = map(noise(f.noiseOffset + frameCount * f.rhythm),0,1,-0.35,0.35);
    rotate(sway);
    fill(f.col);
    noStroke();

    // rotate and draw each petal around the flower centre
    for(let i=0; i < f.numPetals; i++){
        push();
        rotate((TWO_PI / f.numPetals) * i);

        // adding a gradient from the base color to the tip colour and adding slices for the gradient
        for(let j=0; j < f.petalLength; j++){
            let t = j/f.petalLength;
            let y = -j;
            let w = sin(t * PI) * f.curveIntensity;
            let gradCol = lerpColor(f.baseCol, f.tipCol, t);
            fill(gradCol);
            ellipse(0, y, w, 2);
        }

        pop();
    }

    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
