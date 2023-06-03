from app.models import db, ChannelMessage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_channel_messages():
    cm1 = ChannelMessage(
        content = 'Test channel message number one', user_id=1, channel_id=1
    )

    db.session.add(cm1)
    db.session.commit()



def undo_channel_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
