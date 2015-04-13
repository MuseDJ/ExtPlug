define(function (require, exports, module) {

  // Adds a bunch of new chat events.
  // "chat:incoming" is fired as soon as a new message is received from the socket.
  //   It gets three arguments: The Message object, a boolean `isSystemMessage`, and
  //   a boolean `isMine` (true if the current user sent the message.)
  // "chat:beforereceive" is fired after some initial processing, but before the message
  // is passed to the plug.dj view layer. This is where you probably want to do your
  // modifications to the Message object.
  // "chat:afterreceive" is fired after the message has been rendered. It gets two arguments:
  //   The Message object, and a jQuery object containing the message DOM element.
  // "chat:send" is fired when the user sends a message. It takes a single argument: A string
  //   with the text content of the message.

  var chatFacade = require('plug/facades/chatFacade'),
    Events = require('plug/core/Events'),
    fnUtils = require('extplug/util/function'),
    meld = require('meld');

  var onChatReceived = function (joinpoint) {
    let [ message, isSystemMessage, isMine ] = joinpoint.args;
    Events.trigger('chat:incoming', message, isSystemMessage, isMine);
    var result = joinpoint.proceed(message, isSystemMessage, isMine);
    var element = $('#chat-messages .cm:last-child');
    Events.trigger('chat:afterreceive', message, element);
    return result;
  };

  var fireBeforeReceive = function (param1, param2) {
    Events.trigger('chat:beforereceive', param1, param2);
  };

  var onChatSend = function (oldChatSend, param1) {
    Events.trigger('chat:send', param1);
    return oldChatSend(param1);
  };

  var ocradvice;
  exports.install = function () {
    Events.on('chat:receive', fireBeforeReceive);
    // ensure fireBeforeReceive is the first event handler to be called
    Events._events['chat:receive'].unshift(Events._events['chat:receive'].pop());
    ocradvice = meld.around(chatFacade, 'onChatReceived', onChatReceived);
  };

  exports.uninstall = function () {
    Events.off('chat:receive', fireBeforeReceive);
    ocradvice.remove();
  };

});