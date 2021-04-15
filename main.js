// Objects
function Star(x, y, animeIntr, ctx) {
    this.x = x;
    this.y = y;
    this.size = Math.floor((Math.random() * 3) + 1);
    this.animeIntr = animeIntr;
    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = "white";
        ctx.fill();
    };
    this.update = function() {
        this.draw();
    }
}

// Functions
function generateStarField() {
    // Split screen into rows and generate stars from there to avoid over lapping
    var rows = document.body.clientHeight;
    var cols = document.body.clientWidth;
    var stars = [];

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            // Draw or naw
            if(Math.random() > 0.998) {
                var s = new Star(j, i, ctx);
                stars.push(s);
            }
        }
    }
}

function renderStarField(stars) {
    // Generate stars and draw
    for (var s in stars) {
        s.draw();
    }
}

function animateStarField(stars) {
    
}

function init() {
    timer = setInterval(animateStarField, 5);
    return timer;
}

$(function() {
    // Initialize variables
    var launchPadCanvas = document.getElementById("launchPadCanvas");
    var launchPadCanvasContext = launchPadCanvas.getContext("2d");

    // Initial setup stuff
    launchPadCanvas.width = document.body.clientWidth;
    launchPadCanvas.height = document.body.clientHeight;
    $('#welcomeBanner').css('opacity', '0.0').animate({'opacity': '.96'}, 5000);

    // Render the starfield to the screen
    renderStarField(launchPadCanvasContext);

    // Window resizing things
    $(window).on('resize', function() {
        launchPadCanvas.width = document.body.clientWidth;
        launchPadCanvas.height = document.body.clientHeight;
        renderStarField(launchPadCanvasContext);
    });
});