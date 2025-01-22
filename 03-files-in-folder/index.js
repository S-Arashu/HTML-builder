const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');
const { extname, join } = require('node:path');

fs.readdir(secretFolder, { withFileTypes: true }, (err, data) => {
  if (err) throw err;

  data.forEach((file) => {
    if (file.isDirectory()) {
      return;
      // fs.readdir(
      //   path.join(__dirname, 'secret-folder', file.name),
      //   (err, item) => {
      //     if (err) {
      //       throw err;
      //     }
      //     item.forEach((itemInside) => {
      //       const currentItem = join(
      //         __dirname,
      //         'secret-folder',
      //         file.name,
      //         itemInside,
      //       );
      //       const fileName =
      //         path.basename(itemInside, path.extname(itemInside)) || '';
      //       const extension =
      //         extname(path.join(__dirname, 'secret-folder', itemInside)).slice(
      //           1,
      //         ) || '';
      //       fs.stat(currentItem, (err, stats) => {
      //         if (err) {
      //           throw err;
      //         }
      //         const size = stats.size;
      //         console.log(`${fileName} - ${extension} - ${size} bytes`);
      //       });
      //     });
      //   },
      // );
    } else {
      const currentFile = join(__dirname, 'secret-folder', file.name);
      const fileName = file.name.split('.')[0] || '';
      const extension = extname(file.name).slice(1) || '';
      fs.stat(currentFile, (err, stats) => {
        if (err) {
          throw err;
        }
        const size = stats.size;
        console.log(`${fileName} - ${extension} - ${size} bytes`);
      });
    }
  });
});
