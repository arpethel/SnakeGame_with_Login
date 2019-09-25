import SnakeGame from './SnakeGame.js';

let thisGame = new SnakeGame(document.getElementById('gameCanvas'));
let timerInterval = 50;
let timer = setInterval(function () { thisGame.UpdateBoard(); }, 50);