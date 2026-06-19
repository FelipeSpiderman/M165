# KN-C-02 - Datenabfrage und -Manipulation

Alles auf dem Keyspace `fc_muster` (gleiches Thema FC Muster). Die Tabellen wurden in KN-C-01 erstellt.

---

## Teil A: Daten hinzufuegen (25%)

Script: `insert-data.cql`

Ich habe fuer jede Tabelle 3-5 Zeilen eingefuegt. Pro Partition-Key habe ich mehrere Datensaetze, damit die Sortierung mit Cluster-Keys Sinn macht.

```cassandra
USE fc_muster;

-- Mannschaftskader (Partition-Key: mannschaft_name)
INSERT INTO mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Senioren', 'Hans Muster', 'Stuermer', 9, 85000.5);
INSERT INTO mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Senioren', 'Fritz Meier', 'Mittelfeld', 10, 72000.0);
INSERT INTO mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Senioren', 'Max Huber', 'Abwehr', 4, 68000.0);
INSERT INTO mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Junioren A', 'Lukas Baer', 'Tor', 1, 45000.0);
INSERT INTO mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Junioren A', 'Nina Koch', 'Stuermer', 11, 36000.0);

-- Spielerprofil
INSERT INTO spieler_detail (spieler_name, alter, position, rueckennummer, gehalt, geburtsdatum, mannschaften)
VALUES ('Hans Muster', 25, 'Stuermer', 9, 85000.5, '1999-05-12', {'FC Muster Senioren'});
INSERT INTO spieler_detail (spieler_name, alter, position, rueckennummer, gehalt, geburtsdatum, mannschaften)
VALUES ('Max Huber', 28, 'Abwehr', 4, 68000.0, '1996-11-30', {'FC Muster Senioren', 'FC Muster Junioren A'});
INSERT INTO spieler_detail (spieler_name, alter, position, rueckennummer, gehalt, geburtsdatum, mannschaften)
VALUES ('Nina Koch', 30, 'Stuermer', 11, 92000.0, '1994-07-08', {'FC Muster Senioren'});

-- Spielplan
INSERT INTO mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Senioren', '2024-09-15', 'FC Beispiel', 'Sportplatz Muster', '3:1');
INSERT INTO mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Senioren', '2024-09-22', 'FC Test', 'Sportplatz Auswaerts', '1:1');
INSERT INTO mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Senioren', '2024-09-29', 'FC Demo', 'Sportplatz Muster', '0:2');
INSERT INTO mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Junioren A', '2024-09-28', 'FC Jugend', 'Sportplatz Muster', '4:2');

-- Trainerteam
INSERT INTO trainer_mannschaft (trainer_name, mannschaft_name, spezialisierung, erfahrung)
VALUES ('Peter Schmid', 'FC Muster Senioren', 'Taktik', 12);
INSERT INTO trainer_mannschaft (trainer_name, mannschaft_name, spezialisierung, erfahrung)
VALUES ('Anna Meier', 'FC Muster Junioren A', 'Kondition', 8);
INSERT INTO trainer_mannschaft (trainer_name, mannschaft_name, spezialisierung, erfahrung)
VALUES ('Peter Schmid', 'FC Muster Junioren A', 'Taktik', 12);
```

Screenshot:

![image](images/1.png)

---

## Teil B: Daten abfragen (25%)

Script: `queries.cql`

Hier fuehre ich die Abfragen zu den Szenarien aus KN-C-01 aus.

```cassandra
USE fc_muster;

-- Screen 1: Mannschaftskader - Alle Spieler der Senioren
SELECT * FROM mannschaft_kader
WHERE mannschaft_name = 'FC Muster Senioren';

-- Screen 2: Spielerprofil fuer Max Huber
SELECT * FROM spieler_detail
WHERE spieler_name = 'Max Huber';

-- Screen 3: Spielplan der Senioren sortiert nach Datum
SELECT * FROM mannschaft_spiele
WHERE mannschaft_name = 'FC Muster Senioren'
ORDER BY spiel_datum;

-- Screen 3b: Nur Heimspiele der Senioren
SELECT * FROM mannschaft_spiele
WHERE mannschaft_name = 'FC Muster Senioren'
  AND ort = 'Sportplatz Muster'
ORDER BY spiel_datum;

-- Screen 4: Trainerteam - Alle Mannschaften von Peter Schmid
SELECT * FROM trainer_mannschaft
WHERE trainer_name = 'Peter Schmid';
```

Screenshots:

![image](images/2.png)
![image](images/3.png)
![image](images/4.png)
![image](images/5.png)

---

## Teil C: Daten loeschen (25%)

Scripts: `delete-data.cql` und `drop-all.cql`

### Zeilen loeschen mit Partition- und Cluster-Key

```cassandra
USE fc_muster;

-- Ein bestimmtes Spiel der Senioren loeschen
DELETE FROM mannschaft_spiele
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spiel_datum = '2024-09-22';
```

### Spalten loeschen

```cassandra
-- Das Gehalt aus dem Spielerprofil von Hans Muster loeschen
DELETE gehalt FROM spieler_detail
WHERE spieler_name = 'Hans Muster';
```

**Kann man Spalten von einzelnen Zeilen loeschen?**  
Ja, mit `DELETE spaltenname FROM tabelle WHERE ...` kann man einzelne Spalten loeschen. Die Zeile bleibt bestehen, aber die Spalte wird auf null gesetzt. Das funktioniert auch mit mehreren Spalten gleichzeitig.

### Alle Daten loeschen

```cassandra
USE fc_muster;

TRUNCATE mannschaft_kader;
TRUNCATE spieler_detail;
TRUNCATE mannschaft_spiele;
TRUNCATE trainer_mannschaft;
```

`TRUNCATE` leert die ganze Tabelle, behaelt aber die Struktur. Danach kann man mit `insert-data.cql` die Daten wieder neu einspielen.

Screenshots:

![image](images/6.png)
![image](images/7.png)
![image](images/8.png)

---

## Teil D: Daten veraendern (20%)

Script: `update-data.cql`

### Szenario 1: Gehaltserhoehung fuer einen Spieler

Hans Muster hatte eine gute Saison und soll mehr Gehalt bekommen. Bei Cassandra muss der ganze Primaerschluessel in der WHERE-Klausel angegeben werden.

```cassandra
UPDATE fc_muster.mannschaft_kader
SET gehalt = 95000.0
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spieler_name = 'Hans Muster';
```

### Szenario 2: Spieler wechselt die Position

Max Huber wechselt von der Abwehr ins Mittelfeld. Da er in zwei Mannschaften spielt, muss ich beide Eintraege aktualisieren.

```cassandra
UPDATE fc_muster.mannschaft_kader
SET position = 'Mittelfeld'
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spieler_name = 'Max Huber';

UPDATE fc_muster.mannschaft_kader
SET position = 'Mittelfeld'
WHERE mannschaft_name = 'FC Muster Junioren A'
  AND spieler_name = 'Max Huber';
```

### Szenario 3: Ergebnis eines Spiels korrigieren

Der FC Muster hat gegen FC Demo doch 2:1 gewonnen (falsch eingetragen).

```cassandra
UPDATE fc_muster.mannschaft_spiele
SET ergebnis = '2:1'
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spiel_datum = '2024-09-29';
```

Screenshots:

![image](images/9.png)
![image](images/10.png)
![image](images/11.png)
