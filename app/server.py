from flask import Flask, request, render_template, jsonify
from flask_restful import Resource, Api
from pathlib import Path
import datetime
import json

app = Flask(__name__)
api = Api(app)
data_folder = Path(__file__).resolve().parents[1] / "data/"

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/stations")
def get_stations():
    file_to_read = data_folder / "stations_location.json"
    with open(str(file_to_read)) as json_data:
        lstationsd = json.load(json_data)
    lstations = list(map(lambda x: (x['nom'],x['geo']), lstationsd))

    file_to_read = data_folder / "janvierdata.json"
    with open(str(file_to_read)) as json_data:
        jrstationsd = json.load(json_data)
    jrstations = list(set(map(lambda x: x['station'], jrstationsd)))

    stations = sorted(list(filter(lambda x: x[0] in jrstations, lstations)))
    locations = []
    for (s,l) in stations:
        loc = list(map(float, l.split(',')))
        id = ''.join(e for e in s if e.isalnum())
        locations.append((s,loc,id))

    lines = {}
    name = ''
    if 'station' in request.args:
        name = request.args.get('station')
        file_to_read = data_folder / "lines.json"
        with open(str(file_to_read)) as json_data:
            linesd = json.load(json_data)

        for line in linesd:
            if request.args.get('station') in line['nom']:
                lines[line['ligne']] = []
                for i, s in enumerate(line['nom']):
                    lines[line['ligne']].append((line['nom'][i],line['geo'][i]))

    return render_template('stations.html', stations=locations, lines=lines, name=name)

@app.route("/stations/<string:station_name>")
def get_station(station_name):
    swag = request.args.get('style', default="bar")
    super_swag = request.args.get('vacs', default="full")
    if swag != "bar" and swag != "line" and swag != "stache":
        swag = "bar"

    file_to_read = data_folder / "janvierdata.json"
    with open(str(file_to_read)) as januarydata:
        januaryd = json.load(januarydata)
    jrstations = list(filter(lambda x: x['station'] == station_name, januaryd))
    #jrdates = list(map(lambda x: x['date'][-2:], jrstations))

    file_to_read = data_folder / "juindata.json"
    with open(str(file_to_read)) as junedata:
        juned = json.load(junedata)
    jnstations = list(filter(lambda x: x['station'] == station_name, juned))
    #jndates = list(map(lambda x: x['date'][-2:], jnstations))

    #Intersection : We don't have the same dates for January and June
    #dates = list(filter(lambda x: x in jrdates, jndates))
    #jrnumbers = list(map(lambda x: x['number'], list(filter(lambda x: x['date'][-2:] in dates, jrstations))))
    #jnnumbers = list(map(lambda x: x['number'], list(filter(lambda x: x['date'][-2:] in dates, jnstations))))

    if swag == "stache" :
        if super_swag != "full" and super_swag != "both" :
            super_swag = "full"

        to_work = data_folder / "work.json"
        to_vacs = data_folder / "holidays.json"
        to_full = data_folder / "full_year.json"

        vacs_file = open(str(to_vacs), 'r')
        work_file = open(str(to_work), 'r')
        full_file = open(str(to_full), 'r')

        vacs = json.load(vacs_file)
        work = json.load(work_file)
        full = json.load(full_file)

        if super_swag == "full" :
            dico = full[station_name]
            data = {'station' : station_name, 'style' : swag, 'super_style' : super_swag, 'dico' : dico}
        else :
            dicowork = work[station_name]
            dicovacs = vacs[station_name]
            data = {'station' : station_name, 'style' : swag, 'super_style' : super_swag, 'dico_vac' : dicovacs, 'dico_work' : dicowork}

        return render_template('station.html', data=data)

    else :
        jrvalues = [0, 0, 0, 0, 0, 0, 0]
        jrnb = [0, 0, 0, 0, 0, 0, 0]
        for x in jrstations:
            date = x['date'].split('-')
            day = int(date[2])
            month = int(date[1])
            year = int(date[0])
            d = datetime.date(year,month,day).weekday()
            jrvalues[d] += x['number']
            jrnb[d] += 1

        jnvalues = [0, 0, 0, 0, 0, 0, 0]
        jnnb = [0, 0, 0, 0, 0, 0, 0]
        for x in jnstations:
            date = x['date'].split('-')
            day = int(date[2])
            month = int(date[1])
            year = int(date[0])
            d = datetime.date(year,month,day).weekday()
            jnvalues[d] += x['number']
            jnnb[d] += 1

        days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
        jrvalues = [int(v/jrnb[i]) for i, v in enumerate(jrvalues)]
        jnvalues = [int(v/jnnb[i]) for i, v in enumerate(jnvalues)]

        data = {'station': station_name, 'dates': days, 'jrNB': jrvalues, 'jnNB': jnvalues, 'style': swag}

        return render_template('station.html', data=data)

"""
@app.route("/lignes")
def get_ligne() :
"""


if __name__ == '__main__':
    app.run(port=8080, debug=True)
