const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

// initialize an instance of MyEmitter
const myEmitter = new MyEmitter();

// register a listener for the 'myEvent' event
myEmitter.on('log', (message) => {
  logEvents(message);
});

// emit the 'myEvent' event
setTimeout(() => {
  myEmitter.emit('log', 'Log event emitted');
}, 1000);
