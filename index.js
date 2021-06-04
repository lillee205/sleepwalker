const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var object = "&#128554"
var speed = 400
var previousRadius = 0
var speedInput = document.getElementById("speed")

var totalSteps = 0
var numberClicks = 0

speedInput.addEventListener("input", function(){
    document.getElementById("speedValue").innerHTML = "speed of sleepwalker is currently " + speedInput.value + " milliseconds per step"
})

speedInput.addEventListener("mouseup", function(){
    speed = speedInput.value
});

document.getElementById("changeObject").addEventListener("click", function(){
    objects = ["&#129503", "&#129424", "&#129499", "&#129313", "&#128511", "&#129312", "&#129498"]
    object = objects[Math.floor(Math.random()*objects.length)];
});

document.getElementById("submit").addEventListener("click", function(){
    var currRadius = document.getElementById("radius").value;
    var blankpath = "|" + "_".repeat(currRadius*2+1) + "|"
    var path = blankpath.substring(0, Math.floor(blankpath.length/2)) + object + blankpath.substring(Math.floor(blankpath.length/2 + 1))
    var sleepbox = document.getElementById("sleepbox");
    sleepbox.innerHTML = path
    var currPos = path.indexOf(object)
    steps = updateWalk(currPos, blankpath, sleepbox, currRadius)
});

async function updateWalk(currPos, blankpath, sleepbox, currRadius){
    var steps = 0
    while (currPos > 1 && currPos < blankpath.length-2){
        await sleepNow(speed)
        if (Math.random() < 0.5){
            path = blankpath.substring(0, currPos-1) + object + blankpath.substring(currPos)
        }
        else {
            path = blankpath.substring(0, currPos+1) + object + blankpath.substring(currPos+2)
        }

        sleepbox.innerHTML = path

        steps++
        if (steps == 1){
            document.getElementById("result").innerHTML =  steps + " step"

        }
        else{
            document.getElementById("result").innerHTML =  steps + " steps"
        }
        currPos = path.indexOf(object)
    }
    document.getElementById("result").innerHTML = "finished at " + steps + " steps"
    updateTable(steps, currRadius)
    return steps
}

function updateTable(steps, currRadius){
    row = document.createElement("tr")
    element = document.createElement("td")
    element.innerHTML = steps
    if (currRadius == previousRadius){
        numberClicks++
        totalSteps += steps 
    }
    else{
        numberClicks = 1
        totalSteps = steps
        document.querySelectorAll('td').forEach(e => e.remove());
    }
    document.getElementById("trials").innerHTML =  "# of trials : " + numberClicks
    previousRadius = currRadius
    table = document.getElementById("table")
    var row = table.insertRow(1);
    var element = row.insertCell(0);
    element.innerHTML = steps

    avg = parseFloat(totalSteps/numberClicks).toFixed(2)
    document.getElementById("avg").innerHTML = "avg steps for radius " + currRadius +":  " + avg + " steps"


}