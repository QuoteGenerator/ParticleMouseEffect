const testRoom1 = document.getElementById("testRoom1");
const testRoom2 = document.getElementById("testRoom2");
const testRoom3 = document.getElementById("testRoom3");

testRoom1.addEventListener("click", function() {
    window.location.href = "/testRoom1/testRoom1.html";
});
testRoom2.addEventListener("click", function() {
    window.location.href = "/testRoom2/testRoom2.html";
});
testRoom3.addEventListener("click", function() {
    window.location.href = "/testRoom3/testRoom3.html";
});


const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


ctx.fillStyle = "black";
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
const spawnRate = 2;

const mouse = {
    mouseX : undefined,
    mouseY : undefined,
    isDown: false
};

class Particle{
    constructor(x, y){
        this.xPosition = x;
        this.yPosition = y;
        this.radius = 5;

        const direction = {x : Math.random() * 180 - 90, y : Math.random() * 180 - 90};
        const magnitude = Math.hypot(direction.x, direction.y);
        this.xDirection = direction.x /= magnitude;
        this.yDirection = direction.y /= magnitude;

        this.speed = 10;
    }    

    draw(){
            
        ctx.beginPath();
        ctx.arc(this.xPosition,this.yPosition,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }

    update(){
        this.xPosition += this.xDirection * this.speed;
        this.yPosition += this.yDirection * this.speed;
    }

}

const particles = [];

document.addEventListener("mousemove", (event) => {
    mouse.mouseX = event.x;
    mouse.mouseY = event.y;
})
canvas.addEventListener("mousedown", () => {
    mouse.isDown = true;
});

canvas.addEventListener("mouseup", () => {
    mouse.isDown = false;
});

function loop(){
   
    ctx.clearRect(0,0,canvas.width,canvas.height)

    for(let i=0; i < spawnRate; i++){
        particles.push(new Particle(-100, -100));
    }

    for(let p of particles){
        p.draw();
        p.update();
    }

    requestAnimationFrame(loop);
}

loop();








