function MyViewModel() {
    this.acceptedNumericValue = ko.observable(789);
    this.lastInputWasValid = ko.observable(true);

    this.attemptedValue = ko.pureComputed({
        read: this.acceptedNumericValue,
        write: function (value) {
            if (isNaN(value))
                this.lastInputWasValid(false);
            else {
                this.lastInputWasValid(true);
                this.acceptedNumericValue(value); // Write to underlying storage
            }
        },
        owner: this
    });
}