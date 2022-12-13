'use strict';

import { getCoords } from '../utils';

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

	articleContentButtons() {
		const buttons = document.querySelectorAll('.js-article-contents');

		if (buttons.length) {
			buttons.forEach((button) => {
				button.addEventListener('click', (event) => {
					event.target.tagName.toLowerCase() === 'a' ? event.preventDefault() : null;

					const blockToScroll = document.querySelector(event.target.getAttribute('data-href'));
					const headerHeight = document.querySelector('.js-header').offsetHeight;
					const scrolledHeight = getCoords(blockToScroll).top - headerHeight - 16;

					window.scrollTo({ top: scrolledHeight });
				});
			});
		}
	}

	hoverEffect() {
		const items = Array.from(document.querySelectorAll('.js-hover-item'));

		items.forEach((item) => {
			item.addEventListener('mouseenter', () => {
				items.forEach((el) => {
					if (el === item) {
						item.classList.add('is-active');
					} else {
						el.classList.remove('is-active');
					}
				});
			});
		});
	}

	init() {
		this.backButton();
		this.articleContentButtons();
		this.hoverEffect();
	}
}

const Defaults = new DefaultsClass();
export default Defaults;
