const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();

        console.log('se ha inicializado el sistema');
    }

    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    getCurrentTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    grabarArchivo() {
        let jsonData = {
            hoy: new Date().getDate(),
            ultimo: this.ultimo,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonString);
    }

    atenderTicket(escritorio) {
        if (this.tickets.length == 0) {
            return 'No hay tickets';
        }

        let ticketNumber = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(ticketNumber, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }
}

module.exports = {
    TicketControl
}