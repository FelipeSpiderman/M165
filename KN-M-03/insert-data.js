use fc_muster;

// Variablen für die ObjectIds - nie hartcodierte Werte
const trainerId1 = new ObjectId();
const trainerId2 = new ObjectId();
const mannschaftId1 = new ObjectId();
const mannschaftId2 = new ObjectId();
const spielerId1 = new ObjectId();
const spielerId2 = new ObjectId();
const spielerId3 = new ObjectId();
const spielerId4 = new ObjectId();
const spielerId5 = new ObjectId();

// insertOne() für trainer
db.trainer.insertOne({
    _id: trainerId1,
    name: "Peter Schmid",
    spezialisierung: "Taktik",
    erfahrung: 12,
    geburtsdatum: ISODate("1982-03-15T00:00:00Z")
});

// insertMany() für spieler
db.spieler.insertMany([
    {
        _id: spielerId1,
        name: "Hans Muster",
        alter: 25,
        position: "Stürmer",
        rueckennummer: 9,
        gehalt: 85000.50,
        geburtsdatum: ISODate("1999-05-12T00:00:00Z"),
        mannschaften: [{ mannschaftId: mannschaftId1, name: "FC Muster Senioren" }]
    },
    {
        _id: spielerId2,
        name: "Marco Berger",
        alter: 22,
        position: "Mittelfeld",
        rueckennummer: 8,
        gehalt: 62000.00,
        geburtsdatum: ISODate("2002-08-20T00:00:00Z"),
        mannschaften: [{ mannschaftId: mannschaftId1, name: "FC Muster Senioren" }]
    },
    {
        _id: spielerId3,
        name: "Luca Ferrari",
        alter: 19,
        position: "Tor",
        rueckennummer: 1,
        gehalt: 45000.00,
        geburtsdatum: ISODate("2005-01-03T00:00:00Z"),
        mannschaften: [{ mannschaftId: mannschaftId2, name: "FC Muster Junioren A" }]
    },
    {
        _id: spielerId4,
        name: "David Weber",
        alter: 28,
        position: "Abwehr",
        rueckennummer: 4,
        gehalt: 72000.00,
        geburtsdatum: ISODate("1996-11-07T00:00:00Z"),
        mannschaften: [{ mannschaftId: mannschaftId1, name: "FC Muster Senioren" }]
    },
    {
        _id: spielerId5,
        name: "Nico Huber",
        alter: 20,
        position: "Stürmer",
        rueckennummer: 11,
        gehalt: 50000.00,
        geburtsdatum: ISODate("2004-04-18T00:00:00Z"),
        mannschaften: [{ mannschaftId: mannschaftId2, name: "FC Muster Junioren A" }]
    }
]);

// insertMany() für mannschaft
db.mannschaft.insertMany([
    {
        _id: mannschaftId1,
        name: "FC Muster Senioren",
        kategorie: "Senioren",
        liga: "2. Liga",
        trainerId: trainerId1,
        spiele: [
            {
                datum: ISODate("2024-09-15T00:00:00Z"),
                ort: "Sportplatz Muster",
                gegner: "FC Beispiel",
                ergebnis: "3:1"
            },
            {
                datum: ISODate("2024-10-05T00:00:00Z"),
                ort: "Auswärts",
                gegner: "SC Test",
                ergebnis: "0:2"
            }
        ]
    },
    {
        _id: mannschaftId2,
        name: "FC Muster Junioren A",
        kategorie: "Junioren",
        liga: "U21",
        trainerId: trainerId2,
        spiele: [
            {
                datum: ISODate("2024-09-22T00:00:00Z"),
                ort: "Sportplatz Muster",
                gegner: "FC Demo",
                ergebnis: "2:0"
            }
        ]
    }
]);

// insertOne() für zweiten trainer
db.trainer.insertOne({
    _id: trainerId2,
    name: "Stefan Meier",
    spezialisierung: "Kondition",
    erfahrung: 7,
    geburtsdatum: ISODate("1988-11-25T00:00:00Z")
});

print("Daten eingefügt. Spieler:", db.spieler.countDocuments());
print("Trainer:", db.trainer.countDocuments());
print("Mannschaften:", db.mannschaft.countDocuments());
