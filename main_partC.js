const watch = document.getElementById('watch');
const watchHand = document.querySelector('.watch-hand');
const rotationPointXInput = document.getElementById('rotation-point-x');
const rotationPointYInput = document.getElementById('rotation-point-y');
const startAnimationButton = document.getElementById('start-animation');

let watchRotation = 0;
let watchScale = 1;
let rotationPoint = { x: 100, y: 100 }; // Valeurs par défaut

function animate() {
  watch.style.transform = `rotate(${watchRotation}deg) translate(${rotationPoint.x}px, ${rotationPoint.y}px) scale(${watchScale})`;
  watchHand.style.transform = `translateX(-50%) rotate(${-watchRotation}deg)`;

  watchRotation += 1;
  requestAnimationFrame(animate);
}

startAnimationButton.addEventListener('click', () => {
  rotationPoint = { x: parseFloat(rotationPointXInput.value), y: parseFloat(rotationPointYInput.value) };
  watchRotation = 0;
  watchScale = 1;
  animate();
});
