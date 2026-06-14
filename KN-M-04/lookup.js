use fc_muster;

// Mannschaft mit zugehörigem Trainer verknüpfen via $lookup
// beide Collections brauchen Felder im Output
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
    // $unwind weil trainer_info sonst ein Array ist
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
    // nur Trainer mit mehr als 5 Jahren Erfahrung
    { $match: { "trainer_info.erfahrung": { $gt: 5 } } },
    { $sort: { "trainer_info.erfahrung": -1 } }
]);
