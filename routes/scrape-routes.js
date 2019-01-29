const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

  app.get('/scrape/rollingStone', async function(req, res) {
    console.log('req.query',req.query)

    let array = await axios.get(`https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/?list_page=${req.query.pageStart}`)
      .then(function(response) {
        if (response.status === 200) {
          let albumArray = [];
          let $ = cheerio.load(response.data);
          $("article.c-list__item").each(function(i, element) {

            // only get articles, not ads
            let hasId = $(this).attr('id');
            if (hasId) {
              let albumObj = {};

              // get artist and album names
              let artistAndAlbum = $(this).find('header.c-list__header').find('h3.c-list__title').text().trim();
              let index1 = artistAndAlbum.indexOf('\,');
              let index2 = artistAndAlbum.length - 1;
              albumObj.album = artistAndAlbum.substring(index1 + 3,index2);
              albumObj.artist = artistAndAlbum.substring(0,index1);
              
              albumObj.year = parseInt($(this).find('main.c-list__main').find('div.c-list__lead').find('p:first-of-type').text().trim().slice(-4));
              albumObj.imgUrl = $(this).find('figure.c-list__picture').find('div.c-crop').find('img').attr('data-src');

              albumArray.push(albumObj);
            } else {
              // advertisement, ignore
            }
          })
          return albumArray
        }
    })
    .catch(err => console.log('err',err));
    
    res.send(array);
  });
};
