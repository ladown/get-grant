# Структура папок и файлов

```text
Ladown template
├── src
│   ├── fonts
│   ├── icons
│   │   ├── sprite.svg
│   │   └── sprite.svg.json
│   ├── img
│   │	  └── favicons
│   │       └── favicon.svg
│   ├── js
│   │   ├── clasess
│   │   ├── modules
│   │   ├── sliders
│   │   ├── app.js
│   │   └── utils.js
│   ├── pug
│   │   ├── layouts
│   │   │   ├── default.pug
│   │   │   ├── footer.pug
│   │   │   ├── header.pug
│   │   │   └── modals.pug
│   │   ├── mixins
│   │   │   ├── bemto
│   │   │   ├── mixin-loader.pug
│   │   │   ├── breadcrumbs.pug
│   │   │   ├── button.pug
│   │   │   └── icon.pug
│   │   └── pages
│   │       ├── main.pug
│   │       └── index.pug
│   ├── scss
│   │    ├── defaults
│   │    │   ├── animation.scss
│   │    │   ├── common.scss
│   │    │   ├── content.scss
│   │    │   ├── data.scss
│   │    │   ├── fonts.scss
│   │    │   ├── functions.scss
│   │    │   ├── index.scss
│   │    │   ├── mixins.scss
│   │    │   ├── normalize.scss
│   │    │   ├── pages.scss
│   │    │   └── variables.scss
│   │    ├── layouts
│   │    ├── library-mixins
│   │    │   ├── breakpoints-mixin.scss
│   │    │   └── fonts-mixins.scss
│   │    ├── templates
│   │    ├── app.scss
│   │    └── vendors.scss
│   └──  static
│        ├── .htaccess
│        └── robots.txt
```

## `src`

В папке `src` хранятся исходные файлы проекта.

## `src/fonts/`

Папка `src/fonts/` предназначена для хранения шрифтов.
При сборке файлы из данной папки попадают в `build/fonts/`.

## `src/icons/`

Папка `src/icons/` предназначена для хранения svg иконок.
В папке присуствуют два системных файла, которые не следует изменять никоем образом - sprite.svg и sprite.svg.json.
При сборке файлы из данной папки попадают в `build/icons/`.

## `src/img/`

Папка `img` предназначена для хранения изображений.
При сборке файлы из данной папки попадают в `build/img/`.

## `src/js/`

Папка `src/js/` предназначена для хранения скриптов.

## `src/js/classes/`

Папка `src/js/classes/` предназначена для хранения js классов.

## `src/js/modules/`

Папка `src/js/modules/` предназначена для хранения js модулей.

## `src/js/sliders/`

Папка `src/js/sliders/` предназначена для хранения js файлов, которые связаны с слайдерами.

## `src/js/app.js`

Файл `src/js/app.js` предназначен для хранения основной логики сайта.
При сборке данный файл попадает в `build/js/`.

## `src/js/utils.js`

Файл `src/js/utils.js` предназначен общих и часто используемых функций.

## `src/pug/`

Папка `src/pug/` предназначена для хранения шаблонов.

## `src/pug/layouts/`

Папка `src/pug/layouts/` предназначена для хранения частей pug шаблонов (header, footer, ...).

## `pug/layouts/default.pug`

В файле `pug/layouts/default.pug` хранится базовый шаблон страниц сайта..

## `src/pug/mixins/`

Папка `src/pug/mixins/` предназначена для хранения Pug-миксинов.

## `src/pug/mixins/breadcrumbs.pug`

В файле `src/pug/mixins/breadcrumbs.pug` хранится Pug-миксин для подключения навигации.

## `src/pug/mixins/button.pug`

В файле `src/pug/mixins/button.pug` хранится Pug-миксин для подключения кнопок.

## `src/pug/mixins/icon.pug`

В файле `src/pug/mixins/icon.pug` хранится Pug-миксин для подключения SVG-иконок.

## `src/pug/mixins/mixin-loader.pug`

В файле `src/pug/mixins/mixin-loader.pug` подключаются все миксины.

## `src/pug/pages/`

Папка `src/pug/pages/` предназначена для хранения страниц сайта.

## `pug/pages/index.pug`

В файле `pug/pages/index.pug` хранится разметка главной страницы со списком других.

## `pug/pages/main.pug`

`pug/pages/main.pug` - пример страницы сайта.

## `src/sass/`

Папка `src/sass/` предназначена для хранения стилей.

## `src/sass/defaults`

Папка `src/sass/defaults` предназначена для хранения базовых SASS стилей.

## `src/sass/defaults/animation.scss`

Файл `src/sass/defaults/animation.scss` предназначен для анимаций.

## `src/sass/defaults/common.scss`

Файл `src/sass/defaults/common.scss` предназначен для хранения базовых стилей.

## `src/sass/defaults/content.scss`

Файл `src/sass/defaults/content.scss` предназначен для хранения типографики.

## `src/sass/defaults/data.scss`

Файл `src/sass/defaults/data.scss` предназначен для полезных функций и миксинов в scss.

## `src/sass/defaults/fonts.scss`

Файл `src/sass/defaults/fonts.scss` предназначен для хранения стилей шрифтов.

## `src/sass/defaults/functions.scss`

Файл `src/sass/defaults/functions.scss` предназначен для scss функций.

## `src/sass/defaults/index.scss`

Файл `src/sass/defaults/index.scss` предназначен для подключения всех стилей в нужном порядке.

## `src/sass/defaults/mixins.scss`

Файл `src/sass/defaults/mixins.scss` предназначена для хранения SASS-миксинов и функций.

## `src/sass/defaults/normalize.scss`

Файл `src/sass/defaults/normalize.scss` предназначен для нормализации стилей.

## `src/sass/defaults/pages.scss`

Файл `src/sass/defaults/pages.scss` предназначен для указания стилей для определенных страниц.

## `src/sass/defaults/variables.scss`

Файл `src/sass/defaults/variables.scss` предназначен для хранения переменных.

## `src/sass/layouts`

Папка `src/sass/layouts` предназначена для хранения БЭМ блоков.

## `src/sass/library-mixins`

Папка `src/sass/library` предназначена для хранения полезных функций для scss - breakpoints and fonts mixins.

## `src/sass/templates`

Папка `src/sass/templates` предназначена для хранения однотипных шаблонов.

## `src/sass/defaults/app.scss`

Файл `src/sass/defaults/app.scss` создан для подключения всех возможных стилей в нужном порядке .

## `src/sass/defaults/vendor.scss`

Файл `src/sass/defaults/vendor.scss` предназначен для хранения стилей плагинов из node_modules.

## `src/static/`

Папка `src/static/` предназначена для хранения статичных файлов (.htaccess, robots.txt, ...).
При сборке файлы из данной папки попадают в `build/`.
