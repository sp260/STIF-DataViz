from flask import Flask, request, render_template, jsonify
from flask_restful import Resource, Api
import json

app = Flask(__name__)
api = Api(app)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/stations")
def get_stations():
    with open('../data/juindata.json') as json_data:
        juind = json.load(json_data)
    stations = sorted(list(set(map(lambda x: x['station'], juind))))
    return render_template('stations.html', stations=stations)

@app.route("/stations/<string:station_name>")
def get_station(station_name):
    with open('../data/janvierdata.json') as januarydata:
        januaryd = json.load(januarydata)
    jrstations = list(filter(lambda x: x['station'] == station_name, januaryd))
    jrdates = list(map(lambda x: x['date'][-2:], jrstations))

    with open('../data/juindata.json') as junedata:
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
