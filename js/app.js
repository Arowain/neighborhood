var viewModel = {
    showList: ko.observable(true),
    myLocations: ko.observableArray(locations),
    query: ko.observable(''),
    imagePath: ko.observable(""),
    pointMarker: function(data) {
        //http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
        if (initMap.largeInfowindow.marker != data.location) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title == data.title) {
                populateInfoWindow(markers[i], infoWindow);
                break;
            }
        }
    }
      
    }
};

//ViewModel.query.subscribe(ViewModel.search);45
ko.applyBindings(viewModel);
