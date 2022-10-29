'use strict';

class DefaultsClass {
	constructor() {}

	backButton() {
		const backButtons = document.querySelectorAll('.js-back-button');

		if (backButtons.length) {
			backButtons.forEach((button) => {
				button.addEventListener('click', (event) => {
					if (event.target.tagName.toLowerCase() === 'a') {
						event.preventDefault();
					}

					history.back();
				});
			});
		}
	}

	init() {
		this.backButton();
	}
}

const Defaults = new DefaultsClass();
export default Defaults;
