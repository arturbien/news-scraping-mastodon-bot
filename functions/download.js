const fs = require("fs");
const Axios = require("axios");

module.exports = async function(url, filename) {
  const response = await Axios({
    method: "GET",
    url: url,
    responseType: "stream"
  });
  response.data.pipe(fs.createWriteStream(filename));
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", () => {
      reject();
    });
  });
};
