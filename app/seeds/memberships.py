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

    # mem1 = Membership(
    #     role = 'member', server_id=1, user_id=2
    # )
    # mem2 = Membership(
    #     role = 'member', server_id=2, user_id=1
    # )
    # mem3 = Membership(
    #     role = 'member', server_id=2, user_id=3
    # )
    # mem4 = Membership(
    #         role = 'member', server_id=1, user_id=3
    #     )

    # db.session.add(mem1)
    # db.session.add(mem2)
    # db.session.add(mem3)
    # db.session.add(mem4)
    # db.session.commit()


def undo_memberships():
    if environment == "production":
        print("HITTING THIS: 🍎", SCHEMA)
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM memberships"))

    db.session.commit()
