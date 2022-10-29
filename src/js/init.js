'use strict';

import Header from './modules/header';
import Sliders from './sliders/sliders';
import PhoneMask from './classes/phoneMask';
import Tabs from './classes/tabs';
import Popup from './classes/popup';
import RequirementsCards from './modules/requirements';
import Defaults from './classes/defaults';
import More from './classes/more';

class AppClass {
	constructor() {}

	init() {
		Header.init();
		Sliders();
		RequirementsCards.init();
		Defaults.init();

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

		console.log('App has been initialized');
	}
}

export default AppClass;
