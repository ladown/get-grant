'use strict';

import scrollLock from 'scroll-lock';
import { gsap } from 'gsap';

class Popup {
	constructor(popupElement, triggerSelector, isPopupByTime = false, isLetterPopup = false) {
		this.popup = popupElement;
		this.popupWrap = this.popup.querySelector('.js-popup-wrap');
		this.triggers = document.querySelectorAll(triggerSelector);
		this.isPopupByTime = isPopupByTime;
		this.isLetterPopup = isLetterPopup;
		this.popupPhoto = this.popup.querySelector('.js-popup-photo');
		this.wrapAnimatingPropery = this.popup.getAttribute('data-popup-wrap-propery')
			? this.popup.getAttribute('data-popup-wrap-propery') ||
			  this.popup.removeAttribute('data-popup-wrap-propery')
			: 'translateY';
		this.isOpened = false;
		this.timeout = null;
		this.delay = 15000;
		this.modes = {
			open: 'is-opened',
		};
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
					opacity: 1,
					[this.wrapAnimatingPropery]: 0,
					duration: 0.3,
					ease: 'linear',
				});
			},
		});

		this.popup.classList.add(this.modes.open);

		if (this.isPopupByTime) {
			clearTimeout(this.timeout);
		}
	}

	closePopup() {
		scrollLock.enablePageScroll(this.popupWrap);

		gsap.to(this.popupWrap, {
			delay: 0.1,
			[this.wrapAnimatingPropery]: '100%',
			duration: 0.3,
			opacity: 0,
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

		this.popup.classList.remove(this.modes.open);
	}

	setDelayedOpening() {
		if (this.isPopupByTime) {
			this.timeout = setTimeout(() => {
				this.openPopup();
			}, this.delay);
		}
	}

	setListenerForOpening() {
		if (this.triggers.length) {
			this.triggers.forEach((button) => {
				button.addEventListener('click', (event) => {
					if (this.isLetterPopup) {
						const triggerImgSrc = event.currentTarget.getAttribute('data-popup-letter-src');
						this.popupPhoto.setAttribute('src', triggerImgSrc);
					}

					if (event.target.tagName.toLowerCase() === 'a') {
						event.preventDefault();
					}

					if (this.popup.classList.contains(this.modes.open)) {
						this.closePopup();
					} else {
						this.openPopup();
					}
				});
			});
		}
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
		this.setDelayedOpening();
	}
}

export default Popup;
