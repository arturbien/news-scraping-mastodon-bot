const fs = require("fs");
const puppeteer = require("puppeteer");

const scrape = async () => {
  const URL = "https://www.watchtime.com/category/wristwatch-industry-news/";
  const SELECTOR = "article.post";
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL);

    const watchNews = await page.evaluate(SELECTOR => {
      const articles = [...document.querySelectorAll(SELECTOR)];
      return articles.map(article => {
        const heading = article.querySelector("h2").textContent.trim();
        const link = article.querySelector("a").href;
        const img = article.querySelector(".image_wrap_inner > img").src;
        const news = { heading, link, img };
        return news;
      });
    }, SELECTOR);

    browser.close();
    fs.writeFile("./watchNews.json", JSON.stringify(watchNews), function(err) {
      if (err) {
        console.error("Crap happens"); // error 💩
      } else {
        console.log("Success! 🏆");
      }
    }); // saving to JSON file 📁

    // return watchNews;
  } catch (err) {
    console.error(err); // error 💩
  }
};

module.exports = {
  scrape
};
