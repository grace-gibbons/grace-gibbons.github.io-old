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





//The player, further defined below(this is the varaible, not object)
var player;
//var obstacle; 
var counter0 = 1; 
var counter1 = 1; 
var counter2 = 1;
var counter3 = 1; 

let onScreen = [false, false, false];
let obstacleLocation = [600, 800, 1000]; 

//we start this function inside the body tag
function startGame() {
    //Begins running the interval, which allows the player motion to be updated
    myGameArea.start();
    //We create a player with the x, y, w, and h
    player = new Player(320, 400, 20, 20);

    obstacle0 = new Obstacle(600, 380, 20, 20); 
    obstacle1 = new Obstacle(800, 380, 20, 20); 
    obstacle2 = new Obstacle(1000, 380, 20, 20); 
    obstacle3 = new Obstacle(1200, 380, 20, 20); 
    
    
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
        
        if(keyPresses.w) {
            player.playerY -= 4.2;
        }
        /*
        if(keyPresses.s) {
            //player.playerY += 5;
        }
        if(keyPresses.a) {
            //player.playerX += -speed;
            //obstacle.updateX();
            //obstacle.obstacleX += speed; 
        }
        if(keyPresses.d) {
            //player.playerX += speed;
            //obstacle.updateX();
            //obstacle.obstacleX -= speed;
        }*/

        //Affected by gravity when not on ground
        this.gravitySpeed += this.gravity;
        this.playerY += this.gravitySpeed; 
        this.hitGround(); 

        //Player is always moving
        //this.playerX += this.playerSpeed; 
        

        //Stop player from moving off screen
        /*if(player.playerX > 640 - player.playerW) {
            player.playerX = 640 - player.playerW; 
        } else if(player.playerX < 0) {
            player.playerX = 0; 
        } else if(player.playerY > 480 - player.playerH) {
            player.playerY = 480 - player.playerH;
        } else if(player.playerY < 0) {
            player.playerY = 0; 
        }*/
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

function Obstacle(obstacleX, obstacleY, obstacleW, obstacleH) {
    this.originalX = obstacleX; 
    this.obstacleX = obstacleX;
    this.obstacleY = obstacleY; 
    this.obstacleW = obstacleW;
    this.obstacleH = obstacleH;
    this.update = function() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.obstacleX, this.obstacleY, this.obstacleW, this.obstacleH);
    }
    this.move = function() {
        if(keyPresses.a) {
            this.obstacleX += 4;  
        }
        if(keyPresses.d) {
            this.obstacleX -= 4;
        }
        //player is always moving which means that the obstacles are always moving
        this.obstacleX -= player.playerSpeed;  
        //Every 10 seconds increase the speed
        //player.playerSpeed = setInterval(function() {player.playerSpeed + 0.00001}, 1000); 
    }
    //Recycle obstacles
    this.recycle0 = function() {
        if(this.obstacleX < 0) {
            this.obstacleX = this.originalX+(800 * counter0);
            counter0++;  
            //window.alert(this.obstacleX); 
        }
    }
    this.recycle1 = function() {
        if(this.obstacleX < 0) {
            this.obstacleX = this.originalX+(800 * counter1);
            counter1++; 
            //window.alert(this.obstacleX);
        }
    }
    this.recycle2 = function() {
        if(this.obstacleX < 0) {
            this.obstacleX = this.originalX+(800 * counter2);
            counter2++; 
            //window.alert(this.obstacleX);
        }
    }
    this.recycle3 = function() {
        if(this.obstacleX < 0) {
            this.obstacleX = this.originalX+(800 * counter3);
            counter3++; 
            //window.alert(this.obstacleX);
        }
    }

    this.recycle = function() {
        if(this.obstacleX >= 0) {
            if(this.originalX == 600) {
                onScreen[0] = true; 
            } else if(this.originalX == 800) {
                onScreen[1] = true;
            } else if(this.originalX == 1000) {
                onScreen[2] = true; 
            }
        }
        if(this.obstacleX < 0) {
            if(this.originalX == 600) {
                onScreen[0] = false; 
            } else if(this.originalX == 800) {
                onScreen[1] = false;
            } else if(this.originalX == 1000) {
                onScreen[2] = false; 
            }
            for(let i = 0; i < obstacleLocation.length; i++) {
                if(!onScreen[i] == onScreen[0]) {
                    
                }    
            }
        }
    }
}


//Note that this key method is not good if the user hits many keys at once because we could end up in a situation where that key is never set to false
//because another key took its place
let keyPresses = {};
//Senses when key has been presses, records it and sets that key to true
window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}
//Senses when key has been released, records it and sets that key to false
window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false; 
}

//Deals with moving, drawing, and erasing the player and other entities
function updateGameArea() {
    myGameArea.clear();
    player.move();
    player.update(); 

    obstacle0.move(); 
    obstacle0.update(); 
    obstacle0.recycle0();

    obstacle1.move(); 
    obstacle1.update(); 
    obstacle1.recycle1(); 

    obstacle2.move(); 
    obstacle2.update(); 
    obstacle2.recycle2(); 

    obstacle3.move(); 
    obstacle3.update(); 
    obstacle3.recycle3(); 
    
}

startGame(); 