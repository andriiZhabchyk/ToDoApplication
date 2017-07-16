'use strict';

$(document).ready(
    $('.btn').click(function () {
        setValue();
        removeElem();
        saveData();
        testWebSocket();
    })
);

//запись данных в массив
function writeToArr() {
    var toDoArrItems = localStorage.getItem('toDo');

    if (toDoArrItems !== null) {
        toDoArrItems = JSON.parse(toDoArrItems);
        toDoArr = toDoArrItems;
        showToDo();
    } else {return};
}

//показ элементов страницы из массива
function showToDo() {
    for (var i = 0; i < toDoArr.length; i++) {
        createToDoDiv(toDoArr[i].value, toDoArr[i].id, toDoArr[i].color);
    }
}

//функция конструктор для объекта задачи
function ToDoCell(value, id) {
    this.value = value;
    this.id = id;
    this.type = true;
}

//прототип содержащий метод .color
ToDoCell.prototype.color = function () {
    var color = Math.random();
    color *= 10;
    color = Math.round(color);
    this.color = colors[color];
};

//установка значения для і-го объекта
function setValue() {
    var index = toDoArr.length;
    var toDoArrValue = $('.toDoText').val();
    $('.toDoText').val('');

    //проверка на ввод пустой строчки
    if (!toDoArrValue) {
        return;
    }

    var toDoElem = new ToDoCell(toDoArrValue, index, true);
    console.log(toDoElem);
    toDoArr[index] = toDoElem;
    toDoElem.color();
    writeToLocal();

    createToDoDiv(toDoElem.value, index, toDoElem.color);
}

//запись данных в массив
function writeToLocal() {
    localStorage.setItem('toDo', JSON.stringify(toDoArr));
}

//создание элемента (div) для карточки
function createToDoDiv(value, id, color) {
    $('p').addClass('toDoItem');

    var toDoItemDiv = document.createElement('p');
    toDoItemDiv.classList.add('toDoItem');
    toDoItemDiv.setAttribute('data-id', id);
    toDoItemDiv.style.background = color;
    toDoItemDiv.onclick = isDoneToDo;
    toDoItemDiv.innerHTML = value;

    var iconDelete = document.createElement('i');
    iconDelete.classList.add('fa', 'fa-trash-o');
    iconDelete.setAttribute('aria-hidden', 'true');
    iconDelete.onclick = removeElem;
    $(toDoItemDiv).append(iconDelete);

    //не доделанное
   /* var wrap = document.createElement('div');
     var tag = $('.checkTag');

     for (var i = 0; i < tag.length; i++){
     $(wrap).append(tag[i]);
     console.log(wrap);
     } */

     $('#toDoList').append(toDoItemDiv);

    hideTags(); //объявление функции удаления тегов
}

//удалление тегов
function hideTags() {
    $('.tag').remove();
}

//добавление класса декорированого (зачеркнутого) текста
function isDoneToDo() {
    var target = $(event.currentTarget);

    if (target.hasClass('decoration')){
        target.removeClass('decoration');
    } else {target.addClass('decoration');}
}

//удаление і-го элемента
function removeElem() {
    var target = event.currentTarget;

    if (target.className === 'btn'){
        return;
    }

    if (confirm('Do you want delete current note?') === true) {
        var parentIndex = target.parentNode;
        var index = parentIndex.getAttribute('data-id');
        fadeToDo();
        findRemoveElem(index);

        event.stopImmediatePropagation();
    } else {
        event.stopImmediatePropagation();
    }
}

//затухание элемента родителя
function fadeToDo() {
    var target = $(event.currentTarget);
    target.parent().fadeOut(500);
}

//нахождение элемента по индексу и его удаление
function findRemoveElem(index) {
    if (toDoArr.length>1){
        toDoArr.splice(index, 1);
    } else {toDoArr = []}

    changeId();
}

//изменение ид элементов массива
function changeId() {
    for (var i = 0; i < toDoArr.length; i++){
        toDoArr[i].id = i;
    }
    writeToLocal();
}
