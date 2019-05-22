function MyViewModel() {
    this.produce = [ 'Apple', 'Banana', 'Celery', 'Corn', 'Orange', 'Spinach' ];
    this.selectedProduce = ko.observableArray([ 'Corn', 'Orange' ]);
    this.selectedAllProduce = ko.pureComputed({
        read: function () {
            // Comparing length is quick and is accurate if only items from the
            // main array are added to the selected array.
            return this.selectedProduce().length === this.produce.length;
        },
        write: function (value) {
            this.selectedProduce(value ? this.produce.slice(0) : []);
        },
        owner: this
    });
}