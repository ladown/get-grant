'use strict';

window.addEventListener('DOMContentLoaded', () => {
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
