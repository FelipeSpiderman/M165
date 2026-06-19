// KN-N-02 Teil B: Daten abfragen
// FC Muster - Neo4j Graphdatenbank

// Szenario 1: Alle Spieler der Senioren-Mannschaft
MATCH (s:Spieler)-[:SPIELT_FUER]->(m:Mannschaft {name: "FC Muster Senioren"})
RETURN s.name, s.position, s.rueckennummer;

// Szenario 2: Trainer mit Erfahrung > 10 und ihre Mannschaften
MATCH (t:Trainer)-[:TRAINIERT]->(m:Mannschaft)
WHERE t.erfahrung > 10
RETURN t.name, t.spezialisierung, m.name
ORDER BY t.erfahrung DESC;

// Szenario 3: Alle Spiele der Senioren die nicht verloren wurden
MATCH (m:Mannschaft {name: "FC Muster Senioren"})-[:HAT_GESPIELT]->(g:Spiel)
WHERE g.ergebnis CONTAINS ":"
  AND NOT g.ergebnis ENDS WITH ":0"
  AND NOT g.ergebnis ENDS WITH ":1"
  AND NOT g.ergebnis ENDS WITH ":2"
RETURN g.datum, g.gegner, g.ergebnis;

// Szenario 4: Spieler die in mehreren Mannschaften gespielt haben
MATCH (s:Spieler)-[r:SPIELT_FUER]->(m:Mannschaft)
WITH s, count(m) as anzahl_mannschaften, collect(m.name) as mannschaften
WHERE anzahl_mannschaften > 1
RETURN s.name, anzahl_mannschaften, mannschaften;
