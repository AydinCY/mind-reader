function readMyMind() {
  const userNumber = document.getElementById('userInput').value;
  if (!userNumber) {
    alert('Please enter a number!');
    return;
  }

  // Reset UI state
  clearAllSteps();
  document.getElementById('revealText').style.display = 'none';

  const explosionGif = document.getElementById('explosionGif');
  explosionGif.style.display = 'none';
  explosionGif.style.animation = 'none';
  void explosionGif.offsetWidth;
  explosionGif.style.animation = '';

  const loadingContainer = document.getElementById('loadingContainer');
  const loadingBar = document.getElementById('loadingBar');
  loadingContainer.style.display = 'block';
  loadingBar.style.width = '0%';

  const loadingGif = document.getElementById('loadingGif');
  loadingGif.style.display = 'block';

  // Begin filling the bar
  setTimeout(() => {
    loadingBar.style.width = '100%';
  }, 50);

  // Step messages timing
  const steps = [
    { id: 'step1', delay: 0 },
    { id: 'step2', delay: 2000 },
    { id: 'step3', delay: 4000 },
    { id: 'step4', delay: 6000 },
  ];

  steps.forEach((stepObj, index) => {
    setTimeout(() => {
      if (index > 0) {
        document.getElementById(steps[index - 1].id).style.display = 'none';
      }
      if (stepObj.id === 'step4') {
        const xNumber = Math.random().toFixed(20).replace('0.', '6.37E+');
        document.getElementById('step4').innerText =
          `CALCULATING ${xNumber} POSSIBLE COMBINATIONS...`;
      }
      document.getElementById(stepObj.id).style.display = 'block';
    }, stepObj.delay);
  });

  // After 8 seconds, reveal result
  setTimeout(() => {
    document.getElementById('step4').style.display = 'none';
    loadingContainer.style.display = 'none';
    loadingGif.style.display = 'none';

    const revealText = document.getElementById('revealText');
    revealText.innerText = `You were thinking of the number ${userNumber} 😱😲`;
    revealText.style.display = 'block';
    explosionGif.style.display = 'block';
  }, 8000);
}

function clearAllSteps() {
  document.querySelectorAll('.step').forEach(el => {
    el.style.display = 'none';
  });
}
