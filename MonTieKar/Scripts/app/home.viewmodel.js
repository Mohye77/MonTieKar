function FilterModel(name, operator, score) {
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
        new FilterModel('cine')
    ];

    self.Filters = ko.observableArray(filters);

    Sammy(function () {
        this.get('#home', function () {
            // Make a call to the protected Web API by passing in a Bearer Authorization Header
            $.ajax({
                method: 'POST',
                url: app.dataModel.mapUrl,
                data: ko.toJSON({ Filters: self.Filters }),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + app.dataModel.getAccessToken()
                },
                success: function (data) {
                    ShowSquares(data);
                }
            });
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
