// Create query selector constants
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Run this script once the page loads
window.onload = function(e){
   // Create the grids
   createGrids(20);
}

function createGrids(size){
    size = parseInt(size);

    // Check if the size is a number
    if(size == NaN || size  < 0){
        size = 16; // Default grid size
    }

    // Select an element using query selector
    var container = $('.container');

    // Get the width and height of the container

    // Create grids
    for(var i = 0; i < 8; ++i)
    {
        for(var j = 0; j < 8; ++j)
        {
            // Create a new div element
            var grids = document.createElement('div');
            
            // Assign the css class grid to the created div
            grids.classList.add('grid');

            // Assign id
            grids.id = 'grid' + i;

            // Add event listener for on hover
            grids.addEventListener('hover');

            // Append the grid to the container div
            container.appendChild(grids);
        }
    }
}