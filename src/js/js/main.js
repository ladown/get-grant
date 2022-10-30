'use strict';

window.addEventListener('DOMContentLoaded', () => {
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

	CasesSlider.init();

	class WorkClass {
		constructor() {
			this.wrap = document.querySelector('.js-work');
			this.items = document.querySelectorAll('.js-work-item');
			this.progress = document.querySelectorAll('.js-work-progress');
			this.content = document.querySelector('.js-work-content');
			this.timeline = null;
			this.headerHeight = document.querySelector('.js-header').offsetHeight;
			this.progressProperty = window.innerWidth >= 769 ? 'scaleX' : 'scaleY';
			this.step = 0;
		}

		setStepedAnimation() {
			this.timeline.to(this.progress[this.step], {
				[this.progressProperty]: 1,
				duration: 1,
				delay: 0,
				ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
				onStart: () => {
					gsap.to(this.items[this.step], {
						opacity: 1,
						duration: 1,
						delay: 0,
						ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
					});
				},
				onComplete: () => {
					if (this.step + 1 !== this.items.length) {
						this.step += 1;
						this.setStepedAnimation();
					}
				},
			});
		}

		setAnimation() {
			this.timeline = gsap.timeline({
				scrollTrigger: {
					trigger: this.content,
					start: `top center-=${this.headerHeight}`,
					end: 'bottom bottom',
					markers: false,
					pinSpacing: false,
					invalidateOnRefresh: true,
				},
			});

			this.setStepedAnimation();
		}

		init() {
			if (this.wrap) {
				this.setAnimation();
			}
		}
	}

	const Work = new WorkClass();
	Work.init();

	class StepsClass {
		constructor() {
			this.wrap = document.querySelector('.js-steps');
			this.items = document.querySelectorAll('.js-steps-item');
			this.linesContent = document.querySelector('.js-steps-lines');
			this.content = document.querySelector('.js-steps-content');
			this.isDesktop = false;
			this.isMobile = false;
			this.timelines = [];
			this.lines = [];
		}

		getCoords(item, index) {
			const x1 = index % 2 === 0 ? 0 : 300;
			const y1 = item.offsetTop + item.offsetHeight / 2;
			const x2 = index % 2 === 0 ? 300 : 0;
			return {
				x1,
				y1,
				x2,
			};
		}

		createLine(item, index) {
			const block = document.createElement('div');
			const coords = this.getCoords(item, index);

			block.classList.add('steps__line', 'js-steps-line');
			block.style.cssText = `
				top: ${coords.y1}rem;
				${index % 2 === 0 ? `left: ${coords.x1}rem;` : `right: ${coords.x2}rem;`}
			`;

			this.lines.push(block);

			this.linesContent.append(block);

			return block;
		}

		setAnimation() {
			this.items.forEach((item, index) => {
				if (index + 1 !== this.items.length) {
					const line = this.createLine(item, index);

					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: item,
							start: 'center center',
							end: 'bottom center-=100',
							scrub: true,
							markers: false,
							pinSpacing: false,
							invalidateOnRefresh: true,
						},
					});

					timeline.to(line, { width: '100%', ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)', duration: 0.05 });

					this.timelines.push(timeline);
				}
			});
		}

		setMobileAnimation() {
			const headerHeight = document.querySelector('.js-header').offsetHeight;
			const gutter = Number(getComputedStyle(this.content).gap.replace('px', ''));

			this.items.forEach((item, index) => {
				if (index + 1 !== this.items.length) {
					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: item,
							start: `top top+=${headerHeight + gutter}`,
							scrub: true,
							markers: false,
							pinSpacing: false,
							invalidateOnRefresh: true,
						},
					});

					timeline.to(item.querySelector('.js-steps-item-line'), {
						width: '100%',
						ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
						duration: 0.05,
					});

					this.timelines.push(timeline);
				}
			});
		}

		handleResize(event) {
			if (event.target.innerWidth >= 769 && !this.isDesktop) {
				this.timelines.forEach((item) => {
					item.kill();
				});

				this.items.forEach((item) => {
					const line = item.querySelector('.js-steps-item-line');
					line.removeAttribute('style');
				});

				this.timelines = [];

				this.setAnimation();

				this.isDesktop = true;
				this.isMobile = false;
			}

			if (event.target.innerWidth <= 768 && !this.isMobile) {
				this.timelines.forEach((item) => {
					item.kill();
				});

				this.lines.forEach((line) => {
					line.remove();
				});

				this.timelines = [];

				this.setMobileAnimation();

				this.isMobile = true;
				this.isDesktop = false;
			}
		}

		listenerForResize() {
			window.addEventListener('resize', this.handleResize.bind(this));
		}

		init() {
			if (this.wrap) {
				if (window.innerWidth >= 769) {
					this.isDesktop = true;
					this.setAnimation();
				}

				if (window.innerWidth <= 768) {
					this.isMobile = true;
					this.setMobileAnimation();
				}

				this.listenerForResize();
			}
		}
	}

	const Steps = new StepsClass();
	Steps.init();

	class Tabs {
		constructor(wrapperElement) {
			this.tabs = wrapperElement.querySelectorAll('.js-tabs-button');
			this.tabsContent = wrapperElement.querySelectorAll('.js-tabs-content');
			this.tabsParent = wrapperElement.querySelector('.js-tabs-parent');
			this.mods = {
				active: 'is-active',
				locked: 'is-locked',
				hidden: 'is-hidden',
			};
			this.activeTab = 0;
		}

		toggleVisibility(index = 0) {
			this.tabsParent.classList.add(this.mods.locked);
			this.tabs[this.activeTab].classList.remove(this.mods.active);
			gsap.to(this.tabsContent[this.activeTab], {
				display: 'none',
				opacity: 0,
				duration: 0.3,
				ease: 'linear',

				onStart: () => {
					this.tabsContent[index].classList.add(this.mods.active);
					setTimeout(() => {
						gsap.to(this.tabsContent[index], {
							display: 'grid',
							opacity: 1,
							duration: 0.3,
							ease: 'linear',
						});
						this.tabs[index].classList.add(this.mods.active);
						this.tabsParent.classList.remove(this.mods.locked);
					}, 250);
				},
			});

			this.activeTab = index;
		}

		setListener() {
			this.tabsParent.addEventListener('click', (event) => {
				if (event.target && event.target.classList.contains('js-tabs-button')) {
					this.tabs.forEach((tab, index) => {
						if (event.target === tab && index !== this.activeTab) {
							this.toggleVisibility(index);
						}
					});
				}
			});
		}

		init() {
			this.setListener();
		}
	}

	const tabs = document.querySelectorAll('.js-tabs');

	if (tabs.length) {
		tabs.forEach((tab) => {
			new Tabs(tab).init();
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
