import bottle
import tickets

@bottle.route("/")
def any_name():
    return bottle.static_file("index.html", root="")
    
@bottle.route("/map.js")
def another_name():
    return bottle.static_file("map.js", root = "")
    
@bottle.route("/tickets")
def another1_name():
    return tickets.get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json")

bottle.run(host="0.0.0.0",port=8080,debug=True)