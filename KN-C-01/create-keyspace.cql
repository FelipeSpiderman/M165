// KN-C-01: Physisches Modell fuer Cassandra
// FC Muster - Keyspace und Tabellen

CREATE KEYSPACE fc_muster
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE fc_muster;

// Screen 1: Mannschaftskader - Alle Spieler einer Mannschaft
CREATE TABLE mannschaft_kader (
    mannschaft_name text,
    spieler_name text,
    position text,
    rueckennummer int,
    gehalt double,
    PRIMARY KEY (mannschaft_name, spieler_name)
);

// Screen 2: Spielerprofil - Details zu einem Spieler
CREATE TABLE spieler_detail (
    spieler_name text,
    alter int,
    position text,
    rueckennummer int,
    gehalt double,
    geburtsdatum date,
    mannschaften set<text>,
    PRIMARY KEY (spieler_name)
);

// Screen 3: Spielplan - Alle Spiele einer Mannschaft sortiert nach Datum
CREATE TABLE mannschaft_spiele (
    mannschaft_name text,
    spiel_datum date,
    gegner text,
    ort text,
    ergebnis text,
    PRIMARY KEY (mannschaft_name, spiel_datum)
);

// Screen 4: Trainerteam - Trainer mit Mannschaften
CREATE TABLE trainer_mannschaft (
    trainer_name text,
    mannschaft_name text,
    spezialisierung text,
    erfahrung int,
    PRIMARY KEY (trainer_name, mannschaft_name)
);
