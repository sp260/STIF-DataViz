from flask import Flask, request, render_template, jsonify
from flask_restful import Resource, Api
from pathlib import Path
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
        stationsd = json.load(json_data)
    stations = sorted(list(map(lambda x: (x['nom'],x['geo']), stationsd)))
    locations = []
    for (s,l) in stations:
        loc = list(map(float, l.split(',')))
        locations.append((s,loc))
    return render_template('stations.html', stations=locations)

@app.route("/stations/<string:station_name>")
def get_station(station_name):
    file_to_read = data_folder / "janvierdata.json"
    with open(str(file_to_read)) as januarydata:
        januaryd = json.load(januarydata)
    jrstations = list(filter(lambda x: x['station'] == station_name, januaryd))
    jrdates = list(map(lambda x: x['date'][-2:], jrstations))

    file_to_read = data_folder / "juindata.json"
    with open(str(file_to_read)) as junedata:
        juned = json.load(junedata)
    jnstations = list(filter(lambda x: x['station'] == station_name, juned))
    jndates = list(map(lambda x: x['date'][-2:], jnstations))

    #Intersection : We don't have the same dates for January and June
    dates = list(filter(lambda x: x in jrdates, jndates))
    jrnumbers = list(map(lambda x: x['number'], list(filter(lambda x: x['date'][-2:] in dates, jrstations))))
    jnnumbers = list(map(lambda x: x['number'], list(filter(lambda x: x['date'][-2:] in dates, jnstations))))

    data = {'station': station_name, 'dates': dates, 'jrNB': jrnumbers, 'jnNB': jnnumbers}
    return render_template('station.html', data=data)

if __name__ == '__main__':
    app.run(port=8080, debug=True)
