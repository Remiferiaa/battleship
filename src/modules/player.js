const { gameBoard, ships } = require('./factory');
const { gridDisplay } = require('./UI');

const player = (name, turn) => {
    return { name, turn };
};

const player1 = player('player', 1);
const player2 = player('comp', 2);
let playerGrid = gameBoard();
let compGrid = gameBoard();

let currentTurn = 1;

function shipGenerator() {
    const block = [];
    const carrier = ships('e');
    const battleship = ships('d');
    const cruiser = ships('c');
    const submarine = ships('b');
    const destroyer = ships('a');
    block.push(carrier, battleship, cruiser, submarine, destroyer);
    return block;
}

function compBoard() {
    let units = shipGenerator();
    let i = 0;
    while (i < 5 && compGrid.shipList.length < 5) {
        let num = Math.floor(Math.random() * 10);
        let num1 = Math.floor(Math.random() * 10);
        let num2 =
            num - units[i].stats[0].big + 1 < 0
                ? 0
                : num - units[i].stats[0].big + 1;

        if (compGrid.place(units[i], num1, num2) === false) {
            continue;
        }
        i++;
    }
    gridDisplay(compGrid, 'bot');
}

function compAttack() {
    let num = Math.floor(Math.random() * 10);
    let num1 = Math.floor(Math.random() * 10);
    if (playerGrid.attack(num, num1) == false) {
        compAttack();
    }
    currentTurn = 1;
    document.querySelector('.grid1').innerHTML = '';
    gridDisplay(playerGrid, 'p1');
    turnHandler();
}

function shipHover(ship, shipUnits) {
    document.querySelectorAll('#p1place > div ').forEach(function (cell) {
        cell.addEventListener('mouseenter', (event) => {
            let shipSize = shipUnits[ship].stats[0].big;
            for (let j = 0; j < shipSize; j++) {
                let pos = event.target.getAttribute('data-cell').split('');
                if (Number(pos[1]) + shipSize <= 10) {
                    document
                        .querySelector(
                            `[data-cell="${pos[0]}${Number(pos[1]) + j}"]`
                        )
                        .classList.add('preview');
                }
            }
        });
    });
    document.querySelector('#p1place').addEventListener('mouseout', () => {
        document.querySelectorAll('[data-cell]').forEach(function (cell) {
            cell.classList.remove('preview');
        });
    });
}

function hoverAdd(ship, shipUnits) {
    document.querySelector('#p1place').addEventListener('click', (event) => {
        let pos = event.target.getAttribute('data-cell').split('');
        if (
            playerGrid.place(
                shipUnits[ship],
                Number(pos[0]),
                Number(pos[1])
            ) !== false
        ) {
            document.querySelector('.grid0').innerHTML = '';
            shipPlace();
        }
    });
}

function shipPlace() {
    let i = playerGrid.shipList.length;
    let j = document.querySelector('.preGame');
    let k = shipGenerator();
    if (i < 5) {
        gridDisplay(playerGrid, 'p1place');
        shipHover(i, k);
        hoverAdd(i, k);
    } else {
        j.parentNode.removeChild(j);
        gridDisplay(playerGrid, 'p1');
        document.querySelector('.container').style.display = 'flex';
        turnHandler();
    }
}

function playerAttack() {
    document.querySelector('#bot').addEventListener('click', (event) => {
        let pos = event.target.getAttribute('data-cell').split('');
        if (compGrid.attack(Number(pos[0]), Number(pos[1])) !== false) {
            document.querySelector('.grid2').innerHTML = '';
            gridDisplay(compGrid, 'bot');
            currentTurn = 2;
            turnHandler();
        }
    });
}

function turnHandler() {
    if (compGrid.sinkCheck() == true) {
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.gameDone').style.display = 'flex';
        document.querySelector('.endResult').textContent =
            'Congratulations You Win';
    } else if (playerGrid.sinkCheck() == true) {
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.gameDone').style.display = 'flex';
        document.querySelector('.endResult').textContent = 'Game Over You Lose';
    } else if (player1.turn == currentTurn && compGrid.sinkCheck() == false) {
        playerAttack();
    } else if (player2.turn == currentTurn && playerGrid.sinkCheck() == false) {
        compAttack();
    }
}

function restart() {
    for (let i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            playerGrid.board[i][j] = null;
            compGrid.board[i][j] = null;
        }
    }
    playerGrid = gameBoard()
    compGrid = gameBoard();
    currentTurn = 1;
}

module.exports = { compBoard, shipPlace, playerGrid, compGrid, restart };
