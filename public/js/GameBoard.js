import GameObject from '/js/GameObject.js';
import Snake from '/js/Snake.js';

export default class GameBoard {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
        this.boardHeight = canvas.height;
        this.boardWidth = canvas.width;
        this.snake = new Snake(canvas.width / 2, canvas.height / 2, 5, 5, "#000000", 1, 0);
        this.targetObject = this.CreateTarget(5, 5, "#EF1111");
        this.gameState = "stop";
        this.score = 0;
    }

    DrawBoard() {
        this.snake.UpdateSnake();
        if (this.CheckSnakeCollision(this.targetObject.x, this.targetObject.y)) {
            this.score++;
            this.targetObject = this.CreateTarget(5, 5, "#EF1111");
        }
        else {
            this.snake.snakeCells.shift();
        }
        let headSnakeCell = this.snake.snakeCells.pop();
        if (headSnakeCell.x < 0 || headSnakeCell.y < 0 || (headSnakeCell.x + headSnakeCell.objectWidth) > this.boardWidth || (headSnakeCell.y + headSnakeCell.objectHeight) > this.boardHeight) {
            this.gameState = "upload";
        }
        else if (this.CheckSnakeCollision(headSnakeCell.x, headSnakeCell.y)) {
            this.gameState = "upload";
        }
        else {
            this.canvasContext.clearRect(0, 0, this.boardWidth, this.boardHeight);
            this.snake.snakeCells.push(headSnakeCell);
            this.DrawRectangularCell(this.targetObject);
            for (let cell in this.snake.snakeCells) {
                this.DrawRectangularCell(this.snake.snakeCells[cell]);
            }
        }
    }

    DrawRectangularCell(gameObject) {
        this.canvasContext.beginPath();
        this.canvasContext.rect(gameObject.x, gameObject.y, gameObject.objectWidth, gameObject.objectHeight);
        this.canvasContext.fillStyle = gameObject.objectColor;
        this.canvasContext.fill();
    }

    CreateTarget(width, height, color) {
        let x, y;
        let invalidCoordinates = true;
        while (invalidCoordinates) {
            invalidCoordinates = false;
            x = Math.ceil(Math.random() * this.boardWidth);
            x -= x % width;
            y = Math.ceil(Math.random() * this.boardHeight);
            y -= y % height;
            invalidCoordinates = this.CheckCollision(x, y);
        }
        return new GameObject(x, y, width, height, color);
    }

    CheckCollision(x, y) {
        return (this.CheckTargetCollision(x, y) || this.CheckSnakeCollision(x, y));
    }

    CheckTargetCollision(x, y) {
        if (this.targetObject != null && (this.targetObject.x == x && this.targetObject.y == y)) {
            return true;
        }
    }

    CheckSnakeCollision(x, y) {
        for (let cell in this.snake.snakeCells) {
            if (this.snake.snakeCells[cell].x == x && this.snake.snakeCells[cell].y == y) {
                return true;
            }
        }
    }
}