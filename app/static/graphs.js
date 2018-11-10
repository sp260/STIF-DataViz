
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