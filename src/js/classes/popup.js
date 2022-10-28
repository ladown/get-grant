'use strict';

import scrollLock from 'scroll-lock';
import { gsap } from 'gsap';

class Popup {
	constructor(popupElement, triggerSelector) {
		this.popup = popupElement;
		this.popupWrap = this.popup.querySelector('.js-popup-wrap');
		this.triggers = document.querySelectorAll(triggerSelector);
		this.inputs = this.popup.querySelectorAll('input');
		this.isOpened = false;
	}

	openPopup() {
		scrollLock.disablePageScroll(this.popupWrap);

		gsap.to(this.popup, {
			display: 'flex',
			opacity: 1,
			duration: 0.3,
			ease: 'linear',
			onStart: () => {
				gsap.to(this.popupWrap, {
					delay: 0.1,
					translateX: 0,
					duration: 0.3,
					ease: 'linear',
				});
			},
		});

		this.isOpened = !this.isOpened;
	}

	closePopup() {
		scrollLock.enablePageScroll(this.popupWrap);

		gsap.to(this.popupWrap, {
			delay: 0.1,
			translateX: '100%',
			duration: 0.3,
			ease: 'linear',
			onStart: () => {
				gsap.to(this.popup, {
					display: 'none',
					opacity: 0,
					duration: 0.3,
					ease: 'linear',
				});
			},
		});

		this.isOpened = !this.isOpened;
	}

	setListenerForOpening() {
		this.triggers.forEach((button) => {
			button.addEventListener('click', (event) => {
				if (event.target.tagName.toLowerCase() === 'a') {
					event.preventDefault();
				}

				if (this.isOpened) {
					this.closePopup();
				} else {
					this.openPopup();
				}
			});
		});
	}

	setListenerForClosing() {
		this.popup.addEventListener('click', (event) => {
			if (event.target && event.target.classList.contains('js-popup-close')) {
				this.closePopup();
			}
		});

		document.addEventListener('keydown', ({ key, code }) => {
			if (key === 'Escape' && code === 'Escape') {
				this.closePopup();
			}
		});
	}

	init() {
		this.setListenerForOpening();
		this.setListenerForClosing();
	}
}

export default Popup;
