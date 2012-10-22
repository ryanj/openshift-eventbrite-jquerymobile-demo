var map;

$(document).ready(function() {

  
  var layer = new L.StamenTileLayer("toner");
  
  var map = new L.Map("map", {
      center: new L.LatLng(37.8052612, -122.2719463),
      zoom: 12
  });
  map.addLayer(layer);


  // add geolocation

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

  map.locate({setView: true, maxZoom: 12});

  function onLocationFound(e) {
      var radius = e.accuracy / 2;

      var uMarker = new L.Marker(e.latlng);
      map.addLayer(uMarker);
      uMarker.bindPopup("Current Location").openPopup();
      var uCircle = new L.Circle(e.latlng, radius);
      map.addLayer(uCircle);
      uCircle.bindPopup("You are within " + radius + " meters from this point")
      
      $.post("/geo", {coords: {long: e.latlng.lng, lat: e.latlng.lat  }}, function(result) {
          for (var key in result) {
            if (result.hasOwnProperty(key)) {
              var LAT = result[key].coords.lat;
              var LONG = result[key].coords.long;
              console.log("Adding map marker: LAT: " + LAT + " LONG: " + LONG);
              L.marker(new L.LatLng(LAT, LONG)).bindPopup(result[key].comment).openPopup().addTo(map);
            };
          };
        });
    };

  function onLocationError(e) {
      alert(e.message);
  };
  

});


//        $.each(data, function(key, values) {
//          console.log("key: " + key + " values: " + values);


// var map;

// $("#mappage").live('pageinit', function() {

//   resizeMap();

//   var resizeTimer;
//   $(window).resize(function() {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(resizeMap, 100);
//   });

//   setTimeout(function() {

//     var toner = new L.StamenTileLayer("toner");

//     var map = new L.Map("map", {
//         center: new L.LatLng(37.7, -122.4),
//         zoom: 12
//     });
    
//     map.addLayer(toner);
//     map.redraw(true);



//   }, 400);


// });

// function resizeMap() {

//   var mapheight = $(window).height();
//   var mapwidth = $(window).width();
//   $("#map").height(mapheight);
//   $("#map").width(mapwidth);

// }



