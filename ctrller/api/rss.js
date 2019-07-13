// http://www.gutenberg.org/cache/epub/feeds/today.rss
const RSSParser = require('rss-parser');


exports.recentFeed = (req, res, next)=>{
  var parser = new RSSParser();
  var url = 'http://www.gutenberg.org/cache/epub/feeds/today.rss';

  parser.parseURL(url, (err, feed)=>{
    if (err) {
      console.log(err);
      return res.status(500).send(`Failed to fetch rss feed`);
    }

    var items = feed.items;
    var rssItems = [];

    for (let i = 0, l = items.length; i < l; i++) {
      var idNumbers = [];
      for (let y = 32, s = items[i].link.length; y < s; y ++) {
        idNumbers.push(items[i].link[y]);
      }
      var id = idNumbers.join('');
      var thumbnail = `http://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.medium.jpg`;

      let book = {
        id: id,
        title: items[i].title,
        link: items[i].link,
        thumbnail: thumbnail,
      };
      rssItems.push(book);
    }

    res.status(200).json(rssItems);
  });
}
