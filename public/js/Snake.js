import GameObject from '/js/GameObject.js';
export default class Snake {
    constructor(x, y, width, height, color, xVel, yVel) {
        this.snakeCells = [new GameObject(x, y, width, height, color)];
        this.velocity = [xVel, yVel];
        this.snakeCells.push(new GameObject(x - width, y, width, height, color));
    }

    UpdateSnake() {
        let currentHeadCell = this.snakeCells[this.snakeCells.length - 1];
        let newHeadCell = new GameObject((parseInt(currentHeadCell.x) + (parseInt(this.velocity[0]) * currentHeadCell.objectWidth)), (parseInt(currentHeadCell.y) + (parseInt(this.velocity[1]) * currentHeadCell.objectWidth)), currentHeadCell.objectWidth, currentHeadCell.objectHeight, currentHeadCell.objectColor);
        this.snakeCells.push(newHeadCell);
    }
}