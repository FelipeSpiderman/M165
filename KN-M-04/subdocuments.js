use fc_muster;

// Die Mannschaft-Collection hat eingebettete Spiele als Array
// Das ist das Unterdokument auf dem wir arbeiten

// ─────────────────────────────────────────────
// Abfrage 1: Nur einzelne Felder der Unterdokumente ausgeben
// Nicht das ganze spiele-Array, nur Gegner und Ergebnis
// ─────────────────────────────────────────────
print("=== Abfrage 1: Einzelne Felder der Unterdokumente ===");
db.mannschaft.find(
    {},
    {
        _id: 0,
        name: 1,
        "spiele.gegner": 1,
        "spiele.ergebnis": 1
    }
);

// ─────────────────────────────────────────────
// Abfrage 2: Nach Feldern von Unterdokumenten filtern
// Alle Mannschaften die ein Spiel mit Ergebnis "3:1" haben
// ─────────────────────────────────────────────
print("=== Abfrage 2: Filter auf Unterdokument-Feld ===");
db.mannschaft.find(
    { "spiele.ergebnis": "3:1" },
    { name: 1, "spiele.$": 1, _id: 0 }
);

// ─────────────────────────────────────────────
// Abfrage 3: $unwind - Array "verflachen"
// Aus einem Mannschaft-Dokument mit mehreren Spielen
// werden mehrere Dokumente (eines pro Spiel)
// ─────────────────────────────────────────────
print("=== Abfrage 3: $unwind ===");
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
