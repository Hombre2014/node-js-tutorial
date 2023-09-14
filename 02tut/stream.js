const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });

const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', chunk => {
//   console.log('----- NEW CHUNK -----');
//   console.log(chunk);
//   ws.write('\nNEW CHUNK\n');
//   ws.write(chunk);
// });

rs.pipe(ws);
