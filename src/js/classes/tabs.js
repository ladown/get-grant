'use strict';

import { gsap } from 'gsap';

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

export default Tabs;
