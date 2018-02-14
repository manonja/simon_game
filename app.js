$(document).ready(function() {

    const count = 0;
    const buttons = ["#green", "red", "#blue", "#yellow"];
    // store player input
    const player = [];
    const currentStep = [];
    const strict = false;
    const sounds = {
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    };

    const simon = {
        count,
        buttons,
        player,
        currentStep,
        strict,
        sounds,
    };

    function strictMode() {
        alert("strict mode activated");
        simon.strict = true;
    }

    $("#strict").click(function() {
        strictMode();
    });

    function playSound(sound) {

        switch (sound) {
        case "#green": {
            const playPromise1 = simon.sounds.green.play();
            if (playPromise1 !== undefined) {
                playPromise1.then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                })
                    .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    });
            }
            break;
        }
        case "#red": {
            const playPromise2 = simon.sounds.red.play();
            if (playPromise2 !== undefined) {
                playPromise2.then(_ => {})
                    .catch(error => {});
            }
            break;
        }

        case "#blue": {
            const playPromise3 = simon.sounds.blue.play();
            if (playPromise3 !== undefined) {
                playPromise3.then(_ => {})
                    .catch(error => {});
            }
            break;
        }

        case "#yellow": {
            const playPromise4 = simon.sounds.yellow.play();
            if (playPromise4 !== undefined) {
                playPromise4.then(_ => {})
                    .catch(error => {});
                break;
                // no default
            }
        }
        }
    }

    /* global $:true */
    function playGame(btn) {
        $(btn).addClass("pressed");
        playSound(btn);
        setTimeout(() => {
            $(btn).removeClass("pressed");
        }, 300);
    }

    function clearPlayer() {
        simon.player = [];
    }

    // show the button pressed
    function displayBtnPressed() {
        let i = 0;
        const moves = setInterval(() => {
            playGame(simon.currentStep[i]);
            i += 1;
            if (i >= simon.currentStep.length) {
                clearInterval(moves);
            }
        }, 600);
        clearPlayer();
    }

    // create a function that adds a step everytime the player is right
    function generateStep() {
        simon.currentStep.push(simon.buttons[(Math.floor(Math.random() * 4))]);
        displayBtnPressed();
    }

    // I can see how many steps are in the current series of button presses.
    function addStep() {
        simon.count += 1;
        $("#counter").addClass("animated bounce");

        setTimeout(() => {
            $("#counter").removeClass("animated bounce ").html(simon.count).addClass("animated bounce");
        }, 200);

        generateStep();
    }


    // If I want to restart, I can hit a button to do so, and the game will return to a single step.
    function resetGame() {
        simon.currentStep = [];
        simon.count = 0;
        addStep();
    }

    // create a function that starts the game onclick start
    function startGame() {
        // reset the game so we are sure we begin from the start
        resetGame();
    }

    $("#start").click(function(){
        startGame();
    });

    function playerTurn(player) {
        if (simon.player[simon.player.length - 1] !==
            simon.currentStep[simon.player.length - 1]) {
            if (simon.strict) {
                // I can play in strict mode where if I get a button press wrong,
                // it notifies me that I have done so, and the game restarts at
                // a new random series of button presses.
                alert("ups, try again!");
                startGame();
            } else {
                // If I press the wrong button, I am notified that I have done so, and that
                // series of button presses starts again to remind me of the pattern so I can try again.
                alert("ups, try again!");
                displayBtnPressed();
            }

            // TODO: fix bug here!!!
        } else {
            // I hear a sound that corresponds to each button both when the series of button
            // presses plays, and when I personally press a button.
            playSound(player);
            const check = simon.player.length === simon.currentStep.length;
            if (check) {
                // I can win the game by getting a series of 20 steps correct.
                // I am notified of my victory, then the game starts over.
                if (simon.count === 20) {
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

    function addPlayer(id) {
        const btn = `#${id}`;
        simon.player.push(btn);
        playerTurn(btn);
    }

    $("#green").click(function(){
        addPlayer(this.id);
    });

    $("#red").click(function(){
        addPlayer(this.id);
    });

    $("#blue").click(function(){
        addPlayer(this.id);
    });

    $("#yellow").click(function(){
        addPlayer(this.id);
    });

});
