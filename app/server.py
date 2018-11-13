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
    return render_template('stations.html', stations=locations)

@app.route("/stations/<string:station_name>")
def get_station(station_name):
    swag = request.args.get('style', default="bar")
    if swag != "bar" and swag != "line" :
        swag = "bar"

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

    data = {'station': station_name, 'dates': dates, 'jrNB': jrnumbers, 'jnNB': jnnumbers, 'style': swag}
    return render_template('station.html', data=data)

"""
@app.route("/lignes")
def get_ligne() :
"""


if __name__ == '__main__':
    app.run(port=8080, debug=True)
