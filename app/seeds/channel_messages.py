from app.models import db, ChannelMessage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

conversation = [
    [1, "Hey everyone! I'm excited to start our software development project!"],
    [2, "Me too! This is a great opportunity to learn and collaborate."],
    [3, "Absolutely! I'm still new to coding, but I'm eager to contribute."],
    [4, "Don't worry, we're all here to support each other. What's our first step?"],
    [5, "I suggest we have a brainstorming session to gather project ideas."],
    [6, "Good idea! Let's schedule a meetup this weekend. Who's available?"],
    [7, "Count me in! I'm free on Saturday afternoon."],
    [8, "Saturday works for me too. Let's aim for late morning."],
    [9, "I have another commitment on Saturday, but I'm available on Sunday."],
    [10, "Sunday works for me as well. We can start fresh then."],
    [3, "Okay, let's finalize the meetup for Sunday. What's the location?"],
    [2, "How about we meet at a local coffee shop with free Wi-Fi?"],
    [6, "Sounds good. Can someone suggest a coffee shop near downtown?"],
    [4, "I know a great place called 'Coding Brew.' It's close to the library."],
    [1, "Perfect! Let's meet at Coding Brew on Sunday at 10 AM. Agreed?"],
    [5, "Agreed! Looking forward to meeting everyone and discussing ideas."],
    [9, "Count me in. See you all on Sunday at Coding Brew."],
    [8, "Sunday at Coding Brew it is. I'll bring my laptop."],
    [7, "Excited to join! Sunday at 10 AM, Coding Brew it is."],
    [10, "I'll make sure to come prepared. Can't wait for the meetup!"],
    [2, "Before we wrap up, does anyone have any specific agenda points?"],
    [3, "We should discuss our preferred programming languages and tools."],
    [4, "Agreed. We should also decide on the scope and goals of our project."],
    [6, "Let's create an agenda document and share it with everyone."],
    [1, "Great idea! I'll set up a shared Google Doc for our agenda."],
    [5, "Thanks for taking the lead, Demo. We appreciate it!"],
    [7, "Looking forward to collaborating with all of you. See you Sunday!"],
    [10, "Same here! Sunday can't come soon enough. See you all then!"],
    [8, "Thanks, Demo! See you all on Sunday for an exciting journey!"],
    [9, "Wishing everyone a productive meetup. Sunday, here we come!"]
]

introductions = [
    [1, "Hey everyone! I'm Demo, and I'm excited to be here. I'm a beginner software developer with a passion for web development."],
    [2, "Hello, fellow developers! I'm Marnie. I'm new to coding, but I'm eager to learn and contribute to our project."],
    [3, "Hi, everyone! I'm Ethan, and I'm still exploring the world of programming. Looking forward to collaborating with all of you."],
    [4, "Greetings, team! I'm Olivia, and I'm thrilled to join this software development project. Let's create something amazing together!"],
    [5, "Hey there! I'm Liam, a coding enthusiast ready to dive into this project. Excited to meet everyone and see what we can achieve."],
    [6, "Hi, folks! I'm Emma, a budding software developer. Looking forward to brainstorming and working with all of you."],
    [7, "Hello, everyone! I'm Noah, and I can't wait to contribute to this project. Let's build something great together!"],
    [8, "Hey, all! I'm Ava, a beginner coder passionate about software development. Looking forward to collaborating and learning from you."],
    [9, "Greetings, team members! I'm Aiden, an aspiring software developer. Excited to embark on this project and grow together."],
    [10, "Hey everyone! I'm Isabella, a novice programmer eager to dive into this project. Let's make our mark in the world of software development!"]
]



announcement_messages = [
    "📢 Announcement: Welcome to our Discord community! We're thrilled to have you all here. Feel free to introduce yourself and get to know other members. Enjoy your stay!",
    "📢 Announcement: Server Maintenance Scheduled for tomorrow, 8 PM UTC. Expect temporary downtime as we work on improving server performance. Thank you for your patience!"
]


def seed_channel_messages():
    for message in conversation:
        new_message = ChannelMessage(
        content = message[1], user_id = message[0], channel_id = 1
        )
        db.session.add(new_message)
    db.session.commit()

    for message in announcement_messages:
        new_message = ChannelMessage(
            content = message, user_id = 1, channel_id = 2
        )
        db.session.add(new_message)
    db.session.commit()

    for message in introductions:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 3
        )
        db.session.add(new_message)
    db.session.commit()



def undo_channel_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
