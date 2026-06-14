use fc_muster;

// Das AND aus KN-03 mit $match nachbilden
// db.mannschaft.find({ $and: [{ liga: "2. Liga" }, { kategorie: "Senioren" }] })
// hier mit zwei separaten $match-Stages
print("=== Aggregation 1: zwei $match stages ===");
db.mannschaft.aggregate([
    { $match: { liga: "2. Liga" } },
    { $match: { kategorie: "Senioren" } }
]);

// Spieler ab 20 Jahren, sortiert nach Gehalt
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

// wie viele Spieler pro Position
print("=== Aggregation 3: Spieler pro Position ===");
db.spieler.aggregate([
    {
        $group: {
            _id: "$position",
            anzahl: { $sum: 1 }
        }
    }
]);

// Gesamtgehalt und Durchschnitt pro Position
print("=== Aggregation 4: Gehalt pro Position ===");
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
