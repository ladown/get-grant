'use strict';

import $ from 'jquery';

class Accordion {
	constructor(wrap) {
		this.wrap = wrap;
		this.block = this.wrap.querySelectorAll('.js-accordion');
		this.trigger = this.wrap.querySelectorAll('.js-accordion-trigger');
		this.subheader = this.wrap.querySelectorAll('.js-accordion-content');
		this.mods = {
			open: 'is-opened',
		};
		this.responsive = null;
		this.activeAccordion = null;
		this.isInit = false;
	}

	showAccordion(index) {
		this.block[index].classList.add(this.mods.open);
		$(this.subheader[index]).slideDown();
	}

	hideAccordion() {
		this.block.forEach((block) => {
			block.classList.remove(this.mods.open);
		});
		$(this.subheader).slideUp();
	}

	handleClick(clickedIndex, event) {
		event.preventDefault();

		if (this.activeAccordion === clickedIndex) {
			this.hideAccordion();

			this.activeAccordion = null;
		} else {
			this.hideAccordion();
			this.showAccordion(clickedIndex);

			this.activeAccordion = clickedIndex;
		}
	}

	handleResize(event) {
		if (event.target && event.target.innerWidth <= this.responsiveWidth) {
			this.setListener();
		} else {
			this.removeListener();
			this.removeResponsiveListener();
		}
	}

	setListener() {
		this.trigger.forEach((trigger, index) => {
			trigger.addEventListener('click', this.handleClick.bind(this, index));
		});
	}

	removeListener() {
		this.trigger.forEach((trigger, index) => {
			trigger.removeEventListener('click', this.handleClick.bind(this, index));
		});
	}

	setResponsiveListener() {
		if (window.innerWidth <= this.responsive) {
			this.setListener();
		} else {
			window.addEventListener('resize', this.handleResize.bind(this));
		}
	}

	removeResponsiveListener() {
		window.removeEventListener('resize', this.handleResize.bind(this));
	}

	setup() {
		const responsive = parseInt(this.wrap.getAttribute('data-responsive'));
		this.responsive = responsive;

		if (responsive && !this.isInit) {
			this.setResponsiveListener();
		} else {
			this.setListener();
			this.isInit = true;
		}
	}

	init() {
		this.setup();
		return this;
	}
}

export default Accordion;
