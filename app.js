// I am presented with a random series of button presses
var game = {
    count: 0,
    buttons: ["#green", "red", "#blue", "#yellow"],
    //store player input
    playerTurn: [],
    currentStep: [],
    strictMode: false,
    sounds: {
        green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    }
}
// create a function that starts the game onclick start
function startGame() {
    // reset the game so we are sure we begin from the start
    resetGame();
}

function strictMode() {
    alert("strict mode activated");
    strictMode = true;
}

function resetGame() {
    game.count = 0;
    game.currentStep = [];
    game.strictMode = false;
    addStep();

}

function addStep() {
    game.count++;
    $("#counter").addClass("animated infinite bounce");

    setTimeout(function () {
        $("#counter").removeClass('animated infinite bounce ').html(game.count).addClass('animated bounce');
    }, 200);

    generateStep();
}
// create a function that adds a step everytime the player is right
function generateStep() {
    game.currentStep.push(game.buttons[(Math.floor(Math.random() * 4))]);

    displayBtnPressed();
}
// show the button pressed
function displayBtnPressed() {
    var i = 0;
    var moves = setInterval(function () {
        playGame(game.currentStep[i]);
        i++;
        if (i >= game.currentStep.length) {
            clearInterval(moves);
        }
    }, 700);
    clearPlayer();
}

function playGame(field) {
    $(field).addClass("pressed");
    playSound(field);
    setTimeout(function () {
        $(field).removeClass("pressed");
    }, 300);
}

function playSound(btn) {
    switch (btn) {
    case "#green":
        game.sounds.green.play();
        break;
    case "#red":
        game.sounds.red.play();
        break;
    case "#blue":
        game.sounds.blue.play();
        break;
    case "#yellow":
        game.sounds.yellow.play();
        break;
    }

}

function clearPlayer() {
    game.playerTurn = [];
}

function addPlayer(id) {
    var field = "#" + id;
    game.playerTurn.push(field);
    playerTurn(field);
}

function playerTurn(x) {
    if (game.playerTurn[game.playerTurn.length - 1] !==
        game.currentStep[game.playerTurn.length - 1]) {
        if (game.strictMode) {
            alert("Upss....Try again!");
            startGame();
        } else {
            alert("ups, try again!");
            generateStep();
        }
    } else {
        playSound(x);
        var check = game.playerTurn.length === game.currentStep.length;
        if (check) {
            if (game.count === 20) {
                alert("**** Congrats! You nailed it! ****");
            } else {
                alert("keep up the good work!");
                addStep();
            }
        }

    }

}



// Each time I input a series of button presses correctly, I see the same series
// of button presses but with an additional step.



// I hear a sound that corresponds to each button both when the series of button
// presses plays, and when I personally press a button.




// If I press the wrong button, I am notified that I have done so, and that
// series of button presses starts again to remind me of the pattern so I can try again.




// I can see how many steps are in the current series of button presses.




// If I want to restart, I can hit a button to do so, and the game will return to a single step.




// I can play in strict mode where if I get a button press wrong, it notifies
// me that I have done so, and the game restarts at a new random series of button presses.



// I can win the game by getting a series of 20 steps correct.
// I am notified of my victory, then the game starts over.
