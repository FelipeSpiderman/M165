# KN-C-03 – Was du tun musst

## Vorbereitung
- Cassandra läuft (Docker: `docker exec -it cassandra cqlsh`)
- Keyspace `fc_muster` mit Daten aus KN-C-02 vorhanden
- Python auf dem Mac installiert (`python3 --version`)

---

## Setup

```bash
pip install cassandra-driver
```

## Script ausführen

```bash
python3 /Users/bipo/git/M165/KN-C-03/queries.py
```

Das Script führt folgendes aus:
- Alle Spieler einer Mannschaft abfragen (SELECT mit WHERE)
- Spielerprofil abfragen
- Heimspiele filtern (SELECT mit zwei WHERE + ALLOW FILTERING)
- Trainer-Teams anzeigen
- Neuen Spieler einfügen (INSERT)
- Gehalt aktualisieren (UPDATE)
- Test-Spieler löschen (DELETE)

**Screenshots:** Terminal-Output (am besten 2 Screenshots)

---

## Häufige Probleme

**Connection refused:**
- Läuft der Docker Container? `docker ps`
- Port 9042 gemappt? `docker run -p 9042:9042 ...`

**cassandra-driver not found:**
```bash
pip3 install cassandra-driver
```

**No host available:**
- Cassandra braucht 1-2 Minuten bis es bereit ist nach `docker run`
- Mit `docker logs cassandra` prüfen ob "Starting listening for CQL clients" da steht

**InvalidQueryException: ALLOW FILTERING:**
- Manche Queries brauchen `ALLOW FILTERING` am Ende wenn nicht nur auf Partition-Key gefiltert wird

---

## Abgabe-Checkliste

- [ ] `queries.py` (mit korrekter IP falls AWS)
- [ ] README.md mit Scripts und Screenshots
- [ ] Screenshot: Script läuft ohne Fehler
- [ ] Screenshot: Resultate sichtbar (mindestens SELECT + INSERT)

## Mögliche Präsentationsfragen

- Welche Library verwendest du für Cassandra?
- Was ist der Unterschied zwischen dem Cassandra Driver und pymongo?
- Wie gibt man Parameter in CQL Queries mit Python? (`%s` Platzhalter)
- Warum braucht manchmal `ALLOW FILTERING`?
- Was macht `cluster.shutdown()`?
- Wie unterscheidet sich das Session-Modell von Cassandra vs Neo4j?
