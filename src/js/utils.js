export const isTouchDevice = () => {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

export const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

export const isIOS = () => {
	return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
};

export const URLToArray = (url) => {
	var request = {};
	var pairs = url.substring(url.indexOf('?') + 1).split('&');
	for (var i = 0; i < pairs.length; i++) {
		if (!pairs[i]) continue;
		var pair = pairs[i].split('=');
		request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	return request;
};

export const ArrayToURL = (array) => {
	var pairs = [];
	for (var key in array) {
		if (Object.prototype.hasOwnProperty.call(array, key)) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));
		}
	}

	return pairs.join('&');
};

export const numberWithSpaces = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const numberWithDots = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const delay = (fn, ms) => {
	let timer = 0;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(fn.bind(this, ...args), ms || 0);
	};
};

export const guidGenerator = () => {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};
