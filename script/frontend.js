const HTMLTicTacToe = function () {
    const GRID_SIZE = 3;
    let game = TicTacToeGame();
    const grid = document.querySelector(".grid");
    const reset = document.querySelector(".reset");
    const restart = document.querySelector(".restart");
    const message = document.querySelector(".message");
    const play1 = document.querySelector("#play1");
    const play2 = document.querySelector("#play2");

    const buildGameScreen = (messageText = `${game.getPlayerTurn().name} to play`) => {

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

        play1.childNodes[1].textContent = game.getPlayerName(0);
        play1.childNodes[3].textContent = game.getPlayerStats(0);
        message.textContent = messageText;
        play2.childNodes[1].textContent = game.getPlayerName(1);
        play2.childNodes[3].textContent = game.getPlayerStats(1);
        
    };

    const registerListeners = () => {
        grid.addEventListener("click", (event) => {
            const row = event.target.dataset.row;
            const col = event.target.dataset.column;
            if (!(row && col)) return;

            game.playMove(row, col);
            let winner = game.getWinner();
            let text;
            if( winner.direction !== null) {
                
                if(winner.direction === -1 ) {
                    text = "Tie";
                } else {
                    text = `${winner.player} wins!`;
                }
            } else {
                text = `${game.getPlayerTurn().name} to play`;
            }
            buildGameScreen(text);
        });

        reset.addEventListener("click", (event) => {
            game.reset();
            buildGameScreen();
        });

        restart.addEventListener("click", (event) => {
            game.newGame();
            buildGameScreen();
        });
    }


    buildGameScreen();
    registerListeners();

    return game;
}();