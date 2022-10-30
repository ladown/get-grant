'use strict';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
export default Work;
