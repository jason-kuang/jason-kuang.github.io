//pk.eyJ1Ijoiamt1YW5nNSIsImEiOiJjam5qZWZjNGUwNzkzM3Bub3IwZmVxMmR2In0.5FY1YakEHS_4DtGAWjG1Hg'
//asasas

function setupMapData(inputArray)
{
    var latitudes = [];
    var longitudes = [];
    var description = [];
    for (var i = 0; i < inputArray.length; i++) {
        latitudes.push(inputArray[i][0]);
    }
    for (var x = 0; x < inputArray.length; x++) {
        longitudes.push(inputArray[x][1]);
    }
    for (var c = 0; c < inputArray.length; c++) {
        description.push(inputArray[c][2]);
}

        var data = [{
  type:"scattermapbox",
  lat:latitudes,
  lon:longitudes,
  mode:"markers",
  marker: {
    size:8,
    color:"rgb(220,20,60)"
  },
  text:description
}];
    return data;
}


function setupMapLayout(inputArray) {
    var layout = {
  autosize: true,
  hovermode:'closest',
  mapbox: {
    style: "satellite-streets",
    bearing:0,
    center: {
      lat:40.748817,
      lon:-73.985428
    },
    pitch:0,
    zoom:11
  },
};
return layout;
}

function getMapParams(jString) {
    var parsed = JSON.parse(jString);
    var layout = setupMapLayout(parsed);
    var data = setupMapData(parsed);
    var object = {"data":data,"layout":layout};
    return object;
}

function getChartParams(jString) {
    var parsed = JSON.parse(jString);
    var theData = parsed[parsed.length - 1];
    var object = {};
        var data = [{
  values: theData, //  [47, 34, 48, 64, 20] [M, B, Q, Br, S]
  labels: ['Manhattan','Brooklyn','Queens','Bronx','Staten Island'],
  type: 'pie'
}];

    var layout = {
  title: "Number of Fire Department Buildings by Boroughs",
  height: 600,
  width: 800
};
    var object = {"data":data,"layout":layout};
    return object;
}

function loadMap() {
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1Ijoiamt1YW5nNSIsImEiOiJjam5qZWZjNGUwNzkzM3Bub3IwZmVxMmR2In0.5FY1YakEHS_4DtGAWjG1Hg'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            var chartParams = getChartParams(this.response);
            Plotly.plot('map2', chartParams.data, chartParams.layout);
            Plotly.plot('map', mapParams.data, mapParams.layout);

        }
    };
    xhttp.open("GET", "/process");
    xhttp.send();

}


