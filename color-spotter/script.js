const INIT_ROWS = 4;
const INIT_COLS = 4;

let answer = null;
let score = null;

function GameBoard(rows) {
	const grid = document.querySelector('#grid');
    
    // initDom(grid);
    
	makeDOM(grid, rows, rows);
	setAnswerEl(rows * rows);
    attachClickEvent(grid);
}

function Score(num) {
    const scoreDom = document.querySelector('#score');
    scoreDom.innerHTML = 'Score : ' + num;
    score = num;
}

const getRandomColors = () => {
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}

const makeDom = (grid, rows, cols) => {
    for(let i=0; i<rows; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        grid.appendChild(row);
        for (let j=0; j<cols; j++) {
            const square = document.createElement('div');
            square.dataset.index= rows*i + cols*j;
            row.appendChild(square);
        }
    }
}

const getRandomNum = (num) => Math.floor(Math.random() * num);

const setAnswerEl = (num) => {
   answer = getRandomNum(num);
}

const compareAnswer = (compNum) => compNum === answer;

const attachClickEvent = (grid) => {
    grid.addEventListener('click', (e) => {
        const result = compareAnswer(e.target.dataset.index);
        if(result) {
            Score(score+1);
            GameBoard(getRandomNum(100))
        }
    });
}

const initDom = (grid) => {
    while(grid.hasChildNodes()) {
        console.log(grid);
        grid.removeChild();
    }
}