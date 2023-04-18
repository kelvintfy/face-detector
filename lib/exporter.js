const fs = require('fs');

function jpeg(buffer, path, imageName) {
  fs.writeFileSync(`${path}${imageName}.jpeg`, buffer);
}

module.exports = {
  jpeg,
};
