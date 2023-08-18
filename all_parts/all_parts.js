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
const circleClock = document.querySelector('.circle_clock'); // Selecting the correct element
const circleContainer = document.querySelector('.clockContainer');
const container = document.querySelector('#clockContainer');

const rotationMatrix = new Matrix3x3(); // Identity matrix initially

const scaleUpButton = document.getElementById('scale-up');
const scaleDownButton = document.getElementById('scale-down');
const centerRadio = document.getElementById('center-revolution');
const topLeftRadio = document.getElementById('top-left-revolution');
const customPointRadio = document.getElementById('custom-point-revolution');
const customPointXInput = document.getElementById('custom-point-x');
const customPointYInput = document.getElementById('custom-point-y');
const createRandomPointButton = document.getElementById('create-random-point');

// Scale variables
let scaleValue = 1;
const scaleStep = 0.1;
const watchFace = document.querySelector('.clock-face');

scaleUpButton.addEventListener('click', () => {
  scaleValue += scaleStep;
  updateScale();
});

// Scale down function
scaleDownButton.addEventListener('click', () => {
  scaleValue -= scaleStep;
  if (scaleValue < scaleStep) {
    scaleValue = scaleStep;
  }
  updateScale();
});

// Function to update the scale of the container
function updateScale() {
  circleContainer.style.transform = `scale(${scaleValue})`;
}



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
  customPointXInput.value = revolutionPoint[0] + Math.cos(angle) * revolutionPoint[0];
  customPointYInput.value = revolutionPoint[1] + Math.sin(angle) * revolutionPoint[1];
  revolutionPoint = [customPointXInput.value,customPointYInput.value]

});

let isAnimating = true; // Flag to control animation

// Add an event listener to the "Stop Animation" button
const stopAnimationButton = document.getElementById('stopAnimation');
stopAnimationButton.addEventListener('click', () => {
  isAnimating = false; // Stop the animation
});

function animateClockContainer() {
  if (!isAnimating) return; // Exit if animation is stopped
  const container = document.querySelector('.clockContainer');
  const angle = (performance.now() / 1000) * (Math.PI / 2); // Rotating 90 degrees per second
  rotationMatrix.elements = Matrix3x3.rotation(angle).elements;

  const position = [revolutionPoint[0], revolutionPoint[1], 1]; // Custom revolution point
  const transformedPosition = rotationMatrix.transformPoint(revolutionPoint);

    container.style.transform = `translate(${revolutionPoint[0]}px, ${revolutionPoint[1]}px) rotate(${angle}rad) scale(${scaleValue})`;


  requestAnimationFrame(animateClockContainer);
}


animateClockContainer()


const clockContainer = document.getElementById("clockContainer");
const addClockButton = document.getElementById("addClockButton");
const clocks = [];

function createClock(timeZone) {
  const clock = document.createElement("div");
  clock.className = "clock";

  const timeContainer = document.createElement("div");
  timeContainer.className = "time-container";

  const circle = document.createElement("div");
  circle.className = "circle";

  const timeDisplay = document.createElement("div");
  timeDisplay.className = "time-display";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const modeButton = document.createElement("button");
  modeButton.className = "button mode-button";
  const increaseButton = document.createElement("button");
  increaseButton.className = "button button2";
  const resetButton = document.createElement("button");
  resetButton.className = "button button3";
  const editBtn = document.createElement("button");
  editBtn.className = "button edit-button";
  editBtn.textContent = "Edit Timezone";
  const lightButton = document.createElement("button");
  lightButton.className = "button light-button";
  lightButton.textContent = "Light";

  let mode = 0; // 0: Minute, 1: Hour, 2: Locked
  let currentTime = new Date();
  let lightOn = false;
  let is24HourFormat = true;

  function updateTime() {
    const utcTime = currentTime.getTime() + (timeZone * 60 * 60000);
    const localTime = new Date(utcTime);

    const hours = localTime.getHours().toString().padStart(2, "0");
    const minutes = localTime.getMinutes().toString().padStart(2, "0");

    const time = is24HourFormat
      ? `${hours}:${minutes}`
      : `${(hours % 12 || 12)}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;

    timeDisplay.textContent = time;
    if (lightOn) {
      clock.style.color = "white";
      timeDisplay.style.backgroundColor = "yellow";
      clock.style.backgroundColor = "yellow";
    } else {
      timeDisplay.style.color = "black";
      timeDisplay.style.backgroundColor = "white";
      clock.style.backgroundColor = "white";
    }
  }

  function increaseTime() {
    if (mode === 0) {
      currentTime.setMinutes(currentTime.getMinutes() + 1);
    } else if (mode === 1) {
      currentTime.setHours(currentTime.getHours() + 1);
    }
    updateTime();
  }

  function toggleMode() {
    mode++;
    if (mode > 2) {
      mode = 0;
    }
    switch (mode) {
      case 0:
        modeButton.textContent = "Mode: Minute";
        increaseButton.textContent = "Increase Minute";
        break;
      case 1:
        modeButton.textContent = "Mode: Hour";
        increaseButton.textContent = "Increase Hour";
        break;
      case 2:
        modeButton.textContent = "Mode: Locked";
        increaseButton.textContent = "No Increase";
        break;
    }
  }

  function resetTime() {
    timeZone = 0;
    updateTime();
  }

  function toggleLight() {
    lightOn = !lightOn;
    updateTime();
  }

  increaseButton.textContent = "Increase";
  increaseButton.addEventListener("click", increaseTime);

  modeButton.textContent = "Mode: Minute";
  modeButton.addEventListener("click", toggleMode);

  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", resetTime);

  timeDisplay.style.fontSize = "24px";
  updateTime();

  timeContainer.appendChild(circle);
  timeContainer.appendChild(timeDisplay);

  buttonContainer.appendChild(modeButton);
  buttonContainer.appendChild(increaseButton);
  buttonContainer.appendChild(resetButton);
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(lightButton);

  clock.appendChild(timeContainer);
  clock.appendChild(buttonContainer);

  clockContainer.appendChild(clock);

  clocks.push(clock);

  editBtn.addEventListener("click", () => {
    const newTimezone = parseFloat(prompt("Enter new timezone offset (e.g., 1 for GMT+1):"));
    if (!isNaN(newTimezone)) {
      timeZone = newTimezone;
      updateTime();
    }
  });

  lightButton.addEventListener("click", toggleLight);
}
 

function addClockWithTimeZone(timeZone) {
  createClock(timeZone);
}

addClockButton.addEventListener("click", function () {
  const timeZone = parseFloat(prompt("Enter time zone offset (e.g., 1 for GMT+1):"));
  if (!isNaN(timeZone)) {
    addClockWithTimeZone(timeZone);
  }
});

createClock(0); // Initial clock with GMT