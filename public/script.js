function readMyMind() {
  const userNumber = document.getElementById('userInput').value;
  if (!userNumber) {
    alert('Please enter a number!');
    return;
  }

  // Reset any previous state
  document.getElementById('revealText').style.display = 'none';
  document.getElementById('explosionGif').style.display = 'none';
  clearAllSteps();

  // Show loading bar
  const loadingContainer = document.getElementById('loadingContainer');
  const loadingBar = document.getElementById('loadingBar');
  loadingContainer.style.display = 'block';
  loadingBar.style.width = '0%';
  // Trigger the width transition after a tiny delay
  setTimeout(() => {
    loadingBar.style.width = '100%';
  }, 50);

  // Steps timing in milliseconds
  const steps = [
    { id: 'step1', delay: 0 },
    { id: 'step2', delay: 2000 },
    { id: 'step3', delay: 4000 },
    { id: 'step4', delay: 7500 },
  ];

  // Show and hide steps sequentially
  steps.forEach((stepObj, index) => {
    setTimeout(() => {
      // Hide the previous step (if any)
      if (index > 0) {
        document.getElementById(steps[index - 1].id).style.display = 'none';
      }
      // For step4, generate new large number
      if (stepObj.id === 'step4') {
        const xNumber = Math.random().toFixed(20).replace('0.', '6.37E+');
        document.getElementById('step4').innerText =
          `CALCULATING ${xNumber} POSSIBLE COMBINATIONS...`;
      }
      // Show current step
      document.getElementById(stepObj.id).style.display = 'block';
    }, stepObj.delay);
  });

  // When loading finishes at 10s:
  setTimeout(() => {
    // Hide the last step
    document.getElementById('step4').style.display = 'none';
    // Hide loading bar
    loadingContainer.style.display = 'none';

    // Show final reveal text
    const revealText = document.getElementById('revealText');
    revealText.innerText = `You were thinking of the number ${userNumber} 😱😲`;
    revealText.style.display = 'block';

    // Show explosion GIF
    const explosionGif = document.getElementById('explosionGif');
    explosionGif.style.display = 'block';
    // It will automatically fade out via CSS animation
  }, 10000);
}

// Utility to hide all step paragraphs
function clearAllSteps() {
  const allSteps = document.querySelectorAll('.step');
  allSteps.forEach((el) => {
    el.style.display = 'none';
  });
}
