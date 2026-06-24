# KN-M-05 – Was du tun musst

## Vorbereitung
- AWS Instanz läuft, Compass verbunden
- `fc_muster` DB mit mindestens 2 Collections und Daten vorhanden (wichtig für Backup!)

---

## Teil A – Rechte und Rollen

### Schritt 1: Falsches authSource testen
1. Compass → New Connection → URI eingeben:
   ```
   mongodb://admin:MeinSicheresPasswort.2024@<IP>:27017/?authSource=fc_muster
   ```
2. Verbinden → Fehler erscheint
3. **Screenshot** des Fehlers machen (Verbindungstext im Screenshot sichtbar!)

### Schritt 2 & 3: Benutzer erstellen
Führe `create-users.js` in MONGOSH aus (als admin eingeloggt).

**Benutzer 1 (leser) testen:**
1. Compass → New Connection:
   ```
   mongodb://leser:Lesen.2024@<IP>:27017/fc_muster?authSource=fc_muster
   ```
2. **Screenshot 1**: Verbindungstext sichtbar beim Einloggen
3. **Screenshot 2**: `db.spieler.find()` läuft durch ✅
4. **Screenshot 3**: `db.spieler.insertOne({name:"x"})` → `not authorized` Fehler ✅

**Benutzer 2 (schreiber) testen:**
1. Compass → New Connection:
   ```
   mongodb://schreiber:Schreiben.2024@<IP>:27017/fc_muster?authSource=admin
   ```
2. **Screenshot 4**: Verbindungstext sichtbar beim Einloggen
3. **Screenshot 5**: `db.spieler.find()` läuft durch ✅
4. **Screenshot 6**: `db.spieler.insertOne({name:"x"})` funktioniert ✅

---

## Teil B – Backup und Restore (BEIDE Varianten sind Pflicht!)

### Variante 1: EBS Snapshot

1. AWS Console → EC2 → **Volumes** (links im Menü unter "Elastic Block Store")
2. Dein Volume auswählen → **Actions → Create Snapshot**
3. Beschreibung eingeben → **Screenshot** (warten bis Status "completed")
4. In MONGOSH eine Collection droppen: `db.spieler.drop()`
5. **Screenshot** der leeren DB
6. Snapshot → **Actions → Create Volume** → **WICHTIG: gleiche Availability Zone wie deine Instanz wählen!**
7. EC2 → Instanz stoppen (nicht terminieren!)
8. Volumes → altes Volume → **Detach Volume**
9. Neues Volume → **Attach Volume** → Instanz auswählen → Device `/dev/sda1`
10. Instanz starten → Compass verbinden
11. **Screenshot**: `db.spieler.find()` zeigt Daten wieder ✅

### Variante 2: mongodump / mongorestore

SSH auf Instanz:
```bash
ssh -i dein-key.pem ubuntu@<IP>
```

**Backup:**
```bash
mongodump --host localhost --port 27017 --username admin --password Password22901Gilbert --authenticationDatabase admin --db fc_muster --out /home/ubuntu/backup
```
**Screenshot**: `/home/ubuntu/backup/fc_muster/` Ordner mit .bson Files

**Daten löschen:**
```bash
mongosh --authenticationDatabase admin -u admin -p
use fc_muster;
db.trainer.drop();
```
**Screenshot**: Trainer Collection weg

**Restore:**
```bash
mongorestore --host localhost --port 27017 --username admin --password Password22901Gilbert --authenticationDatabase admin --db fc_muster /home/ubuntu/backup/fc_muster
```
**Screenshot**: Trainer Collection wieder vorhanden ✅

---

## Teil C – Skalierung

Schreibe in eigenen Worten (kein Copy-Paste!):
1. Was ist Replikation? (Illustration dazu)
2. Was ist Sharding? (Illustration dazu)
3. Quellen angeben (MongoDB Docs reicht)
4. **Empfehlung für deine Firma**: Erkläre die Situation, dann Empfehlung (Replikation/Sharding/Status Quo) mit Begründung

---

## Abgabe-Checkliste

- [ ] `create-users.js` Script
- [ ] README.md mit allen Screenshots
- [ ] Teil A: 7 Screenshots (Fehler, leser login, leser read ok, leser write Fehler, schreiber login, schreiber read ok, schreiber write ok)
- [ ] Teil B Variante 1: Snapshot erstellt, Daten gelöscht, Restore Screenshots
- [ ] Teil B Variante 2: mongodump, Daten gelöscht, mongorestore Screenshots
- [ ] Teil C: Erklärung + Diagramm + Quellen + Empfehlung

## Mögliche Präsentationsfragen

- Warum schlägt der Login fehl wenn authSource falsch ist?
- Was ist der Unterschied zwischen `read` und `readWrite`?
- Warum keine "Any"-Rollen?
- Was ist der Unterschied zwischen EBS Snapshot und mongodump?
- Warum muss der Snapshot in der gleichen Availability Zone sein?
- Was passiert beim Restore via EBS Snapshot mit dem alten Volume?
- Was ist ein Replica Set?
- Wann Replikation, wann Sharding?
