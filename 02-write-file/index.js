const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(path.join(__dirname, 'text.txt'), '', () => {
  stdout.write('Please, enter your text\n');
  stdin.on(
    'data',
    (data) => {
      if (data.toString().trim() === 'exit') {
        stdout.write('Thank you!');
        process.exit();
      }
      fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
        if (err) throw err;
      });
    },
    (err) => {
      if (err) throw err;
    },
  );
});

process.on('SIGINT', () => {
  stdout.write('Thank you!');
  process.exit();
});
