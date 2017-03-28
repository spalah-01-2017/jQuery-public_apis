## Домашнее задание

### Теория

[Небольшой курс по jQuery](https://www.codeschool.com/courses/try-jquery)

[Протокол JSONP](https://learn.javascript.ru/ajax-jsonp) Попробовать реализовать запрос с использованием JSONP можно взяв ссылку [отсюда](http://www.jsontest.com/#code)

[Метод fetch: замена XMLHttpRequest](https://learn.javascript.ru/fetch)



### Практика


#### (1) ⭐ Используя сторонние API и заготовку в папке [task](./task), реализуйте следующее, используя возможности jQuery по-максимому.

##### Описание

- Сделайте AJAX запрос с введенным городом и отобразите релевантные ссылки с Википедии;
- Отобразите изображение, полученное от [Google Streetview](https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76), полученное на базе запроса пользователя (город и улица);

##### Требования

При сабмите формы:

- Добавьте к body изображение с классом `.bgimg` с сгенерированным атрибутом src, указывающим на сервис [google streetview](https://developers.google.com/maps/documentation/streetview/intro#url_parameters) с перерданным параметром `location` (в документации об этом не сказано, но он может принимать значения города и улицы через запятую: `location=sumska,kharkiv`);

- При следующих сабмитах обновляйте `src` атрибут изображения, если `<img>` элемент уже существует;

- Делайте `GET` запрос с `dataType` `jsonp` на сервис Википедии с данными, взятыми из поля city, чтобы загрузить ссылки с информацией о введенном городе (`http://en.wikipedia.org/w/api.php?action=opensearch&search=НАЗВАНИЕ_ГОРОДА&format=json&callback=wikiCallback`);

- В полученном ответе найдите необходимые данные и добавьте их в элемент `#wikiLinksList` (каждый элемент должен быть `<li>` элементом с ссылкой `<a>`, содержащей адрес на статью Википедии);

- Используйте `.then()` и `.fail()` методы для обработки успешных и неудачных запросов;

- В задании должны быть использованы методы `$.getJSON()` и `$.ajax()`

