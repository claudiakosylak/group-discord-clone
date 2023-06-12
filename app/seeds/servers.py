from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_servers():
    server1 = Server(
        title='Server One', owner_id=1, preview_icon="https://images.unsplash.com/photo-1685594496584-23198309c37a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2767&q=80"
    )
    server2 = Server(
        title='Server Two', owner_id=2, preview_icon="https://images.unsplash.com/photo-1667742068870-52fc8372e213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1788&q=80"
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
