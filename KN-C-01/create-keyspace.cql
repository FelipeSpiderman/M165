CREATE KEYSPACE IF NOT EXISTS fc_muster
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

CREATE TABLE fc_muster.mannschaft_kader (
    mannschaft_name text,
    spieler_name text,
    position text,
    rueckennummer int,
    gehalt double,
    PRIMARY KEY (mannschaft_name, spieler_name)
);

CREATE TABLE fc_muster.spieler_detail (
    spieler_name text,
    spieler_alter int,
    position text,
    rueckennummer int,
    gehalt double,
    geburtsdatum date,
    mannschaften set<text>,
    PRIMARY KEY (spieler_name)
);

CREATE TABLE fc_muster.mannschaft_spiele (
    mannschaft_name text,
    spiel_datum date,
    gegner text,
    ort text,
    ergebnis text,
    PRIMARY KEY (mannschaft_name, spiel_datum)
);

CREATE TABLE fc_muster.trainer_mannschaft (
    trainer_name text,
    mannschaft_name text,
    spezialisierung text,
    erfahrung int,
    PRIMARY KEY (trainer_name, mannschaft_name)
);