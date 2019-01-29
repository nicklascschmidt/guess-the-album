const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

  app.get('/scrape/rollingStone', async function(req, res) {
    let startIndex = 10;
    let albumArray = [];

    for (let i = startIndex; i > 0; i--) {
      albumArray = await getRollingStoneAlbums(albumArray,`https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/?list_page=${i}`);
      // console.log('albumArray',albumArray.length); // test to confirm #
    }
    res.send(albumArray); // send final array of album objs to client (500 albums)

    function getRollingStoneAlbums(array,link) {
      return axios.get(link)
        .then(function(response) {
          if (response.status === 200) {
            let $ = cheerio.load(response.data);
            $("article.c-list__item").each(function(i, element) {
  
              // only get articles, not ads
              let hasId = $(this).attr('id');
              if (hasId) {
                // make obj and add keys to it
                let albumObj = {};
  
                // get artist and album names, then year and img URL
                let artistAndAlbum = $(this).find('header.c-list__header').find('h3.c-list__title').text().trim();
                let index1 = artistAndAlbum.indexOf('\,');
                let index2 = artistAndAlbum.length - 1;
                albumObj.album = artistAndAlbum.substring(index1 + 3,index2);
                albumObj.artist = artistAndAlbum.substring(0,index1);
                
                albumObj.year = parseInt($(this).find('main.c-list__main').find('div.c-list__lead').find('p:first-of-type').text().trim().slice(-4));
                albumObj.imgUrl = $(this).find('figure.c-list__picture').find('div.c-crop').find('img').attr('data-src');
  
                // push to the array (passed into the func)
                array.push(albumObj);
              } else {
                // advertisement, ignore
              }
            })
            return array
          }
        })
        .catch(err => console.log('err',err));
    }
  });
};
