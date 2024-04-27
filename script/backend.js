function TicTacToeGame() {

    const players = [Player("Player 1", 1), Player("Player 2", 2)];
    const board = Board();
    let turn = 0;

    function reset() {
        board.reset();
        for(let player in players) {
            player.cleanRecord();
        }
        turn = 0;
    }

    function newGame() {
        board.reset();
        turn = 0;
    }

    function nextPlayerIndex(){
        return (turn + 1) % players.length;
    }

    function Player(name, side) {

        let icon = side;
        let record = { win: 0, loss: 0 };

        function cleanRecord() {
            record = { win: 0, loss: 0 };
        }

        function win() {
            record.win++;
        }

        function lose() {
            record.loss++;
        }

        return {
            name,
            side,
            cleanRecord,
            win,
            lose,
        };
    }


    function Board(emptyCellValue = null) {

        const EMPTY_CELL = emptyCellValue;
        let boardSize = 3;
        const cells = createBoard(size = 3);

        function createBoard(size) {
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

        function reset() {
            cells = createBoard();
        }

        function isEmptyCell(cell) {
            return cell.getContent === EMPTY_CELL;
        }

        function isFull() {
            for (let row in cells) {
                for (let item in row) {
                    if (isEmptyCell(item)) return false;
                }
            }
            return true;
        }

        function setCell(x, y, value) {
            if (x < 0 || x >= cells.length || y < 0 || y >= cells[x].length) return;
            if (isEmptyCell(cells[x][y])) {
                cells[x][y].setContent(value);
                return true;
            }
            return false;
        }

        function getCells() {
            return cells;
        }

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

        return {
            reset,
            setCell,
            getCells,
            isFull,
        }
    }
}






