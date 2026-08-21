// ── Element references ──
const timerEl  = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn  = document.getElementById('stopBtn');

// ── State ──
const TOTAL_SECONDS = 60;   // 1 minute countdown
let remaining = TOTAL_SECONDS;
let intervalId = null;
let isPaused   = false;

// Helper: format seconds → "MM:SS"
function formatTime(secs) {
  const minutes = Math.floor(secs / 60).toString().padStart(2, '0');
  const seconds = (secs % 60).toString().padStart(2, '0');
  return minutes + ':' + seconds;
}

// Helper: update the display and apply the urgent CSS class
// When timer < 15 s → red text + pill background
function updateDisplay() {
  timerEl.textContent = formatTime(remaining);

  if (remaining < 15) {
    timerEl.classList.add('urgent');      // triggers red text + bg in CSS
  } else {
    timerEl.classList.remove('urgent');
  }
}

// Counts down each second; alerts user when it hits 0.
// Stop resets the timer; it only restarts on Start click.
function tick() {
  if (remaining <= 0) {
    clearInterval(intervalId);
    intervalId = null;
    updateDisplay();
    alert("Time's up! Take a short break. ☕");
    resetButtonState();   // revert buttons to initial state after alert
    return;
  }
  remaining--;
  updateDisplay();
}

// Button state: Initial = Start enabled, Pause + Stop disabled
// After Start: Start disabled, Pause + Stop enabled
// After Stop: revert to initial state
function resetButtonState() {
  // Reset timer value and display
  remaining = TOTAL_SECONDS;
  isPaused  = false;
  updateDisplay();

  // Revert to initial button state
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  stopBtn.disabled  = true;
  pauseBtn.textContent = 'Pause';
}

// START – called by Start button
function startTimer() {
  if (intervalId !== null) return;    // already running, do nothing

  // Enable Pause + Stop; disable Start
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  stopBtn.disabled  = false;

  intervalId = setInterval(tick, 1000);
}

// Pause / Resume – toggles without resetting
// Button text switches between "Pause" and "Resume"
function pauseTimer() {
  if (!isPaused) {
    // ── Pause ──
    clearInterval(intervalId);
    intervalId = null;
    isPaused   = true;
    pauseBtn.textContent = 'Resume';   // switch label to "Resume"
  } else {
    // ── Resume ──
    isPaused = false;
    pauseBtn.textContent = 'Pause';    // switch label back to "Pause"
    intervalId = setInterval(tick, 1000);
  }
}

// STOP – resets everything back to initial state
function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  resetButtonState();
}

// ── Initialise on page load ──
updateDisplay();
