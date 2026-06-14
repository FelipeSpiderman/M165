use fc_muster;

// admin braucht dbAdmin-Rechte damit collMod funktioniert
use admin;
db.grantRolesToUser("admin", [{ role: "dbAdmin", db: "fc_muster" }]);

use fc_muster;

// Validierung für spieler (die anderen zwei über Compass UI setzen!)
db.runCommand({
    collMod: "spieler",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "alter", "position", "rueckennummer", "gehalt", "geburtsdatum"],
            properties: {
                name: { bsonType: "string" },
                alter: { bsonType: "int", minimum: 15, maximum: 45 },
                position: {
                    bsonType: "string",
                    enum: ["Tor", "Abwehr", "Mittelfeld", "Stürmer"]
                },
                rueckennummer: { bsonType: "int", minimum: 1, maximum: 99 },
                gehalt: { bsonType: "double", minimum: 0 },
                geburtsdatum: { bsonType: "date" },
                mannschaften: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["mannschaftId", "name"],
                        properties: {
                            mannschaftId: { bsonType: "objectId" },
                            name: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});
print("Validierung spieler gesetzt.");

// Validierung für trainer
db.runCommand({
    collMod: "trainer",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "spezialisierung", "erfahrung"],
            properties: {
                name: { bsonType: "string" },
                spezialisierung: {
                    bsonType: "string",
                    enum: ["Taktik", "Kondition", "Torwart", "Athletik"]
                },
                erfahrung: { bsonType: "int", minimum: 0, maximum: 50 },
                geburtsdatum: { bsonType: "date" }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});
print("Validierung trainer gesetzt.");

// Validierungen auslesen
print("=== Validierung spieler ===");
db.getCollectionInfos({ name: "spieler" })[0].options.validator;

print("=== Validierung trainer ===");
db.getCollectionInfos({ name: "trainer" })[0].options.validator;
