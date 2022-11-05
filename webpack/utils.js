const path = require('path');
const glob = require('glob');
const paths = require('./paths');

const capitalizeFirstLetter = (string) => {
	return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const capitilizeWords = (string) => {
	return string
		.split(' ')
		.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
		.join(' ');
};

const getProjectName = () => {
	const packageName = require('../package.json').name.replace(/-|_/gm, ' ').toLowerCase().trim();
	return capitilizeWords(packageName);
};

const generateWebpackEntries = () => {
	return glob.sync(`${paths.src.pugPages}/**/*.pug`).reduce((acc, filePath) => {
		const entryName = path.parse(filePath).name;
		acc[entryName] = filePath;
		return acc;
	}, {});
};

const getPugPages = () => {
	return glob.sync(`${paths.src.pugPages}/**/*.pug`).map((filePath) => {
		return path.parse(filePath).base;
	});
};

const generatingPageList = () => {
	const pugFiles = getPugPages();
	let list = '<ol>';

	pugFiles.forEach((pageName) => {
		if (!pageName.includes('index')) {
			const name = pageName
				.replace(/(-|_|.pug|page)/gm, ' ')
				.toLowerCase()
				.trim();
			const href = `/${pageName.replace('.pug', '.html')}`;
			// const hrefForDeploy = `/${pageName.replace('.pug', '.html')}`;

			list += `<li><a href=${href} target="_blank">${capitilizeWords(name)} Page</a></li>`;
		}
	});

	list += '</ol>';

	return list;
};

const setPageList = (content) => {
	const projectName = getProjectName();
	const pageList = generatingPageList();
	let newContent = content.replace(/<style><\/style>/g, stylesForMainPages());

	newContent = newContent.replace(/<div id="page-list"><\/div>/g, pageList);
	newContent = newContent.replaceAll('#project-name', projectName);

	return newContent;
};

const stylesForMainPages = () => {
	const styles = `
	<style>body.index-page-list{background-color:#212122;color:#fff;min-height:100vh;font-family:Arial;padding-top:40px}.box{padding:20px 40px;background-color:#000}.head-top{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.head-title{font-size:24px;line-height:1.4em}.head-title span{color:#7fffd4}.git-link{color:rgba(255,255,255,.2) !important}.git-link{font-size:12px;line-height:1.2em;display:block;margin:5px 0;-webkit-transition:ease .2s;-o-transition:ease .2s;transition:ease .2s}.git-link:hover{color:#96fd8b !important}a{color:#fff;position:relative;display:inline-block;text-decoration:none}a::before{content:"";display:block;position:absolute;left:0;bottom:0;height:1px;width:100%;background-color:#fff;-webkit-transition:ease .2s;-o-transition:ease .2s;transition:ease .2s;-webkit-transform:scale(0, 1);-ms-transform:scale(0, 1);-o-transform:scale(0, 1);transform:scale(0, 1)}a:hover::before{-webkit-transform:scale(1, 1);-ms-transform:scale(1, 1);-o-transform:scale(1, 1);transform:scale(1, 1)}a:visited{color:#96fd8b}a:visited::before{background-color:#96fd8b}ol{-webkit-column-count:3;-moz-column-count:3;column-count:3;counter-reset:heading;padding:0;margin-top:16px;margin-bottom:25px;margin-left:-25px}li{font-size:16px;margin-bottom:8px;position:relative;padding-left:30px;list-style:none;page-break-inside:avoid;counter-increment:heading}li::before{position:absolute;left:0;top:0;content:counter(heading) ".";font-size:14px;color:rgba(241,241,241,.5);display:inline-block;width:25px;margin-right:5px;text-align:right}a:hover{text-decoration:none}@media only screen and (max-width: 1023px){ol{-webkit-column-count:3;-moz-column-count:3;column-count:3}}@media only screen and (max-width: 767px){ol{-webkit-column-count:2;-moz-column-count:2;column-count:2}}@media only screen and (max-width: 576px){ol{-webkit-column-count:1;-moz-column-count:1;column-count:1}.head-title{-webkit-box-ordinal-group:3;-ms-flex-order:2;-webkit-order:2;order:2}.git-link{-webkit-box-ordinal-group:2;-ms-flex-order:1;-webkit-order:1;order:1;margin-bottom:15px;font-size:10px}}</style>`.trim();
	return styles;
};

module.exports = {
	capitalizeFirstLetter,
	capitilizeWords,
	getProjectName,
	generateWebpackEntries,
	getPugPages,
	generatingPageList,
	setPageList,
};
