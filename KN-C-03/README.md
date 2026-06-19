# KN-C-03 - Programmierung mit Cassandra

Ich habe Python mit dem `cassandra-driver` gewaehlt um auf die Cassandra-Datenbank zuzugreifen. Script: `queries.py`

---

## Setup

```bash
pip install cassandra-driver
```

Verbindung zum Docker-Container:

```python
from cassandra.cluster import Cluster

cluster = Cluster(["127.0.0.1"], port=9042)
session = cluster.connect("fc_muster")
```

Der Cassandra-Driver verbindet sich direkt ueber den Port 9042. Im Gegensatz zu Neo4j/MongoDB gibt es hier keine Benutzerauthentifizierung (Standard-Docker-Setup).

---

## Abfragen aus KN-C-02

### Alle Spieler einer Mannschaft abfragen

```python
def get_kader(session, mannschaft):
    rows = session.execute(
        "SELECT * FROM mannschaft_kader WHERE mannschaft_name = %s",
        (mannschaft,)
    )
    for row in rows:
        print(f"{row.spieler_name} - {row.position} (#{row.rueckennummer})")

get_kader(session, "FC Muster Senioren")
```

### Spielerprofil abfragen

```python
def get_spieler(session, name):
    rows = session.execute(
        "SELECT * FROM spieler_detail WHERE spieler_name = %s",
        (name,)
    )
    for row in rows:
        print(f"{row.spieler_name}, Alter: {row.alter}, Position: {row.position}")
        print(f"Mannschaften: {row.mannschaften}")

get_spieler(session, "Max Huber")
```

### Neuen Spieler einfuegen

```python
def insert_spieler(session, mannschaft, name, position, nummer, gehalt):
    session.execute(
        "INSERT INTO mannschaft_kader "
        "(mannschaft_name, spieler_name, position, rueckennummer, gehalt) "
        "VALUES (%s, %s, %s, %s, %s)",
        (mannschaft, name, position, nummer, gehalt)
    )
    print(f"Spieler {name} eingefuegt")

insert_spieler(session, "FC Muster Senioren", "Marco Weber", "Mittelfeld", 7, 55000.0)
```

### Update (Gehaltserhoehung)

```python
def update_gehalt(session, mannschaft, name, neues_gehalt):
    session.execute(
        "UPDATE mannschaft_kader SET gehalt = %s "
        "WHERE mannschaft_name = %s AND spieler_name = %s",
        (neues_gehalt, mannschaft, name)
    )
    print(f"Gehalt aktualisiert fuer {name}")

update_gehalt(session, "FC Muster Senioren", "Marco Weber", 60000.0)
```

### Delete

```python
def delete_spieler(session, mannschaft, name):
    session.execute(
        "DELETE FROM mannschaft_kader "
        "WHERE mannschaft_name = %s AND spieler_name = %s",
        (mannschaft, name)
    )
    print(f"Geloescht: {name}")

delete_spieler(session, "FC Muster Senioren", "Marco Weber")
```

### Komplexere Abfrage: Spielplan mit Filter

```python
def get_heimspiele(session, mannschaft):
    rows = session.execute(
        "SELECT * FROM mannschaft_spiele "
        "WHERE mannschaft_name = %s AND ort = %s",
        (mannschaft, "Sportplatz Muster")
    )
    for row in rows:
        print(f"{row.spiel_datum}: {row.gegner} ({row.ergebnis})")

get_heimspiele(session, "FC Muster Senioren")
```

---

Session schliessen:

```python
cluster.shutdown()
```

Screenshots:

![image](images/1.png)
![image](images/2.png)
