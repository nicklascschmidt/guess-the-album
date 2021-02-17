const albumDataLocal = require('../data/rollingStone.data');

const generateAlbumData = () => {
  const albumData = [];

  while (albumData.length < 5) {
    const randNum = Math.floor(Math.random() * 500);
    if (albumData.findIndex(album => album.id === randNum) < 0) {
      const {
        title: artistAndAlbum,
        subtitle: recordLabelAndYear,
        image: imgUrl,
      } = albumDataLocal[randNum];

      const id = randNum;
      const [artist, albumTitle] = artistAndAlbum.split(`, '`);
      const album = albumTitle.slice(0, -1);
      const year = recordLabelAndYear.slice(-4);

      albumData.push({ id, artist, album, year, imgUrl });
    }
  }

  return albumData;
}

module.exports = function (app) {

  app.get('/scrape/rollingStone', async function (req, res) {
    const albumData = generateAlbumData();

    res.send(albumData);
  });
};
