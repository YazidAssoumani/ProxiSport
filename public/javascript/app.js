



function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};
  var options = {
    zoom : 8,
    center : myLatLng,
  };
  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('googleMap'), options);

  var marker = new google.maps.Marker({
    position:{lat: 46.25, lng:6},
    map: map,
    icon: 'https://www.flaticon.com/free-icon/weightlifting_9410'
    });

    var input = document.getElementById('ville');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    // Specify just the place data fields that you need.
    autocomplete.setFields(['place_id', 'geometry', 'name']);

//    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // var infowindow = new google.maps.InfoWindow();
    // var infowindowContent = document.getElementById('infowindow-content');
    // infowindow.setContent(infowindowContent);

    // var marker = new google.maps.Marker({map: map});

    // marker.addListener('click', function() {
    //   infowindow.open(map, marker);
    // });

    autocomplete.addListener('place_changed', function() {
      // infowindow.close();

      var place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        console.log(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location);
        console.log(place.geometry.location)

        map.setZoom(17);
      }

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
    });
  }
 