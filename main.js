//the only variable attached to the global state.
var GameModule = (function() {

    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");

    //coordinate system for the canvas starts at the top left
    var PCx = canvas.width/2;
    var PCy = canvas.height-30;

    var upKey = false;
    var downKey = false;
    var leftKey = false;
    var rightKey = false;

    var pcHeight = 15;
    var pcWidth = 15;

    var moveSpeed = 5;

    function keyDownHandler(e) {
        if(e.keyCode === 87 || e.keyCode === 38) {
            upKey = true;
        } else if(e.keyCode === 83 || e.keyCode === 40) {
            downKey = true;
        } else if(e.keyCode === 65 || e.keyCode === 37) {
            leftKey = true;
        } else if(e.keyCode === 68 || e.keyCode === 39) {
            rightKey = true;
        }
    }
    
    function keyUpHandler(e) {
        if(e.keyCode === 87 || e.keyCode === 38) {
            upKey = false;
        } else if(e.keyCode === 83 || e.keyCode === 40) {
            downKey = false;
        } else if(e.keyCode === 65 || e.keyCode === 37) {
            leftKey = false;
        } else if(e.keyCode === 68 || e.keyCode === 39) {
            rightKey = false;
        }
    }

    //add event listeners for key presses
    document.addEventListener("keydown",keyDownHandler,false);
    document.addEventListener("keyup",keyUpHandler,false);

    //paints the character / PC
    function drawPC() {
        ctx.beginPath();
        ctx.rect(PCx, PCy, pcHeight, pcWidth);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    //everything that is drawn each frame
    function draw() {
        //clears the canvas object of anything painted before
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //draws a circle
        drawPC();
        //collision detection of canvas walls and user input handling
        //right or left
        if(rightKey && PCx < canvas.width - pcWidth) {
            PCx += moveSpeed;
        } else if(leftKey && PCx > 0) {
            PCx -= moveSpeed;
        }
        //up or down
        if (upKey && PCy > 0) {
            PCy -= moveSpeed;
        } else if(downKey && PCy <canvas.height - pcHeight) {
            PCy += moveSpeed;
        }
        requestAnimationFrame(draw);
    }

    //call the draw function
    draw();
})();
