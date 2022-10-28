'use strict';

import Swiper, { Navigation, Autoplay } from 'swiper';
import { gsap } from 'gsap';

const FaqSlider = {
	instance: null,
	nodes: {
		slider: document.querySelector('.js-slider-faq'),
		buttons: {
			prev: document.querySelector('.js-slider-faq-prev'),
			next: document.querySelector('.js-slider-faq-next'),
		},
	},

	setInstance() {
		this.instance = new Swiper(this.nodes.slider, {
			slidesPerView: 1,
			spaceBetween: 10,
			grabCursor: true,
			loop: true,
			loopedSlides: 10,
			slideToClickedSlide: true,
			modules: [Navigation, Autoplay],
			navigation: {
				nextEl: this.nodes.buttons.next,
				prevEl: this.nodes.buttons.prev,
			},
			autoplay: {
				delay: 15000,
				disableOnInteraction: false,
			},
			on: {
				slideChange(swiper) {
					const progressbars = swiper.el.querySelectorAll('.js-progress-faq');
					const activeSlideProgressbar = Array.from(progressbars).filter((el) => {
						const slide = el.closest('.swiper-slide');
						if (slide.getAttribute('data-swiper-slide-index') === swiper.realIndex.toString()) {
							return el;
						}
					});
					gsap.killTweensOf(progressbars, 'scaleX');
					gsap.to(progressbars, { scaleX: 0, duration: 0.1, ease: 'linear' });
					gsap.to(activeSlideProgressbar, { scaleX: 1, duration: 15, ease: 'linear' });
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

export default FaqSlider;
