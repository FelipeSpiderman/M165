// drei Collections anlegen
db.createCollection("spieler");
db.createCollection("trainer");
db.createCollection("mannschaft");

// prüfen ob alles da ist
print(db.getCollectionNames());
// oder einfach: show collections
