// Aufräumen und Daten neu laden - insert-data.js zuerst ausführen!
use fc_muster;

// ─────────────────────────────────────────────
// Collection: spieler
// ─────────────────────────────────────────────

// eine Abfrage
print("=== Alle Spieler ===");
db.spieler.find().pretty();

// Spieler geboren nach dem 01.01.2000
print("=== Spieler geboren nach 2000 ===");
db.spieler.find({ geburtsdatum: { $gt: ISODate("2000-01-01T00:00:00Z") } }).pretty();

// ODER-Verknüpfung (nicht auf _id): Position Stürmer / Tor
print("=== Spieler mit Position Stürmer oder Tor ===");
db.spieler.find({
    $or: [
        { position: "Stürmer" },
        { position: "Tor" }
    ]
}).pretty();

// Teilstring im Namen suchen (Regex)
print("=== Spieler mit 'er' im Namen ===");
db.spieler.find({ name: { $regex: "er", $options: "i" } }).pretty();

// Projektion MIT _id: nur Name, Position und _id
print("=== Projektion mit _id ===");
db.spieler.find({}, { name: 1, position: 1, _id: 1 }).pretty();

// Projektion OHNE _id
print("=== Projektion ohne _id ===");
db.spieler.find({}, { name: 1, position: 1, _id: 0 }).pretty();

// ─────────────────────────────────────────────
// Collection: mannschaft
// ─────────────────────────────────────────────

// eine Abfrage
print("=== Alle Mannschaften ===");
db.mannschaft.find().pretty();

// UND-Verknüpfung (andere Collection als ODER!): Liga 2. Liga UND Kategorie Senioren
print("=== Senioren in der 2. Liga ===");
db.mannschaft.find({
    $and: [
        { liga: "2. Liga" },
        { kategorie: "Senioren" }
    ]
}).pretty();

// ─────────────────────────────────────────────
// Collection: trainer
// ─────────────────────────────────────────────

// eine Abfrage
print("=== Alle Trainer ===");
db.trainer.find().pretty();
