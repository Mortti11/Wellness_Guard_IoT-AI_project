const { Aedes } = require('aedes');
const net = require('net');
const aedes = new Aedes();

const PORT = 1883;

const server = net.createServer(aedes.handle);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`MQTT broker running on port ${PORT}`);
});

aedes.on('client', (client) => {
  console.log(`[MQTT] Client connected: ${client.id}`);
});

aedes.on('clientDisconnect', (client) => {
  console.log(`[MQTT] Client disconnected: ${client.id}`);
});

aedes.on('publish', (packet, client) => {
  if (client) {
    console.log(`[MQTT] Message on ${packet.topic}: ${packet.payload.toString()}`);
  }
});
