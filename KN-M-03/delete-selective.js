// db wählen
use fc_muster;

// Spieler IDs Testen
const alleSpielder = db.spieler.find({}, { _id: 1 }).toArray();
const id1 = alleSpielder[0]._id;
const id2 = alleSpielder[1]._id;
const id3 = alleSpielder[2]._id;

// deleteOne() mit _id-Filter
db.spieler.deleteOne({ _id: id1 });
print("Nach deleteOne - Spieler noch vorhanden:", db.spieler.countDocuments());

// deleteMany() mit ODER auf mehreren _id's - nicht alle löschen!
// Noch 4 Spieler vorhanden, wir löschen 2 
db.spieler.deleteMany({
    $or: [
        { _id: id2 },
        { _id: id3 }
    ]
});
print("Nach deleteMany - Spieler noch vorhanden:", db.spieler.countDocuments());
