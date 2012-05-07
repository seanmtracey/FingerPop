var canvas = document.getElementById('fingerCanvas');
var ctx = canvas.getContext('2d');

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var touchX;
var touchY;

var makeParticles = false;
var howMany = 200;

var cache = window.applicationCache;

console.log(cache);

canvas.addEventListener('touchstart', function(e){
	touchX = e.pageX;
	touchY = e.pageY;
	makeParticles = true;
}, false);

canvas.addEventListener('touchmove', function(e){
	touchX = e.pageX;
	touchY = e.pageY;
}, false);

canvas.addEventListener('touchend', function(){
	makeParticles = false;
}, false);

canvas.addEventListener('mousedown', function(e){
	makeParticles = true;
}, false);


canvas.addEventListener('mousemove', function(e) {
	touchX = e.pageX;
	touchY = e.pageY;
}, false);

canvas.addEventListener('mouseup', function(e) {
	makeParticles = false;
}, false);

document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

var playAnimation = true;

resizeCanvas();

var particleArray = [];

var Particle = function (x, y, radius, r, g, b, a, vx, vy){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	this.vx = vx;
	this.vy = vy;
}//ends Particle();

//ctx.arc(atBall.x, atBall.y, 22, 0, Math.PI*2, false);

animate();

function animate(){

	var randomRadius = Math.floor(Math.random()*30);

	var randomRed = Math.floor(Math.random()*255);
	var randomGreen = Math.floor(Math.random()*255);
	var randomBlue = Math.floor(Math.random()*255);

	var randomVX = Math.random()*10 + Math.random()*-10 ;
	var randomVY = Math.random()*10 + Math.random()*-10;

	if(makeParticles){
		particleArray.push(new Particle(touchX, touchY, randomRadius, randomRed, randomGreen, randomBlue, 1, randomVX, randomVY));
	}

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	for(i=0;i<particleArray.length;i++){

        if(outOfBounds(particleArray[i].x, particleArray[i].y, particleArray[i].radius)) {
            particleArray.splice(i, 1);
        } else {
            var tmpBall = particleArray[i];

            ctx.fillStyle = "rgba(" + tmpBall.r + ", " + tmpBall.g + ", " + tmpBall.b + ", " + tmpBall.a + ")";

            ctx.beginPath();
            ctx.arc(tmpBall.x, tmpBall.y, tmpBall.radius, 0, Math.PI*2, false);
            ctx.closePath;
            ctx.fill();

            tmpBall.x += tmpBall.vx;
            tmpBall.y += tmpBall.vy;
        }
	}

	if(particleArray.length >= howMany){
		particleArray.shift();
	}

	setTimeout(animate, 33);

}

/**
 * Out Of Bounds
 *
 * Returns true if coordinates of ball place it off-screen.
 */
function outOfBounds(x, y, diameter) {
    if( x < 0 - diameter || x > $( window ).width() + diameter ) {
        if( y < 0 - diameter || y > $( window ).height() + diameter ) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
