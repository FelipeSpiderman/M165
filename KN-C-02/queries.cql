// KN-C-02 Teil B: Daten abfragen
// FC Muster - Cassandra Queries

USE fc_muster;

-- Screen 1: Mannschaftskader - Alle Spieler der Senioren
SELECT * FROM mannschaft_kader
WHERE mannschaft_name = 'FC Muster Senioren';

-- Screen 2: Spielerprofil fuer Max Huber
SELECT * FROM spieler_detail
WHERE spieler_name = 'Max Huber';

-- Screen 3: Spielplan der Senioren sortiert nach Datum
SELECT * FROM mannschaft_spiele
WHERE mannschaft_name = 'FC Muster Senioren';

-- Screen 4: Trainerteam - Alle Mannschaften von Peter Schmid
SELECT * FROM trainer_mannschaft
WHERE trainer_name = 'Peter Schmid';
