/**
 * Created by kaya on 9/22/16.
 */
function geoFindMe()
{
    var output = document.getElementById("out");
    if(!navigator.geolocation)
    {
        output.innerHTML = "<p>Geolocation is not supported by your browser </p>";
        return;
    }
    function success(position)
    {
        var latitued = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = "<p>Latitude is"+ latitued + '° <br>Longitude is  '+  longitude +"° </p>";

        //var img = new Image();
        //img.src = "https://maps.googleapis.com/maps/api/staticmap?center="+latitued+","+longitude+"&zoom=13&siz300x300&sensor=false";
        //output.appendChild(img);
    };
    function error()
    {
        output.innerHTML = "Unable to retrieve your location";
    };
    output.innerHTML = "<p>Locating....</p>";
    navigator.geolocation.getCurrentPosition(success, error);

}

