import socketio from 'socket.io-client';

// Configurando a conexão com do socket.io com o backend.
const socket = socketio('http://192.168.2.42:3333', {
    autoConnect: false,
});

function subscribleToNewDevs(subscribleFunction) {
    socket.on('new-dev', subscribleFunction);
}

// Conecta com o socket.
function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }

    socket.connect();
}

// Desconecta do socket.
function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribleToNewDevs,
}