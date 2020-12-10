const Parser = require('rss-parser');
const fetch = require('node-fetch');

const parser = new Parser();

module.exports =  class RSSFeed {
  init = async (url, tags) =>
    await fetch(url)
      .then((response) => response.text())
      .then((xml) => parser.parseString(xml))
      .then((data) => {
        data.items = data.items.map(({creator, title, isoDate, contentSnippet, enclosure, link}) => ({
          creator,
          title,
          isoDate,
          contentSnippet,
          enclosure,
          link,
        }));
        this.setData(tags ? this.getTaggedData(data, tags) : data);
      });

  getTaggedData = (data, tags) => {
    const taggedItems = data.items.map((item) => {
      const categories = tags.filter((tag) => item.contentSnippet.match(new RegExp(tag, 'i')));
      return {...item, categories};
    });
    return {...data, items: taggedItems};
  };

  setData = (data) => {
    this.data = data;
  };
}