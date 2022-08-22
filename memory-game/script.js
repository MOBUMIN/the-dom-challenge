let isShowingAnswer = false;
let answer = [];
let colCnt = 0;
let score = 0;
let highScore = 0;
const boardDom = document.querySelector('#memory-board');
const buttonDom = document.querySelector('#button');
const scoreDom = document.querySelector('#score');
const highScoreDom = document.querySelector('#high-score');
const BASIC_TIME = 500;

function MemoryBoard(num) {
	colCnt = num;
	setHighScore();
	makeDom();
	attachClickEvent();
}

const setHighScore = () => {
	if(highScore !== 0) {
		localStorage.setItem("highScore", score);
	}
	else {
		const localScore = localStorage.getItem("highScore");

		if(localScore)
			highScore = Number(localScore);
	}
	
	highScoreDom.innerHTML = highScore;
}

const makeDom = () => {
	for(let i=0; i<colCnt; i++) {
		const col = document.createElement('div');
		col.className = 'col';
		col.dataset.num = i;
		boardDom.appendChild(col);
	}

	scoreDom.innerHTML = score;
}

const attachClickEvent = () => {
	boardDom.addEventListener('click', (e) => {
		if(isShowingAnswer) return;

		if(answer.length > 0) {
			const isCorrect = Number(e.target.dataset.num) === answer[0];

			if(isCorrect) correctAnswer(e.target);
			else wrongAnswer(e.target);
		}
	})
}

const correctAnswer = async (correctDom) => {
	answer.shift();
	setDomClassTimeout(correctDom, 'click-answer', BASIC_TIME);

	if(answer.length === 0) {
		score = score + 1;
		setScore(score);
		if(score > highScore) {
			highScore = score;
			setHighScore();
		}

		await setPromiseTimeout(BASIC_TIME*2);
		setAnswer(score+1);
	}
}

const wrongAnswer = (wrongDom) => {
	answer = [];
	score = 0;

	setDomClassTimeout(boardDom, 'shake', BASIC_TIME);
	setDomClassTimeout(wrongDom, 'wrong-answer', BASIC_TIME);

	buttonDom.disabled=false;
	boardDom.classList.remove('clickable');
}

const onClick = () => {
	if(isShowingAnswer) return;

	buttonDom.disabled=true;
	setAnswer(1);
	setScore(0);
}

const setScore = (score) => scoreDom.innerHTML = score;


const setAnswer = async (round) => {
	isShowingAnswer = true;

	pushAnswer(round);
	await showAnswer(round);

	isShowingAnswer = false;
}

const pushAnswer = (round) => {
	for(let i=0; i<round; i++) {
		answer.push(getRandomNum())
	}
}

const showAnswer = async (round) => {
	boardDom.classList.remove('clickable');

	for(let i=0; i<round; i++) {
		const showDom = document.querySelector(`.col[data-num="${answer[i]}"]`);
		await setDomClassTimeout(showDom, 'show-answer', BASIC_TIME);
		await setPromiseTimeout(BASIC_TIME);
	}

	boardDom.classList.add('clickable');
}

const setDomClassTimeout = async (dom, className, time) => {
	dom.classList.add(className);
	await setPromiseTimeout(time);
	dom.classList.remove(className);
}

const getRandomNum = () => Math.floor(Math.random() * colCnt)

const setPromiseTimeout = (time) => new Promise((res) => {
	setTimeout(() => res(), time)
})
