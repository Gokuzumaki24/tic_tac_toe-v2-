// Game Variables
let board = ['', '', '', '', '', '', '', '', '']; // 3x3 Tic-Tac-Toe grid
let currentPlayer = 'X'; // Player X starts the game
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let isAI = true; // Set this to true for AI player, false for 2 player mode

// DOM Elements
const cells = document.querySelectorAll('.cell');
const playerNameDisplay = document.getElementById('player-name-display');
const activePlayerName = document.getElementById('active-player-name');
const resetButton = document.getElementById('reset-button');
const scoreboardTable = document.getElementById('scoreboard').querySelector('tbody');

// Initializing Player Name and Active Player
playerNameDisplay.textContent = "Player 1";
activePlayerName.textContent = `Player ${currentPlayer}`;

// Handling Cell Clicks for Human Player
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameActive && cell.textContent === '' && currentPlayer !== 'O') {
            cell.textContent = currentPlayer;
            board[cell.dataset.cellIndex] = currentPlayer;
            checkWinner();
            if (gameActive) togglePlayer();
        }
    });
});

// AI makes a move
function aiMove() {
    if (!gameActive || currentPlayer !== 'O') return; // AI only moves when it's Player O's turn

    let emptyCells = [];
    cells.forEach((cell, index) => {
        if (board[index] === '') emptyCells.push(index);
    });

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        checkWinner();
        if (gameActive) togglePlayer();
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical wins
        [0, 4, 8], [2, 4, 6] // Diagonal wins
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            updateScore(currentPlayer);
            alert(`${currentPlayer} wins!`);
            break;
        }
    }

    // Check for a draw (no empty cells)
    if (!board.includes('')) {
        gameActive = false;
        alert("It's a draw!");
    }
}

// Toggle between players
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    activePlayerName.textContent = `Player ${currentPlayer}`;

    if (isAI && currentPlayer === 'O') aiMove(); // AI move if it's AI's turn
}

// Reset the game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    activePlayerName.textContent = `Player ${currentPlayer}`;
});

// Update the score
function updateScore(winner) {
    if (winner === 'X') scoreX++;
    if (winner === 'O') scoreO++;

    // Update the scoreboard table
    scoreboardTable.innerHTML = `
        <tr><td>1</td><td>Player X</td><td>${scoreX}</td></tr>
        <tr><td>2</td><td>Player O</td><td>${scoreO}</td></tr>
    `;
}
