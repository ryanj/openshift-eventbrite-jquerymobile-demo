
/*
 * PUT rating into database
 */


exports.submit = function (req, res){
  var rating;
  console.log("POST: ");
  console.log(req.body);
  rating = new Rating({
    badge: req.body.badge,
    rating: req.body.rating,
    comment: req.body.comment,
    coord:  req.body.coord
  });
  rating.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(rating);
});