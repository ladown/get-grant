'use strict';

import ScrollReveal from 'scrollreveal';

export default () => {
	const Reveal = ScrollReveal({
		duration: 600,
		delay: 150,
		interval: 100,
		viewFactor: 0.5,
		mobile: false,
		easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
		viewOffset: {
			top: document.querySelector('.js-header').offsetHeight,
		},
	});

	if (document.querySelector('.js-reveal-slideUp')) {
		Reveal.reveal('.js-reveal-slideUp', {
			distance: '50%',
			origin: 'bottom',
			opacity: 0,
		});
	}

	if (document.querySelector('.js-reveal-fadeIn')) {
		Reveal.reveal('.js-reveal-fadeIn', {
			opacity: 0,
		});
	}

	if (document.querySelector('.js-reveal-slideLeft')) {
		Reveal.reveal('.js-reveal-slideLeft', {
			distance: '50%',
			origin: 'rigth',
			opacity: 0,
		});
	}

	if (document.querySelector('.js-reveal-slideRight')) {
		Reveal.reveal('.js-reveal-slideRight', {
			distance: '50%',
			origin: 'left',
			opacity: 0,
		});
	}

	if (document.querySelector('.js-reveal-scale')) {
		Reveal.reveal('.js-reveal-scale', {
			scale: 0.5,
			opacity: 0,
		});
	}

	if (document.querySelector('.js-reveal-interval')) {
		Reveal.reveal('.js-reveal-interval', {
			interval: 200,
		});
	}

	if (document.querySelector('.js-reveal-viewFactor')) {
		Reveal.reveal('.js-reveal-viewFactor', {
			viewFactor: 0,
		});
	}
};
