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

var colors = ["#3e95cd", "#8e5ea2", "#a18800", "#e8c3b9", "#c45850", "#3cba9f", "#a18882", "#6c0000", "#6ca200", "#140051", "#e44d2d", "#d9e42d","#2dbae4", "#2d49e4", "#6c2de4", "#ec1fdf", "#F0F8FF", "#8A2BE2", "#00008B", "#FF7F50", "#DC143C", "#006400", "#FF00FF", "#F08080", "#20B2AA"];
var jsonLines = {};

function jsonConcat(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}

function jsonDelete(o1, o2) {
  for (var key in o2) {
    delete o1[key];
  }
  return o1;
}

function get_datasets(dico){
  var c = 0;
  var table = []
  for (var key in dico) {
    if (dico.hasOwnProperty(key)) {
      table.push({
        data: dico[key],
        label: key,
        borderColor: colors[c],
        fill: false
      })
    }
    c += 1;
  }
  return table;
}

function lineChart(data, action){
  action ? jsonConcat(jsonLines, data) : jsonDelete(jsonLines, data);

  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
      datasets: get_datasets(jsonLines)
    },
    options: {
      title: {
        display: true,
        text: 'Nombre de passagers par ligne'
      }
    }
  });
};

function donut_chart(exploitants, nbrs){
  new Chart(document.getElementById("donut-chart"), {
    type: 'doughnut',
    data: {
      labels: exploitants,
      datasets: [{
        label: "Nombre de stations",
        backgroundColor: ["#c45850", "#3e95cd", "#3cba9f"],
        data: nbrs
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Nombre de station par exploitant'
      }
    }
  });
};

function horizontalBarChart(stations, nbrs){
  new Chart(document.getElementById("bar-chart-horizontal"), {
    type: 'horizontalBar',
    data: {
      labels: stations,
      datasets: [
        {
          label: "Fréquentation par jour ouvré",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: nbrs
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Les stations les plus fréquentées par jour'
      }
    }
});
};

function horizontalBarChartWE(stations, nbrs){
  new Chart(document.getElementById("bar-chart-horizontalWE"), {
    type: 'horizontalBar',
    data: {
      labels: stations,
      datasets: [
        {
          label: "Fréquentation par jour",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: nbrs
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Les stations les plus fréquentées par jour de weekend'
      }
    }
});
};
