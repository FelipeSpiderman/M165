from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

# Verbindung zu AWS MongoDB
# <AWS-IP> durch deine tatsächliche IP ersetzen
client = MongoClient(
    "mongodb://admin:MeinSicheresPasswort.2024@<AWS-IP>:27017/?authSource=admin"
)
db = client["fc_muster"]

print("=== FIND: Alle Spieler ===")
for s in db.spieler.find():
    print(s.get("name"), "-", s.get("position"))

print("\n=== FIND mit Filter: Spieler alter > 20, Projektion ohne _id ===")
for r in db.spieler.find(
    {"alter": {"$gt": 20}},
    {"name": 1, "alter": 1, "gehalt": 1, "_id": 0}
):
    print(r)

print("\n=== INSERT: Neuer Spieler ===")
neuer_spieler = {
    "name": "Python Spieler",
    "alter": 24,
    "position": "Mittelfeld",
    "rueckennummer": 14,
    "gehalt": 70000.0,
    "geburtsdatum": datetime(2000, 6, 15)
}
result = db.spieler.insert_one(neuer_spieler)
print("Eingefügt mit _id:", result.inserted_id)

print("\n=== UPDATE: Gehalt erhöhen ===")
db.spieler.update_one(
    {"name": "Python Spieler"},
    {"$set": {"gehalt": 75000.0}}
)
updated = db.spieler.find_one({"name": "Python Spieler"}, {"name": 1, "gehalt": 1, "_id": 0})
print("Nach Update:", updated)

print("\n=== AGGREGATION: Spieler pro Position ===")
pipeline = [
    {"$group": {"_id": "$position", "anzahl": {"$sum": 1}}},
    {"$sort": {"anzahl": -1}}
]
for r in db.spieler.aggregate(pipeline):
    print(r)

print("\n=== LOOKUP: Mannschaft + Trainer ===")
pipeline = [
    {
        "$lookup": {
            "from": "trainer",
            "localField": "trainerId",
            "foreignField": "_id",
            "as": "trainer_info"
        }
    },
    {"$unwind": "$trainer_info"},
    {
        "$project": {
            "_id": 0,
            "name": 1,
            "liga": 1,
            "trainer_info.name": 1
        }
    }
]
for r in db.mannschaft.aggregate(pipeline):
    print(r)

print("\n=== DELETE: Python Spieler entfernen ===")
db.spieler.delete_one({"name": "Python Spieler"})
print("Gelöscht")

client.close()
