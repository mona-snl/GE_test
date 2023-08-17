let mode = 0;
let isLightOn = false;
let currentTime = new Date();

const watchDisplay = document.getElementById("watch");
const modeButton = document.getElementById("modeBtn");
const increaseButton = document.getElementById("increaseBtn");
const lightButton = document.getElementById("lightBtn");
const rectangles = document.getElementsByClassName('display');
const buttons = document.querySelectorAll('.small-button span');
const grand_rectangles = document.getElementsByClassName('grand-rectangle');

var lockedText = document.createElement("span");

const timezoneOffsetInput = document.getElementById("timezoneOffset");
const setTimezoneBtn = document.getElementById("setTimezoneBtn");

const resetBtn = document.getElementById("resetBtn");

const newTimezoneOffsetInput = document.getElementById("newTimezoneOffset");
const createClockBtn = document.getElementById("createClockBtn");

const formatBtn = document.getElementById("formatBtn");
let is24HourFormat = true;

function updateTime() {
  const hours = is24HourFormat
    ? currentTime.getHours().toString().padStart(2, "0")
    : (currentTime.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const ampm = is24HourFormat ? "" : (currentTime.getHours() >= 12 ? "PM" : "AM");

  watchDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
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

function updateClock() {
  updateTime();
  setInterval(updateTime, 1000);
}

setTimezoneBtn.addEventListener("click", () => {
    const offsetHours = parseInt(timezoneOffsetInput.value);
    if (!isNaN(offsetHours)) {
      currentTime = new Date(new Date().getTime() + offsetHours * 60 * 60 * 1000);
      updateClock();
    }
  });

resetBtn.addEventListener("click", () => {
    currentTime = new Date();
    updateClock();
  });

createClockBtn.addEventListener("click", () => {
    const offsetHours = parseInt(newTimezoneOffsetInput.value);
    if (!isNaN(offsetHours)) {
      const newClockContainer = document.createElement("div");
      newClockContainer.className = "grand-rectangle";

      const newClock = document.createElement("div");
      newClock.className = "circle";
      // ... Add clock elements and buttons similar to your existing code ...

      newClockContainer.appendChild(newClock);
      document.body.appendChild(newClockContainer);
    }
  });createClockBtn.addEventListener("click", () => {


formatBtn.addEventListener("click", () => {
    is24HourFormat = !is24HourFormat;
    updateTime();
  });
modeButton.addEventListener("click", toggleMode);
increaseButton.addEventListener("click", increaseTime);
lightButton.addEventListener("click", toggleLight);

updateClock();
