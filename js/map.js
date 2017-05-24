var map;

var markers = [];

// My locations
var locations = [{
        title: 'Hardees AlAqiq',
        location: {
            lat: 24.785343,
            lng: 46.613465
        }
    },
    {
        title: 'Ghada Al Ibrahim Grand Mosque',
        location: {
            lat: 24.786278,
            lng: 46.611716
        }
    },
    {
        title: 'Fuel Stations',
        location: {
            lat: 24.787905,
            lng: 46.615439
        }
    },
    {
        title: 'Krispy Kreme',
        location: {
            lat: 24.785107,
            lng: 46.613703
        }
    },
    {
        title: 'Jotun Multicolor Center',
        location: {
            lat: 24.787010,
            lng: 46.613737
        }
    }

];

function gError(){
    alert("Unable to connect to the map!");
}

function initMap() {
    // styles use with the map!
    var styles = [{
        featureType: 'water',
        stylers: [{
            color: '#ffa0d8'
        }]
    }, {
        featureType: 'administrative',
        // what feature to change
        elementType: 'labels.text.stroke',
        stylers: [{
                color: '#ffffff'
            },
            {
                weight: 6
            }
        ]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#e80013'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
                color: '#efe9e4'
            },
            {
                lightness: -40
            }
        ]
    }, {
        featureType: 'transit.station',
        stylers: [{
                weight: 9
            },
            {
                hue: '#e80013'
            }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
            lightness: 100
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
            lightness: -100
        }]
    }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
                visibility: 'on'
            },
            {
                color: '#f0e4d3'
            }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
                color: '#efe9e4'
            },
            {
                lightness: -25
            }
        ]
    }];

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.786278,
            lng: 46.611716
        }, // Coordinates of Riyadh city
        zoom: 13,
        styles: styles,
        mapTypeControl: true
    });

    var largeInfowindow = new google.maps.InfoWindow();

    // Style the markers
    var defaultIcon = makeMarkerIcon('00ff00');

    // when the user mouses over the marker.
    var highlightedIcon = makeMarkerIcon('0a9156');

    var bounds = new google.maps.LatLngBounds();


    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // put marker in marker's array.
        markers.push(marker);
        viewModel.myLocations()[i].marker = marker;

        // Extend boundries of map
        bounds.extend(marker.position);

        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

        // change to highlighted icon
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        // change to default icon
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    }

    map.fitBounds(bounds);
}

// This function populates the infowindow when the marker is clicked.
function populateInfoWindow(marker, infowindow) {
  bounce(marker);

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '<div>');

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker(null);
        });

        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);

    }
}

function bounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 500);
}


function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}
