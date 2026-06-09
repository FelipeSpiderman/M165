db = db.getSiblingDB("fc_muster");

// updateOne() mit _id auf Collection: spieler
const spieler = db.spieler.findOne({ name: "Nico Huber" });
db.spieler.updateOne(
    { _id: spieler._id },
    { $set: { gehalt: 90000.0, alter: 26 } }
);
print("updateOne - Nico Huber nach Update:");
printjson(db.spieler.findOne({ name: "Nico Huber" }, { name: 1, gehalt: 1, alter: 1 }));

// updateMany() mit ODER, ohne _id auf Collection: trainer
db.trainer.updateMany(
    { $or: [{ spezialisierung: "Taktik" }, { spezialisierung: "Kondition" }] },
    { $inc: { erfahrung: 1 } }
);
print("updateMany - Trainer nach Update (Erfahrung +1):");
db.trainer.find({}, { name: 1, erfahrung: 1, _id: 0 }).forEach(printjson);

// replaceOne() auf Collection: mannschaft
const junioren = db.mannschaft.findOne({ kategorie: "Junioren" });
db.mannschaft.replaceOne(
    { _id: junioren._id },
    {
        name: "FC Muster Junioren B",
        kategorie: "Junioren",
        liga: "U18",
        trainerId: junioren.trainerId,
        spiele: []
    }
);
print("replaceOne - Mannschaft nach Replace:");
printjson(db.mannschaft.findOne({ kategorie: "Junioren" }));