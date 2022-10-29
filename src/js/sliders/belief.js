'use strict';

import Swiper, { Navigation } from 'swiper';

const BeliefSlider = {
	instance: null,
	nodes: {
		slider: document.querySelector('.js-slider-belief'),
		buttons: {
			prev: document.querySelector('.js-slider-belief-prev'),
			next: document.querySelector('.js-slider-belief-next'),
		},
	},

	setInstance() {
		this.instance = new Swiper(this.nodes.slider, {
			slidesPerView: 'auto',
			slidesPerGroup: 1,
			spaceBetween: 16,
			grabCursor: true,
			modules: [Navigation],
			navigation: {
				nextEl: this.nodes.buttons.next,
				prevEl: this.nodes.buttons.prev,
			},
		});
	},

	init() {
		if (this.nodes.slider) {
			this.setInstance();
		}
	},
};

export default BeliefSlider;
