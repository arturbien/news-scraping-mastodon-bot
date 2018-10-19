require("dotenv").config();
const Mastodon = require("mastodon-api");
const axios = require("axios");

const M = new Mastodon({
  access_token: process.env.APP_TOKEN,
  timeout_ms: 60 * 1000,
  api_url: "https://botsin.space/api/v1"
});

const tootStatus = async () => {
  const query = `/statuses`;
  console.log("Bot initializing...");
  try {
    const quote = await axios("https://talaikis.com/api/quotes/random/");
    const data = quote.data;
    const params = {
      spoiler_text: `${data.author} said:`,
      status: data.quote
    };
    M.post(query, params, status => {
      console.log(status);
    });
  } catch (e) {
    console.log(e); //💩
  }
};

module.exports = {
  tootStatus
};
