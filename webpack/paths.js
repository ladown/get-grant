const path = require('path');

module.exports = {
	src: {
		default: path.posix.resolve(__dirname, '../src/'),
		scripts: path.posix.resolve(__dirname, '../src/js/'),
		styles: path.posix.resolve(__dirname, '../src/scss/'),
		sprite: path.posix.resolve(__dirname, '../src/icons/sprite.svg'),
		pugPages: path.posix.resolve(__dirname, '../src/pug/pages/'),
		fonts: path.posix.resolve(__dirname, '../src/fonts/'),
		icons: path.posix.resolve(__dirname, '../src/icons/'),
		imgs: path.posix.resolve(__dirname, '../src/img/'),
		favicon: path.posix.resolve(__dirname, '../src/img/favicons/'),
		static: path.posix.resolve(__dirname, '../src/static/'),
	},
	build: {
		default: path.posix.resolve(__dirname, '../build/'),
		sprite: path.posix.resolve(__dirname, '../build/icons/'),
		fonts: path.posix.resolve(__dirname, '../build/fonts/'),
		imgs: path.posix.resolve(__dirname, '../build/img/'),
		favicon: path.posix.resolve(__dirname, '../build/img/favicons/'),
		static: path.posix.resolve(__dirname, '../build/'),
	},
};
