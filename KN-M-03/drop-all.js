use fc_muster;

// alle drei Collections löschen
db.spieler.drop();
db.trainer.drop();
db.mannschaft.drop();

print("Collections gelöscht:", db.getCollectionNames());
