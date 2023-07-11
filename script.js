let currentPlayer = 'X';
let result = document.querySelector('.status');
let cells = document.querySelectorAll('.game-cell');
let resetBtn = document.querySelector('.reset');

const ticTacToe = (event) => {
    let cell = event.target;

    if (cell.textContent !== '') {
        return;
    }

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.disabled = true;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    result.textContent = `Player ${currentPlayer} Turn`;

    if (checkWin()) {
        result.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} Won 🎉`;
        cells.forEach((cell) => (cell.disabled = true));
    } else if (checkDraw()) {
        result.textContent = "It's a Draw!";
    }
};

const reset = () => {
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    result.textContent = 'X IS NEXT';
};

const checkWin = () => {
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

    return winningConditions.some((condition) => {
        let [a, b, c] = condition;
        return (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        );
    });
};

const checkDraw = () => {
    return Array.from(cells).every((cell) => cell.textContent !== '');
};

cells.forEach((cell) => {
    cell.addEventListener('click', ticTacToe);
});

resetBtn.addEventListener('click', reset);
