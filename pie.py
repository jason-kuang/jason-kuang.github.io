import json
import urllib.request


def get_chart_data(jURL):
    likeTest = []
    M = 0
    B = 0
    Q = 0
    Br = 0
    S = 0
    pString = urllib.request.urlopen(jURL)
    parsed = json.loads(pString.read().decode())
    for nests in parsed:
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
        likeTest = [M, B, Q, Br, S]
        return likeTest
