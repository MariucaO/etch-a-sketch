// Select the elements on the page
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 30;
// Setup  the canvas for drawing

// using destructuring on the width and height properties of canvas
const { width, height } = canvas;

// create random x & y starting points on the canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke(); // it will connect the dots between the begin and where you start the line

// Write a draw function
// we used destructuring here
function draw({ key }) {
  // increment the hue for obtaining the rainbow
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  console.log(key);
  // start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move or x&y values depending on what the user did

  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    // eslint-disable-next-line default-case-last
    default:
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}
// Clear/shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height); // it will erase the drawing
  canvas.addEventListener(
    'animationend',
    () => {
      console.log('Done the shake!');
      canvas.classList.remove('shake');
    },
    { once: true },
  );
}

// Listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
