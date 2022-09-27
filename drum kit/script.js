const crashCymbal = new Audio("./assets/sound effects/crash-cymbal.mp3");
const hiHat = new Audio("./assets/sound effects/hi-hat.mp3");
const highTom = new Audio("./assets/sound effects/high-tom.mp3");
const midTom = new Audio("./assets/sound effects/mid-tom.mp3");
const lowTom = new Audio("./assets/sound effects/low-tom.mp3");
const snareDrum = new Audio("./assets/sound effects/snare-drum.mp3");
const rideCymbal = new Audio("./assets/sound effects/ride-cymbal.mp3");
const HiHatB1 = new Audio("./assets/sound effects/Hi-Hat-b1.mp3");
const bassDrum = new Audio("./assets/sound effects/bass drum.mp3");

function initialLoad() {
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 69) return crashCymbal.play();
    if (e.keyCode == 68) return hiHat.play();
    if (e.keyCode == 82) return highTom.play();
    if (e.keyCode == 70) return snareDrum.play();
    if (e.keyCode == 85) return midTom.play();
    if (e.keyCode == 74) return lowTom.play();
    if (e.keyCode == 73) return rideCymbal.play();
    if (e.keyCode == 75) return HiHatB1.play();
    if (e.keyCode == 32) return bassDrum.play();
  });
}

initialLoad();
