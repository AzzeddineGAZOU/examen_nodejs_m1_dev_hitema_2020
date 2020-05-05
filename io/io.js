const fs = require("fs");

module.exports.decodeHexFileContent = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const fileContent = fs.readFileSync(filePath).toString();
      const decodedContent = Buffer.from(fileContent, "hex").toString();
      resolve(decodedContent);
    } catch (error) {
      reject();
    }
  });
};
