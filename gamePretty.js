var messageBoard = document.getElementById("messageBoard")
var numDice
// images created myself using microsoft Paint
var images = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"]
var diceTable = document.getElementById("diceTable")
var totalPoints = 0
var pointsThisRound
var numberOfRoundsPlayed = 0
var rollsThisRound
var gameInProgress = false

function updateTable() {
    document.getElementById("displayNumRounds").innerHTML = numberOfRoundsPlayed
    document.getElementById("displayTotalPoints").innerHTML = totalPoints
    if (gameInProgress) {
      messageBoard.innerHTML = "You have scored <b>" + pointsThisRound + " points this round</b>. <br>" +
        "<br> Press roll to play another round and end to finish game."
    }
}

updateTable()

function welcome() {
    messageBoard.innerHTML = "Hello. Welcome to DICE GAME. Please enter a number between 3 and 6 below to choose the number of dice and press play."
}

welcome()

function checkDiceNum() {
    if (!gameInProgress) {
        numDice = document.getElementById("numDice").value
        if (parseInt(numDice) == NaN || parseInt(numDice) != numDice) {
            messageBoard.innerHTML = "You must enter a whole number for the number of dice. Please re-enter a value between 3 and 6."
        }
        else {
            numDice = parseInt(numDice)
            if (numDice >= 3 && numDice <= 6) {
                messageBoard.innerHTML = "You have selected " + numDice + " dice to play with. Press role to play the first round"
                // createDice()
                gameInProgress = true
            }
            else {
                messageBoard.innerHTML = "Error! You must enter a natural number between 3 and 6 for the number of dice. Please re-enter a value"
            }
        }
        document.getElementById("numDice").value = ""
    } else {
        messageBoard.innerHTML="Error! You cannot enter a new number of dice or start a new game until " +
            "this game has finished. Press <b>End Game</b> if you want to start again. Else, press <b>Roll</b>" +
            " to play another round."
        document.getElementById("numDice").value = ""
    }

}

function preRoll() {
    if (gameInProgress == true) {
        while(diceTable.hasChildNodes()) {
            diceTable.removeChild(diceTable.firstChild)
        }
        rollDice()
    }
    else {
        messageBoard.innerHTML = "Stop! Number of dice not set. Please enter the number of dice before rolling."
    }
}

function rollDice() {
    pointsThisRound = 0
    numberOfRoundsPlayed++
    rollsThisRound = []
    // roll numDice - get random output for dice values
    for (i = 0; i < numDice; i++) {
        // get random number
        currentDiceRoll = Math.floor((Math.random() * 6)) + 1
        // append dice image
        var image = document.createElement("IMG")
        image.setAttribute("src", images[currentDiceRoll - 1])
        diceTable.appendChild(image)
        // add number to totals
        rollsThisRound.push(currentDiceRoll)
    }
    calculatePoints()
    totalPoints += pointsThisRound
    updateTable()
}

function calculatePoints() {
    rollsThisRound = rollsThisRound.sort()

    var diceSameValue = 0
    var sumOfDiceValuesThisRound = 0
    var diceInARun = 0
    for (i = 0; i < rollsThisRound.length; i++) {
        sumOfDiceValuesThisRound += rollsThisRound[i]
    }
    // if the next dice roll in the sorted list is one higher then increment diceInARun by one
    for (i = 0; i < rollsThisRound.length - 1; i++) {
        if (rollsThisRound[i] == rollsThisRound[i + 1] - 1)
            diceInARun++
    }
    // if the next dice in the sorted list has same value then increment diceSameValue by one
    for (i = 0; i < rollsThisRound.length - 1; i++) {
        if (rollsThisRound[i] == rollsThisRound[i + 1])
            diceSameValue++
    }
    // if all the dice have the same value, diceSameValue will be one less than the number of dice
    // N-1 dice have same value, diceSameValue will be two less than the number of dice
    if (diceSameValue == rollsThisRound.length - 1) {
        pointsThisRound = 60 + sumOfDiceValuesThisRound
    } else if (diceSameValue == rollsThisRound.length - 2) {
        pointsThisRound = 40 + sumOfDiceValuesThisRound
    } else if (diceInARun == rollsThisRound.length - 1) { // checks if its a run
        pointsThisRound = 20 + sumOfDiceValuesThisRound
    } else if (diceSameValue == 0) { // checks if all dice have different values
        pointsThisRound = sumOfDiceValuesThisRound
    }

}

function endGame() {
    if (gameInProgress) {
        // totalPoints, average points per round, number of rounds - displayNumRounds
        var averagePointsPerRound
        if (numberOfRoundsPlayed == 0) {
            averagePointsPerRound = 0
        } else {
            averagePointsPerRound = totalPoints/numberOfRoundsPlayed
        }
        messageBoard.innerHTML = "Game Stats<br>" +
            "Number of rounds played: " + numberOfRoundsPlayed + "<br>" +
            "Total points: " + totalPoints + "<br>" +
            "Average points per round: " + averagePointsPerRound + "<br><br>" +
            "To play again enter the number of dice and press play"
        // reset variables for a new game
        totalPoints = 0
        numberOfRoundsPlayed = 0
        gameInProgress =  false
        updateTable()
    } else {
        messageBoard.innerHTML = "Error! You haven't started the game yet. Please enter the number of dice " +
            "below and press <b>Play</b>."
    }

}


/**
Bibliography

‘JavaScript HTML DOM’. [Online]. Available: https://www.w3schools.com/js/js_htmldom.asp. [Accessed: 08-Nov-2017].

*/
