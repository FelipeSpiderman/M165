// Benutzer 1: Nur lesen, Authentifizierungsdatenbank = fc_muster
use fc_muster;

db.createUser({
    user: "leser",
    pwd: "Lesen.2024",
    roles: [
        { role: "read", db: "fc_muster" }
    ]
});

print("Benutzer 'leser' erstellt in fc_muster.");
print("Verbindungstext: mongodb://leser:Lesen.2024@<IP>:27017/fc_muster?authSource=fc_muster");

// Benutzer 2: Lesen und Schreiben, Authentifizierungsdatenbank = admin
use admin;

db.createUser({
    user: "schreiber",
    pwd: "Schreiben.2024",
    roles: [
        { role: "readWrite", db: "fc_muster" }
    ]
});

print("Benutzer 'schreiber' erstellt in admin.");
print("Verbindungstext: mongodb://schreiber:Schreiben.2024@<IP>:27017/fc_muster?authSource=admin");
