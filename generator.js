function generator(grid) {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (grid[x][y] === '') {
                let arr = [];
                for (let i = 0; i < 9; i++) {
                    arr.push(grid[x][i]);
                    arr.push(grid[i][y]);
                }

                let offsetX = Math.floor(x / 3);
                let offsetY = Math.floor(y / 3);
                for (let xx = 0; xx < 3; xx++) {
                    for (let yy = 0; yy < 3; yy++) {
                        arr.push(grid[offsetX * 3 + xx][offsetY * 3 + yy]);
                    }
                }

                let rand = shuffle();

                for (let i = 0; i < 9; i++) {
                    if (arr.indexOf(rand[i]) === -1) {
                        grid[x][y] = rand[i];
                        if (generator(grid)) return true;
                        grid[x][y] = '';
                    }
                }
                return false;
            }
        }
    }
    randomHide(grid)
    return true;
}

function shuffle() {
    let arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let i = 0; i < 100; i++) {
        let rand1 = Math.floor(Math.random() * 9);
        let rand2 = Math.floor(Math.random() * 9);
        let temp = arr[rand1];
        arr[rand1] = arr[rand2];
        arr[rand2] = temp;
    }
    return arr;
}

function randomHide(grid) {
    let count = 0;
    // provide at least 17 seeds number
    while (count < 81 - 17) {
        let x = Math.floor(Math.random() * 9)
        let y = Math.floor(Math.random() * 9)
        if (grid[x][y] !== '') {
            grid[x][y] = '';
            count++;
        }
    }
}