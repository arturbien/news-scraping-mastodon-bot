# 🤖 News-scraping Mastodon bot

* Headless Chrome scrapes [watch news](https://www.watchtime.com/category/wristwatch-industry-news/)
* images are downloaded into `/images` folder
* scraped data is formatted and posted on [Mastodon](https://botsin.space/about) using Mastodon API



![example](https://user-images.githubusercontent.com/28541613/47305825-f8722200-d62a-11e8-863c-7c8c2fbcbe75.png)

## Installation

```
$ git clone https://github.com/arturbien/news-scraping-mastodon-bot.git
$ cd news-scraping-mastodon-bot
$ npm install
```

## Configuration
Create `.env` file in the root folder and fill it with your Mastodon credentials (see `.env.example`):
```
APP_ID=
APP_KEY=
APP_TOKEN=
```

Image path/extension/name settings (optional)  in `/config.js`
```javascript
module.exports = {
  image: {
    path: "./images/",
    name: "image_",
    extension: "png"
  },
  maxPosts: 5  //max number of posts
};
```

## Usage
```
$ node bot.js
```
