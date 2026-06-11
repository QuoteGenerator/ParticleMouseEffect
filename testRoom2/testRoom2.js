const canvas = document.getElementById("mainCanvas");
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
const spawnRate = 1;
const spawnSpeed = 100;

const smiley = new Image();
smiley.src = "/images/smiley.png"

const mouse = {
    mouseX : undefined,
    mouseY : undefined,
    isDown: false
};

class Particle{
    constructor(x, y){
        this.xPosition = x;
        this.yPosition = y;
        this.radius = 100;

        const direction = {x : Math.random() * 180 - 90, y : Math.random() * 180 - 90};
        const magnitude = Math.hypot(direction.x, direction.y);
        this.xDirection = direction.x /= magnitude;
        this.yDirection = direction.y /= magnitude;

        this.speed = 0;
    }    

    draw(){
        ctx.beginPath();
        ctx.drawImage(smiley,this.xPosition,this.yPosition, this.radius, this.radius)
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

async function loop(){
        for(let i=0; i < spawnRate; i++){
            await new Promise(resolve => setTimeout(resolve, spawnSpeed));
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }

    for(let p of particles){
        p.draw();
        p.update();
    }

    requestAnimationFrame(loop);
}

loop();






