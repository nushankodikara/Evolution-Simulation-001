// Draw a 100x100 grid in canvas element with a 100x100 array

// Create a 100x100 array
let grid = [];
for (let i = 0; i < 100; i++) {
    grid[i] = [];
    for (let j = 0; j < 100; j++) {
        grid[i][j] = 0;
    }
}

// Create a canvas element
let canvas = document.getElementById("canvas");

// create table
let table = [];
table.push("<table>");
for (let i = 0; i < 100; i++) {
    table.push("<tr>");
    for (let j = 0; j < 100; j++) {
        table.push(`<td id='${i}x${j}' class='background'>▧</td>`);
    }
    table.push("</tr>");
}
table.push("</table>");

// Add table to canvas
canvas.innerHTML = table.join("");

let animals = 150;
let food = 150;

// get random x and y
let randomxy = () => {
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 100);
    return [x, y];
};

// Add animals to grid
for (let i = 0; i < animals; i++) {
    let [x, y] = randomxy();
    while (grid[x][y] >= 1) {
        [x, y] = randomxy();
    }
    grid[x][y] = 1;
    document.getElementById(`${x}x${y}`).className = "sm";
}

// Add food to grid
for (let i = 0; i < food; i++) {
    let [x, y] = randomxy();
    while (grid[x][y] >= 1) {
        [x, y] = randomxy();
    }
    grid[x][y] = "f";
    document.getElementById(`${x}x${y}`).className = "food";
}

// Starting the simulation
console.log("Starting simulation");
setInterval(() => {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (grid[i][j] == 1) {
                let mover = Math.floor(Math.random() * 4);
                let x, y;
                switch (mover) {
                    case 0:
                        x = i - 1;
                        y = j;
                        break;
                    case 1:
                        x = i + 1;
                        y = j;
                        break;
                    case 2:
                        x = i;
                        y = j - 1;
                        break;
                    case 3:
                        x = i;
                        y = j + 1;
                        break;
                }
                if (x < 0 || x > 99 || y < 0 || y > 99) {
                    // move to other side of grid
                    if (x < 0) {
                        x = 99;
                    } else if (x > 99) {
                        x = 0;
                    }
                    if (y < 0) {
                        y = 99;
                    } else if (y > 99) {
                        y = 0;
                    }
                }

                if (grid[x][y] == 0) {
                    grid[x][y] = 1;
                    grid[i][j] = 0;
                    document.getElementById(`${x}x${y}`).className = "sm";
                    document.getElementById(`${i}x${j}`).className =
                        "background";
                } else if (grid[x][y] == "f") {
                    grid[x][y] = 1;
                    grid[i][j] = 0;
                    document.getElementById(`${x}x${y}`).className = "sm";
                    document.getElementById(`${i}x${j}`).className =
                        "background";
                    food--;
                    console.log(`Animals: ${animals} Food: ${food}`);
                }
            }
        }
    }
}, 250);
