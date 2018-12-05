import json
import urllib.request


def get_ticket_data(jURL):
    likeTest = []
    pie = []
    M = 0
    B = 0
    Q = 0
    Br = 0
    S = 0
    pString = urllib.request.urlopen(jURL)
    parsed = json.loads(pString.read().decode())
    for nests in parsed:
        if('latitude' in nests):
            intoLikeTest = []
            intoLikeTest.append(nests['latitude'])
            intoLikeTest.append(nests['longitude'])
            intoLikeTest.append(nests['facilityaddress'])
            if(nests["borough"]) == "Manhattan":
                M += 1
            elif(nests["borough"]) == "Bronx":
                B += 1
            elif(nests["borough"]) == "Brooklyn":
                Br += 1
            elif(nests["borough"]) == "Queens":
                Q += 1
            elif(nests["borough"]) == "Staten Island":
                S += 1
            likeTest.append(intoLikeTest)
    pie = [M, B, Q, Br, S]
    likeTest.append(pie)
    return json.dumps(likeTest)
    #Manhattan has 48
    #Bronx has 34
    #Queens has 50
    #Brooklyn has 66
    #Staten Island has 21
    