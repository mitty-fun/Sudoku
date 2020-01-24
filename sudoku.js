const HARD_MAZE = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0],
];

const EMPTY_MAZE = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function array2dToGrid(arr2d) {
    let grid = {};
    for (let x = 0; x < 9; x++) {
        grid[x] = {};
        for (let y = 0; y < 9; y++) {
            grid[x][y] = arr2d[x][y] !== 0 ? arr2d[x][y].toString() : '';
        }
    }
    return grid;
}

let grid = array2dToGrid(HARD_MAZE);


let game = new Vue({
    el: '#sudoku',
    data: { grid },
    methods: {
        v_check(y) {
            let arr = [];
            for (let i = 0; i < 9; i++) {
                arr.push(grid[i][y]);
            }
            return !this.isValid(arr);
        },

        h_check(x) {
            let arr = [];
            for (let i = 0; i < 9; i++) {
                arr.push(grid[x][i]);
            }
            return !this.isValid(arr);
        },

        b_check(i) {
            let offsetX = i % 3;
            let offsetY = (i - offsetX) / 3;
            let arr = [];
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    arr.push(grid[offsetY * 3 + y][offsetX * 3 + x]);
                }
            }
            return !this.isValid(arr);
        },

        isValid(arr) {
            for (let a = 0; a < arr.length - 1; a++) {
                for (let b = a + 1; b < arr.length; b++) {
                    if (arr[a] === arr[b] && arr[b] !== '') return false;
                }
            }
            return true;
        },

        resolve() {
            resolve(grid);
        },

        newGame() {
            let newGrid = array2dToGrid(EMPTY_MAZE);
            generator(newGrid);

            for (let x = 0; x < 9; x++) {
                for (let y = 0; y < 9; y++) {
                    this.grid[x][y] = newGrid[x][y];
                }
            }
        }
    },
});