class Matrix3x3 {
  constructor(elements) {
    this.elements = elements || [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  static rotation(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix3x3([cos, -sin, 0, sin, cos, 0, 0, 0, 1]);
  }

  transformPoint(point) {
    const x = point[0];
    const y = point[1];
    const z = point[2] || 1;

    const result = new Array(3);

    result[0] = this.elements[0] * x + this.elements[1] * y + this.elements[2] * z;
    result[1] = this.elements[3] * x + this.elements[4] * y + this.elements[5] * z;
    result[2] = this.elements[6] * x + this.elements[7] * y + this.elements[8] * z;

    return result;
  }
}

const circle = document.querySelector('.circle_clock');
const container = document.querySelector('.circle-container');
const rotationMatrix = new Matrix3x3(); // Identity matrix initially


const scaleUpButton = document.getElementById('scale-up');
const scaleDownButton = document.getElementById('scale-down');
const centerRadio = document.getElementById('center-revolution');
const topLeftRadio = document.getElementById('top-left-revolution');
const customPointRadio = document.getElementById('custom-point-revolution');
const customPointXInput = document.getElementById('custom-point-x');
const customPointYInput = document.getElementById('custom-point-y');
const createRandomPointButton = document.getElementById('create-random-point');

let scale = 1; // Initial scale factor

scaleUpButton.addEventListener('click', () => {
  scale += 0.1;
  updateCircleSize();
});

scaleDownButton.addEventListener('click', () => {
  scale -= 0.1;
  if (scale < 0.1) scale = 0.1; // Limit minimum scale
  updateCircleSize();
});


// Update the watch time
function updateWatchTime() {
  const watchTimeElement = document.getElementById('clockTime');
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  watchTimeElement.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Update watch time every second
setInterval(updateWatchTime, 1000);

// Scale variables
let scaleValue = 1;
const scaleStep = 0.1;
const watchFace = document.querySelector('.clock-face');

// Scale up function
document.getElementById('scale-up').addEventListener('click', () => {
  scaleValue += scaleStep;
  watchFace.style.transform = `scale(${scaleValue})`;
});

// Scale down function
document.getElementById('scale-down').addEventListener('click', () => {
  if (scaleValue > scaleStep) {
    scaleValue -= scaleStep;
    watchFace.style.transform = `scale(${scaleValue})`;
  }
});
let revolutionPoint = [100, 100]; // Default revolution point

centerRadio.addEventListener('change', () => {
  revolutionPoint = [100, 100];
});

topLeftRadio.addEventListener('change', () => {
  revolutionPoint = [-100, -100];
});

customPointRadio.addEventListener('change', () => {
  revolutionPoint = [parseInt(customPointXInput.value) || 0, parseInt(customPointYInput.value) || 0];
});

createRandomPointButton.addEventListener('click', () => {
  revolutionPoint = [Math.random() * 200, Math.random() * 200]; // Random point within the container
  customPointXInput.value = revolutionPoint[0];
  customPointYInput.value = revolutionPoint[1];
});

function animateCircle() {
  const angle = (performance.now() / 1000) * (Math.PI / 2); // Rotating 90 degrees per second
  rotationMatrix.elements = Matrix3x3.rotation(angle).elements;

  const position = [revolutionPoint[0], revolutionPoint[1], 1]; // Custom revolution point
  const transformedPosition = rotationMatrix.transformPoint(position);

  circle.style.left = transformedPosition[0] + 'px';
  circle.style.top = transformedPosition[1] + 'px';

  requestAnimationFrame(animateCircle);
}

animateCircle();
