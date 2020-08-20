// JavaScript source code

//cavnas keeping
var canvas = document.getElementById('mazeSurface');
var ctx = canvas.getContext("2d");
//Canvas style
var style = canvas.style;
style.border = "1px solid #000000";
style.background = "#dddddd";
style.marginLeft = "auto";
style.marginRight = "auto";
style.padding = 10;
var parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";

class MazeCell {
	//x and y locations in rows and columns
	x;
	y;
	visited;
	bottomWall;
	rightWall;
}

var rows = 10;
var columns = 10;
var totalCells = rows * columns;
var cells = [];
var currentCell;
var nextCell;
var mazeOrder = []; 

var settingUp = true;

var canDraw = false;

function doMaze() {
	if (settingUp) {
		setup();
		//Total boundary
		ctx.strokeRect(100, 100, 50 * columns, 50 * rows);
		settingUp = false;
	}
}
//Draw and generate maze
setInterval(draw, 100);

function setup() {
	//Initialize cells
	var i = 0;
	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < columns; x++) {
			cells[i] = new MazeCell();
			cells[i].visited = false;
			cells[i].x = x;
			cells[i].y = y;
			cells[i].bottomWall = true;
			cells[i].rightWall = true;
			i++;
		}
	}
	//Start at a random cell
	var randomCell = Math.floor(Math.random() * totalCells); 
	currentCell = randomCell;
	cells[currentCell].visited = true;
	mazeOrder.unshift(currentCell);
}

function draw() {
	if (canDraw) {
		drawMaze();
		if (mazeOrder.length == totalCells) {

		} else {
			generate();
		}
    }
}

function drawMaze() {
	//draw cells
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].visited && i != currentCell) {
			ctx.fillStyle = "#848484";
		} else if (i == currentCell) {
			ctx.fillStyle = "#616161";
		} else {
			ctx.fillStyle = "#DDDDDC";
		}
		ctx.fillRect(100 + (cells[i].x * 50), 100 + (cells[i].y * 50), 50, 50);
		//Draw walls
		if (cells[i].bottomWall) {
			ctx.fillStyle = "#FF0000";
			ctx.beginPath();
			ctx.moveTo(100 + (cells[i].x * 50), 150 + (cells[i].y * 50));
			ctx.lineTo(150 + (cells[i].x * 50), 150 + (cells[i].y * 50));
			ctx.stroke();
		}
		if (cells[i].rightWall) {
			ctx.fillStyle = "#FF0000";
			ctx.beginPath();
			ctx.moveTo(150 + (cells[i].x * 50), 100 + (cells[i].y * 50));
			ctx.lineTo(150 + (cells[i].x * 50), 150 + (cells[i].y * 50));
			ctx.stroke();
		}
	}
}

function generate() {
	nextCell = getUnvisitedNeighbor(currentCell);
	if (nextCell != -1) {
		//System.out.println("Cell " + currentCell);
		//System.out.println("NextCell " + nextCell);
		removeWall(currentCell, nextCell);
		currentCell = nextCell;
		mazeOrder.unshift(currentCell);
		cells[currentCell].visited = true;
	} else if (nextCell == -1) {
		for (var i = 0; i < mazeOrder.length - 1; i++) {
			var previousCell = mazeOrder[i];
			//System.out.println("Previous: " + previousCell);
			var possibleNextCell = getUnvisitedNeighbor(previousCell);
			if (possibleNextCell != -1) {
				//System.out.println("Possible: " + possibleNextCell);
				//currentCell = possibleNextCell;
				currentCell = previousCell;
				break;
			}
		}
	}
}

function getUnvisitedNeighbor(currentCell) {
	//Current cell location
	var x = cells[currentCell].x;
	var y = cells[currentCell].y;

	//Possible cells to visit
	var possibleNeighbors = [4];
	//Cells found
	var found = 0;

	//left 
	if (x > 0 && !cells[currentCell - 1].visited) {
		possibleNeighbors[found] = currentCell - 1;
		found++;
	}

	//right
	if (x < columns - 1 && !cells[currentCell + 1].visited) {
		possibleNeighbors[found] = currentCell + 1;
		found++;
	}

	//up
	if (y > 0 && !cells[currentCell - columns].visited) {
		possibleNeighbors[found] = currentCell - columns;
		found++;
	}

	//down
	if (y < rows - 1 && !cells[currentCell + columns].visited) {
		possibleNeighbors[found] = currentCell + columns;
		found++;
	}

	if (found == 0) {
		return -1;
	}
	//choose a random candidate
	var choice = Math.floor(Math.random() * found); 
	return possibleNeighbors[choice];
}

function removeWall(currentCell, nextCell) {
	//Next cell is to left of current cell, current Cell is not on left edge
	if (cells[currentCell].x - cells[nextCell].x > 0 && cells[currentCell].x > 0) {
		//Remove next cell, right wall
		cells[nextCell].rightWall = false;
	}
	//Next cell is to right of current wall, current cell is not on right edge
	if (cells[currentCell].x - cells[nextCell].x < 0 && cells[currentCell].x < columns - 1) {
		//Remove current cell, right wall
		cells[currentCell].rightWall = false;
	}
	//Next cell is above current cell, current cell is not on top row
	if (cells[currentCell].y - cells[nextCell].y > 0 && cells[currentCell].y > 0) {
		//Remove next cell, bottom wall
		cells[nextCell].bottomWall = false;
	}
	//Next cell is below current cell, current cell is not on bottom row
	if (cells[currentCell].y - cells[nextCell].y < 0 && cells[currentCell].y < rows - 1) {
		//Remove current cell, bottom wall
		cells[currentCell].bottomWall = false;
	}
}


//draw total boundary
ctx.strokeRect(100, 100, 50 * columns, 50 * rows);
document.getElementById("startMaze").addEventListener("click", function () {
	doMaze();
	canDraw = true;
	console.log(canDraw);
});

//Reset maze
document.getElementById("resetMaze").addEventListener("click", reset);

function reset() {
	//Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Redraw border
	ctx.strokeRect(100, 100, 50 * columns, 50 * rows);
	//Reset variables
	cells = [];
	currentCell;
	nextCell;
	mazeOrder = [];
	settingUp = true;
	canDraw = false;
}