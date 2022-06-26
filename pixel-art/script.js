let pickedColor = null;
let dragging = false;

/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
    // write logic to create pixel art grid.
	const grid = document.querySelector(el);
	makeDOM(grid, rows, cols);
	makeColorPalette(grid, cols);
	attachMouseEvent(grid);
}

const makeDOM = (gridDom, rows, cols) => {
	for(let i=0; i<rows; i++) {
		const row = document.createElement("div");
		row.className = 'row';
		gridDom.appendChild(row);
		for (let j=0; j<cols; j++) {
			const square = document.createElement("div");
			square.className = 'square color-target';
			row.appendChild(square);
		}
	}
}

const makeColorPalette = (gridDom, cols) => {
	const row = document.createElement("div");
	row.className = 'row';
	gridDom.appendChild(row);
	for(let i=0; i<cols; i++) {
		const square = document.createElement("div");
		square.className = 'square color-palette';
		square.style.background = randomHexColorCode();
		row.appendChild(square);
	}
}

const randomHexColorCode = () => {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 6);
};

const attachMouseEvent = (gridDom) => {

	gridDom.addEventListener("click", (e) => {
		const clickedTarget = e.target;
		if(clickedTarget.classList.contains('color-palette')) {
			pickedColor = clickedTarget.style.background;
		}
		else if(clickedTarget.classList.contains('color-target')) {
			clickedTarget.style.background = pickedColor;
		}
	})
	gridDom.addEventListener("mousedown", (e) => {
		dragging = true;
	})
	gridDom.addEventListener("mousemove", (e) => {
		const clickedTarget = e.target;
		if(clickedTarget.classList.contains('color-target') && dragging)
			e.target.style.background = pickedColor;
	})
	gridDom.addEventListener("mouseup", (e) => {
		dragging = false;
	})
}