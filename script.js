let tableWrapper = document.getElementById("tableWrapper")
let startBtn = document.getElementById("startBtn")

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

    // sorok elvalasztasa
function drawLines() {
    ctx.fillStyle = "black";
    ctx.fillRect(200, 0, 10, canvas.height);
    ctx.fillRect(400, 0, 10, canvas.height);
    ctx.fillRect(600, 0, 10, canvas.height);
}


let x = 0;
function drawNote(x, y){
    ctx.fillStyle = "blue";
    ctx.fillRect(200*x, y, 200, 60);
    drawLines();
}

const scheduledNotes = [
  { time: 0.5, x: 0 },
  { time: 1.5, x: 1 },
  { time: 2.5, x: 2 },
];

let activeNotes = [];
let startTime = null;

function gameLoop(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = (timestamp - startTime) / 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  while (scheduledNotes.length && scheduledNotes[0].time <= elapsed) {
    const note = scheduledNotes.shift();
    activeNotes.push({ x: note.x, y: -60 });
  }

  activeNotes.forEach(note => {
    note.y += 2;
    drawNote(note.x, note.y);
  });

  requestAnimationFrame(gameLoop);
}




// function drawGuitar(){
//     for(let sor = 1; sor<=5; sor++){
//         for(let oszlop = 1; oszlop <=5; oszlop++){
//            let fretDiv = document.createElement("div")
//            fretDiv.className = "fret"
//            tableWrapper.appendChild(fretDiv)
//         }
//     }
//      for(let sor = 1; sor<=5; sor++){
//         for(let oszlop = 1; oszlop <=1; oszlop++){
//            let hitDiv = document.createElement("div")
//            hitDiv.className = "hit"
//            tableWrapper.appendChild(hitDiv)
//         }
//     }

//     startBtn.disabled = true
// }


