function bar_chart(station, dates, jrNB, jnNB){
    new Chart(document.getElementById("myChart"), {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [
            {
              label: "Janvier",
              backgroundColor: "#3e95cd",
              data: jrNB
            }, {
              label: "Juin",
              backgroundColor: "#8e5ea2",
              data: jnNB
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Nombre de passager par jour à '+station
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
          }
        }
    });
}

var mymap = L.map('mapid').setView([48.866667, 2.333333], 10);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3AyNjAiLCJhIjoiY2pvYmdkZ2FqMTM4eTNrb3hjeWtscGd3YSJ9.7ssTMgSANp8_iggwgQnr-Q'
}).addTo(mymap);

var marker = L.marker([48.866667, 2.333333]).addTo(mymap);
marker.bindPopup("Paris");
marker.on('mouseover', function (e) {
    this.openPopup();
});
marker.on('mouseout', function (e) {
    this.closePopup();
});
