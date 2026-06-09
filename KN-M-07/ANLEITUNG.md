# KN-M-07 – Was du tun musst

## Vorbereitung
- AWS Instanz läuft, `fc_muster` DB mit Daten vorhanden
- Python auf dem Mac installiert (prüfen: `python3 --version`)

---

## Setup

```bash
pip install pymongo
```

## AWS-IP eintragen
Öffne `queries.py` und ersetze `<AWS-IP>` mit deiner tatsächlichen EC2-IP-Adresse. Dieselbe IP die du auch in Compass verwendest.

## Script ausführen

```bash
python3 /Users/bipo/git/M165/KN-M-07/queries.py
```

Das Script führt folgendes aus (alles in einem Durchlauf):
- find() alle Spieler
- find() mit Filter (alter > 20) und Projektion
- insertOne() neuer Spieler
- updateOne() Gehalt ändern
- Aggregation ($group pro Position)
- $lookup (Mannschaft + Trainer)
- deleteOne() Testdaten aufräumen

**Screenshots machen** vom Terminal-Output. Am besten ein Screenshot der zeigt wie das Script läuft + einer mit dem Aggregations-Resultat.

---

## Häufige Probleme

**Connection refused / Timeout:**
- Port 27017 in der AWS Security Group offen? (Inbound Rule: Custom TCP 27017 von deiner IP)
- IP korrekt eingetragen?

**Authentication failed:**
- Passwort korrekt? (MeinSicheresPasswort.2024)
- `authSource=admin` im Connection String?

**ModuleNotFoundError: No module named 'pymongo':**
```bash
pip3 install pymongo
```

---

## Abgabe-Checkliste

- [ ] `queries.py` mit deiner AWS-IP
- [ ] README.md mit Scripts und Screenshots
- [ ] Screenshot: Script läuft ohne Fehler
- [ ] Screenshot: Resultate von mindestens find + Aggregation sichtbar

## Mögliche Präsentationsfragen

- Welche Library verwendest du und wie verbindet man sich?
- Was ist der Unterschied zwischen `find_one()` und `find()`?
- Wie macht man ein Datum in Python? (`datetime`-Objekt)
- Wie schreibt man eine Aggregations-Pipeline in Python?
- Was gibt `insert_one()` zurück?
- Warum `client.close()` am Ende?
