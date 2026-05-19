# Abgabe-Anleitung KN-M-01

Hier step-by-step was du machen musst. Nachname/Vorname überall durch deine ersetzen.

---

## Teil A: Installation

### 1. Cloud-Init anpassen
- In `CloudInit-mongoDB.yaml` das Passwort nochmal ändern falls du ein anderes willst (Zeile 29)
- Die Cloud-Init in AWS beim Erstellen einer EC2 Instanz einfügen (User data)
- Wichtig: Security Group muss Port 27017 offen haben für deine IP

### 2. Screenshots Teil A
Mach diese Screenshots:

**Screenshot 1:** Compass verbinden
- Open Compass → Connection String eingeben:
  `mongodb://admin:MeinSicheresPasswort.2024@<DEINE-IP>:27017/?authSource=admin&readPreference=primary&ssl=false`
- Nach Connect links die DB-Liste zeigen (admin, config, local)
- Screenshot machen

**Screenshot 2:** Config-Datei
- SSH auf den Server: `ssh ubuntu@<DEINE-IP>`
- `cat /etc/mongod.conf | grep -E "bindIp|security|authorization"`
- Screenshot von der Ausgabe

---

## Teil B: GUI

### 3. DB und Collection anlegen
- In Compass rechts auf "+" klicken
- **Database Name:** `[DeinNachname]` (z.B. `Muster`)
- **Collection Name:** `[DeinVorname]` (z.B. `Hans`)
- Create

### 4. Dokument einfügen
- In der Collection auf "Add Data" → "Insert Document"
- Folgendes JSON einfügen (vorher Screenshot machen!):

```json
{
  "name": "Hans Muster",
  "adresse": "Musterstrasse 12, 8000 Zürich",
  "groesse": 182,
  "geburtsdatum": "1990-05-15"
}
```

**Screenshot 3:** Mach den Screenshot **bevor** du auf Insert klickst

- Dann Insert klicken

### 5. Datum korrigieren
- Das eingefügte Dokument anklicken
- Beim Feld `geburtsdatum` sehen: es steht "String"
- Dropdown von String auf **Date** ändern
- Wert eingeben: `1990-05-15T00:00:00.000Z`
- Update klicken

**Screenshot 4:** Compass Fenster mit der DB, Collection und dem Dokument (das Datum sollte jetzt als Date erkennbar sein)

### 6. Export
- Neben "Add Data" den "Export" Button klicken
- Als JSON exportieren
- Speichert die Datei als `export.json` (ich hab schon eine bereitgestellt, kannst aber deine eigene nehmen)

---

## Teil C: Shell

### 7. MONGOSH in Compass
- Ganz unten in Compass auf "MONGOSH" klicken
- Folgende Befehle nacheinander eingeben:

```
show dbs;
show databases;
use [DeinNachname];
show collections;
show tables;
var test="hallo";
test;
```

**Screenshot 5:** Mach Screenshot wenn alle Befehle sichtbar sind (am besten das Fenster gross genug)

### 8. MongoDB Shell auf dem Server
- SSH auf den Server
- Folgenden Befehl eingeben:

```
sudo mongosh --authenticationDatabase "admin" -u "admin" -p
```

- Passwort eingeben: `MeinSicheresPasswort.2024`
- Gleiche Befehle wie oben eingeben

**Screenshot 6:** Server Shell mit den eingegebenen Befehlen

---

## Teil D: Rechte und Rollen

### 9. Fehler mit falschem authSource zeigen
- In Compass neuen Connection Tab öffnen
- Diesen String verwenden:

```
mongodb://admin:MeinSicheresPasswort.2024@<DEINE-IP>:27017/?authSource=<DeinNachname>&readPreference=primary&ssl=false
```

**Screenshot 7:** Die Fehlermeldung die kommt (AuthenticationFailed oder so)

### 10. Benutzer erstellen
- Im MONGOSH in Compass folgendes eingeben (angepasst!):

```javascript
// Benutzer 1: Leser
use [DeinNachname];
db.createUser({
  user: "leser",
  pwd: "LeserPasswort.2024",
  roles: [
    { role: "read", db: "[DeinNachname]" }
  ]
});

// Benutzer 2: Schreiber
use admin;
db.createUser({
  user: "schreiber",
  pwd: "SchreiberPasswort.2024",
  roles: [
    { role: "readWrite", db: "[DeinNachname]" }
  ]
});
```

### 11. Benutzer 1 testen (leser)
Neuen Connection Tab für jeden Test:

**Screenshot 8a – Login:** Verbinden mit
```
mongodb://leser:LeserPasswort.2024@<IP>:27017/?authSource=[DeinNachname]&readPreference=primary&ssl=false
```
Screenshot machen (sollte connecten)

**Screenshot 8b – Lesen:** In MONGOSH:
```
use [DeinNachname];
db.[DeinVorname].find();
```
Screenshot (sollte das Dokument anzeigen)

**Screenshot 8c – Schreiben (Fehler):**
```
use [DeinNachname];
db.[DeinVorname].insertOne({ test: "hallo" });
```
Screenshot (sollte NotAuthorized Error zeigen)

### 12. Benutzer 2 testen (schreiber)

**Screenshot 9a – Login:**
```
mongodb://schreiber:SchreiberPasswort.2024@<IP>:27017/?authSource=admin&readPreference=primary&ssl=false
```

**Screenshot 9b – Lesen:**
```
use [DeinNachname];
db.[DeinVorname].find();
```

**Screenshot 9c – Schreiben:**
```
use [DeinNachname];
db.[DeinVorname].insertOne({ test: "hallo" });
```
(Sollte funktionieren)

---

## Zusammenfassung aller Abgaben

### Dateien zum Hochladen (Git)
- `KN-M-01/CloudInit-mongoDB.yaml` (angepasstes Passwort)
- `KN-M-01/README.md` 
- `KN-M-01/export.json`

### Screenshots (ins Git oder separat)
1. Compass mit bestehenden Datenbanken (admin, config, local)
2. `grep` Ausgabe der mongod.conf vom Server
3. Dokument vor dem Insert in Compass
4. Compass nach Datum-Änderung (DB + Collection + Dokument sichtbar)
5. Compass MONGOSH mit allen Befehlen
6. Server SSH Shell mit mongosh + Befehlen
7. Fehler bei falschem authSource
8a. Benutzer 1 – Login
8b. Benutzer 1 – Lesen
8c. Benutzer 1 – Schreiben (Fehler)
9a. Benutzer 2 – Login
9b. Benutzer 2 – Lesen
9c. Benutzer 2 – Schreiben (OK)

### In README eintragen
- `[Name]` mit deinem Namen ersetzen
- `[Datum]` mit Datum ersetzen
- `[Nachname]` und `[Vorname]` überall ersetzen

---

## Nützliche Befehle für SSH

```bash
# MongoDB Config anzeigen (für Screenshot)
cat /etc/mongod.conf | grep -E "bindIp|security|authorization"

# MongoDB Shell mit Auth
sudo mongosh --authenticationDatabase "admin" -u "admin" -p

# MongoDB Status prüfen
sudo systemctl status mongod

# MongoDB neustarten
sudo systemctl restart mongod
```
