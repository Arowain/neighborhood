var viewModel = {
    showList: ko.observable(true),
    myLocations: ko.observableArray(locations),
    query: ko.observable(''),
    imagePath: ko.observable(""),
    pointMarker: function(data) {
        //http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
    console.log(data);
    google.maps.event.trigger(data.marker, 'click');
    }
};
//ViewModel.query.subscribe(ViewModel.search);45
ko.applyBindings(viewModel);
