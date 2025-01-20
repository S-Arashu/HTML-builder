const fs = require('fs');
const { join, extname } = require('node:path');
const pathToStyles = join(__dirname, 'styles');

fs.readdir(pathToStyles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  fs.writeFile(join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw err;
  });
  for (const file of files) {
    if (file.isFile() && extname(file.name) === '.css') {
      if (err) throw err;
      fs.readFile(join(pathToStyles, file.name), 'utf-8', (err, files) => {
        if (err) throw err;
        fs.appendFile(
          join(__dirname, 'project-dist', 'bundle.css'),
          files,
          (err) => {
            if (err) throw err;
          },
        );
      });
    }
  }
});
