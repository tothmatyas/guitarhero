let tableWrapper = document.getElementById("tableWrapper");
let startBtn = document.getElementById("startBtn");
let streakEl = document.getElementById("streak")
let scoreEl = document.getElementById("score")
const fileInput = document.getElementById("fileInput");
const output = document.getElementById("output");


let score = 0;
let scheduledNotes = []; 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawLines() {
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, 10, canvas.height);
    ctx.fillRect(200, 0, 10, canvas.height);
    ctx.fillRect(400, 0, 10, canvas.height);
    ctx.fillRect(600, 0, 10, canvas.height);
    ctx.fillRect(800, 0, 10, canvas.height);
    ctx.fillStyle = "lightblue"
    ctx.fillRect(0, canvas.height - 100, canvas.width, 60);
}

function drawNote(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(200 * x, y, 200, 60);
    drawLines();
}

let activeNotes = [];
let startTime = null;

function gameLoop(timestamp) {

    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (scheduledNotes.length && scheduledNotes[0].time <= elapsed) {
        const note = scheduledNotes.shift();
        activeNotes.push({ x: note.x, y: -60 });
        console.log("Scheduled note added");
    }

    activeNotes.forEach(note => {
        note.y += 2;
        drawNote(note.x, note.y);
    });

    requestAnimationFrame(gameLoop);
    startBtn.disabled = true
}

const keyMap = {
    'a': 0,
    's': 1,
    'k': 2,
    'l': 3,
};

document.addEventListener("keydown", function (e) {
    const lane = keyMap[e.key.toLowerCase()];
    if (lane === undefined) return;

    const hitZoneY = canvas.height - 100;

    for (let i = 0; i < activeNotes.length; i++) {
        const note = activeNotes[i];
        if (note.x === lane && note.y >= hitZoneY - 30 && note.y <= hitZoneY + 30) {
            streakEl.innerText++
            score += 100
            scoreEl.innerText = score
            activeNotes.splice(i, 1);
            return;
        }
    }
    score -= 50
    scoreEl.innerText = score
    streakEl.innerText = 0
    console.log("Miss");
});


fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            scheduledNotes = JSON.parse(e.target.result);
            console.log(scheduledNotes);
            output.value = JSON.stringify(scheduledNotes, null, 2);
        } catch (err) {
            console.error("Hiba a JSON feldolgozásában:", err);
            output.value = "Hiba: Érvénytelen JSON!";
        }
    };
    reader.readAsText(file);
});
