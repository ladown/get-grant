'use strict';

import Header from './modules/header';
import Sliders from './sliders/sliders';
import PhoneMask from './classes/phoneMask';
import Tabs from './classes/tabs';
import Popup from './classes/popup';
import RequirementsCards from './modules/requirements';
import Defaults from './classes/defaults';
import More from './classes/more';
import Work from './classes/work';
import Steps from './classes/steps';
import VideoPopup from './classes/videoPopup';
import Reveal from './modules/reveal';
import Tooltip from './classes/tooltip';
import Accordion from './classes/accordion';

class AppClass {
	constructor() {}

	init() {
		Header.init();
		RequirementsCards.init();
		Defaults.init();
		Work.init();
		Steps.init();

		Sliders();
		Reveal();

		const phoneInputs = document.querySelectorAll('input[type="tel"]');

		if (phoneInputs.length) {
			phoneInputs.forEach((input) => {
				new PhoneMask(input).init();
			});
		}

		const tabs = document.querySelectorAll('.js-tabs');

		if (tabs.length) {
			tabs.forEach((tab) => {
				new Tabs(tab).init();
			});
		}

		const popups = document.querySelectorAll('.js-popup');

		if (popups.length) {
			popups.forEach((popup) => {
				new Popup(popup, '.js-popup-callback').init();
			});
		}

		const moreItems = document.querySelectorAll('.js-more');

		if (moreItems.length) {
			moreItems.forEach((item) => {
				new More(item).init();
			});
		}

		const articlePopup = document.querySelector('.js-popup-by-time');

		if (articlePopup) {
			new Popup(articlePopup, false, true).init();
		}

		const letterPopup = document.querySelector('.js-popup-letter');

		if (letterPopup) {
			new Popup(letterPopup, '.js-popup-letter-trigger', false, true).init();
		}

		const videoPopups = document.querySelector('.js-video-popup');

		if (videoPopups) {
			new VideoPopup().init();
		}

		const callbackNew = document.querySelector('.js-callback-new-popup');
		if (callbackNew) {
			new Popup(callbackNew, '.js-callback-new-popup-trigger').init();
		}

		const tooltips = document.querySelectorAll('.js-tooltip');

		if (tooltips.length) {
			tooltips.forEach((el) => {
				new Tooltip(el).init();
			});
		}

		const accordions = document.querySelectorAll('.js-accordion-wrap');

		if (accordions.length) {
			accordions.forEach((el) => {
				new Accordion(el).init();
			});
		}

		console.log('App has been initialized');
	}
}

export default AppClass;
