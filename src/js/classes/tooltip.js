import tippy from 'tippy.js';

class Tooltip {
	constructor(tooltip) {
		this.tooltip = tooltip;
		this.tooltipWrap = this.tooltip.closest('.js-tooltip-wrap');
		this.contentId = this.tooltip.getAttribute('data-tooltip-template');
		this.content = this.contentId
			? document.querySelector(this.contentId).innerHTML
			: this.tooltipWrap.querySelector('.js-tooltip-content');
		this.defaultSettings = {
			arrow: false,
			trigger: 'click',
			touch: true,
			placement: 'top',
			interactive: true,
			maxWidth: 'none',
			offset: [0, 10],
		};
		this.modes = {
			open: 'is-opened',
		};
		this.settings = {};
		this.instance = null;
		this.responsive = null;
		this.isInit = false;
	}

	setTooltipSettings() {
		for (const key in this.defaultSettings) {
			if (Object.hasOwnProperty.call(this.defaultSettings, key)) {
				const prop = this.defaultSettings[key];

				this.settings[key] = this.tooltip.getAttribute(`data-tooltip-${key}`) || prop;
				this.tooltip.getAttribute(`data-tooltip-${key}`) && this.tooltip.removeAttribute(`data-tooltip-${key}`);
			}
		}
	}

	setupTooltip() {
		this.content.classList.remove('invisible-container');
		this.instance = tippy(
			this.tooltip,
			Object.assign(
				{
					content: this.content,
					allowHTML: this.contentId ? true : false,
					onShow: () => {
						this.tooltipWrap.classList.add(this.modes.open);
					},
					onHide: () => {
						this.tooltipWrap.classList.remove(this.modes.open);
					},
				},
				this.settings,
			),
		);
	}

	handleResize(event) {
		if (event.target && event.target.innerWidth <= this.responsiveWidth) {
			this.setListener();
		} else {
			this.removeResponsiveListener();
		}
	}

	setListener() {
		this.tooltip.addEventListener('click', (e) => e.preventDefault());
	}

	setResponsiveListener() {
		if (window.innerWidth > this.responsive) {
			this.setTooltipSettings();
			this.setupTooltip();
			this.setListener();
			this.isInit = true;
		} else {
			window.addEventListener('resize', this.handleResize.bind(this));
		}
	}

	removeResponsiveListener() {
		window.removeEventListener('resize', this.handleResize.bind(this));
	}

	setup() {
		const responsive = parseInt(this.tooltip.getAttribute('data-responsive'));
		this.responsive = responsive;

		if (responsive && !this.isInit) {
			this.setResponsiveListener();
		} else {
			this.setTooltipSettings();
			this.setupTooltip();
			this.setListener();
			this.isInit = true;
		}
	}

	init() {
		this.setup();

		return this;
	}
}

export default Tooltip;
