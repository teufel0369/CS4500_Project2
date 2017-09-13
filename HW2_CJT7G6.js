/*global $, jQuery*/
/*global alert, jQuery*/
/*global console, jQuery*/

var row369, col369;

function drawGrid() {
    "use strict";
    var row, col, numRows, numCols, obj1, obj2;

    //grab the objects to get the rows and cols
    obj1 = document.getElementById('numRows');
    obj2 = document.getElementById('numCols');

    //get the number of rows and cols
    numRows = obj1.options[obj1.selectedIndex].value;
    numCols = obj2.options[obj2.selectedIndex].value;

    //set the global variables for later use
    row369 = numRows;
    col369 = numCols;

    //grab the div container by ID and append a 10X10 grid to it with corresponding point elements
    for (row = 0; row < numRows; row += 1) {
        for (col = 0; col < numCols; col += 1) {
            $("#container").append('<div class="grid grid' + row + col + '"></div>');
        }
    }

    //size of the "grid" elements 620 / 10 because there is a 10x10 grid and this makes it proportionate
    $(".grid").height(520 / numRows);
    $(".grid").width(520 / numCols);
}
//random number of steps
function randomNumSteps() {
    "use strict";
    return Math.floor(Math.random() * 3);
}

//random number generator for direction
function randomDirection() {
    "use strict";
    return Math.floor(Math.random() * 4);
}
//sets the css element of the grid to red fill
function colorPoint(row, col) {
    "use strict";
    return $('.grid' + row + col).css('background-color', 'red');
}
//sets the element of the grid to white fill
function clearPoint(row, col) {
    "use strict";
    return $('.grid' + row + col).css('background-color', 'white');
}

//checks to see if the cell exists
function doesCellExist(row, col) {
    "use strict";

    if (row > row369 - 1 || col > col369 - 1 || row < 0 || col < 0) {
        return false;
    } else {
        return true;
    }
}
function isWinningCell(row, col) {
    "use strict";
    if (row === 0 && col === col369 - 1) {
        return true;
    } else {
        return false;
    }
}
//will control the overall function of the game
function gamePlay(row1, col1, counter1, countdown1) {
    "use strict";
    var direction, numSteps, fitty1, fitty2 = 0,
        row = row1, col = col1, flag, countdown = countdown1, counter = counter1, prevCol, prevRow;
    direction = randomDirection(); //pick the direction
    numSteps = randomNumSteps(); //pick the number of steps


    //using setTimeout to show the appearance of animation
    setTimeout(function () {

        //if the direction is 0, then left
        //if the direction is 1, then up
        //if the direction is 2, then right
        //if the direction is 3, then down
        if (direction === 0) {
            clearPoint(row, col); //clear the current point
            prevCol = col; //assign this just in case the cell we're moving to doesn't exist
            col = col - numSteps; //make the direction adjustment and the number of steps we're moving

            //make a check to see if the cell exists before coloring.
            //if it does exist, then color it and mark the stats
            //otherwise, re-color the current point and mark the stats
            if (doesCellExist(row, col) === true) {
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            } else {
                col = prevCol;
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            }
        } else if (direction === 1) {
            clearPoint(row, col);
            prevRow = row;
            row = row + numSteps;
            if (doesCellExist(row, col) === true) {
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            } else {
                row = prevRow;
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            }
        } else if (direction === 2) {
            clearPoint(row, col);
            prevCol = col;
            col = col + numSteps;
            if (doesCellExist(row, col) === true) {
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            } else {
                col = prevCol;
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            }
        } else {
            clearPoint(row, col);
            prevRow = row;
            row = row - numSteps;
            if (doesCellExist(row, col) === true) {
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            } else {
                row = prevRow;
                colorPoint(row, col);
                countdown -= 1;
                counter = counter + 1;
            }
        }

        //if the countdown is zero, then notify the user we've exhausted all turns and output the counter
        //if the cell is the winning cell, then notify the user that he's awesome and output the counter
        //otherwise, make a recursive call to the function and output the counter
        if (countdown === 0) {
            alert('You have exhausted all turns! Thanks for playing Strange Game!');
            document.getElementById('boldStuff').innerHTML = counter;
        } else if (isWinningCell(row, col) === true) {
            alert('You Win!!!! Thanks for playing Strange Game!');
            document.getElementById('boldStuff').innerHTML = counter;
        } else {
            document.getElementById('boldStuff').innerHTML = counter;
            gamePlay(row, col, counter, countdown);

            /* Note: I typically don't use recursion, as it's bad for performance. However, this was really the only
               way to really get the setTimeout function to operate as intended. */
        }
    }, 500); //set the setTimeout timer to 500 milliseconds
}

//when the page loads do this
$(document).ready(function () {
    "use strict";

    var i;

    for (i = 5; i <= 20; i += 1) {
        $('#numRows').append('<option value="' + i + '">' + i + '</option>');
    }


    for (i = 5; i <= 20; i += 1) {
        $('#numCols').append('<option value="' + i + '">' + i + '</option>');
    }
});

//when the start button is clicked
$('#largeButton').click(function () {
    "use strict";

    //starting the game;
    //row 9, column 0, initialize the counter to zero, and set the countdown to 1,000,000 possible turns
    gamePlay(row369 - 1, 0, 0, 1000000);
});

//when the Confirm Selection button is pressed
$('#largeButton2').click(function () {
   drawGrid();
   colorPoint(row369 - 1, 0);
});
