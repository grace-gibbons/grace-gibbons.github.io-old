var canvas = document.getElementById('jumpGame');
var ctx = canvas.getContext("2d");
var style = canvas.style;
style.border = "1px solid #000000"; 
style.background = "#dddddd"; 
style.marginLeft = "auto";
style.marginRight = "auto";
style.padding = 10; 
var parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";

var player;

var up, down, left, right; 

//we start this function inside the body tag
function startGame() {
    //Begins running the interval, which allows the player motion to be updated
    myGameArea.start();
    //We create a player with the x, y, w, and h
    player = new Player(320, 240, 20, 20);
    up = false;
    down = false;
    right = false;
    left = false; 
    
}

var myGameArea = {
    start : function() {
        //This starts a constant loop that runs the updateGameArea 
        this.interval = setInterval(updateGameArea, 20); 
    },
    //Clear the canvas so we only see one square player
    clear : function() {
        ctx.clearRect(0, 0, 640, 480);
    },
}

//Player object
function Player(playerX, playerY, playerW, playerH) {
    this.playerX = playerX;
    this.playerY = playerY;
    this.playerW = playerW;
    this.playerH = playerH; 
    this.gravity = 0.2;
    this.gravitySpeed = 0;
    this.onGround = false; 
    this.playerSpeed = 4; 
    //Draws the player at their most recent location
    this.update = function() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.playerX, this.playerY, this.playerW, this.playerH);
    }
    //Moves the player when the keyboard buttons are pressed
    this.move = function() {
        
        if(up) {
            player.playerY -= 5;
        }
        if(down) {
            player.playerY += 5;
        }
        if(left) {
            player.playerX -= 5; 
        }
        if(right) {
            player.playerX += 5; 
        }
        
        //Stop player from moving off screen
        if(player.playerX > 640 - player.playerW) {
            player.playerX = 640 - player.playerW; 
        } else if(player.playerX < 0) {
            player.playerX = 0; 
        } else if(player.playerY > 480 - player.playerH) {
            player.playerY = 480 - player.playerH;
        } else if(player.playerY < 0) {
            player.playerY = 0; 
        }
    }
    this.hitGround = function() {
        var bottom = 400 - this.playerH;
        if(this.playerY > bottom) {
            this.playerY = bottom; 
            this.onGround = true; 
            this.gravitySpeed = 0; 
        } else {
            this.onGround = false;
        }
    }
}

window.addEventListener("keydown", keyDownListener);
    function keyDownListener(event) {
    switch(event.keyCode) {
        case 83:
            down = true;
            break;
        case 87:
            up = true; 
            break;
        case 65:
            left = true; 
            break;
        case 68:
            right = true; 
            break;
        default:
            return; 
    }
}

window.addEventListener("keyup", keyUpListener);
    function keyUpListener(event) {
    switch(event.keyCode) {
        case 83:
            down = false;
            break;
        case 87:
            up = false; 
            break;
        case 65:
            left = false; 
            break;
        case 68:
            right = false; 
            break;
        default:
            return; 
    }
}

//Deals with moving, drawing, and erasing the player and other entities
function updateGameArea() {
    myGameArea.clear();
    player.move();
    player.update(); 
}

startGame(); 
