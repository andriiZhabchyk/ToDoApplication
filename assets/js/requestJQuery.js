'use strict';

//получение данный из сервера
function getData() {
    $.ajax({
        type: 'GET',
        url: 'assets/json/data.json'
    }).done(function (data) {
        createTag(data);
        console.log('Success connection!');
    }).fail(function () {
        console.log('Wrong request!');
    });
}

//создание записи списка задач
function saveData() {
    $.ajax({
        type: 'POST',
        url: 'assets/json/data.json',
        data: toDoArr
    }).done(function () {
        console.log('Data save!');
    }).fail(function () {
        console.log('Wrong request!');
    });
}
