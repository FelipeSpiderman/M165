# KN-N-02 - Datenabfrage und -Manipulation

Alles auf der `fc_muster`-Graphdatenbank (gleiches Thema wie bei den MongoDB Aufgaben: FC Muster).

---

## Teil A: Daten hinzufuegen (20%)

Script: `insert-data.cypher`

Ich habe eine sinnvolle Menge an Knoten und Kanten eingefuegt - etwa 3-5 Objekte pro Label.

Ich habe ein einziges grosses CREATE-Statement verwendet, weil Neo4j das erlaubt und es so am effizientesten ist:

```cypher
CREATE
  // Trainer
  (t1:Trainer {name: "Peter Schmid", spezialisierung: "Taktik", erfahrung: 12}),
  (t2:Trainer {name: "Anna Meier", spezialisierung: "Kondition", erfahrung: 8}),

  // Mannschaften
  (m1:Mannschaft {name: "FC Muster Senioren", kategorie: "Senioren", liga: "2. Liga"}),
  (m2:Mannschaft {name: "FC Muster Junioren A", kategorie: "Junioren", liga: "U19"}),

  // Spieler
  (s1:Spieler {name: "Hans Muster", alter: 25, position: "Stuermer", rueckennummer: 9, gehalt: 85000.5, geburtsdatum: date("1999-05-12")}),
  (s2:Spieler {name: "Fritz Meier", alter: 22, position: "Mittelfeld", rueckennummer: 10, gehalt: 72000.0, geburtsdatum: date("2001-08-23")}),
  (s3:Spieler {name: "Max Huber", alter: 28, position: "Abwehr", rueckennummer: 4, gehalt: 68000.0, geburtsdatum: date("1996-11-30")}),
  (s4:Spieler {name: "Lukas Baer", alter: 19, position: "Tor", rueckennummer: 1, gehalt: 45000.0, geburtsdatum: date("2005-03-15")}),
  (s5:Spieler {name: "Nina Koch", alter: 30, position: "Stuermer", rueckennummer: 11, gehalt: 92000.0, geburtsdatum: date("1994-07-08")}),

  // Spiele
  (g1:Spiel {datum: date("2024-09-15"), ort: "Sportplatz Muster", gegner: "FC Beispiel", ergebnis: "3:1"}),
  (g2:Spiel {datum: date("2024-09-22"), ort: "Sportplatz Auswaerts", gegner: "FC Test", ergebnis: "1:1"}),
  (g3:Spiel {datum: date("2024-09-29"), ort: "Sportplatz Muster", gegner: "FC Demo", ergebnis: "0:2"}),

  // Beziehungen
  (t1)-[:TRAINIERT]->(m1),
  (t2)-[:TRAINIERT]->(m2),
  (m1)-[:HAT_GESPIELT]->(g1),
  (m1)-[:HAT_GESPIELT]->(g2),
  (m2)-[:HAT_GESPIELT]->(g3),
  (s1)-[:SPIELT_FUER {seit: 2022}]->(m1),
  (s2)-[:SPIELT_FUER {seit: 2023}]->(m1),
  (s3)-[:SPIELT_FUER {seit: 2021}]->(m1),
  (s3)-[:SPIELT_FUER {seit: 2024}]->(m2),
  (s4)-[:SPIELT_FUER {seit: 2024}]->(m2),
  (s5)-[:SPIELT_FUER {seit: 2020}]->(m1);
```

Screenshot:

![image](images/1.png)

---

## Teil B: Daten abfragen (20%)

### Erklaerung des Standard-Statements

```cypher
MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n, r, m;
```

- `MATCH (n)` - Findet **alle** Knoten in der Datenbank und gibt ihnen die Variable `n`.
- `OPTIONAL MATCH (n)-[r]->(m)` - Versucht zu jedem Knoten `n` ausgehende Beziehungen (`[r]`) zu anderen Knoten (`m`) zu finden. `OPTIONAL` bedeutet: wenn ein Knoten **keine** Beziehungen hat, wird er trotzdem im Resultat gezeigt (mit `null` fuer `r` und `m`). Ohne `OPTIONAL` wuerden Knoten ohne Beziehungen herausgefiltert.
- `RETURN n, r, m` - Gibt alle Knoten, Beziehungen und Ziel-Knoten zurueck.

Darum ist `OPTIONAL` wichtig: sonst wuerde man zum Beispiel einen einsamen Knoten (ohne Beziehungen) nicht sehen, weil der `MATCH (n)-[r]->(m)` nichts findet und der ganze `n` aus der Auswahl fliegt.

### 4 Szenarien

**Szenario 1: Alle Spieler der Senioren-Mannschaft**

Wer spielt aktuell fuer die Senioren? Das ist relevant fuer die Aufstellung der naechsten Saison.

```cypher
MATCH (s:Spieler)-[:SPIELT_FUER]->(m:Mannschaft {name: "FC Muster Senioren"})
RETURN s.name, s.position, s.rueckennummer;
```

**Szenario 2: Trainer mit Erfahrung > 10 und ihre Mannschaften**

Welche Trainer haben lange Erfahrung und welche Mannschaften trainieren sie?

```cypher
MATCH (t:Trainer)-[:TRAINIERT]->(m:Mannschaft)
WHERE t.erfahrung > 10
RETURN t.name, t.spezialisierung, m.name
ORDER BY t.erfahrung DESC;
```

**Szenario 3: Alle Spiele der Senioren mit Ergebnis, wo sie nicht verloren haben**

Nur Spiele die nicht verloren wurden (Sieg oder Unentschieden). Wird fuer den Ticketverkauf des naechsten Heimspiels benoetigt.

