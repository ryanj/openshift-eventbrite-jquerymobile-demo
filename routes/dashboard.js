
/*
 * GET dashboard page.
 */

exports.display = function(err, res) {
    return Rating.find(function (err, returnedRatings) {
        if (!err) {
            res.render( 'dashboard',
                        {title: "TopCop Dashboard",
                        ratings: returnedRatings})
        } else {
            return console.log(err);
        }
    });  
};
