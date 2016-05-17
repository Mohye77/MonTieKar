﻿function FilterModel(name, operator, score) {
    var self = this;
    self.Name = ko.observable(name || '');
    self.Operator = ko.observable(operator || 'eq');
    self.Score = ko.observable(score || 5);

    return self;
}

function HomeViewModel(app, dataModel) {
    var self = this;

    var filters = [
        new FilterModel('cafe'),
        new FilterModel('velib'),
        new FilterModel('cine'),
        new FilterModel('arbre')
    ];

    self.Filters = ko.observableArray(filters);

    self.GetTotalScores = function () {
        var totalScores = 0;
        $.each(self.Filters(), function (index, filter) {
            totalScores += filter.Score();
        });
        return totalScores;
    };

    self.GetData = function () {
        // Make a call to the protected Web API by passing in a Bearer Authorization Header
        $.ajax({
            method: 'POST',
            url: app.dataModel.mapUrl,
            data: "{ Filters: " + ko.toJSON(self.Filters) +"}",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
           
            success: function (data) {
                ShowSquares(data, self.GetTotalScores());
            }
        });
        return false;
    };

    Sammy(function () {
        this.get('#home', function () {
            //self.GetData();
        });
        this.get('/', function () { this.app.runRoute('get', '#home') });
    });

    return self;
}

app.addViewModel({
    name: "Home",
    bindingMemberName: "home",
    factory: HomeViewModel
});
