// KN-N-02 Teil A: Daten einfuegen
// FC Muster - Neo4j Graphdatenbank

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
