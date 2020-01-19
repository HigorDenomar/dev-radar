import socketio from 'socket.io-client';

const socket = socketio('http://192.168.2.42:3333', {
    autoConnect: false,
});

function subscribleToNewDevs(subscribleFunction) {
    socket.on('new-dev', subscribleFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }

    socket.connect();
}

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