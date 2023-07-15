        // Get the container element
        const container = document.querySelector('.container');

        // Get the color palette element
        const colorPalette = document.querySelector('.color-palette');

        // Get the clear button
        const clearButton = document.querySelector('#clear-button');

        // Get all the color options
        const colorOptions = colorPalette.querySelectorAll('.color');

        // Set the initial color
        let selectedColor = '#000'; // Black

        // Function to create the grid of cells
        function createGrid(size) {
            container.innerHTML = ''; // Clear existing grid

            container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

            for (let i = 0; i < size * size; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                container.appendChild(cell);

                // Add event listener to each cell for color placement
                cell.addEventListener('click', () => {
                    cell.style.backgroundColor = selectedColor;
                });
            }
        }

        // Initial grid creation
        createGrid(16); // Default grid size is 16x16

        // Get all the cell elements
        const cells = document.querySelectorAll('.cell');

        // Add event listeners to each cell for drawing
        cells.forEach(cell => {
            cell.addEventListener('mouseover', () => {
                // Change the background color of the cell to the selected color
                if (cell.style.backgroundColor !== selectedColor && cell.classList.contains('drawing')) {
                    cell.style.backgroundColor = selectedColor;
                }
            });
        });

        // Add event listeners to each color option
        colorOptions.forEach(colorOption => {
            colorOption.addEventListener('click', () => {
                // Get the selected color
                selectedColor = colorOption.style.backgroundColor;

                // Remove the border from all color options
                colorOptions.forEach(option => {
                    option.style.border = '1px solid #000';
                });

                // Add a border to the selected color option
                colorOption.style.border = '2px solid #000';
            });
        });

        // Event listener for the clear button
        clearButton.addEventListener('click', () => {
            cells.forEach(cell => {
                cell.style.backgroundColor = '#fff';
                cell.classList.remove('drawing');
            });
        });

        // Rainbow color option
        const rainbowColorOption = colorPalette.querySelector('.rainbow');
        rainbowColorOption.addEventListener('click', () => {
            colorOptions.forEach(option => {
                option.style.border = '1px solid #000';
            });
            rainbowColorOption.style.border = '2px solid #000';
        });

        // Rainbow drawing effect
        container.addEventListener('mouseover', (event) => {
            if (rainbowColorOption.style.border === '2px solid #000') {
                const cell = event.target;
                if (cell.classList.contains('cell') && cell.classList.contains('drawing')) {
                    cell.style.backgroundColor = getRandomRainbowColor();
                }
            }
        });

        // Toggle drawing mode
        container.addEventListener('mousedown', (event) => {
            const cell = event.target;
            if (cell.classList.contains('cell')) {
                cell.classList.add('drawing');
                cell.style.backgroundColor = selectedColor;
            }
        });

        container.addEventListener('mouseup', () => {
            cells.forEach(cell => {
                cell.classList.remove('drawing');
            });
        });

        // Function to generate a random rainbow color
        function getRandomRainbowColor() {
            const hue = Math.floor(Math.random() * 360);
            return `hsl(${hue}, 100%, 50%)`;
        }
    