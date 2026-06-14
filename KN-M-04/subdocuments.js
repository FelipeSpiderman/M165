use fc_muster;

// Mannschaft hat Spiele als eingebettetes Array

// nur Gegner und Ergebnis ausgeben, nicht das ganze Dokument
print("=== Einzelne Felder der Unterdokumente ===");
db.mannschaft.find(
    {},
    {
        _id: 0,
        name: 1,
        "spiele.gegner": 1,
        "spiele.ergebnis": 1
    }
);

// Mannschaften die ein Spiel 3:1 gewonnen haben
print("=== Mannschaften mit Ergebnis 3:1 ===");
db.mannschaft.find(
    { "spiele.ergebnis": "3:1" },
    { name: 1, "spiele.$": 1, _id: 0 }
);

// $unwind: aus einem Dokument mit mehreren Spielen werden mehrere Dokumente
print("=== $unwind – ein Dokument pro Spiel ===");
db.mannschaft.aggregate([
    { $unwind: "$spiele" },
    {
        $project: {
            _id: 0,
            mannschaft: "$name",
            gegner: "$spiele.gegner",
            ergebnis: "$spiele.ergebnis",
            datum: "$spiele.datum"
        }
    },
    { $sort: { datum: 1 } }
]);
