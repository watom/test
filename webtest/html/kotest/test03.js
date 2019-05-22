var ClickCounterViewModel = function () {
    this.aaa = ko.observable(0);

    this.registerClick = function () {
        this.aaa(this.aaa() + 1);
    };

    this.resetClicks = function () {
        this.aaa(0);
    };

    this.hasClickedTooManyTimes = ko.pureComputed(function () {
        return this.aaa() >= 3;
    }, this);
};