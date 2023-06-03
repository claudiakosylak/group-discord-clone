from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_servers():
    server1 = Server(
        title='Server One', owner_id=1
    )
    server2 = Server(
        title='Server Two', owner_id=2
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
