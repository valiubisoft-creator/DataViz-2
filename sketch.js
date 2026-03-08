let allFlowers = []; //empty array to hold the flowers

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 100);

    // creating 20 flowers and push them into my array
    for(let i=0; i < 15; i++){
        createFlower(random(50,750), random(50,750));
    }
}

function draw() {
    background(75, 20, 15);

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
        petalLength:random(5,50),
        curveIntensity:random(5,35),
        col:color(random(100), random(60,100), random(60,100), 70)
    };
    allFlowers.push(flowerObject);
}

// draw a flower function
function drawFlower(f){

    // a push function to wrap the petal drawing and rotation
    push();
    // position the flower where the x,y coordinates are declared and fill them with colour
    translate(f.x, f.y);
    fill(f.col);
    noStroke();

    // rotate and draw each petal around the flower centre
    for(let i=0; i < f.numPetals; i++){
        push();
        rotate((TWO_PI / f.numPetals) * i);

        beginShape();
            vertex(0, 0);                                            // base anchor
            bezierVertex(-f.curveIntensity, -f.petalLength * 0.25); // cp1 — left lower
            bezierVertex(-f.curveIntensity, -f.petalLength * 0.75); // cp2 — left upper
            bezierVertex(0, -f.petalLength);                         // tip anchor
            bezierVertex(+f.curveIntensity, -f.petalLength * 0.75); // cp1 — right upper
            bezierVertex(+f.curveIntensity, -f.petalLength * 0.25); // cp2 — right lower
            bezierVertex(0, 0);                                      // back to base
        endShape();

        pop();
    }

    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
