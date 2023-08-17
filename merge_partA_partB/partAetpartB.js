let mode = 0; // 0 - Hours, 1 - Minutes, 2 - Not editable
    let isLightOn = false;
    let currentTime = new Date();

    const watchDisplay = document.getElementById("watch");
    const modeButton = document.getElementById("modeBtn");
    const increaseButton = document.getElementById("increaseBtn");
    const lightButton = document.getElementById("lightBtn");
    const rectangles = document.getElementsByClassName('rectangle');
    const buttons = document.querySelectorAll('.small-button span');
    const grand_rectangles = document.getElementsByClassName('grand-rectangle');

    var lockedText = document.createElement("span");



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

    updateTime();
    setInterval(updateTime, 1000);



// Part B
const clockContainer = document.getElementById("clockContainer");
const addButton = document.getElementById("addButton");
const formatButton = document.getElementById("formatButton");

class Clock {
  constructor(timezone) {
    this.timezone = timezone;
    this.display24Hour = true; // Default to 24-hour format
    this.clockElement = document.createElement("div");
    this.clockElement.className = "clock";
    clockContainer.appendChild(this.clockElement);

    this.timezoneElement = document.createElement("h2");
    this.timeElement = document.createElement("p");
    this.editButton = document.createElement("button");
    this.resetButton = document.createElement("button");
    this.formatButton = document.createElement("button");

    this.clockElement.appendChild(this.timezoneElement);
    this.clockElement.appendChild(this.timeElement);
    this.clockElement.appendChild(this.editButton);
    this.clockElement.appendChild(this.resetButton);
    this.clockElement.appendChild(this.formatButton);

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.editButton.textContent = "Edit Timezone";
    this.editButton.addEventListener("click", () => this.editClock());

    this.resetButton.textContent = "Reset to GMT+0";
    this.resetButton.addEventListener("click", () => this.resetClock());

    this.formatButton.textContent = "Toggle Format";
    this.formatButton.addEventListener("click", () => this.toggleFormat());
  }

  updateTime() {
    const now = new Date();
    const offset = this.timezone * 3600000;
    const time = new Date(now.getTime() + offset);

    const options = { hour: '2-digit', minute: '2-digit' };
    if (!this.display24Hour) {
      options.hour12 = true;
    }

    this.timezoneElement.textContent = `Timezone: GMT${this.timezone > 0 ? '+' : ''}${this.timezone}`;
    this.timeElement.textContent = `Time: ${time.toLocaleTimeString([], options)}`;
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
