function resolve(grid) {
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

                for (let i = 1; i <= 9; i++) {
                    if (arr.indexOf(i.toString()) === -1) {
                        grid[x][y] = i.toString();
                        if (resolve(grid)) return true;
                        grid[x][y] = '';
                    }
                }
                return false;
            }
        }
    }
    return true;
}