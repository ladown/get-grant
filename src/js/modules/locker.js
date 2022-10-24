'use strict';

const Locker = {
	node: document.getElementsByTagName('html')[0],

	mod: 'js-lock',

	lock() {
		this.node.classList.add(this.mod);

		const offset =
			parseInt(window.getComputedStyle(this.node, null).getPropertyValue('padding-right'), 10) +
			this.getScrollbarWidth() * 1;
		[this.node].forEach((block) => {
			block.style.marginRight = `${offset}px`;
		});
	},

	unlock() {
		this.node.classList.remove(this.mod);
		[this.node].forEach((block) => {
			block.style.marginRight = '';
		});
	},

	getScrollbarWidth() {
		let w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			h = d.getElementsByTagName('html')[0],
			wHeght = w.innerHeight || e.clientHeight || g.clientHeight,
			dHeight = Math.max(
				g.scrollHeight,
				g.offsetHeight,
				g.getBoundingClientRect().height,
				h.clientHeight,
				h.scrollHeight,
				h.offsetHeight,
			);

		if (dHeight <= wHeght) {
			return 0;
		}

		let outer = document.createElement('div');
		let inner = document.createElement('div');
		let widthNoScroll;
		let widthWithScroll;

		outer.style.visibility = 'hidden';
		outer.style.width = '100px';
		document.body.appendChild(outer);
		widthNoScroll = outer.offsetWidth;
		outer.style.overflow = 'scroll';
		inner.style.width = '100%';
		outer.appendChild(inner);
		widthWithScroll = inner.offsetWidth;
		outer.parentNode.removeChild(outer);
		return widthNoScroll - widthWithScroll;
	},
};

export default Locker;
