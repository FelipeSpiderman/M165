// KN-N-02 Teil C: Daten loeschen
// FC Muster - Neo4j Graphdatenbank

// Ohne DETACH - das gibt einen Fehler
MATCH (s:Spieler {name: "Max Huber"})
DELETE s;

// Mit DETACH - loescht Knoten + alle Beziehungen
MATCH (s:Spieler {name: "Max Huber"})
DETACH DELETE s;