```cypher
MATCH (m:Mannschaft {name: "FC Muster Senioren"})-[:HAT_GESPIELT]->(g:Spiel)
WHERE g.ergebnis CONTAINS ":"
  AND NOT g.ergebnis ENDS WITH ":0"
  AND NOT g.ergebnis ENDS WITH ":1"
  AND NOT g.ergebnis ENDS WITH ":2"
RETURN g.datum, g.gegner, g.ergebnis;
```

**Szenario 4: Spieler die in mehreren Mannschaften gespielt haben und ihre Beitrittsjahre**

Fuer die Vereinshistorie - wer ist schon ueberall gewesen?

```cypher
MATCH (s:Spieler)-[r:SPIELT_FUER]->(m:Mannschaft)
WITH s, count(m) as anzahl_mannschaften, collect(m.name) as mannschaften
WHERE anzahl_mannschaften > 1
RETURN s.name, anzahl_mannschaften, mannschaften;
```

Screenshots:

![image](images/2.png)
![image](images/3.png)
![image](images/4.png)
![image](images/5.png)

---

## Teil C: Daten loeschen (20%)

Ich habe zweimal das gleiche Startobjekt (einen Spieler) genommen, einmal mit DETACH und einmal ohne.

### Ohne DETACH

```cypher
MATCH (s:Spieler {name: "Max Huber"})
DELETE s;
```

**Fehler:** Neo4j loescht nicht, weil der Knoten noch Beziehungen hat. Es kommt eine Fehlermeldung:

```
Cannot delete node<4>, because it still has relationships. To delete this node, you must first delete its relationships.
```

### Mit DETACH

```cypher
MATCH (s:Spieler {name: "Max Huber"})
DETACH DELETE s;
```

**Funktioniert:** Loescht den Knoten **und** alle seine Beziehungen (aus- und eingehende).

**Vorher:**

![image](images/6.png)

**Nachher (ohne DETACH):**

![image](images/7.png)

**Nachher (mit DETACH):**

![image](images/8.png)

---

## Teil D: Daten veraendern (20%)

### Szenario 1: Gehaltserhoehung fuer einen bestimmten Spieler

Hans Muster hatte eine gute Saison, er soll mehr Gehalt bekommen.

```cypher
MATCH (s:Spieler {name: "Hans Muster"})
SET s.gehalt = 95000.0, s.alter = 26
RETURN s;
```

### Szenario 2: Erfahrung aller Trainer erhoehen

Alle Trainer die Taktik oder Kondition als Spezialisierung haben, bekommen ein Jahr Erfahrung dazu.

```cypher
MATCH (t:Trainer)
WHERE t.spezialisierung IN ["Taktik", "Kondition"]
SET t.erfahrung = t.erfahrung + 1
RETURN t.name, t.erfahrung;
```

### Szenario 3: Ergebnis eines Spiels korrigieren

Der FC Muster hat gegen "FC Demo" doch 2:1 gewonnen (statt 0:2 verloren).

```cypher
MATCH (m:Mannschaft)-[:HAT_GESPIELT]->(g:Spiel {gegner: "FC Demo"})
SET g.ergebnis = "2:1"
RETURN g;
```

Screenshots:

![image](images/9.png)
![image](images/10.png)
![image](images/11.png)

---

## Teil E: Zusaetzliche Klauseln (20%)

Ich habe mich fuer `MERGE` und `CASE` entschieden. Mit meinen Kollegen abgesprochen - die anderen haben `UNWIND` und `FOREACH` genommen.

### 1. MERGE

**Theorie:** `MERGE` kombiniert `MATCH` und `CREATE`. Es schaut ob ein Knoten (oder Kante) mit diesen Eigenschaften schon existiert. Wenn ja, passiert nichts. Wenn nein, wird er erstellt. Das ist praktisch fuer "Upsert" - also zum Verhindern von doppelten Daten.

**Beispiel:** Einen neuen Spieler "Marco Weber" einfuegen - wenn er schon existiert soll nichts passieren.

```cypher
MERGE (s:Spieler {name: "Marco Weber"})
ON CREATE SET s.alter = 24, s.position = "Mittelfeld", s.rueckennummer = 7, s.gehalt = 55000.0, s.geburtsdatum = date("2000-01-10")
ON MATCH SET s.gehalt = s.gehalt + 5000  // Wenn er schon existiert, bekommt er eine Gehaltserhoehung
RETURN s;
```

**Erklaerung:** `ON CREATE SET` wird nur ausgefuehrt, wenn der Knoten nicht existiert. `ON MATCH SET` wird ausgefuehrt, wenn er schon da ist. So kann man beide Faelle behandeln.

### 2. CASE

**Theorie:** `CASE` ist wie ein `if-else` in anderen Programmiersprachen. In Cypher kann man `CASE` innerhalb von `RETURN` verwenden um bedingte Wertzuweisungen zu machen.

**Beispiel:** Alle Spieler in Kategorien einteilen - "Jungstar" (unter 21), "Stammspieler" (21-29) oder "Erfahren" (30+).

```cypher
MATCH (s:Spieler)
RETURN s.name,
  CASE
    WHEN s.alter < 21 THEN "Jungstar"
    WHEN s.alter >= 21 AND s.alter < 30 THEN "Stammspieler"
    ELSE "Erfahren"
  END AS kategorie
ORDER BY s.alter;
```

**Erklaerung:** Es wird kein neuer Wert gespeichert, sondern nur bei der Ausgabe transformiert. Die Reihenfolge der `WHEN`-Bedingungen ist relevant - es wird der erste passende Fall genommen.

Screenshots:

![image](images/12.png)
![image](images/13.png)
