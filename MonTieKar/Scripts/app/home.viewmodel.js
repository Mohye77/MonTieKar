function FilterModel(name, displayName) {
    var self = this;
    self.Name = ko.observable(name || '');
    self.DisplayName = ko.observable(displayName || '');
    self.Operator = ko.observable('gt');
    self.Score = ko.observable(0);
    return self;
}

function HomeViewModel(app, dataModel) {
    var self = this;

    var filters = [
        new FilterModel('cafe', 'Cafés à 1 euro'),
        new FilterModel('velib', 'Vélibs'),
        new FilterModel('cine', 'Cinémas'),
        new FilterModel('arbre', 'Arbres'),
        new FilterModel('wifi', 'Bornes Wi-Fi'),
        new FilterModel('metro', 'Stations métro')
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
        $('#loader').show();
        // Make a call to the protected Web API by passing in a Bearer Authorization Header
        $.ajax({
            method: 'POST',
            url: app.dataModel.mapUrl,
            data: "{ Filters: " + ko.toJSON(self.Filters) +"}",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',

            success: function (data) {
                ShowSquares(data, self.GetTotalScores());
                $('#loader').hide();
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
