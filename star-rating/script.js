let clickedVal = null;

/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
	const star = document.querySelector(el);
	for(let i=0; i<count; i++) {
		const starIcon = document.createElement("div");
		starIcon.className = 'star-item fa fa-star-o';
		starIcon.id = i;
		star.appendChild(starIcon);
	}
}

function attachHoverEvent() {
	const starList = document.querySelectorAll('.star-item');

	starList.forEach(star => {
		star.addEventListener("mouseenter", (e) => {
			const starEl = e.currentTarget;
			activateStar(starList, Number(starEl.id));
		})
	});
    // mouseenter말고 over쓰면 버블링 가능
}

function activateStar(starList, count) {
	for(let i=0; i<=count; i++) {
		starList[i].classList='star-item fa fa-star'; // toggle 있으면 없애고 없으면 생기게하는 이라는 게 있음
	}
	for(let i=4; i>count; i--) {
		starList[i].classList='star-item fa fa-star-o';
	}
}

function attachHoverOutEvent() {
	const star = document.querySelector('#star');
	const starList = document.querySelectorAll('.star-item');

	star.addEventListener("mouseleave", () => {
		if(clickedVal !== null)
			activateStar(starList, clickedVal);
		else
			activateStar(starList, -1);
	})
}

function attachClickEvent(callback) {
	const starList = document.querySelectorAll('.star-item');

	starList.forEach(star => {
		star.addEventListener("click", (e) => {
			const starEl = e.currentTarget;
			clickedVal = Number(starEl.id);
			activateStar(starList, clickedVal);
			callback(clickedVal+1);
		})
	});
}