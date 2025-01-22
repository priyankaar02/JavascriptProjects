// +++++++++++++++++++++++++++++++++ MANUAL SLIDER LOGIC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const manualSlider = document.querySelector(".manual-slider .slider-images");
const manualImages = document.querySelectorAll(
  ".manual-slider .slider-images img"
);
const manualPrev = document.querySelector(".manual-slider .prev");
const manualNext = document.querySelector(".manual-slider .next");
let manualIndex = 0;

// Uses event listeners on "Prev" and "Next" buttons to manually update the translateX value of the slider.
//clientWidth is a property in JavaScript that returns the width of an element, including its padding, but excluding borders, margins, and scrollbars.
// By using clientWidth, the slider adapts automatically to the size of the slides, making it more robust and scalable.
function updateManualSlider() {
  const width = manualImages[0].clientWidth; //manualImages[0] refers to the first <img> element inside the slider and clientWidth gives the width of this <img> element.
  manualSlider.style.transform = `translateX(${-manualIndex * width}px)`;
}

/* -manualIndex * width: Multiplies the manualIndex (current slide) by the width of each slide to calculate the offset.
For example:
If manualIndex = 0: translateX(0px) (shows the first slide).
If manualIndex = 1: translateX(-500px) (shows the second slide).
If manualIndex = 2: translateX(-1000px) (shows the third slide).

translateX: Moves the .slider-images container horizontally to reveal the appropriate slide.*/

manualNext.addEventListener("click", () => {
  // manualIndex + 1 moves to the next slide and Using % manualImages.length ensures that the manualIndex wraps back to 0 when it reaches the end of the slides.
  manualIndex = (manualIndex + 1) % manualImages.length; //eg: If manualIndex = 2 (last slide) and you click Next, then (2 + 1) % 3 = 0 (wraps back to the first slide).
  updateManualSlider();
});

manualPrev.addEventListener("click", () => {
  //manualIndex - 1 moves to the previous slide and Adding manualImages.length ensures the index is always non-negative.
  manualIndex = (manualIndex - 1 + manualImages.length) % manualImages.length; //eg: If manualIndex = 0 (first slide) and you click Prev, then (0 - 1 + 3) % 3 = 2 (wraps to the last slide).
  updateManualSlider();
});

//++++++++++++++++++++++++ AUTOMATIC SLIDER LOGIC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const autoSlider = document.querySelector(".auto-slider .slider-images");
const autoImages = document.querySelectorAll(".auto-slider .slider-images img");
let autoIndex = 0; // Initializes the current slide index (autoIndex) to 0, indicating the first slide.
let autoScrollInterval; //A variable to store the setInterval() function reference. This allows us to stop or restart the auto-scroll when necessary.

function updateAutoSlider() {
  const width = autoImages[0].clientWidth; //gets the width of a single slide
  autoSlider.style.transform = `translateX(${-autoIndex * width}px)`;
}

/*Update the Slider’s Position:

-autoIndex * width: Calculates the horizontal offset for the current slide.
If autoIndex = 0: translateX(0px) (shows the first slide).
If autoIndex = 1: translateX(-500px) (shows the second slide).
If autoIndex = 2: translateX(-1000px) (shows the third slide). */

// Automatically scrolls through the images every 2 seconds using setInterval().
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    //Repeatedly executes a block of code every 2000ms (2 seconds).
    autoIndex = (autoIndex + 1) % autoImages.length; //Moves to the next slide and wraps back to 0 when the last slide is reached
    updateAutoSlider(); //to move the slider to the new position
  }, 2000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Start auto-scrolling on page load
startAutoScroll();

// Pause auto-scrolling on hover
document
  .querySelector(".auto-slider")
  .addEventListener("mouseover", stopAutoScroll);
document
  .querySelector(".auto-slider")
  .addEventListener("mouseout", startAutoScroll);
