var map;

function initMap() {
    var geocoder = new google.maps.Geocoder();
    var location = "Paris, France";

    map = new google.maps.Map(document.getElementById('map'), {});

    geocoder.geocode({ 'address': location }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(12,8);
        } else {
            alert("Could not find location: " + location);
        }
    });

}