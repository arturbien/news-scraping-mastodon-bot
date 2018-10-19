require("dotenv").config();
const Mastodon = require("mastodon-api");
const axios = require("axios");

console.log("Bot initializing...");

const M = new Mastodon({
  access_token: process.env.APP_TOKEN,
  timeout_ms: 60 * 1000,
  api_url: "https://botsin.space/api/v1"
});

const query = `/statuses`;

const tootQuote = async () => {
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

tootQuote();
