function do_whiskers(vacances, pas_vacances){

  var data_pas_vacances = [
    {x: "lundi", low: pas_vacances[0][0], q1: pas_vacances[0][1], median: pas_vacances[0][2], q3: pas_vacances[0][3], high: pas_vacances[0][4]},
    {x: "mardi", low: pas_vacances[1][0], q1: pas_vacances[1][1], median: pas_vacances[1][2], q3: pas_vacances[1][3], high: pas_vacances[1][4]},
    {x: "mercredi", low: pas_vacances[2][0], q1: pas_vacances[2][1], median: pas_vacances[2][2], q3: pas_vacances[2][3], high: pas_vacances[2][4]},
    {x: "jeudi", low: pas_vacances[3][0], q1: pas_vacances[3][1], median: pas_vacances[3][2], q3: pas_vacances[3][3], high: pas_vacances[3][4]},
    {x: "vendredi", low: pas_vacances[4][0], q1: pas_vacances[4][1], median: pas_vacances[4][2], q3: pas_vacances[4][3], high: pas_vacances[4][4]},
    {x: "samedi", low: pas_vacances[5][0], q1: pas_vacances[5][1], median: pas_vacances[5][2], q3: pas_vacances[5][3], high: pas_vacances[5][4]},
    {x: "dimanche", low: pas_vacances[6][0], q1: pas_vacances[6][1], median: pas_vacances[6][2], q3: pas_vacances[6][3], high: pas_vacances[6][4]}
  ];

  var data_vacances = [
    {x: "lundi", low: vacances[0][0], q1: vacances[0][1], median: vacances[0][2], q3: vacances[0][3], high: vacances[0][4]},
    {x: "mardi", low: vacances[1][0], q1: vacances[1][1], median: vacances[1][2], q3: vacances[1][3], high: vacances[1][4]},
    {x: "mercredi", low: vacances[2][0], q1: vacances[2][1], median: vacances[2][2], q3: vacances[2][3], high: vacances[2][4]},
    {x: "jeudi", low: vacances[3][0], q1: vacances[3][1], median: vacances[3][2], q3: vacances[3][3], high: vacances[3][4]},
    {x: "vendredi", low: vacances[4][0], q1: vacances[4][1], median: vacances[4][2], q3: vacances[4][3], high: vacances[4][4]},
    {x: "samedi", low: vacances[5][0], q1: vacances[5][1], median: vacances[5][2], q3: vacances[5][3], high: vacances[5][4]},
    {x: "dimanche", low: vacances[6][0], q1: vacances[6][1], median: vacances[6][2], q3: vacances[6][3], high: vacances[6][4]}
  ];

  // create a chart
  chart = anychart.box();

  // create a box series and set the data
  vacswag = chart.box(data_vacances);
  vacswag.name("Vacances");
  workpaswag = chart.box(data_pas_vacances);
  workpaswag.name("Travail");

  vacswag.whiskerWidth(30);

  workpaswag.whiskerWidth(30);

  var title = chart.title("Box Chart: Appearance");

  chart.legend(true);

  vacswag.fill("#098756", 0.4);
  workpaswag.fill("#4589BF", 0.7);

  // set the container id
  chart.container("container");

  // initiate drawing the chart
  chart.draw();
}
