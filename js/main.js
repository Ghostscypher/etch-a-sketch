// Create query selector constants
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Run this script once the page loads
window.onload = function(e){
   // Create the grids
   createGrids(8);
}


// Variables to determine color changes
// The color changes are as follows:
// 0 - Black abd white (defaut)
// 1 - Shades of black and white
// 2 - random color
var color_change = 0; // Means balck and white

// This function is used to return a color in css format
// depending on the parameter passed i.e. either random color
// or black and white etc.
function getColor(color_code, shade = 1){
    switch (color_code) {
        case 1: // Shade
            console.log(shade);
            if(shade < 0)
                return;

            var r = g = b = shade * 255;
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        
        case 2: // Random
            var r = getRandomInt(0, 255), g = getRandomInt(0, 255), b = getRandomInt(0, 255);
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    
        default: // 0 the default
            return '#000';
    }
}

// Used to change the coloring scheme for coloring the grids
function changeColorScheme(selected_object){
    // Get the text from the select options
    switch(selected_object.value){
        case '1':
            color_change = 1;

            break;

        case '2':
            color_change = 2;

                break;

        default: // Black and white
            color_change = 0;

            break;
    }
}

// Create grid proxy
function createGridProxy(){
    var val = $('#grid_size').value;
    createGrids(parseInt(val));
}

// Used to create N x N grids
function createGrids(grid_size){
    grid_size = parseInt(grid_size);

    // Check if the size is a number
    if(grid_size == NaN || grid_size  < 0){
        grid_size = 16; // Default grid size
    }

    // Select an element using query selector
    var container = $('.container');
    
    // Clear original data
    container.innerHTML = "";
    
    // Get the width and height of the container
    var container_length = container.clientHeight;

    // NB: EVERY VALUE IS CALCULATED IN px UNITS
    // Calculate the correct width and height for the grids to fit
    const grid_margin = 1;
    var grid_length = ((1 / grid_size) * container_length) - (grid_margin * 2);

    // Create grids
    for(var i = 0; i < grid_size; ++i)
    {
        for(var j = 0; j < grid_size; ++j)
        {
            // Create a new div element
            var grids = document.createElement('div');
            
            // Assign the css class grid to the created div
            grids.classList.add('grid');

            // Assign id
            grids.id = 'grid' + i + '_' + j;

            // Adign he respective height and width
            grids.style.height = grid_length + 'px';
            grids.style.width = grid_length + 'px';

            // Add data attribute for shade calculation
            grids.dataset.shade = 1; 

            // Append the grid to the container div
            container.appendChild(grids);

            grids.addEventListener('mouseover', function() {
                // Handle on hover events here
                this.dataset.shade = parseFloat(this.dataset.shade) - 0.05;
                this.style.background = getColor(color_change, parseFloat(this.dataset.shade));
            });
        }
    }
}

// Used to clear grid colors
function clearGrids(){
    var grids = $$('.grid');

    grids.forEach(grid => {
        grid.style.background = "#FFF";
        grid.dataset.shade = 1;
    });
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}