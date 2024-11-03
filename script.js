const cells = document.querySelectorAll('.cell');
const statusDiv = document.querySelector('.status');
const resetButton = document.getElementById('reset');
const boardDiv = document.querySelector('.board');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDiv.textContent = `Player ${currentPlayer} wins! 🎉`;
        isGameActive = false;
        
        // Alert message
        alert(`Congratulations! Player ${currentPlayer} wins! 🎉`);

        // Change board background to victory color
        boardDiv.style.backgroundColor = '#d4edda'; // Light green victory color
        return;
    }

    if (!board.includes('')) {
        statusDiv.textContent = "It's a draw!";
        isGameActive = false;
        alert("It's a draw!");
        boardDiv.style.backgroundColor = '#f8d7da'; // Light red for draw
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    
    // Reset board background color
    boardDiv.style.backgroundColor = '#fff'; // Default color
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
statusDiv.textContent = `Player ${currentPlayer}'s turn`;
