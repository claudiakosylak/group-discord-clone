from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_channels():

    channel1 = Channel(
        title='general', server_id = 1, topic='This is the channel 1 test topic'
    )
    channel2 = Channel(
        title='Channel Two', server_id = 1, topic='This is the channel 2 test topic'
    )
    channel3 = Channel(
        title='general', server_id = 2, topic='This is the channel 3 test topic'
    )
    channel4 = Channel(
        title='Channel Four', server_id = 2, topic='This is the channel 4 test topic'
    )


    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.commit()


def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
