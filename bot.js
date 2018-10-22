require("dotenv").config();
const fs = require("fs");
const postStatus = require("./functions/mastodon").postStatus;
const postMedia = require("./functions/mastodon").postMedia;
const buildStatus = require("./functions/mastodon").buildStatus;
const scrape = require("./functions/scrape");
const download = require("./functions/download");
const createImagePath = require("./functions/helpers").createImagePath;
const config = require("./config");

const init = async () => {
  // creates folder if doesnt exist
  if (!fs.existsSync(config.image.path)) {
    fs.mkdirSync(config.image.path);
  }
  try {
    console.log("Fetching data...");
    var data = await scrape();
    data = data.slice(0, config.maxPosts);

    var i = 0;
    for (const news of data) {
      console.log(`
------------------------
POST NUMBER ${i}
------------------------`);

      console.log("Downloading image...");
      const imageName = createImagePath({ ...config.image, i });
      await download(news.img, imageName);

      console.log("Uploading picture to Mastodon...");
      const mediaResponse = await postMedia(imageName);
      const imageId = mediaResponse.data.id;

      console.log("Posting status to Mastodon....");
      const status = buildStatus(news.link, news.heading);
      await postStatus(imageId, status);
      i++;
    }

    console.log(`
${i} news uploaded successfully!
    `);
  } catch (e) {
    console.log(e); //💩
  }
};

init();
