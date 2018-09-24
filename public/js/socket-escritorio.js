var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Missing param');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);

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
    socket.emit('atenderTicket', { escritorio: escritorio }, function(atenderTicket) {
        $('small').text('Ticket: ' + atenderTicket.numero);
    });
});