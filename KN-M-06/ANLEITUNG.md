# KN-M-06 – Was du tun musst

## Vorbereitung
- AWS Instanz läuft, Compass verbunden
- `fc_muster` DB mit Daten vorhanden

---

## Teil A – JSON Schemas erstellen

Die 6 Files sind schon fertig:
- `spieler-example.json`, `spieler-schema.json`
- `trainer-example.json`, `trainer-schema.json`
- `mannschaft-example.json`, `mannschaft-schema.json`

Du musst nur prüfen ob die Schemas mit deinen tatsächlichen Daten in der DB übereinstimmen (Typen, Pflichtfelder).

---

## Teil B – Validierung einrichten und testen

### Schritt 1: dbAdmin Rolle vergeben
In MONGOSH als admin:
```javascript
use admin;
db.grantRolesToUser("admin", [{ role: "dbAdmin", db: "fc_muster" }]);
```
Ohne diese Rolle gibt `collMod` einen "not authorized" Fehler.

### Schritt 2: Validation via Compass (für mannschaft)
1. Compass → `fc_muster` → Collection `mannschaft` anklicken
2. Oben auf `...` (drei Punkte) → **Validation**
3. Inhalt von `mannschaft-schema.json` reinkopieren
4. **Update** klicken
5. **Screenshot** der Validation-Seite in Compass

### Schritt 3: Validation via mongosh (für spieler und trainer)
Führe `validation.js` in MONGOSH aus.
**Screenshot** des Befehls und Resultats

### Schritt 4: Bestehende Validation auslesen
```javascript
db.getCollectionInfos({ name: "spieler" })[0].options.validator
```
**Screenshot** der Ausgabe

### Schritt 5: Gültiges Dokument testen ✅
```javascript
db.spieler.insertOne({
  name: "Test Spieler",
  alter: NumberInt(23),
  position: "Abwehr",
  rueckennummer: NumberInt(5),
  gehalt: 55000.50,
  geburtsdatum: ISODate("2001-03-10T00:00:00Z")
});
```
**Screenshot**: Dokument eingefügt

### Schritt 6: Ungültiges Dokument testen ❌
```javascript
db.spieler.insertOne({
  name: "Falsch",
  alter: NumberInt(10),
  position: "Torwart",
  rueckennummer: NumberInt(0),
  gehalt: -500.50,
  geburtsdatum: ISODate("2014-01-01T00:00:00Z")
});
```
**Screenshot**: `Document failed validation` Fehler

---

## Abgabe-Checkliste

- [ ] 3x Beispiel-JSON Files
- [ ] 3x Schema-JSON Files
- [ ] `validation.js` Script
- [ ] README.md mit Screenshots
- [ ] Screenshot Compass Validation UI
- [ ] Screenshot `collMod` Befehl in mongosh
- [ ] Screenshot `getCollectionInfos` Ausgabe
- [ ] Screenshot gültiger Insert ✅
- [ ] Screenshot ungültiger Insert mit Fehler ❌

## Mögliche Präsentationsfragen

- Was ist der Unterschied zwischen `bsonType` und `type`?
- Warum braucht MongoDB eigene Typen? (date, objectId existieren in JSON nicht)
- Welcher Befehl liest eine bestehende Validation aus?
- Was ist `validationLevel: strict` vs `moderate`?
- Was ist `validationAction: error` vs `warn`?
- Warum muss man dbAdmin sein um Validierungen hinzuzufügen?
- Was macht `enum` in einem Schema?
- Was bedeutet `required` im Schema?
