
/*
 * GET home page.
 */

exports.display = function(err, res) {
    //return Rating.find(function (err, returnedRatings) {
    //    if (!err) {
            res.render( 'index',
                        {title: "TopCop" //, ratings: returnedRatings
            })
    //    } else {
    //        return console.log(err);
    //    }
    //});
};

exports.nearPlaces = function(req, res) {
    //var geo = req.query.coords.split(',');
    //var Rating = mongoose.model('Rating');
    ////var rating = new Rating({coords: geo});
    //rating.findNear(
    //    function(err, res) {
    //        if (!err) {
    //            res.json(res);
    //        } else {
    //            console.log(err);
    //        }
    //    });
};
