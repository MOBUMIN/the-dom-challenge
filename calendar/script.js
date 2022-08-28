const CELL_HEIGHT = 3;
const CELL_WIDTH = 27.5; 

let timeData = [];
const setTimeData = () => {
	if(timeData.length) return;

	let format = 'AM';
	for(let i=1; i<24; i++) {

		let time = i;
		if(format === 'PM') time = i-12;
		timeData.push(`${time} ${format}`);
		if(i===12) format = 'PM';
	}
}

function Callender(id, data) {
	const callenderBox = document.querySelector(id);

	makeCallenderDom(callenderBox)
	makeEventDom(callenderBox, data);
}

const makeCallenderDom = (dom) => {
	const startCell = document.createElement('div');
	startCell.className = 'cell';
	dom.appendChild(startCell);

	for(let i=1; i<24; i++) {
		const cell = document.createElement('div');
		const time = document.createElement('p');
		const divider = document.createElement('div');

		cell.className = 'cell';
		time.className = 'time';
		time.innerText = timeData[i-1];
		divider.className = 'divider';

		cell.appendChild(time);
		cell.appendChild(divider);

		dom.appendChild(cell);
	}
}

const makeEventDom = (dom, data) => {
	data.forEach(event => {
		const eventCell = document.createElement('div');
		const eventTitle = document.createElement('p');
		const eventTime = document.createElement('p');
		const timeData = getEventTimeData(event.startTime, event.endTime);

		eventTitle.innerText = event.title;
		eventTime.innerText = `${timeData.startFormat} ${timeData.displayStartHour}:${timeData.startMin}~${timeData.endFormat} ${timeData.displayEndHour}:${timeData.endMin}`
		eventCell.appendChild(eventTitle);
		eventCell.appendChild(eventTime);

		const allCells = document.querySelectorAll('.cell');

		eventCell.className = 'event';
		eventCell.style.backgroundColor = event.color;
		const height = (timeData.endHour*60 - timeData.startHour*60 +  Number(timeData.endMin) - Number(timeData.startMin))/60 * CELL_HEIGHT;
		const width = CELL_WIDTH;
		const top = (timeData.startHour*60 + Number(timeData.startMin)) / 60 * CELL_HEIGHT;
		eventCell.style.height = `${height}rem`;
		eventCell.style.width = `${width}rem`;
		eventCell.style.top = `${top}rem`;

		dom.insertBefore(eventCell, allCells[timeData.startHour]);
	});

	checkOverlap();
}

const getEventTimeData = (startTime, endTime) => {
	const startHour = Number(startTime.split(':')[0]);
	const startMin = startTime.split(':')[1];
	let startFormat = 'AM';
	let displayStartHour = startHour;
	if(startHour > 12) {
		startFormat = 'PM';
		displayStartHour = startHour-12;
	}
	if(displayStartHour === 0) displayStartHour = '00';

	const endHour = Number(endTime.split(':')[0]);
	const endMin = endTime.split(':')[1];
	let endFormat = 'AM';
	let displayEndHour = endHour;
	if(endHour > 12) {
		endFormat = 'PM';
		displayEndHour = endHour-12;
	}
	if(displayEndHour === 0) displayEndHour = '00';
	
	return { startHour, startMin, startFormat, displayStartHour, endHour, endMin, endFormat, displayEndHour }
}

const checkOverlap = () => {
	const eventDoms = document.querySelectorAll('.event');

	for(let i=1; i<eventDoms.length; i++) {
		let count = 0;

		const targetDom = eventDoms[i];
		const targetDomSize = targetDom.getBoundingClientRect();

		for(let j=0; j<i; j++) {
			const compareDomSize = eventDoms[j].getBoundingClientRect();
			if(compareDomSize.top <= targetDomSize.top && compareDomSize.bottom >= targetDomSize.top ) count++;
		}
		targetDom.style.width = `${CELL_WIDTH / (count+1)}rem`
	}
}