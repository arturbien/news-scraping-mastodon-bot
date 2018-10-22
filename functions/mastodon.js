const fs = require("fs");
const Mastodon = require("mastodon-api");

const M = new Mastodon({
  access_token: process.env.APP_TOKEN,
  timeout_ms: 60 * 1000,
  api_url: "https://botsin.space/api/v1/"
});

const postMedia = async imageTitle => {
  const response = M.post("media", {
    file: fs.createReadStream(imageTitle)
  });
  return response;
};

const postStatus = async (mediaId, status) => {
  M.post("statuses", { status: status, media_ids: [mediaId] });
};

const buildStatus = (link, text) => {
  return `⌚ ${text}

  🔗 ${link}`;
};

module.exports = {
  postMedia,
  postStatus,
  buildStatus
};
