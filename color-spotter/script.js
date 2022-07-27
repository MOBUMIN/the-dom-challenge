const INIT_ROWS = 4;
const ROWS_RANGE = 10;

let answer = null;
let score = null;
let wrong = false;

function GameBoard(rows) {
	const grid = document.querySelector('#grid');
    
    initDom(grid);
	makeDOM(grid, rows, rows);
    if(score === null) attachClickEvent(grid);
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

const makeDOM = (grid, rows, cols) => {
	const colorSet = getRandomColors();
	answer = getRandomNum(rows * cols);
    for(let i=0; i<rows; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        grid.appendChild(row);
        for (let j=0; j<cols; j++) {
			const index = rows * i + j;

            const square = document.createElement('div');
			square.className = 'square'
			square.style.backgroundColor = index === answer ? colorSet.oddColor : colorSet.color;
            square.dataset.index= index;
            row.appendChild(square);
        }
    }
	if(wrong) {
		grid.classList.add('shake');
		setTimeout(() => {
			grid.classList.remove('shake');
		}, 800)
		wrong = false;
	}
}

const getRandomNum = (num) => Math.floor(Math.random() * num) + 2;

const compareAnswer = (compNum) => compNum === answer;

const attachClickEvent = (grid) => {
    grid.addEventListener('click', (e) => {
        const result = compareAnswer(Number(e.target.dataset.index));
        if(result) {
            Score(score+1);
            GameBoard(getRandomNum(ROWS_RANGE))
        }
		else {
			wrong = true;
			Score(0);
			GameBoard(INIT_ROWS)
		}
    });
}

const initDom = (grid) => {
    while(grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
}