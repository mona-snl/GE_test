const clockContainer = document.getElementById("clockContainer");
const addButton = document.getElementById("addButton");
const watchDisplay = document.getElementById("watch");
const modeButton = document.getElementById("modeBtn");
const increaseButton = document.getElementById("increaseBtn");
const lightButton = document.getElementById("lightBtn");
const grand_rectangles = document.getElementsByClassName('grand-rectangle');

class Clock {
  constructor(timezone) {
    this.timezone = timezone;
    this.clockElement = document.createElement("div");
    this.clockElement.className = "clock";
    clockContainer.appendChild(this.clockElement);

    this.canvasContainer = document.createElement("div");
    this.canvasContainer.className = "canvas-container";
    this.clockElement.appendChild(this.canvasContainer);

    this.clockCanvas = document.createElement("canvas");
    this.clockCanvas.className = "clock-canvas";
    this.clockCanvas.width = 100;
    this.clockCanvas.height = 100;
    this.canvasContainer.appendChild(this.clockCanvas);

    this.clockCircle = document.createElement("div");
    this.clockCircle.className = "clock-circle";
    this.canvasContainer.appendChild(this.clockCircle);

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.editButton = document.createElement("button");
    this.editButton.textContent = "Edit Timezone";
    this.clockElement.appendChild(this.editButton);
    this.editButton.addEventListener("click", () => this.editClock());

    this.resetButton = document.createElement("button");
    this.resetButton.textContent = "Reset to GMT+0";
    this.clockElement.appendChild(this.resetButton);
    this.resetButton.addEventListener("click", () => this.resetClock());

    this.display24Hour = true;
    this.formatButton = document.createElement("button");
    this.formatButton.textContent = "Toggle Format";
    this.clockElement.appendChild(this.formatButton);
    this.formatButton.addEventListener("click", () => this.toggleFormat());
  }

  updateTime() {
    const now = new Date();
    const offset = this.timezone * 3600000;
    const time = new Date(now.getTime() + offset);

    this.timezoneElement.textContent = `Timezone: GMT${this.timezone > 0 ? '+' : ''}${this.timezone}`;
    
    this.drawTimeOnCanvas(time);
  }

  drawTimeOnCanvas(time) {
    const context = this.clockCanvas.getContext("2d");
    context.clearRect(0, 0, this.clockCanvas.width, this.clockCanvas.height);

    const centerX = this.clockCanvas.width / 2;
    const centerY = this.clockCanvas.height / 2;
    const radius = this.clockCanvas.width / 2;

    context.textAlign = "center";
    context.textBaseline = "middle";

    // Draw the circle border
    context.strokeStyle = "#333";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.stroke();

    let timeString;
    if (mode === 0) {
      timeString = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    } else if (mode === 1) {
      timeString = time.getMinutes().toString().padStart(2, "0");
    } else {
      timeString = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // Set fill style based on light state
    if (isLightOn) {
      context.fillStyle = "#333"; // Dark text color
    } else {
      context.fillStyle = "white"; // Light text color
    }

    // Display time inside the circle
    context.font = "18px Arial";
    context.fillText(timeString, centerX, centerY);

    // Display GMT information below the time
    context.font = "12px Arial";
    context.fillText(`GMT${this.timezone > 0 ? '+' : ''}${this.timezone}`, centerX, centerY + radius + 15);
  }




  editClock() {
    const newTimezone = parseInt(prompt("Enter new timezone (e.g., 1 for GMT+1)", this.timezone));
    if (!isNaN(newTimezone)) {
      this.timezone = newTimezone;
      this.updateTime();
    }
  }

  resetClock() {
    this.timezone = 0;
    this.updateTime();
  }

  toggleFormat() {
    this.display24Hour = !this.display24Hour;
    this.updateTime();
  }
}

addButton.addEventListener("click", () => {
  const newTimezone = parseInt(prompt("Enter timezone for the new clock (e.g., 1 for GMT+1)"));
  if (!isNaN(newTimezone)) {
    const newClock = new Clock(newTimezone);
    
    // Call the drawTimeOnCanvas method for the new clock to apply the initial display
    newClock.drawTimeOnCanvas(new Date()); // Display the current time with GMT information
  }
});

let mode = 0;
let isLightOn = false;
let currentTime = new Date();

function updateTime() {
      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      const seconds = currentTime.getSeconds().toString().padStart(2, "0");
      watchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

function increaseTime() {
  if (mode === 0) {
    currentTime.setHours(currentTime.getHours() + 1);
  } else if (mode === 1) {
    currentTime.setMinutes(currentTime.getMinutes() + 1);
  }
  updateTime();
}

function toggleMode() {
  mode = (mode + 1) % 3;
  if (mode === 2) {
    modeButton.textContent = "";
    lockedText.textContent = "Mode (Locked)";
    lockedText.style.position = "absolute";
    lockedText.style.top = "-10px";   // Modifier la position verticale
    lockedText.style.left = "-5px"; // Modifier la position horizontale
    modeButton.appendChild(lockedText);
    increaseButton.disabled = true;
  } else if (mode === 1) {
    modeButton.textContent = "";
    lockedText.textContent = "Mode (Minute)";
    lockedText.style.position = "absolute";
    lockedText.style.top = "-10px";   // Modifier la position verticale
    lockedText.style.left = "-5px"; // Modifier la position horizontale
    modeButton.appendChild(lockedText);
    increaseButton.disabled = false;
  } else {
    modeButton.textContent = "";
    lockedText.textContent = "Mode (Hours)";
    lockedText.style.position = "absolute";
    lockedText.style.top = "-10px";   // Modifier la position verticale
    lockedText.style.left = "-5px"; // Modifier la position horizontale
    modeButton.appendChild(lockedText);
    increaseButton.disabled = false;
  }
}

function toggleLight() {
  isLightOn = !isLightOn;
  if (isLightOn) {
    for (const grand_rectangle of grand_rectangles) {
      grand_rectangle.style.backgroundColor = "white";
    }
    document.body.style.color = "black";
    for (const button of buttons) {
      button.style.color = "black"; // Changer la couleur du texte en jaune
    }
    for (const rectangle of rectangles) {
      rectangle.style.backgroundColor = "white";
    }
  } else {
    for (const grand_rectangle of grand_rectangles) {
      grand_rectangle.style.backgroundColor = "black";
    }
    document.body.style.color = "black";
    for (const button of buttons) {
      button.style.color = "#F9FCA3"; // Changer la couleur du texte en jaune
    }
    for (const rectangle of rectangles) {
      rectangle.style.backgroundColor = "#F9FCA3";
    }
  }
}


modeButton.addEventListener("click", toggleMode);
increaseButton.addEventListener("click", increaseTime);
lightButton.addEventListener("click", toggleLight);

// ... (existing addButton click event listener)

updateTime();
setInterval(updateTime, 1000);