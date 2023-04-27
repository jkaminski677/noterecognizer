var notesValueTab = [];
var durationsTab = [];
var currentValue = null;
var currentValueStartTime = null;
var startDate = null; //początek słuchania
var endDate = null;  // koniec słuchania
var recTime = null;  // czas słuchania
let isRunning = true;

function monitorValue(value) {
  if (isRunning) {
    if (value != currentValue) {
      if (currentValue !== null) {
        // Zapisanie wartości i czasu trwania
        durationsTab.push((new Date() - currentValueStartTime)/1000);
        notesValueTab.push(value);
      }
      currentValue = value;
      currentValueStartTime = new Date();
    }
  }
}

function stopFunction() {
  isRunning = false;
}

function funcStop(){
  document.getElementById('drawTables').innerText = notesValueTab;
  document.getElementById('drawTimes').innerText = durationsTab;
}


//  Pobieranie wartości z h1
var notesValue = document.getElementById('note');
var H1Value = null;
// utworzenie obserwatora
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // sprawdzenie czy wartość h1 się zmieniła
      if (mutation.target.textContent !== H1Value) {
        H1Value = mutation.target.textContent;
        // console.log('Wartość h1 została zmieniona: ', H1Value);
        monitorValue(H1Value);
        // wykonaj działania, które mają być wykonane po zmianie wartości h1
      }
    }
  }
});
// konfiguracja obserwatora
const config = { childList: true, subtree: true };
// uruchomienie obserwatora
if (isRunning) {
  observer.observe(notesValue, config);
}


//  Obliczanie czasu słuchania
var StartButton = document.getElementById("init");
StartButton.addEventListener("click", function(){ startDate = new Date(); StartButton.disabled = true;})
var stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", function(){ endDate = new Date(); recTime = (endDate - startDate) / 1000; console.log(recTime) })
stopButton.addEventListener("click", function(){ indexOfNote = 0; notesValueTab.forEach(DrawMyNotes);})




// ////////////// Nutki ///////////////////////


// notesValueTab.forEach(DrawMyNotes);
var indexOfNote = 0;
var timin = 0;
function DrawMyNotes(item) {
  console.log(item);
  console.log(durationsTab[indexOfNote]);
  indexOfNote += 1;
}






const { Factory, EasyScore, System } = Vex.Flow;
const vf = new Vex.Flow.Factory({ renderer: { elementId: 'output', width: 620, height: 150  } });
const score = vf.EasyScore();
const system = vf.System({
  x: 10,
  y: 10,
  width: 300
});
const system2 = vf.System({
  x: 310,
  y: 10,
  width: 300
});

// First measure
system.addStave({
  voices: [
    score.voice(score.notes('C#5/q, B4/q/r, A4, D#3')),

  ]
}).addClef('treble').addTimeSignature('4/4');

system2.addStave({
  voices: [
    score.voice(score.notes('F#4/h, D4/8, E4, E4, E4')),
  ]
});


vf.draw();


// ////////////////////////////////////////////////////////////////
// kopiowanie elementów w tablicy
// let arr = [1, 2, 3, 4, 5];
// let index = 2; // indeks elementu, który chcemy skopiować

// let copy = arr[index]; // skopiuj element
// arr.splice(index + 1, 0, copy); // wstaw kopię na pozycję o jeden większą

// console.log(arr); // [1, 2, 3, 3, 4, 5]
// ////////////////////////////////////////////////////////////////

var tempo = 4;
var tempTab = [];
let copy = null;
// var times = [2.02,0.141,1.843,0.309,0.326,0.167,0.474,0.41,0.724,0.877,1.108,0.677,0.241,0.476,0.675,0.475,1.101,0.118,0.333,0.284,0.508,1.076,0.151,0.073,0.527,0.691,0.276,0.726,0.942,0.384,0.317,0.634,0.266,0.451,0.55,0.15,0.359,0.642,0.041,0.193,0.659,1.359,0.116,0.919,0.667,0.133,0.317,0.5,1.476,0.494,0.157];

function sumToFour(times) {
  const result = [];
  let sum = 0;
  let i = 0;

  while (i < times.length) {
    if (sum + times[i] < tempo) {
      sum += times[i];
      tempTab.push(times[i])
      result.push(times[i]);
      i++;
      console.log("done1")
      console.log(result)
    } else if (sum + times[i] === tempo) {
      sum += times[i];
      result.push(times[i]);
      i++;
      sum = 0;
      console.log("done2")
    } else {
      console.log("done3");
      const diff = tempo - sum;
      tempTab.push(diff)
      console.log("tempTab: ")
      console.log(tempTab)
      tempTab = []
      result.push(diff);
      // result.push(times[i] - diff);
      times.splice(i, 1, diff, times[i] - diff);
      console.log("TIMES: ")
      console.log(times)

      copy = notesValueTab[i]; // skopiuj element
      notesValueTab.splice(i + 1, 0, copy); // wstaw kopię na pozycję o jeden większą
      console.log("NOTESTABS: ")
      console.log(notesValueTab)

      console.log("SUMA: " + (sum + diff))
      console.log(result)
      sum = 0;
      i++;

    }
  }
  return result;
}

