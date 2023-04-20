//Pitch Detection
let model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe'
let pitch;
let audioContext;
let mic;
let freq = 0;

//Visual
let Y_AXIS = 1;
let X_AXIS = 2;
let h, s, b, h1, s1, b1;
let stringTone;
let stringName;
const wynikiDiv = document.getElementById("show");
.tejdghjdghjdgh
function setup() {
  createCanvas(500, 550);
  //console.log(ml5.version);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);

  //frameRate(1000);

  textFont('futura');
  colorMode(HSB);
  noStroke();
  ellipseMode(RADIUS);

//   let linka = createA('https://editor.p5js.org/michellu0929/present/0Nn0WU2Ep', 'PLAY THE SNAKE GAME');
  //linka.position(400, 550);
}

function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    if (frequency) {
      freq = frequency;
    }

  }
  pitch.getPitch(gotPitch);
}

function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

function draw() {
  background(0);
  stroke(330, 100, 100);
  strokeWeight(2)
  noFill();

  lines();

  noStroke();

  let diff = freq - stringTone;
  //let amt = map(abs(diff), -200, 200, 0, 1);

  rc = map(abs(diff), -10, 10, -60, 60);


  rc = rc;
  fill(h + rc, s, b);
  ellipse(width / 2, height / 2 - 80, 150, 150);


  circleGradient(width / 2, height / 2 - 80);

  textAlign(CENTER, CENTER);
  fill(255);
  //textSize(16);
  //text(freq.toFixed(2), width/2, height-80);
  textSize(36);
  //fill(h-5,100,80,0.4);
  //text(stringName, width/2, height/2);
  textSize(18);
  console.log(freq);
  wynikiDiv.innerHTML = freq;


  if (diff <= 2 && diff >= -2) {

    fill('white');
    textAlign(CENTER, CENTER);
    text('PERFECTO!', width / 2, height - 180);
  } else if (diff < -2) {

    fill(h, 95, 95);
    textAlign(CENTER, CENTER);
    text('TOO LOW!', width / 2, height - 180);
  } else if (diff > 2) {

    fill(h, 95, 95);
    textAlign(CENTER, CENTER);
    text('TOO HIGH!', width / 2, height - 180);
  }

}


function lines() {

  let lineS = 400;
  let lineE = 500;
  let lineX = 128;
  let lineDist = 50;

  for (var i = lineX; i <= lineX + 250; i += lineDist) {
    line(i, lineS, i, lineE);
    ellipse(i, lineS, 2, 2);
    ellipse(i, lineE, 2, 2);
    if (i == lineX) {
      stroke(180, 100, 100);
    } else if (i == lineX + 50) {
      stroke(60, 100, 100);
    } else if (i == lineX + 100) {
      stroke(270, 100, 100);
    } else if (i == lineX + 150) {
      stroke(150, 100, 100);
    } else if (i == lineX + 200) {
      stroke(300, 100, 100);
    }
  }

  if (mouseIsPressed) {
    if (mouseY <= lineE && mouseY >= lineS) {

      if (mouseX >= lineX - 5 && mouseX <= lineX + 5) {

        h = 330;
        s = 100;
        b = 100;
        stringTone = 82.41;
        stringName = 'E2';

      } else if (mouseX >= lineX + lineDist - 5 && mouseX <= lineX + lineDist + 5) {

        h = 180;
        s = 100;
        b = 100;
        stringTone = 110.00;
        stringName = 'A2';
      } else if (mouseX >= lineX + 100 - 5 && mouseX <= lineX + 100 + 5) {

        h = 60;
        s = 100;
        b = 100;
        stringTone = 146.83;
        stringName = 'D3';
      } else if (mouseX >= lineX + 150 - 5 && mouseX <= lineX + 150 + 5) {

        h = 270;
        s = 100;
        b = 100;
        stringTone = 196.00;
        stringName = 'G3';
      } else if (mouseX >= lineX + 200 - 5 && mouseX <= lineX + 200 + 5) {

        h = 150;
        s = 100;
        b = 100;
        stringTone = 246.94;
        stringName = 'B3';
      } else if (mouseX >= lineX + 250 - 5 && mouseX <= lineX + 250 + 5) {

        h = 300;
        s = 100;
        b = 100;
        stringTone = 329.63;
        stringName = 'E4';
      }
    }
  }


}

function circleGradient(x, y) {
  let radius = 150;
  //let g = random(0, 360);
  for (let r = 0; r < radius; ++r) {
    // Scale the mouseX value from 0 to 720 to a range between 0 and 175
    let ra1 = map(r, 0, 100, 0, 0.02);
    colorChange(ra1);
    ellipse(x, y, r, r);
    //g = (g + 1) % 360;
  }
}

function colorChange(opacity) {
  fill(h, s, b, opacity);
}