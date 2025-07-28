// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let gameWon = false;

function checkGuess() {
    // Get the user's guess from the input field
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const resultElement = document.getElementById('result');
    const attemptsCounter = document.getElementById('attemptsCounter');
    const resetBtn = document.getElementById('resetBtn');
    const guessInput = document.getElementById('guessInput');

    // Validate input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultElement.textContent = "⚠️ Please enter a valid number between 1 and 100!";
        resultElement.className = "error";
        return;
    }

    if (gameWon) {
        return; // Game already won, do nothing
    }

    attempts += 1;
    attemptsCounter.textContent = `Attempts: ${attempts}`;

    // Clear previous result classes
    resultElement.className = "";

    // Check if the guess is correct
    if (userGuess === randomNumber) {
        resultElement.textContent = `🎉 Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts!`;
        resultElement.className = "success";
        gameWon = true;
        guessInput.disabled = true;
        resetBtn.style.display = "inline-block";
        
        // Add celebration effect
        createConfetti();
        
    } else if (userGuess > randomNumber) {
        const diff = userGuess - randomNumber;
        if (diff > 20) {
            resultElement.textContent = "📈 Way too high! Try a much smaller number.";
        } else if (diff > 10) {
            resultElement.textContent = "📊 Too high! Try a smaller number.";
        } else {
            resultElement.textContent = "🔥 Close but too high! Try a bit smaller.";
        }
        resultElement.className = "too-high";
        
    } else if (userGuess < randomNumber) {
        const diff = randomNumber - userGuess;
        if (diff > 20) {
            resultElement.textContent = "📉 Way too low! Try a much bigger number.";
        } else if (diff > 10) {
            resultElement.textContent = "📊 Too low! Try a bigger number.";
        } else {
            resultElement.textContent = "🔥 Close but too low! Try a bit bigger.";
        }
        resultElement.className = "too-low";
    }

    // Clear input for next guess
    guessInput.value = "";
    guessInput.focus();

    // Show hint after 7 attempts
    if (attempts >= 7 && !gameWon) {
        showHint();
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameWon = false;
    
    document.getElementById('result').textContent = "";
    document.getElementById('result').className = "";
    document.getElementById('attemptsCounter').textContent = "Attempts: 0";
    document.getElementById('guessInput').value = "";
    document.getElementById('guessInput').disabled = false;
    document.getElementById('resetBtn').style.display = "none";
    document.getElementById('guessInput').focus();
}

function showHint() {
    const resultElement = document.getElementById('result');
    const currentText = resultElement.textContent;
    
    // Determine range hint
    let rangeHint = "";
    if (randomNumber <= 25) {
        rangeHint = "💡 Hint: The number is between 1-25";
    } else if (randomNumber <= 50) {
        rangeHint = "💡 Hint: The number is between 26-50";
    } else if (randomNumber <= 75) {
        rangeHint = "💡 Hint: The number is between 51-75";
    } else {
        rangeHint = "💡 Hint: The number is between 76-100";
    }
    
    resultElement.innerHTML = currentText + "<br>" + rangeHint;
}

function createConfetti() {
    // Simple confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['🎉', '🎊', '⭐', '✨', '🎈'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.fontSize = '20px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
                { transform: 'translateY(100vh) rotate(360deg)', opacity: 0 }
            ], {
                duration: 3000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 100);
    }
}

// Allow Enter key to submit guess
document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Focus on input when page loads
window.onload = function() {
    document.getElementById('guessInput').focus();
};
