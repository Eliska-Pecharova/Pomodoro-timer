// Set durations: 1 hour work, 30 minutes break (in seconds)
let workTime = 60 * 60;
let breakTime = 30 * 60;
let currentTime = workTime;
let isWork = true;
let timerInterval = null;

// Get DOM elements for display and styling
const timeDisplay = document.getElementById("time");
const modeDisplay = document.getElementById("mode");
const container = document.querySelector(".container");

// Update the timer display and visual style
function updateDisplay() {
  // Convert seconds to MM:SS format
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // Remove both mode classes before applying the current one
  container.classList.remove("work-mode", "break-mode");

  if (isWork) {
    // Work mode styling
    modeDisplay.textContent = "Práce"; // You can change to "Work time" if you want
    container.style.background =
      "radial-gradient(circle at top left, #ff4d4d, #e60000)";
    container.classList.add("work-mode");
    modeDisplay.style.color = "#fff8f0";
    timeDisplay.style.color = "#ffffff";
  } else {
    // Break mode styling
    modeDisplay.textContent = "Pauza"; // Or "Break Time"
    container.style.background =
      "radial-gradient(circle at top left, #81c784, #388e3c)";
    container.classList.add("break-mode");
    modeDisplay.style.color = "#ffffff";
    timeDisplay.style.color = "#f0f0f0";
  }
}

// Start the countdown timer
function startTimer() {
  // Prevent multiple intervals
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    currentTime--;
    updateDisplay();

    // Switch between work and break when time runs out
    if (currentTime <= 0) {
      isWork = !isWork;
      currentTime = isWork ? workTime : breakTime;
    }
  }, 1000); // Update every second
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset to initial work mode
function resetTimer() {
  stopTimer();
  isWork = true;
  currentTime = workTime;
  updateDisplay();
}

// Button event listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

// Print button (optional)
document.getElementById("print").addEventListener("click", () => {
  window.print();
});

// Initial render on page load
updateDisplay();
