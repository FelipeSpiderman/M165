// KN-N-02 Teil E: Zusaetzliche Klauseln
// FC Muster - Neo4j Graphdatenbank

// 1. MERGE - Upsert (match oder create)
MERGE (s:Spieler {name: "Marco Weber"})
ON CREATE SET s.alter = 24, s.position = "Mittelfeld", s.rueckennummer = 7,
              s.gehalt = 55000.0, s.geburtsdatum = date("2000-01-10")
ON MATCH SET s.gehalt = s.gehalt + 5000
RETURN s;

// 2. CASE - Bedingte Wertzuweisung
MATCH (s:Spieler)
RETURN s.name,
  CASE
    WHEN s.alter < 21 THEN "Jungstar"
    WHEN s.alter >= 21 AND s.alter < 30 THEN "Stammspieler"
    ELSE "Erfahren"
  END AS kategorie
ORDER BY s.alter;
