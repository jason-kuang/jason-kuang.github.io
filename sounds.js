function basicSynth() {
    var synth = new Tone.Synth().toMaster()
    return synth;
}

function playNote(synth,note,duration,time) {
    var synth = new Tone.Synth().toMaster()
    time = time/4
    synth.triggerAttackRelease(note,duration,time)
}

function playSong(synth, arrayNotes) {
    for (x in arrayNotes) {
        note = arrayNotes[x]["note"]
        duration = arrayNotes[x]["duration"]
        time = arrayNotes[x]["time"]
        playNote(synth,note,duration,time)
}
}
dict = [{"note":"G3","duration":"8n","time":5},{"note":"G3","duration":"8n","time":5.66},{"note":"G3","duration":"8n","time":6.33},{"note":"G3","duration":"4n","time":7},{"note":"E3","duration":"4n","time":9},{"note":"F3","duration":"4n","time":11},{"note":"G3","duration":"8n","time":13},{"note":"F3","duration":"8n","time":14.33},{"note":"G3","duration":"2n","time":15}] 
playSong(basicSynth(),[{"note":"G3","duration":"8n","time":5},{"note":"G3","duration":"8n","time":5.66},{"note":"G3","duration":"8n","time":6.33},{"note":"G3","duration":"4n","time":7},{"note":"E3","duration":"4n","time":9},{"note":"F3","duration":"4n","time":11},{"note":"G3","duration":"8n","time":13},{"note":"F3","duration":"8n","time":14.33},{"note":"G3","duration":"2n","time":15}] )
