
/*
 * GET form dummy page.
 */

exports.form = function(req, res){
  res.render('form', { title: 'TopCop Submission Form' });
};

exports.submit = function (req, res){
  var rating;
  console.log("POST: ");
  console.log(req.body);
  rating = new Rating({
	badge: req.body.badge,
	rating: req.body.rating,
	comment: req.body.comment,
	coords:  req.body.coords
  });
  rating.save(function (err) {
	if (!err) {
	  return console.log("created");
	} else {
	  return console.log(err);
	}
  });
  return res.send(rating);
};