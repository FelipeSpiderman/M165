# KN-M-03 – Was du tun musst

## Vorbereitung
- AWS Instanz mit MongoDB läuft (von KN-M-01)
- MongoDB Compass verbunden auf deine AWS-IP
- Datenbank `fc_muster` mit Collections aus KN-M-02 vorhanden (oder neu anlegen)

---

## Teil A – Daten einfügen

1. Öffne Compass → unten auf **MONGOSH** klicken
2. Führe das Script aus `insert-data.js` aus (oder kopiere aus README.md)
3. Wichtig: Benutze **Variablen** für ObjectId (`const id = new ObjectId()`) – keine hartcodierten Werte
4. Benutze `insertOne()` für mindestens eine Collection, `insertMany()` für mindestens eine andere
5. **Screenshot** machen: das Ergebnis in MONGOSH + die Collection in Compass mit den Dokumenten

## Teil B – Daten löschen

Zwei separate Scripts erstellen:

**Script 1 – alles droppen:**
- `db.spieler.drop()`, `db.trainer.drop()`, `db.mannschaft.drop()`
- Screenshot: leere DB danach

**Script 2 – selektiv löschen (erst neue Daten einfügen!):**
- `deleteOne()` mit `{ _id: ... }`
- `deleteMany()` mit `{ $or: [{ _id: ... }, { _id: ... }] }` – aber NICHT alle löschen
- Screenshot: vorher/nachher

## Teil C – Abfragen

Ein einzelnes `.js`-Script mit folgenden Abfragen (mindestens):

| Abfrage | Befehl |
|---------|--------|
| Pro Collection mindestens 1 find | `db.collection.find({...})` |
| DateTime-Filter | `{ geburtsdatum: { $gt: ISODate("...") } }` |
| OR auf non-_id Feld | `{ $or: [{ position: "X" }, { position: "Y" }] }` |
| AND (andere Collection als OR) | `{ $and: [{ liga: "X" }, { kategorie: "Y" }] }` |
| Regex Substring | `{ name: { $regex: "er", $options: "i" } }` |
| Projektion MIT _id | `find({}, { name: 1, _id: 1 })` |
| Projektion OHNE _id | `find({}, { name: 1, _id: 0 })` |

- Screenshot: jede Abfrage mit Resultat

## Teil D – Daten ändern

Ein `.js`-Script mit:

| Befehl | Anforderung |
|--------|-------------|
| `updateOne()` | mit `_id`-Filter, `$set` für bestimmte Felder |
| `updateMany()` | OR-Logik, KEIN `_id` verwenden |
| `replaceOne()` | komplettes Dokument ersetzen |

- Screenshot: vorher/nachher für jede Operation

---

## Abgabe-Checkliste

- [ ] `insert-data.js` Script
- [ ] `drop-all.js` Script
- [ ] `delete-selective.js` Script
- [ ] `queries.js` Script
- [ ] `updates.js` Script
- [ ] README.md mit allen Scripts eingebettet und Screenshots
- [ ] `images/` Ordner mit allen Screenshots (1.png, 2.png, ...)

## Mögliche Präsentationsfragen

- Warum `new ObjectId()` statt hardcoded?
- Was ist der Unterschied zwischen `drop()` und `deleteMany({})`?
- Was ist der Unterschied zwischen `updateOne()` und `replaceOne()`?
- Wozu ist `$options: "i"` beim Regex?
- Warum brauchst du `$or` mit mehreren `_id`s bei `deleteMany`?
- Was macht `_id: 0` in der Projektion?
