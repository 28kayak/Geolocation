/**
 * Created by kaya on 10/20/16.
 */
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'),
        {
            zoom:8,
            center: {lat:40.731,  lng: -73.997}
        });
    var geocoder = new google.maps.Geocoder;
    var infowindow =new google.maps.InfoWindow;
    document.getElementById('submit').addEventListener('click', function () {
        geocodeLatLng(geocoder, map, infowindow);
    });
}