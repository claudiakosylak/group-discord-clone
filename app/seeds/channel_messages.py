from app.models import db, ChannelMessage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

messages_channel_1 = [
    {"user": 1, "content": "Hey everyone, how's it going?"},
    {"user": 2, "content": "Hey, things are good here. How about you?"},
    {"user": 3, "content": "I'm doing great, thanks! Excited to chat with everyone."},
    {"user": 2, "content": "Any interesting plans for the weekend?"},
    {"user": 1, "content": "I'm going hiking with some friends. Can't wait!"},
    {"user": 3, "content": "That sounds amazing, User1! Have a great time."},
    {"user": 1, "content": "Thanks! I'll share some photos later."},
    {"user": 2, "content": "I'm planning to catch up on some gaming this weekend."},
    {"user": 3, "content": "Nice! Any game in particular you're excited to play?"},
    {"user": 2, "content": "I've been hooked on the new RPG that just came out. It's awesome!"}
]

announcement_messages = [
    "📢 Announcement: Welcome to our Discord community! We're thrilled to have you all here. Feel free to introduce yourself and get to know other members. Enjoy your stay!",
    "📢 Announcement: Server Maintenance Scheduled for tomorrow, 8 PM UTC. Expect temporary downtime as we work on improving server performance. Thank you for your patience!"
]


def seed_channel_messages():
    for message in messages_channel_1:
        new_message = ChannelMessage(
        content = message["content"], user_id = message["user"], channel_id = 1
        )
        db.session.add(new_message)
    db.session.commit()

    for message in announcement_messages:
        new_message = ChannelMessage(
            content = message, user_id = 1, channel_id = 2
        )
        db.session.add(new_message)
    db.session.commit()



def undo_channel_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
