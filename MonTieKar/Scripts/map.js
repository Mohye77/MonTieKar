var map;
var squares;

function initMap() {
    var geocoder = new google.maps.Geocoder();
    var location = "Paris, France";
    var LatStart = 48.901736;
    var LongStart = 2.227392;
    var LongDelta = 0.012085;
    var LatDelta = -0.0041787;
    map = new google.maps.Map(document.getElementById('map'), {});

    geocoder.geocode({ 'address': location }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(12);
        } else {
            console.log("Could not find location: " + location);
        }
    });

    //var rectangleMaster = new google.maps.Rectangle({
    //    strokeColor: '#FF0000',
    //    strokeOpacity: 0.8,
    //    strokeWeight: 2,
    //    //fillColor: '#FF0000',
    //    fillOpacity: 0,
    //    map: map,
    //    bounds: {
    //        north: 48.901736,
    //        south: 48.818163,
    //        east: 2.470568,
    //        west: 2.224989
    //    }
    //});

    squares = [];
    for (var x = 0; x < 20; x++) {
        squares[x] = new Array(20);
        for (var y = 0; y < 20; y++) {
            squares[x][y] =
                new google.maps.Rectangle({
                    strokeWeight: 0,
                    fillColor: '#00FF00',
                    fillOpacity: 0.3,
                    map: map,
                    bounds: {
                        west: LongStart + x * LongDelta,
                        east: LongStart + LongDelta * (x + 1),
                        north: LatStart + y * LatDelta,
                        south: LatStart + LatDelta * (y + 1)
                    }
                });
        }
    }
}

function ShowSquares(data) {
    if (data && data.MappedCriteria && data.MappedCriteria.length > 0) {
        var goodSquare = '#33dd33';
        var acceptableSquare = '#dd8833';
        var badSquare = '#dd3333';

        for (var i = 0; i < data.MappedCriteria.length; i++) {
            var rectangle = squares[data.MappedCriteria[i].Coords.Longitude][data.MappedCriteria[i].Coords.Longitude];
            if (true)//data.MappedCriteria[i].CriteriaNumber )
                rectangle.fillColor = goodSquare;
        }
    } else {
        console.log('No criteria to display');
    }
}