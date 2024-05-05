"use strict";

function Cell() {
    let content = null;

    const getContent = () => {
        return content;
    }

    const setContent = (newContent) => {
        content = newContent;
    };

    return {
        getContent,
        setContent,
    };
}

function Board(size = 3, emptyCellValue = null) {

    const createBoard = () => {
        let arr = [];
        if (size < 1) size = 1;
        for (let i = 0; i < size; i++) {
            arr[i] = [];
            for (let j = 0; j < size; j++) {
                arr[i][j] = Cell();
            }
        }
        return arr;
    }

    const getBoard = () => {
        return cells.map( (row) => row.map( (cell) => cell.getContent() ) );
    }
    const reset = () => {
        cells = createBoard(size);
    }

    const isEmptyCell = (cell) => {
        return cell.getContent() === EMPTY_CELL;
    }

    const isFull = () => {
        for (let row in cells) {
            for (let item in cells[row]) {
                if (isEmptyCell(cells[row][item])) return false;
            }
        }
        return true;
    }

    const setCell = (x, y, value) => {
        if (x < 0 || x >= cells.length || y < 0 || y >= cells[x].length) return;
        if (isEmptyCell(cells[x][y])) {
            cells[x][y].setContent(value);
            return true;
        }
        return false;
    }

    const getCells = () => {
        return cells;
    }

    const isFullRow = (x, y) => {
        const compare = cells[x][y].getContent();
        for (let i = 0; i < cells[x].length; i++) {
            if (compare !== cells[x][i].getContent()) break;
            if (i === cells.length - 1) return "row";
        }
        return false;
    }

    const isFullCol = (x, y) => {
        const compare = cells[x][y].getContent();
        for (let i = 0; i < cells[x].length; i++) {
            if (compare !== cells[i][y].getContent()) break;
            if (i === cells[y].length - 1) return "column";
        }
        return false;
    }

    const isFullDiagonal = (x, y) => {
        const compare = cells[x][y].getContent();
        for (let i = 0; i < cells.length; i++) {
            if (cells[i][i].getContent() !== compare) break;
            if (i === cells.length - 1) return "diagonal";
        }
        return false;
    }

    const isFullAntiDiagonal = (x, y) => {
        const compare = cells[x][y].getContent();
        for (let i = 0; i < cells.length; i++) {
            if (cells[i][cells.length - 1 - i].getContent() !== compare) break;
            if (i === cells.length - 1) return "anti-diagonal";
        }
        return false;
    }


    const EMPTY_CELL = emptyCellValue;
    let cells = createBoard(size);

    return {
        reset,
        getBoard,
        setCell,
        getCells,
        isFull,
        isFullRow,
        isFullCol,
        isFullDiagonal,
        isFullAntiDiagonal,
    }
}

function Player (name, side) {
    let record = 0;

    const cleanRecord = () => {
        record = 0;
    }

    const getRecord = () => {
        return record;
    }

    const win = () => {
        record++;
    }

    return {
        name,
        side,
        cleanRecord,
        getRecord,
        win,
    };
}

function TicTacToeGame(grid_size = 3) {

    const players = [Player("Player 1", "X"), Player("Player 2", "O")];
    const board = Board();
    let turn = 0;
    let winner = { player: null, direction: null, position: 0 };
    let gameState = 0;

    const reset = () => {
        board.reset();
        for (let player in players) {
            players[player].cleanRecord();
        }
        resetTurns();
        setState(0);
        winner = { player: null, direction: null, position: 0 };
    }

    const newGame = () => {
        board.reset();
        resetTurns();
        gameState = 0;
        winner = { player: null, direction: null, position: 0 };
    }

    const getWinner = () => {
        return winner;
    };

    const playMove = (x, y) => {
        let currentPlayer = players[turn];
        if (getState() !== 1) {
            let validMove = board.setCell(x, y, currentPlayer.side);
            if (validMove) {
                let win = checkWinner(x, y);
                if (win) {
                    setState(1);
                    if(win.position < 0) {
                        winner.direction = -1;
                    } else {
                        winner.player = currentPlayer.name;
                        winner.direction = win.direction;
                        winner.position = win.position;
                        currentPlayer.win();
                    }
                } else {
                    turn = nextPlayerIndex();
                }
            }
        }
    }

    const getState = () => {
        return gameState;
    }

    const setState = (newState) => {
        gameState = newState;
    }

    const getPlayerTurn = () => {
        return players[turn];
    }

    const resetTurns = () => {
        turn = 0;
    }

    const getPlayerName = (index) => {
        return players[index].name;
    }

    const getPlayerStats = (index) => {
        return players[index].getRecord();
    }

    const nextPlayerIndex = () => {
        return (turn + 1) % players.length;
    }

    const renamePlayer = (index, name) => {
        players[index].name = name;
    }

    const checkWinner = (x, y) => {
        let win;
        if (win = board.isFullRow(x, y)) {
            console.log(`win by ${win} on ${x}`);
            return {win, position: y};
        } else if (win = board.isFullCol(x, y)) {
            console.log(`win by ${win} on ${y}`);
            return {win, position: x};
        } else if (win = board.isFullDiagonal(x, y)) {
            console.log(`win by ${win}`);
            return {win, position: 0};
        } else if (win = board.isFullAntiDiagonal(x, y)) {
            console.log(`win by ${win}`);
            return {win, position: 0};
        } else if (win = board.isFull()) {
            console.log(`tie`);
            return {win, position: -1};
        }
        return 0;
    }

    const printBoard = () => {
        console.table(board.getBoard());
    }


    return {
        newGame,
        reset,
        playMove,
        printBoard,
        getBoard: board.getBoard,
        getPlayerName,
        getPlayerStats,
        getPlayerTurn,
        getWinner,
        renamePlayer,
    }
}
