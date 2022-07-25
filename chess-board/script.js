const UP_LEFT = 0;
const UP_RIGHT = 1;
const DOWN_LEFT = 2;
const DOWN_RIGHT = 3;
const ALL_DIRECTION = 4;

const addRedClass = (el, direction) => {
    if(!el) return;
    let { row, col } = el.dataset;
    row = Number(row);
    col = Number(col);
    
   // const isOver = row<0 || row>7 || col<0 || col>7;
    // if(isOver) return;
    
    el.classList.add('red');
    
    switch(direction) {
        case UP_LEFT:
            addRedClass(document.querySelector(`div[data-row="${row-1}"][data-col="${col-1}"]`), UP_LEFT)
            break;
        case UP_RIGHT:
            addRedClass(document.querySelector(`div[data-row="${row-1}"][data-col="${col+1}"]`), UP_RIGHT)
            break;
        case DOWN_LEFT:
            addRedClass(document.querySelector(`div[data-row="${row+1}"][data-col="${col-1}"]`), DOWN_LEFT)
            break;
        case DOWN_RIGHT:
            addRedClass(document.querySelector(`div[data-row="${row+1}"][data-col="${col+1}"]`), DOWN_RIGHT)
            break;
        case ALL_DIRECTION:
            addRedClass(document.querySelector(`div[data-row="${row-1}"][data-col="${col-1}"]`), UP_LEFT);
            addRedClass(document.querySelector(`div[data-row="${row-1}"][data-col="${col+1}"]`), UP_RIGHT);
            addRedClass(document.querySelector(`div[data-row="${row+1}"][data-col="${col-1}"]`), DOWN_LEFT);
            addRedClass(document.querySelector(`div[data-row="${row+1}"][data-col="${col+1}"]`), DOWN_RIGHT);
            break;
    }
}

function ChessBoard(el, rows, cols) {
    // write logic to create pixel art grid.
	const grid = document.querySelector(el);
    
    const makeDOM = () => {
        for(let i=0; i<rows; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            grid.appendChild(row);
            for (let j=0; j<cols; j++) {
                const square = document.createElement('div');
                const color = (i+j) % 2 ? 'black' : 'white'
                square.className = `square ${color}`;
                square.dataset.row=i;
                square.dataset.col=j;
                row.appendChild(square);
            }
        }
    }
    
    const removeRedClasses = () => {
        const redEls = document.querySelectorAll('.red')
        redEls.forEach((el) => el.classList.remove('red'))
    }
    
    const attachClickEvent = () => {
        grid.addEventListener('click', (e) => {
            removeRedClasses();
            addRedClass(e.target, ALL_DIRECTION);
        });
    }

    
	makeDOM();
    attachClickEvent();
}
