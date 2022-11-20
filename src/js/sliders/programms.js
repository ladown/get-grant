'use strict';

import Swiper, { Navigation } from 'swiper';

const ProgrammsSlider = {
	instance: null,
	nodes: {
		slider: document.querySelector('.js-slider-programms'),
		buttons: {
			prev: document.querySelector('.js-slider-programms-prev'),
			next: document.querySelector('.js-slider-programms-next'),
		},
	},

	setInstance() {
		this.instance = new Swiper(this.nodes.slider, {
			slidesPerView: 'auto',
			slidesPerGroup: 1,
			spaceBetween: 0,
			grabCursor: true,
			slideToClickedSlide: true,
			modules: [Navigation],
			navigation: {
				nextEl: this.nodes.buttons.next,
				prevEl: this.nodes.buttons.prev,
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
				},
				581: {
					spaceBetween: 15,
				},
				769: {
					spaceBetween: 30,
				},
				981: {
					spaceBetween: 45,
				},
				1200: {
					spaceBetween: 60,
				},
			},
		});
	},

	init() {
		if (this.nodes.slider) {
			this.setInstance();
		}
	},
};

export default ProgrammsSlider;
