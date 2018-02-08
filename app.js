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
    },
}
// create a function that starts the game onclick start
function startGame() {
    // reset the game so we are sure we begin from the start
    resetGame();
}

function strictMode() {
    alert("strict mode activated");
    game.strictMode = true;
}

// If I want to restart, I can hit a button to do so, and the game will return to a single step.
function resetGame() {
    game.currentStep = [];
    game.count = 0;
    addStep();
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
    }, 600)
    clearPlayer();
}

function playGame(btn) {
    $(btn).addClass("pressed");
    playSound(btn);
    setTimeout(function () {
        $(btn).removeClass("pressed");
    }, 300);
}

function playSound(sound) {
    switch (sound) {
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
    var btn = "#" + id;
    game.playerTurn.push(btn);
    playerTurn(btn);
}

function playerTurn(x) {
    if (game.playerTurn[game.playerTurn.length - 1] !==
        game.currentStep[game.playerTurn.length - 1]) {
        if (game.strictMode) {
            // I can play in strict mode where if I get a button press wrong, it notifies
            // me that I have done so, and the game restarts at a new random series of button presses.
            alert("ups, try agaibn!");
            startGame();
        } else {
            // If I press the wrong button, I am notified that I have done so, and that
            // series of button presses starts again to remind me of the pattern so I can try again.
            alert("ups, try again!");
            displayBtnPressed();
        }
    } else {
        // I hear a sound that corresponds to each button both when the series of button
        // presses plays, and when I personally press a button.
        playSound(x);
        var check = game.playerTurn.length === game.currentStep.length;
        if (check) {
            // I can win the game by getting a series of 20 steps correct.
            // I am notified of my victory, then the game starts over.
            if (game.count === 20) {
                alert("congrats!!!!");
                startGame();
            } else {
                // Each time I input a series of button presses correctly, I see the same series
                // of button presses but with an additional step.
                alert("keep up the good work!");
                addStep();
            }
        }
    }
}


// create a function that adds a step everytime the player is right
function generateStep() {
    game.currentStep.push(game.buttons[(Math.floor(Math.random() * 4))]);
    displayBtnPressed();
}

// I can see how many steps are in the current series of button presses.
function addStep() {
    game.count++;
    $("#counter").addClass("animated bounce");

    setTimeout(function () {
        $("#counter").removeClass('animated bounce ').html(game.count).addClass('animated bounce');
    }, 200);

    generateStep();
}
