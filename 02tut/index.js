const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// fs.readFile('./files/starter.txt', (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
    await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you.');
    await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseWriteRenamed.txt'));
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseWriteRenamed.txt'), 'utf8');
    console.log(newData);
  } catch (error) {
    console.log(error);
  }
}

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// fs.readFile('./files/hello.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log('Hello from the top-level code!');

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you, Dave!', (err) => {
//   if (err) throw err;
//   console.log('Write completed!');

//   fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes, it is.', (err) => {
//     if (err) throw err;
//     console.log('Append completed!');

//     fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//       if (err) throw err;
//       console.log('Rename completed!');
//     });
//   });
// });

// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Appending tet to a file or creating it if not exists!', (err) => {
//   if (err) throw err;
//   console.log('Append completed!');
// });

// exit on uncaught errors
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
