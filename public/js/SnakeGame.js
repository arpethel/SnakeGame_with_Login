import GameBoard from '/js/GameBoard.js';

let buttonPressed = { "LEFT": false, "UP": false, "RIGHT": false, "DOWN": false, "N": false, "SPACE": false };

export default class SnakeGame {
    constructor(canvas) {
        this.board = new GameBoard(canvas);
        this.ConfigureKeyPressed();
    }

    ConfigureKeyPressed() {
        document.onkeydown = function (e) {
            if (e.keyCode == 37) buttonPressed.LEFT = true;
            if (e.keyCode == 38) buttonPressed.UP = true;
            if (e.keyCode == 39) buttonPressed.RIGHT = true;
            if (e.keyCode == 40) buttonPressed.DOWN = true;
            if (e.keyCode == 78) buttonPressed.N = true;
            if (e.keyCode == 32) buttonPressed.SPACE = true;
        }

        document.onkeyup = function (e) {
            if (e.keyCode == 37) buttonPressed.LEFT = false;
            if (e.keyCode == 38) buttonPressed.UP = false;
            if (e.keyCode == 39) buttonPressed.RIGHT = false;
            if (e.keyCode == 40) buttonPressed.DOWN = false;
            if (e.keyCode == 78) buttonPressed.N = false;
            if (e.keyCode == 32) buttonPressed.SPACE = false;
        }
    }

    UpdateBoard() {
        this.KeyPressedHandler();
        if (this.board.gameState == "playing") {
            this.board.DrawBoard();
        }
        if (this.board.gameState == "upload") {
            this.UploadScore();
            this.board.gameState = "stop"
        }
        document.getElementById("scoreContainer").innerHTML = "Game State: " + this.board.gameState + " <br>Score: " + this.board.score;
    }

    KeyPressedHandler() {
        if (buttonPressed.LEFT) {
            if (this.board.snake.snakeCells.length > 1) {
                let previousCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 2];
                let currentCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 1];
                if (!(currentCell.x - currentCell.objectWidth == previousCell.x && currentCell.y == previousCell.y)) {
                    this.board.snake.velocity = [-1, 0];
                }
            }
            else {
                this.board.snake.velocity = [-1, 0];
            }
            buttonPressed.LEFT = false;
        }
        if (buttonPressed.UP) {
            if (this.board.snake.snakeCells.length > 1) {
                let previousCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 2];
                let currentCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 1];
                if (!(currentCell.x == previousCell.x && currentCell.y - currentCell.objectHeight == previousCell.y)) {
                    this.board.snake.velocity = [0, -1];
                }
            }
            else {
                this.board.snake.velocity = [0, -1];
            }
            buttonPressed.UP = false;
        }
        if (buttonPressed.RIGHT) {
            if (this.board.snake.snakeCells.length > 1) {
                let previousCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 2];
                let currentCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 1];
                if (!(currentCell.x + currentCell.objectWidth == previousCell.x && currentCell.y == previousCell.y)) {
                    this.board.snake.velocity = [1, 0];
                }
            }
            else {
                this.board.snake.velocity = [1, 0];
            }
            buttonPressed.RIGHT = false;
        }
        if (buttonPressed.DOWN) {
            if (this.board.snake.snakeCells.length > 1) {
                let previousCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 2];
                let currentCell = this.board.snake.snakeCells[this.board.snake.snakeCells.length - 1];
                if (!(currentCell.x == previousCell.x && currentCell.y + currentCell.objectHeight == previousCell.y)) {
                    this.board.snake.velocity = [0, 1];
                }
            }
            else {
                this.board.snake.velocity = [0, 1];
            }
            buttonPressed.DOWN = false;
        }
        if (buttonPressed.N) {
            this.board = new GameBoard(this.board.canvas);
            this.board.gameState = "playing";
            buttonPressed.N = false;
        }
        if (buttonPressed.SPACE) {
            if (this.board.gameState == "playing")
                this.board.gameState = "paused";
            else if (this.board.gameState == "paused")
                this.board.gameState = "playing";
            buttonPressed.SPACE = false;
        }
    }

    UploadScore() {

    }
}