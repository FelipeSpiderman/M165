// KN-N-02 Teil D: Daten veraendern
// FC Muster - Neo4j Graphdatenbank

// Szenario 1: Gehaltserhoehung fuer Hans Muster
MATCH (s:Spieler {name: "Hans Muster"})
SET s.gehalt = 95000.0, s.alter = 26
RETURN s;

// Szenario 2: Erfahrung erhoehen fuer Taktik/Kondition Trainer
MATCH (t:Trainer)
WHERE t.spezialisierung IN ["Taktik", "Kondition"]
SET t.erfahrung = t.erfahrung + 1
RETURN t.name, t.erfahrung;

// Szenario 3: Ergebnis vom Spiel gegen FC Demo korrigieren
MATCH (m:Mannschaft)-[:HAT_GESPIELT]->(g:Spiel {gegner: "FC Demo"})
SET g.ergebnis = "2:1"
RETURN g;
