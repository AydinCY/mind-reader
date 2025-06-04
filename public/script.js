function readMyMind() {
    const userNumber = document.getElementById('userInput').value;

    if (!userNumber) {
        alert("Please enter a number!");
        return;
    }

    // Show loading bar and steps
    document.getElementById('loadingContainer').style.display = 'block';
    document.getElementById('loadingBar').style.width = '0%';
    setTimeout(() => {
        document.getElementById('loadingBar').style.width = '100%';
    }, 50); // Starts the loading bar with a slight delay

    // Reset previous reveal text and steps
    document.getElementById('revealText').style.display = 'none';
    document.getElementById('explosionGif').style.display = 'none';
    
    let steps = document.querySelectorAll('.step');
    let stepIndex = 0;
    let interval = setInterval(() => {
        if (stepIndex < steps.length) {
            steps[stepIndex].style.display = 'block';
            stepIndex++;
        }
    }, 2500); // Show each step one after the other at 2.5s intervals

    // Display large number for "X POSSIBLE COMBINATIONS"
    setTimeout(() => {
        let xNumber = Math.random().toFixed(20).replace('0.', '6.37E+');
        document.getElementById('step4').innerText = `CALCULATING ${xNumber} POSSIBLE COMBINATIONS...`;
    }, 5000); // After 5 seconds, update the "X" calculation

    // After loading is complete, reveal the number and show the explosion
    setTimeout(() => {
        document.getElementById('revealText').innerText = `You were thinking of the number ${userNumber} 😱😲`;
        document.getElementById('revealText').style.display = 'block';
        
        // Show explosion gif with fade-in/out effect
        document.getElementById('explosionGif').style.display = 'block';

        // Hide the loading bar and clear interval
        clearInterval(interval);
        document.getElementById('loadingContainer').style.display = 'none';
    }, 10000); // After 10 seconds, reveal the result
}
