'use strict';

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

	hideTabs() {
		this.tabsParent.classList.add(this.mods.locked);
		this.tabs[this.activeTab].classList.remove(this.mods.active);
		this.tabsContent[this.activeTab].classList.remove(this.mods.active);
	}

	showTabs(index = 0) {
		this.tabsContent[index].classList.add(this.mods.active);
		this.tabs[index].classList.add(this.mods.active);
		this.tabsParent.classList.remove(this.mods.locked);

		this.activeTab = index;
	}

	setListener() {
		this.tabsParent.addEventListener('click', (event) => {
			if (event.target && event.target.classList.contains('js-tabs-button')) {
				this.tabs.forEach((tab, index) => {
					if (event.target === tab && index !== this.activeTab) {
						this.hideTabs();
						this.showTabs(index);
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
