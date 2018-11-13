function bar_chart(station, dates, jrNB, jnNB, style){
    new Chart(document.getElementById("myChart"), {
        type: style,
        data: {
          labels: dates,
          datasets: [
            {
              label: "Janvier",
              backgroundColor: "#3e95cd",
              borderColor: "#3e95cd",
              data: jrNB,
              fill: false
            }, {
              label: "Juin",
              backgroundColor: "#8e5ea2",
              borderColor: "#8e5ea2",
              data: jnNB,
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Nombre de passagers par jour à '+ station
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                    display: true,
                    labelString: "Nombre de passagers"
                }
            }],
            xAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: "Jour du mois"
              }
            }]
          }
        }
    });
}
