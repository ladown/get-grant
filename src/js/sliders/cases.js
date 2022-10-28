'use strict';

import Swiper, { Navigation } from 'swiper';

const CasesSlider = {
	instance: null,
	nodes: {
		slider: document.querySelector('.js-slider-cases'),
		buttons: {
			prev: document.querySelector('.js-slider-cases-prev'),
			next: document.querySelector('.js-slider-cases-next'),
		},
	},

	setInstance() {
		this.instance = new Swiper(this.nodes.slider, {
			autoHeight: true,
			slidesPerView: 1,
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

export default CasesSlider;
