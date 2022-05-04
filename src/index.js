import './style.css';
const { site, setShip, gameOver } = require('./modules/UI');
const { compBoard, shipPlace, restart } = require('./modules/player');

function launch() {
    setShip();
    shipPlace();
    site();
    compBoard();
    gameOver();
    document.querySelector('.newGame').addEventListener('click', function () {
        document.body.innerHTML = '';
        restart();
        launch();
    });
}

launch();
