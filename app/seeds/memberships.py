from app.models import db, Membership, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_memberships():
    mem1 = Membership(
        role = 'member', server_id=1, user_id=2
    )
    mem2 = Membership(
        role = 'member', server_id=2, user_id=1
    )
    mem3 = Membership(
        role = 'member', server_id=2, user_id=3
    )
    mem4 = Membership(
            role = 'member', server_id=1, user_id=3
        )

    db.session.add(mem1)
    db.session.add(mem2)
    db.session.add(mem3)
    db.session.add(mem4)
    db.session.commit()


def undo_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM memberships"))

    db.session.commit()
