const { gameBoard, ships } = require('../factory');

test('if ship shapes generates correctly', () => {
    x = ships('c');
    expect(x.stats[0].big).toBe(4);
});

test('correct grid size', () => {
    let y = gameBoard().board;
    let rows = 0;
    let columns = 0;
    rows += y.length;
    for (const column of y) {
        if (column.length == 10) {
            columns += 1;
        }
    }
    let x = rows * columns;
    expect(x).toBe(100);
});

test('ship placement', () => {
    x = ships('a');
    y = gameBoard();
    y.place(x, 3, 5);
    expect(y.board[3]).toStrictEqual([
        null,
        null,
        null,
        null,
        null,
        0,
        0,
        0,
        null,
        null
    ]);
});

test('ship placement not overlap', () => {
    x = ships('a');
    y = ships('e');
    z = gameBoard();
    z.place(x, 3, 5);
    z.place(y, 3, 5);
    expect(z.board[3]).toStrictEqual([
        null,
        null,
        null,
        null,
        null,
        0,
        0,
        0,
        null,
        null
    ]);
});

test('ship taking damage attack', () => {
    x = ships('a');
    y = gameBoard();
    y.place(x, 3, 5);
    y.attack(3, 6);
    expect(y.board[3]).toStrictEqual([
        null,
        null,
        null,
        null,
        null,
        0,
        'Y',
        0,
        null,
        null
    ]);
    expect(x.stats[0].hp).toBe(2);
});

test('ship sink', () => {
    x = ships('a');
    y = gameBoard();
    y.place(x, 3, 5);
    y.attack(3, 5);
    y.attack(3, 6);
    y.attack(3, 7);
    console.log(y.sinkCheck());
    expect(y.board[3]).toStrictEqual([
        null,
        null,
        null,
        null,
        null,
        'Y',
        'Y',
        'Y',
        null,
        null
    ]);
    expect(y.sinkCheck()).toBe(true);
});
