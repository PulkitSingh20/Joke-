const jokeArea = document.getElementById('jokeArea');
const charCount = document.getElementById('charCount');
const errorMsg = document.getElementById('errorMsg');
const getJokeBtn = document.getElementById('getJokeBtn');
const clearJokeBtn = document.getElementById('clearJokeBtn');

// Fetches a joke from the API and displays it
const fetchJoke = async () => {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jokeData = await response.json();
        
        if (jokeData.type === 'single') {
            jokeArea.textContent = jokeData.joke;
            charCount.textContent = `Character Count: ${jokeData.joke.length}`;
        } else {
            jokeArea.textContent = `${jokeData.setup} - ${jokeData.delivery}`;
            charCount.textContent = `Character Count: ${jokeData.setup.length + jokeData.delivery.length + 3}`; // +3 for the ' - '
        }
        
        
        errorMsg.textContent = '';
    } catch (error) {
        
        errorMsg.textContent = 'Failed to fetch a joke. Please try again later.';
        jokeArea.textContent = '';
        charCount.textContent = 'Character Count: 0';
    }
};

getJokeBtn.addEventListener('click', fetchJoke);

clearJokeBtn.addEventListener('click', () => {
    jokeArea.textContent = '';
    charCount.textContent = 'Character Count: 0';
    errorMsg.textContent = '';
});
