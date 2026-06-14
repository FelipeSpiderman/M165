// insert-data.js muss zuerst laufen!
use fc_muster;

// alle Spieler
print("=== Alle Spieler ===");
db.spieler.find().pretty();

// Spieler die nach 2000 geboren sind
print("=== Spieler geboren nach 2000 ===");
db.spieler.find({ geburtsdatum: { $gt: ISODate("2000-01-01T00:00:00Z") } }).pretty();

// Position Stürmer oder Tor (ODER-Verknüpfung)
print("=== Stürmer und Torhüter ===");
db.spieler.find({
    $or: [
        { position: "Stürmer" },
        { position: "Tor" }
    ]
}).pretty();

// Namen mit "er" drin (Regex, case-insensitive)
print("=== Spieler mit 'er' im Namen ===");
db.spieler.find({ name: { $regex: "er", $options: "i" } }).pretty();

// Projektion mit _id
print("=== Name + Position (mit _id) ===");
db.spieler.find({}, { name: 1, position: 1, _id: 1 }).pretty();

// gleiche Projektion aber ohne _id
print("=== Name + Position (ohne _id) ===");
db.spieler.find({}, { name: 1, position: 1, _id: 0 }).pretty();

// alle Mannschaften
print("=== Alle Mannschaften ===");
db.mannschaft.find().pretty();

// UND-Verknüpfung: nur Senioren in der 2. Liga
print("=== 2. Liga Senioren ===");
db.mannschaft.find({
    $and: [
        { liga: "2. Liga" },
        { kategorie: "Senioren" }
    ]
}).pretty();

// alle Trainer
print("=== Alle Trainer ===");
db.trainer.find().pretty();
