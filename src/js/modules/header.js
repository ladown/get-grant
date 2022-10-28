'use strict';

import scrollLock from 'scroll-lock';
import { gsap } from 'gsap';

const Header = {
	variables: {
		pageScrollOffset: 0,
		btnDataSelector: 'js-header-button',
		widthToCloseMenu: 981,
	},

	nodes: {
		block: document.querySelector('.js-header'),
		menu: document.querySelector('.js-header-menu'),
	},

	mods: {
		opened: 'is-opened',
		sticked: 'is-sticked',
	},

	openMenu() {
		scrollLock.disablePageScroll(this.nodes.menu);
		this.nodes.block.classList.add(this.mods.opened);
		gsap.to(this.nodes.menu, {
			display: 'flex',
			duration: 0.01,
			onComplete: function () {
				gsap.to(Header.nodes.menu, { opacity: 1, duration: 0.3, ease: 'linear' });
			},
		});
	},

	closeMenu() {
		scrollLock.enablePageScroll(this.nodes.menu);
		this.nodes.block.classList.remove(this.mods.opened);
		gsap.to(this.nodes.menu, {
			display: 'none',
			opacity: 0,
			duration: 0.3,
			ease: 'linear',
		});
	},

	handleScroll() {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollTop >= this.variables.pageScrollOffset && !this.nodes.block.classList.contains(this.mods.sticked)) {
			this.nodes.block.classList.add(this.mods.sticked);
		}

		if (scrollTop <= this.variables.pageScrollOffset && this.nodes.block.classList.contains(this.mods.sticked)) {
			this.nodes.block.classList.remove(this.mods.sticked);
		}
	},

	changeStateOnResize() {
		window.addEventListener('resize', (event) => {
			if (event.target && event.target.innerWidth >= this.variables.widthToCloseMenu) {
				scrollLock.enablePageScroll();

				this.nodes.block.classList.remove(this.mods.opened);
				this.nodes.menu.style.cssText = `
					display: '';
					opacity: '';
				`;
			}
		});
	},

	setListenerForSticked() {
		window.addEventListener('scroll', this.handleScroll.bind(this));
	},

	setListener() {
		this.nodes.block.addEventListener('click', (event) => {
			if (event.target && event.target.classList.contains(this.variables.btnDataSelector)) {
				if (this.nodes.block.classList.contains(this.mods.opened)) {
					this.closeMenu();
				} else {
					this.openMenu();
				}
			}
		});
	},

	init() {
		if (this.nodes.block) {
			this.setListener();
			this.setListenerForSticked();
			this.changeStateOnResize();
			this.handleScroll();
		}
	},
};

export default Header;
