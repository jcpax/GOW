$('.trucks').on('click', function(){
  console.log('hi');
		document.getElementById("info-side").style.display = "block";
     $('#Name').text($(this).data('name'));
     var twitterHandle = $(this).data('twitter');
     console.log(twitterHandle);
     var location = $(this).data('name');
     var map = $(this).data('map');
     $('#map').append(map);
     console.log(map);
     showTweets(twitterHandle);
    // WHERE TWITTER NAME WILL BE PUSHED AND PUT INTO CODE
	});

	var slideIndex = 1;
//showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

  $('.image-swap').on('mouseover', function () {
    $("#demo").text($(this).data('info'));

  })
  $('.image-swap').on('mouseout', function () {
    $("#demo").text($(this).data('default'));   
  })
  $('#info').on('click', function(){
    location.href = 'info.html';
  })
  $('#ut').on('click', function(){
    location.href = 'info2.html';
  })
   $('#capital').on('click', function(){
    location.href = 'info3.html';
  })


// TWITTER API
function showTweets (twitterHandle) {
  console.log(twitterHandle);
    document.getElementById('timeline').innerHTML="";

    twttr.widgets.createTimeline({
      sourceType: "profile",
      screenName: twitterHandle
    },
    document.getElementById('timeline'),
    {
      width: '450',
      height: '700',
      related: 'twitterdev,twitterapi'
    }).then(function (el) {
      console.log("Embedded a timeline.")
    });
  }

  // GOOGLE MAPS API
function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.270103, lng: -97.735982},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
