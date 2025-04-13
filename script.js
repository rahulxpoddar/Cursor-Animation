const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

let colorIndex = 0;
let hue = 0;
let colorChangeDelay = 0;
const COLOR_CHANGE_THRESHOLD = 1;
const FPS = 60;
const SECONDS_PER_CYCLE = 300;
const HUE_INCREMENT = 360 / (FPS * SECONDS_PER_CYCLE);

function getNextColor() {
  hue = (hue + HUE_INCREMENT) % 360;
  const saturation = 70;
  const lightness = 30;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.lastX = 0;
  circle.lastY = 0;
  circle.style.backgroundColor = getNextColor();
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    const dx = x - circle.lastX;
    const dy = y - circle.lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 1) {
      circle.style.backgroundColor = getNextColor();
    }

    const minSize = 5;
    const maxSize = 40;
    const dynamicSize = minSize + (speed * 5);
    const size = Math.min(Math.max(dynamicSize, minSize), maxSize);

    const fadeFactor = (circles.length - index) / circles.length;
    const opacity = 0.2 + (fadeFactor * 0.8);

    circle.style.width = `${size * fadeFactor}px`;
    circle.style.height = `${size * fadeFactor}px`;
    circle.style.opacity = opacity;

    circle.style.left = x - ((size * fadeFactor) / 2) + "px";
    circle.style.top = y - ((size * fadeFactor) / 2) + "px";

    const nextCircle = circles[index + 1] || circles[0];

    circle.lastX = x;
    circle.lastY = y;
    circle.x = x;
    circle.y = y;

    x += (nextCircle.x - x) * 0.5;
    y += (nextCircle.y - y) * 0.5;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();