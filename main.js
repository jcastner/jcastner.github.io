// Global Variables
var oldTimeStamp = 0;
var secondsPassed = 0;
var launchPadCanvas = document.getElementById("launchPadCanvas");
var launchPadCanvasContext = launchPadCanvas.getContext("2d");
var stars = generateStarField();

// Functions
function Star(x, y) { // Star class
    this.x = x;
    this.y = y;
    this.size = Math.floor((Math.random() * 4) + 2);
    this.velocity = Math.floor((Math.random() * 10) + 3);
}

// Generates an array of stars on the screen
function generateStarField() {
    // Split screen into rows and generate stars from there to avoid over lapping
    var rows = document.body.clientHeight;
    var cols = document.body.clientWidth;
    var stars = [];

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            // Draw or naw
            if(Math.random() > 0.9998) {
                var s = new Star(j, i);
                stars.push(s);
            }
        }
    }

    return stars;
}

// Animates the stars
function updateStarField() {
    for (var i = 0; i < stars.length; i++) { // Loop through stars and sub y to make moving up animation
        stars[i].y -= (stars[i].velocity * secondsPassed*2);

        if(stars[i].y < -3) // Remove stars from the array that are not on the screen
            stars.splice(i, 1);

        if(Math.random() > 0.999800000) { // Randomly generate new stars at the bottom of the screen every once in a while, probably a better way to do this
            var s = new Star(Math.floor((Math.random() * (document.body.clientWidth-3)) + 3), document.body.clientHeight + 3);
            stars.push(s);
        }
    }
}

// Render the stars to the screen
function renderStarField() {
    // Generate stars and draw
    launchPadCanvasContext.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight); // Clear the screen
    launchPadCanvasContext.fillStyle = "white";
    for (var i = 0; i < stars.length; i++) { // Draw all stars
        launchPadCanvasContext.beginPath();
        launchPadCanvasContext.rect(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
        launchPadCanvasContext.fill();
    }
}

// Animation loop for moving stars
function animationLoop(timestamp) {
    secondsPassed = (timestamp - oldTimeStamp) / 1000;
    oldTimeStamp = timestamp;

    updateStarField(secondsPassed);
    renderStarField();

    var fps = Math.round(1/secondsPassed);
    // launchPadCanvasContext.fillText("FPS: " + fps, 10, 30);

    window.requestAnimationFrame(animationLoop);
}

$(function() { // Page load
    // Initial setup stuff
    launchPadCanvas.width = document.body.clientWidth;
    launchPadCanvas.height = document.body.clientHeight;
    $('#welcomeBanner').animate({'opacity': '.96'}, 5000);
    //$('#welcomeBanner').css('left', ((document.body.clientWidth / 2) - ($('#welcomeBanner').width() / 2)).toString() + 'px');

    window.requestAnimationFrame(animationLoop);

    // Window resizing things
    $(window).on('resize', function() {
        launchPadCanvas.width = document.body.clientWidth;
        launchPadCanvas.height = document.body.clientHeight;

        stars = generateStarField(launchPadCanvasContext);

        //$('#welcomeBanner').css('left', ((document.body.clientWidth / 2) - ($('#welcomeBanner').width() / 2)).toString() + 'px');
    });
});