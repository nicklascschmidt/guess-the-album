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
    
    let albumArrayShort = getRandomAlbum(albumArray);
    res.send(albumArrayShort); // send final array of 5 album objs to client


    function getRandomAlbum(array) {
      // get 5 random albums out of the 500 pulled from RS.com
      let albumArrayShort = [];
      for (let i = 0; i < 5; i++) {
        let randomNum = Math.floor(Math.random() * array.length);
        albumArrayShort.push(array[randomNum]);
      }
      return albumArrayShort
    }

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
                
                let indexComma = artistAndAlbum.indexOf('\,');
                let indexApostrophe = artistAndAlbum.indexOf(`‘`);
                let indexCommaAdjustedStart = (indexComma >= 0) ? indexComma + 3 : indexApostrophe + 1; // Exodus by Bob Marley has a typo on RS.com
                let indexEnd = artistAndAlbum.length - 1;

                let indexCommaAdjustedEnd = (indexComma >= 0) ? indexComma : indexApostrophe - 2; // same

                albumObj.album = artistAndAlbum.substring(indexCommaAdjustedStart,indexEnd);
                albumObj.artist = artistAndAlbum.substring(0,indexCommaAdjustedEnd);
                
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
