angular.module('player.services').factory('socket', function (socketFactory) {
    var myIoSocket = io.connect('https://np-rt.innovatete.ch');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})