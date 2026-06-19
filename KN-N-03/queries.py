#!/usr/bin/env python3
# KN-N-03: Programmierung mit Neo4j
# FC Muster - Python mit neo4j Driver

from neo4j import GraphDatabase

# Verbindung (Achtung: IP und Passwort anpassen!)
URI = "neo4j://<IP>:7687"
AUTH = ("neo4j", "<Password>")

driver = GraphDatabase.driver(URI, auth=AUTH)


def get_all_spieler(tx):
    result = tx.run("MATCH (s:Spieler) RETURN s.name, s.position, s.alter")
    for record in result:
        print(f"{record['s.name']} - {record['s.position']} ({record['s.alter']})")


def get_aeltere_spieler(tx):
    result = tx.run(
        "MATCH (s:Spieler) WHERE s.alter > $min_alter "
        "RETURN s.name, s.position, s.alter, s.gehalt ORDER BY s.alter",
        min_alter=25
    )
    for record in result:
        print(f"{record['s.name']} - Alter: {record['s.alter']}, Gehalt: {record['s.gehalt']}")


def create_spieler(tx, name, alter, position, nummer, gehalt, geburtsdatum):
    result = tx.run(
        "CREATE (s:Spieler {name: $name, alter: $alter, position: $position, "
        "rueckennummer: $nummer, gehalt: $gehalt, geburtsdatum: date($geburtsdatum)}) "
        "RETURN elementId(s)",
        name=name, alter=alter, position=position,
        nummer=nummer, gehalt=gehalt, geburtsdatum=geburtsdatum
    )
    for record in result:
        print(f"Spieler erstellt mit ID: {record['elementId(s)']}")


def update_gehalt(tx, name, neues_gehalt):
    tx.run(
        "MATCH (s:Spieler {name: $name}) SET s.gehalt = $neues_gehalt",
        name=name, neues_gehalt=neues_gehalt
    )
    print(f"Gehalt aktualisiert fuer {name}")


def delete_spieler(tx, name):
    tx.run("MATCH (s:Spieler {name: $name}) DETACH DELETE s", name=name)
    print(f"Geloescht: {name}")


def get_spieler_mit_team(tx):
    query = """
    MATCH (s:Spieler)-[:SPIELT_FUER]->(m:Mannschaft)<-[:TRAINIERT]-(t:Trainer)
    RETURN s.name AS spieler, m.name AS mannschaft, t.name AS trainer
    ORDER BY m.name, s.name
    """
    result = tx.run(query)
    for record in result:
        print(f"{record['spieler']} -> {record['mannschaft']} (Trainer: {record['trainer']})")


def count_per_position(tx):
    result = tx.run(
        "MATCH (s:Spieler) RETURN s.position AS position, count(*) AS anzahl "
        "ORDER BY anzahl DESC"
    )
    for record in result:
        print(f"{record['position']}: {record['anzahl']}")


# Hauptprogramm
if __name__ == "__main__":
    with driver.session(database="neo4j") as session:
        print("=== Alle Spieler ===")
        session.execute_read(get_all_spieler)

        print("\n=== Spieler > 25 Jahre ===")
        session.execute_read(get_aeltere_spieler)

        print("\n=== Neuen Spieler erstellen ===")
        session.execute_write(create_spieler, "Python Spieler", 24, "Mittelfeld", 14, 70000.0, "2000-06-15")

        print("\n=== Gehalt erhoehen ===")
        session.execute_write(update_gehalt, "Python Spieler", 75000.0)

        print("\n=== Spieler mit Team und Trainer ===")
        session.execute_read(get_spieler_mit_team)

        print("\n=== Spieler pro Position ===")
        session.execute_read(count_per_position)

        print("\n=== Test-Spieler loeschen ===")
        session.execute_write(delete_spieler, "Python Spieler")

    driver.close()
    print("\nFertig.")
