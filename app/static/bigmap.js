var mybigmap = new L.map('bigmapid').setView([48.866667, 2.333333], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3AyNjAiLCJhIjoiY2pvYmdkZ2FqMTM4eTNrb3hjeWtscGd3YSJ9.7ssTMgSANp8_iggwgQnr-Q'
}).addTo(mybigmap);

/*var paris = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            coordsToLatLngs([[3579,6557],[3180,6729],[3079,6693],[3036,6843],[3070,6970],[3151,7105],[3246,7221],[3816,7216],[3893,7183],[4010,7021],[4086,6961],[4316,6882],[4272,6695],[4230,6585],[4157,6542],[3579,6557]])
        ]]
    }
}];

L.geoJSON(paris, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(mybigmap);

*/
coord = [[3579,6557],[3180,6729],[3079,6693],[3036,6843],[3070,6970],[3151,7105],[3246,7221],[3816,7216],[3893,7183],[4010,7021],[4086,6961],[4316,6882],[4272,6695],[4230,6585],[4157,6542],[3579,6557]]