stopButton.addEventListener("click", function(){ sumToFour(durationsTab) })
// console.log(sumToFour(durationsTab));






// const { Factory } = Vex.Flow;

// // Create a VexFlow renderer attached to the DIV element with id="output".
// const vf = new Factory({ renderer: { elementId: 'output' } });
// const score = vf.EasyScore();
// const system = vf.System();

// // Create a 4/4 treble stave and add two parallel voices.
// system.addStave({
//   voices: [
//     // Top voice has 4 quarter notes with stems up.
//     score.voice(score.notes('C#5/h, A4/q., B4/8/r', { stem: 'up' })),
   
//     // Bottom voice has two half notes, with stems down.
//     score.voice(score.notes('C#4/h, C#4', { stem: 'down' }))
//   ]
// }).addClef('treble').addTimeSignature('4/8');

// // Draw it!
// vf.draw();





// const {
//   Renderer,
//   Stave,
//   StaveNote,
//   Voice,
//   Formatter
// } = Vex.Flow;

// // Create an SVG renderer and attach it to the DIV element named "boo".
// const div = document.getElementById('output');
// const renderer = new Renderer(div, Renderer.Backends.SVG);

// // Configure the rendering context.
// renderer.resize(500, 200);
// const context = renderer.getContext();

// // Create a stave of width 400 at position 10, 40 on the canvas.
// const stave = new Stave(10, 40, 400);

// // Add a clef and time signature.
// stave.addClef('treble').addTimeSignature('4/4');

// // Connect it to the rendering context and draw!
// stave.setContext(context).draw();

// // Create the notes
// const notes = [
//   // A quarter-note C.
//   new StaveNote({
//     keys: ['c/5'],
//     duration: 'q'
//   }),

//   // A quarter-note D.
//   new StaveNote({
//     keys: ['d/4'],
//     duration: 'q'
//   }),

//   // A quarter-note rest. Note that the key (b/4) specifies the vertical
//   // position of the rest.
//   new StaveNote({
//     keys: ['b/4'],
//     duration: 'qr'
//   }),

//   // A C-Major chord.
//   new StaveNote({
//     keys: ['c/4', 'e/4', 'g/4'],
//     duration: 'q'
//   }),

//   new StaveNote({
//     keys: ['|']
//   }),
// ];

// // Create a voice in 4/4 and add above notes
// const voice = new Voice({
//   num_beats: 5,
//   beat_value: 4
// });
// voice.addTickables(notes);

// // Format and justify the notes to 400 pixels.
// new Formatter().joinVoices([voice]).format([voice], 300);

// // Render voice
// voice.draw(context, stave);





// // This approach to importing classes works in CJS contexts (i.e., a regular <script src="..."> tag).
// const { Stave, StaveNote, Beam, Formatter, Renderer } = Vex;

// // In an ESM context (or when using TypeScript), you will need to use the "import" keyword.
// // import { Stave, StaveNote, Beam, Formatter, Renderer } from 'vexflow';

// // Create an SVG renderer and attach it to the DIV element with id="output".
// const div = document.getElementById("output");
// const renderer = new Renderer(div, Renderer.Backends.SVG);

// // Configure the rendering context.
// renderer.resize(720, 130);
// const context = renderer.getContext();


// // Measure 1
// const staveMeasure1 = new Stave(10, 0, 200);
// staveMeasure1.addClef('treble').setContext(context).draw();

// const notesMeasure1 = [
//   new StaveNote({ keys: ['c/4'], duration: 'q' }),
//   new StaveNote({ keys: ['d/4'], duration: 'q' }),
//   new StaveNote({ keys: ['b/4'], duration: 'qr' }),
//   new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' }),
// ];

// // Helper function to justify and draw a 4/4 voice
// Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

// // Measure 2 - second measure is placed adjacent to first measure.
// const staveMeasure2 = new Stave(staveMeasure1.width + staveMeasure1.x, 0, 400);

// const notesMeasure2_part1 = [
//   new StaveNote({ keys: ['c/4'], duration: '8' }),
//   new StaveNote({ keys: ['d/4'], duration: '8' }),
//   new StaveNote({ keys: ['b/4'], duration: '8' }),
//   new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '8' }),
// ];

// const notesMeasure2_part2 = [
//   new StaveNote({ keys: ['c/4'], duration: '8' }),
//   new StaveNote({ keys: ['d/4'], duration: '8' }),
//   new StaveNote({ keys: ['b/4'], duration: '8' }),
//   new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '8' }),
// ];

// // Create the beams for 8th notes in second measure.
// const beam1 = new Beam(notesMeasure2_part1);
// const beam2 = new Beam(notesMeasure2_part2);

// const notesMeasure2 = notesMeasure2_part1.concat(notesMeasure2_part2);

// staveMeasure2.setContext(context).draw();
// Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);

// // Render beams
// beam1.setContext(context).draw();
// beam2.setContext(context).draw();
