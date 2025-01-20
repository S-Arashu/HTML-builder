const fs = require('fs');
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');
const path = require('path');
const pathForCopy = join(__dirname, 'files');
const pathCopy = join(__dirname, 'files-copy');

mkdir(join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

fs.readdir(pathCopy, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
      if (err) throw err;
    });
  }

  fs.readdir(pathForCopy, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
        (err) => {
          if (err) throw err;
        },
      );
    });
  });
});
