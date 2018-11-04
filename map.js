//pk.eyJ1Ijoiamt1YW5nNSIsImEiOiJjam5qZWZjNGUwNzkzM3Bub3IwZmVxMmR2In0.5FY1YakEHS_4DtGAWjG1Hg'
function setupMapData(inputArray) {
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
    size:5,
    color:"rgb(255,0,0)"
  },
  text:description
}];
    return data;
}


function findCenter(inputArrays) {
    var latitudes = [];
    var longitudes = [];
    var description = [];
    var returnedArray = [];
    for (var i = 0; i < inputArrays.length; i++) {
        latitudes.push(inputArrays[i][0]);
    }
    for (var x = 0; x < inputArrays.length; x++) {
        longitudes.push(inputArrays[x][1]);
    }
    for (var c = 0; c < inputArrays.length; c++) {
        description.push(inputArrays[c][2]);
}
    var maxLatitude = Math.max(...latitudes);
    var maxLongitude = Math.max(...longitudes);
    var lowLatitude = Math.min(...latitudes);
    var lowLongitude = Math.min(...longitudes);
    returnedArray.push((maxLatitude + lowLatitude)/2);
    returnedArray.push((maxLongitude + lowLongitude)/2);
    return returnedArray;
}


function setupMapLayout(inputArray) {
   var centers = findCenter(inputArray);
    var layout = {
  autosize: true,
  hovermode:'closest',
  mapbox: {
    style: "satellite-streets",
    bearing:0,
    center: {
      lat:centers[0],
      lon:centers[1]
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
    return object
}

function loadMap() {
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1Ijoiamt1YW5nNSIsImEiOiJjam5qZWZjNGUwNzkzM3Bub3IwZmVxMmR2In0.5FY1YakEHS_4DtGAWjG1Hg'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send();

}

