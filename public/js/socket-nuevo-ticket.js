var socket = io();

socket.on('connect', function() {
    console.log('connected');
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('estadoActual', function(data) {
    $('#lblNuevoTicket').text(data.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        $('#lblNuevoTicket').text(siguienteTicket);
    });
});