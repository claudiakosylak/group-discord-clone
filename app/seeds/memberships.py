from app.models import db, Membership, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_memberships():
    for x in range(1, 6):
        for y in range(2, 11):
            membership = Membership(
                role = 'member', server_id = x, user_id = x * y
            )
            db.session.add(membership)
    db.session.commit()

    for x in range(2, 6):
        membership2 = Membership(
            role = 'member', server_id = x, user_id = 1
        )
        db.session.add(membership2)
    db.session.commit()

    userId = 96

    for x in range(6, 21):
        for y in range(1, 4):
            membership3 = Membership(
                role = "member", server_id = x, user_id = userId
            )
            db.session.add(membership3)
            userId -= 1
    db.session.commit()


def undo_memberships():
    if environment == "production":
        print("HITTING THIS: 🍎", SCHEMA)
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM memberships"))

    db.session.commit()
