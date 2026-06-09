use fc_muster;

// $lookup: mannschaft mit trainer verknüpfen
// Felder aus beiden Collections müssen im Resultat sein
print("=== $lookup: Mannschaft + Trainer ===");
db.mannschaft.aggregate([
    {
        $lookup: {
            from: "trainer",
            localField: "trainerId",
            foreignField: "_id",
            as: "trainer_info"
        }
    },
    // $unwind macht aus dem Array ein einzelnes Objekt
    { $unwind: "$trainer_info" },
    {
        $project: {
            _id: 0,
            mannschaft: "$name",
            liga: 1,
            kategorie: 1,
            "trainer_info.name": 1,
            "trainer_info.spezialisierung": 1,
            "trainer_info.erfahrung": 1
        }
    },
    // Nachfilterung: nur Mannschaften mit Trainer der mehr als 5 Jahre Erfahrung hat
    { $match: { "trainer_info.erfahrung": { $gt: 5 } } },
    { $sort: { "trainer_info.erfahrung": -1 } }
]);
