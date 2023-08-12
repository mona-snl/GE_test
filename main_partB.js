const clockContainer = document.getElementById("clockContainer");
const addButton = document.getElementById("addButton");

class Clock {
  constructor(timezone) {
    this.timezone = timezone;
    this.clockElement = document.createElement("div");
    this.clockElement.className = "clock";
    clockContainer.appendChild(this.clockElement);

    this.timezoneElement = document.createElement("h2");
    this.clockCanvas = document.createElement("canvas");
    this.clockCanvas.className = "clock-canvas";
    this.clockCanvas.width = 100;
    this.clockCanvas.height = 100;
    
    this.clockElement.appendChild(this.timezoneElement);
    this.clockElement.appendChild(this.clockCanvas);

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

    const timeString = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    context.font = "18px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#333";
    context.fillText(timeString, centerX, centerY);
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
  }
});