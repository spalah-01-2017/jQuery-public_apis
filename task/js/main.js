var CallbackRegistry = {}; // реестр

// при успехе вызовет onSuccess, при ошибке onError
function scriptRequest(url, onSuccess, onError) {

    var scriptOk = false; // флаг, что вызов прошел успешно

    // сгенерировать имя JSONP-функции для запроса
    var callbackName = 'cb' + String(Math.random()).slice(-6);

    // укажем это имя в URL запроса
    url += ~url.indexOf('?') ? '&' : '?';
    url += 'callback=CallbackRegistry.' + callbackName;

    // ..и создадим саму функцию в реестре
    CallbackRegistry[callbackName] = function(data) {
        scriptOk = true; // обработчик вызвался, указать что всё ок
        delete CallbackRegistry[callbackName]; // можно очистить реестр
        onSuccess(data, url); // и вызвать onSuccess
    };

    // эта функция сработает при любом результате запроса
    // важно: при успешном результате - всегда после JSONP-обработчика
    function checkCallback() {
        if (scriptOk) return; // сработал обработчик?
        delete CallbackRegistry[callbackName];
        onError(url); // нет - вызвать onError
    }

    var script = document.createElement('script');

    // в старых IE поддерживается только событие, а не onload/onerror
    // в теории 'readyState=loaded' означает "скрипт загрузился",
    // а 'readyState=complete' -- "скрипт выполнился", но иногда
    // почему-то случается только одно из них, поэтому проверяем оба
    script.onreadystatechange = function() {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            this.onreadystatechange = null;
            setTimeout(checkCallback, 0); // Вызвать checkCallback - после скрипта
        }
    }

    // события script.onload/onerror срабатывают всегда после выполнения скрипта
    script.onload = script.onerror = checkCallback;
    script.src = url;

    document.body.appendChild(script);
}
//////////////////////////////////////////////////////////////////////////////////////////

function then(data, url) {
    // alert( "Загружен пользователь " + data.name );
    $('#wikiLinksList').html('');
    data[3].forEach(function(el){
      $('<li><a href="'+ el +'">'+ el +'</a></li>').appendTo('#wikiLinksList');
    });

    $("script[src='"+ url +"']").remove();
}

function fail(url) {
    alert( 'Ошибка при запросе ' + url );
}
//////////////////////////////////////////////////////////////////////////////////////////



// Внимание! Ответы могут приходить в любой последовательности!
$('#form').on('submit', function(event){
    event.preventDefault();
    var street = $('#street').val();
    var city = $('#city').val();
    var url = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+ city +"&format=json&callback=wikiCallback";
    scriptRequest(url, then, fail);

    $('.bgimg').remove();
    var imgUrl = "https://maps.googleapis.com/maps/api/streetview?size=900x900&location="+street+","+city+"&fov=90&heading=235&pitch=10&key=AIzaSyDjtLw5yo7aKUeb5ogH-ZqOj1ejSeIxMJc";
    $('<img>').attr({
      alt: "",
      class: "bgimg",
      src: imgUrl
    }).appendTo('body');
});

