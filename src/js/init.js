'use strict';

import Header from './modules/header';
import Sliders from './sliders/sliders';
import PhoneMask from './classes/phoneMask';
import Tabs from './classes/tabs';
import Popup from './classes/popup';

class AppClass {
	constructor() {}

	init() {
		Header.init();
		Sliders();

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

		console.log('App has been initialized');
	}
}

export default AppClass;
