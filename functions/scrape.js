const puppeteer = require("puppeteer");

module.exports = async () => {
  const URL = "https://www.watchtime.com/category/wristwatch-industry-news/";
  const SELECTOR = "article.post";
  try {
    const browser = await puppeteer.launch();
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
    return watchNews;
  } catch (err) {
    console.error(err); // error 💩
  }
};
