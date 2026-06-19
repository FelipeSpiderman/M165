#!/usr/bin/env python3
# KN-C-03: Programmierung mit Cassandra
# FC Muster - Python mit cassandra-driver

from cassandra.cluster import Cluster
from cassandra.query import SimpleStatement

# Verbindung zum lokalen Docker-Container
cluster = Cluster(["127.0.0.1"], port=9042)
session = cluster.connect("fc_muster")


def get_kader(session, mannschaft):
    rows = session.execute(
        "SELECT * FROM mannschaft_kader WHERE mannschaft_name = %s",
        (mannschaft,)
    )
    print(f"--- Kader: {mannschaft} ---")
    for row in rows:
        print(f"  {row.spieler_name} - {row.position} (#{row.rueckennummer})")


def get_spieler(session, name):
    rows = session.execute(
        "SELECT * FROM spieler_detail WHERE spieler_name = %s",
        (name,)
    )
    print(f"--- Spielerprofil: {name} ---")
    for row in rows:
        print(f"  Position: {row.position}, Alter: {row.alter}")
        print(f"  Rueckennummer: {row.rueckennummer}, Gehalt: {row.gehalt}")
        print(f"  Geburtsdatum: {row.geburtsdatum}")
        print(f"  Mannschaften: {row.mannschaften}")


def insert_spieler(session, mannschaft, name, position, nummer, gehalt):
    session.execute(
        "INSERT INTO mannschaft_kader "
        "(mannschaft_name, spieler_name, position, rueckennummer, gehalt) "
        "VALUES (%s, %s, %s, %s, %s)",
        (mannschaft, name, position, nummer, gehalt)
    )
    print(f"Spieler {name} in {mannschaft} eingefuegt")


def update_gehalt(session, mannschaft, name, neues_gehalt):
    session.execute(
        "UPDATE mannschaft_kader SET gehalt = %s "
        "WHERE mannschaft_name = %s AND spieler_name = %s",
        (neues_gehalt, mannschaft, name)
    )
    print(f"Gehalt von {name} auf {neues_gehalt} aktualisiert")


def delete_spieler(session, mannschaft, name):
    session.execute(
        "DELETE FROM mannschaft_kader "
        "WHERE mannschaft_name = %s AND spieler_name = %s",
        (mannschaft, name)
    )
    print(f"Spieler {name} geloescht")


def get_heimspiele(session, mannschaft):
    rows = session.execute(
        "SELECT * FROM mannschaft_spiele "
        "WHERE mannschaft_name = %s AND ort = %s ALLOW FILTERING",
        (mannschaft, "Sportplatz Muster")
    )
    print(f"--- Heimspiele: {mannschaft} ---")
    for row in rows:
        print(f"  {row.spiel_datum}: {row.gegner} ({row.ergebnis})")


def get_trainer_teams(session, trainer):
    rows = session.execute(
        "SELECT * FROM trainer_mannschaft WHERE trainer_name = %s",
        (trainer,)
    )
    print(f"--- Trainer: {trainer} ---")
    for row in rows:
        print(f"  {row.mannschaft_name} - {row.spezialisierung} ({row.erfahrung} Jahre)")


# Hauptprogramm
if __name__ == "__main__":
    get_kader(session, "FC Muster Senioren")

    print()
    get_spieler(session, "Max Huber")

    print()
    get_heimspiele(session, "FC Muster Senioren")

    print()
    get_trainer_teams(session, "Peter Schmid")

    print()
    print("--- Neuen Spieler einfuegen ---")
    insert_spieler(session, "FC Muster Senioren", "Python Test", "Mittelfeld", 20, 50000.0)

    print()
    print("--- Gehalt erhoehen ---")
    update_gehalt(session, "FC Muster Senioren", "Python Test", 55000.0)

    print()
    print("--- Test-Spieler loeschen ---")
    delete_spieler(session, "FC Muster Senioren", "Python Test")

    cluster.shutdown()
    print("\nFertig.")
