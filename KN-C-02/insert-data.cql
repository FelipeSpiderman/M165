// KN-C-02 Teil A: Daten einfuegen
// FC Muster - Cassandra Keyspace

-- Mannschaftskader (Partition-Key: mannschaft_name)
INSERT INTO fc_muster.mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Senioren', 'Hans Muster', 'Stuermer', 9, 85000.5);
INSERT INTO fc_muster.mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Musfc_muster.ter Senioren', 'Fritz Meier', 'Mittelfeld', 10, 72000.0);
INSERT INTO fc_muster.mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Senioren', 'Max Huber', 'Abwehr', 4, 68000.0);
INSERT INTO fc_muster.mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Junioren A', 'Lukas Baer', 'Tor', 1, 45000.0);
INSERT INTO fc_muster.mannschaft_kader (mannschaft_name, spieler_name, position, rueckennummer, gehalt)
VALUES ('FC Muster Junioren A', 'Nina Koch', 'Stuermer', 11, 36000.0);

-- Spielerprofil
INSERT INTO fc_muster.spieler_detail (spieler_name, spieler_alter, position, rueckennummer, gehalt, geburtsdatum, mannschaften)
VALUES ('Hans Muster', 25, 'Stuermer', 9, 85000.5, '1999-05-12', {'FC Muster Senioren'});
INSERT INTO fc_muster.spieler_detail (spieler_name, spieler_alter, position, rueckennummer, gehalt, geburtsdatum, mannschaften)
VALUES ('Max Huber', 28, 'Abwehr', 4, 68000.0, '1996-11-30', {'FC Muster Senioren', 'FC Muster Junioren A'});
INSERT INTO fc_muster.spieler_detail (spieler_name, spieler_alter, position, rueckennummer, gehalt, geburtsdatum, mannschaften)
VALUES ('Nina Koch', 30, 'Stuermer', 11, 92000.0, '1994-07-08', {'FC Muster Senioren'});

-- Spielplan
INSERT INTO fc_muster.mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Senioren', '2024-09-15', 'FC Beispiel', 'Sportplatz Muster', '3:1');
INSERT INTO fc_muster.mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Senioren', '2024-09-22', 'FC Test', 'Sportplatz Auswaerts', '1:1');
INSERT INTO fc_muster.mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Senioren', '2024-09-29', 'FC Demo', 'Sportplatz Muster', '0:2');
INSERT INTO fc_muster.mannschaft_spiele (mannschaft_name, spiel_datum, gegner, ort, ergebnis)
VALUES ('FC Muster Junioren A', '2024-09-28', 'FC Jugend', 'Sportplatz Muster', '4:2');

-- Trainerteam
INSERT INTO fc_muster.trainer_mannschaft (trainer_name, mannschaft_name, spezialisierung, erfahrung)
VALUES ('Peter Schmid', 'FC Muster Senioren', 'Taktik', 12);
INSERT INTO fc_muster.trainer_mannschaft (trainer_name, mannschaft_name, spezialisierung, erfahrung)
VALUES ('Anna Meier', 'FC Muster Junioren A', 'Kondition', 8);
INSERT INTO fc_muster.trainer_mannschaft (trainer_name, mannschaft_name, spezialisierung, erfahrung)
VALUES ('Peter Schmid', 'FC Muster Junioren A', 'Taktik', 12);
