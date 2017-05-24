var viewModel = {
    showList: ko.observable(true),
    myLocations: ko.observableArray(locations),
    query: ko.observable(''),
    imagePath: ko.observable(""),
    shouldShowMessage: ko.observable(true),
    pointMarker: function(data) {
        //http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
    console.log(data);
    google.maps.event.trigger(data.marker, 'click');
    },

    search: function(value) {
    viewModel.shouldShowMessage(false)
    for(var x in locations) {
      if(locations[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.myLocations.push(locations[x]);
      }
    }
  }
};
viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel);
