const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d');

// // c.fillRect(0,0, innerWidth, innerHeight);
// // c.fillStyle = '#FFFFFF';
// // c.fillRect(100,300, 300, 400);

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(100, 500);
// c.lineTo(500, 100);
// c.lineTo(550, 150);
// c.lineTo(100, 600);
// c.lineTo(30, 300);
// c.lineTo(50, 300);
// c.strokeStyle = "green";
// c.stroke()

// //circle
// c.beginPath();
// c.arc(300, 300, 30, 0, 6.5);
// c.strokeStyle = 'red';

// c.stroke()

let mouse = {};
const colors = [
  '#000B49',
  '#91C483',
  '#FF6464',
  '#FFE162',
  '#96CEB4',
  '#072227',
];

function getRandomColor(colorArray) {
  return colors[Math.floor(Math.random() * colorArray.length)];
}

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;
}

Object.prototype.draw = function () {
  c.beginPath();
  // console.log({ x: this.x });
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  c.fillStyle = this.color;
  c.fill();
  c.strokeStyle = 'white';
  // c.stroke();
};

Object.prototype.update = function () {
  this.draw();

  if (this.x + this.radius > innerWidth || this.x - this.radius <= 0) {
    this.dx = -this.dx;
  }

  if (this.y + this.radius > innerHeight || this.y - this.radius <= 0) {
    this.dy = -this.dy;
  }

  if (
    mouse.x - this.x < 25 &&
    mouse.x - this.x > -25 &&
    mouse.y - this.y < 25 &&
    mouse.y - this.y > -25 &&
    this.radius < 40
  ) {
    this.radius += 1;
  } else if (this.radius > this.minRadius) {
    this.radius -= 1;
  }

  this.x += this.dx;
  this.y += this.dy;
};

let circleArray = [];
const numberOfCircles = 1000;

function init() {
  circleArray = [];
  for (let i = 0; i < numberOfCircles; i++) {
    let radius = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() * -0.5;
    let dy = Math.random() * -0.5;
    circleArray.push(new Circle(x, y, dx, dy, radius, getRandomColor(colors)));
  }
}

function handleMousemove(e) {
  const { x, y } = e;
  mouse = { x, y };
  console.log(mouse);
}

function handleResize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}

addEventListener('mousemove', handleMousemove);
addEventListener('resize', handleResize);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  circleArray.forEach((circle) => {
    circle.update();
  });
}

animate();
init();
