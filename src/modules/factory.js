const ships = (type) => {
    function hit() {
        this.stats[0].hp -= 1;
    }
    function sinkState() {
        if (this.stats[0].hp == 0) {
            return true;
        }
    }
    const shapes = {
        a: {
            stats: [{ boat: 1, big: 3, hp: 3 }],
            hitStat: hit,
            sunken: sinkState
        },
        b: {
            stats: [{ boat: 2, big: 3, hp: 3 }],
            hitStat: hit,
            sunken: sinkState
        },
        c: {
            stats: [{ boat: 3, big: 4, hp: 4 }],
            hitStat: hit,
            sunken: sinkState
        },
        d: {
            stats: [{ boat: 4, big: 4, hp: 4 }],
            hitStat: hit,
            sunken: sinkState
        },
        e: {
            stats: [{ boat: 5, big: 5, hp: 5 }],
            hitStat: hit,
            sunken: sinkState
        }
    };
    return shapes[type];
};

const gameBoard = () => {
    let shipList = [];
    let board = [];
    for (let i = 0; i < 10; i++) {
        let row = [];
        row = Array(10).fill(null);
        board.push(row);
    }
    function place(stuff, x, y) {
        let z = stuff.stats[0].big;
        let info = this.board;
        if (rangeCheck(info, z, x, y) === true) {
            let k = y + z + 1 > 10 ? 10 : y + z;
            for (let i = y; i < k; i++) {
                this.board[x][i] = shipList.length;
            }

            this.shipList.push(stuff);
        } else {
            return false;
        }
    }
    function attack(x, y) {
        let atkSucess = true;
        let point = this.board[x][y];
        if (point !== null && point !== 'X' && point !== 'Y') {
            this.shipList[point].hitStat();
            this.board[x][y] = 'Y';
        } else if (point === null) {
            this.board[x][y] = 'X';
        } else if (point === 'X' || point === 'Y') {
            atkSucess = false;
        }
        return atkSucess;
    }
    function sinkCheck() {
        let sinkedShips = 0;
        let lose = false;
        for (let i = 0; i < this.shipList.length; i++) {
            if (this.shipList[i].sunken() == true) {
                sinkedShips += 1;
            }
        }
        if (sinkedShips === shipList.length) {
            lose = true;
        }
        return lose;
    }
    return { board, shipList, place, attack, sinkCheck };
};

function rangeCheck(curGrid, size, xCor, yCor) {
    result = true;
    let p = xCor < 1 ? 0 : xCor - 1;
    let q = yCor < 1 ? 0 : yCor - 1;
    let r = xCor + 2;
    let s = yCor + size + 1;
    let x = [...Array(10).keys()].slice(p, r);
    let y = [...Array(11).keys()].slice(q, s);
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < y.length; j++) {
            if (s > 11) {
                result = false;
                break;
            } else if (
                curGrid[x[i]][y[j]] !== null &&
                curGrid[x[i]][y[j]] !== undefined
            ) {
                result = false;
                break;
            }
        }
    }
    return result;
}

module.exports = { gameBoard, ships };
