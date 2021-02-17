const axios = require('axios');
const cheerio = require('cheerio');

const albumUrls = [
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/arcade-fire-%ef%bb%bffuneral-1062733/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/linda-mccartney-and-paul-ram-1062783/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/the-go-gos-beauty-and-the-beat-1062833/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/stevie-wonder-music-of-my-mind-2-1062883',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/b-b-king-live-at-the-regal-2-1062934/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/buzzcocks-singles-going-steady-2-1062983/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/sade-diamond-life-1063033/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/bruce-springsteen-nebraska-3-1063083/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/the-band-music-from-big-pink-2-1063133/',
  'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/jay-z-the-blueprint-3-1063183/',
];


module.exports = function (app) {

  app.get('/scrape/rollingStone/:type', async function (req, res) {

    // Type is whichever category the user clicks to scrape.
    // pageNum is the page number (10 pages of 50 records each, 500 albums total).
    // numAlbums is how many albums you want (i.e. # of questions in the quiz).
    const type = req.params.type;
    let scrapeLink = '';
    let baseScrapeLink = '';
    let pageNum = 0;
    const numOfAlbums = 5;
    let randomNumberArray = [];
    let albumArray = [];

    if (type === '500AllTime') {
      // Set the base link. Get array of 5 random #s.
      baseScrapeLink = 'https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/?list_page=';
      randomNumberArray = chooseRandomNumbers(numOfAlbums, 500);

      // Loop the random # array and get the album info for each.
      // Page # is what page the album is listed on RS.com (1 of 10).
      for (num of randomNumberArray) {
        pageNum = calculatePageNum(num);
        scrapeLink = baseScrapeLink + pageNum;
        await fetchAlbum(scrapeLink, num, albumArray);
      }

      // Send the array back to the client.
      res.send(albumArray);

    } else if (type === '50Best2018') {
      // nothing yet
      scrapeLink = `https://www.rollingstone.com/music/music-lists/50-best-albums-2018-764071/`;
    } else {
      console.log('err: wrong params');
    }

    // If req successful, get album info from RS.com via Cheerio web scrape
    function fetchAlbum(link, id, album) {
      return axios.get(link).then((response) => {
        if (response.status === 200) {
          const $ = cheerio.load(response.data);
          $(`article#list-item-${id}`).each(function (i, element) {
            // Make object and add keys to it.
            let albumObj = { id };

            // Get artist and album names (can only be extracted as one text string), then year and img URL.
            const artistAndAlbum = $(this).attr('data-list-title');

            // Typos: no starting quote for the album, no comma deliminator.
            // Irregs: some bands have commas in them (e.g. Earth, Wind, and Fire), quotes within album/artist name.
            // If there's a beginning quote (right before the album name), then that's the first index. Else, it's the position of the comma+1.
            const indexQuote = artistAndAlbum.indexOf('\‘');
            const indexComma = artistAndAlbum.indexOf('\,');
            const firstAlbumIndex = (indexQuote !== -1) ? indexQuote + 1 : indexComma + 1;
            const lastAlbumIndex = artistAndAlbum.length - 1;
            albumObj.album = artistAndAlbum.substring(firstAlbumIndex, lastAlbumIndex).trim();

            // Pull the artist name out by only going up to the first character when the album starts. Subtract 1 (the quote), then trim spaces.
            // Then if the last char is a comma (which it should be if no typo), then slice it off the end.
            const artist = artistAndAlbum.substring(0, firstAlbumIndex - 1).trim();
            const lastCharIsComma = (artist.charAt(artist.length - 1) === ',') ? true : false;
            albumObj.artist = lastCharIsComma ? artist.slice(0, -1) : artist;

            // Year and imgUrl are already good to go from the source code.
            albumObj.year = parseInt($(this).find('main.c-list__main').find('div.c-list__lead').find('p:first-of-type').text().trim().slice(-4));
            albumObj.imgUrl = $(this).find('figure.c-list__picture').find('div.c-crop').find('img').attr('data-src');

            return album.push(albumObj);
          });
        } else {
          // handle error
          console.log('OOPS: error caught');
          res.send('error');
        }
      })
        .catch(err => console.log('err', err));
    }

    // Calculate what page the item # is on. Ex. item # 451 is on page 1, #450 on page 2.
    function calculatePageNum(num) {
      return 10 - Math.floor((num - 1) / 50);
    }

    // Builds array of unique random numbers. numAlbums is how many 
    function chooseRandomNumbers(numAlbums, limit) {
      let array = [];
      while (array.length < numAlbums) {
        let randomNumber = Math.floor(Math.random() * limit) + 1;
        if (array.indexOf(randomNumber) === -1) {
          array.push(randomNumber);
        }
      }
      return array;
    }

  });
};
