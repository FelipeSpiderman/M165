use fc_muster;

db.spieler.drop();
db.trainer.drop();
db.mannschaft.drop();

print("Alle Collections gelöscht.");
print("Verbleibende Collections:", db.getCollectionNames());
