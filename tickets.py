import json
import urllib.request

def get_ticket_data(jURL):
    likeTest = []
    pString = urllib.request.urlopen(jURL)
    parsed = json.loads(pString.read().decode())
    for nests in parsed:
        if('latitude' in nests):
            intoLikeTest = []
            intoLikeTest.append(nests['latitude'])
            intoLikeTest.append(nests['longitude'])
            intoLikeTest.append(nests['viodesc'])
            likeTest.append(intoLikeTest)
    return json.dumps(likeTest)