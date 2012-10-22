
/*
 * GET home page.
 */

exports.display = function(req, res) {
    //if (!err) {
        res.render( 'index', {title: "BriteMap"})
    //} else {
    //    return console.log(err);
    //}
};
