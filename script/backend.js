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

function Board(emptyCellValue = null) {

    const createBoard = (size) => {
        let arr = [];
        boardSize = size;
        if (boardSize < 1) boardSize = 1;
        for (let i = 0; i < boardSize; i++) {
            arr[i] = [];
            for (let j = 0; j < boardSize; j++) {
                arr[i][j] = Cell();
            }
        }
        return arr;
    }

    const reset = () => {
        cells = createBoard(boardSize);
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
        if (y < 0 || y >= cells.length || x < 0 || x >= cells[y].length) return;
        if (isEmptyCell(cells[y][x])) {
            cells[y][x].setContent(value);
            return true;
        }
        return false;
    }

    const getCells = () => {
        return cells;
    }

    const isFullRow = (x, y) => {
        const compare = cells[y][x].getContent();
        for (let i = 0; i < cells.length; i++) {
            if (compare !== cells[y][i].getContent()) break;
            if (i === cells.length - 1) return "row";
        }
        return false;
    }

    const isFullCol = (x, y) => {
        const compare = cells[y][x].getContent();
        for (let i = 0; i < cells[y].length; i++) {
            if (compare !== cells[i][x].getContent()) break;
            if (i === cells[y].length - 1) return "column";
        }
        return false;
    }

    const isFullDiagonal = (x, y) => {
        const compare = cells[y][x].getContent();
        for (let i = 0; i < cells.length; i++) {
            if (cells[i][i].getContent() !== compare) break;
            if (i === cells.length - 1) return "diagonal";
        }
        return false;
    }

    const isFullAntiDiagonal = (x, y) => {
        const compare = cells[y][x].getContent();
        for (let i = 0; i < cells.length; i++) {
            if (cells[i][cells.length - 1 - i].getContent() !== compare) break;
            if (i === cells.length - 1) return "anti-diagonal";
        }
        return false;
    }


    const EMPTY_CELL = emptyCellValue;
    let boardSize = 3;
    let cells = createBoard(boardSize);

    return {
        reset,
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
    let record = { win: 0, loss: 0, tie: 0 };

    const cleanRecord = () => {
        record = { win: 0, loss: 0, tie: 0 };
    }

    const getRecord = () => {
        return record;
    }

    const win = () => {
        record.win++;
    }

    const lose = () => {
        record.loss++;
    }

    const tie = () => {
        record.tie++;
    }

    return {
        name,
        side,
        cleanRecord,
        getRecord,
        win,
        lose,
        tie,
    };
}

function TicTacToeGame() {

    const players = [Player("Player 1", 1), Player("Player 2", 2)];
    const board = Board();
    let turn = 0;
    let winner = { player: null, direction: null };
    let gameState = 0;

    const reset = () => {
        board.reset();
        for (let player in players) {
            players[player].cleanRecord();
        }
        resetTurns();
        setState(0);
    }

    const newGame = () => {
        board.reset();
        resetTurns();
        gameState = 0;
    }

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
                        for (const player in players) {
                            players[player].tie();
                        }
                    } else {
                        winner.player = currentPlayer.name;
                        currentPlayer.win();
                        for (const player in players) {
                            if (players[player] === currentPlayer) continue;
                            players[player].lose();
                        }
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

    const getPlayerTurn= () => {
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
            console.log(`win by ${win} on ${y}`);
            return {win, position: y};
        } else if (win = board.isFullCol(x, y)) {
            console.log(`win by ${win} on ${x}`);
            return {win, position: x};
        } else if (win = board.isFullDiagonal(x, y)) {
            console.log(`win by ${win}`);
            return {win, position: 0};
        } else if (win = board.isFullAntiDiagonal(x, y)) {
            console.log(`win by ${win}`);
            return {win, position: 0};
        } else if (win = board.isFull()) {
            return {win, position: -1};
        }
        return 0;
    }

    const getBoard = () => {
        console.log(board.getCells()[0][0].getContent(), board.getCells()[0][1].getContent(), board.getCells()[0][2].getContent());
        console.log(board.getCells()[1][0].getContent(), board.getCells()[1][1].getContent(), board.getCells()[1][2].getContent());
        console.log(board.getCells()[2][0].getContent(), board.getCells()[2][1].getContent(), board.getCells()[2][2].getContent());
    }


    return {
        newGame,
        reset,
        playMove,
        getBoard,
        getPlayerName,
        getPlayerStats,
        getPlayerTurn,
        renamePlayer,
    }
}
