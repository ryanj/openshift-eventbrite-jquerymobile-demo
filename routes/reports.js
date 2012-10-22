
/*
 * GET users listing.
 */


exports.list = function (req, res){
  return Rating.find(function (err, ratings) {
    if (!err) {
      return res.send(ratings);
    } else {
      return console.log(err);
    }
  });
};