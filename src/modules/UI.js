function gridDisplay(frame, state) {
    const gameGrid = document.createElement('div');
    gameGrid.id = `${state}`;
    gameGrid.classList.add('grid');
    for (let i = 0; i < frame.board.length; i++) {
        for (let j = 0; j < frame.board[i].length; j++) {
            const gameCell = document.createElement('div');
            gameCell.className = 'cells';
            gameCell.setAttribute('data-cell', `${i}${j}`);

            if (frame.board[i][j] === null) {
                gameCell.classList.remove('filled', 'miss', 'hit');
                gameCell.classList.add('empty');
            } else if (frame.board[i][j] == 'X') {
                gameCell.classList.remove('empty', 'filled', 'hit');
                gameCell.classList.add('miss');
            } else if (frame.board[i][j] == 'Y') {
                gameCell.classList.remove('empty', 'filled', 'miss');
                gameCell.classList.add('hit');
            } else {
                gameCell.classList.remove('empty', 'miss', 'hit');
                if (state !== 'bot') {
                    gameCell.classList.add('filled');
                }
            }
            gameGrid.append(gameCell);
        }
    }
    if (state == 'p1place') {
        document.querySelector('.grid0').append(gameGrid);
    } else if (state == 'p1') {
        document.querySelector('.grid1').append(gameGrid);
    } else if (state == 'bot') {
        document.querySelector('.grid2').append(gameGrid);
    }
}

function site() {
    const container = document.createElement('div');
    const header = document.createElement('div');
    const headerTitle = document.createElement('p');
    const gameContent = document.createElement('div');
    const gridHolder1 = document.createElement('div');
    const gridHolder2 = document.createElement('div');

    container.classList.add('container');
    header.classList.add('header');
    gameContent.classList.add('gridHold');
    gridHolder1.classList.add('grid1');
    gridHolder2.classList.add('grid2');

    headerTitle.innerHTML = 'Welcome to Battleship';
    header.append(headerTitle);
    gameContent.append(gridHolder1, gridHolder2);
    container.append(header, gameContent);
    document.body.append(container);
}

function setShip() {
    const disp = document.createElement('div');
    const title = document.createElement('h1');
    const preContent = document.createElement('div');
    const gridHolder1 = document.createElement('div');

    disp.classList.add('preGame');
    title.classList.add('gameTitle');
    preContent.classList.add('preGrid');
    gridHolder1.classList.add('grid0');

    title.innerHTML = 'Place Your Ships';
    preContent.append(gridHolder1);
    disp.append(title, preContent);
    document.body.append(disp);
}

function gameOver() {
    const hold = document.createElement('div');
    const msg = document.createElement('div');
    const restart = document.createElement('button');

    hold.classList.add('gameDone');
    msg.classList.add('endResult');
    restart.classList.add('newGame');

    restart.innerHTML = 'Restart';
    hold.append(msg, restart);
    document.body.append(hold);
}

module.exports = { gridDisplay, site, setShip, gameOver };
