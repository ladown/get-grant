'use strict';

window.addEventListener('DOMContentLoaded', () => {
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

	BeliefSlider.init();

	const TeamSlider = {
		instance: null,
		nodes: {
			slider: document.querySelector('.js-slider-team'),
			buttons: {
				prev: document.querySelector('.js-slider-team-prev'),
				next: document.querySelector('.js-slider-team-next'),
			},
		},

		setInstance() {
			this.instance = new Swiper(this.nodes.slider, {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 60,
				grabCursor: true,
				navigation: {
					nextEl: this.nodes.buttons.next,
					prevEl: this.nodes.buttons.prev,
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
						slidesPerGroup: 1,
						spaceBetween: 10,
					},
					581: {
						spaceBetween: 15,
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					769: {
						spaceBetween: 30,
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					981: {
						spaceBetween: 45,
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					1200: {
						spaceBetween: 60,
						slidesPerView: 2,
						slidesPerGroup: 2,
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

	TeamSlider.init();
});
