let tableWrapper = document.getElementById("tableWrapper");
let startBtn = document.getElementById("startBtn");
const fileInput = document.getElementById("fileInput");
const output = document.getElementById("output");

let scheduledNotes = []; 

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawLines() {
    ctx.fillStyle = "black";
    ctx.fillRect(200, 0, 10, canvas.height);
    ctx.fillRect(400, 0, 10, canvas.height);
    ctx.fillRect(600, 0, 10, canvas.height);
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
}

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
