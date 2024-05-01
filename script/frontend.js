const HTMLTicTacToe = function () {
    const GRID_SIZE = 3;
    let game = TicTacToeGame();
    const grid = document.querySelector(".grid");

    const buildGameScreen = () => {

        grid.replaceChildren();
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const cell = document.createElement("div");
                cell.dataset.row = i;
                cell.dataset.column = j;
                cell.classList.add("cell");
                if(i !== 0) cell.classList.add("border-top");
                if(j !== 0) cell.classList.add("border-left");
                const content = game.getBoard()[i][j];
                if(content) {
                    cell.textContent = content;
                }
                grid.appendChild(cell);
            }
        }
    }

    const registerListener = () => {
        grid.addEventListener("click", (event) => {
            const row = event.target.dataset.row;
            const col = event.target.dataset.column;
            if (!(row && col)) return;

            game.playMove(row, col);
            buildGameScreen();
        });
    }

    buildGameScreen();
    registerListener();

}();