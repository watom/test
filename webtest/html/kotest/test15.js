var viewModel = {
    firstName: ko.observable("Aehyok"),
    lastName: ko.observable("Leo"),
    pets: ko.observableArray(["Dog", "Cat", "Fish"]),
    Type:"Customer"
};

// view.hasALotOfPets = ko.dependentObservable(function () {
//     return this.pets().length() > 2;
// }, viewModel);

var jsonData = ko.toJSON(viewModel);
// var jsonData02 = ko.toJS(viewModel);
alert(jsonData);

ko.applyBindings(viewModel);

