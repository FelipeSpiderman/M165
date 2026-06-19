# KN-C-02 – Was du tun musst

## Vorbereitung
- Cassandra läuft (Docker oder AWS)
- cqlsh verbunden: `docker exec -it cassandra cqlsh`
- Keyspace `fc_muster` mit Tabellen aus KN-C-01 vorhanden

---

## Teil A – Daten hinzufügen

Erstelle `insert-data.cql`.

**Bedingungen:**
- 3-5 Zeilen pro Tabelle
- Pro Partition-Key **mehrere** Datensätze (damit Cluster-Key Sortierung Sinn macht)
- Lesbar formatiert (nicht alles auf einer Zeile)

**Vorgehen:**
1. In `insert-data.cql` alle INSERTs definieren
2. In cqlsh ausführen: `SOURCE 'insert-data.cql'`
3. **Screenshot:** SELECT * FROM jeder Tabelle

---

## Teil B – Daten abfragen

Erstelle `queries.cql` mit den Abfragen zu deinen Szenarien aus KN-C-01.

**Beispiele:**
```cassandra
-- Kader einer Mannschaft
SELECT * FROM mannschaft_kader WHERE mannschaft_name = 'FC Muster Senioren';

-- Spielerprofil
SELECT * FROM spieler_detail WHERE spieler_name = 'Max Huber';

-- Spielplan sortiert
SELECT * FROM mannschaft_spiele WHERE mannschaft_name = 'FC Muster Senioren';

-- Trainer-Teams
SELECT * FROM trainer_mannschaft WHERE trainer_name = 'Peter Schmid';
```

**Screenshots:** 4x Abfragen mit Resultaten

---

## Teil C – Daten löschen

### Schritt 1: Gezielte Löschung
Mit Partition-Key + Cluster-Key löschen:
```cassandra
DELETE FROM mannschaft_spiele
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spiel_datum = '2024-09-22';
```
**Screenshot vorher/nachher**

### Schritt 2: Spalten löschen
```cassandra
DELETE gehalt FROM spieler_detail
WHERE spieler_name = 'Hans Muster';
```
**Frage beantworten:** Kann man Spalten von einzelnen Zeilen löschen? → Ja

### Schritt 3: Alle Daten löschen (Aufräumen)
```cassandra
TRUNCATE mannschaft_kader;
TRUNCATE spieler_detail;
TRUNCATE mannschaft_spiele;
TRUNCATE trainer_mannschaft;
```
Erstelle `drop-all.cql` (damit du nachher Daten wieder neu einspielen kannst)

---

## Teil D – Daten verändern

3 Szenarien beschreiben (Prosa + CQL-Statement):

**Bedingungen:**
- WHERE muss den vollen Primary Key enthalten (sonst Fehler)
- Herausfordernde Szenarien (kein "SET name = 'xyz'")

**Beispiele:**
- Gehaltserhöhung für einen Spieler
- Positionswechsel (evtl. in mehreren Mannschaften updaten)
- Spielergebnis korrigieren

**Screenshots:** 3x Vorher/Nachher

---

## Abgabe-Checkliste

- [ ] `insert-data.cql` (Teil A)
- [ ] `queries.cql` (Teil B)
- [ ] `delete-data.cql` (Teil C – gezielte Löschung + Spalte)
- [ ] `drop-all.cql` (Teil C – alle Daten löschen)
- [ ] 3 Szenarien in `update-data.cql` (Teil D)
- [ ] README.md mit Erklärungen
- [ ] Screenshots von allen Ausführungen

## Mögliche Präsentationsfragen

- Warum müssen bei UPDATE alle Primary Keys in WHERE stehen?
- Was macht TRUNCATE? Unterschied zu DELETE?
- Kann man einzelne Spalten löschen?
- Was ist der Unterschied zwischen INSERT und UPDATE in Cassandra?
- Warum muss man bei SELECT auf den Partition-Key filtern?
- Was bedeutet ALLOW FILTERING?
