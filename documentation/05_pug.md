# Работа с шаблонизатором Pug

В сборке используется шаблонизатор [Pug](https://pugjs.org/) (ранее назывался Jade).

А так же набор миксинов для ускоренного написания БЭМ - [bemto](https://github.com/kizu/bemto)

Pug предоставляет множество возможностей, упрощающих работу с шаблонами:

-   Переменные.
-   Циклы.
-   Условия.
-   Фильтры.
-   Наследование шаблонов.
-   Миксины.

## Автоматизация

-   В сборке зарезервирован файл `src/pug/pages/index.pug`, он отображает список всех страниц. При изменении разметки, автоматически создается список всех страниц на главной.

## Файловая структура

Страницы размещаются в `src/pug/pages`, части шаблонов в `src/pug/layouts`, а дополнительные миксины в `src/pug/mixins`:

```text
Ladown template
└── src
    └── pug
        ├── layouts
        │   ├── default.pug
        │   ├── footer.pug
        │   ├── header.pug
        │   └── modals.pug
        ├── mixins
        │   ├── bemto
        │   ├── mixin-loader.pug
        │   ├── breadcrumbs.pug
        │   ├── button.pug
        │   └── icon.pug
        └── pages
            ├── main.pug
            └── index.pug
```

## Базовый шаблон и создание страниц

В качестве базового шаблона используется `src/pug/default.pug`.

Пример наследования и использования шаблона:

```jade
extends ../layouts/default
block append vars
	- title = 'Главная';
block content
	// Содержимое страницы
```

Базовый шаблон определяет блоки (участки кода или место в шаблоне), которые можно изменять и дополнять при наследовании.

### `vars`

Блок `vars` хранит основные настройки шаблона:

-   `title` — заголовок страницы (используется в `<title>` и метатегах).

-   `description` — описание страницы (используется в метатегах).

-   `image` — изображение страницы (используется в метатегах).

-   `html` — настройки тега `<html>`:

    -   `html.attrs` — объект для задания дополнительных атрибутов.
    -   `html.classList` — массив классов.

-   `body` — настройки тега `<body>`:

    -   `body.attrs` — объект для задания дополнительных атрибутов.
    -   `body.classList` — массив классов.

-   `main` — настройки тега `<main>`:

    -   `main.attrs` — объект для задания дополнительных атрибутов.
    -   `main.classList` — массив классов.

-   `meta` — значения метатегов.

-   `icon` — предназначено для favicon.

Пример использования:

```jade
block append vars
	- title = 'Заголовок';
	- description = 'Описание';
	- image = 'http://example.com/images/image.png';
block append vars
	- link.icon16x16 = '/favicon_16x16.png';
	- link.icon32x32 = '/favicon_32x32.png';
```

### `head-start`

Блок `head-start` является альтернативой `prepend meta`.

### `meta`

В блоке `meta` подключаются метатеги.

Пример использования:

```jade
block append meta
	meta(
		name='referrer'
		content='none')
```

### `styles`

В блоке `styles` подключаются стили.

Пример использования:

```jade
block append styles
	link(
		rel='stylesheet'
		href='/css/custom.css')
```

### `head-end`

Блок `head-end` является альтернативой `append links`.

### `body-start`

Блок `body-start` является альтернативой `prepend content`.

### `content`

Блок `content` предназначен для хранения содержимого страницы.

Пример использования:

```jade
block content
	.container
		h1
			| Заголовок страницы
```

### `modals`

В блоке `modals` подключаются модальные окна.

### `scripts`

В блоке `scripts` подключаются скрипты.

Пример использования:

```jade
block append scripts
	script(src='/js/custom.js')
```

### `body-end`

Блок `body-end` является альтернативой `append scripts`.
