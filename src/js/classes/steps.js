'use strict';

import { gsap } from 'gsap';

class StepsClass {
	constructor() {
		this.wrap = document.querySelector('.js-steps');
		this.items = document.querySelectorAll('.js-steps-item');
		this.linesContent = document.querySelector('.js-steps-lines');
		this.content = document.querySelector('.js-steps-content');
		this.headerHeight = document.querySelector('.js-header').offsetHeight;
		this.isDesktop = false;
		this.isMobile = false;
		this.timelines = [];
		this.lines = [];
		this.gutter = null;
	}

	getCoords(item, index) {
		const x1 = index % 2 === 0 ? 0 : 300;
		const y1 = item.offsetTop + item.offsetHeight - 30;
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
			${index % 2 === 0 ? `left: ${coords.x1}rem;` : `right: ${coords.x2}rem;`};
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
						start: `start bottom-=${this.headerHeight}`,
						end: `bottom bottom-=${this.headerHeight}`,
						scrub: false,
						markers: true,
						pinSpacing: false,
						invalidateOnRefresh: true,
					},
				});

				timeline.to(line, {
					width: '100%',
					onStart: () => {
						gsap.to(item, { opacity: 1, duration: 0.2, ease: 'linear' });
					},
					onComplete: () => {
						if (index + 2 === this.items.length) {
							gsap.to(this.items[index + 1], { opacity: 1, duration: 0.2, ease: 'linear' });
						}
					},
				});

				this.timelines.push(timeline);
			}
		});
	}

	setMobileAnimation() {
		const headerHeight = document.querySelector('.js-header').offsetHeight;
		const gutter = Number(getComputedStyle(this.content).gap.replace('px', ''));

		this.items.forEach((item, index) => {
			const itemHeight = item.offsetHeight;

			if (index + 1 !== this.items.length) {
				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: item,
						start: `top top+=${headerHeight + gutter}`,
						end: `bottom top+=${itemHeight + gutter}`,
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
		if (event.target.innerWidth >= 981 && !this.isDesktop) {
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

		if (event.target.innerWidth <= 980 && !this.isMobile) {
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
			this.gutter = Number(getComputedStyle(this.content).gap.replace('px', ''));

			if (window.innerWidth >= 981) {
				this.isDesktop = true;
				this.setAnimation();
			}

			if (window.innerWidth <= 980) {
				this.isMobile = true;
				this.setMobileAnimation();
			}

			this.listenerForResize();
		}
	}
}

const Steps = new StepsClass();
export default Steps;
