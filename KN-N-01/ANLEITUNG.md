# KN-N-01 – Was du tun musst

## Vorbereitung
- AWS Account vorhanden (oder AuraDB Account)
- SSH-Key parat (gleiche wie bei MongoDB)

---

## Teil A – Installation / Account erstellen

### Variante 1: AWS mit Cloud-Init
1. AWS Console → EC2 → **Instances → Launch Instance**
2. Name: `neo4j-server`
3. **AMI:** Ubuntu 24.04
4. **Instance-Typ:** t2.micro (reicht)
5. **Key Pair:** Deinen vorhandenen SSH-Key auswählen
6. **Advanced → User data:** Inhalt von `CloudInit-neo4j.yaml` reinkopieren
7. **Configure Storage:** 20 GB
8. **Security Group:** Ports 7687 (Bolt) und 7474 (HTTP) öffnen für deine IP
9. **Statische IP:** Elastic IP zuweisen (damit die Adresse gleich bleibt)
10. Launch

### Verbinden mit cypher-shell
```bash
# 1-2 Minuten warten bis Neo4j gestartet ist
cypher-shell -a neo4j://<IP>:7687 -u neo4j -p
```
Standardpasswort: `neo4j` – beim ersten Login wirst du aufgefordert es zu ändern.

**Screenshot:** cypher-shell mit erfolgreicher Verbindung

### Variante 2: Docker (lokal)
```bash
docker run --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=none -d neo4j:latest
docker exec -it neo4j cypher-shell
```

---

## Teil B – Logisches Modell für Neo4j

Das konzeptionelle Modell (4 Entitäten, N:N-Beziehung) hast du bereits von MongoDB übernommen.

### Vorgehen
1. **Knoten definieren:** Jede Entität wird zu einem Label (`:Spieler`, `:Mannschaft`, `:Spiel`, `:Trainer`)
2. **Attribute verteilen:** Mindestens 3 Attribute pro Knoten, verschiedene Datentypen
3. **Kanten definieren:** `SPIELT_FUER`, `TRAINIERT`, `HAT_GESPIELT`
4. **Attribut auf Kante:** Mindestens eine Kante muss Attribute haben (z.B. `SPIELT_FUER {seit: 2022}`)
5. **Visualisierung:** Zeichne das Modell in draw.io oder arrows.app

### Wichtig
- Keine konkreten Inhalte (Namen) – nur Typen angeben
- Auf der Kante muss die Erklärung stehen warum das Attribut dort ist und nicht auf dem Knoten

**Screenshot:** Bild des logischen Datenmodells
**Abgabe:** Original-Datei (draw.io)

---

## Abgabe-Checkliste

- [ ] Screenshot Verbindung cypher-shell (Teil A)
- [ ] Bild des logischen Datenmodells (Teil B)
- [ ] Original-Datei vom logischen Modell (draw.io)
- [ ] Erklärung zu den Attributen auf den Kanten
- [ ] README.md mit allem dokumentiert

## Mögliche Präsentationsfragen

- Wie unterscheidet sich das Neo4j-Modell vom MongoDB-Modell?
- Warum hast du das Attribut auf die Kante und nicht auf den Knoten gelegt?
- Was sind Labels in Neo4j?
- Welche Tools gibt es für die Modellierung?
- Wie löst Neo4j die N:N-Beziehung?
