// KN-C-02 Teil C: Daten loeschen
// FC Muster - Cassandra

USE fc_muster;

// Ein bestimmtes Spiel der Senioren loeschen
DELETE FROM fc_muster.mannschaft_spiele
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spiel_datum = '2024-09-22';

// Eine Spalte aus dem Spielerprofil loeschen
DELETE gehalt FROM fc_muster.spieler_detail
WHERE spieler_name = 'Hans Muster';
