let tableWrapper = document.getElementById("tableWrapper")
let startBtn = document.getElementById("startBtn")


function drawGuitar(){
    for(let sor = 1; sor<=5; sor++){
        for(let oszlop = 1; oszlop <=5; oszlop++){
           let fretDiv = document.createElement("div")
           fretDiv.className = "fret"
           tableWrapper.appendChild(fretDiv)
        }
    }
     for(let sor = 1; sor<=5; sor++){
        for(let oszlop = 1; oszlop <=1; oszlop++){
           let hitDiv = document.createElement("div")
           hitDiv.className = "hit"
           tableWrapper.appendChild(hitDiv)
        }
    }

    startBtn.disabled = true
}


