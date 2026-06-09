// Aufräumen und Daten neu laden - insert-data.js zuerst ausführen!
use fc_muster;

// ─────────────────────────────────────────────
// updateOne() mit _id auf Collection: spieler
// ─────────────────────────────────────────────
const spieler = db.spieler.findOne({ name: "Hans Muster" });
db.spieler.updateOne(
    { _id: spieler._id },
    { $set: { gehalt: 90000.00, alter: 26 } }
);
print("updateOne - Hans Muster nach Update:");
db.spieler.findOne({ name: "Hans Muster" }, { name: 1, gehalt: 1, alter: 1 });

// ─────────────────────────────────────────────
// updateMany() mit ODER, ohne _id auf Collection: trainer
// Ändert Erfahrung aller Trainer die Taktik oder Kondition machen
// ─────────────────────────────────────────────
db.trainer.updateMany(
    {
        $or: [
            { spezialisierung: "Taktik" },
            { spezialisierung: "Kondition" }
        ]
    },
    { $inc: { erfahrung: 1 } }
);
print("updateMany - Trainer nach Update (Erfahrung +1):");
db.trainer.find({}, { name: 1, erfahrung: 1, _id: 0 }).pretty();

// ─────────────────────────────────────────────
// replaceOne() auf Collection: mannschaft
// Ersetzt das komplette Dokument
// ─────────────────────────────────────────────
const junioren = db.mannschaft.findOne({ kategorie: "Junioren" });
db.mannschaft.replaceOne(
    { _id: junioren._id },
    {
        _id: junioren._id,
        name: "FC Muster Junioren B",
        kategorie: "Junioren",
        liga: "U18",
        trainerId: junioren.trainerId,
        spiele: []
    }
);
print("replaceOne - Mannschaft nach Replace:");
db.mannschaft.findOne({ kategorie: "Junioren" });
