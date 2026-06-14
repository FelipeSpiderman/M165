use fc_muster;

// IDs der ersten drei Spieler holen
const alleSpieler = db.spieler.find({}, { _id: 1 }).toArray();
const id1 = alleSpieler[0]._id;
const id2 = alleSpieler[1]._id;
const id3 = alleSpieler[2]._id;

// einen Spieler löschen
db.spieler.deleteOne({ _id: id1 });
print("Nach deleteOne noch vorhanden:", db.spieler.countDocuments());

// zwei weitere löschen (aber nicht alle!)
db.spieler.deleteMany({
    $or: [
        { _id: id2 },
        { _id: id3 }
    ]
});
print("Nach deleteMany noch vorhanden:", db.spieler.countDocuments());
