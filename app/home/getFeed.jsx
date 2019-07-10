import RSSParser from 'rss-parser';

function getFeed(callback) {
  var parser = new RSSParser;
  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  var apiUrl = 'http://www.gutenberg.org/cache/epub/feeds/today.rss';

  parser.parseURL(CORS_PROXY + apiUrl, (err, feed)=>{
    if (err) return callback(null);

    var items = feed.items;
    var rssItems = [];

    for (let i = 0, l = items.length; i < l; i++) {
      // http://www.gutenberg.org/ebooks/59846
      // http://www.gutenberg.org/cache/epub/59831/pg59831.cover.medium.jpg
      var idNumbers = [];
      for (let y = 32, s = items[i].link.length; y < s; y ++) {
        idNumbers.push(items[i].link[y]);
      }
      var id = idNumbers.join('');
      var thumbnail = `http://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.medium.jpg`;

      let book = {
        title: items[i].title,
        link: items[i].link,
        thumbnail: thumbnail,
      };
      rssItems.push(book);
    }

    return callback(rssItems);
  });
}

export { getFeed };
