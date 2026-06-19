# KN-N-02 – Was du tun musst

## Vorbereitung
- Neo4j Instanz läuft (von KN-N-01)
- cypher-shell verbunden (`cypher-shell -a neo4j://<IP>:7687 -u neo4j -p`)
- Datenmodell aus KN-N-01 bereit (Labels, Kanten)

---

## Teil A – Daten hinzufügen

Erstelle `insert-data.cypher` mit einem grossen CREATE-Statement.

**Bedingungen:**
- 3-5 Objekte pro Label
- Ein einziges grosses CREATE-Statement (nicht mehrere einzelne)
- Formatierung: lesbar, nicht alles auf einer Zeile

**Vorgehen:**
1. In `insert-data.cypher` alle Daten definieren (siehe Muster)
2. In cypher-shell ausführen: `:source insert-data.cypher`
3. **Screenshot:** Ergebnis der Ausführung

---

## Teil B – Daten abfragen

### Schritt 1: Standard-Statement erklären
Erkläre dieses Statement im Detail:
```cypher
MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n, r, m;
```
Speziell die `OPTIONAL` Klausel – warum ist sie wichtig? Was passiert ohne?

### Schritt 2: 4 Szenarien schreiben
4 Abfragen zu deiner Themenwelt, mit diesen Bedingungen:
- Mindestens 2x WHERE-Klausel
- Nicht alle auf dem gleichen Knoten-Typ
- Zuerst in Prosa beschreiben, dann das Cypher-Statement

**Screenshots:** 4x Screenshots der Abfragen und Resultate

---

## Teil C – Daten löschen

### Mit/ohne DETACH testen
1. Suche einen Knoten der Beziehungen hat:
   ```cypher
   MATCH (s:Spieler {name: "Max Huber"}) DELETE s;
   ```
   → Erwarte einen Fehler (Knoten hat noch Beziehungen)
   **Screenshot vorher + Fehler**

2. Gleicher Knoten mit DETACH:
   ```cypher
   MATCH (s:Spieler {name: "Max Huber"}) DETACH DELETE s;
   ```
   → Funktioniert
   **Screenshot nachher**

---

## Teil D – Daten verändern

3 Szenarien beschreiben (Prosa + Cypher-Statement):
- Mindestens 1x SET auf Knoten
- Mindestens 1x SET auf Kante (wenn vorhanden)

**Screenshots:** 3x Vorher/Nachher

---

## Teil E – Zusätzliche Klauseln

2 neue Cypher-Klauseln auswählen (nicht MATCH, CREATE, SET, DELETE, RETURN).
**Mit deinen Kollegen absprechen – keine doppelten!**

Pro Klausel:
1. Theorie erklären (in eigenen Worten)
2. Beispiel-Statement in deiner Themenwelt
3. Erklärung zum Beispiel

---

## Abgabe-Checkliste

- [ ] `insert-data.cypher` (Teil A)
- [ ] Erklärung OPTIONAL MATCH (Teil B)
- [ ] 4 Szenarien mit Prosa + Cypher (Teil B)
- [ ] 2x DELETE Statements mit Vorher/Nachher (Teil C)
- [ ] 3x UPDATE Statements (Teil D)
- [ ] 2x neue Klauseln mit Erklärung (Teil E)
- [ ] README.md mit allen Erklärungen
- [ ] Screenshots von allen Ausführungen

## Mögliche Präsentationsfragen

- Was macht OPTIONAL MATCH genau?
- Was passiert wenn man DELETE ohne DETACH verwendet?
- Was ist der Unterschied zwischen SET und MERGE?
- Wie funktioniert CASE in Cypher?
- Wie filtert man mit WHERE auf Kanten-Attribute?
- Was macht `collect()` in Cypher?
