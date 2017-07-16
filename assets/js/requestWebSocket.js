'use strict';

var wsUri = "ws://echo.websocket.org";
var webSocket;

function testWebSocket() {
    webSocket = new WebSocket(wsUri);
    webSocket.onopen = function (evt) {
        onOpen(evt)
    };
    webSocket.onclose = function (evt) {
        onClose(evt)
    };
    webSocket.onmessage = function (evt) {
        onMessage(evt)
    };
    webSocket.onerror = function (evt) {
        onError(evt)
    };
}

function onOpen() {
    writeToScreen("CONNECTED");
    doSend();
}

function onClose() {
    writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
    writeToScreen('RESPONSE: ' + evt.data);
    webSocket.close();
}

function onError(evt) {
    writeToScreen('ERROR: ' + evt.data);
}

function doSend() {
    for (var i = 0; i < toDoArr.length; i++){
        writeToScreen("SENT (COLOR): " + toDoArr[toDoArr.length - 1].color);
        webSocket.send(toDoArr[toDoArr.length - 1].color);
    }
}

function writeToScreen(message) {
    console.log(message);
}



