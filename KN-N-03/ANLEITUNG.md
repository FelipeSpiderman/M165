# KN-N-03 – Was du tun musst

## Vorbereitung
- Neo4j Instanz läuft (von KN-N-01)
- Daten aus KN-N-02 vorhanden
- Python auf dem Mac installiert (`python3 --version`)

---

## Setup

```bash
pip install neo4j
```

## IP und Passwort eintragen

Öffne `queries.py` und ersetze `<IP>` mit deiner Neo4j-IP und `<Password>` mit deinem Passwort:
```python
URI = "neo4j://<DEINE-IP>:7687"
AUTH = ("neo4j", "<DEIN-PASSWORT>")
```

## Script ausführen

```bash
python3 /Users/bipo/git/M165/KN-N-03/queries.py
```

Das Script führt folgendes aus:
- Alle Spieler abfragen (MATCH)
- Spieler mit Filter (WHERE) + Sortierung
- Neuen Spieler erstellen (CREATE)
- Gehalt aktualisieren (SET)
- Spieler mit Mannschaft und Trainer (Join über Beziehungen)
- Spieler pro Position zählen (Aggregation mit count)
- Test-Spieler löschen (DETACH DELETE)

**Screenshots:** Terminal-Output

---

## Häufige Probleme

**Connection refused:**
- Port 7687 in AWS Security Group offen?
- Neo4j läuft? (`sudo systemctl status neo4j`)
- `server.default_listen_address` in `/etc/neo4j/neo4j.conf` aktiviert?

**Authentication failed:**
- Passwort korrekt?
- Eventuell mit `:server change-password` in cypher-shell zurückgesetzt?

**ModuleNotFoundError: No module named 'neo4j':**
```bash
pip3 install neo4j
```

---

## Abgabe-Checkliste

- [ ] `queries.py` mit deiner IP und deinem Passwort
- [ ] README.md mit Scripts und Screenshots
- [ ] Screenshot: Script läuft ohne Fehler
- [ ] Screenshot: Resultate sichtbar (mindestens find + Join)

## Mögliche Präsentationsfragen

- Welche Library verwendest du für Neo4j?
- Wie unterscheidet sich der neo4j Driver von pymongo?
- Was sind Sessions und Transactions im neo4j Driver?
- Wie verhindert man Cypher-Injection? (`$param` Syntax)
- Warum `driver.close()` am Ende?
