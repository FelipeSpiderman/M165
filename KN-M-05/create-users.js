// Benutzer 1: nur lesen, Auth in fc_muster
use fc_muster;

db.createUser({
    user: "leser",
    pwd: "Lesen.2024",
    roles: [
        { role: "read", db: "fc_muster" }
    ]
});

print("'leser' erstellt.");
print("Verbindung: mongodb://leser:Lesen.2024@<IP>:27017/fc_muster?authSource=fc_muster");

// Benutzer 2: lesen und schreiben, Auth in admin
use admin;

db.createUser({
    user: "schreiber",
    pwd: "Schreiben.2024",
    roles: [
        { role: "readWrite", db: "fc_muster" }
    ]
});

print("'schreiber' erstellt.");
print("Verbindung: mongodb://schreiber:Schreiben.2024@<IP>:27017/fc_muster?authSource=admin");
