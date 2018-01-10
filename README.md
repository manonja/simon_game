# simon_game
Build a simple Simon Game with JavaScript
[![Build Status](https://travis-ci.org/manonja/simon_game.svg?branch=master)](https://travis-ci.org/manonja/simon_game)


Objectives:

- I am presented with a random series of button presses: 1 blue, 1 red, 1 yellow, 1 green

- Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

- I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

- If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again (except in strict mode were button presses don't start again but reset to a single step)

- I can see how many steps are in the current series of button presses (counter)

- If I want to restart, I can hit a button to do so, and the game will return to a single step.

- I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

- I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.
