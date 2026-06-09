use fc_muster;

// ─────────────────────────────────────────────
// Aggregation 1: Das AND aus KN-03 mit $match nachbilden
// In KN-03 hatte ich: db.mannschaft.find({ $and: [{ liga: "2. Liga" }, { kategorie: "Senioren" }] })
// Hier mache ich das gleiche aber mit zwei separaten $match stages
// ─────────────────────────────────────────────
print("=== Aggregation 1: Zwei $match stages (entspricht AND aus KN-03) ===");
db.mannschaft.aggregate([
    { $match: { liga: "2. Liga" } },
    { $match: { kategorie: "Senioren" } }
]);

// ─────────────────────────────────────────────
// Aggregation 2: $match + $project + $sort (mehrere Resultate)
// ─────────────────────────────────────────────
print("=== Aggregation 2: $match + $project + $sort ===");
db.spieler.aggregate([
    { $match: { alter: { $gte: 20 } } },
    {
        $project: {
            _id: 0,
            name: 1,
            alter: 1,
            gehalt: 1,
            position: 1
        }
    },
    { $sort: { gehalt: -1 } }
]);

// ─────────────────────────────────────────────
// Aggregation 3: $sum zum Zählen - wie viele Spieler pro Position
// ─────────────────────────────────────────────
print("=== Aggregation 3: $sum - Spieler pro Position ===");
db.spieler.aggregate([
    {
        $group: {
            _id: "$position",
            anzahl: { $sum: 1 }
        }
    }
]);

// ─────────────────────────────────────────────
// Aggregation 4: $group - Gesamtgehalt und Durchschnitt pro Position
// ─────────────────────────────────────────────
print("=== Aggregation 4: $group mit $sum auf Feld ===");
db.spieler.aggregate([
    {
        $group: {
            _id: "$position",
            gesamtgehalt: { $sum: "$gehalt" },
            durchschnitt: { $avg: "$gehalt" },
            anzahl: { $sum: 1 }
        }
    },
    { $sort: { gesamtgehalt: -1 } }
]);
