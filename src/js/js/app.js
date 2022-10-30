window.addEventListener('DOMContentLoaded', () => {
	class DefaultsClass {
		constructor() {}

		backButton() {
			const backButtons = document.querySelectorAll('.js-back-button');

			if (backButtons.length) {
				backButtons.forEach((button) => {
					button.addEventListener('click', (event) => {
						if (event.target.tagName.toLowerCase() === 'a') {
							event.preventDefault();
						}

						history.back();
					});
				});
			}
		}

		articleContentButtons() {
			const buttons = document.querySelectorAll('.js-article-contents');

			if (buttons.length) {
				buttons.forEach((button) => {
					button.addEventListener('click', (event) => {
						event.target.tagName.toLowerCase() === 'a' ? event.preventDefault() : null;

						const blockToScroll = document.querySelector(event.target.getAttribute('data-href'));
						const headerHeight = document.querySelector('.js-header').offsetHeight;
						const scrolledHeight = this.getCoords(blockToScroll).top - headerHeight - 16;

						window.scrollTo({ top: scrolledHeight });
					});
				});
			}
		}

		getCoords = (element) => {
			let box = element.getBoundingClientRect();

			return {
				top: box.top + window.pageYOffset,
				right: box.right + window.pageXOffset,
				bottom: box.bottom + window.pageYOffset,
				left: box.left + window.pageXOffset,
				height: element.offsetHeight,
				width: element.offsetWidth,
			};
		};

		init() {
			this.backButton();
			this.articleContentButtons();
		}
	}

	const Defaults = new DefaultsClass();
	Defaults.init();

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

			if (
				scrollTop >= this.variables.pageScrollOffset &&
				!this.nodes.block.classList.contains(this.mods.sticked)
			) {
				this.nodes.block.classList.add(this.mods.sticked);
			}

			if (
				scrollTop <= this.variables.pageScrollOffset &&
				this.nodes.block.classList.contains(this.mods.sticked)
			) {
				this.nodes.block.classList.remove(this.mods.sticked);
			}
		},

		changeStateOnResize() {
			window.addEventListener('resize', (event) => {
				if (event.target && event.target.innerWidth >= this.variables.widthToCloseMenu) {
					scrollLock.enablePageScroll();

					this.nodes.block.classList.remove(this.mods.opened);
					this.nodes.menu.removeAttribute('style');
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

	Header.init();

	class PhoneMask {
		constructor(inputBlock) {
			this.input = inputBlock;
		}

		getInputNumbersValue(input) {
			return input.value.replace(/\D/g, '');
		}

		onPhoneKeyDown({ target, code }) {
			const inputValue = this.getInputNumbersValue(target);

			if (code.toLowerCase() === 'backspace' && inputValue.length === 1) {
				target.value = '';
			}
		}

		onPhoneInput({ target, data }) {
			const input = target;
			let inputNumbersValue = this.getInputNumbersValue(input);
			const selectionStart = input.selectionStart;
			let formattedInputValue = '';

			if (!inputNumbersValue) {
				return (input.value = '');
			}

			if (input.value.length !== selectionStart) {
				if (data && /\D/g.test(data)) {
					input.value = inputNumbersValue;
				}
				return;
			}

			if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
				if (inputNumbersValue[0] === '9') {
					inputNumbersValue = `7${inputNumbersValue}`;
				}

				var firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';

				formattedInputValue = input.value = `${firstSymbols} `;

				if (inputNumbersValue.length > 1) {
					formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
				}

				if (inputNumbersValue.length >= 5) {
					formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
				}

				if (inputNumbersValue.length >= 8) {
					formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
				}

				if (inputNumbersValue.length >= 10) {
					formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
				}
			} else {
				formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`;
			}

			input.value = formattedInputValue;
		}

		onPhonePaste({ target, clipboardData }) {
			const input = target;
			const inputNumbersValue = this.getInputNumbersValue(input);
			const pasted = clipboardData || window.clipboardData;

			if (pasted) {
				const pastedText = pasted.getData('Text');

				if (/\D/g.test(pastedText)) {
					input.value = inputNumbersValue;
					return;
				}
			}
		}

		setListener() {
			this.input.addEventListener('keydown', this.onPhoneKeyDown.bind(this));
			this.input.addEventListener('input', this.onPhoneInput.bind(this));
			this.input.addEventListener('paste', this.onPhonePaste.bind(this));
		}

		init() {
			this.setListener();
		}
	}

	const phoneInputs = document.querySelectorAll('input[type="tel"]');

	if (phoneInputs.length) {
		phoneInputs.forEach((input) => {
			new PhoneMask(input).init();
		});
	}
});
