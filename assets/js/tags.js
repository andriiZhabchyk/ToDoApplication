'use strict';

//создание тегов с полученных данных с запроса
function createTag(dataTags) {
    $('.tag').remove();

    for (var i = 0; i < dataTags.length; i++) {
        console.log('hello');
        var tag = document.createElement('span');
        tag.classList.add('tag');
        tag.onclick = addTag;
        tag.innerHTML = dataTags[i] + ' ';

        var tagIcon = document.createElement('i');
        tagIcon.classList.add('fa', 'fa-tag');
        tagIcon.setAttribute('aria-hidden', 'true');

        tag.appendChild(tagIcon);

        $('.tagWrap').append(tag);
    }
}

//добавление класса выбраного тега
function addTag(event) {
    var target = $(event.currentTarget);

    if (target.hasClass('checkTag')){
        target.removeClass('checkTag');
    } else {target.addClass('checkTag')}
}


