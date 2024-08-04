let playerCount = 0;
let currentRound = 0;
let currentWord = '';
let realDefinition = '';
let definitions = [];
let scores = {};

function setupGame() {
    playerCount = parseInt(document.getElementById('player-count').value);
    if (playerCount < 3) {
        alert('Er moeten minstens 3 spelers zijn!');
        return;
    }
    for (let i = 1; i <= playerCount; i++) {
        scores[`Speler ${i}`] = 0;
    }
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    nextRound();
}

function nextRound() {
    currentRound++;
    definitions = [];
    document.getElementById('host-screen').style.display = 'block';
    document.getElementById('player-screen').style.display = 'none';
    document.getElementById('voting-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'none';
}

function startRound() {
    currentWord = document.getElementById('word-input').value;
    realDefinition = document.getElementById('real-definition').value;
    if (!currentWord || !realDefinition) {
        alert('Vul zowel het woord als de echte definitie in!');
        return;
    }
    document.getElementById('host-screen').style.display = 'none';
    document.getElementById('player-screen').style.display = 'block';
    document.getElementById('current-word').textContent = `Het woord is: ${currentWord}`;
}

function submitDefinition() {
    const fakeDefinition = document.getElementById('fake-definition').value;
    if (!fakeDefinition) {
        alert('Voer een nepdefinitie in!');
        return;
    }
    definitions.push(fakeDefinition);
    if (definitions.length === playerCount - 1) {
        showVotingScreen();
    } else {
        alert('Geef de tablet door aan de volgende speler.');
        document.getElementById('fake-definition').value = '';
    }
}

function showVotingScreen() {
    document.getElementById('player-screen').style.display = 'none';
    document.getElementById('voting-screen').style.display = 'block';
    const definitionsList = document.getElementById('definitions-list');
    definitionsList.innerHTML = '';
    
    // Voeg de echte definitie toe en schud alle definities
    definitions.push(realDefinition);
    definitions.sort(() => Math.random() - 0.5);
    
    definitions.forEach((def, index) => {
        const button = document.createElement('button');
        button.textContent = def;
        button.onclick = () => vote(index);
        definitionsList.appendChild(button);
    });
}

function vote(index) {
    const votedDefinition = definitions[index];
    if (votedDefinition === realDefinition) {
        alert('Correct! Je hebt op de juiste definitie gestemd.');
        scores[`Speler ${currentRound % playerCount || playerCount}`] += 2;
    } else {
        alert('Helaas, dat was niet de juiste definitie.');
        const fakeDefIndex = definitions.indexOf(votedDefinition);
        scores[`Speler ${fakeDefIndex + 1}`] += 1;
    }
}

function showResults() {
    document.getElementById('voting-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = `<p><strong>Woord:</strong> ${currentWord}</p>
                             <p><strong>Echte definitie:</strong> ${realDefinition}</p>
                             <h3>Scores:</h3>`;
    for (let player in scores) {
        resultsList.innerHTML += `<p>${player}: ${scores[player]}</p>`;
    }
}