import bottle
import process
import pie
import json
import chat


@bottle.route("/")
def any_name():
    return bottle.static_file("index.html", root="")


@bottle.route("/map.js")
def another_name():
    return bottle.static_file("map.js", root="")


@bottle.route("/process")
def another1_name():
    return process.get_ticket_data("https://data.cityofnewyork.us/resource/byk8-bdfw.json")


@bottle.route("/pie")
def another2_name():
    return pie.get_chart_data("https://data.cityofnewyork.us/resource/byk8-bdfw.json")


@bottle.post('/send')
def do_chat():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    chat.add_message(content['message'])
    return json.dumps(chat.get_chat())


@bottle.route('/chat')
def get_chat():
    return json.dumps(chat.get_chat())


@bottle.route('/chat.js')
def static():
    return bottle.static_file("chat.js", root="")


bottle.run(host="0.0.0.0", port=8080, debug=True)