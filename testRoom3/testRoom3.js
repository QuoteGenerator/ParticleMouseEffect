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

const mouse = {
    mouseX : undefined,
    mouseY : undefined,
    isDown: false
};

class Particle{
    constructor(x, y){
        this.xPosition = x;
        this.yPosition = y;
        this.radius = 20;

        const direction = {x : Math.random() * 180 - 90, y : Math.random() * 180 - 90};
        const magnitude = Math.hypot(direction.x, direction.y);
        this.xDirection = direction.x /= magnitude;
        this.yDirection = direction.y /= magnitude;

        this.speed = 0;
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

async function loop(){

    if(mouse.isDown && mouse.mouseX !== undefined && mouse.mouseY !== undefined){
        particles.push(new Particle(mouse.mouseX, mouse.mouseY));
    }

    for(let p of particles){
        p.draw();
        p.update();
    }

    requestAnimationFrame(loop);
}

loop();






