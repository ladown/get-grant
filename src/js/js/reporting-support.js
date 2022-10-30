'use strict';

window.addEventListener('DOMContentLoaded', () => {
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

	const moreItems = document.querySelectorAll('.js-more');

	if (moreItems.length) {
		moreItems.forEach((item) => {
			new More(item).init();
		});
	}

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
							if (slide === swiper.slides[swiper.activeIndex]) {
								if (slide.getAttribute('data-swiper-slide-index') === swiper.realIndex.toString()) {
									return el;
								}
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

	FaqSlider.init();
});
