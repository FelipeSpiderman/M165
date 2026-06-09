# KN-M-04 – Was du tun musst

## Vorbereitung
- AWS Instanz läuft, Compass verbunden
- `fc_muster` DB mit Daten aus KN-M-03 vorhanden (trainer, spieler, mannschaft mit Daten)

---

## Teil A – Aggregationen

Erstelle ein Script `aggregations.js` mit 4 Aggregationen:

| # | Was gefordert | Beispiel |
|---|---------------|---------|
| 1 | `$match` mehrstufig (2x $match hintereinander) | Filter auf Position, dann auf Gehalt |
| 2 | `$match` + `$project` + `$sort` mit mehreren Resultaten | Zeige Name/Alter/Gehalt sortiert |
| 3 | `$sum` zum Zählen | Spieler pro Position zählen |
| 4 | `$group` (mindestens eine!) | Gesamtgehalt pro Position |

- In Compass unter **Aggregations** Tab oder in MONGOSH ausführen
- **Screenshot** pro Aggregation mit Resultat

## Teil B – Join mit $lookup

Erstelle `lookup.js`:

1. Verknüpfe `mannschaft` mit `trainer` via `trainerId`
2. Verwende `$unwind` danach (sonst ist trainer_info ein Array)
3. Füge mindestens einen `$match` oder `$project` dazu
4. Zeige, dass Felder aus beiden Collections im Resultat sind

**Screenshot:** Resultat zeigt Felder aus beiden Collections

## Teil C – Unterdokumente / Arrays

Erstelle `subdocuments.js` mit 3 Abfragen auf dem `spiele`-Array in `mannschaft`:

| # | Was | Syntax |
|---|-----|--------|
| 1 | Einzelne Unterdokument-Felder ausgeben | `"spiele.ergebnis": 1` in Projektion |
| 2 | Nach Unterdokument-Feld filtern | `{ "spiele.ergebnis": "3:1" }` |
| 3 | `$unwind` verwenden | macht Array → einzelne Dokumente |

**Screenshot:** jede Abfrage mit Resultat

---

## Abgabe-Checkliste

- [ ] `aggregations.js`
- [ ] `lookup.js`
- [ ] `subdocuments.js`
- [ ] README.md mit Scripts und Screenshots
- [ ] `images/` mit Screenshots

## Mögliche Präsentationsfragen

- Was ist der Unterschied zwischen `find()` und `aggregate()`?
- Was macht `$unwind` genau?
- Warum braucht man `$unwind` nach `$lookup`?
- Wie funktioniert `$lookup`? Was sind `localField` und `foreignField`?
- Wann würdest du `$group` verwenden?
- Was ist der Unterschied zwischen `$sum: 1` und `$sum: "$gehalt"`?
- Wie greifst du auf ein Unterdokument-Feld zu? (Dot-Notation)
