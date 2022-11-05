'use strict';

import scrollLock from 'scroll-lock';
import { gsap } from 'gsap';

class VideoPopup {
	constructor() {
		this.popup = document.querySelector('.js-video-popup');
		this.popupWrap = this.popup.querySelector('.js-popup-wrap');
		this.triggers = document.querySelectorAll('.js-video-popup-trigger');
		this.popupVideo = this.popup.querySelector('.js-popup-video');
		this.videoSrc = null;
		this.modes = {
			open: 'is-opened',
		};
		this.player = null;
		this.videoId = this.triggers.length && this.triggers[0].getAttribute('data-video-src');
	}

	uploadScript() {
		// eslint-disable-next-line
		if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
			var tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubePlayerAPIReady = () => {
				this.setInstance();
			};
		}
	}

	setInstance() {
		// eslint-disable-next-line
		this.player = new YT.Player(this.popupVideo, {
			height: '100%',
			width: '100%',
			videoId: this.videoId,
		});
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
					translateY: 0,
					duration: 0.3,
					ease: 'linear',
				});
			},
		});

		this.popup.classList.add(this.modes.open);
	}

	closePopup() {
		if (this.player.getPlayerState() !== 2) {
			this.player.pauseVideo();
		}
		scrollLock.enablePageScroll(this.popupWrap);

		gsap.to(this.popupWrap, {
			delay: 0.1,
			translateY: '100%',
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

	setListenerForOpening() {
		this.triggers.forEach((button) => {
			button.addEventListener('click', (event) => {
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
		if (this.popup && this.triggers.length) {
			this.uploadScript();
			this.setListenerForOpening();
			this.setListenerForClosing();
		}
	}
}

export default VideoPopup;
