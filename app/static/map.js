var mymap = new L.map('mapid').setView([48.866667, 2.333333], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3AyNjAiLCJhIjoiY2pvYmdkZ2FqMTM4eTNrb3hjeWtscGd3YSJ9.7ssTMgSANp8_iggwgQnr-Q'
}).addTo(mymap);

var marker = new L.marker([48.866667, 2.333333]).addTo(mymap);
marker.bindPopup("Paris");
marker.on('mouseover', function (e) {
    this.openPopup();
});
marker.on('mouseout', function (e) {
    this.closePopup();
});
