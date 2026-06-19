// KN-C-02 Teil D: Daten veraendern
// FC Muster - Cassandra

USE fc_muster;

// Szenario 1: Gehaltserhoehung fuer Hans Muster
UPDATE mannschaft_kader
SET gehalt = 95000.0
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spieler_name = 'Hans Muster';

// Szenario 2: Max Huber wechselt Position (in beiden Mannschaften)
UPDATE mannschaft_kader
SET position = 'Mittelfeld'
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spieler_name = 'Max Huber';

UPDATE mannschaft_kader
SET position = 'Mittelfeld'
WHERE mannschaft_name = 'FC Muster Junioren A'
  AND spieler_name = 'Max Huber';

// Szenario 3: Ergebnis korrigieren
UPDATE mannschaft_spiele
SET ergebnis = '2:1'
WHERE mannschaft_name = 'FC Muster Senioren'
  AND spiel_datum = '2024-09-29';
