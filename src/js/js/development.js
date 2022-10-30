'use strict';

window.addEventListener('DOMContentLoaded', () => {
	const RequirementsCards = {
		nodes: {
			cards: document.querySelectorAll('.js-requirements-card'),
			contentBlocks: document.querySelectorAll('.js-requirements-card-content'),
			wrap: document.querySelector('.js-requirements-cards-wrap'),
		},
		isDesktop: false,
		isMobile: false,
		animations: [],
		activeCard: 0,

		clearStyles() {
			if (this.isDesktop) {
				this.nodes.contentBlocks.forEach((contentBlock) => {
					contentBlock.removeAttribute('style');
				});
			}

			if (this.isMobile) {
				this.nodes.cards.forEach((card, index) => {
					card.removeAttribute('style');
					this.nodes.contentBlocks[index].removeAttribute('style');
				});
			}
		},

		setAnimation() {
			this.nodes.cards.forEach((card, index) => {
				this.createAnimation(card, this.nodes.contentBlocks[index]);
			});
		},

		createAnimation(card, cardContent) {
			gsap.set(cardContent, { height: 'auto' });

			const tween = gsap.from(cardContent, {
				height: 0,
				duration: 0.3,
				ease: 'linear',
				reversed: true,
			});

			card.animation = tween;
			this.animations.push(tween);
		},

		toggleDesktopCards(activeCard, activeIndex) {
			this.nodes.wrap.classList.add('no-pe');
			this.nodes.cards.forEach((card, index) => {
				if (card !== activeCard) {
					gsap.to(this.nodes.contentBlocks[index], {
						display: 'none',
						opacity: 0,
						duration: 0.3,
						ease: 'linear',

						onComplete: () => {
							gsap.to(card, { flex: 2, duration: 0.3, ease: 'linear', delay: 0.2 });
							card.classList.remove('is-active');
						},
					});
				}
			});

			setTimeout(() => {
				activeCard.classList.add('is-active');
				gsap.to(activeCard, {
					flex: 6,
					duration: 0.3,
					ease: 'linear',
					onComplete: () => {
						gsap.to(this.nodes.contentBlocks[activeIndex], {
							opacity: 1,
							display: 'block',
							duration: 0.3,
							delay: 0.2,
							ease: 'linear',
							onComplete: () => {
								this.nodes.wrap.classList.remove('no-pe');
							},
						});
					},
				});
			}, 300);
		},

		toggleMobileCards(activeContentBlock) {
			const selectedReversedState = activeContentBlock.animation.reversed();
			this.animations.forEach((animation, index) => {
				animation.reverse();
				if (this.nodes.cards[index] !== activeContentBlock) {
					this.nodes.cards[index].classList.remove('is-active');
				}
			});
			activeContentBlock.animation.reversed(!selectedReversedState);
			activeContentBlock.classList.add('is-active');
		},

		handleClick(card, cardIndex) {
			if (cardIndex !== this.activeCard) {
				if (this.isDesktop) {
					this.toggleDesktopCards(card, cardIndex);
				}

				if (this.isMobile) {
					this.toggleMobileCards(card, this.nodes.contentBlocks[cardIndex]);
				}

				this.activeCard = cardIndex;
			}
		},

		handleResize(event) {
			if (event.target.innerWidth >= 769 && !this.isDesktop) {
				this.isDesktop = true;
				this.isMobile = false;
				this.animations = [];

				this.clearStyles();
				this.removeListener();
				this.setListener();

				this.toggleDesktopCards(this.nodes.cards[this.activeCard], this.activeCard);
			}

			if (event.target.innerWidth <= 768 && !this.isMobile) {
				this.isMobile = true;
				this.isDesktop = false;
				this.animations = [];

				this.clearStyles();
				this.removeListener();
				this.setListener();

				this.toggleMobileCards(this.nodes.cards[this.activeCard], this.nodes.contentBlocks[this.activeCard]);
			}
		},

		setListener() {
			if (this.isMobile) {
				this.setAnimation();
			}

			this.nodes.cards.forEach((card, cardIndex) => {
				card.addEventListener('click', this.handleClick.bind(this, card, cardIndex));
			});
		},

		setListenerForResize() {
			window.addEventListener('resize', this.handleResize.bind(this));
		},

		removeListener() {
			this.nodes.cards.forEach((card) => {
				card.removeEventListener('click', this.handleClick);
			});
		},

		init() {
			if (this.nodes.cards.length) {
				window.innerWidth >= 769 ? (this.isDesktop = true) : (this.isMobile = true);

				this.setListener();
				this.setListenerForResize();

				if (this.isMobile) {
					this.toggleMobileCards(
						this.nodes.cards[this.activeCard],
						this.nodes.contentBlocks[this.activeCard],
					);
				}
			}
		},
	};

	RequirementsCards.init();

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

	ProgrammsSlider.init();

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
