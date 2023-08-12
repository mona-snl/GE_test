let mode = 0; // 0 - Hours, 1 - Minutes, 2 - Not editable
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



