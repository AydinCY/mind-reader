function readMyMind() {
  const userNumber = document.getElementById('userInput').value;
  if (!userNumber) {
    alert('Please enter a number!');
    return;
  }

  // Reset everything
  clearAllSteps();
  document.getElementById('revealText').style.display = 'none';
  const gif = document.getElementById('explosionGif');
  gif.style.display = 'none';

  // Show loading bar
  const loadingContainer = document.getElementById('loadingContainer');
  const loadingBar = document.getElementById('loadingBar');
  loadingContainer.style.display = 'block';
  loadingBar.style.width = '0%';
  // Trigger fill over 8 seconds
  setTimeout(() => {
    loadingBar.style.width = '100%';
  }, 50);

  // Steps timing (in ms)
  const steps = [
    { id: 'step1', delay: 0 },
    { id: 'step2', delay: 2000 },
    { id: 'step3', delay: 4000 },
    { id: 'step4', delay: 6000 }, // Show step4 at 6s
  ];

  // Show each step in turn, hiding previous
  steps.forEach((stepObj, index) => {
    setTimeout(() => {
      if (index > 0) {
        document.getElementById(steps[index - 1].id).style.display = 'none';
      }
      if (stepObj.id === 'step4') {
        // Generate large number
        const xNumber = Math.random().toFixed(20).replace('0.', '6.37E+');
        document.getElementById('step4').innerText =
          `CALCULATING ${xNumber} POSSIBLE COMBINATIONS...`;
      }
      document.getElementById(stepObj.id).style.display = 'block';
    }, stepObj.delay);
  });

  // After 8 seconds, hide step4 and loading bar, then show reveal and GIF
  setTimeout(() => {
    document.getElementById('step4').style.display = 'none';
    loadingContainer.style.display = 'none';

    // Show final reveal text
    const revealText = document.getElementById('revealText');
    revealText.innerText = `You were thinking of the number ${userNumber} 😱😲`;
    revealText.style.display = 'block';

    // Show explosion GIF for 2 seconds (animation does fade in/out)
    gif.style.display = 'block';
  }, 8000);

  // After 10 seconds total, hide GIF and reveal text so user can try again
  setTimeout(() => {
    document.getElementById('revealText').style.display = 'none';
    document.getElementById('explosionGif').style.display = 'none';
  }, 10000);
}

function clearAllSteps() {
  document.querySelectorAll('.step').forEach(el => {
    el.style.display = 'none';
  });
}
