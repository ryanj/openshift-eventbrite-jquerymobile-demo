//TODO: onload, pull all the past reviews
  //1- create a list view of each review (sort by date?)
  //2- add an onclick to each list item 
  //3- add a map marker for each review
  //4- add an onclick to each map item 
  //5- paginate the reviews (scalability)
    //a- pull 10 provide an endless scroll feature to the list view
    //b- search by location to pull more events in the map view

//TODO: build out the review submittal form:
  //1- show the review modal when the 'review' button is pressed
  //2- add form validations? (jquery)
  //3- if valid, submit the form - $.post()



// custom scripts



(function() {
  var submit_topcop_review = function(){
    var get_form_fields_as_array = function(){
      var params={};
      $('#submitRating :input').each(function(x,field){
        if($(this).attr('id') == 'location'){ //&& $(this).is('checked') ){
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( function (pos){
              params['coords']={'lat':pos.coords.latitude,'long':pos.coords.longitude};
              console.log(params);
            });
          }
        }else{
          params[$(this).attr('id')] = $(this).val();
        }
      });
      return params;
    };
    
    //var formdata =  $('#submitRating').serialize();
    var formdata = get_form_fields_as_array();

    console.log("posting the following form data:");
    console.log(formdata);

    $.post( '/form', formdata, function(data) {
      console.log("your results:");
      console.log(data);
    });
    $('#myModal').modal('hide');
    return false;   
  };
  window.submit_topcop_review = submit_topcop_review;
  $(document).ready(function(){
    $("submitRating").on('submit', function(e) {
      e.preventDefault();
      return window.submit_topcop_review();
    });
  });
})(); 



// pager
(function() {

	$('#tab-bar a').on('click', function(e){
	  e.preventDefault();
	  var nextPage = $(e.target.hash);
	  $("#pages .current").removeClass("current");
	  nextPage.addClass("current");
	});

})();

// css transition binding
(function() {

	function page(toPage) {
	  var toPage = $(toPage),
	  fromPage = $("#pages .current");
	  
    if(toPage.hasClass("current") || toPage === fromPage) {
        return;
    };	  

	  toPage.addClass("current fade in").one("webkitAnimationEnd", function(){
	      fromPage.removeClass("current fade out");
	      toPage.removeClass("fade in")
	  });
	  fromPage.addClass("fade out");
	}

})();


// modal

// $('#myModal').modal({
//   keyboard: true,
//   backdrop: true,
//   show: false,
//   fade: true
// })

// $('#myModal').modal('toggle')
