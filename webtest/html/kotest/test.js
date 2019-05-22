var country =function (name, population) {
    this.countryName = name;
    this.countryPopulation = population;
};
var viewModel = {
    selectedCountry: ko.observable(),// Nothing selected by default
    availableCountries: ko.observableArray([
        new country("UK", 65000000),
        new country("USA", 320000000),
        new country("Sweden", 29000000)
    ])

};