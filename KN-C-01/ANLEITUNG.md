# KN-C-01 – Was du tun musst

## Vorbereitung
- Docker installiert (oder AWS Account)
- Datenmodell aus MongoDB (FC Muster) bereit

---

## Teil A – Installation / Account erstellen

### Variante 1: Docker (einfach)

```bash
# Cassandra starten
docker run --name cassandra -p 9042:9042 -p 9160:9160 -d cassandra:latest

# 1-2 Minuten warten, dann verbinden
docker exec -it cassandra cqlsh
```

**Screenshot 1:** cqlsh mit erfolgreicher Verbindung

### Variante 2: AWS mit Docker
1. AWS EC2 → Ubuntu 24.04 Instanz starten
2. Per SSH einloggen und Docker installieren:
   ```bash
   sudo apt update && sudo apt install docker.io -y
   sudo docker run --name cassandra -p 9042:9042 -p 9160:9160 -d cassandra:latest
   ```
3. Security Group: Port 9042 für deine IP öffnen
4. Verbinden: `docker exec -it cassandra cqlsh`

### DataGrip (optional)
- Studenten-Lizenz beantragen (mit TBZ-ID)
- Neue Datenquelle → Cassandra → Host: IP, Port: 9042
- **Screenshot 2:** DataGrip Verbindung

---

## Teil B – Logisches Modell für Cassandra

**Wichtig bei Cassandra:** Nicht die Entitäten modellieren, sondern die **Screens** (Abfrage-Szenarien)!

### Vorgehen
1. Überlege 3-4 Screens (Ansichten) die ein Benutzer sieht:
   - Z.B. "Mannschaftskader", "Spielerprofil", "Spielplan", "Trainerteam"
2. Pro Screen eine Tabelle definieren
3. **Partition Key** festlegen (welcher Wert verteilt die Daten auf die Nodes)
4. **Cluster Key** festlegen (welcher Wert sortiert innerhalb der Partition)
5. Alle Tabellen zusammen zeichnen (draw.io)

### Beispiel Screens

| Screen | Partition Key | Cluster Key | Grund |
|--------|---------------|-------------|-------|
| Mannschaftskader | mannschaft_name | spieler_name | Alle Spieler einer Mannschaft laden |
| Spielerprofil | spieler_name | – | Einzelner Spieler |
| Spielplan | mannschaft_name | spiel_datum | Spiele sortiert nach Datum |
| Trainerteam | trainer_name | mannschaft_name | Alle Teams eines Trainers |

**Screenshot:** Visuelle Darstellung des logischen Modells (mit Keys beschriftet)

---

## Teil C – Physisches Modell für Cassandra

1. `create-keyspace.cql` erstellen
2. Keyspace anlegen:
   ```cassandra
   CREATE KEYSPACE fc_muster WITH replication = {
     'class': 'SimpleStrategy', 'replication_factor': 1
   };
   ```
3. USE fc_muster;
4. Alle 4 Tabellen mit CREATE TABLE anlegen
5. In cqlsh ausführen: `SOURCE 'create-keyspace.cql'`
6. **Screenshot:** `DESCRIBE TABLES;` zeigt alle Tabellen

### Datentypen in Cassandra
- `text` = String
- `int` = Ganzzahl
- `double` = Kommazahl
- `date` = Datum (YYYY-MM-DD)
- `set<text>` = Menge von Strings

---

## Abgabe-Checkliste

- [ ] Screenshot cqlsh Verbindung (Teil A)
- [ ] Screenshot GUI Verbindung (optional) (Teil A)
- [ ] Visuelle Darstellung logisches Modell (Teil B)
- [ ] Erklärung der Screens mit Partition/Cluster Keys (Teil B)
- [ ] `create-keyspace.cql` Script (Teil C)
- [ ] Screenshot: Tabellen erstellt (Teil C)
- [ ] README.md mit allen Erklärungen

## Mögliche Präsentationsfragen

- Was ist der Unterschied zwischen Partition Key und Cluster Key?
- Warum werden Daten in Cassandra redundant gespeichert?
- Was ist ein Keyspace?
- Warum gibt es keine Joins in Cassandra?
- Wie wählt man einen guten Partition Key?
- Was passiert wenn der Partition Key zu viele Daten hat?
