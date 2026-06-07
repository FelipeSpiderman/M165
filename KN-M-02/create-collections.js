// Collections erstellen
db.createCollection("spieler");
db.createCollection("trainer");
db.createCollection("mannschaft");

// Bestätigung 
print(db.getCollectionNames());
// oder
`show collections`
