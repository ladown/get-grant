'use strict';

import { gsap } from 'gsap';

class More {
	constructor(wrapElement) {
		this.wrap = wrapElement;
		this.button = wrapElement.querySelector('.js-more-button');
		this.showedItems = wrapElement.getAttribute('data-more-showed');
		this.items = this.showedItems
			? Array.from(wrapElement.querySelectorAll('.js-more-item')).slice(this.showedItems)
			: Array.from(wrapElement.querySelectorAll('.js-more-item')).filter((el) => {
					return getComputedStyle(el).display === 'none';
			  });
		this.isRevealed = false;
	}

	showItems() {
		gsap.to(this.items, { display: 'block', opacity: 1, ease: 'linear', duration: 0.3 });
		this.button.textContent = 'Скрыть';
	}

	hideItems() {
		gsap.to(this.items, { display: 'none', opacity: 0, ease: 'linear', duration: 0.3 });
		this.button.textContent = 'Показать полностью';
	}

	handleClick() {
		if (this.isRevealed) {
			this.hideItems();
		} else {
			this.showItems();
		}

		this.isRevealed = !this.isRevealed;
	}

	setListenter() {
		this.button.addEventListener('click', this.handleClick.bind(this));
	}

	init() {
		this.setListenter();
	}
}

export default More;
