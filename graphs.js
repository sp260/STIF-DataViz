
function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

function bar_chart(){
    new Chart(document.getElementById("myChart"), {
        type: 'bar',
        data: {
          labels: ["1900", "1950", "1999", "2050"],
          datasets: [
            {
              label: "Africa",
              backgroundColor: "#3e95cd",
              data: [133,221,783,2478]
            }, {
              label: "Europe",
              backgroundColor: "#8e5ea2",
              data: [408,547,675,734]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
    });
    
}

bar_chart()

json_file = csvJSON("juin_processed.csv");
var x = 260