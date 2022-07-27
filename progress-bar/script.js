let progress_cnt = 0;
let loading = false;

const onClick = () => {
	setProgressCntUp();
	setAnimationBar();
}

const setProgressCntUp = () => {
	const buttonEl = document.querySelector('#button');
	buttonEl.value = `Run ${++progress_cnt}`
}

const setAnimationBar = async() => {
	if(loading) return;

	const barEl = document.querySelector('#progress-bar');
	const loader = document.createElement('div');
	loader.id = 'loader';

	while(progress_cnt >= 1) {
		loading=true;
		barEl.appendChild(loader);
		await timer(3000);
		setProgressCntDown();
		barEl.removeChild(loader);
	}

	loading = false;
}

const timer = (time) => new Promise((res) => {setTimeout(res, time)})

const setProgressCntDown = () => {
	const buttonEl = document.querySelector('#button');
	if(progress_cnt-- > 1) 
		buttonEl.value = `Run ${progress_cnt}`
	else
		buttonEl.value = 'Run'
}