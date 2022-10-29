'use strict';

class DefaultsClass {
	constructor() {}

	hoverOnDirections() {
		const items = document.querySelectorAll('.js-direction');

		if (items.length) {
			items.forEach((item) => {
				item.addEventListener('mouseenter', () => {
					items.forEach((item) => item.classList.remove('is-active'));
					item.classList.add('is-active');
				});

				item.addEventListener('mouseleave', () => {
					item.classList.remove('is-active');
				});
			});
		}
	}

	init() {
		this.hoverOnDirections();
	}
}

const Defaults = new DefaultsClass();
export default Defaults;
