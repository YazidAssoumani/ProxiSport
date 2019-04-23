function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};
  var options = {
    zoom : 2,
    center : myLatLng,
    // mapTypeControl: false

    mapTypeControl: true,
          mapTypeControlOptions: {
              // style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
               position: google.maps.ControlPosition.RIGHT_BOTTOM,
            
          },
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
          },
          scaleControl: true,
          streetViewControl: true,
          streetViewControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
          },
          // fullscreenControl: true
  };
  var mapStyles = [
    
  ]
  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('googleMap'), options);


////////////////// ADD Marker
var image = {
  url: '/images/wo.png' ,
  // This marker is 20 pixels wide by 32 pixels high.
  size: new google.maps.Size(32, 32),
  // The origin for this image is (0, 0).
  origin: new google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: new google.maps.Point(16, 16)
};


  var marker = new google.maps.Marker({
    position:{lat: 46.25, lng:6},
    map: map,
    zoom: 2,
    icon: image 
    });

      //   infowindow.open(map, marker);
      // });

////////////// Autocomplession


    var input = document.getElementById('ville');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    // Specify just the place data fields that you need.
    autocomplete.setFields(['place_id', 'geometry', 'name']);

    autocomplete.addListener('place_changed', function() {
      // infowindow.close();

      var place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        console.log("hello",place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location);
        console.log(place.geometry.location)

        map.setZoom(2);

        var queryloc = map.fitBounds(place.geometry.viewport)
       console.log("hola", queryloc)
      }

      google.maps.event.addListener(map, 'dragend', function() {
        /* On récupère les coordonnées des coins de la map */ 
        var bds = map.getBounds();
        var South_Lat = bds.getSouthWest().lat();
        var South_Lng = bds.getSouthWest().lng();
        var North_Lat = bds.getNorthEast().lat();
        var North_Lng = bds.getNorthEast().lng();
        console.log(South_Lat,South_Lng,North_Lat,North_Lng);
       });


       
      // $('.pac-item').on('click', function(evt){
         
        //   evt.stopPropagation();
        //   evt.preventDefault() ;
        
          //console.log(data.nom);
        
        //   $.ajax({
        //     url : '/map',
        //     method : 'GET',
        //     data : data
        //   }).done(function(res){
        //     // console.log(res) ;
        


    });

  }
/////////// Requête ajax geopoints
  // google.maps.event.addListener(map, 'dragend', function() {
  /* On récupère les coordonnées des coins de la map */ 
//   var bds = map.getBounds();
//   var South_Lat = bds.getSouthWest().lat();
//   var South_Lng = bds.getSouthWest().lng();
//   var North_Lat = bds.getNorthEast().lat();
//   var North_Lng = bds.getNorthEast().lng();
//   console.log(South_Lat,South_Lng,North_Lat,North_Lng);
//  });

// $('.pac-item').on('click', function(evt){
//   evt.stopPropagation();
//   evt.preventDefault() ;

  //console.log(data.nom);

//   $.ajax({
//     url : '/map',
//     method : 'GET',
//     data : data
//   }).done(function(res){
//     // console.log(res) ;

//     console.log(res);
//   })
// });
      
// $('#search').on('submit', function(evt){
//   evt.stopPropagation();
//   evt.preventDefault() ;
//   var data = {} ;
//   $(this).serializeArray().map(function(x){data[x.name] = x.value;});
//   // console.log(data.nom);

//   $.ajax({
//     url : '/map',
//     method : 'get',
//     data : data
//   }).done(function(res){
//     // console.log(res) ;

//     console.log('Communication avec Ajax' + ' nom : ' +nom+ ' prenom : ' +prenom+ ' email : ' +email+ ' naissance : ' +birth+ ' Mdp : ' +password + 'id :'+id);
//   })
// })



       
         


      //    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // var infowindow = new google.maps.InfoWindow();
    // var infowindowContent = document.getElementById('infowindow-content');
    // infowindow.setContent(infowindowContent);

    // var marker = new google.maps.Marker({map: map});

    // marker.addListener('click', function() {
    //   infowindow.open(map, marker);
    // });
      // // Set the position of the marker using the place ID and location.
      // marker.setPlace({
      //   placeId: place.place_id,
      //   location: place.geometry.location
      // });

      // marker.setVisible(true);

      // infowindowContent.children['place-name'].textContent = place.name;
      // infowindowContent.children['place-id'].textContent = place.place_id;
      // infowindowContent.children['place-address'].textContent =
      //     place.formatted_address;
      // infowindow.open(map, marker);

